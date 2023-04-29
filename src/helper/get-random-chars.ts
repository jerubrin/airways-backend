import { getRandomInt } from './get-random-int';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function getRandomChars(count: number): string {
  let str = '';

  for (let i = 0; i < count; i++) {
    str += ALPHABET[getRandomInt(0, ALPHABET.length)];
  }

  return str;
}
