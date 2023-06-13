const auctionListingsUrl = "https://api.noroff.dev/api/v1/auction/listings";

fetch(auctionListingsUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error("what???");
    }
    return response.json();
  })
  .then((data) => {
    let listings = data;

    let auctionListingsElement = document.getElementById("auction-listings");


    listings.forEach((listing) => {
      let listItem = document.createElement("li");
      listItem.classList.add("px-4");
      listItem.classList.add("py-4");
      listItem.classList.add("border");
      listItem.classList.add("border-gray-400");
      listItem.classList.add("rounded-md");
      listItem.classList.add("shadow-md");

      // ID
      // let idElement = document.createElement("p");
      // idElement.textContent = `ID: ${listing.id}`;
      // idElement.classList.add("text-gray-600");
      // listItem.appendChild(idElement);

      // Title
      let titleElement = document.createElement("h2");
      titleElement.textContent = `Title: ${listing.title}`;
      listItem.appendChild(titleElement);

      // Media
      const media = listing?.media[0];
      if (media && media.match(/^http?/)) {
        const mediaElement = document.createElement("img");
        mediaElement.src = listing.media[0].trim();
        listItem.appendChild(mediaElement);
      }

      // Description
      let descriptionElement = document.createElement("p");
      descriptionElement.textContent = `Description: ${listing.description}`;
      listItem.appendChild(descriptionElement);

      // Created
      let createdElement = document.createElement("p");
      createdElement.textContent = `Created: ${new Date(
        listing.created
      ).toLocaleDateString()}`;
      listItem.appendChild(createdElement);

      // Updated
      let updatedElement = document.createElement("p");
      updatedElement.textContent = `Updated: ${new Date(
        listing.updated
      ).toLocaleDateString()}`;
      listItem.appendChild(updatedElement);

      // Ends at
      let endsAtElement = document.createElement("p");
      endsAtElement.textContent = `Ends At: ${new Date(
        listing.endsAt
      ).toLocaleDateString()}`;
      listItem.appendChild(endsAtElement);

      // bids at
      let bidsElement = document.createElement("p");
      bidsElement.textContent = `bids: ${listing._count.bids}`;
      listItem.appendChild(bidsElement);

      auctionListingsElement.appendChild(listItem);
    });
  })
  .catch((error) => {
    console.error(error);
  });
