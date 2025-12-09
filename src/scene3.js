import { centerText } from "../ui.js";
import { createMenu } from "../menu.js";
import { escapeReset } from "../escreset.js";

export default class scene3 extends Phaser.Scene {
    constructor() {
        super("scene3");
    }

    create() {
        // centerText(this, "you've chosen " + this.game.globalState.crop + " as your seed for this planting season.",
        // );
        createMenu(this, {
            title: ["you've chosen " + this.game.globalState.crop + " as your seed for this planting season."],
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
