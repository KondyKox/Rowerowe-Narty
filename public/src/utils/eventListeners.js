window.addEventListener("keydown", (e) => {
  const key = e.key;
  if (key in keys) {
    keys[key].pressed = true;
    if (keys[key].pressed && key === "d") player.direction = "right";
    if (keys[key].pressed && key === "a") player.direction = "left";
    if (
      key === "ArrowUp" ||
      key === "ArrowDown" ||
      key === "ArrowLeft" ||
      key === "ArrowRight"
    )
      if (!isShooting && PISTOL) {
        pistol(key);
        isShooting = true;
      }
  }
});

window.addEventListener("keyup", (e) => {
  const key = e.key;
  if (key in keys) keys[key].pressed = false;
  if (
    key === "ArrowUp" ||
    key === "ArrowDown" ||
    key === "ArrowLeft" ||
    key === "ArrowRight"
  ) {
    isShooting = false;
  }
});
