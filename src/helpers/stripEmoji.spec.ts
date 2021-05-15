import { stripEmoji } from './stripEmoji';

describe('stripEmoji', () => {
  test('should strip the emoji and return an empty string', () => {
    expect(stripEmoji('😂')).toBe('');
  });

  test('should strip the emoji at the last position of the string and return the remaining text', () => {
    const text = 'Remove this 😂';
    expect(stripEmoji(text)).toBe('Remove this');
  });

  test('should strip the emoji in any part of the string and return the remaining text', () => {
    const text = 'Remove this 😂 stupid nonsense';
    expect(stripEmoji(text)).toBe('Remove this stupid nonsense');
  });
});
