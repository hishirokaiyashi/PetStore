// Define global variables for cart items list and checkout items list
let listCart = [];
let checkout = [];
let appliedCoupon = {};
let sale = false;

// Get cart items from localstorage
if (localStorage.getItem("listCart")) {
  listCart = JSON.parse(localStorage.getItem("listCart"));
}

// Update cart quantity
const updateAmountLengthCart = () => {
  let amount = 0;
  listCart.forEach((item) => {
    amount += item.amount;
  })
  document.getElementById("number-cart").innerText = amount;
}

// Call update quantity 
updateAmountLengthCart();

// Add to cart button
const addToCart = (x, event) => {
  event.stopPropagation();
  let btn = x.parentElement.parentElement;
  let img = btn.children[1].src;
  let name = btn.children[2].children[0].children[0].innerHTML;
  let price = btn.children[2].children[0].children[2].children[0].innerHTML;
  let id = x.parentElement.parentElement.parentElement.dataset.id;
  price = removeDot(price);
  let amount = 1;

  // Check product name 
  if (checkNameProduct(name) >= 0) {
    updateAmountProduct(checkNameProduct(name));
  } else {
    let item = { id, img, name, price, amount };
    listCart.push(item);
  }

  updateAmountLengthCart();
  // Save item to localStorage
  localStorage.setItem("listCart", JSON.stringify(listCart));

  // Add list cart to indexedDB
  const currentUserID = JSON.parse(localStorage.getItem("loggedInUser")).id || null;;
  if (currentUserID) {
    updateCartDB(currentUserID, listCart)
  }
}

// Update cart in users store with indexedDB according to user id

const updateCartDB = (id, cart) => {
  const request = indexedDB.open('PetStore');

  request.onsuccess = (event) => {
    const db = event.target.result;

    // Access the object store containing user data
    const transaction = db.transaction(['users'], 'readwrite');
    const objectStore = transaction.objectStore('users');

    // Get the user object with the specified ID
    const getRequest = objectStore.get(id);
    getRequest.onsuccess = (event) => {
      const user = event.target.result;

      // Update the user's cart property
      user.cart = cart;

      // Put the updated user object back into the object store
      const putRequest = objectStore.put(user);
      putRequest.onsuccess = () => {
        console.log('User cart updated successfully');
        db.close();
      };
    };
  };

}

// Update amount of product item in list cart
const updateAmountProduct = (location) => {
  listCart.forEach((item, index) => {
    if (index == location) {
      item.amount += 1;
      return;
    }
  });
};

// Check name of product whether it is similar to any item in list cart
const checkNameProduct = (name) => {
  let location = -1;
  listCart.forEach((item, index) => {
    if (item.name == name) {
      location = index;
      return;
    }
  });
  return location;
};

// Increase the number of cart item
const increaseAmountProduct = (item) => {
  let location = item.parentElement.children[0].value; //hidden
  let amount = item.parentElement.children[2]; //display
  let index = item.closest(('[data-id]')).dataset.id;
  let updatedTotal = 0;
  let newAmountProduct = 0;
  listCart.forEach((element, index) => {
    if (index == location) {
      // Update listCart
      newAmountProduct = element.amount + 1;
      updatedTotal = newAmountProduct * element.price; //price
      element.amount += 1;
      return;
    }
  })
  localStorage.setItem("listCart", JSON.stringify(listCart));
  // Display value
  amount.value = newAmountProduct;
  // Total items
  let total = item.parentElement.parentElement.children[3].children[0]; //display total

  total.innerHTML = addDot(updatedTotal);

  updateAmountLengthCart();
  checkout.map((item) => {
    if (item.id == index) {
      item.amount = newAmountProduct;
    }
  })

  updateTotalPriceAll()
};

// Decrease the amount of product
const decreaseAmountProduct = (item) => {
  let location = item.parentElement.children[0].value; //hidden
  let amount = item.parentElement.children[2]; //display
  let updatedTotal = 0;
  let newAmountProduct = 0;
  let index = item.closest(('[data-id]')).dataset.id;
  listCart.forEach((item, index) => {
    if (index == location) {
      //Update listCart
      newAmountProduct = item.amount - 1;
      if (newAmountProduct < 1) {
        newAmountProduct = 1;
        updatedTotal = newAmountProduct * item.price; //price
      } else {
        updatedTotal = newAmountProduct * item.price; //price
        item.amount -= 1;
      }
      return;
    }
  })

  localStorage.setItem("listCart", JSON.stringify(listCart));
  // Display value 
  amount.value = newAmountProduct;
  //total
  let total = item.parentElement.parentElement.children[3].children[0]; //display total
  total.innerHTML = addDot(updatedTotal);
  updateAmountLengthCart()
  checkout.map((item) => {
    if (item.id == index) {
      item.amount = newAmountProduct;
    }
  })
  // totalPriceAll.innerText = checkout.reduce((acc, cur) => acc + (cur.amount * cur.price), 0);
  updateTotalPriceAll()
};

