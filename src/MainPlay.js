// Import in play.html (game)

// CSS Styles
// import "../styles/style.css";
// import "../styles/utils.css";
// import "../styles/components/user_interface.css";
// import "../styles/components/game_over.css";

// Game States
import GameState from "./classes/game_states/GameState.js";
import Generator from "./classes/game_states/Generator.js";
import SoundManager from "./classes/game_states/SoundManager.js";
import InputManager from "./classes/game_states/InputManager.js";
import GameCanvas from "./classes/game_states/GameCanvas.js";

// Utils
import generateNavbar from "./utils/ui/navbard.js";
import "./utils/game/eventListeners.js";
import "./utils/game/game.js";
import "./utils/audio/music.js";

generateNavbar();

export const gameState = new GameState();
export const soundManager = new SoundManager();
export const inputManager = new InputManager();
export const gameCanvas = new GameCanvas();

// Generating in time
setInterval(() => {
  Generator.generateObstacles(gameState);
}, 2100);

setInterval(() => {
  Generator.generatePuddles(gameState);
}, 2200);

setInterval(() => {
  Generator.generatePolice(gameState);
}, 2000);

setInterval(() => {
  Generator.generateBoosts(gameState);
}, 5000);
