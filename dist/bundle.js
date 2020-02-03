(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Ball = /** @class */ (function () {
    function Ball(radius, x, y) {
        this.radius = radius;
        this.x = x;
        this.y = y;
        this.dx = 3;
        this.dy = -3;
    }
    Ball.prototype.drawBall = function (ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#00ff00';
        ctx.fill();
        ctx.closePath();
    };
    Ball.prototype.resetBall = function (canvas) {
        var rand1 = this.getRand();
        this.x = canvas.width / 2;
        this.dx = rand1 * this.dx;
        var rand2 = this.getRand();
        this.y = canvas.height / 2;
        this.dy = rand2 * this.dy;
    };
    Ball.prototype.getRand = function () {
        return Math.random() < 0.5 ? -1 : 1;
    };
    return Ball;
}());
exports["default"] = Ball;

},{}],2:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Player_1 = require("./Player");
var ComputerPlayer = /** @class */ (function (_super) {
    __extends(ComputerPlayer, _super);
    function ComputerPlayer(x, y, paddleWidth, paddleHeight) {
        return _super.call(this, x, y, paddleWidth, paddleHeight) || this;
    }
    ComputerPlayer.prototype.movePaddle = function (canvas, x, y) {
        var onSide = (y < canvas.height / 2);
        if (this.paddleX < 0)
            this.dPX = -this.dPX;
        if (this.paddleX > canvas.width - this.paddleWidth)
            this.dPX = -this.dPX;
        if (onSide && this.paddleX < canvas.width / 2) {
            if (x < this.paddleX && this.dPX > 0)
                this.dPX = -this.dPX;
            else if (x > this.paddleX && this.dPX < 0)
                this.dPX = -this.dPX;
        }
        if (onSide && this.paddleX > canvas.width / 2) {
            if (x > this.paddleX + this.paddleWidth && this.dPX < 0)
                this.dPX = -this.dPX;
            else if (x < this.paddleX && this.dPX > 0)
                this.dPX = -this.dPX;
        }
        this.paddleX += this.dPX;
    };
    return ComputerPlayer;
}(Player_1["default"]));
exports["default"] = ComputerPlayer;

},{"./Player":3}],3:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Player = /** @class */ (function () {
    function Player(x, y, paddleWidth, paddleHeight) {
        this.paddleX = x;
        this.paddleY = y;
        this.paddleWidth = paddleWidth;
        this.paddleHeight = paddleHeight;
        this.leftPressed = false;
        this.rightPressed = false;
        this.dPX = 7;
    }
    Player.prototype.drawPaddle = function (ctx) {
        ctx.beginPath();
        ctx.rect(this.paddleX, this.paddleY, this.paddleWidth, this.paddleHeight);
        ctx.fillStyle = '#00ff00';
        ctx.fill();
        ctx.closePath();
    };
    Player.prototype.movePaddle = function (canvas, x, y) {
        if (this.rightPressed && this.paddleX < canvas.width - this.paddleWidth)
            this.paddleX += this.dPX;
        if (this.leftPressed && this.paddleX > 0)
            this.paddleX -= this.dPX;
    };
    return Player;
}());
exports["default"] = Player;

},{}],4:[function(require,module,exports){
"use strict";
exports.__esModule = true;
var Ball_1 = require("./Ball");
var Player_1 = require("./Player");
var ComputerPlayer_1 = require("./ComputerPlayer");
var DRAW_DELAY = 0;
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth * 0.7;
canvas.height = window.innerHeight * 0.6;
var x = canvas.width / 2;
var y = canvas.height - 30;
var ballRadius = 10;
var ball = new Ball_1["default"](ballRadius, x, y);
var paddleHeight = 10, paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var player1 = new Player_1["default"](paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
var player2 = new ComputerPlayer_1["default"](paddleX, 0, paddleWidth, paddleHeight);
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
    player1.movePaddle(canvas, ball.x, ball.y);
    player2.movePaddle(canvas, ball.x, ball.y);
    ball.x += ball.dx;
    ball.y += ball.dy;
    setTimeout(function () {
        requestAnimationFrame(draw);
    }, DRAW_DELAY);
}
function checkCollision(ball, player) {
    if (ball.x > player.paddleX - 15 && ball.x < player.paddleX + player.paddleWidth + 15) {
        ball.dy = -ball.dy;
    }
    else {
        ball.resetBall(canvas);
    }
}
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

},{"./Ball":1,"./ComputerPlayer":2,"./Player":3}]},{},[4]);
