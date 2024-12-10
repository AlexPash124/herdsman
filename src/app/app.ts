import * as PIXI from "pixi.js";
import {BgController} from "../modules/bg/controller";
import {Assets} from "pixi.js";
import {manifest} from "../manifest";
import {GamePreloaderController} from "../modules/preloader/controller";
import {setAnimationTimeoutSync} from "../utils/helperFunctions";
import {GameController} from "./controller";
import {HerdsmanController} from "../modules/herdsmanCircle/controller";
import {SheepController} from "../modules/sheep/controller";
import {PointsController} from "../modules/points/controller";

export let GLOBAL_CLICK_ARE: PIXI.Container;

export class App extends PIXI.Application {
    protected _gameController?: GameController;

    async startGame(): Promise<void> {
        this._gameController = new GameController();
        this.createPreloader();

        await this.loadResources()
        await setAnimationTimeoutSync(1);
        this._gameController.resourcesLoaded();
        this.createBg();
        this.createHeep();
        this.createHerdsman();
        this.createPoints();

        this._gameController.addEventClick();
    }

    protected async loadResources(): Promise<void> {
        await Assets.init({manifest});
        for (const bundle of manifest.bundles) {
            await Assets.loadBundle(bundle.name);
        }
    }

    protected createPreloader(): void {
        const preloaderContainer = new PIXI.Container();
        this.stage.addChild(preloaderContainer);
        const preloaderController: GamePreloaderController = new GamePreloaderController();
        preloaderController.initView(preloaderContainer);
    }

    protected createBg(): void {
        const bgContainer = new PIXI.Container();
        bgContainer.interactive = true;
        GLOBAL_CLICK_ARE = bgContainer;
        this.stage.addChild(bgContainer);
        const bgController: BgController = new BgController();
        bgController.initView(bgContainer);
    }

    protected createHerdsman(): void {
        const herdsmanContainer = new PIXI.Container();
        this.stage.addChild(herdsmanContainer);
        const herdsmanController: HerdsmanController = new HerdsmanController();
        herdsmanController.initView(herdsmanContainer);
    }

    protected createHeep(): void {
        const sheepContainer = new PIXI.Container();
        this.stage.addChild(sheepContainer);
        const sheepController: SheepController = new SheepController();
        sheepController.initView(sheepContainer);
    }

    protected createPoints(): void {
        const pointsContainer = new PIXI.Container();
        this.stage.addChild(pointsContainer);
        const sheepController: PointsController = new PointsController();
        sheepController.initView(pointsContainer);
    }
}
