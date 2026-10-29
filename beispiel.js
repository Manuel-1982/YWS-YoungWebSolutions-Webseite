const demos = [
  { slug: 'foto-medienstudio', label: 'Foto- & Medienstudio', path: 'musterseiten/foto-medienstudio/' },
  { slug: 'gegen-den-strom', label: 'Gegen den Strom', path: 'musterseiten/gegen-den-strom/' },
  { slug: 'catering', label: 'Catering & Events', path: 'musterseiten/catering/' },
  { slug: 'kanzlei', label: 'Rechtsanwaltskanzlei', path: 'musterseiten/kanzlei/' },
  { slug: 'zahnarztpraxis', label: 'Zahnarztpraxis', path: 'musterseiten/zahnarztpraxis/' }
];

const params = new URLSearchParams(window.location.search);
const selectedDemo = demos.find((demo) => demo.slug === params.get('seite'));
const frame = document.getElementById('demo-frame');
const error = document.getElementById('demo-error');
const nav = document.querySelector('.demo-nav');
const toast = document.getElementById('demo-toast');
let toastTimeout;

demos.forEach((demo) => {
  const link = document.createElement('a');
  link.href = `beispiel.html?seite=${encodeURIComponent(demo.slug)}`;
  link.textContent = demo.label;
  if (selectedDemo?.slug === demo.slug) {
    link.setAttribute('aria-current', 'page');
  }
  nav.append(link);
});

if (selectedDemo) {
  document.title = `${selectedDemo.label} | YWS-Musterseite`;
  frame.title = `Interaktive Musterseite: ${selectedDemo.label}`;
  frame.src = `${selectedDemo.path}index.html`;
  frame.hidden = false;
} else {
  error.hidden = false;
}

function showDemoNotice(message) {
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 4200);
}

frame.addEventListener('load', () => {
  const demoDocument = frame.contentDocument;
  if (!demoDocument) {
    showDemoNotice('Diese Beispielseite kann in dieser Vorschau nicht geladen werden.');
    return;
  }

  demoDocument.addEventListener('click', (event) => {
    const clickedElement = event.target.nodeType === 1 ? event.target : event.target.parentElement;
    const link = clickedElement?.closest('a[href]');
    const href = link?.getAttribute('href').trim() || '';
    if (!link || !/^(mailto:|tel:)/i.test(href) && !/^https?:\/\/(?:www\.)?(?:wa\.me|(?:api\.)?whatsapp\.com)\//i.test(href)) {
      return;
    }

    event.preventDefault();
    event.stopImmediatePropagation();
    showDemoNotice('Demo-Modus: Telefon-, E-Mail- und WhatsApp-Kontakt sind nicht aktiv.');
  }, true);

  demoDocument.addEventListener('submit', (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    showDemoNotice('Demo-Modus: Formulare werden nicht versendet.');
  }, true);
});
