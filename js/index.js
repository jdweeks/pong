(function () {
  'use strict';
  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext('2d');

  var x = canvas.width / 2, dx = 3;
  var y = canvas.height - 30, dy = -3;
  var ballRadius = 10;
  
  var paddleHeight = 10, paddleWidth = 75;
  var paddleX = (canvas.width - paddleWidth) / 2;
  
  var Player = function(X, Y) {
    this.paddleX = X;
    this.paddleY = Y;
    
    this.rightPressed = false;
    this.leftPressed = false;
  }
  
  Player.prototype.drawPaddle = function() {
    ctx.beginPath();
    ctx.rect(this.paddleX, this.paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = '#00ff00';
    ctx.fill();
    ctx.closePath();
  }
  
  Player.prototype.movePaddle = function() {
    if (this.rightPressed && this.paddleX < canvas.width - paddleWidth)
      this.paddleX += 9;
    if (this.leftPressed && this.paddleX > 0)
      this.paddleX -= 9;
  }
  
  Player.prototype.checkCollision = function() {
    if (x > this.paddleX && x < this.paddleX + paddleWidth)
      dy = -dy;
    else {
      resetBall();
      drawBall();
    }
  }
  
  function ComputerPlayer(X, Y) {
    Player.call(this, X, Y);
    this.dPX = 7;
  }
  
  ComputerPlayer.prototype = Object.create(Player.prototype);
  ComputerPlayer.prototype.constructor = ComputerPlayer;
  
  ComputerPlayer.prototype.movePaddle = function(onSide) {
    if (this.paddleX < 0)
      this.dPX = -this.dPX;
    else if (this.paddleX > canvas.width - paddleWidth)
      this.dPX = -this.dPX;
    else if (onSide && this.paddleX < canvas.width / 2) { 
      if (x < this.paddleX && this.dPX > 0)
        this.dPX = -this.dPX;
      //else if (x > this.paddleX && this.dPX < 0)
        //this.dPX = -this.dPX;
    }
    else if (onSide && this.paddleX > canvas.width / 2)  {
      if (x > this.paddleX+paddleWidth && this.dPX < 0)
        this.dPX = -this.dPX;
      //else if (x < this.paddleX && this.dPX > 0)
        //this.dPX = -this.dPX;
    }
    
    this.paddleX += this.dPX;
  }
    
  var player1 = new Player(paddleX, canvas.height - paddleHeight);
  var player2 = new ComputerPlayer(paddleX, 0);

  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = '#00ff00';
    ctx.fill();
    ctx.closePath();
  }
  
  function resetBall() {
    var rand1 = Math.random() < 0.5 ? -1 : 1;
    x = canvas.width / 2;
    dx = rand1 * dx;
    
    var rand2 = Math.random() < 0.5 ? -1 : 1;
    y = canvas.height / 2;
    dy = rand2 * dy;
  }
  
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    player1.drawPaddle();
    player2.drawPaddle();
    
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius)
      dx = -dx;
    if (y + dy > canvas.height - ballRadius)
      player1.checkCollision();
    if (y + dy < ballRadius)
      player2.checkCollision();
    
    player1.movePaddle((y > canvas.height / 2) && (dy > 0));
    player2.movePaddle((y < canvas.height / 2) && (dy < 0));

    x += dx;
    y += dy;
    requestAnimationFrame(draw);
  }
  draw();
  
  document.addEventListener('keydown', keyDownHandler, false);
  document.addEventListener('keyup', keyUpHandler, false);

  function keyDownHandler(e) {
    if (e.keyCode == 39)
      player1.rightPressed = true;
    else if (e.keyCode == 37)
      player1.leftPressed = true;
  }

  function keyUpHandler(e) {
    if (e.keyCode == 39)
      player1.rightPressed = false;
    else if (e.keyCode == 37)
      player1.leftPressed = false;
  }

})();
