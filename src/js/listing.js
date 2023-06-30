const auctionListingsUrl =
  "https://api.noroff.dev/api/v1/auction/listings?_active=true&_seller=true&_bids=true";
const token = localStorage.getItem("jwt");
const auctionListingsElement = document.getElementById("auction-listings");
const searchInput = document.getElementById("search-input");

fetch(auctionListingsUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    return response.json();
  })
  .then((data) => {
    let listings = data;

    renderListings(listings);

    // Add event listener to search input
    searchInput.addEventListener("input", () => {
      const searchTerm = searchInput.value.trim().toLowerCase();
      const filteredResults = searchListings(listings, searchTerm);
      renderListings(filteredResults);
    });
  })
  .catch((error) => {
    console.error(error);
  });

function renderListings(listings) {
  auctionListingsElement.innerHTML = ""; // Clear existing content

  if (listings.length > 0) {
    listings.forEach((listing) => {
      const listItem = createListingElement(listing);
      auctionListingsElement.appendChild(listItem);
    });
  } else {
    auctionListingsElement.innerHTML = "<p>No results found.</p>";
  }
}

function createListingElement(listing) {
  const listItem = document.createElement("li");
  listItem.classList.add("px-4");
  listItem.classList.add("py-4");
  listItem.classList.add("border");
  listItem.classList.add("border-gray-400");
  listItem.classList.add("rounded-md");
  listItem.classList.add("shadow-md");

  const titleElement = document.createElement("h2");
  titleElement.textContent = `${listing.title}`;
  titleElement.addEventListener("click", () => {
    location.href = `prod.html?id=${listing.id}`;
  });
  titleElement.classList.add("hover:cursor-pointer", "font-bold");
  listItem.appendChild(titleElement);

  const media = listing?.media[0];
  if (media && media.match(/^http?/)) {
    const mediaElement = document.createElement("img");
    mediaElement.src = listing.media[0].trim();
    mediaElement.addEventListener("click", () => {
      location.href = `prod.html?id=${listing.id}`;
    });
    mediaElement.classList.add("hover:cursor-pointer");
    listItem.appendChild(mediaElement);
  }

  const descriptionElement = document.createElement("p");
  descriptionElement.textContent = `Description: ${listing.description}`;
  listItem.appendChild(descriptionElement);

  const createdElement = document.createElement("p");
  createdElement.textContent = `Created: ${new Date(
    listing.created
  ).toLocaleDateString()}`;
  listItem.appendChild(createdElement);

  const updatedElement = document.createElement("p");
  updatedElement.textContent = `Updated: ${new Date(
    listing.updated
  ).toLocaleDateString()}`;
  listItem.appendChild(updatedElement);

  const endsAtElement = document.createElement("p");
  endsAtElement.textContent = `Ends At: ${new Date(
    listing.endsAt
  ).toLocaleDateString()}`;
  listItem.appendChild(endsAtElement);

  const bidsElement = document.createElement("p");
  bidsElement.textContent = `Bids: ${listing._count.bids}`;
  listItem.appendChild(bidsElement);

  const amountElement = document.createElement("p");
  amountElement.textContent = `Latest bid: ${
    listing.bids[listing.bids.length - 1]?.amount
  }`;
  listItem.appendChild(amountElement);
  if (token) {
    const bidAmountInput = document.createElement("input");
    bidAmountInput.type = "number";
    bidAmountInput.placeholder = "Enter your bid";
    bidAmountInput.style.width = "100%";
    listItem.appendChild(bidAmountInput);

    const bidButton = document.createElement("button");
    bidButton.textContent = "Bid";
    bidButton.classList.add(
      "bg-blue-500",
      "hover:bg-blue-600",
      "text-white",
      "px-4",
      "py-2",
      "rounded-lg"
    );
    bidButton.addEventListener("click", () => {
      const bidAmount = parseInt(bidAmountInput.value);
      bidOnListing(listing.id, bidAmount);
    });
    listItem.appendChild(bidButton);
  }

  return listItem;
}

function searchListings(listings, query) {
  const searchTerm = query.toLowerCase();
  return listings.filter((listing) => {
    return (
      listing.title.toLowerCase().includes(searchTerm) ||
      listing.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
      listing.seller.name.toLowerCase().includes(searchTerm)
    );
  });
}

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
        alert("The bid is too low!");
        throw new Error("Invalid bid");
      }
      return response.json();
    })
    .then((data) => {
      location.reload();
      console.log("Bid successful");
    })
    .catch((error) => {
      console.error(error);
    });
}
