import {BgController} from "../modules/bg/controller";
import {setAnimationTimeoutSync} from "../utils/helperFunctions";
import {GLOBAL_CLICK_ARE} from "./app";
import * as PIXI from "pixi.js";
import {GameNotification} from "./notification";

export class GameController extends BgController {
    async resourcesLoaded() {
        await setAnimationTimeoutSync(.1)
        this.sendNotification(GameNotification.RESOURCES_LOADED);
    }

    addEventClick() {
        GLOBAL_CLICK_ARE?.on("pointerup", (event) => {
            const position = new PIXI.Point(event.x, event.y)

            this.sendNotification(GameNotification.CLICK, position)
        })
    }
}