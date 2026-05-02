import { useState, useMemo } from 'react';
import { TAGS, T } from '../data.js';
import { BookCover, PrimaryButton } from '../ui.jsx';
import { IconSearch, IconPlus } from '../icons.jsx';
import { useStore } from '../store.jsx';
import { tagToPalette } from '../store.jsx';

function BookGridCard({ book, onOpen, onDelete }) {
  const [hovered, setHovered] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);
  const TC = T.common;
  return (
    <div style={{ position: 'relative' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setConfirmDel(false); }}>
      <button onClick={onOpen} style={{
        display: 'flex', flexDirection: 'column', gap: 12,
        textAlign: 'left', width: '100%',
      }}>
        <div style={{ width: '100%', aspectRatio: '2 / 3', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <BookCover book={book} w="100%" h="100%" style={{ width: '100%', height: '100%' }} />
          </div>
          {!book.finished && book.progress > 0 && (
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
      {hovered && (
        <button onClick={e => {
          e.stopPropagation();
          if (confirmDel) { onDelete(); } else { setConfirmDel(true); }
        }} style={{
          position: 'absolute', top: 6, right: 6,
          padding: '3px 7px', fontSize: 10.5, borderRadius: 4,
          background: 'oklch(0 0 0 / 0.55)', backdropFilter: 'blur(6px)',
          color: confirmDel ? 'oklch(0.75 0.2 15)' : 'white',
          border: '1px solid oklch(1 0 0 / 0.2)',
        }}>
          {confirmDel ? T.common.confirmDelete : T.common.delete}
        </button>
      )}
    </div>
  );
}

function AddBookModal({ onClose, onSave }) {
  const TC = T.common;
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [pages, setPages] = useState('');
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [tag, setTag] = useState('navike');
  const [finished, setFinished] = useState(false);
  const [progress, setProgress] = useState(0);

  const inp = {
    width: '100%', padding: '9px 12px',
    border: '1px solid var(--border)', borderRadius: 7,
    background: 'var(--bg-sunken)', color: 'var(--fg)',
    fontSize: 14, outline: 'none', fontFamily: 'var(--font-sans)',
    boxSizing: 'border-box',
  };

  const submit = () => {
    if (!title.trim()) return;
    const palette = tagToPalette(tag);
    onSave({
      title: title.trim(),
      author: author.trim() || 'Nepoznat autor',
      pages: parseInt(pages) || 0,
      year: parseInt(year) || new Date().getFullYear(),
      tag,
      palette,
      finished,
      progress: finished ? 100 : progress,
    });
    onClose();
  };

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'oklch(0 0 0 / 0.55)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', maxWidth: 520,
        background: 'var(--bg-raised)', border: '1px solid var(--border-strong)',
        borderRadius: 14, padding: '28px 28px 24px',
        boxShadow: '0 40px 100px -30px oklch(0 0 0 / 0.5)',
        display: 'flex', flexDirection: 'column', gap: 12,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
          <div className="serif" style={{ fontSize: 22, fontWeight: 500 }}>{TC.addBook}</div>
          <button onClick={onClose} style={{ color: 'var(--fg-subtle)', fontSize: 22, lineHeight: 1 }}>×</button>
        </div>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder={TC.title} style={inp} autoFocus />
        <input value={author} onChange={e => setAuthor(e.target.value)} placeholder={TC.author} style={inp} />
        <div style={{ display: 'flex', gap: 10 }}>
          <input value={pages} onChange={e => setPages(e.target.value)} placeholder={TC.pages} style={{ ...inp, flex: 1 }} type="number" min="0" />
          <input value={year} onChange={e => setYear(e.target.value)} placeholder="Godina" style={{ ...inp, flex: 1 }} type="number" />
        </div>
        <select value={tag} onChange={e => setTag(e.target.value)} style={inp}>
          {Object.entries(TAGS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, cursor: 'pointer' }}>
          <input type="checkbox" checked={finished} onChange={e => setFinished(e.target.checked)} />
          {TC.finished}
        </label>
        {!finished && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 13, color: 'var(--fg-muted)', whiteSpace: 'nowrap' }}>Pročitano: {progress}%</span>
            <input type="range" min="0" max="100" value={progress} onChange={e => setProgress(Number(e.target.value))} style={{ flex: 1 }} />
          </div>
        )}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 4 }}>
          <button onClick={onClose} style={{ padding: '8px 14px', fontSize: 13, color: 'var(--fg-muted)', borderRadius: 7, border: '1px solid var(--border)' }}>{TC.cancel}</button>
          <PrimaryButton onClick={submit}>{TC.save}</PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default function LibraryScreen({ onOpenBook }) {
  const { books, bookActions } = useStore();
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('recent');
  const [adding, setAdding] = useState(false);
  const TC = T.common;

  const filtered = useMemo(() => {
    let list = books;
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(b => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q));
    }
    list = [...list];
    if (sort === 'recent') list.sort((a, b) => (b.year || 0) - (a.year || 0));
    else if (sort === 'title') list.sort((a, b) => a.title.localeCompare(b.title, 'sr'));
    else if (sort === 'author') list.sort((a, b) => (a.author || '').split(' ').slice(-1)[0].localeCompare((b.author || '').split(' ').slice(-1)[0], 'sr'));
    return list;
  }, [books, query, sort]);

  const reading = filtered.filter(b => !b.finished);
  const finished = filtered.filter(b => b.finished);

  return (
    <div className="screen-in">
      <div className="pad-page" style={{ padding: '36px 40px 24px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <div className="micro" style={{ marginBottom: 10 }}>{T.nav.library} · {books.length} knjiga</div>
            <h1 className="serif hero-title" style={{
              margin: 0, fontSize: 38, fontWeight: 500, letterSpacing: '-0.022em',
            }}>{TC.theShelf}</h1>
          </div>
          <PrimaryButton icon={<IconPlus size={13} stroke={2} />} onClick={() => setAdding(true)}>{TC.addBook}</PrimaryButton>
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
        {books.length === 0 && (
          <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--fg-muted)' }}>
            <div className="serif" style={{ fontSize: 18, marginBottom: 8 }}>{TC.emptyLibrary}</div>
            <div style={{ fontSize: 13 }}>{TC.emptyLibraryBody}</div>
          </div>
        )}
        {reading.length > 0 && (
          <section style={{ marginBottom: 44 }}>
            <div className="micro" style={{ marginBottom: 16 }}>{TC.currentlyReading}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '28px 16px' }}>
              {reading.map(b => <BookGridCard key={b.id} book={b} onOpen={() => onOpenBook(b.id)} onDelete={() => bookActions.remove(b.id)} />)}
            </div>
          </section>
        )}
        {finished.length > 0 && (
          <section>
            <div className="micro" style={{ marginBottom: 16 }}>{TC.read} · {finished.length}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '32px 16px' }}>
              {finished.map(b => <BookGridCard key={b.id} book={b} onOpen={() => onOpenBook(b.id)} onDelete={() => bookActions.remove(b.id)} />)}
            </div>
          </section>
        )}
      </div>
      {adding && (
        <AddBookModal onClose={() => setAdding(false)} onSave={item => bookActions.add(item)} />
      )}
    </div>
  );
}
