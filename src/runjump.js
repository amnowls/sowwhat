import { centerText } from "../ui.js";
import { createMenu } from "../menu.js";
import { escapeReset } from "../escreset.js";

export default class runjump extends Phaser.Scene {
    constructor() {
        super("runjump");
    }

    preload() {
        // this.load.image('ground', 'assets/ground.png');
        this.load.atlas('farmer', 'assets/farmer.png', 'assets/farmer.json');
        this.load.image('rock', 'assets/rock.png');

        // this.load.spritesheet('cassava', 'assets/crops/cassava.png', {
        //     frameWidth: 64,  // width of each frame
        //     frameHeight: 82  // height of each frame
        // });
    }

    create() {
        escapeReset(this);

        this.cameras.main.setBackgroundColor("#ed3833");

        // Create a filled rectangular frame centered on screen
        const frameGraphics = this.add.graphics();
        const centerX = this.scale.width / 2 - 400;
        const centerY = this.scale.height / 2 - 240;
        this.frameX = centerX;
        this.frameY = centerY;
        this.frameWidth = 800;
        this.frameHeight = 450;
        frameGraphics.fillStyle(0x1645f5, 0.8); // fill color and alpha
        frameGraphics.fillRect(this.frameX, this.frameY, this.frameWidth, this.frameHeight);
        frameGraphics.lineStyle(4, 0xffffff, 1); // 4px white border
        frameGraphics.strokeRect(this.frameX, this.frameY, this.frameWidth, this.frameHeight);

        centerText(this, "ESCAPE THE INSPECTOR!", -170, { fill: "#ffffff", fontFamily: "PressStart2P", fontSize: "30px", align: "center" });


        this.jumpKeyPressTime = 0;
        this.isJumping = false;
        this.lastSpawnTime = 0;
        this.spawnInterval = 1000;
        this.inspectorJumpVelocity = -600;
        this.inspectorJumpTriggerDistance = 30;
        this.inspectorJumpCooldownMs = 420;
        this.inspectorLastJumpTime = -9999;
        this.gameIsOver = false;

        // Enable physics for this scene
        this.physics.world.gravity.y = 2550;

        // Create ground inside frame
        const groundWidth = this.frameWidth;
        const groundHeight = 40;
        const groundX = this.frameX + this.frameWidth / 2;
        const groundY = this.frameY + this.frameHeight - groundHeight / 2;

        this.ground = this.add.rectangle(groundX, groundY, groundWidth, groundHeight, 0xffffff);
        this.ground.setStrokeStyle(2, 0x000000);
        this.physics.add.existing(this.ground, true); // true = static body

        this.gravity = 1250;

        this.farmer = this.add.sprite(this.frameX + 170, groundY - 70, 'farmer', 'farmer 0.png');
        this.physics.add.existing(this.farmer);
        this.farmer.body.setSize(2, 70);
        this.physics.add.collider(this.farmer, this.ground);

        // Create animation if it doesn't exist
        if (!this.anims.exists('farmerWalk')) {
            this.anims.create({
                key: 'farmerWalk',
                frames: this.anims.generateFrameNames('farmer', {
                    prefix: 'farmer ',
                    suffix: '.png',
                    start: 0,
                    end: 7
                }),
                frameRate: 8,
                repeat: -1
            });
        }

        this.farmer.play('farmerWalk');

        this.inspector = this.add.rectangle(this.frameX + 60, groundY - 45, 30, 50, 0xff0000);
        this.physics.add.existing(this.inspector);
        this.inspector.body.setSize(30, 50);
        this.inspector.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.inspector, this.ground);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        this.obstacles = this.physics.add.group();
        this.physics.add.collider(this.farmer, this.obstacles, this.gameOver, null, this);

