import { centerText } from "../ui.js";
import { createMenu } from "../menu.js";
import { escapeReset } from "../escreset.js";


export default class scene17 extends Phaser.Scene {
    constructor() {
        super("scene17");
    }

    create() {
        escapeReset(this);
        // centerText(this, "");
        createMenu(this, {
            title: ["THEN GROCERY STORE REFUSES TO BUY UNCERTIFIED PRODUCE.\n\nyou must sell at the local market."],
            options: [
                "[ sell at local market ]",
            ],
            callbacks: [
                () => {
                    this.globalState.money += 10;
                    this.scene.get('hud').updateStats();
                    this.scene.start("season3stats");
                }
            ]
        })
    }
}


