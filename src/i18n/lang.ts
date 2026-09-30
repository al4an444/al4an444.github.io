// Language routing. English lives at the root, Spanish under /es/ — real,
// crawlable URLs, so search engines index both versions (a client-side swap
// only ever gets the English one indexed).
export type Lang = 'en' | 'es';

export function langFromUrl(url: URL): Lang {
  return url.pathname === '/es' || url.pathname.startsWith('/es/') ? 'es' : 'en';
}

// Prefixes a root-relative path for the given language: ('/research/', 'es') → '/es/research/'.
export function localize(path: string, lang: Lang): string {
  return lang === 'es' ? `/es${path}` : path;
}

// The same page in the other language, or null for pages that exist in only one (404).
export function alternatePath(url: URL, lang: Lang): string {
  const path = url.pathname;
  if (lang === 'es') return path.replace(/^\/es(?=\/|$)/, '') || '/';
  return `/es${path}`;
}
