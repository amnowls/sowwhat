import { centerText } from "../ui.js";
export default class scene1 extends Phaser.Scene {
    constructor() {
        super("scene1");
    }

    create() {
        // this.add.text(100, 250, "you are a small-scale farmer in rural kenya.\nyour local community relies on the yield\n from you and your neighbors' farms", {
        //     fontSize: "24px",
        // });

        centerText(this, "you are a small-scale farmer in rural kenya.\nyour local community relies on the yield\nfrom you and your neighbors' farms",
            0,
        );         

        this.input.once("pointerdown", () => {
            this.scene.start("scene2");
        });
    }
}
