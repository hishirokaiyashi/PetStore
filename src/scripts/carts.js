// Add to card
let listCart = [];
//check session
if (localStorage.getItem("listCart")) {
  listCart = JSON.parse(localStorage.getItem("listCart"));
}

const updateAmountLengthCart = () => {
  let amount = 0;
  listCart.forEach((item) => {
    amount += item.amount;
  })
  document.getElementById("number-cart").innerText = amount;
}

function addToCart(x) {
  let btn = x.parentElement.parentElement;
  let img = btn.children[1].src;
  let name = btn.children[2].children[0].children[0].innerHTML;
  let price = btn.children[2].children[0].children[2].children[0].innerHTML;
  let id = x.parentElement.parentElement.parentElement.dataset.id;
  console.log(id)
  price = removeDot(price);
  let sale = btn.children[0].children[0].innerHTML;
  let amount = 1;
  //check name
  //Check item
  //check item duplicate
  if (checkNameProduct(name) >= 0) {
    updateAmountProduct(checkNameProduct(name));
  } else {
    let item = { id, img, name, price, amount };
    listCart.push(item);
  }
  // document.getElementById("number-cart").innerText = listCart.length;
  updateAmountLengthCart();
  //save session
  localStorage.setItem("listCart", JSON.stringify(listCart));
}
const updateAmountProduct = (location) => {
  listCart.forEach((item, index) => {
    if (index == location) {
      item.amount += 1;
      return;
    }
  });
};
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

const increaseAmountProduct = (item) => {
  let location = item.parentElement.children[0].value; //hidden
  let amount = item.parentElement.children[2]; //display
  let index = item.closest(('[data-id]')).dataset.id;
  // let totalPriceAll = document.getElementById("total-price");
  // console.log(index)
  let updatedTotal = 0;
  let newAmountProduct = 0;
  listCart.forEach((element, index) => {
    if (index == location) {
      //Update listCart
      newAmountProduct = element.amount + 1;
      updatedTotal = newAmountProduct * element.price; //price
      element.amount += 1;
      return;
    }
  })
  localStorage.setItem("listCart", JSON.stringify(listCart));
  //show HTML
  amount.value = newAmountProduct;
  //total
  let total = item.parentElement.parentElement.children[3].children[0]; //display total
  total.innerHTML = addDot(updatedTotal);
  updateAmountLengthCart();
  checkout.map((item) => {
    if (item.id == index) {
      item.amount = newAmountProduct;
    }
  })
  // totalPriceAll.innerText = checkout.reduce((acc, cur) => acc + (cur.amount * cur.price), 0);
  updateTotalPriceAll()
};
const decreaseAmountProduct = (item) => {
  let location = item.parentElement.children[0].value; //hidden
  let amount = item.parentElement.children[2]; //display
  let updatedTotal = 0;
  let newAmountProduct = 0;
  let index = item.closest(('[data-id]')).dataset.id;
  // let totalPriceAll = document.getElementById("total-price");
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
  //show HTML
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

function showCart() {
  let cart = "";
  let listCart = JSON.parse(localStorage.getItem("listCart")) || [];
  listCart.forEach((item, index) => {
    console.log(typeof item.price);
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
          $
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
  if (document.getElementById("showcart")) {
    document.getElementById("showcart").innerHTML = cart;
  }
}

function addDot(price) {
  const formattedPrice =
    price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
  return formattedPrice;
}

function removeDot(price) {
  const unFormattedPrice = price.replace(".", "").replace("đ", "").trim();
  return parseInt(unFormattedPrice);
}

// document.getElementById("number-cart").innerHTML = listCart.length;
updateAmountLengthCart();
// coupon
let appliedCoupon = {};

const applyCoupon = () => {
  let idCoupon = document.getElementById("idCoupon").value;
  let checkCoupon = 0;
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
  // console.log(appliedCoupon)
  // updateTotalPriceAll();
};

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
  if(checkout.length==listCart.length && checkout.length!=0){
    checkboxes.forEach((item) => {
      item.checked = true;
    })
    checkout = listCart;
  }else if(listCart.length==0){
    checkboxes[0].checked=false;
  }
  updateTotalPriceAll()
}
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
    }
    else {

      alertCoupon.innerHTML = "<p style= 'color:red; margin-bottom:0.25rem; font-size:1rem'>Your order is not suitable for coupon</p>"
    }

  }
  totalPriceAll.innerText = addDot(totalCheckout);
}

let checkout = [];

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

function handleCheckBoxAll() {
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
const handleBuyNow = async ()=>{
    if(checkout.length>0){
        const response= await fetch("/src/data/products.json")
        let dataProduct = await response.json()
        checkout.forEach((item)=>{
            let amountData=dataProduct.find((product)=>product._id == item.id).numOfProductsInStock;
            if(item.amount > amountData){
                alert(`${item.name} chỉ còn ${amountData} trong kho`)
            } else{
                sessionStorage.setItem("checkout-product", JSON.stringify(checkout))
                if(Object.keys(appliedCoupon).length!=0){
                    sessionStorage.setItem("coupon-data",JSON.stringify(appliedCoupon))
                }
                window.location = "/src/pages/Checkout.html"
            }
        })
    } else{
        alert("please select product")
    }
}
window.onload = () => {
  showCart();
};