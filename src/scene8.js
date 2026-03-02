import { centerText } from "../ui.js";
import { createMenu } from "../menu.js";
import { escapeReset } from "../escreset.js";


export default class scene8 extends Phaser.Scene {
    constructor() {
        super("scene8");
    }

    create() {
    escapeReset(this);
if (this.game.globalState.certified == false) {
    createMenu(this, {
        title: "the next planting season begins. it is ILLEGAL to plant your seeds as they have not been certified. doing so may result in fines, criminal charges, or other penalties. you must choose between illegally planting seeds or trading seeds with your neighbors",
        options: [
            "[ plant illegally ]",
            "[ trade seeds with neighbors ]"],
        callbacks: [
                () => {
                this.game.globalState.criminality += 1;
                this.scene.get('hud').updateStats();
                this.scene.start("scene9");
            },
                () => {
                this.game.globalState.neighborScore -= 1;
                this.scene.get('hud').updateStats();
                this.scene.start("scene9");
            },
            ]
        }
        );
    }
    else {
            createMenu(this, {
        title: "the next planting season begins. as per your contract, you must buy a new batch of certified seeds from the seed company to plant this season.",
        options: [
            "[ purchase and plant seeds -$10 ]"],
        callbacks: [
                () => {
                this.game.globalState.criminality += 2;
                this.game.globalState.money -= 10;
                this.scene.get('hud').updateStats();
                this.scene.start("scene9");
            }
            ]
        }
        )
    }

}
}