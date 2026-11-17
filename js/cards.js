/**
 * Karten für den Begriffe-Trainer.
 *   id    – fest, nie ändern (Lernstand hängt daran)
 *   front – Beschreibung, back – Fachbegriff (wird getippt)
 *   alt   – weitere richtige Antworten
 *   mode  – 'reveal' = aufdecken und selbst einschätzen (für Erklär-Fragen)
 */
const CARDS = {
  title: 'Begriffe-Trainer',
  speak: null,
  reverse: false,
  mode: 'type',
  typePlaceholder: 'Begriff tippen …',
  items: [
    { id: 'm01', front: 'System aus mehreren Teilen, das ohne Muskelkraft (z. B. mit Strom) eine Aufgabe erfüllt', back: 'Maschine' },
    { id: 'm02', front: 'Teil einer Maschine mit einer bestimmten Aufgabe (z. B. Antrieb); besteht aus Maschinenelementen', back: 'Baugruppe' },
    { id: 'm03', front: 'Grundbaustein der Technik wie Welle, Lager oder Zahnrad', back: 'Maschinenelement', alt: ['Maschinenteil'] },
    { id: 'm04', front: 'Baugruppe, die die Maschine antreibt (meist ein Elektromotor)', back: 'Antriebsteil', alt: ['Energieteil'] },
    { id: 'm05', front: 'Baugruppe, die ein- und ausschaltet und z. B. die Drehzahl einstellt', back: 'Schaltteil', alt: ['Steuerteil', 'Regelteil', 'Schalt-, Steuer- und Regelteil'] },
    { id: 'm06', front: 'Baugruppe, die die Bewegung weiterleitet und umwandelt (oft ein Getriebe)', back: 'Übertragungsteil' },
    { id: 'm07', front: 'Baugruppe, die die eigentliche Arbeit macht (z. B. Bohrer, Sägeblatt)', back: 'Arbeitsteil', alt: ['Abtriebsteil'] },
    { id: 'm08', front: 'Baugruppe, die alle Teile hält und zusammenhält (Fuß, Säule, Gehäuse)', back: 'Trägerteil', alt: ['Gehäuse', 'Gehäuseteil'] },
    { id: 'e01', front: 'Maschinenelement, das sich dreht und etwas antreibt', back: 'Welle' },
    { id: 'e02', front: 'Maschinenelement, das drehende Teile nur trägt und nichts antreibt', back: 'Achse' },
    { id: 'e03', front: 'Maschinenelement, das drehende Teile hält und die Reibung verringert', back: 'Lager' },
    { id: 'e04', front: 'Lager, bei dem Kugeln oder Rollen zwischen zwei Ringen rollen', back: 'Wälzlager', alt: ['Kugellager', 'Rollenlager'] },
    { id: 'e05', front: 'Maschinenelement, das zwei Wellen verbindet (und manchmal trennen kann)', back: 'Kupplung' },
    { id: 'e06', front: 'Einarmiger Hebel, mit dem man eine Welle dreht (z. B. Pedalarm)', back: 'Kurbel' },
    { id: 'g01', front: 'Getriebe, bei dem eine Kette oder ein Riemen die Räder verbindet', back: 'Zugmittelgetriebe', alt: ['Kettengetriebe', 'Riemengetriebe'] },
    { id: 'g02', front: 'Getriebe mit kegelförmigen Zahnrädern, Wellen im Winkel', back: 'Kegelradgetriebe' },
    { id: 'g03', front: 'Getriebe, bei dem eine Art Schraube ein Zahnrad antreibt', back: 'Schneckenradgetriebe', alt: ['Schneckengetriebe'] },
    { id: 'g04', front: 'Getriebe, das aus einer Drehung eine geradlinige Bewegung macht', back: 'Zahnstangengetriebe' },
    { id: 'g05', front: 'Getriebe, das aus einer Drehung eine Hin- und Herbewegung macht', back: 'Schubkurbelgetriebe' },
    { id: 'g06', front: 'Getriebe, bei dem Zahnräder mit ihren Stirnseiten direkt ineinandergreifen', back: 'Stirnradgetriebe' },
    { id: 'g07', front: 'Buchstabe für das Übersetzungsverhältnis', back: 'i' },
    { id: 'g08', front: 'Formel für das Übersetzungsverhältnis (mit Zähnezahlen)', back: 'i = z2 : z1', alt: ['i=z2:z1', 'i = z2:z1', 'i=z2 : z1', 'z2 : z1', 'z2:z1', 'i = z2/z1', 'i=z2/z1', 'z2/z1'] },
    { id: 'g09', front: 'Rad, das ein Antriebs- und ein Abtriebsrad verbindet und nur die Drehrichtung ändert', back: 'Zwischenrad' },
    { id: 'g10', front: 'Einheit der Drehzahl (Abkürzung)', back: 'U/min', alt: ['Umdrehungen pro Minute', '1/min'] },
    { id: 'g11', front: 'Was passiert bei einer Übersetzung ins Schnelle mit Drehzahl und Kraft am Abtrieb?', back: 'Der Abtrieb dreht schneller, hat aber weniger Kraft. Das große Rad treibt das kleine an, i ist kleiner als 1.', mode: 'reveal' },
    { id: 'g12', front: 'Was ist der Unterschied zwischen Achse und Welle?', back: 'Die Welle wird gedreht und treibt etwas an. Die Achse trägt nur drehende Teile, sie treibt nichts an, auch wenn sie sich mitdreht.', mode: 'reveal' }
  ]
};
