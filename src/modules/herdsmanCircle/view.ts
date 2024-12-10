import {View} from "../../utils/view";
import * as PIXI from "pixi.js";
import {Assets, Sprite} from "pixi.js";
import gsap from "gsap";

export class HerdsmanView extends View {
    static HERDSMAN_CHANGED_POSITION = "HerdsmanView.HERDSMAN_CHANGED_POSITION";
    protected _herdsman?: PIXI.Sprite;
    protected _gsapChangedPosition: GSAPTween;

    constructor() {
        super();

        this._gsapChangedPosition = gsap.to({},{});
        this.createHerdsman();
    }

    createHerdsman(): void {
        this._herdsman = new Sprite({
            texture: Assets.get("redCircle"),
            anchor: .5,
            x: 100,
            y: 100,
        });
        this.addChild(this._herdsman);
    }

    setPositionHerdsman(position: PIXI.Point): void {
        this._herdsman?.position.set(position.x, position.y);
    }

    changeAnimationPositionHerdsman(position: PIXI.Point): void {
        if (!this._herdsman) return;
        if (this._gsapChangedPosition.isActive()) return;

        this._gsapChangedPosition = gsap.to(this._herdsman, {
            duration: 1,
            x: position.x,
            y: position.y,

            onUpdate: ()=> {
                this.notifyToMediator(HerdsmanView.HERDSMAN_CHANGED_POSITION, new PIXI.Point(position.x, position.y));
            }
        });
    }
}