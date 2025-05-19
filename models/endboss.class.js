class Endboss extends MovableObject {
  height = 400;
  width = 250;
  y = 50;
  hits = 10;

  IMAGES_WALKING = [
    "assets/img/4_enemie_boss_chicken/1_walk/G1.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G2.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G3.png",
    "assets/img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ALERT = [
    "assets/img/4_enemie_boss_chicken/2_alert/G5.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G6.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G7.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G8.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G9.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G10.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G11.png",
    "assets/img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_ATTACK = [
    "assets/img/4_enemie_boss_chicken/3_attack/G13.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G14.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G15.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G16.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G17.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G18.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G19.png",
    "assets/img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "assets/img/4_enemie_boss_chicken/4_hurt/G21.png",
    "assets/img/4_enemie_boss_chicken/4_hurt/G22.png",
    "assets/img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "assets/img/4_enemie_boss_chicken/5_dead/G24.png",
    "assets/img/4_enemie_boss_chicken/5_dead/G25.png",
    "assets/img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

 

  isWalking = false;
  isAlerted = false;
  isAttacking = false;
  isHurt = false;
  isDead = false;
  chickenBig_sound = new Sounds("assets/audio/chicken_big.mp3")

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.innerHitbox = { top: 70, right: 10, bottom: 30, left: 20 };
    this.x = 719 * 6.5;
    this.animate();
    this.chickenBig_sound.volume = 0.3
  }

  /**
 * Animates the character based on its current state (attacking, alerted, or walking).
 * It sets an interval to play the appropriate animation every 200 milliseconds.
 */
  animate() {
    setStoppableInterval(() => {
      if (this.isAttacking && !this.isDead) {
        this.playAnimation(this.IMAGES_ATTACK);
      } else if (!this.isAlerted && !this.isHurt && !this.isDead) {
        this.playAnimation(this.IMAGES_ALERT);
      } else if (this.isWalking && !this.isHurt && !this.isDead) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 200);    
  }

  /**
 * Starts the character's movement behavior in relation to another character.
 * It sets an interval to toggle walking or handle hurt/dead states based on the distance
 * between this character and the provided character every 200 milliseconds.
 * @param {Character} character - The character to check distance against.
 */
  start(character) {
    setStoppableInterval(() => {
      let distance = this.x - character.x;
      if (distance <= 400 && !this.isWalking && !this.isDead) {
        this.toggleWalk();
      } else if (this.isHurt) {        
        this.toggleHurt();
      } else if (this.isDead) {
        this.toggleDead();
      }
    }, 200);
  }

  /**
 * Toggles the walking state of the character, setting isWalking and isAlerted to true,
 * and initiates movement to the left at a fixed speed.
 */
  toggleWalk() {
    this.isWalking = true;
    this.isAlerted = true;
    setStoppableInterval(() => {
      this.moveLeft(2.25);
    }, 1000 / 60);
    
  }

  /**
 * Plays the hurt animation for the character and sets isHurt to false after a timeout 
 * based on the duration of the hurt animation.
 */
  toggleHurt() {
    this.playAnimation(this.IMAGES_HURT);
    setTimeout(() => {
      this.isHurt = false;
    }, this.IMAGES_HURT.length * 300);    
  }

  /**
 * Plays the dead animation for the character and sets isDead to false after a timeout 
 * based on the duration of the dead animation.
 */
  toggleDead() {
    this.playAnimation(this.IMAGES_DEAD);
    setStoppableInterval(() => {
      this.isDead = false;
    }, this.IMAGES_DEAD.length * 700);    
  }

  /**
 * Checks for a collision with another character. If a collision is detected,
 * it sets isAttacking to true and resets it to false after a timeout based on the 
 * duration of the attack animation.
 * @param {Character} character - The character to check for collision with.
 */
  checkCollisionWithCharacter(character) {
    if (this.isColliding(character)) {
      this.isAttacking = true;
      setTimeout(() => {
        this.isAttacking = false;
      }, this.IMAGES_ATTACK.length * 100);
    }
  }

  /**
 * Checks for a collision with a bottle. Currently does not perform any action upon collision.
 * @param {Bottle} bottle - The bottle to check for collision with.
 */
  checkCollisionWithBottle(bottle){
    if(this.isColliding(bottle)){
      
    }
  }

  /**
 * Handles the character taking hits from enemies. It decrements the hit points,
 * sets isHurt to true, and checks if the character is dead. If the character is dead,
 * it sets isDead to true and schedules the removal of the character after a timeout.
 * @param {Array} enemies - The array of enemy characters.
 * @param {number} indexOfEnemy - The index of the enemy being processed.
 * @param {Enemy} enemy - The enemy object that caused the hit.
 */
  takeHits(enemies, indexOfEnemy, enemy) {
    this.hits--;
    this.isHurt = true;
    if (this.hits <= 0) {
      this.isDead = true;
      this.endbossIsDead = true
      this.hits = 0
      setTimeout(() => {
        this.removeChicken(enemies, indexOfEnemy, enemy);
      }, 1400);
    }
  }

  /**
 * Removes the character (chicken) from the enemies array at the specified index.
 * @param {Array} enemies - The array of enemy characters.
 * @param {number} indexOfEnemy - The index of the enemy to remove.
 */
  removeChicken(enemies, indexOfEnemy) {
    if (indexOfEnemy != -1) {
      enemies.splice(indexOfEnemy, 1);
    }
  }

  /**
 * Returns the current number of hits remaining for the character.
 * @returns {number} - The number of hits remaining.
 */
  hits(){
    return this.hits
  }

  /**
 * Plays the sound associated with the character (e.g., chicken sound).
 */
  playSound(){
    this.chickenBig_sound.play()
  }
}
