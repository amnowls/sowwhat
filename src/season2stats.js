import { centerText, createTypewriterText } from "../ui.js";
import { createMenu } from "../menu.js";
import { escapeReset } from "../escreset.js";


export default class season2stats extends Phaser.Scene {
    constructor() {
        super("season2stats");
    }
    create() {
        escapeReset(this);

        this.cameras.main.setBackgroundColor("#1645f5");
        if (this.game.globalState.pesticides == true && this.game.globalState.certified == false) {
            this.game.globalState.yield = this.game.globalState.planting * 3 - this.game.globalState.soilhealth * 3;
        } else if (this.game.globalState.pesticides == true || this.game.globalState.certified == true) {
            this.game.globalState.yield = this.game.globalState.planting * 3 - this.game.globalState.soilhealth * 5;
        } else if (this.game.globalState.pesticides == false && this.game.globalState.certified == false) {
            this.game.globalState.yield = this.game.globalState.planting * 3 - this.game.globalState.soilhealth * 4;
        } else {
            this.game.globalState.yield = this.game.globalState.planting * 3 - this.game.globalState.soilhealth * 4;
        }
        centerText(this, "SEASON 2 STATS.", -80, { fill: "#ffb000", fontSize: "30px", fontFamily: 'PressStart2P', align: "center" },);
        createTypewriterText(
            this,
            "\n\nprofit: " + this.game.globalState.profit + "\nneighbor score: " + this.game.globalState.neighborScore,
            0,
            { fill: "#ffb000" },
            6,
            () => {
                createMenu(this, {
                    title: [""],
                    options: [
                        "[ continue to NEXT SEASON ]",
                    ],
                    callbacks: [
                        () => {
                            this.scene.get('hud').updateStats();
                            this.scene.start("scene12");
                        }
                    ],
                    fontColor: "#ffffff", // normal option color (white)
                    highlightColor: "#ffb000" // highlighted option color (orange)
                });
            }
        );
    }
}
