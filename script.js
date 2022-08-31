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
var canvas = document.querySelector("canvas");
canvas.width = 0.8 * window.innerWidth;
canvas.height = 0.8 * window.innerHeight;
var c = canvas.getContext("2d");

// CREATING SNAKE OBECT
function Snake (x, y, dx, dy, w, h, colour){
    this.colour = colour
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.w = w
    this.h = h

    this.draw = function() {
        c.clearRect(0, 0, canvas.width, canvas.height)
        c.fillStyle = this.colour;
        c.fillRect(this.x, this.y, this.w, this.h)
    }

    this.move = function () {
        if (this.x + this.h > canvas.width || this.x - this.h < 0) {
          this.dx = -this.dx;
        }
        if (this.y + this.h > canvas.height || this.y - this.h < 0) {
          this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
    
        this.draw();
      };
}

// RANDOMISING WHERE SNAKE APPEARS (and variables)
var velocity = 8;
var randomX = Math.random() * (canvas.width) //- radius * 2) + radius;
var randomY = Math.random() * (canvas.height) //- radius * 2) + radius;
var randomDx = (Math.random() - 0.5) * velocity;
var randomDy = (Math.random() - 0.5) * velocity;


// function animate() {
//     requestAnimationFrame();
//     c.clearRect(0, 0, innerWidth, innerHeight);
// }

// NEW SNAKE
var snakeOne = new Snake(randomX, randomY, randomDx, randomDy, 10, 80, 'black')
snakeOne.move()
//snakeOne.move()
console.log(snakeOne.x)
// ANIMATE SNAKE
// function animate() {
//     console.log("hello")
//     requestAnimationFrame(animate);
//    // c.clearRect(0, 0, innerWidth, innerHeight);
//    snakeOne.draw()
// }

//var snakeRainbow = new Snake(100, 100, 10, 80, getRandomColor())
//snakeOne.draw()

