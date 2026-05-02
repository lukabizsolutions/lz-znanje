import { useState, useMemo } from 'react';
import { TAGS, T } from '../data.js';
import { TagPill, PrimaryButton } from '../ui.jsx';
import { IconBookmark, IconPlus, IconTrash } from '../icons.jsx';
import { useStore } from '../store.jsx';
import { tagToPalette } from '../store.jsx';

function LessonCard({ lesson, onClick, onDelete }) {
  const [hovered, setHovered] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);
  const src = lesson.source || { kind: 'free', label: 'Sveska' };
  return (
    <article className="lift" style={{
      display: 'flex', flexDirection: 'column', gap: 14,
      padding: '18px 18px 16px',
      border: '1px solid var(--border)',
      borderRadius: 10, background: 'var(--bg-raised)',
      cursor: 'pointer', minHeight: 180,
      position: 'relative',
      borderColor: hovered ? 'var(--border-strong)' : 'var(--border)',
    }}
    onClick={onClick}
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => { setHovered(false); setConfirmDel(false); }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <TagPill tag={lesson.tag} />
        {src.kind === 'book' && <IconBookmark size={13} style={{ color: 'var(--fg-subtle)' }} />}
      </div>
      <h3 className="serif" style={{
        margin: 0, fontSize: 19, fontWeight: 500, lineHeight: 1.2,
        letterSpacing: '-0.015em', textWrap: 'balance',
      }}>{lesson.title}</h3>
      <p style={{
        margin: 0, fontSize: 13, color: 'var(--fg-muted)', lineHeight: 1.55,
        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
      }}>{lesson.body}</p>
      <div style={{
        marginTop: 'auto', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 12, borderTop: '1px solid var(--border)',
      }}>
        <div className="micro">
          {src.kind === 'book' ? `Iz · ${src.label}` : src.label}
        </div>
        {hovered && (
          <button onClick={e => {
            e.stopPropagation();
            if (confirmDel) { onDelete(); } else { setConfirmDel(true); }
          }} style={{
            fontSize: 11, color: confirmDel ? 'oklch(0.65 0.2 15)' : 'var(--fg-subtle)',
            padding: '2px 6px', borderRadius: 4,
            border: confirmDel ? '1px solid oklch(0.65 0.2 15 / 0.4)' : '1px solid transparent',
          }}>
            {confirmDel ? T.common.confirmDelete : T.common.delete}
          </button>
        )}
      </div>
    </article>
  );
}

function FilterChip({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: '6px 12px', fontSize: 12, fontWeight: 500,
      border: '1px solid', borderColor: active ? 'var(--fg)' : 'var(--border)',
      color: active ? 'var(--fg)' : 'var(--fg-muted)',
      background: active ? 'var(--hover-bg)' : 'transparent',
      borderRadius: 999, transition: 'all 140ms',
    }}>{label}</button>
  );
}

