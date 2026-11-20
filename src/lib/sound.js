// Tiny WebAudio synth: no audio files needed. Every call is a no-op when sound is off.
//
// Browsers only let audio start after a real user gesture (click / tap / key), and a
// hover doesn't count. If the AudioContext is created on a hover it stays "suspended",
// which is why sound used to stay silent until the toggle was clicked. So:
//  - the context is created/resumed on the first real gesture anywhere on the page
//  - sounds requested before that are simply skipped (a hover tick isn't worth queuing)
//  - sounds requested while it is still waking up are played once it is running
let ctx;
let enabled = false;
let unlocked = false;
export const setSoundEnabled = (v) => { enabled = v; if (v) unlock(); };

function hasGesture() {
  return unlocked || navigator.userActivation?.isActive || navigator.userActivation?.hasBeenActive;
}

function unlock() {
  if (!hasGesture()) return;
  try {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state !== 'running') ctx.resume().catch(() => {});
    unlocked = true;
  } catch { /* no Web Audio */ }
}

if (typeof window !== 'undefined') {
  const onGesture = () => {
    unlocked = true;
    unlock();
    if (ctx?.state === 'running') ['pointerdown', 'keydown', 'touchend'].forEach((e) => window.removeEventListener(e, onGesture, true));
  };
  ['pointerdown', 'keydown', 'touchend'].forEach((e) => window.addEventListener(e, onGesture, true));
}

function tone(...args) {
  if (!hasGesture()) return;
  unlock();
  if (!ctx) return;
  if (ctx.state === 'running') play(...args);
  else ctx.resume().then(() => play(...args)).catch(() => {});
}

function play(freq, dur = 0.08, type = 'sine', vol = 0.12, when = 0, slideTo) {
  const a = ctx;
  const t = a.currentTime + when;
  const o = a.createOscillator();
  const g = a.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(a.destination);
  o.start(t);
  o.stop(t + dur + 0.02);
}

// filtered white-noise burst (slurps, crunches, clicks)
let noiseBuf;
function noise(dur = 0.1, freq = 1200, q = 1, vol = 0.2, when = 0, sweepTo) {
  if (!hasGesture()) return;
  unlock();
  if (!ctx) return;
  const run = () => {
    const a = ctx;
    if (!noiseBuf) {
      noiseBuf = a.createBuffer(1, a.sampleRate, a.sampleRate);
      const d = noiseBuf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    }
    const t = a.currentTime + when;
    const src = a.createBufferSource();
    src.buffer = noiseBuf;
    const f = a.createBiquadFilter();
    f.type = 'bandpass'; f.Q.value = q;
    f.frequency.setValueAtTime(freq, t);
    if (sweepTo) f.frequency.exponentialRampToValueAtTime(sweepTo, t + dur);
    const g = a.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + Math.min(0.02, dur / 3));
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(f).connect(g).connect(a.destination);
    src.start(t, Math.random() * 0.5);
    src.stop(t + dur + 0.05);
  };
  if (ctx.state === 'running') run(); else ctx.resume().then(run).catch(() => {});
}

export const sfx = {
  lampClick() { if (enabled) { noise(0.03, 3500, 2, 0.3); tone(2200, 0.03, 'square', 0.03, 0.01); } },
  tick() { if (enabled) tone(1400, 0.04, 'square', 0.04); },
  select() { if (enabled) { tone(880, 0.06, 'triangle', 0.1); tone(1320, 0.08, 'triangle', 0.08, 0.05); } },
  back() { if (enabled) tone(600, 0.1, 'triangle', 0.1, 0, 300); },
  open() { if (enabled) { tone(300, 0.35, 'sawtooth', 0.05, 0, 1200); tone(1046, 0.25, 'sine', 0.1, 0.25); } },
  linkStart() {
    if (!enabled) return;
    tone(120, 2.2, 'sawtooth', 0.05, 0, 2400);
    tone(240, 2.2, 'sine', 0.06, 0, 3200);
    [523, 659, 784, 1046].forEach((f, i) => tone(f, 1.4, 'sine', 0.07, 2.1 + i * 0.04));
  },
  text() { if (enabled) tone(900 + Math.random() * 200, 0.025, 'square', 0.025); },
};
