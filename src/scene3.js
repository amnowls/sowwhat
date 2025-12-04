import { centerText } from "../ui.js";
import { createMenu } from "../menu.js";

export default class scene3 extends Phaser.Scene {
    constructor() {
        super("scene3");
    }

    create() {
        centerText(this, "you've chosen " + this.game.globalState.crop + " as your seed\nfor this planting season.",
        );
        createMenu(this, {
            options: [
                "[ plant seeds ]",
                ],
            callbacks: [
                () => {
                    this.scene.start("scene4");
                }
            ]
        }
        );
    }
}
