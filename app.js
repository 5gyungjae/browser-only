const refreshButton = document.querySelector("#refreshButton");
const statusText = document.querySelector("#statusText");
const cards = document.querySelector("#cards");
const cardTemplate = document.querySelector("#cardTemplate");

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

    cards.appendChild(fragment);
  });
}

function regenerate() {
  refreshButton.disabled = true;
  statusText.textContent = "번호를 만드는 중...";

  window.requestAnimationFrame(() => {
    const pool = createPool();
    const picks = drawFive(pool);
    renderCards(picks);
    statusText.textContent = "새 번호 생성 완료";
    refreshButton.disabled = false;
  });
}

refreshButton.addEventListener("click", regenerate);
regenerate();
