import { centerText } from "../ui.js";
import { createMenu } from "../menu.js";
import { escapeReset } from "../escreset.js";


export default class certify extends Phaser.Scene {
    constructor() {
        super("certify");
    }

    create() {
        // shows hud
        escapeReset(this);
        // this.scene.setVisible(true, 'hud');

      createMenu(this, {
            title: "do you want to certify your " + this.game.globalState.crop + " seeds?",
            options: [
                "[ yes: certify -$35 ]",
                "[ no: keep seeds uncertified ]"
            ],
            callbacks: [
                () => {
                    this.game.globalState.money -= 35;
                    this.game.globalState.corporateDependency += 4;
                    this.game.globalState.neighborScore -= 2;
                    this.game.globalState.certified = true;

                    this.scene.get('hud').updateStats();
                if (window.__globalMoneyAudio) {
                    window.__globalMoneyAudio.currentTime = 0;
                    window.__globalMoneyAudio.play().catch(() => {});
                }   
                    this.scene.start("scene6");
                },
                () => {
                    this.game.globalState.money += 10;
                    this.game.globalState.corporateDependency -= 2;
                    this.game.globalState.neighborScore += 1;
                    this.game.globalState.certified = false;

                    this.scene.get('hud').updateStats();
                    this.scene.start("scene7");
                }
            ]
        });
    }
}
