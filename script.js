// ================= FIRESTORE LOGGER =================
function logEvent(action, detail = "") {
  if (!window.db) return;
  db.collection("events").add({
    action,
    detail,
    time: new Date()
  });
}

// ================= ELEMENTS =================
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const questionText = document.getElementById("question");
const quotesBox = document.getElementById("quotesBox");
const quoteText = document.getElementById("quoteText");
const nextQuoteBtn = document.getElementById("nextQuote");

// ================= STATE =================
let escapeCount = 0;
let quoteIndex = 0;
let storyStarted = false;

// ================= QUOTES =================
const quotes = [
  "I saved these words because every one of them reminded me of you.",
  "Some people arrive quietly and change everything.",
  "If care had a face, it would look like you.",
  "Even ordinary days feel special when I think of you."
];

// ================= INITIAL UI =================
quotesBox.style.display = "none";
nextQuoteBtn.style.display = "none";

// ================= NO BUTTON (SAFE ESCAPE) =================
noBtn.addEventListener("mouseover", () => {
  if (storyStarted) return;
  if (escapeCount >= 3) return;

  const bodyRect = document.body.getBoundingClientRect();

  // Safe movement area (lower half, away from text)
  const minX = 20;
  const maxX = bodyRect.width - 140;
  const minY = bodyRect.height * 0.55;
  const maxY = bodyRect.height - 100;

  const x = Math.random() * (maxX - minX) + minX;
  const y = Math.random() * (maxY - minY) + minY;

  noBtn.style.position = "absolute";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  escapeCount++;
  logEvent("NO_HOVER", `Escape ${escapeCount}`);
});

// ================= YES BUTTON =================
yesBtn.addEventListener("click", () => {
  logEvent("YES_CLICKED", "Accepted");

  questionText.innerText = "You just made this moment special 💖";
  yesBtn.style.display = "none";
  noBtn.style.display = "none";

  startStory();
});

// ================= NO CLICK (START STORY AFTER 3) =================
noBtn.addEventListener("click", () => {
  if (storyStarted) return;

  escapeCount++;
  logEvent("NO_CLICKED", `Count ${escapeCount}`);

  if (escapeCount >= 3) {
    startStory();
  }
});

// ================= STORY START =================
function startStory() {
  if (storyStarted) return;
  storyStarted = true;

  questionText.innerText = "Just read this once…";
  quotesBox.style.display = "block";
  nextQuoteBtn.style.display = "inline-block";

  quoteIndex = 0;
  showNextQuote();
}

// ================= NEXT QUOTE =================
nextQuoteBtn.addEventListener("click", showNextQuote);

function showNextQuote() {
  if (quoteIndex < quotes.length) {
    quoteText.innerText = quotes[quoteIndex];
    logEvent("QUOTE_SHOWN", quotes[quoteIndex]);
    quoteIndex++;
  } else {
    // Final safe end (no undefined)
    quoteText.innerText =
      "That’s all I wanted to say 🙂\n\nWill you be my Valentine? ❤️";
    nextQuoteBtn.style.display = "none";
    logEvent("STORY_END", "Completed");
  }
}
