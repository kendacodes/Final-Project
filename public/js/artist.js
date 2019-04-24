window.onload = function() {
  get();

};

function get(){
   let wow = document.getElementById("pic")
   let wow2 = wow.getAttribute('data-email')
   console.log("1", wow, "2", wow2);
  // Retrieve pic
  wow.src = localStorage.getItem("picture");
  wow.setAttribute('data-email', localStorage.getItem('email'))
  wow2 = localStorage.getItem("email")

console.log("got the mail: ", localStorage.getItem("email"));

}

let selected= document.getElementsByClassName('collection')

Array.from(selected).forEach( function(element){ element.addEventListener('click', function run(){
  let source = this.src
      console.log(source);
      document.getElementById("pic").src = source;
    }
  )
});
