const field = document.getElementById('tencentField');
const microCanvas = document.getElementById('microWordCanvas');
const ambient = document.getElementById('ambientWords');
const bottomFlow = document.getElementById('bottomFlow');
const cursorGlow = document.getElementById('cursorGlow');
let microCtx = null;
let microMask = null;
let microParticles = [];
let microTextureMeta = { width: 0, height: 0, cssWidth: 0, cssHeight: 0, dpr: 1 };
let bottomCanvas = null;
let bottomCtx = null;
let mouse = { x: 0, y: 0, tx: 0, ty: 0 };
let glow = { x: window.innerWidth / 2, y: window.innerHeight / 2, tx: window.innerWidth / 2, ty: window.innerHeight / 2, active: false };
let glowFrame = null;
const finePointerQuery = window.matchMedia('(pointer: fine)');
const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

const canUseCursorGlow = () => (
  cursorGlow &&
  finePointerQuery.matches &&
  !reducedMotionQuery.matches
);

function renderCursorGlow() {
  if (!canUseCursorGlow()) {
    glowFrame = null;
    return;
  }

  glow.x += (glow.tx - glow.x) * .14;
  glow.y += (glow.ty - glow.y) * .14;
  cursorGlow.style.transform = `translate3d(${glow.x}px, ${glow.y}px, 0) translate3d(-50%, -50%, 0) scale(${glow.active ? 1 : .92})`;
  glowFrame = requestAnimationFrame(renderCursorGlow);
}

function wakeCursorGlow() {
  if (!canUseCursorGlow()) return;
  cursorGlow.classList.add('is-active');
  glow.active = true;
  if (!glowFrame) glowFrame = requestAnimationFrame(renderCursorGlow);
}

window.addEventListener('pointermove', (event) => {
  mouse.tx = (event.clientX / window.innerWidth - 0.5) * 2;
  mouse.ty = (event.clientY / window.innerHeight - 0.5) * 2;
  glow.tx = event.clientX;
  glow.ty = event.clientY;
  wakeCursorGlow();
}, { passive: true });

window.addEventListener('pointerleave', () => {
  if (!cursorGlow) return;
  glow.active = false;
  cursorGlow.classList.remove('is-active');
}, { passive: true });

const WORDS = [
  'MODEL', 'AGENT', 'ROBOTICS', 'AI VIDEO', 'RED TEAM', 'EVALS', 'WORLD MODEL',
  'MULTIMODAL', 'AUTOMATION', 'NETAGENT', 'MEMORY', 'TOOL USE', 'BENCHMARK',
  'OPEN SOURCE', 'WORKFLOW', 'PRIVATECLAW', 'SYSTEMS', 'REASONING', 'EMBODIED AI',
  'RUNTIME', 'SEARCH', 'LAB', 'AIGC-X', 'X-LAB'
];
function rand(min, max) { return min + Math.random() * (max - min); }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function getPerfProfile() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const smallScreen = window.innerWidth < 760;
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const lowCore = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
  const light = reducedMotion || smallScreen || coarsePointer || lowCore;

  if (reducedMotion) {
    return {
      reducedMotion,
      microYStep: 16,
      microXMin: 48,
      microXMax: 68,
      microParticleCount: 260,
      ambientCount: 22,
      bottomCount: 10,
      lanes: 8,
      curveStep: 24,
      markerCount: 1,
      maxDpr: 1,
      frameInterval: 1000 / 24,
    };
  }

  if (light) {
    return {
      reducedMotion,
      microYStep: 13,
      microXMin: 42,
      microXMax: 58,
      microParticleCount: 860,
      ambientCount: 52,
      bottomCount: 16,
      lanes: 11,
      curveStep: 18,
      markerCount: 2,
      maxDpr: 1.15,
      frameInterval: 1000 / 42,
    };
  }

  return {
    reducedMotion,
    microYStep: 11,
    microXMin: 36,
    microXMax: 52,
    microParticleCount: 1200,
    ambientCount: 64,
    bottomCount: 18,
    lanes: 14,
    curveStep: 13,
    markerCount: 3,
    maxDpr: 1.75,
    frameInterval: 1000 / 60,
  };
}

let perf = getPerfProfile();

