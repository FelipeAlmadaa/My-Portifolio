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

  // Track cards for mobile center-screen hint visibility
  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-center");
        } else {
          entry.target.classList.remove("is-center");
        }
      });
    },
    {
      // Triggers when the element overlaps the middle 20% of the viewport height
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    }
  );

  document.querySelectorAll(".card").forEach((card) => {
    cardObserver.observe(card);
  });
});
