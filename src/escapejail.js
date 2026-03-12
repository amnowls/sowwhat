import { centerText } from "../ui.js";
import { createMenu } from "../menu.js";
import { escapeReset } from "../escreset.js";

export default class escapejail extends Phaser.Scene {
    constructor() {
        super("escapejail");
    }

    init(data) {
        this.nextScene = data?.nextScene || "titlescene";
    }

    preload() {
        this.load.atlas("farmer", "assets/farmer.png", "assets/farmer.json");
        this.load.atlas("inspector", "assets/inspector.png", "assets/inspector.json");
        this.load.audio('runjump_background', 'assets/sounds/runjump_background.wav');
        this.load.audio('youlost', 'assets/sounds/youlost.wav');
        this.load.audio('youwin', 'assets/sounds/youwin.wav');
    }

    create() {
        escapeReset(this);
        // this.cameras.main.setBackgroundColor("#0f1d3a");

        const backgroundMusic = this.sound.get('backgroundMusic');
        if (backgroundMusic) {
            backgroundMusic.pause();
        }
        this.Music = this.sound.add('runjump_background', { loop: true, volume: 0.5 });
        this.Music.play();
        this.events.once('shutdown', () => {
            this.Music.stop();
        });
        this.cameras.main.setBackgroundColor("#ed3833");

        // Create a filled rectangular frame centered on screen
        const frameGraphics = this.add.graphics();
        const centerX = this.scale.width / 2 - 400;
        const centerY = this.scale.height / 2 - 240;
        const frameWidth = 800;
        const frameHeight = 450;
        this.field = {
            x: centerX,
            y: centerY,
            width: frameWidth,
            height: frameHeight
        };
        frameGraphics.fillStyle(0x1645f5, 0.8); // fill color and alpha
        frameGraphics.fillRect(this.field.x, this.field.y, this.field.width, this.field.height);
        frameGraphics.lineStyle(4, 0xffffff, 1); // 4px white border
        frameGraphics.strokeRect(this.field.x, this.field.y, this.field.width, this.field.height);
        const borderInset = 8;
        this.physics.world.setBounds(
            this.field.x + borderInset,
            this.field.y + borderInset,
            this.field.width - borderInset * 2,
            this.field.height - borderInset * 2,
            true,
            true,
            true,
            true
        );


        this.roundOver = false;
        this.pelletsCollected = 0;
        this.pelletsNeeded = 8;
        this.policeSpeed = 250;
        this.policeSlideX = 1;
        this.policeSlideY = 1;
        this.policeWasBlockedH = false;
        this.policeWasBlockedV = false;
        this.policeUnstuckTimer = 0;
        this.policeUnstuckVX = 0;
        this.policeUnstuckVY = 0;
        this.policeStuckCheckPos = null;
        this.policeStuckCheckTime = 400;
        this.policeSmoothedVX = 0;

        this.drawPlayfield();
        this.createWalls();
        this.createActors();
        this.createPellets();
        this.createExit();
        this.createHud();

        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys("W,S,A,D");
    }

    drawPlayfield() {
        centerText(this, "ESCAPE JAIL", -280, { fill: "#ffffff", fontSize: "28px" });
    }

