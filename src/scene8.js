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
                this.game.globalState.criminalRecord = "outlawed farmer";
                this.scene.get('hud').updateStats();
                this.scene.start("scene9");
            },
                () => {
                this.game.globalState.neighborScore += 1;
                this.scene.get('hud').updateStats();
                this.scene.start("scene9");
            },
            ]
        }
        );
    }
    else {
            createMenu(this, {
        title: "the next planting season begins. you may legally plant your seeds as they have been certified.",
        options: [
            "[ plant seeds ]"],
        callbacks: [
                () => {
                this.game.globalState.criminalRecord = "outlawed farmer";
                this.scene.get('hud').updateStats();
                this.scene.start("scene9");
            }
            ]
        }
        )
    }

}
}