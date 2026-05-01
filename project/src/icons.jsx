// Line icons — 1.6 stroke, rounded caps
const Icon = ({ d, size = 16, stroke = 1.6, fill = "none", children, className = "", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor"
       strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    {d ? <path d={d} /> : children}
  </svg>
);

const IconHome     = (p) => <Icon {...p}><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/></Icon>;
const IconLibrary  = (p) => <Icon {...p}><path d="M4 4v16"/><path d="M7 4v16"/><path d="M11 4h3v16h-3z"/><path d="m17 5 3 .8-3.5 14.5-3-.8z"/></Icon>;
const IconNotebook = (p) => <Icon {...p}><path d="M5 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5z"/><path d="M5 8h-2"/><path d="M5 13h-2"/><path d="M5 18h-2"/><path d="M9 7h6"/><path d="M9 11h6"/></Icon>;
const IconProgress = (p) => <Icon {...p}><path d="M4 20V10"/><path d="M10 20V4"/><path d="M16 20v-7"/><path d="M22 20H2"/></Icon>;
const IconMind     = (p) => <Icon {...p}><circle cx="12" cy="12" r="3"/><circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="19" cy="18" r="2"/><path d="m7 7 3 3"/><path d="m17 7-3 3"/><path d="m7 17 3-3"/><path d="m17 17-3-3"/></Icon>;
const IconSearch   = (p) => <Icon {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></Icon>;
const IconMoon     = (p) => <Icon {...p}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></Icon>;
const IconSun      = (p) => <Icon {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.9 4.9 1.4 1.4"/><path d="m17.7 17.7 1.4 1.4"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m4.9 19.1 1.4-1.4"/><path d="m17.7 6.3 1.4-1.4"/></Icon>;
const IconSpark    = (p) => <Icon {...p}><path d="M12 3v4"/><path d="M12 17v4"/><path d="M3 12h4"/><path d="M17 12h4"/><path d="m5.6 5.6 2.8 2.8"/><path d="m15.6 15.6 2.8 2.8"/><path d="m5.6 18.4 2.8-2.8"/><path d="m15.6 8.4 2.8-2.8"/></Icon>;
const IconPlus     = (p) => <Icon {...p}><path d="M12 5v14"/><path d="M5 12h14"/></Icon>;
const IconFilter   = (p) => <Icon {...p}><path d="M3 5h18"/><path d="M6 12h12"/><path d="M10 19h4"/></Icon>;
const IconArrowRt  = (p) => <Icon {...p}><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></Icon>;
const IconBookmark = (p) => <Icon {...p}><path d="M6 3h12v18l-6-4-6 4z"/></Icon>;
const IconSettings = (p) => <Icon {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></Icon>;
const IconBook     = (p) => <Icon {...p}><path d="M4 5a2 2 0 0 1 2-2h13v18H6a2 2 0 0 1-2-2z"/><path d="M4 19a2 2 0 0 0 2 2h13"/></Icon>;
const IconCheck    = (p) => <Icon {...p}><path d="m5 12 5 5L20 7"/></Icon>;
const IconChevDown = (p) => <Icon {...p}><path d="m6 9 6 6 6-6"/></Icon>;
const IconFlame    = (p) => <Icon {...p}><path d="M12 3s4 3.5 4 8a4 4 0 0 1-8 0c0-1.5.5-2 1-3 0 3 2 3 3 2 0 0 0-3-2-5 1 0 2 .5 2-2"/></Icon>;

Object.assign(window, {
  Icon, IconHome, IconLibrary, IconNotebook, IconProgress, IconMind,
  IconSearch, IconMoon, IconSun, IconSpark, IconPlus, IconFilter,
  IconArrowRt, IconBookmark, IconSettings, IconBook, IconCheck, IconChevDown, IconFlame,
});
