// ================= FIRESTORE LOGGER =================
function logEvent(action, detail = "") {
  if (!window.db) return;
  db.collection("events").add({
    action: action,
    detail: detail,
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

// ================= NO BUTTON LOGIC =================
noBtn.addEventListener("mouseover", () => {
  if (storyStarted) return;
  if (escapeCount >= 3) return;

  const x = Math.random() * (window.innerWidth - 120);
  const y = Math.random() * (window.innerHeight - 60);

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

// ================= AFTER 3 NO CLICKS =================
noBtn.addEventListener("click", () => {
  escapeCount++;
  logEvent("NO_CLICKED", `Count ${escapeCount}`);

  if (escapeCount >= 3 && !storyStarted) {
    startStory();
  }
});

// ================= STORY START =================
function startStory() {
  storyStarted = true;

  questionText.innerText = "Just read this once…";
  quotesBox.style.display = "block";
  nextQuoteBtn.style.display = "inline-block";

  showNextQuote();
}

// ================= NEXT QUOTE =================
nextQuoteBtn.addEventListener("click", () => {
  showNextQuote();
});

function showNextQuote() {
  if (quoteIndex < quotes.length) {
    quoteText.innerText = quotes[quoteIndex];
    logEvent("QUOTE_SHOWN", quotes[quoteIndex]);
    quoteIndex++;
  } else {
    // FINAL END — NO UNDEFINED EVER
    quoteText.innerText =
      "That’s all I wanted to say 🙂\n\nWill you be my Valentine? ❤️";
    nextQuoteBtn.style.display = "none";
    logEvent("STORY_END", "Completed");
  }
}
