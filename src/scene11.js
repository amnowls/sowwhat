import { centerText } from "../ui.js";
import { createMenu } from "../menu.js";
import { escapeReset } from "../escreset.js";


export default class scene11 extends Phaser.Scene {
    constructor() {
        super("scene11");
    }

    create() {
    escapeReset(this);
        centerText(this, "you had a tough season.",0 , {fontSize: "32px"});
        createMenu(this, {
            options: [
                "[ sell harvest at market ]"],
            callbacks: [
                () => {
            if (this.game.globalState.certified == true && this.game.globalState.crop == "corn") {
                this.game.globalState.money += 20;
            } else if (this.game.globalState.certified == false && this.game.globalState.crop == "corn") {
                this.game.globalState.money += 15;
            }  else if (this.game.globalState.crop != "corn") {
                this.game.globalState.money += 10;
            }
            this.scene.get('hud').updateStats();
            this.scene.start("season2stats");
                }
            ]
        })}}


