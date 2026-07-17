(() => {
  const path =
    window.location.pathname.replace(/\/+$/, "");

  /*
    共通ヘッダー
  */
  const siteHeader =
    document.getElementById("site-header");

  if (siteHeader) {
    siteHeader.innerHTML = `
      <div class="container header-inner">
        <a class="site-title" href="/">
          wasab1
        </a>

        <nav>
          <a
            id="header-problems"
            href="/pages/problems.html"
          >
            Problems
          </a>

          <a
            id="header-articles"
            href="/pages/articles/"
          >
            Articles
          </a>
        </nav>
      </div>
    `;

    const problemsLink =
      document.getElementById("header-problems");

    const articlesLink =
      document.getElementById("header-articles");

    const isProblemsPage =
      path === "/pages/problems.html" ||
      path === "/pages/programming.html" ||
      /^\/pages\/[ACGN]-(value|written)\.html$/.test(path);

    const isArticlesPage =
      path === "/pages/articles" ||
      path.startsWith("/pages/articles/");

    if (isProblemsPage && problemsLink) {
      problemsLink.classList.add(
        "current-category"
      );

      problemsLink.setAttribute(
        "aria-current",
        "page"
      );
    }

    if (isArticlesPage && articlesLink) {
      articlesLink.classList.add(
        "current-category"
      );

      articlesLink.setAttribute(
        "aria-current",
        "page"
      );
    }
  }

  /*
    現在の分野と問題形式を取得する
  */
  const categoryMatch = path.match(
    /^\/pages\/([ACGN])-(value|written)\.html$/
  );

  const isProgrammingPage =
    path === "/pages/programming.html";

  if (!categoryMatch && !isProgrammingPage) {
    return;
  }

  let currentCategory;
  let currentMode;

  if (isProgrammingPage) {
    currentCategory = "P";
    currentMode = "value";
  } else {
    currentCategory = categoryMatch[1];
    currentMode = categoryMatch[2];
  }

  const problemsPage =
    document.querySelector(".problems-page");

  const pageHeader =
    problemsPage?.querySelector(".page-header");

  if (!problemsPage || !pageHeader) {
    return;
  }

  /*
    A / C / G / N / P のボタンを作る
  */
  const categoryNavigation =
    document.createElement("nav");

  categoryNavigation.className =
    "problem-category-navigation";

  categoryNavigation.setAttribute(
    "aria-label",
    "問題の分野"
  );

  const categories = [
    {
      code: "A",
      name: "Algebra"
    },
    {
      code: "C",
      name: "Combinatorics"
    },
    {
      code: "G",
      name: "Geometry"
    },
    {
      code: "N",
      name: "Number Theory"
    },
    {
      code: "P",
      name: "Programming"
    }
  ];

  categories.forEach(({ code, name }) => {
    const link = document.createElement("a");

    if (code === "P") {
      link.href = "/pages/programming.html";
    } else {
      link.href =
        `/pages/${code}-${currentMode}.html`;
    }

    link.textContent = code;
    link.title = name;
    link.setAttribute("aria-label", name);

    if (code === currentCategory) {
      link.classList.add(
        "current-problem-category"
      );

      link.setAttribute(
        "aria-current",
        "page"
      );
    }

    categoryNavigation.append(link);
  });

  /*
    求値問題・記述問題のボタンの直前に置く
  */
  const modeSwitch =
    pageHeader.querySelector(
      ".problem-mode-switch"
    );

  if (modeSwitch) {
    modeSwitch.before(categoryNavigation);
  } else {
    const pageTitle =
      pageHeader.querySelector("h1");

    if (pageTitle) {
      pageTitle.after(categoryNavigation);
    } else {
      pageHeader.append(categoryNavigation);
    }
  }
})();
