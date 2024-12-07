import {Controller} from "../../utils/controller";

export class GamePreloaderController extends Controller {

    constructor() {
        super();

        //this.notificationOutside();
    }

    // notificationOutside() {
    //     this.mapNotification(GameNotification.RESOURCES_LOADED, async (data)=> {
    //         await setAnimationTimeoutSync(1);
    //         this.view.hide();
    //         await setAnimationTimeoutSync(.5);
    //         this.sendNotification(PreloaderNotification.HIDE_PRELOADER_COMPLETED);
    //     });
    // }
}