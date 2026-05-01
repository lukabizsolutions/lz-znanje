import { IconCheck } from './icons.jsx';

export const FONT_PAIRS = {
  'fraunces-inter':   { serif: '"Fraunces", Georgia, serif',         sans: '"Inter", sans-serif', label: 'Fraunces / Inter' },
  'instrument-inter': { serif: '"Instrument Serif", Georgia, serif', sans: '"Inter", sans-serif', label: 'Instrument / Inter' },
  'source-inter':     { serif: '"Source Serif 4", Georgia, serif',   sans: '"Inter", sans-serif', label: 'Source / Inter' },
  'all-inter':        { serif: '"Inter", sans-serif',                sans: '"Inter", sans-serif', label: 'Inter only' },
};

const ACCENT_HUES = [
  { h: 250, name: 'Electric blue' },
  { h: 30,  name: 'Amber' },
  { h: 150, name: 'Moss' },
  { h: 350, name: 'Rose' },
  { h: 280, name: 'Violet' },
];

const DENSITY_OPTS = [
  { id: 'compact',     label: 'Compact' },
  { id: 'comfortable', label: 'Comfortable' },
  { id: 'roomy',       label: 'Roomy' },
];

const COVER_OPTS = [
  { id: 'gradient', label: 'Gradient' },
  { id: 'flat',     label: 'Flat' },
  { id: 'photo',    label: 'Striped' },
];

function Field({ label, children }) {
  return (
    <div>
      <div className="micro" style={{ marginBottom: 8 }}>{label}</div>
      {children}
    </div>
  );
}

function SegButtons({ value, options, onChange }) {
  return (
    <div style={{
      display: 'flex', padding: 3, border: '1px solid var(--border)',
      borderRadius: 8, background: 'var(--bg-sunken)',
    }}>
      {options.map(o => (
        <button key={o.id} onClick={() => onChange(o.id)} style={{
          flex: 1, padding: '6px 8px', fontSize: 11.5, borderRadius: 5,
          color: value === o.id ? 'var(--fg)' : 'var(--fg-muted)',
          background: value === o.id ? 'var(--bg-raised)' : 'transparent',
          border: value === o.id ? '1px solid var(--border)' : '1px solid transparent',
        }}>{o.label}</button>
      ))}
    </div>
  );
}

export function TweaksPanel({ open, onClose, tweaks, setTweaks }) {
  if (!open) return null;

  const update = (patch) => {
    const next = { ...tweaks, ...patch };
    setTweaks(next);
    try { window.parent.postMessage({ type: '__edit_mode_set_keys', edits: patch }, '*'); } catch {}
  };

  return (
    <div style={{
      position: 'fixed', right: 20, bottom: 20, width: 300, zIndex: 50,
      border: '1px solid var(--border-strong)',
      background: 'var(--bg-raised)',
      borderRadius: 12,
      boxShadow: '0 20px 60px -20px oklch(0 0 0 / 0.4)',
      overflow: 'hidden',
    }}>
      <div style={{
        padding: '14px 16px', borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div className="serif" style={{ fontSize: 16, fontWeight: 500 }}>Tweaks</div>
        <button onClick={onClose} style={{ color: 'var(--fg-subtle)', fontSize: 18, lineHeight: 1 }}>×</button>
      </div>

      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 18, maxHeight: '70vh', overflowY: 'auto' }}>
        <Field label="Accent">
          <div style={{ display: 'flex', gap: 6 }}>
            {ACCENT_HUES.map(a => (
              <button key={a.h} title={a.name} onClick={() => update({ accentHue: a.h })} style={{
                width: 28, height: 28, borderRadius: 7,
                background: `oklch(0.68 0.18 ${a.h})`,
                border: `2px solid ${tweaks.accentHue === a.h ? 'var(--fg)' : 'transparent'}`,
                boxShadow: tweaks.accentHue === a.h ? '0 0 0 1px var(--bg-raised) inset' : 'none',
              }} />
            ))}
          </div>
        </Field>

        <Field label="Typography">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {Object.entries(FONT_PAIRS).map(([id, p]) => (
              <button key={id} onClick={() => update({ fontPair: id })} style={{
                textAlign: 'left', padding: '8px 10px', borderRadius: 6,
                border: '1px solid',
                borderColor: tweaks.fontPair === id ? 'var(--border-strong)' : 'var(--border)',
                background: tweaks.fontPair === id ? 'var(--hover-bg)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <span style={{ fontFamily: p.serif, fontSize: 15 }}>{p.label}</span>
                {tweaks.fontPair === id && <IconCheck size={12} />}
              </button>
            ))}
          </div>
        </Field>

        <Field label="Density">
          <SegButtons value={tweaks.density} options={DENSITY_OPTS} onChange={v => update({ density: v })} />
        </Field>

        <Field label="Cover art">
          <SegButtons value={tweaks.coverStyle} options={COVER_OPTS} onChange={v => update({ coverStyle: v })} />
        </Field>

        <Field label={`Sidebar · ${tweaks.sidebarWidth}px`}>
          <input type="range" min="180" max="280" step="4"
            value={tweaks.sidebarWidth}
            onChange={e => update({ sidebarWidth: parseInt(e.target.value) })}
            style={{ width: '100%', accentColor: 'var(--accent)' }} />
        </Field>
      </div>
    </div>
  );
}
