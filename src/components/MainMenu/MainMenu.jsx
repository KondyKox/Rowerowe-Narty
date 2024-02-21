import Credits from "../Credits/Credits";

const MainMenu = ({ onClick }) => {
  return (
    <div>
      <ul>
        <li id="keybindings" className="btn">
          play
        </li>
        {/* <li id="account" className="btn">
          account
        </li> */}
        <li id="store" className="btn">
          store
        </li>
        <li id="donate" className="btn">
          donate
        </li>
        <li id="credits" className="btn" onClick={() => onClick(<Credits />)}>
          credits
        </li>
      </ul>
    </div>
  );
};

export default MainMenu;
