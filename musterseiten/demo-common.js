(() => {
  const isEmbedded = window.self !== window.top;
  let feedbackTimer;

  function showFeedback(message) {
    let feedback = document.querySelector('.yws-demo-feedback');
    if (!feedback) {
      feedback = document.createElement('div');
      feedback.className = 'yws-demo-feedback';
      feedback.setAttribute('role', 'status');
      feedback.setAttribute('aria-live', 'polite');
      document.body.append(feedback);
    }

    feedback.textContent = message;
    window.clearTimeout(feedbackTimer);
    feedbackTimer = window.setTimeout(() => feedback.remove(), 4200);
  }

  function isInactiveDemoLink(link) {
    const href = link.getAttribute('href') || '';
    if (/^(mailto:|tel:)/i.test(href)) {
      return true;
    }

    try {
      const url = new URL(href, window.location.href);
      const host = url.hostname.toLowerCase();
      const isWhatsApp = host === 'wa.me' || host === 'whatsapp.com' || host.endsWith('.whatsapp.com');
      const isMap = (host === 'google.com' || host.endsWith('.google.com')) && url.pathname.startsWith('/maps/')
        || host === 'openstreetmap.org' || host.endsWith('.openstreetmap.org');
      return isWhatsApp || isMap;
    } catch {
      return false;
    }
  }

  document.addEventListener('click', (event) => {
    const target = event.target.nodeType === 1 ? event.target : event.target.parentElement;
    const link = target?.closest('a[href]');
    if (!link || !isInactiveDemoLink(link)) {
      return;
    }

    event.preventDefault();
    event.stopImmediatePropagation();
    showFeedback('Demo-Modus: Kontakt- und Kartenlinks sind nicht aktiv.');
  }, true);

  document.addEventListener('submit', (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    showFeedback('Demo-Modus: Formulare werden nicht versendet.');
  }, true);

  document.querySelectorAll('iframe[data-demo-map], iframe[src*="maps.google"], iframe[src*="google.com/maps"], iframe[src*="openstreetmap.org/export"]').forEach((frame) => {
    const placeholder = document.createElement('div');
    placeholder.className = 'yws-map-placeholder';
    placeholder.setAttribute('role', 'img');
    placeholder.textContent = 'Musterstandort – eine echte Kartenansicht ist in dieser Beispielseite nicht hinterlegt.';
    frame.replaceWith(placeholder);
  });

  if (!isEmbedded) {
    const banner = document.createElement('aside');
    banner.className = 'yws-demo-banner';
    banner.setAttribute('aria-label', 'Hinweis zur YWS-Musterseite');

    const message = document.createElement('p');
    message.textContent = 'Fiktive YWS-Musterseite. Namen, Adressen und Kontaktdaten sind Platzhalter; Bilder dienen nur als Illustration.';

    const nav = document.createElement('nav');
    nav.setAttribute('aria-label', 'YWS-Navigation');

    const examplesLink = document.createElement('a');
    examplesLink.href = '../../beispiele.html';
    examplesLink.textContent = 'Alle Beispiele';

    const homeLink = document.createElement('a');
    homeLink.href = '../../index.html';
    homeLink.textContent = 'Zur Landingpage';

    nav.append(examplesLink, homeLink);
    banner.append(message, nav);
    document.body.prepend(banner);
    document.body.classList.add('has-yws-demo-banner');
  }
})();
