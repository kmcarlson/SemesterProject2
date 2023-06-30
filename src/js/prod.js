
const token = localStorage.getItem("jwt");

window.onload=()=>{
// Get the ID from the URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');

  // Use the ID as needed
  console.log('Received ID:', id);
  fetchProduct(id)
}


const fetchProduct = async (id) => {
const result = await fetch(`https://api.noroff.dev/api/v1/auction/listings/${id}?_active=true&_seller=true&_bids=true`)
createProductCard(await result.json());
}


const createProductCard = (product) => {
    
    const {title,description,bids, media} = product;


    const wrapper = document.getElementById("produt-card-wrapper")

    const productCard = document.createElement('div')


    let imgSrc;
    if (media[0] && media[0].match(/^http?/)) {
        imgSrc = media[0].trim();
    }

    productCard.innerHTML += `
    <h1> ${title}</h1>
    <p>${description}</p>
    <img src=${imgSrc} />
 
    

    `

    wrapper.appendChild(productCard);
    wrapper.appendChild(ListBiddings(bids));
}


const ListBiddings = (bids) => {
const table = document.createElement('table')
table.innerHTML += `<tr>
    <th>Bidder</th>
    <th>Bid amount</th>
</tr>`

    bids.forEach(bid => {
    table.innerHTML += `<tr>
    <td>${bid.bidderName}</td>
    <td>${bid.amount}</td>
</tr>`
        
        
    });
 return table;
}
