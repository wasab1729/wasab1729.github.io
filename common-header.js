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
    A / C / G / N の分野選択
  */
  const categoryMatch = path.match(
    /^\/pages\/([ACGN])-(value|written)\.html$/
  );

  /*
    分野別の問題ページでなければ
    ここから先は何もしない
  */
  if (!categoryMatch) {
    return;
  }

  const currentCategory = categoryMatch[1];
  const currentMode = categoryMatch[2];

  const problemsPage =
    document.querySelector(".problems-page");

  const pageHeader =
    problemsPage?.querySelector(".page-header");

  if (!problemsPage || !pageHeader) {
    return;
  }

  /*
    h1や求値・記述ボタンを置く左側と、
    分野選択を置く右側の枠を作る
  */
  const heading =
    document.createElement("div");

  heading.className = "problem-page-heading";

  pageHeader.before(heading);
  heading.append(pageHeader);

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
    }
  ];

  categories.forEach(({ code, name }) => {
    const link = document.createElement("a");

    /*
      求値ページなら求値ページへ、
      記述ページなら記述ページへ移動する
    */
    link.href =
      `/pages/${code}-${currentMode}.html`;

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

  heading.append(categoryNavigation);
})();
