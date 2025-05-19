class Level {
  enemies;
  coins;
  clouds;
  bottles;
  backgroundObjects;
  level_end_x = 7 * 720 - 720 / 2;
  
  constructor( enemies, coins, clouds, bottles, backgroundObjects) {
    this.enemies = enemies;
    this.coins = coins;
    this.clouds = clouds;
    this.bottles = bottles;
    this.backgroundObjects = backgroundObjects;    

  }  
}
