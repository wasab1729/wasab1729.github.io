document.querySelectorAll(".problems-page .problem").forEach(
  (problem, index) => {
    const title = problem.querySelector(".problem-title");

    if (!title) {
      return;
    }

    const number = document.createElement("span");
    number.className = "problem-number";
    number.textContent = `Problem ${index + 1} `;

    title.prepend(number);
  }
);
