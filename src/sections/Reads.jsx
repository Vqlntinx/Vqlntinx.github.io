import { useEffect, useMemo, useRef, useState } from 'react';
import { usePrefs } from '../lib/i18n.jsx';
import { sfx } from '../lib/sound.js';
import { reads } from '../data/reads.js';
import HomePill from '../components/HomePill.jsx';
import MusicChip from '../components/MusicChip.jsx';
import './Reads.css';

/*
  Cozy village library that scales to any number of books:
  - a fixed number of shelves (3, or 2 on narrow screens); books per shelf come
    from the measured shelf width, so a "bookcase page" is always full-but-not-overflowing
  - more books than fit → more bookcase pages, flipped with ◀ ▶ / arrow keys / swipe
  - year tabs narrow the shelves once the collection grows
  Newest books come first.
*/
const Leaf = ({ on }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
    <path d="M4 20 C4 9 12 4 20 4 C20 13 14 20 4 20Z" fill={on ? '#5cb85c' : '#e5dcc6'} />
    <path d="M4 20 L15 9" stroke={on ? '#3d8b3d' : '#d4c9ae'} strokeWidth="1.6" />
  </svg>
);

const SPINE_GAP = 6;
const BOOKEND = 56; // space kept free at the end of each shelf for a decoration

const sorted = [...reads].sort((a, b) => (b.date || '').localeCompare(a.date || ''));
const yearOf = (b) => (b.date || '').slice(0, 4);
const YEARS = [...new Set(sorted.map(yearOf).filter(Boolean))].sort(); // tabs: oldest year first
const DECOR = ['🍵', '🪴', '🕯️', '🧸', '🐚'];

