const tg = window.Telegram?.WebApp;
if (tg) {
  tg.expand();
  tg.setHeaderColor('#2e3192');
  tg.setBackgroundColor('#1b1464');
} else {
  console.log("Running outside Telegram (dev mode)");
}

// === Елементи ===
const introStage   = document.getElementById('stage-intro');
const shuffleStage = document.getElementById('stage-shuffle');
const pickStage    = document.getElementById('stage-pick');

const btnShuffle   = document.getElementById('btn-shuffle');
const cardsWrap    = document.getElementById('cards');
const cardTitle    = document.getElementById('card-title');
const sendBlock    = document.getElementById('send-block');
const btnSend      = document.getElementById('btn-send');

const cardModal    = document.getElementById('card-modal');
const cardModalImg = document.getElementById('card-modal-img');

const shuffleAudio = document.getElementById('shuffle-audio');
const flipAudio    = document.getElementById('flip-audio');

if (flipAudio) {
  flipAudio.volume = 0.25;
}

// === Карти (повна мапа) ===
const CARD_MAP = {
  "The Fool": { ua: "🤹‍♂️ Блазень", img: "images/cards/the_fool_upright.jpg" },
  "The Magician": { ua: "🪄 Маг", img: "images/cards/the_magician_upright.jpg" },
  "The High Priestess": { ua: "🌙 Жриця", img: "images/cards/the_high_priestess_upright.jpg" },
  "The Empress": { ua: "🌸 Імператриця", img: "images/cards/the_empress_upright.jpg" },
  "The Emperor": { ua: "👑 Імператор", img: "images/cards/the_emperor_upright.jpg" },
  "The Hierophant": { ua: "📜 Ієрофант", img: "images/cards/the_hierophant_upright.jpg" },
  "The Lovers": { ua: "💞 Закохані", img: "images/cards/the_lovers_upright.jpg" },
  "The Chariot": { ua: "🚗 Колісниця", img: "images/cards/the_chariot_upright.jpg" },
  "Strength": { ua: "🦁 Сила", img: "images/cards/strength_upright.jpg" },
  "The Hermit": { ua: "🕯 Відлюдник", img: "images/cards/the_hermit_upright.jpg" },
  "Wheel of Fortune": { ua: "🎡 Колесо Фортуни", img: "images/cards/wheel_of_fortune_upright.jpg" },
  "Justice": { ua: "⚖️ Справедливість", img: "images/cards/justice_upright.jpg" },
  "The Hanged Man": { ua: "🪶 Повішений", img: "images/cards/the_hanged_man_upright.jpg" },
  "Death": { ua: "💀 Смерть", img: "images/cards/death_upright.jpg" },
  "Temperance": { ua: "🌈 Помірність", img: "images/cards/temperance_upright.jpg" },
  "The Devil": { ua: "😈 Диявол", img: "images/cards/the_devil_upright.jpg" },
  "The Tower": { ua: "🏰 Вежа", img: "images/cards/the_tower_upright.jpg" },
  "The Star": { ua: "⭐ Зірка", img: "images/cards/the_star_upright.jpg" },
  "The Moon": { ua: "🌕 Місяць", img: "images/cards/the_moon_upright.jpg" },
  "The Sun": { ua: "🌞 Сонце", img: "images/cards/the_sun_upright.jpg" },
  "Judgement": { ua: "🎺 Суд", img: "images/cards/judgement_upright.jpg" },
  "The World": { ua: "🌍 Світ", img: "images/cards/the_world_upright.jpg" },

  // WANDS
  "Ace of Wands": { ua: "🔥 Туз Жезлів", img: "images/cards/wands_ace.jpg" },
  "Two of Wands": { ua: "🔥 Двійка Жезлів", img: "images/cards/wands_2.jpg" },
  "Three of Wands": { ua: "🔥 Трійка Жезлів", img: "images/cards/wands_3.jpg" },
  "Four of Wands": { ua: "🔥 Четвірка Жезлів", img: "images/cards/wands_4.jpg" },
  "Five of Wands": { ua: "🔥 П’ятірка Жезлів", img: "images/cards/wands_5.jpg" },
  "Six of Wands": { ua: "🔥 Шістка Жезлів", img: "images/cards/wands_6.jpg" },
  "Seven of Wands": { ua: "🔥 Сімка Жезлів", img: "images/cards/wands_7.jpg" },
  "Eight of Wands": { ua: "🔥 Вісімка Жезлів", img: "images/cards/wands_8.jpg" },
  "Nine of Wands": { ua: "🔥 Дев’ятка Жезлів", img: "images/cards/wands_9.jpg" },
  "Ten of Wands": { ua: "🔥 Десятка Жезлів", img: "images/cards/wands_10.jpg" },
  "Page of Wands": { ua: "🔥 Паж Жезлів", img: "images/cards/wands_page.jpg" },
  "Knight of Wands": { ua: "🔥 Лицар Жезлів", img: "images/cards/wands_knight.jpg" },
  "Queen of Wands": { ua: "🔥 Королева Жезлів", img: "images/cards/wands_queen.jpg" },
  "King of Wands": { ua: "🔥 Король Жезлів", img: "images/cards/wands_king.jpg" },

  // PENTACLES
  "Ace of Pentacles": { ua: "⭐ Туз Пентаклів", img: "images/cards/pentacles_ace.jpg" },
  "Two of Pentacles": { ua: "⭐ Двійка Пентаклів", img: "images/cards/pentacles_2.jpg" },
  "Three of Pentacles": { ua: "⭐ Трійка Пентаклів", img: "images/cards/pentacles_3.jpg" },
  "Four of Pentacles": { ua: "⭐ Четвірка Пентаклів", img: "images/cards/pentacles_4.jpg" },
  "Five of Pentacles": { ua: "⭐ П’ятірка Пентаклів", img: "images/cards/pentacles_5.jpg" },
  "Six of Pentacles": { ua: "⭐ Шістка Пентаклів", img: "images/cards/pentacles_6.jpg" },
  "Seven of Pentacles": { ua: "⭐ Сімка Пентаклів", img: "images/cards/pentacles_7.jpg" },
  "Eight of Pentacles": { ua: "⭐ Вісімка Пентаклів", img: "images/cards/pentacles_8.jpg" },
  "Nine of Pentacles": { ua: "⭐ Дев’ятка Пентаклів", img: "images/cards/pentacles_9.jpg" },
  "Ten of Pentacles": { ua: "⭐ Десятка Пентаклів", img: "images/cards/pentacles_10.jpg" },
  "Page of Pentacles": { ua: "⭐ Паж Пентаклів", img: "images/cards/pentacles_page.jpg" },
  "Knight of Pentacles": { ua: "⭐ Лицар Пентаклів", img: "images/cards/pentacles_knight.jpg" },
  "Queen of Pentacles": { ua: "⭐ Королева Пентаклів", img: "images/cards/pentacles_queen.jpg" },
  "King of Pentacles": { ua: "⭐ Король Пентаклів", img: "images/cards/pentacles_king.jpg" },

  // SWORDS
  "Ace of Swords": { ua: "⚔️ Туз Мечів", img: "images/cards/swords_ace.jpg" },
  "Two of Swords": { ua: "⚔️ Двійка Мечів", img: "images/cards/swords_2.jpg" },
  "Three of Swords": { ua: "⚔️ Трійка Мечів", img: "images/cards/swords_3.jpg" },
  "Four of Swords": { ua: "⚔️ Четвірка Мечів", img: "images/cards/swords_4.jpg" },
  "Five of Swords": { ua: "⚔️ П’ятірка Мечів", img: "images/cards/swords_5.jpg" },
  "Six of Swords": { ua: "⚔️ Шістка Мечів", img: "images/cards/swords_6.jpg" },
  "Seven of Swords": { ua: "⚔️ Сімка Мечів", img: "images/cards/swords_7.jpg" },
  "Eight of Swords": { ua: "⚔️ Вісімка Мечів", img: "images/cards/swords_8.jpg" },
  "Nine of Swords": { ua: "⚔️ Дев’ятка Мечів", img: "images/cards/swords_9.jpg" },
  "Ten of Swords": { ua: "⚔️ Десятка Мечів", img: "images/cards/swords_10.jpg" },
  "Page of Swords": { ua: "⚔️ Паж Мечів", img: "images/cards/swords_page.jpg" },
  "Knight of Swords": { ua: "⚔️ Лицар Мечів", img: "images/cards/swords_knight.jpg" },
  "Queen of Swords": { ua: "⚔️ Королева Мечів", img: "images/cards/swords_queen.jpg" },
  "King of Swords": { ua: "⚔️ Король Мечів", img: "images/cards/swords_king.jpg" },

  // CUPS
  "Ace of Cups": { ua: "💧 Туз Кубків", img: "images/cards/cups_ace.jpg" },
  "Two of Cups": { ua: "💧 Двійка Кубків", img: "images/cards/cups_2.jpg" },
  "Three of Cups": { ua: "💧 Трійка Кубків", img: "images/cards/cups_3.jpg" },
  "Four of Cups": { ua: "💧 Четвірка Кубків", img: "images/cards/cups_4.jpg" },
  "Five of Cups": { ua: "💧 П’ятірка Кубків", img: "images/cards/cups_5.jpg" },
  "Six of Cups": { ua: "💧 Шістка Кубків", img: "images/cards/cups_6.jpg" },
  "Seven of Cups": { ua: "💧 Сімка Кубків", img: "images/cards/cups_7.jpg" },
  "Eight of Cups": { ua: "💧 Вісімка Кубків", img: "images/cards/cups_8.jpg" },
  "Nine of Cups": { ua: "💧 Дев’ятка Кубків", img: "images/cards/cups_9.jpg" },
  "Ten of Cups": { ua: "💧 Десятка Кубків", img: "images/cards/cups_10.jpg" },
  "Page of Cups": { ua: "💧 Паж Кубків", img: "images/cards/cups_page.jpg" },
  "Knight of Cups": { ua: "💧 Лицар Кубків", img: "images/cards/cups_knight.jpg" },
  "Queen of Cups": { ua: "💧 Королева Кубків", img: "images/cards/cups_queen.jpg" },
  "King of Cups": { ua: "💧 Король Кубків", img: "images/cards/cups_king.jpg" }
};

