import BoostList from "../BoostList/BoostList";
import "./Navbar.css";

const UI = ({ onClick, score, bestScore }) => {
  return (
    <>
      <nav>
        <div className="nav__logo" onClick={() => onClick(null)}>
          <img src="./img/logo.png" alt="Rowerowe Narty - logo" />
        </div>
        <div className="nav__ui">
          <BoostList />

          <ul className="ui__score ui__list">
            <li className="score__element">
              Score: <span className="score">{score}</span>
            </li>
            <li className="score__element">
              The Best Score: <span className="best-score">{bestScore}</span>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default UI;
