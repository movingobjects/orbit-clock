
import * as PIXI from 'pixi.js';
import 'pixi.js/advanced-blend-modes';

export class Hand extends PIXI.Container {
  radius: number;
  color: number;
  digit: PIXI.Container;

  constructor(
    radius: number,
    color: number
  ) {
    super();

    this.radius = radius;
    this.color = color;
    this.digit = new PIXI.Container();

    this.draw();
  }

  draw() {
    const track = new PIXI.Graphics();
    track.blendMode = 'add';
    track.circle(0, 0, this.radius).stroke({
      color: this.color,
      width: 25
    });

    const dot = new PIXI.Graphics();
    dot
      .circle(0, 0, 8)
      .fill({
        color: 0x000000,
      });
    this.digit.addChild(dot);

    this.addChild(track);
    this.addChild(this.digit);

  }

  addChildHand(child: PIXI.Container) {
    this.digit.addChild(child);
  }

  update(start: Date, end: Date) {
    const now = Date.now();
    const perc = (now - start.getTime()) / (end.getTime() - start.getTime());

    this.digit.x = this.radius * Math.cos((perc - 0.25) * Math.PI * 2);
    this.digit.y = this.radius * Math.sin((perc - 0.25) * Math.PI * 2);

  }
}