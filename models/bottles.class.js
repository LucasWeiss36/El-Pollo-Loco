class Bottle extends MovableObject {
  height = 80;
  width = 80;
  IMAGES_MOVING = [
    "assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  constructor(x) {
    super().loadImage("assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.loadImages(this.IMAGES_MOVING);
    this.innerHitbox = { top: 15, right: 20, bottom: 10, left: 20 };
    this.x = x;
    this.y = 350;
    this.animate();
  }

  /**
 * Initiates the animation process by repeatedly calling the playAnimation method.
 * The animation is played using the images defined in the IMAGES_MOVING array.
 * An interval is set to execute the animation every 1000 milliseconds (1 second),
 * and the interval can be stopped if necessary.
 */
  animate() {
    setStoppableInterval(() => {
      this.playAnimation(this.IMAGES_MOVING);
    }, 1000);
    
  }
}