// Render items of cart 
const showCart = () => {
  let cart = "";
  let listCart = JSON.parse(localStorage.getItem("listCart")) || [];
  let cartBottom = document.querySelector('.Carts-container-second-detail-bottom');
  let cartTop = document.querySelector('.Carts-container-second-detail-top');
  if (listCart.length == 0) {
    cart += `
      <div class="Carts-list-items-container-nothing">
        <img 
          src="/assets/images/nothing.gif"
          alt="Nothing-to-show"
          class="Cart-img-product-nothing"
        />
        <p>Oops...! There is nothing in your cart</p>
        <button onclick="window.location.href = 'Products.html'">Visit Shop</button>
      </div>
    `
    if(cartBottom && cartTop){
      cartBottom.remove();
      cartTop.remove();
    }
  }
  else {

    listCart.forEach((item, index) => {
      // let total = parseInt(`${item.price}`) * parseInt(`${item.amount}`);
      let total = item.price * parseInt(`${item.amount}`);
      cart += `
      <div data-id=${item.id} class="Carts-list-items-container">
        <div class="Carts-container-middle-first">
          <input
            onchange="handleCheckBox(this)"
            type="checkbox"
            id="Carts-checkbox"
            class="shopping-cart-checkbox"
          />
          <img
            src=${item.img}
            alt=${item.name}
            class="Cart-img-product"
          />
          <span class="Cart-product-title-middle"
            >${item.name}</span>
        </div>
        <div class="Carts-container-middle-second">
          <span class="Cart-product-price-middle">${addDot(item.price)}</span>
        </div>
        <div class="Carts-container-middle-third">
          <input type="hidden" value="${index}"/>
          <div onclick="decreaseAmountProduct(this)" class="btn-decrease-number">-</div>
          <input
            type="number"
            name="amount"
            min="1"
            max="9999999"
            type="number"
            disabled
            value=${item.amount}
            class="number-product"
          />
          <div onclick="increaseAmountProduct(this)" class="btn-increase-number">+</div>
        </div>
        <div class="Carts-container-middle-fourth">
          
          <span class="Cart-product-total-middle">${addDot(total)}</span>
          <span onclick="handleDelete(this)" class="Cart-product-delete-middle">
            <span
              class="iconify cart-btn-delete"
              data-icon="material-symbols:delete-outline"
            ></span>
          </span>
        </div>
      </div>
      `;
    });
  }
  if (document.getElementById("showcart")) {
    document.getElementById("showcart").innerHTML = cart;
  }
}

// Add dot to the price number => string
const addDot = (price) => {
  const formattedPrice =
    price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
  return formattedPrice;
}

// Remove dot to the price string => number
const removeDot = (price) => {
  const unFormattedPrice = price.replace(".", "").replace("đ", "").trim();
  return parseInt(unFormattedPrice);
}

// Delete item button
const handleDelete = (item) => {
  let locationContainer = item.parentElement.parentElement.parentElement;
  let location = item.parentElement.parentElement
  const id = location.dataset.id;
  listCart = listCart.filter((item) => {
    return !item.id.includes(id);
  })
  locationContainer.removeChild(location);
  localStorage.setItem("listCart", JSON.stringify(listCart))
  updateAmountProduct();
  updateAmountLengthCart()
  let index = item.closest(('[data-id]')).dataset.id;
  checkout = checkout.filter((item) => item.id !== index);
  let checkboxes = document.querySelectorAll(".shopping-cart-checkbox");
  if (checkout.length == listCart.length && checkout.length != 0) {
    checkboxes.forEach((item) => {
      item.checked = true;
    })
    checkout = listCart;
  } else if (listCart.length == 0) {
    checkboxes[0].checked = false;
  }
  updateTotalPriceAll()
  showCart();
  // Update cart in users store indexedDB
  const currentUserID = JSON.parse(localStorage.getItem("loggedInUser")).id || null;;
  if (currentUserID) {
    updateCartDB(currentUserID, listCart)
  }
}

// Update total price with coupon
const updateTotalPriceAll = () => {
  let totalPriceAll = document.getElementById("total-price");
  let alertCoupon = document.querySelector(".Carts-alert-coupon");
  let totalCheckout = checkout.reduce((acc, cur) => acc + (cur.amount * cur.price), 0);
  if (Object.keys(appliedCoupon).length !== 0) {
    if (totalCheckout >= appliedCoupon.min) {
      if (appliedCoupon.value < 1) {
        totalCheckout = totalCheckout - (totalCheckout * appliedCoupon.value);
      }
      else {
        totalCheckout = totalCheckout - appliedCoupon.value;
      }
      alertCoupon.innerHTML = "<p style= 'color:green; margin-bottom:0.25rem; font-size:1rem'>Coupon was applied</p>"
      sale = true;
    }
    else {
      alertCoupon.innerHTML = "<p style= 'color:red; margin-bottom:0.25rem; font-size:1rem'>Your order is not suitable for coupon</p>"
      sale = false;
    }
  }
  totalPriceAll.innerText = addDot(totalCheckout);
}

