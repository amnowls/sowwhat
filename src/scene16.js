import { centerText } from "../ui.js";
import { createMenu } from "../menu.js";
import { escapeReset } from "../escreset.js";


export default class scene16 extends Phaser.Scene {
    constructor() {
        super("scene16");
    }

    create() {
        escapeReset(this);
        centerText(this, "POOR HARVEST", -80, { fontSize: "32px" });
        createMenu(this, {
            title: ["your yield is poor this season due to weather conditions and your " + this.game.globalState.soilhealth + " soil health."],
            options: [
                "[ sell at new grocery store ]",
                "[ sell at local market ]",
            ],
            callbacks: [
                () => {
                    if (this.game.globalState.certified == false) {
                        this.scene.start("scene17");
                    } else if (this.game.globalState.crop == "cowpea") {
                        this.game.globalState.money += 10;
                        this.game.globalState.neighborScore -= 2;
                    } else if (this.game.globalState.crop == "corn") {
                        this.game.globalState.money += 18;
                        this.game.globalState.neighborScore -= 2;
                    }
                    this.scene.get('hud').updateStats();
                    this.scene.start("season3stats");
                },
                () => {
                    if (this.game.globalState.crop == "cowpea") {
                        this.game.globalState.money += 8;
                        this.game.globalState.neighborScore += 2;
                    } else if (this.game.globalState.crop == "corn") {
                        this.game.globalState.money += 14;
                        this.game.globalState.neighborScore += 1;
                    }

                    this.scene.get('hud').updateStats();
                    this.scene.start("season3stats");
                }]
        })
    }
}


