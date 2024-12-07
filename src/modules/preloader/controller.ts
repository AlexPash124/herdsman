import {Controller} from "../../utils/controller";
import * as PIXI from "pixi.js";
import {PreloaderView} from "./view";

export class GamePreloaderController extends Controller {
    protected _view?: PreloaderView;
    constructor() {
        super();

        //this.notificationOutside();
    }

    initView(parent: PIXI.Container) {
        this._view = new PreloaderView();
        parent.addChild(this._view)
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