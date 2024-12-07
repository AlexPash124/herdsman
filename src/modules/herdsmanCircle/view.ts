import {View} from "../../utils/view";
import * as PIXI from "pixi.js";
import {Assets, Sprite} from "pixi.js";

export class HerdsmanView extends View {
    protected _herdsman?: PIXI.Sprite
    constructor() {
        super();

        this.createHerdsman();
    }

    createHerdsman() {
        this._herdsman = new Sprite({
            texture: Assets.get("redCircle"),
            anchor: .5,
            x: 100,
            y: 100,
        });
        this.addChild(this._herdsman)
    }

    setPositionHerdsman(position: PIXI.Point){
        this._herdsman?.position.set(position.x, position.y)
    }
}