import { snippet } from './snippet.js';

const filler = (n: number) => Array.from({ length: n }, (_, i) => `word${i}`).join(' ');

describe('snippet', () => {
  it('returns short text whole', () => {
    expect(snippet('The tide is out.', 'tide')).toBe('The tide is out.');
  });

  it('centres on the earliest hit of any term, without cutting words', () => {
    const text = `${filler(30)} the low tide pools ${filler(30)} later the moon`;
    const s = snippet(text, 'moon tide');
    expect(s).toMatch(/^….*low tide pools.*…$/);
    expect(s).not.toContain('moon');
    expect(s.length).toBeLessThanOrEqual(2 * 80 + 2);
    expect(s).toMatch(/^…word\d+ /); // starts on a whole word
  });

  it('finds stemmed terms and ignores negated ones', () => {
    const text = `${filler(30)} bread ${filler(30)} one tide ${filler(30)}`;
    expect(snippet(text, 'tides -bread')).toContain('one tide');
  });

  it('falls back to the start when nothing matches literally', () => {
    const s = snippet(filler(100), 'zebra');
    expect(s.startsWith('word0 word1')).toBe(true);
    expect(s.endsWith('…')).toBe(true);
  });
});
