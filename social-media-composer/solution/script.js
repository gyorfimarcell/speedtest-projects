const textarea = document.getElementById("text");
const counter = document.getElementById("counter");
const chars = document.getElementById("chars");
const button = document.getElementById("post");

function checkLength() {
  const length = textarea.value.length;
  chars.innerText = length;

  counter.classList.remove("over", "warning");
  button.disabled = false;

  if (length > 140) {
    counter.classList.add("over");
    button.disabled = true;
  } else if (length >= 120) {
    counter.classList.add("warning");
  } else if (length === 0) {
    button.disabled = true;
  }
}

textarea.addEventListener("input", (e) => {
  checkLength();
});

button.addEventListener("click", () => {
  textarea.readOnly = true;
  button.innerText = "Posted!";
  button.classList.add("success");
  button.disabled = true;

  setTimeout(() => {
    textarea.value = "";
    checkLength();

    textarea.readOnly = false;
    button.innerText = "Post";
    button.classList.remove("success");
  }, 3000);
});
