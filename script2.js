// GLOBAL VARIABLES
var snakeColour = "black";
var velocity = 300;

// ANIMATION CANVAS
var canvas = document.querySelector("canvas");
canvas.width = 0.9 * window.innerWidth;
canvas.height = 0.75 * window.innerHeight;
var c = canvas.getContext("2d");

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
  var snakeArr = [];
  var y = 100;
  for (let i = 0; i < size; i++) {
    var x = 100;
    var h = 10;
    var w = 10;
    var colour = snakeColour;
    snakeArr.push(new BasicBox(x, y, h, w, colour));
    y -= 10;
  }
  return snakeArr;
}

// MOVING THE SNAKE
function Snake() {
  this.array = createInitialSnake(6);
  this.direction = "down";

  this.changeDirection = function (direction) {
    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowUp") {
        this.direction = "up";
      } else if (event.key === "ArrowDown") {
        this.direction = "down";
      } else if (event.key === "ArrowRight") {
        this.direction = "right";
      } else if (event.key === "ArrowLeft") {
        this.direction = "left";
      }
    });
  };

  this.draw = function () {
    this.array.forEach((element) => element.draw());
  };
  console.log(this.array);
  this.move = function () {
    if (this.direction === "down") {
      const lastElement = this.array.pop();
      lastElement.y = this.array[0].y + 10;
      lastElement.x = this.array[0].x;
      this.array.unshift(lastElement);
    } else if (this.direction === "up") {
      const lastElement = this.array.pop();
      lastElement.y = this.array[0].y - 10;
      lastElement.x = this.array[0].x;
      this.array.unshift(lastElement);
    } else if (this.direction === "right") {
      const lastElement = this.array.pop();
      lastElement.x = this.array[0].x + 10;
      lastElement.y = this.array[0].y;
      this.array.unshift(lastElement);
    } else if (this.direction === "left") {
      const lastElement = this.array.pop();
      lastElement.x = this.array[0].x - 10;
      lastElement.y = this.array[0].y;
      this.array.unshift(lastElement);
    }
  };
}

// DRAWING THE CHERRY

var randomX = Math.random() * (canvas.width - 20) + 10;
var randomY = Math.random() * (canvas.height - 20) + 10;
var cherry = new BasicBox(randomX, randomY, 10, 10, "red");

// if (cherry.x === snakeArr[0].x && cherry.y === snakeArr[0].y) {
//   snakeArr.unshift(cherry);
// //   cherry.draw();
// }

//ANIMATING THE GAME
const snake = new Snake();
function animate() {
  c.clearRect(0, 0, canvas.width, canvas.height); //  CLEARS CANVAS
  snake.draw();
  cherry.draw();
  snake.move();
  snake.changeDirection();
  setTimeout(function () {
    requestAnimationFrame(animate);
  }, velocity);
}

// START BUTTON FUNCTION
function handleStart(event) {
  animate();
}