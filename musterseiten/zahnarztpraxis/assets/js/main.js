/**
 * ZAHNARZTPRAXIS DR. MED. DENT. MUSTERMANN
 * Main Interactive Controller (Navigation, Filter Gallery, FAQ, Appointment Booking)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header State
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }, { passive: true });
  }

  // 2. Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = document.querySelector('.site-nav');

  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    siteNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Filterable Case & Practice Gallery
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length && galleryItems.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        galleryItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            item.classList.remove('is-hidden');
          } else {
            item.classList.add('is-hidden');
          }
        });
      });
    });
  }

  // 4. Minimalist FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    if (trigger && content) {
      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');

        // Close other open items
        faqItems.forEach(other => {
          other.classList.remove('is-open');
          const otherContent = other.querySelector('.faq-content');
          if (otherContent) otherContent.style.maxHeight = null;
        });

        if (!isOpen) {
          item.classList.add('is-open');
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    }
  });

  // 5. Interactive Time-Slot Pills in Appointment Form
  const slotPills = document.querySelectorAll('.slot-pill');
  const slotInput = document.getElementById('selected-slot');

  if (slotPills.length) {
    slotPills.forEach(pill => {
      pill.addEventListener('click', () => {
        slotPills.forEach(p => p.classList.remove('selected'));
        pill.classList.add('selected');
        if (slotInput) {
          slotInput.value = pill.getAttribute('data-slot') || pill.textContent.trim();
        }
      });
    });
  }

  // 6. Interactive Form Handling (Appointment & Contact Forms)
  const forms = document.querySelectorAll('.js-interactive-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const feedback = form.querySelector('.form-feedback');
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.textContent : '';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Wird übermittelt …';
      }

      setTimeout(() => {
        if (feedback) {
          feedback.classList.add('is-visible');
        }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
        form.reset();
        slotPills.forEach(p => p.classList.remove('selected'));
      }, 450);
    });
  });
});
