import { centerText } from "../ui.js";
import { createMenu } from "../menu.js";
import { escapeReset } from "../escreset.js";


export default class scene9 extends Phaser.Scene {
    constructor() {
        super("scene9");
    }

    create() {
    escapeReset(this);
    // centerText(this, "the next planting season begins. you may legally plant your seeds as they have been certified.");
    createMenu(this, {
        title: "the next planting season begins. you may legally plant your seeds as they have been certified.",
        options: [
            "[ plant seeds ]"],
        callbacks: [
                () => {
                this.game.globalState.criminalRecord = "outlawed farmer";
                this.scene.get('hud').updateStats();
                this.scene.start("scene10");
            }
            ]
        }
        )
    }
}
