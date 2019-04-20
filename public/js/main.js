var menu= document.getElementsByClassName("fa-ellipsis-h");
var trash = document.getElementsByClassName("fa-trash");


;

Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function(){
    console.log(trash);
    const id = this.parentNode.parentNode.parentNode.parentNode.childNodes[1].id
    console.log('<<<<DELETING THIS ID>>>>', id);
    fetch('creations', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        '_id': id
      })
    }).then(function (response) {
      window.location.reload()
  })
  })
});
