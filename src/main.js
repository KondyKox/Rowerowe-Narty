// CSS Styles
import "../styles/style.css";
import "../styles/utils.css";
import "../styles/components/animate-logo.css";
import "../styles/components/keybindings.css";
import "../styles/components/store.css";
import "../styles/components/donate.css";
import "../styles/components/credits.css";
import "../styles/components/login.css";
import "../styles/components/user_interface.css";

// Game States
import GameState from "./game_states/GameState.js";
import Generator from "./game_states/Generator.js";
import "./game_states/CollisionHandler.js";

// Classes
import "./classes/Sprite.js";
import "./classes/Player.js";
import "./classes/Obstacle.js";
import "./classes/Police.js";
import "./classes/BoostEffect.js";
import "./classes/Bullet.js";

// Utils
import "./utils/ui/changeSection.js";
import "./utils/ui/toggleLoginForm.js";
// import "./utils/ui/userInterface.js";
import "./utils/game/eventListeners.js";
import "./utils/auth.js";
import "./utils/audio/music.js";
import "./utils/store/store.js";
import "./utils/game/game.js";

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
