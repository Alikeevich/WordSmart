// src/data/topicContent.ts
// Контент 12 тем для заданий с выбором темы.

export type TopicId =
  | 'death' | 'age' | 'poverty' | 'fired' | 'unemployed'
  | 'health' | 'appearance' | 'crime' | 'war'
  | 'intelligence' | 'relationships' | 'dishonesty';

export interface FillInGapsQ {
  id: number;
  textBefore: string;
  textAfter: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface QuizQ {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation?: string;
}

export interface SortingWord {
  word: string;
  type: 'euphemism' | 'dysphemism';
}

export interface MatchingPair {
  id: number;
  left: string;   // neutral
  right: string;  // euphemism
}

export interface TopicContent {
  id: TopicId;
  emoji: string;
  nameEn: string;
  nameRu: string;
  description: string;
  color: 'rose' | 'amber' | 'emerald' | 'indigo' | 'violet' | 'cyan' | 'orange' | 'fuchsia' | 'sky' | 'slate';
  fillInGaps: FillInGapsQ[];
  quiz: QuizQ[];
  sortingWords: SortingWord[];
  matchingPairs: MatchingPair[];
}

// ════════════════════════════════════════════════════════════════
//   CONTENT FOR ALL 12 TOPICS
// ════════════════════════════════════════════════════════════════

export const topics: TopicContent[] = [
  // ── 1. DEATH ──────────────────────────────────────────────
  {
    id: 'death',
    emoji: '🕊️',
    nameEn: 'Death',
    nameRu: 'Смерть',
    description: 'How we talk about death — softly or harshly.',
    color: 'slate',
    fillInGaps: [
      { id: 1, textBefore: 'He ',  textAfter: ' peacefully last night.',  options: ['passed away', 'kicked the bucket'], correctAnswer: 'passed away',          explanation: '"Pass away" is a respectful euphemism for dying.' },
      { id: 2, textBefore: 'She ', textAfter: ' this world after a long life.', options: ['departed', 'croaked'],         correctAnswer: 'departed',             explanation: '"Depart this world" is a poetic, gentle phrase.' },
      { id: 3, textBefore: 'He went ', textAfter: '.',                    options: ['to a better place', 'to bite the dust'], correctAnswer: 'to a better place', explanation: '"Go to a better place" is a comforting religious euphemism.' },
      { id: 4, textBefore: 'He ', textAfter: ' his battle with illness.', options: ['lost', 'snuffed out'],                correctAnswer: 'lost',                 explanation: '"Lose one\'s battle" softens death from disease.' },
      { id: 5, textBefore: 'May he ', textAfter: ' in peace.',            options: ['rest', 'kick the bucket'],            correctAnswer: 'rest',                 explanation: '"Rest in peace" is the standard respectful phrase.' },
      { id: 6, textBefore: 'The old man ', textAfter: ' suddenly.',       options: ['snuffed it', 'passed away'],          correctAnswer: 'passed away',          explanation: 'The polite euphemism fits a respectful tone.' },
      { id: 7, textBefore: 'My grandfather ', textAfter: ' yesterday.',   options: ['croaked', 'departed this world'],     correctAnswer: 'departed this world',  explanation: 'When speaking of family, use respectful language.' },
      { id: 8, textBefore: 'Many soldiers ', textAfter: ' in the battle.', options: ['bit the dust', 'rested in peace'],   correctAnswer: 'bit the dust',         explanation: '"Bite the dust" is military slang for dying in combat.' },
    ],
    quiz: [
      { id: 1, question: '"Pass away" is…',           options: ['euphemism', 'dysphemism', 'insult'],         correct: 0, explanation: 'It\'s a soft, respectful way to say "die".' },
      { id: 2, question: '"Kick the bucket" means…',  options: ['die', 'sleep', 'run'],                       correct: 0, explanation: 'It\'s slang/dysphemism for dying.' },
      { id: 3, question: '"Depart this world" is…',   options: ['polite', 'rude', 'a joke'],                  correct: 0, explanation: 'A poetic, formal euphemism.' },
      { id: 4, question: '"Go to a better place" is…', options: ['religious euphemism', 'slang', 'insult'],   correct: 0, explanation: 'It implies an afterlife — soft and comforting.' },
      { id: 5, question: '"Rest in peace" is…',       options: ['respectful', 'rude', 'funny'],               correct: 0, explanation: 'Standard at funerals and memorials.' },
      { id: 6, question: '"Croak" is…',               options: ['euphemism', 'dysphemism', 'formal'],         correct: 1, explanation: 'A pretty rude slang term for dying.' },
      { id: 7, question: '"Snuff it" is…',            options: ['slang', 'formal', 'academic'],               correct: 0, explanation: 'British slang, informal and casual.' },
      { id: 8, question: '"Bite the dust" is…',       options: ['war slang', 'polite', 'medical'],            correct: 0, explanation: 'Comes from military and Western movies.' },
    ],
    sortingWords: [
      { word: 'pass away',           type: 'euphemism' },
      { word: 'depart this world',   type: 'euphemism' },
      { word: 'go to a better place', type: 'euphemism' },
      { word: "lose one's battle",   type: 'euphemism' },
      { word: 'rest in peace',       type: 'euphemism' },
      { word: 'kick the bucket',     type: 'dysphemism' },
      { word: 'croak',               type: 'dysphemism' },
      { word: 'snuff it',            type: 'dysphemism' },
      { word: 'bite the dust',       type: 'dysphemism' },
      { word: 'bought the farm',     type: 'dysphemism' },
    ],
    matchingPairs: [
      { id: 1, left: 'die',                 right: 'pass away' },
      { id: 2, left: 'die from illness',    right: "lose one's battle" },
      { id: 3, left: 'die (religious)',     right: 'go to a better place' },
      { id: 4, left: 'die (memorial)',      right: 'rest in peace' },
    ],
  },

  // ── 2. AGE ────────────────────────────────────────────────
  {
    id: 'age',
    emoji: '🧓',
    nameEn: 'Age',
    nameRu: 'Возраст',
    description: 'Talking about elderly people respectfully (or rudely).',
    color: 'amber',
    fillInGaps: [
      { id: 1, textBefore: 'He is a respected ', textAfter: '.',           options: ['senior citizen', 'geezer'],     correctAnswer: 'senior citizen', explanation: 'Official, respectful term.' },
      { id: 2, textBefore: 'These are the ',     textAfter: ' of life.',   options: ['golden years', 'over the hill'], correctAnswer: 'golden years',  explanation: 'Romanticizes old age as the best period.' },
      { id: 3, textBefore: 'He is no longer young, just ', textAfter: '.', options: ['mature', 'over the hill'],      correctAnswer: 'mature',         explanation: '"Mature" is respectful and emphasizes wisdom.' },
      { id: 4, textBefore: 'My grandmother is very ', textAfter: '.',      options: ['mature', 'ancient'],            correctAnswer: 'mature',         explanation: 'Speaking about family — use respectful language.' },
      { id: 5, textBefore: 'He is a ', textAfter: ' professional.',        options: ['seasoned', 'old fogey'],        correctAnswer: 'seasoned',       explanation: '"Seasoned" emphasizes experience, not age.' },
      { id: 6, textBefore: 'She is very ', textAfter: ' in her field.',    options: ['experienced', 'past it'],       correctAnswer: 'experienced',    explanation: 'Neutral, positive term.' },
      { id: 7, textBefore: 'The new intern is wet ', textAfter: '.',       options: ['behind the ears', 'in his prime'], correctAnswer: 'behind the ears', explanation: '"Wet behind the ears" = inexperienced/young.' },
      { id: 8, textBefore: 'Don\'t call him a ', textAfter: ' — be polite!', options: ['geezer', 'senior citizen'],   correctAnswer: 'geezer',         explanation: '"Geezer" is rude, that\'s why we shouldn\'t use it.' },
    ],
    quiz: [
      { id: 1, question: '"Senior citizen" is…',        options: ['euphemism', 'insult', 'slang'],            correct: 0, explanation: 'Official respectful term.' },
      { id: 2, question: '"Geezer" is…',                options: ['rude', 'polite', 'medical'],               correct: 0, explanation: 'A dismissive slang term for an old man.' },
      { id: 3, question: '"Golden years" means…',       options: ['retirement', 'childhood', 'work'],         correct: 0, explanation: 'A positive way to describe old age.' },
      { id: 4, question: '"Over the hill" is…',         options: ['insult', 'compliment', 'neutral'],         correct: 0, explanation: 'Implies the best years are behind.' },
      { id: 5, question: '"Mature" is…',                options: ['respectful', 'insult', 'joke'],            correct: 0, explanation: 'Emphasizes wisdom, not age.' },
      { id: 6, question: '"Ancient" used about a person is…', options: ['rude', 'compliment', 'modern'],     correct: 0, explanation: 'Comparing someone to history is mocking.' },
      { id: 7, question: '"Seasoned individual" is…',   options: ['experienced', 'lazy', 'child'],            correct: 0, explanation: 'Positive — emphasizes experience.' },
      { id: 8, question: '"Old fogey" is…',             options: ['insult', 'praise', 'neutral'],             correct: 0, explanation: 'Implies someone is old-fashioned and stuck.' },
    ],
    sortingWords: [
      { word: 'senior citizen',     type: 'euphemism' },
      { word: 'golden years',       type: 'euphemism' },
      { word: 'mature',             type: 'euphemism' },
      { word: 'seasoned individual', type: 'euphemism' },
      { word: 'experienced',        type: 'euphemism' },
      { word: 'geezer',             type: 'dysphemism' },
      { word: 'over the hill',      type: 'dysphemism' },
      { word: 'ancient',            type: 'dysphemism' },
      { word: 'old fogey',          type: 'dysphemism' },
    ],
    matchingPairs: [
      { id: 1, left: 'old person',                 right: 'senior citizen' },
      { id: 2, left: 'old age',                    right: 'golden years' },
      { id: 3, left: 'old employee',               right: 'seasoned individual' },
      { id: 4, left: 'inexperienced young person', right: 'wet behind the ears' },
    ],
  },

  // ── 3. POVERTY ────────────────────────────────────────────
  {
    id: 'poverty',
    emoji: '💸',
    nameEn: 'Poverty',
    nameRu: 'Бедность',
    description: 'Soft and harsh ways to describe being poor.',
    color: 'orange',
    fillInGaps: [
      { id: 1, textBefore: 'He comes from a ', textAfter: ' family.',     options: ['low-income', 'broke'],                       correctAnswer: 'low-income',       explanation: 'Statistical, neutral term.' },
      { id: 2, textBefore: 'She is economically ', textAfter: '.',        options: ['disadvantaged', 'penniless'],                correctAnswer: 'disadvantaged',    explanation: 'Formal — focuses on conditions, not the person.' },
      { id: 3, textBefore: 'They are people of modest ', textAfter: '.',  options: ['means', 'pockets'],                          correctAnswer: 'means',            explanation: '"Of modest means" elegantly understates poverty.' },
      { id: 4, textBefore: 'They are ',  textAfter: ' children.',         options: ['underprivileged', 'dirt poor'],              correctAnswer: 'underprivileged',  explanation: '"Underprivileged" shifts blame to society.' },
      { id: 5, textBefore: 'After paying rent, I am totally ', textAfter: '.', options: ['flat broke', 'low-income'],            correctAnswer: 'flat broke',       explanation: '"Flat broke" means completely out of money — informal.' },
      { id: 6, textBefore: 'He doesn\'t speak about money — he\'s ', textAfter: '.', options: ['broke', 'economically disadvantaged'], correctAnswer: 'economically disadvantaged', explanation: 'Polite formal term.' },
      { id: 7, textBefore: 'They lived in a ', textAfter: ' village.',     options: ['dirt poor', 'modest means'],                correctAnswer: 'dirt poor',        explanation: 'Vivid, harsh expression.' },
      { id: 8, textBefore: 'He grew up ',     textAfter: ' but smart.',    options: ['penniless', 'underprivileged'],             correctAnswer: 'underprivileged',  explanation: 'Polite term that doesn\'t shame the person.' },
    ],
    quiz: [
      { id: 1, question: '"Low-income" is…',                options: ['euphemism', 'insult', 'slang'],            correct: 0, explanation: 'Neutral statistical term.' },
      { id: 2, question: '"Broke" is…',                     options: ['dysphemism', 'formal', 'polite'],          correct: 0, explanation: 'Informal/blunt way to say no money.' },
      { id: 3, question: '"Economically disadvantaged" is…', options: ['formal', 'a joke', 'an insult'],          correct: 0, explanation: 'Bureaucratic, distancing language.' },
      { id: 4, question: '"Penniless" emphasizes…',         options: ['no money at all', 'wealth', 'jobs'],       correct: 0, explanation: 'Strong word — having nothing.' },
      { id: 5, question: '"Of modest means" is…',           options: ['polite', 'rude', 'slang'],                 correct: 0, explanation: 'An elegant understatement.' },
      { id: 6, question: '"Flat broke" describes…',         options: ['extreme poverty', 'wealth', 'middle class'], correct: 0, explanation: 'Stronger than "broke" — completely out.' },
      { id: 7, question: '"Underprivileged" is…',           options: ['formal/sensitive', 'insult', 'joke'],      correct: 0, explanation: 'Used in policy and media.' },
      { id: 8, question: '"Dirt poor" is…',                 options: ['extreme poverty', 'polite', 'academic'],   correct: 0, explanation: 'Vivid harsh image of being poor.' },
    ],
    sortingWords: [
      { word: 'low-income',                type: 'euphemism' },
      { word: 'economically disadvantaged', type: 'euphemism' },
      { word: 'underprivileged',           type: 'euphemism' },
      { word: 'of modest means',           type: 'euphemism' },
      { word: 'broke',                     type: 'dysphemism' },
      { word: 'flat broke',                type: 'dysphemism' },
      { word: 'penniless',                 type: 'dysphemism' },
      { word: 'dirt poor',                 type: 'dysphemism' },
    ],
    matchingPairs: [
      { id: 1, left: 'poor person',          right: 'underprivileged' },
      { id: 2, left: 'very poor',            right: 'economically disadvantaged' },
      { id: 3, left: 'no money',             right: 'of modest means' },
      { id: 4, left: 'low-income situation', right: 'low-income' },
    ],
  },

  // ── 4. FIRED ──────────────────────────────────────────────
  {
    id: 'fired',
    emoji: '📤',
    nameEn: 'Fired',
    nameRu: 'Увольнение',
    description: 'Corporate softening vs harsh slang for being fired.',
    color: 'rose',
    fillInGaps: [
      { id: 1, textBefore: 'He was ', textAfter: ' last Friday.',                  options: ['let go', 'sacked'],            correctAnswer: 'let go',           explanation: '"Let go" softens responsibility for losing a job.' },
      { id: 2, textBefore: 'She was made ', textAfter: ' due to budget cuts.',     options: ['redundant', 'booted out'],     correctAnswer: 'redundant',        explanation: '"Made redundant" — corporate-speak.' },
      { id: 3, textBefore: 'The company ', textAfter: ' 200 workers.',             options: ['downsized', 'axed'],           correctAnswer: 'downsized',        explanation: '"Downsized" — impersonal corporate term.' },
      { id: 4, textBefore: 'He was officially ', textAfter: ' from his duties.',   options: ['released', 'canned'],          correctAnswer: 'released',         explanation: 'Formal, neutral phrasing.' },
      { id: 5, textBefore: 'The boss ', textAfter: ' him out for being late.',     options: ['booted', 'transitioned'],      correctAnswer: 'booted',           explanation: '"Booted out" = harshly thrown out.' },
      { id: 6, textBefore: 'After the merger, he was simply ', textAfter: '.',     options: ['sacked', 'released from duties'], correctAnswer: 'released from duties', explanation: 'Formal phrasing fits a merger context.' },
      { id: 7, textBefore: 'The company ', textAfter: ' a third of its staff.',    options: ['downsized', 'axed'],           correctAnswer: 'downsized',        explanation: 'Corporate language for layoffs.' },
      { id: 8, textBefore: 'He was ',  textAfter: ' on the spot.',                 options: ['canned', 'made redundant'],    correctAnswer: 'canned',           explanation: '"Canned" = informal slang for fired.' },
    ],
    quiz: [
      { id: 1, question: '"Let go" is…',                options: ['euphemism', 'insult', 'joke'],     correct: 0, explanation: 'Removes blame from the worker.' },
      { id: 2, question: '"Sacked" means…',             options: ['fired', 'hired', 'promoted'],      correct: 0, explanation: 'Direct British slang for fired.' },
      { id: 3, question: '"Made redundant" is…',        options: ['formal', 'a joke', 'insult'],      correct: 0, explanation: 'Corporate/HR euphemism.' },
      { id: 4, question: '"Booted out" is…',            options: ['rude', 'polite', 'neutral'],       correct: 0, explanation: 'Implies physical kicking out.' },
      { id: 5, question: '"Downsized" means…',          options: ['cutting jobs', 'hiring', 'expanding'], correct: 0, explanation: 'Reducing the workforce.' },
      { id: 6, question: '"Axed" implies…',             options: ['harsh firing', 'promotion', 'training'], correct: 0, explanation: 'Sudden, brutal job cut.' },
      { id: 7, question: '"Released from duties" is…',  options: ['formal', 'slang', 'insult'],       correct: 0, explanation: 'Bureaucratic, neutral phrase.' },
      { id: 8, question: '"Canned" is…',                options: ['slang for fired', 'academic', 'polite'], correct: 0, explanation: 'American informal slang.' },
    ],
    sortingWords: [
      { word: 'let go',              type: 'euphemism' },
      { word: 'made redundant',      type: 'euphemism' },
      { word: 'downsized',           type: 'euphemism' },
      { word: 'released from duties', type: 'euphemism' },
      { word: 'transitioned out',    type: 'euphemism' },
      { word: 'sacked',              type: 'dysphemism' },
      { word: 'booted out',          type: 'dysphemism' },
      { word: 'axed',                type: 'dysphemism' },
      { word: 'canned',              type: 'dysphemism' },
      { word: 'dumped',              type: 'dysphemism' },
    ],
    matchingPairs: [
      { id: 1, left: 'fired employee',    right: 'let go' },
      { id: 2, left: 'job loss',          right: 'made redundant' },
      { id: 3, left: 'company reduction', right: 'downsized' },
      { id: 4, left: 'employee removal',  right: 'released from duties' },
    ],
  },

  // ── 5. UNEMPLOYED ─────────────────────────────────────────
  {
    id: 'unemployed',
    emoji: '🏠',
    nameEn: 'Unemployed',
    nameRu: 'Безработица',
    description: 'Diplomatic vs blunt ways to say "without work".',
    color: 'indigo',
    fillInGaps: [
      { id: 1, textBefore: 'He is ', textAfter: ' jobs right now.',                options: ['between', 'totally without'],   correctAnswer: 'between',                explanation: '"Between jobs" = currently looking, polite.' },
      { id: 2, textBefore: 'She is seeking new ', textAfter: '.',                  options: ['opportunities', 'pity'],         correctAnswer: 'opportunities',          explanation: '"Seeking new opportunities" — positive framing.' },
      { id: 3, textBefore: 'He is currently ', textAfter: '.',                     options: ['between jobs', 'jobless'],       correctAnswer: 'between jobs',           explanation: 'Soft formulation that preserves dignity.' },
      { id: 4, textBefore: 'They are ', textAfter: ' since the layoff.',           options: ['seeking new opportunities', 'jobless'], correctAnswer: 'seeking new opportunities', explanation: 'Positive framing.' },
      { id: 5, textBefore: 'On her CV she wrote: "Currently ', textAfter: '."',    options: ['between jobs', 'on the dole'],   correctAnswer: 'between jobs',           explanation: 'CV-appropriate phrase.' },
      { id: 6, textBefore: 'He blunt admits he is ', textAfter: '.',               options: ['jobless', 'seeking new opportunities'], correctAnswer: 'jobless',           explanation: 'Direct, harsh.' },
      { id: 7, textBefore: 'She has been ', textAfter: ' for two years on benefits.', options: ['on the dole', 'between jobs'], correctAnswer: 'on the dole',           explanation: 'British slang for living on welfare.' },
      { id: 8, textBefore: 'Recruiters prefer to hear "', textAfter: '" rather than "jobless".', options: ['seeking new opportunities', 'on the dole'], correctAnswer: 'seeking new opportunities', explanation: 'Polite, positive framing.' },
    ],
    quiz: [
      { id: 1, question: '"Between jobs" is…',                options: ['euphemism', 'insult', 'joke'],          correct: 0, explanation: 'Suggests temporary state.' },
      { id: 2, question: '"Jobless" is…',                     options: ['blunt', 'polite', 'formal'],            correct: 0, explanation: 'Direct, no softening.' },
      { id: 3, question: '"Seeking new opportunities" is…',   options: ['polite', 'rude', 'slang'],              correct: 0, explanation: 'Positive, future-focused.' },
      { id: 4, question: '"On the dole" is…',                 options: ['slang', 'formal', 'academic'],          correct: 0, explanation: 'British slang — receiving benefits.' },
      { id: 5, question: '"Between jobs" suggests…',          options: ['temporary', 'permanent', 'rich'],       correct: 0, explanation: 'Implies the situation is short-term.' },
      { id: 6, question: '"Jobless" is best described as…',   options: ['direct', 'euphemism', 'compliment'],    correct: 0, explanation: 'Plain and unsoftened.' },
      { id: 7, question: '"Seeking new opportunities" sounds…', options: ['positive', 'negative', 'insulting'],  correct: 0, explanation: 'Accents future possibilities.' },
      { id: 8, question: '"On the dole" refers to…',          options: ['unemployment benefits', 'salary', 'promotion'], correct: 0, explanation: 'Social security/welfare.' },
    ],
    sortingWords: [
      { word: 'between jobs',              type: 'euphemism' },
      { word: 'seeking new opportunities', type: 'euphemism' },
      { word: 'jobless',                   type: 'dysphemism' },
      { word: 'on the dole',               type: 'dysphemism' },
    ],
    matchingPairs: [
      { id: 1, left: 'unemployed',           right: 'between jobs' },
      { id: 2, left: 'looking for work',     right: 'seeking new opportunities' },
    ],
  },

  // ── 6. HEALTH ─────────────────────────────────────────────
  {
    id: 'health',
    emoji: '🤒',
    nameEn: 'Health',
    nameRu: 'Здоровье',
    description: 'Polite vs blunt ways to say someone is sick.',
    color: 'emerald',
    fillInGaps: [
      { id: 1, textBefore: 'I feel a bit ', textAfter: ' the weather today.',           options: ['under', 'sick as'],                 correctAnswer: 'under',         explanation: '"Under the weather" = mildly unwell.' },
      { id: 2, textBefore: 'The minister is ', textAfter: ' and won\'t attend.',        options: ['indisposed', 'falling apart'],      correctAnswer: 'indisposed',    explanation: 'Formal, polite term.' },
      { id: 3, textBefore: 'After the food poisoning he was ', textAfter: '.',          options: ['sick as a dog', 'under the weather'], correctAnswer: 'sick as a dog', explanation: '"Sick as a dog" = very, very ill.' },
      { id: 4, textBefore: 'Her grandmother is ', textAfter: ' and resting.',           options: ['indisposed', 'falling apart'],      correctAnswer: 'indisposed',    explanation: 'Polite when speaking about elders.' },
      { id: 5, textBefore: 'After 60, he says his body is just ', textAfter: '.',       options: ['falling apart', 'under the weather'], correctAnswer: 'falling apart', explanation: 'Exaggerated metaphor for declining health.' },
      { id: 6, textBefore: 'I think I\'m coming down — I\'m ', textAfter: '.',          options: ['under the weather', 'sick as a dog'], correctAnswer: 'under the weather', explanation: 'Mild illness coming on.' },
      { id: 7, textBefore: 'She was so ill she felt ', textAfter: '.',                  options: ['sick as a dog', 'indisposed'],      correctAnswer: 'sick as a dog', explanation: 'Strong vivid description.' },
      { id: 8, textBefore: 'After the surgery his body felt ', textAfter: '.',          options: ['falling apart', 'under the weather'], correctAnswer: 'falling apart', explanation: 'Shows severity of his condition.' },
    ],
    quiz: [
      { id: 1, question: '"Under the weather" is…',           options: ['euphemism', 'insult', 'joke'],            correct: 0, explanation: 'Soft way to mention mild illness.' },
      { id: 2, question: '"Indisposed" means…',               options: ['slightly ill', 'healthy', 'strong'],      correct: 0, explanation: 'Formal, polite.' },
      { id: 3, question: '"Sick as a dog" is…',               options: ['dysphemism', 'polite', 'medical'],        correct: 0, explanation: 'Vivid, harsh image.' },
      { id: 4, question: '"Falling apart" means…',            options: ['very sick', 'healthy', 'resting'],        correct: 0, explanation: 'Exaggerated decline.' },
      { id: 5, question: 'When you have a cold, you might be… ', options: ['under the weather', 'happy', 'rich'],  correct: 0, explanation: 'Mild illness fits the phrase.' },
      { id: 6, question: '"Indisposed" sounds…',              options: ['formal', 'rude', 'slang'],                correct: 0, explanation: 'Used in formal contexts.' },
      { id: 7, question: '"Sick as a dog" describes…',        options: ['very bad condition', 'mild', 'a joke'],   correct: 0, explanation: 'Severe illness.' },
      { id: 8, question: '"Falling apart" implies…',          options: ['extreme illness', 'recovery', 'health'],  correct: 0, explanation: 'Body is breaking down.' },
    ],
    sortingWords: [
      { word: 'under the weather', type: 'euphemism' },
      { word: 'indisposed',        type: 'euphemism' },
      { word: 'sick as a dog',     type: 'dysphemism' },
      { word: 'falling apart',     type: 'dysphemism' },
    ],
    matchingPairs: [
      { id: 1, left: 'sick',             right: 'under the weather' },
      { id: 2, left: 'ill (formal)',     right: 'indisposed' },
    ],
  },

  // ── 7. APPEARANCE ─────────────────────────────────────────
  {
    id: 'appearance',
    emoji: '👤',
    nameEn: 'Appearance',
    nameRu: 'Внешность',
    description: 'Body shape — flattering vs offensive words.',
    color: 'fuchsia',
    fillInGaps: [
      { id: 1, textBefore: 'She is a ', textAfter: ' woman with confidence.',     options: ['full-figured', 'obese'],         correctAnswer: 'full-figured',   explanation: 'Fashion-industry positive term.' },
      { id: 2, textBefore: 'He is a ', textAfter: ' man — strong build.',         options: ['heavyset', 'chubby'],            correctAnswer: 'heavyset',       explanation: 'Neutral description.' },
      { id: 3, textBefore: 'She has a beautiful ', textAfter: ' figure.',         options: ['curvy', 'lard'],                 correctAnswer: 'curvy',          explanation: 'Positive, beauty-positive term.' },
      { id: 4, textBefore: 'The doctor said he is medically ', textAfter: '.',    options: ['obese', 'full-figured'],         correctAnswer: 'obese',          explanation: 'Medical/clinical context.' },
      { id: 5, textBefore: 'The kid is a bit ', textAfter: ' — bullies tease him.', options: ['chubby', 'heavyset'],          correctAnswer: 'chubby',         explanation: 'Sounds condescending — context fits.' },
      { id: 6, textBefore: 'Her body is naturally ', textAfter: '.',              options: ['curvy', 'obese'],                correctAnswer: 'curvy',          explanation: 'Positive framing.' },
      { id: 7, textBefore: 'He has a ', textAfter: ' frame from years of weights.', options: ['heavyset', 'lard'],            correctAnswer: 'heavyset',       explanation: 'Neutral, even respectable.' },
      { id: 8, textBefore: 'Stop calling him "', textAfter: '" — that\'s mean.',  options: ['lard', 'curvy'],                 correctAnswer: 'lard',           explanation: '"Lard" is extremely rude.' },
    ],
    quiz: [
      { id: 1, question: '"Full-figured" is…',           options: ['euphemism', 'insult', 'joke'],         correct: 0, explanation: 'Fashion-positive term.' },
      { id: 2, question: '"Obese" is…',                  options: ['medical/harsh', 'polite', 'slang'],    correct: 0, explanation: 'Clinical but feels harsh in conversation.' },
      { id: 3, question: '"Curvy" describes…',           options: ['attractive shape', 'insult', 'illness'], correct: 0, explanation: 'Positive — beauty-positive.' },
      { id: 4, question: '"Lard" is…',                   options: ['dysphemism', 'compliment', 'neutral'], correct: 0, explanation: 'Comparing someone to fat — extremely rude.' },
      { id: 5, question: '"Heavyset" is…',               options: ['neutral polite', 'rude', 'joke'],      correct: 0, explanation: 'Neutral build description.' },
      { id: 6, question: '"Chubby" sounds…',             options: ['slightly rude', 'formal', 'academic'], correct: 0, explanation: 'Often condescending.' },
      { id: 7, question: '"Full-figured" is most often…', options: ['respectful', 'insulting', 'aggressive'], correct: 0, explanation: 'Used positively in marketing.' },
      { id: 8, question: '"Obese" in everyday talk feels…', options: ['clinical/harsh', 'compliment', 'joke'], correct: 0, explanation: 'Even when accurate, it stings.' },
    ],
    sortingWords: [
      { word: 'full-figured', type: 'euphemism' },
      { word: 'heavyset',     type: 'euphemism' },
      { word: 'curvy',        type: 'euphemism' },
      { word: 'obese',        type: 'dysphemism' },
      { word: 'chubby',       type: 'dysphemism' },
      { word: 'lard',         type: 'dysphemism' },
    ],
    matchingPairs: [
      { id: 1, left: 'fat person',        right: 'full-figured' },
      { id: 2, left: 'overweight person', right: 'heavyset' },
      { id: 3, left: 'curvy body shape',  right: 'curvy' },
    ],
  },

  // ── 8. CRIME / PRISON ─────────────────────────────────────
  {
    id: 'crime',
    emoji: '🚔',
    nameEn: 'Crime & Prison',
    nameRu: 'Преступление',
    description: 'Official vs slang words for prison and arrest.',
    color: 'violet',
    fillInGaps: [
      { id: 1, textBefore: 'He was sent to a ', textAfter: ' facility.',        options: ['correctional', 'slammer'],   correctAnswer: 'correctional',         explanation: 'Official term — focus on reform.' },
      { id: 2, textBefore: 'She was taken into ', textAfter: ' overnight.',     options: ['custody', 'the joint'],      correctAnswer: 'custody',              explanation: '"Taken into custody" — police formal language.' },
      { id: 3, textBefore: 'The teen was sent to a ', textAfter: ' center.',    options: ['detention', 'slammer'],      correctAnswer: 'detention',            explanation: '"Detention center" — bureaucratic.' },
      { id: 4, textBefore: 'In street slang, prison is called the ', textAfter: '.', options: ['slammer', 'correctional'], correctAnswer: 'slammer',          explanation: 'Slang term for prison.' },
      { id: 5, textBefore: 'He got ', textAfter: ' for shoplifting.',           options: ['busted', 'taken into custody'], correctAnswer: 'busted',           explanation: 'Informal slang for getting arrested.' },
      { id: 6, textBefore: 'According to the report, the suspect was ', textAfter: '.', options: ['taken into custody', 'in the joint'], correctAnswer: 'taken into custody', explanation: 'News reports use formal phrasing.' },
      { id: 7, textBefore: 'After 5 years in ', textAfter: ', he was finally free.', options: ['the joint', 'detention'], correctAnswer: 'the joint',          explanation: 'Inmate slang for prison.' },
      { id: 8, textBefore: 'Cops ', textAfter: ' him red-handed.',              options: ['busted', 'released'],        correctAnswer: 'busted',               explanation: 'Caught in the act — slang.' },
    ],
    quiz: [
      { id: 1, question: '"Correctional facility" is…',  options: ['euphemism', 'insult', 'joke'],            correct: 0, explanation: 'Official term — focus on rehabilitation.' },
      { id: 2, question: '"Slammer" is…',                options: ['slang', 'formal', 'medical'],              correct: 0, explanation: 'Informal/jargon for prison.' },
      { id: 3, question: '"Taken into custody" means…',  options: ['arrested', 'released', 'promoted'],        correct: 0, explanation: 'Police-formal phrase.' },
      { id: 4, question: '"The joint" refers to…',       options: ['prison (slang)', 'a hospital', 'a school'], correct: 0, explanation: 'Inmate slang.' },
      { id: 5, question: '"Detention center" is…',       options: ['neutral official', 'insult', 'joke'],      correct: 0, explanation: 'Bureaucratic neutral phrase.' },
      { id: 6, question: '"Busted" means…',              options: ['arrested', 'free', 'safe'],                correct: 0, explanation: 'Slang for caught/arrested.' },
      { id: 7, question: '"Correctional facility" sounds…', options: ['formal', 'rude', 'funny'],              correct: 0, explanation: 'Government and legal use.' },
      { id: 8, question: '"Slammer" appears in…',        options: ['informal speech', 'legal docs', 'news reports'], correct: 0, explanation: 'Casual conversation only.' },
    ],
    sortingWords: [
      { word: 'correctional facility', type: 'euphemism' },
      { word: 'detention center',      type: 'euphemism' },
      { word: 'taken into custody',    type: 'euphemism' },
      { word: 'slammer',               type: 'dysphemism' },
      { word: 'the joint',             type: 'dysphemism' },
      { word: 'busted',                type: 'dysphemism' },
    ],
    matchingPairs: [
      { id: 1, left: 'prison',           right: 'correctional facility' },
      { id: 2, left: 'arrest',           right: 'taken into custody' },
      { id: 3, left: 'jail',             right: 'detention center' },
    ],
  },

  // ── 9. WAR ────────────────────────────────────────────────
  {
    id: 'war',
    emoji: '⚔️',
    nameEn: 'War',
    nameRu: 'Война',
    description: 'Official military terms vs raw description.',
    color: 'orange',
    fillInGaps: [
      { id: 1, textBefore: 'The country launched a ', textAfter: ' operation.',     options: ['military', 'bloodbath'],        correctAnswer: 'military',         explanation: '"Military operation" — official term.' },
      { id: 2, textBefore: 'Civilians suffered ', textAfter: ' damage.',             options: ['collateral', 'massacre'],       correctAnswer: 'collateral',       explanation: 'Hides civilian deaths under jargon.' },
      { id: 3, textBefore: 'The army conducted ', textAfter: ' on the city.',        options: ['airstrikes', 'flattening'],     correctAnswer: 'airstrikes',       explanation: 'Technical military term.' },
      { id: 4, textBefore: 'The village was completely ', textAfter: '.',            options: ['flattened', 'protected'],       correctAnswer: 'flattened',        explanation: '"Flattened" — vivid total destruction.' },
      { id: 5, textBefore: 'They called it a ', textAfter: ' mission.',              options: ['peacekeeping', 'bloodbath'],    correctAnswer: 'peacekeeping',     explanation: 'Reframes war as peace.' },
      { id: 6, textBefore: 'The street turned into a complete ', textAfter: '.',     options: ['bloodbath', 'parade'],          correctAnswer: 'bloodbath',        explanation: 'Shocking image of slaughter.' },
      { id: 7, textBefore: 'The historian called it a ', textAfter: ' of innocents.', options: ['massacre', 'celebration'],     correctAnswer: 'massacre',         explanation: 'Direct, harsh word.' },
      { id: 8, textBefore: 'It was officially an ', textAfter: ' but felt like an invasion.', options: ['operation', 'invasion'], correctAnswer: 'operation',     explanation: 'Officials use softer terms.' },
    ],
    quiz: [
      { id: 1, question: '"Military operation" is…',     options: ['euphemism', 'insult', 'joke'],         correct: 0, explanation: 'Official, neutral term.' },
      { id: 2, question: '"Bloodbath" means…',           options: ['massacre', 'peace', 'surgery'],         correct: 0, explanation: 'Vivid harsh imagery.' },
      { id: 3, question: '"Collateral damage" refers to…', options: ['civilian harm', 'victory', 'celebration'], correct: 0, explanation: 'Hides deaths in jargon.' },
      { id: 4, question: '"Flattened" means…',           options: ['destroyed', 'repaired', 'built'],       correct: 0, explanation: 'Total destruction.' },
      { id: 5, question: '"Peacekeeping mission" sounds…', options: ['neutral/positive', 'violent', 'insulting'], correct: 0, explanation: 'Reframes military presence.' },
      { id: 6, question: '"Massacre" is…',               options: ['extreme killing', 'friendly action', 'sport'], correct: 0, explanation: 'Stark, direct word.' },
      { id: 7, question: '"Airstrikes" is…',             options: ['technical term', 'joke', 'slang'],     correct: 0, explanation: 'Standard military terminology.' },
      { id: 8, question: '"Invasion" is…',               options: ['aggressive attack', 'friendship', 'negotiation'], correct: 0, explanation: 'Direct word for hostile action.' },
    ],
    sortingWords: [
      { word: 'military operation', type: 'euphemism' },
      { word: 'airstrikes',         type: 'euphemism' },
      { word: 'peacekeeping mission', type: 'euphemism' },
      { word: 'collateral damage',  type: 'euphemism' },
      { word: 'bloodbath',          type: 'dysphemism' },
      { word: 'massacre',           type: 'dysphemism' },
      { word: 'flattened',          type: 'dysphemism' },
      { word: 'invasion',           type: 'dysphemism' },
    ],
    matchingPairs: [
      { id: 1, left: 'war attack',      right: 'military operation' },
      { id: 2, left: 'civilian deaths', right: 'collateral damage' },
      { id: 3, left: 'bombing',         right: 'airstrikes' },
      { id: 4, left: 'occupation',      right: 'peacekeeping mission' },
    ],
  },

  // ── 10. INTELLIGENCE ──────────────────────────────────────
  {
    id: 'intelligence',
    emoji: '🧠',
    nameEn: 'Intelligence',
    nameRu: 'Интеллект',
    description: 'Soft and harsh words about intelligence and learning.',
    color: 'sky',
    fillInGaps: [
      { id: 1, textBefore: 'He is not academically ', textAfter: ', but he\'s creative.', options: ['inclined', 'thick'],         correctAnswer: 'inclined',     explanation: 'Polite phrasing for academic struggles.' },
      { id: 2, textBefore: 'She is a slow ', textAfter: ', but works hard.',               options: ['learner', 'dimwit'],         correctAnswer: 'learner',      explanation: '"Slow learner" — pedagogical, non-judgmental.' },
      { id: 3, textBefore: 'He is wet ', textAfter: ' the ears — only 18.',                options: ['behind', 'over'],            correctAnswer: 'behind',       explanation: '"Wet behind the ears" = inexperienced.' },
      { id: 4, textBefore: 'She is very ', textAfter: ' to succeed.',                      options: ['determined', 'thick'],       correctAnswer: 'determined',   explanation: '"Determined" reframes stubbornness positively.' },
      { id: 5, textBefore: 'Don\'t call him ', textAfter: ' — that\'s rude!',              options: ['thick', 'open-minded'],      correctAnswer: 'thick',        explanation: '"Thick" is a direct insult.' },
      { id: 6, textBefore: 'The teacher called him a ', textAfter: '.',                    options: ['slow learner', 'dimwit'],    correctAnswer: 'slow learner', explanation: 'Pedagogical and respectful.' },
      { id: 7, textBefore: 'In his frustration, he yelled "', textAfter: '!" at his brother.', options: ['dimwit', 'determined'],   correctAnswer: 'dimwit',       explanation: 'Frustrated insult.' },
      { id: 8, textBefore: 'Despite being ', textAfter: ', he became a great writer.',     options: ['not academically inclined', 'thick'], correctAnswer: 'not academically inclined', explanation: 'Polite framing.' },
    ],
    quiz: [
      { id: 1, question: '"Not academically inclined" is…', options: ['euphemism', 'insult', 'joke'],     correct: 0, explanation: 'Soft pedagogical phrasing.' },
      { id: 2, question: '"Thick" means…',                  options: ['stupid', 'smart', 'polite'],       correct: 0, explanation: 'British slang insult.' },
      { id: 3, question: '"Slow learner" is…',              options: ['neutral/soft', 'insult', 'slang'], correct: 0, explanation: 'Educational term.' },
      { id: 4, question: '"Dimwit" is…',                    options: ['dysphemism', 'compliment', 'formal'], correct: 0, explanation: 'Dismissive nickname.' },
      { id: 5, question: '"Wet behind the ears" means…',    options: ['inexperienced', 'genius', 'old'],   correct: 0, explanation: 'New and naive.' },
      { id: 6, question: '"Dull as dishwater" is…',         options: ['insult', 'praise', 'neutral'],      correct: 0, explanation: 'Vivid disrespect.' },
      { id: 7, question: '"Determined" can soften…',        options: ['judgment', 'compliment', 'exaggeration'], correct: 0, explanation: 'Reframes stubbornness positively.' },
      { id: 8, question: '"Brainless" is…',                 options: ['strong insult', 'polite', 'academic'], correct: 0, explanation: 'Direct insult to intelligence.' },
    ],
    sortingWords: [
      { word: 'not academically inclined', type: 'euphemism' },
      { word: 'slow learner',              type: 'euphemism' },
      { word: 'wet behind the ears',       type: 'euphemism' },
      { word: 'determined',                type: 'euphemism' },
      { word: 'open-minded',               type: 'euphemism' },
      { word: 'thick',                     type: 'dysphemism' },
      { word: 'dimwit',                    type: 'dysphemism' },
      { word: 'dull as dishwater',         type: 'dysphemism' },
      { word: 'stupid',                    type: 'dysphemism' },
      { word: 'brainless',                 type: 'dysphemism' },
    ],
    matchingPairs: [
      { id: 1, left: 'not smart student',     right: 'slow learner' },
      { id: 2, left: 'inexperienced person',  right: 'wet behind the ears' },
      { id: 3, left: 'has trouble in school', right: 'not academically inclined' },
      { id: 4, left: 'persistent person',     right: 'determined' },
    ],
  },

  // ── 11. RELATIONSHIPS ─────────────────────────────────────
  {
    id: 'relationships',
    emoji: '💔',
    nameEn: 'Relationships',
    nameRu: 'Отношения',
    description: 'Polite vs emotional words about romance and conflict.',
    color: 'rose',
    fillInGaps: [
      { id: 1, textBefore: 'They went their ', textAfter: ' last year.',                options: ['separate ways', 'down the drain'], correctAnswer: 'separate ways', explanation: 'Mutual, neutral phrase for breakup.' },
      { id: 2, textBefore: 'I think she\'s ', textAfter: ' someone else now.',           options: ['seeing', 'two-timing'],        correctAnswer: 'seeing',           explanation: '"Seeing someone" — neutral.' },
      { id: 3, textBefore: 'They had a ', textAfter: ' over money.',                     options: ['disagreement', 'blazing row'], correctAnswer: 'disagreement',     explanation: 'Soft, undramatic word.' },
      { id: 4, textBefore: 'After 5 years, he ', textAfter: ' her by text.',             options: ['dumped', 'married'],           correctAnswer: 'dumped',           explanation: 'Painful — emphasizes humiliation.' },
      { id: 5, textBefore: 'They are simply ', textAfter: ' separate ways.',             options: ['going', 'breaking'],           correctAnswer: 'going',            explanation: 'Sounds dignified.' },
      { id: 6, textBefore: 'She caught him ', textAfter: ' her with her best friend.',  options: ['two-timing', 'seeing'],        correctAnswer: 'two-timing',       explanation: 'Direct word for cheating.' },
      { id: 7, textBefore: 'They had a ', textAfter: ' that woke the neighbors.',        options: ['blazing row', 'disagreement'], correctAnswer: 'blazing row',     explanation: 'Vivid emotional fight.' },
      { id: 8, textBefore: 'He simply ', textAfter: ' her — no warning.',                options: ['dumped', 'went separate ways from'], correctAnswer: 'dumped',     explanation: 'Brutal, sudden.' },
    ],
    quiz: [
      { id: 1, question: '"Went separate ways" is…',         options: ['euphemism', 'insult', 'joke'],          correct: 0, explanation: 'Mutual, dignified phrasing.' },
      { id: 2, question: '"Got dumped" means…',              options: ['broken up with', 'married', 'reconciled'], correct: 0, explanation: 'Painful breakup.' },
      { id: 3, question: '"Seeing someone else" implies…',   options: ['cheating (soft)', 'friendship', 'marriage'], correct: 0, explanation: 'Mild way to say cheating.' },
      { id: 4, question: '"Two-timing" is…',                 options: ['dysphemism', 'compliment', 'neutral'],  correct: 0, explanation: 'Direct accusation.' },
      { id: 5, question: '"Disagreement" is…',               options: ['soft form of argument', 'insult', 'slang'], correct: 0, explanation: 'Undramatic word.' },
      { id: 6, question: '"Blazing row" means…',             options: ['intense fight', 'calm talk', 'joke'],   correct: 0, explanation: 'Big, loud emotional argument.' },
      { id: 7, question: '"Went separate ways" sounds…',     options: ['neutral polite', 'aggressive', 'insulting'], correct: 0, explanation: 'Mutual and respectful.' },
      { id: 8, question: '"Split up" is…',                   options: ['direct breakup', 'promotion', 'friendship'], correct: 0, explanation: 'Plain, no softening.' },
    ],
    sortingWords: [
      { word: 'went separate ways',  type: 'euphemism' },
      { word: 'seeing someone else', type: 'euphemism' },
      { word: 'have a disagreement', type: 'euphemism' },
      { word: 'significant other',   type: 'euphemism' },
      { word: 'got dumped',          type: 'dysphemism' },
      { word: 'two-timing',          type: 'dysphemism' },
      { word: 'blazing row',         type: 'dysphemism' },
      { word: 'split up',            type: 'dysphemism' },
    ],
    matchingPairs: [
      { id: 1, left: 'break up',         right: 'went separate ways' },
      { id: 2, left: 'cheating',         right: 'seeing someone else' },
      { id: 3, left: 'argument',         right: 'have a disagreement' },
      { id: 4, left: 'unmarried partner', right: 'significant other' },
    ],
  },

  // ── 12. DISHONESTY ────────────────────────────────────────
  {
    id: 'dishonesty',
    emoji: '🤥',
    nameEn: 'Dishonesty',
    nameRu: 'Нечестность',
    description: 'Subtle vs blunt words about lying and cheating.',
    color: 'cyan',
    fillInGaps: [
      { id: 1, textBefore: 'He tried to ', textAfter: ' the public about the facts.',     options: ['mislead', 'bullshit'],            correctAnswer: 'mislead',     explanation: '"Mislead" — softer than "lie".' },
      { id: 2, textBefore: 'She tends to ', textAfter: ' her stories at parties.',         options: ['embellish', 'fabricate'],         correctAnswer: 'embellish',   explanation: '"Embellish" — make things prettier.' },
      { id: 3, textBefore: 'He doesn\'t cheat — he just ', textAfter: ' the rules.',       options: ['bends', 'breaks completely'],     correctAnswer: 'bends',       explanation: '"Bend the rules" — minor, not full violation.' },
      { id: 4, textBefore: 'His promises were total ', textAfter: '!',                     options: ['bullshit', 'embellishment'],      correctAnswer: 'bullshit',    explanation: 'Strong rejection of his words.' },
      { id: 5, textBefore: 'She told a ', textAfter: ' lie to the police.',                options: ['bare-faced', 'modest'],           correctAnswer: 'bare-faced',  explanation: '"Bare-faced lie" — shameless.' },
      { id: 6, textBefore: 'They were ', textAfter: ' with the truth on the witness stand.', options: ['economical', 'generous'],       correctAnswer: 'economical',  explanation: '"Economical with the truth" — fancy political euphemism.' },
      { id: 7, textBefore: 'He ', textAfter: ' the old lady out of her savings.',           options: ['swindled', 'embellished'],        correctAnswer: 'swindled',    explanation: 'Direct word for cheating.' },
      { id: 8, textBefore: 'Don\'t ', textAfter: ' it out of proportion!',                  options: ['blow', 'reduce'],                 correctAnswer: 'blow',        explanation: '"Blow out of proportion" — exaggerate dramatically.' },
    ],
    quiz: [
      { id: 1, question: '"Mislead" is…',                       options: ['euphemism', 'insult', 'joke'],         correct: 0, explanation: 'Softer than "lie".' },
      { id: 2, question: '"Bullshit" means…',                   options: ['nonsense', 'polite speech', 'truth'],   correct: 0, explanation: 'Strong dysphemism for lies.' },
      { id: 3, question: '"Bend the rules" is…',                options: ['soft cheating', 'legal action', 'punishment'], correct: 0, explanation: 'Minor rule-breaking framed as harmless.' },
      { id: 4, question: '"Swindle" is…',                       options: ['cheating', 'honesty', 'education'],     correct: 0, explanation: 'Direct word for fraud.' },
      { id: 5, question: '"Embellish" means…',                  options: ['exaggerate softly', 'tell truth', 'deny'], correct: 0, explanation: 'Adds artistic exaggeration.' },
      { id: 6, question: '"Bare-faced lie" is…',                options: ['shameless lie', 'compliment', 'joke'], correct: 0, explanation: 'Emphasizes shamelessness.' },
      { id: 7, question: '"Economical with the truth" sounds…', options: ['polite deception', 'insult', 'slang'],  correct: 0, explanation: 'Famous British political euphemism.' },
      { id: 8, question: '"Blow out of proportion" describes…', options: ['exaggeration', 'simplification', 'accuracy'], correct: 0, explanation: 'Vivid image of overblowing.' },
    ],
    sortingWords: [
      { word: 'mislead',                  type: 'euphemism' },
      { word: 'bend the rules',           type: 'euphemism' },
      { word: 'embellish',                type: 'euphemism' },
      { word: 'economical with the truth', type: 'euphemism' },
      { word: 'bullshit',                 type: 'dysphemism' },
      { word: 'bare-faced lie',           type: 'dysphemism' },
      { word: 'swindle',                  type: 'dysphemism' },
      { word: 'blow out of proportion',   type: 'dysphemism' },
    ],
    matchingPairs: [
      { id: 1, left: 'lie',         right: 'mislead' },
      { id: 2, left: 'cheat',       right: 'bend the rules' },
      { id: 3, left: 'exaggerate',  right: 'embellish' },
      { id: 4, left: 'hide truth',  right: 'economical with the truth' },
    ],
  },
];

// ── Helpers ───────────────────────────────────────────────────────
export const getTopic = (id: string): TopicContent | undefined =>
  topics.find(t => t.id === id);

export const colorClasses: Record<TopicContent['color'], { bg: string; bgLight: string; text: string; border: string }> = {
  rose:    { bg: 'bg-rose-600',    bgLight: 'bg-rose-50',    text: 'text-rose-600',    border: 'border-rose-200' },
  amber:   { bg: 'bg-amber-600',   bgLight: 'bg-amber-50',   text: 'text-amber-600',   border: 'border-amber-200' },
  emerald: { bg: 'bg-emerald-600', bgLight: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200' },
  indigo:  { bg: 'bg-indigo-600',  bgLight: 'bg-indigo-50',  text: 'text-indigo-600',  border: 'border-indigo-200' },
  violet:  { bg: 'bg-violet-600',  bgLight: 'bg-violet-50',  text: 'text-violet-600',  border: 'border-violet-200' },
  cyan:    { bg: 'bg-cyan-600',    bgLight: 'bg-cyan-50',    text: 'text-cyan-600',    border: 'border-cyan-200' },
  orange:  { bg: 'bg-orange-600',  bgLight: 'bg-orange-50',  text: 'text-orange-600',  border: 'border-orange-200' },
  fuchsia: { bg: 'bg-fuchsia-600', bgLight: 'bg-fuchsia-50', text: 'text-fuchsia-600', border: 'border-fuchsia-200' },
  sky:     { bg: 'bg-sky-600',     bgLight: 'bg-sky-50',     text: 'text-sky-600',     border: 'border-sky-200' },
  slate:   { bg: 'bg-slate-700',   bgLight: 'bg-slate-100',  text: 'text-slate-700',   border: 'border-slate-300' },
};
