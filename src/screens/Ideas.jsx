import { useState } from 'react';
import { IDEAS, TAGS, T } from '../data.js';
import { GhostButton, PrimaryButton, EditWithAIButton } from '../ui.jsx';
import { IconPlus } from '../icons.jsx';

function IdeaCard({ idea, onOpen }) {
  const [c1, c2] = idea.cover;
  return (
    <button onClick={onOpen} style={{ display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'left', width: '100%' }}>
      <div className="lift" style={{
        width: '100%', aspectRatio: '3 / 4', position: 'relative',
        borderRadius: 8, overflow: 'hidden',
        background: `linear-gradient(155deg, ${c1} 0%, oklch(from ${c1} calc(l * 0.72) c h) 100%)`,
        boxShadow: '0 0 0 1px var(--border)',
        color: c2,
      }}>
        <div style={{
          position: 'absolute', top: 12, left: 12,
          padding: '3px 8px', background: 'oklch(0 0 0 / 0.35)',
          backdropFilter: 'blur(6px)',
          fontFamily: 'var(--font-mono)', fontSize: 9.5,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          borderRadius: 99, color: c2,
        }}>{TAGS[idea.tag]?.label || idea.tag}</div>
        <div className="serif" style={{
          position: 'absolute', top: -18, right: 8,
          fontSize: 160, lineHeight: 1, opacity: 0.12, fontWeight: 700,
        }}>"</div>
        <div style={{ position: 'absolute', left: 16, right: 16, bottom: 16 }}>
          <div className="serif" style={{
            fontSize: 18, fontWeight: 500, lineHeight: 1.15,
            letterSpacing: '-0.012em', textWrap: 'balance', marginBottom: 8,
          }}>{idea.title}</div>
          <div className="mono" style={{
            fontSize: 9.5, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.8,
          }}>{idea.date}</div>
        </div>
      </div>
    </button>
  );
}

function IdeaModal({ idea, onClose }) {
  if (!idea) return null;
  const [title, setTitle] = useState(idea.title);
  const [body, setBody] = useState(idea.body);
  const [c1, c2] = idea.cover;
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'oklch(0 0 0 / 0.6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20, animation: 'screenIn 220ms ease-out both',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', maxWidth: 720, maxHeight: '88vh', overflow: 'auto',
        background: 'var(--bg-raised)', border: '1px solid var(--border-strong)',
        borderRadius: 16,
        boxShadow: '0 40px 100px -30px oklch(0 0 0 / 0.5)',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{
          padding: '34px 34px 28px',
          background: `linear-gradient(155deg, ${c1} 0%, oklch(from ${c1} calc(l * 0.75) c h) 100%)`,
          color: c2, position: 'relative', overflow: 'hidden',
          borderRadius: '16px 16px 0 0',
        }}>
          <button onClick={onClose} style={{
            position: 'absolute', top: 14, right: 14,
            width: 28, height: 28, borderRadius: 999,
            background: 'oklch(0 0 0 / 0.3)', color: c2,
            fontSize: 16, lineHeight: 1,
          }}>×</button>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14, opacity: 0.85 }}>
            <span className="mono" style={{
              fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase',
              padding: '3px 8px', background: 'oklch(0 0 0 / 0.28)', borderRadius: 99,
            }}>{TAGS[idea.tag]?.label || idea.tag}</span>
            <span className="mono" style={{ fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{idea.date}</span>
          </div>
          <input value={title} onChange={e => setTitle(e.target.value)}
            className="serif" style={{
              width: '100%', border: 0, outline: 'none',
              background: 'transparent', color: c2,
              fontSize: 32, fontWeight: 600, letterSpacing: '-0.022em',
              lineHeight: 1.1, fontFamily: 'var(--font-serif)',
            }} />
        </div>

        <div style={{ padding: '26px 34px 30px' }}>
          <div className="micro" style={{ marginBottom: 10 }}>{T.common.describeIdea}</div>
          <textarea value={body} onChange={e => setBody(e.target.value)}
            style={{
              width: '100%', minHeight: 200, border: 0, outline: 'none',
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
    </div>
  );
}

function NewIdeaTile({ onClick }) {
  return (
    <button onClick={onClick} className="lift" style={{
      width: '100%', aspectRatio: '3 / 4',
      border: '1px dashed var(--border-strong)',
      borderRadius: 8, background: 'var(--bg-sunken)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 10,
      color: 'var(--fg-muted)',
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--fg)'; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.color = 'var(--fg-muted)'; }}>
      <div style={{
        width: 44, height: 44, borderRadius: 999,
        border: '1px solid var(--border-strong)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <IconPlus size={18} stroke={1.6} />
      </div>
      <div className="serif" style={{ fontSize: 14, fontWeight: 500 }}>{T.common.addIdea}</div>
    </button>
  );
}

export default function IdeasScreen() {
  const [open, setOpen] = useState(null);
  const TC = T.common;
  const draftIdea = { id: 'new', title: 'Nova ideja', body: '', tag: 'zivot', cover: ['#3A506B','#F4F1DE'], date: 'Danas' };
  return (
    <div className="screen-in">
      <div className="pad-page" style={{ padding: '36px 40px 28px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20, flexWrap: 'wrap' }}>
          <div>
            <div className="micro" style={{ marginBottom: 10 }}>{T.nav.ideas} · {IDEAS.length}</div>
            <h1 className="serif hero-title" style={{
              margin: 0, fontSize: 38, fontWeight: 500, letterSpacing: '-0.022em',
            }}>{TC.ideasTitle}</h1>
            <div style={{ fontSize: 13.5, color: 'var(--fg-muted)', marginTop: 10, maxWidth: 560 }}>
              {TC.ideasSubtitle}
            </div>
          </div>
          <PrimaryButton icon={<IconPlus size={13} stroke={2} />} onClick={() => setOpen(draftIdea)}>
            {TC.addIdea}
          </PrimaryButton>
        </div>
      </div>
      <div className="pad-page" style={{ padding: '32px 40px 80px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '24px 18px',
        }}>
          <NewIdeaTile onClick={() => setOpen(draftIdea)} />
          {IDEAS.map(i => (
            <IdeaCard key={i.id} idea={i} onOpen={() => setOpen(i)} />
          ))}
        </div>
      </div>
      <IdeaModal idea={open} onClose={() => setOpen(null)} />
    </div>
  );
}
