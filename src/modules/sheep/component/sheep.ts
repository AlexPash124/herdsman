import * as PIXI from "pixi.js";
import {Assets, Sprite} from "pixi.js";
import gsap from "gsap";
import {ViewSheep} from "../view";

export class Sheep extends PIXI.Container {
    static  SHEEP_ADDED_TO_HOME = "Sheep.SHEEP_ADDED_TO_HOME";
    id: number;
    isHome: boolean = false;
    isGoingHome: boolean = false;
    protected _bg: PIXI.Sprite;
    protected _widthYellowArea: number;
    protected _heightYellowArea: number;
    protected _gsapMoveToHouse: GSAPTween;

    constructor(id: number, startPosition: PIXI.Point, widthYellowArea: number, heightYellowArea: number) {
        super();
        this.id = id;
        this._widthYellowArea = widthYellowArea;
        this._heightYellowArea = heightYellowArea;
        this._gsapMoveToHouse = gsap.to({}, {});
        this._bg = new Sprite({
            texture: Assets.get("whiteCircle"),
            anchor: .5,
            scale: .5,
        });
        this.addChild(this._bg);
        this.position.set(startPosition.x, startPosition.y);

        this.playRandomBehavior();
    }

    moveToHome(position: PIXI.Point) {
        if (this.isHome) return;
        if (this._gsapMoveToHouse?.isActive()) return;

        this.isGoingHome = true;
        const speed = 100;
        const deltaX = position.x - this.x;
        const deltaY = position.y - this.y;
        const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
        const duration = distance / speed;

        const offsetX = (this.id % 5) * this.width * 1.5;
        const offsetY = (this.id % 3) * this.height * 1.5;

        this._gsapMoveToHouse = gsap.to(this, {
            duration: Math.max(duration, 1),
            x: position.x - this.width / 2 + offsetX,
            y: position.y - this.height / 2 + offsetY,
            ease: "sine.inOut",
            onUpdate: () => {
                if (
                    this.x < this._widthYellowArea - this.width / 2 &&
                    window.innerHeight - this.y < this._heightYellowArea - this.height / 2
                ) {
                    if (!this.isHome) {
                        this.isHome = true;
                        this.isGoingHome = false;
                        (this.parent as ViewSheep).notifyToMediator(Sheep.SHEEP_ADDED_TO_HOME);
                    }
                    this._gsapMoveToHouse.kill();
                }
            }
        });
    }

    playRandomBehavior() {
        if (this.isGoingHome || this.isHome) return;

        const speed = 50;
        const newX = Math.random() * window.innerWidth;
        const newY = Math.random() * window.innerHeight;
        const deltaX = newX - this.x;
        const deltaY = newY - this.y;
        const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
        const duration = distance / speed;
        const pause = Math.random() * 2 + 1;
        const randomBehavior = gsap.to(this, {
            onUpdate: () => {
                if (this.isGoingHome) randomBehavior.kill();
            },
            duration: duration,
            x: newX,
            y: newY,
            ease: "sine.inOut",
            onComplete: () => {
                setTimeout(() => this.playRandomBehavior(), pause * 1000);
            },
        });
    }

    checkIsCollisionInHerdsman(positionHerdsman: PIXI.Point) {
        if (this.isHome) return;
        const deltaX = positionHerdsman.x - this.x;
        const deltaY = positionHerdsman.y - this.y;
        const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

        if (distance < 50) this.isGoingHome = true;
    }

}