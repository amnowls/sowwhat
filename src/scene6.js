import { centerText } from "../ui.js";
import { createMenu } from "../menu.js";

export default class scene6 extends Phaser.Scene {
    constructor() {
        super("scene6");
    }

    create() {
        // this.scene.setVisible(false, 'hud');

    centerText(this, "");
        this.input.keyboard.once("keydown-SPACE", () => this.scene.start("certify"));
        this.input.keyboard.once("keydown-ENTER", () => this.scene.start("certify"));           
    }
}
