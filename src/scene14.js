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

        createTypewriterText(this, "SEED INSPECTOR INCOMING...", -60, { fontSize: "32px", fill: "#000000" }, 80, () => {
            if (this.game.globalState.certified == true && this.game.globalState.fines == 0) {
                createTypewriterText(this, "\n\"looks like you have been abiding by the seed laws!\"",
                    -20, { fontSize: "20px", fill: "#000000" }, 6, () => {
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
                createTypewriterText(this, "\n\"looks like you've breached your seed contract. you owe $" + this.game.globalState.fines + " in fines. HOWEVER, we can offer an incentive and waive your fines if you report any farmers who are illegally farming uncertified seeds.\"",
                    -20, { fontSize: "20px", fill: "#000000" }, 6, () => {
                        createMenu(this, {
                            title: [""],
                            options: [
                                "[ pay fines -$" + this.game.globalState.fines + " ]",
                                "[ report neighbors to waive fines ]",
                                "[ run away ]"
                            ],
                            callbacks: [
                                () => {
                                    this.game.globalState.money -= this.game.globalState.fines;
                                    this.game.globalState.fines = 0;

                                    this.scene.get('hud').updateStats();
                                    this.scene.start("scene15");
                                },
                                () => {
                                    this.game.globalState.fines = 0;
                                    this.game.globalState.neighborScore -= 3;

                                    this.scene.get('hud').updateStats();
                                    this.scene.start("scene15");
                                },
                                () => {
                                    this.game.globalState.criminality += 2;
                                    this.game.globalState.neighborScore += 1;

                                    this.scene.get('hud').updateStats();
                                    this.scene.start("runjump", { nextScene: "scene15", sourceScene: "scene14" });
                                }

                            ],
                            fontColor: "#ffffff", // normal option color (white)
                            highlightColor: "#ffb000" // highlighted option color (orange)                
                        });
                    });
            } else if (this.game.globalState.certified == false) {
                createTypewriterText(this, "\n\"looks like you've been illegally planting seeds. pay $50 bail to continue\"",
                    -20, { fontSize: "20px", fill: "#000000" }, 6, () => {
                        createMenu(this, {
                            title: [""],
                            options: [
                                "[ pay bail -$50 ]",
                                "[ run away ]"
                            ],
                            callbacks: [
                                () => {
                                    this.game.globalState.money -= 50;
                                    this.scene.get('hud').updateStats();
                                    this.scene.start("scene15");
                                },
                                () => {
                                    this.game.globalState.criminality += 2;
                                    this.scene.get('hud').updateStats();
                                    this.scene.start("runjump", { nextScene: "scene15", sourceScene: "scene14" });
                                }
                            ],
                            fontColor: "#ffffff", // normal option color (white)
                            highlightColor: "#ffb000" // highlighted option color (orange)                
                        });
                    });
            }
        });
    }
}
