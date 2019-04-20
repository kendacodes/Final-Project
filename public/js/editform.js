var edit = document.getElementById('edit');

document.getElementById('update').addEventListener('click', () => {
  console.log('hello')
  fetch('updateProfile', {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      email: document.getElementById('email').value,
      tagLine: document.getElementById('tagLine').value,
      twitter: document.getElementById('twitter').value,
      instagram: document.getElementById('instagram').value,
      city: document.getElementById('city').value,
      state: document.getElementById('state').value,
      web: document.getElementById('web').value,
      _id: document.getElementById('_id').value
    })
  }).then(function (response) {
    console.log();
    window.location.href='/profile'
})
})
