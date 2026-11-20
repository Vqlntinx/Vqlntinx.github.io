// Background music: one track per page, one shared mute switch and volume.
// All tracks: Kevin MacLeod (incompetech.com), licensed under CC BY 4.0
// (credited by the ♪ chip on each page, see components/MusicChip.jsx).
//
// Browsers refuse audio with sound until the visitor has clicked or pressed a key,
// so if play() is rejected we simply try again on the first gesture.

export const TRACKS = {
  morning: { title: 'Morning', src: './bgm/morning.mp3' },
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

function entry(name) {
  if (!pool[name]) {
    const a = new Audio(TRACKS[name].src);
    a.loop = true;
    a.preload = 'auto';
    a.volume = 0;
    pool[name] = { name, a, timer: 0, fading: false };
  }
  return pool[name];
}

// fade an entry's volume to a target (a number, or a function read live so the
// slider can move during a fade-in)
function fadeTo(e, target, ms, done) {
  clearInterval(e.timer);
  e.fading = true;
  const start = e.a.volume;
  const steps = Math.max(1, Math.round(ms / 30));
  let i = 0;
  e.timer = setInterval(() => {
    i++;
    const goal = typeof target === 'function' ? target() : target;
    e.a.volume = Math.min(1, Math.max(0, start + (goal - start) * (i / steps)));
    if (i >= steps) { clearInterval(e.timer); e.fading = false; done?.(); }
  }, 30);
}

function armGesture() {
  if (armed) return;
  armed = true;
  const go = () => {
    armed = false;
    ['pointerdown', 'keydown', 'touchend'].forEach((ev) => window.removeEventListener(ev, go, true));
    if (wanted) bgmPlay(wanted);
  };
  ['pointerdown', 'keydown', 'touchend'].forEach((ev) => window.addEventListener(ev, go, true));
}

export function setMasterVolume(v) {
  master = Math.min(1, Math.max(0, v));
  if (current && current.name === wanted && !current.fading) current.a.volume = level();
}

export function bgmPlay(name) {
  if (!TRACKS[name]) return;
  wanted = name;
  const e = entry(name);
  // crossfade out whatever else is playing
  Object.values(pool).forEach((o) => {
    if (o !== e && !o.a.paused) fadeTo(o, 0, 700, () => { if (wanted !== o.name) o.a.pause(); });
  });
  current = e;
  e.a.play()
    .then(() => { if (wanted === name) fadeTo(e, level, 1400); })
    .catch(armGesture);
}

// stop the music; with `onlyIf`, only when that track is still the wanted one
// (so a page that is unmounting doesn't silence the page that replaced it)
export function bgmStop(ms = 700, onlyIf) {
  if (onlyIf && wanted !== onlyIf) return;
  wanted = null;
  Object.values(pool).forEach((o) => {
    if (!o.a.paused) fadeTo(o, 0, ms, () => { if (wanted !== o.name) o.a.pause(); });
  });
}
