import { centerText } from "../ui.js";
import { createMenu } from "../menu.js";
import { escapeReset } from "../escreset.js";

export default class scene7a extends Phaser.Scene {
    constructor() {
        super("scene7a");
    }

    create() {
    escapeReset(this);
    centerText(this, "your neighbours CERTIFIED their seeds. XXXXX");
    centerText(this, "press button to continue", 180);
        this.input.keyboard.once("keydown-SPACE", () => this.scene.start("scene8"));
        this.input.keyboard.once("keydown-ENTER", () => this.scene.start("scene8"));}
}
