import {Controller} from "../../utils/controller";
import {ViewSheep} from "./view";
import * as PIXI from "pixi.js";
import {HerdsmanCircleNotification} from "../herdsmanCircle/notification";
import {randomInteger, setAnimationTimeoutSync} from "../../utils/helperFunctions";
import {Sheep} from "./component/sheep";
import {PointsNotification} from "../points/notification";


export class SheepController extends Controller {

    constructor() {
        super();
        this.notificationOutside();
        this.mapUiNotification();
        this.addNewShep();
    }
    protected _view?: ViewSheep;

    initView(perent: PIXI.Container) {
        this._view = new ViewSheep;
        perent.addChild(this._view);

        if (!this._proxy) return
        const numberStartSheep =  this._proxy?.getNumberStartSheep();
        for(let i= 0; i < numberStartSheep; i++) {
            const randomPosition = this._proxy?.getRandomPosition();
            this._view.createSheep(randomPosition);
        }
    }

    protected mapUiNotification(): void {
        this.mapNotification(Sheep.SHEEP_ADDED_TO_HOME, () => {
            this.sendNotification(PointsNotification.UPDATE_POINTS, this._view?.getNumberSheepInHouse());
        });
    }

    protected notificationOutside(): void {
        this.mapNotification(HerdsmanCircleNotification.HERDSMAN_CHANGED_POSITION, (data) => {
            this._view?.checkIsCollisionInHerdsman(data as PIXI.Point);
        });
    }

    protected async addNewShep(): Promise<void> {
        await setAnimationTimeoutSync(randomInteger(3, 10));
        const randomPosition = this._proxy?.getRandomPosition() || new PIXI.Point(100, 100);
        this._view?.createSheep(randomPosition);

        this.addNewShep();
    }
}