// GLOBAL VARIABLES
const snakeColour = "black";
let velocity = 100;
const initialSnakeLength = 6;

// RANDOM COLOUR GENERATOR
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// ANIMATION CANVAS
const canvas = document.querySelector("canvas");
if (screen.width <= 900) {
  canvas.height = 0.55 * window.innerHeight;
} else canvas.height = 0.7 * window.innerHeight;
canvas.width = 0.9 * window.innerWidth;
const c = canvas.getContext("2d");

// BASIC BOX OBJECT
function BasicBox(x, y, h, w, colour) {
  this.x = x;
  this.y = y;
  this.h = h;
  this.w = w;
  this.colour = colour;

  this.draw = function () {
    c.fillStyle = this.colour;
    c.fillRect(this.x, this.y, this.h, this.w, this.colour);
  };
}

// CONSTRUCTING THE SNAKE
function createInitialSnake(size) {
  const snakeArr = [];
  let y = 100;
  for (let i = 0; i < size; i++) {
    const x = 100;
    const h = 10;
    const w = 10;
    const colour = snakeColour;
    snakeArr.push(new BasicBox(x, y, h, w, colour));
    y -= 10;
  }
  return snakeArr;
}

// CONSTRUCTING THE CHERRY
function roundUpNearest10(num) {
  return Math.ceil(num / 10) * 10;
}
function randomX() {
  return roundUpNearest10(Math.random() * (canvas.width - 20) + 10);
}
function randomY() {
  return roundUpNearest10(Math.random() * (canvas.height - 20) + 10);
}
var cherry = new BasicBox(randomX(), randomY(), 10, 10, "red");

// MOVING THE SNAKE
function Snake() {
  this.array = createInitialSnake(initialSnakeLength);
  this.direction = "down";

  this.changeDirection = function (direction) {
    if (screen.width > 900) {
      document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowUp" && this.direction != "down") {
          this.direction = "up";
        } else if (event.key === "ArrowDown" && this.direction != "up") {
          this.direction = "down";
        } else if (event.key === "ArrowRight" && this.direction != "left") {
          this.direction = "right";
        } else if (event.key === "ArrowLeft" && this.direction != "right") {
          this.direction = "left";
        }
      });
    } else {
      const upButton = document.getElementById("up");
      upButton.addEventListener("click", (event) => {
        if (this.direction != "down") {
          this.direction = "up";
        }
      });
      const downButton = document.getElementById("down");
      downButton.addEventListener("click", (event) => {
        if (this.direction != "up") {
          this.direction = "down";
        }
      });
      const leftButton = document.getElementById("left");
      leftButton.addEventListener("click", (event) => {
        if (this.direction != "right") {
          this.direction = "left";
        }
      });
      const rightButton = document.getElementById("right");
      rightButton.addEventListener("click", (event) => {
        if (this.direction != "left") {
          this.direction = "right";
        }
      });
    }
  };

  this.draw = function () {
    this.array.forEach((element) => element.draw());
  };

  this.append = function (element) {
    if (this.direction === "down") {
      element.y = this.array[0].y + 10;
      element.x = this.array[0].x;
    } else if (this.direction === "up") {
      element.y = this.array[0].y - 10;
      element.x = this.array[0].x;
    } else if (this.direction === "right") {
      element.x = this.array[0].x + 10;
      element.y = this.array[0].y;
    } else if (this.direction === "left") {
      element.x = this.array[0].x - 10;
      element.y = this.array[0].y;
    }
    this.array.unshift(element);
  };

  this.move = function () {
    const lastElement = this.array.pop();
    this.append(lastElement);
  };

  this.eat = function () {
    snake.append(new BasicBox(10, 10, 10, 10, "black"));
  };
}

// START BUTTON FUNCTION
const startButton = document.getElementById("button-start");
function handleStart() {
  animate();
}
startButton.addEventListener("click", handleStart);

//NEW GAME BUTTON
const newGameButton = document.getElementById("button-new");
function handleNewGame() {
  document.location.reload();
}
newGameButton.addEventListener("click", handleNewGame);

// DIFFICULTY
const difficultyLevel = document.getElementById("difficultyLevel"); //js object
const handleDifficultyChange = (event) => {
  console.log("hello");
  if (event.target.value == "slow") {
    velocity = 150;
  } else if (event.target.value == "medium") {
    velocity = 100;
  } else if (event.target.value == "fast") {
    velocity = 50;
  } else if (event.target.value == "turbo") {
    velocity = 0;
  }
  return velocity;
};
difficultyLevel.addEventListener("change", handleDifficultyChange);

//ANIMATING THE GAME
const snake = new Snake();
function animate() {
  c.clearRect(0, 0, canvas.width, canvas.height); //  CLEARS CANVAS
  snake.draw();
  cherry.draw();
  if (cherry.x === snake.array[0].x && cherry.y === snake.array[0].y) {
    snake.eat();
    updateScore();
    cherry.x = randomX();
    cherry.y = randomY();
  } else {
    snake.move();
  }
  snake.changeDirection();
  setTimeout(function () {
    if (isgameOver()) {
      gameOverDisplay();
      if (isHighScore()) {
        setHighScore();
        displayHighScore();
      }
    } else requestAnimationFrame(animate);
  }, velocity);
}

// GAME OVER
function gameOverDisplay() {
  c.font = "bold 70px mono";
  c.fillStyle = "#8b0000";
  c.textAlign = "center";
  c.fillText("Game Over", canvas.width / 2, canvas.height / 2);
}

const isgameOver = () => {
  if (
    snake.array[0].x < 0 ||
    snake.array[0].y < 0 ||
    snake.array[0].x > canvas.width ||
    snake.array[0].y > canvas.height ||
    collision(snake.array[0].x, snake.array[0].y)
  ) {
    return true;
  } else return false;
};

function collision(x, y) {
  for (let i = 1; i < snake.array.length; i++) {
    if (x == snake.array[i].x && y == snake.array[i].y) return true;
  }
  return false;
}

// DISPLAY SCORE
function updateScore() {
  const currentScore = snake.array.length - initialSnakeLength;
  const score = document.getElementById("score");
  score.innerHTML = currentScore;
}
// //HIGHSCORE
const highestScore = JSON.parse(window.localStorage.getItem("highScore"));
document.getElementById("highScore").innerText = highestScore;

const isHighScore = () => {
  currentScore = document.getElementById("score").innerText;
  currentScoreNumber = parseFloat(currentScore);
  console.log(currentScoreNumber);
  console.log(highestScore);
  console.log(parseFloat(highestScore));
  if (currentScoreNumber > highestScore) {
    return true;
  }
  return false;
};
const setHighScore = () => {
  currentScore = document.getElementById("score").innerText;
  window.localStorage.setItem("highScore", JSON.stringify(currentScore));
  document.getElementById("highScore").innerHTML = currentScore;
};

function displayHighScore() {
  c.font = "bold 70px mono";
  c.fillStyle = getRandomColor();
  c.textAlign = "center";
  c.fillText("High Score!", canvas.width / 2, canvas.height / 3);
}
