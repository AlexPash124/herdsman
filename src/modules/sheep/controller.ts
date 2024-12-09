import {Controller} from "../../utils/controller";
import {ViewSheep} from "./view";
import * as PIXI from "pixi.js";
import {HerdsmanCircleNotification} from "../herdsmanCircle/notification";


export class SheepController extends Controller {

    constructor() {
        super();
        this.notificationOutside();
    }
    protected _view?: ViewSheep;

    initView(perent: PIXI.Container) {
        this._view = new ViewSheep;
        perent.addChild(this._view);

        if (!this._proxy) return
        const numberStartSheep =  this._proxy?.getNumberStartSheep();
        //const numberStartSheep =  1;
        for(let i= 0; i < numberStartSheep; i++) {
            const randomPosition = this._proxy?.getRandomPosition();
            this._view.createSheep(i, randomPosition);
        }
    }

    notificationOutside() {
        this.mapNotification(HerdsmanCircleNotification.HERDSMAN_CHANGED_POSITION, (data) => {
            this._view?.checkIsCollisionInHerdsman(data as PIXI.Point);
        });
    }
}