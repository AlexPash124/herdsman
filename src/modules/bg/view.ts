import {View} from "../../utils/view";
import * as PIXI from "pixi.js";
import {Graphics} from "pixi.js";

export class ViewBG extends View {
    protected _bgMask?: PIXI.Graphics;
    constructor() {
        super();

        this.createBg();
    }

    protected createBg(): void {
        const widthAndHeight = Math.max(window.innerWidth, window.innerHeight)
        this._bgMask = new Graphics()
        this._bgMask.beginFill(0x003300);
        this._bgMask.drawRect(0, 0, widthAndHeight, widthAndHeight);
        this._bgMask.endFill();

        this.addChild(this._bgMask)
    }
}