import { centerText } from "../ui.js";
import { createMenu } from "../menu.js";

export default class scene8 extends Phaser.Scene {
    constructor() {
        super("scene8");
    }

    create() {

    centerText(this, "the next planting season begins. it is illegal to plant your seeds");
        this.input.keyboard.once("keydown-SPACE", () => this.scene.start("certify"));
        this.input.keyboard.once("keydown-ENTER", () => this.scene.start("certify"));           
    }
}
