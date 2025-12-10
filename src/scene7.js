import { centerText } from "../ui.js";
import { createMenu } from "../menu.js";
import { escapeReset } from "../escreset.js";

export default class scene7 extends Phaser.Scene {
    constructor() {
        super("scene7");
    }

    create() {
    escapeReset(this);
    centerText(this, "your neighbours chose to NOT certify their seeds. they are now facing legal action from the corporation for patent infringement. they have been fined heavily and risk losing their land tenure.");
        // this.input.keyboard.once("keydown-SPACE", () => this.scene.start("certify"));
        // this.input.keyboard.once("keydown-ENTER", () => this.scene.start("certify"));           
    }
}