    createWalls() {
        this.walls = this.physics.add.staticGroup();
        this.wallRects = [];

        const createWall = (x, y, w, h) => {
            const wall = this.add.rectangle(x, y, w, h, 0x222222);
            // wall.setStrokeStyle(2, 0xffffff);
            this.physics.add.existing(wall, true);
            this.walls.add(wall);
            this.wallRects.push({
                left: x - w / 2,
                right: x + w / 2,
                top: y - h / 2,
                bottom: y + h / 2
            });
        };

        const createHWall = (x1, x2, y, thickness = 18) => {
            createWall((x1 + x2) / 2, y, x2 - x1, thickness);
        };

        const createVWall = (x, y1, y2, thickness = 18) => {
            createWall(x, (y1 + y2) / 2, thickness, y2 - y1);
        };

        const left = this.field.x;
        const right = this.field.x + this.field.width;
        const top = this.field.y;
        const bottom = this.field.y + this.field.height;
        const width = this.field.width;
        const height = this.field.height;
        const midX = left + width / 2;
        const midY = top + height / 2;

        // Keep all maze walls inset from the frame edge so actors can pass around the border.
        const edgePadding = 90;
        const laneLeft = left + edgePadding;
        const laneRight = right - edgePadding;
        const laneTop = top + edgePadding;
        const laneBottom = bottom - edgePadding;

        // Outer inner ring
        createHWall(laneLeft, laneRight, laneTop);
        createHWall(laneLeft, midX - 50, laneBottom);
        createHWall(midX + 50, laneRight, laneBottom);
        createVWall(laneLeft, laneTop, midY - 34);

        createVWall(midX + 50, midY + 34, laneBottom);
        createVWall(laneRight, midY + 34, laneBottom);

        // Main cross with openings at the sides
        // createHWall(laneLeft + 92, laneRight - 92, midY);
        // createVWall(midX, laneTop + 24, laneBottom - 24);

        // Extra branches for more maze-like routing
        createHWall(midX + 62, laneRight, laneTop + 100);
        createHWall(laneLeft, midX - 62, laneBottom - 100);
        createVWall(midX - 150, laneTop + 120, midY - 38);
        createVWall(midX + 150, midY + 38, laneBottom - 120);
    }

    createActors() {
        this.farmer = this.physics.add.sprite(this.field.x + 60, this.field.y + 60, "farmer", "farmer 0.png");
        this.farmer.setScale(0.7);
        this.farmer.body.setSize(36, 70);
        this.farmer.body.setOffset(22, 40);
        this.farmer.setCollideWorldBounds(true);

        this.police = this.physics.add.sprite(this.field.x + this.field.width - 80, this.field.y + this.field.height - 70, "inspector", "inspector 0.png");
        this.police.setScale(0.7);
        this.police.body.setSize(36, 70);
        this.police.body.setOffset(22, 60);
        this.police.setCollideWorldBounds(true);

        if (!this.anims.exists("escapeFarmerWalk")) {
            this.anims.create({
                key: "escapeFarmerWalk",
                frames: this.anims.generateFrameNames("farmer", {
                    prefix: "farmer ",
                    suffix: ".png",
                    start: 0,
                    end: 3
                }),
                frameRate: 10,
                repeat: -1
            });
        }

        if (!this.anims.exists("escapePoliceWalk")) {
            this.anims.create({
                key: "escapePoliceWalk",
                frames: this.anims.generateFrameNames("inspector", {
                    prefix: "inspector ",
                    suffix: ".png",
                    start: 0,
                    end: 3
                }),
                frameRate: 10,
                repeat: -1
            });
        }

        this.farmer.play("escapeFarmerWalk");
        this.police.play("escapePoliceWalk");

        this.physics.add.collider(this.farmer, this.walls);
        this.physics.add.collider(this.police, this.walls);
        this.physics.add.overlap(this.farmer, this.police, () => this.endRound(false), null, this);
    }

