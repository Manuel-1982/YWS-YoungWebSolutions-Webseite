/**
 * GEGEN DEN STROM – ELEKTROTECHNIK & SYSTEMINTEGRATION
 * Interactive Engineering UI, Load Calculator, Filter & Booking Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  /* --------------------------------------------------------------------------
     1. STICKY HEADER & MOBILE MENU
     -------------------------------------------------------------------------- */
  const siteHeader = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  const handleScroll = () => {
    if (!siteHeader) return;
    if (window.scrollY > 20) {
      siteHeader.classList.add('is-scrolled');
    } else {
      siteHeader.classList.remove('is-scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
    });

    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* --------------------------------------------------------------------------
     2. INTERACTIVE ELECTRICAL LOAD & SYSTEM CALCULATOR (NETZLAST-RECHNER)
     -------------------------------------------------------------------------- */
  const moduleButtons = document.querySelectorAll('.calc-module-btn');
  const totalKwEl = document.getElementById('calc-total-kw');
  const ampEl = document.getElementById('calc-ampere');
  const normEl = document.getElementById('calc-norm-code');
  const gridModeEl = document.getElementById('calc-grid-mode');
  const meterFill = document.getElementById('calc-meter-fill');
  const transferBtn = document.getElementById('calc-transfer-btn');

  const updateCalculator = () => {
    if (!moduleButtons.length || !totalKwEl) return;

    let sumKw = 14.5; // Grundlast Gebäude (kW)
    const activeModules = [];

    moduleButtons.forEach(btn => {
      if (btn.classList.contains('is-active')) {
        const kw = parseFloat(btn.getAttribute('data-kw') || '0');
        const label = btn.getAttribute('data-label') || '';
        sumKw += kw;
        if (label) activeModules.push(label);
      }
    });

    // Gleichzeitigkeitsfaktor (Engineering-Berechnung)
    const effectiveKw = +(sumKw * 0.78).toFixed(1);
    // I = P / (sqrt(3) * 400V * cosPhi(0.92))
    const calculatedAmp = Math.ceil((effectiveKw * 1000) / (1.732 * 400 * 0.92));

    let fuseRating = '35 A (SLS)';
    let normString = 'VDE-AR-N 4100';
    let modeString = 'Direktmessung <= 44A';

    if (calculatedAmp > 44 && calculatedAmp <= 63) {
      fuseRating = '50 A / 63 A (SLS)';
      normString = 'DIN VDE 0100-722';
      modeString = 'Dynamisches Lastmanagement';
    } else if (calculatedAmp > 63 && calculatedAmp <= 100) {
      fuseRating = '80 A / 100 A (NH)';
      normString = 'DIN EN 61439-2';
      modeString = 'Wandlermessung erforderlich';
    } else if (calculatedAmp > 100) {
      fuseRating = '125 A+ (Industriefeld)';
      normString = 'VDE-AR-N 4110 (MS)';
      modeString = 'Lastgang- & Trafokopplung';
    }

    totalKwEl.textContent = `${effectiveKw.toFixed(1)} kW`;
    if (ampEl) ampEl.textContent = fuseRating;
    if (normEl) normEl.textContent = normString;
    if (gridModeEl) gridModeEl.textContent = modeString;

    if (meterFill) {
      const pct = Math.min(100, Math.max(15, Math.round((effectiveKw / 85) * 100)));
      meterFill.style.width = `${pct}%`;
    }

    if (transferBtn) {
      transferBtn.setAttribute(
        'data-summary',
        `Systemkonfiguration (${effectiveKw} kW Effektivlast | ${fuseRating}): ${activeModules.join(', ') || 'Basis-Gebäudeverteilung'}`
      );
    }
  };

  moduleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('is-active');
      const pressed = btn.classList.contains('is-active');
      btn.setAttribute('aria-pressed', String(pressed));
      updateCalculator();
    });
  });

  if (transferBtn) {
    transferBtn.addEventListener('click', () => {
      const summary = transferBtn.getAttribute('data-summary') || '';
      const messageField = document.getElementById('contact-message');
      if (messageField && summary) {
        messageField.value = `[TECHNISCHE KONFIGURATION AUS NETZLAST-RECHNER]\n${summary}\n\nBitte um Rückmeldung zur technischen Auslegung / Vor-Ort-Prüfung.`;
      }
    });
  }

  updateCalculator();

  /* --------------------------------------------------------------------------
     3. PROJECT REFERENCE MATRIX FILTER
     -------------------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filterValue = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });

  /* --------------------------------------------------------------------------
     4. ONLINE APPOINTMENT & TECHNICAL INSPECTION BOOKING
     -------------------------------------------------------------------------- */
  const slotButtons = document.querySelectorAll('.slot-btn');
  const selectedSlotInput = document.getElementById('booking-slot-input');
  const bookingForm = document.getElementById('booking-form');
  const bookingFeedback = document.getElementById('booking-feedback');
  const bookingDateInput = document.getElementById('booking-date');

  if (bookingDateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    bookingDateInput.min = `${yyyy}-${mm}-${dd}`;
    if (!bookingDateInput.value) {
      bookingDateInput.value = `${yyyy}-${mm}-${dd}`;
    }
  }

  slotButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      slotButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      if (selectedSlotInput) {
        selectedSlotInput.value = btn.getAttribute('data-slot') || '';
      }
    });
  });

  if (bookingForm && bookingFeedback) {
    bookingForm.addEventListener('submit', e => {
      e.preventDefault();
      const service = document.getElementById('booking-service')?.value || 'Systemanalyse';
      const dateVal = document.getElementById('booking-date')?.value || 'Wunschtermin';
      const slotVal = selectedSlotInput?.value || '09:00 - 11:00 Uhr';
      const nameVal = document.getElementById('booking-name')?.value || 'Kunde';
      const ticketId = `GDS-${Math.floor(100000 + Math.random() * 900000)}`;

      bookingFeedback.className = 'form-feedback success';
      bookingFeedback.innerHTML = `
        <strong>[TERMIN-TICKET ${ticketId} REGISTRIERT]</strong><br>
        Vielen Dank, ${nameVal}. Ihr Terminwunsch für <em>${service}</em> am <strong>${dateVal} (${slotVal})</strong> wurde im Leitstand vorgemerkt. Ein Projektingenieur bestätigt den Termin telefonisch innerhalb von 2 Werktagen.
      `;
    });
  }

  /* --------------------------------------------------------------------------
     5. TECHNICAL FAQ ACCORDION
     -------------------------------------------------------------------------- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    if (trigger && content) {
      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');

        faqItems.forEach(other => {
          other.classList.remove('is-open');
          const otherContent = other.querySelector('.faq-content');
          const otherTrigger = other.querySelector('.faq-trigger');
          if (otherContent) otherContent.style.maxHeight = null;
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
          item.classList.add('is-open');
          content.style.maxHeight = `${content.scrollHeight}px`;
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  /* --------------------------------------------------------------------------
     6. CONTACT FORM HANDLING
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const contactFeedback = document.getElementById('contact-feedback');

  if (contactForm && contactFeedback) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const sender = document.getElementById('contact-name')?.value || 'Anfragender';
      const subject = document.getElementById('contact-subject')?.value || 'Projektanfrage';
      const protocolNo = `PRJ-2026-${Math.floor(1000 + Math.random() * 9000)}`;

      contactFeedback.className = 'form-feedback success';
      contactFeedback.innerHTML = `
        <strong>[ÜBERTRAGUNG ERFOLGREICH // PROTOKOLL-NR. ${protocolNo}]</strong><br>
        Sehr geehrte(r) ${sender}, Ihre Anfrage zum Bereich „${subject}“ ist in unserer Projektleitung eingegangen. Wir melden uns kurzfristig mit einer fundierten Ersteinschätzung.
      `;
      contactForm.reset();
    });
  }
});
