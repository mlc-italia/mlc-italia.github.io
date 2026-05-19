async function loadComponent(id, file) {
  const element = document.getElementById(id);

  if (!element) return;

  const response = await fetch(file);
  const html = await response.text();

  element.innerHTML = html;
}

function initHeaderMenu() {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  if (!hamburger || !navMenu) return;

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });
}

function setActivePage() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const links = document.querySelectorAll(".main-nav a");

  links.forEach((link) => {
    const href = link.getAttribute("href");

    if (href === currentPage) {
      link.classList.add("active-link");
    }
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadComponent("header-placeholder", "header.html");
  await loadComponent("footer-placeholder", "footer.html");

  initHeaderMenu();
  setActivePage();
});