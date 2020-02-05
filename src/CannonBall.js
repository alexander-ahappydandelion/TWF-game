class CannonBall {
    constructor() {
        this.speed = -3;
    }

    getSceneImage() {
        return this.sceneCannonBallImage;
    }

    static build() {
        return new CannonBall.CannonBallBuilder();
    }

    static CannonBallBuilder = class {
        constructor() {
            this.cannonBall = new CannonBall();

            this.label = 'cannon_ball';
            this.scale = 1;
            this.radius = 24.5;
            this.velocity = {x: 0, y: 0};
            this.origin = {x: 0, y: 0};
        }

        withImageLabel(label) {
            this.label = label;
            return this;
        }

        withScale(scale) {
            this.scale = scale;
            return this;
        }

        withRadius(radius) {
            this.radius = radius;
            return this;
        }

        withVelocity(velocity) {
            this.velocity = velocity;
            return this;
        }

        placedAt(origin) {
            this.origin = origin;
            return this;
        }

        onScene(scene) {
            this.scene = scene;
            return this;
        }

        onStartShootingDo(actionWithBall) {
            this.onStartShootingWithBall = actionWithBall;
            return this;
        }

        render() {
            this.cannonBall.sceneCannonBallImage = this.scene.physics.add.image(this.origin.x, this.origin.y, this.label);
            this.cannonBall.sceneCannonBallImage.setScale(this.scale);
            this.cannonBall.sceneCannonBallImage.setCircle(this.radius);
            this.cannonBall.sceneCannonBallImage.setVelocity(this.velocity.x, this.velocity.y);

            this.onStartShootingWithBall(this.cannonBall);

            return this.cannonBall;
        }
    }
}