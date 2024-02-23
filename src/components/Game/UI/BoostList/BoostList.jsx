import { useState } from "react";
import boosts from "../../../../data/boostsData.json";
import "./BoostList.css";

const BoostList = () => {
  const [pistolAmmo, setPistolAmmo] = useState(0);
  const [coins, setCoins] = useState(localStorage.getItem("coins") || 0);

  return (
    <ul className="ui__list">
      {boosts.map((boost, index) => {
        return boost.isActive ? (
          <li key={index} className={`ui__boost ${boost.className}`}>
            <img src={boost.src} alt={boost.name} className="boost" />
            {boost.name === "Pistol" ? (
              <sup className="ammo">{pistolAmmo}</sup>
            ) : boost.name === "Coins" ? (
              <sup className="coin">{coins}</sup>
            ) : null}
          </li>
        ) : null;
      })}
    </ul>
  );
};

export default BoostList;
