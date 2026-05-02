import { T } from '../data.js';
import { TagPill, BookCover, ProgressBar } from '../ui.jsx';
import { IconFlame } from '../icons.jsx';
import { useStore } from '../store.jsx';

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

function Heatmap({ lessons }) {
  const TC = T.common;
  const now = new Date();
  const weeks = [];
  for (let w = 25; w >= 0; w--) {
    const col = [];
    for (let d = 6; d >= 0; d--) {
      const day = new Date(now);
      day.setDate(now.getDate() - (w * 7 + d));
      const dayStr = day.toDateString();
      const count = lessons.filter(l => {
        if (!l.id) return false;
        const ts = parseInt(l.id);
        return !isNaN(ts) && new Date(ts).toDateString() === dayStr;
      }).length;
      col.push(Math.min(4, count));
    }
    weeks.push(col);
  }

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
      <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: 'var(--fg-subtle)' }}>
        <span>{TC.less}</span>
        {[0,1,2,3,4].map(n => <HeatmapCell key={n} level={n} />)}
        <span>{TC.more}</span>
      </div>
    </div>
  );
}

export default function ProgressScreen({ onOpenBook }) {
  const { books, lessons } = useStore();
  const TC = T.common;

  const YEAR_GOAL = 12;
  const thisYear = new Date().getFullYear();
  const finishedThisYear = books.filter(b => b.finished && b.year === thisYear).length;
  const pct = Math.round((finishedThisYear / YEAR_GOAL) * 100);

  const reading = books.filter(b => !b.finished);
  const totalLessons = lessons.length;

  const topTagCounts = {};
  lessons.forEach(l => { topTagCounts[l.tag] = (topTagCounts[l.tag] || 0) + 1; });
  const topTags = Object.entries(topTagCounts).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([t]) => t);

  const topBook = books.reduce((best, b) => {
    const count = lessons.filter(l => l.source?.id === b.id).length;
    return count > (best.count || 0) ? { book: b, count } : best;
  }, { book: null, count: 0 });

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
        <div className="progress-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 18 }}>
          <Widget span={2} eyebrow={TC.lessonsCaptured} title={TC.thisQuarter} wide>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, marginTop: 8 }}>
              <div className="serif" style={{ fontSize: 92, fontWeight: 500, letterSpacing: '-0.04em', lineHeight: 0.9 }}>{totalLessons}</div>
            </div>
            {topTags.length > 0 && (
              <div style={{ marginTop: 'auto', display: 'flex', gap: 6, flexWrap: 'wrap', paddingTop: 16 }}>
                {topTags.map(t => <TagPill key={t} tag={t} />)}
              </div>
            )}
          </Widget>

          <Widget span={4} eyebrow={TC.thisYear} title={TC.booksOf(finishedThisYear, YEAR_GOAL)} wide
            action={<div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--accent-fg)' }}>{pct}%</div>}>
            <div style={{ marginTop: 8 }}>
              <ProgressBar value={finishedThisYear} max={YEAR_GOAL} height={10} />
            </div>
            <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: `repeat(${YEAR_GOAL}, 1fr)`, gap: 3 }}>
              {Array.from({ length: YEAR_GOAL }).map((_, i) => (
                <div key={i} style={{
                  height: 20,
                  background: i < finishedThisYear ? 'var(--accent)' : 'var(--bg-sunken)',
                  border: i < finishedThisYear ? 'none' : '1px solid var(--border)',
                  borderRadius: 2,
                  opacity: i < finishedThisYear ? 0.3 + (i / YEAR_GOAL) * 0.7 : 1,
                }} />
              ))}
            </div>
            <div style={{ marginTop: 'auto', paddingTop: 16, fontSize: 11.5, color: 'var(--fg-muted)' }}>
              {TC.goal} · {YEAR_GOAL} knjiga
            </div>
          </Widget>

          <Widget span={3} eyebrow={TC.readingTime} title={TC.dailyAvg} wide>
            {reading.length > 0 ? (
              <div style={{ display: 'flex', gap: 14, marginTop: 6, alignItems: 'flex-end', flexWrap: 'wrap' }}>
                {reading.slice(0, 3).map(b => (
                  <button key={b.id} onClick={() => onOpenBook(b.id)} style={{ textAlign: 'left' }}>
                    <BookCover book={b} w={68} h={102} />
                    <div className="serif" style={{ fontSize: 11.5, marginTop: 8, width: 68, lineHeight: 1.2, color: 'var(--fg)', textWrap: 'balance' }}>{b.title}</div>
                  </button>
                ))}
              </div>
            ) : (
              <div style={{ fontSize: 13, color: 'var(--fg-muted)', marginTop: 8 }}>Nema knjiga u čitanju.</div>
            )}
          </Widget>

          <Widget span={3} eyebrow={TC.last6Months} title={TC.activity} wide>
            <Heatmap lessons={lessons} />
          </Widget>
        </div>

        <div className="progress-grid" style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
          <Widget eyebrow="Biblioteka" title={TC.booksDone}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10 }}>
              <div className="serif" style={{ fontSize: 64, fontWeight: 500, letterSpacing: '-0.035em', lineHeight: 0.9 }}>
                {books.filter(b => b.finished).length}
              </div>
              <div style={{ fontSize: 13, color: 'var(--fg-muted)', paddingBottom: 8 }}>knjiga</div>
            </div>
            <div style={{ marginTop: 'auto', fontSize: 11.5, color: 'var(--fg-subtle)' }}>
              {books.length} ukupno · {reading.length} u čitanju
            </div>
          </Widget>

          <Widget eyebrow={TC.topSource} title={TC.mostCited}>
            {topBook.book ? (
              <>
                <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginTop: 4 }}>
                  <BookCover book={topBook.book} w={60} h={88} />
                  <div>
                    <div className="serif" style={{ fontSize: 16, fontWeight: 500, marginBottom: 4 }}>{topBook.book.title}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--fg-muted)' }}>{topBook.count} {TC.highlights}</div>
                  </div>
                </div>
                <div style={{ marginTop: 'auto', fontSize: 11.5, color: 'var(--fg-subtle)' }}>{topBook.book.author}</div>
              </>
            ) : (
              <div style={{ fontSize: 13, color: 'var(--fg-muted)' }}>Još nema lekcija iz knjiga.</div>
            )}
          </Widget>

          <Widget eyebrow="Teme" title={TC.mostRevisited.replace(':', '')}>
            {topTags.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
                {topTags.map(t => (
                  <div key={t} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TagPill tag={t} />
                    <span style={{ fontSize: 11.5, color: 'var(--fg-muted)' }}>{topTagCounts[t]} lekcija</span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ fontSize: 13, color: 'var(--fg-muted)' }}>Dodaj lekcije da vidiš teme.</div>
            )}
          </Widget>
        </div>
      </div>
    </div>
  );
}
