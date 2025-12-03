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
        // const { width, height } = this.scale;
        // this.add.text(width / 2, height / 2, "LISCENCE TO SOW", {
        //     fontSize: "32px",
        //     fill: "#ffffff",
        //     align: "center"   // "left", "right", or "center"

        // }).setOrigin(0.5);
        centerText(this, "LISCENSE TO SOW", 0, {fontSize: 80});
        // console.log(t.style.fontSize);   // should output "80px"
        // this.add.text(300, 450, "click screen to start");
        centerText(this, "click the screen to start", +150)
        this.input.once("pointerdown", () => {
            this.scene.start("scene1");
        });
    }
}
