/**
 * Modul 1: Maschinen
 * Lektionen 1–3: Was ist eine Maschine? · Die 5 Baugruppen · Maschinenelemente
 */

// Grafik: Tischbohrmaschine mit Nummern
const SVG_BOHRMASCHINE = `
<svg viewBox="0 0 360 330" class="lesson-svg" role="img" aria-label="Tischbohrmaschine mit nummerierten Baugruppen">
  <!-- Fuß und Säule -->
  <rect x="70" y="290" width="200" height="22" rx="4" fill="#9CA3AF" stroke="#4B5563" stroke-width="2"/>
  <rect x="200" y="70" width="18" height="222" fill="#D1D5DB" stroke="#4B5563" stroke-width="2"/>
  <!-- Tisch mit Kurbel -->
  <rect x="95" y="210" width="150" height="12" rx="2" fill="#9CA3AF" stroke="#4B5563" stroke-width="2"/>
  <rect x="190" y="205" width="38" height="24" rx="3" fill="#9CA3AF" stroke="#4B5563" stroke-width="2"/>
  <line x1="228" y1="217" x2="250" y2="232" stroke="#4B5563" stroke-width="3"/>
  <!-- Werkstück -->
  <rect x="120" y="196" width="60" height="14" fill="#FBBF24" stroke="#92400E" stroke-width="1.5"/>
  <!-- Kopf / Gehäuse -->
  <rect x="80" y="40" width="170" height="85" rx="8" fill="#DBEAFE" stroke="#1D4ED8" stroke-width="2.5"/>
  <!-- Riemengetriebe oben -->
  <rect x="88" y="16" width="150" height="26" rx="6" fill="#F3F4F6" stroke="#4B5563" stroke-width="1.5" stroke-dasharray="4 3"/>
  <circle cx="125" cy="29" r="9" fill="none" stroke="#EA580C" stroke-width="3"/>
  <circle cx="200" cy="29" r="9" fill="none" stroke="#EA580C" stroke-width="3"/>
  <line x1="125" y1="20" x2="200" y2="20" stroke="#EA580C" stroke-width="2.5"/>
  <line x1="125" y1="38" x2="200" y2="38" stroke="#EA580C" stroke-width="2.5"/>
  <!-- Motor im Gehäuse -->
  <rect x="180" y="52" width="50" height="45" rx="5" fill="#93C5FD" stroke="#1D4ED8" stroke-width="2"/>
  <text x="205" y="80" text-anchor="middle" font-size="11" fill="#1E3A8A">Motor</text>
  <!-- Schalter + Drehzahlknopf -->
  <rect x="95" y="58" width="28" height="18" rx="3" fill="#16A34A"/>
  <circle cx="109" cy="96" r="9" fill="#374151"/>
  <!-- NOT-AUS -->
  <circle cx="72" cy="105" r="11" fill="#DC2626" stroke="#7F1D1D" stroke-width="2"/>
  <!-- Spindel, Spindelschutz, Bohrfutter, Bohrer -->
  <rect x="140" y="125" width="14" height="22" fill="#9CA3AF" stroke="#4B5563" stroke-width="1.5"/>
  <rect x="128" y="128" width="38" height="44" rx="4" fill="#E0F2FE" fill-opacity=".6" stroke="#0EA5E9" stroke-width="1.5" stroke-dasharray="3 2"/>
  <polygon points="137,147 157,147 152,165 142,165" fill="#6B7280" stroke="#374151" stroke-width="1.5"/>
  <line x1="147" y1="165" x2="147" y2="194" stroke="#374151" stroke-width="3"/>
  <!-- Vorschubhebel -->
  <line x1="250" y1="100" x2="300" y2="135" stroke="#4B5563" stroke-width="4" stroke-linecap="round"/>
  <circle cx="302" cy="137" r="6" fill="#111827"/>
  <!-- Nummern -->
  <g font-size="14" font-weight="700" text-anchor="middle" fill="#fff">
    <line x1="230" y1="75" x2="300" y2="62" stroke="#111827" stroke-width="1.2"/><circle cx="312" cy="60" r="13" fill="#111827"/><text x="312" y="65">1</text>
    <line x1="95" y1="67" x2="40" y2="55" stroke="#111827" stroke-width="1.2"/><circle cx="28" cy="52" r="13" fill="#111827"/><text x="28" y="57">2</text>
    <line x1="200" y1="20" x2="300" y2="18" stroke="#111827" stroke-width="1.2"/><circle cx="312" cy="18" r="13" fill="#111827"/><text x="312" y="23">3</text>
    <line x1="218" y1="260" x2="300" y2="265" stroke="#111827" stroke-width="1.2"/><circle cx="312" cy="266" r="13" fill="#111827"/><text x="312" y="271">4</text>
    <line x1="61" y1="108" x2="40" y2="140" stroke="#111827" stroke-width="1.2"/><circle cx="32" cy="152" r="13" fill="#111827"/><text x="32" y="157">5</text>
    <line x1="140" y1="180" x2="60" y2="200" stroke="#111827" stroke-width="1.2"/><circle cx="48" cy="203" r="13" fill="#111827"/><text x="48" y="208">6</text>
  </g>
</svg>`;

