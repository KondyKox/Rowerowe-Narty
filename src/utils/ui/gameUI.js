import boostsData from "../../data/boosts.json";
import { game } from "../../main";

// Generate game navbar
export default function generateGameUI() {
  if (game.isGameStarted) return;

  const navBar = document.createElement("nav");
  navBar.classList.add("navbar");

  // Logo
  const logoDiv = document.createElement("div");
  logoDiv.classList.add("nav__logo");

  logoDiv.addEventListener("click", () => backToMenu());

  const logoImg = document.createElement("img");
  logoImg.src = "./img/logo.png";
  logoImg.alt = "Rowerowe Narty - logo";

  logoDiv.appendChild(logoImg);
  navBar.appendChild(logoDiv);

  // UI Elements
  const uiDiv = document.createElement("div");
  uiDiv.classList.add("nav__ui");

  // Boosts
  const boostsList = document.createElement("ul");
  boostsList.classList.add("ui__boosts", "ui__list");

  boostsData.forEach((boost) => {
    if (boost.isActive) {
      const boostItem = document.createElement("li");
      boostItem.classList.add("ui__element", "ui__boost");

      const boostImg = document.createElement("img");
      boostImg.src = boost.src;
      boostImg.alt = boost.name;
      boostImg.classList.add("boost", boost.className);

      boostItem.appendChild(boostImg);
      boostsList.appendChild(boostItem);
    }
  });

  // Scores
  const scoreList = document.createElement("ul");
  scoreList.classList.add("ui__score", "ui__list");

  // Your score
  const scoreElement = document.createElement("li");
  scoreElement.classList.add("ui__element");
  scoreElement.textContent = "Score: ";

  const scoreValue = document.createElement("span");
  scoreValue.classList.add("score");
  scoreElement.appendChild(scoreValue);

  // Best score
  const bestScoreElement = document.createElement("li");
  bestScoreElement.classList.add("ui__element");
  bestScoreElement.textContent = "The Best Score: ";

  const bestScoreValue = document.createElement("span");
  bestScoreValue.classList.add("best-score");
  bestScoreElement.appendChild(bestScoreValue);

  // Append elements
  scoreList.appendChild(scoreElement);
  scoreList.appendChild(bestScoreElement);

  uiDiv.appendChild(boostsList);
  uiDiv.appendChild(scoreList);
  navBar.appendChild(uiDiv);
  document.body.appendChild(navBar);

  // Display canvas
  document.querySelector("canvas").style.display = "block";
}

// Display game over screen
export function gameOverScreen() {
  game.canvas.style.display = "none";

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
  scoreParagraph.innerHTML = "Score: <span class='score'></span>";
  scoresDiv.appendChild(scoreParagraph);

  // Game Over best score
  const bestScoreParagraph = document.createElement("p");
  bestScoreParagraph.classList.add("game-over__best-score");
  bestScoreParagraph.innerHTML = "Best Score: <span class='best-score'></span>";
  scoresDiv.appendChild(bestScoreParagraph);

  gameOverDiv.appendChild(scoresDiv);

  // Play again
  const playAgainParagraph = document.createElement("p");
  playAgainParagraph.innerHTML =
    "Click to <span class='play-again'>play again</span>.";
  gameOverDiv.appendChild(playAgainParagraph);

  document.body.appendChild(gameOverDiv);
}

// Go back to menu
function backToMenu() {
  document.body.removeChild(document.querySelector(".navbar"));
  document.querySelector("main").style.display = "flex";
}
