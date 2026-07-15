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
        summary.offsetHeight +
        paddingHeight +
        borderHeight;

      const animation = details.animate(
        {
          height: [
            `${startHeight}px`,
            `${endHeight}px`
          ]
        },
        {
          duration: 250,
          easing: "ease-in-out"
        }
      );

      animation.onfinish = () => {
        finishAnimation(false);
      };

      animation.oncancel = cleanup;
    } else {
      details.open = true;

      const endHeight =
        details.scrollHeight + borderHeight;

      const animation = details.animate(
        {
          height: [
            `${startHeight}px`,
            `${endHeight}px`
          ]
        },
        {
          duration: 250,
          easing: "ease-in-out"
        }
      );

      animation.onfinish = () => {
        finishAnimation(true);
      };

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
