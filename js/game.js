let canvas;
let world;
let keyboard = new Keyboard();
let intervalIDs = [];

let volume = "on"

/**
 * Initializes the game by setting up the canvas and the game world.
 * It hides the start screen and displays the canvas element.
 * Additionally, it populates the level objects, resets the level,
 * and creates a new instance of the World class.
 * If the window height is less than or equal to 1030 pixels,
 * it displays the mobile movement container.
 */
function start() {
  let startScreen = document.getElementById("start");
  canvas = document.getElementById("canvas");
  startScreen.style.display = "none";
  canvas.style.display = "block";
  checkMutedSounds()
  populateLevelObjects();
  resetLevel();
  checkReset();
  world = new World(canvas, keyboard);
  if (window.innerHeight <= 1030) {
    showMovementContainer();
  }
}

/**
 * Toggles the mute state of the sound.
 * If the mute button text is "MUTE", it sets the volume to "off" and updates the button text to "MUTED".
 * If the button text is "MUTED", it sets the volume to "on" and updates the button text back to "MUTE".
 */
function muteSound(){
  let muteButton = document.getElementById("mute").innerHTML
  if(muteButton == "MUTE"){
    volume = "off"
    document.getElementById("mute").innerHTML = "MUTED"
  }else{
    volume = "on"
    document.getElementById("mute").innerHTML = "MUTE"
  }
}

/**
 * Checks the current volume state and mutes or unmutes all sound objects accordingly.
 * If the volume is "off", all sounds are muted; otherwise, all sounds are unmuted.
 */
function checkMutedSounds(){
  if(volume === "off"){
    Sounds.allSoundObjects.forEach(sound => {
      sound.muted = true
    });
  }else{
    Sounds.allSoundObjects.forEach(sound => {
      sound.muted = false
    })
  }
}

/**
 * Restarts a given sound by pausing it, resetting its playback time to the start,
 * and playing it again if sounds are enabled.
 * 
 * @param {Audio} sound - The Audio object to be restarted.
 */
function restartSound(sound) {
  if (this.soundsEnabled) {
      sound.pause(); // Pausiert den Sound
      sound.currentTime = 0; // Setzt den Sound zurück auf den Anfang
      sound.play(); // Spielt den Sound neu ab
  }
}


/**
 * Displays the impressum screen and hides the start screen and canvas.
 * This function is typically called to show legal information or credits
 * associated with the application.
 */
function showImpressum(){
  let impressumScreen = document.getElementById("impressum");
  let startScreen = document.getElementById("start");
  canvas = document.getElementById("canvas");
  impressumScreen.style.display = "flex"
  startScreen.style.display = "none"
  canvas.style.display = "none"
}

/**
 * Displays the home screen of the game.
 * This function checks if the game needs to be reset and then makes the start screen visible
 * while hiding the game canvas. If the impressum screen is currently displayed, it hides it as well.
 */
function homeScreen() {
  checkReset();
  let impressumScreen = document.getElementById("impressum");
  let startScreen = document.getElementById("start");
  canvas = document.getElementById("canvas");
  startScreen.style.display = "block";
  canvas.style.display = "none";
  if(impressumScreen.style.display == "flex"){
    impressumScreen.style.display = "none"
  }
}

/**
 * Temporarily disables the reset and home buttons for 1.5 seconds.
 * This prevents user interaction with these buttons during this period.
 */
function blockButtons() {
  let resetButton = document.getElementById("reset");
  let homeButton = document.getElementById("home");
  resetButton.disabled = true;
  homeButton.disabled = true;
  setTimeout(() => {
    resetButton.disabled = false;
    homeButton.disabled = false;
  }, 1500);
}

/**
 * Resets the level by clearing and repopulating all level objects, including coins,
 * bottles, clouds, enemies, and background objects.
 */
function resetLevel() {
  resetCoins();
  resetBottles();
  resetClouds();
  resetEnemies();
  resetBackgroundObject();
}

/**
 * Resets the level by clearing and repopulating all level objects, including coins,
 * bottles, clouds, enemies, and background objects.
 */
function resetCoins() {
  level1.coins = [];
  coins.forEach((coin) => {
    level1.coins.push(coin);
  });
  level1.coins = coins;
  coins = [];
}

/**
 * Resets the bottles in the level. It clears the existing bottles in level1,
 * repopulates it with the current bottles from the global `bottles` array,
 * and then clears the global `bottles` array.
 */
