const images = document.querySelectorAll(".slider img");
let currentImage = 0;

setInterval(() => {
  images[currentImage].style.opacity = 0;
  currentImage = (currentImage + 1) % images.length;
  images[currentImage].style.opacity = 1;
}, 3000);
