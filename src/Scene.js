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
        this.load.image('heart', 'assets/images/heart.png')
    }

    create() {
        this.events = new Queue();

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

        this.scoreText = this.add.text(700, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        this.hearts = [];
        for (let i = 0; i < 5; ++i) {
            this.hearts.push(this.add.image(670 - 27 * i, 34, 'heart').setScale(0.045));
        }

        this.model = new GameModel(this);

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
        if (this.superText !== undefined) {
            let distance = Phaser.Math.Distance.Between(
                this.superText.body.x, this.superText.body.y,
                825, 30
            );

            console.log('current distance: ' + distance);

            if (distance < 20) {
                this.superText.body.stop();
                this.superText.destroy();
                this.superText = undefined;
            }
        }
    }

    focusCannonOnPointer(cannon) {
        let angleToPointer = Phaser.Math.Angle.BetweenPoints(this.cannon.getOrigin(), this.input.activePointer);
        cannon.rotateTo(Phaser.Math.Angle.Wrap(angleToPointer + Phaser.Math.TAU));
        return this;
    }

    setScore(score) {
        this.scoreText.setText('score: ' + score);
    }

    removeHeart() {
        this.hearts.pop().destroy();

        if (this.hearts.length === 0) {
            this.scene.start('gameover');
        }
    }

    // change the name of the method
    flashAnim(text, pos, theme) {
        // this.superText = this.add.text(400, 300, '' + text, {font: "48px Arial Black", fill: "#c51b7d"});
        let   textStyle = {};
        let strokeStyle = {};

        if (pos === "center") { pos = {x: 400, y: 300}; textStyle.font = "48px Arial Black"; }
        if (pos === "bottom") { pos = {x: 400, y: 480}; textStyle.font = "32px Arial Black"; }

        if (theme === "success") { textStyle.fill = "#6EBA7F"; strokeStyle.color = "#A1F2B3"; strokeStyle.thickness = 16; }
        if (theme === "fail"   ) { textStyle.fill = "#A00000"; strokeStyle.color = "#DD0000"; strokeStyle.thickness = 16; }

        this.superText = this.add.text(pos.x, pos.y, '' + text, textStyle);
        this.superText.setStroke(strokeStyle.color, strokeStyle.thickness)
        this.physics.world.enable(this.superText);

        // var target = new Phaser.Math.Vector2(0, 16);
        // target.x = 400;
        // target.y = 350;
        //
        this.physics.accelerateToObject(this.superText, {x: 825, y: 30}, 200, 1000, 1000);

        // this.events.enqueue(() => {
        //     console.log('I was in an event')
        //     let distance = Phaser.Math.Distance.Between(
        //         this.superText.body.x, this.superText.body.y,
        //         400, 300
        //     );
        //
        //     if (distance < 4) {
        //         this.superText.body.stop()
        //     }
        // })
    }

}