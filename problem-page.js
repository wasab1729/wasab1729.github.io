(() => {
  const scriptUrl = document.currentScript?.src || window.location.href;
  const rootUrl = new URL("./", scriptUrl);
  const fileName = decodeURIComponent(
    window.location.pathname.split("/").pop() || ""
  );

  const categoryData = {
    A: {
      name: "Algebra",
      description: "wasab1が作った代数の問題"
    },
    C: {
      name: "Combinatorics",
      description: "wasab1が作った組合せ論の問題"
    },
    G: {
      name: "Geometry",
      description: "wasab1が作った幾何の問題"
    },
    N: {
      name: "Number Theory",
      description: "wasab1が作った整数論の問題"
    },
    P: {
      name: "Programming",
      description: "wasab1が作ったプログラミングの問題"
    }
  };

  const categoryMatch = fileName.match(
    /^([ACGN])-(value|written)\.html$/
  );
  const isProgrammingPage = fileName === "programming.html";

  if (!categoryMatch && !isProgrammingPage) {
    console.error("problem-page.js: 対応していないファイル名です。", fileName);
    return;
  }

  const categoryCode = isProgrammingPage ? "P" : categoryMatch[1];
  const mode = isProgrammingPage ? null : categoryMatch[2];
  const category = categoryData[categoryCode];
  const content = document.getElementById("problem-content");

  if (!content) {
    console.error("problem-page.js: #problem-content がありません。");
    return;
  }

  document.documentElement.lang = "ja";
  document.title = `${category.name} Problems | wasab1`;

  if (!document.querySelector('meta[name="viewport"]')) {
    const viewport = document.createElement("meta");
    viewport.name = "viewport";
    viewport.content = "width=device-width, initial-scale=1.0";
    document.head.append(viewport);
  }

  let description = document.querySelector('meta[name="description"]');
  if (!description) {
    description = document.createElement("meta");
    description.name = "description";
    document.head.append(description);
  }
  description.content = category.description;

  if (!document.querySelector('link[data-site-style="true"]')) {
    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = new URL("style.css", rootUrl).href;
    stylesheet.dataset.siteStyle = "true";
    document.head.append(stylesheet);
  }

  const header = document.createElement("header");
  header.id = "site-header";

  const main = document.createElement("main");
  main.className = "container problems-page";

  const pageHeader = document.createElement("div");
  pageHeader.className = "page-header";

  const back = document.createElement("p");
  const backLink = document.createElement("a");
  backLink.href = new URL("pages/problems.html", rootUrl).href;
  backLink.textContent = "← Problems";
  back.append(backLink);

  const title = document.createElement("h1");
  title.textContent = category.name;

  pageHeader.append(back, title);
  pageHeader.append(createCategoryNavigation());

  if (mode) {
    pageHeader.append(createModeSwitch());
  }

  main.append(pageHeader);

  while (content.firstChild) {
    main.append(content.firstChild);
  }

  const footer = document.createElement("footer");
  footer.innerHTML = `
    <div class="container">
      © 2026 wasab1
    </div>
  `;

  document.body.replaceChildren(header, main, footer);

  initializeProblemTitles();
  initializeSmoothDetails();
  loadCommonHeader();
  loadMathJax();

  function createCategoryNavigation() {
    const navigation = document.createElement("nav");
    navigation.className = "problem-category-navigation";
    navigation.setAttribute("aria-label", "問題の分野");

    for (const code of ["A", "C", "G", "N", "P"]) {
      const link = document.createElement("a");
      const data = categoryData[code];

      if (code === "P") {
        link.href = new URL("pages/programming.html", rootUrl).href;
      } else {
        const destinationMode = mode || "value";
        link.href = new URL(
          `pages/${code}-${destinationMode}.html`,
          rootUrl
        ).href;
      }

      link.textContent = code;
      link.title = data.name;
      link.setAttribute("aria-label", data.name);

      if (code === categoryCode) {
        link.classList.add("current-problem-category");
        link.setAttribute("aria-current", "page");
      }

      navigation.append(link);
    }

    return navigation;
  }

  function createModeSwitch() {
    const switcher = document.createElement("div");
    switcher.className = "problem-mode-switch";

    const valueLink = document.createElement("a");
    valueLink.href = new URL(
      `pages/${categoryCode}-value.html`,
      rootUrl
    ).href;
    valueLink.textContent = "求値問題";

    const writtenLink = document.createElement("a");
    writtenLink.href = new URL(
      `pages/${categoryCode}-written.html`,
      rootUrl
    ).href;
    writtenLink.textContent = "記述問題";

    const currentLink = mode === "value" ? valueLink : writtenLink;
    currentLink.classList.add("current-mode");
    currentLink.setAttribute("aria-current", "page");

    switcher.append(valueLink, writtenLink);
    return switcher;
  }

  function initializeProblemTitles() {
    document.querySelectorAll(".problems-page .problem").forEach(
      (problem, index) => {
        const problemTitle = problem.querySelector(".problem-title");

        if (!problemTitle || problemTitle.querySelector(".problem-number")) {
          return;
        }

        const number = document.createElement("span");
        number.className = "problem-number";
        number.textContent = `Problem ${index + 1} `;
        problemTitle.prepend(number);

        const rawDifficulty = Number(problem.dataset.difficulty);
        if (!Number.isInteger(rawDifficulty)) {
          return;
        }

        const difficulty = Math.min(5, Math.max(0, rawDifficulty));
        const rating = document.createElement("span");
        rating.className = "difficulty";
        rating.setAttribute("aria-label", `難易度 ${difficulty} / 5`);
        rating.title = `難易度 ${difficulty} / 5`;

        for (let i = 1; i <= 5; i += 1) {
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

        problemTitle.append(rating);
      }
    );
  }

  function initializeSmoothDetails() {
    document.querySelectorAll(".smooth-details").forEach((details) => {
      const summary = details.querySelector("summary");

      if (!summary) {
        return;
      }

      summary.addEventListener("click", (event) => {
        event.preventDefault();

        if (details.dataset.animating === "true") {
          return;
        }

        details.dataset.animating = "true";

        const startHeight = details.offsetHeight;
        const style = getComputedStyle(details);
        const borderHeight =
          parseFloat(style.borderTopWidth) +
          parseFloat(style.borderBottomWidth);
        const paddingHeight =
          parseFloat(style.paddingTop) +
          parseFloat(style.paddingBottom);

        details.style.height = `${startHeight}px`;
        details.style.overflow = "hidden";

        if (details.open) {
          const endHeight =
            summary.offsetHeight + paddingHeight + borderHeight;
          const animation = details.animate(
            { height: [`${startHeight}px`, `${endHeight}px`] },
            { duration: 250, easing: "ease-in-out" }
          );

          animation.onfinish = () => finishAnimation(false);
          animation.oncancel = cleanup;
        } else {
          details.open = true;
          const endHeight = details.scrollHeight + borderHeight;
          const animation = details.animate(
            { height: [`${startHeight}px`, `${endHeight}px`] },
            { duration: 250, easing: "ease-in-out" }
          );

          animation.onfinish = () => finishAnimation(true);
          animation.oncancel = cleanup;
        }

        function finishAnimation(open) {
          details.open = open;
          cleanup();
        }

        function cleanup() {
          details.style.height = "";
          details.style.overflow = "";
          delete details.dataset.animating;
        }
      });
    });
  }

  function loadCommonHeader() {
    const script = document.createElement("script");
    script.src = new URL("common-header.js", rootUrl).href;
    document.body.append(script);
  }

  function loadMathJax() {
    window.MathJax = {
      tex: {
        inlineMath: [["$", "$"]],
        displayMath: [["$$", "$$"]]
      }
    };

    const script = document.createElement("script");
    script.defer = true;
    script.src =
      "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
    document.head.append(script);
  }
})();
