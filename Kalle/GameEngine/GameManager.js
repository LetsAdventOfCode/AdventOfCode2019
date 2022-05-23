class GameManager {
    constructor(gameObjects) {
        this.gameObjects = gameObjects;
    }
    renderManager;
    inputManager;
    gameObjects;

    run() {
        update();
        draw();
    }

    update() {
        for (let gameObject of this.gameObjects) {
            gameObject.update(this.inputManager);
        }
    }

    draw() {
        for (let gameObject of this.gameObjects) {
            gameObject.draw(this.renderManager);
        }
    }
}

//Object.defineProperty(Object.prototype, 'can', {
//    enumerable: false,
//    value: function (method) {
//        return (typeof this[method] === 'function');
//    }
//}