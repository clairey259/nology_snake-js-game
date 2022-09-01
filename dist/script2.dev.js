"use strict";

// GLOBAL VARIABLES
var snakeColour = "black";
var velocity = 100;
var initialSnakeLength = 6; // ANIMATION CANVAS

var canvas = document.querySelector("canvas");
canvas.width = 0.9 * window.innerWidth;
canvas.height = 0.75 * window.innerHeight;
var c = canvas.getContext("2d"); // BASIC BOX OBJECT

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
} // CONSTRUCTING THE SNAKE


function createInitialSnake(size) {
  var snakeArr = [];
  var y = 100;

  for (var i = 0; i < size; i++) {
    var x = 100;
    var h = 10;
    var w = 10;
    var colour = snakeColour;
    snakeArr.push(new BasicBox(x, y, h, w, colour));
    y -= 10;
  }

  return snakeArr;
} // CONSTRUCTING THE CHERRY


function roundUpNearest10(num) {
  return Math.ceil(num / 10) * 10;
}

function randomX() {
  return roundUpNearest10(Math.random() * (canvas.width - 20) + 10);
}

function randomY() {
  return roundUpNearest10(Math.random() * (canvas.height - 20) + 10);
}

var cherry = new BasicBox(randomX(), randomY(), 10, 10, "red"); // MOVING THE SNAKE

function Snake() {
  this.array = createInitialSnake(initialSnakeLength);
  this.direction = "down";

  this.changeDirection = function (direction) {
    var _this = this;

    document.addEventListener("keydown", function (event) {
      if (event.key === "ArrowUp") {
        _this.direction = "up";
      } else if (event.key === "ArrowDown") {
        _this.direction = "down";
      } else if (event.key === "ArrowRight") {
        _this.direction = "right";
      } else if (event.key === "ArrowLeft") {
        _this.direction = "left";
      }
    });
  };

  this.draw = function () {
    this.array.forEach(function (element) {
      return element.draw();
    });
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
    var lastElement = this.array.pop();
    this.append(lastElement);
  };

  this.eat = function () {
    snake.append(new BasicBox(10, 10, 10, 10, "black"));
  };
} // START BUTTON FUNCTION


function handleStart(event) {
  animate();
} //ANIMATING THE GAME


var snake = new Snake();

function animate() {
  c.clearRect(0, 0, canvas.width, canvas.height); //  CLEARS CANVAS

  snake.draw();
  cherry.draw();

  if (cherry.x === snake.array[0].x && cherry.y === snake.array[0].y) {
    snake.eat();
    cherry.x = randomX();
    cherry.y = randomY();
  } else {
    snake.move();
  }

  snake.changeDirection();
  setTimeout(function () {
    if (isgameOver()) {
      gameOverDisplay();
    } else requestAnimationFrame(animate);
  }, velocity); // DISPLAY SCORE

  var Currentscore = snake.array.length - initialSnakeLength;
  var score = document.getElementById("score");
  score.innerHTML = "Score: ".concat(Currentscore);
} // GAME OVER


function gameOverDisplay() {
  c.font = "bold 70px mono";
  c.fillStyle = "#8b0000";
  c.textAlign = "center";
  c.fillText("Game Over", canvas.width / 2, canvas.height / 2);
}

var isgameOver = function isgameOver() {
  if (snake.array[0].x < 0 || snake.array[0].y < 0 || snake.array[0].x > canvas.width || snake.array[0].y > canvas.height || collision(snake.array[0].x, snake.array[0].y)) {
    return true;
  } else return false;
};

function collision(x, y) {
  for (var i = 1; i < snake.array.length; i++) {
    if (x == snake.array[i].x && y == snake.array[i].y) return true;
  }

  return false;
}