import {Controller} from "../../utils/controller";
import * as PIXI from "pixi.js";
import {PreloaderView} from "./view";
import {GameNotification} from "../../app/notification";

export class GamePreloaderController extends Controller {
    protected _view?: PreloaderView;
    constructor() {
        super();

        this.notificationOutside();
    }

    initView(parent: PIXI.Container): void {
        this._view = new PreloaderView();
        parent.addChild(this._view);
    }

    notificationOutside() {
        this.mapNotification(GameNotification.RESOURCES_LOADED,  ()=> {
            this._view?.hide();
        });
    }
}