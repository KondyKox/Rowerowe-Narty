window.addEventListener("keydown", (e) => {
  const key = e.key;
  if (key in keys) {
    keys[key].pressed = true;
    if (keys[key].pressed && key === "d") player.direction = "right";
    if (keys[key].pressed && key === "a") player.direction = "left";
  }
});

window.addEventListener("keyup", (e) => {
  const key = e.key;
  if (key in keys) keys[key].pressed = false;
});
