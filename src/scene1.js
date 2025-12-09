import { centerText } from "../ui.js";
export default class scene1 extends Phaser.Scene {
    constructor() {
        super("scene1");
    }

    create() {

        centerText(this, "you are a small-scale farmer in rural kenya. your local community relies on the yield from you and your neighbors' farms",
            0,
            );         
        centerText(this, "press RETURN to continue", 150);

        // use space or enter to switch scene
        this.input.keyboard.once("keydown-SPACE", () => this.scene.start("cropchoice"));
        this.input.keyboard.once("keydown-ENTER", () => this.scene.start("cropchoice"));
    }
}
