import { game } from "../../main";
import generateGameUI from "./gameUI";

// Sections
const sectionMain = document.querySelector("#sectionMain");
const sectionBack = document.querySelector("#sectionBack");
const logo = document.querySelector(".logo");
let currentSection = null;

document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const clickedId = btn.id;

    sectionMain.style.display = "none";

    switch (clickedId) {
      case "play":
        logo.classList.add("animate");
        logo.addEventListener("animationend", () => {
          logo.classList.remove("animate");
          document.querySelector("main").style.display = "none";
          game.isGameStarted = true;
          generateGameUI();
        });
        break;

      case "keybindings":
        currentSection = document.querySelector("#sectionKeybindings");
        break;

      case "store":
        currentSection = document.querySelector("#sectionStore");
        break;

      case "donate":
        currentSection = document.querySelector("#sectionDonate");
        break;

      case "credits":
        currentSection = document.querySelector("#sectionCredits");
        break;

      default:
        currentSection.classList.remove("active-section");
        sectionBack.classList.remove("active-section");
        sectionMain.style.display = "block";
        currentSection = null;
        break;
    }

    if (currentSection) {
      currentSection.classList.add("active-section");
      sectionBack.classList.add("active-section");
    }
  });
});

export { currentSection, sectionMain, sectionBack };
