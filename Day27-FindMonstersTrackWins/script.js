var CONFIG = {
  images: "/images/monsters/"
};

// Globals
var monstersGrid = document.getElementById("monsters");
var shuffledMonsters;
var score;

// Event listeners
document.addEventListener("DOMContentLoaded", main);
monstersGrid.addEventListener("click", openDoor);

// Functions
function main() {
  score = 0;
  shuffledMonsters = shuffleMonsters();
  var doorsHtml = renderDoors(shuffledMonsters);
  monstersGrid.innerHTML = doorsHtml;
}

function shuffleMonsters() {
  return shuffle(MONSTERS).slice();
}

function renderDoors(monsters) {
  return monsters
    .map(function(_, index) {
      monstersGrid.className = "row";
      var html = "";
      html += "<div class='grid' aria-live='polite'>";
      html += "<button data-monster='" + index + "'>";
      html += "<img alt='A door' src='";
      html += CONFIG.images + "door.svg'/>";
      html += "</button>";
      html += "</div>";
      return html;
    })
    .join("");
}

function openDoor(event) {
  var clicked = event.target;
  if (clicked.tagName !== "IMG" && clicked.tagName !== "BUTTON") return;
  if (clicked.id === "restart") return;

  var button = clicked.closest("button");
  if (button === null) return;

  var img = button.firstChild;
  var imgFile = img.src.split("/").pop();
  var monsterIndex = button.getAttribute("data-monster");

  if (imgFile === "door.svg") {
    var imgSrc = CONFIG.images + shuffledMonsters[monsterIndex].name + ".svg";
    var imgAlt = shuffledMonsters[monsterIndex].alt;
    button.parentElement.innerHTML =
      "<img src='" + imgSrc + "' alt='" + imgAlt + "'>";
    winOrLose(shuffledMonsters[monsterIndex].name);
  }
}

function winOrLose(imgSrc) {
  if (imgSrc === "sock") {
    handleEndgame("lose");
  } else {
    score++;
    if (score === shuffledMonsters.length - 1) handleEndgame("win");
  }
}

function handleEndgame(winOrLose) {
  var retryHTML = winOrLose === "win" ? handleWin() : handleLose();
  monstersGrid.className = "end";
  monstersGrid.innerHTML = retryHTML;

  var restartButton = document.getElementById("restart");
  restartButton.addEventListener("click", main);
}

function handleLose() {
  var retryHTML = "";
  retryHTML += "<h2>You Lose!</h2>";
  retryHTML += "<img src='/images/monsters/sock.svg' alt='You found a sock!'>";
  retryHTML +=
    "<div id='score'>You found <span>" + score + "</span> monsters</div>";
  retryHTML += "<button id='restart'>Restart!</button>";
  return retryHTML;
}

function handleWin() {
  var retryHTML = "";
  retryHTML += "<h2>✨ You Win! ✨</h2>";
  retryHTML += "<div id='score'>You found all the monsters!</div>";
  retryHTML += "<button id='restart'>Restart!</button>";
  return retryHTML;
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
// The monsters and sock
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
