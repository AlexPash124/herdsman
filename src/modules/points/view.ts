import {View} from "../../utils/view";
import * as PIXI from "pixi.js";
import {TextStyle} from "pixi.js";

export class ViewPoints extends View {
    protected _textPoints?: PIXI.Text;
    protected readonly _textToOut?: string = "Points: "
    constructor() {
        super();

        this.createTextPoints();
    }

    createTextPoints(): void {
        const style = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 50,
            fontWeight: 'bold',
            fill: "#123",
            wordWrap: true,
            wordWrapWidth: 700,
        });

        this._textPoints = new PIXI.Text({
            text: "Bet dropped: ",
            style,
            anchor: .5,
        });
        this.addChild(this._textPoints);
        this._textPoints.text = this._textToOut + "0";
        this._textPoints.position.set(window.innerWidth - this.width, this.height);
    }

    updateTextPoints(points: number): void {
        if (!this._textPoints) return;

        this._textPoints.text = (this._textToOut as string) + points;
        this._textPoints.position.set(window.innerWidth - this.width, this.height);
    }
}