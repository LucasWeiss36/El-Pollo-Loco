class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  health = 100;
  lastHit = 0;


  /**
 * Applies gravity to the object by decreasing its vertical position based on its speed.
 * The function continuously updates the object's position every 40 milliseconds,
 * adjusting its vertical speed according to the acceleration until it is above the ground.
 */
  applyGravity() {
    setStoppableInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
 * Checks if the object is above the ground.
 * @returns {boolean} Returns true if the object is an instance of ThrowableObject or its y-coordinate is less than 175.
 */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 175;
    }
  }

  /**
 * Moves the object to the right by increasing its x-coordinate by its speed.
 */
  moveRight() {
    this.x += this.speed;
  }

  /**
 * Moves the object to the left by decreasing its x-coordinate by its speed plus an optional speed offset.
 * @param {number} speedOffset - Additional speed to decrease from the object's position.
 */
  moveLeft(speedOffset = 0) {
    this.x -= this.speed + speedOffset;
  }

  /**
 * Makes the object jump by setting its vertical speed to a predefined value.
 */
  jump() {
    this.speedY = 30;
  }

  /**
 * Plays the next frame of animation by updating the object's image based on the provided array of images.
 * The current image index is incremented to cycle through the animation frames.
 * @param {Array<string>} images - An array of image paths for the animation.
 */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
 * Flips the image of the object horizontally in the canvas context.
 * Adjusts the object's x-coordinate accordingly to maintain its position.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to apply the flip transformation.
 */
  flipImage(ctx) {
    ctx.save();
    ctx.translate(this.width, 0);
    ctx.scale(-1, 1);
    this.x = this.x * -1;
  }

  /**
 * Resets the flip transformation applied to the object's image in the canvas context.
 * Restores the previous canvas state to ensure proper rendering.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to restore the transformation.
 */
  resetFlipImage(ctx) {
    this.x = this.x * -1;
    ctx.restore();
  }

  /**
 * Checks for a collision between the object and another moveable object.
 * @param {Object} moveableObject - The object to check for collision with.
 * @returns {boolean} Returns true if the inner hitboxes of both objects overlap.
 */
  isColliding(moveableObject) {
    const innerHitbox1 = this.getInnerHitbox();
    const innerHitbox2 = moveableObject.getInnerHitbox();

    return (
      innerHitbox1.x + innerHitbox1.width > innerHitbox2.x &&
      innerHitbox1.y + innerHitbox1.height > innerHitbox2.y &&
      innerHitbox1.x < innerHitbox2.x + innerHitbox2.width &&
      innerHitbox1.y < innerHitbox2.y + innerHitbox2.height
    );
  }

  /**
 * Checks if the object is colliding with another moveable object from the top.
 * @param {Object} moveableObject - The object to check for collision from the top.
 * @returns {boolean} Returns true if the inner hitbox of the current object overlaps with the top half of the other object.
 */
  isCollidingTop(moveableObject) {
    const innerHitbox1 = this.getInnerHitbox();
    const innerHitbox2 = moveableObject.getInnerHitbox();

    return (
      innerHitbox1.x + innerHitbox1.width > innerHitbox2.x &&
      innerHitbox1.y + innerHitbox1.height >= innerHitbox2.y &&
      innerHitbox1.x < innerHitbox2.x + innerHitbox2.width &&
      innerHitbox1.y + innerHitbox1.height <=
        innerHitbox2.y + innerHitbox2.height / 2
    );
  }

  /**
 * Retrieves the inner hitbox of the object, accounting for its position and inner hitbox offsets.
 * @returns {Object} An object representing the inner hitbox with x, y, width, and height properties.
 */
  getInnerHitbox() {
    const { top, right, bottom, left } = this.innerHitbox;
    return {
      x: this.x + left,
      y: this.y + top,
      width: this.width - left - right,
      height: this.height - top - bottom,
    };
  }

  /**
 * Handles the interaction when the object hits an enemy.
 * Calculates damage, applies it to the object's health, and updates the health status on the world status bar.
 * @param {Object} enemy - The enemy object that has been hit.
 */
  hit(enemy) {
    const damage = this.calculatedDamage(enemy);
    this.applyDamage(damage);
    this.lastHit = new Date().getTime();
    this.world.statusBars.setHealth(this.health);
  }

  /**
 * Applies damage to the object, decreasing its health.
 * If the health falls below zero, it is set to zero, and the last hit time is recorded.
 * @param {number} damage - The amount of damage to apply.
 */
  applyDamage(damage) {
    this.health -= damage;
    if (this.health < 0 || this.isDead()) {
      this.health = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
 * Checks if the object is dead, determined by whether its health is zero.
 * @returns {boolean} Returns true if the object's health is zero.
 */
  isDead() {
    return this.health == 0;
  }

  /**
 * Checks if the object is currently hurt based on the time elapsed since the last hit.
 * Returns true if the last hit occurred within the last 0.5 seconds.
 * @returns {boolean} Returns true if the object is hurt.
 */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 0.5;
  }

  /**
 * Calculates the damage dealt to the object by an enemy based on the type of enemy.
 * @param {Object} enemy - The enemy object that inflicted damage.
 * @returns {number} The calculated damage value based on the type of enemy.
 */
  calculatedDamage(enemy) {
    if (enemy instanceof Chicken_Big) {
      return 10;
    } else if (enemy instanceof Chicken_Small) {
      return 5;
    }
    return 20;
  }
}
