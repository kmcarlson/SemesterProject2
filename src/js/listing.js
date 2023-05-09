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
    // auctionListingsElement.classList.add("grid");
    // auctionListingsElement.classList.add("grid-cols-1");
    // auctionListingsElement.classList.add("md:grid-cols-2");
    // auctionListingsElement.classList.add("lg:grid-cols-3");
    // auctionListingsElement.classList.add("gap-4");

    listings.forEach((listing) => {
      let listItem = document.createElement("li");
      listItem.classList.add("py-4");
      listItem.classList.add("border");
      listItem.classList.add("border-gray-400");
      listItem.classList.add("rounded-md");
      listItem.classList.add("shadow-md");

      let idElement = document.createElement("p");
      idElement.textContent = `ID: ${listing.id}`;
      idElement.classList.add("text-gray-600");

      let titleElement = document.createElement("p");
      titleElement.textContent = `Title: ${listing.title}`;

      let descriptionElement = document.createElement("p");
      descriptionElement.textContent = `Description: ${listing.description}`;

      let createdElement = document.createElement("p");
      createdElement.textContent = `Created: ${new Date(listing.created).toLocaleDateString()}`;

      let updatedElement = document.createElement("p");
      updatedElement.textContent = `Updated: ${new Date(listing.updated).toLocaleDateString()}`;

      let endsAtElement = document.createElement("p");
      endsAtElement.textContent = `Ends At: ${new Date(listing.endsAt).toLocaleDateString()}`;

      // let mediaElement = null;
      // if (listing.media.startsWith("http")) {
      //   mediaElement = document.createElement("img");
      //   mediaElement.src = listing.media.trim();
      // } else {
      //   mediaElement = document.createElement("p");
      //   mediaElement.textContent = `url: ${listing.media}`;
      // }

      listItem.appendChild(idElement);
      listItem.appendChild(titleElement);
      listItem.appendChild(descriptionElement);
      // listItem.appendChild(mediaElement);
      listItem.appendChild(createdElement);
      listItem.appendChild(updatedElement);
      listItem.appendChild(endsAtElement);

      auctionListingsElement.appendChild(listItem);
    });
  })
  .catch((error) => {
    console.error(error);
  });
