import {BgController} from "../modules/bg/controller";
import {GameNotification} from "./notification";
import {setAnimationTimeoutSync} from "../utils/helperFunctions";

export class GameController extends BgController {
    async resourcesLoaded() {
        await setAnimationTimeoutSync(.1)
        this.sendNotification(GameNotification.RESOURCES_LOADED);
    }
}