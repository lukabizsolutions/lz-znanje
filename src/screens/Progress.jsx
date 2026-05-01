import { BOOKS, HEATMAP, T, YEAR_GOAL, BOOKS_THIS_YEAR, PAGES_TODAY, STREAK_DAYS, THIS_MONTH_BOOKS } from '../data.js';
import { TagPill, BookCover, ProgressBar } from '../ui.jsx';
import { IconFlame } from '../icons.jsx';

function Widget({ title, eyebrow, action, children, span = 1, wide }) {
  return (
    <div className={wide ? 'progress-widget-wide' : ''} style={{
      gridColumn: `span ${span}`,
      padding: 24, borderRadius: 12,
      border: '1px solid var(--border)',
      background: 'var(--bg-raised)',
      display: 'flex', flexDirection: 'column', gap: 16,
      minHeight: 220,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          {eyebrow && <div className="micro" style={{ marginBottom: 6 }}>{eyebrow}</div>}
          <div className="serif" style={{ fontSize: 19, fontWeight: 500, letterSpacing: '-0.01em' }}>{title}</div>
        </div>
        {action}
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>{children}</div>
    </div>
  );
}

function HeatmapCell({ level }) {
  const bg = level === 0
    ? 'var(--bg-sunken)'
    : `oklch(0.68 0.18 var(--accent-h) / ${0.15 + level * 0.2})`;
  const border = level === 0 ? 'var(--border)' : 'transparent';
  return <div style={{ width: 11, height: 11, borderRadius: 2.5, background: bg, border: `1px solid ${border}` }} />;
}

function Heatmap() {
  const weeks = [];
  for (let w = 0; w < 26; w++) {
    const col = [];
    for (let d = 0; d < 7; d++) col.push(HEATMAP[w * 7 + d]);
    weeks.push(col);
  }
  const TC = T.common;
  return (
    <div>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        paddingLeft: 28, marginBottom: 8,
        fontFamily: 'var(--font-mono)', fontSize: 10,
        color: 'var(--fg-subtle)', letterSpacing: '0.08em', textTransform: 'uppercase',
      }}>
        {TC.months.map(m => <span key={m}>{m}</span>)}
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <div style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          paddingTop: 2, paddingBottom: 2,
          fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-subtle)',
        }}>
          <span>{TC.mon}</span><span>{TC.wed}</span><span>{TC.fri}</span>
        </div>
        <div style={{ display: 'flex', gap: 3, overflowX: 'auto' }}>
          {weeks.map((col, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {col.map((v, j) => <HeatmapCell key={j} level={v} />)}
            </div>
          ))}
        </div>
      </div>
      <div style={{
        marginTop: 16, display: 'flex', alignItems: 'center', gap: 8,
        fontSize: 11, color: 'var(--fg-subtle)',
      }}>
        <span>{TC.less}</span>
        {[0,1,2,3,4].map(n => <HeatmapCell key={n} level={n} />)}
        <span>{TC.more}</span>
      </div>
    </div>
  );
}

