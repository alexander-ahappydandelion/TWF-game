class Cannon {
    constructor() {
        this.obj = undefined;
        this.builder = undefined;
    }

    shoot() {
        console.log('пиу-пин');
        let cannonBall = this.builder
            .withDirection(this.calculateDirection())
            .placedAt(this.getOrigin())
            .onScene(this.obj.scene)
            .render();
        this.obj.setDepth(1);
        return cannonBall
    }

    rotateTo(angle) {
        this.obj.rotation = angle;
        return this;
    }

    getOrigin() {
        return {
            x: this.obj.x,
            y: this.obj.y
        };
    }

    calculateDirection() {
        return {
            x: Math.cos(this.obj.rotation - Phaser.Math.TAU),
            y: Math.sin(this.obj.rotation - Phaser.Math.TAU)
        };
    }

}