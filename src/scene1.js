import { centerText, createTypewriterText } from "../ui.js";
import { createMenu } from "../menu.js";
import { escapeReset } from "../escreset.js";

export default class scene1 extends Phaser.Scene {
    constructor() {
        super("scene1");
    }

create() {
    escapeReset(this);
        // centerText(this, "press button to continue ", 150, {fill: "#ffffffff", align: "center"});

                centerText(this, "SEASON 1", -120, { fontSize: "40px" });

    // Create typewriter text with animation, then menu after complete
    createTypewriterText(
        this,
        "you are a small-scale farmer in rural kenya. your local community relies on the yield from you and your neighbors' farms. your goal is to maintain your farm to feed your community.\n\nbut BE CAREFUL... a wrong decision could lead to disaster. make your choices wisely.",
        -50,
        {},
        6,
        () => {
            createMenu(this, {
                options: ["[ begin ]"],
                callbacks: [() => {
                    this.scene.start("cropchoice");
                }]
            });
        }
    );
}

}
