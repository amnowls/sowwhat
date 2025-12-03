// import hud from "./src/hud.js";
import titlescene from "./src/titlescene.js";
import scene1 from "./src/scene1.js";
import scene2 from "./src/scene2.js";
import scene3 from "./src/scene3.js";


var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [titlescene, scene1, scene2, scene3],
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

var game = new Phaser.Game(config);

// global state object
game.globalState = {
    money: 100,
    corporateDependency: 0,
    neighborScore: 50
};

    // create() {
    //     this.add.text(100, 250, "money", {
    //         fontSize: "24px",
    //     });
    // }