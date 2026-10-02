import type { LocalizedText } from '@itstarter/shared';
import { createRng, pick, randomInt, shuffleWith, type Rng } from './shuffle';

/**
 * Practice questions made from a seed. The same seed always gives the same question, so the
 * server can re-create the expected answer when checking — nothing is stored and nothing
 * secret is sent to the phone. Khmer strings are drafts for native review.
 */
export interface GeneratedQuestion {
  prompt: LocalizedText;
  answer: number;
  hint: LocalizedText;
  explanation: LocalizedText;
}

type Difficulty = 1 | 2 | 3;
type Generator = (rng: Rng, difficulty: Difficulty) => GeneratedQuestion;

const money = (n: number) => (Number.isInteger(n) ? `$${n}` : `$${n.toFixed(2)}`);
/** Avoid floating-point noise like 6.499999. */
const round2 = (n: number) => Math.round(n * 100) / 100;
const t = (en: string, km: string): LocalizedText => ({ en, km });

const addition: Generator = (rng, d) => {
  const range = [
    [1, 20],
    [10, 99],
    [100, 999],
  ][d - 1]!;
  const a = randomInt(rng, range[0]!, range[1]!);
  const b = randomInt(rng, range[0]!, range[1]!);
  return {
    prompt: t(`${a} + ${b} = ?`, `${a} + ${b} = ?`),
    answer: a + b,
    hint: t('Add the tens first, then the ones.', 'បូកខ្ទង់ដប់មុន រួចបូកខ្ទង់រាយ។'),
    explanation: t(`${a} + ${b} = ${a + b}`, `${a} + ${b} = ${a + b}`),
  };
};

const subtraction: Generator = (rng, d) => {
  const range = [
    [1, 20],
    [10, 99],
    [100, 999],
  ][d - 1]!;
  const x = randomInt(rng, range[0]!, range[1]!);
  const y = randomInt(rng, range[0]!, range[1]!);
  const [a, b] = x >= y ? [x, y] : [y, x];
  return {
    prompt: t(`${a} − ${b} = ?`, `${a} − ${b} = ?`),
    answer: a - b,
    hint: t('Count up from the smaller number to the bigger one.', 'រាប់ឡើងពីលេខតូចទៅលេខធំ។'),
    explanation: t(`${a} − ${b} = ${a - b}`, `${a} − ${b} = ${a - b}`),
  };
};

const multiplication: Generator = (rng, d) => {
  const [a, b] =
    d === 1
      ? [randomInt(rng, 2, 5), randomInt(rng, 1, 10)]
      : d === 2
        ? [randomInt(rng, 2, 10), randomInt(rng, 2, 12)]
        : [randomInt(rng, 11, 25), randomInt(rng, 2, 9)];
  return {
    prompt: t(`${a} × ${b} = ?`, `${a} × ${b} = ?`),
    answer: a * b,
    hint: t(
      `Multiplying is fast adding: ${b} groups of ${a}.`,
      `គុណ គឺការបូកលឿន៖ ${a} ចំនួន ${b} ដង។`,
    ),
    explanation: t(`${a} × ${b} = ${a * b}`, `${a} × ${b} = ${a * b}`),
  };
};

const division: Generator = (rng, d) => {
  const divisor =
    d === 1 ? randomInt(rng, 2, 5) : d === 2 ? randomInt(rng, 2, 10) : randomInt(rng, 6, 15);
  const quotient = d === 3 ? randomInt(rng, 6, 20) : randomInt(rng, 1, 10);
  const dividend = divisor * quotient;
  return {
    prompt: t(`${dividend} ÷ ${divisor} = ?`, `${dividend} ÷ ${divisor} = ?`),
    answer: quotient,
    hint: t(
      `Think: what times ${divisor} makes ${dividend}?`,
      `គិត៖ លេខអ្វីគុណនឹង ${divisor} ស្មើ ${dividend}?`,
    ),
    explanation: t(
      `${divisor} × ${quotient} = ${dividend}, so ${dividend} ÷ ${divisor} = ${quotient}`,
      `${divisor} × ${quotient} = ${dividend} ដូច្នេះ ${dividend} ÷ ${divisor} = ${quotient}`,
    ),
  };
};

