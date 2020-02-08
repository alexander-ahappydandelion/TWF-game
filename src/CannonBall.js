class CannonBall {
    constructor() {
        this.obj = undefined;
    }

    getSceneObject() {
        return this.obj;
    }

    destroy() {
        this.obj.disableBody(true, true)
    }

}