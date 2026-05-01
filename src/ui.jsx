import { useContext } from 'react';
import { TAGS } from './data.js';
import { IconSpark } from './icons.jsx';
import { TweaksContext } from './context.jsx';

export function TagPill({ tag, size = 'sm' }) {
  const t = TAGS[tag] || { label: tag, hue: 250 };
  const pad = size === 'xs' ? '2px 7px' : '3px 9px';
  const fs  = size === 'xs' ? 10.5 : 11;
  return (
    <span className="pill" style={{
      padding: pad, fontSize: fs,
      '--pill-border': `oklch(0.65 0.12 ${t.hue} / 0.32)`,
      '--pill-fg':     `oklch(0.78 0.1 ${t.hue})`,
      '--pill-bg':     `oklch(0.65 0.12 ${t.hue} / 0.08)`,
    }}>{t.label}</span>
  );
}

export function AIBadge({ small }) {
  return (
    <span className="mono" style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      fontSize: small ? 9.5 : 10.5, letterSpacing: '0.12em',
      padding: small ? '2px 6px' : '3px 8px',
      border: '1px solid var(--accent)',
      color: 'var(--accent-fg)',
      background: 'var(--accent-soft)',
      borderRadius: 4, fontWeight: 500,
    }}>
      <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor"><circle cx="4" cy="4" r="1.5"/></svg>
      AI
    </span>
  );
}

export function GhostButton({ children, icon, onClick, small }) {
  return (
    <button onClick={onClick} className="lift" style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: small ? '5px 10px' : '7px 12px',
      fontSize: small ? 11.5 : 12.5, fontWeight: 500,
      color: 'var(--fg-muted)',
      border: '1px solid var(--border)',
      borderRadius: 7,
      background: 'transparent',
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.color = 'var(--fg)'; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--fg-muted)'; }}>
      {icon}
      {children}
    </button>
  );
}

export function PrimaryButton({ children, icon, onClick }) {
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '8px 14px', fontSize: 13, fontWeight: 500,
      color: 'var(--bg)', background: 'var(--fg)',
      borderRadius: 7, transition: 'transform 140ms, opacity 140ms',
    }}
    onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; }}
    onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}>
      {icon}
      {children}
    </button>
  );
}

export function EditWithAIButton({ onClick }) {
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '5px 10px', fontSize: 11.5, fontWeight: 500,
      color: 'var(--accent-fg)',
      border: '1px solid oklch(0.68 0.18 var(--accent-h) / 0.35)',
      borderRadius: 6, background: 'var(--accent-soft)',
      transition: 'background 140ms, border-color 140ms',
    }}
    onMouseEnter={e => e.currentTarget.style.background = 'oklch(0.68 0.18 var(--accent-h) / 0.22)'}
    onMouseLeave={e => e.currentTarget.style.background = 'var(--accent-soft)'}>
      <IconSpark size={11} stroke={2} />
      Uredi sa AI
    </button>
  );
}

export function BookCover({ book, w = 180, h = 260, style }) {
  const { coverStyle } = useContext(TweaksContext);
  const [c1, c2] = book.palette;
  const numW = typeof w === 'number' ? w : 180;
  const numH = typeof h === 'number' ? h : 260;
  const titleFS = Math.max(12, Math.min(20, Math.floor(numH / 14)));
  const authorFS = Math.max(8, Math.min(11, Math.floor(numH / 28)));

  const base = {
    width: w, height: h, borderRadius: 4,
    position: 'relative', overflow: 'hidden',
    color: c2, flexShrink: 0,
    boxShadow: '0 0 0 1px var(--border), 0 1px 0 oklch(1 0 0 / 0.04) inset',
    ...style,
  };

  let bg;
  if (coverStyle === 'flat') {
    bg = c1;
  } else if (coverStyle === 'photo') {
    bg = `linear-gradient(155deg, ${c1} 0%, ${c1} 45%, oklch(from ${c1} calc(l * 0.6) c h) 100%)`;
  } else {
    bg = `linear-gradient(165deg, ${c1} 0%, oklch(from ${c1} calc(l * 0.78) c h) 100%)`;
  }

  return (
    <div className="lift" style={{ ...base, background: bg }}>
      <div style={{
        position: 'absolute', left: 10, top: 0, bottom: 0, width: 1,
        background: c2, opacity: 0.15,
      }} />
      {coverStyle === 'photo' && (
        <div className="stripe" style={{ position: 'absolute', inset: 0, opacity: 0.18 }} />
      )}
      <div style={{
        position: 'absolute', inset: 0, padding: `${numH * 0.08}px ${numH * 0.06}px`,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        <div className="mono" style={{
          fontSize: authorFS, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.7,
        }}>{book.author.split(' ').slice(-1)[0]}</div>
        <div className="serif" style={{
          fontSize: titleFS, fontWeight: 600, lineHeight: 1.05,
          letterSpacing: '-0.015em', textWrap: 'balance',
        }}>{book.title}</div>
      </div>
    </div>
  );
}

export function SectionHeader({ eyebrow, title, subtitle, action }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, marginBottom: 20 }}>
      <div>
        {eyebrow && <div className="micro" style={{ marginBottom: 8 }}>{eyebrow}</div>}
        <h2 className="serif" style={{
          margin: 0, fontSize: 26, fontWeight: 500, letterSpacing: '-0.015em',
        }}>{title}</h2>
        {subtitle && <div style={{ color: 'var(--fg-muted)', fontSize: 13, marginTop: 6 }}>{subtitle}</div>}
      </div>
      {action}
    </div>
  );
}

export function ProgressBar({ value, max, height = 6 }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div style={{
      height, width: '100%', background: 'var(--bg-sunken)',
      borderRadius: 99, overflow: 'hidden', border: '1px solid var(--border)',
    }}>
      <div style={{
        height: '100%', width: `${pct}%`,
        background: 'var(--accent)', borderRadius: 99,
        transition: 'width 600ms cubic-bezier(.22,.61,.36,1)',
      }} />
    </div>
  );
}
