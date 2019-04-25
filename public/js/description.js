//
let target = document.getElementsByClassName("pic")

// function run(){
//
//   let picture = this.src
//   console.log(picture);
//
//   if (typeof(Storage) !== "undefined") {
//     // Store
//     localStorage.setItem("picture", picture);
//   } //else {
  //   document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
  // }
// }


Array.from(target).forEach( function(element){ element.addEventListener('click', function(){

      let picture = this.src
      let email = this.getAttribute("data-email")
      console.log("picture: ", picture, "email: ", email);

      if (typeof(Storage) !== "undefined") {
        // Store
        localStorage.setItem("picture", picture);
        localStorage.setItem("email", email);
      } //else {
      //   document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
      // }

    //   fetch('artist', {
    //     method: 'get',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       'email': email
    //     })
    //   }).then(function (response) {
    //     window.location.reload()
    // })
  })
});

let infoBtn = document.getElementsByClassName('box')
Array.from(infoBtn).forEach(function(element) {
      element.addEventListener('click', function(){
        let firstName = this.parentNode.childNodes[1].childNodes[0].getAttribute('data-firstName')
        let lastName = this.parentNode.childNodes[1].childNodes[0].getAttribute('data-lastName')
        let caption = this.parentNode.childNodes[1].childNodes[0].getAttribute('data-caption')
        const info = this.parentNode.parentNode.parentNode.childNodes[5]
        info.id= "popup1"
        info.childNodes[1].childNodes[1].childNodes[1].innerHTML = 'This is the work of: '
        info.childNodes[1].childNodes[1].childNodes[3].innerHTML = firstName + " " +lastName
        info.childNodes[1].childNodes[5].childNodes[1].innerHTML = "Titled: " +caption
      })
});
