export default class SoundManager {
  constructor() {
    this.chickenSfx = new Audio("../public/sfx/chicken.mp3");
    this.policeSfx = new Audio("../public/sfx/police.mp3");
    this.puddleSfx = new Audio("../public/sfx/puddle.mp3");
    this.speedSfx = new Audio("../public/sfx/speed.mp3");
    this.pistolSfx = new Audio("../public/sfx/pistol.mp3");
    this.shootSfx = new Audio("../public/sfx/shoot.mp3");
    this.multiplierSfx = new Audio("../public/sfx/multiplier.mp3");
    this.shieldSfx = new Audio("../public/sfx/shield.mp3");
    this.coinSfx = new Audio("../public/sfx/coin.mp3");
  }
}
