import { centerText } from "../ui.js";
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
        });
    }

    create() {
        this.cameras.main.setBackgroundColor("#ed3833");
        escapeReset(this);
        centerText(this, "local forecast:", -190, {fill: "#000000"});
        this.waitingText = centerText(this, "\n\nwaiting for crops to grow...", +70, { fill: "#000000" });
        const weather = Math.random() < 0.5 ? "SEVERE HEATWAVE" : "FLASH FLOODING!";
        const forecastText = centerText(
            this,
            `${weather}`,
            -150,
            { fill: "#000000", fontSize: "32px" }
        );


        this.tweens.add({
            targets: forecastText,
            alpha: 0,
            duration: 600,
            yoyo: true,
            repeat: 3
        });
        this.anims.create({
            key: 'clock_anim',
            frames: this.anims.generateFrameNumbers('clock', { start: 1, end: 11 }),
            frameRate: 6,
            repeat: 2 // play once
        });
        const sprite = this.add.sprite(window.innerWidth / 2, window.innerHeight / 2, "clock");
        sprite.play('clock_anim');
        sprite.setScale(1.5);

        sprite.on('animationcomplete', () => {
            this.waitingText.destroy();
            createMenu(this, {
                title: "",
                options: [
                    "[ continue to harvest ]"],
                callbacks: [
                    () => this.scene.start("scene16")],
                fontColor: "#ffffff", // normal option color (white)
                highlightColor: "#1645f5" // highlighted option color (orange)
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
