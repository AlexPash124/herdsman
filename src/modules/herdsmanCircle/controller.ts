import {Controller} from "../../utils/controller";
import {GameNotification} from "../../app/notification";
import {HerdsmanView} from "./view";
import * as PIXI from "pixi.js";
import {FlowNotifications} from "../flow/flowNotification";

export class HerdsmanController extends Controller {
    protected _view?: HerdsmanView;

    constructor() {
        super();
        this.notificationOutside();
    }

    initView(parent: PIXI.Container) {
        this._view = new HerdsmanView();
        parent.addChild(this._view)

        const pos = this._proxy?.getRandomPosition() || new PIXI.Point(100, 100);
        this._view?.setPositionHerdsman(pos);
    }

    notificationOutside() {
        this.mapNotification(FlowNotifications.CLICK, (data) => {
            this._view?.changeAnimationPositionHerdsman(data as PIXI.Point)
        });
    }
}