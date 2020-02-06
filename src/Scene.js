class Scene extends Phaser.Scene {
    constructor() {
        super('playGame');
    }

    init() {
    }

    preload() {
        this.load.image('bgWhite', 'assets/images/formulaBackground.png');
    }

    create() {
        let fmBuilder = new FormulaBuilder()
            .setBgImageLabel('bgWhite')
            .setFormulaHeight(40)
            .setFormulaShift({x: 0, y: -4})
            .setScene(this);

        let fmGenerator= new FormulasGenerator();

        this.fmField = new FormulasField(480, this, fmGenerator, fmBuilder);

        fmBuilder
            .withTexFormula("\\frac{cos(2x)}{sin(5x)}%2Be^x")
            .placedAt({ leftX: 0, bottomY: 0 })
            .render();
    }

    update() {
        this.fmField.update();
    }

}