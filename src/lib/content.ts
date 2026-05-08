// src/lib/content.ts

export const EUPHEMISMS_THEORY =[
  {
    term: "Euphemism (Эвфемизм)",
    definition: "Мягкое, нейтральное или вежливое слово, используемое вместо грубого, непристойного или болезненного. Эвфемизмы помогают избегать конфликтов и проявлять тактичность.",
    color: "green"
  },
  {
    term: "Dysphemism (Дисфемизм)",
    definition: "Грубое, пренебрежительное или оскорбительное выражение, заменяющее нейтральное. Часто используется для выражения злости, сарказма или шокирования собеседника.",
    color: "red"
  }
];

export const FILL_IN_GAPS_QUESTIONS =[
  {
    id: 1,
    task: "Выберите деликатный эвфемизм, чтобы не обидеть человека:",
    textBefore: "Due to the economic crisis, the company had to",
    textAfter: "several employees.",
    options: ["sack", "let go", "boot out"],
    correctAnswer: "let go",
    explanation: "'Let go' (отпустить) звучит гораздо мягче и снимает личную вину с работника."
  },
  {
    id: 2,
    task: "Выберите дисфемизм, чтобы передать злость спикера:",
    textBefore: "I'm not just poor, I am completely",
    textAfter: "right now!",
    options: ["underprivileged", "low-income", "broke"],
    correctAnswer: "broke",
    explanation: "'Broke' — резкое разговорное слово, отлично передающее эмоцию."
  },
  {
    id: 3,
    task: "Подберите корректный эвфемизм для пожилого человека:",
    textBefore: "My grandfather is a",
    textAfter: "who enjoys gardening.",
    options: ["senior citizen", "geezer", "old fogey"],
    correctAnswer: "senior citizen",
    explanation: "'Senior citizen' — уважительный термин, принятый в официальной речи."
  },
  {
    id: 4,
    task: "Выберите дисфемизм для описания тюрьмы:",
    textBefore: "He was caught stealing and sent straight to the",
    textAfter: "for 5 years.",
    options: ["correctional facility", "slammer", "detention center"],
    correctAnswer: "slammer",
    explanation: "'Slammer' (кутузка) — жаргонное название тюрьмы с грубым оттенком."
  },
  {
    id: 5,
    task: "Выберите эвфемизм, скрывающий тяжесть ситуации:",
    textBefore: "The army announced a",
    textAfter: "to avoid being completely destroyed.",
    options: ["fleeing", "strategic withdrawal", "running away"],
    correctAnswer: "strategic withdrawal",
    explanation: "'Strategic withdrawal' (стратегическое отступление) превращает поражение в тактический манёвр."
  }
];

export const QUIZ_QUESTIONS =[
  {
    id: 1,
    question: "Какое из этих слов является дисфемизмом для слова 'Умереть'?",
    options:["Pass away", "Depart this world", "Kick the bucket", "Rest in peace"],
    correct: 2,
    explanation: "'Kick the bucket' (сыграть в ящик) — грубое, почти комичное отношение к смерти."
  },
  {
    id: 2,
    question: "Как деликатно (эвфемизмом) назвать человека без денег?",
    options: ["Broke", "Underprivileged", "Penniless", "Flat broke"],
    correct: 1,
    explanation: "'Underprivileged' переносит фокус на социальные условия, смягчая звучание."
  },
  {
    id: 3,
    question: "Что из этого является дисфемизмом к слову 'Уволен'?",
    options:["Sacked", "Let go", "Made redundant", "Downsized"],
    correct: 0,
    explanation: "'Sacked' — это грубое и резкое слово. Остальные — корпоративные эвфемизмы."
  },
  {
    id: 4,
    question: "Какой эвфемизм лучше использовать вместо 'Stupid' (Глупый)?",
    options:["Thick", "Dimwit", "Not academically inclined", "Scatterbrained"],
    correct: 2,
    explanation: "'Not academically inclined' мягко описывает трудности в обучении, не переходя на личности."
  },
  {
    id: 5,
    question: "Что означает дисфемизм 'Pigheaded'?",
    options:["Доверчивый", "Упёртый как баран (Упрямый)", "Рассеянный", "Ленивый"],
    correct: 1,
    explanation: "Это крайне оскорбительное сравнение со свиньей, означающее крайнее упрямство."
  }
];