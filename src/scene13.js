import { centerText } from "../ui.js";
import { createMenu } from "../menu.js";
import { escapeReset } from "../escreset.js";


export default class scene13 extends Phaser.Scene {
    constructor() {
        super("scene13");
    }

    create() {
        escapeReset(this);

        if (this.game.globalState.certified == true) {

            createMenu(this, {
                title: "PLANT SEEDS MINI GAME",
                options: [
                    "[ purchase and plant seeds ]",
                ],
                callbacks: [
                    () => {
                        this.game.globalState.money -= 10;
                        this.scene.get('hud').updateStats();
                        this.scene.start("scene14");
                    }
                ]
            });

        } else {
            createMenu(this, {
                title: "PLANT SEEDS MINI GAME",
                options: [
                    "[ plant uncertified seeds ]",
                ],
                callbacks: [
                    () => {
                        this.game.globalState.criminality += 1;
                        this.scene.get('hud').updateStats();
                        this.scene.start("scene14");
                    }]
            },);

    }
}
}
