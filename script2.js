// GLOBAL VARIABLES
var initialSnakeSize = 6
var snakeColour = 'black'

// ANIMATION CANVAS
var canvas = document.querySelector("canvas");
canvas.width = 0.9 * window.innerWidth;
canvas.height = 0.8 * window.innerHeight;
var c = canvas.getContext("2d");


// BASIC BOX OBJECT
function BasicBox (x, y, h, w, colour){
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;
    this.colour = colour;

    this.draw = function () {
        c.clearRect(0, 0, canvas.width, canvas.height)
        c.fillStyle = this.colour;
        c.fillRect (this.x, this.y, this.h, this.w, this.colour);    
    }
}

// CONSTRUCTING THE SNAKE 
var snakeArr = []
var y = 100
for (let i = 0; i < initialSnakeSize; i++){
    var x = 100
    var h = 10
    var w = 10
    var colour = snakeColour
    snakeArr.push(new BasicBox(x, y, h, w, colour))
    y += 10
}
console.log(snakeArr)

// DRAWING THE SNAKE    
snakeArr.forEach(element => element.draw())

// MOVING THE SNAKE


// DRAWING THE CHERRY
var randomX = Math.random() * (canvas.width - 20) + 10; 
var randomY = Math.random() * (canvas.height - 20) + 10; 
var cherry = new BasicBox (randomX, randomY, 10, 10, 'red')
cherry.draw()
if (cherry.x === snakeArr[0].x && cherry.y === snakeArr[0].y){
    snakeArr.unshift(cherry)
    cherry.draw()
}

// START BUTTON FUNCTION
function handleStart(event) {
    animate();
  }
  