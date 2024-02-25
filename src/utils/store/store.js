import { skinsData } from "../../data/skins.js";

let areSkinsRendered = false;

const skinsContainer = document.querySelector(".skins");
const playerSkinKey = "playerSkin";
let coins = parseInt(localStorage.getItem("coins")) || 0;

// Generate skin
function createSkinElement(skin) {
  const skinElement = document.createElement("div");
  skinElement.classList.add("skin");

  const imgElement = document.createElement("img");
  imgElement.src = skin.imgSrc;
  imgElement.alt = `${skin.name} skin`;
  imgElement.classList.add("skin__img");

  const descriptionElement = document.createElement("div");
  descriptionElement.classList.add("skin__description");

  const nameElement = document.createElement("span");
  nameElement.classList.add("skin__name");
  nameElement.textContent = skin.name;

  const priceElement = document.createElement("span");
  priceElement.classList.add("skin__price");
  priceElement.innerHTML = `Price: <span class="price-value">${skin.price}</span> <img src="./public/img/boosts/coin.png" alt="Skin price" />`;

  descriptionElement.appendChild(nameElement);
  descriptionElement.appendChild(priceElement);
  skinElement.appendChild(imgElement);
  skinElement.appendChild(descriptionElement);

  return skinElement;
}

// Buy skin
function buySkin(skinElement) {
  const imgElement = skinElement.querySelector("img");
  const nameElement = skinElement.querySelector(".skin__name");
  const priceElement = skinElement.querySelector(".price-value");

  imgElement.addEventListener("click", () => {
    const skinName = nameElement.textContent.trim().toLowerCase();
    const skinPrice = parseInt(priceElement.textContent.trim());

    const confirmation = window.confirm(
      `Are you sure you want to buy: ${skinName}\nPrice: ${skinPrice}`
    );

    if (confirmation) {
      if (coins >= skinPrice) {
        coins -= skinPrice;
        localStorage.setItem(playerSkinKey, skinName);
        localStorage.setItem("coins", coins);
        alert("Skin purchased!");
      } else {
        alert("You don't have enough coins.");
      }
    }
  });
}

// Render skins list
export default function renderSkins() {
  if (areSkinsRendered) return;

  skinsData.forEach((skin) => {
    const skinElement = createSkinElement(skin);
    skinsContainer.appendChild(skinElement);
    buySkin(skinElement);
  });

  areSkinsRendered = true;
}
