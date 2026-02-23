import { centerText } from "../ui.js";
import { createMenu } from "../menu.js";
import { escapeReset } from "../escreset.js";


export default class scene8 extends Phaser.Scene {
    constructor() {
        super("scene8");
    }

    create() {
    escapeReset(this);
    centerText(this, "the next planting season begins. it is illegal to plant your seeds as they have not been certified. you must choose between illegally planting seeds or trading seeds with your neighbors");
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
