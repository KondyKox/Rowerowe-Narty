// import { getUserInfoFromToken } from "../../controllers/user.controller";
import { logoutUser } from "../auth.js";

const logoutBtn = document.querySelector("#logout");
const loginBtn = document.querySelector("#login");
const currentUser = document.querySelector(".currentUser");

const userEl = document.querySelector(".user");

// Change UI for logged in user
export const loggedInUserUI = async () => {
  // Get token to check if user is login
  const token = localStorage.getItem("token");

  try {
    // Verify the token
    const decodedTokenInfo = getUserInfoFromToken(token);

    if (decodedTokenInfo) {
      // Get username
      const username = decodedTokenInfo.username;

      userEl.textContent = username;

      // Styles
      currentUser.style.display = "block";

      logoutBtn.style.display = "block";
      loginBtn.style.display = "none";
    }
  } catch (error) {
    // Handle token verification error (for example, token expired)
    console.error("Token verification error:", error);

    // Optionally, clear the invalid token
    localStorage.removeItem("token");

    // User logout
    logoutUser();
  }
};

// UI for logged out user
export const loggedOutUserUI = () => {
  // Styles
  currentUser.style.display = "none";

  logoutBtn.style.display = "none";
  loginBtn.style.display = "block";
};
