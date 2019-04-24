(function(){

  var quotes = [
    "They don't want us to win.",
    "Egg whites, turkey sausage, wheat toast, water. Of course they don't want us to eat our breakfast, so we are going to enjoy our breakfast.",
    "You smart, you loyal, you a genius.",
    "Congratulations, you played yourself.",
    "The key to more success is to have a lot of pillows.",
    "Life is what you make it, so let's make it.",
    "They key is to have every key, the key to open every door.",
    "Learning is cool, but knowing is better, and I know the key to success."
    ];

  var images = [
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg",
    "5.jpg"
  ];

  function chooseOne(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  window.onload = function() {
    var randomImage = chooseOne(images);
    var randomQuote = chooseOne(quotes);

    document.getElementById('background-image').style.backgroundImage = 'url("img/'+ randomImage +'")';
    document.getElementById('quote').innerHTML = randomQuote;
    document.getElementById('author').innerHTML = "— " +  'DJ Khaled' + " —";

    document.getElementById('quote').className = 'move';
    document.getElementById('author').className = 'move';
  };

})();
