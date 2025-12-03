export default class scene2 extends Phaser.Scene {
    constructor() {
        super("scene2");
    }

    create() {
        this.add.text(20, 20, "Game Scene", {
            fontSize: "28px",
            fill: "#ffffff"
        });

        // Switch back to menu when clicked
        this.input.once("pointerdown", () => {
            this.scene.start("titlescene");
        });
    }
}
