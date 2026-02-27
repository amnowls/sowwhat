import { centerText } from "../ui.js";
import { createMenu } from "../menu.js";
import { escapeReset } from "../escreset.js";


export default class scene13 extends Phaser.Scene {
    constructor() {
        super("scene13");
    }

    create() {
    escapeReset(this);
    centerText(this, "");
    createMenu(this, {
        title: "PLANT SEEDS MINI GAME",
        options: [
            "[ plant ]",
        ],
        callbacks: [
                () => {
                this.scene.start("scene14");
            },
            ]
        }
        );
    }
}
