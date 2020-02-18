class Scene extends Phaser.Scene {
    constructor() {
        super('playGame');
    }

    init() {
    }

    preload() {
        this.load.image('bgWhite', 'assets/images/formulaBackground.png');
        this.load.image('bgGreen', 'assets/images/bgGreen.png');
        this.load.image('bgRed', 'assets/images/bgRed.png');
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

        this.anims.create({
            key: 'fm_reject',
            frames: [
                { key: 'bgWhite' },
                { key: 'bgRed' }
            ],
            frameRate: 10,
            repeat: 3
        });

        this.model = new GameModel();

        let fmBuilder = new FormulaBuilder()
            .setGameModel(this.model)
            .setBgImageLabel('bgWhite')
            .setAcceptAnim('fm_accept')
            .setRejectAnim('fm_reject')
            .setFormulaHeight(40)
            .setFormulaShift({x: 0, y: -4})
            .setScene(this);
        let fmGenerator= new FormulasGenerator(this.model);
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

        // let positions = TWF.api.findSubstitutionPlacesCoordinatesInExpressionJSON("A\\/A", "A", "B");
        // console.log("positions: " + positions);
        // let places = (JSON.parse(positions)).substitutionPlaces;
        // places.forEach((place) => {
        //     for (let prop in place) {
        //         place[prop] = parseInt(places[pos]);
        //     }
        // });
        //
        // console.log("length of places: " + places.legth);
        //
        // let result1 = TWF.api.applyExpressionBySubstitutionPlaceCoordinates("A\\/A", "A", "B",
        //     places[0].parentStartPosition, places[0].parentEndPosition,
        //     places[0].startPosition, places[0].endPosition);
        // let result2 = TWF.api.applyExpressionBySubstitutionPlaceCoordinates("A\\/A", "A", "B",
        //     places[1].parentStartPosition, places[1].parentEndPosition,
        //     places[1].startPosition, places[1].endPosition);
        // let result3 = TWF.api.applyExpressionBySubstitutionPlaceCoordinates("A\\/A", "A", "B",
        //     places[2].parentStartPosition, places[2].parentEndPosition,
        //     places[2].startPosition, places[2].endPosition);
        // console.log("result1: " + result1);
        // console.log("result2: " + result2);
        // console.log("result3: " + result3);

        // let fg = new FormulasGenerator();
        // console.log(fg.getNext());

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