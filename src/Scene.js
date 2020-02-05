class Scene extends Phaser.Scene {
    constructor() {
        super('playGame');
        this.cannonBalls = [];
        this.speed = 30;
    }

    init() {
        this.cannonOrigin = {
            x: 0.5,
            y: 0.75
        };
    }

    preload() {
        this.load.image('cannon_ball', 'assets/images/cannon_ball.png');
        this.load.image('cannon', 'assets/images/cannon.png');
        this.load.image('formulaBackground', 'assets/images/formulaBackground.png');
    }

    create() {
        // this.cannon = this.add.image(580, 260, 'cannon');
        // this.cannon.setOrigin(this.cannonOrigin.x, this.cannonOrigin.y);
        // this.cannon.setScale(0.25);

        this.cannon = Cannon.build()
            .withCannonImage('cannon', 'assets/images/cannon.png', 0.25)
            .placedAt({x: 580, y: 260})
            .withCenterAt({x: 0.5, y: 0.75})
            .onScene(this)
            .onStartShootingDo(this.registerCannonBallOnScene(this))
            .render();

        // this.ct = this.physics.add.image(30, 240, 'cannon');
        // this.bt = this.physics.add.image(400, 240, 'cannon_ball');
        // this.bt.setVelocity(-20, 0);
        // this.physics.add.collider(this.ct, this.bt);



        this.formulasField = new FormulasField({width: 460, height: 60}, {width: 480, height: 480},
            {x: 240, y: 240}, this, null);

        // this.input.on('pointerdown', ((formulasField) => {
        //     return () => {
        //         let ball = this.cannon
        //         formulasField
        //     }
        // })(this.formulasField));
        this.input.on('pointerdown', () => {
            let ball = this.cannon.startShoot();
            // this.physics.add.collider(ball.getSceneImage(), this.bt);
            // this.formulasField.addCollision(ball.getSceneImage(), () => {
            //
            // });

        });

        // this.cannon.startShoot();
    }

    focusCannonOnPointer(pointer) {
        let angleToPointer = Phaser.Math.Angle.BetweenPoints({x: this.cannon.x, y: this.cannon.y}, pointer);
        // console.log(pointer.x, pointer.y);

        let angleDelta = Phaser.Math.Angle.Wrap(angleToPointer + Phaser.Math.TAU);
        this.cannon.rotation = angleDelta;
    };

    update() {
        // this.focusCannonOnPointer(this.input.activePointer);
        // this.formula.moveTo({x: 0, y: 300});
        this.formulasField.update();
        this.cannon.focusOnPoint(this.input.activePointer);
    }

    registerCannonBallOnScene(scene) {
        return function(cannonBall) {
            scene.formulasField.addCollision(cannonBall.getSceneImage(), (formula) => {
                return function (sceneFormulaImage, sceneBallImage) {
                    console.log('collision happened');
                }
            });
        }
    }

    addCollisionsWithBall(ball) {
        return () => {
            this.formulasField.addCollision(ball, () => {
            });
        }
    }

}