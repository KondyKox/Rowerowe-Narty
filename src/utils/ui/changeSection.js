import renderSkins from "../store/store";

// Sections
const sectionMain = document.querySelector("#sectionMain");
const sectionAcc = document.querySelector("#sectionAccount");
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
          window.location.href = "./play.html";
        });
        break;

      case "keybindings":
        currentSection = document.querySelector("#sectionKeybindings");
        break;

      case "store":
        currentSection = document.querySelector("#sectionStore");
        renderSkins();
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
