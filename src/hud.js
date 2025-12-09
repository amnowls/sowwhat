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
        this.moneyText = this.add.text(20, 20, '', { fontFamily: 'PressStart2P', fontSize: '24px', fill: '#ffffff' });
        this.corpText = this.add.text(20, 50, '', { fontFamily: 'PressStart2P', fontSize: '24px', fill: '#ffffff' });
        this.neighborText = this.add.text(20, 80, '', { fontFamily: 'PressStart2P', fontSize: '24px', fill: '#ffffff' });

        console.log("HUD created");
        // First update
        this.updateStats();
    }

    updateStats() {
        // Read global state
        const state = this.game.globalState;

        this.moneyText.setText('Money: ' + state.money);
        this.corpText.setText('Corporate Dependency: ' + state.corporateDependency);
        this.neighborText.setText('Neighbor Score: ' + state.neighborScore + '/10');
    }
}
