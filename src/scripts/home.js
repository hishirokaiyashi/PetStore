let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
// function currentSlide(n) {
//   showSlides(slideIndex = n);
// }

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides-home");
  let dots = document.getElementsByClassName("dot");
  if (slides.length === 0) {
    return;
  } else {
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "flex";
    dots[slideIndex - 1].className += " active";
  }
}
// Touch event listeners
let slideshowContainer = document.querySelector(".slideshow-container");
// console.log(slideshowContainer);
let startX, startY;
if (slideshowContainer) {
  slideshowContainer.addEventListener("touchstart", function (event) {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
  });

  slideshowContainer.addEventListener("touchend", function (event) {
    let endX = event.changedTouches[0].clientX;
    let endY = event.changedTouches[0].clientY;
    let diffX = endX - startX;
    let diffY = endY - startY;
    if (Math.abs(diffX) > Math.abs(diffY)) {
      // Horizontal swipe
      if (diffX > 0) {
        plusSlides(-1);
      } else {
        plusSlides(1);
      }
    } else {
      // Vertical swipe
      return;
    }
  });
  setInterval(() => {
    plusSlides(1);
  }, 5000);
}

fetch("/src/data/products.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((element) => {
<<<<<<< HEAD
=======
      const {
        _id,
        name,
        price,
        sale,
        numOfProductsSold,
        img,
        category,
        createdAt,
        updatedAt,
        numOfProductsInStock,
      } = element;
>>>>>>> main
      let queryCarousel = document.querySelector(".carousel");
      if (queryCarousel) {
        queryCarousel.insertAdjacentHTML(
          "beforeend",
          `
          <div data-id=${element._id
          } class="home-container-second-product" draggable="false">
<<<<<<< HEAD
            <div class="productItem-container">
=======
            <a  class="productItem-container">
>>>>>>> main
              <div class="product-sale">
                  -
                  <p>${element.sale}</p>
                  % 
              </div>
              <img
<<<<<<< HEAD
                src="${element.img}"
                class="product-img-item"
                alt="${element.name}"
=======
                src="/assets/images/products-1.png"
                class="product-img-item"
                alt="products-seller-1"
>>>>>>> main
              />
              <div class="item-info-first">
                <div class="item-price-container">
                  <p class="item-title">${element.name}</p>
                  <div class="item-price-before-container">
                  $ 
                  <p class="price-before">${addDot(element.price)}</p>
                  </div>
                  <div class="item-price-after">
                    $ 
                    <p class="price-after">${addDot(
            ((100 - element.sale) / 100) * parseInt(element.price)
          )}</p>
                  </div>
                </div>
                <div class="item-icon-container">
                  <span
                    class="iconify footer-container-fifth-item-icon"
                    data-icon="icon-park-outline:like"
                  >
                  </span>
                </div>
<<<<<<< HEAD
              </div>
              <div class="quick-view-detail">
                <button onclick="addToCart(this, event)" class="btn-add-to-card">
                  Add To Card
                </button>
              </div>
            </div>
=======
              </div>
              <div class="quick-view-detail">
                <button onclick="addToCart(this)" class="btn-add-to-card">
                  Add To Card
                </button>
              </div>
            </a>
>>>>>>> main
          </div>
          `
        );
      }
    });
