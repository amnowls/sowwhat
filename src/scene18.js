import { centerText, createTypewriterText } from "../ui.js";
import { createMenu } from "../menu.js";
import { escapeReset } from "../escreset.js";


export default class scene18 extends Phaser.Scene {
    constructor() {
        super("scene18");
    }

    preload() {
        // this.load.audio('seedlawAudio', 'assets/sounds/seedlaw-speech.mp3');
    }

    create() {

        // this.scene.setVisible(false, 'hud');
        escapeReset(this);
        this.cameras.main.setBackgroundColor("#1645f5");
        centerText(this, "SEASON 4", -80, { fontSize: "32px" });
        if (this.game.globalState.criminality >= 4) {

            if (this.game.globalState.certified == false) {
                createTypewriterText(this, "POLICE OFFICER INCOMING...", -40, { fontSize: "32px", fill: "#000000" }, 80, () => {
                    createTypewriterText(this, "\n\n\"you are under arrest for illegally farming uncertified seeds and failing to pay fines.\"", 0, { fontSize: "24px", fill: "#000000" }, 6, () => {
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
                });
                } else {
                    createTypewriterText(this, "POLICE OFFICER INCOMING...", - 40, { fontSize: "32px", fill: "#000000" }, 80, () => {
                        createTypewriterText(this, "\n\n\"you are under arrest for breaching your legal contract with Monsanto and failing to pay fines.\"", 0, { fontSize: "24px", fill: "#000000" }, 6, () => {
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
                    });
                }
            } else if (this.game.globalState.soilhealthIndex <= 2) {
                const messageText = "POOR SOIL HEALTH HAS LEAD TO CROP FAILURE.";
                createTypewriterText(this, messageText, -40, { fontSize: "32px", fill: "#000000" }, 6,
                    () => {
                        createMenu(this, {
                            title: "\n\n\nyou don't have enough seeds to make a profit this season. would you like to buy extra seeds or plant the few seeds you have left?",
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
                                    this.scene.start("scene19");
                                }
                            ],
                            fontColor: "#ffffff", // normal option color (white)
                            highlightColor: "#ffb000" // highlighted option color (orange)    
                        },)
                    }
                );
            } else if (this.game.globalState.pesticides == false && this.game.globalState.certified == true) {
                const messageText = "PEST INFESTATION HAS DESTROYED YOUR CROPS.";
                createTypewriterText(this, messageText, -40, { fontSize: "32px", fill: "#000000" }, 6,
                    () => {
                        createMenu(this, {
                            title: "\n\n\nyou don't have enough seeds to make a profit this season. would you like to buy extra seeds or plant the few seeds you have left?",
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
                                    this.scene.start("scene19");
                                }
                            ],
                            fontColor: "#ffffff", // normal option color (white)
                            highlightColor: "#ffb000" // highlighted option color (orange) 
                        },)
                    }
                );
            } else if (this.game.globalState.pesticides == false && this.game.globalState.certified == false) {
                const messageText = "PESTICIDE LEAKAGE FROM NEIGHBORING FARM HAS DESTROYED YOUR CROPS.";
                createTypewriterText(this, messageText, -40, { fontSize: "32px", fill: "#000000" }, 6,
                    () => {
                        createMenu(this, {
                            title: "\n\n\nyou don't have enough seeds to make a profit this season. would you like to buy extra seeds or plant the few seeds you have left?",
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
                                    this.scene.start("scene19");
                                }
                            ],
                            fontColor: "#ffffff", // normal option color (white)
                            highlightColor: "#ffb000" // highlighted option color (orange)    
                        })
                    }
                );
            }
        }
    }