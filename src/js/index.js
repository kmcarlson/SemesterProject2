window.onload = function () {
    const form = document.getElementById("login");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      try {
        const response = await fetch("https://api.noroff.dev/api/v1/auction/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, password }),
        });
  
        if (response.ok) {
          const { jwt } = await response.json();
          localStorage.setItem("jwt", jwt);
          window.open("https://www.google.com", "_blank");
        } else {
          throw new Error("login failed");
        }
      } catch (error) {
        console.error(error);
        alert("dude wrong password!");
      }
    });
  };
  