<<<<<<< HEAD

    let allProducts = document.querySelectorAll('.productItem-container');

    allProducts.forEach((product) => {
      product.addEventListener("click", (e) => {
        e.stopPropagation();
        let dataProductId = product.closest(('[data-id]')).dataset.id;
        window.location.href = `./ProductDetail.html?id=${dataProductId}`;
      })
    })

    function addDot(price) {
      const formattedPrice =
        price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
      return formattedPrice;
    }

    const carousel = document.querySelector(".carousel");
    if (carousel) {
      const firstImg = carousel.querySelectorAll(".productItem-container")[0];
      const arrowIcons = document.querySelectorAll(".prev-products");
      let isDragStart = false,
        isDragging = false,
        prevPageX,
        prevScrollLeft,
        positionDiff;
      const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
      const firstImgWidth = firstImg.clientWidth;
      // const showHideIcons = () => {
      //   // showing and hiding prev/next icon according to carousel scroll left value
      //   let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width

      //   arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
      //   arrowIcons[1].style.display =
      //   carousel.scrollLeft == scrollWidth ? "none" : "block";
      // };

      const check = (a, b) => {
        if (Math.abs(a - b) >= 10) {
          return false;
        } else {
          return true;
        }
      };

      arrowIcons.forEach((icon) => {
        icon.addEventListener("click", (e) => {
          e.preventDefault(); // Add this line to prevent the default behavior of the click event
          carousel.scrollLeft +=
            icon.id == "left" ? -firstImgWidth : firstImgWidth;
          arrowIcons[0].style.display = icon.id == "right" || carousel.scrollLeft > firstImgWidth ? "block" : "none";
          if (
            icon.id == "right" && check(carousel.scrollLeft, maxScrollLeft - firstImgWidth)
          ) {
            arrowIcons[1].style.display = "none";
          } else if (icon.id == "left" && check(carousel.scrollLeft, maxScrollLeft)) {
            arrowIcons[1].style.display = "block";

          } else {
            arrowIcons[1].style.display = check(carousel.scrollLeft, maxScrollLeft) ? "none" : "block"

          }
        });

      });
    }

    // drag
    // const autoSlide = () => {
    //   // if there is no image left to scroll then return from here
    //   if (
    //     carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) >
    //       -1 ||
    //     carousel.scrollLeft <= 0
    //   )
    //   {
    //     return;
    //   }

    //   positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
    //   let firstImgWidth = firstImg.clientWidth + 10;
    //   // getting difference value that needs to add or reduce from carousel left to take middle img center
    //   let valDifference = firstImgWidth - positionDiff;

    //   if (carousel.scrollLeft > prevScrollLeft) {
    //     // if user is scrolling to the right
    //     return (carousel.scrollLeft +=
    //       positionDiff > firstImgWidth / 4 ? valDifference : -positionDiff);
    //   }
    //   // if user is scrolling to the left
    //   carousel.scrollLeft -=
    //     positionDiff > firstImgWidth / 4 ? valDifference : -positionDiff;

    // };

    // const dragStart = (e) => {
    //   e.stopPropagation();
    //   // updatating global variables value on mouse down event
    //   isDragStart = true;
    //   prevPageX = e.pageX || e.touches[0].pageX;
    //   prevScrollLeft = carousel.scrollLeft;
    // };

=======
    const carousel = document.querySelector(".carousel");
    if (carousel) {
      const firstImg = carousel.querySelectorAll(".productItem-container")[0];
      const arrowIcons = document.querySelectorAll(".prev-products");
      let isDragStart = false,
        isDragging = false,
        prevPageX,
        prevScrollLeft,
        positionDiff;
      const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
      const firstImgWidth = firstImg.clientWidth;
      // const showHideIcons = () => {
      //   // showing and hiding prev/next icon according to carousel scroll left value
      //   let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width

      //   arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
      //   arrowIcons[1].style.display =
      //   carousel.scrollLeft == scrollWidth ? "none" : "block";
      // };
      const check = (a, b) => {
        if (Math.abs(a - b) >= 10) {
          return false;
        } else {
          return true;
        }
      };
      arrowIcons.forEach((icon) => {
        icon.addEventListener("click", (e) => {
          e.preventDefault(); // Add this line to prevent the default behavior of the click event
          carousel.scrollLeft +=
            icon.id == "left" ? -firstImgWidth : firstImgWidth;
          arrowIcons[0].style.display = icon.id == "right" || carousel.scrollLeft > firstImgWidth ? "block" : "none";
          if (
            icon.id == "right" && check(carousel.scrollLeft, maxScrollLeft - firstImgWidth)
          ) {
            arrowIcons[1].style.display = "none";
            console.log("carousel.scrollLeft 1", carousel.scrollLeft);
            console.log("maxScrollLeft 1", maxScrollLeft);
            console.log("firstImgWidth 1", firstImgWidth)
          } else if (icon.id == "left" && check(carousel.scrollLeft, maxScrollLeft)) {
            arrowIcons[1].style.display = "block";
            console.log("carousel.scrollLeft 2", carousel.scrollLeft);
            console.log("maxScrollLeft 2 ", maxScrollLeft);
            console.log("firstImgWidth 2", firstImgWidth)

          } else {
            arrowIcons[1].style.display = check(carousel.scrollLeft, maxScrollLeft) ? "none" : "block"
            console.log("carousel.scrollLeft 3 ", carousel.scrollLeft);
            console.log("maxScrollLeft 3 ", maxScrollLeft);
            console.log("firstImgWidth 3", firstImgWidth)

          }
        });
        console.log("carousel.scrollLeft", carousel.scrollLeft);
        console.log("maxScrollLeft", maxScrollLeft);
        console.log("firstImgWidth", firstImgWidth)

      });
    }

    // drag
    // const autoSlide = () => {
    //   // if there is no image left to scroll then return from here
    //   if (
    //     carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) >
    //       -1 ||
    //     carousel.scrollLeft <= 0
    //   )
    //   {
    //     return;
    //   }

    //   positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
    //   let firstImgWidth = firstImg.clientWidth + 10;
    //   // getting difference value that needs to add or reduce from carousel left to take middle img center
    //   let valDifference = firstImgWidth - positionDiff;

    //   if (carousel.scrollLeft > prevScrollLeft) {
    //     // if user is scrolling to the right
    //     return (carousel.scrollLeft +=
    //       positionDiff > firstImgWidth / 4 ? valDifference : -positionDiff);
    //   }
    //   // if user is scrolling to the left
    //   carousel.scrollLeft -=
    //     positionDiff > firstImgWidth / 4 ? valDifference : -positionDiff;

    // };

    // const dragStart = (e) => {
    //   e.stopPropagation();
    //   // updatating global variables value on mouse down event
    //   isDragStart = true;
    //   prevPageX = e.pageX || e.touches[0].pageX;
    //   prevScrollLeft = carousel.scrollLeft;
    // };

