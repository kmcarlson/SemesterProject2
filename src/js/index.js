const images = document.querySelectorAll(".slider img");
let currentImage = 0;

setInterval(() => {
  images[currentImage].style.opacity = 0;
  currentImage = (currentImage + 1) % images.length;
  images[currentImage].style.opacity = 1;
}, 3000);

const btnLogin = document.getElementById("btnLogin");
const btnRegister = document.getElementById("btnRegister");
const btnProfile = document.getElementById("btnProfile");
const btnLogout = document.getElementById("btnLogout");

btnLogout.onclick = function() {
  localStorage.removeItem("jwt");
  location.reload();
}

if (localStorage.getItem("jwt")) {
  btnLogin.classList.add("hidden");
  btnRegister.classList.add("hidden");
  btnLogout.classList.add("block");
  btnProfile.classList.add("block");
} else {
  btnLogout.classList.add("hidden");
  btnProfile.classList.add("hidden");
  btnLogin.classList.add("block");
  btnRegister.classList.add("block");
}
