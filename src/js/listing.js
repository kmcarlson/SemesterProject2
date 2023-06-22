const auctionListingsUrl = "https://api.noroff.dev/api/v1/auction/listings";
const token = localStorage.getItem("jwt");

fetch(auctionListingsUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Something went wrong");
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

      let titleElement = document.createElement("h2");
      titleElement.textContent = `Title: ${listing.title}`;
      listItem.appendChild(titleElement);

      const media = listing?.media[0];
      if (media && media.match(/^http?/)) {
        const mediaElement = document.createElement("img");
        mediaElement.src = listing.media[0].trim();
        listItem.appendChild(mediaElement);
      }

      let descriptionElement = document.createElement("p");
      descriptionElement.textContent = `Description: ${listing.description}`;
      listItem.appendChild(descriptionElement);

      let createdElement = document.createElement("p");
      createdElement.textContent = `Created: ${new Date(
        listing.created
      ).toLocaleDateString()}`;
      listItem.appendChild(createdElement);

      let updatedElement = document.createElement("p");
      updatedElement.textContent = `Updated: ${new Date(
        listing.updated
      ).toLocaleDateString()}`;
      listItem.appendChild(updatedElement);

      let endsAtElement = document.createElement("p");
      endsAtElement.textContent = `Ends At: ${new Date(
        listing.endsAt
      ).toLocaleDateString()}`;
      listItem.appendChild(endsAtElement);

      let bidsElement = document.createElement("p");
      bidsElement.textContent = `Bids: ${listing._count.bids}`;
      listItem.appendChild(bidsElement);

      let bidAmountInput = document.createElement("input");
      bidAmountInput.type = "number";
      bidAmountInput.placeholder = "Enter bid amount";
      listItem.appendChild(bidAmountInput);

      let bidButton = document.createElement("button");
      bidButton.textContent = "Bid";
      bidButton.addEventListener("click", () => {
        let bidAmount = bidAmountInput.value;
        bidOnListing(listing.id, bidAmount);
      });
      listItem.appendChild(bidButton);

      auctionListingsElement.appendChild(listItem);
    });
  })
  .catch((error) => {
    console.error(error);
  });

function bidOnListing(listingId, bidAmount) {
  const bidUrl = `https://api.noroff.dev/api/v1/auction/listings/${listingId}/bids`;

  fetch(bidUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      amount: bidAmount,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("No for bid");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Woho");
     
    })
    .catch((error) => {
      console.error(error);
    });
}
