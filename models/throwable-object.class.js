class ThrowableObject extends MovableObject {
  IMAGES_BOTTLE = [
    "assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_BOTTLE_SPLASH = [
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  isThrown = true
  isHit = false
  isRemoved = false
  constructor(x, y, direction) {
    super().loadImage(
      "assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
    );
    this.loadImages(this.IMAGES_BOTTLE);
    this.loadImages(this.IMAGES_BOTTLE_SPLASH);
    this.innerHitbox = { top: 10, right: 10, bottom: 10, left: 10 };
    this.x = x;
    this.y = y;
    this.height = 80;
    this.width = 70;
    this.throw();
    this.direction = direction;
  }

  /**
 * Updates the animation of the bottle based on its state (thrown, hit, or removed).
 * This function uses an interval to regularly check the bottle's conditions and 
 * play the appropriate animation.
 *
 * The bottle will:
 * - Play the bottle animation if it is thrown, not hit, and its y-coordinate is less than or equal to 250.
 * - Play the splash animation if it is not thrown, hit, and its y-coordinate is greater than or equal to 250.
 * - Call the `bottleHit()` method when the splash animation is played.
 * - Mark itself for removal if it is neither thrown nor hit and has been removed, or if its y-coordinate is greater than or equal to 450.
 * - Call the `remove()` method to remove the bottle from the game.
 *
 * @method updateBottleAnimation
 */
  updateBottleAnimation(){
    setStoppableInterval(()=>{
      if(this.isThrown && !this.isHit && (this.y <= 250)){
        this.playAnimation(this.IMAGES_BOTTLE);
      }
      if(!this.isThrown && this.isHit && this.y >= 250){
        this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
        this.bottleHit()
      }
      if((!this.isThrown && !this.isHit && this.isRemoved) || (this.y >= 450 )){
        this.isRemoved = true
        this.remove()
      }
    },150)
  }


  /**
 * Initiates the throwing action of the bottle.
 * Updates the bottle's animation, sets its vertical speed, and applies gravity.
 * The bottle moves horizontally based on its direction every 40 milliseconds.
 */
  throw() {
    this.updateBottleAnimation()
    this.speedY = 25;
    this.applyGravity();
    setStoppableInterval(() => {
      this.x += this.direction === "right" ? 15 : -15;
    }, 40);
  }


  /**
 * Handles the behavior when the bottle hits an object.
 * Sets the bottle's state to indicate it has been thrown and hit an object.
 * The hit state is reset after 1000 milliseconds.
 */
  bottleHit() {
    this.isThrown = false
    this.isHit = true
    setTimeout(() => {
      this.isHit = false
    }, 1000);
  }

  
  /**
 * Plays the splash animation for the bottle when it hits the ground or another object.
 * After 1000 milliseconds, the bottle is removed from the game world.
 */
  splashBottleAnimation() {
    this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
    setTimeout(() => {
      this.remove();
    }, 500);
  }

  /**
 * Removes the bottle from the world by finding its index in the throwable objects array
 * and splicing it out if it exists. Sets the removal state to false.
 */
  remove() {
    const index = this.world.throwableObject.indexOf(this);
    if (index > -1) {
      this.world.throwableObject.splice(index, 1);
    }
    this.isRemoved = false
  }
}
