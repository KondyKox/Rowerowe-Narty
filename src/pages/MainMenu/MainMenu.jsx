import Keybindings from "../Keybindings/Keybindings";
import Donate from "../Donate/Donate";
import Credits from "../Credits/Credits";

const MainMenu = ({ onClick, startGame }) => {
  return (
    <div>
      <ul>
        <li
          className="btn"
          onClick={() => onClick(<Keybindings onClick={startGame} />)}
        >
          play
        </li>
        <li className="btn">store</li>
        <li className="btn" onClick={() => onClick(<Donate />)}>
          donate
        </li>
        <li className="btn" onClick={() => onClick(<Credits />)}>
          credits
        </li>
      </ul>
    </div>
  );
};

export default MainMenu;
