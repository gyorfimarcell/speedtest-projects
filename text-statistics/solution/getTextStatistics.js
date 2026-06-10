export function getTextStatistics(text) {
  const characterCount = text.length;

  const words = text.trim().split(/\s+/);
  const wordCount = text.trim().length === 0 ? 0 : words.length;

  const sentences = text.split(/[.!?]+/).filter(Boolean);
  const sentenceCount = sentences.length;

  const letterMap = new Map();
  for (const ch of text) {
    if (/\S/.test(ch)) {
      const key = /[a-z]/i.test(ch) ? ch.toLowerCase() : ch;
      letterMap.set(key, (letterMap.get(key) ?? 0) + 1);
    }
  }

  const letterFrequency = [...letterMap.entries()]
    .map(([letter, count]) => ({
      letter,
      count,
      percentage: Number(((count / characterCount) * 100).toFixed(2)),
    }))
    .sort((a, b) => b.count - a.count || a.letter.localeCompare(b.letter))
    .slice(0, 5);

  return { characterCount, wordCount, sentenceCount, letterFrequency };
}
