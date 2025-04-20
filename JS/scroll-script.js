document.addEventListener("DOMContentLoaded", function () {
  const sectionsToAnimate = document.querySelectorAll(
    ".container-home, .about-container, .container-grup, .container-skills, .container-grup-skill-main, .container-projects"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  sectionsToAnimate.forEach((section) => {
    section.classList.add("hidden-scroll");
    observer.observe(section);
  });

  const skillBars = document.querySelectorAll(".skill-per");
  const skillsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.width =
            entry.target.getAttribute("data-percent") || "90%";
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  skillBars.forEach((bar) => {
    const percent = bar.querySelector(".tooltip").textContent;
    bar.setAttribute("data-percent", percent);
    bar.style.width = "0";
    skillsObserver.observe(bar);
  });
});
