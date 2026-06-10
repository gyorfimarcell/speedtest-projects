# Text Statistics (10 mins)

Implement a `getTextStatistics` function that analyzes a string and returns various text statistics.

## Function Signature

```js
getTextStatistics(text);
```

## Return Value

The function returns an object with the following properties:

| Property          | Type     | Description                                                                                                                                                                                                                                                       |
| ----------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `characterCount`  | `number` | Total number of characters in the text (including spaces and punctuation).                                                                                                                                                                                        |
| `wordCount`       | `number` | Number of words in the text. Words are sequences of characters separated by whitespace.                                                                                                                                                                           |
| `sentenceCount`   | `number` | Number of sentences. Sentences are separated by `.`, `!`, or `?`.                                                                                                                                                                                                 |
| `letterFrequency` | `Array`  | Top 5 most frequent characters, ignoring whitespace. Case-insensitive for letters. Each entry contains the character (lowercase for letters), the number of occurrences, and the percentage relative to the total character count, rounded to two decimal places. |

## Letter Frequency Rules

- All non-whitespace characters are counted (letters, digits, punctuation, etc.).
- The frequency is case-insensitive for letters (e.g., `A` and `a` count toward the same letter). Digits and punctuation are counted as-is.
- Results are sorted by count in descending order. Ties are broken alphabetically.
- At most 5 entries are returned. If there are fewer than 5 distinct letters, all are returned.

### Entry Format

```js
{ letter: "e", count: 12, percentage: 9.52 }
```

### Example

```js
getTextStatistics("Hello, world! This is a test.")
// Returns:
{
  characterCount: 29,
  wordCount: 6,
  sentenceCount: 2,
  letterFrequency: [
    { letter: "l", count: 3, percentage: 10.34 },
    { letter: "s", count: 3, percentage: 10.34 },
    { letter: "t", count: 3, percentage: 10.34 },
    { letter: "e", count: 2, percentage: 6.9 },
    { letter: "h", count: 2, percentage: 6.9 }
  ]
}
```

## Web Dashboard

The project includes a web dashboard with a text area that displays the statistics in real time as the user types. The `getTextStatistics` function is already imported by the dashboard - you only need to implement the function itself. Your function implementation will be tested seperately, the dashboard is just for demonstration purposes.
