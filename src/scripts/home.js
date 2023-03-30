
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides-home");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
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
let slideshowContainer = document.querySelector('.slideshow-container');
let startX, startY;

slideshowContainer.addEventListener('touchstart', function (event) {
  startX = event.touches[0].clientX;
  startY = event.touches[0].clientY;
});

slideshowContainer.addEventListener('touchend', function (event) {
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
  plusSlides(1)
}, 3000)

// slider for products
