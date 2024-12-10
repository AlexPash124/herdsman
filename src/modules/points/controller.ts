import {Controller} from "../../utils/controller";
import {ViewPoints} from "./view";
import * as PIXI from "pixi.js";
import {PointsNotification} from "./notification";


export class PointsController extends Controller {
    protected _view?: ViewPoints;

    constructor() {
        super();
        this.notificationOutside();
    }

    initView(perent: PIXI.Container): void {
        this._view = new ViewPoints;
        perent.addChild(this._view);
    }

    notificationOutside(): void {
        this.mapNotification(PointsNotification.UPDATE_POINTS, (data) => {
            this._view?.updateTextPoints(data as number);
        });
    }
}