import titlescene from "./src/titlescene.js";
import scene1 from "./src/scene1.js";
import scene2 from "./src/scene2.js";

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [titlescene, scene1, scene2]
};

var game = new Phaser.Game(config);

