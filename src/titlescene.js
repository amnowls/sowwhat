import { centerText } from "../ui.js";

export default class titlescene extends Phaser.Scene {
    constructor() {
        super("titlescene");
    }

    preload() {
          this.load.font(
            'PressStart2P',
            'https://raw.githubusercontent.com/google/fonts/refs/heads/main/ofl/pressstart2p/PressStart2P-Regular.ttf',
            'truetype');
        // this.load.image("radio", "assets/ascii-art.jpeg");
    }
    create() {
        // const radio = this.add.image(this.scale.width / 2, this.scale.height / 2 - 50, 'radio').setScale(1.5);
        // radio.setAlpha(0.3);
        centerText(this, "LICENCE TO SOW", 0, {fontFamily: 'PressStart2P', fontSize: "60px", fill: "#ffffffff"});
        centerText(this, "press SPACE to start", 150, {fill: "#ffffffff"});

        // uncomment below for mouse clicks to switch scene
        // this.input.once("pointerdown", () => {
        //     this.scene.start("scene1");
        // });

        // use space or enter to switch scene
        this.input.keyboard.once("keydown-SPACE", () => this.scene.start("scene1"));
        this.input.keyboard.once("keydown-ENTER", () => this.scene.start("scene1"));
    }

}
