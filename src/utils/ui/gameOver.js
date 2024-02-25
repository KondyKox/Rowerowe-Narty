import { gameCanvas } from "../../MainPlay.js";

// Display game over screen
export default function gameOverScreen() {
  gameCanvas.canvas.style.display = "none";

  // Game Over div
  const gameOverDiv = document.createElement("div");
  gameOverDiv.classList.add("game-over");

  // Game Over title
  const title = document.createElement("h1");
  title.textContent = "YOU NOOB!";
  gameOverDiv.appendChild(title);

  // Game Over scores
  const scoresDiv = document.createElement("div");
  scoresDiv.classList.add("game-over__scores");

  // Game Over current score
  const scoreParagraph = document.createElement("p");
  scoreParagraph.classList.add("game-over__score");
  scoreParagraph.innerHTML = "Score: <span class='score__over'></span>";
  scoresDiv.appendChild(scoreParagraph);

  // Game Over best score
  const bestScoreParagraph = document.createElement("p");
  bestScoreParagraph.classList.add("game-over__best-score");
  bestScoreParagraph.innerHTML =
    "Best Score: <span class='best-score__over'></span>";
  scoresDiv.appendChild(bestScoreParagraph);

  gameOverDiv.appendChild(scoresDiv);

  // Play again
  const playAgainParagraph = document.createElement("p");
  playAgainParagraph.innerHTML =
    "Click to <span class='play-again'>play again</span>.";
  gameOverDiv.appendChild(playAgainParagraph);

  document.body.appendChild(gameOverDiv);
}
