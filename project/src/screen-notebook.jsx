// Sveska (Notebook) — klikabilna stranica, free-form beleške

const NOTEBOOK_ENTRIES = [
  { id: "n1", title: 'O prebacivanju konteksta', tag: 'fokus', date: "19. apr 2026", body: "Ako posle svakog sastanka treba 23 minuta da se vratim u dubok rad — onda pet sastanaka dnevno jede skoro dva sata pre nego što išta uradim. Eksperiment: grupisati sve sastanke u jedan blok od 13h do 16h." },
  { id: "n2", title: 'Zašto svaka knjiga ne zaslužuje belešku', tag: 'pisanje', date: "12. apr 2026", body: "Primetio sam — knjige iz kojih pišem najmanje, koristim najviše. Ne zato što su bolje. Zato što ideje prolaze kroz telo umesto kroz papir. Ne treba sve da se arhivira." },
  { id: "n3", title: 'Definicija uspeha koja se menja', tag: 'zivot', date: "05. apr 2026", body: "Pre godinu dana: prihod. Sada: broj dubokih razgovora nedeljno. Za godinu dana: ko zna. Jedino što se ne menja je kvalitet pažnje." },
  { id: "n4", title: 'Sistem za „probudi se sa strahom"', tag: 'psihologija', date: "28. mar 2026", body: 'Ako se probudim sa osećajem „nešto nije uredu", prvo pitanje: da li je to telo (hrana/san/kafa) ili um (stvarno pitanje)? 80% vremena — telo.' },
  { id: "n5", title: 'Spisak pitanja za sebe kvartalno', tag: 'odluke', date: "22. mar 2026", body: "1) Šta sam prestao da radim što mi je oduzimalo energiju? 2) Ko mi je pomogao i da li sam rekao hvala? 3) Koja laž koju sam verovao se raspala? 4) Šta ću oprostiti sebi?" },
  { id: "n6", title: 'Pravilo tri kafe', tag: 'sistemi', date: "15. mar 2026", body: "Prvo: posao. Druga: kreativni rad. Treća: razgovor ili pauza. Ako pijem četvrtu — nešto ne radi. Radilo mesec dana, vratiću sada." },
  { id: "n7", title: 'O ljudima koji se hvale kalendarom', tag: 'liderstvo', date: "08. mar 2026", body: "Napunjen kalendar nije znak važnosti — to je znak da si dozvolio drugima da ti odrede prioritete. Prazni blokovi su aristokratski." },
  { id: "n8", title: 'Kad prestanem da čitam knjigu', tag: 'odluke', date: "01. mar 2026", body: "Pravilo od 50 strana izgleda dobro — ali mislim da stvarni signal nije broj strana. Ako posle 50 strana ne mislim o knjizi između sesija, odlažem." },
];

function NotebookEntryCard({ entry, onOpen }) {
  return (
    <article className="lift" onClick={onOpen} style={{
      padding: 20, border: "1px solid var(--border)",
      borderRadius: 10, background: "var(--bg-raised)",
      cursor: 'pointer',
      display: 'flex', flexDirection: 'column', gap: 12,
    }}
    onMouseEnter={e => e.currentTarget.style.borderColor = "var(--border-strong)"}
    onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}>
      <div style={{ display: 'flex', justifyContent: "space-between", alignItems: 'center' }}>
        <window.TagPill tag={entry.tag} />
        <div className="micro">{entry.date}</div>
      </div>
      <h3 className="serif" style={{
        margin: 0, fontSize: 18, fontWeight: 500, lineHeight: 1.25,
        letterSpacing: "-0.012em", textWrap: 'balance',
      }}>{entry.title}</h3>
      <p style={{
        margin: 0, fontSize: 13, color: "var(--fg-muted)", lineHeight: 1.6,
        display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>{entry.body}</p>
    </article>
  );
}

function EntryModal({ entry, onClose }) {
  if (!entry) return null;
  const [title, setTitle] = React.useState(entry.title);
  const [body, setBody] = React.useState(entry.body);
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: "oklch(0 0 0 / 0.55)",
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20, animation: "screenIn 220ms ease-out both",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: "100%", maxWidth: 680, maxHeight: "85vh", overflow: 'auto',
        background: "var(--bg-raised)", border: "1px solid var(--border-strong)",
        borderRadius: 14, padding: "28px 30px",
        boxShadow: "0 40px 100px -30px oklch(0 0 0 / 0.5)",
      }}>
        <div style={{ display: 'flex', justifyContent: "space-between", alignItems: 'center', marginBottom: 18 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <window.TagPill tag={entry.tag} />
            <div className="micro">{entry.date}</div>
          </div>
          <button onClick={onClose} style={{ color: "var(--fg-subtle)", fontSize: 22, lineHeight: 1 }}>×</button>
        </div>
        <input value={title} onChange={e => setTitle(e.target.value)}
          className="serif" style={{
            width: "100%", border: 0, outline: 'none',
            background: 'transparent', color: "var(--fg)",
            fontSize: 28, fontWeight: 500, letterSpacing: "-0.018em",
            marginBottom: 18, fontFamily: "var(--font-serif)",
          }} />
        <textarea value={body} onChange={e => setBody(e.target.value)}
          className="serif" style={{
            width: "100%", minHeight: 260, border: 0, outline: 'none',
            background: 'transparent', color: "var(--fg)",
            fontSize: 16, lineHeight: 1.65, resize: 'vertical',
            fontFamily: "var(--font-serif)",
          }} />
        <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: "flex-end" }}>
          <window.EditWithAIButton />
          <window.GhostButton onClick={onClose} small>{window.T.common.close}</window.GhostButton>
          <window.PrimaryButton onClick={onClose}>{window.T.common.save}</window.PrimaryButton>
        </div>
      </div>
    </div>
  );
}

function NotebookScreen() {
  const [open, setOpen] = React.useState(null);
  const T = window.T.common;
  return (
    <div className="screen-in">
      <div className="pad-page" style={{ padding: "36px 40px 28px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "flex-end", gap: 20, flexWrap: 'wrap' }}>
          <div>
            <div className="micro" style={{ marginBottom: 10 }}>{window.T.nav.notebook} · {NOTEBOOK_ENTRIES.length}</div>
            <h1 className="serif hero-title" style={{
              margin: 0, fontSize: 38, fontWeight: 500, letterSpacing: "-0.022em",
            }}>{T.notebookTitle}</h1>
            <div style={{ fontSize: 13.5, color: "var(--fg-muted)", marginTop: 10, maxWidth: 560 }}>
              {T.notebookSubtitle}
            </div>
          </div>
          <window.PrimaryButton icon={<window.IconPlus size={13} stroke={2} />}>Nova beleška</window.PrimaryButton>
        </div>
      </div>
      <div className="pad-page" style={{ padding: "28px 40px 80px", columnCount: 'auto', columnWidth: 320, columnGap: 18 }}>
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

window.NotebookScreen = NotebookScreen;
