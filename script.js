// ---------- FIRESTORE LOG HELPER ----------
function logEvent(action, detail = "") {
  if (!window.db) return;
  db.collection("events").add({
    action: action,
    detail: detail,
    time: new Date()
  });
}

// ---------- ELEMENTS ----------
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const quotesBox = document.getElementById("quotesBox");
const quoteText = document.getElementById("quoteText");
const nextQuote = document.getElementById("nextQuote");

// ---------- STATE ----------
let escapeCount = 0;
let quoteIndex = 0;

// ---------- QUOTES (EDIT FREELY) ----------
const quotes = [
  "I saved these words because every one of them reminded me of you.",
  "Some people arrive quietly and change everything.",
  "If care had a face, it would look like you.",
  "Even ordinary days feel special when I think of you."
];

// ---------- PAGE LOAD ----------
window.addEventListener("load", () => {
  logEvent("PAGE_OPENED");
});

// ---------- NO BUTTON RUNS AWAY ----------
noBtn.addEventListener("click", () => {
  if (escapeCount < 3) {
    const x = Math.random() * (window.innerWidth - 120);
    const y = Math.random() * (window.innerHeight - 120);

    noBtn.style.position = "absolute";
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;

    escapeCount++;
    logEvent("NO_ESCAPED", `count=${escapeCount}`);
  }

  if (escapeCount === 3) {
    showQuotes();
  }
});

// ---------- SHOW QUOTES ----------
function showQuotes() {
  quotesBox.classList.remove("hidden");
  quoteText.innerText = quotes[quoteIndex];
  logEvent("QUOTES_OPENED");
}

// ---------- NEXT QUOTE ----------
nextQuote.addEventListener("click", () => {
  quoteIndex++;

  if (quoteIndex < quotes.length) {
    quoteText.innerText = quotes[quoteIndex];
    logEvent("QUOTE_VIEWED", `index=${quoteIndex}`);
  } else {
    quoteText.innerText = "That’s all I wanted you to see ❤️";
    nextQuote.style.display = "none";
    logEvent("QUOTES_COMPLETED");
  }
});

// ---------- YES CLICK ----------
yesBtn.addEventListener("click", () => {
  logEvent("YES_CLICKED");
  alert("💖 You just made my day 💖");
});
