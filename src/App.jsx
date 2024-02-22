import { useState } from "react";
import MainMenu from "./pages/MainMenu/MainMenu";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";
import GameCanvas from "./components/Game/GameCanvas/GameCanvas";
import "./App.css";

const App = () => {
  const [currentSection, setCurrentSection] = useState(null);
  const [logoClass, setLogoClass] = useState("logo");
  const [isGameStarted, setGameStarted] = useState(false);

  // Change section
  const handleChangeSection = (newSection) => {
    setCurrentSection(newSection);
  };

  // Animate logo before start
  const handleLogoClass = () => {
    setLogoClass((existingClass) => `${existingClass} animate`);
  };

  // Start the game
  const handleStartGame = () => {
    handleLogoClass();

    setTimeout(() => {
      setGameStarted(true);
      setCurrentSection(<GameCanvas backToMenu={handleBackToMenu} />);
    }, 2000);
  };

  // Back to menu
  const handleBackToMenu = () => {
    setLogoClass("logo");
    setCurrentSection(null);
    setGameStarted(false);
  };

  return (
    <>
      <MusicPlayer isGameStarted={isGameStarted} />

      {!isGameStarted ? (
        <div className={logoClass}>
          <img
            src="./img/logo.png"
            alt="Rowerowe Narty - logo"
            loading="lazy"
          />
        </div>
      ) : null}

      {currentSection || (
        <MainMenu onClick={handleChangeSection} startGame={handleStartGame} />
      )}

      {currentSection && !isGameStarted ? (
        <div>
          <ul>
            <li className="btn" onClick={() => handleChangeSection(null)}>
              back
            </li>
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default App;
