/**
 * Daten der Lern-App Technik 8M (keine Klassenarbeit, darum kein Datum).
 * Wird von der App UND von den Druckseiten in pdf/ gelesen.
 * LESSONS: IDs nie nachträglich ändern, sonst ist der Lernstand weg.
 */
const KA = {
  id: 'technik-8m-maschinen-2627',
  subject: 'Technik',
  title: 'Technik 8M: Maschinen und Getriebe',
  date: '',
  topics: [
    { title: 'Was ist eine Maschine?', page: 'S. 164', lessons: [1] },
    { title: 'Die Baugruppen einer Maschine', page: 'S. 164–165', lessons: [2] },
    { title: 'Maschinenelemente', page: 'S. 166', lessons: [3] },
    { title: 'Getriebearten', page: 'S. 168', lessons: [4] },
    { title: 'Übersetzungsverhältnis i', page: 'S. 169', lessons: [5] },
    { title: 'Drehzahl berechnen', page: 'S. 169', lessons: [6] },
    { title: 'Drehrichtung und Zwischenrad', page: 'S. 169', lessons: [7] },
    { title: 'Fachbegriffe', page: '', trainer: true }
  ],
  links: [
    { label: 'Spickzettel (1 Seite)', href: 'pdf/spickzettel.html' },
    { label: 'Lernblatt und Faltkarten', href: 'pdf/karten.html' }
  ]
};

const MODULES = { m1: 'Maschinen', m2: 'Getriebe' };

const LESSONS = [
  { id: 1, title: 'Was ist eine Maschine?', module: 'm1' },
  { id: 2, title: 'Die 5 Baugruppen', module: 'm1' },
  { id: 3, title: 'Maschinenelemente', module: 'm1' },
  { id: 4, title: 'Getriebearten', module: 'm2' },
  { id: 5, title: 'Übersetzungsverhältnis i', module: 'm2' },
  { id: 6, title: 'Drehzahl berechnen', module: 'm2' },
  { id: 7, title: 'Drehrichtung und Zwischenrad', module: 'm2' }
];
