import { centerText } from "../ui.js";
import { createMenu } from "../menu.js";
import { escapeReset } from "../escreset.js";


export default class scene9 extends Phaser.Scene {
    constructor() {
        super("scene9");
    }

    create() {
    escapeReset(this);
    centerText(this, "the next planting season begins. you may legally plant your seeds as they have been certified.");
    createMenu(this, {
        // title: "you must choose between illegally planting seeds or trading seeds with your neighbors",
        options: [
            "[ plant illegally ]",
            "[ trade seeds with neighbors ]"],
        callbacks: [
                () => {
                this.game.globalState.criminalRecord = "outlawed farmer";
                this.scene.get('hud').updateStats();
                this.scene.start("scene10");
            },
                () => {
                this.game.globalState.neighborScore += 1;
                this.scene.get('hud').updateStats();
                this.scene.start("scene10");
            },
            ]
        }
        );
    }
}
