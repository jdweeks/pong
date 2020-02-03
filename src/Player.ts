export default class Player {
  paddleX: number;
  paddleY: number;
  paddleWidth: number;
  paddleHeight: number;
  leftPressed: boolean;
  rightPressed: boolean;
  dPX: number;

  constructor(x: number, y: number, paddleWidth: number, paddleHeight: number) {
    this.paddleX = x;
    this.paddleY = y;

    this.paddleWidth = paddleWidth;
    this.paddleHeight = paddleHeight;
  
    this.leftPressed = false;
    this.rightPressed = false;

    this.dPX = 0;
  }

  drawPaddle(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.rect(this.paddleX, this.paddleY, this.paddleWidth, this.paddleHeight);
    ctx.fillStyle = '#00ff00';
    ctx.fill();
    ctx.closePath();
  }

  movePaddle(canvas: HTMLCanvasElement, x: number, y: number) {
    if (this.rightPressed && this.paddleX < canvas.width - this.paddleWidth)
      this.paddleX += 9;
    if (this.leftPressed && this.paddleX > 0)
      this.paddleX -= 9;
  }
}