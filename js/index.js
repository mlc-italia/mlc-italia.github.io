// index.js - codice specifico per index.html
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });
}

// NOTA: la gestione del form è ora in forms.js
