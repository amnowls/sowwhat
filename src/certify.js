import { centerText } from "../ui.js";
import { createMenu } from "../menu.js";

export default class certify extends Phaser.Scene {
    constructor() {
        super("certify");
    }

    create() {
        // shows hud
        this.scene.setVisible(true, 'hud');

      createMenu(this, {
            title: "do you want to certify your XXX seeds?",
            options: [
                "[ YES - certify ]",
                "[ NO - keep seeds uncertified ]"
            ],
            callbacks: [
                () => {
                    this.game.globalState.money -= 20;
                    this.game.globalState.corporateDependency += 10;
                    this.game.globalState.neighborScore += 5;

                    this.scene.get('hud').updateStats();
                    this.scene.start("scene3");
                },
                () => {
                    this.game.globalState.money += 10;
                    this.game.globalState.corporateDependency -= 5;
                    this.game.globalState.neighborScore -= 10;

                    this.scene.get('hud').updateStats();
                    this.scene.start("scene3");
                }
            ]
        });
    }
}
