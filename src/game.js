const config = {
    width: 640,
    height: 480,
    backgroundColor: 0xffcc66,
    scene: [Scene],
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    }
};

let game = new Phaser.Game(config);