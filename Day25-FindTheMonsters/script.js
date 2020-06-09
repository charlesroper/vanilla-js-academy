var CONFIG = {
  images: "/images/monsters/"
};

var monstersGrid = document.getElementById("monsters");
var restartButton = document.getElementById("restart");

document.addEventListener("DOMContentLoaded", main);
monstersGrid.addEventListener("click", openDoor);
restartButton.addEventListener("click", main);

var shuffledMonsters;

function main() {
  shuffledMonsters = shuffleMonsters();
  var doorsHtml = renderDoors(shuffledMonsters);
  monstersGrid.innerHTML = doorsHtml;
}

function shuffleMonsters() {
  return shuffle(MONSTERS).slice();
}

function renderDoors(monsters) {
  return monsters
    .map(function(monster, index) {
      var html = "";
      html += "<div class='grid' aria-live='polite'>";
      html += "<a href='' role='button' data-monster='" + index + "'>";
      html += "<img alt='A door - click on me to open' src='";
      html += CONFIG.images + "door.svg'/>";
      html += "</a>";
      html += "</div>";
      return html;
    })
    .join("");
}

function openDoor(event) {
  event.preventDefault();
  var clicked = event.target;
  if (clicked.tagName !== "IMG" && clicked.tagName !== "A") return;

  var link = clicked.closest("a");
  var img = link.firstChild;
  var imgFile = img.src.split("/").pop();
  var monsterIndex = link.getAttribute("data-monster");

  if (imgFile === "door.svg") {
    img.src = CONFIG.images + shuffledMonsters[monsterIndex].name + ".svg";
    img.alt = shuffledMonsters[monsterIndex].alt;
  }
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
var MONSTERS = [
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
  { name: "sock", alt: "A pair of smelly old socks" }
];
