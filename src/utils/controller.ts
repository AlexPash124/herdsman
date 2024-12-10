import {GLOBAL_EMITTER} from "./eventEmitter";
import EventEmitter from "eventemitter3";
import {Proxy} from "./proxy";
import * as PIXI from "pixi.js";


export class Controller {
    protected _emitter?: EventEmitter = GLOBAL_EMITTER;
    protected _proxy?: Proxy = Proxy.getInstance();
    constructor() {
        this.initEmitter();
    }

    initView(parent: PIXI.Container): void {}

    initEmitter() {
        this._emitter = GLOBAL_EMITTER;
    }

    sendNotification<T>(notification: string, data?: T): void {
        this._emitter?.emit(notification, data);
    }

    mapNotification<T>(notification: string, callback: (data: T) => void): void {
        this._emitter?.on(notification, (data: T) => {
            callback(data);
        });
    }
}