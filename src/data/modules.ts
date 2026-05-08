// src/data/modules.ts
// Метаданные 10 модулей платформы.
// Контент (vocab, reading, listening, writing) подгружается отдельно — Этап 2.

export type ModuleId =
  | 'our-world'
  | 'daily-life'
  | 'entertainment'
  | 'sport-health'
  | 'reading-pleasure'
  | 'natural-world'
  | 'travel-transport'
  | 'food-drink'
  | 'world-of-work'
  | 'word-shades'; // эвфемизмы — спец. модуль

export type SectionType = 'vocab' | 'reading' | 'listening' | 'writing' | 'speaking';

export interface ModuleSection {
  type: SectionType;
  available: boolean; // false = "Coming soon"
}

export interface Module {
  id: ModuleId;
  number: number | null; // null для спец-модуля Word Shades
  title: string;
  subtitle: string;
  description: string;
  topics: string[]; // основные темы лексики
  color: 'blue' | 'sky' | 'cyan' | 'indigo' | 'violet' | 'emerald' | 'amber' | 'rose' | 'orange' | 'fuchsia';
  emoji: string;
  sections: ModuleSection[];
  isSpecial?: boolean; // выделяем Word Shades
}

export const modules: Module[] = [
  {
    id: 'our-world',
    number: 1,
    title: 'Our World',
    subtitle: 'Global issues & habitats',
    description: 'Talk about the planet, ecosystems and natural disasters.',
    topics: ['Global issues', 'Habitats', 'Natural disasters', 'Phrasal verbs: give'],
    color: 'emerald',
    emoji: '🌍',
    sections: [
      { type: 'vocab', available: false },
      { type: 'reading', available: false },
      { type: 'listening', available: false },
      { type: 'writing', available: false },
      { type: 'speaking', available: false },
    ],
  },
  {
    id: 'daily-life',
    number: 2,
    title: 'Daily Life & Shopping',
    subtitle: 'Routines & lifestyle',
    description: 'Describe everyday activities, free time and shopping.',
    topics: ['Daily routines', 'Leisure activities', 'Clothing & shoes', 'Phrasal verbs: look'],
    color: 'amber',
    emoji: '🛍️',
    sections: [
      { type: 'vocab', available: false },
      { type: 'reading', available: false },
      { type: 'listening', available: false },
      { type: 'writing', available: false },
      { type: 'speaking', available: false },
    ],
  },
  {
    id: 'entertainment',
    number: 3,
    title: 'Entertainment & Media',
    subtitle: 'TV, movies & online life',
    description: 'Discuss films, TV programmes and modern media.',
    topics: ['Entertainment', 'Water experiences', 'TV programmes', 'Phrasal verbs: keep'],
    color: 'fuchsia',
    emoji: '🎬',
    sections: [
      { type: 'vocab', available: false },
      { type: 'reading', available: false },
      { type: 'listening', available: false },
      { type: 'writing', available: false },
      { type: 'speaking', available: false },
    ],
  },
  {
    id: 'sport-health',
    number: 4,
    title: 'Sport, Health & Exercise',
    subtitle: 'Body, mind & movement',
    description: 'Stay healthy, talk about sports and fitness.',
    topics: ['Physical activities', 'Sport', 'Phrasal verbs: put'],
    color: 'rose',
    emoji: '⚽',
    sections: [
      { type: 'vocab', available: false },
      { type: 'reading', available: false },
      { type: 'listening', available: false },
      { type: 'writing', available: false },
      { type: 'speaking', available: false },
    ],
  },
  {
    id: 'reading-pleasure',
    number: 5,
    title: 'Reading for Pleasure',
    subtitle: 'Stories & characters',
    description: 'Explore characters and the joy of reading.',
    topics: ['Characters', 'Phrasal verbs: go'],
    color: 'indigo',
    emoji: '📖',
    sections: [
      { type: 'vocab', available: false },
      { type: 'reading', available: false },
      { type: 'listening', available: false },
      { type: 'writing', available: false },
      { type: 'speaking', available: false },
    ],
  },
  {
    id: 'natural-world',
    number: 6,
    title: 'The Natural World',
    subtitle: 'Flora & fauna',
    description: 'From flowers to endangered species.',
    topics: ['Flowers', 'Endangered animals', 'Phrasal verbs: hang'],
    color: 'emerald',
    emoji: '🌿',
    sections: [
      { type: 'vocab', available: false },
      { type: 'reading', available: false },
      { type: 'listening', available: false },
      { type: 'writing', available: false },
      { type: 'speaking', available: false },
    ],
  },
  {
    id: 'travel-transport',
    number: 7,
    title: 'Travel & Transport',
    subtitle: 'On the move',
    description: 'Plan trips, read signs, navigate cities.',
    topics: ['Signs', 'Sightseeing', 'Means of transport', 'Phrasal verbs: make'],
    color: 'sky',
    emoji: '✈️',
    sections: [
      { type: 'vocab', available: false },
      { type: 'reading', available: false },
      { type: 'listening', available: false },
      { type: 'writing', available: false },
      { type: 'speaking', available: false },
    ],
  },
  {
    id: 'food-drink',
    number: 8,
    title: 'Food & Drink',
    subtitle: 'Tastes & cooking',
    description: 'Order food, describe meals, talk recipes.',
    topics: ['Foods & drinks', 'Cooking methods', 'Phrasal verbs: break'],
    color: 'orange',
    emoji: '🍽️',
    sections: [
      { type: 'vocab', available: false },
      { type: 'reading', available: false },
      { type: 'listening', available: false },
      { type: 'writing', available: false },
      { type: 'speaking', available: false },
    ],
  },
  {
    id: 'world-of-work',
    number: 9,
    title: 'The World of Work',
    subtitle: 'Jobs & careers',
    description: 'Discuss professions and the workplace.',
    topics: ['Work & jobs', 'Professions', 'Phrasal verbs: take'],
    color: 'violet',
    emoji: '💼',
    sections: [
      { type: 'vocab', available: false },
      { type: 'reading', available: false },
      { type: 'listening', available: false },
      { type: 'writing', available: false },
      { type: 'speaking', available: false },
    ],
  },
  // ─────────── СПЕЦ-МОДУЛЬ — твоя дипломная фишка ───────────
  {
    id: 'word-shades',
    number: null,
    title: 'Word Shades',
    subtitle: 'Euphemisms & dysphemisms',
    description: 'Learn to feel the difference between soft and harsh wording.',
    topics: ['Euphemisms', 'Dysphemisms', 'Style & register', 'Cultural sensitivity'],
    color: 'cyan',
    emoji: '🎭',
    isSpecial: true,
    sections: [
      { type: 'vocab', available: true },     // ← ваш существующий /vocab
      { type: 'reading', available: false },  // в этапе 2
      { type: 'listening', available: false },
      { type: 'writing', available: true },   // ← ваш /writing (FillInTheGaps)
      { type: 'speaking', available: false },
    ],
  },
];

