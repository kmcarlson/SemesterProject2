const token = localStorage.getItem("jwt");
const user = localStorage.getItem("user");

if (token && user) {
  const apiUrl = `https://api.noroff.dev/api/v1/auction/listings`;

  const listingForm = document.getElementById("listingForm");

  listingForm.addEventListener("submit", createListing);

  function createListing(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const endsAt = document.getElementById("endsAt").value;
    const description = document.getElementById("description").value;
    const media = document.getElementById("media").value;

    if (!isValidURL(media)) {
      console.error("Ugyldig media-URL");
      return;
    }

    const newListing = {
      title: title,
      endsAt: endsAt,
      description: description,
      media: [media],
    };

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newListing),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.open("profil.html");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function isValidURL(url) {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }
}
