window.addEventListener("load", function () {
  const home = document.getElementById(
    "home",
    "about",
    "skills",
    "projects",
    "contact"
  );

  home.classList.remove("loading");
  about.classList.remove("loading");
  skills.classList.remove("loading");
  projects.classList.remove("loading");
  contact.classList.remove("loading");

  // Mostra a imagem suavemente
  const img = home.querySelector(
    ".info-right img",
    "#about img",
    "#skills img",
    "#projects img",
    "#contact img"
  );
  img.forEach((img) => {
    img.style.opacity = "1";
  });
});
