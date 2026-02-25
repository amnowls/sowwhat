import { centerText } from "../ui.js";
import { createMenu } from "../menu.js";
import { escapeReset } from "../escreset.js";


export default class scene10a extends Phaser.Scene {
    constructor() {
        super("scene10a");
    }

    create() {
    escapeReset(this);
    centerText(this, "pests have gotten onto your farm and threaten to destroy your crops. would you like to buy pesticides to protect your crops?");
    createMenu(this, {
        // title: "you must choose between illegally planting seeds or trading seeds with your neighbors",
        options: [
            "[ buy pesticides ]",
            "[ do not buy pesticides ]"],
        callbacks: [
                () => {
                this.game.globalState.money -= 18;
                this.game.globalState.soilhealth -= 1;
                if (window.__globalMoneyAudio) {
                    window.__globalMoneyAudio.currentTime = 0;
                    window.__globalMoneyAudio.play().catch(() => {});
                }                   
                this.scene.get('hud').updateStats();
                this.scene.start("scene11");
            },
                () => {
                this.start.scene.start("scene11");
            },
            ]
        }
        );
    }
}
