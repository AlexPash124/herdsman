import {Container, Graphics, Point} from "pixi.js";
import {View} from "../../utils/view";
import gsap from 'gsap';
import * as PIXI from "pixi.js";


export class PreloaderView extends View {
    protected _blackBg?: Graphics;
    protected _numDots: number = 12;          // Кількість точок
    protected _radius: number = 150;           // Радіус кола обертання
    protected _dotRadius: number = 20;         // Радіус кожної точки
    protected _colors: number[] = [0x3498DB, 0x2ECC71, 0xE74C3C, 0x9B59B6, 0xF39C12];
    protected _loaderContainer?: PIXI.Container;
    protected _dots: Graphics[] = [];
    constructor() {
        super();
        this.createBg()

        this.createConfig();
        this.createCirclePreloadProgress();

        this._zIndex = 100;
    }

    createBg(): void {
        const width = Math.max(window.innerWidth, window.innerHeight);
        this._blackBg = new Graphics();
        this._blackBg.beginFill(0x123);
        this._blackBg.drawRect(0, 0, width, width);
        this._blackBg.endFill();
        this.addChild(this._blackBg);
        this._blackBg.alpha = 1;
    }

    createConfig() {

    }

    createCirclePreloadProgress() {
        this.createLoaderContainer();
        this.playAllLoaderAnimation();
        this.playDotsAnimation();
    }

    playDotsAnimation() {
        this._dots.forEach((dot, i) => {
            gsap.to(dot.scale, {
                x: 1.5,
                y: 1.5,
                duration: 0.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: i * 0.1
            });
        });
    }

    playAllLoaderAnimation() {
        if (!this._loaderContainer) return
        gsap.to(this._loaderContainer, {
            rotation: Math.PI * 2,
            duration: 2,
            repeat: -1,
            ease: "linear"
        });
    }

    createLoaderContainer() {
        this._loaderContainer = new Container();
        this._loaderContainer.x = window.innerWidth / 2;
        this._loaderContainer.y = window.innerHeight / 2;
        this.addChild(this._loaderContainer);
        for (let i = 0; i < this._numDots; i++) {
            const dot = new Graphics();
            dot.beginFill(this._colors[i % this._colors.length]);
            dot.drawCircle(0, 0, this._dotRadius);
            dot.endFill();
            const angle = (i / this._numDots) * Math.PI * 2;
            dot.x = Math.cos(angle) * this._radius;
            dot.y = Math.sin(angle) * this._radius;
            this._loaderContainer.addChild(dot);
            this._dots.push(dot);
        }
    }

    hide() {
        gsap.to(this, {
            duration: .3,
            alpha: 0,
            onComplete: () => {
                const parent = this.parent as PIXI.Container;
                this.parent.removeChild(this);
                parent.destroy({children: true});
            }
        })
    }

    onResize() {
        // super.onResize();
        // this.setPositionLoaderContainer();
    }

    setPositionLoaderContainer() {
        const glPos = new Point(window.innerWidth / 2, window.innerHeight / 2);
        const pos = this.toLocal(glPos);
        this._loaderContainer?.position.set(pos.x, pos.y);
    }
}
