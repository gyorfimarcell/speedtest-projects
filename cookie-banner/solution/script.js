const cookieBanner = document.getElementById("cookieBanner");
const acceptAllBtn = document.getElementById("acceptAll");
const acceptNecessaryBtn = document.getElementById("acceptNecessary");

const cookieSettings = document.getElementById("cookieSettings");
const functionalCheckbox = document.getElementById("functional");
const marketingCheckbox = document.getElementById("marketing");
const saveBtn = document.getElementById("saveBtn");

let consent = null;

function init() {
  // Load saved consent settings
  const saved = localStorage.getItem("consent");
  if (saved != null) {
    consent = JSON.parse(saved);
    functionalCheckbox.checked = consent.includes("functional");
    marketingCheckbox.checked = consent.includes("marketing");
  } else {
    cookieBanner.showPopover();
  }

  // Set event handlers
  acceptAllBtn.addEventListener("click", () => {
    setCookies(["necessary", "functional", "marketing"]);
  });
  acceptNecessaryBtn.addEventListener("click", () => {
    setCookies(["necessary"]);
  });
  saveBtn.addEventListener("click", saveSettings);
}

// Save cookie settings to localstorage and close popovers
function setCookies(accepted) {
  consent = accepted;
  localStorage.setItem("consent", JSON.stringify(consent));

  cookieBanner.hidePopover();
  cookieSettings.hidePopover();

  functionalCheckbox.checked = consent.includes("functional");
  marketingCheckbox.checked = consent.includes("marketing");
}

// Save cookie settings popover
function saveSettings() {
  let newConsent = ["necessary"];
  if (functionalCheckbox.checked) {
    newConsent.push("functional");
  }
  if (marketingCheckbox.checked) {
    newConsent.push("marketing");
  }

  setCookies(newConsent);
}

init();
