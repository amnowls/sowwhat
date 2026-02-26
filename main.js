// import hud from "./src/hud.js";
// import titlescene from "./src/titlescene.js";
// import scene1 from "./src/scene1.js";
// import cropchoice from "./src/cropchoice.js";
// import certify from "./src/certify.js";
// import scene3 from "./src/scene3.js";
// import scene4 from "./src/scene4.js";
// import scene5 from "./src/scene5.js";

import { hud, titlescene, loading1, scene1, cropchoice, certify, scene3, scene4, season1stats, seedlaw, scene6, scene7, scene8, scene9, scene10, season2stats, scene11, scene12, scene13, scene14, scene15} from "./src/SCENES.js";
import musicscene from "./src/musicscene.js";

var config = {
    type: Phaser.AUTO,
    backgroundColor: "#ffb000",
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [titlescene, hud, loading1, scene1,cropchoice, certify, scene3, scene4, season1stats, seedlaw, scene6, scene7, scene8, scene9, scene10, season2stats, scene11, scene12, scene13, scene14, scene15],
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    input: {
        keyboard: true,
        gamepad: false
    }
    
};


// global state object
const globalState = {
    money: 100,
    corporateDependency: 0,
    neighborScore: 5,
    criminalRecord: "perfect citizen",
    certified: false,
    crop: "",
    fines: 0,
    pesticides: false,
    soilhealthStates: ["deteriorated", "poor", "fair", "good", "excellent"],
    soilhealthIndex: 3, // 0: deteriorated, 1: poor, 2: fair, 3: good, 4: excellent
    get soilhealth() {
        return this.soilhealthStates[this.soilhealthIndex];
    },
    set soilhealth(val) {
        const idx = this.soilhealthStates.indexOf(val);
        if (idx !== -1) this.soilhealthIndex = idx;
    },
    reset(){
        this.neighborScore = 5;
        this.corporateDependency = 0;
        this.money = 100;
        this.crop = "";
        this.certified = false;
        this.criminalRecord = "perfect citizen";
        this.fines = 0;
        this.pesticides = false;
        this.soilhealthIndex = 3;
    }
};

var game = new Phaser.Game(config);
game.globalState = globalState;

// Create lightweight global HTML5 Audio objects for select and move sounds
// so any scene can trigger them regardless of Phaser preload order.
window.__globalSelectAudio = new Audio('assets/sounds/select.wav');
window.__globalSelectAudio.preload = 'auto';
window.__globalMoveAudio = new Audio('assets/sounds/move.wav');
window.__globalMoveAudio.preload = 'auto';
window.__globalMoneyAudio = new Audio('assets/sounds/money.wav');
window.__globalMoneyAudio.preload = 'auto';
window.addEventListener('keydown', (e) => {
    // Spacebar handler no longer plays select sound globally
    // Sound effect now handled in menu selection logic
});

// ===== ENABLE/DISABLE MUSIC =====
const ENABLE_MUSIC = true;  // Set to true to enable background music
// ================================

if (ENABLE_MUSIC) {
    game.scene.add('musicscene', musicscene);
    game.scene.start('musicscene');
}

game.scene.start('hud');