function createRenderCanvas(width, height) {
  if (typeof OffscreenCanvas !== 'undefined') {
    return new OffscreenCanvas(width, height);
  }
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

function drawBrandWord(ctx, fillMode = true) {
  ctx.font = '950 326px Arial, "Arial Black", Impact, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.letterSpacing = '-24px';
  if (fillMode) {
    ctx.fillText('AIGC-X', 800, 380);
  } else {
    ctx.lineJoin = 'miter';
    ctx.strokeText('AIGC-X', 800, 380);
  }
}

function getMicroLayout(width, height) {
  const scale = Math.min(width / 1600, height / 760) * 1.12;
  const renderW = 1600 * scale;
  const renderH = 760 * scale;
  return {
    scale,
    ox: (width - renderW) / 2,
    oy: (height - renderH) / 2 - height * .01,
  };
}

function renderMicroWordTexture() {
  if (!microCanvas) return;

  const dpr = Math.min(window.devicePixelRatio || 1, perf.maxDpr);
  const width = Math.max(1, Math.round(microCanvas.clientWidth || window.innerWidth * 1.12));
  const height = Math.max(1, Math.round(microCanvas.clientHeight || Math.max(window.innerHeight * .7, 560)));
  const targetW = Math.floor(width * dpr);
  const targetH = Math.floor(height * dpr);

  if (microCanvas.width !== targetW || microCanvas.height !== targetH) {
    microCanvas.width = targetW;
    microCanvas.height = targetH;
    microCanvas.style.width = `${width}px`;
    microCanvas.style.height = `${height}px`;
  }

  microCtx = microCanvas.getContext('2d', { alpha: true });
  microCtx.setTransform(1, 0, 0, 1, 0, 0);
  microCtx.clearRect(0, 0, targetW, targetH);

  const layout = getMicroLayout(width, height);

  // A persistent offscreen mask lets the visible canvas redraw moving words
  // every frame while staying clipped to the AIGC-X shape.
  microMask = createRenderCanvas(targetW, targetH);
  const maskCtx = microMask.getContext('2d', { alpha: true });
  maskCtx.setTransform(dpr * layout.scale, 0, 0, dpr * layout.scale, dpr * layout.ox, dpr * layout.oy);
  maskCtx.fillStyle = '#000';
  drawBrandWord(maskCtx, true);

  microTextureMeta = { width: targetW, height: targetH, cssWidth: width, cssHeight: height, dpr, layout };
  const maskData = maskCtx.getImageData(0, 0, targetW, targetH).data;
  const hitMask = (cssX, cssY) => {
    const px = Math.max(0, Math.min(targetW - 1, Math.floor(cssX * dpr)));
    const py = Math.max(0, Math.min(targetH - 1, Math.floor(cssY * dpr)));
    return maskData[(py * targetW + px) * 4 + 3] > 16;
  };

  microParticles = [];
  let guard = 0;
  while (microParticles.length < perf.microParticleCount && guard < perf.microParticleCount * 80) {
    guard++;
    const cssX = layout.ox + rand(210, 1400) * layout.scale;
    const cssY = layout.oy + rand(148, 540) * layout.scale;
    if (!hitMask(cssX, cssY)) continue;
    const strong = Math.random() > .66;
    const baseAlpha = strong ? rand(.22, .46) : rand(.055, .18);
    microParticles.push({
      text: pick(WORDS),
      x: cssX,
      y: cssY,
      baseX: cssX,
      baseY: cssY,
      speed: rand(.22, .72) * (strong ? 1.15 : 1),
      wave: rand(1.6, 5.4),
      phase: rand(0, Math.PI * 2),
      size: strong ? rand(5.2, 8.8) : rand(3.5, 5.9),
      weight: strong ? 950 : 800,
      alpha: baseAlpha,
      rot: rand(-.45, .45),
    });
  }

  drawMicroField(0);
}

function drawMicroField(t) {
  if (!microCtx || !microMask || !microCanvas.width || !microCanvas.height) return;

  const width = microTextureMeta.cssWidth;
  const height = microTextureMeta.cssHeight;
  const targetW = microTextureMeta.width;
  const targetH = microTextureMeta.height;
  const dpr = microTextureMeta.dpr || 1;
  const layout = microTextureMeta.layout || getMicroLayout(width, height);

  microCtx.setTransform(1, 0, 0, 1, 0, 0);
  microCtx.clearRect(0, 0, targetW, targetH);
  microCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  microCtx.textBaseline = 'middle';
  microCtx.letterSpacing = '.4px';

  for (const p of microParticles) {
    const flow = perf.reducedMotion ? 0 : 1;
    const xFlow = Math.sin(t * p.speed + p.phase) * p.wave * 1.15 + Math.sin(t * .18 + p.baseY * .018) * 2.2;
    const yFlow = Math.cos(t * p.speed * .72 + p.phase) * p.wave * .42;
    const scan = (t * .055) % 1.18 - .09;
    const px = p.baseX / Math.max(1, width);
    const scanDist = Math.abs(px - scan);
    const scanBoost = Math.exp(-(scanDist * scanDist) / .0018) * .55;
    const breathe = .82 + Math.sin(t * .72 + p.phase) * .18 + scanBoost;
    const x = p.baseX + xFlow * flow + mouse.x * 2.2;
    const y = p.baseY + yFlow * flow + mouse.y * 1.2;
    microCtx.save();
    microCtx.translate(x, y);
    microCtx.rotate((p.rot + Math.sin(t * .26 + p.phase) * .08) * Math.PI / 180);
    microCtx.font = `${p.weight} ${p.size}px Arial, sans-serif`;
    microCtx.fillStyle = `rgba(9,10,13,${Math.min(.5, p.alpha * breathe)})`;
    microCtx.fillText(p.text, 0, 0);
    microCtx.restore();
  }

  // Tencent-like: keep the big word readable by clipping the living words into
  // the letter form, but keep the alpha low so it does not become a black block.
  microCtx.setTransform(1, 0, 0, 1, 0, 0);
  microCtx.globalCompositeOperation = 'destination-in';
  microCtx.drawImage(microMask, 0, 0);
  microCtx.globalCompositeOperation = 'source-over';

  // Ultra-faint skeleton only guides perception; the actual form comes from word density.
  microCtx.save();
  microCtx.setTransform(dpr * layout.scale, 0, 0, dpr * layout.scale, dpr * layout.ox, dpr * layout.oy);
  microCtx.strokeStyle = 'rgba(9,10,13,.026)';
  microCtx.lineWidth = .9;
  drawBrandWord(microCtx, false);
  microCtx.restore();
}

function flowVelocity(x, y, t) {
  const nx = (x / Math.max(1, window.innerWidth) - .5) * 2;
  const ny = (y / Math.max(1, window.innerHeight) - .5) * 2;
  return {
    vx: Math.sin(ny * 2.2 + t * .42) * .18 + Math.cos((nx + ny) * 1.4 + t * .25) * .1,
    vy: Math.cos(nx * 1.8 - t * .31) * .09 + Math.sin((nx - ny) * 1.7 + t * .18) * .06,
  };
}

function bottomCurveY(lane, x, t, width, height) {
  const lanes = perf.lanes;
  const center = (lanes - 1) / 2;
  const rel = lane - center;
  const nx = (x / Math.max(1, width) - .5) * 2;
  const envelope = .82 + Math.cos(Math.max(-1, Math.min(1, nx)) * Math.PI) * .1;
  const base = height * .52 + rel * Math.min(14, height * .043);
  const longWave = Math.sin(x * .006 + t * .42 + lane * .58) * (12 + Math.abs(rel) * 1.15) * envelope;
  const shortWave = Math.sin(x * .016 - t * .32 + lane * 1.13) * (3.6 + Math.abs(rel) * .42);
  return base + longWave + shortWave + mouse.y * 7;
}

function fitBottomCanvas() {
  if (!bottomFlow || !bottomCanvas || !bottomCtx) return null;
  const dpr = Math.min(window.devicePixelRatio || 1, perf.maxDpr);
  const width = Math.max(1, bottomFlow.clientWidth);
  const height = Math.max(1, bottomFlow.clientHeight);
  const targetW = Math.floor(width * dpr);
  const targetH = Math.floor(height * dpr);
  if (bottomCanvas.width !== targetW || bottomCanvas.height !== targetH) {
    bottomCanvas.width = targetW;
    bottomCanvas.height = targetH;
    bottomCanvas.style.width = `${width}px`;
    bottomCanvas.style.height = `${height}px`;
    bottomCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  return { width, height };
}

function drawBottomField(t) {
  const size = fitBottomCanvas();
  if (!size || !bottomCtx) return;
  const { width, height } = size;
  const lanes = perf.lanes;
  bottomCtx.clearRect(0, 0, width, height);
  bottomCtx.save();
  bottomCtx.lineCap = 'square';
  bottomCtx.lineJoin = 'miter';

  for (let lane = 0; lane < lanes; lane++) {
    const rel = Math.abs(lane - (lanes - 1) / 2);
    bottomCtx.beginPath();
    for (let x = -90; x <= width + 90; x += perf.curveStep) {
      const y = bottomCurveY(lane, x, t, width, height);
      if (x === -90) bottomCtx.moveTo(x, y);
      else bottomCtx.lineTo(x, y);
    }
    bottomCtx.strokeStyle = `rgba(9,10,13,${.045 + (1 - rel / 8) * .052})`;
    bottomCtx.lineWidth = lane % 4 === 0 ? 1.02 : .62;
    bottomCtx.stroke();
  }

  for (let lane = 0; lane < lanes; lane++) {
    const rel = Math.abs(lane - (lanes - 1) / 2);
    const alpha = Math.max(.05, .16 - rel * .012);
    const span = width + 260;
    for (let j = 0; j < perf.markerCount; j++) {
      const x = ((t * (34 + lane * .9) + j * span / perf.markerCount + lane * 31) % span) - 130;
      const y = bottomCurveY(lane, x, t, width, height);
      const y2 = bottomCurveY(lane, x + 20, t, width, height);
      const angle = Math.atan2(y2 - y, 20);
      const len = 10 + ((lane + j) % 3) * 7;
      const dx = Math.cos(angle) * len;
      const dy = Math.sin(angle) * len;
      bottomCtx.beginPath();
      bottomCtx.moveTo(x - dx, y - dy);
      bottomCtx.lineTo(x + dx, y + dy);
      bottomCtx.strokeStyle = `rgba(9,10,13,${alpha})`;
      bottomCtx.lineWidth = j === 0 ? 1.15 : .72;
      bottomCtx.stroke();
    }
  }

  bottomCtx.restore();
}

if (field && microCanvas && ambient) {
  const state = {
    ambient: [],
    bottom: [],
    threads: [],
    start: performance.now(),
    raf: 0,
    lastFrame: 0,
    pauseAt: 0,
  };

  function setup() {
    perf = getPerfProfile();
    ambient.innerHTML = '';
    bottomCanvas = null;
    bottomCtx = null;
    if (bottomFlow) {
      bottomFlow.innerHTML = '';
      bottomCanvas = document.createElement('canvas');
      bottomCanvas.className = 'bottom-flow-canvas';
      bottomCanvas.setAttribute('aria-hidden', 'true');
      bottomFlow.appendChild(bottomCanvas);
      bottomCtx = bottomCanvas.getContext('2d');
      fitBottomCanvas();
    }
    renderMicroWordTexture();
    state.ambient = [];
    state.bottom = [];
    state.threads = [];

    // Sparse outside model-name dust. Keep it away from the lower stream field
    // so the bottom reads as fluid current instead of random space particles.
    const count = perf.ambientCount;
    for (let i = 0; i < count; i++) {
      const el = document.createElement('span');
      const strong = Math.random() > .86;
      el.className = `ambient-word${strong ? ' strong' : ''}`;
      el.textContent = pick(WORDS);
      el.style.setProperty('--fs', `${strong ? rand(8, 12) : rand(5, 9)}px`);
      ambient.appendChild(el);
      state.ambient.push({
        el,
        x: rand(-80, window.innerWidth + 80),
        y: rand(88, window.innerHeight * .78),
        vx: rand(-.08, .08),
        vy: rand(-.035, .035),
        rot: rand(-4, 4),
        alpha: strong ? rand(.15, .28) : rand(.055, .15),
        phase: rand(0, Math.PI * 2),
      });
    }

    if (bottomFlow) {
      const bw = window.innerWidth;
      const count = perf.bottomCount;
      for (let i = 0; i < count; i++) {
        const el = document.createElement('span');
        const strong = i % 7 === 0;
        el.className = `flow-word${strong ? ' strong' : ''}`;
        el.textContent = pick(WORDS);
        el.style.setProperty('--fs', `${strong ? rand(8, 11) : rand(5, 8)}px`);
        bottomFlow.appendChild(el);
        state.bottom.push({
          el,
          lane: 1 + (i * 3) % Math.max(2, perf.lanes - 2),
          x: ((i * 131) % (bw + 260)) - 130,
          vx: .18 + (i % 5) * .035,
          phase: i * .81,
          alpha: strong ? .38 : .18,
        });
      }
    }
  }

  function animate(now) {
    state.raf = 0;
    if (document.hidden) return;
    if (now - state.lastFrame < perf.frameInterval) {
      state.raf = requestAnimationFrame(animate);
      return;
    }
    state.lastFrame = now;

    const t = (now - state.start) / 1000;
    mouse.x += (mouse.tx - mouse.x) * .055;
    mouse.y += (mouse.ty - mouse.y) * .055;

    const groupX = mouse.x * 18 + Math.sin(t * .22) * 7 + Math.sin(t * .51) * 3;
    const groupY = mouse.y * 10 + Math.cos(t * .18) * 4 + Math.cos(t * .37) * 2;
    const groupSkew = Math.sin(t * .16) * .9;
    microCanvas.style.transform = `translate3d(${groupX}px, ${groupY}px, 0) skewX(${groupSkew}deg)`;
    drawMicroField(t);

    for (const a of state.ambient) {
      const v = flowVelocity(a.x, a.y, t + a.phase);
      a.x += a.vx + v.vx + mouse.x * .018;
      a.y += a.vy + v.vy + mouse.y * .012;
      if (a.x < -160) a.x = window.innerWidth + 120;
      if (a.x > window.innerWidth + 160) a.x = -120;
      if (a.y < 70) a.y = window.innerHeight * .78;
      if (a.y > window.innerHeight * .82) a.y = 92;
      const breathe = .72 + Math.sin(t * .65 + a.phase) * .28;
      a.el.style.opacity = a.alpha * breathe;
      const stretch = 1 + Math.min(.16, Math.hypot(a.vx, a.vy) * .7);
      a.el.style.transform = `translate3d(${a.x + mouse.x * 14}px, ${a.y + mouse.y * 9}px, 0) rotate(${a.rot + Math.sin(t + a.phase) * 1.2}deg) scaleX(${stretch})`;
    }

    if (bottomFlow) {
      const bw = window.innerWidth;
      const bh = Math.max(1, bottomFlow.clientHeight);
      drawBottomField(t);
      for (const b of state.bottom) {
        b.x += b.vx;
        if (b.x > bw + 140) b.x = -180;
        const y = bottomCurveY(b.lane, b.x, t + b.phase * .08, bw, bh);
        const y2 = bottomCurveY(b.lane, b.x + 28, t + b.phase * .08, bw, bh);
        const angle = Math.atan2(y2 - y, 28) * 180 / Math.PI;
        const x = b.x + mouse.x * 12;
        b.el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${angle}deg) skewX(${Math.sin(t + b.phase) * 3}deg)`;
        b.el.style.opacity = b.alpha * (.78 + Math.sin(t * .72 + b.phase) * .18);
      }
    }

    state.raf = requestAnimationFrame(animate);
  }

  function startAnimation() {
    if (state.raf || perf.reducedMotion || document.hidden) return;
    state.raf = requestAnimationFrame(animate);
  }

  let resizeTimer = 0;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(setup, 160);
  }, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      state.pauseAt = performance.now();
      return;
    }
    if (state.pauseAt) {
      state.start += performance.now() - state.pauseAt;
      state.pauseAt = 0;
    }
    startAnimation();
  });
  setup();
  if (perf.reducedMotion) {
    drawBottomField(0);
  } else {
    startAnimation();
  }
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(renderMicroWordTexture).catch(() => {});
  }
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('is-visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.scope-card, .project-card, .join-copy, .roles, .manifesto p').forEach((el) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(18px)';
  el.style.transition = 'opacity .65s ease, transform .65s ease';
  observer.observe(el);
});

const style = document.createElement('style');
style.innerHTML = `.is-visible{opacity:1!important;transform:translateY(0)!important}`;
document.head.appendChild(style);

document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    const value = button.getAttribute('data-copy') || '';
    const original = button.textContent;
    try {
      await navigator.clipboard.writeText(value);
      button.textContent = 'Copied';
    } catch (error) {
      button.textContent = value;
    }
    window.setTimeout(() => {
      button.textContent = original;
    }, 1400);
  });
});
