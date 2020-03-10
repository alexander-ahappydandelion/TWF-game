class GameModel {
    constructor(scene) {
        this.scene = scene;
        this.lives = 5;
        this.score = 0;
    }

    decLives(reason) {
        this.lives -= 1;
        console.log('The player has ' + this.lives + " lives. Reason: " + reason + " #GameModel:decLives");
    }

    formulaWasHit(formula) {
        this.score += formula.hitScore;
        this.scene.setScore(this.score);
        console.log("Current score: " + this.score + " $GameModel");

        if (0 <= formula.hitScore) {
            this.scene.flashAnim(formula.hitScore, "center", "success");
        } else {
            this.scene.flashAnim(formula.hitScore, "center", "fail");
        }

        if (formula.isCorrect) {
            this.scene.removeHeart();
        }

        // this.superText = this.scene.add.text(400, 300, '' + formula.hitScore, { fontSize: '32px', fill: '#000' });
        // this.scene.physics.world.enable(this.superText);


        return this;
    }

    formulaWasPassed(formula) {
        this.score += formula.passScore;
        this.scene.setScore(this.score);
        console.log("Current score: " + this.score + " $GameModel");

        if (0 <= formula.passScore) {
            this.scene.flashAnim(formula.passScore, "bottom", "success", );
        } else {
            this.scene.flashAnim(formula.passScore, "bottom", "fail");
        }

        if (!formula.isCorrect && !formula.isHit) {
            this.scene.removeHeart();
        }


        return this;
    }

}