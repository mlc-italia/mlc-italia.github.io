// forms.js - gestione form comune per index e contatti
const form = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

if (form && successMessage) {
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // blocca invio tradizionale
        const formData = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            if(response.ok){
                return response.text();
            } else {
                throw new Error('Server error');
            }
        })
        .then(text => {
            if(text.includes("success") || text.includes("successo")){
                successMessage.style.display = 'block'; // mostra messaggio
                form.reset(); // svuota il form
            } else {
                alert('Si è verificato un errore. Riprova.');
            }
        })
        .catch(() => {
            alert('Si è verificato un errore di rete. Riprova.');
        });
    });
}