// Grafik: Energiefluss durch die Baugruppen
const SVG_ENERGIEFLUSS = `
<svg viewBox="0 0 640 150" class="lesson-svg" role="img" aria-label="Weg der Energie durch die Baugruppen einer Maschine">
  <defs><marker id="pf-ef" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#374151"/></marker></defs>
  <rect x="4" y="4" width="632" height="142" rx="12" fill="none" stroke="#6B7280" stroke-width="2" stroke-dasharray="6 4"/>
  <text x="320" y="138" text-anchor="middle" font-size="12" fill="#4B5563">Gehäuse, Trägerteil und Sicherheitsvorrichtungen halten alles zusammen und schützen</text>
  <g font-size="13" text-anchor="middle">
    <rect x="16" y="30" width="96" height="58" rx="8" fill="#F9FAFB" stroke="#9CA3AF" stroke-width="2" stroke-dasharray="5 3"/><text x="64" y="50">Strom</text><text x="64" y="66" font-size="11">Steckdose/Akku</text><text x="64" y="81" font-size="10" fill="#6B7280">(keine Baugruppe)</text>
    <rect x="140" y="30" width="96" height="58" rx="8" fill="#DCFCE7" stroke="#16A34A" stroke-width="2"/><text x="188" y="55">Schaltteil</text><text x="188" y="72" font-size="11">&bdquo;der Chef&ldquo;</text>
    <rect x="264" y="30" width="96" height="58" rx="8" fill="#DBEAFE" stroke="#2563EB" stroke-width="2"/><text x="312" y="50">Antriebsteil</text><text x="312" y="66" font-size="11">&bdquo;der Muskel&ldquo;</text><text x="312" y="81" font-size="10" fill="#6B7280">Motor (+ Akku)</text>
    <rect x="388" y="30" width="110" height="58" rx="8" fill="#FFEDD5" stroke="#EA580C" stroke-width="2"/><text x="443" y="55">Übertragungsteil</text><text x="443" y="72" font-size="11">&bdquo;der Bote&ldquo;</text>
    <rect x="526" y="30" width="100" height="58" rx="8" fill="#FCE7F3" stroke="#DB2777" stroke-width="2"/><text x="576" y="55">Arbeitsteil</text><text x="576" y="72" font-size="11">&bdquo;die Hand&ldquo;</text>
  </g>
  <g stroke="#374151" stroke-width="2.5" marker-end="url(#pf-ef)">
    <line x1="112" y1="59" x2="136" y2="59"/><line x1="236" y1="59" x2="260" y2="59"/><line x1="360" y1="59" x2="384" y2="59"/><line x1="498" y1="59" x2="522" y2="59"/>
  </g>
</svg>`;

// Grafik: Achse oder Welle?
const SVG_ACHSE_WELLE = `
<svg viewBox="0 0 600 170" class="lesson-svg" role="img" aria-label="Links eine Welle zwischen Motor und Rührbesen, rechts eine Achse mit Rad">
  <defs><marker id="pf-aw" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="#2563EB"/></marker></defs>
  <text x="150" y="22" text-anchor="middle" font-size="16" font-weight="700" fill="#2563EB">Welle: treibt an</text>
  <rect x="20" y="60" width="70" height="60" rx="8" fill="#DBEAFE" stroke="#2563EB" stroke-width="2"/><text x="55" y="95" text-anchor="middle" font-size="13">Motor</text>
  <rect x="90" y="84" width="150" height="12" fill="#2563EB"/><text x="165" y="115" text-anchor="middle" font-size="13" font-weight="700" fill="#2563EB">Welle</text>
  <path d="M240 70 q25 20 0 40 q25 -20 40 -20 q-15 0 -40 -20z" fill="#9CA3AF" stroke="#4B5563" stroke-width="1.5"/>
  <text x="262" y="138" text-anchor="middle" font-size="12">Rührbesen</text>
  <path d="M135 72 a 30 12 0 1 1 60 0" fill="none" stroke="#2563EB" stroke-width="2.5" marker-end="url(#pf-aw)"/>
  <text x="150" y="160" text-anchor="middle" font-size="12" fill="#374151">Drehung wird weitergeleitet</text>
  <line x1="300" y1="10" x2="300" y2="165" stroke="#E5E7EB" stroke-width="2"/>
  <text x="450" y="22" text-anchor="middle" font-size="16" font-weight="700" fill="#EA580C">Achse: trägt nur</text>
  <text x="450" y="45" text-anchor="middle" font-size="11">Schubkarre von vorne</text>
  <rect x="395" y="52" width="12" height="80" fill="#4B5563"/><rect x="493" y="52" width="12" height="80" fill="#4B5563"/>
  <rect x="395" y="104" width="110" height="10" fill="#EA580C"/>
  <rect x="432" y="70" width="36" height="78" rx="12" fill="#374151" stroke="#111827" stroke-width="2"/>
  <line x1="508" y1="109" x2="535" y2="92" stroke="#EA580C" stroke-width="1.5"/><text x="537" y="90" font-size="13" font-weight="700" fill="#EA580C">Achse</text>
  <text x="450" y="64" text-anchor="middle" font-size="10" fill="#111827">Rad</text>
  <text x="450" y="160" text-anchor="middle" font-size="12" fill="#374151">Das Rad dreht sich auf ihr, angetrieben wird nichts</text>
</svg>`;

