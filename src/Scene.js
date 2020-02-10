class Scene extends Phaser.Scene {
    constructor() {
        super('playGame');
    }

    init() {
    }

    preload() {
        this.load.image('bgWhite', 'assets/images/formulaBackground.png');
        this.load.image('bgGreen', 'assets/images/bgGreen.png');
        this.load.image('cannon_ball', 'assets/images/cannon_ball.png');
        this.load.image('cannon', 'assets/images/cannon.png');
    }

    create() {
        this.anims.create({
            key: 'fm_accept',
            frames: [
                { key: 'bgWhite' },
                { key: 'bgGreen' }
            ],
            frameRate: 10,
            repeat: 3
        });

        let fmBuilder = new FormulaBuilder()
            .setBgImageLabel('bgWhite')
            .setAcceptAnim('fm_accept')
            .setFormulaHeight(40)
            .setFormulaShift({x: 0, y: -4})
            .setScene(this);
        let fmGenerator= new FormulasGenerator();
        this.fmField = new FormulasField(480, this, fmGenerator, fmBuilder);

        let cannonBallBuilder = new CannonBallBuilder()
            .withImageLabel('cannon_ball', 0.25, 24.5)
            .withSpeed(1000);

        this.cannon = new CannonBuilder()
            .withCannonBallBuilder(cannonBallBuilder)
            .withCannonImageLabel('cannon', 0.25)
            .withCenterAt({ x: 0.5, y: 0.75 })
            .placedAt({ x: 580, y: 260 })
            .onScene(this)
            .render();

        this.input.on('pointerdown', () => {
            let ball = this.cannon.shoot();
            console.log('[scene] the ball has been got');

            this.fmField.addCollisionWith(ball);
            console.log('[scene] the collision was added');
        });

    }

    update() {
        this.fmField.update();
        this.focusCannonOnPointer(this.cannon);
    }

    focusCannonOnPointer(cannon) {
        let angleToPointer = Phaser.Math.Angle.BetweenPoints(this.cannon.getOrigin(), this.input.activePointer);
        cannon.rotateTo(Phaser.Math.Angle.Wrap(angleToPointer + Phaser.Math.TAU));
        return this;
    }

}