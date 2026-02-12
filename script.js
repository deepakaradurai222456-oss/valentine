// ================= FIRESTORE LOGGER =================
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
let noCount = 0;
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

// ================= YES BUTTON =================
yesBtn.addEventListener("click", () => {
  logEvent("YES_CLICKED");

  questionText.innerText = "You just made my day 💖";
  yesBtn.style.display = "none";
  noBtn.style.display = "none";

  startStory();
});

// ================= NO BUTTON (MOBILE-SAFE) =================
noBtn.addEventListener("click", () => {
  if (storyStarted) return;

  noCount++;
  logEvent("NO_CLICKED", `Count ${noCount}`);

  if (noCount < 3) {
    // Gentle feedback instead of moving
    questionText.innerText =
      noCount === 1
        ? "Are you sure? 🙂"
        : "Still thinking? 😄";
  } else {
    startStory();
  }
});

// ================= STORY START =================
function startStory() {
  if (storyStarted) return;
  storyStarted = true;

  noBtn.style.display = "none";

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
    quoteText.innerText =
      "That’s all I wanted to say 🙂\n\nWill you be my Valentine? ❤️";
    nextQuoteBtn.style.display = "none";
    logEvent("STORY_END");
  }
}
