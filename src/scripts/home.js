let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

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
      let queryCarousel = document.querySelector(".carousel");
      if (queryCarousel) {
        queryCarousel.insertAdjacentHTML(
          "beforeend",
          `
          <div data-id=${element._id
          } class="home-container-second-product" draggable="false">
            <div class="productItem-container">
              <div class="product-sale">
                  -
                  <p>${element.sale}</p>
                  % 
              </div>
              <img
                src="${element.img}"
                class="product-img-item"
                alt="${element.name}"
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
              </div>
              <div class="quick-view-detail">
                <button onclick="addToCart(this, event)" class="btn-add-to-card">
                  Add To Card
                </button>
              </div>
            </div>
          </div>
          `
        );
      }
    });

    let allProducts = document.querySelectorAll('.productItem-container');

    allProducts.forEach((product) => {
      product.addEventListener("click", (e) => {
        e.stopPropagation();
        let dataProductId = product.closest(('[data-id]')).dataset.id;
        window.location.href = `./ProductDetail.html?id=${dataProductId}`;
      })
    })

    // function addDot(price) {
    //   const formattedPrice =
    //     price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " đ";
    //   return formattedPrice;
    // }

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

      // const maxScrollLeft = 6300 - 1260
      // console.log(carousel.scrollWidth)
      // console.log(carousel.clientWidth)
      // console.log(firstImg.clientWidth)
      // const firstImgWidth = firstImg.clientWidth;
      const firstImgWidth = firstImg.getBoundingClientRect().width + 10;

      // const firstImgWidth = 340;
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
            console.log("haha3")

          }
        });

      });
    }

    const cookiesNotification = document.getElementById('cookies-notification');
    const acceptCookie = document.getElementById('accept-cookie');

    function acceptCookies() {
      // set a cookie
      document.cookie = "accepted_cookies=true; expires=Thu, 01 Jan 2024 00:00:00 UTC; path=/;";

      // hide the notification
      cookiesNotification.style.display = "none";
    }
    acceptCookie.addEventListener('click', acceptCookies);

    //check if cookie is set
    if (document.cookie.indexOf("accepted_cookies=true") >= 0) {
      // hide the notification
      cookiesNotification.style.display = "none";
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
