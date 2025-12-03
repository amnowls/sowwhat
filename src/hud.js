export default class hud extends Phaser.Scene {
    constructor() {
        super({ key: 'hud', active: true }); // active by default
    }

    create() {
        // Store references to text objects so we can update them
        const { width } = this.scale;

        this.moneyText = this.add.text(20, 20, '', { fontSize: '24px', fill: '#ffffff' });
        this.corpText = this.add.text(20, 50, '', { fontSize: '24px', fill: '#ffffff' });
        this.neighborText = this.add.text(20, 80, '', { fontSize: '24px', fill: '#ffffff' });

        // First update
        this.updateStats();
    }

    updateStats() {
        // Read global state
        const state = this.game.globalState;

        this.moneyText.setText('Money: ' + state.money);
        this.corpText.setText('Corporate Dependency: ' + state.corporateDependency);
        this.neighborText.setText('Neighbor Score: ' + state.neighborScore);
    }
}
