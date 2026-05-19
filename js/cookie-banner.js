(function () {
  const SESSION_KEY = "mlc_cookie_session_choice";

  function createBanner() {
    if (document.getElementById("cookieConsent")) return;

    const overlay = document.createElement("div");
    overlay.className = "cookie-consent-overlay";
    overlay.id = "cookieConsentOverlay";

    const banner = document.createElement("section");
    banner.className = "cookie-consent";
    banner.id = "cookieConsent";
    banner.setAttribute("aria-label", "Preferenze cookie");

    banner.innerHTML = `
      <div class="cookie-consent-header">
        <div>
          <h2>Privacy e Cookie</h2>
          <p>
            Utilizziamo cookie essenziali per il corretto funzionamento del sito.
            Puoi scegliere se autorizzare anche eventuali cookie analitici anonimi
            e cookie non essenziali.
          </p>
        </div>

        <div class="cookie-badge">MLC Privacy</div>
      </div>

      <div class="cookie-options">
        <div class="cookie-option">
          <strong>Cookie essenziali</strong>
          <span>Necessari per navigazione, sicurezza e funzioni base del sito.</span>
          <label class="cookie-toggle disabled">
            <input type="checkbox" checked disabled>
            Sempre attivi
          </label>
        </div>

        <div class="cookie-option">
          <strong>Cookie analitici</strong>
          <span>Eventuali dati aggregati e anonimi per migliorare il sito.</span>
          <label class="cookie-toggle">
            <input type="checkbox" id="cookieAnalytics">
            Accetto
          </label>
        </div>

        <div class="cookie-option">
          <strong>Cookie marketing</strong>
          <span>Non attivi ora, ma gestiti in caso di future implementazioni.</span>
          <label class="cookie-toggle">
            <input type="checkbox" id="cookieMarketing">
            Accetto
          </label>
        </div>
      </div>

      <div class="cookie-actions">
        <button class="cookie-btn accept" id="acceptAllCookies" type="button">Accetta tutto</button>
        <button class="cookie-btn reject" id="rejectCookies" type="button">Rifiuta non essenziali</button>
        <button class="cookie-btn save" id="saveCookieChoices" type="button">Salva preferenze</button>
      </div>

      <div class="cookie-links">
        Leggi la <a href="cookie-policy.html">Cookie Policy</a> e la
        <a href="privacy.html">Privacy Policy</a>.
      </div>
    `;

    const reopen = document.createElement("button");
    reopen.className = "cookie-preferences-link";
    reopen.id = "openCookiePreferences";
    reopen.type = "button";
    reopen.textContent = "Cookie";

    document.body.appendChild(overlay);
    document.body.appendChild(banner);
    document.body.appendChild(reopen);

    const analyticsInput = document.getElementById("cookieAnalytics");
    const marketingInput = document.getElementById("cookieMarketing");

    function showBanner() {
      overlay.classList.add("show");
      banner.classList.add("show");
    }

    function hideBanner() {
      overlay.classList.remove("show");
      banner.classList.remove("show");
    }

    function saveSessionChoice(analytics, marketing) {
      sessionStorage.setItem(
        SESSION_KEY,
        JSON.stringify({
          essential: true,
          analytics,
          marketing,
          savedAt: new Date().toISOString()
        })
      );
    }

    document.getElementById("acceptAllCookies").addEventListener("click", function () {
      analyticsInput.checked = true;
      marketingInput.checked = true;
      saveSessionChoice(true, true);
      hideBanner();
    });

    document.getElementById("rejectCookies").addEventListener("click", function () {
      analyticsInput.checked = false;
      marketingInput.checked = false;
      saveSessionChoice(false, false);
      hideBanner();
    });

    document.getElementById("saveCookieChoices").addEventListener("click", function () {
      saveSessionChoice(analyticsInput.checked, marketingInput.checked);
      hideBanner();
    });

    reopen.addEventListener("click", function () {
      showBanner();
    });

    if (!sessionStorage.getItem(SESSION_KEY)) {
      showBanner();
    }
  }

  document.addEventListener("DOMContentLoaded", createBanner);
})();