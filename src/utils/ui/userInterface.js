import { getUserInfoFromToken } from "../../controllers/user.controller";

const statsBtn = document.querySelector("#stats");
const logoutBtn = document.querySelector("#logout");
const loginBtn = document.querySelector("#login");
const currentUser = document.querySelector(".currentUser");

const userEl = document.querySelector(".user");

// Get token to check if user is login
const token = localStorage.getItem("token");

// Change UI for logged in user
if (token) {
  try {
    // Verify the token
    const decodedTokenInfo = getUserInfoFromToken(token);

    if (decodedTokenInfo) {
      // Get username
      const username = decodedTokenInfo.username;

      userEl.textContent = username;

      // Styles
      currentUser.style.display = "block";
      statsBtn.style.display = "block";

      logoutBtn.style.display = "block";
      loginBtn.style.display = "none";
    }
  } catch (error) {
    // Handle token verification error (for example, token expired)
    console.error("Token verification error:", error);

    // Optionally, clear the invalid token
    localStorage.removeItem("token");
  }
}

export { statsBtn, logoutBtn, loginBtn, currentUser };
