const refreshButton = document.querySelector("#refreshButton");
const cards = document.querySelector("#cards");
const cardTemplate = document.querySelector("#cardTemplate");
const toast = document.querySelector("#toast");
let currentPicks = [];
let toastTimer = null;

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

function shareMessage(numbers) {
  return [
    "추천하는 로또번호입니다!",
    pickText(numbers),
    "로또 번호는 https://lotto.twistcompany.co.kr",
  ].join("\n");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");

  if (toastTimer) {
    window.clearTimeout(toastTimer);
  }

  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 1400);
}

function legacyCopyText(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.top = "-9999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  const success = document.execCommand("copy");
  document.body.removeChild(textArea);

  if (!success) {
    throw new Error("legacy copy failed");
  }
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  legacyCopyText(text);
}

async function shareNumbers(numbers) {
  const shareUrl = window.location.href;
  const shareText = shareMessage(numbers);
  if (navigator.share) {
    try {
      await navigator.share({
        title: "로또번호추천",
        text: shareText,
        url: shareUrl,
      });
      return;
    } catch (error) {
      if (error && error.name === "AbortError") {
        throw error;
      }
    }
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
        await copyText(shareMessage(numbers));
        showToast("복사되었습니다.");
      } catch (error) {
        showToast("복사에 실패했어요");
      }
    });

    fragment.querySelector(".card-share").addEventListener("click", async () => {
      try {
        await shareNumbers(numbers);
        showToast("공유되었습니다.");
      } catch (error) {
        showToast("공유를 취소했거나 실패했어요");
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
    showToast("새 번호가 생성되었습니다.");
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
