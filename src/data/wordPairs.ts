// src/data/wordPairs.ts
// 95 нейтральных понятий × 2 слова (эвфемизм + дисфемизм) = 190 слов
// (категория 'alcohol' удалена — id 56–60)

export type Category =
  | 'death'
  | 'age'
  | 'poverty'
  | 'employment'
  | 'health'
  | 'body'
  | 'crime'
  | 'war'
  | 'intelligence'
  | 'dishonesty'
  | 'relationships';

export interface WordPair {
  id: number;
  category: Category;
  neutral: string;
  neutralTranslation: string;
  euphemism: string;
  euphTranslation: string;
  euphDesc: string;
  dysphemism: string;
  dyshTranslation: string;
  dyshDesc: string;
}

export const wordPairs: WordPair[] = [
  // ── DEATH ────────────────────────────────────────────────
  { id: 1, category: 'death', neutral: 'Die', neutralTranslation: 'Умереть', euphemism: 'Pass away', euphTranslation: 'Скончаться', euphDesc: 'Деликатно и с уважением сообщает о смерти.', dysphemism: 'Kick the bucket', dyshTranslation: 'Сыграть в ящик', dyshDesc: 'Грубое, почти комичное отношение к смерти.' },
  { id: 2, category: 'death', neutral: 'Die', neutralTranslation: 'Умереть', euphemism: 'Depart this world', euphTranslation: 'Покинуть этот мир', euphDesc: 'Поэтичный способ говорить о смерти.', dysphemism: 'Croak', dyshTranslation: 'Отдать концы', dyshDesc: 'Пренебрежительное сравнение смерти со звуком лягушки.' },
  { id: 3, category: 'death', neutral: 'Die', neutralTranslation: 'Умереть', euphemism: 'Go to a better place', euphTranslation: 'Уйти в лучший мир', euphDesc: 'Религиозно-оптимистичный взгляд на смерть.', dysphemism: 'Bite the dust', dyshTranslation: 'Отбросить копыта', dyshDesc: 'Военный жаргон, звучит резко и грубо.' },
  { id: 4, category: 'death', neutral: 'Die', neutralTranslation: 'Умереть', euphemism: "Lose one's battle", euphTranslation: 'Проиграть борьбу (с болезнью)', euphDesc: 'Часто используется при смерти от болезни — подчёркивает борьбу.', dysphemism: 'Snuff it', dyshTranslation: 'Дать дуба', dyshDesc: 'Сленговое выражение, характерное для британского диалекта.' },
  { id: 5, category: 'death', neutral: 'Die', neutralTranslation: 'Умереть', euphemism: 'Rest in peace', euphTranslation: 'Покоиться с миром', euphDesc: 'Традиционная формула, выражающая уважение и покой.', dysphemism: 'Bought the farm', dyshTranslation: 'Сыграл в ящик (амер.)', dyshDesc: 'Американский военный сленг, звучит цинично.' },

  // ── AGE ──────────────────────────────────────────────────
  { id: 6, category: 'age', neutral: 'Old', neutralTranslation: 'Старый', euphemism: 'Senior citizen', euphTranslation: 'Пожилой человек', euphDesc: 'Официальный уважительный термин, принятый в обществе.', dysphemism: 'Geezer', dyshTranslation: 'Старикан', dyshDesc: 'Пренебрежительное, обесценивающее отношение к возрасту.' },
  { id: 7, category: 'age', neutral: 'Old', neutralTranslation: 'Старый', euphemism: 'Golden years', euphTranslation: 'Золотые годы', euphDesc: 'Романтизирует старость как лучший период жизни.', dysphemism: 'Over the hill', dyshTranslation: 'Уже на склоне лет', dyshDesc: 'Намекает на то, что лучшие годы уже позади.' },
  { id: 8, category: 'age', neutral: 'Old', neutralTranslation: 'Старый', euphemism: 'Mature', euphTranslation: 'Зрелый', euphDesc: 'Подчёркивает мудрость и опыт, а не возраст.', dysphemism: 'Ancient', dyshTranslation: 'Допотопный / Ископаемый', dyshDesc: 'Сравнивает человека с исторической древностью.' },
  { id: 9, category: 'age', neutral: 'Old person', neutralTranslation: 'Пожилой человек', euphemism: 'Seasoned individual', euphTranslation: 'Опытный человек', euphDesc: 'Акцент на богатом жизненном опыте.', dysphemism: 'Old fogey', dyshTranslation: 'Старый ретроград', dyshDesc: 'Намекает на отсталость взглядов человека.' },
  { id: 10, category: 'age', neutral: 'Old', neutralTranslation: 'Старый', euphemism: 'Experienced', euphTranslation: 'Бывалый', euphDesc: 'Нейтрально-позитивный акцент на компетентности.', dysphemism: 'Past it', dyshTranslation: 'Выжатый лимон', dyshDesc: 'Говорит о том, что человек уже не способен на что-то.' },

  // ── POVERTY ──────────────────────────────────────────────
  { id: 11, category: 'poverty', neutral: 'Poor', neutralTranslation: 'Бедный', euphemism: 'Underprivileged', euphTranslation: 'Малообеспеченный', euphDesc: 'Смещает акцент с личности на социальные условия.', dysphemism: 'Broke', dyshTranslation: 'На мели', dyshDesc: 'Грубая констатация финансового провала.' },
  { id: 12, category: 'poverty', neutral: 'Poor', neutralTranslation: 'Бедный', euphemism: 'Low-income', euphTranslation: 'С низким доходом', euphDesc: 'Статистический, безличный термин без осуждения.', dysphemism: 'Penniless', dyshTranslation: 'Нищий', dyshDesc: 'Подчёркивает полное отсутствие денег.' },
  { id: 13, category: 'poverty', neutral: 'Poor', neutralTranslation: 'Бедный', euphemism: 'Economically disadvantaged', euphTranslation: 'В трудных экономических условиях', euphDesc: 'Формальный термин, снимающий личную ответственность.', dysphemism: 'Flat broke', dyshTranslation: 'Полный ноль', dyshDesc: 'Усиленная форма, ни копейки за душой.' },
  { id: 14, category: 'poverty', neutral: 'Poor', neutralTranslation: 'Бедный', euphemism: 'Of modest means', euphTranslation: 'Скромного достатка', euphDesc: 'Элегантно преуменьшает финансовые трудности.', dysphemism: 'Dirt poor', dyshTranslation: 'Нищий как церковная мышь', dyshDesc: 'Крайне выразительный, образный дисфемизм.' },
  { id: 15, category: 'poverty', neutral: 'In debt', neutralTranslation: 'В долгах', euphemism: 'Financially overextended', euphTranslation: 'Перегруженный обязательствами', euphDesc: 'Формальный эвфемизм, принятый в деловой среде.', dysphemism: 'Drowning in debt', dyshTranslation: 'Тонет в долгах', dyshDesc: 'Яркая метафора, передающая отчаяние ситуации.' },

  // ── EMPLOYMENT ───────────────────────────────────────────
  { id: 16, category: 'employment', neutral: 'Fired', neutralTranslation: 'Уволен', euphemism: 'Let go', euphTranslation: 'Отпущен', euphDesc: 'Снимает личную ответственность с работника.', dysphemism: 'Sacked', dyshTranslation: 'Выгнали', dyshDesc: 'Резкое, жёсткое описание потери работы.' },
  { id: 17, category: 'employment', neutral: 'Fired', neutralTranslation: 'Уволен', euphemism: 'Made redundant', euphTranslation: 'Сокращён', euphDesc: 'Акцент на корпоративных процессах, а не на человеке.', dysphemism: 'Booted out', dyshTranslation: 'Вышвырнули', dyshDesc: 'Говорит об увольнении как о физическом выдворении.' },
  { id: 18, category: 'employment', neutral: 'Fired', neutralTranslation: 'Уволен', euphemism: 'Downsized', euphTranslation: 'Попал под сокращение', euphDesc: 'Безличный термин из корпоративного лексикона.', dysphemism: 'Axed', dyshTranslation: 'Отрубили', dyshDesc: 'Метафора топора — резко и без предупреждения.' },
  { id: 19, category: 'employment', neutral: 'Fired', neutralTranslation: 'Уволен', euphemism: 'Released from duties', euphTranslation: 'Освобождён от обязанностей', euphDesc: 'Официальная формулировка, максимально нейтральная.', dysphemism: 'Canned', dyshTranslation: 'Выставили за дверь', dyshDesc: 'Американский сленг, звучит пренебрежительно.' },
  { id: 20, category: 'employment', neutral: 'Unemployed', neutralTranslation: 'Безработный', euphemism: 'Between jobs', euphTranslation: 'В процессе поиска работы', euphDesc: 'Временная формулировка, сохраняет достоинство человека.', dysphemism: 'Jobless', dyshTranslation: 'Без работы', dyshDesc: 'Прямолинейно и без прикрас.' },
  { id: 21, category: 'employment', neutral: 'Unemployed', neutralTranslation: 'Безработный', euphemism: 'Seeking new opportunities', euphTranslation: 'В поиске новых возможностей', euphDesc: 'Позитивный взгляд, акцент на будущем.', dysphemism: 'On the dole', dyshTranslation: 'На пособии', dyshDesc: 'Британский сленг с оттенком социального осуждения.' },
  { id: 22, category: 'employment', neutral: 'Fired', neutralTranslation: 'Уволен', euphemism: 'Transitioned out', euphTranslation: 'Вышел из проекта', euphDesc: 'Корпоративный эвфемизм, скрывающий принудительность.', dysphemism: 'Dumped', dyshTranslation: 'Выкинули', dyshDesc: 'Звучит как отказ от ненужного предмета.' },
  { id: 23, category: 'employment', neutral: 'Retired', neutralTranslation: 'Вышел на пенсию', euphemism: 'Entered a new chapter', euphTranslation: 'Открыл новую страницу жизни', euphDesc: 'Оптимистично представляет пенсию как начало.', dysphemism: 'Put out to pasture', dyshTranslation: 'Отправили на пенсию (как старую лошадь)', dyshDesc: 'Сравнивает уход на пенсию с выбраковкой скота.' },

  // ── HEALTH ───────────────────────────────────────────────
  { id: 24, category: 'health', neutral: 'Sick', neutralTranslation: 'Больной', euphemism: 'Under the weather', euphTranslation: 'Немного приболел', euphDesc: 'Мягкое выражение, не вызывающее тревоги.', dysphemism: 'Sick as a dog', dyshTranslation: 'Болен как собака', dyshDesc: 'Яркий образ крайне плохого самочувствия.' },
  { id: 25, category: 'health', neutral: 'Sick', neutralTranslation: 'Больной', euphemism: 'Indisposed', euphTranslation: 'Недомогающий', euphDesc: 'Формальный и вежливый способ сообщить о болезни.', dysphemism: 'Falling apart', dyshTranslation: 'Разваливается на части', dyshDesc: 'Преувеличенная метафора ухудшения здоровья.' },
  { id: 26, category: 'health', neutral: 'Mentally ill', neutralTranslation: 'Психически болен', euphemism: 'Mentally challenged', euphTranslation: 'С особенностями психики', euphDesc: 'Принятый клинический термин, избегающий стигматизации.', dysphemism: 'Crazy', dyshTranslation: 'Сумасшедший', dyshDesc: 'Стигматизирующий ярлык с оттенком насмешки.' },
  { id: 27, category: 'health', neutral: 'Mentally ill', neutralTranslation: 'Психически болен', euphemism: 'Emotionally struggling', euphTranslation: 'Переживающий трудности', euphDesc: 'Акцент на человеческом опыте, а не диагнозе.', dysphemism: 'Nuts', dyshTranslation: 'Псих', dyshDesc: 'Грубое пренебрежительное слово без сочувствия.' },
  { id: 28, category: 'health', neutral: 'Blind', neutralTranslation: 'Слепой', euphemism: 'Visually impaired', euphTranslation: 'С нарушением зрения', euphDesc: 'Медицинский термин, нейтральный и точный.', dysphemism: 'Blind as a bat', dyshTranslation: 'Слепой как крот', dyshDesc: 'Фразеологизм с пренебрежительным оттенком.' },
  { id: 29, category: 'health', neutral: 'Deaf', neutralTranslation: 'Глухой', euphemism: 'Hard of hearing', euphTranslation: 'С нарушением слуха', euphDesc: 'Деликатная формулировка без акцента на ограничении.', dysphemism: 'Stone deaf', dyshTranslation: 'Глухой как пень', dyshDesc: 'Метафора полной потери слуха, звучит грубо.' },
  { id: 30, category: 'health', neutral: 'Disabled', neutralTranslation: 'Инвалид', euphemism: 'Differently abled', euphTranslation: 'С особыми возможностями', euphDesc: 'Переосмысляет ограничения как особые способности.', dysphemism: 'Crippled', dyshTranslation: 'Калека', dyshDesc: 'Устаревший и оскорбительный термин.' },

  // ── BODY / WEIGHT ────────────────────────────────────────
  { id: 31, category: 'body', neutral: 'Fat', neutralTranslation: 'Толстый', euphemism: 'Full-figured', euphTranslation: 'Пышнотелый', euphDesc: 'Принятый в индустрии моды позитивный термин.', dysphemism: 'Obese', dyshTranslation: 'Ожирение', dyshDesc: 'Клинически точен, но в разговоре звучит резко.' },
  { id: 32, category: 'body', neutral: 'Fat', neutralTranslation: 'Толстый', euphemism: 'Heavyset', euphTranslation: 'Плотного телосложения', euphDesc: 'Нейтральное описание комплекции без осуждения.', dysphemism: 'Chubby', dyshTranslation: 'Пухлый', dyshDesc: 'Звучит снисходительно, часто обидно.' },
  { id: 33, category: 'body', neutral: 'Fat', neutralTranslation: 'Толстый', euphemism: 'Curvy', euphTranslation: 'Фигуристый', euphDesc: 'Позитивное переосмысление, принятое в бьюти-культуре.', dysphemism: 'Lard', dyshTranslation: 'Жиртрест', dyshDesc: 'Крайне грубое сравнение с жиром.' },
  { id: 34, category: 'body', neutral: 'Thin', neutralTranslation: 'Худой', euphemism: 'Slender', euphTranslation: 'Стройный', euphDesc: 'Позитивная коннотация, ассоциируется с элегантностью.', dysphemism: 'Skinny', dyshTranslation: 'Кожа да кости', dyshDesc: 'Намекает на болезненную худобу или недоедание.' },
  { id: 35, category: 'body', neutral: 'Ugly', neutralTranslation: 'Некрасивый', euphemism: 'Unconventionally attractive', euphTranslation: 'Красивый по-своему', euphDesc: 'Деликатный и уважительный способ уйти от оценок.', dysphemism: 'Hideous', dyshTranslation: 'Ужасный', dyshDesc: 'Резкое и категоричное осуждение внешности.' },

  // ── CRIME / PRISON ───────────────────────────────────────
  { id: 36, category: 'crime', neutral: 'Prison', neutralTranslation: 'Тюрьма', euphemism: 'Correctional facility', euphTranslation: 'Исправительное учреждение', euphDesc: 'Официальный термин, акцент на исправлении, а не наказании.', dysphemism: 'The slammer', dyshTranslation: 'Кутузка', dyshDesc: 'Жаргонное название тюрьмы с грубоватым оттенком.' },
  { id: 37, category: 'crime', neutral: 'Prison', neutralTranslation: 'Тюрьма', euphemism: 'Detention center', euphTranslation: 'Центр содержания под стражей', euphDesc: 'Нейтральная бюрократическая формулировка.', dysphemism: 'The joint', dyshTranslation: 'Зона', dyshDesc: 'Тюремный сленг, принятый в криминальной среде.' },
  { id: 38, category: 'crime', neutral: 'Steal', neutralTranslation: 'Красть', euphemism: 'Borrow without permission', euphTranslation: 'Взять без разрешения', euphDesc: 'Комически мягкое переосмысление кражи.', dysphemism: 'Pinch', dyshTranslation: 'Стянуть / Цапнуть', dyshDesc: 'Разговорное слово с пренебрежительным оттенком.' },
  { id: 39, category: 'crime', neutral: 'Criminal', neutralTranslation: 'Преступник', euphemism: 'Person with a record', euphTranslation: 'Человек с судимостью', euphDesc: 'Подчёркивает прошлое, а не определяет личность.', dysphemism: 'Crook', dyshTranslation: 'Жулик', dyshDesc: 'Жаргонное слово с пренебрежением и осуждением.' },
  { id: 40, category: 'crime', neutral: 'Arrested', neutralTranslation: 'Арестован', euphemism: 'Taken into custody', euphTranslation: 'Взят под стражу', euphDesc: 'Официальная полицейская формулировка.', dysphemism: 'Busted', dyshTranslation: 'Замели', dyshDesc: 'Разговорный сленг с ироничным оттенком.' },

  // ── WAR / CONFLICT ───────────────────────────────────────
  { id: 41, category: 'war', neutral: 'Kill (civilian)', neutralTranslation: 'Убить мирного жителя', euphemism: 'Collateral damage', euphTranslation: 'Сопутствующий ущерб', euphDesc: 'Военный термин, скрывающий человеческую трагедию.', dysphemism: 'Massacre', dyshTranslation: 'Резня', dyshDesc: 'Прямо и жестоко называет происходящее.' },
  { id: 42, category: 'war', neutral: 'Kill (enemy)', neutralTranslation: 'Убить противника', euphemism: 'Neutralize', euphTranslation: 'Нейтрализовать', euphDesc: 'Технический военный термин, убирающий эмоции.', dysphemism: 'Take out', dyshTranslation: 'Ликвидировать', dyshDesc: 'Деловой сленг, как будто речь идёт о задаче.' },
  { id: 43, category: 'war', neutral: 'Torture', neutralTranslation: 'Пытки', euphemism: 'Enhanced interrogation', euphTranslation: 'Усиленный допрос', euphDesc: 'Официальный эвфемизм, скрывающий жестокость.', dysphemism: 'Brutal treatment', dyshTranslation: 'Зверское обращение', dyshDesc: 'Прямо называет жестокость без прикрас.' },
  { id: 44, category: 'war', neutral: 'War', neutralTranslation: 'Война', euphemism: 'Military operation', euphTranslation: 'Военная операция', euphDesc: 'Нейтрализует масштаб конфликта официальным языком.', dysphemism: 'Bloodbath', dyshTranslation: 'Кровавая баня', dyshDesc: 'Шокирующий образ, передающий весь ужас войны.' },
  { id: 45, category: 'war', neutral: 'Retreat', neutralTranslation: 'Отступление', euphemism: 'Strategic withdrawal', euphTranslation: 'Стратегическое отступление', euphDesc: 'Превращает поражение в тактический манёвр.', dysphemism: 'Flee', dyshTranslation: 'Бежать / Драпать', dyshDesc: 'Показывает отступление как трусость.' },

  // ── INTELLIGENCE ─────────────────────────────────────────
  { id: 46, category: 'intelligence', neutral: 'Stupid', neutralTranslation: 'Глупый', euphemism: 'Not academically inclined', euphTranslation: 'Не склонный к учёбе', euphDesc: 'Мягко описывает трудности в обучении.', dysphemism: 'Thick', dyshTranslation: 'Тупой', dyshDesc: 'Прямолинейное оскорбление без прикрас.' },
  { id: 47, category: 'intelligence', neutral: 'Stupid', neutralTranslation: 'Глупый', euphemism: 'Slow learner', euphTranslation: 'Медленно обучающийся', euphDesc: 'Педагогический термин, избегающий осуждения.', dysphemism: 'Dimwit', dyshTranslation: 'Тупица', dyshDesc: 'Пренебрежительное прозвище.' },
  { id: 48, category: 'intelligence', neutral: 'Naive', neutralTranslation: 'Наивный', euphemism: 'Trusting', euphTranslation: 'Доверчивый', euphDesc: 'Переосмысляет наивность как положительное качество.', dysphemism: 'Gullible', dyshTranslation: 'Простофиля', dyshDesc: 'Подчёркивает уязвимость и лёгкость обмана.' },
  { id: 49, category: 'intelligence', neutral: 'Forgetful', neutralTranslation: 'Забывчивый', euphemism: 'Absent-minded', euphTranslation: 'Рассеянный', euphDesc: 'Описывает рассеянность как черту мыслителя.', dysphemism: 'Scatterbrained', dyshTranslation: 'Безголовый', dyshDesc: 'Говорит о хаосе в голове с насмешкой.' },
  { id: 50, category: 'intelligence', neutral: 'Clumsy', neutralTranslation: 'Неуклюжий', euphemism: 'Accident-prone', euphTranslation: 'Склонный к небольшим инцидентам', euphDesc: 'Нейтрально описывает неловкость без насмешки.', dysphemism: 'Butterfingers', dyshTranslation: 'Растяпа', dyshDesc: 'Прозвище, высмеивающее неуклюжесть.' },

  // ── DISHONESTY ───────────────────────────────────────────
  { id: 51, category: 'dishonesty', neutral: 'Lie', neutralTranslation: 'Ложь', euphemism: 'Economical with the truth', euphTranslation: 'Избирательная правда', euphDesc: 'Британский эвфемизм, популярный в политике.', dysphemism: 'Bare-faced lie', dyshTranslation: 'Наглая ложь', dyshDesc: 'Акцент на бесстыдстве лжеца.' },
  { id: 52, category: 'dishonesty', neutral: 'Lie', neutralTranslation: 'Ложь', euphemism: 'Mislead', euphTranslation: 'Ввести в заблуждение', euphDesc: 'Смягчает намеренность обмана.', dysphemism: 'Bullshit', dyshTranslation: 'Чушь / Брехня', dyshDesc: 'Грубое слово, отвергающее сказанное полностью.' },
  { id: 53, category: 'dishonesty', neutral: 'Exaggerate', neutralTranslation: 'Преувеличивать', euphemism: 'Embellish', euphTranslation: 'Приукрасить', euphDesc: 'Делает преувеличение художественным приёмом.', dysphemism: 'Blow out of proportion', dyshTranslation: 'Раздуть из мухи слона', dyshDesc: 'Ярко показывает нелепость преувеличения.' },
  { id: 54, category: 'dishonesty', neutral: 'Cheat', neutralTranslation: 'Мошенничать', euphemism: 'Bend the rules', euphTranslation: 'Немного отступить от правил', euphDesc: 'Преуменьшает нарушение, делая его безобидным.', dysphemism: 'Swindle', dyshTranslation: 'Надуть / Облапошить', dyshDesc: 'Подчёркивает намеренность и бесчестность.' },
  { id: 55, category: 'dishonesty', neutral: 'Bribe', neutralTranslation: 'Взятка', euphemism: 'Incentive payment', euphTranslation: 'Стимулирующий платёж', euphDesc: 'Корпоративный эвфемизм для коррупции.', dysphemism: 'Kickback', dyshTranslation: 'Откат', dyshDesc: 'Жаргон, разоблачающий коррупционную схему.' },

  // ── (alcohol удалена — id 56–60) ─────────────────────────

  // ── RELATIONSHIPS ────────────────────────────────────────
  { id: 61, category: 'relationships', neutral: 'Divorced', neutralTranslation: 'Разведён', euphemism: 'Separated', euphTranslation: 'В раздельном проживании', euphDesc: 'Мягкое слово, оставляющее возможность примирения.', dysphemism: 'Split up', dyshTranslation: 'Разошлись', dyshDesc: 'Резко и окончательно описывает разрыв.' },
  { id: 62, category: 'relationships', neutral: 'Cheating', neutralTranslation: 'Измена', euphemism: 'Seeing someone else', euphTranslation: 'Встречается с кем-то ещё', euphDesc: 'Нейтральная формулировка без морального осуждения.', dysphemism: 'Two-timing', dyshTranslation: 'Изменять за спиной', dyshDesc: 'Подчёркивает двойственность и предательство.' },
  { id: 63, category: 'relationships', neutral: 'Broke up', neutralTranslation: 'Расстались', euphemism: 'Went separate ways', euphTranslation: 'Пошли каждый своей дорогой', euphDesc: 'Взаимное и уважительное расставание.', dysphemism: 'Got dumped', dyshTranslation: 'Бросили', dyshDesc: 'Акцент на боли и унижении брошенного.' },
  { id: 64, category: 'relationships', neutral: 'Partner (unmarried)', neutralTranslation: 'Сожитель/сожительница', euphemism: 'Significant other', euphTranslation: 'Вторая половинка', euphDesc: 'Нейтральный уважительный термин для любого партнёра.', dysphemism: 'Shack-up', dyshTranslation: 'Сожитель', dyshDesc: 'Осуждающее слово с моральным подтекстом.' },

  // ── EXTRA MIXED ──────────────────────────────────────────
  { id: 65, category: 'employment', neutral: 'Spy', neutralTranslation: 'Шпион', euphemism: 'Intelligence operative', euphTranslation: 'Сотрудник разведки', euphDesc: 'Официальный термин, придающий профессиональность.', dysphemism: 'Mole', dyshTranslation: 'Крот', dyshDesc: 'Разведывательный жаргон с коннотацией предателя.' },
  { id: 66, category: 'health', neutral: 'Addiction', neutralTranslation: 'Зависимость', euphemism: 'Substance use disorder', euphTranslation: 'Расстройство употребления веществ', euphDesc: 'Клинический термин, убирающий стигму.', dysphemism: 'Habit', dyshTranslation: 'Пагубная привычка', dyshDesc: 'Преуменьшает серьёзность зависимости.' },
  { id: 67, category: 'poverty', neutral: 'Homeless', neutralTranslation: 'Бездомный', euphemism: 'Without fixed abode', euphTranslation: 'Без определённого места жительства', euphDesc: 'Официальная юридическая формулировка.', dysphemism: 'Vagrant', dyshTranslation: 'Бродяга', dyshDesc: 'Устаревшее слово с осуждающим оттенком.' },
  { id: 68, category: 'body', neutral: 'Sweat', neutralTranslation: 'Потеть', euphemism: 'Perspire', euphTranslation: 'Потеть (вежливо)', euphDesc: 'Буквально то же самое, но звучит культурно.', dysphemism: 'Dripping', dyshTranslation: 'Обливаться потом', dyshDesc: 'Создаёт яркий неприятный образ.' },
  { id: 69, category: 'crime', neutral: 'Hacker', neutralTranslation: 'Хакер', euphemism: 'Cybersecurity researcher', euphTranslation: 'Исследователь кибербезопасности', euphDesc: 'Легализует деятельность, акцентируя экспертизу.', dysphemism: 'Cyber criminal', dyshTranslation: 'Киберпреступник', dyshDesc: 'Прямо обвиняет в преступной деятельности.' },
  { id: 70, category: 'war', neutral: 'Bomb', neutralTranslation: 'Бомбить', euphemism: 'Conduct airstrikes', euphTranslation: 'Провести авиаудар', euphDesc: 'Технический термин, скрывающий разрушения.', dysphemism: 'Flatten', dyshTranslation: 'Сровнять с землёй', dyshDesc: 'Образ полного уничтожения без прикрас.' },
  { id: 71, category: 'intelligence', neutral: 'Lazy', neutralTranslation: 'Ленивый', euphemism: 'Laid-back', euphTranslation: 'Расслабленный', euphDesc: 'Переосмысляет лень как спокойный темп жизни.', dysphemism: 'Slacker', dyshTranslation: 'Лодырь', dyshDesc: 'Пренебрежительный ярлык для ленивого человека.' },
  { id: 72, category: 'dishonesty', neutral: 'Propaganda', neutralTranslation: 'Пропаганда', euphemism: 'Public information campaign', euphTranslation: 'Информационная кампания', euphDesc: 'Нейтральный термин, скрывающий манипуляцию.', dysphemism: 'Brainwashing', dyshTranslation: 'Промывка мозгов', dyshDesc: 'Резко обличает принудительное воздействие.' },
  { id: 73, category: 'health', neutral: 'Overwork', neutralTranslation: 'Переработка', euphemism: 'Dedicated professional', euphTranslation: 'Преданный своему делу', euphDesc: 'Превращает трудоголизм в добродетель.', dysphemism: 'Workaholic', dyshTranslation: 'Трудоголик-маньяк', dyshDesc: 'Намекает на болезненную одержимость работой.' },
  { id: 74, category: 'poverty', neutral: 'Second-hand', neutralTranslation: 'Подержанный', euphemism: 'Pre-loved', euphTranslation: 'Ранее использовавшийся с любовью', euphDesc: 'Маркетинговый эвфемизм, добавляющий тепло.', dysphemism: 'Used', dyshTranslation: 'Бэушный', dyshDesc: 'Прямо и без украшений описывает товар.' },
  { id: 75, category: 'relationships', neutral: 'Argue', neutralTranslation: 'Ссориться', euphemism: 'Have a disagreement', euphTranslation: 'Не сойтись во мнениях', euphDesc: 'Нейтрально, без драматизации конфликта.', dysphemism: 'Have a blazing row', dyshTranslation: 'Устроить скандал', dyshDesc: 'Образно и эмоционально описывает ссору.' },
  { id: 76, category: 'employment', neutral: 'Lazy employee', neutralTranslation: 'Ленивый сотрудник', euphemism: 'Works at their own pace', euphTranslation: 'Работает в своём темпе', euphDesc: 'Дипломатично описывает низкую продуктивность.', dysphemism: 'Good-for-nothing', dyshTranslation: 'Бездельник', dyshDesc: 'Жёсткая оценка без каких-либо смягчений.' },
  { id: 77, category: 'crime', neutral: 'Pickpocket', neutralTranslation: 'Карманник', euphemism: 'Light-fingered', euphTranslation: 'Лёгкая рука', euphDesc: 'Почти комплимент ловкости, скрывающий преступление.', dysphemism: 'Thief', dyshTranslation: 'Вор', dyshDesc: 'Прямо и без оправданий называет вещи своими именами.' },
  { id: 78, category: 'war', neutral: 'Spy on citizens', neutralTranslation: 'Следить за гражданами', euphemism: 'Surveillance program', euphTranslation: 'Программа наблюдения', euphDesc: 'Технический термин, убирающий тревожный подтекст.', dysphemism: 'Big Brother spying', dyshTranslation: 'Слежка Большого брата', dyshDesc: 'Отсылка к Оруэллу, передающая ужас тотального контроля.' },
  { id: 79, category: 'age', neutral: 'Young and inexperienced', neutralTranslation: 'Молодой и неопытный', euphemism: 'Early in their career', euphTranslation: 'В начале карьерного пути', euphDesc: 'Позитивно представляет неопытность как потенциал.', dysphemism: 'Wet behind the ears', dyshTranslation: 'Зелёный юнец', dyshDesc: 'Подчёркивает наивность и незрелость.' },
  { id: 80, category: 'body', neutral: 'Wrinkles', neutralTranslation: 'Морщины', euphemism: 'Expression lines', euphTranslation: 'Линии мимики', euphDesc: 'Косметологический эвфемизм, акцент на богатстве эмоций.', dysphemism: "Crow's feet", dyshTranslation: 'Гусиные лапки', dyshDesc: 'Образное сравнение, популярное в разговорной речи.' },
  { id: 81, category: 'intelligence', neutral: 'Fail an exam', neutralTranslation: 'Провалить экзамен', euphemism: 'Did not meet the standard', euphTranslation: 'Не достиг необходимого уровня', euphDesc: 'Нейтральный академический язык без осуждения.', dysphemism: 'Bombed the test', dyshTranslation: 'Завалил тест', dyshDesc: 'Образ катастрофы подчёркивает полный провал.' },
  { id: 82, category: 'dishonesty', neutral: 'Gossip', neutralTranslation: 'Сплетни', euphemism: 'Share information', euphTranslation: 'Обмен информацией', euphDesc: 'Нейтрализует сплетни, делая их коммуникацией.', dysphemism: 'Badmouth', dyshTranslation: 'Чернить / Поливать грязью', dyshDesc: 'Акцент на вредоносности и злом умысле.' },
  { id: 83, category: 'health', neutral: 'Overweight child', neutralTranslation: 'Полный ребёнок', euphemism: 'Pleasantly plump', euphTranslation: 'Пухленький', euphDesc: 'Смягчает, но иногда воспринимается как снисхождение.', dysphemism: 'Tubby', dyshTranslation: 'Пузан', dyshDesc: 'Пренебрежительное прозвище, особенно обидное для детей.' },
  { id: 84, category: 'employment', neutral: 'Menial job', neutralTranslation: 'Низкооплачиваемая работа', euphemism: 'Entry-level position', euphTranslation: 'Стартовая позиция', euphDesc: 'Акцент на возможностях роста, а не статусе.', dysphemism: 'Dead-end job', dyshTranslation: 'Работа без будущего', dyshDesc: 'Говорит об отсутствии перспектив без смягчений.' },
  { id: 85, category: 'crime', neutral: 'Corrupt official', neutralTranslation: 'Коррумпированный чиновник', euphemism: 'Engaged in questionable practices', euphTranslation: 'Прибегающий к сомнительным методам', euphDesc: 'Размытая формулировка, избегающая прямого обвинения.', dysphemism: 'Bent cop', dyshTranslation: 'Продажный полицейский', dyshDesc: 'Прямое и презрительное обличение.' },
  { id: 86, category: 'relationships', neutral: 'Nagging', neutralTranslation: 'Придирки', euphemism: 'Persistent reminders', euphTranslation: 'Настойчивые напоминания', euphDesc: 'Превращает раздражающее поведение в заботу.', dysphemism: 'Henpecking', dyshTranslation: 'Пилить / Клевать мозг', dyshDesc: 'Образ курицы, клюющей без остановки.' },
  { id: 87, category: 'war', neutral: 'Occupation', neutralTranslation: 'Оккупация', euphemism: 'Peacekeeping mission', euphTranslation: 'Миротворческая миссия', euphDesc: 'Полностью меняет коннотацию военного присутствия.', dysphemism: 'Invasion', dyshTranslation: 'Вторжение', dyshDesc: 'Прямо называет агрессию без дипломатии.' },
  { id: 88, category: 'age', neutral: 'Child', neutralTranslation: 'Ребёнок', euphemism: 'Young person', euphTranslation: 'Молодой человек', euphDesc: 'Добавляет уважение и серьёзность.', dysphemism: 'Brat', dyshTranslation: 'Сорванец / Балбес', dyshDesc: 'Выражает раздражение от детского поведения.' },
  { id: 89, category: 'health', neutral: 'Nervous breakdown', neutralTranslation: 'Нервный срыв', euphemism: 'Hit a wall', euphTranslation: 'Выгорел', euphDesc: 'Метафора усталости, понятная без стигмы.', dysphemism: 'Cracked up', dyshTranslation: 'Сломался / Поехал крышей', dyshDesc: 'Грубо описывает психологический кризис.' },
  { id: 90, category: 'dishonesty', neutral: 'Plagiarism', neutralTranslation: 'Плагиат', euphemism: 'Drawing on existing work', euphTranslation: 'Опираться на существующие работы', euphDesc: 'Академический эвфемизм, скрывающий нечестность.', dysphemism: 'Stealing ideas', dyshTranslation: 'Воровство идей', dyshDesc: 'Прямо называет интеллектуальное воровство.' },
  { id: 91, category: 'intelligence', neutral: 'Boring person', neutralTranslation: 'Скучный человек', euphemism: 'Quiet and introspective', euphTranslation: 'Тихий и задумчивый', euphDesc: 'Переосмысляет скуку как склонность к размышлению.', dysphemism: 'Dull as dishwater', dyshTranslation: 'Скучный как серый день', dyshDesc: 'Яркое сравнение, не оставляющее сомнений.' },
  { id: 92, category: 'employment', neutral: 'Boring job', neutralTranslation: 'Скучная работа', euphemism: 'Routine position', euphTranslation: 'Должность с понятной структурой', euphDesc: 'Превращает монотонность в стабильность.', dysphemism: 'Soul-crushing job', dyshTranslation: 'Работа, убивающая всё живое', dyshDesc: 'Эмоционально сильный образ полного выгорания.' },
  { id: 93, category: 'body', neutral: 'Bald', neutralTranslation: 'Лысый', euphemism: 'Follicly challenged', euphTranslation: 'С особенностями роста волос', euphDesc: 'Ироничный, но уважительный эвфемизм.', dysphemism: 'Slap-head', dyshTranslation: 'Лысак', dyshDesc: 'Грубоватое прозвище, обидное для многих.' },
  { id: 94, category: 'poverty', neutral: 'Cheap product', neutralTranslation: 'Дешёвый товар', euphemism: 'Budget-friendly', euphTranslation: 'Доступный по цене', euphDesc: 'Маркетинговый эвфемизм, акцент на экономии.', dysphemism: 'Cheap junk', dyshTranslation: 'Дешёвая дрянь', dyshDesc: 'Презрительная оценка качества товара.' },
  { id: 95, category: 'health', neutral: 'Ugly scar', neutralTranslation: 'Шрам', euphemism: 'Battle scar', euphTranslation: 'Боевая отметина', euphDesc: 'Романтизирует шрам как знак преодоления.', dysphemism: 'Disfigured', dyshTranslation: 'Обезображенный', dyshDesc: 'Жёсткое слово, акцентирующее внешний дефект.' },
  { id: 96, category: 'relationships', neutral: 'Strict parent', neutralTranslation: 'Строгий родитель', euphemism: 'Firm but fair', euphTranslation: 'Требовательный, но справедливый', euphDesc: 'Представляет строгость как заботу и последовательность.', dysphemism: 'Control freak', dyshTranslation: 'Контролёр-параноик', dyshDesc: 'Критикует чрезмерный контроль с раздражением.' },
  { id: 97, category: 'crime', neutral: 'Tax evasion', neutralTranslation: 'Уклонение от налогов', euphemism: 'Tax planning', euphTranslation: 'Налоговое планирование', euphDesc: 'Корпоративный эвфемизм для незаконной оптимизации.', dysphemism: 'Robbing the state', dyshTranslation: 'Грабить государство', dyshDesc: 'Прямо и морально обличает уклонение от налогов.' },
  { id: 98, category: 'war', neutral: 'Propaganda leaflets', neutralTranslation: 'Пропагандистские листовки', euphemism: 'Informational materials', euphTranslation: 'Информационные материалы', euphDesc: 'Нейтральный термин без политической окраски.', dysphemism: 'Trash propaganda', dyshTranslation: 'Мусорная пропаганда', dyshDesc: 'Полностью обесценивает содержание.' },
  { id: 99, category: 'intelligence', neutral: 'Stubborn', neutralTranslation: 'Упрямый', euphemism: 'Determined', euphTranslation: 'Целеустремлённый', euphDesc: 'Превращает упрямство в ценное качество.', dysphemism: 'Pigheaded', dyshTranslation: 'Упёртый как баран', dyshDesc: 'Сравнение со свиньёй намеренно оскорбительно.' },
  { id: 100, category: 'dishonesty', neutral: 'Manipulation', neutralTranslation: 'Манипуляция', euphemism: 'Persuasion', euphTranslation: 'Убеждение', euphDesc: 'Нейтрализует манипуляцию, приравнивая её к диалогу.', dysphemism: 'Mind games', dyshTranslation: 'Игры разума / Промывка мозгов', dyshDesc: 'Подчёркивает психологическое давление и нечестность.' },
];

