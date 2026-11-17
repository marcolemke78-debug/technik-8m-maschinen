// Prüft alle Lücken und Trainer-Karten mit Schülereingabe-Varianten + Gegenproben.
// Aufruf im Projektordner: node pruefung/eingaben.js . pruefung/eingaben-faelle.json
// Fälle: [Lektions-ID, Nr. der Lückenübung in der Lektion (ab 0), Lücke (ab 0), Eingabe, erwartet]
const fs = require('fs'), vm = require('vm');
const root = process.argv[2];
const ctx = { window: {}, document: { addEventListener(){}, createElement(){ return {style:{},setAttribute(){},appendChild(){},addEventListener(){}}; }, getElementById(){return null;}, querySelector(){return null;} }, console, localStorage: { getItem(){return null;}, setItem(){} } };
vm.createContext(ctx);
const load = f => vm.runInContext(fs.readFileSync(root + '/js/' + f, 'utf8'), ctx, { filename: f });
['ka-daten.js','progress.js','exercises.js','trainer.js','cards.js'].forEach(load);
try { load('sims.js'); } catch (e) {}

['lessons-maschinen.js','lessons-getriebe.js'].forEach(f => { try { load(f); } catch (e) { console.log('LOADERR', f, e.message); } });
const src = fs.readFileSync(root + '/js/exercises.js', 'utf8');
const body = src.slice(src.indexOf('function checkOne(input, blank) {'), src.indexOf('\n    }\n', src.indexOf('function checkOne')) + 6);
const checkOne = vm.runInContext('(' + body + ')', ctx);
const ok = (v, b) => checkOne({ value: v }, b);
let fail = 0, n = 0;
const variants = s => {
  const v = [s, s.toLowerCase(), s.toUpperCase(), ' ' + s + ' ', s + '.', s + ' ', s.replace(/ä/g,'a').replace(/ü/g,'u').replace(/ö/g,'o'), s.replace(/ä/g,'ae').replace(/ü/g,'ue').replace(/ö/g,'oe'), s.replace(/ : /g, ':'), s.replace(/ : /g, ' zu '), s.replace(/ : /g, '/'), 'i = ' + s];
  if (/^[A-ZÄÖÜ][a-zäöüß]+$/.test(s)) v.push('die ' + s, 'das ' + s, 'der ' + s);
  return v.filter(x => !/^i = [A-Za-zÄÖÜ]/.test(x));
};
const lessons = ctx.window.LESSON_DATA;
console.log('Lektionen:', lessons.map(l => l.id).join(','));
lessons.forEach(l => (l.exercises || []).forEach((ex, ei) => {
  if (ex.type !== 'fill-in-blank') return;
  ex.blanks.forEach((b, bi) => {
    [b.correct].concat(b.alternatives || []).forEach(a => variants(a).forEach(v => { n++; if (!ok(v, b)) { fail++; console.log('ABGELEHNT L' + l.id + 'E' + (ei+1) + 'B' + (bi+1), JSON.stringify(v)); } }));
  });
}));
// gezielte Fälle: [Lektion-ID, Übungsnr (1-basiert), Lücke, Eingabe, erwartet]
const L = id => lessons.find(l => l.id === id);
const fb = (id, e) => L(id).exercises.filter(x => x.type === 'fill-in-blank')[e];
const cases = process.argv[3] ? JSON.parse(fs.readFileSync(process.argv[3], 'utf8')) : [];
cases.forEach(([id, e, bi, v, exp]) => { n++; const r = ok(v, fb(id, e).blanks[bi]); if (r !== exp) { fail++; console.log('FALL', id, e, bi, JSON.stringify(v), 'erwartet', exp, 'ist', r); } });
// Trainer
const T = vm.runInContext('Trainer', ctx), C = vm.runInContext('CARDS', ctx);
C.items.filter(c => (c.mode || 'type') === 'type').forEach(c => {
  [c.back].concat(c.alt || [], c.accept || []).forEach(a => variants(a).forEach(v => { n++; const r = T.judge(v, c); if (r !== 'right') { fail++; console.log('KARTE', c.id, JSON.stringify(v), r); } }));
});
const tcases = [['m04','Motor','right'],['m06','Getriebe','right'],['m08','Gestell','right'],['m07','Werkzeug','right'],['m05','Schalter','right'],['e04','Walzlager','right'],['e04','Wälzlagern','right'],['m06','Ubertragungsteil','right'],['m06','Tragerteil','wrong'],['g08','i = z2 / z1','right'],['g08','i=z₂:z₁','right'],['g08','i = z1 : z2','wrong'],['e01','Achse','wrong'],['e02','Welle','wrong'],['e01','die Wellen','right'],['g02','Kegelrad-Getriebe','right'],['g02','Kegelradgetrieb','right'],['g03','Schneckengetriebe','right'],['g04','Schubkurbelgetriebe','wrong'],['g05','Zahnstangengetriebe','wrong'],['g07','I','right'],['g07','i =','right'],['g09','Zwischen-Rad','right'],['m01','Maschinen','right'],['m02','Baugruppen','right'],['m03','Maschinenelemente','right'],['m03','Baugruppe','wrong'],['e03','Lager','right'],['e05','Kupplungen','right'],['g01','Kettengetriebe','right'],['g06','Kegelradgetriebe','wrong'],['m04','Arbeitsteil','wrong']];
tcases.forEach(([id, v, exp]) => { n++; const r = T.judge(v, C.items.find(c => c.id === id)); if (r !== exp) { fail++; console.log('KARTENFALL', id, JSON.stringify(v), 'erwartet', exp, 'ist', r); } });
console.log(n + ' Prüfungen, ' + fail + ' Abweichungen');
