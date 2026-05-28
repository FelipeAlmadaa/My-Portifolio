document.addEventListener("DOMContentLoaded", () => {
  const themeToggleBtn = document.getElementById("theme-toggle");
  const body = document.body;

  // Check if a theme is saved in localStorage
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    body.classList.add("light-mode");
    if (themeToggleBtn) themeToggleBtn.textContent = "🌑";
  } else {
    // Default is dark mode
    if (themeToggleBtn) themeToggleBtn.textContent = "☀️";
  }

  // Toggle function
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      body.classList.toggle("light-mode");

      const isLightMode = body.classList.contains("light-mode");

      if (isLightMode) {
        localStorage.setItem("theme", "light");
        themeToggleBtn.textContent = "🌑";
      } else {
        localStorage.setItem("theme", "dark");
        themeToggleBtn.textContent = "☀️";
      }

      // Re-initialize Vanta background with new theme colors
      if (typeof window.reinitVanta === "function") {
        window.reinitVanta();
      }
    });
  }
});