const percentOf: Generator = (rng, d) => {
  const percent =
    d === 1
      ? pick(rng, [10, 50])
      : d === 2
        ? pick(rng, [10, 20, 25, 50])
        : pick(rng, [5, 15, 30, 75]);
  const base = d === 1 ? randomInt(rng, 1, 10) * 10 : randomInt(rng, 2, 20) * 20;
  const answer = (base * percent) / 100;
  return {
    prompt: t(`What is ${percent}% of ${base}?`, `តើ ${percent}% នៃ ${base} ស្មើប៉ុន្មាន?`),
    answer,
    hint: t('10% means divide by 10. 50% means half.', '10% មានន័យថា ចែកនឹង 10។ 50% គឺពាក់កណ្តាល។'),
    explanation: t(
      `${base} × ${percent} ÷ 100 = ${answer}`,
      `${base} × ${percent} ÷ 100 = ${answer}`,
    ),
  };
};

const ITEMS = [
  t('a notebook', 'សៀវភៅសរសេរ'),
  t('a drink', 'ភេសជ្ជៈ'),
  t('some bread', 'នំបុ័ង'),
  t('a pen', 'ប៊ិច'),
  t('a bus ticket', 'សំបុត្រឡានក្រុង'),
  t('a phone card', 'កាតទូរស័ព្ទ'),
];

const moneyChange: Generator = (rng, d) => {
  const item = pick(rng, ITEMS);
  const paid = d === 1 ? pick(rng, [5, 10, 20]) : pick(rng, [10, 20, 50]);
  const step = d === 1 ? 1 : d === 2 ? 0.5 : 0.25;
  const price = round2(randomInt(rng, 1, Math.floor((paid - 1) / step)) * step);
  const change = round2(paid - price);
  return {
    prompt: t(
      `You pay ${money(paid)} for ${item.en} that costs ${money(price)}. How much change do you get? (in dollars)`,
      `អ្នកបង់ ${money(paid)} សម្រាប់${item.km} ដែលមានតម្លៃ ${money(price)}។ តើអ្នកទទួលបានលុយអាប់ប៉ុន្មាន? (ដុល្លារ)`,
    ),
    answer: change,
    hint: t('Change = money you pay − the price.', 'លុយអាប់ = លុយដែលបង់ − តម្លៃ។'),
    explanation: t(
      `${money(paid)} − ${money(price)} = ${money(change)}`,
      `${money(paid)} − ${money(price)} = ${money(change)}`,
    ),
  };
};

const moneyTotal: Generator = (rng, d) => {
  // Different items in a shopping list: 2 items (easier) or 3 items (harder).
  const count = d === 3 ? 3 : 2;
  const items = shuffleWith(rng, ITEMS).slice(0, count);
  const step = d === 1 ? 1 : d === 2 ? 0.5 : 0.25;
  const prices = items.map(() => round2(randomInt(rng, d === 1 ? 1 : 2, d === 1 ? 9 : 24) * step));
  const total = round2(prices.reduce((sum, p) => sum + p, 0));
  const list = (lang: 'en' | 'km') =>
    items.map((item, i) => `${item[lang]} (${money(prices[i]!)})`).join(', ');
  return {
    prompt: t(
      `You buy ${list('en')}. What is the total? (in dollars)`,
      `អ្នកទិញ ${list('km')}។ តើសរុបប៉ុន្មាន? (ដុល្លារ)`,
    ),
    answer: total,
    hint: t('Add the prices together.', 'បូកតម្លៃទាំងអស់បញ្ចូលគ្នា។'),
    explanation: t(
      `${prices.map(money).join(' + ')} = ${money(total)}`,
      `${prices.map(money).join(' + ')} = ${money(total)}`,
    ),
  };
};

const clock = (minutes: number) =>
  `${Math.floor(minutes / 60)}:${String(minutes % 60).padStart(2, '0')}`;

