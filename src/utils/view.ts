import {GLOBAL_EMITTER} from "./eventEmitter";
import EventEmitter from "eventemitter3";
import {Container} from "pixi.js";

export class View extends Container {
    private _emitter?: EventEmitter = GLOBAL_EMITTER;

    constructor() {
        super();

        this.initEmitter();
    }

    protected initEmitter(): void {
        this._emitter = GLOBAL_EMITTER;
    }

    notifyToMediator<T>(notification: string, data?: T): void {
        this._emitter?.emit(notification, data);
    }
}
