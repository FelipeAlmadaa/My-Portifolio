// =============================================
// Vanta.js Background Setup
// Dark  → FOG (black + dark blue)
// Light → FOG (white + site blue)
// =============================================

let vantaEffect = null;

function initVantaBg() {
  if (vantaEffect) vantaEffect.destroy();

  const isDark = !document.body.classList.contains('light-mode');

  if (isDark) {
    // ── DARK MODE — Fog ────────────────────────────
    vantaEffect = VANTA.FOG({
      el: '#vanta-bg',
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      highlightColor: 0x0,      // black
      midtoneColor: 0x1d1d4d,   // dark blue/indigo
      lowlightColor: 0x0,       // black shadow
      baseColor: 0x0,           // black base
      blurFactor: 0.53,
      zoom: 1.2,
      speed: 1.2
    });

  } else {
    // ── LIGHT MODE — Fog ───────────────────────────
    vantaEffect = VANTA.FOG({
      el: '#vanta-bg',
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      highlightColor: 0xffffff,  // white
      midtoneColor: 0x1535c5,    // site's main blue
      lowlightColor: 0xe8f0ff,   // very pale blue
      baseColor: 0xffffff,       // white base
      blurFactor: 0.53,
      zoom: 1.2,
      speed: 1.2
    });
  }
}

function waitAndInit() {
  if (typeof VANTA !== 'undefined' && typeof THREE !== 'undefined') {
    initVantaBg();
  } else {
    setTimeout(waitAndInit, 100);
  }
}

window.reinitVanta = function () {
  initVantaBg();
};

document.addEventListener('DOMContentLoaded', waitAndInit);
