import { useState, useEffect, useMemo, useRef } from 'react';
import { TweaksContext } from './context.jsx';
import { FONT_PAIRS, TweaksPanel } from './Tweaks.jsx';
import { T } from './data.js';
import { BookCover } from './ui.jsx';
import { StoreProvider, useStore, isLoggedIn, logoutUser } from './store.jsx';
import LoginScreen from './Login.jsx';
import {
  IconHome, IconLibrary, IconNotebook, IconProgress, IconMind,
  IconSearch, IconMoon, IconSun, IconSettings, IconBulb, IconPlay,
} from './icons.jsx';
import HomeScreen from './screens/Home.jsx';
import LibraryScreen from './screens/Library.jsx';
import BookDetailScreen from './screens/Book.jsx';
import NotebookScreen from './screens/Notebook.jsx';
import IdeasScreen from './screens/Ideas.jsx';
import VideosScreen from './screens/Videos.jsx';
import ProgressScreen from './screens/Progress.jsx';

const TWEAKS_DEFAULTS = {
  accentHue: 250, fontPair: 'all-inter',
  density: 'comfortable', coverStyle: 'gradient', sidebarWidth: 204,
};

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('lz-theme') || 'dark'; } catch { return 'dark'; }
  });
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('lz-theme', theme); } catch {}
  }, [theme]);
  return [theme, setTheme];
}

function useIsMobile() {
  const [m, setM] = useState(() => window.innerWidth <= 820);
  useEffect(() => {
    const onR = () => setM(window.innerWidth <= 820);
    window.addEventListener('resize', onR);
    return () => window.removeEventListener('resize', onR);
  }, []);
  return m;
}

function NavItem({ icon, label, active, disabled, badge, onClick }) {
  return (
    <button onClick={disabled ? undefined : onClick} disabled={disabled} style={{
      position: 'relative', display: 'flex', alignItems: 'center', gap: 11,
      padding: '8px 14px 8px 18px', width: '100%', textAlign: 'left',
      color: disabled ? 'var(--fg-subtle)' : (active ? 'var(--fg)' : 'var(--fg-muted)'),
      fontSize: 13.5, fontWeight: active ? 500 : 400,
      borderRadius: 7, cursor: disabled ? 'not-allowed' : 'pointer',
      background: active ? 'var(--hover-bg)' : 'transparent',
      transition: 'color 140ms, background 140ms', opacity: disabled ? 0.55 : 1,
    }}
    onMouseEnter={e => !disabled && !active && (e.currentTarget.style.color = 'var(--fg)')}
    onMouseLeave={e => !disabled && !active && (e.currentTarget.style.color = 'var(--fg-muted)')}>
      <span style={{
        position: 'absolute', left: 4, top: 10, bottom: 10, width: 2,
        background: active ? 'var(--accent)' : 'transparent', borderRadius: 2,
      }} />
      {icon}
      <span style={{ flex: 1 }}>{label}</span>
      {badge && (
        <span className="mono" style={{
          fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase',
          padding: '2px 6px', border: '1px solid var(--border)', borderRadius: 4, color: 'var(--fg-subtle)',
        }}>{badge}</span>
      )}
    </button>
  );
}

function Sidebar({ route, onNav, onLogout }) {
  const { books, lessons } = useStore();
  const items = [
    { id: 'home',     label: T.nav.home,     icon: <IconHome size={15} /> },
    { id: 'library',  label: T.nav.library,  icon: <IconLibrary size={15} /> },
    { id: 'notebook', label: T.nav.notebook, icon: <IconNotebook size={15} /> },
    { id: 'ideas',    label: T.nav.ideas,    icon: <IconBulb size={15} /> },
    { id: 'videos',   label: T.nav.videos,   icon: <IconPlay size={15} /> },
    { id: 'progress', label: T.nav.progress, icon: <IconProgress size={15} /> },
    { id: 'mindmaps', label: T.nav.mindmaps, icon: <IconMind size={15} />, disabled: true, badge: T.common.soon },
  ];
  const active = route.name === 'book' ? 'library' : route.name;

  return (
    <aside className="hide-on-mobile" style={{
      width: 'var(--sidebar-w)', height: '100vh', position: 'sticky', top: 0,
      borderRight: '1px solid var(--border)', background: 'var(--bg)',
      display: 'flex', flexDirection: 'column', padding: '18px 10px 14px', flexShrink: 0,
    }}>
      <div style={{ padding: '4px 14px 22px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 30, height: 30, borderRadius: 7, background: 'var(--fg)', color: 'var(--bg)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 600, letterSpacing: '-0.03em',
        }}>LZ</div>
        <div>
          <div className="serif" style={{ fontSize: 15.5, fontWeight: 600, letterSpacing: '-0.01em' }}>{T.appName}</div>
          <div className="micro" style={{ fontSize: 9.5, marginTop: -1 }}>{T.appSubtitle}</div>
        </div>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {items.map(it => (
          <NavItem key={it.id} {...it} active={active === it.id} onClick={() => onNav({ name: it.id })} />
        ))}
      </nav>

      <div style={{ marginTop: 'auto', paddingTop: 14, borderTop: '1px solid var(--border)' }}>
        <div style={{ padding: '4px 10px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 999,
            background: 'linear-gradient(135deg, oklch(0.7 0.14 250), oklch(0.6 0.15 320))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: 11.5, fontWeight: 600,
          }}>LZ</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12.5, fontWeight: 500 }}>Moja baza</div>
            <div className="micro" style={{ fontSize: 9 }}>{books.length} knjiga · {lessons.length} lekcija</div>
          </div>
          <button onClick={onLogout} title={T.common.logout} style={{ color: 'var(--fg-subtle)', padding: 4 }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--fg)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--fg-subtle)'}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
}

