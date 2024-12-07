import {Controller} from "../../utils/controller";
import {ViewBG} from "./view";
import * as PIXI from "pixi.js";


export class BgController extends Controller {
    protected _view?: ViewBG;

    initView(perent: PIXI.Container) {
        this._view = new ViewBG;
        perent.addChild(this._view);
    }
}