    updatePoliceChase(delta) {
        const toFarmerX = this.farmer.x - this.police.x;
        const toFarmerY = this.farmer.y - this.police.y;
        const distance = Math.hypot(toFarmerX, toFarmerY) || 1;

        // === Stuck detection: sample position every 400ms ===
        if (!this.policeStuckCheckPos) {
            this.policeStuckCheckPos = { x: this.police.x, y: this.police.y };
        }
        this.policeStuckCheckTime -= delta;
        if (this.policeStuckCheckTime <= 0) {
            const moved = Math.hypot(
                this.police.x - this.policeStuckCheckPos.x,
                this.police.y - this.policeStuckCheckPos.y
            );
            this.policeStuckCheckPos = { x: this.police.x, y: this.police.y };
            this.policeStuckCheckTime = 400;

            if (moved < 20 && this.policeUnstuckTimer <= 0) {
                // Compute combined push direction away from all nearby walls,
                // weighted by inverse distance so the closest wall dominates.
                let pushX = 0, pushY = 0;
                for (const rect of this.wallRects) {
                    const cx = Phaser.Math.Clamp(this.police.x, rect.left, rect.right);
                    const cy = Phaser.Math.Clamp(this.police.y, rect.top, rect.bottom);
                    let awayX = this.police.x - cx;
                    let awayY = this.police.y - cy;
                    const d = Math.hypot(awayX, awayY) || 0.1;
                    pushX += (awayX / d) * (1 / d);
                    pushY += (awayY / d) * (1 / d);
                }
                const pushLen = Math.hypot(pushX, pushY);
                if (pushLen > 0) {
                    pushX /= pushLen;
                    pushY /= pushLen;
                } else {
                    pushX = toFarmerX / distance;
                    pushY = toFarmerY / distance;
                }
                // Flip the slide directions so police tries the other path on next approach.
                this.policeSlideX = -this.policeSlideX;
                this.policeSlideY = -this.policeSlideY;
                this.policeWasBlockedH = false;
                this.policeWasBlockedV = false;

                this.policeUnstuckTimer = 350;
                this.policeUnstuckVX = pushX * this.policeSpeed;
                this.policeUnstuckVY = pushY * this.policeSpeed;
            }
        }

        // === Unstuck phase: push away from wall for fixed duration ===
        if (this.policeUnstuckTimer > 0) {
            this.policeUnstuckTimer -= delta;
            this.police.body.setVelocity(this.policeUnstuckVX, this.policeUnstuckVY);
            return;
        }

        // === Normal direct chase ===
        let vx = (toFarmerX / distance) * this.policeSpeed;
        let vy = (toFarmerY / distance) * this.policeSpeed;

        const b = this.police.body.blocked;
        const blockedH = (b.left && vx < 0) || (b.right && vx > 0);
        const blockedV = (b.up && vy < 0) || (b.down && vy > 0);

        if (blockedH) {
            // Lock slide direction on first contact; fall back to existing if farmer is level.
            if (!this.policeWasBlockedH) {
                this.policeSlideY = Math.sign(toFarmerY) || this.policeSlideY;
            }
            vx = 0;
            vy = this.policeSlideY * this.policeSpeed;
        } else if (blockedV) {
            if (!this.policeWasBlockedV) {
                this.policeSlideX = Math.sign(toFarmerX) || this.policeSlideX;
            }
            vy = 0;
            vx = this.policeSlideX * this.policeSpeed;
        }

        this.policeWasBlockedH = blockedH;
        this.policeWasBlockedV = blockedV;

        this.police.body.setVelocity(vx, vy);
    }

    createPellets() {
        this.pellets = this.physics.add.staticGroup();

        const spots = [
            [this.field.x + 230, this.field.y + 40],
            [this.field.x + this.field.width / 2, this.field.y + 170],
            [this.field.x + this.field.width - 40, this.field.y + 70],
            [this.field.x + 120, this.field.y + this.field.y],
            [this.field.x + this.field.width - 170, this.field.y + this.field.height / 2],
            [this.field.x + 220, this.field.y + this.field.height - 110],
            [this.field.x + this.field.width / 2, this.field.y + this.field.height - 30],
            [this.field.x + this.field.width - 280, this.field.y + this.field.height - 110]
        ];

        spots.forEach(([x, y]) => {
            const pellet = this.add.circle(x, y, 8, 0xffe066);
            this.physics.add.existing(pellet, true);
            this.pellets.add(pellet);
        });

        this.physics.add.overlap(this.farmer, this.pellets, this.collectPellet, null, this);
    }