function MobileBottomNav({ route, onNav }) {
  const items = [
    { id: 'home',     label: T.nav.home,     icon: <IconHome size={16} /> },
    { id: 'library',  label: T.nav.library,  icon: <IconLibrary size={16} /> },
    { id: 'ideas',    label: T.nav.ideas,    icon: <IconBulb size={16} /> },
    { id: 'videos',   label: 'Video',        icon: <IconPlay size={16} /> },
    { id: 'progress', label: T.nav.progress, icon: <IconProgress size={16} /> },
  ];
  const active = route.name === 'book' ? 'library' : route.name;
  return (
    <nav className="mobile-nav" style={{
      position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 40, display: 'none',
      background: 'color-mix(in srgb, var(--bg) 92%, transparent)', backdropFilter: 'blur(14px)',
      borderTop: '1px solid var(--border)',
      padding: 'calc(8px + env(safe-area-inset-bottom)) 6px 8px',
      justifyContent: 'space-around', alignItems: 'center',
    }}>
      {items.map(it => {
        const on = active === it.id;
        return (
          <button key={it.id} onClick={() => onNav({ name: it.id })} style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 3, padding: '6px 4px',
            color: on ? 'var(--fg)' : 'var(--fg-muted)', fontSize: 10, fontWeight: 500,
          }}>
            <div style={{ position: 'relative' }}>
              {it.icon}
              {on && <div style={{
                position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)',
                width: 4, height: 4, borderRadius: 99, background: 'var(--accent)',
              }} />}
            </div>
            {it.label}
          </button>
        );
      })}
    </nav>
  );
}

