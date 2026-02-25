import { centerText } from "../ui.js";
import { createMenu } from "../menu.js";
import { escapeReset } from "../escreset.js";


export default class scene10 extends Phaser.Scene {
    constructor() {
        super("scene10");
    }

    create() {
    escapeReset(this);
    // centerText(this, "CONTRACT AGREEMENT:\nfarmers must purchase and use pesticides on their crops to protect against pest infestations.");
    createMenu(this, {
        title: "CONTRACT AGREEMENT:\nfarmers are required to purchase and use pesticides on their crops to protect against pest infestations. failure to comply will result in a fine of up to $50.",
        options: [
            "[ buy pesticides -$18 ]",
            "[ do not buy pesticides ]"],
        callbacks: [
                () => {
                this.game.globalState.money -= 18;
                this.game.globalState.soilhealthIndex = Math.max(0, this.game.globalState.soilhealthIndex - 1);
                this.scene.get('hud').updateStats();
                if (window.__globalMoneyAudio) {
                    window.__globalMoneyAudio.currentTime = 0;
                    window.__globalMoneyAudio.play().catch(() => {});
                }   
                this.scene.start("scene11");
            },
                () => {
                this.scene.globalState.fines += 50;
                this.scene.get('hud').updateStats();
                this.scene.start("scene11");},

            ]
        }
        );
    }
}
