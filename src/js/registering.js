const form = document.getElementById('registration-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  fetch('https://api.noroff.dev/api/v1/auction/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: username,
      email: email,
      password: password
    })
  })
  .then(response => {
    if (response.status === 201) {
      console.log("NICE")
    } else {
      // Handle error response
    }
  })
  .catch(error => {
    // Handle network error
  });
});
