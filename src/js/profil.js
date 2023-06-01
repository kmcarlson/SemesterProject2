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
          
          <div class="flex items-center">
            ${data.avatar ? `<img src="${data.avatar}" alt="Avatar" id="avatarImg" class="w-32 h-32 rounded-full object-cover mb-4">` : `<p class="text-lg">We miss your avatar :( </p>`}
          </div>
          <div>
            <input type="text" id="avatarUrlInput" class="mt-2" placeholder="Enter new avatar URL" />
            <button id="avatarBtn" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 mb-4">Change Avatar</button>
          </div>
        </div>
      `;

      dataContainer.innerHTML = dataHTML;

      const avatarImg = document.getElementById("avatarImg");
      const avatarUrlInput = document.getElementById("avatarUrlInput");
      const avatarBtn = document.getElementById("avatarBtn");

      avatarBtn.addEventListener("click", () => {
        const newAvatarUrl = avatarUrlInput.value.trim();
        if (newAvatarUrl) {
          const updateUrl = `https://api.noroff.dev/api/v1/auction/profiles/${user}/media`;

          fetch(updateUrl, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              avatar: newAvatarUrl,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data,data.avatar)
              avatarImg.src = data.avatar;
              console.log("Avatar changed successfully.");
            })
            .catch((error) => {
              console.error("An error occurred while updating the avatar:", error);
            });
        } else {
          console.error("New avatar URL is required.");
        }
      });

      const listingsApiUrl = `https://api.noroff.dev/api/v1/auction/profiles/${user}/listings`;

      fetch(listingsApiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const listDataContainer = document.getElementById("listDataContainer");

          if (data.length > 0) {
            const listingsHTML = data
           
              .map(
                (listing) => `
                  <div class="bg-white shadow rounded-lg p-8 mb-4">
                    <h2 class="text-2xl font-bold mb-4">Title: ${listing.title}</h2>
                    <p class="text-2xl font-bold mb-4">ID: ${listing.id}</p>
                    <p class="text-lg mb-2">Description: ${listing.description}</p>
                    <p class="text-lg mb-2">Tags: ${listing.tags}</p>
                    <p class="text-lg mb-2">Media: ${listing.media}</p>
                    <p class="text-lg mb-2">Ends At: ${listing.endsAt}</p>
                    <p class="text-lg mb-2">Bids: ${listing._count.bids}</p>
                   
                  </div>
                `
              )
              .join("");

            listDataContainer.innerHTML = listingsHTML;
            console.log(data)
          } else {
            listDataContainer.innerHTML = "<p class='text-lg'>No listings found.</p>";
          }
        })
        .catch((error) => {
          console.error("An error occurred while fetching data:", error);
        });
    })
    .catch((error) => {
      console.error("An error occurred while fetching data:", error);
    });
} else {
  console.error("JWT token is not available in localStorage.");
}