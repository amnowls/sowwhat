// import hud from "./src/hud.js";
// import titlescene from "./src/titlescene.js";
// import scene1 from "./src/scene1.js";
// import cropchoice from "./src/cropchoice.js";
// import certify from "./src/certify.js";
// import scene3 from "./src/scene3.js";
// import scene4 from "./src/scene4.js";
// import scene5 from "./src/scene5.js";

import { hud, titlescene, scene1, cropchoice, certify, scene3, scene4, scene5, scene6, scene7, scene8} from "./src/SCENES.js";


var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [titlescene, scene1,cropchoice, certify, scene3, scene4, scene5, scene6, scene7, scene8, hud],
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
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
};

var game = new Phaser.Game(config);
game.globalState = globalState;

game.scene.start('hud');

