class VerticalMovingField {
    constructor() {
        self.height = undefined;

        self.blocks = [];
        self.generator = undefined;
        self.mover = undefined;
        self.utilizer = undefined;
    }

    move() {
        for (let block in self.blocks) {
            self.mover.move(block);
        }

        self.utilizeIfNeeded();
        self.generateIfNeeded();
    }

    utilizeIfNeeded() {

    }
}