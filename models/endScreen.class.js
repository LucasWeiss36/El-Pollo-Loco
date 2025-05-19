class EndScreen extends DrawableObject {
    IMAGES_GAMEOVER = [
        "assets/img/9_intro_outro_screens/game_over/game over!.png",
        "assets/img/9_intro_outro_screens/game_over/game over.png",
        "assets/img/9_intro_outro_screens/game_over/oh no you lost!.png",
        "assets/img/9_intro_outro_screens/game_over/you lost.png",
    ];
    
    IMAGES_WIN = [
        "./assets/img/9_intro_outro_screens/win/win_1.png"
    ];

    win_sound = new Sounds("assets/audio/win.mp3")
    gameover_sound = new Sounds("assets/audio/gameover.mp3")
    
    
    constructor(character, enemies){
        super()
        this.gameoverImg = new Image
        this.gameoverImg.src = this.IMAGES_GAMEOVER[this.getRandomInt(0, 3)]
        this.winImg = new Image
        this.winImg.src = this.IMAGES_WIN
        this.x = 120
        this.y = 0
        this.end(character, enemies)
        this.endbossIsDead = false
        this.characterIsDead  = false
        this.win_sound.volume = 0.05
        this.gameover_sound.volume = 0.15
    }

 
/**
 * Monitors the state of the game to determine if the character has died or if the end boss has been defeated.
 * Plays the corresponding sound effects and updates the game state accordingly.
 * 
 * @param {Character} character - The character object representing the player's character.
 * @param {Array<Enemy>} enemies - An array of enemy objects, including the end boss.
 */
    end(character, enemies){
        setStoppableInterval(()=>{
            const endboss = enemies.find((enemy) => enemy instanceof Endboss)
            if(character.isDead() && !this.characterIsDead){
                this.gameover_sound.play()
                this.characterIsDead = true
                this.x = character.x - 100
                this.restart()
                setTimeout(()=>{
                    stopGame()
                },1500)
            }else if(!character.isDead() && !this.endbossIsDead && endboss.hits <= 0){
                this.win_sound.play()
                this.x = character.x - 50
                this.endbossIsDead = true
                this.restart()
                setTimeout(()=>{
                    stopGame()
                },1500)
            }
        },200)
    }

    /**
 * Resets the game state by displaying the reset and home buttons, and hiding the mobile movement container.
 * Blocks any interactions with the buttons during the reset process.
 */
    restart(){
        let resetButton = document.getElementById("reset")
        let homeButton = document.getElementById("home")
        let container = document.getElementById("mobile-movement-container")
        blockButtons()
        resetButton.style.display = 'block'
        homeButton.style.display = 'block'
        container.style.display = 'none'
    }

    /**
 * Draws the game over screen on the canvas.
 * 
 * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas on which to draw the game over image.
 */
  drawGameover(ctx){
    ctx.drawImage(this.gameoverImg, this.x, this.y, 720, 480)
  }

  /**
 * Draws the win screen on the canvas.
 * 
 * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas on which to draw the win image.
 */
  drawWin(ctx){
    ctx.drawImage(this.winImg, this.x, 130, 600, 200)
  }

  /**
 * Draws the appropriate screen based on the game state (game over or win).
 * 
 * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas on which to draw the game state.
 */
  draw(ctx){
    if(this.characterIsDead){
        this.drawGameover(ctx)
    }else if (this.endbossIsDead){
        this.drawWin(ctx)
    }
  }
  
  /**
 * Generates a random integer between the specified minimum and maximum values, inclusive.
 * 
 * @param {number} min - The minimum integer value.
 * @param {number} max - The maximum integer value.
 * @returns {number} A random integer between min and max, inclusive.
 */
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

  
}

