import { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const OWNER_EMAIL = 'luka.bizsolutions@gmail.com';

export const sb = createClient(
  'https://twtusyefsulzjraympyq.supabase.co',
  'sb_publishable_spE2B1NJ1u_feztT_HLwOA_Jtdx6V21'
);

const DATA_KEY = 'lz_data_v1';
const EMPTY = { books: [], lessons: [], ideas: [], videos: [], notebook: [] };

function loadLocal() {
  try { return { ...EMPTY, ...JSON.parse(localStorage.getItem(DATA_KEY) || '{}') }; }
  catch { return { ...EMPTY }; }
}

async function fetchRemote() {
  try {
    const { data: { user } } = await sb.auth.getUser();
    if (!user) return null;
    const { data } = await sb.from('user_data').select('data').eq('user_id', user.id).single();
    return data ? { ...EMPTY, ...data.data } : EMPTY;
  } catch { return null; }
}

async function pushRemote(data) {
  try {
    const { data: { user } } = await sb.auth.getUser();
    if (!user) return;
    await sb.from('user_data').upsert({ user_id: user.id, data, updated_at: new Date().toISOString() });
  } catch {}
}

export async function login(password) {
  if (password.length < 4) return { error: 'Lozinka mora imati najmanje 4 karaktera.' };

  const { error: signInErr } = await sb.auth.signInWithPassword({ email: OWNER_EMAIL, password });
  if (!signInErr) return { ok: true };

  if (signInErr.message?.toLowerCase().includes('invalid login credentials')) {
    return { error: 'Pogrešna lozinka. Pokušaj ponovo.' };
  }

  // First time — create account
  const { error: signUpErr } = await sb.auth.signUp({ email: OWNER_EMAIL, password });
  if (signUpErr) return { error: 'Greška: ' + signUpErr.message };

  const { error: signInErr2 } = await sb.auth.signInWithPassword({ email: OWNER_EMAIL, password });
  if (signInErr2) return { error: 'Nalog kreiran. Pokušaj ponovo da se prijaviš.' };

  return { ok: true };
}

export async function logout() {
  await sb.auth.signOut();
  localStorage.removeItem(DATA_KEY);
}

export async function checkSession() {
  const { data: { session } } = await sb.auth.getSession();
  return !!session;
}

export function onAuthChange(cb) {
  const { data: { subscription } } = sb.auth.onAuthStateChange((_, session) => cb(!!session));
  return () => subscription.unsubscribe();
}

export function fmtDate() {
  const d = new Date();
  const m = ['jan','feb','mar','apr','maj','jun','jul','avg','sep','okt','nov','dec'][d.getMonth()];
  return `${d.getDate()}. ${m} ${d.getFullYear()}`;
}

export const TAG_PALETTES = {
  navike:      ['#E8C547','#1C1C1C'],
  fokus:       ['#2B4C7E','#F4EFE6'],
  sistemi:     ['#1B998B','#F5F0E3'],
  psihologija: ['#C1666B','#F4EFE6'],
  strategija:  ['#274060','#FFC857'],
  prodaja:     ['#E63946','#1A1A1A'],
  liderstvo:   ['#5A3E2B','#F4F1DE'],
  pisanje:     ['#2A7F62','#F4EFE6'],
  odluke:      ['#E8C547','#1A1A1A'],
  novac:       ['#2A7F62','#F4EFE6'],
  proizvod:    ['#2B4C7E','#F0F7F4'],
  identitet:   ['#E63946','#1A1A1A'],
  kreativnost: ['#FF5A1F','#FFFFFF'],
  biznis:      ['#274060','#FFC857'],
  zivot:       ['#5A3E2B','#E8D5B7'],
};

export function tagToPalette(tag) {
  return TAG_PALETTES[tag] || ['#1A1A1A', '#F4EFE6'];
}


const Ctx = createContext(null);

export function StoreProvider({ children }) {
  const [data, setData] = useState(loadLocal);
  const [synced, setSynced] = useState(false);

  useEffect(() => {
    fetchRemote().then(remote => {
      if (remote) {
        setData(remote);
        localStorage.setItem(DATA_KEY, JSON.stringify(remote));
      }
      setSynced(true);
    });
  }, []);

  const mutate = (fn) => setData(prev => {
    const next = fn(prev);
    localStorage.setItem(DATA_KEY, JSON.stringify(next));
    pushRemote(next);
    return next;
  });

  function crud(field) {
    return {
      add:    (item)        => mutate(d => ({ ...d, [field]: [{ ...item, id: String(Date.now()), date: item.date || fmtDate() }, ...d[field]] })),
      update: (id, changes) => mutate(d => ({ ...d, [field]: d[field].map(x => x.id === id ? { ...x, ...changes } : x) })),
      remove: (id)          => mutate(d => ({ ...d, [field]: d[field].filter(x => x.id !== id) })),
    };
  }

  return (
    <Ctx.Provider value={{
      books: data.books, lessons: data.lessons, ideas: data.ideas,
      videos: data.videos, notebook: data.notebook,
      synced,
      bookActions:   crud('books'),
      lessonActions: crud('lessons'),
      ideaActions:   crud('ideas'),
      videoActions:  crud('videos'),
      noteActions:   crud('notebook'),
    }}>
      {children}
    </Ctx.Provider>
  );
}

export function useStore() { return useContext(Ctx); }
