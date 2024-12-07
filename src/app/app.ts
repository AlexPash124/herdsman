import * as PIXI from "pixi.js";
import {BgController} from "../modules/bg/controller";
import {ViewBG} from "../modules/bg/view";
import {Assets} from "pixi.js";
import {manifest} from "../manifest";
import {PreloaderView} from "../modules/preloader/view";
import {GamePreloaderController} from "../modules/preloader/mediator";
import {setAnimationTimeoutSync} from "../utils/helperFunctions";
import {GameController} from "./controller";

export class App extends PIXI.Application {
    protected _gameController?: GameController;

    async startGame() {
        this._gameController = new GameController();
        this.createPreloader();
        await this.loadResources()
        this._gameController.resourcesLoaded();
        await setAnimationTimeoutSync(1);
        this.createBg();
    }

    async loadResources() {
        await Assets.init({manifest});
        for (const bundle of manifest.bundles) {
            await Assets.loadBundle(bundle.name);
        }
    }

    createPreloader() {
        const preloaderContainer = new PIXI.Container();
        this.stage.addChild(preloaderContainer);
        const view: PreloaderView = new PreloaderView();
        const instanceMediator: GamePreloaderController = new GamePreloaderController();
        instanceMediator.initView(view);
        preloaderContainer.addChild(view);
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
