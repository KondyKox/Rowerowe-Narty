import { useState } from "react";
import MainMenu from "./pages/MainMenu/MainMenu";
import "./App.css";

const App = () => {
  const [currentSection, setCurrentSection] = useState(null);
  const [isGameStarted, setGameStarted] = useState(false);

  const handleChangeSection = (newSection) => {
    setCurrentSection(newSection);
  };

  return (
    <>
      {!isGameStarted ? (
        <div className="logo">
          <img
            src="./img/logo.png"
            alt="Rowerowe Narty - logo"
            loading="lazy"
          />
        </div>
      ) : null}

      {currentSection || <MainMenu onClick={handleChangeSection} />}

      {currentSection && !isGameStarted ? (
        <div>
          <ul>
            {/* <li id="logout" className="btn">
              logout
            </li> */}
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