// Grafik: Gleitlager und Wälzlager im Schnitt
const SVG_LAGER = `
<svg viewBox="0 0 480 190" class="lesson-svg" role="img" aria-label="Gleitlager und Wälzlager im Schnitt">
  <g transform="translate(120 80)">
    <circle r="58" fill="#E5E7EB" stroke="#4B5563" stroke-width="2"/>
    <circle r="34" fill="#FEF3C7" stroke="#B45309" stroke-width="2"/>
    <circle r="26" fill="#93C5FD" stroke="#1D4ED8" stroke-width="2"/>
    <text y="5" text-anchor="middle" font-size="12">Welle</text>
  </g>
  <text x="120" y="158" text-anchor="middle" font-size="14" font-weight="700">Gleitlager</text><text x="120" y="176" text-anchor="middle" font-size="12">Welle gleitet in einer Buchse</text>
  <g transform="translate(360 80)">
    <circle r="58" fill="#E5E7EB" stroke="#4B5563" stroke-width="2"/>
    <circle r="46" fill="#fff" stroke="#4B5563" stroke-width="1.5"/>
    <circle r="32" fill="#D1D5DB" stroke="#4B5563" stroke-width="1.5"/>
    <circle r="22" fill="#93C5FD" stroke="#1D4ED8" stroke-width="2"/>
    <text y="5" text-anchor="middle" font-size="12">Welle</text>
    ${Array.from({ length: 10 }, (_, k) => {
      const a = k * Math.PI / 5;
      return '<circle cx="' + (39 * Math.cos(a)).toFixed(1) + '" cy="' + (39 * Math.sin(a)).toFixed(1) + '" r="6.5" fill="#6B7280" stroke="#111827"/>';
    }).join('')}
  </g>
  <text x="360" y="158" text-anchor="middle" font-size="14" font-weight="700">Wälzlager</text><text x="360" y="176" text-anchor="middle" font-size="12">Kugeln rollen zwischen 2 Ringen</text>
</svg>`;

