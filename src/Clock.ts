
import * as PIXI from 'pixi.js';
import 'pixi.js/advanced-blend-modes';
import { Hand } from './Hand';

export class Clock extends PIXI.Container {

  handYear: Hand;
  handDay: Hand;
  handHour: Hand;
  handMin: Hand;
  handSec: Hand;

  constructor() {
    super();

    this.handYear = new Hand(this.getHandRadius(0), 0x00ffcc);
    this.handDay = new Hand(this.getHandRadius(1), 0xff0066);
    this.handHour = new Hand(this.getHandRadius(2), 0x00ccff);
    this.handMin = new Hand(this.getHandRadius(3), 0x8800ff);
    this.handSec = new Hand(this.getHandRadius(4), 0xaaff00);

    this.addChild(this.handYear);
    this.handYear.addChildHand(this.handDay);
    this.handDay.addChildHand(this.handHour);
    this.handHour.addChildHand(this.handMin);
    this.handMin.addChildHand(this.handSec);

  }

  getHandRadius(level: number) {
    const OUTER_RADIUS = 400;
    const RADIUS_RATIO = 0.6;
    return OUTER_RADIUS * Math.pow(RADIUS_RATIO, level);
  }

  update() {

    const date = new Date();

    const nowYr = date.getFullYear();
    const nowMo = date.getMonth();
    const nowDt = date.getDate();
    const nowHr = date.getHours();
    const nowMn = date.getMinutes();
    const nowSc = date.getSeconds();

    this.handYear.update(
      new Date(nowYr, 0, 1, 0, 0, 0, 0),
      new Date(nowYr, 11, 31, 23, 59, 59, 999)
    );

    this.handDay.update(
      new Date(nowYr, nowMo, nowDt, 0, 0, 0, 0),
      new Date(nowYr, nowMo, nowDt, 23, 59, 59, 999)
    );

    this.handHour.update(
      new Date(nowYr, nowMo, nowDt, nowHr, 0, 0, 0),
      new Date(nowYr, nowMo, nowDt, nowHr, 59, 59, 999)
    );

    this.handMin.update(
      new Date(nowYr, nowMo, nowDt, nowHr, nowMn, 0, 0),
      new Date(nowYr, nowMo, nowDt, nowHr, nowMn, 59, 999)
    );

    this.handSec.update(
      new Date(nowYr, nowMo, nowDt, nowHr, nowMn, nowSc, 0),
      new Date(nowYr, nowMo, nowDt, nowHr, nowMn, nowSc, 999)
    );

  };

}