export default class scene1 extends Phaser.Scene {
    constructor() {
        super("scene1");
    }

    create() {
        this.add.text(300, 250, "Start Game", {
            fontSize: "32px",
            fill: "#ffffff"
        });

        this.input.once("pointerdown", () => {
            this.scene.start("scene2");
        });
    }
}
