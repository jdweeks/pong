export default class Ball {
  radius: number;
  x: number;
  y: number;
  dx: number;
  dy: number;

  constructor(radius: number, x: number, y: number) {
    this.radius = radius;
    this.x = x;
    this.y = y;

    this.dx = 3;
    this.dy = -3;
  }

  drawBall(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    ctx.fillStyle = '#00ff00';
    ctx.fill();
    ctx.closePath();
  }
  
  resetBall(canvas: HTMLCanvasElement) {
    let rand1 = this.getRand();
    this.x = canvas.width / 2;
    this.dx = rand1 * this.dx;
    
    let rand2 = this.getRand();
    this.y = canvas.height / 2;
    this.dy = rand2 * this.dy;
  }

  getRand() {
    return Math.random() < 0.5 ? -1 : 1;
  }
}