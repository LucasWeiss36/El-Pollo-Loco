class Cloud extends MovableObject {
  height = 250;
  width = 350;
  y = 10;

  constructor(x) {
    super().loadImage("assets/img/5_background/layers/4_clouds/1.png");
    this.x = x
    this.animate();
  }

  /**
 * Animates the movement of the object by calling the `moveLeft` method at a rate of 60 frames per second.
 * This method uses `setStoppableInterval` to ensure the interval can be managed effectively.
 */
  animate() {
    setStoppableInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
    
  }
}
