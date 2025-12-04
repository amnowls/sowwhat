import { centerText } from "../ui.js";

export default class titlescene extends Phaser.Scene {
    constructor() {
        super("titlescene");
    }

    // preload() {
    //     // preload assets here
    //     // this.load.image("logo", "path/to/logo.png");
    // }

    create() {

        centerText(this, "LISCENSE TO SOW", 0, {fontSize: "80px"});
        centerText(this, "press SPACE to start", +150)

        // uncomment below for mouse clicks to switch scene
        // this.input.once("pointerdown", () => {
        //     this.scene.start("scene1");
        // });

        // use space or enter to switch scene
        this.input.keyboard.once("keydown-SPACE", () => this.scene.start("scene1"));
        this.input.keyboard.once("keydown-ENTER", () => this.scene.start("scene1"));
    }

    update() {
    //     if (
    //         Phaser.Input.Keyboard.JustDown(this.keySpace) ||
    //         Phaser.Input.Keyboard.JustDown(this.keyEnter)
    //     ) {
    //         this.scene.start("scene1");
    //     }
    }
}
