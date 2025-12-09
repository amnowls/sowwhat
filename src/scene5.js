import { centerText } from "../ui.js";
import { createMenu } from "../menu.js";

export default class scene5 extends Phaser.Scene {
    constructor() {
        super("scene5");
    }

    create() {
        // this.scene.setVisible(false, 'hud');

    centerText(this, "RADIO CRACKLES: new law passed!\n\n'" + this.game.globalState.crop + " seeds are now patented by Monsanto. all farmers must use certified seeds from corporate suppliers. penalties for non-compliance include fines and loss of land tenure.'");
        this.input.keyboard.once("keydown-SPACE", () => this.scene.start("certify"));
        this.input.keyboard.once("keydown-ENTER", () => this.scene.start("certify"));           
    }
}
