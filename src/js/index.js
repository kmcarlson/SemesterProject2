const btnLogin = document.getElementById("btnLogin");
const btnRegister = document.getElementById("btnRegister");
const btnProfile = document.getElementById("btnProfile");
const btnLogout = document.getElementById("btnLogout");

btnLogout.onclick = function () {
  localStorage.removeItem("jwt");
  localStorage.removeItem("user");
  location.reload();
};

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
