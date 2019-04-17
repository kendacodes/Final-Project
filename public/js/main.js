var menu= document.getElementsByClassName("fa-ellipsis-h");
var trash = document.getElementsByClassName("fa-trash");
var edit = document.getElementById('edit');

Array.from(menu).forEach(function(element) {
  element.addEventListener('click', function(){
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const msg = this.parentNode.parentNode.childNodes[3].innerText
    const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
    fetch('creations', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'name': name,
        'msg': msg,
        'thumbUp':thumbUp
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
  });
});

Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function(){
    console.log(trash);
    const id = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.childNodes[1].id
    const caption = this.parentNode.parentNode.parentNode.childNodes[3].innerText
    fetch('creations', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        '_id': id,
        'caption': caption
      })
    }).then(function (response) {
      window.location.reload()
  })
  })
});

document.getElementById('update').addEventListener('click', () => {
  console.log('hello')
  fetch('updateProfile', {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      profilePic: document.getElementById('profilePic').value,
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
    window.location.reload()
})
})
