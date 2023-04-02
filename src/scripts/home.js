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
// Touch event listeners
let slideshowContainer = document.querySelector(".slideshow-container");
let startX, startY;

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

fetch("/src/data/products.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((element) => {
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
      document.querySelector(".carousel").insertAdjacentHTML(
        "beforeend",
        `
        <div class="home-container-second-product" draggable="false">
          <a  class="productItem-container">
            <p class="product-sale">
                -${sale}% 
            </p>
            <img
              src="/assets/images/products-1.png"
              class="product-img-item"
              alt="products-seller-1"
            />
            <div class="item-info-first">
              <div class="item-price-container">
                <p class="item-title">${name}</p>
                <div class="item-price-before-container">
                $ 
                <p class="price-before">${price}</p>
                </div>
                <p class="item-price-after">
                  $ 
                  <p class="price-after">${((100 - sale) / 100) * price}</p>
                </p>
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
              <button onclick="addToCart(this)" class="btn-add-to-card">
                Add To Card
              </button>
            </div>
          </a>
        </div>
        `
      );
    });

    const carousel = document.querySelector(".carousel"),
      firstImg = carousel.querySelectorAll(".productItem-container")[0],
      arrowIcons = document.querySelectorAll(".prev-products");
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
    arrowIcons.forEach(icon => {
      icon.addEventListener("click", (e) => {
        e.preventDefault(); // Add this line to prevent the default behavior of the click event

        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        arrowIcons[0].style.display = icon.id == "right" || carousel.scrollLeft > firstImgWidth ? "block" : "none";
        if (icon.id == "right" && Math.ceil(carousel.scrollLeft) == maxScrollLeft - firstImgWidth ) {
          arrowIcons[1].style.display = "none"
        }
        else if (icon.id == "left" && Math.ceil(carousel.scrollLeft) == maxScrollLeft) {
          arrowIcons[1].style.display = "block"
        }
        else {
          arrowIcons[1].style.display = Math.ceil(carousel.scrollLeft) == maxScrollLeft ? "none" : "block";
        }
        console.log("carousel.scrollLeft",Math.ceil(carousel.scrollLeft));
        console.log("maxScrollLeft",maxScrollLeft)
        console.log("firstImgWidth",firstImgWidth)
      }
      );
    });

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

// Add to card

let listCart = [];

function addToCart(x) {
  // console.log(x.parentElement)
  // let btn = x.parentElement.parentElement;
  // let img = btn.children[1].src;
  // let name = btn.children[2].children[0].children[0];
  let container = document.querySelector('.productItem-container');
  let img = container.querySelector('.product-img-item').src;
  let name = container.querySelector('.item-title').innerHTML;
  let price = container.querySelector('.price-after').innerHTML;
  let amount = 1;
  let item = { img, name, price, amount };
  listCart.push(item)
  //check item duplicate
  //save session
  sessionStorage.setItem("listCart",JSON.stringify(listCart))
  console.log(listCart)
  document.getElementById("number-cart").innerText = listCart.length;
}
