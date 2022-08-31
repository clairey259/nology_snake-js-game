"use strict";

// RANDOM COLOUR GENERATOR
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";

  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
} // ANIMATION CANVAS


var canvas = document.querySelector("canvas");
canvas.width = 0.9 * window.innerWidth;
canvas.height = 0.8 * window.innerHeight;
var c = canvas.getContext("2d"); //GLOBAL VARIABLES
// RANDOMISING 

var randomX = Math.random() * canvas.width; //- radius * 2) + radius;

var randomY = Math.random() * canvas.height; //- radius * 2) + radius;
// CREATING SNAKE OBECT

function Snake(x, y, w, h, v, colour) {
  this.colour = colour;
  this.x = x;
  this.y = y;
  this.dx = v;
  this.dy = v;
  this.w = w;
  this.h = h; //gets snake shape

  this.draw = function () {
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = this.colour;
    c.fillRect(this.x, this.y, this.w, this.h);
  }; // gets snake to move and alerts when hits edge


  this.move = function () {
    if (this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0) {//alert ("Game over")
    }

    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  };
} // NEW SNAKE


var snakeOne = new Snake(randomX / 2, randomY / 2, 10, 80, 8, "black");
snakeOne.move();
var snakeRainbow = new Snake(100, 100, 10, 80, 8, getRandomColor());
snakeRainbow.move(); // ANIMATE SNAKE

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  snakeOne.move();
} // START BUTTON FUNCTION


function handleStart(event) {
  animate();
}