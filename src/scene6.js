import { centerText } from "../ui.js";
import { createMenu } from "../menu.js";

export default class scene6 extends Phaser.Scene {
    constructor() {
        super("scene6");
    }

    create() {

    centerText(this, "you have chosen to certify your " + this.game.globalState.crop + " seeds. please sign the contract below to proceed.");
    centerText(this, "CONTRACT: The farmer may not save, sell, share, or plant any uncertified " + this.game.globalState.crop + " seeds. The farmer must purchase new " + this.game.globalState.crop + " seeds each farming season. Seeds cannot be reused. The farmer must purchase and use any products (ie chemical fertilisers) in the contract. We reserve the right to come and inspect seeds at any point. Any breaching of the contract may result in a fine of up to 2000$, criminal conviction, or jail time.", +20, {fontSize: "20px"});
        
    createMenu(this, {
        options: [
            "[ accept contract ]",
            ],
            callbacks: [
                () => {
                    this.scene.start("scene7");
                }
            ]
        }
        );       
    }
}
