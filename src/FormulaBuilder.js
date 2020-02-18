class FormulaBuilder {
    constructor() {
        this.id = "memorizable id";
        this.model = undefined;
        this.scene = undefined;
        this.bgLabel = undefined;
        this.texFormula = undefined;
        this.formulaHeight = undefined;
        this.shift = { x: 0, y: 0 };
        this.origin = { x: undefined, y: undefined }
    }


    // temporary parameters

    withFormula(formula) {
        this.texFormula = formula.text.replace("&", "%26");
        this.isCorrect = formula.isCorrect;
        return this;
    }

    /**
     * Get the point where the formula will be placed
     * It should be passed one of the following: leftX, x, rightX
     * It should be passed one of the following: bottomY, y, topY
     *
     * @param point
     * @returns {FormulaBuilder}
     */
    placedAt(point) {
        let fmHeight = this.scene.textures.get(this.bgLabel).getSourceImage().height;
        let fmWidth = this.scene.textures.get(this.bgLabel).getSourceImage().width;

        if ( point.leftX !== undefined) { this.origin.x = point.leftX + fmWidth / 2; }
        if (     point.x !== undefined) { this.origin.x = point.x;                   }
        if (point.rightX !== undefined) { this.origin.x = point.rightX - fmWidth / 2; }

        if (point.bottomY !== undefined) { this.origin.y = point.bottomY - fmHeight / 2; }
        if (      point.y !== undefined) { this.origin.y = point.y;                            }
        if (   point.topY !== undefined) { this.origin.y = point.topY + fmHeight / 2;    }

        return this;
    }


    //  global parameters

    setId(id) {
        this.id = id;
        return this;
    }

    setGameModel(model) {
        this.model = model;
        return this;
    }

    setScene(scene) {
        this.scene = scene;
        return this;
    }

    setBgImageLabel(label) {
        this.bgLabel = label;
        return this;
    }

    setAcceptAnim(acceptAnim) {
        this.acceptAnim = acceptAnim;
        return this;
    }

    setRejectAnim(rejectAnim) {
        this.rejectAnim = rejectAnim;
        return this;
    }

    setFormulaHeight(height) {
        this.formulaHeight = height;
        return this;
    }

    setFormulaShift(shift) {
        this.shift = shift;
        return this;
    }

    render() {
        let formula = new Formula();

        formula.model = this.model;
        formula.isCorrect = this.isCorrect;

        this.scene.load.image(this.id + this.texFormula,
            'https://chart.apis.google.com/chart?cht=tx' +
                    '&chs=' + this.formulaHeight +
                    '&chl=' + this.texFormula);

        formula.bgOrigin = { x: this.origin.x, y: this.origin.y };
        formula.fmOrigin = { x: this.origin.x + this.shift.x, y: this.origin.y + this.shift.y };

        this.scene.load.once('complete', () => {
           formula.bgImage = this.scene.physics.add.sprite(this.origin.x, this.origin.y, this.bgLabel);
           formula.acceptAnim = this.acceptAnim;
           formula.rejectAnim = this.rejectAnim;
           formula.bgImage.setImmovable(true);

           formula.fmImage = this.scene.add.image(this.origin.x + this.shift.x,
               this.origin.y + this.shift.y, this.id + this.texFormula);
        });

        this.scene.load.start();

        return formula;
    }

}