import { centerText } from "../ui.js";
import { escapeReset } from "../escreset.js";

export default class scene1 extends Phaser.Scene {
    constructor() {
        super("scene1");
    }

    create() {
        escapeReset(this);
        centerText(this, "you are a small-scale farmer in rural kenya.\nyour local community relies on the yield\nfrom you and your neighbors' farms",
            0,
            );         
        centerText(this, "press SPACE to continue", 150);

        // use space or enter to switch scene
        this.input.keyboard.once("keydown-SPACE", () => this.scene.start("cropchoice"));
        this.input.keyboard.once("keydown-ENTER", () => this.scene.start("cropchoice"));
    }
}
