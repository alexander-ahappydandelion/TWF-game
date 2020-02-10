class Formula {
    constructor() {
        this.bgImage = undefined;
        this.fmImage = undefined;

        this.bgOrigin = undefined;
        this.fmOrigin = undefined;

        this.acceptAnim = undefined;
    }

    move(speed) {
        this.bgOrigin.x += speed.x;
        this.bgOrigin.y += speed.y;

        if (this.bgImage) {
            this.bgImage.x = this.bgOrigin.x;
            this.bgImage.y = this.bgOrigin.y;
        }

        this.fmOrigin.x += speed.x;
        this.fmOrigin.y += speed.y;

        if (this.fmImage) {
            this.fmImage.x = this.fmOrigin.x;
            this.fmImage.y = this.fmOrigin.y;
        }
    }

    getSceneObject() {
        return this.bgImage;
    }

    getTopY() {
        if (this.bgImage) {
            return this.bgImage.y - this.bgImage.displayHeight / 2;
        }
    }

    hit() {
        if (this.acceptAnim) {
            this.bgImage.on('animationcomplete', () => {
                this.destroy();
            });
            this.bgImage.play(this.acceptAnim);
        }
    }

    destroy() {
        if (this.bgImage) { this.bgImage.destroy(); }
        if (this.fmImage) { this.fmImage.destroy(); }
    }

}