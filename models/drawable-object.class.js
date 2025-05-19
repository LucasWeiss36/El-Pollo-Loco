class DrawableObject {
  x = 120;
  y = 280;
  height = 150;
  width = 100;
  img;
  imageCache = [];
  currentImage = 0;
  innerHitbox = { top: 5, right: 5, bottom: 5, left: 5 };

  /**
 * Loads an image from the specified path and assigns it to the instance's img property.
 * @param {string} path - The path to the image file.
 */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
 * Loads multiple images from an array of paths and stores them in the imageCache.
 * Each image is instantiated and its source is set from the provided paths.
 * @param {string[]} arr - An array of image paths.
 */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
 * Draws the loaded image onto the provided canvas context at the specified x and y coordinates,
 * with defined width and height.
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context on which to draw the image.
 */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
 * Draws the hitbox of the object on the provided canvas context.
 * It draws both the outer hitbox and an inner hitbox if the object is an instance of 
 * specific classes (Character, Chicken_Big, Chicken_Small, Endboss, Coin, Bottle, ThrowableObject).
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context on which to draw the hitboxes.
 */
  drawHitBox(ctx) {
    if (this instanceof Character || this instanceof Chicken_Big || this instanceof Chicken_Small || this instanceof Endboss || this instanceof Coin || this instanceof Bottle || this instanceof ThrowableObject) {
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();

      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "red";
      const { top, right, bottom, left } = this.innerHitbox; 
      ctx.rect(this.x + left, this.y + top, this.width - left - right, this.height - top - bottom);
      ctx.stroke();
    }
  }

  /**
 * Sets the inner hitbox dimensions for collision detection.
 * The hitbox is defined by the top, right, bottom, and left offsets from the object's boundaries.
 * @param {number} top - The top offset of the inner hitbox.
 * @param {number} right - The right offset of the inner hitbox.
 * @param {number} bottom - The bottom offset of the inner hitbox.
 * @param {number} left - The left offset of the inner hitbox.
 */
  setInnerHitbox(top, right, bottom, left) {
    this.innerHitbox = { top, right, bottom, left };
  }
}
