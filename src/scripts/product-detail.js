// lấy id của sản phẩm từ query string
const productId = new URLSearchParams(window.location.search).get("id");


if (productId) {
  // Update cart quantity
  let listCart = [];
  let relatedProducts = [];

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
  updateAmountLengthCart();

  //fetch data từ file product JSON
  fetch("/src/data/products.json")
    .then(response => response.json())
    .then(data => {
      // tìm kiếm sản phẩm theo id
      const product = data.find(product => product._id === productId)
      if (product) {
        // console.log(product);
        // nếu sản phẩm tồn tại, hiển thị thông tin sản phẩm
        document.title = product.name + " | PetStore"
        
        const productImage = document.querySelector(".product-img");
        productImage.src = product.img;
        productImage.alt = product.name;
        const productName = document.querySelector(".product-name");
        productName.textContent = product.name;
        const productRating = document.querySelector(".product-rating-number");
        productRating.textContent = "(" + product.rate + "/5)";
        const productSold = document.querySelector(".product-sold-amount");
        productSold.textContent = product.numOfProductsSold;
        const productPriceBeforeDiscount = document.querySelector(".product-price-before-discount");
        productPriceBeforeDiscount.textContent = addDot(product.price);
        const productPriceAfterDiscount = document.querySelector(".product-price-after-discount");
        productPriceAfterDiscount.textContent = addDot(((100 - product.sale) / 100) * product.price);
        const productDiscount = document.querySelector(".product-discount");
        productDiscount.textContent = "-" + product.sale + "% off";
        const productName2 = document.querySelector(".product-detail-information-overview-product-name");
        productName2.textContent = product.name;
        const productCategory = document.querySelector(".product-detail-information-overview-product-category");
        productCategory.textContent = product.category;
      } else {
        // nếu sản phẩm không tồn tại, hiển thị thông báo lỗi
        console.error(`Không tìm thấy sản phẩm có id là ${productId}`);
      }
      // Get related products
      while (relatedProducts.length < 4) {
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomElement = data[randomIndex];
        if (!relatedProducts.includes(randomElement)) {
          relatedProducts.push(randomElement)
        }
      }

          if (relatedProducts) {
        // If related products do exist, display them in html div tag
        const relatedProductsContainer = document.querySelector(".related-product");
        relatedProductsContainer.innerHTML = relatedProducts.map(product => {
          return `
          <div data-id=${product._id} class="cart-product" draggable="false">
            <div class="productItem-container">
              <div class="product-sale">-<p>${product.sale}</p>% 
              </div>
              <img src="${product.img}" class="product-img-item" alt="${product.name}"/>
              <div class="item-info-first">
                <div class="item-price-container">
                  <p class="item-title">${product.name}</p>
                  <div class="item-price-before-container">
                    <p class="price-before">${addDot(product.price)}</p>
                  </div>
                  <div class="item-price-after">
                    <p class="price-after">${addDot(((100 - product.sale) / 100) * parseInt(product.price))}</p>
                  </div>
                </div>
                <div class="item-icon-container">
                  <span class="iconify footer-container-fifth-item-icon" data-icon="icon-park-outline:like">
                  </span>
                </div>
              </div>
              <div class="quick-view-detail">
                <button onclick="addToCart(this, event)" class="btn-add-to-card">
                  Add To Card
                </button>
              </div>
            </div>
          </div>
      `
        }).join("");

        document.querySelectorAll(".card-product").forEach((item) => item.addEventListener("click",() => {
const id = item.getAttribute("data-id");
        window.location.href = `./ProductDetail.html?id=${id}`;
        }))
      } else {
        // nếu sản phẩm không tồn tại, hiển thị thông báo lỗi
        console.error(`Không tìm thấy sản phẩm tương tự`);
      }
    })
    .catch(error => {
      console.error("Đã xảy ra lỗi khi fetch data từ file JSON: ", error);
    });

  // fetch data từ file product details JSON
  fetch("/src/data/product-details.json")
    .then(response => response.json())
    .then(data => {

      // tìm kiếm sản phẩm theo id
      const productInfo = data.find(product => product.product === productId)
      if (productInfo) {
        // console.log(productInfo);
        // nếu sản phẩm tồn tại, hiển thị thông tin sản phẩm
        const productStock = document.querySelector(".product-detail-information-overview-product-stock");
        productStock.textContent = productInfo.numOfProductsInStock;
        const productDescription = document.querySelector(".product-detail-information-overview-product-description");
        productDescription.textContent = productInfo.description;
        const productRate = document.querySelector(".product-detail-rating-number");
        productRate.textContent = productInfo.numOfRate + "/5" + "  |  ";
        const productReview = document.querySelector(".product-detail-rating-review p");
        productReview.textContent = productInfo.numOfProductsReview + " reviews";

      } else {
        // nếu sản phẩm không tồn tại, hiển thị thông báo lỗi
        console.error(`Không tìm thấy sản phẩm có id là ${productId}`);
      }
    })
    .catch(error => {
      console.error("Đã xảy ra lỗi khi fetch data từ file JSON: ", error);
    });

  //related products
  // fetch("/src/data/products.json")
  //   .then(response => response.json())
  //   .then(data => {
  //     const dataOtherProducts = [];
  //     // while (dataOtherProducts.length < 4) {
  //     //   const randomIndex = Math.floor(Math.random().length);
  //     //   const randomproduct = data[randomIndex];
  //     //   if (!dataOtherProducts.includes(randomElement)) {
  //     //     dataOtherProducts.push(randomElement)
  //     //   }
  //     // }
  //     console.log(dataOtherProducts)
  //     // let otherProductsData = "";
  //     // console.log(dataOtherProducts)
  //   })
  //   .catch(error => {
  //     console.error("xảy ra lỗi khi fetch")
  //   })

  // fetch("/src/data/products.json")
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log(data);
  //     // tìm kiếm sản phẩm theo id
  //     const relatedProducts = data.filter(product => product.category && product._id !== productId)
  //     if (relatedProducts) {
  //       // nếu sản phẩm tồn tại, hiển thị thông tin sản phẩm
  //       const relatedProductsContainer = document.querySelector(".related-product");
  //       relatedProductsContainer.innerHTML = relatedProducts.map(product => {
  //         return `
  //     <div class="card-product" data-id="${product._id}">
  //               <div class="card-product-img-top">
  //                   <img src="${product.img}" alt="" class="card-product-img">
  //                   <span class="card-product-name">${product.name}</span>
  //               </div>
  //               <div class="card-product-bottom">
  //                   <div class="card-product-price">
  //                       <span class="card-product-price-before-discount">${product.price}</span>
  //                       <b class="card-product-price-discount">${((100 - product.sale) / 100) * product.price}</b>
  //                   </div>
  //                   <div class="card-product-rate-detail">
  //                       <div class="rating-star">
  //                           <span class="iconify" data-icon="material-symbols:star-rounded"></span>
  //                           <span class="iconify" data-icon="material-symbols:star-rounded"></span>
  //                           <span class="iconify" data-icon="material-symbols:star-rounded"></span>
  //                           <span class="iconify" data-icon="material-symbols:star-rounded"></span>
  //                           <span class="iconify" data-icon="material-symbols:star-rounded"></span>
  //                       </div>
  //                   </div>
  //                   <div class="card-product-sold">
  //                       <span class="card-product-sold-number">${product.numOfProductsSold}</span>
  //                       <span class="card-product-sold-text">Sold</span>
  //                   </div>
  //               </div>
  //               <div class="card-product-discount">
  //                   <img src="../../assets/imgs/Bookmark.png" alt="sale discount" class="product-discount-bookmark">
  //                   <span class="card-product-discount-text">-${product.sale}%</span>
  //               </div>
  //               <div class="card-product-buy-now">
  //                   <button class="card-product-buy-now-btn">
  //                       Buy now <iconify-icon icon="material-symbols:shopping-cart-rounded"></iconify-icon>
  //                   </button>
  //               </div>
  //           </div>
  //     `
  //       }).join("");
  //     } else {
  //       // nếu sản phẩm không tồn tại, hiển thị thông báo lỗi
  //       console.error(`Không tìm thấy sản phẩm có id là ${productId}`);
  //     }
  //   })

  //increase and decrease quantity
  const decreaseQuantity = document.querySelector(".product-order-amount-input-button-decrease");
  const increaseQuantity = document.querySelector(".product-order-amount-input-button-increase");
  const quantity = document.querySelector(".product-order-amount-input-text");
  let quantityValue = 1;
  quantity.addEventListener("change", () => {
    if (quantity.value < 1) {
      quantity.value = 1;
    }
  })
  decreaseQuantity.addEventListener("click", () => {
    if (quantityValue > 1) {
      quantityValue--;
      quantity.value = quantityValue;
    }
  });
  increaseQuantity.addEventListener("click", () => {
    quantityValue++;
    quantity.value = quantityValue;
  });

  function removeDot(price) {
    const unFormattedPrice = price.replace(".", "").replace("đ", "").trim();
    return parseInt(unFormattedPrice);
  }
  function addDot(price) {
    const formattedPrice =
      price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
    return formattedPrice;
  }

  function addToCart(x) {
    let id = productId;
    let img = document.querySelector(".product-img").src;
    let name = document.querySelector(".product-name").innerHTML;
    let price = document.querySelector(".product-price-after-discount").innerHTML;
    price = removeDot(price)
    let amount = parseInt(quantity.value);
    let item = { id, img, name, price, amount };
    if (!listCart.find((cart) => cart.id == id)) {
      listCart.push(item);
    } else {
      listCart.forEach((cart) => {
        if (cart.id === id) {
          cart.amount += amount;
        }
      })
    }
    updateAmountLengthCart();
    localStorage.setItem("listCart", JSON.stringify(listCart));

    // Add list cart to indexedDB
  const currentUserID = JSON.parse(localStorage.getItem("loggedInUser")).id || null;;
  if(currentUserID) {
    updateCartDB(currentUserID, listCart)
  }
  }

// Update cart in users store with indexedDB according to user id
  const updateCartDB =  (id, cart) => {
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

  // BuyNow
  const handleBuyNow = () => {
    let id = productId;
    let img = document.querySelector(".product-img").src;
    let name = document.querySelector(".product-name").innerHTML;
    let price = document.querySelector(".product-price-after-discount").innerHTML;
    price = removeDot(price)
    let amount = parseInt(quantity.value);
    let item = { id, img, name, price, amount };
    sessionStorage.setItem("checkout-product", JSON.stringify([item]));
    window.location = "/src/pages/Checkout.html"
  }
  document.querySelector('.product-order-button-buy-now').addEventListener("click", handleBuyNow)
}
    // price = removeDot(price);

    // let sale = btn.children[0].children[0].innerHTML;
    //check name
    //Check item
    //check item duplicate
    // if (checkNameProduct(name) >= 0) {
    //   updateAmountProduct(checkNameProduct(name));
    // } else {
    //   let item = { id, img, name, price, amount };
    //   listCart.push(item);
    // }
    // // document.getElementById("number-cart").innerText = listCart.length;
    // updateAmountLengthCart();
    // //save session
    // localStorage.setItem("listCart", JSON.stringify(listCart));

    function openDetails(evt, detailsName) {
      // Declare all variables
      var i, tabcontent, tablinks;
    
      // Get all elements with class="tabcontent" and hide them
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
    
      // Get all elements with class="tablinks" and remove the class "active"
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
    
      // Show the current tab, and add an "active" class to the button that opened the tab
      document.getElementById(detailsName).style.display = "block";
      evt.currentTarget.className += " active";
    }
    document.getElementById("defaultOpen").click();