import {
  currentSection,
  sectionMain,
  sectionBack,
} from "./ui/changeSection.js";
import { loggedInUserUI, loggedOutUserUI } from "./ui/userInterface.js";

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.querySelector(".registerForm");
  const loginForm = document.querySelector(".loginForm");

  // Register
  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(registerForm);
    const userData = {};
    formData.forEach((value, key) => {
      userData[key] = value;
    });

    try {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        loginUser(userData);

        console.log("User registered successfully!");
      } else {
        const responseData = await response.json().catch(() => ({}));

        if (responseData && responseData.error)
          console.error("Registration error:", responseData.error);
        else console.error("Registration error: Empty response");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  });

  // Login
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(loginForm);
    const userData = {};
    formData.forEach((value, key) => {
      userData[key] = value;
    });

    loginUser(userData);
  });
});

// Login function
const loginUser = async (userData) => {
  try {
    const response = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);

      // Go to main section
      sectionMain.style.display = "block";
      sectionBack.classList.remove("active-section");
      currentSection.classList.remove("active-section");

      // UI for logged in user
      loggedInUserUI();

      console.log("Login successful!");
    } else {
      const data = await response.json();
      console.error("Login error:", data.error);
    }
  } catch (error) {
    console.error("Error during login:", error);
  }
};

// Logout function
export const logoutUser = async () => {
  try {
    // await logoutUserOnServer();

    localStorage.removeItem("token");

    // UI for logged out user
    loggedOutUserUI();

    console.log("Logout successful!");
  } catch (error) {
    console.error("Error during logout:", error);
  }
};
