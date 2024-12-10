import {App} from "./app/app";
import * as PIXI from "pixi.js";

declare global {
    var __PIXI_APP__: PIXI.Application;
}
export {};

const app = new App
await app.init({
    background: '#123',
    width: window.innerWidth,
    height: window.innerHeight,
    resolution: window.devicePixelRatio || 1,
    resizeTo: window,
});
document.body.appendChild(app.canvas);
app.startGame()

globalThis.__PIXI_APP__ = app;

