// File created from inline scripts in chi-siamo.html
// No inline JavaScript was present, leave empty for future scripts.
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
	navMenu.classList.toggle('show');
});

// Form submission con messaggio inline
const form = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

form.addEventListener('submit', function(e){
	e.preventDefault(); // blocca il comportamento normale del form
	const formData = new FormData(form);

	fetch(form.action, {
		method: 'POST',
		body: formData,
		headers: { 'Accept': 'application/json' }
	})
	.then(response => {
		if(response.ok){
			successMessage.style.display = 'block'; // mostra il messaggio
			form.reset(); // svuota il form
		} else {
			alert('Si è verificato un errore. Riprova.');
		}
	})
	.catch(() => {
		alert('Si è verificato un errore di rete. Riprova.');
	});
});

