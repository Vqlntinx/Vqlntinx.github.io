import { go } from '../lib/router.js';
import { sfx } from '../lib/sound.js';

// Every themed page carries the same way back to the console home.
export default function HomePill({ className = '' }) {
  return (
    <button className={'home-pill ' + className} onClick={() => { sfx.back(); go('home'); }} aria-label="Home">
      <span className="btn-glyph">B</span> HOME
    </button>
  );
}
