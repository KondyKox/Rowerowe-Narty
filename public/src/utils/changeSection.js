const sectionMain = document.querySelector("#sectionMain");
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
          window.location.href = "/play.html";
        });
        break;

      case "keybindings":
        currentSection = document.querySelector("#sectionKeybindings");
        currentSection.style.display = "block";
        break;

      case "store":
        currentSection = document.querySelector("#sectionStore");
        currentSection.style.display = "block";
        break;

      case "donate":
        currentSection = document.querySelector("#sectionDonate");
        currentSection.style.display = "block";
        break;

      case "credits":
        currentSection = document.querySelector("#sectionCredits");
        currentSection.style.display = "block";
        break;

      default:
        currentSection.style.display = "none";
        sectionMain.style.display = "block";
        break;
    }
  });
});
