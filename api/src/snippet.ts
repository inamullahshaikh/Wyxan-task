const RADIUS = 80;

/** ~160 chars of `text` around the first hit of any search term; plain text, the client highlights. */
export function snippet(text: string, q: string): string {
  const lower = text.toLowerCase();
  const terms = q
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => !w.startsWith('-')) // negated terms aren't in the hit
    .flatMap((w) => w.match(/[\p{L}\p{N}]+/gu) ?? []);
  // $text stems ("tides" matches "tide"), a literal search doesn't: also try a crude stem.
  // ponytail: naive suffix strip; use the stemmer Mongo uses if snippets miss real hits.
  const candidates = terms.flatMap((t) => [t, t.replace(/(ing|es|ed|s)$/, '')]).filter((t) => t.length >= 3);
  const hits = candidates.map((t) => lower.indexOf(t)).filter((i) => i >= 0);
  if (!hits.length) return text.length > 2 * RADIUS ? `${trimEnd(text.slice(0, 2 * RADIUS))}…` : text;

  const at = Math.min(...hits);
  let start = Math.max(0, at - RADIUS);
  let end = Math.min(text.length, at + RADIUS);
  if (start > 0) start = text.indexOf(' ', start) + 1 || start; // don't cut a word
  if (end < text.length) end = text.lastIndexOf(' ', end) > at ? text.lastIndexOf(' ', end) : end;
  return `${start > 0 ? '…' : ''}${text.slice(start, end).trim()}${end < text.length ? '…' : ''}`;
}

function trimEnd(s: string) {
  const space = s.lastIndexOf(' ');
  return (space > 0 ? s.slice(0, space) : s).trim();
}
