import { centerText, createTypewriterText } from "../ui.js";
import { createMenu } from "../menu.js";
import { escapeReset } from "../escreset.js";
import { COLORS, TYPEWRITER_SPEED } from "../constants.js";


export default class season2stats extends Phaser.Scene {
    constructor() {
        super("season2stats");
    }
    create() {
        escapeReset(this);

        this.cameras.main.setBackgroundColor(COLORS.PRIMARY_BLUE);
        if (this.game.globalState.pesticides == true && this.game.globalState.certified == false) {
            this.game.globalState.yield = ((this.game.globalState.planting * 3) - this.game.globalState.soilhealthIndex) * 3;
        } else if (this.game.globalState.pesticides == true || this.game.globalState.certified == true) {
            this.game.globalState.yield = ((this.game.globalState.planting * 3) - this.game.globalState.soilhealthIndex) * 5;
        } else if (this.game.globalState.pesticides == false && this.game.globalState.certified == false) {
            this.game.globalState.yield = ((this.game.globalState.planting * 3) - this.game.globalState.soilhealthIndex) * 4;
        } else {
            this.game.globalState.yield = ((this.game.globalState.planting * 3) - this.game.globalState.soilhealthIndex) * 4;
        }
        centerText(this, "SEASON 2 STATS.", -80, { fill: COLORS.ACCENT_ORANGE, fontSize: "30px", fontFamily: 'PressStart2P', align: "center" },);
        createTypewriterText(
            this,
            "\n\nprofit: " + this.game.globalState.profit + "\nneighbor score: " + this.game.globalState.neighborScore,
            0,
            { fill: COLORS.ACCENT_ORANGE },
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
                            this.scene.start("scene12");
                        }
                    ],
                    fontColor: COLORS.WHITE, // normal option color (white)
                    highlightColor: COLORS.ACCENT_ORANGE // highlighted option color (orange)
                });
            }
        );
    }
}
