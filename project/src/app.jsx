// App shell — sidebar, topbar, router, theme, tweaks, mobile bottom nav

const { useState, useEffect, useMemo, useRef } = React;

function readDefaults() {
  try {
    const raw = document.getElementById("tweaks-defaults").textContent;
    const json = raw.replace(/\/\*EDITMODE-(?:BEGIN|END)\*\//g, "").trim();
    return JSON.parse(json);
  } catch (e) {
    return { accentHue: 30, fontPair: "fraunces-inter", density: 'comfortable', coverStyle: 'gradient', sidebarWidth: 188 };
  }
}

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("lz-theme") || 'dark'; } catch { return 'dark'; }
  });
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("lz-theme", theme); } catch {}
  }, [theme]);
  return [theme, setTheme];
}

function useIsMobile() {
  const [m, setM] = useState(() => window.innerWidth <= 820);
  useEffect(() => {
    const onR = () => setM(window.innerWidth <= 820);
    window.addEventListener("resize", onR);
    return () => window.removeEventListener("resize", onR);
  }, []);
  return m;
}

function NavItem({ icon, label, active, disabled, badge, onClick }) {
  return (
    <button onClick={disabled ? undefined : onClick} disabled={disabled} style={{
      position: 'relative',
      display: 'flex', alignItems: 'center', gap: 11,
      padding: "8px 14px 8px 18px",
      width: "100%", textAlign: 'left',
      color: disabled ? "var(--fg-subtle)" : (active ? "var(--fg)" : "var(--fg-muted)"),
      fontSize: 13.5, fontWeight: active ? 500 : 400,
      borderRadius: 7, cursor: disabled ? "not-allowed" : 'pointer',
      background: active ? "var(--hover-bg)" : 'transparent',
      transition: "color 140ms, background 140ms",
      opacity: disabled ? 0.55 : 1,
    }}
    onMouseEnter={e => !disabled && !active && (e.currentTarget.style.color = "var(--fg)")}
    onMouseLeave={e => !disabled && !active && (e.currentTarget.style.color = "var(--fg-muted)")}>
      <span style={{
        position: 'absolute', left: 4, top: 10, bottom: 10, width: 2,
        background: active ? "var(--accent)" : 'transparent', borderRadius: 2,
      }} />
      {icon}
      <span style={{ flex: 1 }}>{label}</span>
      {badge && (
        <span className="mono" style={{
          fontSize: 9, letterSpacing: "0.1em", textTransform: 'uppercase',
          padding: "2px 6px", border: "1px solid var(--border)",
          borderRadius: 4, color: "var(--fg-subtle)",
        }}>{badge}</span>
      )}
    </button>
  );
}

