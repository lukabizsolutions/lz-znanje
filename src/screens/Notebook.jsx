import { useState } from 'react';
import { TAGS, T } from '../data.js';
import { TagPill, GhostButton, PrimaryButton } from '../ui.jsx';
import { IconPlus } from '../icons.jsx';
import { useStore } from '../store.jsx';

function NotebookEntryCard({ entry, onOpen }) {
  return (
    <article className="lift" onClick={onOpen} style={{
      padding: 20, border: '1px solid var(--border)',
      borderRadius: 10, background: 'var(--bg-raised)',
      cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 12,
    }}
    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-strong)'}
    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <TagPill tag={entry.tag} />
        <div className="micro">{entry.date}</div>
      </div>
      <h3 className="serif" style={{
        margin: 0, fontSize: 18, fontWeight: 500, lineHeight: 1.25,
        letterSpacing: '-0.012em', textWrap: 'balance',
      }}>{entry.title}</h3>
      <p style={{
        margin: 0, fontSize: 13, color: 'var(--fg-muted)', lineHeight: 1.6,
        display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
      }}>{entry.body}</p>
    </article>
  );
}

function EntryModal({ entry, onClose, onSave, onDelete }) {
  if (!entry) return null;
  const isNew = entry.id === '__new__';
  const [title, setTitle] = useState(entry.title);
  const [body, setBody] = useState(entry.body);
  const [tag, setTag] = useState(entry.tag);
  const [confirmDel, setConfirmDel] = useState(false);

  const inp = {
    width: '100%', padding: '9px 12px',
    border: '1px solid var(--border)', borderRadius: 7,
    background: 'var(--bg-sunken)', color: 'var(--fg)',
    fontSize: 14, outline: 'none', fontFamily: 'var(--font-sans)', boxSizing: 'border-box',
  };

  const submit = () => {
    if (!title.trim()) return;
    onSave({ ...entry, title: title.trim(), body: body.trim(), tag });
    onClose();
  };

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'oklch(0 0 0 / 0.55)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20, animation: 'screenIn 220ms ease-out both',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', maxWidth: 680, maxHeight: '85vh', overflow: 'auto',
        background: 'var(--bg-raised)', border: '1px solid var(--border-strong)',
        borderRadius: 14, padding: '28px 30px',
        boxShadow: '0 40px 100px -30px oklch(0 0 0 / 0.5)',
        display: 'flex', flexDirection: 'column', gap: 14,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="micro">{entry.date}</div>
          <button onClick={onClose} style={{ color: 'var(--fg-subtle)', fontSize: 22, lineHeight: 1 }}>×</button>
        </div>
        <input value={title} onChange={e => setTitle(e.target.value)}
          className="serif" placeholder="Naslov…" autoFocus
          style={{ border: 0, outline: 'none', background: 'transparent', color: 'var(--fg)', fontSize: 28, fontWeight: 500, letterSpacing: '-0.018em', fontFamily: 'var(--font-serif)', width: '100%' }} />
        <select value={tag} onChange={e => setTag(e.target.value)} style={inp}>
          {Object.entries(TAGS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
        <textarea value={body} onChange={e => setBody(e.target.value)}
          placeholder={T.common.notesPlaceholder}
          style={{ width: '100%', minHeight: 260, border: 0, outline: 'none', background: 'transparent', color: 'var(--fg)', fontSize: 16, lineHeight: 1.65, resize: 'vertical', fontFamily: 'var(--font-serif)' }} />
        <div style={{ display: 'flex', gap: 10, marginTop: 4, justifyContent: 'space-between', alignItems: 'center' }}>
          {!isNew && (
            <button onClick={() => confirmDel ? (onDelete(entry.id), onClose()) : setConfirmDel(true)} style={{
              fontSize: 12, padding: '6px 10px', borderRadius: 6,
              color: confirmDel ? 'oklch(0.65 0.2 15)' : 'var(--fg-subtle)',
              border: confirmDel ? '1px solid oklch(0.65 0.2 15 / 0.4)' : '1px solid transparent',
            }}>
              {confirmDel ? T.common.confirmDelete : T.common.delete}
            </button>
          )}
          <div style={{ display: 'flex', gap: 10, marginLeft: 'auto' }}>
            <GhostButton onClick={onClose} small>{T.common.close}</GhostButton>
            <PrimaryButton onClick={submit}>{T.common.save}</PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NotebookScreen() {
  const { notebook, noteActions } = useStore();
  const [open, setOpen] = useState(null);
  const TC = T.common;

  const handleSave = (entry) => {
    if (entry.id === '__new__') {
      noteActions.add({ title: entry.title, body: entry.body, tag: entry.tag });
    } else {
      noteActions.update(entry.id, { title: entry.title, body: entry.body, tag: entry.tag });
    }
  };

  const newEntry = { id: '__new__', title: '', body: '', tag: 'zivot', date: 'Danas' };

  return (
    <div className="screen-in">
      <div className="pad-page" style={{ padding: '36px 40px 28px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20, flexWrap: 'wrap' }}>
          <div>
            <div className="micro" style={{ marginBottom: 10 }}>{T.nav.notebook} · {notebook.length}</div>
            <h1 className="serif hero-title" style={{
              margin: 0, fontSize: 38, fontWeight: 500, letterSpacing: '-0.022em',
            }}>{TC.notebookTitle}</h1>
            <div style={{ fontSize: 13.5, color: 'var(--fg-muted)', marginTop: 10, maxWidth: 560 }}>
              {TC.notebookSubtitle}
            </div>
          </div>
          <PrimaryButton icon={<IconPlus size={13} stroke={2} />} onClick={() => setOpen(newEntry)}>Nova beleška</PrimaryButton>
        </div>
      </div>
      <div className="pad-page" style={{ padding: '28px 40px 80px', columnCount: 'auto', columnWidth: 320, columnGap: 18 }}>
        {notebook.length === 0 && (
          <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--fg-muted)' }}>
            <div className="serif" style={{ fontSize: 18, marginBottom: 8 }}>{TC.emptyNotebook}</div>
            <div style={{ fontSize: 13 }}>{TC.emptyNotebookBody}</div>
          </div>
        )}
        {notebook.map(e => (
          <div key={e.id} style={{ breakInside: 'avoid', marginBottom: 18 }}>
            <NotebookEntryCard entry={e} onOpen={() => setOpen(e)} />
          </div>
        ))}
      </div>
      <EntryModal
        entry={open}
        onClose={() => setOpen(null)}
        onSave={handleSave}
        onDelete={id => noteActions.remove(id)}
      />
    </div>
  );
}
