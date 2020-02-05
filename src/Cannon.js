class Cannon {
    constructor() {
        this.scene = null;
        this.sceneCannonImage = null;
        this.cnt = 0;
        this.speed = 1000;
    }

    focusOnPoint(point) {
        if (this.sceneCannonImage !== null) {
            let angleToPointer = Phaser.Math.Angle.BetweenPoints({x: this.sceneCannonImage.x, y: this.sceneCannonImage.y}, point);
            this.sceneCannonImage.rotation = Phaser.Math.Angle.Wrap(angleToPointer + Phaser.Math.TAU);
        }
    };

    startShoot() {
        if (this.sceneCannonImage) {
            let ballStartingPoint = this.getBallStartingPoint();
            let direction = this.getBallDirection();

            return CannonBall.build()
                .withImageLabel('cannon_ball')
                .withScale(0.25)
                .withRadius(24.5)
                .withVelocity({x: direction.x, y: direction.y})
                .placedAt({x: ballStartingPoint.x, y: ballStartingPoint.y})
                .onScene(this.scene)
                .onStartShootingDo(this.onStartShooting)
                .render();
        }
    }

    getBallStartingPoint() {
        return {x: this.sceneCannonImage.x, y: this.sceneCannonImage.y };
        // return {x: 480, y: 240};
    }

    getBallDirection() {
        return {
            x: this.speed * Math.cos(this.sceneCannonImage.rotation - Phaser.Math.TAU),
            y: this.speed * Math.sin(this.sceneCannonImage.rotation - Phaser.Math.TAU)
        };
    }

    static build() {
        return new Cannon.CannonBuilder();
    }

    static CannonBuilder = class {
        constructor() {
            this.cannon = new Cannon();
        }

        withCannonImage(label, pathToImage, scale=1) {
            this.cannonLabel = label;
            this.pathToCannonImage = pathToImage;
            this.cannonScale = scale;
            return this;
        }

        withCannonBallImage(label, pathToImage, scale=1) {
            this.cannonBallLabel = label;
            this.pathToCannonBallImage = pathToImage;
            this.cannonBallScale = scale;
            return this;
        }

        withCenterAt(origin) {
            this.cannon.origin = origin;
            return this;
        }

        withBarrelLength(length) {
            this.cannon.barrelLength = length;
            return this;
        }

        placedAt(scenePoint) {
            this.scenePoint = scenePoint;
            return this;
        }

        onScene(scene) {
            this.cannon.scene = scene;
            return this;
        }

        onStartShootingDo(action) {
            this.cannon.onStartShooting = action;
            return this;
        }

        onBumpingDo(bumpingAction) {
            this.cannon.bumpingAction = bumpingAction;
            return this;
        }

        render() {
            this.cannon.scene.load.image(this.cannonLabel, this.pathToCannonImage);
            // this.cannon.scene.load.image(this.cannonBallLabel, this.pathToCannonBallImage);
            this.cannon.scene.load.once('complete', () => {
                this.cannon.sceneCannonImage = this.cannon.scene.add.image(this.scenePoint.x, this.scenePoint.y, this.cannonLabel);
                this.cannon.sceneCannonImage.setScale(this.cannonScale);
                console.log('cannon image loaded');
            });
            this.cannon.scene.load.start();



            return this.cannon;
        }
    }
}