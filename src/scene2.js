import { centerText } from "../ui.js";
export default class scene2 extends Phaser.Scene {
    constructor() {
        super("scene2");
    }

    create() {
        centerText(this, "do you want to certify your XXX seeds?");
    
        // Decision 1: Certify
        let certify = centerText(this, "[ YES - certify ]", 150, {fill: "#fbff94ff", align: "right"})
        .setInteractive();

        // Decision 2: Do not certify
        let noCert = centerText(this, "[ NO - keep seeds uncertified ]", 180, {fill: "#fbff94ff", align: "right"})
        .setInteractive();

        // Handle CERTIFY choice
        certify.on("pointerdown", () => {
            this.game.globalState.money -= 20;           // certification costs money
            this.game.globalState.corporateDependency += 10; 
            this.game.globalState.neighborScore += 5;

            // this.scene.get('HUD').updateStats();

            this.scene.start("scene3");
        });

        // Handle NOT CERTIFY choice
        noCert.on("pointerdown", () => {
            this.game.globalState.money += 10;           // save money
            this.game.globalState.corporateDependency -= 5;
            this.game.globalState.neighborScore -= 10;

            // this.scene.get('HUD').updateStats();

            this.scene.start("scene3");
        });
    }
}
