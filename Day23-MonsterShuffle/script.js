var monstersGrid = document.getElementById("monsters");
var shuffleButton = document.querySelector("button");

shuffleButton.addEventListener("click", shuffleMonsters);
document.addEventListener("DOMContentLoaded", shuffleMonsters);

// FUNCTIONS ============================================================

function shuffleMonsters() {
  shuffle(monsters);
  var monstersGridItems = monsters
    .map(function(monster) {
      return (
        '<div class="grid"><img alt="' +
        monster.alt +
        '" src="/images/monsters/' +
        monster.name +
        '.svg"></div>'
      );
    })
    .join("");

  monstersGrid.innerHTML = monstersGridItems;
}

/**
 * Randomly shuffle an array
 * https://stackoverflow.com/a/2450976/1293256
 * @param  {Array} array The array to shuffle
 * @return {String}      The first item in the shuffled array
 */
function shuffle(array) {
  var currentIndex = array.length;
  var temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// DATA ========================================================================

// The monsters and socks
var monsters = [
  {
    name: "monster1",
    alt: "A small, yellow, fluffy floating monster with a curly snout"
  },
  {
    name: "monster2",
    alt:
      "A happy yellow monster with very skinny arms and legs, a big head and one eye"
  },
  {
    name: "monster3",
    alt: "A green monster with a sideways crocodile mouth and wobbly arms"
  },
  {
    name: "monster4",
    alt: "A big red monster with a body like a tree-trunk and four arms"
  },
  {
    name: "monster5",
    alt:
      "A green monster that looks like a brussel sprout with one eye and spikes on its head"
  },
  {
    name: "monster6",
    alt:
      "A green triangle monster who looks so angry he's standing on his hands upside down"
  },
  {
    name: "monster7",
    alt: "A purple monster with tentacle arms and one big eye"
  },
  {
    name: "monster8",
    alt: "A purple space-hopper monster with one eye who looks nonplussed"
  },
  {
    name: "monster9",
    alt:
      "A big blue monster that looks like fly with bug eyes, three tiny legs and a smile"
  },
  {
    name: "monster10",
    alt: "A blue blob monster with spiked bottom teeth and eyes on stalks"
  },
  {
    name: "monster11",
    alt: "A big black, furry, cuddly monster with a smile and long arms"
  },
  { name: "sock", alt: "A pair of smell old socks" }
];
