import Ball from './Ball';
import Player from './Player';
import ComputerPlayer from './ComputerPlayer';

const DRAW_DELAY = 0;

let canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth * 0.7;
canvas.height = window.innerHeight * 0.6;

let x = canvas.width / 2;
let y = canvas.height - 30;
let ballRadius = 10;
let ball = new Ball(ballRadius, x, y);

let paddleHeight = 10, paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let player1 = new Player(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
let player2 = new ComputerPlayer(paddleX, 0, paddleWidth, paddleHeight);

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

draw();

function draw() {
  if (ctx == null) {
    throw 'HTML5 canvas not supported!';
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ball.drawBall(ctx);
  player1.drawPaddle(ctx);
  player2.drawPaddle(ctx);

  if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ballRadius)
    ball.dx = -ball.dx;
  if (ball.y + ball.dy > canvas.height - ball.radius)
    checkCollision(ball, player1);
  if (ball.y + ball.dy < ball.radius)
    checkCollision(ball, player2);
  
  player2.movePaddle(canvas, ball.x, ball.y);

  ball.x += ball.dx;
  ball.y += ball.dy;

  setTimeout(function() {
    requestAnimationFrame(draw);
  }, DRAW_DELAY);
}

function checkCollision(ball: Ball, player: Player) {
    if (ball.x > player.paddleX && ball.x < player.paddleX + player.paddleWidth) {
        ball.dy = -ball.dy;
    }
    else {
      ball.resetBall(canvas);
    }
}

function keyDownHandler(e: KeyboardEvent) {
  if (e.keyCode == 39)
    player1.rightPressed = true;
  else if (e.keyCode == 37)
    player1.leftPressed = true;
}

function keyUpHandler(e: KeyboardEvent) {
  if (e.keyCode == 39)
    player1.rightPressed = false;
  else if (e.keyCode == 37)
    player1.leftPressed = false;
}