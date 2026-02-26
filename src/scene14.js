import { centerText } from "../ui.js";
import { createMenu } from "../menu.js";
import { escapeReset } from "../escreset.js";


export default class scene14 extends Phaser.Scene {
    constructor() {
        super("scene14");
    }

    create() {
    escapeReset(this);
    centerText(this, "");
    createMenu(this, {
        // title: "you must choose between illegally planting seeds or trading seeds with your neighbors",
        options: [
            "[ A ]",
            "[ B ]"],
        callbacks: [
                () => {
                this.game.globalState.criminalRecord = "outlawed farmer";
                this.scene.start("scene1");
            },
                () => {
                this.game.globalState.neighborScore += 1;
                this.scene.start("scene1");
            },
            ]
        }
        );
    }
}
