import {Controller} from "../../utils/controller";
import {GameNotification} from "../../app/notification";
import {HerdsmanView} from "./view";
import * as PIXI from "pixi.js";

export class HerdsmanController extends Controller {
    protected _view?: HerdsmanView;
    constructor() {
        super();
        this.notificationOutside();
    }
    initView(parent: PIXI.Container ) {
        this._view = new HerdsmanView();
        parent.addChild(this._view)

        const pos = this._proxy?.getRandomPosition() || new PIXI.Point(100, 100);
        this._view?.setPositionHerdsman(pos);
    }

    notificationOutside() {
        this.mapNotification(GameNotification.RESOURCES_LOADED, (data)=> {

        });
    }
}