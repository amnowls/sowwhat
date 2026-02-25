import { centerText } from "../ui.js";
import { createMenu } from "../menu.js";
import { escapeReset } from "../escreset.js";


export default class season1stats extends Phaser.Scene {
    constructor() {
        super("season1stats");
    }

    create() {
    this.cameras.main.setBackgroundColor("#1645f5");
        centerText(this, "SEASON 1 HAS ENDED.", -80, {fill: "#ffb000", fontSize: "30px", fontFamily: 'PressStart2P', align: "center"},
        );
        centerText(this, "\n\nprofit: xxx\nneighbor score: xxx", 0, {fill: "#ffb000"},
        );
        escapeReset(this);
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
}