const timeMinutes: Generator = (rng, d) => {
  const start = randomInt(rng, 7, 15) * 60 + pick(rng, [0, 5, 10, 15, 20, 30, 40, 45]);
  const duration =
    d === 1
      ? pick(rng, [10, 15, 20, 30])
      : d === 2
        ? pick(rng, [25, 35, 40, 45, 50])
        : pick(rng, [65, 75, 90, 100, 110]);
  const end = start + duration;
  return {
    prompt: t(
      `A class starts at ${clock(start)} and ends at ${clock(end)}. How many minutes long is it?`,
      `ថ្នាក់រៀនចាប់ផ្តើមម៉ោង ${clock(start)} ហើយបញ្ចប់ម៉ោង ${clock(end)}។ តើវាមានរយៈពេលប៉ុន្មាននាទី?`,
    ),
    answer: duration,
    hint: t(
      'Count the minutes to the next full hour first, then add the rest.',
      'រាប់នាទីទៅដល់ម៉ោងគត់បន្ទាប់ជាមុនសិន រួចបូកនាទីដែលនៅសល់។',
    ),
    explanation: t(
      `From ${clock(start)} to ${clock(end)} is ${duration} minutes.`,
      `ពី ${clock(start)} ដល់ ${clock(end)} គឺ ${duration} នាទី។`,
    ),
  };
};

const sequence: Generator = (rng, d) => {
  let terms: number[];
  let rule: LocalizedText;
  if (d === 3 && rng() < 0.6) {
    const factor = pick(rng, [2, 3]);
    const start = randomInt(rng, 1, 5);
    terms = [0, 1, 2, 3, 4].map((i) => start * factor ** i);
    rule = t(`Each number is × ${factor}.`, `លេខនីមួយៗ × ${factor}។`);
  } else {
    const step = d === 1 ? randomInt(rng, 1, 5) : randomInt(rng, 3, 12) * (rng() < 0.4 ? -1 : 1);
    const start = step < 0 ? randomInt(rng, 60, 99) : randomInt(rng, 1, 20);
    terms = [0, 1, 2, 3, 4].map((i) => start + step * i);
    rule =
      step > 0
        ? t(`Each number grows by ${step}.`, `លេខនីមួយៗកើនឡើង ${step}។`)
        : t(`Each number goes down by ${-step}.`, `លេខនីមួយៗថយចុះ ${-step}។`);
  }
  const shown = terms.slice(0, 4).join(' → ');
  return {
    prompt: t(`${shown} → ?`, `${shown} → ?`),
    answer: terms[4]!,
    hint: t(
      'How does each number change from the one before it?',
      'តើលេខនីមួយៗប្រែប្រួលដូចម្តេច ពីលេខមុនវា?',
    ),
    explanation: t(
      `${rule.en} The next number is ${terms[4]}.`,
      `${rule.km} លេខបន្ទាប់គឺ ${terms[4]}។`,
    ),
  };
};

const missingNumber: Generator = (rng, d) => {
  if (d === 1 || rng() < 0.5) {
    const a = randomInt(rng, 1, d === 1 ? 20 : 60);
    const b = randomInt(rng, 1, d === 1 ? 20 : 60);
    return {
      prompt: t(`? + ${b} = ${a + b}`, `? + ${b} = ${a + b}`),
      answer: a,
      hint: t('Use the opposite: take away.', 'ប្រើប្រមាណវិធីផ្ទុយ៖ ដក។'),
      explanation: t(`${a + b} − ${b} = ${a}`, `${a + b} − ${b} = ${a}`),
    };
  }
  const a = randomInt(rng, 2, 12);
  const b = randomInt(rng, 2, d === 3 ? 15 : 10);
  return {
    prompt: t(`${a} × ? = ${a * b}`, `${a} × ? = ${a * b}`),
    answer: b,
    hint: t('Use the opposite: divide.', 'ប្រើប្រមាណវិធីផ្ទុយ៖ ចែក។'),
    explanation: t(`${a * b} ÷ ${a} = ${b}`, `${a * b} ÷ ${a} = ${b}`),
  };
};

const PLACES = [
  { value: 1, name: t('ones', 'ខ្ទង់រាយ') },
  { value: 10, name: t('tens', 'ខ្ទង់ដប់') },
  { value: 100, name: t('hundreds', 'ខ្ទង់រយ') },
  { value: 1000, name: t('thousands', 'ខ្ទង់ពាន់') },
];
const grouped = (n: number) => n.toLocaleString('en-US');

