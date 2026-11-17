/**
 * Modul 2: Getriebe (Buch S. 168–169 und Marcos ABs "Getriebe übertragen und wandeln Kräfte"
 * und "Rechnen mit Zahnrädern", nur als inhaltliche Vorlage; Zahlen in den Übungen sind neu).
 * Lektionen 4–7: Getriebearten · Übersetzungsverhältnis · Drehzahl · Drehrichtung und Zwischenrad
 * Alle Rechenaufgaben werden in pruefung/nachrechnen.js nachgerechnet.
 */

// Kleines Zahnrad-Bild für die Übersichtstabelle (nutzt Sims.gearPath aus js/sims.js)
function gearIcon(x, y, z, m, color, rot) {
  return '<g transform="translate(' + x + ' ' + y + ') rotate(' + (rot || 0) + ')"><path d="' + Sims.gearPath(z, m)
    + '" fill="' + color + '" fill-opacity=".2" stroke="' + color + '" stroke-width="1.6"/><circle r="3" fill="#fff" stroke="' + color + '"/></g>';
}
const ICON = (inner, label) => '<svg viewBox="0 0 130 90" class="getriebe-icon" role="img" aria-label="' + label + '">' + inner + '</svg>';
const B = '#2563EB', O = '#EA580C', G = '#4B5563';

const ICONS = {
  stirnrad: ICON(gearIcon(45, 45, 20, 3.2, B) + gearIcon(45 + 3.2 * 15, 45, 10, 3.2, O, 18), 'Stirnradgetriebe'),
  zugmittel: ICON('<circle cx="35" cy="45" r="24" fill="none" stroke="' + B + '" stroke-width="3"/><circle cx="102" cy="45" r="12" fill="none" stroke="' + O + '" stroke-width="3"/>'
    + '<line x1="35" y1="21" x2="102" y2="33" stroke="' + G + '" stroke-width="3" stroke-dasharray="4 2"/><line x1="35" y1="69" x2="102" y2="57" stroke="' + G + '" stroke-width="3" stroke-dasharray="4 2"/>', 'Zugmittelgetriebe'),
  kegelrad: ICON('<polygon points="20,30 60,38 60,62 20,70" fill="' + B + '" fill-opacity=".2" stroke="' + B + '" stroke-width="2"/><line x1="0" y1="50" x2="20" y2="50" stroke="' + B + '" stroke-width="4"/>'
    + '<polygon points="62,40 102,40 94,78 70,78" fill="' + O + '" fill-opacity=".2" stroke="' + O + '" stroke-width="2"/><line x1="82" y1="78" x2="82" y2="90" stroke="' + O + '" stroke-width="4"/>'
    + '<text x="100" y="22" font-size="11" fill="' + G + '">90°</text>', 'Kegelradgetriebe'),
  schnecke: ICON('<rect x="8" y="10" width="34" height="70" rx="6" fill="' + B + '" fill-opacity=".15" stroke="' + B + '" stroke-width="2"/>'
    + [0, 1, 2, 3, 4, 5].map(k => '<line x1="8" y1="' + (18 + k * 11) + '" x2="42" y2="' + (26 + k * 11) + '" stroke="' + B + '" stroke-width="2"/>').join('')
    + gearIcon(86, 45, 22, 2.8, O), 'Schneckenradgetriebe'),
  zahnstange: ICON(gearIcon(65, 32, 14, 3.2, B)
    + '<path d="M5 64 ' + Array.from({ length: 12 }, (_, k) => 'l3 -6 l4 0 l3 6').join(' ') + ' L125 64 L125 80 L5 80 Z" fill="' + O + '" fill-opacity=".2" stroke="' + O + '" stroke-width="1.6"/>'
    + '<text x="100" y="12" font-size="11" fill="' + G + '">↔</text>', 'Zahnstangengetriebe'),
  schubkurbel: ICON('<circle cx="32" cy="45" r="24" fill="' + B + '" fill-opacity=".15" stroke="' + B + '" stroke-width="2"/><circle cx="32" cy="45" r="3" fill="' + B + '"/><circle cx="32" cy="25" r="4" fill="' + G + '"/>'
    + '<line x1="32" y1="25" x2="88" y2="45" stroke="' + G + '" stroke-width="4" stroke-linecap="round"/>'
    + '<rect x="84" y="35" width="38" height="20" rx="3" fill="' + O + '" fill-opacity=".25" stroke="' + O + '" stroke-width="2"/><text x="96" y="74" font-size="13" fill="' + G + '">⇆</text>', 'Schubkurbelgetriebe')
};

