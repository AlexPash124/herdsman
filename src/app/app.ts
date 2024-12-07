import * as PIXI from "pixi.js";
import {BgController} from "../modules/bg/controller";
import {Assets} from "pixi.js";
import {manifest} from "../manifest";
import {GamePreloaderController} from "../modules/preloader/controller";
import {setAnimationTimeoutSync} from "../utils/helperFunctions";
import {GameController} from "./controller";
import {HerdsmanController} from "../modules/herdsmanCircle/controller";
import {FlowGame} from "../modules/flow/flowGame";

export let GLOBAL_CLICK_ARE: PIXI.Container;

export class App extends PIXI.Application {
    protected _gameController?: GameController;

    async startGame() {
        this._gameController = new GameController();
        this.createPreloader();

        await this.loadResources()
        await setAnimationTimeoutSync(1);
        this._gameController.resourcesLoaded();
        this.createBg();
        this.createHerdsman();

        new FlowGame();
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
        const preloaderController: GamePreloaderController = new GamePreloaderController();
        preloaderController.initView(preloaderContainer);
    }

    createBg() {
        const bgContainer = new PIXI.Container();
        bgContainer.interactive = true;
        GLOBAL_CLICK_ARE = bgContainer;
        this.stage.addChild(bgContainer);
        const bgController: BgController = new BgController();
        bgController.initView(bgContainer);
    }

    createHerdsman() {
        const herdsmanContainer = new PIXI.Container();
        this.stage.addChild(herdsmanContainer);
        const herdsmanController: HerdsmanController = new HerdsmanController();
        herdsmanController.initView(herdsmanContainer);
    }
}
