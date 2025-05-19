class Coin extends MovableObject {
    height = 100;
    width = 100;
    id
    IMAGES_MOVING = [
        'assets/img/8_coin/coin_1.png',
        'assets/img/8_coin/coin_2.png'
    ];

    constructor(x, y) {
        super().loadImage('assets/img/8_coin/coin_2.png');
        this.loadImages(this.IMAGES_MOVING);
        this.innerHitbox = {top: 20, right: 20, bottom: 20, left: 20}
        this.x = x
        this.y = y;
        this.animate();
    }

    /**
 * Starts the animation loop for the object.
 * It sets an interval that repeatedly calls the playAnimation method with the
 * specified array of images representing the moving animation.
 * The interval is set to execute every 350 milliseconds.
 */
    animate(){
        setStoppableInterval (() => {
            this.playAnimation(this.IMAGES_MOVING);
        },350)
    }
}