class Chicken_Big extends MovableObject {
  y = 350;
  height = 80;
  width = 80;
  hits = 2;
  IMAGES_WALKING = [
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  chickenBig_sound = new Sounds("assets/audio/chicken_big.mp3");

  constructor() {
    super().loadImage(
      "assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png"
    );
    this.loadImages(this.IMAGES_WALKING);
    this.x = 500 + Math.random() * (719 * 6);
    this.speed = 0.15 + Math.random() * 0.25;
    this.innerHitbox = { top: 8, right: 8, bottom: 8, left: 8 };
    this.animate();
    this.chickenBig_sound.volume = 0.3;
  }

  /**
   * Animates the character by setting intervals for movement and animation playback.
   * Moves the character to the left at a frame rate of 60 frames per second,
   * and plays the walking animation every 100 milliseconds.
   */
  animate() {
    setStoppableInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
    setStoppableInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 100);
  }

  /**
   * Handles the character taking hits from enemies.
   * Decreases the hit points of the character and removes the character if hits reach zero.
   *
   * @param {Array} enemies - The array of enemy objects.
   * @param {number} indexOfEnemy - The index of the enemy in the array that is hitting the character.
   * @param {Object} enemy - The enemy object that is causing the hit.
   */
  takeHits(enemies, indexOfEnemy, enemy) {
    this.hits--;
    if (this.hits <= 0) {
      this.removeChicken(enemies, indexOfEnemy, enemy);
    }
  }

  /**
   * Removes the character (chicken) from the enemies array.
   * If the enemy is found (index is not -1), it removes the enemy at the specified index.
   *
   * @param {Array} enemies - The array of enemy objects.
   * @param {number} indexOfEnemy - The index of the enemy to be removed.
   */
  removeChicken(enemies, indexOfEnemy) {
    if (indexOfEnemy != -1) {
      enemies.splice(indexOfEnemy, 1);
    }
  }

  /**
   * Plays the sound associated with the character (chicken).
   */
  playSound() {
    this.chickenBig_sound.play();
  }
}
