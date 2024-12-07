import {GLOBAL_EMITTER} from "./eventEmitter";
import {IView} from "./intefrase/view";
import EventEmitter from "eventemitter3";
import {Container} from "pixi.js";

export class View extends Container implements IView {
    private _emitter?: EventEmitter = GLOBAL_EMITTER;

    constructor() {
        super();

        this.initEmitter();
        this.addEventListenerResize();
    }

    initEmitter() {
        this._emitter = GLOBAL_EMITTER;
    }

    notifyToMediator(notification: string, data: unknown) {
        this._emitter?.emit(notification, {data});
    }

    addEventListenerResize() {
        window.addEventListener("resize", () => {
            setTimeout(() => {
                this.onResize()
            }, 100);
        });
    }

    onResize() {

    }

    isLandScape() {
        return screen.width > screen.height;
    }
}