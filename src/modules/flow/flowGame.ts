import {Controller} from "../../utils/controller";
import * as PIXI from "pixi.js";
import {randomInteger} from "../../utils/helperFunctions";
import {GLOBAL_CLICK_ARE} from "../../app/app";
import {FlowNotifications} from "./flowNotification";


export class FlowGame extends Controller {
    constructor() {
        super();
        this.addEventClick()
    }

    addEventClick() {
        GLOBAL_CLICK_ARE?.on("pointerup", (event) => {
            const position = new PIXI.Point(event.x, event.y)

            this.sendNotification(FlowNotifications.CLICK, position)
        })
    }
}