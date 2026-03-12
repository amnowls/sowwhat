import { centerText, createTypewriterText } from "../ui.js";
import { createMenu } from "../menu.js";
import { escapeReset } from "../escreset.js";


export default class seedlaw extends Phaser.Scene {
    constructor() {
        super("seedlaw");
    }

    preload() {
        this.load.image('tv', 'assets/tv_sowwhat.png');
        // this.load.audio('seedlawAudio', 'assets/sounds/seedlaw-speech.mp3');
    }

    create() {
        this.game.globalState.season == 2;
        this.scene.get('hud').updateStats();
        this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'tv').setScale(2.5);
        this.scene.setVisible(true, 'hud');
        escapeReset(this);
        centerText(this, "SEASON 2 ", -120, { fontSize: "40px" });
        const messageText = "RADIO ANNOUNCEMENT: new law passed!\n\n'" + this.game.globalState.crop + " seeds are now patented by Monsanto. all farmers MUST use certified seeds from corporate suppliers. penalties for planting uncertified seeds include fines and loss of land tenure.'";
        createTypewriterText(this, messageText, 0, {}, 6,
            () => {
                createMenu(this, {
                    title: "",
                    options: [
                        "[ continue ]"],
                    callbacks: [
                        () => {
                            this.scene.start("certify");
                        }
                    ]
                })
            });
        // this.sound.play('seedlawAudio');

        // this.input.keyboard.once("keydown-SPACE", () => this.scene.start("certify"));
        // this.input.keyboard.once("keydown-ENTER", () => this.scene.start("certify"));           
    }
}
