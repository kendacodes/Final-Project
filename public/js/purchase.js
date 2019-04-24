var checkoutHandler = StripeCheckout.configure({
key: "pk_test_5iv0q7ztrriQIVAci6QGsEqr001ul7VZVH",
locale: "auto"
});
function handleToken(token) {
fetch("/charge", {
method: "POST",
headers: {"Content-Type": "application/json"},
body: JSON.stringify(token)
})
.then(output => {
window.location.href='/gallery'
if (output.status === "succeeded")
  document.getElementById("shop").innerHTML = "<p>Purchase complete!</p>";
})
}
var button = document.getElementById("buttonCheckout");
button.addEventListener("click", function(ev) {
checkoutHandler.open({
name: "VIA Studios",
description: "Art purpose",
token: handleToken
});
});
