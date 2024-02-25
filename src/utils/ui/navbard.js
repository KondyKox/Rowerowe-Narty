import { boostsData } from "../../data/boosts.js";

let isNavbarRendered = false;

// Generate logo
function generateLogo() {
  const logoDiv = document.createElement("div");
  logoDiv.classList.add("nav__logo");

  const linkToMenu = document.createElement("a");
  linkToMenu.href = "../index.html";

  const logoImg = document.createElement("img");
  logoImg.src = "../public/img/logo.png";
  logoImg.alt = "Rowerowe Narty - logo";

  linkToMenu.appendChild(logoImg);
  logoDiv.appendChild(linkToMenu);

  return logoDiv;
}

// Generate boosts list
function generateBoostsList() {
  const boostsList = document.createElement("ul");
  boostsList.classList.add("ui__boosts", "ui__list");

  boostsData.forEach((boost) => {
    const boostItem = document.createElement("li");
    boostItem.classList.add("ui__element", "ui__boost");

    const boostImg = document.createElement("img");
    boostImg.src = boost.src;
    boostImg.alt = boost.name;
    boostImg.classList.add("boost", boost.name);
    if (boost.name !== "coin") boostImg.classList.add("inactive");

    boostItem.appendChild(boostImg);

    // Quantity of ammo / coins
    if (boost.name === "pistol" || boost.name === "coin") {
      const boostQuantity = document.createElement("sup");

      boost.name === "pistol"
        ? boostQuantity.classList.add("ammo")
        : boostQuantity.classList.add("coins");

      boostItem.appendChild(boostQuantity);
    }

    boostsList.appendChild(boostItem);
  });

  return boostsList;
}

// Generate score section
function generateScoreSection() {
  const scoreList = document.createElement("ul");
  scoreList.classList.add("ui__score", "ui__list");

  const scoreElement = document.createElement("li");
  scoreElement.classList.add("ui__element");
  scoreElement.textContent = "Score: ";

  const scoreValue = document.createElement("span");
  scoreValue.classList.add("score");
  scoreElement.appendChild(scoreValue);

  const bestScoreElement = document.createElement("li");
  bestScoreElement.classList.add("ui__element");
  bestScoreElement.textContent = "The Best Score: ";

  const bestScoreValue = document.createElement("span");
  bestScoreValue.classList.add("best-score");
  bestScoreElement.appendChild(bestScoreValue);

  scoreList.appendChild(scoreElement);
  scoreList.appendChild(bestScoreElement);

  return scoreList;
}

// Generate navabr ui
export default function generateNavbar() {
  if (isNavbarRendered) return;

  const navBar = document.querySelector(".navbar");

  navBar.appendChild(generateLogo());
  const uiDiv = document.createElement("div");
  uiDiv.classList.add("nav__ui");

  uiDiv.appendChild(generateBoostsList());
  uiDiv.appendChild(generateScoreSection());

  navBar.appendChild(uiDiv);

  isNavbarRendered = true;
}
