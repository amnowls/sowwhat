import { centerText } from "../ui.js";
import { createMenu } from "../menu.js";
import { escapeReset } from "../escreset.js";


export default class cropchoice extends Phaser.Scene {
    constructor() {
        super("cropchoice");
    }

    preload(){
        this.load.spritesheet('cassava', 'assets/crops/cassava.png', {
            frameWidth: 60,  // width of each frame
            frameHeight: 48  // height of each frame
        });
        this.load.spritesheet('cowpea', 'assets/crops/cowpea.png', {
            frameWidth: 60,  // width of each frame
            frameHeight: 39  // height of each frame
        });
        this.load.spritesheet('corn', 'assets/crops/corn.png', {
            frameWidth: 56,  // width of each frame
            frameHeight: 60  // height of each frame
        });

 
    }

    create() {
        // shows hud
        this.scene.setVisible(true, 'hud');
        escapeReset(this);
        centerText(this, "use ARROW and RETURN keys to make selections", +100, {fontSize: '22px'});
        this.anims.create({
            key: 'cassava_anim',
            frames: this.anims.generateFrameNumbers('cassava', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'cowpea_anim',
            frames: this.anims.generateFrameNumbers('cowpea', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'corn_anim',
            frames: this.anims.generateFrameNumbers('corn', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });
        const crops = ['cassava', 'cowpea', 'corn'];

        const w = this.scale.width;
        const h = this.scale.height;
        const segmentWidth = w / (crops.length + 1);

        crops.forEach((crop, i) => {
            const x = segmentWidth * (i + 1);
            const y = h / 2 - 80;

            const sprite = this.add.sprite(x, y, crop);
            sprite.play(`${crop}_anim`);
            sprite.setScale(1.5);
        });

      createMenu(this, {
            title: "what type of crop would you like to plant?",
            options: [
                "[ cassava ]",
                "[ cowpea ]",
                "[ maize ]"
            ],
            callbacks: [
                //cassava
                () => {
                    this.game.globalState.neighborScore += 1;
                    this.game.globalState.crop = "cassava";
                    this.scene.get('hud').updateStats();
                    this.scene.start("scene3");
                },

                //cowpea
                () => {
                    this.game.globalState.neighborScore += 1;
                    this.game.globalState.crop = "cowpea";
                    this.scene.get('hud').updateStats();
                    this.scene.start("scene3");
                },

                //maize
                () => {
                    this.game.globalState.corporateDependency += 1;
                    this.game.globalState.neighborScore -= 1;
                    this.game.globalState.crop = "maize";
                    this.scene.get('hud').updateStats();
                    this.scene.start("scene3");
                }
            ]
        });
    }
}
