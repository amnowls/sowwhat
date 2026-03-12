import { centerText, createTypewriterText } from "../ui.js";
import { createMenu } from "../menu.js";
import { escapeReset } from "../escreset.js";


export default class season1stats extends Phaser.Scene {
    constructor() {
        super("season1stats");
    }
    create() {
        escapeReset(this);

        this.cameras.main.setBackgroundColor("#1645f5");
        // if (this.game.globalState.pesticides == true && this.game.globalState.certified == false) {
        //     this.game.globalState.yield = this.game.globalState.planting * 3 - this.game.globalState.soilhealth * 3;
        // } else if (this.game.globalState.pesticides == true || this.game.globalState.certified == true) {
        //     this.game.globalState.yield = this.game.globalState.planting * 3 - this.game.globalState.soilhealth * 5;
        // } else if (this.game.globalState.pesticides == false && this.game.globalState.certified == false) {
        //     this.game.globalState.yield = this.game.globalState.planting * 3 - this.game.globalState.soilhealth * 4;
        // } else {
        //     this.game.globalState.yield = this.game.globalState.planting * 3 - this.game.globalState.soilhealth * 4;
        // }
        this.game.globalState.yield = (this.game.globalState.planting * 3)  * 5;

        // this.game.globalState.profit = this.game.globalState.yield * 2 - (this.game.globalState.criminality * 5 + this.game.globalState.fines * 10);

        centerText(this, "SEASON 1 STATS.", -80, { fill: "#ffb000", fontSize: "30px", fontFamily: 'PressStart2P', align: "center" },
        );
        createTypewriterText(
            this,
            "\n\nYIELD: " + this.game.globalState.yield + "\nprofit:\nneighbor score: " + this.game.globalState.neighborScore,
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
                            this.scene.start("seedlaw");
                        }
                    ],
                    fontColor: "#ffffff", // normal option color (white)
                    highlightColor: "#ffb000" // highlighted option color (orange)
                });
            }
        );
    }
}