/** "In 4,582, what is the value of the 5?" or build a number from its parts. */
const placeValue: Generator = (rng, d) => {
  const digits = d === 1 ? 2 : d === 2 ? 3 : 4;
  const n = randomInt(rng, 10 ** (digits - 1), 10 ** digits - 1);
  if (d > 1 && rng() < 0.5) {
    const parts = PLACES.slice(0, digits)
      .map((p) => ({ ...p, digit: Math.floor(n / p.value) % 10 }))
      .reverse();
    const shownEn = parts.map((p) => `${p.digit} ${p.name.en}`).join(' + ');
    const shownKm = parts.map((p) => `${p.digit} ${p.name.km}`).join(' + ');
    return {
      prompt: t(`${shownEn} = ?`, `${shownKm} = ?`),
      answer: n,
      hint: t('Put each digit in its place.', 'ដាក់លេខនីមួយៗនៅក្នុងខ្ទង់របស់វា។'),
      explanation: t(
        parts.map((p) => p.digit * p.value).join(' + ') + ` = ${n}`,
        parts.map((p) => p.digit * p.value).join(' + ') + ` = ${n}`,
      ),
    };
  }
  const place = pick(rng, PLACES.slice(0, digits));
  const digit = Math.floor(n / place.value) % 10;
  const value = digit * place.value;
  return {
    prompt: t(
      `In ${grouped(n)}, what is the value of the digit in the ${place.name.en} place?`,
      `ក្នុងលេខ ${grouped(n)} តើលេខនៅ${place.name.km} មានតម្លៃប៉ុន្មាន?`,
    ),
    answer: value,
    hint: t(
      'Find the digit, then multiply it by its place (1, 10, 100, 1000).',
      'រកលេខនោះ រួចគុណនឹងខ្ទង់របស់វា (1, 10, 100, 1000)។',
    ),
    explanation: t(
      `The ${place.name.en} digit is ${digit}, so its value is ${digit} × ${place.value} = ${value}.`,
      `លេខនៅ${place.name.km} គឺ ${digit} ដូច្នេះតម្លៃរបស់វាគឺ ${digit} × ${place.value} = ${value}។`,
    ),
  };
};

/** Round to the nearest 10, 100 or 1000. */
const rounding: Generator = (rng, d) => {
  const to = d === 1 ? 10 : d === 2 ? 100 : pick(rng, [100, 1000]);
  const n = randomInt(rng, to + 1, to * 99);
  const answer = Math.round(n / to) * to;
  const next = Math.floor(n / (to / 10)) % 10; // the digit that decides
  return {
    prompt: t(
      `Round ${grouped(n)} to the nearest ${grouped(to)}.`,
      `បង្គត់ ${grouped(n)} ទៅ ${grouped(to)} ដែលជិតបំផុត។`,
    ),
    answer,
    hint: t(
      'Look at the digit just to the right. 5 or more → round up. 4 or less → round down.',
      'មើលលេខនៅខាងស្តាំបន្ទាប់។ 5 ឬច្រើនជាង → បង្គត់ឡើង។ 4 ឬតិចជាង → បង្គត់ចុះ។',
    ),
    explanation: t(
      `The next digit to the right is ${next}: ${next >= 5 ? '5 or more, so round up' : 'less than 5, so round down'}. ${n} → ${answer}`,
      `លេខបន្ទាប់នៅខាងស្តាំគឺ ${next}៖ ${next >= 5 ? '5 ឬច្រើនជាង ដូច្នេះបង្គត់ឡើង' : 'តិចជាង 5 ដូច្នេះបង្គត់ចុះ'}។ ${n} → ${answer}`,
    ),
  };
};

