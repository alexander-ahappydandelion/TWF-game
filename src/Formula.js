class Formula {
    constructor() {
        this.model = undefined;
        this.isCorrect = undefined;

        this.hitScore = undefined;
        this.passScore = undefined;

        this.bgImage = undefined;
        this.fmImage = undefined;

        this.bgOrigin = undefined;
        this.fmOrigin = undefined;

        this.acceptAnim = undefined;
        this.rejectAnim = undefined;

        this.isHit = false;
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
        if (this.isHit) { return; }

        this.model.formulaWasHit(this);

        console.log("isCorrect: " + String(this.isCorrect) + " $hit");
        if ( this.isCorrect && this.rejectAnim) {
            this.bgImage.play(this.rejectAnim);
            this.model.decLives("the player hit a correct formula");
        }
        if (!this.isCorrect && this.acceptAnim) {
            this.bgImage.play(this.acceptAnim);
        }

        this.isHit = true;
    }

    destroy() {
        if (!this.isCorrect && !this.isHit) { this.model.decLives("the player didn't hit a wrong formula"); }
        this.model.formulaWasPassed(this);

        if (this.bgImage) { this.bgImage.destroy(); }
        if (this.fmImage) { this.fmImage.destroy(); }
    }

}