import { gameState, inputManager, gameCanvas } from "../../MainPlay.js";
import BoostEffect from "../../classes/BoostEffect.js";

window.addEventListener("keydown", (e) => {
  const key = e.key;
  if (key in inputManager.keys) {
    inputManager.keys[key].pressed = true;
    if (inputManager.keys[key].pressed && key === "d")
      gameCanvas.player.direction = "right";
    if (inputManager.keys[key].pressed && key === "a")
      gameCanvas.player.direction = "left";
    if (
      key === "ArrowUp" ||
      key === "ArrowDown" ||
      key === "ArrowLeft" ||
      key === "ArrowRight"
    )
      if (!gameState.isShooting && gameState.PISTOL) {
        BoostEffect.pistol(key);
        gameState.isShooting = true;
      }
  }
});

window.addEventListener("keyup", (e) => {
  const key = e.key;
  if (key in inputManager.keys) inputManager.keys[key].pressed = false;
  if (
    key === "ArrowUp" ||
    key === "ArrowDown" ||
    key === "ArrowLeft" ||
    key === "ArrowRight"
  ) {
    gameState.isShooting = false;
  }
});
