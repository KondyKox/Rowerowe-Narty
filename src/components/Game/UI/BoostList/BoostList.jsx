import { useState } from "react";
import boosts from "../../../../data/boostsData.json";
import "./BoostList.css";

const BoostList = () => {
  const [pistolAmmo, setPistolAmmo] = useState(0);
  const [coins, setCoins] = useState(localStorage.getItem("coins") || 0);

  return (
    <ul className="ui__list">
      {boosts.map((boost, index) => {
        return (
          <li key={index} className={`ui__boost ${boost.className}`}>
            <img src={boost.src} alt={boost.name} className="boost" />
            {boost.name === "Pistol" ? (
              <sup className="ammo">{pistolAmmo}</sup>
            ) : null}
          </li>
        );
      })}
      <li className="ui__coins">
        <img src="./img/boosts/coin.png" alt="Coins" className="boost coin" />
        <sup className="coins">{coins}</sup>
      </li>
    </ul>
  );
};

export default BoostList;
