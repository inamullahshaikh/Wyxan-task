// One label, 1–32 chars of a-z 0-9 and inner hyphens, then .zz
const ADDRESS = /^[a-z0-9](?:[a-z0-9-]{0,30}[a-z0-9])?\.zz$/;

/** What someone typed or linked → its canonical address, or null if it isn't one. */
export function toAddress(input: string): string | null {
  const a = input
    .trim()
    .toLowerCase()
    .replace(/^zz:\/\//, '')
    .replace(/\/+$/, '');
  return ADDRESS.test(a) ? a : null;
}
