/**
 * Interaktive Grafiken (SVG + Schieberegler) für die Erklärungen.
 * In einer Lektion: <div class="sim" data-sim="getriebe"></div>
 * Der Renderer ruft nach dem Anzeigen Sims.initAll(container) auf.
 */
const Sims = {
  TAU: Math.PI * 2,
  C1: '#2563EB',   // Antriebsrad
  C2: '#EA580C',   // Abtriebsrad
  C3: '#6B7280',   // Zwischenrad

  initAll(root) {
    root.querySelectorAll('[data-sim]').forEach(el => {
      const fn = this[el.dataset.sim];
      if (fn && !el.dataset.ready) { el.dataset.ready = '1'; fn.call(this, el); }
    });
  },
  f(x, d) { return Exercises.fmt(x, d === undefined ? 1 : d); },
  gcd(a, b) { return b ? this.gcd(b, a % b) : a; },
  // gekürztes Verhältnis a : b als Text
  ratio(a, b) { const g = this.gcd(a, b); return (a / g) + ' : ' + (b / g); },

  slider(id, label, min, max, step, val) {
    return '<label class="sim-row"><span class="sim-label">' + label + ': <strong id="' + id + '-v">' + val + '</strong> Zähne</span>'
      + '<input type="range" id="' + id + '" min="' + min + '" max="' + max + '" step="' + step + '" value="' + val + '"></label>';
  },
  toggle(name, options, active) {
    return '<div class="sim-toggle" role="group">' + options.map(o =>
      '<button type="button" class="sim-btn' + (o[0] === active ? ' on' : '') + '" data-' + name + '="' + o[0] + '">' + o[1] + '</button>').join('') + '</div>';
  },

  // Umriss eines Zahnrads mit z Zähnen, Modul m (Mittelpunkt 0|0)
  gearPath(z, m) {
    const r = m * z / 2, ra = r + 0.9 * m, rf = r - 1.2 * m, p = this.TAU / z;
    let d = '';
    for (let k = 0; k < z; k++) {
      [[-0.5, rf], [-0.29, rf], [-0.15, ra], [0.15, ra], [0.29, rf]].forEach(([off, rad]) => {
        const a = (k + off) * p;
        d += (d ? 'L' : 'M') + (rad * Math.cos(a)).toFixed(1) + ' ' + (rad * Math.sin(a)).toFixed(1);
      });
    }
    return d + 'Z';
  },
  // Zahnrad als <g>, roter Punkt zum Mitzählen der Umdrehungen
  gear(z, m, color) {
    const r = m * z / 2;
    return '<path d="' + this.gearPath(z, m) + '" fill="' + color + '" fill-opacity=".18" stroke="' + color + '" stroke-width="2" stroke-linejoin="round"/>'
      + '<circle r="' + (r * 0.42).toFixed(1) + '" fill="none" stroke="' + color + '" stroke-opacity=".5" stroke-width="1.5"/>'
      + '<circle cx="' + (r - m * 2.2).toFixed(1) + '" r="' + Math.max(3.5, m * 0.7).toFixed(1) + '" fill="#DC2626"/>'
      + '<circle r="4" fill="#fff" stroke="' + color + '"/>';
  },
  // Winkel von Rad 2, damit seine Zahnlücke auf den Zahn von Rad 1 trifft (Räder nebeneinander)
  meshAngle(a1, z1, z2) { return Math.PI + Math.PI / z2 - a1 * z1 / z2; },
  place(g, x, y, a) { g.setAttribute('transform', 'translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') rotate(' + (a * 360 / this.TAU).toFixed(2) + ')'); },

  // Läuft, solange die Grafik auf der Seite ist. Steht still bei "Bewegung reduzieren".
  animate(el, tick) {
    const still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let last = null;
    const step = t => {
      if (!el.isConnected) return;
      const dt = last === null ? 0 : Math.min(0.05, (t - last) / 1000);
      last = t;
      tick(el.dataset.paused === '1' || still ? 0 : dt);
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  },
  pauseButton(el) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'sim-btn';
    b.textContent = '⏸ Anhalten';
    b.addEventListener('click', () => {
      const p = el.dataset.paused === '1';
      el.dataset.paused = p ? '0' : '1';
      b.textContent = p ? '⏸ Anhalten' : '▶ Weiter';
    });
    return b;
  },

  // ---------- L5/L6: Zahnradpaar mit Schiebereglern ----------
  getriebe(el) {
    const id = 'g' + Math.random().toString(36).slice(2, 6);
    const m = 3.6, cy = 105, w1 = 0.9; // w1 = Drehgeschwindigkeit Antrieb (rad/s)
    el.innerHTML = '<div class="sim-title">Probier es aus: Zahnrad-Getriebe</div>'
      + this.slider(id + 'a', '<span style="color:' + this.C1 + '">Antriebsrad z<sub>1</sub></span>', 10, 40, 2, 40)
      + this.slider(id + 'b', '<span style="color:' + this.C2 + '">Abtriebsrad z<sub>2</sub></span>', 10, 40, 2, 20)
      + '<svg viewBox="0 0 440 215" class="sim-svg" role="img" aria-label="Zwei Zahnräder greifen ineinander"></svg>'
      + '<div class="sim-out"></div>';
    el.insertBefore(this.pauseButton(el), el.querySelector('svg'));
    const svg = el.querySelector('svg'), out = el.querySelector('.sim-out');
    let z1, z2, g1, g2, x1, x2, a1 = 0, turns1 = 0;
    const build = () => {
      z1 = Number(el.querySelector('#' + id + 'a').value);
      z2 = Number(el.querySelector('#' + id + 'b').value);
      el.querySelector('#' + id + 'a-v').textContent = z1;
      el.querySelector('#' + id + 'b-v').textContent = z2;
      const r1 = m * z1 / 2, r2 = m * z2 / 2;
      x1 = 220 - (r1 + r2) / 2; x2 = x1 + r1 + r2;
      svg.innerHTML = '<g id="' + id + 'g1">' + this.gear(z1, m, this.C1) + '</g><g id="' + id + 'g2">' + this.gear(z2, m, this.C2) + '</g>'
        + '<text x="' + (x1 + r1 - 10).toFixed(0) + '" y="208" text-anchor="end" font-size="13" fill="' + this.C1 + '" font-weight="700">← Antrieb</text>'
        + '<text x="' + (x1 + r1 + 10).toFixed(0) + '" y="208" text-anchor="start" font-size="13" fill="' + this.C2 + '" font-weight="700">Abtrieb →</text>';
      g1 = svg.querySelector('#' + id + 'g1'); g2 = svg.querySelector('#' + id + 'g2');
      a1 = 0; turns1 = 0;
      const i = z2 / z1;
      let art, kraft;
      if (z1 === z2) { art = '<strong>keine Übersetzung</strong> (1 : 1)'; kraft = 'Gleiche Drehzahl, gleiche Kraft.'; }
      else if (z1 > z2) { art = '<strong>Übersetzung ins Schnelle</strong>'; kraft = 'Der Abtrieb dreht sich <strong>' + this.f(1 / i, 2) + '-mal so schnell</strong>, dafür wird die Kraft <strong>durch ' + this.f(1 / i, 2) + ' geteilt</strong>.'; }
      else { art = '<strong>Übersetzung ins Langsame</strong>'; kraft = 'Der Abtrieb dreht sich <strong>' + this.f(i, 2) + '-mal langsamer</strong>, hat aber <strong>' + this.f(i, 2) + '-mal so viel Kraft</strong>.'; }
      out.innerHTML = 'i = z<sub>2</sub> : z<sub>1</sub> = ' + z2 + ' : ' + z1 + ' = <strong>' + this.ratio(z2, z1) + '</strong> → ' + art + '<br>' + kraft
        + '<br><span id="' + id + 'cnt" class="klein"></span>';
    };
    [id + 'a', id + 'b'].forEach(s => el.querySelector('#' + s).addEventListener('input', build));
    build();
    this.animate(el, dt => {
      a1 += w1 * dt;
      turns1 = a1 / this.TAU;
      this.place(g1, x1, cy, a1);
      this.place(g2, x2, cy, this.meshAngle(a1, z1, z2));
      const c = el.querySelector('#' + id + 'cnt');
      if (c) c.innerHTML = 'Mitzählen (roter Punkt): Antrieb ' + this.f(Math.floor(turns1 * 10) / 10) + ' Umdrehungen · Abtrieb '
        + this.f(Math.floor(turns1 * z1 / z2 * 10) / 10) + ' Umdrehungen';
    });
  },

  // ---------- L7: Drehrichtung und Zwischenräder ----------
  zwischenrad(el) {
    const SETS = { 2: [20, 40], 3: [20, 12, 40], 4: [20, 12, 16, 40] };
    const m = 3, cy = 95, w1 = 0.8;
    el.innerHTML = '<div class="sim-title">Probier es aus: Wie viele Räder?</div>'
      + this.toggle('n', [['2', '2 Räder'], ['3', '3 Räder'], ['4', '4 Räder']], '2')
      + '<svg viewBox="0 0 460 190" class="sim-svg" role="img" aria-label="Zahnräder in einer Reihe"></svg><div class="sim-out"></div>';
    el.insertBefore(this.pauseButton(el), el.querySelector('svg'));
    const svg = el.querySelector('svg'), out = el.querySelector('.sim-out');
    let zs, xs, gs, a1 = 0;
    const build = n => {
      zs = SETS[n];
      const rs = zs.map(z => m * z / 2);
      const total = rs.reduce((s, r) => s + 2 * r, 0);
      xs = []; let x = 230 - total / 2;
      rs.forEach(r => { xs.push(x + r); x += 2 * r; });
      svg.innerHTML = zs.map((z, k) => {
        const col = k === 0 ? this.C1 : k === zs.length - 1 ? this.C2 : this.C3;
        const cw = k % 2 === 0;
        return '<g class="zr">' + this.gear(z, m, col) + '</g>'
          + '<text x="' + xs[k].toFixed(0) + '" y="' + (cy + rs[k] + 26).toFixed(0) + '" text-anchor="middle" font-size="22" fill="' + col + '">' + (cw ? '↻' : '↺') + '</text>'
          + '<text x="' + xs[k].toFixed(0) + '" y="16" text-anchor="middle" font-size="12" fill="' + col + '" font-weight="700">Rad ' + (k + 1) + '</text>';
      }).join('');
      gs = Array.from(svg.querySelectorAll('g.zr'));
      a1 = 0;
      const same = n % 2 === 1;
      out.innerHTML = n + ' Räder (' + (same ? 'ungerade' : 'gerade') + ' Anzahl): Das letzte Rad dreht sich '
        + (same ? '<strong>in die gleiche Richtung</strong> wie' : '<strong>andersherum</strong> als') + ' das erste.'
        + '<br>Zähne: ' + zs.join(' · ')
        + '<br>Übersetzung: i = ' + zs[zs.length - 1] + ' : ' + zs[0] + ' = <strong>' + this.ratio(zs[zs.length - 1], zs[0]) + '</strong>'
        + (n > 2 ? ', genau wie mit 2 Rädern. Die grauen Zwischenräder ändern nur die Richtung.' : '.');
    };
    el.querySelectorAll('[data-n]').forEach(b => b.addEventListener('click', () => {
      el.querySelectorAll('[data-n]').forEach(x => x.classList.toggle('on', x === b));
      build(Number(b.dataset.n));
    }));
    build(2);
    this.animate(el, dt => {
      a1 += w1 * dt;
      let a = a1;
      gs.forEach((g, k) => {
        if (k > 0) a = this.meshAngle(a, zs[k - 1], zs[k]);
        this.place(g, xs[k], cy, a);
      });
    });
  }
};
