(function () {
  const STORAGE_KEY = "mlc_cookie_preferences_v1";

  function getPreferences() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY));
    } catch {
      return null;
    }
  }

  function savePreferences(preferences) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        ...preferences,
        essential: true,
        savedAt: new Date().toISOString()
      })
    );
  }

  function createBanner() {
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
          <h2>Gestisci i cookie</h2>
          <p>
            Utilizziamo cookie essenziali per il corretto funzionamento del sito.
            Puoi scegliere se autorizzare anche eventuali cookie analitici anonimi
            e cookie non essenziali. Puoi modificare la scelta in qualsiasi momento.
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
        <button class="cookie-btn accept" id="acceptAllCookies">Accetta tutto</button>
        <button class="cookie-btn reject" id="rejectCookies">Rifiuta non essenziali</button>
        <button class="cookie-btn save" id="saveCookieChoices">Salva preferenze</button>
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

    return { overlay, banner, reopen };
  }

  function showBanner(overlay, banner) {
    overlay.classList.add("show");
    banner.classList.add("show");
  }

  function hideBanner(overlay, banner) {
    overlay.classList.remove("show");
    banner.classList.remove("show");
  }

  document.addEventListener("DOMContentLoaded", function () {
    const { overlay, banner, reopen } = createBanner();

    const analyticsInput = document.getElementById("cookieAnalytics");
    const marketingInput = document.getElementById("cookieMarketing");

    const existingPreferences = getPreferences();

    if (existingPreferences) {
      analyticsInput.checked = !!existingPreferences.analytics;
      marketingInput.checked = !!existingPreferences.marketing;
    } else {
      showBanner(overlay, banner);
    }

    document.getElementById("acceptAllCookies").addEventListener("click", function () {
      savePreferences({
        analytics: true,
        marketing: true
      });

      analyticsInput.checked = true;
      marketingInput.checked = true;
      hideBanner(overlay, banner);
    });

    document.getElementById("rejectCookies").addEventListener("click", function () {
      savePreferences({
        analytics: false,
        marketing: false
      });

      analyticsInput.checked = false;
      marketingInput.checked = false;
      hideBanner(overlay, banner);
    });

    document.getElementById("saveCookieChoices").addEventListener("click", function () {
      savePreferences({
        analytics: analyticsInput.checked,
        marketing: marketingInput.checked
      });

      hideBanner(overlay, banner);
    });

    reopen.addEventListener("click", function () {
      const preferences = getPreferences();

      if (preferences) {
        analyticsInput.checked = !!preferences.analytics;
        marketingInput.checked = !!preferences.marketing;
      }

      showBanner(overlay, banner);
    });
  });
})();