// Handle checkbox click
const handleCheckBox = (item) => {
  let index = item.parentElement.parentElement.dataset.id;
  let checkboxes = document.querySelectorAll(".shopping-cart-checkbox")
  if (item.checked == true) {
    checkout.push(listCart.find((element) => element.id == index));
    if (checkout.length == listCart.length) {
      checkboxes.forEach((item) => {
        item.checked = true;
      })
      checkout = listCart;
    }
  } else {
    checkboxes[0].checked = false;
    checkout = checkout.filter((item) => item.id !== index);
  }
  updateTotalPriceAll()
}

// Handle checkbox select all 
const handleCheckBoxAll = () => {
  let checkboxes = document.querySelectorAll(".shopping-cart-checkbox")
  if (checkboxes[0].checked) {
    checkboxes.forEach((item) => {
      item.checked = true;
    })
    checkout = listCart;

  } else {
    checkboxes.forEach((item) => {
      item.checked = false;
    })
    checkout = [];
  }
  updateTotalPriceAll()
}

// Handle buy now button
const handleBuyNow = async () => {
  if (checkout.length > 0) {
    const response = await fetch("/src/data/products.json")
    let dataProduct = await response.json()
    checkout.forEach((item) => {
      let amountData = dataProduct.find((product) => product._id == item.id).numOfProductsInStock;
      if (item.amount > amountData) {
        alert(`${item.name} chỉ còn ${amountData} trong kho`)
      } else {
        sessionStorage.setItem("checkout-product", JSON.stringify(checkout))
        if (sale) {
          if (Object.keys(appliedCoupon).length != 0) {
            sessionStorage.setItem("coupon-data", JSON.stringify(appliedCoupon))
          } else {
            sessionStorage.removeItem("coupon-data")
          }
        } else {
          sessionStorage.removeItem("coupon-data")
        }

        window.location = "/src/pages/Checkout.html"
      }
    })
  } else {
    alert("please select product")
  }
}

/***  OTHER PRODUCTS ***/
if (window.location.pathname.includes("Carts.html")) {
  fetch("/src/data/products.json")
    .then((response) => response.json())
    .then((data) => {
      const dataOtherProducts = [];
      while (dataOtherProducts.length < 4) {
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomElement = data[randomIndex];
        if (!dataOtherProducts.includes(randomElement) && !listCart.find((item) => item.id === randomElement.id)) {
          dataOtherProducts.push(randomElement)
        }
      }

      let suggestions = "";

      dataOtherProducts.forEach((item) => {
        suggestions += `
      <div data-id=${item._id} class="cart-container-another-product">
                        <div class="container-another-product">
                            <div class="product-sale">
                                ${item.sale} %
                            </div>
                            <div class="productItem-container">
                                <figure class="image-container" style="background-image: url('${item.img}'); background-size: 'contain';">
                                    <img class="image-other-products" src=${item.img} alt= ${item.name} style="object-fit: 'contain'">
                                </figure>

                                <div class="item-info">
                                    <div class="item-info-first">
                                        <div class="item-price-container">
                                            <p class="item-title">
                                                ${item.name}
                                            </p>
                                            <p class="item-price-before">
                                                ${addDot(item.price)}
                                            </p>
                                            <p class="item-price-after">
                                                ${addDot(parseInt(item.price) + parseInt(item.price) * item.sale / 100)}
                                            </p>
                                        </div>
                                        <div class="item-icon-container">
                                            <span class="iconify footer-container-fifth-item-icon"
                                                data-icon="icon-park-outline:like"></span>
                                        </div>
                                    </div>
                                    <a class="quick-view-detail">
                                        <button>
                                            VIEW DETAIL
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
      `
      })
      // Link to product detail

      document.querySelector('.Carts-container-another-list-products').innerHTML = suggestions;
      let idOtherProducts = document.querySelectorAll('.cart-container-another-product');
      idOtherProducts.forEach((product) => {
        product.addEventListener("click", (e) => {
          let OtherProductId = product.dataset.id;
          window.location.href = `./ProductDetail.html?id=${OtherProductId}`;
        })
      })
    })
}

/***  COUPON SECTION ***/
// Apply coupon button
const applyCoupon = () => {
  let idCoupon = document.getElementById("idCoupon").value;
  let checkCoupon = 0;
  // Check from API fake
  fetch("/src/data/coupon.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        if (idCoupon == item.idCoupon) {
          appliedCoupon = item;
          if (item.value < 1) {
            document.getElementById("total-coupon").innerHTML = (item.value * 100) + "%";
            checkCoupon = 1;
          } else {
            document.getElementById("total-coupon").innerHTML = addDot(item.value);
            checkCoupon = 1;
          }
          return;
        }
      });
      if (checkCoupon == 0) {
        alert("Coupon doesn't exist!");
      }
    })
    .then(() => updateTotalPriceAll())
};

// View Detail Cart Of Other Products


window.onload = () => {
  showCart();
  if (sessionStorage.getItem("coupon-data")) {
    const coupon = JSON.parse(sessionStorage.getItem("coupon-data")).idCoupon || ""
    document.getElementById("idCoupon").value = coupon
    applyCoupon()
  }
};