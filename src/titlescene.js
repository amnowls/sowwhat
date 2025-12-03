export default class titlescene extends Phaser.Scene {
    constructor() {
        super("titlescene");
    }

    // preload() {
    //     // preload assets here
    //     // this.load.image("logo", "path/to/logo.png");
    // }

    create() {
        this.add.text(250, 250, "LISCENCE TO SOW", {
            fontSize: "32px",
            fill: "#ffffff",
        })
        this.add.text(300, 450, "click screen to start");

        this.input.once("pointerdown", () => {
            this.scene.start("scene2");
        });
    }
}
