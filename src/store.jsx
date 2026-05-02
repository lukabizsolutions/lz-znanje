import { createContext, useContext, useState } from 'react';

const DATA_KEY = 'lz_data_v1';
const PWD_KEY  = 'lz_pwd';
const SES_KEY  = 'lz_session';

const EMPTY = { books: [], lessons: [], ideas: [], videos: [], notebook: [] };

function load() {
  try { return { ...EMPTY, ...JSON.parse(localStorage.getItem(DATA_KEY) || '{}') }; }
  catch { return { ...EMPTY }; }
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

// Auth
export function hasPassword() { return !!localStorage.getItem(PWD_KEY); }
export function setPassword(p) { localStorage.setItem(PWD_KEY, btoa(p + '_lznanje')); }
export function verifyPassword(p) { return localStorage.getItem(PWD_KEY) === btoa(p + '_lznanje'); }
export function isLoggedIn() { return !!sessionStorage.getItem(SES_KEY); }
export function loginUser() { sessionStorage.setItem(SES_KEY, '1'); }
export function logoutUser() { sessionStorage.removeItem(SES_KEY); }

const Ctx = createContext(null);

export function StoreProvider({ children }) {
  const [data, setData] = useState(load);

  const mutate = (fn) => setData(prev => {
    const next = fn(prev);
    localStorage.setItem(DATA_KEY, JSON.stringify(next));
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
