import { centerText, createTypewriterText} from "../ui.js";
import { createMenu } from "../menu.js";
import { escapeReset } from "../escreset.js";


export default class scene15 extends Phaser.Scene {
    constructor() {
        super("scene15");
    }
    preload() {
        // Load assets for the next scene here
        this.load.spritesheet('clock', 'assets/clock.png', {
            frameWidth: 80,  // width of each frame
            frameHeight: 110  // height of each frame
        });    }

    create() {
    this.cameras.main.setBackgroundColor("#1645f5");
    escapeReset(this);
    centerText(this, "waiting for crops to grow...", -140, {fill: "#000000"});
    const weather = Math.random() < 0.5 ? "SEVERE HEATWAVE" : "FLASH FLOODING!";
    createTypewriterText(
        this,
        `\n\nlocal weather forecast: ${weather}. take precautions and stay safe out there folks!`, +70, {fill: "#ffb000"}, 6);
    this.anims.create({
            key: 'clock_anim',
            frames: this.anims.generateFrameNumbers('clock', { start: 1, end: 11 }),
            frameRate: 6,
            repeat: 0 // play once
        });
        const sprite = this.add.sprite(window.innerWidth/2, window.innerHeight/2, "clock");
        sprite.play('clock_anim');
        sprite.setScale(1.5);

        sprite.on('animationcomplete', () => {
            createMenu(this, {
                title: "",
                options: [
                    "[ continue to harvest ]" ],
                callbacks: [
                () => this.scene.start("scene16")],
                fontColor: "#ffffff", // normal option color (white)
                highlightColor: "#ffb000" // highlighted option color (orange)
                }
                );
        });
    }
    // Ensure update is called for menu input
    // update(time, delta) {
    //     if (typeof this.update === 'function' && this.update !== scene15.prototype.update) {
    //         this.update(time, delta);
    //     }
    // }
}
