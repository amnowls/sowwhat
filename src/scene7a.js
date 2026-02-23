import { centerText } from "../ui.js";
import { createMenu } from "../menu.js";
import { escapeReset } from "../escreset.js";

export default class scene7a extends Phaser.Scene {
    constructor() {
        super("scene7a");
    }

    create() {
    escapeReset(this);
    centerText(this, "your neighbours also chose to certify their seeds. the community is now under the control of the corporation and struggling financially due to certification costs.");
    centerText(this, "press button to continue", 180);
        this.input.keyboard.once("keydown-SPACE", () => this.scene.start("scene9"));
        this.input.keyboard.once("keydown-ENTER", () => this.scene.start("scene9"));}
}