/** Brackets first, then × and ÷, then + and −. */
const orderOfOperations: Generator = (rng, d) => {
  const a = randomInt(rng, 2, 9);
  const b = randomInt(rng, 2, 9);
  const c = randomInt(rng, 2, 9);
  let prompt: string;
  let answer: number;
  let steps: string;
  if (d === 1) {
    prompt = `${a} + ${b} × ${c}`;
    answer = a + b * c;
    steps = `${b} × ${c} = ${b * c}, then ${a} + ${b * c} = ${answer}`;
  } else if (d === 2) {
    if (rng() < 0.5) {
      prompt = `(${a} + ${b}) × ${c}`;
      answer = (a + b) * c;
      steps = `${a} + ${b} = ${a + b}, then ${a + b} × ${c} = ${answer}`;
    } else {
      const big = b * c + a;
      prompt = `${big} − ${b} × ${c}`;
      answer = big - b * c;
      steps = `${b} × ${c} = ${b * c}, then ${big} − ${b * c} = ${answer}`;
    }
  } else {
    const product = a * b;
    prompt = `${product} ÷ ${a} + ${c} × ${b}`;
    answer = b + c * b;
    steps = `${product} ÷ ${a} = ${b} and ${c} × ${b} = ${c * b}, then ${b} + ${c * b} = ${answer}`;
  }
  return {
    prompt: t(`${prompt} = ?`, `${prompt} = ?`),
    answer,
    hint: t(
      'Brackets first, then × and ÷, then + and −.',
      'វង់ក្រចកមុន បន្ទាប់មក × និង ÷ ហើយចុងក្រោយ + និង −។',
    ),
    explanation: t(steps, steps.replace(', then ', ' រួច ').replace(' and ', ' និង ')),
  };
};

/** "3/4 of 20 = ?" — always a whole number. */
const fractionOf: Generator = (rng, d) => {
  const denominator =
    d === 1 ? pick(rng, [2, 4]) : d === 2 ? pick(rng, [3, 4, 5]) : pick(rng, [3, 5, 6, 8, 10]);
  const numerator = d === 1 ? 1 : randomInt(rng, 1, denominator - 1);
  const base = denominator * randomInt(rng, 2, d === 3 ? 12 : 8);
  const part = base / denominator;
  const answer = part * numerator;
  return {
    prompt: t(
      `What is ${numerator}/${denominator} of ${base}?`,
      `តើ ${numerator}/${denominator} នៃ ${base} ស្មើប៉ុន្មាន?`,
    ),
    answer,
    hint: t(
      'Divide by the bottom number, then multiply by the top number.',
      'ចែកនឹងលេខខាងក្រោម រួចគុណនឹងលេខខាងលើ។',
    ),
    explanation: t(
      numerator === 1
        ? `${base} ÷ ${denominator} = ${answer}`
        : `${base} ÷ ${denominator} = ${part}, and ${part} × ${numerator} = ${answer}`,
      numerator === 1
        ? `${base} ÷ ${denominator} = ${answer}`
        : `${base} ÷ ${denominator} = ${part} ហើយ ${part} × ${numerator} = ${answer}`,
    ),
  };
};

const UNITS = [
  { from: t('m', 'ម៉ែត្រ'), to: t('cm', 'សង់ទីម៉ែត្រ'), factor: 100 },
  { from: t('km', 'គីឡូម៉ែត្រ'), to: t('m', 'ម៉ែត្រ'), factor: 1000 },
  { from: t('kg', 'គីឡូក្រាម'), to: t('g', 'ក្រាម'), factor: 1000 },
  { from: t('L', 'លីត្រ'), to: t('mL', 'មីលីលីត្រ'), factor: 1000 },
  { from: t('hours', 'ម៉ោង'), to: t('minutes', 'នាទី'), factor: 60 },
  { from: t('minutes', 'នាទី'), to: t('seconds', 'វិនាទី'), factor: 60 },
];

