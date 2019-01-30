import { stripEmoji } from '../index'

describe('Helpers', function() {
  it('should strip the emoji and return an empty string', () => {
    expect(stripEmoji('😂')).toBe('')
  })

  it('should strip the emoji at the last position of the string and return the remaining text', () => {
    const text = 'Remove this 😂'
    expect(stripEmoji(text)).toBe('Remove this')
  })

  it('should strip the emoji in any part of the string and return the remaining text', () => {
    const text = 'Remove this 😂 stupid nonsense'
    expect(stripEmoji(text)).toBe('Remove this stupid nonsense')
  })
})
