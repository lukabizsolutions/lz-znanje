import { useState } from 'react';
import { NOTEBOOK_ENTRIES, T } from '../data.js';
import { TagPill, GhostButton, PrimaryButton, EditWithAIButton } from '../ui.jsx';
import { IconPlus } from '../icons.jsx';

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

function EntryModal({ entry, onClose }) {
  if (!entry) return null;
  const [title, setTitle] = useState(entry.title);
  const [body, setBody] = useState(entry.body);
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
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <TagPill tag={entry.tag} />
            <div className="micro">{entry.date}</div>
          </div>
          <button onClick={onClose} style={{ color: 'var(--fg-subtle)', fontSize: 22, lineHeight: 1 }}>×</button>
        </div>
        <input value={title} onChange={e => setTitle(e.target.value)}
          className="serif" style={{
            width: '100%', border: 0, outline: 'none',
            background: 'transparent', color: 'var(--fg)',
            fontSize: 28, fontWeight: 500, letterSpacing: '-0.018em',
            marginBottom: 18, fontFamily: 'var(--font-serif)',
          }} />
        <textarea value={body} onChange={e => setBody(e.target.value)}
          style={{
            width: '100%', minHeight: 260, border: 0, outline: 'none',
            background: 'transparent', color: 'var(--fg)',
            fontSize: 16, lineHeight: 1.65, resize: 'vertical',
            fontFamily: 'var(--font-serif)',
          }} />
        <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
          <EditWithAIButton />
          <GhostButton onClick={onClose} small>{T.common.close}</GhostButton>
          <PrimaryButton onClick={onClose}>{T.common.save}</PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default function NotebookScreen() {
  const [open, setOpen] = useState(null);
  const TC = T.common;
  return (
    <div className="screen-in">
      <div className="pad-page" style={{ padding: '36px 40px 28px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20, flexWrap: 'wrap' }}>
          <div>
            <div className="micro" style={{ marginBottom: 10 }}>{T.nav.notebook} · {NOTEBOOK_ENTRIES.length}</div>
            <h1 className="serif hero-title" style={{
              margin: 0, fontSize: 38, fontWeight: 500, letterSpacing: '-0.022em',
            }}>{TC.notebookTitle}</h1>
            <div style={{ fontSize: 13.5, color: 'var(--fg-muted)', marginTop: 10, maxWidth: 560 }}>
              {TC.notebookSubtitle}
            </div>
          </div>
          <PrimaryButton icon={<IconPlus size={13} stroke={2} />}>Nova beleška</PrimaryButton>
        </div>
      </div>
      <div className="pad-page" style={{ padding: '28px 40px 80px', columnCount: 'auto', columnWidth: 320, columnGap: 18 }}>
        {NOTEBOOK_ENTRIES.map(e => (
          <div key={e.id} style={{ breakInside: 'avoid', marginBottom: 18 }}>
            <NotebookEntryCard entry={e} onOpen={() => setOpen(e)} />
          </div>
        ))}
      </div>
      <EntryModal entry={open} onClose={() => setOpen(null)} />
    </div>
  );
}
