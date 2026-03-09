import { centerText, createTypewriterText} from "../ui.js";
import { createMenu } from "../menu.js";
import { escapeReset } from "../escreset.js";


export default class season3stats extends Phaser.Scene {
    constructor() {
        super("season3stats");
    }
    create() {
    escapeReset(this);

    this.cameras.main.setBackgroundColor("#1645f5");

    centerText(this, "SEASON 3 STATS.", -80, {fill: "#ffb000", fontSize: "30px", fontFamily: 'PressStart2P', align: "center"},);
    createTypewriterText(
        this,
        "\n\nPOOR HARVEST.\nsoilhealth: " + this.game.globalState.soilhealth + "\nneighbor score: " + this.game.globalState.neighborScore,
        0,
        {fill: "#ffb000"},
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
                    this.scene.start("scene18");
                }
            ],
        fontColor: "#ffffff", // normal option color (white)
        highlightColor: "#ffb000" // highlighted option color (orange)
        });
    }
);
}
}
