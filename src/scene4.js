import { centerText } from "../ui.js";
import { createMenu } from "../menu.js";

export default class scene4 extends Phaser.Scene {
    constructor() {
        super("scene4");
    }
    preload() {
    this.load.image("radio", "assets/animated-radio-image-0064.gif");
        }       
    create() {
        this.scene.setVisible(false, 'hud');
        // const radio = this.add.image(this.scale.width / 2, this.scale.height / 2.5, 'radio');
        // radio.setScale(2.5);
        // radio.setAlpha(0.5);
        // radio.setDepth(-1);

        centerText(this, "RADIO CRACKLES: new law passed!\n\n'" + this.game.globalState.crop + " seeds are now patented by Monsanto.\nall farmers must use certified seeds from\ncorporate suppliers. penalties for non-compliance\ninclude fines and loss of land tenure.'");
        this.input.keyboard.once("keydown-SPACE", () => this.scene.start("certify"));
        this.input.keyboard.once("keydown-ENTER", () => this.scene.start("certify"));        
    }
}
