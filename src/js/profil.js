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
      const dataContainer = document.getElementById("dataContainer");
      const dataHTML = `
      <div class="bg-white shadow rounded-lg p-8">
          <h2 class="text-2xl font-bold mb-4">Username: ${data.name}</h2>
          <p class="text-lg mb-2">Email: ${data.email}</p>
          <p class="text-lg mb-2">Credits: ${data.credits}</p>
          <img src="${data.avatar}" alt="Avatar" class="w-32 h-32 rounded-full object-cover mb-4" />
          
        </div>
      `;
      
      console.log(data);
      dataContainer.innerHTML = dataHTML;
    })
    .catch((error) => {
      console.error("En feil oppstod ved henting av data:", error);
    });
} else {
  console.error("JWT-tokenet er ikke tilgjengelig i localStorage.");
}