function resetBottles() {
  level1.bottles = [];
  bottles.forEach((bottle) => {
    level1.bottles.push(bottle);
  });
  level1.bottles = bottles;
  bottles = [];
}

/**
 * Resets the clouds in the level. It clears the existing clouds in level1,
 * repopulates it with the current clouds from the global `clouds` array,
 * and then clears the global `clouds` array.
 */
function resetClouds() {
  level1.clouds = [];
  clouds.forEach((cloud) => {
    level1.clouds.push(cloud);
  });
  level1.clouds = clouds;
  clouds = [];
}

/**
 * Resets the enemies in the level. It clears the existing enemies in level1,
 * repopulates it with the current enemies from the global `enemies` array,
 * and then clears the global `enemies` array.
 */
function resetEnemies() {
  level1.enemies = [];
  enemies.forEach((enemy) => {
    level1.enemies.push(enemy);
  });
  level1.enemies = enemies;
  enemies = [];
}

/**
 * Resets the background objects in the level. It clears the existing background objects
 * in level1, repopulates it with the current background objects from the global
 * `backgroundObjects` array, and then clears the global `backgroundObjects` array.
 */
function resetBackgroundObject() {
  level1.backgroundObjects = [];
  backgroundObjects.forEach((backgroundObject) => {
    level1.backgroundObjects.push(backgroundObject);
  });
  level1.backgroundObjects = backgroundObjects;
  backgroundObjects = [];
}

/**
 * Checks if the reset button is displayed. If it is visible, it hides the reset button
 * and the home button.
 */
function checkReset() {
  let resetButton = document.getElementById("reset");
  let homeButton = document.getElementById("home");
  if (resetButton.style.display == "block") {
    resetButton.style.display = "none";
    homeButton.style.display = "none";
  }
}

/**
 * Sets a stoppable interval for executing a specified function at a given time interval.
 * It stores the interval ID in the `intervalIDs` array for future reference.
 *
 * @param {Function} fn - The function to be executed at each interval.
 * @param {number} time - The time interval in milliseconds between each execution.
 */
function setStoppableInterval(fn, time) {
  let ID = setInterval(fn, time);
  intervalIDs.push(ID);
}

/**
 * Stops all running intervals that have been set with `setStoppableInterval`.
 */
function stopGame() {
  intervalIDs.forEach(clearInterval);
}

/**
 * Displays the mobile movement container, setting its display style to flex.
 */
function showMovementContainer() {
  let container = document.getElementById("mobile-movement-container");
  container.style.display = "flex";
}

/**
 * Event listener for orientation change on the window.
 * Reloads the page when the device orientation changes.
 */
window.addEventListener("orientationchange", () => {
  location.reload();
});

/**
 * Stops the specified mobile movement by setting the corresponding key in the
 * keyboard object to false.
 *
 * @param {string} KEY - The key to be stopped (e.g., "LEFT", "RIGHT", "SPACE", "THROW").
 */
function stopMobileMovement(KEY) {
  if (keyboard[KEY]) {
    keyboard[KEY] = false;
  }
}

/**
 * Starts the specified mobile movement by setting the corresponding key in the
 * keyboard object to true.
 *
 * @param {string} KEY - The key to be started (e.g., "LEFT", "RIGHT", "SPACE", "THROW").
 */
function startMobileMovement(KEY) {
  if (KEY == "LEFT") {
    keyboard[KEY] = true;
  }
  if (KEY == "RIGHT") {
    keyboard[KEY] = true;
  }
  if (KEY == "SPACE") {
    keyboard[KEY] = true;
  }
  if (KEY == "THROW") {
    keyboard[KEY] = true;
  }
}

/**
 * Event listener for keydown events. Updates the keyboard state to true for the
 * corresponding key when pressed.
 */
window.addEventListener("keydown", (e) => {
  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (e.keyCode == 38) {
    keyboard.UP = true;
  }
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if (e.keyCode == 84) {
    keyboard.THROW = true;
  }
});

/**
 * Event listener for keyup events. Updates the keyboard state to false for the
 * corresponding key when released.
 */
window.addEventListener("keyup", (e) => {
  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (e.keyCode == 38) {
    keyboard.UP = false;
  }
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }
  if (e.keyCode == 84) {
    keyboard.THROW = false;
  }
});
