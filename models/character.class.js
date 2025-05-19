class Character extends MovableObject {
  IMAGES_WALKING = [
    "assets/img/2_character_pepe/2_walk/W-21.png",
    "assets/img/2_character_pepe/2_walk/W-22.png",
    "assets/img/2_character_pepe/2_walk/W-23.png",
    "assets/img/2_character_pepe/2_walk/W-24.png",
    "assets/img/2_character_pepe/2_walk/W-25.png",
    "assets/img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "assets/img/2_character_pepe/3_jump/J-31.png",
    "assets/img/2_character_pepe/3_jump/J-32.png",
    "assets/img/2_character_pepe/3_jump/J-33.png",
    "assets/img/2_character_pepe/3_jump/J-34.png",
    "assets/img/2_character_pepe/3_jump/J-35.png",
    "assets/img/2_character_pepe/3_jump/J-36.png",
    "assets/img/2_character_pepe/3_jump/J-37.png",
    "assets/img/2_character_pepe/3_jump/J-38.png",
    "assets/img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "assets/img/2_character_pepe/5_dead/D-51.png",
    "assets/img/2_character_pepe/5_dead/D-52.png",
    "assets/img/2_character_pepe/5_dead/D-53.png",
    "assets/img/2_character_pepe/5_dead/D-54.png",
    "assets/img/2_character_pepe/5_dead/D-55.png",
    "assets/img/2_character_pepe/5_dead/D-56.png",
    "assets/img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = [
    "assets/img/2_character_pepe/4_hurt/H-41.png",
    "assets/img/2_character_pepe/4_hurt/H-42.png",
    "assets/img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_IDLE_SHORT = [
    "assets/img/2_character_pepe/1_idle/idle/I-1.png",
    "assets/img/2_character_pepe/1_idle/idle/I-2.png",
    "assets/img/2_character_pepe/1_idle/idle/I-3.png",
    "assets/img/2_character_pepe/1_idle/idle/I-4.png",
    "assets/img/2_character_pepe/1_idle/idle/I-5.png",
    "assets/img/2_character_pepe/1_idle/idle/I-6.png",
    "assets/img/2_character_pepe/1_idle/idle/I-7.png",
    "assets/img/2_character_pepe/1_idle/idle/I-8.png",
    "assets/img/2_character_pepe/1_idle/idle/I-9.png",
    "assets/img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_IDLE_LONG = [
    "assets/img/2_character_pepe/1_idle/long_idle/I-11.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-12.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-13.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-14.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-15.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-16.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-17.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-18.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-19.png",
    "assets/img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];
  y = 175;
  height = 250;
  speed = 5;
  world;
  walk_sound = new Sounds("assets/audio/walk.ogg");
  jump_sound = new Sounds ("assets/audio/jump.mp3")
  hurt_sound = new Sounds ("assets/audio/hurt.mp3")
  otherDirection = false;
  idleTimeout;
  longIdleTimeout;
  idleInterval;
  longIdleInterval;
  isIdle = true;
  isLongIdle = false;
  lastBounceTime = 0;
  bounceCooldown = 250;
  

  constructor(endboss) {
    super().loadImage("assets/img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE_SHORT);
    this.loadImages(this.IMAGES_IDLE_LONG);
    this.innerHitbox = { top: 95, right: 15, bottom: 10, left: 15 };
    this.applyGravity();
    this.animate();
    this.setIdleTimers();
    this.endboss = endboss   
    this.walk_sound.volume = 0.3
    this.jump_sound.volume = 0.3
    this.hurt_sound.volume = 0.3 
  }

  /**
 * Handles the animation logic for the character, updating its movement, animation state, and idle animation.
 */
  animate() {
      this.updateMovement();
      this.updateCharacterAnimationState();
      this.updateIdleAnimation();
  }

  /**
 * Updates the character's movement and sets a recurring interval to handle movement animations.
 * @returns {void}
 */
  updateMovement() {
    setStoppableInterval(() => {
      if (!this.isDead() && !this.endboss.hits ==  0) {
        this.moveRightAnimation();
        this.moveLeftAnimation();
        this.jumpAnimation();
        this.checkY()
        
      }
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);
  }

  /**
 * Updates the character's animation state based on its current conditions (e.g., dead, hurt, jumping, walking).
 * Sets a recurring interval to check the animation state.
 * @returns {void}
 */
  updateCharacterAnimationState() {
    setStoppableInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
      } else if (this.isHurt() && !this.isDead()) {
        this.playAnimation(this.IMAGES_HURT);
        this.hurt_sound.play()
      } else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else {
        if ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && (!this.isDead() && !this.endboss.hits ==  0)) {
          this.playAnimation(this.IMAGES_WALKING);
        }       
      }
    }, 150);
    
  }

  /**
 * Updates the idle animation of the character. 
 * If the character is idle for a certain duration, it plays the corresponding idle animation.
 * Sets a recurring interval to check the idle state.
 * @returns {void}
 */
  updateIdleAnimation() {
    setStoppableInterval(() => {
      if (!this.isAboveGround() && !this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.isDead() && !this.isHurt()) {
        if (this.isLongIdle && !this.isIdle) {
          this.playAnimation(this.IMAGES_IDLE_LONG);
        } else if (this.isIdle) {
          this.playAnimation(this.IMAGES_IDLE_SHORT);
        } else {
          this.setIdleTimers()
          this.loadImage("assets/img/2_character_pepe/1_idle/idle/I-1.png");
        }
      }
    }, 200);
    
  }

  /**
 * Checks and limits the vertical position of the character, ensuring it does not exceed a specific height.
 * @returns {void}
 */
  checkY(){
    if(this.y >= 175){
      this.y = 175
    }
  }

  /**
 * Checks for collisions with enemy chickens. 
 * If a collision is detected, it processes the collision based on the character's state and the enemy type.
 * @param {Object} enemy - The enemy object involved in the collision.
 * @param {Array} enemies - An array of enemy objects for reference.
 * @returns {void}
 */
  checkCollisionsWithChickens(enemy, enemies) {
    let indexOfEnemy = enemies.indexOf(enemy);
    let currentTime = new Date().getTime();
    if (this.isDead()) {return}
    if (currentTime - this.lastBounceTime < this.bounceCooldown) {return}
    if (this.isCollidingTop(enemy) && indexOfEnemy != -1 && !(enemy instanceof Endboss) && this.speedY < 0) {
      enemy.takeHits(enemies, indexOfEnemy, enemy);
      enemy.playSound()
      this.lastBounceTime = currentTime;
      this.bounce();
      
    } else if (this.isColliding(enemy) && !this.isHurt() && indexOfEnemy != -1) {
      this.hit(enemy);
    }
  }

  /**
 * Initiates a bounce effect by setting the vertical speed of the character.
 * @returns {void}
 */
  bounce() {
    this.speedY = 25;
  }

  /**
 * Sets timers for the idle state of the character. 
 * If the character remains idle for a specific duration, it transitions to a long idle state.
 * @returns {void}
 */
  setIdleTimers() {
    this.isIdle = true;
    this.longIdleTimeout = setTimeout(() => {
      this.isLongIdle = true;
      this.isIdle = false
    },10000);
  }

  /**
 * Resets the idle timers and flags. 
 * Stops the current idle timers and reinitializes them.
 * @returns {void}
 */
  resetIdleTimers() {
    clearTimeout(this.idleTimeout);
    clearTimeout(this.longIdleTimeout);
    this.isIdle = false;
    this.isLongIdle = false;
    
  }

  /**
 * Handles the right movement animation of the character. 
 * Moves the character to the right if the corresponding key is pressed and updates idle states.
 * @returns {void}
 */
  moveRightAnimation() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.resetIdleTimers();
      this.moveRight();
      this.otherDirection = false;
      if(!this.isAboveGround()){
        this.walk_sound.play();
      }
    }
  }

  /**
 * Handles the left movement animation of the character. 
 * Moves the character to the left if the corresponding key is pressed and updates idle states.
 * @returns {void}
 */
  moveLeftAnimation() {
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.resetIdleTimers();
      this.moveLeft();
      this.otherDirection = true;
      if(!this.isAboveGround()){
        this.walk_sound.play();
      }
    }
  }

  /**
 * Handles the jump animation of the character. 
 * Triggers the jump if the space key is pressed and the character is not already above ground.
 * @returns {void}
 */
  jumpAnimation() {
    if (this.world.keyboard.SPACE && !this.isAboveGround()) {
      this.resetIdleTimers();
      this.jump_sound.play()
      this.jump();
    }
  }
}
