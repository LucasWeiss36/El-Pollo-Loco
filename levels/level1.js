let enemies = [];
let coins = [];
let clouds = [];
let bottles = [];
let backgroundObjects = [];
let level1 = new Level(enemies, coins, clouds, bottles, backgroundObjects);

const backgroundImagesFirstHalf = (x) => [
  new BackgroundObject("assets/img/5_background/layers/air.png", x),
  new BackgroundObject("assets/img/5_background/layers/3_third_layer/2.png", x),
  new BackgroundObject("assets/img/5_background/layers/2_second_layer/2.png",x),
  new BackgroundObject("assets/img/5_background/layers/1_first_layer/2.png", x),
];
const backgroundImagesSecondHalf = (x) => [
  new BackgroundObject("assets/img/5_background/layers/air.png", x),
  new BackgroundObject("assets/img/5_background/layers/3_third_layer/1.png", x),
  new BackgroundObject("assets/img/5_background/layers/2_second_layer/1.png",x),
  new BackgroundObject("assets/img/5_background/layers/1_first_layer/1.png", x),
];

/**
 * Populates the level with various objects, including enemies, clouds, items, and background images.
 */
function populateLevelObjects() {
  populateEnemies();
  populateClouds();
  populateItems();
  populateBackgroundImages()
}

/**
 * Populates the level with items, including coins and bottles.
 */
function populateItems() {
  populateCoinArcs();
  populateBottles();
}

/**
 * Populates the level with coin arcs, distributing a total of coins across a defined number of arcs.
 */
function populateCoinArcs() {
  let totalCoins = 35;
  let totalArcs = 7;
  let minCoins = 3;
  let maxCoins = 7;
  let coinsPerArc = [];
  let coinsLeft = totalCoins;

  for (let i = 0; i < totalArcs - 1; i++) {
    let maxPossibleCoins = Math.min(maxCoins,coinsLeft - minCoins * (totalArcs - i - 1));
    let coinsForThisArc = getRandomInt(minCoins, maxPossibleCoins);
    coinsPerArc.push(coinsForThisArc);
    coinsLeft -= coinsForThisArc;
  }

  for (let i = 0; i < totalArcs; i++) {
    let arcWidth = 130;
    let arcStartX = getRandomInt(500 + i * 600, 750 + i * 600);
    let arcStartY = getRandomInt(100, 150);
    let arcHeight = getRandomInt(10, 40);
    let arc = createCoinArc(arcStartX,arcStartY,arcHeight,arcWidth,coinsPerArc[i]);
    coins = coins.concat(arc);
  }
}

/**
 * Creates a coin arc at specified coordinates, generating a specified number of coins along a sine wave.
 * 
 * @param {number} startX - The starting X coordinate for the arc.
 * @param {number} startY - The starting Y coordinate for the arc.
 * @param {number} arcHeight - The height of the sine wave for the arc.
 * @param {number} arcWidth - The width of the arc.
 * @param {number} numCoins - The number of coins to create in the arc.
 * @returns {Array<Coin>} An array of Coin objects created in the arc.
 */
function createCoinArc(startX, startY, arcHeight, arcWidth, numCoins) {
  let coinss = [];
  let adjustedArcWidth = arcWidth + (numCoins - 3) * 50;
  for (let i = 0; i < numCoins; i++) {
    let x = startX + i * (adjustedArcWidth / (numCoins - 1));
    let y = startY - Math.sin((i / (numCoins - 1)) * Math.PI) * arcHeight;
    let coin = new Coin(x, y);
    coinss.push(coin);
  }
  return coinss;
}

/**
 * Populates the level with a specified number of bottles, placing them at random X coordinates.
 */
function populateBottles() {
  let totalBottles = 15;
  for (let i = 0; i < totalBottles; i++) {
    let bottleX = getRandomInt(550 + i * 200, 700 + i * 200);
    let bottle = createRandomBottle(bottleX);
    bottles = bottles.concat(bottle);
  }
}

/**
 * Creates a random bottle at a given X coordinate.
 * 
 * @param {number} startX - The X coordinate where the bottle will be created.
 * @returns {Array<Bottle>} An array containing the created Bottle object.
 */
function createRandomBottle(startX) {
  let bottles = [];
  let x = startX;
  let bottle = new Bottle(x);
  bottles.push(bottle);
  return bottles;
}

/**
 * Populates the level with a specified number of clouds, placing them at random X coordinates.
 */
function populateClouds() {
  let totalClouds = 20;
  for (let i = 0; i < totalClouds; i++) {
    let cloudX = getRandomInt(0 + i * 400, 200 + i * 400);
    let cloud = createRandomClouds(cloudX);
    clouds = clouds.concat(cloud);
  }
}

/**
 * Creates a random cloud at a given X coordinate.
 * 
 * @param {number} startX - The X coordinate where the cloud will be created.
 * @returns {Array<Cloud>} An array containing the created Cloud object.
 */
function createRandomClouds(startX) {
  let clouds = [];
  let x = startX;
  let cloud = new Cloud(x);
  clouds.push(cloud);
  return clouds;
}

/**
 * Generates a random integer between a minimum and maximum value, inclusive.
 * 
 * @param {number} min - The minimum value (inclusive).
 * @param {number} max - The maximum value (inclusive).
 * @returns {number} A random integer between min and max.
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Populates the level with a predefined number of enemies, including big and small chickens and an end boss.
 */
function populateEnemies() {
  for (let i = 0; i < 6; i++) {
    enemies.push(new Chicken_Big());
    enemies.push(new Chicken_Small());
  }
  enemies.push(new Endboss());
}

/**
 * Populates the level with background images, creating multiple layers based on the predefined width of the images.
 */
function populateBackgroundImages() {
  backgroundObjects = [];
  let background_x = -719;

  for (let i = 0; i < 5; i++) {
    backgroundImagesFirstHalf(background_x).forEach(img => backgroundObjects.push(img));
    background_x += 719;
    backgroundImagesSecondHalf(background_x).forEach(img => backgroundObjects.push(img));
    background_x += 719;
  }

 
  
}
