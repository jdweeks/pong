import Player from './Player';

export default class ComputerPlayer extends Player {
  constructor(x: number, y: number, paddleWidth: number, paddleHeight: number) {
    super(x, y, paddleWidth, paddleHeight);
  }

  movePaddle(canvas: HTMLCanvasElement, x: number, y: number) {
    let onSide = (y < canvas.height / 2);

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
    if (onSide && this.paddleX > canvas.width / 2)  {
      if (x > this.paddleX+this.paddleWidth && this.dPX < 0)
        this.dPX = -this.dPX;
      else if (x < this.paddleX && this.dPX > 0)
        this.dPX = -this.dPX;
    }
    
    this.paddleX += this.dPX;
  }
}