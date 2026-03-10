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
                title: "its time to plant your seeds for the season.",
                options: [
                    "[ purchase and plant seeds -$10]",
                ],
                callbacks: [
                    () => {
                        this.scene.get('hud').updateStats();
                        this.scene.start("planttiming", { nextScene: "scene14", sourceScene: "scene13" });
                    }
                ]
            });

        } else {
            createMenu(this, {
                title: "its time to plant your seeds for the season.",
                options: [
                    "[ plant uncertified seeds ]",
                ],
                callbacks: [
                    () => {
                        this.scene.get('hud').updateStats();
                        this.scene.start("planttiming", { nextScene: "scene14", sourceScene: "scene13" });
                    }]
            },);

        }
    }
}