function AddLessonModal({ onClose, onSave, books }) {
  const TC = T.common;
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tag, setTag] = useState('navike');
  const [bookId, setBookId] = useState('');

  const inp = {
    width: '100%', padding: '9px 12px',
    border: '1px solid var(--border)', borderRadius: 7,
    background: 'var(--bg-sunken)', color: 'var(--fg)',
    fontSize: 14, outline: 'none', fontFamily: 'var(--font-sans)',
    boxSizing: 'border-box',
  };

  const submit = () => {
    if (!title.trim()) return;
    const book = books.find(b => b.id === bookId);
    const source = book
      ? { kind: 'book', id: book.id, label: book.title }
      : { kind: 'free', label: 'Sveska' };
    onSave({ title: title.trim(), body: body.trim(), tag, source });
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
        width: '100%', maxWidth: 560,
        background: 'var(--bg-raised)', border: '1px solid var(--border-strong)',
        borderRadius: 14, padding: '28px 28px 24px',
        boxShadow: '0 40px 100px -30px oklch(0 0 0 / 0.5)',
        display: 'flex', flexDirection: 'column', gap: 14,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
          <div className="serif" style={{ fontSize: 22, fontWeight: 500 }}>{TC.addLesson}</div>
          <button onClick={onClose} style={{ color: 'var(--fg-subtle)', fontSize: 22, lineHeight: 1 }}>×</button>
        </div>
        <input value={title} onChange={e => setTitle(e.target.value)}
          placeholder={TC.title} style={inp} autoFocus />
        <textarea value={body} onChange={e => setBody(e.target.value)}
          placeholder="Šta si naučio? Opiši lekciju…"
          style={{ ...inp, minHeight: 120, resize: 'vertical', lineHeight: 1.6 }} />
        <div style={{ display: 'flex', gap: 10 }}>
          <select value={tag} onChange={e => setTag(e.target.value)} style={{ ...inp, flex: 1 }}>
            {Object.entries(TAGS).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
          <select value={bookId} onChange={e => setBookId(e.target.value)} style={{ ...inp, flex: 1 }}>
            <option value="">{TC.selectBook}</option>
            {books.map(b => <option key={b.id} value={b.id}>{b.title}</option>)}
          </select>
        </div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 4 }}>
          <button onClick={onClose} style={{ padding: '8px 14px', fontSize: 13, color: 'var(--fg-muted)', borderRadius: 7, border: '1px solid var(--border)' }}>{TC.cancel}</button>
          <PrimaryButton onClick={submit}>{TC.save}</PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default function HomeScreen({ onOpenBook }) {
  const { lessons, books, lessonActions } = useStore();
  const [filter, setFilter] = useState('all');
  const [seed, setSeed] = useState(0);
  const [adding, setAdding] = useState(false);
  const TC = T.common;

  const tagIds = useMemo(() => Array.from(new Set(lessons.map(l => l.tag))).slice(0, 6), [lessons]);
  const filters = [
    { id: 'all', label: TC.all },
    { id: 'book', label: TC.fromBooks },
    { id: 'notebook', label: TC.fromNotebook },
    ...tagIds.map(t => ({ id: `tag:${t}`, label: TAGS[t]?.label || t })),
  ];

  const filtered = useMemo(() => {
    let out = lessons;
    if (filter === 'book') out = out.filter(l => l.source?.kind === 'book');
    else if (filter === 'notebook') out = out.filter(l => l.source?.kind !== 'book');
    else if (filter.startsWith('tag:')) out = out.filter(l => l.tag === filter.slice(4));
    return [...out].sort((a, b) => {
      const ha = (a.id.charCodeAt(1) * 31 + seed * 7) % 97;
      const hb = (b.id.charCodeAt(1) * 31 + seed * 7) % 97;
      return ha - hb;
    });
  }, [lessons, filter, seed]);

  return (
    <div className="screen-in">
      <div className="pad-page" style={{ padding: '36px 40px 28px', borderBottom: '1px solid var(--border)' }}>
        <div className="micro" style={{ marginBottom: 10 }}>Feed · Danas</div>
        <h1 className="serif hero-title" style={{
          margin: 0, fontSize: 38, fontWeight: 500, letterSpacing: '-0.022em',
          lineHeight: 1.08, maxWidth: 780, textWrap: 'balance',
        }}>
          {TC.heroLine1}<br/>
          <span style={{ color: 'var(--fg-muted)' }}>{TC.heroLine2}</span>
        </h1>
        <div style={{ display: 'flex', gap: 24, marginTop: 22, color: 'var(--fg-muted)', fontSize: 13, flexWrap: 'wrap' }}>
          <div><span style={{ color: 'var(--fg)', fontWeight: 500 }}>{lessons.length}</span> {TC.lessonsCount}</div>
          <div><span style={{ color: 'var(--fg)', fontWeight: 500 }}>{books.length}</span> {TC.booksCount}</div>
        </div>
      </div>

      <div className="pad-page" style={{
        padding: '18px 40px', display: 'flex', alignItems: 'center', gap: 8,
        borderBottom: '1px solid var(--border)', flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {filters.map(f => (
            <FilterChip key={f.id} label={f.label} active={filter === f.id} onClick={() => setFilter(f.id)} />
          ))}
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
          <button onClick={() => setSeed(s => s + 1)} style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '6px 11px', fontSize: 11.5, color: 'var(--fg-muted)',
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/>
              <path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/>
            </svg>
            {TC.shuffle}
          </button>
          <PrimaryButton icon={<IconPlus size={13} stroke={2} />} onClick={() => setAdding(true)}>
            {TC.addLesson}
          </PrimaryButton>
        </div>
      </div>

      <div className="pad-page" style={{
        padding: '28px 40px 80px',
        columnCount: 'auto', columnWidth: 320, columnGap: 18,
      }}>
        {filtered.length === 0 && (
          <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--fg-muted)' }}>
            <div className="serif" style={{ fontSize: 18, marginBottom: 8 }}>{TC.emptyLessons}</div>
            <div style={{ fontSize: 13 }}>{TC.emptyLessonsBody}</div>
          </div>
        )}
        {filtered.map(l => (
          <div key={l.id} style={{ breakInside: 'avoid', marginBottom: 18 }}>
            <LessonCard
              lesson={l}
              onClick={() => l.source?.kind === 'book' && onOpenBook(l.source.id)}
              onDelete={() => lessonActions.remove(l.id)}
            />
          </div>
        ))}
      </div>
      {adding && (
        <AddLessonModal
          onClose={() => setAdding(false)}
          onSave={item => lessonActions.add(item)}
          books={books}
        />
      )}
    </div>
  );
}
