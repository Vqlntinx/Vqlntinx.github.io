import { useEffect, useState } from 'react';

// Hash routing keeps GitHub Pages happy (no server rewrites needed)
const current = () => window.location.hash.replace(/^#\/?/, '') || '';
export function useRoute() {
  const [route, setRoute] = useState(current);
  useEffect(() => {
    const on = () => setRoute(current());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return route;
}
export const go = (path) => { window.location.hash = '/' + path; };
