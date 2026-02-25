// menu.js
// this is for keyboard toggles/input
import { centerText } from "./ui.js";

export function createMenu(scene, {
    title,
    options,       // [ "Option text", ... ]
    callbacks,     // [ ()=>{}, ()=>{}, ... ]
    startY = 200,
    fontSize = '18px',
    gap = 30,
    startX = 50,
    fontColor = "#ffffff",
    highlightColor = "#1645f5"
}) {

    // --- Draw Title ---
    centerText(scene, title, -30);

    // --- Build menu option texts ---
    const optionObjects = options.map((text, i) => {
        const textObj = scene.add.text(0, 0, text, {
            fontFamily: 'PressStart2P',
            fontSize: '17px',
            fill: fontColor
        });
        const centerY = scene.scale.height / 2 + (startY + i * gap) + 25;
        textObj.setPosition(startX + 150, centerY);
        textObj.setOrigin(0, 0.5); // left-align horizontally, center vertically
        return textObj;
    });

    let index = 0;

    const updateHighlight = () => {
        optionObjects.forEach((opt, i) => {
            opt.setStyle({ fill: i === index ? highlightColor : fontColor });
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
            try {
                if (scene.sound && typeof scene.sound.play === 'function' &&
                    scene.cache && scene.cache.audio && typeof scene.cache.audio.exists === 'function' &&
                    scene.cache.audio.exists('menuMove')) {
                    scene.sound.play('menuMove');
                } else if (window && window.__globalMoveAudio) {
                    try { window.__globalMoveAudio.currentTime = 0; window.__globalMoveAudio.play().catch(()=>{}); } catch(e){}
                }
            } catch (e) { console.warn('Failed to play move sound', e); }

            index = (index - 1 + options.length) % options.length;
            updateHighlight();
        }
        if (Phaser.Input.Keyboard.JustDown(keyDown) || Phaser.Input.Keyboard.JustDown(keyS)) {
            try {
                if (scene.sound && typeof scene.sound.play === 'function' &&
                    scene.cache && scene.cache.audio && typeof scene.cache.audio.exists === 'function' &&
                    scene.cache.audio.exists('menuMove')) {
                    scene.sound.play('menuMove');
                } else if (window && window.__globalMoveAudio) {
                    try { window.__globalMoveAudio.currentTime = 0; window.__globalMoveAudio.play().catch(()=>{}); } catch(e){}
                }
            } catch (e) { console.warn('Failed to play move sound', e); }

            index = (index + 1) % options.length;
            updateHighlight();
        }
        if (Phaser.Input.Keyboard.JustDown(keySpace) || Phaser.Input.Keyboard.JustDown(keyEnter)) {

            const cb = callbacks[index];
            if (typeof cb === 'function') {
                try { cb(); } catch (e) { console.error('Menu callback threw', e); }
            } else {
                console.warn('Menu callback is not a function at index', index);
            }
        }
    };

    // --- Optional mouse click support ---
    // optionObjects.forEach((opt, i) => {
    //     opt.setInteractive();
    //     opt.on("pointerdown", () => callbacks[i]());
    // });
}
