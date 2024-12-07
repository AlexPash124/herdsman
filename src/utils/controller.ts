import {IController} from "./intefrase/controller";
import {GLOBAL_EMITTER} from "./eventEmitter";
import {View} from "./view";
import EventEmitter from "eventemitter3";

export class Controller implements IController {
    protected _view?: View;
    protected _emitter?: EventEmitter;
    constructor() {
        this.initEmitter();
        this.initProxy();
    }

    initView(referenceConstructorUI: View) {
        this._view = referenceConstructorUI
    }

    initEmitter() {
        this._emitter = GLOBAL_EMITTER;
    }

    initProxy() {
        //this.proxy = Proxy.getInstance();
    }

    sendNotification<T>(notification: string, data?: T) {
        this._emitter?.emit(notification, {data});
    }

    mapNotification<T>(notification: string, callback: (data: T) => void) {
        this._emitter?.on(notification, (data: T) => {
            callback(data);
        });
    }
}