const TAROT = Object.keys(CARD_MAP);
const MAX_SELECTED = 7;
const POOL_SIZE = 12;

const state = {
  cards: [],
  selectedIndices: []
};

// === Хелпери ===
function setStage(stage) {
  [introStage, shuffleStage, pickStage].forEach(el => el.classList.add('hidden'));
  stage.classList.remove('hidden');
  stage.classList.add('fade');
}

function getRandomCards(count) {
  const pool = [...TAROT];
  const result = [];
  for (let i = 0; i < count; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    const name = pool.splice(idx, 1)[0];
    result.push({ name, upright: Math.random() > 0.3 });
  }
  return result;
}

function createCardNode(cardData, index) {
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.index = String(index);
  card.style.animationDelay = (Math.random() * 1.5).toFixed(2) + 's';

  const inner = document.createElement('div');
  inner.className = 'card-inner';

  const back = document.createElement('div');
  back.className = 'face back';

  const front = document.createElement('div');
  front.className = 'face front';
  front.style.backgroundImage = `url('${CARD_MAP[cardData.name].img}')`;
  if (!cardData.upright) {
    front.classList.add('reversed');
  }

  inner.append(back, front);
  card.append(inner);

  card.addEventListener('click', () => handleCardClick(index, card));

  return card;
}

