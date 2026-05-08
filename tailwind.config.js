/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Бело-голубая тема сайта
        background: '#F8FAFC', // Очень светлый серо-голубой для фона
        primary: '#E0F2FE',    // Светло-голубой (sky-100)
        secondary: '#BAE6FD',  // Голубой для кнопок/выделений (sky-200)
        accent: '#0284C7',     // Насыщенный синий для текста и активных кнопок

        // Цвета для нашей терминологии
        euphemism: '#16A34A',      // Зеленый для эвфемизмов (мягких слов)
        euphemismBg: '#DCFCE7',    // Светло-зеленый фон
        dysphemism: '#DC2626',     // Красный для дисфемизмов (грубых слов)
        dysphemismBg: '#FEE2E2',   // Светло-красный фон
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Понятный и чистый шрифт
      }
    },
  },
  plugins:[],
};