window.LESSON_DATA = (window.LESSON_DATA || []).concat([
  // ---------------------------------------------------------------- L4
  {
    id: 4,
    title: 'Getriebearten',
    explanation: {
      html: `
        <p>In vielen Maschinen sitzen Antrieb (Motor, Tretkurbel) und Abtrieb (Rad, Bohrer) nicht direkt nebeneinander. Ein <strong>Getriebe</strong> überbrückt den Abstand und überträgt die Bewegung. Getriebe gehören zum <strong>Übertragungsteil</strong> einer Maschine.</p>
        <div class="merke">Ein Getriebe kann die <strong>Drehzahl</strong>, die <strong>Kraft</strong> und die <strong>Drehrichtung</strong> verändern. Manche Getriebe machen aus einer Drehung sogar eine ganz andere Bewegung.</div>
        <table class="info-table getriebe-tabelle">
          <tr><th>Getriebeart</th><th>So funktioniert es</th><th>Beispiel</th></tr>
          <tr><td>${ICONS.stirnrad}<strong>Stirnrad&shy;getriebe</strong></td><td>Zahnräder greifen mit ihren Stirnseiten direkt ineinander.</td><td>Uhr, Getriebe im Akkuschrauber</td></tr>
          <tr><td>${ICONS.zugmittel}<strong>Zugmittel&shy;getriebe</strong></td><td>Die Räder berühren sich nicht. Ein Zugmittel (Kette oder Riemen) verbindet sie.</td><td>Fahrradkette, Riemen in der Tischbohrmaschine</td></tr>
          <tr><td>${ICONS.kegelrad}<strong>Kegelrad&shy;getriebe</strong></td><td>Kegelförmige Zahnräder. Die Wellen stehen im Winkel zueinander, oft 90°.</td><td>Handbohrer mit Kurbel, Winkelschleifer</td></tr>
          <tr><td>${ICONS.schnecke}<strong>Schneckenrad&shy;getriebe</strong></td><td>Eine Schnecke (sieht aus wie eine Schraube) treibt ein Zahnrad an. Sie wirkt wie ein Zahnrad mit nur einem Zahn. Die Schnecke ist <strong>immer</strong> der Antrieb.</td><td>Stimmwirbel an der Gitarre</td></tr>
          <tr><td>${ICONS.zahnstange}<strong>Zahnstangen&shy;getriebe</strong></td><td>Aus einer Drehbewegung wird eine <strong>geradlinige</strong> Bewegung. Die Zahnstange ist wie ein abgewickeltes Zahnrad.</td><td>Bohrer absenken an der Tischbohrmaschine, Zahnradbahn</td></tr>
          <tr><td>${ICONS.schubkurbel}<strong>Schubkurbel&shy;getriebe</strong></td><td>Aus einer Drehung wird eine <strong>Hin- und Herbewegung</strong> oder umgekehrt.</td><td>Stichsäge, Kolben im Automotor</td></tr>
        </table>
        <div class="analogy-box"><strong>Wie im Alltag:</strong> Ein Getriebe ist wie ein Übersetzer. Der Motor &bdquo;spricht&ldquo; schnelle Drehungen. Die Stichsäge braucht aber Auf und Ab. Das Schubkurbelgetriebe &bdquo;übersetzt&ldquo; die eine Bewegung in die andere.</div>
        <div class="warning-box"><strong>Typischer Fehler:</strong> Zahnstange und Schubkurbel verwechseln. Die <strong>Zahnstange</strong> fährt geradeaus, solange sich das Zahnrad weiterdreht. Die <strong>Schubkurbel</strong> macht immer wieder <strong>hin und her</strong>, obwohl sich das Rad immer gleich herum dreht.</div>
        <div class="why-context"><strong>Warum ist das wichtig?</strong> Ein Motor kann sich nur drehen, und zwar sehr schnell. Erst das passende Getriebe macht daraus genau die Bewegung, die die Maschine braucht.</div>`
    },
    example: {
      title: 'Welches Getriebe passt?',
      steps: [
        { label: 'Stichsäge', html: '<p>Der Motor dreht sich, das Sägeblatt soll aber <strong>auf und ab</strong> gehen. Gesucht ist also: Drehung → Hin- und Herbewegung. → <strong>Schubkurbelgetriebe</strong></p>' },
        { label: 'Tischbohrmaschine, Bohrer absenken', html: '<p>Du drehst am Hebel, der Bohrer fährt <strong>gerade nach unten</strong>. Drehung → geradlinige Bewegung. → <strong>Zahnstangengetriebe</strong></p>' },
        { label: 'Fahrrad', html: '<p>Die Tretkurbel ist weit vom Hinterrad entfernt. Die Räder berühren sich nicht, eine Kette verbindet sie. → <strong>Zugmittelgetriebe</strong></p>' }
      ]
    },
    exercises: [
      {
        type: 'matching',
        question: 'Ordne jeder Getriebeart die passende Beschreibung zu.',
        pairs: [
          { left: 'Stirnradgetriebe', right: 'Zahnräder greifen direkt ineinander.' },
          { left: 'Zugmittelgetriebe', right: 'Kette oder Riemen verbindet die Räder.' },
          { left: 'Kegelradgetriebe', right: 'Die Wellen stehen im Winkel, z. B. 90°.' },
          { left: 'Schneckenradgetriebe', right: 'Eine Art Schraube treibt ein Zahnrad an.' },
          { left: 'Zahnstangengetriebe', right: 'Aus Drehen wird eine gerade Bewegung.' },
          { left: 'Schubkurbelgetriebe', right: 'Aus Drehen wird eine Hin- und Herbewegung.' }
        ],
        explanation: 'Die Namen verraten viel: Kegel-rad = kegelförmig, Zug-mittel = etwas, das zieht (Kette), Schub-kurbel = Kurbel, die schiebt.'
      },
      {
        type: 'matching',
        question: 'Welches Getriebe steckt darin?',
        pairs: [
          { left: 'Fahrradkette', right: 'Zugmittelgetriebe' },
          { left: 'Stichsäge: Sägeblatt geht auf und ab', right: 'Schubkurbelgetriebe' },
          { left: 'Stimmwirbel an der Gitarre', right: 'Schneckenradgetriebe' },
          { left: 'Tischbohrmaschine: Bohrer fährt nach unten', right: 'Zahnstangengetriebe' },
          { left: 'Handbohrer: Kurbel dreht sich quer zum Bohrer', right: 'Kegelradgetriebe' }
        ],
        explanation: 'Frag immer zuerst: Welche Bewegung kommt rein, welche soll rauskommen? Und: Berühren sich die Räder, oder liegt etwas dazwischen?'
      },
      {
        type: 'multiple-choice',
        question: 'Ein Motor dreht sich. Ein Teil der Maschine soll sich dadurch ein Stück geradeaus bewegen, so wie der Bohrer beim Absenken. Welches Getriebe brauchst du?',
        options: ['Zahnstangengetriebe', 'Schubkurbelgetriebe', 'Kegelradgetriebe', 'Stirnradgetriebe'],
        correct: 0,
        wrongExplanations: {
          1: 'Die Schubkurbel macht ein ständiges Hin und Her. Gesucht ist eine gerade Bewegung in eine Richtung.',
          2: 'Beim Kegelradgetriebe kommt wieder eine Drehung heraus, nur in einem anderen Winkel.',
          3: 'Zwei Stirnräder geben wieder eine Drehung aus. Geradeaus bewegt sich dabei nichts.'
        }
      },
      {
        type: 'multiple-choice',
        question: 'Was stimmt beim Schneckenradgetriebe?',
        options: ['Die Schnecke ist immer der Antrieb.', 'Das Zahnrad kann die Schnecke antreiben.', 'Die Räder werden mit einer Kette verbunden.', 'Es macht aus Drehen eine Hin- und Herbewegung.'],
        correct: 0,
        wrongExplanations: {
          1: 'Genau das klappt nicht: Das Zahnrad blockiert, wenn man es drehen will. Deshalb verstellt sich ein Gitarren-Stimmwirbel nicht von selbst.',
          2: 'Eine Kette gibt es beim Zugmittelgetriebe. Beim Schneckenradgetriebe greift die Schnecke direkt ins Zahnrad.',
          3: 'Das macht das Schubkurbelgetriebe. Beim Schneckenradgetriebe kommt wieder eine Drehung heraus.'
        }
      },
      {
        type: 'fill-in-blank',
        question: 'Ergänze.',
        text: 'Getriebe gehören zum {{blank}} einer Maschine. Bei einem {{blank}} berühren sich die Räder nicht, eine Kette oder ein Riemen verbindet sie.',
        blanks: [
          { correct: 'Übertragungsteil', alternatives: ['Uebertragungsteil'] },
          { correct: 'Zugmittelgetriebe', alternatives: ['Kettengetriebe', 'Riemengetriebe'] }
        ],
        explanation: 'Getriebe übertragen die Bewegung vom Antrieb zum Arbeitsteil, darum Übertragungsteil.'
      },
      {
        type: 'free-text',
        question: 'Erkläre in 2–3 Sätzen, warum man Getriebe braucht. Denk an den Motor einer Stichsäge.',
        minWords: 12,
        modelAnswer: 'Ein Motor dreht sich nur, und zwar sehr schnell. Mit einem Getriebe kann man die Drehzahl, die Kraft und die Drehrichtung verändern und Abstände überbrücken. Bei der Stichsäge macht ein Schubkurbelgetriebe aus der Drehung des Motors die Auf- und Abbewegung des Sägeblatts.'
      }
    ]
  },

  // ---------------------------------------------------------------- L5
  {
    id: 5,
    title: 'Übersetzungsverhältnis i',
    explanation: {
      html: `
        <p>Das Rad, das vom Motor gedreht wird, heißt <strong>Antriebsrad</strong>. Seine Zähnezahl heißt <strong>z<sub>1</sub></strong>. Das Rad, das die Bewegung weitergibt, heißt <strong>Abtriebsrad</strong> mit <strong>z<sub>2</sub></strong> Zähnen.</p>
        <p class="formel">i = z<sub>2</sub> : z<sub>1</sub> &nbsp; (Zähne Abtrieb : Zähne Antrieb)</p>
        <p>Danach <strong>kürzen</strong>, wie bei einem Bruch. Beispiel: 20 : 40 = 1 : 2.</p>
        <div class="sim" data-sim="getriebe"></div>
        <table class="info-table">
          <tr><th>Fall</th><th>i</th><th>Name</th><th>Abtrieb</th></tr>
          <tr><td>Groß treibt Klein an</td><td>kleiner als 1, z. B. 1 : 2</td><td><strong>Übersetzung ins Schnelle</strong></td><td>dreht schneller, hat aber weniger Kraft</td></tr>
          <tr><td>Klein treibt Groß an</td><td>größer als 1, z. B. 2 : 1</td><td><strong>Übersetzung ins Langsame</strong></td><td>dreht langsamer, hat aber mehr Kraft</td></tr>
          <tr><td>Beide gleich groß</td><td>1 : 1</td><td>keine Übersetzung</td><td>gleiche Drehzahl, gleiche Kraft</td></tr>
        </table>
        <div class="merke">Was man an Drehzahl gewinnt, verliert man an Kraft, und umgekehrt. Dreht der Abtrieb doppelt so schnell, hat er nur noch die halbe Kraft.</div>
        <div class="tip-box"><strong>So liest du i:</strong> i = 1 : 2 heißt: Dreht sich das Antriebsrad <strong>1-mal</strong>, dreht sich das Abtriebsrad <strong>2-mal</strong>. Bei Ketten zählst du auch die Zähne. Bei Riemen nimmst du statt der Zähne die <strong>Durchmesser</strong> der Riemenscheiben.</div>
        <div class="analogy-box"><strong>Wie im Alltag:</strong> Am Berg schaltest du beim Fahrrad hinten auf ein <strong>großes</strong> Ritzel. Dann trittst du leicht (mehr Kraft), kommst aber langsamer voran. Auf gerader Strecke nimmst du ein kleines Ritzel: schwerer zu treten, aber schnell.</div>
        <div class="why-context"><strong>Warum ist das wichtig?</strong> Ein Akkuschrauber-Motor dreht viel zu schnell und zu schwach, um eine Schraube einzudrehen. Erst die Übersetzung ins Langsame gibt ihm genug Kraft.</div>`
    },
    example: {
      title: 'Musterbeispiel: z₁ = 45, z₂ = 15',
      steps: [
        { label: 'i aufstellen', html: '<p>i = z<sub>2</sub> : z<sub>1</sub> = 15 : 45<br><em>Warum?</em> Die Zähne vom Abtrieb stehen vorne.</p>' },
        { label: 'Kürzen', html: '<p>Beide Zahlen durch 15 teilen: i = <strong>1 : 3</strong><br><em>Warum?</em> Gekürzt siehst du sofort: 1 Umdrehung am Antrieb gibt 3 Umdrehungen am Abtrieb.</p>' },
        { label: 'Deuten', html: '<p>i ist kleiner als 1, das große Rad treibt das kleine an: <strong>Übersetzung ins Schnelle</strong>.<br><em>Warum?</em> Das kleine Rad muss sich öfter drehen, um gleich viele Zähne weiterzuschieben.</p>' },
        { label: 'Kraft', html: '<p>Der Abtrieb dreht 3-mal so schnell, hat also nur noch <strong>ein Drittel</strong> der Kraft.<br><em>Warum?</em> Was man an Drehzahl gewinnt, verliert man an Kraft.</p>' }
      ]
    },
    exercisesIntro: 'Erst fehlt nur der letzte Schritt, dann zwei, dann rechnest du allein. Schreib Verhältnisse so: <strong>1 : 3</strong>',
    exercises: [
      {
        type: 'fill-in-blank',
        question: 'Rechne zu Ende. Gegeben: z<sub>1</sub> = 48, z<sub>2</sub> = 16.<br>Schritt 1: i = 16 : 48. Schritt 2: gekürzt i = 1 : 3. Schritt 3: Übersetzung ins Schnelle.',
        text: 'Schritt 4: Die Kraft am Abtrieb ist nur noch {{blank}} so groß.',
        blanks: [{ correct: 'ein Drittel', alternatives: ['1/3', 'ein drittel', 'drittel', '1 drittel', 'ein 1/3', '1:3', '1 : 3', 'ein Drittel so groß'] }],
        explanation: 'Der Abtrieb dreht 3-mal so schnell, darum bleibt nur ein Drittel der Kraft.'
      },
      {
        type: 'fill-in-blank',
        question: 'Jetzt fehlen die letzten zwei Schritte. Gegeben: z<sub>1</sub> = 14, z<sub>2</sub> = 42.<br>Schritt 1: i = 42 : 14.',
        text: 'Schritt 2: gekürzt i = {{blank}}. Schritt 3: Das ist eine Übersetzung ins {{blank}}.',
        blanks: [
          { correct: '3 : 1', alternatives: ['3:1', '3 :1', '3: 1', '3 zu 1', '3/1', 'i = 3 : 1', 'i=3:1', 'i = 3:1'] },
          { correct: 'Langsame', alternatives: ['langsame'] }
        ],
        explanation: '42 : 14 = 3 : 1 (beide durch 14). i ist größer als 1, das kleine Rad treibt das große an: Übersetzung ins Langsame.'
      },
      {
        type: 'fill-in-blank',
        question: 'Jetzt allein: Ein Fahrrad hat vorne ein Kettenblatt mit 39 Zähnen (Antrieb) und hinten ein Ritzel mit 13 Zähnen (Abtrieb).',
        text: 'i = {{blank}}. Bei einer Kurbelumdrehung dreht sich das Hinterrad {{blank}}-mal.',
        blanks: [
          { correct: '1 : 3', alternatives: ['1:3', '1 :3', '1: 3', '1 zu 3', '1/3', 'i = 1 : 3', 'i=1:3', 'i = 1:3'] },
          { correct: '3', alternatives: ['drei'] }
        ],
        explanation: 'i = z₂ : z₁ = 13 : 39 = 1 : 3. Das kleine Ritzel dreht sich 3-mal, und das Hinterrad dreht sich mit dem Ritzel.'
      },
      {
        type: 'multiple-choice',
        question: 'Ein großes Antriebsrad treibt ein kleines Abtriebsrad an. Was passiert am Abtrieb?',
        options: ['Er dreht schneller, hat aber weniger Kraft.', 'Er dreht schneller und hat mehr Kraft.', 'Er dreht langsamer, hat aber mehr Kraft.', 'Drehzahl und Kraft bleiben gleich.'],
        correct: 0,
        wrongExplanations: {
          1: 'Schneller UND stärker geht nicht: Was man an Drehzahl gewinnt, verliert man an Kraft.',
          2: 'Das passiert, wenn das kleine Rad das große antreibt. Hier ist es umgekehrt.',
          3: 'Gleich bleibt es nur bei gleich großen Rädern (1 : 1).'
        }
      },
      {
        type: 'matching',
        question: 'Was bedeutet das Übersetzungsverhältnis? Ordne zu.',
        pairs: [
          { left: 'i = 1 : 4', right: 'Abtrieb 4-mal so schnell, ein Viertel der Kraft' },
          { left: 'i = 4 : 1', right: 'Abtrieb 4-mal langsamer, 4-mal so viel Kraft' },
          { left: 'i = 1 : 2', right: 'Abtrieb doppelt so schnell, halbe Kraft' },
          { left: 'i = 1 : 1', right: 'gleiche Drehzahl, gleiche Kraft' }
        ],
        explanation: 'Lies i als: Antrieb dreht sich … mal, Abtrieb dreht sich … mal. Bei 1 : 4 dreht der Abtrieb 4-mal, also schneller und schwächer.'
      },
      {
        type: 'number',
        question: 'Ein Antriebsrad hat z<sub>1</sub> = 12 Zähne. Am Abtrieb soll 5-mal so viel Kraft verfügbar sein. Wie viele Zähne braucht das Abtriebsrad?',
        answer: 60,
        unit: 'Zähne',
        hint: '5-mal so viel Kraft heißt: Übersetzung ins Langsame mit i = 5 : 1.',
        solution: 'i = 5 : 1, also muss z₂ 5-mal so groß sein wie z₁<br>z₂ = 5 · 12 = <strong>60 Zähne</strong>'
      },
      {
        type: 'multiple-choice',
        question: 'Du fährst mit dem Fahrrad einen steilen Berg hoch. Auf welches Ritzel schaltest du hinten, und warum?',
        options: ['Auf ein großes Ritzel: Übersetzung ins Langsame, mehr Kraft', 'Auf ein kleines Ritzel: Übersetzung ins Schnelle, mehr Kraft', 'Auf ein kleines Ritzel: Übersetzung ins Langsame, mehr Kraft', 'Egal, die Übersetzung ändert nur die Geschwindigkeit'],
        correct: 0,
        wrongExplanations: {
          1: 'Ins Schnelle heißt weniger Kraft am Hinterrad. Am Berg wird das Treten dann sehr schwer.',
          2: 'Ein kleines Ritzel hinten ergibt eine Übersetzung ins Schnelle, nicht ins Langsame.',
          3: 'Die Übersetzung ändert Drehzahl UND Kraft. Genau deshalb schaltet man am Berg.'
        }
      }
    ]
  },

  // ---------------------------------------------------------------- L6
  {
    id: 6,
    title: 'Drehzahl berechnen',
    explanation: {
      html: `
        <p>Die <strong>Drehzahl n</strong> sagt, wie oft sich ein Rad in einer Minute dreht. Einheit: <strong>U/min</strong> (Umdrehungen pro Minute). n<sub>1</sub> gehört zum Antriebsrad, n<sub>2</sub> zum Abtriebsrad.</p>
        <p class="formel">i = z<sub>2</sub> : z<sub>1</sub> = n<sub>1</sub> : n<sub>2</sub></p>
        <div class="warning-box"><strong>Achtung, Falle:</strong> Bei den <strong>Zähnen</strong> steht das <strong>Abtriebsrad vorne</strong>, bei den <strong>Drehzahlen</strong> das <strong>Antriebsrad</strong>. Das passt: Das Rad mit weniger Zähnen dreht sich schneller.</div>
        <h3>So rechnest du n<sub>2</sub></h3>
        <table class="info-table">
          <tr><th>i (gekürzt)</th><th>Bedeutung</th><th>Rechnung</th></tr>
          <tr><td>1 : 3 (ins Schnelle)</td><td>Abtrieb dreht 3-mal so schnell</td><td>n<sub>2</sub> = n<sub>1</sub> <strong>· 3</strong></td></tr>
          <tr><td>3 : 1 (ins Langsame)</td><td>Abtrieb dreht 3-mal langsamer</td><td>n<sub>2</sub> = n<sub>1</sub> <strong>: 3</strong></td></tr>
        </table>
        <div class="tip-box"><strong>Probe:</strong> Das <strong>kleinere</strong> Rad muss sich <strong>schneller</strong> drehen. Ist dein Ergebnis andersherum, hast du z<sub>1</sub> und z<sub>2</sub> vertauscht.</div>
        <div class="analogy-box"><strong>Wie im Alltag:</strong> Ein Kind und ein Erwachsener gehen nebeneinander gleich schnell. Das Kind mit den kurzen Beinen muss viel mehr Schritte machen. Genauso muss das kleine Zahnrad sich öfter drehen, um mit dem großen mitzuhalten.</div>
        <div class="why-context"><strong>Warum ist das wichtig?</strong> Bei der Tischbohrmaschine stellst du mit dem Riemen die Drehzahl ein. Dicke Bohrer und Metall brauchen eine kleine Drehzahl, sonst wird der Bohrer heiß und stumpf.</div>`
    },
    example: {
      title: 'Musterbeispiel: z₁ = 60, z₂ = 20, n₁ = 45 U/min',
      steps: [
        { label: 'i aufstellen', html: '<p>i = z<sub>2</sub> : z<sub>1</sub> = 20 : 60<br><em>Warum?</em> Bei den Zähnen steht das Abtriebsrad vorne.</p>' },
        { label: 'Kürzen', html: '<p>Durch 20 teilen: i = <strong>1 : 3</strong><br><em>Warum?</em> Jetzt siehst du: 1 Umdrehung am Antrieb gibt 3 am Abtrieb.</p>' },
        { label: 'Deuten', html: '<p>i kleiner als 1 → <strong>Übersetzung ins Schnelle</strong>. Der Abtrieb dreht 3-mal so schnell.</p>' },
        { label: 'Drehzahl rechnen', html: '<p>n<sub>2</sub> = 45 · 3 = <strong>135 U/min</strong><br><em>Warum mal?</em> Ins Schnelle heißt: Der Abtrieb dreht öfter.</p>' },
        { label: 'Probe', html: '<p>Das kleine Rad (20 Zähne) dreht schneller (135) als das große (45). ✓</p>' }
      ]
    },
    exercisesIntro: 'Erst fehlt nur der letzte Schritt, dann zwei, dann rechnest du allein. Gib bei Drehzahlen nur die Zahl ein, die Einheit steht schon da. Schreib Verhältnisse so: <strong>3 : 1</strong>',
    exercises: [
      {
        type: 'number',
        question: 'Rechne zu Ende. Gegeben: z<sub>1</sub> = 40, z<sub>2</sub> = 10, n<sub>1</sub> = 30 U/min.<br>Schritt 1: i = 10 : 40. Schritt 2: gekürzt i = 1 : 4. Schritt 3: Übersetzung ins Schnelle, der Abtrieb dreht 4-mal so schnell.<br>Schritt 4: n<sub>2</sub> = ?',
        answer: 120,
        unit: 'U/min',
        solution: 'n₂ = 30 · 4 = <strong>120 U/min</strong>'
      },
      {
        type: 'fill-in-blank',
        question: 'Jetzt fehlen zwei Schritte. Gegeben: z<sub>1</sub> = 16, z<sub>2</sub> = 48, n<sub>1</sub> = 90 U/min.<br>Schritt 1: i = 48 : 16.',
        text: 'Schritt 2: gekürzt i = {{blank}}. Schritt 3: n<sub>2</sub> = {{blank}} U/min.',
        blanks: [
          { correct: '3 : 1', alternatives: ['3:1', '3 :1', '3: 1', '3 zu 1', '3/1', 'i = 3 : 1', 'i=3:1', 'i = 3:1'] },
          { correct: '30', alternatives: ['30 U/min'] }
        ],
        explanation: '48 : 16 = 3 : 1 → Übersetzung ins Langsame, also n₂ = 90 : 3 = 30 U/min. Probe: Das große Rad dreht langsamer. ✓'
      },
      {
        type: 'number',
        question: 'Allein: z<sub>1</sub> = 18, z<sub>2</sub> = 54, n<sub>1</sub> = 150 U/min. Wie groß ist n<sub>2</sub>?',
        answer: 50,
        unit: 'U/min',
        hint: 'Erst i aufstellen und kürzen. Ist es ins Schnelle oder ins Langsame?',
        solution: 'i = 54 : 18 = 3 : 1 (ins Langsame)<br>n₂ = 150 : 3 = <strong>50 U/min</strong>'
      },
      {
        type: 'number',
        question: 'Eine Handkurbel hat ein Zahnrad mit 36 Zähnen (Antrieb). Es treibt ein Rad mit 12 Zähnen an. Du kurbelst 50-mal pro Minute. Wie oft dreht sich das Abtriebsrad pro Minute?',
        answer: 150,
        unit: 'U/min',
        hint: 'Großes Rad treibt kleines an.',
        solution: 'i = 12 : 36 = 1 : 3 (ins Schnelle)<br>n₂ = 50 · 3 = <strong>150 U/min</strong>'
      },
      {
        type: 'multiple-choice',
        question: 'Finde den Fehler! Lena soll n<sub>2</sub> berechnen: z<sub>1</sub> = 36, z<sub>2</sub> = 12, n<sub>1</sub> = 60 U/min.<br>Lena rechnet: i = 36 : 12 = 3 : 1, also n<sub>2</sub> = 60 : 3 = 20 U/min.<br>Wo steckt der Fehler?',
        options: [
          'Sie hat z₁ und z₂ vertauscht.',
          'Sie hat falsch gekürzt, 36 : 12 ergibt gekürzt 4 : 1.',
          'Sie hätte 60 · 3 rechnen müssen, i = 3 : 1 stimmt aber.',
          'Es ist alles richtig.'
        ],
        correct: 0,
        wrongExplanations: {
          1: '36 : 12 gekürzt ist wirklich 3 : 1. Der Fehler steckt schon davor: in der Reihenfolge.',
          2: 'Bei i = 3 : 1 wäre &bdquo;geteilt durch 3&ldquo; richtig. Aber i = 3 : 1 stimmt nicht, weil z₂ vorne stehen muss.',
          3: 'Mach die Probe: Das kleine Rad (12 Zähne) müsste schneller drehen als 60 U/min. Lenas 20 U/min sind langsamer.'
        }
      },
      {
        type: 'number',
        question: 'Rechne Lenas Aufgabe richtig: z<sub>1</sub> = 36, z<sub>2</sub> = 12, n<sub>1</sub> = 60 U/min. n<sub>2</sub> = ?',
        answer: 180,
        unit: 'U/min',
        solution: 'i = 12 : 36 = 1 : 3 (ins Schnelle)<br>n₂ = 60 · 3 = <strong>180 U/min</strong><br>Probe: Das kleine Rad dreht schneller. ✓'
      },
      {
        type: 'number',
        question: 'Gemischt: Ein Motor dreht eine Riemenscheibe mit <strong>120 mm</strong> Durchmesser mit 500 U/min. Der Riemen treibt eine Scheibe mit <strong>40 mm</strong> Durchmesser an. Wie schnell dreht sie sich?',
        answer: 1500,
        unit: 'U/min',
        hint: 'Welche Getriebeart ist das? Bei Riemen nimmst du die Durchmesser statt der Zähne.',
        solution: 'Zugmittelgetriebe mit Riemen → Durchmesser nehmen<br>i = 40 : 120 = 1 : 3 (ins Schnelle)<br>n₂ = 500 · 3 = <strong>1500 U/min</strong>'
      }
    ]
  },

  // ---------------------------------------------------------------- L7
  {
    id: 7,
    title: 'Drehrichtung und Zwischenrad',
    explanation: {
      html: `
        <p>Zwei Zahnräder, die ineinandergreifen, drehen sich immer <strong>gegensinnig</strong>: Dreht das eine im Uhrzeigersinn, dreht das andere gegen den Uhrzeigersinn. Jedes weitere Rad dreht die Richtung wieder um.</p>
        <div class="sim" data-sim="zwischenrad"></div>
        <div class="merke"><strong>Gerade</strong> Anzahl Räder (2, 4, 6 …): Das letzte Rad dreht <strong>andersherum</strong> als das erste.<br><strong>Ungerade</strong> Anzahl (3, 5 …): Das letzte Rad dreht in die <strong>gleiche Richtung</strong>.</div>
        <h3>Das Zwischenrad</h3>
        <p>Ein Rad zwischen Antrieb und Abtrieb heißt <strong>Zwischenrad</strong>. Es ändert <strong>nur die Drehrichtung</strong>, nicht die Übersetzung. Du rechnest deshalb nur mit dem ersten Rad (Antrieb) und dem letzten Rad (Abtrieb). Wie viele Zähne das Zwischenrad hat, ist egal.</p>
        <div class="analogy-box"><strong>Wie im Alltag:</strong> Bei einer Eimerkette reicht jeder seinen Eimer an den Nächsten weiter. Ein zusätzlicher Helfer in der Mitte ändert nichts daran, wie viele Eimer am Ende ankommen. Genauso schiebt das Zwischenrad jeden Zahn einfach weiter: 1 Zahn rein, 1 Zahn raus.</div>
        <h3>Kette und Riemen</h3>
        <p>Bei einer Kette oder einem Riemen drehen beide Räder in die <strong>gleiche Richtung</strong> (schau dir dein Fahrrad an). Soll sich die Richtung ändern, legt man den Riemen <strong>über Kreuz</strong>, wie eine liegende Acht.</p>
        <div class="warning-box"><strong>Typischer Fehler:</strong> Die Zähne des Zwischenrads in die Rechnung nehmen. Gerechnet wird immer: Zähne des letzten Rads : Zähne des ersten Rads.</div>
        <div class="why-context"><strong>Warum ist das wichtig?</strong> Oft soll der Abtrieb sich in eine bestimmte Richtung drehen, zum Beispiel ein Förderband nach vorne. Mit einem Zwischenrad stellt man die Richtung ein, ohne die Drehzahl zu ändern.</div>`
    },
    example: {
      title: 'Getriebe planen: 3-mal langsamer und gleiche Richtung',
      steps: [
        { label: 'Aufgabe', html: '<p>Das Antriebsrad hat 15 Zähne. Das Abtriebsrad soll sich <strong>3-mal langsamer</strong> drehen und in die <strong>gleiche Richtung</strong>.</p>' },
        { label: 'Übersetzung', html: '<p>3-mal langsamer heißt i = 3 : 1. Das Abtriebsrad braucht also 3 · 15 = <strong>45 Zähne</strong>.</p>' },
        { label: 'Richtung', html: '<p>Mit nur 2 Rädern würde sich das Abtriebsrad andersherum drehen (gerade Anzahl). Also kommt ein <strong>Zwischenrad</strong> dazu, Größe beliebig.</p>' },
        { label: 'Ergebnis', html: '<p>3 Räder: 15 Zähne → Zwischenrad → 45 Zähne. Ungerade Anzahl, also gleiche Richtung. i bleibt 45 : 15 = <strong>3 : 1</strong>.</p>' }
      ]
    },
    exercises: [
      {
        type: 'matching',
        question: 'Vier Zahnräder greifen in einer Reihe ineinander. Rad 1 dreht sich im Uhrzeigersinn. Wie drehen sich die anderen?',
        pairs: [
          { left: 'Rad 2', right: 'gegen den Uhrzeigersinn' },
          { left: 'Rad 3', right: 'im Uhrzeigersinn' },
          { left: 'Rad 4', right: 'gegen den Uhrzeigersinn' }
        ],
        explanation: 'Die Richtung wechselt von Rad zu Rad. Rad 4 ist das vierte, also eine gerade Anzahl: andersherum als Rad 1.'
      },
      {
        type: 'multiple-choice',
        question: 'Fünf Zahnräder greifen in einer Reihe ineinander. Rad 1 dreht im Uhrzeigersinn. Wie dreht Rad 5?',
        options: ['im Uhrzeigersinn', 'gegen den Uhrzeigersinn', 'gar nicht, es blockiert', 'abwechselnd hin und her'],
        correct: 0,
        wrongExplanations: {
          1: 'Zähl mit: 1 rechts, 2 links, 3 rechts, 4 links, 5 rechts. Bei einer ungeraden Anzahl dreht das letzte Rad wie das erste.',
          2: 'Blockieren würde nur ein Kreis aus drei Rädern, die sich alle gegenseitig berühren. In einer Reihe läuft alles.',
          3: 'Zahnräder in einer Reihe drehen sich gleichmäßig in eine Richtung. Hin und her macht eine Schubkurbel.'
        }
      },
      {
        type: 'fill-in-blank',
        question: 'Ergänze.',
        text: 'Ein Zwischenrad ändert nur die {{blank}}, nicht die Übersetzung. Bei einer Fahrradkette drehen sich Kettenblatt und Ritzel in die {{blank}} Richtung.',
        blanks: [
          { correct: 'Drehrichtung', alternatives: ['Richtung'] },
          { correct: 'gleiche', alternatives: ['selbe', 'gleichen'] }
        ],
        explanation: 'Zwischenrad = nur Richtungswechsel. Kette und Riemen = gleiche Richtung (außer der Riemen liegt über Kreuz).'
      },
      {
        type: 'number',
        question: 'Rad 1 (Antrieb) hat 16 Zähne und dreht mit 120 U/min. Rad 2 ist ein Zwischenrad mit 25 Zähnen. Rad 3 (Abtrieb) hat 48 Zähne. Wie schnell dreht Rad 3?',
        answer: 40,
        unit: 'U/min',
        hint: 'Das Zwischenrad lässt du beim Rechnen weg.',
        solution: 'Nur erstes und letztes Rad: i = 48 : 16 = 3 : 1 (ins Langsame)<br>n₃ = 120 : 3 = <strong>40 U/min</strong>'
      },
      {
        type: 'fill-in-blank',
        question: 'Gemischt: Ein Antriebsrad hat 20 Zähne. Das letzte Rad soll sich <strong>halb so schnell</strong> drehen und in die <strong>gleiche Richtung</strong> wie das Antriebsrad. Plane das Getriebe.',
        text: 'Das letzte Rad braucht {{blank}} Zähne. Man braucht mindestens {{blank}} Räder.',
        blanks: [
          { correct: '40', alternatives: [] },
          { correct: '3', alternatives: ['drei'] }
        ],
        explanation: 'Halb so schnell heißt i = 2 : 1, also 2 · 20 = 40 Zähne. Gleiche Richtung braucht eine ungerade Anzahl: Antriebsrad, Zwischenrad, Abtriebsrad = 3 Räder.'
      },
      {
        type: 'free-text',
        question: 'Erkläre in eigenen Worten, warum die Zähnezahl des Zwischenrads in der Rechnung keine Rolle spielt.',
        minWords: 10,
        modelAnswer: 'Das Zwischenrad gibt jeden Zahn nur weiter: Schiebt das Antriebsrad einen Zahn weiter, schiebt das Zwischenrad auch genau einen Zahn ins Abtriebsrad. Darum hängt die Übersetzung nur vom ersten und letzten Rad ab. Das Zwischenrad ändert nur die Drehrichtung.'
      }
    ]
  }
]);
