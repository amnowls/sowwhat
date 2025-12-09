import { centerText } from "../ui.js";
import { createMenu } from "../menu.js";

export default class cropchoice extends Phaser.Scene {
    constructor() {
        super("cropchoice");
    }

    create() {
        // shows hud
        this.scene.setVisible(true, 'hud');
        centerText(this, "use ARROW and RETURN keys to make selections", +100, {fontSize: '22px'});

      createMenu(this, {
            title: "what type of crop would you like to plant?",
            options: [
                "[ cassava ]",
                "[ cowpea ]",
                "[ maize ]"
            ],
            callbacks: [
                //cassava
                () => {
                    this.game.globalState.neighborScore += 1;
                    this.game.globalState.crop = "cassava";
                    this.scene.get('hud').updateStats();
                    this.scene.start("scene3");
                },

                //cowpea
                () => {
                    this.game.globalState.neighborScore += 1;
                    this.game.globalState.crop = "cowpea";
                    this.scene.get('hud').updateStats();
                    this.scene.start("scene3");
                },

                //maize
                () => {
                    this.game.globalState.corporateDependency += 1;
                    this.game.globalState.neighborScore -= 1;
                    this.game.globalState.crop = "maize";
                    this.scene.get('hud').updateStats();
                    this.scene.start("scene3");
                }
            ]
        });
    }
}
