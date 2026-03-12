import { centerText, createTypewriterText } from "../ui.js";
import { createMenu } from "../menu.js";
import { escapeReset } from "../escreset.js";


export default class scene18 extends Phaser.Scene {
    constructor() {
        super("scene18");
    }

    preload() {
        this.load.font(
            'PressStart2P',
            'https://raw.githubusercontent.com/google/fonts/refs/heads/main/ofl/pressstart2p/PressStart2P-Regular.ttf',
            'truetype');
    }

    create() {

        // this.scene.setVisible(false, 'hud');
        escapeReset(this);
        this.game.globalState.season = 4;
        this.scene.get('hud').updateStats();

        centerText(this, "SEASON 4", -120, { fontSize: "40px" });
        if (this.game.globalState.criminality >= 4) {

            if (this.game.globalState.certified == false) {
                createTypewriterText(this, "POLICE OFFICER INCOMING...", -30, { fontSize: "24px", fill: "#1645f5" }, 80, () => {
                    createTypewriterText(this, "\n\nyou are under arrest for illegally farming uncertified seeds and failing to pay fines.", 0, { fontSize: "24px", fill: "#1645f5" }, 6, () => {
                        createMenu(this, {
                            title: [""],
                            options: [
                                "[ spend 2 weeks in jail ]",
                                "[ pay bail -$80 ]",
                            ],
                            callbacks: [
                                () => {
                                    this.scene.start("jailtime");
                                },
                                () => {
                                    this.game.globalState.money -= 80;
                                    this.scene.get('hud').updateStats();
                                    this.scene.start("scene19");
                                }
                            ],
                            fontColor: "#ffffff", // normal option color (white)
                            highlightColor: "#1645f5" // highlighted option color (orange)            
                        });
                    });
                });
            } else {
                createTypewriterText(this, "POLICE OFFICER INCOMING...", -30, { fontSize: "24px", fill: "#1645f5" }, 80, () => {
                    createTypewriterText(this, "\n\nyou are under arrest for breaching your legal contract with Monsanto and failing to pay fines.", 0, { fontSize: "24px", fill: "#1645f5" }, 6, () => {
                        createMenu(this, {
                            title: [""],
                            options: [
                                "[ spend 2 weeks in jail ]",
                                "[ pay bail -$80 ]",
                            ],
                            callbacks: [
                                () => {
                                    this.scene.start("jailtime");
                                },
                                () => {
                                    this.game.globalState.money -= 80;
                                    this.scene.get('hud').updateStats();
                                    this.scene.start("scene19");
                                }
                            ],
                            fontColor: "#ffffff", // normal option color (white)
                            highlightColor: "#1645f5" // highlighted option color (orange)            
                        });
                    });
                });
            }
        } else if (this.game.globalState.soilhealthIndex <= 2) {
            const messageText = "POOR SOIL HEALTH HAS LEAD TO CROP FAILURE.";
            createTypewriterText(this, messageText, -30, { fontSize: "24px", fill: "#1645f5" }, 6,
                () => {
                    createMenu(this, {
                        title: "\n\nyou don't have enough seeds to make a profit this season. would you like to buy extra seeds or plant the few seeds you have left?",
                        options: [
                            "[ buy extra seeds -$20 ]",
                            "[ plant remaining seeds ]"],
                        callbacks: [
                            () => {
                                this.game.globalState.money -= 20;
                                this.scene.get('hud').updateStats();
                                this.scene.start("scene19");
                            },
                            () => {
                                //LOW YIELD
                                this.game.globalState.planting = 0;
                                this.scene.get('hud').updateStats();
                                this.scene.start("scene19");
                            }
                        ],
                        fontColor: "#ffffff", // normal option color (white)
                        highlightColor: "#1645f5" // highlighted option color (orange)    
                    },)
                }
            );
        } else if (this.game.globalState.pesticides == false && this.game.globalState.certified == true) {
            const messageText = "PEST INFESTATION HAS DESTROYED YOUR CROPS.";
            createTypewriterText(this, messageText, -30, { fontSize: "24px", fill: "#1645f5" }, 6,
                () => {
                    createMenu(this, {
                        title: "\n\nyou don't have enough seeds to make a profit this season. would you like to buy extra seeds or plant the few seeds you have left?",
                        options: [
                            "[ buy extra seeds -$20 ]",
                            "[ plant remaining seeds ]"],
                        callbacks: [
                            () => {
                                this.game.globalState.money -= 20;
                                this.scene.get('hud').updateStats();
                                this.scene.start("scene19");
                            },
                            () => {
                                //LOW YIELD
                                this.game.globalState.planting = 0;
                                this.scene.get('hud').updateStats();

                                this.scene.start("scene19");
                            }
                        ],
                        fontColor: "#ffffff", // normal option color (white)
                        highlightColor: "#1645f5" // highlighted option color (orange) 
                    },)
                }
            );
        } else if (this.game.globalState.pesticides == false && this.game.globalState.certified == false) {
            const messageText = "PESTICIDE LEAKAGE FROM NEIGHBORING FARM HAS DESTROYED YOUR SOIL";
            createTypewriterText(this, messageText, -30, { fontSize: "24px", fill: "#1645f5" }, 6,
                () => {
                    createMenu(this, {
                        title: "\n\nyou don't have enough seeds to make a profit this season. would you like to buy extra seeds or plant the few seeds you have left?",
                        options: [
                            "[ buy extra seeds -$20 ]",
                            "[ plant remaining seeds ]"],
                        callbacks: [
                            () => {
                                this.game.globalState.money -= 20;
                                this.scene.get('hud').updateStats();
                                this.scene.start("scene19");
                            },
                            () => {
                                //LOW YIELD
                                this.game.globalState.planting = 0;
                                this.scene.get('hud').updateStats();
                                this.scene.start("scene19");
                            }
                        ],
                        fontColor: "#ffffff", // normal option color (white)
                        highlightColor: "#1645f5" // highlighted option color (orange)    
                    })
                }
            );
        }
    }
}