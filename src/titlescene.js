import { centerText } from "../ui.js";

export default class titlescene extends Phaser.Scene {
    constructor() {
        super("titlescene");
    }

    preload() {
        // preload assets here
        // this.load.image("radio", "assets/ascii-art.jpeg");
    }
    create() {
        // const radio = this.add.image(this.scale.width / 2, this.scale.height / 2 - 50, 'radio').setScale(1.5);
        // radio.setAlpha(0.3);
        centerText(this, "LICENCE TO SOW", 0, {fontSize: "80px", fill: "#ffffffff", align: "center"});
        centerText(this, "insert seed to begin\n('S' key)", 150, {fill: "#ffffffff", align: "center"});

        // uncomment below for mouse clicks to switch scene
        // this.input.once("pointerdown", () => {
        //     this.scene.start("scene1");
        // });

        // use space or enter to switch scene
        this.input.keyboard.on("keydown-S", () => this.scene.start("scene1"));
    }

}
