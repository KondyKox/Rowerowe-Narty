import { game } from "../../main.js";
import BoostEffect from "../../classes/BoostEffect.js";

window.addEventListener("keydown", (e) => {
  const key = e.key;
  if (key in game.keys) {
    game.keys[key].pressed = true;
    if (game.keys[key].pressed && key === "d") game.player.direction = "right";
    if (game.keys[key].pressed && key === "a") game.player.direction = "left";
    if (
      key === "ArrowUp" ||
      key === "ArrowDown" ||
      key === "ArrowLeft" ||
      key === "ArrowRight"
    )
      if (!game.isShooting && game.PISTOL) {
        BoostEffect.pistol(key);
        game.isShooting = true;
      }
  }
});

window.addEventListener("keyup", (e) => {
  const key = e.key;
  if (key in game.keys) game.keys[key].pressed = false;
  if (
    key === "ArrowUp" ||
    key === "ArrowDown" ||
    key === "ArrowLeft" ||
    key === "ArrowRight"
  ) {
    game.isShooting = false;
  }
});
