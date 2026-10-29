/* ==========================================================================
   MUSTERMANN CATERING & EVENT GMBH — INTERAKTIVE LOGIK (VANILLA JS, ZERO COOKIES)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  /* ------------------------------------------------------------------------
     1. STICKY HEADER SCROLL-STATUS
     ------------------------------------------------------------------------ */
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    const handleScroll = () => {
      if (window.scrollY > 16) {
        siteHeader.classList.add('is-scrolled');
      } else {
        siteHeader.classList.remove('is-scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  /* ------------------------------------------------------------------------
     2. MOBILE NAVIGATION TOGGLE
     ------------------------------------------------------------------------ */
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (menuToggle && mainNav) {
    const closeMenu = () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      mainNav.classList.remove('is-open');
    };

    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isExpanded));
      mainNav.classList.toggle('is-open', !isExpanded);
    });

    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeMenu();
      }
    });
  }

  /* ------------------------------------------------------------------------
     3. PROJEKTGALERIE LIVE-FILTER & LIGHTBOX
     ------------------------------------------------------------------------ */
  const filterButtons = document.querySelectorAll('[data-filter]');
  const galleryItems = document.querySelectorAll('.gallery-item[data-category]');

  if (filterButtons.length > 0 && galleryItems.length > 0) {
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetFilter = btn.getAttribute('data-filter');

        filterButtons.forEach((b) => {
          b.classList.remove('is-active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-pressed', 'true');

        galleryItems.forEach((item) => {
          const itemCat = item.getAttribute('data-category');
          if (targetFilter === 'alle' || itemCat === targetFilter) {
            item.hidden = false;
          } else {
            item.hidden = true;
          }
        });
      });
    });
  }

  const lightbox = document.getElementById('galleryLightbox');
  if (lightbox && galleryItems.length > 0) {
    const lbImg = document.getElementById('lightboxImg');
    const lbTag = document.getElementById('lightboxTag');
    const lbTitle = document.getElementById('lightboxTitle');
    const lbDesc = document.getElementById('lightboxDesc');
    const lbClose = document.getElementById('lightboxClose');

    const closeLightbox = () => {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    galleryItems.forEach((card) => {
      const openCard = () => {
        const imgEl = card.querySelector('img');
        const badgeEl = card.querySelector('.gallery-item__badge');
        const guestsEl = card.querySelector('.gallery-item__guests');
        const titleEl = card.querySelector('.gallery-item__title');
        const subEl = card.querySelector('.gallery-item__sub');

        if (imgEl && lbImg) {
          lbImg.src = imgEl.src;
          lbImg.alt = imgEl.alt;
        }
        if (lbTag) {
          const catText = badgeEl ? badgeEl.textContent.trim() : 'REFERENZ';
          const guestText = guestsEl ? ` // ${guestsEl.textContent.trim()}` : '';
          lbTag.textContent = `${catText}${guestText}`;
        }
        if (lbTitle && titleEl) {
          lbTitle.textContent = titleEl.textContent.trim();
        }
        if (lbDesc && subEl) {
          lbDesc.textContent = subEl.textContent.trim();
        }

        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      };

      card.addEventListener('click', openCard);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openCard();
        }
      });
    });

    if (lbClose) {
      lbClose.addEventListener('click', closeLightbox);
    }

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
        closeLightbox();
      }
    });
  }

  /* ------------------------------------------------------------------------
     4. FAQ ACCORDION AUFKLAPPLOGIK
     ------------------------------------------------------------------------ */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const btn = item.querySelector('.faq-question');
    const icon = item.querySelector('.faq-icon');

    if (btn) {
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');

        // Schließe andere offene FAQs für aufgeräumten Fokus
        faqItems.forEach((other) => {
          other.classList.remove('is-open');
          const otherBtn = other.querySelector('.faq-question');
          const otherIcon = other.querySelector('.faq-icon');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          if (otherIcon) otherIcon.textContent = '+';
        });

        if (!isOpen) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
          if (icon) icon.textContent = '−';
        }
      });
    }
  });

  /* ------------------------------------------------------------------------
     5. INTERAKTIVE ONLINE-TERMINBUCHUNG & CATERING-KALKULATOR
     ------------------------------------------------------------------------ */
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    const typeInputs = bookingForm.querySelectorAll('input[name="bookingType"]');
    const occasionSelect = document.getElementById('bookingOccasion');
    const packageSelect = document.getElementById('bookingPackage');
    const guestsRange = document.getElementById('bookingGuests');
    const guestsDisplay = document.getElementById('guestsCountDisplay');
    const dateInput = document.getElementById('bookingDate');
    const slotButtons = bookingForm.querySelectorAll('.slot-btn');
    const hiddenSlot = document.getElementById('bookingTimeSlot');

    // Live-Ticket Felder
    const sumType = document.getElementById('sumType');
    const sumOccasion = document.getElementById('sumOccasion');
    const sumGuests = document.getElementById('sumGuests');
    const sumPackage = document.getElementById('sumPackage');
    const sumSlot = document.getElementById('sumSlot');
    const sumEstimate = document.getElementById('sumEstimate');
    const bookingFeedback = document.getElementById('bookingFeedback');

    // Standard-Datum auf nächsten Werktag setzen
    if (dateInput && !dateInput.value) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 2);
      const yyyy = tomorrow.getFullYear();
      const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
      const dd = String(tomorrow.getDate()).padStart(2, '0');
      dateInput.min = `${yyyy}-${mm}-${dd}`;
      dateInput.value = `${yyyy}-${mm}-${dd}`;
    }

    const packagePrices = {
      flying: { label: 'Flying & Fingerfood (ab 34 €)', price: 34 },
      signature: { label: 'Live-Buffet & Signature (ab 58 €)', price: 58 },
      gala: { label: 'Gala Full-Service All-In (ab 96 €)', price: 96 },
      individuell: { label: 'Individuelles Maßkonzept', price: 58 }
    };

    const formatCurrency = (val) =>
      new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0
      }).format(val);

    const updateTicket = () => {
      const checkedType = bookingForm.querySelector('input[name="bookingType"]:checked');
      if (sumType && checkedType) {
        sumType.textContent = checkedType.getAttribute('data-label') || checkedType.value;
      }

      if (sumOccasion && occasionSelect) {
        sumOccasion.textContent = occasionSelect.options[occasionSelect.selectedIndex].text;
      }

      const guests = guestsRange ? parseInt(guestsRange.value, 10) : 120;
      if (guestsDisplay) {
        guestsDisplay.textContent = `${guests} Gäste`;
      }
      if (sumGuests) {
        sumGuests.textContent = `ca. ${guests} Personen`;
      }

      const pkgKey = packageSelect ? packageSelect.value : 'signature';
      const pkgObj = packagePrices[pkgKey] || packagePrices.signature;
      if (sumPackage) {
        sumPackage.textContent = pkgObj.label;
      }

      if (sumEstimate) {
        const netTotal = guests * pkgObj.price;
        sumEstimate.textContent = `ca. ${formatCurrency(netTotal)} netto`;
      }

      if (sumSlot) {
        const dVal = dateInput && dateInput.value
          ? new Date(`${dateInput.value}T12:00:00`).toLocaleDateString('de-DE', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            })
          : 'Termin nach Wahl';
        const tVal = hiddenSlot && hiddenSlot.value ? hiddenSlot.value : '14:00 Uhr';
        sumSlot.textContent = `${dVal} // ${tVal}`;
      }
    };

    typeInputs.forEach((inp) => inp.addEventListener('change', updateTicket));
    if (occasionSelect) occasionSelect.addEventListener('change', updateTicket);
    if (packageSelect) packageSelect.addEventListener('change', updateTicket);
    if (guestsRange) guestsRange.addEventListener('input', updateTicket);
    if (dateInput) dateInput.addEventListener('change', updateTicket);

    slotButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        slotButtons.forEach((b) => b.classList.remove('is-selected'));
        btn.classList.add('is-selected');
        if (hiddenSlot) {
          hiddenSlot.value = btn.getAttribute('data-slot') || btn.textContent.trim();
        }
        updateTicket();
      });
    });

    // Direkt-Auswahl aus den Preistabellen
    document.querySelectorAll('[data-select-package]').forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        const pkg = trigger.getAttribute('data-select-package');
        if (packageSelect && pkg) {
          e.preventDefault();
          packageSelect.value = pkg;
          updateTicket();
          const sectionEl = document.getElementById('terminbuchung');
          if (sectionEl) {
            sectionEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });

    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const clientName = (document.getElementById('bookingName')?.value || 'Gast').trim();
      const refNum = `MCE-${Math.floor(1000 + Math.random() * 9000)}`;

      if (bookingFeedback) {
        bookingFeedback.innerHTML = `
          <strong>■ TERMINANFRAGE RESERVIERT (REF: ${refNum})</strong><br>
          Vielen Dank, ${clientName}! Ihr Wunschtermin (${sumSlot ? sumSlot.textContent : ''}) bei der
          <strong>Mustermann Catering &amp; Event GmbH</strong> wurde vorgemerkt. Max Mustermann &amp; unser
          Event-Team melden sich kurzfristig mit der Terminbestätigung.
        `;
        bookingFeedback.classList.add('is-visible');
        bookingFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });

    updateTicket();
  }

  /* ------------------------------------------------------------------------
     6. KONTAKTFORMULAR FEEDBACK-LOGIK (INDEX & KONTAKT-UNTERSEITE)
     ------------------------------------------------------------------------ */
  document.querySelectorAll('.js-contact-form').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const feedbackBox = form.querySelector('.form-feedback');
      const senderInput = form.querySelector('input[name="name"]');
      const senderName = senderInput && senderInput.value.trim() ? senderInput.value.trim() : 'Interessent/in';

      if (feedbackBox) {
        feedbackBox.innerHTML = `
          <strong>■ ANFRAGE ERFOLGREICH ÜBERMITTELT!</strong><br>
          Vielen Dank, ${senderName}. Ihre Catering-Anfrage ist bei der
          <strong>Mustermann Catering &amp; Event GmbH</strong> eingegangen. Sie erhalten innerhalb von
          24 Stunden (werktags) eine Rückmeldung unter Ihren angegebenen Kontaktdaten.
        `;
        feedbackBox.classList.add('is-visible');
        form.reset();
      }
    });
  });
});
