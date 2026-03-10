import { centerText } from "../ui.js";
import { createMenu } from "../menu.js";
import { escapeReset } from "../escreset.js";


export default class slots extends Phaser.Scene {
    constructor() {
        super("slots");
    }

    init(data) {
        this.nextScene = data?.nextScene || "titlescene";
        this.sourceScene = data?.sourceScene || null;
    }

    preload() {
        this.load.font(
            'PressStart2P',
            'https://raw.githubusercontent.com/google/fonts/refs/heads/main/ofl/pressstart2p/PressStart2P-Regular.ttf',
            'truetype');

        // this.load.image("hudbackground", "assets/hudbackground.png");
    }

    create() {
        escapeReset(this);
        this.cameras.main.setBackgroundColor("#ed3833");

        // Create a filled rectangular frame centered on screen
        const frameGraphics = this.add.graphics();
        const centerX = this.scale.width / 2 - 400;
        const centerY = this.scale.height / 2 - 240;
        frameGraphics.fillStyle(0x1645f5, 0.8); // fill color and alpha
        frameGraphics.fillRect(centerX, centerY, 800, 450);
        frameGraphics.lineStyle(4, 0xffffff, 1); // 4px white border
        frameGraphics.strokeRect(centerX, centerY, 800, 450);


        // Game variables
        this.slot1 = null;
        this.slot2 = null;
        this.slot3 = null;
        this.spinButton = null;
        this.resultText = null;
        this.isSpinning = false;

        const symbols = ['1', '2', '3', '4', '5', '6'];

        centerText(this, "SPIN TO WIN\nNEIGHBOUR'S SEEDS!", -170, { fill: "#ffffff", fontFamily: "PressStart2P", fontSize: "30px", align: "center" });


        // Create slot backgrounds
        const slotWidth = 100;
        const slotHeight = 120;
        const slotY = window.innerHeight / 2;
        const startX = window.innerWidth / 2 - slotWidth - 100;

        // Slot 1
        this.add.rectangle(startX, slotY, slotWidth, slotHeight, 0xffffff);
        this.slot1 = this.add.text(startX, slotY, '?', {
            fontFamily: '"Press Start 2P"',
            fontSize: '40px',
            color: '#000000'
        }).setOrigin(0.5);

        // Slot 2
        this.add.rectangle(startX + 200, slotY, slotWidth, slotHeight, 0xffffff);
        this.slot2 = this.add.text(startX + 200, slotY, '?', {
            fontFamily: '"Press Start 2P"',
            fontSize: '40px',
            color: '#000000'
        }).setOrigin(0.5);

        // Slot 3
        this.add.rectangle(startX + 400, slotY, slotWidth, slotHeight, 0xffffff);
        this.slot3 = this.add.text(startX + 400, slotY, '?', {
            fontFamily: '"Press Start 2P"',
            fontSize: '40px',
            color: '#000000'
        }).setOrigin(0.5);

        // Spin button
        this.spinButton = this.add.rectangle(window.innerWidth / 2, window.innerHeight / 2 + 150, 200, 60, 0x000000, 0)
            .setInteractive({ useHandCursor: true })


        centerText(this, "higher community scores offer higher chances\npress [ SPACE ] to spin", 105, { fill: "#ffffff", fontFamily: "PressStart2P", fontSize: "14px", align: "center" });

        // Result text
        this.resultText = this.add.text(window.innerWidth / 2, window.innerHeight / 2 + 180, '', {
            fontSize: '18px',
            fontFamily: '"Press Start 2P"',
            color: '#ffeb3b'
        }).setOrigin(0.5);

        // Button click handler
        this.spinButton.on('pointerdown', () => {
            if (!this.isSpinning) {
                this.spin(symbols);
            }
        });

        // Spacebar handler
        this.input.keyboard.on('keydown-SPACE', () => {
            if (!this.isSpinning) {
                this.spin(symbols);
            }
        });
    }

    spin(symbols) {
        this.isSpinning = true;
        this.resultText.setText('');


        this.spinCount = 0;
        const maxSpins = 20;

        // Spinning animation
        const spinInterval = this.time.addEvent({
            delay: 100,
            callback: () => {
                this.slot1.setText(symbols[Phaser.Math.Between(0, symbols.length - 1)]);
                this.slot2.setText(symbols[Phaser.Math.Between(0, symbols.length - 1)]);
                this.slot3.setText(symbols[Phaser.Math.Between(0, symbols.length - 1)]);

                this.spinCount++;

                if (this.spinCount >= maxSpins) {
                    spinInterval.remove();
                    this.checkResult();
                }
            },
            loop: true
        });
    }

    checkResult() {

        const symbol1 = this.slot1.text;
        const symbol2 = this.slot2.text;
        const symbol3 = this.slot3.text;

        if (symbol1 === symbol2 && symbol2 === symbol3) {
            this.resultText.setText("HIT! - your neighbors ACCEPTED the trade");
            this.resultText.setColor("#33ff00");
            createMenu(this, {
                title: [""],
                options: ["[ accept seeds and continue ]"],
                callbacks: [
                    () => this.scene.start(this.nextScene),

                ],
                startY: 240,
                gap: 36,
                fontColor: "#ffffff",
                highlightColor: "#1645f5"
            });
        } else {
            this.resultText.setText("MISS - your neighbours REFUSED the trade");
            this.resultText.setColor("#ed3833");
            createMenu(this, {
                title: [""],
                options: ["[ continue - illegally plant uncertified seeds ]"],
                callbacks: [
                    () => this.scene.start(this.nextScene),

                ],
                startY: 240,
                gap: 36,
                fontColor: "#ffffff",
                highlightColor: "#1645f5"
            });
        }

        // Reset button
        this.spinButton.setFillStyle(0xffffff, 0);
        this.isSpinning = false;

        // createMenu(this, {
        //     title: [""],
        //     options: ["[ continue ]"],
        //     callbacks: [
        //         () => this.scene.start(this.nextScene, { sourceScene: this.sourceScene }),

        //     ],
        //     startY: 240,
        //     gap: 36,
        //     fontColor: "#ffffff",
        //     highlightColor: "#1645f5"
        // });
    }




}