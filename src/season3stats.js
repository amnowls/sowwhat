import { centerText, createTypewriterText} from "../ui.js";
import { createMenu } from "../menu.js";
import { escapeReset } from "../escreset.js";
import { COLORS, TYPEWRITER_SPEED } from "../constants.js";


export default class season3stats extends Phaser.Scene {
    constructor() {
        super("season3stats");
    }
    create() {
    escapeReset(this);

    this.cameras.main.setBackgroundColor(COLORS.PRIMARY_BLUE);

    centerText(this, "SEASON 3 STATS.", -80, {fill: COLORS.ACCENT_ORANGE, fontSize: "30px", fontFamily: 'PressStart2P', align: "center"},);
    createTypewriterText(
        this,
        "\n\nprofit:\nsoilhealth: " + this.game.globalState.soilhealth + "\nneighbor score: " + this.game.globalState.neighborScore,
        0,
        {fill: COLORS.ACCENT_ORANGE},
        TYPEWRITER_SPEED.FAST, 
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
        fontColor: COLORS.WHITE, // normal option color (white)
        highlightColor: COLORS.ACCENT_ORANGE // highlighted option color (orange)
        });
    }
);
}
}
