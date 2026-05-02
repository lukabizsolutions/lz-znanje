import { useState, useEffect } from 'react';
import { TAGS, T } from '../data.js';
import { TagPill, GhostButton, PrimaryButton, BookCover, SectionHeader } from '../ui.jsx';
import { IconBookmark, IconPlus } from '../icons.jsx';
import { useStore } from '../store.jsx';

function LessonDetailCard({ lesson, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(lesson.title);
  const [body, setBody] = useState(lesson.body);
  const [confirmDel, setConfirmDel] = useState(false);
  const [hovered, setHovered] = useState(false);

  const save = () => {
    if (title.trim()) onUpdate(lesson.id, { title: title.trim(), body: body.trim() });
    setEditing(false);
  };

  if (editing) return (
    <div style={{ padding: 22, border: '1px solid var(--border-strong)', borderRadius: 10, background: 'var(--bg-raised)', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <input value={title} onChange={e => setTitle(e.target.value)}
        className="serif" style={{ border: 0, outline: 'none', background: 'transparent', color: 'var(--fg)', fontSize: 21, fontWeight: 500, letterSpacing: '-0.015em', fontFamily: 'var(--font-serif)', width: '100%' }} />
      <textarea value={body} onChange={e => setBody(e.target.value)}
        style={{ border: 0, outline: 'none', background: 'transparent', color: 'var(--fg-muted)', fontSize: 14, lineHeight: 1.6, resize: 'vertical', minHeight: 80, fontFamily: 'var(--font-sans)', width: '100%' }} />
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <button onClick={() => setEditing(false)} style={{ padding: '6px 12px', fontSize: 12, color: 'var(--fg-muted)', borderRadius: 6, border: '1px solid var(--border)' }}>{T.common.cancel}</button>
        <PrimaryButton onClick={save}>{T.common.save}</PrimaryButton>
      </div>
    </div>
  );

  return (
    <div className="lift" style={{
      padding: 22, border: '1px solid var(--border)',
      borderRadius: 10, background: 'var(--bg-raised)',
      position: 'relative',
      borderColor: hovered ? 'var(--border-strong)' : 'var(--border)',
    }}
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => { setHovered(false); setConfirmDel(false); }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <TagPill tag={lesson.tag} />
        {hovered && (
          <div style={{ display: 'flex', gap: 6 }}>
            <button onClick={() => setEditing(true)} style={{ fontSize: 11.5, color: 'var(--fg-muted)', padding: '2px 8px', borderRadius: 4, border: '1px solid var(--border)' }}>Uredi</button>
            <button onClick={() => confirmDel ? onDelete(lesson.id) : setConfirmDel(true)} style={{
              fontSize: 11.5, padding: '2px 8px', borderRadius: 4,
              color: confirmDel ? 'oklch(0.65 0.2 15)' : 'var(--fg-muted)',
              border: confirmDel ? '1px solid oklch(0.65 0.2 15 / 0.4)' : '1px solid var(--border)',
            }}>
              {confirmDel ? T.common.confirmDelete : T.common.delete}
            </button>
          </div>
        )}
      </div>
      <h4 className="serif" style={{
        margin: '0 0 10px', fontSize: 21, fontWeight: 500,
        letterSpacing: '-0.015em', lineHeight: 1.2, textWrap: 'balance',
      }}>{lesson.title}</h4>
      <p style={{ margin: 0, fontSize: 14, color: 'var(--fg-muted)', lineHeight: 1.6 }}>{lesson.body}</p>
    </div>
  );
}

function EmptyState({ title, body, onAdd }) {
  return (
    <div style={{
      padding: '36px 24px', borderRadius: 10,
      border: '1px dashed var(--border-strong)',
      background: 'var(--bg-sunken)',
      display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10,
    }}>
      <div className="stripe" style={{ width: 36, height: 36, borderRadius: 7, opacity: 0.6 }} />
      <div className="serif" style={{ fontSize: 17, fontWeight: 500 }}>{title}</div>
      <div style={{ fontSize: 13, color: 'var(--fg-muted)', maxWidth: 420 }}>{body}</div>
      {onAdd && <button onClick={onAdd} style={{ marginTop: 6, fontSize: 12.5, fontWeight: 500, color: 'var(--accent-fg)' }}>{T.common.addFirstLesson} →</button>}
    </div>
  );
}

function AddLessonModal({ book, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tag, setTag] = useState(book.tag || 'navike');

  const inp = {
    width: '100%', padding: '9px 12px',
    border: '1px solid var(--border)', borderRadius: 7,
    background: 'var(--bg-sunken)', color: 'var(--fg)',
    fontSize: 14, outline: 'none', fontFamily: 'var(--font-sans)', boxSizing: 'border-box',
  };

  const submit = () => {
    if (!title.trim()) return;
    onSave({
      title: title.trim(), body: body.trim(), tag,
      source: { kind: 'book', id: book.id, label: book.title },
    });
    onClose();
  };

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'oklch(0 0 0 / 0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', maxWidth: 520, background: 'var(--bg-raised)', border: '1px solid var(--border-strong)',
        borderRadius: 14, padding: '28px 28px 24px', boxShadow: '0 40px 100px -30px oklch(0 0 0 / 0.5)',
        display: 'flex', flexDirection: 'column', gap: 12,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
          <div className="serif" style={{ fontSize: 22, fontWeight: 500 }}>{T.common.addLesson}</div>
          <button onClick={onClose} style={{ color: 'var(--fg-subtle)', fontSize: 22, lineHeight: 1 }}>×</button>
        </div>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder={T.common.title} style={inp} autoFocus />
        <textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Šta si naučio?" style={{ ...inp, minHeight: 120, resize: 'vertical', lineHeight: 1.6 }} />
        <select value={tag} onChange={e => setTag(e.target.value)} style={inp}>
          {Object.entries(TAGS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 4 }}>
          <button onClick={onClose} style={{ padding: '8px 14px', fontSize: 13, color: 'var(--fg-muted)', borderRadius: 7, border: '1px solid var(--border)' }}>{T.common.cancel}</button>
          <PrimaryButton onClick={submit}>{T.common.save}</PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default function BookDetailScreen({ bookId, onBack }) {
  const { books, lessons, lessonActions, bookActions } = useStore();
  const TC = T.common;
  const book = books.find(b => b.id === bookId);
  const bookLessons = lessons.filter(l => l.source?.id === bookId);
  const [notes, setNotes] = useState('');
  const [notesDirty, setNotesDirty] = useState(false);
  const [addingLesson, setAddingLesson] = useState(false);

  useEffect(() => {
    if (book) setNotes(book.notes || '');
  }, [bookId]);

  if (!book) return <div style={{ padding: 60 }}>Knjiga nije pronađena.</div>;

  const saveNotes = () => {
    bookActions.update(book.id, { notes });
    setNotesDirty(false);
  };

  return (
    <div className="screen-in">
      <div className="pad-page" style={{ padding: '20px 40px 0' }}>
        <button onClick={onBack} style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          color: 'var(--fg-muted)', fontSize: 12.5,
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 6-6 6 6 6"/>
          </svg>
          {TC.library}
        </button>
      </div>

      <section className="pad-page" style={{ padding: '32px 40px 48px', borderBottom: '1px solid var(--border)' }}>
        <div className="hero-grid" style={{
          display: 'grid', gridTemplateColumns: '240px 1fr', gap: 48, alignItems: 'end',
        }}>
          <BookCover book={book} w={240} h={340} />
          <div style={{ paddingBottom: 14 }}>
            <div className="micro" style={{ marginBottom: 12 }}>
              {book.finished ? `${TC.read} · ${book.year}` : TC.reading}
            </div>
            <h1 className="serif" style={{
              margin: '0 0 8px', fontSize: 52, fontWeight: 500,
              letterSpacing: '-0.028em', lineHeight: 1, textWrap: 'balance',
            }}>{book.title}</h1>
            <div style={{ fontSize: 16, color: 'var(--fg-muted)', marginBottom: 22 }}>
              autor · <span style={{ color: 'var(--fg)' }}>{book.author}</span>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 24, flexWrap: 'wrap' }}>
              {book.pages > 0 && <GhostButton>{book.pages} {TC.pages}</GhostButton>}
              <GhostButton>{book.finished ? TC.finished : `${book.progress || 0}% pročitano`}</GhostButton>
            </div>
          </div>
        </div>
      </section>

      <div className="pad-page" style={{ padding: '48px 40px 80px', maxWidth: 980 }}>
        <section style={{ marginBottom: 56 }}>
          <SectionHeader
            eyebrow="01"
            title={TC.myLessons}
            subtitle={`${bookLessons.length} zabeleženih uvida`}
            action={<GhostButton icon={<IconPlus size={12} stroke={2} />} small onClick={() => setAddingLesson(true)}>{TC.addLesson}</GhostButton>}
          />
          {bookLessons.length > 0 ? (
            <div style={{ display: 'grid', gap: 16 }}>
              {bookLessons.map(l => (
                <LessonDetailCard
                  key={l.id}
                  lesson={l}
                  onDelete={id => lessonActions.remove(id)}
                  onUpdate={(id, changes) => lessonActions.update(id, changes)}
                />
              ))}
            </div>
          ) : (
            <EmptyState title={TC.noLessons} body={TC.noLessonsBody} onAdd={() => setAddingLesson(true)} />
          )}
        </section>

        <section>
          <SectionHeader
            eyebrow="02"
            title={TC.myNotes}
            subtitle="Slobodno razmišljanje, reakcije, pitanja"
            action={notesDirty && <PrimaryButton onClick={saveNotes}>{TC.save}</PrimaryButton>}
          />
          <div style={{
            padding: 24, border: '1px solid var(--border)',
            borderRadius: 10, background: 'var(--bg-raised)', minHeight: 160,
          }}>
            <textarea
              value={notes}
              onChange={e => { setNotes(e.target.value); setNotesDirty(true); }}
              placeholder={TC.notesPlaceholder}
              style={{
                width: '100%', minHeight: 140, border: 0, outline: 'none',
                background: 'transparent', color: 'var(--fg)',
                fontSize: 15.5, lineHeight: 1.7, resize: 'none',
                fontFamily: 'var(--font-serif)', boxSizing: 'border-box',
              }}
            />
          </div>
        </section>
      </div>

      {addingLesson && (
        <AddLessonModal
          book={book}
          onClose={() => setAddingLesson(false)}
          onSave={item => lessonActions.add(item)}
        />
      )}
    </div>
  );
}
