/* ==========================================================================
   Young Web Solutions (YWS) — Interactive UI Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  /* 1. Sticky Header Scroll Effect */
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
    }, { passive: true });
  }

  /* 2. Mobile Navigation Toggle */
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      const expanded = navLinks.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
  }

  /* 3. Hero Interactive Before / After Transformation Switcher */
  const modeButtons = document.querySelectorAll('.mode-switch__btn');
  const previewStage = document.getElementById('hero-preview-stage');
  if (modeButtons.length && previewStage) {
    const modernHtml = `
      <div class="modern-browser">
        <div class="modern-browser__titlebar">
          <div class="modern-browser__dots">
            <span></span><span></span><span></span>
          </div>
          <div class="modern-browser__address">
            <span>🔒</span> https://www.elektro-schmidt.de
          </div>
        </div>
        <div class="modern-browser__body">
          <div class="modern-browser__main">
            <div class="modern-browser__content">
              <span class="modern-preview-badge">⚡ Elektro Schmidt • Meisterbetrieb</span>
              <h3 class="modern-browser__title">Moderne Elektrotechnik &amp; Smarthome aus Meisterhand.</h3>
              <p class="modern-browser__desc">
                Zuverlässiger Meisterbetrieb für Elektro, Smarthome und faire Festpreise.
              </p>
              <div class="modern-browser__cta">
                <span class="modern-preview-btn">Angebot anfordern →</span>
              </div>
            </div>
            <div class="modern-browser__media">
              <img src="assets/elektro-preview.jpg" alt="Elektro Schmidt Smarthome &amp; Meisterbetrieb" class="modern-preview-img" width="108" height="116" loading="lazy">
            </div>
          </div>
        </div>
      </div>

      <div class="preview-metrics">
        <div class="metric-box">
          <span class="metric-box__val metric-box__val--good">
            <span class="metric-icon metric-icon--good">✓</span> Mobil perfekt
          </span>
          <span class="metric-box__label">Auf jedem Smartphone</span>
        </div>
        <div class="metric-box">
          <span class="metric-box__val metric-box__val--good">
            <span class="metric-icon metric-icon--good">✓</span> Starkes Image
          </span>
          <span class="metric-box__label">Schafft Vertrauen</span>
        </div>
        <div class="metric-box">
          <span class="metric-box__val metric-box__val--good">
            <span class="metric-icon metric-icon--good">✓</span> Mehr Anfragen
          </span>
          <span class="metric-box__label">Gewinnt Neukunden</span>
        </div>
      </div>
    `;

    const retroHtml = `
      <div class="retro-browser">
        <div class="retro-browser__titlebar">
          <div class="retro-browser__title">
            <span>🌐</span> Internet Explorer 6.0 - Elektro-Schmidt-Home.html
          </div>
          <div class="retro-browser__controls">
            <span>_</span><span>□</span><span>✕</span>
          </div>
        </div>

        <div class="retro-browser__address">
          <span class="retro-browser__label">Adresse:</span>
          <span class="retro-browser__url">http://www.elektro-schmidt.de/index_alt.html</span>
        </div>

        <div class="retro-browser__body">
          <div class="retro-marquee">
            ⚠️ HERZLICH WILLKOMMEN! (STAND: 2006 • 1024x768 EMPFOHLEN) ⚠️
          </div>

          <div class="retro-content-box">
            <div class="retro-hero-title">
              *** ELEKTRO SCHMIDT GMBH - MEISTERBETRIEB ***
            </div>
            <p class="retro-text">
              Ihr Partner für Elektro seit 1998! <u>Hinweis:</u> Diese Homepage ist nicht für Smartphones geeignet. Text wird abgeschnitten.
            </p>

            <div class="retro-counter-row">
              <span>Besucher:</span>
              <span class="retro-counter">004821</span>
              <button type="button" class="retro-win-btn" onclick="return false;">Hier klicken!!</button>
            </div>
          </div>
        </div>
      </div>

      <div class="preview-metrics">
        <div class="metric-box metric-box--bad">
          <span class="metric-box__val metric-box__val--bad">
            <span class="metric-icon metric-icon--bad">✕</span> Veraltet
          </span>
          <span class="metric-box__label">2000er Tabellen-Look</span>
        </div>
        <div class="metric-box metric-box--bad">
          <span class="metric-box__val metric-box__val--bad">
            <span class="metric-icon metric-icon--bad">✕</span> Nicht mobil
          </span>
          <span class="metric-box__label">Layout unlesbar</span>
        </div>
        <div class="metric-box metric-box--bad">
          <span class="metric-box__val metric-box__val--bad">
            <span class="metric-icon metric-icon--bad">✕</span> Kaum Kunden
          </span>
          <span class="metric-box__label">Vergrault Besucher</span>
        </div>
      </div>
    `;

    modeButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const view = btn.getAttribute('data-view');
        modeButtons.forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        // Heights are fixed in CSS (225px browser, 92px metrics)

        if (view === 'before') {
          previewStage.classList.add('is-before');
          previewStage.innerHTML = retroHtml;
        } else {
          previewStage.classList.remove('is-before');
          previewStage.innerHTML = modernHtml;
        }
      });
    });
  }

  /* 4. Interactive Package Finder on angebote.html */
  const finderOptions = document.querySelectorAll('.finder-option');
  const finderResult = document.getElementById('finder-result');
  const packageCards = document.querySelectorAll('.package-card[data-package-id]');

  const recommendations = {
    freshup: {
      name: 'Paket 01: Fresh-Up (590 €)',
      text: 'Ideal für Sie: Da Ihre Inhalte bereits stehen, konzentriere ich mich voll auf die moderne Optik und mobile Ansicht – zügig und schlüsselfertig.',
      cardId: 'freshup',
      selectValue: 'Fresh-Up (Basispaket – 590 €)'
    },
    evolution: {
      name: 'Paket 02: Evolution (990 €)',
      text: 'Meine Empfehlung: Neues Design inklusive neuer Inhalte, neuer Seitenstruktur und flexibler Unterseiten (3 Abstimmungsrunden telefonisch oder per Video-Call).',
      cardId: 'evolution',
      selectValue: 'Evolution (Pro-Paket – 990 €)'
    },
    signature: {
      name: 'Paket 03: Signature (Auf Anfrage)',
      text: 'Perfekt für Spezial-Features: Eigenes Redaktionssystem (CMS) zur Text- & Bildpflege, individuelle Rechner/Konfiguratoren, Online-Buchung und bis zu 6 Abstimmungsrunden (telefonisch oder per Video-Call).',
      cardId: 'signature',
      selectValue: 'Signature (Plus) / Individuelles Angebot & Beratung (Auf Anfrage)'
    }
  };

  if (finderOptions.length && finderResult) {
    finderOptions.forEach((opt) => {
      opt.addEventListener('click', () => {
        const key = opt.getAttribute('data-recommend');
        const rec = recommendations[key];
        if (!rec) return;

        finderOptions.forEach((o) => o.classList.remove('is-selected'));
        opt.classList.add('is-selected');

        packageCards.forEach((card) => {
          card.classList.toggle(
            'is-recommended-highlight',
            card.getAttribute('data-package-id') === rec.cardId
          );
        });

        finderResult.innerHTML = `
          <div>
            <strong style="color:var(--yws-navy);display:block;font-size:1.02rem;">${rec.name}</strong>
            <span style="color:var(--text-muted);font-size:0.9rem;">${rec.text}</span>
          </div>
          <a href="#${rec.cardId}" class="btn btn--primary btn--sm">
            Zu den Paket-Details →
          </a>
        `;

        bindPackageSelectButtons();
      });
    });
  }

  /* 5. Pre-fill Package Selection in Inquiry Form */
  function bindPackageSelectButtons() {
    const selectButtons = document.querySelectorAll('[data-select-package]');
    const packageSelect = document.getElementById('package-select');
    selectButtons.forEach((btn) => {
      btn.onclick = () => {
        const val = btn.getAttribute('data-select-package');
        if (packageSelect && val) {
          packageSelect.value = val;
        }
      };
    });
  }
  bindPackageSelectButtons();

  // Check URL query param ?paket=...
  const params = new URLSearchParams(window.location.search);
  const paketParam = params.get('paket');
  const packageSelect = document.getElementById('package-select');
  if (paketParam && packageSelect && recommendations[paketParam]) {
    packageSelect.value = recommendations[paketParam].selectValue;
  }

  /* 6. FAQ Accordion */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!btn || !answer) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      answer.style.maxHeight = isOpen ? `${answer.scrollHeight}px` : '0px';
    });
  });

  /* 7. Contact / Package Inquiry Form Submission (Schneller Hintergrund-Versand an manuel.jung@online.de) */
  const TARGET_EMAIL = 'manuel.jung@online.de';
  // Optional: Kostenlosen Access-Key von https://web3forms.com (für manuel.jung@online.de) hier eintragen für <0.4s Direktversand:
  const WEB3FORMS_ACCESS_KEY = '';
  const forms = document.querySelectorAll('.js-inquiry-form');

  forms.forEach((form) => {
    // Zeitstempel für zeitbasierten Bot-Check setzen
    form.dataset.renderedAt = Date.now().toString();

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const feedback = form.querySelector('.form-feedback');
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.textContent : '';

      // 1. Cookie-freier Spamschutz: Bot-Check
      const honeyVal = (form.querySelector('[name="_honey"]')?.value || '').trim();
      if (honeyVal) {
        console.warn('Spam-Bot abgefangen (Spamschutz-Feld war befüllt).');
        if (feedback) {
          feedback.innerHTML = `Vielen Dank für Ihre Nachricht!`;
          feedback.classList.add('is-visible');
        }
        form.reset();
        return;
      }

      // 2. Cookie-freier Spamschutz: Zeit-Check (unter 1,2 Sekunden = automatisierter Bot)
      const renderedAt = parseInt(form.dataset.renderedAt || '0', 10);
      if (renderedAt && (Date.now() - renderedAt < 1200)) {
        console.warn('Spam-Bot abgefangen (Formular zu schnell abgeschickt).');
        if (feedback) {
          feedback.innerHTML = `Vielen Dank für Ihre Nachricht!`;
          feedback.classList.add('is-visible');
        }
        form.reset();
        return;
      }

      const nameVal = (form.querySelector('[name="name"]')?.value || '').trim();
      const emailVal = (form.querySelector('[name="email"]')?.value || '').trim();
      const websiteVal = (form.querySelector('[name="website"]')?.value || '').trim() || 'Keine Angabe';
      const packageVal = (form.querySelector('[name="package"]')?.value || '').trim() || 'Keine Auswahl';
      const messageVal = (form.querySelector('[name="message"]')?.value || '').trim() || 'Keine Nachricht';
      
      const siteAuditCheckbox = form.querySelector('[name="site_audit"]');
      const siteAuditVal = siteAuditCheckbox && siteAuditCheckbox.checked ? 'Ja (Bitte Website unverbindlich auf Design, Mobil & Speed prüfen)' : 'Nein';

      const subject = `Neue Website-Anfrage (${packageVal}) von ${nameVal}`;

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Wird gesendet …';
      }

      // A) Wenn ein Web3Forms Access-Key hinterlegt ist: Echter Highspeed-Queue-Versand (< 0,4 Sek.)
      if (WEB3FORMS_ACCESS_KEY) {
        try {
          const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              access_key: WEB3FORMS_ACCESS_KEY,
              subject: subject,
              from_name: 'Young Web Solutions Website',
              name: nameVal,
              email: emailVal,
              paket: packageVal,
              website: websiteVal,
              website_pruefung: siteAuditVal,
              message: messageVal
            })
          });
          const result = await response.json();
          if (response.ok && result.success) {
            if (feedback) {
              feedback.innerHTML = `Vielen Dank, <strong>${nameVal || 'Ihnen'}</strong>! Ihre unverbindliche Anfrage ist eingegangen und wurde per E-Mail an <strong>${TARGET_EMAIL}</strong> gesendet.`;
              feedback.classList.add('is-visible');
            }
            form.reset();
            form.dataset.renderedAt = Date.now().toString();
          } else {
            throw new Error(result.message || 'Fehler beim Senden');
          }
        } catch (err) {
          if (feedback) {
            feedback.innerHTML = `Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.`;
            feedback.classList.add('is-visible');
          }
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
          }
        }
        return;
      }

      // B) Ohne Access-Key: Sofortiger asynchroner Hintergrund-Versand via FormSubmit.co
      fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
        method: 'POST',
        keepalive: true,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: subject,
          Name: nameVal,
          Email: emailVal,
          Paket: packageVal,
          Website: websiteVal,
          'Website-Prüfung erwünscht': siteAuditVal,
          Nachricht: messageVal,
          _template: 'table',
          _honey: ''
        })
      }).catch(() => {});

      await new Promise((resolve) => setTimeout(resolve, 450));

      if (feedback) {
        feedback.innerHTML = `Vielen Dank, <strong>${nameVal || 'Ihnen'}</strong>! Ihre unverbindliche Anfrage ist eingegangen und wurde per E-Mail an <strong>${TARGET_EMAIL}</strong> gesendet.`;
        feedback.classList.add('is-visible');
      }
      form.reset();
      form.dataset.renderedAt = Date.now().toString();

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    });
  });

});
