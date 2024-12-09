import {Controller} from "../../utils/controller";
import {HerdsmanView} from "./view";
import * as PIXI from "pixi.js";
import {FlowNotifications} from "../flow/flowNotification";
import {HerdsmanCircleNotification} from "./notification";

export class HerdsmanController extends Controller {
    protected _view?: HerdsmanView;

    constructor() {
        super();
        this.notificationOutside();
        this.uiNotification();
    }

    initView(parent: PIXI.Container) {
        this._view = new HerdsmanView();
        parent.addChild(this._view)

        const pos = this._proxy?.getRandomPosition() || new PIXI.Point(100, 100);
        this._view?.setPositionHerdsman(pos);
    }

    notificationOutside() {
        this.mapNotification<PIXI.Point>(FlowNotifications.CLICK, (data) => {
            this._view?.changeAnimationPositionHerdsman(data as PIXI.Point)
        });
    }

    uiNotification() {
        this.mapNotification(HerdsmanView.HERDSMAN_CHANGED_POSITION, (data) => {
            this.sendNotification(HerdsmanCircleNotification.HERDSMAN_CHANGED_POSITION, data);
        })
    }
}