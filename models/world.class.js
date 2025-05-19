class World {
  character = new Character(this.findEndboss());
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBars = new StatusBars();
  endScreen = new EndScreen(this.character, this.level.enemies);
  throwableObject = [];
  throwCooldown = false;
  collectedCoin_sound = new Sounds("assets/audio/collectCoin.wav");
  collectedBottle_sound = new Sounds("assets/audio/collectBottle.mp3");
  breakBottle_sound = new Sounds("assets/audio/bottleBreak.mp3");
  throwBottle_sound = new Sounds("assets/audio/throw.mp3");
  backgroundMusic = new Sounds("assets/audio/backgroundMusic.mp3")

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollisions();
    this.startEndBoss();
    this.collectedCoin_sound.volume = 0.3;
    this.collectedBottle_sound.volume = 0.3;
    this.breakBottle_sound.volume = 0.3;
    this.throwBottle_sound.volume = 0.3;
    this.backgroundMusic.volume = 0.05;
    this.backgroundMusic.play()
    // console.log(Sounds.allSoundObjects.indexOf(this.backgroundMusic));
    restartSound(Sounds.allSoundObjects.indexOf(this.backgroundMusic))
    
  }

  /**
   * Finds the end boss in the level.
   * @returns {Endboss|undefined} The end boss object if found, otherwise undefined.
   */
  findEndboss() {
    const endboss = level1.enemies.find((enemy) => enemy instanceof Endboss);
    return endboss;
  }

  /**
   * Sets the world for the character, linking the character to the current world instance.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Checks for collisions between the character and various game objects (enemies, coins, bottles, throwable objects, endboss).
   * It sets a stoppable interval to continuously check for collisions at regular intervals.
   */
  checkCollisions() {
    setStoppableInterval(() => {
      if (this.character.isDead()) {
        return;
      }
      this.checkEnemyCollisions();
      this.checkCoinCollisions();
      this.checkBottleCollisions();
      this.checkThrowObjects();
      this.checkEndbossCollision();
      this.ckeckBottlesHit();
      checkMutedSounds()
    }, 250);
  }

  /**
   * Starts the endboss encounter by invoking the start method on the endboss with the character as a parameter.
   */
  startEndBoss() {
    const endboss = this.findEndboss();
    endboss.start(this.character);
  }

  /**
   * Checks for collisions between the end boss and the character.
   * If an end boss is found, it checks for a collision with the character.
   */
  checkEndbossCollision() {
    const endboss = this.findEndboss();
    if (endboss) {
      endboss.checkCollisionWithCharacter(this.character);
    }
  }

  /**
   * Checks for collisions between the character and enemies in the level.
   * If the character collides with an enemy, it calls the hit method on the character and updates the health status bar.
   */
  checkEnemyCollisions() {
    let enemies = this.level.enemies;
    enemies.forEach((enemy) => {
      setStoppableInterval(() => {
        this.character.checkCollisionsWithChickens(enemy, enemies);
      }, 25);
      if (!this.character.isHurt() && this.character.isColliding(enemy)) {
        this.character.hit(enemy);
        this.statusBars.setHealth(this.character.health);
      }
    });
  }

  /**
   * Checks for collisions between the character and coins.
   * If the character collects a coin, it updates the coin count and removes the coin from the level.
   * Plays a sound when the coin is collected.
   */
  checkCoinCollisions() {
    let coinsCollected = [];
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin, 100)) {
        coinsCollected.push(index);
        this.statusBars.coins += 1;
        level1.coins[index].y = 1000;
      }
      setStoppableInterval(() => {
        if (this.character.isColliding(coin)) {
          this.collectedCoin_sound.play();
        }
      }, 100);
    });
    coinsCollected.reverse().forEach((index) => {
      this.level.coins.splice(index, 1);
    });
  }

  /**
   * Checks for collisions between the character and bottles.
   * If the character collects a bottle, it updates the bottle count and plays a collection sound.
   */
  checkBottleCollisions() {
    let bottlesCollected = [];
    let bottleValue = this.statusBars.bottles;
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        bottlesCollected.push(index);
        this.statusBars.setBottles(bottleValue + 1);
        this.collectedBottle_sound.play();
      }
    });
    bottlesCollected.reverse().forEach((index) => {
      this.level.bottles.splice(index, 1);
    });
  }

  /**
   * Checks if the character can throw a bottle and, if so, creates a new ThrowableObject in the appropriate direction.
   * Plays a sound when a bottle is thrown and updates the bottle count in the status bars.
   */
  checkThrowObjects() {
    if (this.keyboard.THROW && this.statusBars.bottles != 0 && !this.bottleThrowCoolDown()) {
      this.throwBottle_sound.play();
      this.character.resetIdleTimers();
      let direction = this.character.otherDirection ? "left" : "right";
      let offsetX = direction === "right" ? 60 : -30;
      let bottle = new ThrowableObject(this.character.x + offsetX,this.character.y + 90,direction);
      bottle.world = this;
      this.throwableObject.push(bottle);
      this.statusBars.bottles -= 1;
      this.bottleThrowCoolDown();
    }
  }

  /**
   * Implements a cooldown mechanism for throwing bottles.
   * Prevents the character from throwing another bottle for a specified period.
   */
  bottleThrowCoolDown() {
    this.throwCooldown = true;
    setTimeout(() => {
      this.throwCooldown = false;
    }, 1500);
  }

 /**
 * Checks for collisions between thrown bottles and enemies.
 * If a bottle collides with an enemy, the enemy takes damage, the bottle performs a splash animation,
 * and sound effects are played. If the collided enemy is the end boss, the end boss's hit status is updated.
 * 
 * The function also plays a breaking sound if the bottle falls below a specific height.
 */
  ckeckBottlesHit() {
    let bottles = this.throwableObject;
    let enemies = this.level.enemies;
    let endboss = this.findEndboss()
    bottles.forEach((bottle) => {
      enemies.forEach((enemy) => {
        if (enemy.isColliding(bottle)) {
          let indexOfEnemy = enemies.indexOf(enemy);
          enemy.takeHits(enemies, indexOfEnemy, enemy);
          bottle.splashBottleAnimation()
          bottle.bottleHit()
          if(enemy == endboss){
            this.statusBars.setEndboss(endboss.hits)
          }
          enemy.playSound();
          setTimeout(() => {
            this.removeBottle();
          }, 200);
        }
      });
      if (bottle.y >= 300 && !(bottle.y >= 400)) {
        this.breakBottle_sound.play();
      }
    });
  }

  /**
   * Removes a thrown bottle from the throwable objects list.
   */
  removeBottle() {
    const index = this.throwableObject.indexOf(this);
    if (index >= -1) {
      this.throwableObject.splice(index, 1);
    }
  }

  /**
   * Draws the game elements onto the canvas.
   * Clears the previous frame and translates the context for camera movement.
   * Adds background objects, coins, bottles, clouds, throwable objects, enemies, and the character to the map.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.clouds);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBars);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObject);
    this.addToMap(this.endScreen);
    this.ctx.translate(-this.camera_x, 0);
    let self = this;
    requestAnimationFrame(() => {
      self.draw();
    });
  }

  /**
   * Adds an array of game objects to the map by calling addToMap for each object.
   * @param {Array} objects - The array of objects to be added to the map.
   */
  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  /**
   * Adds a single object to the map and draws it.
   * If the object is facing the other direction, it flips the image before drawing.
   * @param {Object} mo - The object to be added to the map.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      mo.flipImage(this.ctx);
    }

    mo.draw(this.ctx);
    // mo.drawHitBox(this.ctx);
    if (mo.otherDirection) {
      mo.resetFlipImage(this.ctx);
    }
  }
}