// ── Утилиты ───────────────────────────────────────────────────────────────

export const getModuleById = (id: string): Module | undefined =>
  modules.find(m => m.id === id);

export const sectionLabels: Record<SectionType, string> = {
  vocab: 'Vocabulary',
  reading: 'Reading',
  listening: 'Listening',
  writing: 'Writing',
  speaking: 'Speaking',
};

export const sectionDescriptions: Record<SectionType, string> = {
  vocab: 'Learn key words & phrases',
  reading: 'Read texts & answer questions',
  listening: 'Listen and complete tasks',
  writing: 'Practice sentence formation',
  speaking: 'Record yourself speaking',
};

// Цветовые схемы для tailwind. Используем фиксированные классы,
// чтобы tailwind не вырезал их при purge.
export const colorClasses: Record<Module['color'], {
  bg: string;
  bgLight: string;
  text: string;
  border: string;
  ring: string;
}> = {
  blue:    { bg: 'bg-blue-600',    bgLight: 'bg-blue-50',    text: 'text-blue-600',    border: 'border-blue-200',    ring: 'ring-blue-400' },
  sky:     { bg: 'bg-sky-600',     bgLight: 'bg-sky-50',     text: 'text-sky-600',     border: 'border-sky-200',     ring: 'ring-sky-400' },
  cyan:    { bg: 'bg-cyan-600',    bgLight: 'bg-cyan-50',    text: 'text-cyan-600',    border: 'border-cyan-200',    ring: 'ring-cyan-400' },
  indigo:  { bg: 'bg-indigo-600',  bgLight: 'bg-indigo-50',  text: 'text-indigo-600',  border: 'border-indigo-200',  ring: 'ring-indigo-400' },
  violet:  { bg: 'bg-violet-600',  bgLight: 'bg-violet-50',  text: 'text-violet-600',  border: 'border-violet-200',  ring: 'ring-violet-400' },
  emerald: { bg: 'bg-emerald-600', bgLight: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', ring: 'ring-emerald-400' },
  amber:   { bg: 'bg-amber-600',   bgLight: 'bg-amber-50',   text: 'text-amber-600',   border: 'border-amber-200',   ring: 'ring-amber-400' },
  rose:    { bg: 'bg-rose-600',    bgLight: 'bg-rose-50',    text: 'text-rose-600',    border: 'border-rose-200',    ring: 'ring-rose-400' },
  orange:  { bg: 'bg-orange-600',  bgLight: 'bg-orange-50',  text: 'text-orange-600',  border: 'border-orange-200',  ring: 'ring-orange-400' },
  fuchsia: { bg: 'bg-fuchsia-600', bgLight: 'bg-fuchsia-50', text: 'text-fuchsia-600', border: 'border-fuchsia-200', ring: 'ring-fuchsia-400' },
};