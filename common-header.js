(() => {
  const scriptUrl = document.currentScript?.src || window.location.href;
  const rootUrl = new URL("./", scriptUrl);
  const siteHeader = document.getElementById("site-header");

  if (!siteHeader) {
    return;
  }

  const homeUrl = new URL("index.html", rootUrl).href;
  const problemsUrl = new URL("pages/problems.html", rootUrl).href;
  const articlesUrl = new URL("pages/articles/", rootUrl).href;

  siteHeader.innerHTML = `
    <div class="container header-inner">
      <a class="site-title" href="${homeUrl}">
        wasab1
      </a>

      <nav>
        <a id="header-problems" href="${problemsUrl}">
          Problemsおおお
        </a>

        <a id="header-articles" href="${articlesUrl}">
          Articles
        </a>
      </nav>
    </div>
  `;

  const fileName = decodeURIComponent(
    window.location.pathname.split("/").pop() || ""
  );
  const path = window.location.pathname.replace(/\/+$/, "");

  const isProblemsPage =
    fileName === "problems.html" ||
    fileName === "programming.html" ||
    /^[ACGN]-(value|written)\.html$/.test(fileName);

  const isArticlesPage =
    path.includes("/pages/articles") ||
    fileName === "first-article.html";

  const problemsLink = document.getElementById("header-problems");
  const articlesLink = document.getElementById("header-articles");

  if (isProblemsPage && problemsLink) {
    problemsLink.classList.add("current-category");
    problemsLink.setAttribute("aria-current", "page");
  }

  if (isArticlesPage && articlesLink) {
    articlesLink.classList.add("current-category");
    articlesLink.setAttribute("aria-current", "page");
  }
})();