/** Convert between units, big → small (easier) or small → big. */
const unitConvert: Generator = (rng, d) => {
  const unit = pick(rng, UNITS);
  const amount = randomInt(rng, 2, d === 3 ? 15 : 9);
  const bigToSmall = d === 1 || rng() < 0.5;
  const [value, answer, from, to] = bigToSmall
    ? [amount, amount * unit.factor, unit.from, unit.to]
    : [amount * unit.factor, amount, unit.to, unit.from];
  const op = bigToSmall ? `× ${unit.factor}` : `÷ ${unit.factor}`;
  return {
    prompt: t(
      `${grouped(value)} ${from.en} = ? ${to.en}`,
      `${grouped(value)} ${from.km} = ? ${to.km}`,
    ),
    answer,
    hint: t(
      `1 ${unit.from.en} = ${grouped(unit.factor)} ${unit.to.en}.`,
      `1 ${unit.from.km} = ${grouped(unit.factor)} ${unit.to.km}។`,
    ),
    explanation: t(`${grouped(value)} ${op} = ${answer}`, `${grouped(value)} ${op} = ${answer}`),
  };
};

/** Area or perimeter of a rectangle (a classroom, a garden, a table). */
const rectangle: Generator = (rng, d) => {
  const w = randomInt(rng, 2, d === 1 ? 6 : 12);
  const h = randomInt(rng, 2, d === 1 ? 6 : 12);
  const thing = pick(rng, [
    t('a garden', 'សួនច្បារ'),
    t('a classroom', 'ថ្នាក់រៀន'),
    t('a table', 'តុ'),
    t('a football pitch drawing', 'គំនូរទីលានបាល់ទាត់'),
  ]);
  const area = d === 1 ? rng() < 0.4 : rng() < 0.5;
  if (area) {
    return {
      prompt: t(
        `${thing.en[0]!.toUpperCase()}${thing.en.slice(1)} is ${w} m long and ${h} m wide. What is its area in square metres?`,
        `${thing.km} មានបណ្តោយ ${w} ម៉ែត្រ និងទទឹង ${h} ម៉ែត្រ។ តើក្រឡាផ្ទៃរបស់វាប៉ុន្មានម៉ែត្រការ៉េ?`,
      ),
      answer: w * h,
      hint: t('Area = length × width.', 'ក្រឡាផ្ទៃ = បណ្តោយ × ទទឹង។'),
      explanation: t(`${w} × ${h} = ${w * h} m²`, `${w} × ${h} = ${w * h} ម៉ែត្រការ៉េ`),
    };
  }
  const perimeter = 2 * (w + h);
  return {
    prompt: t(
      `${thing.en[0]!.toUpperCase()}${thing.en.slice(1)} is ${w} m long and ${h} m wide. How many metres is it all the way around (the perimeter)?`,
      `${thing.km} មានបណ្តោយ ${w} ម៉ែត្រ និងទទឹង ${h} ម៉ែត្រ។ តើបរិមាត្រជុំវិញរបស់វាប៉ុន្មានម៉ែត្រ?`,
    ),
    answer: perimeter,
    hint: t('Perimeter = add all four sides.', 'បរិមាត្រ = បូកជ្រុងទាំងបួន។'),
    explanation: t(
      `${w} + ${h} + ${w} + ${h} = ${perimeter} m`,
      `${w} + ${h} + ${w} + ${h} = ${perimeter} ម៉ែត្រ`,
    ),
  };
};

export const GENERATORS: Record<string, Generator> = {
  addition,
  subtraction,
  multiplication,
  division,
  percent_of: percentOf,
  money_change: moneyChange,
  money_total: moneyTotal,
  time_minutes: timeMinutes,
  sequence,
  missing_number: missingNumber,
  place_value: placeValue,
  rounding,
  order_of_operations: orderOfOperations,
  fraction_of: fractionOf,
  unit_convert: unitConvert,
  rectangle,
};

export function isGenerator(name: unknown): name is string {
  return typeof name === 'string' && name in GENERATORS;
}

export function generateQuestion(
  generator: string,
  difficulty: number,
  seed: string,
): GeneratedQuestion {
  const make = GENERATORS[generator];
  if (!make) throw new Error(`Unknown generator: ${generator}`);
  const d = Math.min(3, Math.max(1, Math.round(difficulty))) as Difficulty;
  return make(createRng(`${generator}:${seed}`), d);
}

/** Seed for one student's practice question; changes when the lesson is finished (new numbers). */
export const generatedSeed = (viewerId: string, questionId: string, round: number) =>
  `${viewerId}:${questionId}:${round}`;
