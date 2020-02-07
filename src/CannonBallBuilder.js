class CannonBallBuilder {
    constructor() {
    }

    withImageLabel(label, scale=1, radius=0) {
        this.label = label;
        this.scale = scale;
        this.radius = radius;
        return this;
    }

    withSpeed(speed) {
        this.speed = speed;
        return this;
    }

    withDirection(direction) {
        this.direction = direction;
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

    render() {
        let cannonBall = new CannonBall();

        cannonBall.obj = this.scene.physics.add.image(this.origin.x, this.origin.y, this.label);
        cannonBall.obj.setScale(this.scale);
        cannonBall.obj.setCircle(this.radius);
        cannonBall.obj.setVelocity(this.direction.x * this.speed, this.direction.y * this.speed);

        return cannonBall;
    }

}