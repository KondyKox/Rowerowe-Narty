import { useState } from "react";
import skins from "../../data/skinsData.json";
import "./Store.css";

const Store = () => {
  const [coins, setCoins] = useState(localStorage.getItem("coins") || 0);

  // Buy skin
  const buySkin = (skinName, skinPrice) => {
    const confirmation = window.confirm(
      `Are you sure you want to buy: ${skinName}\nPrice: ${skinPrice}`
    );

    if (confirmation) {
      if (coins >= skinPrice) {
        setCoins(coins - skinPrice);
        localStorage.setItem("playerSkin", skinName);
        
        alert("Skin purchased!");
      } else {
        alert("You don't have enough money XD");
      }
    } else {
      alert("You don't want skins :(");
    }
  };

  return (
    <div id="sectionStore" className="container__section">
      <div className="container__store">
        <div className="skins">
          {skins.map((skin, index) => (
            <div key={index} className="skin">
              <img
                src={skin.imgSrc}
                alt={`${skin.name} skin`}
                className="skin__img"
              />
              <div className="skin__description">
                <span className="skin__name">{skin.name}</span>
                <span className="skin__price">
                  Price: <span className="price-value">{skin.price}</span>{" "}
                  <img src="./img/boosts/coin.png" alt="Skin price" />
                </span>
              </div>

              <button
                className="btn store__btn"
                onClick={() => buySkin(skin.name, skin.price)}
              >
                buy
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Store;
