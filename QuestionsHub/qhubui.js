document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebar");
    const hamburger = document.getElementById("hamburger");
    const themeToggleBtn = document.getElementById("theme-toggle");

    // Sidebar toggle
    if (hamburger && sidebar) {
        hamburger.addEventListener("click", (e) => {
            e.stopPropagation();
            sidebar.classList.toggle("open");
        });

        document.addEventListener("click", (e) => {
            if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
                sidebar.classList.remove("open");
            }
        });
    }

    // Theme toggle cycle: light → dim → dark → light
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            const current = document.documentElement.getAttribute("data-theme");
            let next = "light";
            if (current === "light") next = "dim";
            else if (current === "dim") next = "dark";
            document.documentElement.setAttribute("data-theme", next);
        });
    }
});

function toggleDropdown(id) {
  const allTopics = document.querySelectorAll(".topic");
  allTopics.forEach(topic => {
    // Collapse all topics except the one clicked
    if (topic.querySelector(`#${id}`) === null) {
      topic.classList.remove("active");
    }
  });

  // Toggle the selected one
  const element = document.getElementById(id);
  const parent = element.parentElement;
  parent.classList.toggle("active");
}


// Auto-close sidebar on difficulty button click (mobile only)
document.querySelectorAll(".difficulty-dropdown button").forEach(btn => {
  btn.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      const sidebar = document.getElementById("sidebar");
      sidebar.classList.remove("open");
    }
  });
});