function CommandBar({ onOpenBook }) {
  const { books, lessons } = useStore();
  const [focused, setFocused] = useState(false);
  const [q, setQ] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault(); ref.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const results = useMemo(() => {
    if (!q.trim()) return null;
    const qq = q.toLowerCase();
    return {
      books:   books.filter(b => b.title.toLowerCase().includes(qq) || b.author.toLowerCase().includes(qq)).slice(0, 4),
      lessons: lessons.filter(l => l.title.toLowerCase().includes(qq) || l.body.toLowerCase().includes(qq)).slice(0, 4),
    };
  }, [q, books, lessons]);

  return (
    <div style={{ position: 'relative', flex: 1, maxWidth: 520 }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px',
        border: '1px solid', borderColor: focused ? 'var(--border-strong)' : 'var(--border)',
        borderRadius: 9, background: 'var(--bg-raised)', transition: 'border-color 140ms',
      }}>
        <IconSearch size={14} style={{ color: 'var(--fg-subtle)' }} />
        <input ref={ref} value={q} onChange={e => setQ(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder={T.common.search}
          style={{ flex: 1, background: 'transparent', border: 0, outline: 'none', fontSize: 13, color: 'var(--fg)' }} />
        <div className="hide-on-mobile" style={{ display: 'flex', gap: 4 }}>
          <span className="kbd">⌘</span><span className="kbd">K</span>
        </div>
      </div>
      {focused && results && (results.books.length + results.lessons.length > 0) && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0,
          background: 'var(--bg-raised)', border: '1px solid var(--border-strong)',
          borderRadius: 10, padding: 8, zIndex: 20,
          boxShadow: '0 24px 60px -24px oklch(0 0 0 / 0.4)',
        }}>
          {results.books.length > 0 && (
            <>
              <div className="micro" style={{ padding: '6px 8px 4px' }}>Knjige</div>
              {results.books.map(b => (
                <button key={b.id} onMouseDown={() => onOpenBook(b.id)} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  width: '100%', padding: '7px 8px', borderRadius: 6, textAlign: 'left',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--hover-bg)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <BookCover book={b} w={22} h={32} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13 }}>{b.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{b.author}</div>
                  </div>
                </button>
              ))}
            </>
          )}
          {results.lessons.length > 0 && (
            <>
              <div className="micro" style={{ padding: '10px 8px 4px' }}>Lekcije</div>
              {results.lessons.map(l => (
                <div key={l.id} style={{ padding: '8px', borderRadius: 6, fontSize: 13 }}>
                  <div style={{ fontWeight: 500 }}>{l.title}</div>
                  <div className="micro" style={{ marginTop: 3 }}>{l.source?.label || l.tag}</div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}

function TopBar({ theme, setTheme, onOpenBook, onToggleTweaks }) {
  return (
    <header className="topbar" style={{
      position: 'sticky', top: 0, zIndex: 30,
      display: 'flex', alignItems: 'center', gap: 10, padding: '14px 40px',
      background: 'color-mix(in srgb, var(--bg) 84%, transparent)',
      backdropFilter: 'blur(14px)', borderBottom: '1px solid var(--border)',
    }}>
      <div className="show-on-mobile" style={{ display: 'none', alignItems: 'center', gap: 8, marginRight: 12 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 6, background: 'var(--fg)', color: 'var(--bg)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-serif)', fontSize: 15, fontWeight: 600, letterSpacing: '-0.03em',
        }}>LZ</div>
      </div>
      <CommandBar onOpenBook={onOpenBook} />
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} style={{
          padding: 8, border: '1px solid var(--border)', borderRadius: 8,
          color: 'var(--fg-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
        onMouseEnter={e => { e.currentTarget.style.color = 'var(--fg)'; e.currentTarget.style.borderColor = 'var(--border-strong)'; }}
        onMouseLeave={e => { e.currentTarget.style.color = 'var(--fg-muted)'; e.currentTarget.style.borderColor = 'var(--border)'; }}>
          {theme === 'dark' ? <IconSun size={14} /> : <IconMoon size={14} />}
        </button>
        <button onClick={onToggleTweaks} className="hide-on-mobile" style={{
          padding: '7px 11px', fontSize: 11.5, fontFamily: 'var(--font-mono)',
          letterSpacing: '0.1em', textTransform: 'uppercase',
          border: '1px solid var(--border)', borderRadius: 8, color: 'var(--fg-muted)',
        }}>{T.common.tweaks}</button>
      </div>
    </header>
  );
}

function AppShell() {
  const [theme, setTheme] = useTheme();
  const [route, setRoute] = useState(() => {
    try { return JSON.parse(localStorage.getItem('lz-route') || '{"name":"home"}'); } catch { return { name: 'home' }; }
  });
  const [tweaksOpen, setTweaksOpen] = useState(false);
  const [tweaks, setTweaks] = useState(TWEAKS_DEFAULTS);
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);
  const isMobile = useIsMobile();

  useEffect(() => {
    try { localStorage.setItem('lz-route', JSON.stringify(route)); } catch {}
    window.scrollTo({ top: 0 });
  }, [route]);

  useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty('--accent-h', tweaks.accentHue);
    if (!isMobile) r.style.setProperty('--sidebar-w', `${tweaks.sidebarWidth}px`);
    const pair = FONT_PAIRS[tweaks.fontPair] || FONT_PAIRS['fraunces-inter'];
    r.style.setProperty('--font-serif', pair.serif);
    r.style.setProperty('--font-sans', pair.sans);
    const density = { compact: 0.9, comfortable: 1, roomy: 1.1 }[tweaks.density] || 1;
    r.style.setProperty('--density', density);
    document.body.style.fontSize = `${14 * density}px`;
  }, [tweaks, isMobile]);

  if (!loggedIn) return <LoginScreen onLogin={() => setLoggedIn(true)} />;

  const nav = (r) => setRoute(r);
  const openBook = (id) => setRoute({ name: 'book', id });
  const handleLogout = () => { logoutUser(); setLoggedIn(false); };

  let Screen = null;
  if (route.name === 'home')          Screen = <HomeScreen onOpenBook={openBook} />;
  else if (route.name === 'library')  Screen = <LibraryScreen onOpenBook={openBook} />;
  else if (route.name === 'progress') Screen = <ProgressScreen onOpenBook={openBook} />;
  else if (route.name === 'book')     Screen = <BookDetailScreen bookId={route.id} onBack={() => nav({ name: 'library' })} />;
  else if (route.name === 'notebook') Screen = <NotebookScreen />;
  else if (route.name === 'ideas')    Screen = <IdeasScreen />;
  else if (route.name === 'videos')   Screen = <VideosScreen />;
  else Screen = <HomeScreen onOpenBook={openBook} />;

  return (
    <TweaksContext.Provider value={tweaks}>
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar route={route} onNav={nav} onLogout={handleLogout} />
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <TopBar theme={theme} setTheme={setTheme} onOpenBook={openBook}
                  onToggleTweaks={() => setTweaksOpen(o => !o)} />
          <main style={{ flex: 1 }}>{Screen}</main>
        </div>
        <MobileBottomNav route={route} onNav={nav} />
        <TweaksPanel open={tweaksOpen} onClose={() => setTweaksOpen(false)}
                     tweaks={tweaks} setTweaks={setTweaks} />
      </div>
    </TweaksContext.Provider>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppShell />
    </StoreProvider>
  );
}
