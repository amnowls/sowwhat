//game stats window

export default class hud extends Phaser.Scene {
    constructor() {
        super({ key: 'hud', active: false }); 

    }
    preload(){
         this.load.font(
            'PressStart2P',
            'https://raw.githubusercontent.com/google/fonts/refs/heads/main/ofl/pressstart2p/PressStart2P-Regular.ttf',
            'truetype');

    }
    create() {
        this.scene.setVisible(false, 'hud');
        // Store references to text objects so we can update them
        const { width } = this.scale;
        this.moneyText = this.add.text(20, 20, '', { fontFamily: 'PressStart2P', fontSize: '13px', fill: '#a26f00' });
        this.corpText = this.add.text(20, 50, '', { fontFamily: 'PressStart2P', fontSize: '13px', fill: '#a26f00' });
        this.neighborText = this.add.text(20, 80, '', { fontFamily: 'PressStart2P', fontSize: '13px', fill: '#a26f00' });
        this.soilText = this.add.text(20, 110, '', { fontFamily: 'PressStart2P', fontSize: '13px', fill: '#a26f00' });
        console.log("HUD created");
        // First update
        this.updateStats();
    }

    updateStats() {
        // Read global state
        const state = this.game.globalState;

        this.moneyText.setText('MONEY: ' + state.money);
        this.corpText.setText('CORPORATE DEPENDENCY: ' + state.corporateDependency);
        this.neighborText.setText('NEIGHBOUR SCORE: ' + state.neighborScore + '/10');
        this.soilText.setText('SOIL HEALTH: ' + state.soilhealth);
    }
}
