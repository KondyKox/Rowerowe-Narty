const currentURL = window.location.href;

if (currentURL.includes("index.html")) {
  const container = document.querySelector(".container__login");

  const registerBtn = document.querySelector("#registerBtn");
  const loginBtn = document.querySelector("#loginBtn");

  registerBtn.addEventListener("click", () => {
    container.classList.add("active");
  });

  loginBtn.addEventListener("click", () => {
    container.classList.remove("active");
  });
}
