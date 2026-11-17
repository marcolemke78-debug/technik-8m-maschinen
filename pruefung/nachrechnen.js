// Prüfskript (Regel 7): rechnet jede Zahl-Aufgabe UNABHÄNGIG aus dem Aufgabentext nach.
// Für jede Aufgabe vom Typ 'number' muss unten eine eigene Rechnung stehen,
// die NICHT das Feld `answer` benutzt. Fehlt eine, meldet das Skript es.
// Aufruf (im Paketordner): node pruefung/nachrechnen.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ctx = { window: {} };
ctx.window = ctx;
vm.createContext(ctx);
const jsDir = path.join(__dirname, '..', 'js');
// sims.js zuerst: lessons-getriebe.js nutzt Sims.gearPath für die Bilder
['sims.js'].concat(fs.readdirSync(jsDir).filter(f => /^lessons-.*\.js$/.test(f))).forEach(f => {
  vm.runInContext(fs.readFileSync(path.join(jsDir, f), 'utf8'), ctx);
});

// Eigene Rechnungen: Schlüssel = eindeutiges Stück aus dem Fragetext
// i = z2 : z1. Ins Schnelle (z1 > z2): n2 = n1 * z1 / z2. Allgemein: n2 = n1 * z1 / z2.
const n2 = (z1, z2, n1) => n1 * z1 / z2;
const RECHNUNGEN = {
  'Am Abtrieb soll 5-mal so viel Kraft': () => 5 * 12                  // L5: z2 = 5 * z1
};

// Lückentexte mit Zahlen/Verhältnissen: erwartete Lösung aus dem Text neu gerechnet
const gcd = (a, b) => b ? gcd(b, a % b) : a;
const ratio = (z1, z2) => { const g = gcd(z2, z1); return (z2 / g) + ' : ' + (z1 / g); };
const LUECKEN = {
  'z<sub>1</sub> = 14, z<sub>2</sub> = 42': [ratio(14, 42), 'Langsame'],
  'Kettenblatt mit 39 Zähnen': [ratio(39, 13), String(39 / 13)],
  'Das letzte Zahnrad soll sich <strong>halb so schnell</strong>': [String(2 * 20), '3'],
  'Rad 1 (Antrieb) hat 16 Zähne': [ratio(16, 48), 'Langsame']  // Zwischenrad egal
};
Object.keys(LUECKEN).forEach(k => {
  let found = false;
  ctx.LESSON_DATA.forEach(l => (l.exercises || []).forEach(ex => {
    if (ex.type !== 'fill-in-blank' || ex.question.indexOf(k) === -1) return;
    found = true;
    const got = ex.blanks.map(b => b.correct);
    if (JSON.stringify(got) !== JSON.stringify(LUECKEN[k])) { console.log('FALSCH Lücke L' + l.id + ': ' + got + ' statt ' + LUECKEN[k]); process.exitCode = 1; }
  }));
  if (!found) { console.log('FEHLT Lückentext: ' + k); process.exitCode = 1; }
});

let fehler = 0, geprueft = 0;
ctx.LESSON_DATA.forEach(lesson => (lesson.exercises || []).forEach((ex, i) => {
  if (ex.type !== 'number') return;
  const key = Object.keys(RECHNUNGEN).find(k => ex.question.indexOf(k) !== -1);
  const wo = 'Lektion ' + lesson.id + ', Übung ' + (i + 1);
  if (!key) { fehler++; console.log('FEHLT  ' + wo + ': keine eigene Rechnung'); return; }
  const soll = RECHNUNGEN[key]();
  geprueft++;
  if (Math.abs(soll - ex.answer) > 1e-9) { fehler++; console.log('FALSCH ' + wo + ': answer ' + ex.answer + ', nachgerechnet ' + soll); }
}));
console.log(geprueft + ' Aufgaben nachgerechnet, ' + fehler + ' Probleme');
process.exit(fehler || process.exitCode ? 1 : 0);
