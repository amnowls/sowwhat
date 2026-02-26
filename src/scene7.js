import { centerText } from "../ui.js";
import { createMenu } from "../menu.js";
import { escapeReset } from "../escreset.js";

export default class scene7 extends Phaser.Scene {
    constructor() {
        super("scene7");
    }

    create() {
    escapeReset(this);
    if (this.game.globalState.certified == true) {
        createMenu(this, {
            title: ["your neighbors have chosen to NOT certify their seeds."],
            options: [
                "[ continue ]",
            ],
            callbacks: [
                () => {
                    this.scene.start("scene8");
                }
            ]
        }); 
    } else {
        createMenu(this, {
            title: ["your neighbors have chosen to CERTIFY their seeds."],
            options: [
                "[ continue ]",
            ],
            callbacks: [
                () => {
                    this.scene.start("scene8");
                }
            ]
        }); 
}
    }
}