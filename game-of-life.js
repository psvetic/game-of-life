let initialState = [];

for (let i = 0; i < 225; i++) {
  var element = document.createElement("div");
  element.className = "grid-item inactive";

  document.querySelector(".grid-container").appendChild(element);
}

document.querySelectorAll(".grid-item").forEach((item, index) => {
  item.addEventListener("click", function(event) {
    document.querySelector(".mssg").innerHTML =
      "Hello. Welcome to the game of life.";
    if (event.target.classList.contains("inactive")) {
      event.target.classList.remove("inactive");
      event.target.classList.add("active");
      initialState[index] = 1;
    } else {
      event.target.classList.remove("active");
      event.target.classList.add("inactive");
      initialState[index] = 0;
    }
  });
});

document.querySelectorAll(".grid-item").forEach(item => {
  if (item.classList.contains("inactive")) {
    initialState.push(0);
  } else {
    initialState.push(1);
  }
});

let newState = [];
const rows = 15;
let endOfGame;

function play() {
  newState = [];
  endOfGame = true;

  for (let index = 0; index < initialState.length; index++) {
    let tempSum = sumOfNeighborhood(index);
    newState.push(rules(initialState[index], tempSum));
  }

  for (let index = 0; index < initialState.length; index++) {
    if (newState[index] != initialState[index]) {
      endOfGame = false;
      break;
    }
  }
  if (endOfGame) {
    clearInterval(gameOfLife);
    document.querySelector(".mssg").innerHTML = "There are no more moves left.";
    return;
  }

  changeGrid();
  initialState = newState;
}

function sumOfNeighborhood(index) {
  // lijevi stupac
  if (index % rows === 0) {
    return (
      (initialState[index + 1] || 0) +
      (initialState[index - rows] || 0) +
      (initialState[index - rows + 1] || 0) +
      (initialState[index + rows] || 0) +
      (initialState[index + rows + 1] || 0)
    );
  }
  // desni stupac
  if (index % rows === rows - 1) {
    return (
      (initialState[index - 1] || 0) +
      (initialState[index - rows - 1] || 0) +
      (initialState[index - rows] || 0) +
      (initialState[index + rows - 1] || 0) +
      (initialState[index + rows] || 0)
    );
  }
  return (
    (initialState[index - 1] || 0) +
    (initialState[index + 1] || 0) +
    (initialState[index - rows - 1] || 0) +
    (initialState[index - rows] || 0) +
    (initialState[index - rows + 1] || 0) +
    (initialState[index + rows - 1] || 0) +
    (initialState[index + rows] || 0) +
    (initialState[index + rows + 1] || 0)
  );
}

function rules(state, neighborhood) {
  if (state == 1 && (neighborhood <= 1 || neighborhood >= 4)) {
    return 0;
  }

  if (state == 0 && neighborhood === 3) {
    return 1;
  }

  if (state == 1 && (neighborhood == 2 || neighborhood == 3)) {
    return 1;
  }

  if (state == 0 && neighborhood != 3) {
    return 0;
  }
}

function changeGrid() {
  document.querySelectorAll(".grid-item").forEach((item, index) => {
    if (initialState[index] != newState[index]) {
      if (item.classList.contains("inactive")) {
        item.classList.remove("inactive");
        item.classList.add("active");
      } else {
        item.classList.remove("active");
        item.classList.add("inactive");
      }
    }
  });
}

var gameOfLife;
document.querySelector(".play-button").addEventListener("click", function() {
  gameOfLife = setInterval(play, 1000);
  document.querySelector(".mssg").innerHTML =
    "Hello. Welcome to the game of life.";
});
document.querySelector(".pause-button").addEventListener("click", function() {
  clearInterval(gameOfLife);
  document.querySelector(".mssg").innerHTML =
    "Game paused. Want to play some more?";
});
document.querySelector(".reset-button").addEventListener("click", function() {
  clearInterval(gameOfLife);
  for (let i = 0; i < 225; i++) {
    initialState[i] = 0;
  }
  document.querySelectorAll(".grid-item").forEach(item => {
    item.classList.remove("active");
    item.classList.add("inactive");
  });
  document.querySelector(".mssg").innerHTML = "You have restarted the game.";
});