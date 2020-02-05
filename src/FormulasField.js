class FormulasField {
    constructor(formulaSize, fieldSize, origin, scene, formulasGenerator, obj, action) {
        this.fieldWidth = fieldSize.width;
        this.fieldHeight = fieldSize.height;
        this.formulaWidth = formulaSize.width;
        this.formulaHeight = formulaSize.height;
        this.scene = scene;
        this.speed = { x: 0, y: 0.7};
        this.formulasGenerator = formulasGenerator;

        this.myFormula = Formula.build()
            .withTexFormula("e^x")
            .withHeight(20)
            .placedAt({x: 240, y: 0})
            .onScene(scene)
            .onCollisionWith(obj)
            .doAction(action)
            .render();

        this.formulasQueue = [this.myFormula];
        this.collisions = [];
    }

    addCollision(obj, action) {
        for (const formula of this.formulasQueue) {
            formula.addCollision(obj, action);
        }
        console.log('collision was added in formula field');
    }



    update() {
        this.addNewFormulasIfNeeded();
        this.destroyOldFormulasIfNeeded();
        this.moveFormulasDown();
    }

    addNewFormulasIfNeeded() {
        if (this.needAnotherFormula()) {
            this.formulasQueue.push(
                Formula.build()
                .withTexFormula("e^6x")
                .withHeight(20)
                .placedAt({x: 240, y: -56})
                .onScene(this.scene)
                .render()
            );

        }
    }

    destroyOldFormulasIfNeeded() {
        if (this.needRemoveFormula()) {
            this.formulasQueue[0].destroy();
            this.formulasQueue.shift();
        }
    }

    needAnotherFormula() {
        return this.formulasQueue.size === 0
            || 0 <= this.formulasQueue[this.formulasQueue.length - 1].getTopY();
    }

    needRemoveFormula() {
        return this.formulasQueue.size !== 0
            && this.fieldHeight < this.formulasQueue[0].getTopY();
    }

    moveFormulasDown() {
        let speed = this.speed;
        this.formulasQueue.forEach(function(formula) {
            formula.move(speed);
        })
    }
}