>>>>>>> main
    // const dragging = (e) => {
    //   e.stopPropagation();
    //   // scrolling images/carousel to left according to mouse pointer
    //   if (!isDragStart) return;
    //   e.preventDefault();
    //   isDragging = true;
    //   carousel.classList.add("dragging");
    //   positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    //   carousel.scrollLeft = prevScrollLeft - positionDiff;
    //   showHideIcons();
    // };

    // const dragStop = (e) => {
    //   e.stopPropagation();
    //   isDragStart = false;
    //   carousel.classList.remove("dragging");
    //   if (!isDragging) return;
    //   isDragging = false;
    //   autoSlide();
    // };

    // carousel.addEventListener("mousedown", dragStart, true);
    // carousel.addEventListener("touchstart", dragStart, true);

    // document.addEventListener("mousemove", dragging, true);
    // carousel.addEventListener("touchmove", dragging, true);

    // document.addEventListener("mouseup", dragStop, true);
    // carousel.addEventListener("touchend", dragStop, true);
  });
<<<<<<< HEAD
=======

// Add to card

// let listCart = [];
// //check session
// if (localStorage.getItem("listCart")) {
//   listCart = JSON.parse(localStorage.getItem("listCart"));
// }

// const updateAmountLengthCart = () => {
//   let amount = 0;
//   listCart.forEach((item) => {
//     amount += item.amount;
//   })
//   document.getElementById("number-cart").innerText = amount;
// }

// function addToCart(x) {
//   let btn = x.parentElement.parentElement;
//   let img = btn.children[1].src;
//   let name = btn.children[2].children[0].children[0].innerHTML;
//   let price = btn.children[2].children[0].children[2].children[0].innerHTML;
//   let id = x.parentElement.parentElement.parentElement.dataset.id;
//   console.log(id)
//   price = removeDot(price);
//   let sale = btn.children[0].children[0].innerHTML;
//   let amount = 1;
//   //check name
//   //Check item
//   //check item duplicate
//   if (checkNameProduct(name) >= 0) {
//     updateAmountProduct(checkNameProduct(name));
//   } else {
//     let item = { id, img, name, price, amount };
//     listCart.push(item);
//   }
//   // document.getElementById("number-cart").innerText = listCart.length;
//   updateAmountLengthCart();
//   //save session
//   localStorage.setItem("listCart", JSON.stringify(listCart));
// }
// const updateAmountProduct = (location) => {
//   listCart.forEach((item, index) => {
//     if (index == location) {
//       item.amount += 1;
//       return;
//     }
//   });
// };
// const checkNameProduct = (name) => {
//   let location = -1;
//   listCart.forEach((item, index) => {
//     if (item.name == name) {
//       location = index;
//       return;
//     }
//   });
//   return location;
// };

