/**
 * FOTO & MEDIENSTUDIO MUSTERXXX (foto-medienstudio-musterxxx.de)
 * Interaktive Funktionen: Visual Storytelling, Galerie-Filter & Lightbox,
 * Studio-Terminbuchungs-Konfigurator, FAQ-Accordion & Formular-Feedback.
 * 100% DSGVO-konform | Zero Cookies | Keine externen Tracker
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     1. STICKY HEADER & MOBILE NAVIGATION
     ========================================================================== */
  const header = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  const handleScroll = () => {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
    });

    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ==========================================================================
     2. CAMERA VIEWFINDER LIVE TIMECODE SIMULATION
     ========================================================================== */
  const timecodeEl = document.getElementById('live-timecode');
  if (timecodeEl) {
    let frames = 14;
    let seconds = 28;
    let minutes = 4;
    setInterval(() => {
      frames = (frames + 1) % 25;
      if (frames === 0) {
        seconds = (seconds + 1) % 60;
        if (seconds === 0) {
          minutes = (minutes + 1) % 60;
        }
      }
      const pad = (n) => String(n).padStart(2, '0');
      timecodeEl.textContent = `01:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`;
    }, 120);
  }

  /* ==========================================================================
     3. PROJEKT- & DETAIL-GALERIE FILTER + LIGHTBOX MODAL
     ========================================================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');
        galleryItems.forEach((item) => {
          const itemCategory = item.getAttribute('data-category');
          if (filterValue === 'all' || itemCategory === filterValue) {
            item.classList.remove('hidden');
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });
  }

  // Lightbox Modal
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-image');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxMeta = document.getElementById('lightbox-meta');
  const lightboxClose = document.getElementById('lightbox-close');

  if (lightbox && lightboxImg) {
    galleryItems.forEach((item) => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const title = item.querySelector('.gallery-title');
        const meta = item.querySelector('.gallery-meta');
        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
        }
        if (lightboxTitle && title) lightboxTitle.textContent = title.textContent;
        if (lightboxMeta && meta) lightboxMeta.textContent = meta.textContent;
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      lightbox.setAttribute('aria-hidden', 'true');
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  /* ==========================================================================
     4. INTERAKTIVER STUDIO- & TERMINBUCHUNGS-KONFIGURATOR
     ========================================================================== */
  const productionBtns = document.querySelectorAll('[data-production]');
  const locationBtns = document.querySelectorAll('[data-location]');
  const addonCheckboxes = document.querySelectorAll('.booking-addon-checkbox');
  const summaryTitle = document.getElementById('booking-summary-type');
  const summaryLocation = document.getElementById('booking-summary-location');
  const summaryDuration = document.getElementById('booking-summary-duration');
  const summaryPrice = document.getElementById('booking-summary-price');
  const bookingForm = document.getElementById('studio-booking-form');
  const bookingFeedback = document.getElementById('booking-feedback');

  let currentBasePrice = 490;
  let currentLocationFee = 0;

  const updateBookingSummary = () => {
    if (!summaryPrice) return;
    let addonsTotal = 0;
    addonCheckboxes.forEach((cb) => {
      if (cb.checked) {
        addonsTotal += Number(cb.getAttribute('data-price') || 0);
      }
    });
    const total = currentBasePrice + currentLocationFee + addonsTotal;
    summaryPrice.textContent = `ab ${total.toLocaleString('de-DE')} €`;
  };

  if (productionBtns.length > 0) {
    productionBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        productionBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        currentBasePrice = Number(btn.getAttribute('data-price') || 490);
        if (summaryTitle) summaryTitle.textContent = btn.getAttribute('data-production') || '';
        if (summaryDuration) summaryDuration.textContent = btn.getAttribute('data-duration') || '';
        updateBookingSummary();
      });
    });
  }

  if (locationBtns.length > 0) {
    locationBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        locationBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        currentLocationFee = Number(btn.getAttribute('data-fee') || 0);
        if (summaryLocation) summaryLocation.textContent = btn.getAttribute('data-location') || '';
        updateBookingSummary();
      });
    });
  }

  if (addonCheckboxes.length > 0) {
    addonCheckboxes.forEach((cb) => {
      cb.addEventListener('change', updateBookingSummary);
    });
  }

  if (bookingForm && bookingFeedback) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const dateInput = document.getElementById('booking-date');
      const timeInput = document.getElementById('booking-time');
      const nameInput = document.getElementById('booking-name');
      const chosenDate = dateInput && dateInput.value ? dateInput.value : 'Ihrem Wunschtermin';
      const chosenTime = timeInput && timeInput.value ? timeInput.value : '10:00 Uhr';
      const clientName = nameInput && nameInput.value ? nameInput.value : 'Interessent/in';

      bookingFeedback.innerHTML = `
        <strong>✓ Studio-Terminanfrage vorgemerkt!</strong><br>
        Vielen Dank, ${clientName}. Wir haben Ihre Konfigurationsanfrage für den <strong>${chosenDate} (${chosenTime})</strong> im Foto & Medienstudio MusterXXX erhalten. Max Mustermann meldet sich innerhalb von 24 Stunden zur finalen Set-Abstimmung bei Ihnen.
      `;
      bookingFeedback.classList.add('visible');
      bookingForm.reset();
    });
  }

  /* ==========================================================================
     5. FAQ ACCORDION
     ========================================================================== */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');
    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');
      faqItems.forEach((other) => {
        other.classList.remove('active');
        const otherContent = other.querySelector('.faq-content');
        if (otherContent) otherContent.style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('active');
        content.style.maxHeight = `${content.scrollHeight}px`;
      }
    });
  });

  // Open first FAQ item by default
  if (faqItems.length > 0) {
    const firstContent = faqItems[0].querySelector('.faq-content');
    if (firstContent) {
      faqItems[0].classList.add('active');
      firstContent.style.maxHeight = `${firstContent.scrollHeight}px`;
    }
  }

  /* ==========================================================================
     6. KONTAKTFORMULAR FEEDBACK
     ========================================================================== */
  const contactForms = document.querySelectorAll('.js-contact-form');
  contactForms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const feedback = form.querySelector('.form-feedback');
      if (feedback) {
        feedback.innerHTML = `
          <strong>✓ Nachricht erfolgreich versendet!</strong><br>
          Vielen Dank für Ihre Anfrage an das <strong>Foto & Medienstudio MusterXXX</strong> in 12345 Musterstadt. Wir melden uns kurzfristig telefonisch oder per E-Mail bei Ihnen.
        `;
        feedback.classList.add('visible');
      }
      form.reset();
    });
  });
});
