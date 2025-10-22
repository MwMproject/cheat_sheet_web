// =======================================
// Thème sombre / clair
// =======================================

// Sélecteurs
const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

// Récupère le thème sauvegardé dans localStorage
const savedTheme = localStorage.getItem("theme");

// Si un thème est déjà sauvegardé → l'applique
if (savedTheme === "light") {
  body.classList.add("light");
  toggleBtn.textContent = "☀️";
} else {
  toggleBtn.textContent = "🌙";
}

// Clique sur le bouton → bascule le thème
toggleBtn.addEventListener("click", () => {
  body.classList.toggle("light");

  if (body.classList.contains("light")) {
    toggleBtn.textContent = "☀️";
    localStorage.setItem("theme", "light");
  } else {
    toggleBtn.textContent = "🌙";
    localStorage.setItem("theme", "dark");
  }
});
