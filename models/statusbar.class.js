class StatusBars extends DrawableObject {
  BOTTLE_IMAGE = "assets/img/7_statusbars/3_icons/icon_salsa_bottle.png";
  COIN_IMAGE = "assets/img/7_statusbars/3_icons/icon_coin.png";
  HEALTH_IMAGE = "assets/img/7_statusbars/3_icons/icon_health.png";
  ENDBOSS_HEALTH_IMAGE =
    "assets/img/7_statusbars/3_icons/icon_health_endboss.png";

  constructor() {
    super();
    this.healtImg = new Image();
    this.healtImg.src = this.HEALTH_IMAGE;
    this.coinImg = new Image();
    this.coinImg.src = this.COIN_IMAGE;
    this.bottleImg = new Image();
    this.bottleImg.src = this.BOTTLE_IMAGE;
    this.endbossHealthImg = new Image();
    this.endbossHealthImg.src = this.ENDBOSS_HEALTH_IMAGE;
    this.x = 10;
    this.y = 10;
    this.width = 50;
    this.height = 50;
    this.health = 100;
    this.coins = 0;
    this.bottles = 0;
    this.endbossHealth = 10;
  }

  /**
   * Sets the health of the object.
   * @param {number} health - The health value to set.
   */
  setHealth(health) {
    this.health = health;
  }

  /**
   * Sets the coin count of the object.
   * @param {number} coins - The coin count to set.
   */
  setCoinCount(coins) {
    this.coins = coins;
  }

  /**
   * Sets the number of bottles the object has.
   * @param {number} bottles - The number of bottles to set.
   */
  setBottles(bottles) {
    this.bottles = bottles;
  }

  /**
   * Sets the health value of the end boss.
   * @param {number} endbossHealth - The health value to assign to the end boss.
   */
  setEndboss(endbossHealth) {
    this.endbossHealth = endbossHealth;
  }

  /**
   * Draws the health representation on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
   */
  drawLife(ctx) {
    ctx.drawImage(this.healtImg, this.x, this.y, this.width, this.height);
    this.drawText(ctx, this.health, this.x + this.width, this.height);
  }

  /**
   * Draws the coin representation on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
   */
  drawCoins(ctx) {
    ctx.drawImage(this.coinImg, this.x, this.y + this.height, this.width, this.height);
    this.drawText(ctx, this.coins, this.x + this.width, this.height * 2);
  }

  /**
   * Draws the bottle representation on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
   */
  drawBottles(ctx) {
    ctx.drawImage(this.bottleImg, this.x, this.y + this.height * 2 + 5, this.width, this.height);
    this.drawText(ctx, this.bottles, this.x + this.width, this.height * 3);
  }

  /**
   * Draws the end boss's health on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The rendering context for the canvas.
   * Draws the end boss health image at the specified position and displays the health value as text.
   */
  drawEndbossHealth(ctx) {
    ctx.drawImage(this.endbossHealthImg, this.x + 600, this.y, this.width, this.height);
    this.drawText(ctx, this.endbossHealth, this.x + 570, this.height - 5);
  }

  /**
   * Draws the health, coin, and bottle representations on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
   */
  draw(ctx) {
    this.drawLife(ctx);
    this.drawCoins(ctx);
    this.drawBottles(ctx);
    this.drawEndbossHealth(ctx);
  }

  /**
   * Draws text on the canvas at specified coordinates.
   * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
   * @param {string|number} text - The text to draw.
   * @param {number} x - The x-coordinate for the text.
   * @param {number} y - The y-coordinate for the text.
   */
  drawText(ctx, text, x, y) {
    ctx.font = "36px zabars";
    ctx.fillStyle = "black";
    this.setTextShadow(ctx, "#CFD8DD", 1.5, 1.5);
    ctx.fillText(`${text}`, x, y);
    ctx.shadowColor = "transparent";
  }

  /**
   * Sets the text shadow properties for the canvas context.
   * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
   * @param {string} color - The color of the shadow.
   * @param {number} offsetX - The horizontal offset of the shadow.
   * @param {number} offsetY - The vertical offset of the shadow.
   */
  setTextShadow(ctx, color, offsetX, offsetY) {
    ctx.shadowColor = color;
    ctx.shadowOffsetX = offsetX;
    ctx.shadowOffsetY = offsetY;
  }
}
