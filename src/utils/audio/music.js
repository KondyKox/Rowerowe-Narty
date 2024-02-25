document.addEventListener("DOMContentLoaded", function () {
  const currentURL = window.location.href;

  // Get music URL by current page
  function generateAudioPath(url) {
    if (url.includes("index.html")) return "./public/sfx/main-theme.mp3";
    else return "../public/sfx/game-music.mp3";
  }

  const audioPath = generateAudioPath(currentURL);

  const audio = new Audio(audioPath);

  audio.play();

  audio.addEventListener("ended", function () {
    this.currentTime = 0;
    this.play();
  });
});
