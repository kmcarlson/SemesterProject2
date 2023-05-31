const token = localStorage.getItem("jwt");
const user = localStorage.getItem("user");

if (token && user) {
  const apiUrl = `https://api.noroff.dev/api/v1/auction/profiles/${user}`;

  fetch(apiUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("En feil oppstod ved henting av data:", error);
    });
} else {
  console.error("JWT-tokenet er ikke tilgjengelig i localStorage.");
}
