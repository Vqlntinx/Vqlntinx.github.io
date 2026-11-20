import { createContext, useContext, useState, useCallback } from 'react';

const Ctx = createContext(null);
const read = (k, d) => { try { return localStorage.getItem(k) ?? d; } catch { return d; } };
const write = (k, v) => { try { localStorage.setItem(k, v); } catch { /* private mode */ } };

export function PrefsProvider({ children }) {
  const [lang, setLangState] = useState(() => read('p1.lang', 'ko'));
  // sound effects: on by default (browsers still hold sound until the first click or key press)
  const [sound, setSoundState] = useState(() => read('p1.sound', 'on') === 'on');
  const setLang = useCallback((l) => { setLangState(l); write('p1.lang', l); document.documentElement.lang = l; }, []);
  const setSound = useCallback((s) => { setSoundState(s); write('p1.sound', s ? 'on' : 'off'); }, []);
  // background music is its own switch (the ♪ chip), independent of sound effects
  // on by default; browsers still hold it until the visitor's first click or key press
  const [bgm, setBgmState] = useState(() => read('p1.bgm', 'on') === 'on');
  const setBgm = useCallback((b) => { setBgmState(b); write('p1.bgm', b ? 'on' : 'off'); }, []);
  // one volume (0–100) shared by every page's music
  const [bgmVolume, setBgmVolumeState] = useState(() => Number(read('p1.bgmVolume', '50')) || 0);
  const setBgmVolume = useCallback((v) => { setBgmVolumeState(v); write('p1.bgmVolume', String(v)); }, []);
  // L(): pick the current language from a {ko, en} value, or return plain values untouched
  const L = useCallback((v) => (v && typeof v === 'object' && !Array.isArray(v) && ('ko' in v || 'en' in v) ? v[lang] ?? v.en ?? v.ko : v), [lang]);
  return <Ctx.Provider value={{ lang, setLang, sound, setSound, bgm, setBgm, bgmVolume, setBgmVolume, L }}>{children}</Ctx.Provider>;
}

export const usePrefs = () => useContext(Ctx);
