import { createContext } from 'react';

export const TweaksContext = createContext({
  accentHue: 250,
  fontPair: 'all-inter',
  density: 'comfortable',
  coverStyle: 'gradient',
  sidebarWidth: 204,
});
