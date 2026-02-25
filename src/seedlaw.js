import { centerText } from "../ui.js";
import { createMenu } from "../menu.js";
import { escapeReset } from "../escreset.js";


export default class seedlaw extends Phaser.Scene {
    constructor() {
        super("seedlaw");
    }

    preload() {
        // this.load.audio('seedlawAudio', 'assets/sounds/seedlaw-speech.mp3');
    }

    create() {
        // this.scene.setVisible(false, 'hud');
        escapeReset(this);
        centerText(this, "SEASON 2", -80, {fontSize: "32px"});
        const messageText = "RADIO CRACKLES: new law passed!\n\n'" + this.game.globalState.crop + " seeds are now patented by Monsanto. all farmers MUST use certified seeds from corporate suppliers. penalties for planting uncertified seeds include fines and loss of land tenure.'";
        centerText(this, messageText);
        // this.sound.play('seedlawAudio');
        createMenu(this, {
            title: "",
            options: [
                "[ continue ]"],
            callbacks: [
                () => {
                    this.scene.start("certify");
                }
            ]
        });
        // this.input.keyboard.once("keydown-SPACE", () => this.scene.start("certify"));
        // this.input.keyboard.once("keydown-ENTER", () => this.scene.start("certify"));           
    }
}
