class GameOverScene extends Phaser.Scene {

    constructor() {
        super('gameover');
    }

    create() {
        this.add.text(400, 300, "Game over", { font: "64px Arial", fill: "#000" });
    }

}