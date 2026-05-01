import { useState } from 'react';
import { VIDEOS, T } from '../data.js';
import { TagPill, GhostButton, PrimaryButton, EditWithAIButton } from '../ui.jsx';
import { IconPlus } from '../icons.jsx';

function VideoCard({ video, onOpen, large }) {
  const [c1, c2] = video.cover;
  return (
    <button onClick={onOpen} style={{ display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'left', width: '100%' }}>
      <div className="lift" style={{
        width: '100%', aspectRatio: large ? '16 / 9' : '16 / 10',
        position: 'relative', borderRadius: 10, overflow: 'hidden',
        background: `linear-gradient(155deg, ${c1} 0%, oklch(from ${c1} calc(l * 0.7) c h) 100%)`,
        boxShadow: '0 0 0 1px var(--border)',
        color: c2,
      }}
      onMouseEnter={e => { const p = e.currentTarget.querySelector('.play'); if (p) p.style.transform = 'scale(1.08)'; }}
      onMouseLeave={e => { const p = e.currentTarget.querySelector('.play'); if (p) p.style.transform = 'scale(1)'; }}>
        <div className="stripe" style={{ position: 'absolute', inset: 0, opacity: 0.16 }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, oklch(0 0 0 / 0.55) 0%, transparent 55%)',
        }} />
        <div className="play" style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 52, height: 52, borderRadius: 999,
          background: 'oklch(1 0 0 / 0.92)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform 200ms cubic-bezier(.22,.61,.36,1)', color: '#111',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        </div>
        <div className="mono" style={{
          position: 'absolute', top: 10, right: 10,
          padding: '3px 7px', background: 'oklch(0 0 0 / 0.55)',
          backdropFilter: 'blur(6px)',
          fontSize: 10.5, color: 'white', borderRadius: 4, letterSpacing: '0.04em',
        }}>{video.duration}</div>
        <div style={{ position: 'absolute', left: 14, right: 14, bottom: 12 }}>
          <div className="serif" style={{
            fontSize: large ? 20 : 15.5, fontWeight: 500, lineHeight: 1.2,
            letterSpacing: '-0.012em', textWrap: 'balance',
            color: 'white', textShadow: '0 1px 2px oklch(0 0 0 / 0.4)',
          }}>{video.title}</div>
        </div>
      </div>
      {!large && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11.5, color: 'var(--fg-muted)' }}>
          <TagPill tag={video.tag} size="xs" />
          <span>·</span>
          <span>{video.views} {T.common.views}</span>
        </div>
      )}
    </button>
  );
}

function VideoModal({ video, onClose }) {
  if (!video) return null;
  const [c1] = video.cover;
  const [desc, setDesc] = useState(video.description);
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'oklch(0 0 0 / 0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20, animation: 'screenIn 220ms ease-out both',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', maxWidth: 880, maxHeight: '90vh', overflow: 'auto',
        background: 'var(--bg-raised)', border: '1px solid var(--border-strong)',
        borderRadius: 16,
        boxShadow: '0 40px 100px -30px oklch(0 0 0 / 0.5)',
      }}>
        <div style={{
          position: 'relative', width: '100%', aspectRatio: '16 / 9',
          background: `linear-gradient(155deg, ${c1} 0%, oklch(from ${c1} calc(l * 0.55) c h) 100%)`,
          borderRadius: '16px 16px 0 0', overflow: 'hidden',
        }}>
          <div className="stripe" style={{ position: 'absolute', inset: 0, opacity: 0.14 }} />
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 72, height: 72, borderRadius: 999,
            background: 'oklch(1 0 0 / 0.95)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111',
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          </div>
          <div style={{
            position: 'absolute', left: 16, right: 16, bottom: 16,
            display: 'flex', alignItems: 'center', gap: 12, color: 'white',
          }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: '0.04em' }}>00:00</div>
            <div style={{ flex: 1, height: 3, background: 'oklch(1 0 0 / 0.25)', borderRadius: 99 }}>
              <div style={{ width: '18%', height: '100%', background: 'white', borderRadius: 99 }} />
            </div>
            <div className="mono" style={{ fontSize: 11, letterSpacing: '0.04em' }}>{video.duration}</div>
          </div>
          <button onClick={onClose} style={{
            position: 'absolute', top: 14, right: 14,
            width: 32, height: 32, borderRadius: 999,
            background: 'oklch(0 0 0 / 0.45)', color: 'white',
            fontSize: 18, lineHeight: 1,
          }}>×</button>
        </div>

        <div style={{ padding: '26px 30px 30px' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14, flexWrap: 'wrap' }}>
            <TagPill tag={video.tag} />
            <div className="micro">{T.common.recorded} · {video.date}</div>
            <div className="micro">{video.views} {T.common.views}</div>
          </div>
          <h2 className="serif" style={{
            margin: '0 0 18px', fontSize: 26, fontWeight: 500,
            letterSpacing: '-0.018em', lineHeight: 1.15, textWrap: 'balance',
          }}>{video.title}</h2>
          <div className="micro" style={{ marginBottom: 8 }}>Opis</div>
          <textarea value={desc} onChange={e => setDesc(e.target.value)}
            style={{
              width: '100%', minHeight: 110, border: '1px solid var(--border)',
              outline: 'none', background: 'var(--bg-sunken)',
              color: 'var(--fg)', fontSize: 14, lineHeight: 1.6,
              padding: '12px 14px', borderRadius: 8,
              fontFamily: 'var(--font-sans)', resize: 'vertical',
            }} />
          <div style={{ display: 'flex', gap: 10, marginTop: 18, justifyContent: 'flex-end' }}>
            <EditWithAIButton />
            <GhostButton onClick={onClose} small>{T.common.close}</GhostButton>
            <PrimaryButton onClick={onClose}>{T.common.save}</PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}

