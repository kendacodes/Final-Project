const artworkID = document.getElementById('artworkID').value
var checkoutHandler = StripeCheckout.configure({
  key: "pk_test_5iv0q7ztrriQIVAci6QGsEqr001ul7VZVH",
  locale: "auto"
});
function handleToken(token) {
  console.log('running')
  fetch("/charge", {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      'token': token,
      '_id': artworkID
    })
  })
  .then(output => {
    window.location.href='/gallery'
    if (output.status === "succeeded")
    document.getElementById("shop").innerHTML = "<p>Purchase complete!</p>";
  })
}
var button = document.getElementById("buttonCheckout");
button.addEventListener("click", function(ev) {
  ev.preventDefault()
  checkoutHandler.open({
    name: "VIA Studios",
    description: "Art purpose",
    token: handleToken
  });
});
