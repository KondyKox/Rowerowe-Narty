import "./Keybindings.css";

const Keybindings = ({ onClick }) => {
  return (
    <div className="section__keybindings">
      <ul className="keys">
        <h3>Movement:</h3>
        <li className="keys__element">W</li>
        <li className="keys__element">S</li>
        <li className="keys__element">A</li>
        <li className="keys__element">D</li>
      </ul>

      <ul className="keys">
        <h3>Shooting:</h3>
        <li className="keys__element">
          &uarr;
          {/* Arrow Up */}
        </li>
        <li className="keys__element">
          &darr;
          {/* Arrow Down */}
        </li>
        <li className="keys__element">
          &larr;
          {/* Arrow Left */}
        </li>
        <li className="keys__element">
          &rarr;
          {/* Arrow Right */}
        </li>
      </ul>
      <ul className="container__list">
        <li
          id="play"
          className="btn"
          onClick={() => {
            onClick();
          }}
        >
          play
        </li>
      </ul>
    </div>
  );
};

export default Keybindings;