        this.startTime = this.time.now;
        this.lastSpawnTime = this.time.now;
    }

    update() {
        const jumpPressed = this.cursors.space.isDown || this.wKey.isDown || this.cursors.up.isDown;

        // Start jump if key pressed, farmer grounded, and not already jumping
        if (this.farmer && this.farmer.body && jumpPressed && this.farmer.body.touching.down && !this.isJumping) {
            this.jumpKeyPressTime = this.time.now;
            this.isJumping = true;
            console.log("Jump started!");
        }

        // Apply upward impulse while key is held and within 1 second
        if (this.farmer && this.farmer.body && jumpPressed && this.isJumping) {
            const holdDuration = this.time.now - this.jumpKeyPressTime;
            if (holdDuration <= 150) {
                // Apply upward impulse each frame (constant velocity while held)
                this.farmer.body.velocity.y = -500;
            } else {
                this.isJumping = false;
            }
        } else if (this.isJumping && !jumpPressed) {
            // Stop jumping when key is released
            this.isJumping = false;
        }

        // Reset jump state when farmer touches ground
        if (this.farmer && this.farmer.body && this.farmer.body.touching.down && !jumpPressed) {
            this.isJumping = false;
        }

        // Spawn obstacles at intervals
        if (!this.gameIsOver && this.time.now - this.lastSpawnTime >= this.spawnInterval) {
            this.spawnObstacle();
            this.lastSpawnTime = this.time.now;
            this.spawnInterval = Phaser.Math.Between(700, 1200);
        }

        this.autoJumpInspector();

        this.obstacles.children.iterate(obstacle => {
            if (obstacle && obstacle.x < this.frameX + 40) {
                obstacle.destroy();
            }
        });

        const elapsed = (this.time.now - this.startTime) / 1000;
        if (!this.gameIsOver && elapsed >= 40) {
            this.winGame();
        }

    }

    spawnObstacle() {
        const elapsed = (this.time.now - this.startTime) / 1000;
        const spawnX = this.frameX + this.frameWidth - 25;
        const spawnY = this.ground.y - this.ground.height / 2 - 10;
        const obstacle = this.add.image(spawnX, spawnY, "rock");
        this.physics.add.existing(obstacle);
        this.obstacles.add(obstacle);
        obstacle.body.setSize(obstacle.width, obstacle.height);
        if (elapsed >= 33) {
            obstacle.body.setVelocityX(-450);
        } else if (elapsed >= 28) {
            obstacle.body.setVelocityX(-405);
        } else if (elapsed >= 20) {
            obstacle.body.setVelocityX(-370);
        } else 
            if (elapsed >= 13) {
            obstacle.body.setVelocityX(-335);
        } else {
            obstacle.body.setVelocityX(-300);
        }
        obstacle.body.setImmovable(true);
        obstacle.body.setAllowGravity(false);

    }

    autoJumpInspector() {
        if (!this.inspector || !this.inspector.body) {
            return;
        }

        const now = this.time.now;
        if (now - this.inspectorLastJumpTime < this.inspectorJumpCooldownMs) {
            return;
        }

        const isGrounded = this.inspector.body.touching.down || this.inspector.body.blocked.down;
        if (!isGrounded) {
            return;
        }

        let closestObstacle = null;
        let closestDistance = Number.POSITIVE_INFINITY;

        this.obstacles.children.iterate((obstacle) => {
            if (!obstacle || !obstacle.active || !obstacle.body) {
                return;
            }

            const distanceAhead = obstacle.x - this.inspector.x;
            if (distanceAhead > 0 && distanceAhead < closestDistance) {
                closestObstacle = obstacle;
                closestDistance = distanceAhead;
            }
        });

        if (!closestObstacle) {
            return;
        }

        const obstacleHalfWidth = (closestObstacle.displayWidth || closestObstacle.width || 0) / 2;
        const triggerDistance = this.inspectorJumpTriggerDistance + obstacleHalfWidth;

        if (closestDistance <= triggerDistance) {
            this.inspector.body.setVelocityY(this.inspectorJumpVelocity);
            this.inspectorLastJumpTime = now;
        }
    }



    endGame(message, textColor) {
        this.gameIsOver = true;
        this.physics.pause();
        this.farmer.destroy();
        this.inspector.destroy();
        this.obstacles.clear(true, true);
        centerText(this, message, 0, { fill: textColor, fontSize: "20px", align: "center" });

        createMenu(this, {
            title: [""],
            options: ["[ retry mini game ]", "[ back to title ]"],
            callbacks: [
                () => this.scene.restart(),
                () => this.scene.start("titlescene")
            ],
            startY: 240,
            gap: 36,
            fontColor: "#ffffff",
            highlightColor: "#1645f5"
        });
    }

    gameOver() {
        console.log("Caught by the seed inspector!");
        this.endGame("you've been caught!", "#ed3833");
    }

    winGame() {
        console.log("You escaped!");
        this.endGame("you've escaped!", "#33ff00");
    }
}
