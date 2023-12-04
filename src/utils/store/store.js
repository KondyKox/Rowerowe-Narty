import skinsData from "./skins.json";

// Generate skins on page
const skinsContainer = document.querySelector(".skins");

skinsData.forEach((skin) => {
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

  if (skin.price === 0) priceElement.textContent = skin.description;
  else
    priceElement.innerHTML = `${skin.description}: <span class="price-value">${skin.price}</span> <img src="./img/boosts/coin.png" alt="Skin price" />`;

  descriptionElement.appendChild(nameElement);
  descriptionElement.appendChild(priceElement);
  skinElement.appendChild(imgElement);
  skinElement.appendChild(descriptionElement);
  skinsContainer.appendChild(skinElement);
});

// Buy skins
const skinDivs = document.querySelectorAll(".skin");

// Get coins from localStorage
let coins = localStorage.getItem("coins");

skinDivs.forEach((skinDiv) => {
  const imgElement = skinDiv.querySelector("img");

  const nameElement = skinDiv.querySelector(".skin__name");
  const priceElement = skinDiv.querySelector(".price-value");

  imgElement.addEventListener("click", () => {
    const skinName = nameElement.textContent.trim().toLowerCase();
    const skinPrice = priceElement.textContent.trim();

    const confirmation = window.confirm(
      `Are you sure you want to buy: ${skinName}\nPrice: ${skinPrice}`
    );

    if (confirmation) {
      if (coins >= skinPrice) {
        coins -= parseInt(skinPrice);
        localStorage.setItem("playerSkin", skinName);

        alert("Skin purchased!");
      } else alert("You don't have money XD");
    } else alert("You don't want skins :(");
  });
});
