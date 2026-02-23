import { centerText } from "../ui.js";
import { createMenu } from "../menu.js";
import { escapeReset } from "../escreset.js";


export default class scene4 extends Phaser.Scene {
    constructor() {
        super("scene4");
    }
    // preload() {
    // this.load.image("radio", "assets/animated-radio-image-0064.gif");
    //     }       
    create() {
        this.scene.setVisible(true, 'hud');
        // const radio = this.add.image(this.scale.width / 2, this.scale.height / 2.5, 'radio');
        // radio.setScale(2.5);
        // radio.setAlpha(0.5);
        // radio.setDepth(-1);
        escapeReset(this);
        // centerText(this, "you've had a great planting season with your " + this.game.globalState.crop + " seeds. you've sold your harvest at the local market. you still have an abundance of seeds. would you like to store surplus seeds for next year, or share some with your community?");
        createMenu(this, {
            title: ["you had a great planting season with your " + this.game.globalState.crop + " seeds. you've sold your harvest at the local market. you still have an abundance of seeds. would you like to store surplus seeds for next year, or share some with your community?"],
            options: [
                "[ store seeds for next year ]",
                "[ share seeds with community ]",
            ],
            callbacks: [
                () => {
                    this.game.globalState.neighborScore -= 1;
                    this.scene.get('hud').updateStats();
                    this.scene.start("seedlaw");
                },
                () => {
                    this.game.globalState.neighborScore += 2;
                    this.scene.get('hud').updateStats();
                    this.scene.start("seedlaw");
                }
            ]
        });
    }
}
