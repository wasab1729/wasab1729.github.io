document.querySelectorAll(".problems-page .problem").forEach(
  (problem, index) => {
    const title = problem.querySelector(".problem-title");

    if (!title) {
      return;
    }

    // Problem 1, Problem 2, ... を追加する
    const number = document.createElement("span");
    number.className = "problem-number";
    number.textContent = `Problem ${index + 1} `;

    title.prepend(number);

    // data-difficulty の値を取得する
    const difficultyValue = Number(problem.dataset.difficulty);

    if (!Number.isInteger(difficultyValue)) {
      return;
    }

    const difficulty = Math.min(
      5,
      Math.max(0, difficultyValue)
    );

    // 難易度表示を作る
    const rating = document.createElement("span");
    rating.className = "difficulty";
    rating.setAttribute(
      "aria-label",
      `難易度 ${difficulty} / 5`
    );
    rating.title = `難易度 ${difficulty} / 5`;

    for (let i = 1; i <= 5; i++) {
      const star = document.createElement("span");
      star.className = "difficulty-star";

      if (i <= difficulty) {
        star.textContent = "★";
        star.classList.add("is-filled");
      } else {
        star.textContent = "☆";
      }

      rating.append(star);
    }

    title.append(rating);
  }
);