    createExit() {
        this.exitDoor = this.add.rectangle(
            this.field.x + this.field.width - 24,
            this.field.y + this.field.height / 2,
            18,
            120,
            0xb5444f
        );
        this.exitDoorText = this.add.text(this.exitDoor.x - 58, this.exitDoor.y - 8, "LOCKED", {
            fontFamily: "PressStart2P",
            fontSize: "12px",
            fill: "#ffffff"
        });
        this.physics.add.existing(this.exitDoor, true);

        this.physics.add.overlap(this.farmer, this.exitDoor, () => {
            if (this.pelletsCollected >= this.pelletsNeeded) {
                this.endRound(true);
            }
        });
    }

    createHud() {
        this.hudText = this.add.text(this.field.x, this.field.y - 44, "", {
            fontFamily: "PressStart2P",
            fontSize: "12px",
            fill: "#ffffff"
        });
        this.hintText = this.add.text(this.field.x, this.field.y + this.field.height + 14, "use arrow keys or WASD. collect all dots, then reach the gate.", {
            fontFamily: "PressStart2P",
            fontSize: "11px",
            fill: "#ffffff"
        });
        this.refreshHud();
    }

    collectPellet(farmer, pellet) {
        pellet.destroy();
        this.pelletsCollected += 1;

        if (this.pelletsCollected >= this.pelletsNeeded) {
            this.exitDoor.setFillStyle(0x33aa55);
            this.exitDoorText.setText("OPEN");
        }
        this.refreshHud();
    }

    refreshHud() {
        this.hudText.setText(`dots: ${this.pelletsCollected}/${this.pelletsNeeded}   avoid the police`);
    }

    update(time, delta) {
        if (this.roundOver || !this.farmer?.body || !this.police?.body) return;

        const moveSpeed = 230;
        let vx = 0;
        let vy = 0;

        if (this.cursors.left.isDown || this.wasd.A.isDown) vx -= moveSpeed;
        if (this.cursors.right.isDown || this.wasd.D.isDown) vx += moveSpeed;
        if (this.cursors.up.isDown || this.wasd.W.isDown) vy -= moveSpeed;
        if (this.cursors.down.isDown || this.wasd.S.isDown) vy += moveSpeed;

        this.farmer.body.setVelocity(vx, vy);
        this.farmer.body.velocity.normalize().scale(moveSpeed);
        if (this.farmer.body.velocity.x < -5) {
            this.farmer.setFlipX(true);
        } else if (this.farmer.body.velocity.x > 5) {
            this.farmer.setFlipX(false);
        }

        this.updatePoliceChase(delta);

        // Smooth the X velocity over ~5 frames before flipping to prevent rapid oscillation.
        this.policeSmoothedVX = this.policeSmoothedVX * 0.8 + this.police.body.velocity.x * 0.2;
        if (this.policeSmoothedVX < -30) this.police.setFlipX(true);
        else if (this.policeSmoothedVX > 30) this.police.setFlipX(false);
    }

    endRound(playerWon) {
        if (this.roundOver) return;
        this.roundOver = true;
        this.Music.stop();
        this.farmer.body.setVelocity(0, 0);
        this.police.body.setVelocity(0, 0);

        this.physics.pause();


        const resultTitle = playerWon ? "YOU ESCAPED" : "CAUGHT BY POLICE";
        const resultColor = playerWon ? "#33ff66" : "#ff4d4d";
        centerText(this, resultTitle, -16, { fill: resultColor, fontSize: "24px" });

        if (playerWon) {
            this.sound.play('youwin');
            this.game.globalState.criminality = Math.max(0, this.game.globalState.criminality - 1);
        } else {
            this.sound.play('youlost');
            this.game.globalState.criminality += 1;
        }
        this.scene.get("hud").updateStats();

        createMenu(this, {
            title: "",
            options: [
                "[ play again ]",
                "[ continue ]"
            ],
            callbacks: [
                () => this.scene.restart({ nextScene: this.nextScene }),
                () => this.scene.start(this.nextScene)
            ],
            fontColor: "#ffffff",
            highlightColor: "#ffb000"
        });
    }
}
