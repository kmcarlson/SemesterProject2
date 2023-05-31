const token = localStorage.getItem("jwt");


if (token) {

  const apiUrl = "https://api.noroff.dev/api/v1/auction/profiles";


  fetch(apiUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      //data
      console.log(data);
    })
    .catch((error) => {
      console.error("En feil oppstod ved henting av data:", error);
    });
} else {
  console.error("JWT-tokenet er ikke tilgjengelig i localStorage.");
}