import {View} from "../../utils/view";
import * as PIXI from "pixi.js";
import {Sheep} from "./component/sheep";
import {Assets, Sprite} from "pixi.js";


export class ViewSheep extends View {
    protected _sheeps: Sheep[] = [];
    protected _yellowArea?: PIXI.Sprite;

    constructor() {
        super();

        this.createYellowArea();
    }

    createSheep(position: PIXI.Point) {
        if (this.isArrayFull()) return;

        const {width, height} = this._yellowArea ? this._yellowArea : {width: 100, height: 100};
        const sheep = new Sheep(this.getIdForSheep(), position, width, height);
        sheep._zIndex = 100;
        this._sheeps.push(sheep);
        this.addChild(sheep);
    }

    isArrayFull() {
        let numberFreeSheep = 0;
        this._sheeps.forEach(shep => {
            if (!shep.isHome) {
                numberFreeSheep++;
            }
        });

        return numberFreeSheep > 13;
    }

    getNumberSheepInHouse(): number {
        let numberFreeSheep = 0;
        this._sheeps.forEach(shep => {
            if (shep.isHome) {
                numberFreeSheep++;
            }
        })

        return numberFreeSheep;
    }

    checkIsCollisionInHerdsman(position: PIXI.Point) {
        this._sheeps.forEach(shep => {
            if (shep.isGoingHome) {
                shep.moveToHome(position);
            } else {
                shep.checkIsCollisionInHerdsman(position);
            }
        })
    }

    createYellowArea() {
        this._yellowArea = new Sprite({
            texture: Assets.get("yellowArea"),
            anchor: .5,
            scale: .6,
        });
        this.addChild(this._yellowArea);
        const position = this.toLocal(new PIXI.Point(this._yellowArea.width / 2, window.innerHeight - this._yellowArea.height / 2));
        this._yellowArea.position.set(position.x, position.y);
        this._yellowArea._zIndex = 0;
    }

    getIdForSheep() {
        return this._sheeps.length;
    }
}