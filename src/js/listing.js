const auctionListingsUrl = "https://api.noroff.dev/api/v1/auction/listings";

fetch(auctionListingsUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Invalid API response");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data)
    const listings = data.results;

    const auctionListingsElement = document.getElementById("auction-listings");

    listings.forEach((listing) => {
      const listItem = document.createElement("li");
      listItem.classList.add("py-4");

      const idElement = document.createElement("p");
      idElement.textContent = `ID: ${listing.id}`;
      idElement.classList.add("text-gray-600");

      const titleElement = document.createElement("p");
      titleElement.textContent = `Title: ${listing.title}`;

      listItem.appendChild(idElement);
      listItem.appendChild(titleElement);

      auctionListingsElement.appendChild(listItem);
    });
  })
  .catch((error) => {
    console.error(error);
  });
