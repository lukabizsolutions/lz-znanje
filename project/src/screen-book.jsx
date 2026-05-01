// Detalj knjige

function LessonDetailCard({ lesson }) {
  return (
    <div className="lift" style={{
      padding: 22, border: "1px solid var(--border)",
      borderRadius: 10, background: "var(--bg-raised)",
    }}
    onMouseEnter={e => e.currentTarget.style.borderColor = "var(--border-strong)"}
    onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", marginBottom: 14 }}>
        <window.TagPill tag={lesson.tag} />
        <window.EditWithAIButton />
      </div>
      <h4 className="serif" style={{
        margin: "0 0 10px", fontSize: 21, fontWeight: 500,
        letterSpacing: "-0.015em", lineHeight: 1.2, textWrap: 'balance',
      }}>{lesson.title}</h4>
      <p style={{ margin: 0, fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.6 }}>{lesson.body}</p>
    </div>
  );
}

function EmptyState({ title, body, action }) {
  return (
    <div style={{
      padding: "36px 24px", borderRadius: 10,
      border: "1px dashed var(--border-strong)",
      background: "var(--bg-sunken)",
      display: 'flex', flexDirection: 'column', alignItems: "flex-start", gap: 10,
    }}>
      <div className="stripe" style={{ width: 36, height: 36, borderRadius: 7, opacity: 0.6 }} />
      <div className="serif" style={{ fontSize: 17, fontWeight: 500 }}>{title}</div>
      <div style={{ fontSize: 13, color: "var(--fg-muted)", maxWidth: 420 }}>{body}</div>
      {action && <button style={{ marginTop: 6, fontSize: 12.5, fontWeight: 500, color: "var(--accent-fg)" }}>{action} →</button>}
    </div>
  );
}

