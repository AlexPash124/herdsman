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

    sendNotification(notification: string, data: unknown) {
        this._emitter?.emit(notification, {data});
    }

    mapNotification(notification: string, callback: (data: unknown) => void) {
        this._emitter?.on(notification, (data: unknown) => {
            callback(data);
        });
    }
}