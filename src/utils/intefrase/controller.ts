import * as PIXI from "pixi.js";

export interface IController {
    initView(parent: PIXI.Container): void
    initEmitter(): void
    sendNotification<T>(notification: string, data: T): void
    mapNotification(notification: string, callback: object): void
}