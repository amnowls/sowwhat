import { centerText } from "../ui.js";
import { createMenu } from "../menu.js";
import { escapeReset } from "../escreset.js";


export default class scene19 extends Phaser.Scene {
    constructor() {
        super("scene19");
    }

    create() {
    escapeReset(this);
    // centerText(this, "");
        createMenu(this, {
            title: [""],
            options: [
                "[ sell at local market ]",
            ],
            callbacks: [
                () => {
                    this.globalState.money += 10;
            this.scene.get('hud').updateStats();
this.scene.start("scene18");
                }
            ]
        })}}


