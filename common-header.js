const siteHeader = document.getElementById("site-header");

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

  const path = window.location.pathname;

  const problemsLink =
    document.getElementById("header-problems");

  const articlesLink =
    document.getElementById("header-articles");

const isProblemsPage =
  path === "/pages/problems.html" ||
  path === "/pages/programming.html" ||
  /^\/pages\/[ACGN]-(value|written)\.html$/.test(path);

  const isArticlesPage =
    path.startsWith("/pages/articles/");

  if (isProblemsPage && problemsLink) {
    problemsLink.classList.add("current-category");
    problemsLink.setAttribute("aria-current", "page");
  }

  if (isArticlesPage && articlesLink) {
    articlesLink.classList.add("current-category");
    articlesLink.setAttribute("aria-current", "page");
  }
}