// const increaseAmountProduct = (item) => {
//   let location = item.parentElement.children[0].value; //hidden
//   let amount = item.parentElement.children[2]; //display
//   let index = item.closest(('[data-id]')).dataset.id;
//   // let totalPriceAll = document.getElementById("total-price");
//   // console.log(index)
//   let updatedTotal = 0;
//   let newAmountProduct = 0;
//   listCart.forEach((element, index) => {
//     if (index == location) {
//       //Update listCart
//       newAmountProduct = element.amount + 1;
//       updatedTotal = newAmountProduct * element.price; //price
//       element.amount += 1;
//       return;
//     }
//   })
//   localStorage.setItem("listCart", JSON.stringify(listCart));
//   //show HTML
//   amount.value = newAmountProduct;
//   //total
//   let total = item.parentElement.parentElement.children[3].children[0]; //display total
//   total.innerHTML = addDot(updatedTotal);
//   updateAmountLengthCart();
//   checkout.map((item) => {
//     if (item.id == index) {
//       item.amount = newAmountProduct;
//     }
//   })
//   // totalPriceAll.innerText = checkout.reduce((acc, cur) => acc + (cur.amount * cur.price), 0);
//   updateTotalPriceAll()
// };
// const decreaseAmountProduct = (item) => {
//   let location = item.parentElement.children[0].value; //hidden
//   let amount = item.parentElement.children[2]; //display
//   let updatedTotal = 0;
//   let newAmountProduct = 0;
//   let index = item.closest(('[data-id]')).dataset.id;
//   // let totalPriceAll = document.getElementById("total-price");
//   listCart.forEach((item, index) => {
//     if (index == location) {
//       //Update listCart
//       newAmountProduct = item.amount - 1;
//       if (newAmountProduct < 1) {
//         newAmountProduct = 1;
//         updatedTotal = newAmountProduct * item.price; //price
//       } else {
//         updatedTotal = newAmountProduct * item.price; //price
//         item.amount -= 1;
//       }
//       return;
//     }
//   })
//   localStorage.setItem("listCart", JSON.stringify(listCart));
//   //show HTML
//   amount.value = newAmountProduct;
//   //total
//   let total = item.parentElement.parentElement.children[3].children[0]; //display total
//   total.innerHTML = addDot(updatedTotal);
//   updateAmountLengthCart()
//   checkout.map((item) => {
//     if (item.id == index) {
//       item.amount = newAmountProduct;
//     }
//   })
//   // totalPriceAll.innerText = checkout.reduce((acc, cur) => acc + (cur.amount * cur.price), 0);
//   updateTotalPriceAll()
// };

// function showCart() {
//   let cart = "";
//   let listCart = JSON.parse(localStorage.getItem("listCart")) || [];
//   listCart.forEach((item, index) => {
//     console.log(typeof item.price);
//     // let total = parseInt(`${item.price}`) * parseInt(`${item.amount}`);
//     let total = item.price * parseInt(`${item.amount}`);
//     cart += `
//       <div data-id=${item.id} class="Carts-list-items-container">
//         <div class="Carts-container-middle-first">
//           <input
//             onchange="handleCheckBox(this)"
//             type="checkbox"
//             id="Carts-checkbox"
//             class="shopping-cart-checkbox"
//           />
//           <img
//             src=${item.img}
//             alt=${item.name}
//             class="Cart-img-product"
//           />
//           <span class="Cart-product-title-middle"
//             >${item.name}</span>
//         </div>
//         <div class="Carts-container-middle-second">
//           <span class="Cart-product-price-middle">${addDot(item.price)}</span>
//         </div>
//         <div class="Carts-container-middle-third">
//           <input type="hidden" value="${index}"/>
//           <div onclick="decreaseAmountProduct(this)" class="btn-decrease-number">-</div>
//           <input
//             type="number"
//             name="amount"
//             min="1"
//             max="9999999"
//             type="number"
//             disabled
//             value=${item.amount}
//             class="number-product"
//           />
//           <div onclick="increaseAmountProduct(this)" class="btn-increase-number">+</div>
//         </div>
//         <div class="Carts-container-middle-fourth">
//           $
//           <span class="Cart-product-total-middle">${addDot(total)}</span>
//           <span onclick="handleDelete(this)" class="Cart-product-delete-middle">
//             <span
//               class="iconify cart-btn-delete"
//               data-icon="material-symbols:delete-outline"
//             ></span>
//           </span>
//         </div>
//       </div>
//       `;
//   });
//   if (document.getElementById("showcart")) {
//     document.getElementById("showcart").innerHTML = cart;
//   }
// }

// function addDot(price) {
//   const formattedPrice =
//     price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
//   return formattedPrice;
// }

