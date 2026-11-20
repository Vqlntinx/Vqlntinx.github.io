import { useEffect, useState } from 'react';
import { useRoute, go } from './lib/router.js';
import { usePrefs } from './lib/i18n.jsx';
import { setSoundEnabled, sfx } from './lib/sound.js';
import Intro from './components/Intro.jsx';
import LinkStart from './components/LinkStart.jsx';
import HomeShell from './components/HomeShell.jsx';
import Projects from './sections/Projects.jsx';
import Experience from './sections/Experience.jsx';
import Games from './sections/Games.jsx';
import Reads from './sections/Reads.jsx';
import Skills from './sections/Skills.jsx';
import Memories from './sections/Memories.jsx';

const SECTIONS = { projects: Projects, experience: Experience, games: Games, reads: Reads, skills: Skills, memories: Memories };

export default function App() {
  const route = useRoute();
  const { sound } = usePrefs();
  const [linking, setLinking] = useState(false);

  useEffect(() => setSoundEnabled(sound), [sound]);

  // B / Escape goes back to the home menu from any themed page
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && SECTIONS[route]) { sfx.back(); go('home'); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [route]);

  const startLink = () => { setLinking(true); sfx.linkStart(); };

  let page;
  if (route === '' && !linking) page = <Intro onLinkStart={startLink} />;
  else if (route === '' && linking) page = <Intro zooming onLinkStart={() => {}} />;
  else if (SECTIONS[route]) { const S = SECTIONS[route]; page = <S key={route} />; }
  else page = <HomeShell tab={route === 'contact' ? 'contact' : 'home'} />;

  return (
    <>
      {page}
      {linking && (
        <LinkStart
          onEnterHome={() => go('home')}
          onDone={() => setLinking(false)}
        />
      )}
    </>
  );
}
