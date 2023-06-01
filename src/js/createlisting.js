const token = localStorage.getItem("jwt");
const user = localStorage.getItem("user");

if (token && user) {
  const apiUrl = `https://api.noroff.dev/api/v1/auction/auction/${user}/listings`;

  // Hent DOM-elementer
  const listingForm = document.getElementById('listingForm');

  // Lytt etter innsending av skjema
  listingForm.addEventListener('submit', createListing);

  // Funksjon for å opprette en listeoppføring
  function createListing(event) {
    event.preventDefault();

    // Hent skjemafeltverdier
    const title = document.getElementById('title').value;
    const endsAt = document.getElementById('endsAt').value;
    const description = document.getElementById('description').value;
    const media = document.getElementById('media').value;

    // Valider media-URL
    if (!isValidURL(media)) {
      console.error('Ugyldig media-URL');
      return;
    }

    // Opprett objekt for ny oppføring
    const newListing = {
      title: title,
      endsAt: endsAt,
      description: description,
      media: media
    };

    // Send API-kall for oppretting av oppføringen
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newListing)
    })
      .then(response => response.json())
      .then(data => {
        // Håndter respons fra API
        console.log(data);
        // Gjør andre nødvendige handlinger etter opprettelse av oppføringen
      })
      .catch(error => {
        // Håndter eventuelle feil ved API-kall
        console.error('Error:', error);
      });
  }

  // Funksjon for å validere URL
  function isValidURL(url) {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }
}
