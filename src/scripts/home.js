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
        <a href="/src/pages/Carts.html" class="home-container-second-product" draggable="false">
          <div class="productItem-container">
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
                <p class="item-price-before">$ ${price}</p>
                <p class="item-price-after">
                  $ ${((100 - sale) / 100) * price}
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
                <button>VIEW DETAIL</button>
              </div>
          </div>
        </a>
        `
      );
    });
    const carousel = document.querySelector(".carousel"),
          firstImg = carousel.querySelectorAll(".productItem-container")[0],
          arrowIcons = document.querySelectorAll(".prev-products");
    let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;
    const showHideIcons = () => {
      // showing and hiding prev/next icon according to carousel scroll left value
      let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
      arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
      arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
    }

    arrowIcons.forEach(icon => {
      icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 10; // getting first img width & adding 14 margin value
        // if clicked icon is left, reduce width value from the carousel scroll left else add to it
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
      });
    });

    const autoSlide = () => {
      // if there is no image left to scroll then return from here
      if (carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;

      positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
      let firstImgWidth = firstImg.clientWidth + 10;
      // getting difference value that needs to add or reduce from carousel left to take middle img center
      let valDifference = firstImgWidth - positionDiff;

      if (carousel.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
        return carousel.scrollLeft += positionDiff > firstImgWidth / 4 ? valDifference : -positionDiff;
      }
      // if user is scrolling to the left
      carousel.scrollLeft -= positionDiff > firstImgWidth / 4 ? valDifference : -positionDiff;
    }

    const dragStart = (e) => {
      e.stopPropagation();
      // updatating global variables value on mouse down event
      isDragStart = true;
      prevPageX = e.pageX || e.touches[0].pageX;
      prevScrollLeft = carousel.scrollLeft;
    }

    const dragging = (e) => {
      e.stopPropagation();
      // scrolling images/carousel to left according to mouse pointer
      if (!isDragStart) return;
      e.preventDefault();
      isDragging = true;
      carousel.classList.add("dragging");
      positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
      carousel.scrollLeft = prevScrollLeft - positionDiff;
      showHideIcons();
    }

    const dragStop = (e) => {
      e.stopPropagation();
      isDragStart = false;
      carousel.classList.remove("dragging");
      if (!isDragging) return;
      isDragging = false;
      autoSlide();
    }

    carousel.addEventListener("mousedown", dragStart,true);
    carousel.addEventListener("touchstart", dragStart,true);

    document.addEventListener("mousemove", dragging,true);
    carousel.addEventListener("touchmove", dragging,true);

    document.addEventListener("mouseup", dragStop,true);
    carousel.addEventListener("touchend", dragStop,true);
});
