window.onload = function () {
  const token = localStorage.getItem("jwt");

  if (token) {
    try {
      const tokenParts = token.split(".");
      const base64Url = tokenParts[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const decodedPayload = JSON.parse(window.atob(base64));
      const name = decodedPayload.sub;

      if (name) {
        const apiUrl = `https://api.noroff.dev/api/v1/auction/profiles?name=${name}`;

        fetch(apiUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.length > 0) {
              const userProfile = data[0];
              console.log(userProfile);
            } else {
              console.log("Ingen profil funnet for det gitte JWT-tokenet og navnet.");
            }
          })
          .catch((error) => {
            console.error("En feil oppstod ved henting av data:", error);
          });
      } else {
        console.error("Navnet er ikke tilgjengelig i JWT-tokenet.");
      }
    } catch (error) {
      console.error("Feil ved dekoding av JWT-tokenet:", error);
    }
  } else {
    console.error("JWT-tokenet er ikke tilgjengelig i localStorage.");
  }
};