// ── Вспомогательные данные для игр ─────────────────────────

/** Все 190 отдельных слов для SortingGame */
export const sortingWords = wordPairs.flatMap((pair) => [
  {
    id: `e-${pair.id}`,
    word: pair.euphemism,
    translation: pair.euphTranslation,
    type: 'euphemism' as const,
    category: pair.category,
    neutral: pair.neutral,
  },
  {
    id: `d-${pair.id}`,
    word: pair.dysphemism,
    translation: pair.dyshTranslation,
    type: 'dysphemism' as const,
    category: pair.category,
    neutral: pair.neutral,
  },
]);

/** Пары для MatchingGame (left = нейтральное, right = эвфемизм) */
export const matchingPairs = wordPairs.map((pair) => ({
  id: pair.id,
  left: pair.neutral,
  leftTranslation: pair.neutralTranslation,
  right: pair.euphemism,
  rightTranslation: pair.euphTranslation,
  category: pair.category,
}));

/** Категории на русском */
export const categoryLabels: Record<Category, string> = {
  death: 'Смерть',
  age: 'Возраст',
  poverty: 'Бедность',
  employment: 'Работа',
  health: 'Здоровье',
  body: 'Внешность',
  crime: 'Преступление',
  war: 'Война',
  intelligence: 'Интеллект',
  dishonesty: 'Нечестность',
  relationships: 'Отношения',
};