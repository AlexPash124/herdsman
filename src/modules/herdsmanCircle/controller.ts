import {Controller} from "../../utils/controller";
import {HerdsmanView} from "./view";
import * as PIXI from "pixi.js";
import {HerdsmanCircleNotification} from "./notification";
import {GameNotification} from "../../app/notification";

export class HerdsmanController extends Controller {
    protected _view?: HerdsmanView;

    constructor() {
        super();
        this.notificationOutside();
        this.uiNotification();
    }

    initView(parent: PIXI.Container): void {
        this._view = new HerdsmanView();
        parent.addChild(this._view)

        const pos = this._proxy?.getRandomPosition() || new PIXI.Point(100, 100);
        this._view?.setPositionHerdsman(pos);
    }

    protected notificationOutside(): void {
        this.mapNotification<PIXI.Point>(GameNotification.CLICK, (data) => {
            this._view?.changeAnimationPositionHerdsman(data as PIXI.Point)
        });
    }

    protected uiNotification(): void {
        this.mapNotification(HerdsmanView.HERDSMAN_CHANGED_POSITION, (data) => {
            this.sendNotification(HerdsmanCircleNotification.HERDSMAN_CHANGED_POSITION, data);
        })
    }
}