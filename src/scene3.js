import { centerText } from "../ui.js";
export default class scene3 extends Phaser.Scene {
    constructor() {
        super("scene3");
    }

    create() {
        centerText(this, "you've chosen " + this.game.globalState.crop + " as your seed\nfor this planting season.",
);

    }
}