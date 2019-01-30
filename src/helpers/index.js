const stripEmoji = text => {
  const stripEmoji = /(\s*)([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g

  return text.replace(stripEmoji, '')
}

export { stripEmoji }
