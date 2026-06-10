import { getTextStatistics } from "./getTextStatistics.js";

const textInput = document.getElementById("textInput");
const charCount = document.getElementById("charCount");
const wordCount = document.getElementById("wordCount");
const sentenceCount = document.getElementById("sentenceCount");
const frequencyTable = document.getElementById("frequencyTable");

function update() {
  const stats = getTextStatistics(textInput.value);

  charCount.textContent = stats.characterCount;
  wordCount.textContent = stats.wordCount;
  sentenceCount.textContent = stats.sentenceCount;

  frequencyTable.innerHTML = "";

  if (stats.letterFrequency.length === 0) {
    frequencyTable.innerHTML =
      '<p class="freq-empty">No letters found</p>';
    return;
  }

  const maxCount = stats.letterFrequency[0].count;

  for (const entry of stats.letterFrequency) {
    const div = document.createElement("div");
    div.className = "freq-entry";

    const pct = (entry.count / maxCount) * 100;

    div.innerHTML = `
      <span class="freq-letter">${entry.letter}</span>
      <div class="freq-bar">
        <div class="freq-bar-fill" style="width: ${pct}%"></div>
      </div>
      <span class="freq-count">${entry.count} (${entry.percentage}%)</span>
    `;

    frequencyTable.appendChild(div);
  }
}

textInput.addEventListener("input", update);
update();
