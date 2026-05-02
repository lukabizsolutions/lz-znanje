import { useState } from 'react';
import { TAGS, T } from '../data.js';
import { TagPill, GhostButton, PrimaryButton } from '../ui.jsx';
import { IconPlus } from '../icons.jsx';
import { useStore } from '../store.jsx';
import { tagToPalette } from '../store.jsx';

function VideoCard({ video, onOpen, large }) {
  const [c1, c2] = video.cover || ['#2B4C7E', '#F4EFE6'];
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
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, oklch(0 0 0 / 0.55) 0%, transparent 55%)' }} />
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
        {video.duration && (
          <div className="mono" style={{
            position: 'absolute', top: 10, right: 10,
            padding: '3px 7px', background: 'oklch(0 0 0 / 0.55)', backdropFilter: 'blur(6px)',
            fontSize: 10.5, color: 'white', borderRadius: 4, letterSpacing: '0.04em',
          }}>{video.duration}</div>
        )}
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
          {video.duration && <><span>·</span><span>{video.duration}</span></>}
        </div>
      )}
    </button>
  );
}

function VideoModal({ video, onClose, onSave, onDelete }) {
  if (!video) return null;
  const isNew = video.id === '__new__';
  const [c1] = video.cover || ['#2B4C7E'];
  const [title, setTitle] = useState(video.title || '');
  const [desc, setDesc] = useState(video.description || '');
  const [tag, setTag] = useState(video.tag || 'navike');
  const [duration, setDuration] = useState(video.duration || '');
  const [confirmDel, setConfirmDel] = useState(false);

  const inp = {
    width: '100%', padding: '10px 12px',
    border: '1px solid var(--border)', borderRadius: 7,
    background: 'var(--bg-sunken)', color: 'var(--fg)',
    fontSize: 14, outline: 'none', fontFamily: 'var(--font-sans)', boxSizing: 'border-box',
  };

  const submit = () => {
    if (!title.trim()) return;
    const cover = tagToPalette(tag);
    onSave({ ...video, title: title.trim(), description: desc.trim(), tag, duration: duration.trim(), cover });
    onClose();
  };

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'oklch(0 0 0 / 0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20, animation: 'screenIn 220ms ease-out both',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', maxWidth: 560,
        background: 'var(--bg-raised)', border: '1px solid var(--border-strong)',
        borderRadius: 16, boxShadow: '0 40px 100px -30px oklch(0 0 0 / 0.5)',
      }}>
        <div style={{ padding: '26px 28px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <div className="serif" style={{ fontSize: 20, fontWeight: 500 }}>{isNew ? T.common.addVideo : 'Uredi video'}</div>
            <button onClick={onClose} style={{ color: 'var(--fg-subtle)', fontSize: 22, lineHeight: 1 }}>×</button>
          </div>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Naslov videa" style={inp} autoFocus />
          <textarea value={desc} onChange={e => setDesc(e.target.value)}
            placeholder="Opis, beleške, ključne tačke…"
            style={{ ...inp, minHeight: 110, resize: 'vertical', lineHeight: 1.6 }} />
          <div style={{ display: 'flex', gap: 10 }}>
            <select value={tag} onChange={e => setTag(e.target.value)} style={{ ...inp, flex: 1 }}>
              {Object.entries(TAGS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
            <input value={duration} onChange={e => setDuration(e.target.value)}
              placeholder="Trajanje (npr. 42:15)" style={{ ...inp, flex: 1 }} />
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 4, justifyContent: 'space-between', alignItems: 'center' }}>
            {!isNew && (
              <button onClick={() => confirmDel ? (onDelete(video.id), onClose()) : setConfirmDel(true)} style={{
                fontSize: 12, padding: '6px 10px', borderRadius: 6,
                color: confirmDel ? 'oklch(0.65 0.2 15)' : 'var(--fg-subtle)',
                border: confirmDel ? '1px solid oklch(0.65 0.2 15 / 0.4)' : '1px solid transparent',
              }}>
                {confirmDel ? T.common.confirmDelete : T.common.delete}
              </button>
            )}
            <div style={{ display: 'flex', gap: 10, marginLeft: 'auto' }}>
              <GhostButton onClick={onClose} small>{T.common.close}</GhostButton>
              <PrimaryButton onClick={submit}>{T.common.save}</PrimaryButton>
            </div>
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
      <div style={{ width: 40, height: 40, borderRadius: 10, border: '1px solid var(--border-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 16V5"/><path d="m7 10 5-5 5 5"/><path d="M5 19h14"/>
        </svg>
      </div>
      <div className="serif" style={{ fontSize: 14, fontWeight: 500 }}>{T.common.uploadNew}</div>
    </button>
  );
}

export default function VideosScreen() {
  const { videos, videoActions } = useStore();
  const [open, setOpen] = useState(null);
  const TC = T.common;
  const newVideo = { id: '__new__', title: '', description: '', tag: 'navike', duration: '', cover: ['#2B4C7E', '#F4EFE6'], date: 'Danas' };

  const handleSave = (video) => {
    if (video.id === '__new__') {
      videoActions.add({ title: video.title, description: video.description, tag: video.tag, duration: video.duration, cover: video.cover });
    } else {
      videoActions.update(video.id, { title: video.title, description: video.description, tag: video.tag, duration: video.duration, cover: video.cover });
    }
  };

  const featured = videos[0];
  const rest = videos.slice(1);

  return (
    <div className="screen-in">
      <div className="pad-page" style={{ padding: '36px 40px 28px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20, flexWrap: 'wrap' }}>
          <div>
            <div className="micro" style={{ marginBottom: 10 }}>{T.nav.videos} · {videos.length}</div>
            <h1 className="serif hero-title" style={{ margin: 0, fontSize: 38, fontWeight: 500, letterSpacing: '-0.022em' }}>{TC.videosTitle}</h1>
            <div style={{ fontSize: 13.5, color: 'var(--fg-muted)', marginTop: 10, maxWidth: 560 }}>{TC.videosSubtitle}</div>
          </div>
          <PrimaryButton icon={<IconPlus size={13} stroke={2} />} onClick={() => setOpen(newVideo)}>{TC.uploadNew}</PrimaryButton>
        </div>
      </div>

      <div className="pad-page" style={{ padding: '32px 40px 80px' }}>
        {videos.length === 0 && (
          <div style={{ padding: '60px 0', textAlign: 'center', color: 'var(--fg-muted)' }}>
            <div className="serif" style={{ fontSize: 18, marginBottom: 8 }}>{TC.emptyVideos}</div>
            <div style={{ fontSize: 13 }}>{TC.emptyVideosBody}</div>
          </div>
        )}
        {featured && (
          <section style={{ marginBottom: 40 }}>
            <div className="micro" style={{ marginBottom: 14 }}>Istaknuto</div>
            <div className="two-col" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 28, alignItems: 'center' }}>
              <VideoCard video={featured} onOpen={() => setOpen(featured)} large />
              <div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14, flexWrap: 'wrap' }}>
                  <TagPill tag={featured.tag} />
                  {featured.duration && <div className="micro">{featured.date} · {featured.duration}</div>}
                </div>
                <h2 className="serif" style={{ margin: '0 0 14px', fontSize: 28, fontWeight: 500, letterSpacing: '-0.018em', lineHeight: 1.15, textWrap: 'balance' }}>{featured.title}</h2>
                {featured.description && <p style={{ margin: '0 0 18px', fontSize: 14.5, color: 'var(--fg-muted)', lineHeight: 1.6 }}>{featured.description}</p>}
                <GhostButton onClick={() => setOpen(featured)}
                  icon={<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>}>
                  {TC.watchVideo}
                </GhostButton>
              </div>
            </div>
          </section>
        )}
        <section>
          {videos.length > 1 && <div className="micro" style={{ marginBottom: 14 }}>Svi snimci</div>}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '28px 18px' }}>
            <UploadTile onClick={() => setOpen(newVideo)} />
            {rest.map(v => <VideoCard key={v.id} video={v} onOpen={() => setOpen(v)} />)}
          </div>
        </section>
      </div>
      <VideoModal
        video={open}
        onClose={() => setOpen(null)}
        onSave={handleSave}
        onDelete={id => videoActions.remove(id)}
      />
    </div>
  );
}
