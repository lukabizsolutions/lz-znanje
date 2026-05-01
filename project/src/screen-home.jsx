// Početna — feed lekcija

function LessonCard({ lesson, onClick }) {
  const src = lesson.source;
  return (
    <article className="lift" onClick={onClick} style={{
      display: 'flex', flexDirection: 'column', gap: 14,
      padding: "18px 18px 16px",
      border: "1px solid var(--border)",
      borderRadius: 10, background: "var(--bg-raised)",
      cursor: src.kind === 'book' ? 'pointer' : 'default',
      minHeight: 180,
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--border-strong)"; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
        <window.TagPill tag={lesson.tag} />
        {src.kind === 'book' && (
          <window.IconBookmark size={13} style={{ color: "var(--fg-subtle)" }} />
        )}
      </div>
      <h3 className="serif" style={{
        margin: 0, fontSize: 19, fontWeight: 500, lineHeight: 1.2,
        letterSpacing: "-0.015em", textWrap: 'balance',
      }}>{lesson.title}</h3>
      <p style={{
        margin: 0, fontSize: 13, color: "var(--fg-muted)", lineHeight: 1.55,
        display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>{lesson.body}</p>
      <div style={{
        marginTop: 'auto', display: 'flex', alignItems: 'center',
        justifyContent: "space-between",
        paddingTop: 12, borderTop: "1px solid var(--border)",
      }}>
        <div className="micro">
          {src.kind === 'book' ? `Iz · ${src.label}` : src.label}
        </div>
      </div>
    </article>
  );
}

function FilterChip({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: "6px 12px", fontSize: 12, fontWeight: 500,
      border: "1px solid", borderColor: active ? "var(--fg)" : "var(--border)",
      color: active ? "var(--fg)" : "var(--fg-muted)",
      background: active ? "var(--hover-bg)" : 'transparent',
      borderRadius: 999, transition: "all 140ms",
    }}>{label}</button>
  );
}

function HomeScreen({ onOpenBook }) {
  const [filter, setFilter] = React.useState("all");
  const [seed, setSeed] = React.useState(0);
  const T = window.T.common;

  const filters = [
    { id: 'all', label: T.all },
    { id: 'book', label: T.fromBooks },
    { id: 'notebook', label: T.fromNotebook },
    ...Array.from(new Set(window.LESSONS.map(l => l.tag))).slice(0, 6).map(t => ({ id: `tag:${t}`, label: window.TAGS[t].label })),
  ];

  const filtered = React.useMemo(() => {
    let out = window.LESSONS;
    if (filter === "book") out = out.filter(l => l.source.kind === "book");
    else if (filter === "notebook") out = out.filter(l => l.source.kind === "notebook");
    else if (filter.startsWith("tag:")) out = out.filter(l => l.tag === filter.slice(4));
    return [...out].sort((a, b) => {
      const ha = (a.id.charCodeAt(1) * 31 + seed * 7) % 97;
      const hb = (b.id.charCodeAt(1) * 31 + seed * 7) % 97;
      return ha - hb;
    });
  }, [filter, seed]);

  return (
    <div className="screen-in">
      <div className="pad-page" style={{ padding: "36px 40px 28px", borderBottom: "1px solid var(--border)" }}>
        <div className="micro" style={{ marginBottom: 10 }}>Feed · Danas</div>
        <h1 className="serif hero-title" style={{
          margin: 0, fontSize: 38, fontWeight: 500, letterSpacing: "-0.022em",
          lineHeight: 1.08, maxWidth: 780, textWrap: 'balance',
        }}>
          {T.heroLine1}<br/>
          <span style={{ color: "var(--fg-muted)" }}>{T.heroLine2}</span>
        </h1>
        <div style={{ display: 'flex', gap: 24, marginTop: 22, color: "var(--fg-muted)", fontSize: 13, flexWrap: 'wrap' }}>
          <div><span style={{ color: "var(--fg)", fontWeight: 500 }}>{window.LESSONS.length}</span> {T.lessonsCount}</div>
          <div><span style={{ color: "var(--fg)", fontWeight: 500 }}>{window.BOOKS.length}</span> {T.booksCount}</div>
          <div><span style={{ color: "var(--fg)", fontWeight: 500 }}>{window.CURRENT_STREAK_LABEL}</span></div>
        </div>
      </div>

      <div className="pad-page" style={{
        padding: "18px 40px", display: 'flex', alignItems: 'center', gap: 8,
        borderBottom: "1px solid var(--border)", flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {filters.map(f => (
            <FilterChip key={f.id} label={f.label} active={filter === f.id} onClick={() => setFilter(f.id)} />
          ))}
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
          <button onClick={() => setSeed(s => s + 1)} style={{
            display: "inline-flex", alignItems: 'center', gap: 6,
            padding: "6px 11px", fontSize: 11.5, color: "var(--fg-muted)",
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/></svg>
            {T.shuffle}
          </button>
        </div>
      </div>

      <div className="pad-page" style={{
        padding: "28px 40px 80px",
        columnCount: 'auto', columnWidth: 320, columnGap: 18,
      }}>
        {filtered.map(l => (
          <div key={l.id} style={{ breakInside: 'avoid', marginBottom: 18 }}>
            <LessonCard lesson={l} onClick={() => l.source.kind === 'book' && onOpenBook(l.source.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}

window.HomeScreen = HomeScreen;
