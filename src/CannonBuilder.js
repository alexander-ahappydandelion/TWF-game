class CannonBuilder {
    constructor() {
    }

    withCannonBallBuilder(builder) {
        this.builder = builder;
        return this;
    }

    withCannonImageLabel(label, scale=1) {
        this.label = label;
        this.scale = scale;
        return this;
    }

    withCenterAt(center) {
        this.center = center;
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
        let cannon = new Cannon();

        cannon.obj = this.scene.add.image(this.origin.x, this.origin.y, this.label);
        cannon.obj.setScale(this.scale);
        cannon.builder = this.builder;

        console.log('render of cannon completed' + cannon.obj.originX);

        return cannon;
    }

}