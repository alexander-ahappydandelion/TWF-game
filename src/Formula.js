class Formula {
    constructor() {
        this.scene = null;
        this.height = 50;
        this.texFormula = "e^x";
        this.sceneFormula = null;
        this.formulaBackground = null;
        this.speed = { x: 0, y: 0.7};
        this.origin = {
            x: 0,
            y: 0
        };
    }

    getTopY() {
        return this.origin.y - this.height / 2;
    }

    move(speed) {
        this.origin.x += speed.x;
        this.origin.y += speed.y;

        if (this.sceneFormula) {
            this.sceneFormula.x = this.origin.x;
            this.sceneFormula.y = this.origin.y;
            this.formulaBackground.x = this.origin.x;
            this.formulaBackground.y = this.origin.y;
        }
    }

    addCollision(obj, action) {
        console.log('collision was added to a formula');
        this.scene.physics.add.overlap(this.sceneFormula, obj, action(this.sceneFormula), null, this.scene);
        this.scene.physics.add.collider(this.sceneFormula, obj);
    }

    destroy() {
        this.sceneFormula.destroy();
    }

    static build() {
        return new Formula.FormulaBuilder();
    }

    static FormulaBuilder = class {
        constructor() {
            this.formula = new Formula();
        }

        withTexFormula(texFormula) {
            this.formula.texFormula = texFormula;
            return this;
        }

        withHeight(height) {
            this.formula.height = height;
            return this;
        }

        placedAt(origin) {
            this.formula.origin = origin;
            return this;
        }

        onScene(scene) {
            this.formula.scene = scene;
            return this;
        }

        onCollisionWith(obj) {
            this.formula.collisionObj = obj;
            return this;
        }

        doAction(action) {
            this.formula.collisionAction = action;
            return this;
        }

        render() {
            this.formula.scene.load.image('formula',
                'https://chart.apis.google.com/chart?cht=tx' +
                '&chs=' + this.formula.height +
                '&chl=' + this.formula.texFormula +
                '&chf=bg,s,blue');
            this.formula.scene.load.once('complete', () => {
                this.formula.formulaBackground = this.formula.scene.physics.add.image(this.formula.origin.x, this.formula.origin.y, 'formulaBackground');
                this.formula.sceneFormula
                    = this.formula.scene.add.image(this.formula.origin.x, this.formula.origin.y, 'formula');
                // this.formula.formulaBackground.setVelocity(this.formula.speed.x, this.formula.speed.y);
                // this.formula.sceneFormula.setVelocity(this.formula.speed.x, this.formula.speed.y);
                console.log('formula loaded')
            });
            this.formula.scene.load.start();

            return this.formula;
        }

    };
}