import GameState from "./game_states/GameState.js";
import Generator from "./game_states/Generator.js";
import "./game_states/CollisionHandler.js";

import "./classes/Sprite.js";
import "./classes/Player.js";
import "./classes/Obstacle.js";
import "./classes/Police.js";
import "./classes/BoostEffect.js";
import "./classes/Bullet.js";

import "./utils/eventListeners.js";
import "./utils/music.js";
import "./utils/game.js";

export const game = new GameState();

// Generating in time
setInterval(() => {
  Generator.generateObstacles(game);
}, 2100);

setInterval(() => {
  Generator.generatePuddles(game);
}, 2200);

setInterval(() => {
  Generator.generatePolice(game);
}, 2000);

setInterval(() => {
  Generator.generateBoosts(game);
}, 5000);
