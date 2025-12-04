// menu.js
// this is for keyboard toggles/input
import { centerText } from "./ui.js";

export function createMenu(scene, {
    title,
    options,       // [ "Option text", ... ]
    callbacks,     // [ ()=>{}, ()=>{}, ... ]
    startY = 150,
    gap = 30,
    startX = 50
}) {

    // --- Draw Title ---
    centerText(scene, title);

    // --- Build menu option texts ---
    const optionObjects = options.map((text, i) => {
        const textObj = scene.add.text(0, 0, text, { fontSize: '24px', fill: "#ffffffff" });
        const centerY = scene.scale.height / 2 + (startY + i * gap)+25;
        textObj.setPosition(startX +150, centerY);
        textObj.setOrigin(0, 0.5); // left-align horizontally, center vertically
        return textObj;
        }
    );

    let index = 0;

    const updateHighlight = () => {
        optionObjects.forEach((opt, i) => {
            opt.setStyle({ fill: i === index ? "#fbff94ff" : "#ffffffff" });
            opt.setScale(i === index ? 1.1 : 1);
        });
    };
    updateHighlight();

    // --- Input keys ---
    const K = Phaser.Input.Keyboard.KeyCodes;
    const keyUp = scene.input.keyboard.addKey(K.UP);
    const keyDown = scene.input.keyboard.addKey(K.DOWN);
    const keyW = scene.input.keyboard.addKey(K.W);
    const keyS = scene.input.keyboard.addKey(K.S);
    const keySpace = scene.input.keyboard.addKey(K.SPACE);
    const keyEnter = scene.input.keyboard.addKey(K.ENTER);

    // --- Add update loop ---
    scene.input.keyboard.on("keydown", () => { }, scene); // ensures update is called

    scene.update = function () {
        if (Phaser.Input.Keyboard.JustDown(keyUp) || Phaser.Input.Keyboard.JustDown(keyW)) {
            index = (index - 1 + options.length) % options.length;
            updateHighlight();
        }
        if (Phaser.Input.Keyboard.JustDown(keyDown) || Phaser.Input.Keyboard.JustDown(keyS)) {
            index = (index + 1) % options.length;
            updateHighlight();
        }
        if (Phaser.Input.Keyboard.JustDown(keySpace) || Phaser.Input.Keyboard.JustDown(keyEnter)) {
            callbacks[index]();
        }
    };

    // --- Optional mouse click support ---
    // optionObjects.forEach((opt, i) => {
    //     opt.setInteractive();
    //     opt.on("pointerdown", () => callbacks[i]());
    // });
}
