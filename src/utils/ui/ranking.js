async function fetchAndDisplayRanking() {
  try {
    const response = await fetch("http://localhost:3000/api/users/ranking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const rankingData = await response.json();

      const rankingBody = document.querySelector(".ranking-list");
      rankingBody.innerHTML = "";

      rankingData.forEach((user, index) => {
        if (user.best_score !== 0) {
          const row = document.createElement("li");
          row.className = "ranking__item";
          row.innerHTML = `
                <span class="ranking__position">${index + 1}.</span>
                <span class="ranking__username">${user.username}</span>
                <span class="ranking__score">${user.best_score}</span>
            `;
          rankingBody.appendChild(row);
        }
      });
    } else {
      const errorData = await response.json();
      console.error("Error fetching ranking:", errorData.error);
    }
  } catch (error) {
    console.error("Error fetching ranking:", error);
  }
}

document.addEventListener("DOMContentLoaded", fetchAndDisplayRanking);
