import { useState } from 'react';
import { login } from './store.jsx';
import { T } from './data.js';

export default function LoginScreen({ onLogin }) {
  const [pwd, setPwd]         = useState('');
  const [err, setErr]         = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    const result = await login(pwd);
    setLoading(false);
    if (result.error) return setErr(result.error);
    onLogin();
  };

  const inputStyle = {
    width: '100%', padding: '11px 14px',
    border: `1px solid ${err ? 'oklch(0.65 0.2 15)' : 'var(--border)'}`,
    borderRadius: 8, background: 'var(--bg-sunken)',
    color: 'var(--fg)', fontSize: 15, outline: 'none',
    fontFamily: 'var(--font-sans)', boxSizing: 'border-box',
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg)', padding: 20,
    }}>
      <div style={{
        width: '100%', maxWidth: 400,
        background: 'var(--bg-raised)', border: '1px solid var(--border-strong)',
        borderRadius: 16, padding: '44px 36px',
        boxShadow: '0 40px 100px -30px oklch(0 0 0 / 0.5)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 36 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 9,
            background: 'var(--fg)', color: 'var(--bg)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 600, letterSpacing: '-0.03em',
          }}>LZ</div>
          <div>
            <div className="serif" style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.01em' }}>{T.appName}</div>
            <div className="micro" style={{ fontSize: 9.5 }}>{T.appSubtitle}</div>
          </div>
        </div>

        <h2 className="serif" style={{ margin: '0 0 8px', fontSize: 26, fontWeight: 500, letterSpacing: '-0.018em' }}>
          Dobrodošao nazad
        </h2>
        <p style={{ margin: '0 0 28px', fontSize: 13.5, color: 'var(--fg-muted)', lineHeight: 1.55 }}>
          Unesi lozinku da pristupiš svojoj bazi znanja.
        </p>

        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <input
            type="password" value={pwd} autoFocus
            onChange={e => { setPwd(e.target.value); setErr(''); }}
            placeholder="Lozinka" style={inputStyle}
          />
          {err && (
            <div style={{ fontSize: 12.5, color: 'oklch(0.65 0.2 15)', padding: '6px 2px' }}>{err}</div>
          )}
          <button type="submit" disabled={loading} style={{
            marginTop: 6, padding: '11px 20px', fontSize: 14, fontWeight: 500,
            background: 'var(--fg)', color: 'var(--bg)', borderRadius: 8,
            cursor: loading ? 'wait' : 'pointer',
            opacity: loading ? 0.65 : 1, transition: 'opacity 140ms',
          }}
          onMouseEnter={e => !loading && (e.currentTarget.style.opacity = '0.88')}
          onMouseLeave={e => !loading && (e.currentTarget.style.opacity = '1')}>
            {loading ? 'Prijavljivanje…' : 'Prijavi se →'}
          </button>
        </form>
      </div>
    </div>
  );
}