export default function Reads() {
  const { L, lang } = usePrefs();
  const [open, setOpen] = useState(null);
  const [year, setYear] = useState('all');
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState(1);
  const [layout, setLayout] = useState({ shelves: 3, perShelf: 10 });
  const caseRef = useRef(null);
  const swipe = useRef(null);
  const book = reads.find((b) => b.id === open);

  const list = useMemo(() => (year === 'all' ? sorted : sorted.filter((b) => yearOf(b) === year)), [year]);

  // how many spines fit on one shelf at the current width
  useEffect(() => {
    const el = caseRef.current;
    if (!el) return;
    const measure = () => {
      const narrow = window.innerWidth < 720;
      const spineW = narrow ? 48 : 62;
      const inner = el.clientWidth - 2 * 22 /* case padding */ - 2 * 16 /* shelf padding */ - BOOKEND;
      const perShelf = Math.max(3, Math.floor((inner + SPINE_GAP) / (spineW + SPINE_GAP)));
      setLayout({ shelves: narrow ? 2 : 3, perShelf });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const pageSize = layout.shelves * layout.perShelf;
  const pages = Math.max(1, Math.ceil(list.length / pageSize));
  const cur = Math.min(page, pages - 1);
  const pageBooks = list.slice(cur * pageSize, (cur + 1) * pageSize);
  const shelves = Array.from({ length: layout.shelves }, (_, r) => pageBooks.slice(r * layout.perShelf, (r + 1) * layout.perShelf));

  const goPage = (p) => {
    if (p < 0 || p >= pages || p === cur) return;
    setDir(p > cur ? 1 : -1);
    setPage(p);
    sfx.select();
  };
  useEffect(() => { setPage(0); }, [year]);

  useEffect(() => {
    const onKey = (e) => {
      if (open) { if (e.key === 'Escape') { e.stopPropagation(); setOpen(null); } return; }
      if (e.key === 'ArrowRight') goPage(cur + 1);
      if (e.key === 'ArrowLeft') goPage(cur - 1);
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  });

  return (
    <main className="library page-enter">
      <HomePill className="lib-pill" />
      <MusicChip track="nouvelle-noel" />
      <div className="lib-wall" aria-hidden="true">
        <div className="round-window"><span className="cloud c1" /><span className="cloud c2" /></div>
        <div className="wall-clock"><i className="hand h" /><i className="hand m" /></div>
        <div className="garland">{Array.from({ length: 9 }, (_, i) => <span key={i} />)}</div>
        <div className="rug" />
      </div>

      <header className="lib-head">
        <div className="lib-sign"><span>📖</span>{lang === 'ko' ? '나의 도서관' : 'My Library'}</div>
        {YEARS.length > 1 && (
          <nav className="year-tabs">
            <button className={year === 'all' ? 'on' : ''} onClick={() => { setYear('all'); sfx.select(); }}>{lang === 'ko' ? '전체' : 'All'}</button>
            {YEARS.map((y) => (
              <button key={y} className={year === y ? 'on' : ''} onClick={() => { setYear(y); sfx.select(); }}>{y}</button>
            ))}
          </nav>
        )}
      </header>

      <div className="case-wrap">
        <button className="page-arrow prev" disabled={cur === 0} onClick={() => goPage(cur - 1)} aria-label="Previous bookcase">◀</button>

        <section
          className="bookcase"
          ref={caseRef}
          onPointerDown={(e) => { swipe.current = { x: e.clientX, y: e.clientY }; }}
          onPointerUp={(e) => {
            const s = swipe.current; swipe.current = null;
            if (!s) return;
            const dx = e.clientX - s.x;
            if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(e.clientY - s.y)) goPage(cur + (dx < 0 ? 1 : -1));
          }}
        >
          <div className={'case-page ' + (dir > 0 ? 'from-right' : 'from-left')} key={year + '-' + cur + '-' + layout.perShelf}>
            {shelves.map((row, r) => (
              <div className="shelf" key={r}>
                {row.map((b, i) => (
                  <button
                    key={b.id}
                    className="spine"
                    style={{ '--c': b.color, height: (b.height ?? 92) + '%', animationDelay: (r * layout.perShelf + i) * 0.025 + 's' }}
                    onClick={() => { sfx.open(); setOpen(b.id); }}
                    onMouseEnter={() => sfx.tick()}
                    aria-label={L(b.title)}
                    title={L(b.title)}
                  >
                    <span className="spine-band" />
                    <span className="spine-title">{L(b.title)}</span>
                    <span className="spine-band bottom" />
                  </button>
                ))}
                <span className="bookend">{DECOR[(r + cur) % DECOR.length]}</span>
              </div>
            ))}
          </div>
        </section>

        <button className="page-arrow next" disabled={cur >= pages - 1} onClick={() => goPage(cur + 1)} aria-label="Next bookcase">▶</button>
      </div>

      {pages > 1 && (
        <div className="page-dots">
          {Array.from({ length: pages }, (_, i) => (
            <button key={i} className={i === cur ? 'on' : ''} onClick={() => goPage(i)} aria-label={`${i + 1}`} />
          ))}
        </div>
      )}

      <div className="librarian">
        <span className="owl">🦉</span>
        <div className="bubble">
          <b>{lang === 'ko' ? '사서' : 'Librarian'}</b>
          {lang === 'ko'
            ? `지금까지 ${reads.length}권 읽었어요!${pages > 1 ? ' 옆 책장도 넘겨 보세요.' : ' 한 권 꺼내 볼래요?'}`
            : `${reads.length} books so far!${pages > 1 ? ' Flip to the next bookcase too.' : ' Pick one?'}`}
        </div>
      </div>

      {book && (
        <div className="book-backdrop" onClick={() => { sfx.back(); setOpen(null); }}>
          <article className="open-book" onClick={(e) => e.stopPropagation()} style={{ '--c': book.color }}>
            <div className="page left">
              {book.cover ? (
                <img className="cover-img" src={book.cover} alt={L(book.title)} />
              ) : (
                <div className="cover-mini">
                  <span>{L(book.title)}</span>
                </div>
              )}
              <h2>{L(book.title)}</h2>
              <p className="author">{L(book.author)}</p>
              <div className="leaves">{[1, 2, 3, 4, 5].map((n) => <Leaf key={n} on={n <= book.rating} />)}</div>
              <p className="date">{book.date}</p>
            </div>
            <div className="page right">
              {L(book.review).split('\n').map((line, i) => <p key={i}>{line}</p>)}
              <button className="close-book" onClick={() => { sfx.back(); setOpen(null); }}>{lang === 'ko' ? '책 덮기' : 'Close'} ✕</button>
            </div>
          </article>
        </div>
      )}
    </main>
  );
}
