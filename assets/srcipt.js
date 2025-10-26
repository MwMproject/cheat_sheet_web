document.addEventListener("DOMContentLoaded", () => {
  // ---------- Thème sombre / clair ----------
  const toggleBtn = document.getElementById("theme-toggle");
  const body = document.body;

  // Détermine le thème initial
  const savedTheme = localStorage.getItem("theme");
  const prefersLight =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: light)").matches;
  const initialTheme = savedTheme || (prefersLight ? "light" : "dark");
  // Applique le thème
  const applyTheme = (theme) => {
    body.classList.toggle("light", theme === "light");
    if (toggleBtn) toggleBtn.textContent = theme === "light" ? "☀️" : "🌙";
    localStorage.setItem("theme", theme);
  };
  // Initialisation
  applyTheme(initialTheme);
  // Gestion du clic sur le bouton
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const next = body.classList.contains("light") ? "dark" : "light";
      applyTheme(next);
    });
  }

  // ---------- Navigation par menu déroulant ----------
  const select = document.getElementById("section-select");
  const sections = Array.from(document.querySelectorAll(".tab-content"));
  // Fonction pour afficher une section donnée
  const showSection = (id) => {
    sections.forEach((sec) => {
      sec.style.display = sec.id === id ? "block" : "none";
    });
    if (select) select.value = id;
    // Mémorise la section et maj l’URL (#ancre) sans recharger
    localStorage.setItem("activeSection", id);
    history.replaceState(null, "", `#${id}`);
  };

  // Initialisation: depuis #hash, localStorage ou "intro"
  const fromHash = location.hash?.replace("#", "");
  const fromStorage = localStorage.getItem("activeSection");
  const defaultId = fromHash || fromStorage || sections[0]?.id || "intro";
  showSection(defaultId);
  // Gestion du changement via le menu déroulant
  if (select) {
    select.addEventListener("change", (e) => {
      const id = e.target.value;
      if (document.getElementById(id)) showSection(id);
    });
  }

  // Si l’utilisateur change le hash manuellement
  window.addEventListener("hashchange", () => {
    const id = location.hash.replace("#", "");
    if (document.getElementById(id)) showSection(id);
  });
});
