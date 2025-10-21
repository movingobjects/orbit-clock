import * as PIXI from 'pixi.js';
import { Clock } from './Clock';

const app = new PIXI.Application()

await app.init({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x000000,
  canvas: document.getElementById('pixi-canvas') as HTMLCanvasElement,
  antialias: true,
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
});

const updatePosition = () => {
  app.renderer.resize(window.innerWidth, window.innerHeight);
  clock.x = app.screen.width / 2;
  clock.y = app.screen.height / 2;
};

const clock = new Clock();
app.stage.addChild(clock);

updatePosition();
window.addEventListener('resize', updatePosition);

app.ticker.add(() => {
  clock.update();
});