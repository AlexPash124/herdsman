import {BgController} from "../modules/bg/controller";
import {GameNotification} from "./notification";

export class GameController extends BgController {
    resourcesLoaded() {
        this.sendNotification(GameNotification.RESOURCES_LOADED)
    }
}