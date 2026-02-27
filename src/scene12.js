import { centerText, createTypewriterText } from "../ui.js";
import { createMenu } from "../menu.js";
import { escapeReset } from "../escreset.js";


export default class scene12 extends Phaser.Scene {
    constructor() {
        super("scene12");
    }

    create() {
    escapeReset(this);
        centerText(this, "SEASON 3", -80, {fontSize: "32px"});
        if (this.game.globalState.certified == true){
        const messageText = "your neighbors are struggling to make a profit with their uncertified seeds\n\nwould you like to illegally share your surplus seeds with neighbors or abide by your contract?";
                createTypewriterText(this, messageText, 0, {}, 6,
            () => {
                createMenu(this, {
            title: "",
            options: [
            "[ illegally share seeds ]",
            [ "[ abide by contract ]"]],
            callbacks: [
                () => {
                    if (this.game.globalState.crop == "corn") {
                        this.game.globalState.biodiversity -= 2}
                        else if (this.game.globalState.crop == "cowpea")
                            {this.game.globalState.biodiversity += 2};
                    this.game.globalState.fines += 20;
                    this.game.globalState.neighborScore += 2;
                    this.scene.get('hud').updateStats();
                    
                    this.scene.start("scene13");
                },
                () => {
                    this.game.globalState.corporateDependency += 2;
                    this.game.globalState.neighborScore -= 2;
                    this.scene.get('hud').updateStats();
                   
                    this.scene.start("scene13");
                }
            ]
        })});
        } else {
        const messageText = "you hear rumours that there will be inspections to check for seed certification. you are worried you will be caught using uncertified seeds.\n\nwould you like to ask your neighbours to share their certified seeds with you or continue using your uncertified seeds?";
                createTypewriterText(this, messageText, 0, {}, 6,
            () => {
                createMenu(this, {
            title: "",
            options: [
            "[ ask neighbours for certified seeds ]",
            [ "[ continue using uncertified seeds ]"]],
            callbacks: [
                () => {
                    this.game.globalState.fines += 20;
                    this.game.globalState.neighborScore += 2;
                    this.scene.get('hud').updateStats();
                    
                    this.scene.start("scene13");
                },
                () => {
                    this.game.globalState.corporateDependency += 2;
                    this.game.globalState.neighborScore -= 2;
                    this.scene.get('hud').updateStats();
                   
                    this.scene.start("scene13");
                }
            ]
        })});
    }
}
}