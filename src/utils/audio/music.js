import SoundManager from "../../classes/game_states/SoundManager";

document.addEventListener("DOMContentLoaded", function () {
  const soundManager = new SoundManager();

  const currentURL = window.location.href;

  // Get music URL by current page
  function generateAudioPath(url) {
    if (url.includes("index.html")) return soundManager.mainTheme.play();
    else return soundManager.gameMusic.play();
  }

  const audioPath = generateAudioPath(currentURL);

  const audio = new Audio(audioPath);

  audio.play();

  audio.addEventListener("ended", function () {
    this.currentTime = 0;
    this.play();
  });
});
