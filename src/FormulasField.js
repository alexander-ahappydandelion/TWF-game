class FormulasField {
    constructor(fieldHeight, scene, formulasGenerator, formulaBuilder) {
        this.fieldHeight = fieldHeight;
        this.x = 240;
        this.topY = 0;

        this.indent = 25;
        this.speed = { x: 0, y: 0.7 };

        this.scene = scene;

        this.formulasGenerator = formulasGenerator;
        this.formulaBuilder = formulaBuilder;

        this.formulas = [];
        this.balls = [];
    }

    addCollisionWith(ball) {
        console.log('[fmField] adding of collision started');

        this.balls.push(ball);

        for (let formula of this.formulas) {
            this.scene.physics.add.collider(
                formula.getSceneObject(),
                ball.getSceneObject(),
                function (_formula, _obj) {
                    console.log('[collision] the collision has happened');
                    formula.hit();
                    ball.destroy();
                }
            )
        }

        console.log('[fmField] adding of collision finished');
    }

    update() {
        // this.move(this.speed);
        this.addFormulas();
        this.removeExtraFormulas();
    }


    move() {
        this.formulas.forEach(formula => {
            formula.move(this.speed);
        })
    }

    addFormulas() {
        while (this.haveExtraSpace()) {
            let formula = this.formulasGenerator.getNext();
            let isInitial = this.formulas.length === 0;

            let newFormula = this.formulaBuilder
                .withFormula(formula, isInitial)
                .placedAt({ x: this.x, bottomY: this.topY })
                .render();

            this.formulas.push(newFormula);
        }
    }

    removeExtraFormulas() {
        while (this.haveExtraFormula()) {
            this.formulas[0].destroy();
            this.formulas.shift();
        }
    }

    haveExtraSpace() {
        console.log(this.formulas.length);
        return this.formulas.length === 0
            || this.topY + this.indent <= this.formulas[this.formulas.length - 1].getTopY();
    }

    haveExtraFormula() {
        return this.formulas.length !== 0
            && this.topY + this.fieldHeight <= this.formulas[0].getTopY();
    }

}