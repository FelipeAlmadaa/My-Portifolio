window.addEventListener("load", function () {
  // Remove loading state from all sections
  const sections = document.querySelectorAll("#home, #about, #skills, #projects, #contact");
  sections.forEach((el) => el.classList.remove("loading"));

  // Fade in profile images smoothly
  const imgs = document.querySelectorAll(".info-right img, .photo-wrapper img");
  imgs.forEach((img) => {
    img.style.opacity = "1";
  });
});
