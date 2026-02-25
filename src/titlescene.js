import { centerText } from "../ui.js";

export default class titlescene extends Phaser.Scene {
    constructor() {
        super("titlescene");
    }

    preload() {
        // preload assets here
        this.load.audio('menuMove', 'assets/sounds/move.wav');
        this.load.audio('menuSelect', 'assets/sounds/select.wav');
          this.load.font(
            'PressStart2P',
            'https://raw.githubusercontent.com/google/fonts/refs/heads/main/ofl/pressstart2p/PressStart2P-Regular.ttf',
            'truetype');
        // this.load.image("radio", "assets/ascii-art.jpeg");
    }
    create() {
        this.cameras.main.setBackgroundColor("#1645f5");
        centerText(this, "SOW WHAT?!", 0, {fontFamily: 'PressStart2P', fontSize: "80px", fill: '#ffb000', align: "center"});
        // centerText(this, "insert seed to begin\n('S' key)", 150, {fill: "#ffffffff", align: "center"});
        centerText(this, "press button to begin", 150, {fill: "#ffffffff", align: "center"});

        // uncomment below for mouse clicks to switch scene
        // this.input.once("pointerdown", () => {
        //     this.scene.start("scene1");
        // });

        // use space or enter to switch scene
        this.input.keyboard.on("keydown-S", () => this.scene.start("scene1"));
        this.input.keyboard.once("keydown-SPACE", () => this.scene.start("scene1"));
        this.input.keyboard.once("keydown-ENTER", () => this.scene.start("scene1"));
    }

}