export default function ProgressScreen({ onOpenBook }) {
  const TC = T.common;
  const pct = Math.round((BOOKS_THIS_YEAR / YEAR_GOAL) * 100);
  const monthBooks = THIS_MONTH_BOOKS.map(id => BOOKS.find(b => b.id === id));

  return (
    <div className="screen-in">
      <div className="pad-page" style={{ padding: '36px 40px 28px', borderBottom: '1px solid var(--border)' }}>
        <div className="micro" style={{ marginBottom: 10 }}>{TC.progressTitle}</div>
        <h1 className="serif hero-title" style={{
          margin: 0, fontSize: 38, fontWeight: 500, letterSpacing: '-0.022em', lineHeight: 1.08,
        }}>
          <span>{TC.progressHero}</span>{' '}
          <span style={{ color: 'var(--fg-muted)' }}>{TC.progressHeroSub}</span>
        </h1>
      </div>

      <div className="pad-page" style={{ padding: '32px 40px 80px' }}>
        <div className="progress-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 18,
        }}>
          <Widget span={2} eyebrow={TC.today} title={TC.pagesRead} wide>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, marginTop: 8 }}>
              <div className="serif" style={{
                fontSize: 92, fontWeight: 500, letterSpacing: '-0.04em', lineHeight: 0.9,
              }}>{PAGES_TODAY}</div>
              <div style={{ fontSize: 13, color: 'var(--fg-muted)', paddingBottom: 10 }}>{TC.pages}</div>
            </div>
            <div style={{ marginTop: 'auto', display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '5px 9px', border: '1px solid var(--border)',
                borderRadius: 99, fontSize: 11.5, color: 'var(--fg-muted)',
              }}>
                <IconFlame size={12} />
                <span>{STREAK_DAYS} {TC.streak}</span>
              </div>
              <div style={{ fontSize: 11.5, color: 'var(--fg-subtle)' }}>{TC.goal} · 30 {TC.pages}</div>
            </div>
          </Widget>

          <Widget span={4} eyebrow={TC.thisYear} title={TC.booksOf(BOOKS_THIS_YEAR, YEAR_GOAL)} wide
            action={<div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--accent-fg)' }}>{pct}%</div>}>
            <div style={{ marginTop: 8 }}>
              <ProgressBar value={BOOKS_THIS_YEAR} max={YEAR_GOAL} height={10} />
            </div>
            <div style={{
              marginTop: 18, display: 'grid',
              gridTemplateColumns: `repeat(${YEAR_GOAL}, 1fr)`, gap: 3,
            }}>
              {Array.from({ length: YEAR_GOAL }).map((_, i) => (
                <div key={i} style={{
                  height: 20,
                  background: i < BOOKS_THIS_YEAR ? 'var(--accent)' : 'var(--bg-sunken)',
                  border: i < BOOKS_THIS_YEAR ? 'none' : '1px solid var(--border)',
                  borderRadius: 2,
                  opacity: i < BOOKS_THIS_YEAR ? 0.3 + (i / YEAR_GOAL) * 0.7 : 1,
                }} />
              ))}
            </div>
            <div style={{
              marginTop: 'auto', paddingTop: 16,
              display: 'flex', justifyContent: 'space-between',
              fontSize: 11.5, color: 'var(--fg-muted)', gap: 12, flexWrap: 'wrap',
            }}>
              <span>{TC.onPace} <span style={{ color: 'var(--fg)', fontWeight: 500 }}>26 {TC.books}</span></span>
              <span>+2 {TC.ahead}</span>
            </div>
          </Widget>

          <Widget span={3} eyebrow={`${TC.thisMonth} · April`} title={TC.booksDone} wide>
            <div style={{ display: 'flex', gap: 14, marginTop: 6, alignItems: 'flex-end', flexWrap: 'wrap' }}>
              {monthBooks.map(b => b && (
                <button key={b.id} onClick={() => onOpenBook(b.id)} style={{ textAlign: 'left' }}>
                  <BookCover book={b} w={68} h={102} />
                  <div className="serif" style={{
                    fontSize: 11.5, marginTop: 8, width: 68,
                    lineHeight: 1.2, color: 'var(--fg)', textWrap: 'balance',
                  }}>{b.title}</div>
                </button>
              ))}
            </div>
            <div style={{ marginTop: 'auto', paddingTop: 18, fontSize: 11.5, color: 'var(--fg-muted)' }}>
              4 knjige · prosek 3.1 {TC.day}/knjiga
            </div>
          </Widget>

          <Widget span={3} eyebrow={TC.last6Months} title={TC.activity} wide>
            <Heatmap />
          </Widget>
        </div>

        <div className="progress-grid" style={{
          marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18,
        }}>
          <Widget eyebrow={TC.lessonsCaptured} title={TC.thisQuarter}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10 }}>
              <div className="serif" style={{
                fontSize: 64, fontWeight: 500, letterSpacing: '-0.035em', lineHeight: 0.9,
              }}>47</div>
              <div style={{ fontSize: 12, color: 'var(--accent-fg)', paddingBottom: 8 }}>↑ 12 {TC.vsLastQ}</div>
            </div>
            <div style={{ marginTop: 'auto', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <TagPill tag="navike" />
              <TagPill tag="fokus" />
              <TagPill tag="sistemi" />
              <TagPill tag="strategija" />
            </div>
          </Widget>

          <Widget eyebrow={TC.readingTime} title={TC.dailyAvg}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10 }}>
              <div className="serif" style={{
                fontSize: 64, fontWeight: 500, letterSpacing: '-0.035em', lineHeight: 0.9,
              }}>38</div>
              <div style={{ fontSize: 13, color: 'var(--fg-muted)', paddingBottom: 8 }}>{TC.minPerDay}</div>
            </div>
            <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'flex-end', gap: 3, height: 40 }}>
              {[22,34,18,46,52,28,44,38,55,41,29,48,36].map((v, i) => (
                <div key={i} style={{
                  flex: 1, height: `${v}%`,
                  background: i === 12 ? 'var(--accent)' : 'var(--border-strong)',
                  borderRadius: 1,
                }} />
              ))}
            </div>
          </Widget>

          <Widget eyebrow={TC.topSource} title={TC.mostCited}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginTop: 4 }}>
              <BookCover book={BOOKS.find(b => b.id === 'atomic-habits')} w={60} h={88} />
              <div>
                <div className="serif" style={{ fontSize: 16, fontWeight: 500, marginBottom: 4 }}>Atomske navike</div>
                <div style={{ fontSize: 11.5, color: 'var(--fg-muted)' }}>9 lekcija · 14 {TC.highlights}</div>
              </div>
            </div>
            <div style={{ marginTop: 'auto', fontSize: 11.5, color: 'var(--fg-subtle)', lineHeight: 1.5 }}>
              {TC.mostRevisited} dizajn okruženja, navike bazirane na identitetu, pravilo 1%.
            </div>
          </Widget>
        </div>
      </div>
    </div>
  );
}
