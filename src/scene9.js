import { centerText } from "../ui.js";
import { createMenu } from "../menu.js";
import { escapeReset } from "../escreset.js";


export default class scene9 extends Phaser.Scene {
    constructor() {
        super("scene9");
    }

    create() {
        escapeReset(this);
        // centerText(this, "CONTRACT AGREEMENT:\nfarmers must purchase and use pesticides on their crops to protect against pest infestations.");
        if (this.game.globalState.certified == true) {
            createMenu(this, {
                title: "CONTRACT AGREEMENT:\nfarmers are REQUIRED to purchase and use pesticides on their crops to protect against pest infestations. failure to comply will result in a fine of up to $50.",
                options: [
                    "[ buy pesticides -$18 ]",
                    "[ do not buy pesticides ]"],
                callbacks: [
                    () => {
                        this.game.globalState.money -= 18;
                        this.game.globalState.soilhealthIndex -= 1;
                        this.scene.get('hud').updateStats();

                        this.scene.start("scene10");
                    },
                    () => {
                        this.game.globalState.fines += 50;
                        this.game.globalState.soilhealthIndex += 1;
                        this.scene.get('hud').updateStats();
                        this.scene.start("scene10");
                    },
                ]
            }
            );
        }
        else {
            createMenu(this, {
                title: "pests have gotten onto your farm and threaten to destroy your crops. would you like to buy pesticides to protect your crops?",
                options: [
                    "[ buy pesticides -$18 ]",
                    "[ do not buy pesticides ]"],
                callbacks: [
                    () => {
                        this.game.globalState.money -= 18;
                        this.game.globalState.soilhealthIndex -= 1;
    
                        this.scene.get('hud').updateStats();
                        this.scene.start("scene10");
                    },
                    () => {
                        this.scene.get('hud').updateStats();
                        this.scene.start("scene10");
                    },
                ]
            })
        }
    }
}


