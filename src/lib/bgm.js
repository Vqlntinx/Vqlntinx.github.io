// Background music: one track per page, one shared mute switch and volume.
// All tracks: Kevin MacLeod (incompetech.com), licensed under CC BY 4.0
// (credited by the ♪ chip on each page, see components/MusicChip.jsx).
//
// Browsers refuse audio with sound until the visitor has clicked or pressed a key,
// so if play() is rejected we simply try again on the first gesture.

export const TRACKS = {
  // extra `layers` play together with the main track (same mute switch / volume);
  // `gain` is each layer's loudness relative to the main track,
  // `pan` places it left (-1) .. right (+1), `lowpass` (Hz) softens it as if heard from further away
  morning: {
    title: 'Morning', src: './bgm/morning.mp3',
    // birds outside the open window on the right of the intro scene
    layers: [{ src: './bgm/humming-birds.mp3', gain: 0.6, pan: 0.4, lowpass: 5000 }],
  },
  pixelland: { title: 'Pixelland', src: './bgm/pixelland.mp3' },
  'call-to-adventure': { title: 'Call to Adventure', src: './bgm/call-to-adventure.mp3' },
  'nouvelle-noel': { title: 'Nouvelle Noel', src: './bgm/nouvelle-noel.mp3' },
  'quirky-dog': { title: 'Quirky Dog', src: './bgm/quirky-dog.mp3' },
  'delightful-d': { title: 'Delightful D', src: './bgm/delightful-d.mp3' },
};

const MAX = 0.7;        // loudest the slider can go
let master = 0.5;       // 0..1, set from the shared volume slider
let wanted = null;      // name of the track that should be playing, or null
let current = null;     // entry currently audible (or fading in)
const pool = {};        // lazily created <audio> per track
let armed = false;

const level = () => MAX * master;

// Web Audio is only used for layers that need placing (pan / lowpass)
let ctx = null;
function audioCtx() {
  if (!ctx) {
    const C = window.AudioContext || window.webkitAudioContext;
    if (C) ctx = new C();
  }
  return ctx;
}
const wake = () => { if (ctx && ctx.state !== 'running') ctx.resume().catch(() => {}); };

// route an <audio> through panner/filter; returns the gain node that sets its loudness
function place(a, { pan, lowpass }) {
  const c = audioCtx();
  if (!c) return null;
  let node = c.createMediaElementSource(a);
  if (lowpass) {
    const f = c.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.value = lowpass;
    node = node.connect(f);
  }
  if (pan != null && c.createStereoPanner) {
    const sp = c.createStereoPanner();
    sp.pan.value = pan;
    node = node.connect(sp);
  }
  const g = c.createGain();
  g.gain.value = 0;
  node.connect(g).connect(c.destination);
  return g;
}

function entry(name) {
  if (!pool[name]) {
    const t = TRACKS[name];
    const parts = [{ src: t.src, gain: 1 }, ...(t.layers || [])].map(({ src, gain = 1, pan, lowpass }) => {
      const a = new Audio(src);
      a.loop = true;
      a.preload = 'auto';
      a.volume = 0;
      const g = pan != null || lowpass ? place(a, { pan, lowpass }) : null;
      if (g) a.volume = 1; // loudness now lives on the gain node
      return { a, gain, g };
    });
    pool[name] = { name, parts, v: 0, timer: 0, fading: false };
  }
  return pool[name];
}

// set an entry's volume (0..1) on all of its layers
function setVol(e, v) {
  e.v = Math.min(1, Math.max(0, v));
  e.parts.forEach((p) => {
    const v = Math.min(1, e.v * p.gain);
    if (p.g) p.g.gain.value = v;
    else p.a.volume = v;
  });
}
const isPaused = (e) => e.parts[0].a.paused;
const pause = (e) => e.parts.forEach((p) => p.a.pause());

// fade an entry's volume to a target (a number, or a function read live so the
// slider can move during a fade-in)
function fadeTo(e, target, ms, done) {
  clearInterval(e.timer);
  e.fading = true;
  const start = e.v;
  const steps = Math.max(1, Math.round(ms / 30));
  let i = 0;
  e.timer = setInterval(() => {
    i++;
    const goal = typeof target === 'function' ? target() : target;
    setVol(e, start + (goal - start) * (i / steps));
    if (i >= steps) { clearInterval(e.timer); e.fading = false; done?.(); }
  }, 30);
}

function armGesture() {
  if (armed) return;
  armed = true;
  const go = () => {
    armed = false;
    ['pointerdown', 'keydown', 'touchend'].forEach((ev) => window.removeEventListener(ev, go, true));
    wake();
    if (wanted) bgmPlay(wanted);
  };
  ['pointerdown', 'keydown', 'touchend'].forEach((ev) => window.addEventListener(ev, go, true));
}

export function setMasterVolume(v) {
  master = Math.min(1, Math.max(0, v));
  if (current && current.name === wanted && !current.fading) setVol(current, level());
}

export function bgmPlay(name) {
  if (!TRACKS[name]) return;
  wanted = name;
  const e = entry(name);
  // crossfade out whatever else is playing
  Object.values(pool).forEach((o) => {
    if (o !== e && !isPaused(o)) fadeTo(o, 0, 700, () => { if (wanted !== o.name) pause(o); });
  });
  current = e;
  wake();
  Promise.all(e.parts.map((p) => p.a.play()))
    .then(() => { if (wanted === name) fadeTo(e, level, 1400); })
    .catch(() => { pause(e); armGesture(); });
}

// stop the music; with `onlyIf`, only when that track is still the wanted one
// (so a page that is unmounting doesn't silence the page that replaced it)
export function bgmStop(ms = 700, onlyIf) {
  if (onlyIf && wanted !== onlyIf) return;
  wanted = null;
  Object.values(pool).forEach((o) => {
    if (!isPaused(o)) fadeTo(o, 0, ms, () => { if (wanted !== o.name) pause(o); });
  });
}
