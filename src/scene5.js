import { centerText } from "../ui.js";
import { createMenu } from "../menu.js";
import { escapeReset } from "../escreset.js";

export default class scene5 extends Phaser.Scene {
    constructor() {
        super("scene5");
    }

    create() {
        escapeReset(this);
        // this.scene.setVisible(false, 'hud');

    centerText(this, "RADIO CRACKLES: new law passed!\n\n'" + this.game.globalState.crop + " seeds are now patented by Monsanto.\nall farmers must use certified seeds from\ncorporate suppliers. penalties for non-compliance\ninclude fines and loss of land tenure.'");
        this.input.keyboard.once("keydown-SPACE", () => this.scene.start("certify"));
        this.input.keyboard.once("keydown-ENTER", () => this.scene.start("certify"));           
    }
}
