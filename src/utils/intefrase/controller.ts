import {View} from "../view";
import {Container} from "pixi.js";

export interface IController {
    initView(referenceConstructorUI: View): void
    initEmitter(): void
    initProxy(): void
    sendNotification<T>(notification: string, data: T): void
    mapNotification(notification: string, callback: object): void
}