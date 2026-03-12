import { centerText, createTypewriterText } from "../ui.js";
import { createMenu } from "../menu.js";
import { escapeReset } from "../escreset.js";


export default class scene16 extends Phaser.Scene {
    constructor() {
        super("scene16");
    }


    create() {
        escapeReset(this);
        centerText(this, "POOR HARVEST", -120, { fontSize: "32px" });

        let titleMessage;
        if (this.game.globalState.soilhealthIndex <= 2) {
            titleMessage = "\n\nyour yield is poor this season due to weather conditions and your " + this.game.globalState.soilhealth + " soil health.";
        } else if (this.game.globalState.planting <= 2) {
            titleMessage = "\n\nyour yield is poor this season due to weather conditions and poor planting.";
        }
        else if (this.game.globalState.pesticides == false) {
            titleMessage = "\n\nyour yield is poor this season due to weather conditions and pest damage.";
        } else {
            titleMessage = "\n\nyour yield is poor this season due to weather conditions.";
        };
        this.title = createTypewriterText(this, titleMessage, 0, {}, 6);
        this.tweens.add({
            targets: this.title,

            duration: 600,
            yoyo: true,
            repeat: 3
        });
        
        createMenu(this, {

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


