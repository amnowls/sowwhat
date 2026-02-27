import { centerText, createTypewriterText } from "../ui.js";
import { createMenu } from "../menu.js";
import { escapeReset } from "../escreset.js";


export default class scene14 extends Phaser.Scene {
    constructor() {
        super("scene14");
    }

    create() {
    escapeReset(this);
        this.cameras.main.setBackgroundColor("#1645f5");
    
    createTypewriterText(this, "SEED INSPECTOR INCOMING...", 0, {fontSize: "32px", fill: "#000000"});
    if (this.game.globalState.certified == true && this.game.globalState.fines == 0) {
        createTypewriterText(this, "\n\nseed inspector: \"looks like you have been abiding by the seed laws!\"", 0, {fontSize: "24px", fill: "#000000"}, 6, () => {
            createMenu(this, {
                title: [""],
                options: [
                    "[ continue ]",
                ],
                callbacks: [
                    () => {
                        this.scene.start("scene15");
                    }
                ],
            fontColor: "#ffffff", // normal option color (white)
            highlightColor: "#ffb000" // highlighted option color (orange)            
            });
        });
    } else if (this.game.globalState.certified == true && this.game.globalState.fines > 0) {
        createTypewriterText(this, "\n\nseed inspector: \"looks like you've breached your seed contract. you owe $" + this.game.globalState.fines + " in fines\"",
            0, {fontSize: "24px", fill: "#000000"}, 6, () => {
                createMenu(this, {
                    title: [""],
                    options: [
                        "[ pay fines -$" + this.game.globalState.fines + " ]",
                    ],
                    callbacks: [
                        () => {
                            this.scene.start("scene15");
                        }
                    ],
            fontColor: "#ffffff", // normal option color (white)
            highlightColor: "#ffb000" // highlighted option color (orange)                
            });
            });
    } else if (this.game.globalState.certified == false) {
        createTypewriterText(this, "\n\nseed inspector: \"looks like you've been illegally planting seeds. pay $50 bail to continue\"",
            0, {fontSize: "24px", fill: "#000000"}, 6, () => {
                createMenu(this, {
                    title: [""],
                    options: [
                        "[ pay bail -$50 ]",
                    ],
                    callbacks: [
                        () => {
                            this.scene.start("scene15");
                        }
                    ],
            fontColor: "#ffffff", // normal option color (white)
            highlightColor: "#ffb000" // highlighted option color (orange)                
            });
            });
    }
}
}