function UploadTile({ onClick }) {
  return (
    <button onClick={onClick} className="lift" style={{
      width: '100%', aspectRatio: '16 / 10',
      border: '1px dashed var(--border-strong)',
      borderRadius: 10, background: 'var(--bg-sunken)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 10,
      color: 'var(--fg-muted)',
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--fg)'; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.color = 'var(--fg-muted)'; }}>
      <div style={{
        width: 40, height: 40, borderRadius: 10,
        border: '1px solid var(--border-strong)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 16V5"/><path d="m7 10 5-5 5 5"/><path d="M5 19h14"/>
        </svg>
      </div>
      <div className="serif" style={{ fontSize: 14, fontWeight: 500 }}>{T.common.uploadNew}</div>
    </button>
  );
}

export default function VideosScreen() {
  const [open, setOpen] = useState(null);
  const TC = T.common;
  const featured = VIDEOS[0];
  const rest = VIDEOS.slice(1);

  return (
    <div className="screen-in">
      <div className="pad-page" style={{ padding: '36px 40px 28px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20, flexWrap: 'wrap' }}>
          <div>
            <div className="micro" style={{ marginBottom: 10 }}>{T.nav.videos} · {VIDEOS.length}</div>
            <h1 className="serif hero-title" style={{
              margin: 0, fontSize: 38, fontWeight: 500, letterSpacing: '-0.022em',
            }}>{TC.videosTitle}</h1>
            <div style={{ fontSize: 13.5, color: 'var(--fg-muted)', marginTop: 10, maxWidth: 560 }}>
              {TC.videosSubtitle}
            </div>
          </div>
          <PrimaryButton icon={<IconPlus size={13} stroke={2} />}>{TC.uploadNew}</PrimaryButton>
        </div>
      </div>

      <div className="pad-page" style={{ padding: '32px 40px 80px' }}>
        <section style={{ marginBottom: 40 }}>
          <div className="micro" style={{ marginBottom: 14 }}>Istaknuto</div>
          <div className="two-col" style={{
            display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 28, alignItems: 'center',
          }}>
            <VideoCard video={featured} onOpen={() => setOpen(featured)} large />
            <div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14, flexWrap: 'wrap' }}>
                <TagPill tag={featured.tag} />
                <div className="micro">{featured.date} · {featured.duration}</div>
              </div>
              <h2 className="serif" style={{
                margin: '0 0 14px', fontSize: 28, fontWeight: 500,
                letterSpacing: '-0.018em', lineHeight: 1.15, textWrap: 'balance',
              }}>{featured.title}</h2>
              <p style={{ margin: '0 0 18px', fontSize: 14.5, color: 'var(--fg-muted)', lineHeight: 1.6 }}>
                {featured.description}
              </p>
              <GhostButton onClick={() => setOpen(featured)}
                icon={<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>}>
                {TC.watchVideo}
              </GhostButton>
            </div>
          </div>
        </section>

        <section>
          <div className="micro" style={{ marginBottom: 14 }}>Svi snimci</div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '28px 18px',
          }}>
            <UploadTile onClick={() => {}} />
            {rest.map(v => <VideoCard key={v.id} video={v} onOpen={() => setOpen(v)} />)}
          </div>
        </section>
      </div>
      <VideoModal video={open} onClose={() => setOpen(null)} />
    </div>
  );
}
