import { toAddress } from './address.js';

describe('toAddress', () => {
  it.each([
    ['tidepool.zz', 'tidepool.zz'],
    ['  Tidepool.ZZ/ ', 'tidepool.zz'],
    ['ZZ://night-bus.zz//', 'night-bus.zz'],
    ['a.zz', 'a.zz'],
    [`${'a'.repeat(32)}.zz`, `${'a'.repeat(32)}.zz`],
  ])('%j → %j', (input, expected) => {
    expect(toAddress(input)).toBe(expected);
  });

  it.each([
    'https://x',
    'a b.zz',
    'tidepool',
    'tidepool.com',
    'sub.tidepool.zz',
    'tidepool.zz/page',
    '-tide.zz',
    'tide-.zz',
    '.zz',
    '',
    `${'a'.repeat(33)}.zz`,
  ])('rejects %j', (input) => {
    expect(toAddress(input)).toBeNull();
  });
});
