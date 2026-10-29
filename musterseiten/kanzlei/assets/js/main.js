/**
 * RECHTSANWALTSKANZLEI MUSTERMANN & PARTNER
 * Interaktive Funktionen: Navigation, Kompetenz- & Galerie-Filter,
 * Dokumenten-/Zertifikats-Vorschau & Download, Online-Terminbuchung, FAQ & Formulare
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ========================================================================
     1. STICKY HEADER & MOBILE NAVIGATION
     ======================================================================== */
  const siteHeader = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');

  const handleScroll = () => {
    if (!siteHeader) return;
    if (window.scrollY > 16) {
      siteHeader.classList.add('is-scrolled');
    } else {
      siteHeader.classList.remove('is-scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ========================================================================
     2. B2B KOMPETENZ- & LEISTUNGSÜBERSICHT FILTER
     ======================================================================== */
  const practiceFilterBtns = document.querySelectorAll('[data-practice-filter]');
  const practiceRows = document.querySelectorAll('.practice-row[data-category]');

  if (practiceFilterBtns.length && practiceRows.length) {
    practiceFilterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-practice-filter');

        practiceFilterBtns.forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        practiceRows.forEach((row) => {
          const cats = (row.getAttribute('data-category') || '').split(' ');
          if (target === 'all' || cats.includes(target)) {
            row.classList.remove('is-hidden');
          } else {
            row.classList.add('is-hidden');
          }
        });
      });
    });
  }

  /* ========================================================================
     3. KANZLEI- & REFERENZGALERIE FILTER + LIGHTBOX
     ======================================================================== */
  const galleryFilterBtns = document.querySelectorAll('[data-gallery-filter]');
  const galleryItems = document.querySelectorAll('.gallery-item[data-gallery-cat]');

  if (galleryFilterBtns.length && galleryItems.length) {
    galleryFilterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-gallery-filter');
        galleryFilterBtns.forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        galleryItems.forEach((item) => {
          const cat = item.getAttribute('data-gallery-cat');
          if (filter === 'all' || cat === filter) {
            item.classList.remove('is-hidden');
          } else {
            item.classList.add('is-hidden');
          }
        });
      });
    });
  }

  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCat = document.getElementById('lightboxCat');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');

  document.querySelectorAll('[data-lightbox-trigger]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      if (!lightboxModal) return;
      const card = trigger.closest('.gallery-item');
      if (!card) return;
      const imgEl = card.querySelector('.gallery-item__img');
      const catEl = card.querySelector('.gallery-item__cat');
      const titleEl = card.querySelector('.gallery-item__title');
      const descEl = card.querySelector('.gallery-item__desc');

      if (lightboxImg && imgEl) {
        lightboxImg.src = imgEl.src;
        lightboxImg.alt = imgEl.alt || '';
      }
      if (lightboxCat && catEl) lightboxCat.textContent = catEl.textContent;
      if (lightboxTitle && titleEl) lightboxTitle.textContent = titleEl.textContent;
      if (lightboxDesc && descEl) lightboxDesc.textContent = descEl.textContent;

      openModal(lightboxModal);
    });
  });

  /* ========================================================================
     4. DATENBLÄTTER, VOLLMACHTEN & ZERTIFIKATSNACHWEISE (VORSCHAU & DOWNLOAD)
     ======================================================================== */
  const DOCUMENTS = {
    'gesellschaftsrecht': {
      meta: 'MANDANTEN-DATENBLATT · DEZERNAT I',
      title: 'Handels- & Gesellschaftsrecht – Leistungsprofil & Checkliste',
      filename: 'Merkblatt_Handels_und_Gesellschaftsrecht_Mustermann_Partner.txt',
      html: `
        <h4>Zuständiger Partner</h4>
        <p><strong>RA Max Mustermann</strong> · Fachanwalt für Handels- und Gesellschaftsrecht</p>
        <h4>Beratungsumfang für Unternehmen & Gesellschafter</h4>
        <ul>
          <li>Gründung, Umwandlung und Satzungsgestaltung von Kapital- und Personengesellschaften (GmbH, GmbH &amp; Co. KG, AG)</li>
          <li>Unternehmenskäufe, Beteiligungen (M&amp;A) sowie rechtliche Due-Diligence-Prüfungen</li>
          <li>Begleitung von Gesellschafterversammlungen und Beilegung von Gesellschafterkonflikten</li>
          <li>Unternehmensnachfolge im Mittelstand in Abstimmung mit Steuerberatern und Wirtschaftsprüfern</li>
        </ul>
        <h4>Benötigte Unterlagen für die Erstprüfung</h4>
        <ul>
          <li>Aktueller Handelsregisterauszug und geltender Gesellschaftsvertrag / Satzung</li>
          <li>Gesellschafterliste sowie relevante Gesellschafterbeschlüsse</li>
          <li>Entwürfe oder bestehende Verträge zum geplanten Vorhaben</li>
        </ul>
      `
    },
    'baurecht': {
      meta: 'MANDANTEN-DATENBLATT · DEZERNAT II',
      title: 'Bau- & Architektenrecht / HOAI – Leistungsprofil & Projektbegleitung',
      filename: 'Datenblatt_Bau_und_Architektenrecht_Mustermann_Partner.txt',
      html: `
        <h4>Zuständige Partnerin</h4>
        <p><strong>RAin Dr. Julia Musterfrau, LL.M.</strong> · Fachanwältin für Bau- und Architektenrecht</p>
        <h4>Schwerpunkte für Bauherren, Architekten, Ingenieure &amp; Kommunen</h4>
        <ul>
          <li>Gestaltung und Prüfung von BGB- und VOB/B-Bauverträgen, Generalunternehmer- und Nachunternehmerverträgen</li>
          <li>Architekten- und Ingenieurvertragsrecht sowie Honorarsicherung und -prüfung nach HOAI</li>
          <li>Projektbegleitende Rechtsberatung zur Vermeidung von Bauzeitverzögerungen und Nachtragsstreitigkeiten</li>
          <li>Selbstständige Beweisverfahren, Abnahmeprotokollierung und gerichtliche Durchsetzung von Gewährleistungsansprüchen</li>
        </ul>
        <h4>Empfohlene Projektunterlagen</h4>
        <ul>
          <li>Bauvertrag / Architektenvertrag nebst Leistungsbeschreibung und Terminplan</li>
          <li>Schriftverkehr zu Behinderungsanzeigen, Mängelrügen oder Nachtragsangeboten</li>
          <li>Abnahmeprotokolle und Schlussrechnungsunterlagen</li>
        </ul>
      `
    },
    'arbeitsrecht': {
      meta: 'MANDANTEN-DATENBLATT · DEZERNAT III',
      title: 'Arbeitsrecht für Arbeitgeber, Organe & Führungskräfte',
      filename: 'Leitfaden_Arbeitgeber_Arbeitsrecht_Mustermann_Partner.txt',
      html: `
        <h4>Zuständiger Partner</h4>
        <p><strong>RA Thomas Beispiel</strong> · Fachanwalt für Arbeitsrecht</p>
        <h4>Beratungsfelder im Individual- und Kollektivarbeitsrecht</h4>
        <ul>
          <li>Gestaltung rechtssicherer Arbeitsverträge, Geschäftsführerdienstverträge und variabler Vergütungsmodelle</li>
          <li>Vorbereitung von Trennungsprozessen, Aufhebungsverträgen und Vertretung vor allen Arbeitsgerichten</li>
          <li>Begleitung von Betriebsänderungen, Restrukturierungen, Interessenausgleich und Sozialplan</li>
          <li>Laufende Beratung der Personalabteilung (HR-Legal-Desk) im Betriebsverfassungsrecht</li>
        </ul>
        <h4>Wichtiger Fristenhinweis</h4>
        <p>Im Arbeitsrecht gelten strenge gesetzliche Ausschlussfristen (insb. 3-Wochen-Frist nach § 4 KSchG sowie zweiwöchige Frist nach § 626 Abs. 2 BGB). Bitte übermitteln Sie Zustelldaten unverzüglich an unser Sekretariat.</p>
      `
    },
    'vergaberecht': {
      meta: 'MANDANTEN-DATENBLATT · DEZERNAT IV',
      title: 'Vergabe- & Verwaltungsrecht für Kommunen und Bieter',
      filename: 'Merkblatt_Kommunal_und_Vergaberecht_Mustermann_Partner.txt',
      html: `
        <h4>Zuständige Rechtsanwältin</h4>
        <p><strong>RAin Sabine Exempel</strong> · Fachanwältin für Verwaltungsrecht</p>
        <h4>Kompetenzfelder Öffentliche Hand &amp; Bieterunternehmen</h4>
        <ul>
          <li>Strukturierung und rechtliche Begleitung nationaler und EU-weiter Vergabeverfahren (GWB, VgV, UVgO, VOB/A)</li>
          <li>Prüfung von Vergabeunterlagen, Bieterfragen, Rügen und Vertretung vor den Vergabekammern sowie OLG-Vergabesenaten</li>
          <li>Öffentliches Baurecht: Bauleitplanung, städtebauliche Verträge, Baugenehmigungs- und Nachbarstreitverfahren</li>
          <li>Kommunalwirtschaftsrecht, Gebühren- und Beitragsrecht sowie Zuwendungsrecht</li>
        </ul>
      `
    },
    'vertragsrecht': {
      meta: 'MANDANTEN-DATENBLATT · DEZERNAT V',
      title: 'Wirtschaftsvertragsrecht, AGB & B2B-Lieferbeziehungen',
      filename: 'Checkliste_Vertragspruefung_B2B_Mustermann_Partner.txt',
      html: `
        <h4>Zuständiger Partner</h4>
        <p><strong>RA Max Mustermann</strong> · Fachanwalt für Handels- und Gesellschaftsrecht</p>
        <h4>Leistungsschwerpunkte im operativen Unternehmensgeschäft</h4>
        <ul>
          <li>Entwurf und Überarbeitung Allgemeiner Einkaufs- und Verkaufsbedingungen (AEB / AVB) im B2B-Verkehr</li>
          <li>Rahmenlieferverträge, Werk- und Dienstleistungsverträge, Handelsvertreter- und Vertragshändlerrecht</li>
          <li>Haftungsbegrenzungsklauseln, Qualitätssicherungsvereinbarungen (QSV) und Geheimhaltungsvereinbarungen (NDA)</li>
          <li>Durchsetzung und Abwehr gewerblicher Schadensersatz- und Werklohnforderungen</li>
        </ul>
      `
    },
    'compliance': {
      meta: 'MANDANTEN-DATENBLATT · DEZERNAT VI',
      title: 'Corporate Compliance, Organhaftung & Wirtschaftsdatenschutz',
      filename: 'Datenblatt_Corporate_Compliance_Mustermann_Partner.txt',
      html: `
        <h4>Zuständiger Partner</h4>
        <p><strong>RA Thomas Beispiel</strong> · Rechtsanwalt &amp; Compliance-Berater</p>
        <h4>Präventive Rechtsberatung für Geschäftsleitungen</h4>
        <ul>
          <li>Haftungsvermeidung für Geschäftsführer, Vorstände und Aufsichtsräte (Business Judgment Rule, D&amp;O-Abstimmung)</li>
          <li>Aufbau pragmatischer Compliance-Richtlinien und interner Meldestellen nach dem Hinweisgeberschutzgesetz</li>
          <li>Prüfung von Auftragsverarbeitungsverträgen (Art. 28 DSGVO) und datenschutzrechtlichen Prozessen im Unternehmen</li>
          <li>Interne Sachverhaltsaufklärung und Krisenkommunikation bei Rechtsverstößen</li>
        </ul>
      `
    },
    'vollmacht-aussergerichtlich': {
      meta: 'FORMULARVORLAGE · MANDATSAUFNAHME',
      title: 'Außergerichtliche Vertretungsvollmacht (Musterformular)',
      filename: 'Aussergerichtliche_Vollmacht_Mustermann_Partner.txt',
      html: `
        <h4>Rechtsanwaltskanzlei Mustermann &amp; Partner</h4>
        <p>Musterstraße 1 · 12345 Musterstadt · Tel. +49 123 4567890</p>
        <h4>Gegenstand der Vollmacht</h4>
        <p>Hiermit wird den Rechtsanwälten der <strong>Rechtsanwaltskanzlei Mustermann &amp; Partner</strong> in Sachen <em>[Bezeichnung des Mandats / Aktenbetreff]</em> wegen <em>[Gegenstand]</em> außergerichtliche Vollmacht erteilt.</p>
        <ul>
          <li>Zur Entgegennahme und Abgabe einseitiger Willenserklärungen (z. B. Kündigungen, Fristsetzungen, Rügen)</li>
          <li>Zur Führung außergerichtlicher Vergleichs- und Vertragsverhandlungen</li>
          <li>Zur Akteneinsicht bei Behörden, Registern und öffentlichen Stellen</li>
        </ul>
        <p><em>Hinweis: Dies ist ein Musterdokument zu Demonstrationszwecken. Das verbindliche Originalformular erhalten Sie nach erfolgter Kollisionsprüfung direkt durch unser Kanzleisekretariat.</em></p>
      `
    },
    'prozessvollmacht': {
      meta: 'FORMULARVORLAGE · PROZESSVERTRETUNG',
      title: 'Prozessvollmacht gemäß §§ 81 ff. ZPO (Musterformular)',
      filename: 'Prozessvollmacht_ZPO_Mustermann_Partner.txt',
      html: `
        <h4>Rechtsanwaltskanzlei Mustermann &amp; Partner</h4>
        <p>Musterstraße 1 · 12345 Musterstadt · Tel. +49 123 4567890</p>
        <h4>Umfang der Prozessvollmacht</h4>
        <p>Prozessvollmacht gemäß §§ 81 ff. ZPO, §§ 67 VwGO, § 11 ArbGG für alle Instanzen zur Prozessführung (u. a. Widerklage, Arrest, einstweilige Verfügung, Zwangsvollstreckung und Rechtsmittelverfahren).</p>
        <ul>
          <li>Beilegung des Rechtsstreits durch Vergleich, Verzicht oder Anerkenntnis</li>
          <li>Entgegennahme von Zustellungen, Ladungen und vom Gegner zu erstattenden Kosten</li>
          <li>Übertragung der Vollmacht ganz oder teilweise auf Unterbevollmächtigte (Terminsvertreter)</li>
        </ul>
        <p><em>Musterformular – Freigabe und Unterzeichnung erfolgen erst nach Annahme des Mandats durch die Kanzlei.</em></p>
      `
    },
    'aufnahmebogen': {
      meta: 'FORMULARVORLAGE · STAMMDATEN B2B & KOMMUNEN',
      title: 'Mandantenaufnahmebogen & Angaben zur Kollisionsprüfung',
      filename: 'Mandantenaufnahmebogen_B2B_Mustermann_Partner.txt',
      html: `
        <h4>Erforderliche Stammdaten für die Mandatsanlage</h4>
        <ul>
          <li>Vollständige Firmierung / Körperschaftsbezeichnung inkl. Rechtsform und Registernummer</li>
          <li>Vertretungsberechtigte Organe (Geschäftsführung / Vorstand / Bürgermeister / Werkleitung)</li>
          <li>Rechnungsanschrift, Umsatzsteuer-ID bzw. Leitweg-ID für elektronische Rechnungsstellung (XRechnung bei Kommunen)</li>
          <li>Vollständige Bezeichnung etwaiger Gegenparteien zur berufsrechtlichen Prüfung auf Interessenkollision (§ 43a Abs. 4 BRAO)</li>
          <li>Angaben zu bestehendem Rechtsschutz- oder D&amp;O-Versicherungsschutz (Versicherer &amp; Scheinnummer)</li>
        </ul>
      `
    },
    'zertifikat-kammer': {
      meta: 'BERUFSRECHTLICHER NACHWEIS',
      title: 'Zulassung zur Rechtsanwaltschaft & Postulationsfähigkeit',
      filename: 'Nachweis_Zulassung_Mustermann_Partner.txt',
      html: `
        <h4>Berufsständische Zulassung (Musterangabe)</h4>
        <p>Sämtliche Berufsträger der <strong>Rechtsanwaltskanzlei Mustermann &amp; Partner</strong> sind nach dem Recht der Bundesrepublik Deutschland als Rechtsanwälte zugelassen und Mitglieder der zuständigen <strong>Rechtsanwaltskammer Musterstadt</strong>.</p>
        <ul>
          <li>Vertretungsbefugnis vor allen Amts-, Land- und Oberlandesgerichten sowie den Arbeits-, Verwaltungs-, Sozial- und Finanzgerichten in Deutschland</li>
          <li>Verliehene Fachanwaltsbezeichnungen nach Maßgabe der Fachanwaltsordnung (FAO)</li>
          <li>Laufende Berufshaftpflichtdeckung gemäß § 51 BRAO bei der Muster-Versicherungs-AG, Musterstadt</li>
        </ul>
      `
    },
    'zertifikat-iso': {
      meta: 'QUALITÄTSMANAGEMENT-NACHWEIS',
      title: 'Strukturiertes Kanzleimanagement nach ISO 9001 Leitlinien',
      filename: 'Qualitaetsstandard_Kanzleimanagement_Mustermann_Partner.txt',
      html: `
        <h4>Geprüfte Kanzlei- und Fristenorganisation</h4>
        <p>Unsere Kanzleiabläufe folgen dokumentierten Qualitätsstandards für wirtschaftsberatende Sozietäten:</p>
        <ul>
          <li>Vier-Augen-Prinzip bei Fristennotierung, Vorfristenkontrolle und Rechtsmittelabläufen</li>
          <li>Standardisierte Interessenkollisionsprüfung vor jeder Mandatsannahme</li>
          <li>Feste Partner-Zuständigkeit und definierte Stellvertreterregelung für jedes Mandat</li>
          <li>Transparente Zeiterfassung und strukturierte Mandatsberichterstattung für Gremien und Geschäftsleitungen</li>
        </ul>
      `
    },
    'zertifikat-fortbildung': {
      meta: 'QUALIFIKATIONSNACHWEIS',
      title: 'Regelmäßige Fachanwalts-Fortbildung gemäß § 15 FAO / BRAK',
      filename: 'Fortbildungsnachweis_FAO_Mustermann_Partner.txt',
      html: `
        <h4>Kontinuierliche wissenschaftliche &amp; praktische Weiterbildung</h4>
        <p>Unsere Fachanwältinnen und Fachanwälte erfüllen jährlich nachweislich die erhöhten Fortbildungspflichten nach § 15 der Fachanwaltsordnung (FAO) sowie die Kriterien des Fortbildungszertifikats der Bundesrechtsanwaltskammer.</p>
        <ul>
          <li>Aktuelle höchstrichterliche Rechtsprechung (BGH, BAG, BVerwG, EuGH)</li>
          <li>Gesetzesnovellen im Gesellschafts-, Bau-, Vergabe- und Arbeitsrecht</li>
          <li>Interdisziplinärer Austausch mit Fachprüfern, Sachverständigen und Verbänden</li>
        </ul>
      `
    },
    'zertifikat-bea': {
      meta: 'IT-SICHERHEIT & DATENSCHUTZ',
      title: 'Verschlüsselte Mandatsakte, beA & DSGVO-Konformität',
      filename: 'Datensicherheit_beA_DSGVO_Mustermann_Partner.txt',
      html: `
        <h4>Vertraulichkeit und Schutz von Geschäftsgeheimnissen</h4>
        <p>Neben der gesetzlichen anwaltlichen Verschwiegenheitspflicht (§ 43a Abs. 2 BRAO, § 203 StGB) gewährleisten wir ein hohes technisches Schutzniveau:</p>
        <ul>
          <li>Elektronischer Rechtsverkehr über das besondere elektronische Anwaltspostfach (beA)</li>
          <li>Verschlüsselte Datenübertragung für vertrauliche Vertrags-, M&amp;A- und Vergabeunterlagen</li>
          <li>Revisionssichere digitale Mandatsakte auf Systemen innerhalb der Europäischen Union</li>
          <li>Unterstützung von E-Rechnungsstandards (XRechnung / ZUGFeRD) für öffentliche Auftraggeber und Konzerne</li>
        </ul>
      `
    }
  };

  const docModal = document.getElementById('docModal');
  const docModalMeta = document.getElementById('docModalMeta');
  const docModalTitle = document.getElementById('docModalTitle');
  const docModalBody = document.getElementById('docModalBody');
  const docDownloadBtn = document.getElementById('docDownloadBtn');
  const docPrintBtn = document.getElementById('docPrintBtn');
  let activeDocKey = null;

  document.querySelectorAll('[data-doc-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-doc-id');
      const doc = DOCUMENTS[key];
      if (!doc || !docModal) return;

      activeDocKey = key;
      if (docModalMeta) docModalMeta.textContent = doc.meta;
      if (docModalTitle) docModalTitle.textContent = doc.title;
      if (docModalBody) docModalBody.innerHTML = doc.html;

      openModal(docModal);
    });
  });

  if (docDownloadBtn) {
    docDownloadBtn.addEventListener('click', () => {
      if (!activeDocKey || !DOCUMENTS[activeDocKey]) return;
      const doc = DOCUMENTS[activeDocKey];
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = doc.html;
      const plainBody = tempDiv.innerText.replace(/\n{3,}/g, '\n\n').trim();

      const content = [
        '========================================================================',
        'RECHTSANWALTSKANZLEI MUSTERMANN & PARTNER',
        'Musterstraße 1 · 12345 Musterstadt',
        'Telefon: +49 123 4567890 · E-Mail: kontakt@rechtsanwaltskanzlei-mustermann-partner.de',
        '========================================================================',
        '',
        doc.meta,
        doc.title,
        '------------------------------------------------------------------------',
        '',
        plainBody,
        '',
        '------------------------------------------------------------------------',
        'Hinweis: Fiktives Musterdokument (Konzeptprojekt rechtsanwaltskanzlei-mustermann-partner.de).'
      ].join('\r\n');

      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = doc.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  if (docPrintBtn) {
    docPrintBtn.addEventListener('click', () => {
      window.print();
    });
  }

  /* Allgemeine Modal-Steuerung */
  function openModal(modalEl) {
    modalEl.classList.add('is-open');
    modalEl.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modalEl) {
    modalEl.classList.remove('is-open');
    modalEl.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-modal-close]').forEach((closeBtn) => {
    closeBtn.addEventListener('click', () => {
      const backdrop = closeBtn.closest('.modal-backdrop');
      if (backdrop) closeModal(backdrop);
    });
  });

  document.querySelectorAll('.modal-backdrop').forEach((backdrop) => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeModal(backdrop);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop.is-open').forEach((m) => closeModal(m));
      if (mainNav && mainNav.classList.contains('is-open')) {
        mainNav.classList.remove('is-open');
        if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });

  /* ========================================================================
     5. FAQ-ACCORDION
     ======================================================================== */
  document.querySelectorAll('.faq-question').forEach((questionBtn) => {
    questionBtn.addEventListener('click', () => {
      const item = questionBtn.closest('.faq-item');
      if (!item) return;
      const isOpen = item.classList.contains('is-open');

      /* Andere Punkte derselben Liste optional schließen für klare Struktur */
      const parentList = item.closest('.faq-list');
      if (parentList) {
        parentList.querySelectorAll('.faq-item.is-open').forEach((openItem) => {
          if (openItem !== item) {
            openItem.classList.remove('is-open');
            const btn = openItem.querySelector('.faq-question');
            if (btn) btn.setAttribute('aria-expanded', 'false');
          }
        });
      }

      item.classList.toggle('is-open', !isOpen);
      questionBtn.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  /* ========================================================================
     6. INTERAKTIVE ONLINE-TERMINBUCHUNG (3-SCHRITTE-ASSISTENT)
     ======================================================================== */
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    const steps = bookingForm.querySelectorAll('.booking-step');
    const stepperItems = document.querySelectorAll('.stepper__item');
    const bookingFeedback = document.getElementById('bookingFeedback');
    const dateInput = document.getElementById('bookingDate');
    const slotBtns = bookingForm.querySelectorAll('.slot-btn');
    const selectedSlotInput = document.getElementById('bookingTimeSlot');
    const lawyerSelect = document.getElementById('bookingLawyer');
    const areaSelect = document.getElementById('bookingArea');
    let currentStep = 0;

    /* Nächsten Werktag als Standarddatum setzen */
    if (dateInput) {
      const nextBiz = new Date();
      nextBiz.setDate(nextBiz.getDate() + 1);
      if (nextBiz.getDay() === 6) nextBiz.setDate(nextBiz.getDate() + 2);
      if (nextBiz.getDay() === 0) nextBiz.setDate(nextBiz.getDate() + 1);
      const iso = nextBiz.toISOString().split('T')[0];
      dateInput.min = iso;
      if (!dateInput.value) dateInput.value = iso;
    }

    /* Uhrzeit-Slots */
    slotBtns.forEach((slotBtn) => {
      slotBtn.addEventListener('click', () => {
        slotBtns.forEach((b) => b.classList.remove('is-selected'));
        slotBtn.classList.add('is-selected');
        if (selectedSlotInput) {
          selectedSlotInput.value = slotBtn.getAttribute('data-slot') || slotBtn.textContent.trim();
        }
      });
    });

    const showStep = (idx) => {
      currentStep = idx;
      steps.forEach((step, i) => {
        step.classList.toggle('is-active', i === idx);
      });
      stepperItems.forEach((item, i) => {
        item.classList.toggle('is-active', i === idx);
        item.classList.toggle('is-done', i < idx);
      });
      if (bookingFeedback) {
        bookingFeedback.classList.remove('is-visible', 'form-feedback--error');
      }
    };

    bookingForm.querySelectorAll('[data-booking-next]').forEach((nextBtn) => {
      nextBtn.addEventListener('click', () => {
        if (currentStep === 0) {
          if (areaSelect && !areaSelect.value) {
            showBookingError('Bitte wählen Sie zunächst das betreffende Rechtsgebiet aus.');
            areaSelect.focus();
            return;
          }
        }
        if (currentStep === 1) {
          if (dateInput && !dateInput.value) {
            showBookingError('Bitte wählen Sie ein Wunschdatum für den Beratungstermin aus.');
            dateInput.focus();
            return;
          }
          if (selectedSlotInput && !selectedSlotInput.value) {
            showBookingError('Bitte wählen Sie ein bevorzugtes Zeitfenster aus.');
            return;
          }
        }
        if (currentStep < steps.length - 1) {
          showStep(currentStep + 1);
        }
      });
    });

    bookingForm.querySelectorAll('[data-booking-prev]').forEach((prevBtn) => {
      prevBtn.addEventListener('click', () => {
        if (currentStep > 0) {
          showStep(currentStep - 1);
        }
      });
    });

    function showBookingError(msg) {
      if (!bookingFeedback) return;
      bookingFeedback.className = 'form-feedback is-visible form-feedback--error';
      bookingFeedback.innerHTML = `<strong>Hinweis:</strong> ${msg}`;
    }

    /* Vorauswahl über Team-Buttons oder URL-Parameter */
    document.querySelectorAll('[data-select-lawyer]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const lawyerName = btn.getAttribute('data-select-lawyer');
        const areaValue = btn.getAttribute('data-select-area');
        const bookingSection = document.getElementById('terminbuchung');
        if (bookingSection) {
          e.preventDefault();
          if (lawyerSelect && lawyerName) lawyerSelect.value = lawyerName;
          if (areaSelect && areaValue) areaSelect.value = areaValue;
          showStep(0);
          bookingSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    const params = new URLSearchParams(window.location.search);
    const paramLawyer = params.get('anwalt');
    const paramArea = params.get('fachbereich');
    if (paramLawyer && lawyerSelect) {
      Array.from(lawyerSelect.options).forEach((opt) => {
        if (opt.value.toLowerCase().includes(paramLawyer.toLowerCase())) {
          lawyerSelect.value = opt.value;
        }
      });
    }
    if (paramArea && areaSelect) {
      Array.from(areaSelect.options).forEach((opt) => {
        if (opt.value.toLowerCase().includes(paramArea.toLowerCase())) {
          areaSelect.value = opt.value;
        }
      });
    }

    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameVal = (document.getElementById('bookingName')?.value || '').trim();
      const emailVal = (document.getElementById('bookingEmail')?.value || '').trim();
      const phoneVal = (document.getElementById('bookingPhone')?.value || '').trim();
      const privacyChecked = document.getElementById('bookingPrivacy')?.checked;

      if (!nameVal || !emailVal || !phoneVal) {
        showBookingError('Bitte füllen Sie Name, E-Mail-Adresse und Telefonnummer für Rückfragen des Sekretariats vollständig aus.');
        return;
      }
      if (!privacyChecked) {
        showBookingError('Bitte bestätigen Sie die Kenntnisnahme der Datenschutzhinweise zur Mandatsanfrage.');
        return;
      }

      const clientType = bookingForm.querySelector('input[name="clientType"]:checked')?.value || 'Unternehmen / B2B';
      const formatType = bookingForm.querySelector('input[name="consultFormat"]:checked')?.value || 'Präsenztermin Kanzlei Musterstadt';
      const areaText = areaSelect ? areaSelect.options[areaSelect.selectedIndex].text : 'Wirtschaftsrecht';
      const lawyerText = lawyerSelect ? lawyerSelect.options[lawyerSelect.selectedIndex].text : 'Zuständiger Fachpartner';
      const dateRaw = dateInput?.value || '';
      const dateFormatted = dateRaw ? dateRaw.split('-').reverse().join('.') : '';
      const slotVal = selectedSlotInput?.value || '10:30 Uhr';
      const refCode = 'MP-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);

      if (bookingFeedback) {
        bookingFeedback.className = 'form-feedback is-visible form-feedback--success';
        bookingFeedback.innerHTML = `
          <strong>Terminanfrage erfolgreich vorgemerkt (Vorgangs-Nr.: ${refCode})</strong><br>
          Vielen Dank, <strong>${escapeHtml(nameVal)}</strong>. Unser Kanzleisekretariat prüft umgehend die berufsrechtliche Kollisionsfreiheit und bestätigt Ihren Wunschtermin:<br>
          <ul style="margin-top:0.55rem; padding-left:1.2rem; list-style:disc;">
            <li><strong>Mandantengruppe &amp; Fachbereich:</strong> ${escapeHtml(clientType)} – ${escapeHtml(areaText)}</li>
            <li><strong>Ansprechpartner:</strong> ${escapeHtml(lawyerText)}</li>
            <li><strong>Format &amp; Wunschtermin:</strong> ${escapeHtml(formatType)} am ${escapeHtml(dateFormatted)} um ${escapeHtml(slotVal)}</li>
          </ul>
          <span style="display:block; margin-top:0.5rem; font-size:0.8rem;">Hinweis: Ein Mandatsverhältnis kommt erst mit ausdrücklicher Annahmeerklärung durch die Rechtsanwaltskanzlei Mustermann &amp; Partner zustande.</span>
        `;
        bookingFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  /* ========================================================================
     7. ALLGEMEINES KONTAKTFORMULAR
     ======================================================================== */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const contactFeedback = document.getElementById('contactFeedback');

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (contactForm.querySelector('[name="name"]')?.value || '').trim();
      const email = (contactForm.querySelector('[name="email"]')?.value || '').trim();
      const message = (contactForm.querySelector('[name="message"]')?.value || '').trim();
      const privacy = contactForm.querySelector('[name="privacy"]')?.checked;

      if (!name || !email || !message) {
        if (contactFeedback) {
          contactFeedback.className = 'form-feedback is-visible form-feedback--error';
          contactFeedback.innerHTML = '<strong>Bitte ergänzen Sie Ihre Angaben:</strong> Name, geschäftliche oder private E-Mail-Adresse sowie Ihre Nachricht sind Pflichtfelder.';
        }
        return;
      }

      if (!privacy) {
        if (contactFeedback) {
          contactFeedback.className = 'form-feedback is-visible form-feedback--error';
          contactFeedback.innerHTML = '<strong>Datenschutzhinweis:</strong> Bitte stimmen Sie der Verarbeitung Ihrer Anfrage gemäß unserer Datenschutzerklärung zu.';
        }
        return;
      }

      const ticketId = 'SEK-' + Math.floor(10000 + Math.random() * 89999);
      if (contactFeedback) {
        contactFeedback.className = 'form-feedback is-visible form-feedback--success';
        contactFeedback.innerHTML = `
          <strong>Ihre Nachricht ist im Kanzleisekretariat eingegangen (Referenz: ${ticketId}).</strong><br>
          Vielen Dank, <strong>${escapeHtml(name)}</strong>. Ihre Anfrage wird vertraulich gemäß § 43a Abs. 2 BRAO behandelt und dem zuständigen Dezernat vorgelegt. Bei fristgebundenen Angelegenheiten erreichen Sie unser Sekretariat zudem direkt unter <strong>+49 123 4567890</strong>.
        `;
      }
      contactForm.reset();
    });
  }

  function escapeHtml(str) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return String(str).replace(/[&<>"']/g, (m) => map[m]);
  }
});
