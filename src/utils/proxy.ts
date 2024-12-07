import * as PIXI from "pixi.js";
import {randomInteger} from "./helperFunctions";

let instance: Proxy;
export class Proxy { //для даних

    static getInstance(): Proxy {
        if (!instance) {
            instance = new Proxy();
        }
        return instance;
    }

    getRandomPosition(): PIXI.Point {
        const x = randomInteger(100, window.innerWidth - 100);
        const y = randomInteger(100, window.innerHeight - 100);

        return new PIXI.Point(x, y);
    }
}