import { centerText } from "../ui.js";
import { createMenu } from "../menu.js";
import { escapeReset } from "../escreset.js";


export default class scene12 extends Phaser.Scene {
    constructor() {
        super("scene12");
    }

    create() {
    escapeReset(this);
        centerText(this, "SEASON 3", -80, {fontSize: "32px"});
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
        })});}}