// function removeDot(price) {
//   const unFormattedPrice = price.replace(".", "").replace("đ", "").trim();
//   return parseInt(unFormattedPrice);
// }

// // document.getElementById("number-cart").innerHTML = listCart.length;
// updateAmountLengthCart();
// // coupon
// let appliedCoupon = {};

// const applyCoupon = () => {
//   let idCoupon = document.getElementById("idCoupon").value;
//   let checkCoupon = 0;
//   fetch("/src/data/coupon.json")
//     .then((response) => response.json())
//     .then((data) => {
//       data.forEach((item) => {
//         if (idCoupon == item.idCoupon) {
//           appliedCoupon = item;
//           if (item.value < 1) {
//             document.getElementById("total-coupon").innerHTML = (item.value * 100) + "%";
//             checkCoupon = 1;
//           } else {
//             document.getElementById("total-coupon").innerHTML = addDot(item.value);
//             checkCoupon = 1;
//           }
//           return;
//         }
//       });
//       if (checkCoupon == 0) {
//         alert("Coupon doesn't exist!");
//       }
//     })
//     .then(() => updateTotalPriceAll())
//   // console.log(appliedCoupon)
//   // updateTotalPriceAll();
// };

// const handleDelete = (item) => {
//   let locationContainer = item.parentElement.parentElement.parentElement;
//   let location = item.parentElement.parentElement
//   const id = location.dataset.id;
//   listCart = listCart.filter((item) => {
//     return !item.id.includes(id);
//   })
//   locationContainer.removeChild(location);
//   localStorage.setItem("listCart", JSON.stringify(listCart))
//   updateAmountProduct();
//   updateAmountLengthCart()
//   let index = item.closest(('[data-id]')).dataset.id;
//   checkout = checkout.filter((item) => item.id !== index);
//   let checkboxes = document.querySelectorAll(".shopping-cart-checkbox");
//   if(checkout.length==listCart.length){
//     checkboxes.forEach((item) => {
//       item.checked = true;
//     })
//     checkout = listCart;
//   }
//   updateTotalPriceAll()
// }
// const updateTotalPriceAll = () => {
//   let totalPriceAll = document.getElementById("total-price");
//   let alertCoupon = document.querySelector(".Carts-alert-coupon");
//   // let coupon = removeDot(document.getElementById("total-coupon").innerHTML);
//   let totalCheckout = checkout.reduce((acc, cur) => acc + (cur.amount * cur.price), 0);
//   if (Object.keys(appliedCoupon).length !== 0) {
//     if (totalCheckout >= appliedCoupon.min) {
//       if (appliedCoupon.value < 1) {
//         totalCheckout = totalCheckout - (totalCheckout * appliedCoupon.value);
//       }
//       else {
//         totalCheckout = totalCheckout - appliedCoupon.value;
//       }
//       alertCoupon.innerHTML = "<p style= 'color:green; margin-bottom:0.25rem; font-size:1rem'>Coupon was applied</p>"
//     }
//     else {

//       alertCoupon.innerHTML = "<p style= 'color:red; margin-bottom:0.25rem; font-size:1rem'>Your order is not suitable for coupon</p>"
//     }

//   }
//   totalPriceAll.innerText = addDot(totalCheckout);
// }

// let checkout = [];
// const handleCheckBox = (item) => {
//   let index = item.parentElement.parentElement.dataset.id;
//   let checkboxes = document.querySelectorAll(".shopping-cart-checkbox")
//   if (item.checked == true) {
//     checkout.push(listCart.find((element) => element.id == index));
//     if (checkout.length == listCart.length) {
//       checkboxes.forEach((item) => {
//         item.checked = true;
//       })
//       checkout = listCart;
//     }
//   } else {
//     checkboxes[0].checked = false;
//     checkout = checkout.filter((item) => item.id !== index);
//   }
//   console.log(checkout)
//   updateTotalPriceAll()
// }

// function handleCheckBoxAll() {
//   let checkboxes = document.querySelectorAll(".shopping-cart-checkbox")
//   if (checkboxes[0].checked) {
//     checkboxes.forEach((item) => {
//       item.checked = true;
//     })
//     checkout = listCart;

//   } else {
//     checkboxes.forEach((item) => {
//       item.checked = false;
//     })
//     checkout = [];
//   }
//   updateTotalPriceAll()
// }
// window.onload = () => {
//   showCart();
// };
>>>>>>> main
