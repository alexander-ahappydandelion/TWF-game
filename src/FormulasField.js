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

        this.formulas_stack = [];
        this.cur_pos = 0;

        // this.worker = new Worker('src/load_worker.js');
        //
        // this.worker.onmessage = ((stack) => function(event) {
        //     console.log("received data's length: " + event.data.length);
        //     for (let i = 0; i < event.data.length; ++i) {
        //         stack.push(event.data[i]);
        //     }
        // })(this.formulas_stack);
        //
        // this.worker.postMessage({
        //     'gen': this.formulasGenerator,
        //     'num': 10
        // });

        // let initialFormula = this.formulasGenerator.getNext();
        // this.formulas_stack.push(initialFormula);
        //
        // this.scene.load.image(initialFormula.label, this.getUrl(initialFormula.tex));

        this.generateNextFormula();

        this.scene.load.on('filecomplete', this.generateNextFormula, this);

        this.scene.load.start();
    }

    getUrl(tex) {
        tex = tex.replace("\\", "\\backslash ")
            .replace("|", "\\vee ")
            .replace("&", "\\wedge ")
            .replace("->", "\\rightarrow ");

        return 'https://chart.apis.google.com/chart?cht=tx' +  // tex parameter
                '&chs=' + 50 +          // specify the height of formula
                '&chl=' + encodeURIComponent(tex) +              // specify the text of formula
                '&chf=bg,s,11223300'                  // make transparent background
    }

    generateNextFormula(key, type, texture) {
        console.log("in generator");
        let n = 5;

        for (let i = 0; i < n; ++i) {
            if (this.formulasGenerator.hasNext()) {
                let formula = this.formulasGenerator.getNext();
                this.formulas_stack.push(formula);

                this.scene.load.image(formula.label, this.getUrl(formula.tex));
            }
        }
    }

    addCollisionWith(ball) {
        this.balls.push(ball);

        for (let formula of this.formulas) {
            this.scene.physics.add.collider(
                formula.getSceneObject(),
                ball.getSceneObject(),
                function (_formula, _obj) {
                    formula.hit();
                    ball.destroy();
                }
            )
        }

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
            // if (this.formulas_stack.length - this.cur_pos < 10) {
            //     this.worker.postMessage({
            //         'gen': this.formulasGenerator,
            //         'num': 10
            //     });
            // }
            //

            let isInitial = this.formulas.length === 0;

            let newFormula = this.formulaBuilder
                .withFormula(this.formulas_stack[this.cur_pos++], isInitial)
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
        return this.formulas.length === 0
            || this.topY + this.indent <= this.formulas[this.formulas.length - 1].getTopY();
    }

    haveExtraFormula() {
        return this.formulas.length !== 0
            && this.topY + this.fieldHeight <= this.formulas[0].getTopY();
    }

}