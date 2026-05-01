import { useState, useMemo } from 'react';
import { BOOKS, T } from '../data.js';
import { BookCover, PrimaryButton } from '../ui.jsx';
import { IconSearch, IconPlus } from '../icons.jsx';

function BookGridCard({ book, onOpen }) {
  const TC = T.common;
  return (
    <button onClick={onOpen} style={{
      display: 'flex', flexDirection: 'column', gap: 12,
      textAlign: 'left', width: '100%',
    }}>
      <div style={{ width: '100%', aspectRatio: '2 / 3', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <BookCover book={book} w="100%" h="100%" style={{ width: '100%', height: '100%' }} />
        </div>
        {!book.finished && (
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: 'oklch(0 0 0 / 0.55)', backdropFilter: 'blur(8px)',
            padding: '6px 10px', fontSize: 10.5, color: 'white',
            display: 'flex', alignItems: 'center', gap: 8,
            fontFamily: 'var(--font-mono)', letterSpacing: '0.08em',
          }}>
            <span>{book.progress}%</span>
            <div style={{ flex: 1, height: 2, background: 'oklch(1 0 0 / 0.2)' }}>
              <div style={{ height: '100%', width: `${book.progress}%`, background: 'var(--accent)' }} />
            </div>
          </div>
        )}
      </div>
      <div>
        <div className="serif" style={{
          fontSize: 15, fontWeight: 500, lineHeight: 1.2,
          letterSpacing: '-0.01em', color: 'var(--fg)',
          marginBottom: 3, textWrap: 'balance',
        }}>{book.title}</div>
        <div style={{ fontSize: 12, color: 'var(--fg-muted)' }}>{book.author}</div>
        <div className="micro" style={{ marginTop: 4 }}>
          {book.finished ? `${TC.read} · ${book.year}` : TC.reading}
        </div>
      </div>
    </button>
  );
}

export default function LibraryScreen({ onOpenBook }) {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('recent');
  const TC = T.common;

  const books = useMemo(() => {
    let list = BOOKS;
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(b => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q));
    }
    list = [...list];
    if (sort === 'recent') list.sort((a, b) => b.year - a.year);
    else if (sort === 'title') list.sort((a, b) => a.title.localeCompare(b.title, 'sr'));
    else if (sort === 'author') list.sort((a, b) => a.author.split(' ').slice(-1)[0].localeCompare(b.author.split(' ').slice(-1)[0], 'sr'));
    return list;
  }, [query, sort]);

  const reading = books.filter(b => !b.finished);
  const finished = books.filter(b => b.finished);

  return (
    <div className="screen-in">
      <div className="pad-page" style={{ padding: '36px 40px 24px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <div className="micro" style={{ marginBottom: 10 }}>{T.nav.library} · {BOOKS.length} knjiga</div>
            <h1 className="serif hero-title" style={{
              margin: 0, fontSize: 38, fontWeight: 500, letterSpacing: '-0.022em',
            }}>{TC.theShelf}</h1>
          </div>
          <PrimaryButton icon={<IconPlus size={13} stroke={2} />}>{TC.addBook}</PrimaryButton>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 26, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 12px', border: '1px solid var(--border)',
            borderRadius: 8, background: 'var(--bg-raised)',
            flex: '1 1 280px', maxWidth: 420,
          }}>
            <IconSearch size={14} style={{ color: 'var(--fg-subtle)' }} />
            <input value={query} onChange={e => setQuery(e.target.value)}
              placeholder={TC.searchLibrary}
              style={{ flex: 1, background: 'transparent', border: 0, outline: 'none', fontSize: 13, color: 'var(--fg)' }} />
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {[{ id: 'recent', label: TC.recent }, { id: 'title', label: TC.title }, { id: 'author', label: TC.author }].map(s => (
              <button key={s.id} onClick={() => setSort(s.id)} style={{
                padding: '7px 12px', fontSize: 12, borderRadius: 7,
                border: '1px solid', borderColor: sort === s.id ? 'var(--border-strong)' : 'var(--border)',
                color: sort === s.id ? 'var(--fg)' : 'var(--fg-muted)',
                background: sort === s.id ? 'var(--hover-bg)' : 'transparent',
              }}>{s.label}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="pad-page" style={{ padding: '32px 40px 80px' }}>
        {reading.length > 0 && (
          <section style={{ marginBottom: 44 }}>
            <div className="micro" style={{ marginBottom: 16 }}>{TC.currentlyReading}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '28px 16px' }}>
              {reading.map(b => <BookGridCard key={b.id} book={b} onOpen={() => onOpenBook(b.id)} />)}
            </div>
          </section>
        )}
        <section>
          <div className="micro" style={{ marginBottom: 16 }}>{TC.read} · {finished.length}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '32px 16px' }}>
            {finished.map(b => <BookGridCard key={b.id} book={b} onOpen={() => onOpenBook(b.id)} />)}
          </div>
        </section>
      </div>
    </div>
  );
}
