import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Explicitly register ScrollTrigger immediately at module level
gsap.registerPlugin(ScrollTrigger);
if (typeof window !== 'undefined') {
  window.gsap = gsap;
  window.ScrollTrigger = ScrollTrigger;
  if (window.SplitText) {
    try {
      gsap.registerPlugin(window.SplitText);
    } catch (_) {}
  }
}
ScrollTrigger.config({ autoRefreshEvents: 'visibilitychange,resize' });

// Helper to scroll to section smoothly with or without Lenis
export function scrollToTarget(target) {
  if (!target) return;

  if (target === '#hero' || target === '#' || target === 'top') {
    if (window.lenis) {
      try {
        window.lenis.scrollTo(0, { duration: 1.2 });
        return;
      } catch (_) {}
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;

  if (window.lenis) {
    try {
      window.lenis.scrollTo(el, { offset: -70, duration: 1.2 });
      return;
    } catch (_) {}
  }

  const headerOffset = 70;
  const elementPosition = el.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}

export function initAnimations() {
  const root = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Make sure ScrollTrigger is registered before creating any triggers
  gsap.registerPlugin(ScrollTrigger);
  if (typeof window !== 'undefined' && window.SplitText) {
    try {
      gsap.registerPlugin(window.SplitText);
    } catch (_) {}
  }

  // Clean up any existing triggers before re-initializing
  ScrollTrigger.getAll().forEach((t) => t.kill());

  if (!reduce) {
    root.classList.add('motion');
  }

  // 1. Lenis Smooth Scroll
  let lenis = null;
  let rafCallback = null;
  if (!reduce) {
    if (window.lenis) {
      try {
        window.lenis.destroy();
      } catch (_) {}
    }
    lenis = new Lenis({ lerp: 0.1 });
    window.lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    rafCallback = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);
  }

  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // 2. Data Knockout background image calculation
  $$('[data-knock]').forEach((word) => {
    const sec = word.closest('main > *') || word.closest('section');
    const frame = sec && sec.querySelector('[data-frame]');
    const img = frame && frame.querySelector('img');
    if (!img) return;

    if (!word.querySelector('.knock-mark')) {
      const mark = document.createElement('span');
      mark.className = 'knock-mark';
      mark.setAttribute('aria-hidden', 'true');
      mark.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline';
      word.append(mark);
    }

    const apply = () => {
      const mark = word.querySelector('.knock-mark');
      const src = img.currentSrc || img.src;
      if (!src || !img.naturalWidth) return;
      const iw = img.offsetWidth, ih = img.offsetHeight;
      const s = Math.max(iw / img.naturalWidth, ih / img.naturalHeight);
      const dw = img.naturalWidth * s, dh = img.naturalHeight * s;
      const pos = getComputedStyle(img).objectPosition.split(' ').map((v) => (parseFloat(v) || 50) / 100);
      const ix = frame.offsetLeft + img.offsetLeft + (iw - dw) * pos[0];
      const iy = frame.offsetTop + img.offsetTop + (ih - dh) * (pos[1] ?? 0.5);
      
      word.style.setProperty('--kx', (ix - word.offsetLeft) + 'px');
      word.style.setProperty('--ky', (iy - word.offsetTop) + 'px');
      word.style.setProperty('--kw', dw + 'px');
      word.style.setProperty('--kh', dh + 'px');
      word.style.setProperty('--photo', 'url("' + src.replace(/"/g, '%22') + '")');
      word.classList.add('is-knock');
      if (mark) {
        frame.style.setProperty('--ft', Math.round(word.offsetTop + mark.offsetTop - frame.offsetTop) + 'px');
      }
    };

    if (img.complete && img.naturalWidth) apply();
    else img.addEventListener('load', apply, { once: true });
    
    if ('ResizeObserver' in window) new ResizeObserver(() => apply()).observe(word);
    window.addEventListener('resize', apply);
    if (document.fonts) document.fonts.ready.then(apply);
  });

  if (!root.classList.contains('motion')) return () => {};

  // 3. Hero Spin & Pin Animation
  const heroSec = document.querySelector('.hero');
  if (heroSec) {
    const spin = gsap.to('.site-head .star, .menu-btn .star', {
      rotation: 360,
      duration: 28,
      ease: 'none',
      repeat: -1,
      transformOrigin: '50% 50%'
    });
    heroSec.classList.add('is-live');

    ScrollTrigger.create({
      trigger: heroSec,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (self) => {
        heroSec.classList.toggle('is-live', self.isActive);
        if (self.isActive) spin.play();
        else spin.pause();
      }
    });

    const frame = heroSec.querySelector('[data-frame]');
    if (frame) {
      const img = frame.querySelector('img');
      const word = heroSec.querySelector('.hero-word');
      const spec = heroSec.querySelector('.hero-spec');
      const cap = heroSec.querySelector('.hero-cap');

      const ft = () => parseFloat(getComputedStyle(frame).getPropertyValue('--ft')) || heroSec.offsetHeight * 0.5;
      const mx = () => (word ? word.offsetLeft : 0);

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: heroSec,
          start: 'top top',
          end: () => '+=' + Math.round(window.innerHeight * 1.15),
          pin: true,
          scrub: true,
          invalidateOnRefresh: true
        }
      });

      tl.fromTo(frame, { clipPath: () => `inset(${ft()}px ${mx()}px 0px ${mx()}px)` }, { clipPath: 'inset(0px 0px 0px 0px)', duration: 1 }, 0);
      if (img) tl.fromTo(img, { scale: 1 }, { scale: 1.12, duration: 1 }, 0);
      if (word) tl.to(word, { yPercent: 38, duration: 0.75 }, 0);
      if (spec) tl.to(spec, { yPercent: -70, autoAlpha: 0, duration: 0.45 }, 0);
      if (cap) tl.to(cap, { y: () => -window.innerHeight * 0.05, duration: 1 }, 0);
    }
  }

  // 4. Data Reveal
  $$('[data-reveal]').forEach((el) => {
    gsap.set(el, { y: 36, autoAlpha: 0 });
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => gsap.to(el, { y: 0, autoAlpha: 1, duration: 1.1, ease: 'expo.out', clearProps: 'transform' })
    });
  });

  // 5. Data Lines (SplitText reveal or fallback)
  $$('[data-lines]').forEach((el) => {
    if (window.SplitText) {
      try {
        window.SplitText.create(el, {
          type: 'lines',
          mask: 'lines',
          linesClass: 'ln',
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 105,
              duration: 1.2,
              ease: 'expo.out',
              stagger: 0.09,
              scrollTrigger: { trigger: el, start: 'top 88%', once: true }
            })
        });
        return;
      } catch (_) {}
    }
    // Fallback if SplitText unavailable
    gsap.from(el, {
      y: 35,
      autoAlpha: 0,
      duration: 1.1,
      ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true }
    });
  });

  // 5b. Data Stretch (Manifesto quote lines stretch)
  $$('[data-stretch]').forEach((el) => {
    if (window.SplitText) {
      try {
        window.SplitText.create(el, {
          type: 'lines',
          linesClass: 'ln',
          autoSplit: true,
          onSplit: (self) =>
            gsap.timeline({
              defaults: { ease: 'none', duration: 1 },
              scrollTrigger: { trigger: el, start: 'top 90%', end: 'bottom 58%', scrub: true }
            }).fromTo(self.lines, { fontStretch: '75%', opacity: 0.15 }, { fontStretch: '125%', opacity: 1, stagger: 0.45 })
        });
      } catch (_) {}
    }
  });

  // 6. Data Rule (Line expansion)
  $$('[data-rule]').forEach((el) => {
    gsap.fromTo(el, { '--rule': 0 }, {
      '--rule': 1,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 55%', scrub: true }
    });
  });

  // 7. Data Spin (Star rotators)
  $$('[data-spin]').forEach((el) => {
    gsap.fromTo(el, { rotation: -90 }, {
      rotation: 90,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true }
    });
  });

  // 8. Poster Stack Scroll
  const stack = document.querySelector('.exp-stack');
  if (stack) {
    const cards = $$(':scope > *', stack);
    const place = () => cards.forEach((c, i) => {
      const want = Math.round(Math.min(window.innerHeight * 0.1, 96) + i * 14);
      c.style.top = Math.min(want, window.innerHeight - c.offsetHeight - 12) + 'px';
    });
    place();
    window.addEventListener('resize', place);
    ScrollTrigger.addEventListener('refreshInit', place);

    cards.forEach((card, i) => {
      const ph = card.querySelector('.poster-ph');
      const img = ph && ph.querySelector('img');
      if (ph) {
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: card, start: 'top bottom', end: 'top 25%', scrub: true }
        });
        tl.fromTo(ph, { clipPath: 'inset(18% 10% 0% 10%)' }, { clipPath: 'inset(0% 0% 0% 0%)' }, 0);
        if (img) tl.fromTo(img, { scale: 1.25 }, { scale: 1 }, 0);
      }
      const next = cards[i + 1];
      if (!next) return;
      gsap.to(card, {
        scale: 0.9,
        rotation: i % 2 ? 1.8 : -1.8,
        '--shade': 0.38,
        ease: 'none',
        scrollTrigger: {
          trigger: next,
          start: 'top bottom',
          end: () => 'top ' + (parseFloat(next.style.top) || 0) + 'px',
          scrub: true,
          invalidateOnRefresh: true
        }
      });
    });
  }

  // 9. Rig fleet reveal
  $$('.rig').forEach((rig) => {
    const ph = rig.querySelector('.rig-ph');
    const img = ph && ph.querySelector('img');
    const name = rig.querySelector('.rig-name');
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: rig, start: 'top 94%', end: 'top 40%', scrub: true }
    });
    if (ph) tl.fromTo(ph, { clipPath: 'inset(49.5% 0% 49.5% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)' }, 0);
    if (img) tl.fromTo(img, { scale: 1.35 }, { scale: 1 }, 0);
    if (name) tl.fromTo(name, { xPercent: -6, autoAlpha: 0.2 }, { xPercent: 0, autoAlpha: 1, duration: 0.7 }, 0);
  });

  // 10. Route horizontal pinned rail with dynamic SVG curve drawing
  const routeSec = document.querySelector('.route');
  if (routeSec) {
    const track = routeSec.querySelector('.route-track');
    const rail = routeSec.querySelector('.route-rail');
    if (track && rail) {
      const stops = $$('.stop', rail);
      const path = rail.querySelector('.route-line path');
      const svg = path && path.ownerSVGElement;
      let D = 0, total = 0, table = [], marks = [];

      const within = (s) => {
        const box = s.querySelector('.stop-day') || s;
        let x = 0, y = 0, n = box;
        while (n && n !== rail) {
          x += n.offsetLeft;
          y += n.offsetTop;
          n = n.offsetParent;
        }
        return [x + parseFloat(getComputedStyle(box).fontSize) * 0.31, y + box.offsetHeight / 2];
      };

      const build = () => {
        D = Math.max(0, rail.offsetWidth - track.clientWidth);
        if (!path) return;
        const pts = stops.map(within);
        const W = rail.offsetWidth, H = rail.offsetHeight;
        if (pts.some((p) => !isFinite(p[0]) || !isFinite(p[1]))) return;
        marks = pts.map((p) => p[0]);

        const segs = [[[0, pts[0][1]], [pts[0][0], pts[0][1]]]];
        for (let i = 1; i < pts.length; i++) {
          const [xp, yp] = pts[i - 1], [x, y] = pts[i], mid = xp + (x - xp) / 2;
          segs.push([[xp, yp], [mid, yp], [mid, y], [x, y]]);
        }
        segs.push([pts[pts.length - 1], [W, pts[pts.length - 1][1]]]);

        let d = `M0 ${pts[0][1]}`, len = 0, prev = [0, pts[0][1]];
        table = [[0, 0]];
        segs.forEach((sg) => {
          if (sg.length === 2) d += ` L${sg[1][0]} ${sg[1][1]}`;
          else d += ` C${sg[1][0]} ${sg[1][1]} ${sg[2][0]} ${sg[2][1]} ${sg[3][0]} ${sg[3][1]}`;
          const n = sg.length === 2 ? 1 : 24;
          for (let k = 1; k <= n; k++) {
            const t = k / n, u = 1 - t;
            const p = sg.length === 2 ? sg[1] : [0, 1].map((j) => u * u * u * sg[0][j] + 3 * u * u * t * sg[1][j] + 3 * u * t * t * sg[2][j] + t * t * t * sg[3][j]);
            len += Math.hypot(p[0] - prev[0], p[1] - prev[1]);
            prev = p;
            table.push([p[0], len]);
          }
        });

        total = len;
        svg.setAttribute('width', W);
        svg.setAttribute('height', H);
        svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
        path.setAttribute('d', d);
        path.style.strokeDasharray = total + 1;
      };

      const draw = (p) => {
        const tip = D * p + track.clientWidth * 0.62;
        if (path && table.length) {
          let lo = 0, hi = table.length - 1;
          while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (table[mid][0] < tip) lo = mid + 1;
            else hi = mid;
          }
          path.style.strokeDashoffset = total + 1 - table[lo][1];
        }
        stops.forEach((s, i) => s.classList.toggle('is-on', tip >= (marks[i] ?? Infinity) - 4));
      };

      build();
      gsap.to(rail, {
        x: () => -D,
        ease: 'none',
        scrollTrigger: {
          trigger: routeSec,
          start: 'top top',
          end: () => '+=' + D,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
          onRefreshInit: build,
          onRefresh: (self) => draw(self.progress),
          onUpdate: (self) => draw(self.progress)
        }
      });
      draw(0);
    }
  }

  // 11. Seasons chart bars
  $$('[data-chart]').forEach((chart) => {
    const bars = $$('.bar', chart);
    if (!bars.length) return;
    const num = (b) => {
      const v = b.querySelector('.bar-v');
      const t = (b.dataset.value || (v && v.textContent) || '0').replace(/,/g, '').replace(/[^0-9.-]/g, '');
      return Math.max(0, parseFloat(t) || 0);
    };
    const vals = bars.map(num), max = Math.max(...vals, 1);
    (chart.querySelector('.bars') || chart).style.setProperty('--max', (max * 1.1).toFixed(2));
    bars.forEach((b, i) => b.style.setProperty('--v', vals[i]));

    const mm = gsap.matchMedia();
    mm.add({ wide: '(min-width: 600px)', narrow: '(max-width: 599px)' }, (ctx) => {
      const wide = ctx.conditions.wide;
      const tl = gsap.timeline({
        defaults: { ease: 'none', duration: 1 },
        scrollTrigger: {
          trigger: chart,
          start: 'top 88%',
          end: wide ? 'bottom 75%' : 'bottom 80%',
          scrub: true,
          invalidateOnRefresh: true
        }
      });
      bars.forEach((b, i) => {
        const col = b.querySelector('.bar-col');
        const v = b.querySelector('.bar-v');
        if (!col) return;
        tl.fromTo(col, wide ? { scaleY: 0 } : { scaleX: 0 }, wide ? { scaleY: 1 } : { scaleX: 1 }, i * 0.14);
        if (v) tl.fromTo(v, wide ? { yPercent: 120, autoAlpha: 0 } : { xPercent: -60, autoAlpha: 0 }, { yPercent: 0, xPercent: 0, autoAlpha: 1 }, i * 0.14);
      });
    });
  });

  // 12. Crew staggered parallax
  $$('.crew').forEach((crew) => {
    const people = $$(':scope > *', crew);
    if (people.length < 2) return;
    let amps = [];
    const measure = () => {
      const lefts = [...new Set(people.map((p) => p.offsetLeft))].sort((a, b) => a - b);
      amps = people.map((p) => (lefts.indexOf(p.offsetLeft) % 2 ? 130 : 30));
    };
    measure();
    gsap.fromTo(people, { y: (i) => amps[i] * 0.5 }, {
      y: (i) => -amps[i] * 0.5,
      ease: 'none',
      scrollTrigger: {
        trigger: crew,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true,
        onRefreshInit: measure
      }
    });
  });

  // 13. Marquee smooth infinite horizontal loop
  $$('[data-marquee]').forEach((box) => {
    const row = box.firstElementChild;
    const items = row ? [...row.children] : [];
    if (!items.length) return;
    items.forEach((it) => {
      if (!it.classList.contains('marquee-clone')) {
        const c = it.cloneNode(true);
        c.classList.add('marquee-clone');
        c.setAttribute('aria-hidden', 'true');
        c.querySelectorAll('a, button').forEach((x) => x.setAttribute('tabindex', '-1'));
        row.append(c);
      }
    });
    const tw = gsap.to(row, {
      xPercent: -50,
      duration: items.length * 8,
      ease: 'none',
      repeat: -1,
      paused: true
    });

    let hover = false, seen = false;
    const upd = () => (seen && !hover ? tw.play() : tw.pause());
    box.addEventListener('mouseenter', () => { hover = true; upd(); });
    box.addEventListener('mouseleave', () => { hover = false; upd(); });
    box.addEventListener('focusin', () => { hover = true; upd(); });
    box.addEventListener('focusout', () => { hover = false; upd(); });

    ScrollTrigger.create({
      trigger: box,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (self) => { seen = self.isActive; upd(); }
    });
  });

  // 14. Gallery directional clipPath reveals
  $$('[data-open]').forEach((ph) => {
    const from = {
      left: 'inset(0% 100% 0% 0%)',
      right: 'inset(0% 0% 0% 100%)',
      top: 'inset(0% 0% 100% 0%)',
      bottom: 'inset(100% 0% 0% 0%)'
    };
    const shift = {
      left: [14, 0],
      right: [-14, 0],
      top: [0, 14],
      bottom: [0, -14]
    };
    const dir = from[ph.dataset.open] ? ph.dataset.open : 'bottom';
    const img = ph.querySelector('img');
    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: ph, start: 'top 92%', end: 'top 40%', scrub: true }
    });
    tl.fromTo(ph, { clipPath: from[dir] }, { clipPath: 'inset(0% 0% 0% 0%)' }, 0);
    if (img) tl.fromTo(img, { xPercent: shift[dir][0], yPercent: shift[dir][1], scale: 1.2 }, { xPercent: 0, yPercent: 0, scale: 1.04 }, 0);
  });

  // 15. Contact art background shift
  $$('.contact-art').forEach((art) => {
    gsap.fromTo(art, { '--shift': '-60px' }, {
      '--shift': '60px',
      ease: 'none',
      scrollTrigger: { trigger: art, start: 'top bottom', end: 'bottom top', scrub: true }
    });
  });

  // Refresh ScrollTrigger calculations after everything is created
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);

  return () => {
    ScrollTrigger.getAll().forEach((t) => t.kill());
    if (rafCallback) gsap.ticker.remove(rafCallback);
    if (lenis) {
      lenis.destroy();
      window.lenis = null;
    }
  };
}