function BookDetailScreen({ bookId, onBack }) {
  const T = window.T.common;
  const book = window.BOOKS.find(b => b.id === bookId);
  const detail = window.BOOK_DETAILS[bookId];

  if (!book) return <div style={{ padding: 60 }}>Knjiga nije pronađena.</div>;

  const d = detail || {
    description: "Dodata u biblioteku. Još nema zabeleženih lekcija — počni tako što ćeš obeležiti pasus tokom čitanja.",
    dateRead: book.finished ? `${T.read} · ${book.year}` : T.reading,
    lessons: [], notes: "", summary: null,
  };

  return (
    <div className="screen-in">
      <div className="pad-page" style={{ padding: "20px 40px 0" }}>
        <button onClick={onBack} style={{
          display: "inline-flex", alignItems: 'center', gap: 6,
          color: "var(--fg-muted)", fontSize: 12.5,
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m15 6-6 6 6 6"/></svg>
          {T.library}
        </button>
      </div>

      <section className="pad-page" style={{ padding: "32px 40px 48px", borderBottom: "1px solid var(--border)" }}>
        <div className="hero-grid" style={{
          display: 'grid', gridTemplateColumns: "240px 1fr", gap: 48,
          alignItems: 'end',
        }}>
          <window.BookCover book={book} w={240} h={340} />
          <div style={{ paddingBottom: 14 }}>
            <div className="micro" style={{ marginBottom: 12 }}>{d.dateRead}</div>
            <h1 className="serif" style={{
              margin: "0 0 8px", fontSize: 52, fontWeight: 500,
              letterSpacing: "-0.028em", lineHeight: 1, textWrap: 'balance',
            }}>{book.title}</h1>
            <div style={{ fontSize: 16, color: "var(--fg-muted)", marginBottom: 22 }}>
              autor · <span style={{ color: "var(--fg)" }}>{book.author}</span>
            </div>
            <p className="serif" style={{
              margin: 0, fontSize: 18, lineHeight: 1.5,
              color: "var(--fg-muted)", fontStyle: 'italic',
              maxWidth: 640, textWrap: 'pretty',
            }}>'{d.description}"</p>
            <div style={{ display: 'flex', gap: 10, marginTop: 24, flexWrap: 'wrap' }}>
              <window.GhostButton icon={<window.IconBookmark size={12} />}>Sačuvano</window.GhostButton>
              <window.GhostButton>{book.pages} {T.pages}</window.GhostButton>
              <window.GhostButton>{book.finished ? T.finished : `${book.progress}% pročitano`}</window.GhostButton>
            </div>
          </div>
        </div>
      </section>

      <div className="pad-page" style={{ padding: "48px 40px 80px", maxWidth: 980 }}>
        <section style={{ marginBottom: 56 }}>
          <window.SectionHeader
            eyebrow="01"
            title={T.myLessons}
            subtitle={`${d.lessons.length} zabeleženih uvida, svojim rečima`}
            action={<window.GhostButton icon={<window.IconPlus size={12} stroke={2} />} small>{T.addLesson}</window.GhostButton>}
          />
          {d.lessons.length > 0 ? (
            <div style={{ display: 'grid', gap: 16 }}>
              {d.lessons.map(l => <LessonDetailCard key={l.id} lesson={l} />)}
            </div>
          ) : (
            <EmptyState title={T.noLessons} body={T.noLessonsBody} action={T.addFirstLesson} />
          )}
        </section>

        <section style={{ marginBottom: 56 }}>
          <window.SectionHeader
            eyebrow="02"
            title={T.myNotes}
            subtitle="Slobodno razmišljanje, reakcije, pitanja"
            action={<window.EditWithAIButton />}
          />
          <div style={{
            padding: 24, border: "1px solid var(--border)",
            borderRadius: 10, background: "var(--bg-raised)",
            minHeight: 160,
          }}>
            {d.notes ? (
              <div className="serif" style={{
                fontSize: 15.5, lineHeight: 1.7, color: "var(--fg)",
                whiteSpace: "pre-wrap", fontFamily: "var(--font-serif)",
              }}>{d.notes}</div>
            ) : (
              <div style={{ color: "var(--fg-subtle)", fontSize: 14 }}>{T.notesPlaceholder}</div>
            )}
          </div>
        </section>

        {d.summary && (
          <section style={{ position: 'relative' }}>
            <div className="grain" style={{
              position: 'relative', overflow: 'hidden',
              padding: "36px 36px 40px",
              border: "1px solid var(--border)", borderRadius: 14,
              background: "var(--bg-ai)",
              backgroundImage: "radial-gradient(800px 400px at 85% 0%, oklch(0.68 0.18 var(--accent-h) / 0.06), transparent 60%)",
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
                <window.AIBadge />
                <div className="micro" style={{ color: "var(--fg-subtle)" }}>{T.aiBadgeNote}</div>
              </div>

              <h2 className="serif" style={{
                margin: "0 0 4px", fontSize: 28, fontWeight: 500,
                letterSpacing: "-0.02em",
              }}>{T.aiSummary}</h2>
              <div style={{ fontSize: 13, color: "var(--fg-muted)", marginBottom: 28 }}>
                Sinteza argumenta knjige — dva pasusa, pet ključnih ideja, teme.
              </div>

              <div className="summary-paragraphs" style={{
                display: 'grid', gridTemplateColumns: "1fr 1fr", gap: 28,
                marginBottom: 36,
              }}>
                {d.summary.paragraphs.map((p, i) => (
                  <p key={i} className="serif" style={{
                    margin: 0, fontSize: 15.5, lineHeight: 1.65,
                    color: "var(--fg)", textWrap: 'pretty',
                  }}>
                    <span style={{
                      fontSize: 11, fontFamily: "var(--font-mono)",
                      color: "var(--accent-fg)", marginRight: 8,
                      verticalAlign: "text-top",
                    }}>0{i + 1}</span>
                    {p}
                  </p>
                ))}
              </div>

              <div className="micro" style={{ marginBottom: 16 }}>{T.fiveKeyIdeas}</div>
              <div style={{ display: 'grid', gap: 2, borderTop: "1px solid var(--border)" }}>
                {d.summary.ideas.map((idea, i) => (
                  <div key={i} style={{
                    display: 'grid', gridTemplateColumns: "40px 1fr",
                    gap: 16, padding: "18px 0",
                    borderBottom: "1px solid var(--border)",
                  }}>
                    <div className="mono" style={{ fontSize: 11, color: "var(--accent-fg)", paddingTop: 3 }}>0{i + 1}</div>
                    <div>
                      <div className="serif" style={{
                        fontSize: 17, fontWeight: 600, marginBottom: 6,
                        letterSpacing: "-0.01em",
                      }}>{idea.title}</div>
                      <div style={{ fontSize: 13.5, color: "var(--fg-muted)", lineHeight: 1.55 }}>{idea.body}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 28, display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
                <div className="micro" style={{ marginRight: 4 }}>{T.themes}</div>
                {d.summary.themes.map(t => (
                  <span key={t} className="pill" style={{
                    "--pill-border": "var(--border)",
                    "--pill-fg": "var(--fg-muted)",
                    "--pill-bg": "var(--bg-sunken)",
                  }}>{t}</span>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

window.BookDetailScreen = BookDetailScreen;
window.EmptyState = EmptyState;