// === Клік по карті ===
function handleCardClick(index, node) {
  if (state.selectedIndices.includes(index)) return;
  if (state.selectedIndices.length >= MAX_SELECTED) return;

  state.selectedIndices.push(index);

  if (flipAudio) {
    flipAudio.currentTime = 0;
    flipAudio.play().catch(() => {});
  }

  node.classList.add('flip', 'revealed');

  const left = MAX_SELECTED - state.selectedIndices.length;
  if (left > 0) {
    if (left === 1) {
      cardTitle.textContent = "Обери ще 1 карту";
    } else {
      cardTitle.textContent = `Обери ще ${left} карт`;
    }
    return;
  }

  // після 7-ї карти даємо фліпу дограти
  setTimeout(finalizeSelection, 700);
}

function finalizeSelection() {
  cardTitle.textContent = "Твої 7 карт:";

  // Правильний порядок обраних карт (по клікам)
  const chosenOrdered = state.selectedIndices.map(i => ({
    index: i,
    data: state.cards[i]
  }));

  // Відобразити назви
  const namesDiv = document.getElementById("selected-names");
  if (namesDiv) {
    namesDiv.innerHTML = chosenOrdered
      .map(obj => `<div>${CARD_MAP[obj.data.name].ua}</div>`)
      .join("");
    namesDiv.classList.remove("hidden");
  }

  const allNodes = Array.from(document.querySelectorAll(".card"));

  allNodes.forEach(node => {
    const idx = Number(node.dataset.index);
    if (state.selectedIndices.includes(idx)) {
      node.classList.add("revealed");
      node.classList.remove("dimmed");
    } else {
      node.classList.add("dimmed");
      node.style.opacity = "0";
      node.style.transform = "scale(0.9)";
      setTimeout(() => node.remove(), 400);
    }
  });

  // Додати можливість збільшувати карту після вибору
  state.selectedIndices.forEach(idx => {
    const node = document.querySelector(`.card[data-index="${idx}"]`);
    if (!node) return;
    const cardData = state.cards[idx];
    node.addEventListener('click', () => openCardModal(cardData));
  });

  // Показати кнопку "Зробити розклад"
  sendBlock.style.display = "flex";
  requestAnimationFrame(() => sendBlock.classList.add("visible"));
}

