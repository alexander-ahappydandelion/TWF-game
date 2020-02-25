const config = {
    width: 1200,
    height: 800,
    backgroundColor: 0xffcc66,
    scene: [Scene],
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    fps: {
        target: 60
    }
};

let game = new Phaser.Game(config);