window.LESSON_DATA = (window.LESSON_DATA || []).concat([
  // ---------------------------------------------------------------- L1
  {
    id: 1,
    title: 'Was ist eine Maschine?',
    explanation: {
      html: `
        <p>Bohrmaschine, Waschmaschine, Rasenmäher, E-Bike: Maschinen begegnen dir jeden Tag. Aber was macht etwas zu einer Maschine?</p>
        <div class="merke">Eine <strong>Maschine</strong> ist ein System aus mehreren Teilen, die <strong>gemeinsam eine Aufgabe</strong> erfüllen. Sie wird nicht von Menschen oder Tieren angetrieben, sondern nutzt <strong>eine andere Energie als Muskelkraft</strong>, zum Beispiel Strom aus der Steckdose oder aus einem Akku.</div>
        <table class="info-table">
          <tr><th>Hammer</th><th>Akku-Bohrschrauber</th></tr>
          <tr><td>besteht aus 2 Teilen (Kopf und Stiel)</td><td>besteht aus vielen Teilen, die zusammenarbeiten</td></tr>
          <tr><td>deine Muskelkraft treibt ihn an</td><td>der Akku liefert die Energie, ein Motor treibt an</td></tr>
          <tr><td>→ ein <strong>Werkzeug</strong></td><td>→ eine <strong>Maschine</strong></td></tr>
        </table>
        <h3>Maschine, Baugruppe, Maschinenelement</h3>
        <p>Jede Maschine besteht aus <strong>Baugruppen</strong>. Jede Baugruppe hat eine bestimmte Aufgabe, zum Beispiel antreiben oder schützen. Die Baugruppen bestehen wiederum aus einzelnen <strong>Maschinenteilen</strong>. Man nennt sie auch <strong>Maschinenelemente</strong>, zum Beispiel Wellen, Zahnräder oder Lager.</p>
        <div class="analogy-box"><strong>Wie im Alltag:</strong> Eine Fußballmannschaft (die Maschine) besteht aus Abwehr, Mittelfeld und Sturm (den Baugruppen). Jeder Mannschaftsteil besteht aus einzelnen Spielern (den Maschinenelementen). Nur wenn alle zusammenspielen, gewinnt das Team.</div>
        <p class="formel">Maschine → Baugruppen → Maschinenelemente</p>
        <div class="tip-box"><strong>Gut zu wissen:</strong> Ein normales Fahrrad trittst du selbst an, also mit Muskelkraft. Es steckt aber voller Maschinenelemente (Kette, Lager, Achsen). Ein <strong>E-Bike</strong> hat einen Akku und einen Motor und ist damit eine Maschine.</div>
        <div class="why-context"><strong>Warum ist das wichtig?</strong> Wer weiß, aus welchen Teilen eine Maschine besteht, versteht, wie sie funktioniert. Und wenn etwas kaputt ist, findet man den Fehler schneller.</div>`
    },
    example: {
      title: 'Ist der Rasenmäher eine Maschine?',
      steps: [
        { label: 'Mehrere Teile?', html: '<p>Ein Elektro-Rasenmäher hat einen Motor, einen Schalter am Griff, ein Messer, Räder und ein Gehäuse. Das sind <strong>viele Teile</strong>, die zusammen eine Aufgabe erfüllen: Gras schneiden.</p>' },
        { label: 'Woher kommt die Energie?', html: '<p>Aus dem Akku oder der Steckdose. Du schiebst ihn zwar, aber das Messer dreht der <strong>Motor</strong>, nicht deine Muskeln.</p>' },
        { label: 'Ergebnis', html: '<p>Beide Bedingungen sind erfüllt: Der Elektro-Rasenmäher ist eine <strong>Maschine</strong>. Ein alter Spindelmäher ohne Motor, bei dem nur dein Schieben die Messer dreht, wäre keine.</p>' }
      ]
    },
    exercises: [
      {
        type: 'multiple-choice',
        question: 'Welcher Gegenstand ist eine Maschine?',
        options: ['Akku-Bohrschrauber', 'Hammer mit Holzstiel', 'Schraubendreher', 'Handsäge mit Sägeblatt'],
        correct: 0,
        wrongExplanations: {
          1: 'Der Hammer hat nur 2 Teile und wird mit Muskelkraft angetrieben. Er ist ein Werkzeug.',
          2: 'Den Schraubendreher drehst du mit der Hand. Er hat keinen eigenen Antrieb, also ist er ein Werkzeug.',
          3: 'Die Handsäge bewegst du selbst hin und her. Ohne Motor ist sie ein Werkzeug.'
        }
      },
      {
        type: 'fill-in-blank',
        question: 'Ergänze die Merksätze.',
        text: 'Eine Maschine ist ein {{blank}} aus mehreren Teilen, die gemeinsam eine Aufgabe erfüllen. Jede Maschine besteht aus {{blank}}. Diese bestehen aus einzelnen Maschinenteilen, den {{blank}}.',
        blanks: [
          { correct: 'System', alternatives: [] },
          { correct: 'Baugruppen', alternatives: ['Baugruppe'] },
          { correct: 'Maschinenelementen', alternatives: ['Maschinenelemente', 'Maschinenelement'] }
        ],
        explanation: 'Von groß nach klein: Maschine → Baugruppen → Maschinenelemente.'
      },
      {
        type: 'ordering',
        question: 'Bring die Begriffe in die richtige Reihenfolge: vom Großen zum Kleinen.',
        items: ['Akku-Bohrschrauber (Maschine)', 'Antriebsteil mit Motor und Akku (Baugruppe)', 'Welle im Motor (Maschinenelement)'],
        correctOrder: [0, 1, 2],
        explanation: 'Die Maschine ist das Ganze. Sie besteht aus Baugruppen, und jede Baugruppe besteht aus Maschinenelementen wie der Welle.'
      },
      {
        type: 'matching',
        question: 'Maschine oder Werkzeug? Ordne zu.',
        pairs: [
          { left: 'Waschmaschine', right: 'Maschine' },
          { left: 'Zange', right: 'Werkzeug' },
          { left: 'Akku-Rasenmäher', right: 'Maschine' },
          { left: 'Feile', right: 'Werkzeug' }
        ],
        explanation: 'Waschmaschine und Akku-Rasenmäher haben einen Motor und nutzen Strom als Energie. Zange und Feile bewegst du mit deinen Muskeln.'
      },
      {
        type: 'free-text',
        question: 'Erkläre in 1–2 Sätzen, warum ein Hammer keine Maschine ist.',
        minWords: 8,
        modelAnswer: 'Ein Hammer besteht nur aus Kopf und Stiel und wird mit Muskelkraft angetrieben. Eine Maschine besteht aus vielen Teilen und nutzt Energie aus Strom, zum Beispiel aus einem Akku.'
      }
    ]
  },

  // ---------------------------------------------------------------- L2
  {
    id: 2,
    title: 'Die 5 Baugruppen',
    explanation: {
      html: `
        <p>Ob Bohrmaschine, Stichsäge oder E-Bike: In <strong>jeder</strong> Maschine findest du dieselben Baugruppen wieder. Jede hat einen Spitznamen, der dir beim Merken hilft.</p>
        <table class="info-table">
          <tr><th>Baugruppe</th><th>Aufgabe</th><th>Spitzname</th></tr>
          <tr><td><strong>Antriebsteil</strong> (Energieteil)</td><td>treibt die Maschine an, meistens ein Elektromotor</td><td>der Muskel</td></tr>
          <tr><td><strong>Schalt-, Steuer- und Regelteil</strong></td><td>schaltet ein und aus, stellt z. B. die Drehzahl ein</td><td>der Chef</td></tr>
          <tr><td><strong>Übertragungsteil</strong></td><td>leitet die Bewegung weiter und wandelt sie um, oft ein Getriebe</td><td>der Bote</td></tr>
          <tr><td><strong>Gehäuse, Trägerteil, Sicherheitsvorrichtungen</strong></td><td>hält alles zusammen und schützt vor Verletzungen und Stromschlag</td><td>Skelett und Schutzschild</td></tr>
          <tr><td><strong>Arbeitsteil</strong> (Abtriebsteil)</td><td>erledigt die eigentliche Arbeit, z. B. Bohrer, Sägeblatt</td><td>die Hand</td></tr>
        </table>
        <h3>Der Weg der Energie</h3>
        ${SVG_ENERGIEFLUSS}
        <div class="analogy-box"><strong>Wie im Alltag:</strong> Dein Körper funktioniert ähnlich. Das Gehirn (Chef) gibt den Befehl, die Muskeln (Antrieb) liefern die Kraft, Sehnen und Gelenke (Übertragung) leiten sie weiter, die Hand (Arbeitsteil) greift zu, und das Skelett hält alles zusammen.</div>
        <h3>Beispiel: die Tischbohrmaschine</h3>
        ${SVG_BOHRMASCHINE}
        <table class="info-table">
          <tr><th>Nr.</th><th>Teil</th><th>Baugruppe</th></tr>
          <tr><td>1</td><td>Motor</td><td>Antriebsteil</td></tr>
          <tr><td>2</td><td>An-/Ausschalter, Drehzahlknopf</td><td>Schalt-, Steuer- und Regelteil</td></tr>
          <tr><td>3</td><td>Riemengetriebe</td><td>Übertragungsteil</td></tr>
          <tr><td>4</td><td>Maschinenfuß, Säule, Tisch (auch das Gehäuse gehört dazu)</td><td>Trägerteil und Gehäuse</td></tr>
          <tr><td>5</td><td>NOT-AUS-Knopf, Spindelschutz</td><td>Sicherheitsvorrichtung</td></tr>
          <tr><td>6</td><td>Bohrfutter mit Bohrer</td><td>Arbeitsteil</td></tr>
        </table>
        <div class="tip-box"><strong>Gleiche Sache, andere Wörter:</strong> Auf manchen Arbeitsblättern heißen die Baugruppen einfacher: <em>Motor</em> (Antriebsteil), <em>Schalter</em> (Schaltteil), <em>Getriebe</em> (Übertragungsteil), <em>Gestell</em> (Trägerteil), <em>Werkzeug</em> (Arbeitsteil).</div>
        <div class="warning-box"><strong>Typischer Fehler:</strong> Das Gehäuse ist nicht nur &bdquo;Verpackung&ldquo;. Es ist das Trägerteil und oft auch eine <strong>Sicherheitsvorrichtung</strong>: Es schützt dich vor beweglichen Teilen und vor Stromschlag.</div>
        <div class="why-context"><strong>Warum ist das wichtig?</strong> Mit den 5 Baugruppen kannst du <em>jede</em> Maschine verstehen, auch eine, die du noch nie gesehen hast. Du fragst einfach: Wer treibt an? Wer schaltet? Wer überträgt? Wer arbeitet? Wer schützt?</div>`
    },
    example: {
      title: 'Die Baugruppen des Akku-Bohrschraubers',
      steps: [
        { label: 'Antriebsteil', html: '<p>Der <strong>Akku</strong> liefert die Energie, der <strong>Elektromotor</strong> im Inneren erzeugt die Drehung.</p>' },
        { label: 'Schalt-, Steuer- und Regelteil', html: '<p>Der <strong>Drucktaster</strong> am Griff schaltet ein. Je fester du drückst, desto schneller dreht er. Der Schiebeschalter wechselt zwischen Rechts- und Linkslauf.</p>' },
        { label: 'Übertragungsteil', html: '<p>Ein kleines <strong>Getriebe</strong> zwischen Motor und Bohrfutter. Es macht die schnelle Drehung des Motors langsamer, dafür kräftiger. Sonst könnte man keine Schraube eindrehen.</p>' },
        { label: 'Gehäuse und Sicherheit', html: '<p>Das <strong>Kunststoffgehäuse mit Griff</strong> hält alle Teile und schützt die Hand vor dem drehenden Motor.</p>' },
        { label: 'Arbeitsteil', html: '<p>Das <strong>Bohrfutter</strong> mit eingespanntem Bohrer oder Bit. Hier passiert die eigentliche Arbeit: bohren oder schrauben.</p>' }
      ]
    },
    exercises: [
      {
        type: 'matching',
        question: 'Tischbohrmaschine: Zu welcher Baugruppe gehört das Teil?',
        pairs: [
          { left: 'Motor', right: 'Antriebsteil' },
          { left: 'Drehzahlknopf', right: 'Schalt-, Steuer- und Regelteil' },
          { left: 'Riemengetriebe', right: 'Übertragungsteil' },
          { left: 'Säule und Maschinenfuß', right: 'Trägerteil' },
          { left: 'NOT-AUS-Knopf', right: 'Sicherheitsvorrichtung' },
          { left: 'Bohrfutter mit Bohrer', right: 'Arbeitsteil' }
        ],
        explanation: 'Folge dem Weg der Energie: Der Drehzahlknopf steuert, der Motor treibt an, das Riemengetriebe überträgt, der Bohrer arbeitet. Säule und Fuß tragen, der NOT-AUS-Knopf schützt.'
      },
      {
        type: 'multiple-choice',
        question: 'Welche Baugruppe leitet die Bewegung weiter und verändert dabei Drehzahl und Kraft?',
        options: ['Übertragungsteil', 'Antriebsteil', 'Schalt-, Steuer- und Regelteil', 'Arbeitsteil'],
        correct: 0,
        wrongExplanations: {
          1: 'Das Antriebsteil erzeugt die Bewegung erst. Weitergeleitet und umgewandelt wird sie danach.',
          2: 'Das Schaltteil schaltet ein und aus und gibt Befehle. Die Bewegung selbst läuft nicht hindurch.',
          3: 'Das Arbeitsteil steht am Ende des Weges und erledigt die Arbeit. Es leitet nichts mehr weiter.'
        }
      },
      {
        type: 'matching',
        question: 'E-Bike: Zu welcher Baugruppe gehört das Teil?',
        pairs: [
          { left: 'Akku und Motor', right: 'Antriebsteil' },
          { left: 'Display mit Tasten für die Unterstützungsstufe', right: 'Schalt-, Steuer- und Regelteil' },
          { left: 'Kette mit Kettenrädern', right: 'Übertragungsteil' },
          { left: 'Rahmen', right: 'Trägerteil' },
          { left: 'Hinterrad, das die Kraft auf die Straße bringt', right: 'Arbeitsteil' }
        ],
        explanation: 'Beim E-Bike ist das angetriebene Hinterrad das Arbeitsteil: Es bringt die Kraft auf die Straße. Die Kette überträgt die Drehung vom Antrieb dorthin.'
      },
      {
        type: 'fill-in-blank',
        question: 'Ergänze.',
        text: 'Bei den meisten Maschinen in der Schule ist ein {{blank}} das Antriebsteil. Das Gehäuse ist das Trägerteil und oft auch eine {{blank}}.',
        blanks: [
          { correct: 'Elektromotor', alternatives: ['Motor', 'E-Motor', 'Elektro-Motor', 'Elektromotoren'] },
          { correct: 'Sicherheitsvorrichtung', alternatives: ['Sicherheitsvorrichtungen', 'Schutzvorrichtung', 'Schutzvorrichtungen', 'Sicherheitsteil', 'Sicherheitseinrichtung', 'Schutzeinrichtung', 'Schutzteil'] }
        ],
        explanation: 'Der Elektromotor treibt an. Das Gehäuse trägt die Teile und schützt vor beweglichen Teilen und Stromschlag.'
      },
      {
        type: 'multiple-choice',
        question: 'Bei einer Bohrmaschine läuft der Motor, aber das Bohrfutter dreht sich nicht. Welche Baugruppe ist wahrscheinlich kaputt?',
        options: ['Das Übertragungsteil', 'Das Schaltteil mit dem Schalter', 'Das Antriebsteil mit dem Motor', 'Das Gehäuse der Maschine'],
        correct: 0,
        wrongExplanations: {
          1: 'Der Motor läuft. Also hat das Einschalten geklappt, das Schaltteil funktioniert.',
          2: 'Der Motor ist das Antriebsteil, und er läuft ja. Die Drehung kommt nur nicht an.',
          3: 'Das Gehäuse hält und schützt, es leitet aber keine Bewegung weiter.'
        },
        explanation: 'Die Drehung kommt vom Motor nicht beim Bohrfutter an. Dazwischen liegt das Übertragungsteil, z. B. ein gerissener Riemen.'
      }
    ]
  },

  // ---------------------------------------------------------------- L3
  {
    id: 3,
    title: 'Maschinenelemente',
    explanation: {
      html: `
        <p><strong>Maschinenelemente</strong> sind die Bausteine der Technik. Sie kommen in fast jeder Maschine vor und haben eine Aufgabe: <strong>Kräfte und Bewegungen übertragen</strong>.</p>
        <table class="info-table">
          <tr><th>Element</th><th>Aufgabe</th><th>Beispiel</th></tr>
          <tr><td><strong>Welle</strong></td><td>dreht sich und leitet die Drehung weiter: Sie <strong>treibt an</strong></td><td>Handmixer zwischen Motor und Rührbesen</td></tr>
          <tr><td><strong>Achse</strong></td><td><strong>trägt</strong> drehende Teile, treibt nichts an. Sie kann feststehen oder sich mitdrehen</td><td>Schubkarre, Skateboard</td></tr>
          <tr><td><strong>Kurbel</strong></td><td>einarmiger Hebel, mit dem man eine Welle dreht</td><td>Pedalarm am Fahrrad</td></tr>
          <tr><td><strong>Stange</strong></td><td>stabförmig, überträgt Kräfte vor allem in Längsrichtung</td><td>Pleuelstange im Motor</td></tr>
          <tr><td><strong>Kupplung</strong></td><td>verbindet zwei Wellen. Es gibt feste, bewegliche und schaltbare Kupplungen (diese können auch trennen)</td><td>Auto, Akkuschrauber (Rutschkupplung)</td></tr>
          <tr><td><strong>Räder</strong></td><td>übertragen und verändern Drehbewegungen. Seile, Riemen und Ketten leiten Zugkräfte weiter</td><td>Zahnräder, Kettenrad</td></tr>
          <tr><td><strong>Lager</strong></td><td>halten drehende Teile und verringern die Reibung</td><td>Kugellager im Rad</td></tr>
          <tr><td><strong>Hebel</strong></td><td>dreht sich um einen Drehpunkt. Mit langem Hebelarm braucht man wenig Kraft</td><td>Bremshebel, Schere</td></tr>
        </table>
        <h3>Achse oder Welle?</h3>
        ${SVG_ACHSE_WELLE}
        <div class="merke">Die <strong>Welle</strong> wird gedreht und <strong>treibt etwas an</strong>. Die <strong>Achse</strong> <strong>trägt nur</strong>. Ob sich eine Achse mitdreht, ist dabei egal.</div>
        <div class="warning-box"><strong>Typischer Fehler:</strong> &bdquo;Das Teil dreht sich, also ist es eine Welle.&ldquo; Falsch! Die Achse eines Eisenbahnwagens ohne Motor dreht sich mit den Rädern mit und ist trotzdem eine Achse, denn sie treibt nichts an.</div>
        <h3>Lager</h3>
        ${SVG_LAGER}
        <p>Beim <strong>Gleitlager</strong> gleitet die Welle in einer Buchse. Es ist einfach gebaut und trägt große Lasten. Beim <strong>Wälzlager</strong> rollen Kugeln oder Rollen zwischen zwei Ringen. So entstehen viel weniger Reibung und weniger Wärme.</p>
        <div class="analogy-box"><strong>Wie im Alltag:</strong> Einen schweren Karton über den Boden zu schieben ist mühsam (Gleiten). Legst du Rollen darunter, geht es ganz leicht (Wälzen). Genau das macht ein Kugellager.</div>
        <div class="why-context"><strong>Warum ist das wichtig?</strong> Wenn eine Maschine streikt, ist oft ein einzelnes Maschinenelement schuld: eine gebrochene Welle, ein kaputtes Lager, eine durchrutschende Kupplung. Wer die Elemente kennt, findet den Fehler.</div>`
    },
    example: {
      title: 'Fahrrad-Detektiv: Welche Elemente stecken im Fahrrad?',
      steps: [
        { label: 'Vorderrad-Mitte', html: '<p>Das Vorderrad dreht sich frei auf einem Stab. Angetrieben wird es nicht. → <strong>Achse</strong></p>' },
        { label: 'Tretlager zwischen den Pedalen', html: '<p>Hier sitzt ein Stab, den du mit den Pedalen drehst. Er dreht das vordere Kettenrad mit, treibt also an. → <strong>Welle</strong></p>' },
        { label: 'Pedalarm', html: '<p>Mit ihm drehst du die Welle. → <strong>Kurbel</strong></p>' },
        { label: 'In der Radnabe', html: '<p>Kleine Kugeln zwischen zwei Ringen, damit das Rad leicht läuft. → <strong>Wälzlager</strong></p>' },
        { label: 'Kette und Kettenräder', html: '<p>Sie bringen die Drehung von vorne nach hinten. → <strong>Räder</strong> mit Zugmittel (Kette)</p>' },
        { label: 'Bremsgriff am Lenker', html: '<p>Er dreht sich um einen Drehpunkt, du ziehst am langen Ende. → <strong>Hebel</strong> (einarmig: Drehpunkt am Ende, Kraft und Seilzug auf derselben Seite)</p>' }
      ]
    },
    exercises: [
      {
        type: 'matching',
        question: 'Ordne jedem Maschinenelement seine Aufgabe zu.',
        pairs: [
          { left: 'Welle', right: 'dreht sich und treibt etwas an' },
          { left: 'Achse', right: 'trägt drehende Teile, treibt nicht an' },
          { left: 'Lager', right: 'hält drehende Teile und verringert die Reibung' },
          { left: 'Kupplung', right: 'verbindet zwei Wellen miteinander' },
          { left: 'Kurbel', right: 'einarmiger Hebel zum Drehen einer Welle' }
        ],
        explanation: 'Merke dir besonders Welle (treibt an) und Achse (trägt nur). Das ist der häufigste Stolperstein.'
      },
      {
        type: 'matching',
        question: 'Achse oder Welle? Ordne zu.',
        pairs: [
          { left: 'Skateboard: das Teil, auf dem die Rollen sitzen', right: 'Achse' },
          { left: 'Handmixer: das Teil zwischen Motor und Rührbesen', right: 'Welle' },
          { left: 'Schubkarre: das Teil, auf dem das Rad sitzt', right: 'Achse' },
          { left: 'Akku-Bohrschrauber: vom Motor gedreht, dreht das Bohrfutter', right: 'Welle' },
          { left: 'Eisenbahnwagen ohne Motor: dreht sich mit den Rädern mit', right: 'Achse' }
        ],
        explanation: 'Frag immer: Treibt das Teil etwas an? Ja → Welle. Nein, es trägt nur → Achse. Ob es sich dreht, spielt keine Rolle.'
      },
      {
        type: 'fill-in-blank',
        question: 'Lager: Fülle die Lücken.',
        text: 'Lager verringern die {{blank}}. Beim {{blank}} gleitet die Welle in einer Buchse. Beim {{blank}} rollen Kugeln oder Rollen zwischen zwei Ringen.',
        blanks: [
          { correct: 'Reibung', alternatives: [] },
          { correct: 'Gleitlager', alternatives: [] },
          { correct: 'Wälzlager', alternatives: ['Kugellager', 'Rollenlager', 'Waelzlager'] }
        ],
        explanation: 'Gleiten = rutschen (Gleitlager), Wälzen = rollen (Wälzlager, z. B. Kugellager).'
      },
      {
        type: 'multiple-choice',
        question: 'Finde den Denkfehler: Paul sagt: &bdquo;Die Achse beim Eisenbahnwagen dreht sich mit den Rädern mit. Also ist sie eine Welle.&ldquo; Was hat Paul falsch verstanden?',
        options: [
          'Entscheidend ist, ob das Teil etwas antreibt, nicht ob es sich dreht.',
          'Achsen dürfen sich niemals drehen, sonst sind es Wellen.',
          'Eine Welle erkennt man daran, dass Zahnräder auf ihr sitzen.',
          'Paul hat recht, alles was sich mitdreht, ist eine Welle.'
        ],
        correct: 0,
        wrongExplanations: {
          1: 'Doch, Achsen dürfen sich mitdrehen. Das Drehen ist gar nicht das Unterscheidungsmerkmal.',
          2: 'Eine Welle kann auch eine Riemenscheibe, ein Bohrfutter oder einen Rührbesen antreiben. Zahnräder braucht sie nicht.',
          3: 'Der Wagen hat keinen Motor. Die Achse treibt nichts an, sie trägt nur die Räder. Also ist es eine Achse.'
        }
      },
      {
        type: 'multiple-choice',
        question: 'Das Kugellager in einer Bohrmaschine ist …',
        options: ['ein Maschinenelement', 'eine Baugruppe', 'eine eigene Maschine', 'ein Werkzeug'],
        correct: 0,
        wrongExplanations: {
          1: 'Eine Baugruppe ist größer und hat eine ganze Aufgabe, z. B. das Übertragungsteil. Das Kugellager ist nur ein Baustein davon.',
          2: 'Das Kugellager erfüllt allein keine Aufgabe und hat keinen Antrieb. Es ist nur ein kleiner Teil der Maschine.',
          3: 'Mit einem Werkzeug arbeitest du selbst, z. B. mit einem Hammer. Das Kugellager ist fest in die Maschine eingebaut.'
        }
      },
      {
        type: 'free-text',
        question: 'Fehlersuche: Der Motor eines Handmixers läuft (du hörst ihn), aber die Rührbesen drehen sich nicht. Nenne zwei mögliche Ursachen. Tipp: Welche Maschinenelemente liegen zwischen Motor und Rührbesen?',
        minWords: 10,
        modelAnswer: 'Ein Zahnrad im Getriebe ist abgenutzt oder hat abgebrochene Zähne, dann wird die Drehung nicht weitergegeben. Eine Welle ist gebrochen. Die Rührbesen sind nicht richtig eingerastet und sitzen lose auf der Welle.'
      }
    ]
  }
]);
