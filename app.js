const refreshButton = document.querySelector("#refreshButton");
const cards = document.querySelector("#cards");
const cardTemplate = document.querySelector("#cardTemplate");
let currentPicks = [];

function colorClass(number) {
  if (number <= 10) return "range-1";
  if (number <= 20) return "range-2";
  if (number <= 30) return "range-3";
  if (number <= 40) return "range-4";
  return "range-5";
}

function generateCombo() {
  const numbers = Array.from({ length: 45 }, (_, index) => index + 1);
  for (let index = numbers.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [numbers[index], numbers[swapIndex]] = [numbers[swapIndex], numbers[index]];
  }
  return numbers.slice(0, 6).sort((a, b) => a - b);
}

function createPool() {
  return Array.from({ length: 100 }, () => generateCombo());
}

function drawFive(pool) {
  return Array.from({ length: 5 }, () => pool[Math.floor(Math.random() * pool.length)]);
}

function serializePicks(picks) {
  return picks.map((numbers) => numbers.join(".")).join("-");
}

function parsePicks(value) {
  if (!value) return null;

  const groups = value.split("-").filter(Boolean);
  if (groups.length !== 5) return null;

  const parsed = groups.map((group) =>
    group
      .split(".")
      .map((number) => Number.parseInt(number, 10))
      .filter((number) => Number.isInteger(number) && number >= 1 && number <= 45)
      .sort((a, b) => a - b),
  );

  const isValid = parsed.every((numbers) => numbers.length === 6);
  return isValid ? parsed : null;
}

function updateUrl(picks) {
  const url = new URL(window.location.href);
  url.searchParams.set("picks", serializePicks(picks));
  window.history.replaceState({}, "", url);
}

function pickText(numbers) {
  return numbers.join(", ");
}

async function copyText(text) {
  await navigator.clipboard.writeText(text);
}

async function shareNumbers(numbers) {
  const shareUrl = window.location.href;
  const shareText = `로또번호추천\n${pickText(numbers)}`;

  if (navigator.share) {
    await navigator.share({
      title: "로또번호추천",
      text: shareText,
      url: shareUrl,
    });
    return;
  }

  await copyText(`${shareText}\n${shareUrl}`);
}

function renderCards(items) {
  cards.replaceChildren();

  items.forEach((numbers, index) => {
    const fragment = cardTemplate.content.cloneNode(true);
    fragment.querySelector(".rank").textContent = `${index + 1}번째 추천`;

    const balls = fragment.querySelector(".balls");
    numbers.forEach((number) => {
      const ball = document.createElement("span");
      ball.className = `ball ${colorClass(number)}`;
      ball.textContent = number;
      balls.appendChild(ball);
    });

    fragment.querySelector(".card-copy").addEventListener("click", async () => {
      try {
        await copyText(pickText(numbers));
      } catch (error) {
      }
    });

    fragment.querySelector(".card-share").addEventListener("click", async () => {
      try {
        await shareNumbers(numbers);
      } catch (error) {
      }
    });

    cards.appendChild(fragment);
  });
}

function regenerate() {
  refreshButton.disabled = true;

  window.requestAnimationFrame(() => {
    const pool = createPool();
    const picks = drawFive(pool);
    currentPicks = picks;
    updateUrl(picks);
    renderCards(picks);
    refreshButton.disabled = false;
  });
}

refreshButton.addEventListener("click", regenerate);

const initialPicks = parsePicks(new URL(window.location.href).searchParams.get("picks"));
if (initialPicks) {
  currentPicks = initialPicks;
  renderCards(initialPicks);
} else {
  regenerate();
}
