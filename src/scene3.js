export default class scene3 extends Phaser.Scene {
    constructor() {
        super("scene3");
    }

    create() {
        this.add.text(20, 20, "your farm is ok", {
            fontSize: "28px",
            fill: "#ffffff"
        });

    }
}