function Sidebar({ route, onNav }) {
  const T = window.T;
  const items = [
    { id: 'home',     label: T.nav.home,      icon: <window.IconHome size={15} /> },
    { id: 'library',  label: T.nav.library,   icon: <window.IconLibrary size={15} /> },
    { id: 'notebook', label: T.nav.notebook,  icon: <window.IconNotebook size={15} /> },
    { id: 'ideas',    label: T.nav.ideas,     icon: <IconBulb size={15} /> },
    { id: 'videos',   label: T.nav.videos,    icon: <IconPlay size={15} /> },
    { id: 'progress', label: T.nav.progress,  icon: <window.IconProgress size={15} /> },
    { id: 'mindmaps', label: T.nav.mindmaps,  icon: <window.IconMind size={15} />, disabled: true, badge: T.common.soon },
  ];
  const active = route.name === 'book' ? 'library' : route.name;

  return (
    <aside className="hide-on-mobile" style={{
      width: "var(--sidebar-w)", height: "100vh", position: 'sticky', top: 0,
      borderRight: "1px solid var(--border)", background: "var(--bg)",
      display: 'flex', flexDirection: 'column',
      padding: "18px 10px 14px", flexShrink: 0,
    }}>
      <div style={{ padding: "4px 14px 22px", display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 30, height: 30, borderRadius: 7,
          background: "var(--fg)", color: "var(--bg)",
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "var(--font-serif)", fontSize: 17, fontWeight: 600, letterSpacing: "-0.03em",
        }}>LZ</div>
        <div>
          <div className="serif" style={{ fontSize: 15.5, fontWeight: 600, letterSpacing: "-0.01em" }}>{T.appName}</div>
          <div className="micro" style={{ fontSize: 9.5, marginTop: -1 }}>{T.appSubtitle}</div>
        </div>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {items.map(it => (
          <NavItem key={it.id} {...it} active={active === it.id} onClick={() => onNav({ name: it.id })} />
        ))}
      </nav>

      <div style={{ marginTop: 28 }}>
        <div className="micro" style={{ padding: "0 18px 10px" }}>Kolekcije</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {[{ label: "Biznis · Q2", count: 12 }, { label: 'Stoicizam', count: 6 }, { label: 'Veština proizvoda', count: 9 }].map(c => (
            <button key={c.label} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: "7px 18px", width: "100%", textAlign: 'left',
              color: "var(--fg-muted)", fontSize: 12.5, borderRadius: 7,
            }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--fg)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--fg-muted)"}>
              <span style={{ width: 6, height: 6, borderRadius: 2, background: "var(--accent)", opacity: 0.7 }} />
              <span style={{ flex: 1 }}>{c.label}</span>
              <span style={{ color: "var(--fg-subtle)", fontSize: 11 }}>{c.count}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{
        marginTop: 'auto', paddingTop: 14,
        borderTop: "1px solid var(--border)",
        display: 'flex', alignItems: 'center', gap: 10, padding: "12px 10px 2px",
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: 999,
          background: "linear-gradient(135deg, oklch(0.7 0.14 250), oklch(0.6 0.15 320))",
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontSize: 11.5, fontWeight: 600,
        }}>LP</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12.5, fontWeight: 500 }}>Luka P.</div>
          <div className="micro" style={{ fontSize: 9 }}>Slobodan · 18 / ∞</div>
        </div>
        <button style={{ color: "var(--fg-subtle)" }}><window.IconSettings size={14} /></button>
      </div>
    </aside>
  );
}

const IconBulb = (p) => <window.Icon {...p}><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c1 .7 1.5 1.3 1.5 2.3v1h5v-1c0-1 .5-1.6 1.5-2.3A7 7 0 0 0 12 2z"/></window.Icon>;
const IconPlay = (p) => <window.Icon {...p}><path d="M5 4 19 12 5 20z" fill="currentColor"/></window.Icon>;

