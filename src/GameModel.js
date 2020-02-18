class GameModel {
    constructor() {
        this.lives = 5;
    }

    decLives(reason) {
        this.lives -= 1;
        console.log('The player has ' + this.lives + " lives. Reason: " + reason + " #GameModel:decLives");
    }

}