// === Старт сцени вибору 12 карт ===
function startPickStage() {
  state.cards = getRandomCards(POOL_SIZE);
  state.selectedIndices = [];

  cardsWrap.innerHTML = '';
  cardsWrap.style.height = '';

  sendBlock.classList.remove('visible');
  sendBlock.style.display = "none";

  const namesDiv = document.getElementById("selected-names");
  if (namesDiv) {
    namesDiv.innerHTML = '';
    namesDiv.classList.add('hidden');
  }

  cardTitle.textContent = "Довірся своїй інтуїції та обери 7 карт";

  state.cards.forEach((c, i) => {
    cardsWrap.appendChild(createCardNode(c, i));
  });

  setStage(pickStage);
}

// === Обробники ===
btnShuffle.addEventListener('click', () => {
  setStage(shuffleStage);

  if (shuffleAudio) {
    shuffleAudio.currentTime = 0;
    shuffleAudio.play().catch(() => {});
  }

  // даємо анімації тасування відпрацювати
  setTimeout(() => {
    if (shuffleAudio) {
      shuffleAudio.pause();
      shuffleAudio.currentTime = 0;
    }
    startPickStage();
  }, 1800);
});

btnSend.addEventListener('click', () => {
  const chosen = state.selectedIndices.map(i => state.cards[i]);

  const payload = {
    action: "seven_cards",
    chosen,
    candidates: state.cards
  };

  if (tg) {
    tg.sendData(JSON.stringify(payload));
    tg.close();
  } else {
    alert("DEBUG payload:\n" + JSON.stringify(payload, null, 2));
  }
});

// === Модалка карти ===
function openCardModal(cardData) {
  if (!cardModal || !cardModalImg) return;

  const info = CARD_MAP[cardData.name];
  if (!info) return;

  cardModalImg.src = info.img;
  cardModalImg.style.transform = cardData.upright ? 'none' : 'rotate(180deg)';
  cardModal.classList.remove('hidden');
}

function closeCardModal() {
  if (!cardModal) return;
  cardModal.classList.add('hidden');
}

if (cardModal) {
  cardModal.addEventListener('click', closeCardModal);
}

// Стартова сцена
setStage(introStage);
