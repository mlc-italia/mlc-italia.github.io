const privacyBanner = document.getElementById('privacy-banner');
const privacyAcceptButton = document.getElementById('privacy-accept');
const privacyConsentKey = 'privacyAccepted_v3';

if (privacyBanner) {
    const hasAcceptedPrivacy = localStorage.getItem(privacyConsentKey) === 'true';

    if (hasAcceptedPrivacy) {
        privacyBanner.hidden = true;
        document.body.classList.remove('has-privacy-banner');
    } else {
        privacyBanner.hidden = false;
        document.body.classList.add('has-privacy-banner');
    }

    if (privacyAcceptButton) {
        privacyAcceptButton.addEventListener('click', () => {
            localStorage.setItem(privacyConsentKey, 'true');
            privacyBanner.hidden = true;
            document.body.classList.remove('has-privacy-banner');
        });
    }
}
