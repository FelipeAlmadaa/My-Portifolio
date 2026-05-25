document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    const headerHeight = document.querySelector("header").offsetHeight;

    window.scrollTo({
      top: targetElement.offsetTop - headerHeight,
      behavior: "smooth",
    });
  });
});

document.querySelectorAll('.card').forEach((card) => {
  card.addEventListener('click', function (e) {
    // Only toggle if the click wasn't on a button or link
    if (!e.target.closest('a') && !e.target.closest('button')) {
      this.classList.toggle('is-flipped');
    }
  });
});
