import { centerText } from "../ui.js";
import { createMenu } from "../menu.js";
import { escapeReset } from "../escreset.js";

export default class scene7 extends Phaser.Scene {
    constructor() {
        super("scene7");
    }

    create() {
    escapeReset(this);
    centerText(this, "your neighbours chose to NOT certify their seeds. XXXXXXX.");
    centerText(this, "press button to continue", 180);
        this.input.keyboard.once("keydown-SPACE", () => this.scene.start("scene9"));
        this.input.keyboard.once("keydown-ENTER", () => this.scene.start("scene9"));}
}