function MobileBottomNav({ route, onNav }) {
  const T = window.T;
  const items = [
    { id: 'home',     label: T.nav.home,     icon: <window.IconHome size={16} /> },
    { id: 'library',  label: T.nav.library,  icon: <window.IconLibrary size={16} /> },
    { id: 'ideas',    label: T.nav.ideas,    icon: <IconBulb size={16} /> },
    { id: 'videos',   label: 'Video',        icon: <IconPlay size={16} /> },
    { id: 'progress', label: T.nav.progress, icon: <window.IconProgress size={16} /> },
  ];
  const active = route.name === 'book' ? 'library' : route.name;
  return (
    <nav style={{
      position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 40,
      display: 'none', background: "color-mix(in srgb, var(--bg) 92%, transparent)",
      backdropFilter: "blur(14px)",
      borderTop: "1px solid var(--border)",
      padding: "8px 6px calc(8px + env(safe-area-inset-bottom))",
      justifyContent: "space-around", alignItems: 'center',
    }} className="mobile-nav">
      <style>{`@media (max-width: 820px) { .mobile-nav { display: flex !important; } main { padding-bottom: 74px; } }`}</style>
      {items.map(it => {
        const on = active === it.id;
        return (
          <button key={it.id} onClick={() => onNav({ name: it.id })} style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 3, padding: "6px 4px",
            color: on ? "var(--fg)" : "var(--fg-muted)",
            fontSize: 10, fontWeight: 500,
          }}>
            <div style={{ position: 'relative' }}>
              {it.icon}
              {on && <div style={{
                position: 'absolute', top: -8, left: "50%", transform: "translateX(-50%)",
                width: 4, height: 4, borderRadius: 99, background: "var(--accent)",
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
  const [focused, setFocused] = useState(false);
  const [q, setQ] = useState("");
  const ref = useRef(null);
  const T = window.T.common;

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault(); ref.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const results = useMemo(() => {
    if (!q.trim()) return null;
    const qq = q.toLowerCase();
    return {
      books: window.BOOKS.filter(b => b.title.toLowerCase().includes(qq) || b.author.toLowerCase().includes(qq)).slice(0, 4),
      lessons: window.LESSONS.filter(l => l.title.toLowerCase().includes(qq) || l.body.toLowerCase().includes(qq)).slice(0, 4),
    };
  }, [q]);

  return (
    <div style={{ position: 'relative', flex: 1, maxWidth: 520 }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: "8px 12px",
        border: "1px solid", borderColor: focused ? "var(--border-strong)" : "var(--border)",
        borderRadius: 9, background: "var(--bg-raised)",
        transition: "border-color 140ms",
      }}>
        <window.IconSearch size={14} style={{ color: "var(--fg-subtle)" }} />
        <input ref={ref} value={q} onChange={e => setQ(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder={T.search}
          style={{ flex: 1, background: 'transparent', border: 0, outline: 'none', fontSize: 13, color: "var(--fg)" }} />
        <div className="hide-on-mobile" style={{ display: 'flex', gap: 4 }}>
          <span className="kbd">⌘</span><span className="kbd">K</span>
        </div>
      </div>
      {focused && results && (results.books.length + results.lessons.length > 0) && (
        <div style={{
          position: 'absolute', top: "calc(100% + 6px)", left: 0, right: 0,
          background: "var(--bg-raised)", border: "1px solid var(--border-strong)",
          borderRadius: 10, padding: 8, zIndex: 20,
          boxShadow: "0 24px 60px -24px oklch(0 0 0 / 0.4)",
        }}>
          {results.books.length > 0 && (
            <>
              <div className="micro" style={{ padding: "6px 8px 4px" }}>Knjige</div>
              {results.books.map(b => (
                <button key={b.id} onMouseDown={() => onOpenBook(b.id)} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  width: "100%", padding: "7px 8px", borderRadius: 6, textAlign: 'left',
                }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--hover-bg)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <window.BookCover book={b} w={22} h={32} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13 }}>{b.title}</div>
                    <div style={{ fontSize: 11, color: "var(--fg-muted)" }}>{b.author}</div>
                  </div>
                </button>
              ))}
            </>
          )}
          {results.lessons.length > 0 && (
            <>
              <div className="micro" style={{ padding: "10px 8px 4px" }}>Lekcije</div>
              {results.lessons.map(l => (
                <div key={l.id} style={{ padding: "8px", borderRadius: 6, fontSize: 13 }}>
                  <div style={{ fontWeight: 500 }}>{l.title}</div>
                  <div className="micro" style={{ marginTop: 3 }}>{l.source.label}</div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}

function MobileLogo() {
  return (
    <div className="show-on-mobile" style={{
      display: 'none', alignItems: 'center', gap: 8, marginRight: 12,
    }}>
      <style>{`@media (max-width: 820px){ .show-on-mobile{ display: flex !important; } }`}</style>
      <div style={{
        width: 28, height: 28, borderRadius: 6,
        background: "var(--fg)", color: "var(--bg)",
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "var(--font-serif)", fontSize: 15, fontWeight: 600, letterSpacing: "-0.03em",
      }}>LZ</div>
    </div>
  );
}

function TopBar({ theme, setTheme, onOpenBook, onToggleTweaks }) {
  return (
    <header className="topbar" style={{
      position: 'sticky', top: 0, zIndex: 30,
      display: 'flex', alignItems: 'center', gap: 10,
      padding: "14px 40px",
      background: "color-mix(in srgb, var(--bg) 84%, transparent)",
      backdropFilter: "blur(14px)",
      borderBottom: "1px solid var(--border)",
    }}>
      <MobileLogo />
      <CommandBar onOpenBook={onOpenBook} />
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : "dark")} style={{
          padding: 8, border: "1px solid var(--border)", borderRadius: 8,
          color: "var(--fg-muted)", display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
        onMouseEnter={e => { e.currentTarget.style.color = "var(--fg)"; e.currentTarget.style.borderColor = "var(--border-strong)"; }}
        onMouseLeave={e => { e.currentTarget.style.color = "var(--fg-muted)"; e.currentTarget.style.borderColor = "var(--border)"; }}>
          {theme === 'dark' ? <window.IconSun size={14} /> : <window.IconMoon size={14} />}
        </button>
        <button onClick={onToggleTweaks} className="hide-on-mobile" style={{
          padding: "7px 11px", fontSize: 11.5, fontFamily: "var(--font-mono)",
          letterSpacing: "0.1em", textTransform: 'uppercase',
          border: "1px solid var(--border)", borderRadius: 8,
          color: "var(--fg-muted)",
        }}>{window.T.common.tweaks}</button>
        <div style={{
          width: 32, height: 32, borderRadius: 999,
          background: "linear-gradient(135deg, oklch(0.7 0.14 250), oklch(0.6 0.15 320))",
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontSize: 12, fontWeight: 600,
          border: "1px solid var(--border)",
        }}>LP</div>
      </div>
    </header>
  );
}

function App() {
  const [theme, setTheme] = useTheme();
  const [route, setRoute] = useState(() => {
    try { return JSON.parse(localStorage.getItem("lz-route") || '{"name":"home"}'); } catch { return { name: 'home' }; }
  });
  const [tweaksOpen, setTweaksOpen] = useState(false);
  const [tweaks, setTweaks] = useState(readDefaults);
  const isMobile = useIsMobile();

  useEffect(() => {
    try { localStorage.setItem("lz-route", JSON.stringify(route)); } catch {}
    window.scrollTo({ top: 0 });
  }, [route]);

  useEffect(() => {
    window.__tweaks = tweaks;
    const r = document.documentElement;
    r.style.setProperty("--accent-h", tweaks.accentHue);
    if (!isMobile) r.style.setProperty("--sidebar-w", `${tweaks.sidebarWidth}px`);
    const pair = window.FONT_PAIRS[tweaks.fontPair] || window.FONT_PAIRS["fraunces-inter"];
    r.style.setProperty("--font-serif", pair.serif);
    r.style.setProperty("--font-sans", pair.sans);
    const density = { compact: 0.9, comfortable: 1, roomy: 1.1 }[tweaks.density] || 1;
    r.style.setProperty("--density", density);
    document.body.style.fontSize = `${14 * density}px`;
  }, [tweaks, isMobile]);

  useEffect(() => {
    const onMsg = (e) => {
      const t = e.data?.type;
      if (t === "__activate_edit_mode") setTweaksOpen(true);
      if (t === "__deactivate_edit_mode") setTweaksOpen(false);
    };
    window.addEventListener("message", onMsg);
    try { window.parent.postMessage({ type: "__edit_mode_available" }, "*"); } catch {}
    return () => window.removeEventListener("message", onMsg);
  }, []);

  const nav = (r) => setRoute(r);
  const openBook = (id) => setRoute({ name: 'book', id });

  let Screen = null;
  if (route.name === "home")          Screen = <window.HomeScreen onOpenBook={openBook} />;
  else if (route.name === "library")  Screen = <window.LibraryScreen onOpenBook={openBook} />;
  else if (route.name === "progress") Screen = <window.ProgressScreen onOpenBook={openBook} />;
  else if (route.name === "book")     Screen = <window.BookDetailScreen bookId={route.id} onBack={() => nav({ name: 'library' })} />;
  else if (route.name === "notebook") Screen = <window.NotebookScreen />;
  else if (route.name === "ideas")    Screen = <window.IdeasScreen />;
  else if (route.name === "videos")   Screen = <window.VideosScreen />;
  else Screen = <window.HomeScreen onOpenBook={openBook} />;

  const labels = { home: 'Početna', library: 'Biblioteka', notebook: 'Sveska', ideas: 'Ideje', videos: 'Video lekcije', progress: 'Napredak', book: 'Knjiga' };

  return (
    <div style={{ display: 'flex', minHeight: "100vh" }}>
      <Sidebar route={route} onNav={nav} />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}
           data-screen-label={labels[route.name] || route.name}>
        <TopBar theme={theme} setTheme={setTheme} onOpenBook={openBook}
                onToggleTweaks={() => setTweaksOpen(o => !o)} />
        <main style={{ flex: 1 }}>{Screen}</main>
      </div>
      <MobileBottomNav route={route} onNav={nav} />
      <window.TweaksPanel open={tweaksOpen} onClose={() => setTweaksOpen(false)}
                          tweaks={tweaks} setTweaks={setTweaks} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
