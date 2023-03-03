export function UseScrollAnimation() {
  if (window.IntersectionObserver) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.children[0].classList.remove("animated");
          } else {
            entry.target.children[0].classList.add("animated");
          }
        });
      },
      { root: null, rootMargin: "0px 0px -100px 0px" }
    );
    document.querySelectorAll(".animation-wrapper").forEach((el) => {
      observer.observe(el);
    });
  }
}
