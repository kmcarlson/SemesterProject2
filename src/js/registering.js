const form = document.getElementById("registration-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("errorMsg");

  if (errorMessage.children.length > 1) {
    errorMessage.innerHTML = "";
  }

  fetch("https://api.noroff.dev/api/v1/auction/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: username,
      email: email,
      password: password,
    }),
  })
    .then(async (response) => {
      if (response.status === 201) {
        window.open("login.html");
      } else {
        const { errors } = await response.json();

        errors.forEach((error) => {
          errorMessage.innerHTML += `
          <p class="text-red-600">* ${error.message}</p>
          `;
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});
