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

      if (response.ok) console.log("User registered successfully!");
      else {
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

    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) console.log("Login successful!");
      else {
        const data = await response.json();
        console.error("Login error:", data.error);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  });
});
