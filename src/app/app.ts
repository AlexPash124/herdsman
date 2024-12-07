import * as PIXI from "pixi.js";
import {BgController} from "../modules/bg/controller";
import {ViewBG} from "../modules/bg/view";

export class App extends PIXI.Application {
    startGame() {
        this.createBg();
    }


    createBg() {
        const bgContainer = new PIXI.Container();
        this.stage.addChild(bgContainer);

        const view = new ViewBG();
        const instanceMediator: BgController = new BgController();
        instanceMediator.initView(view);
        bgContainer.addChild(view);
    }
}
