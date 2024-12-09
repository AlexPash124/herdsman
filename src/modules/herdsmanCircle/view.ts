import {View} from "../../utils/view";
import * as PIXI from "pixi.js";
import {Assets, Sprite} from "pixi.js";
import gsap from "gsap";

export class HerdsmanView extends View {
    protected _herdsman?: PIXI.Sprite;
    protected _gsapChangedPosition: unknown;

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
        this.addChild(this._herdsman);
    }

    setPositionHerdsman(position: PIXI.Point) {
        this._herdsman?.position.set(position.x, position.y);
    }

    changeAnimationPositionHerdsman(position: PIXI.Point) {
        if (!this._herdsman) return;

        this._gsapChangedPosition = gsap.to(this._herdsman, {
            duration: 1,
            x: position.x,
            y: position.y,

        });
    }
}