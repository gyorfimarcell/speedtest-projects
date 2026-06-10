import assert from "node:assert/strict";
import { existsSync } from "node:fs";

const solutionPath = process.argv[2];
if (!solutionPath) {
  console.error("Usage: node test.js <path-to-getTextStatistics.js>");
  process.exit(1);
}

if (!existsSync(solutionPath)) {
  console.error(`File not found: ${solutionPath}`);
  process.exit(1);
}

let getTextStatistics;
try {
  ({ getTextStatistics } = await import(solutionPath));
} catch (err) {
  console.error(`Failed to import ${solutionPath}:`, err.message);
  process.exit(1);
}

let passed = 0;
let failed = 0;

function stat(text) {
  try {
    const result = getTextStatistics(text);
    return result ?? { characterCount: 0, wordCount: 0, sentenceCount: 0, letterFrequency: [] };
  } catch {
    return { characterCount: 0, wordCount: 0, sentenceCount: 0, letterFrequency: [] };
  }
}

function test(name, actual, expected) {
  try {
    assert.deepStrictEqual(actual, expected);
    passed++;
    console.log(`  PASS  ${name}`);
  } catch (err) {
    failed++;
    console.log(`  FAIL  ${name}`);
    console.log(`        ${err.message}`);
  }
}

// ---------------------------------------------------------------------------
// Basic structure
// ---------------------------------------------------------------------------
console.log("\nBasic structure:");

test("returns an object", stat("a"), {
  characterCount: 1,
  wordCount: 1,
  sentenceCount: 1,
  letterFrequency: [{ letter: "a", count: 1, percentage: 100 }],
});

// ---------------------------------------------------------------------------
// Character count
// ---------------------------------------------------------------------------
console.log("\nCharacter count:");

test("empty string has 0 characters", stat("").characterCount, 0);
test("counts all characters including spaces", stat("a b").characterCount, 3);
test("counts all characters including punctuation", stat("a!b.").characterCount, 4);
test("counts all characters including newlines", stat("a\nb").characterCount, 3);

// ---------------------------------------------------------------------------
// Word count
// ---------------------------------------------------------------------------
console.log("\nWord count:");

test("empty string has 0 words", stat("").wordCount, 0);
test("string with only spaces has 0 words", stat("   ").wordCount, 0);
test("single word", stat("hello").wordCount, 1);
test("multiple words separated by single spaces", stat("hello world").wordCount, 2);
test("multiple words separated by multiple spaces", stat("hello    world").wordCount, 2);
test("leading spaces are ignored", stat("  hello").wordCount, 1);
test("trailing spaces are ignored", stat("hello  ").wordCount, 1);

// ---------------------------------------------------------------------------
// Sentence count
// ---------------------------------------------------------------------------
console.log("\nSentence count:");

test("empty string has 0 sentences", stat("").sentenceCount, 0);
test("single sentence ending with period", stat("Hello world.").sentenceCount, 1);
test("single sentence ending with exclamation", stat("Hello!").sentenceCount, 1);
test("single sentence ending with question", stat("Hello?").sentenceCount, 1);
test("multiple sentences", stat("Hi! How are you? I'm fine.").sentenceCount, 3);
test("multiple punctuation marks", stat("Hello!! World??").sentenceCount, 2);
test("ellipsis", stat("...").sentenceCount, 0);
test("text without sentence-ending punctuation", stat("Hello world").sentenceCount, 1);

// ---------------------------------------------------------------------------
// Letter frequency
// ---------------------------------------------------------------------------
console.log("\nLetter frequency:");

test("empty string returns empty array", stat("").letterFrequency, []);

test("string with only spaces returns empty array", stat("   ").letterFrequency, []);

test("single letter appears once", stat("z").letterFrequency, [
  { letter: "z", count: 1, percentage: 100 },
]);

test("case insensitivity — 'AaA' counts as 3 a's", stat("AaA").letterFrequency, [
  { letter: "a", count: 3, percentage: 100 },
]);

test("whitespace is ignored in frequency", stat("a b c").letterFrequency, [
  { letter: "a", count: 1, percentage: 20 },
  { letter: "b", count: 1, percentage: 20 },
  { letter: "c", count: 1, percentage: 20 },
]);

test("newlines and tabs are ignored in frequency", stat("a\tb\nc").letterFrequency, [
  { letter: "a", count: 1, percentage: 20 },
  { letter: "b", count: 1, percentage: 20 },
  { letter: "c", count: 1, percentage: 20 },
]);

test("digits are counted", stat("abc123").letterFrequency, [
  { letter: "1", count: 1, percentage: 16.67 },
  { letter: "2", count: 1, percentage: 16.67 },
  { letter: "3", count: 1, percentage: 16.67 },
  { letter: "a", count: 1, percentage: 16.67 },
  { letter: "b", count: 1, percentage: 16.67 },
]);

test("punctuation is counted", stat("a!b.").letterFrequency, [
  { letter: "!", count: 1, percentage: 25 },
  { letter: ".", count: 1, percentage: 25 },
  { letter: "a", count: 1, percentage: 25 },
  { letter: "b", count: 1, percentage: 25 },
]);

// ---------------------------------------------------------------------------
// Top 5 limit
// ---------------------------------------------------------------------------
console.log("\nTop 5 limit:");

test("at most 5 entries returned", stat("a b c d e f g").letterFrequency.length, 5);

test("fewer than 5 distinct letters returns all", stat("a a a").letterFrequency.length, 1);

test("returns 5 most frequent by count", stat("aaa bb c d e f g").letterFrequency, [
  { letter: "a", count: 3, percentage: 18.75 },
  { letter: "b", count: 2, percentage: 12.5 },
  { letter: "c", count: 1, percentage: 6.25 },
  { letter: "d", count: 1, percentage: 6.25 },
  { letter: "e", count: 1, percentage: 6.25 },
]);

// ---------------------------------------------------------------------------
// Sort order
// ---------------------------------------------------------------------------
console.log("\nSort order:");

test("sorted by count descending, ties broken alphabetically", stat("bb aa cc !!"), {
  characterCount: 11,
  wordCount: 4,
  sentenceCount: 1,
  letterFrequency: [
    { letter: "!", count: 2, percentage: 18.18 },
    { letter: "a", count: 2, percentage: 18.18 },
    { letter: "b", count: 2, percentage: 18.18 },
    { letter: "c", count: 2, percentage: 18.18 },
  ],
});

// ---------------------------------------------------------------------------
// Percentage calculation
// ---------------------------------------------------------------------------
console.log("\nPercentage calculation:");

test("percentage relative to total character count", stat("aaaaa b").letterFrequency[0], {
  letter: "a",
  count: 5,
  percentage: 71.43,
});

test("percentage rounded to two decimal places", stat("aaaaa b").letterFrequency[1], {
  letter: "b",
  count: 1,
  percentage: 14.29,
});

// ---------------------------------------------------------------------------
// Full example from the task description
// ---------------------------------------------------------------------------
console.log("\nTask example:");

test("matches the task description example", stat("Hello, world! This is a test."), {
  characterCount: 29,
  wordCount: 6,
  sentenceCount: 2,
  letterFrequency: [
    { letter: "l", count: 3, percentage: 10.34 },
    { letter: "s", count: 3, percentage: 10.34 },
    { letter: "t", count: 3, percentage: 10.34 },
    { letter: "e", count: 2, percentage: 6.9 },
    { letter: "h", count: 2, percentage: 6.9 },
  ],
});

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------
console.log(`\n${passed} passed, ${failed} failed\n`);
process.exit(failed === 0 ? 0 : 1);
