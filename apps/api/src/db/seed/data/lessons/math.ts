import { t, type LessonSeed, type QuestionSeed } from '../../types';
import {
  gen,
  intro,
  learn,
  lesson,
  mc,
  num,
  revealChallenge,
  revealPlay,
  reward,
  see,
  tf,
} from '../dsl';

// ➗ Math Playground — 15 lessons, 16–18 questions each. Every Check shows the right answer and
// the explanation at once. "gen" questions get new numbers on every replay; the word problems
// are fixed. Khmer (km) strings are DRAFTS for native review.
const W = 'math-playground';

/** Several generated questions of one kind, e.g. gens('addition', 1, 1, 2). */
const gens = (generator: string, ...levels: (1 | 2 | 3)[]): QuestionSeed[] =>
  levels.map((d) => gen(generator, d));

export const MATH_LESSONS: LessonSeed[] = [
  lesson(
    W,
    'adding-and-subtracting',
    '➕',
    t('Adding & Subtracting', 'ការបូក និងការដក'),
    t('Warm up your brain with quick sums.', 'កម្តៅខួរក្បាលរបស់អ្នកជាមួយការបូកលឿនៗ។'),
    8,
    [
      intro(
        '➕',
        t(
          'Computers do maths super fast. Let’s warm up your brain too!',
          'កុំព្យូទ័រគណនាលឿនណាស់។ តោះកម្តៅខួរក្បាលរបស់អ្នកដែរ!',
        ),
      ),
      learn(
        [
          '🧱',
          t('Add the tens, then the ones', 'បូកខ្ទង់ដប់ រួចបូកខ្ទង់រាយ'),
          t('23 + 14 → 20 + 10 = 30, 3 + 4 = 7 → 37', '23 + 14 → 20 + 10 = 30, 3 + 4 = 7 → 37'),
        ],
        [
          '🔙',
          t('Subtracting is counting back', 'ការដក គឺការរាប់ថយក្រោយ'),
          t('15 − 6: count back 6 from 15 → 9', '15 − 6៖ រាប់ថយក្រោយ 6 ពី 15 → 9'),
        ],
      ),
      see(
        '47 + 25 = 40 + 20 + 7 + 5 = 72',
        t(
          'Split numbers into tens and ones to add them easily.',
          'បំបែកលេខជាខ្ទង់ដប់ និងខ្ទង់រាយ ដើម្បីបូកបានងាយស្រួល។',
        ),
      ),
      revealPlay(
        'math_generator',
        ...gens('addition', 1, 1, 1, 2),
        ...gens('subtraction', 1, 1, 2, 2),
      ),
      revealChallenge(
        'math_generator',
        ...gens('addition', 2, 3, 3),
        ...gens('subtraction', 2, 3, 3),
        num(
          t(
            'Dara has 35 marbles. He wins 18 more. How many marbles does he have now?',
            'ដារ៉ាមានឃ្លី 35 គ្រាប់។ គាត់ឈ្នះបាន 18 គ្រាប់ទៀត។ តើឥឡូវគាត់មានឃ្លីប៉ុន្មានគ្រាប់?',
          ),
          53,
          {
            hint: t('Winning more means adding.', 'ឈ្នះបន្ថែម មានន័យថាបូក។'),
            explanation: t('35 + 18 = 53 marbles.', '35 + 18 = 53 គ្រាប់។'),
          },
        ),
        num(
          t(
            'A bus has 42 people. 17 get off. How many are still on the bus?',
            'ឡានក្រុងមួយមានមនុស្ស 42 នាក់។ 17 នាក់ចុះ។ តើនៅសល់ប៉ុន្មាននាក់លើឡាន?',
          ),
          25,
          {
            hint: t('Getting off means taking away.', 'ចុះពីឡាន មានន័យថាដក។'),
            explanation: t('42 − 17 = 25 people.', '42 − 17 = 25 នាក់។'),
          },
        ),
        num(
          t(
            'Sreymom read 26 pages on Monday and 34 pages on Tuesday. How many pages in total?',
            'ស្រីមុំអានបាន 26 ទំព័រនៅថ្ងៃច័ន្ទ និង 34 ទំព័រនៅថ្ងៃអង្គារ។ តើសរុបប៉ុន្មានទំព័រ?',
          ),
          60,
          { explanation: t('26 + 34 = 60 pages.', '26 + 34 = 60 ទំព័រ។') },
        ),
      ),
      reward(t('Your brain is warmed up! 🔥', 'ខួរក្បាលរបស់អ្នកក្តៅហើយ! 🔥')),
    ],
  ),

  lesson(
    W,
    'times-tables',
    '✖️',
    t('Times Tables', 'តារាងគុណ'),
    t('Multiplying is fast adding.', 'ការគុណ គឺការបូកលឿន។'),
    8,
    [
      intro(
        '✖️',
        t(
          'Times tables help you count groups quickly — like seats in a classroom!',
          'តារាងគុណជួយអ្នករាប់ក្រុមបានលឿន — ដូចជាកៅអីក្នុងថ្នាក់រៀន!',
        ),
      ),
      learn(
        [
          '➕',
          t('Groups of the same', 'ក្រុមដែលដូចគ្នា'),
          t(
            '3 × 4 means 3 groups of 4: 4 + 4 + 4 = 12',
            '3 × 4 មានន័យថា 4 ចំនួន 3 ក្រុម៖ 4 + 4 + 4 = 12',
          ),
        ],
        [
          '🔄',
          t('Order doesn’t matter', 'លំដាប់មិនសំខាន់'),
          t('3 × 4 is the same as 4 × 3.', '3 × 4 ដូចគ្នានឹង 4 × 3។'),
        ],
        [
          '🔟',
          t('The ×10 trick', 'ល្បិច ×10'),
          t('Times 10: add a zero. 7 × 10 = 70', 'គុណ 10៖ បន្ថែមលេខសូន្យ។ 7 × 10 = 70'),
        ],
      ),
      see(
        '🪑🪑🪑🪑 × 5 = 20',
        t('4 seats in each of 5 rows: 4 × 5 = 20.', 'កៅអី 4 ក្នុងមួយជួរ ចំនួន 5 ជួរ៖ 4 × 5 = 20។'),
      ),
      revealPlay('math_generator', ...gens('multiplication', 1, 1, 1, 1, 2, 2, 2, 2)),
      revealChallenge(
        'math_generator',
        ...gens('multiplication', 2, 2, 3, 3, 3),
        tf(t('6 × 7 is the same as 7 × 6.', '6 × 7 ដូចគ្នានឹង 7 × 6។'), true, {
          explanation: t(
            'Order doesn’t matter when you multiply: both are 42.',
            'លំដាប់មិនសំខាន់ពេលគុណ៖ ទាំងពីរស្មើ 42។',
          ),
        }),
        num(
          t(
            'A classroom has 6 rows with 5 desks in each row. How many desks?',
            'ថ្នាក់រៀនមួយមាន 6 ជួរ ហើយមួយជួរមានតុ 5។ តើមានតុប៉ុន្មាន?',
          ),
          30,
          { explanation: t('6 × 5 = 30 desks.', '6 × 5 = 30 តុ។') },
        ),
        num(
          t(
            'One pack has 8 pencils. How many pencils are in 9 packs?',
            'មួយកញ្ចប់មានខ្មៅដៃ 8 ដើម។ តើ 9 កញ្ចប់មានខ្មៅដៃប៉ុន្មានដើម?',
          ),
          72,
          { explanation: t('9 × 8 = 72 pencils.', '9 × 8 = 72 ដើម។') },
        ),
        num(t('12 × 10 = ?', '12 × 10 = ?'), 120, {
          hint: t('Times 10: add a zero.', 'គុណ 10៖ បន្ថែមលេខសូន្យ។'),
          explanation: t('12 with a zero added is 120.', 'បន្ថែមលេខសូន្យទៅ 12 បាន 120។'),
        }),
      ),
      reward(t('Times tables champion! ✖️', 'ជើងឯកតារាងគុណ! ✖️')),
    ],
  ),

  lesson(
    W,
    'sharing-and-dividing',
    '➗',
    t('Sharing & Dividing', 'ការចែក'),
    t('Share things fairly.', 'ចែករំលែកឱ្យស្មើគ្នា។'),
    8,
    [
      intro(
        '🍊',
        t(
          'Dividing is fair sharing. 12 oranges for 3 friends — how many each?',
          'ការចែក គឺការចែកឱ្យស្មើ។ ក្រូច 12 ផ្លែ សម្រាប់មិត្ត 3 នាក់ — ម្នាក់បានប៉ុន្មាន?',
        ),
      ),
      learn(
        [
          '🤝',
          t('Share equally', 'ចែកឱ្យស្មើគ្នា'),
          t('12 ÷ 3 = 4: each friend gets 4.', '12 ÷ 3 = 4៖ មិត្តម្នាក់បាន 4។'),
        ],
        [
          '🔁',
          t('Use times tables backwards', 'ប្រើតារាងគុណថយក្រោយ'),
          t('12 ÷ 3 = ? Think: 3 × ? = 12', '12 ÷ 3 = ? គិត៖ 3 × ? = 12'),
        ],
      ),
      see('20 ÷ 4 = 5', t('Because 4 × 5 = 20.', 'ព្រោះ 4 × 5 = 20។')),
      revealPlay('math_generator', ...gens('division', 1, 1, 1, 1, 2, 2, 2, 2)),
      revealChallenge(
        'math_generator',
        ...gens('division', 2, 2, 3, 3, 3),
        num(
          t(
            '24 students make teams of 4. How many teams?',
            'សិស្ស 24 នាក់បង្កើតក្រុម ក្រុមមួយមាន 4 នាក់។ តើមានប៉ុន្មានក្រុម?',
          ),
          6,
          {
            hint: t('How many groups of 4 are in 24?', 'តើមាន 4 ប៉ុន្មានក្រុមនៅក្នុង 24?'),
            explanation: t('24 ÷ 4 = 6 teams.', '24 ÷ 4 = 6 ក្រុម។'),
          },
        ),
        num(
          t(
            'Mother shares 35 mangoes equally among 5 children. How many does each child get?',
            'ម្តាយចែកស្វាយ 35 ផ្លែឱ្យកូន 5 នាក់ស្មើៗគ្នា។ តើកូនម្នាក់បានប៉ុន្មានផ្លែ?',
          ),
          7,
          { explanation: t('35 ÷ 5 = 7 mangoes each.', '35 ÷ 5 = 7 ផ្លែក្នុងម្នាក់។') },
        ),
        mc(
          t(
            '17 cakes are shared by 5 friends. Each gets 3. How many cakes are left over?',
            'នំ 17 ដុំ ចែកឱ្យមិត្ត 5 នាក់។ ម្នាក់បាន 3 ដុំ។ តើនៅសល់នំប៉ុន្មានដុំ?',
          ),
          '2',
          ['3', '0', '1'],
          {
            hint: t('5 × 3 = 15. What is left?', '5 × 3 = 15។ តើនៅសល់ប៉ុន្មាន?'),
            explanation: t('17 − 15 = 2 cakes left over.', '17 − 15 = 2 ដុំនៅសល់។'),
          },
        ),
        tf(
          t(
            'You can share 9 sweets equally between 2 people.',
            'អ្នកអាចចែកស្ករគ្រាប់ 9 គ្រាប់ឱ្យមនុស្ស 2 នាក់ស្មើៗគ្នាបាន។',
          ),
          false,
          {
            explanation: t(
              '9 is odd: each gets 4 and 1 is left over.',
              '9 ជាលេខសេស៖ ម្នាក់បាន 4 ហើយនៅសល់ 1។',
            ),
          },
        ),
      ),
      reward(t('Fair sharing expert! 🍊', 'អ្នកជំនាញចែករំលែក! 🍊')),
    ],
  ),

  lesson(
    W,
    'missing-numbers',
    '❓',
    t('Missing Numbers', 'រកលេខដែលបាត់'),
    t('Find the number that hides.', 'រកលេខដែលកំពុងលាក់ខ្លួន។'),
    8,
    [
      intro(
        '🕵️',
        t(
          'A number is hiding! Use your detective skills to find it.',
          'មានលេខមួយកំពុងលាក់ខ្លួន! ប្រើជំនាញអ្នកស៊ើបអង្កេតរបស់អ្នកដើម្បីរកវា។',
        ),
      ),
      learn(
        [
          '↩️',
          t('Use the opposite', 'ប្រើប្រមាណវិធីផ្ទុយ'),
          t('? + 5 = 12 → take away: 12 − 5 = 7', '? + 5 = 12 → ដក៖ 12 − 5 = 7'),
        ],
        [
          '✖️',
          t('Works for times too', 'ប្រើបានជាមួយការគុណដែរ'),
          t('4 × ? = 20 → divide: 20 ÷ 4 = 5', '4 × ? = 20 → ចែក៖ 20 ÷ 4 = 5'),
        ],
      ),
      see('? + 8 = 15  →  15 − 8 = 7', t('Check it: 7 + 8 = 15 ✓', 'ពិនិត្យ៖ 7 + 8 = 15 ✓')),
      revealPlay('math_generator', ...gens('missing_number', 1, 1, 1, 1, 2, 2, 2, 2)),
      revealChallenge(
        'math_generator',
        ...gens('missing_number', 2, 2, 3, 3, 3, 3),
        num(t('50 − ? = 32', '50 − ? = 32'), 18, {
          hint: t('What do you take from 50 to get 32?', 'តើដកអ្វីពី 50 ដើម្បីបាន 32?'),
          explanation: t('50 − 32 = 18, so 50 − 18 = 32.', '50 − 32 = 18 ដូច្នេះ 50 − 18 = 32។'),
        }),
        num(t('? ÷ 6 = 7', '? ÷ 6 = 7'), 42, {
          hint: t('Use the opposite: multiply.', 'ប្រើប្រមាណវិធីផ្ទុយ៖ គុណ។'),
          explanation: t('6 × 7 = 42, so 42 ÷ 6 = 7.', '6 × 7 = 42 ដូច្នេះ 42 ÷ 6 = 7។'),
        }),
        num(
          t(
            'I think of a number, add 9 and get 25. What is my number?',
            'ខ្ញុំគិតលេខមួយ បូក 9 ហើយបាន 25។ តើលេខរបស់ខ្ញុំគឺអ្វី?',
          ),
          16,
          { explanation: t('25 − 9 = 16.', '25 − 9 = 16។') },
        ),
      ),
      reward(t('Nothing can hide from you! 🕵️', 'គ្មានអ្វីអាចលាក់ពីអ្នកបានទេ! 🕵️')),
    ],
  ),

  lesson(
    W,
    'number-patterns',
    '🔢',
    t('Number Patterns', 'លំនាំលេខ'),
    t('Find the next number in a pattern.', 'រកលេខបន្ទាប់ក្នុងលំនាំ។'),
    8,
    [
      intro(
        '🔢',
        t(
          "Patterns are everywhere — in music, tiles and numbers! Let's be pattern detectives.",
          'លំនាំមាននៅគ្រប់ទីកន្លែង — ក្នុងតន្ត្រី ការ៉ូ និងលេខ! តោះក្លាយជាអ្នកស៊ើបលំនាំ។',
        ),
      ),
      learn(
        [
          '👀',
          t('Look at the jump', 'មើលគម្លាត'),
          t(
            'See how much each number grows. 2 → 4 grows by 2.',
            'មើលថាលេខនីមួយៗកើនប៉ុន្មាន។ 2 → 4 កើន 2។',
          ),
        ],
        [
          '🔁',
          t('Repeat the jump', 'ធ្វើគម្លាតដដែលម្តងទៀត'),
          t(
            'Add the same jump again to find the next number.',
            'បូកគម្លាតដដែលម្តងទៀត ដើម្បីរកលេខបន្ទាប់។',
          ),
        ],
      ),
      see(
        '3 → 6 → 9 → 12 → 15',
        t('Each number grows by 3. 12 + 3 = 15.', 'លេខនីមួយៗកើន 3។ 12 + 3 = 15។'),
      ),
      revealPlay(
        'multiple_choice',
        mc('2 → 4 → 6 → 8 → ?', '10', ['9', '12'], {
          hint: t('Each number grows by 2.', 'លេខនីមួយៗកើន 2។'),
          explanation: t('8 + 2 = 10', '8 + 2 = 10'),
        }),
        mc('10 → 20 → 30 → ?', '40', ['35', '50'], {
          hint: t('Each number grows by 10.', 'លេខនីមួយៗកើន 10។'),
          explanation: t('30 + 10 = 40', '30 + 10 = 40'),
        }),
        mc('50 → 45 → 40 → 35 → ?', '30', ['25', '31', '40'], {
          hint: t('Each number goes down by 5.', 'លេខនីមួយៗថយ 5។'),
          explanation: t('35 − 5 = 30', '35 − 5 = 30'),
        }),
        mc('1 → 3 → 5 → 7 → ?', '9', ['8', '10', '11'], {
          hint: t('These are the odd numbers.', 'ទាំងនេះជាលេខសេស។'),
          explanation: t('7 + 2 = 9', '7 + 2 = 9'),
        }),
        ...gens('sequence', 1, 1, 2, 2),
      ),
      revealChallenge(
        'number_input',
        num('5 → 10 → 15 → 20 → ?', 25, {
          hint: t('Each number grows by 5.', 'លេខនីមួយៗកើន 5។'),
          explanation: t('20 + 5 = 25', '20 + 5 = 25'),
        }),
        num('1 → 2 → 4 → 8 → ?', 16, {
          difficulty: 2,
          hint: t('This time the number doubles (× 2).', 'លើកនេះលេខកើនទ្វេដង (× 2)។'),
          explanation: t('8 × 2 = 16', '8 × 2 = 16'),
        }),
        num('1 → 4 → 9 → 16 → ?', 25, {
          difficulty: 3,
          hint: t('1 × 1, 2 × 2, 3 × 3, 4 × 4 …', '1 × 1, 2 × 2, 3 × 3, 4 × 4 …'),
          explanation: t('5 × 5 = 25 (square numbers).', '5 × 5 = 25 (លេខការេ)។'),
        }),
        num('1 → 1 → 2 → 3 → 5 → 8 → ?', 13, {
          difficulty: 3,
          hint: t('Add the two numbers before.', 'បូកលេខពីរខាងមុខ។'),
          explanation: t('5 + 8 = 13', '5 + 8 = 13'),
        }),
        ...gens('sequence', 2, 3, 3, 3),
      ),
      reward(t('Great pattern spotting! 🎉', 'ការរកលំនាំល្អណាស់! 🎉')),
    ],
  ),

  lesson(
    W,
    'place-value',
    '🔟',
    t('Place Value', 'តម្លៃខ្ទង់'),
    t('Ones, tens, hundreds and thousands.', 'ខ្ទង់រាយ ដប់ រយ និងពាន់។'),
    8,
    [
      intro(
        '🔟',
        t(
          'The same digit can be worth 5 or 500 — it depends on where it sits!',
          'លេខដដែលអាចមានតម្លៃ 5 ឬ 500 — វាអាស្រ័យលើទីតាំងរបស់វា!',
        ),
      ),
      learn(
        [
          '🏠',
          t('Every digit has a home', 'លេខនីមួយៗមានផ្ទះ'),
          t('In 352: 3 hundreds, 5 tens, 2 ones.', 'ក្នុង 352៖ 3 រយ, 5 ដប់, 2 រាយ។'),
        ],
        [
          '➡️',
          t('Move left = 10 times bigger', 'ទៅឆ្វេង = ធំជាង 10 ដង'),
          t('ones → tens → hundreds → thousands', 'រាយ → ដប់ → រយ → ពាន់'),
        ],
      ),
      see(
        '4,738 = 4000 + 700 + 30 + 8',
        t('Split a number into its places.', 'បំបែកលេខតាមខ្ទង់របស់វា។'),
      ),
      revealPlay('math_generator', ...gens('place_value', 1, 1, 1, 2, 2, 2, 2, 2)),
      revealChallenge(
        'math_generator',
        ...gens('place_value', 2, 3, 3, 3, 3),
        mc(
          t('Which number has 7 in the hundreds place?', 'តើលេខណាមាន 7 នៅខ្ទង់រយ?'),
          '2,745',
          ['7,245', '2,457', '2,574'],
          {
            explanation: t(
              '2,745: 2 thousands, 7 hundreds, 4 tens, 5 ones.',
              '2,745៖ 2 ពាន់, 7 រយ, 4 ដប់, 5 រាយ។',
            ),
          },
        ),
        mc(
          t('Which is the biggest number?', 'តើលេខណាធំជាងគេ?'),
          '3,210',
          ['3,102', '2,999', '3,201'],
          {
            hint: t(
              'Compare thousands first, then hundreds…',
              'ប្រៀបធៀបខ្ទង់ពាន់មុន បន្ទាប់មកខ្ទង់រយ…',
            ),
            explanation: t('3,210 > 3,201 > 3,102 > 2,999.', '3,210 > 3,201 > 3,102 > 2,999។'),
          },
        ),
        num(t('What number is 10 more than 395?', 'តើលេខណាច្រើនជាង 395 ចំនួន 10?'), 405, {
          hint: t('Add 1 to the tens.', 'បូក 1 ទៅខ្ទង់ដប់។'),
          explanation: t('395 + 10 = 405.', '395 + 10 = 405។'),
        }),
        tf(
          t('In 5,050 both 5s have the same value.', 'ក្នុង 5,050 លេខ 5 ទាំងពីរមានតម្លៃដូចគ្នា។'),
          false,
          {
            explanation: t('One 5 is 5000, the other is 50.', 'លេខ 5 មួយគឺ 5000 មួយទៀតគឺ 50។'),
          },
        ),
      ),
      reward(t('Every digit in its place! 🏠', 'លេខនីមួយៗនៅខ្ទង់ត្រឹមត្រូវ! 🏠')),
    ],
  ),

  lesson(
    W,
    'rounding-and-estimating',
    '🎯',
    t('Rounding & Estimating', 'ការបង្គត់ និងការប៉ាន់ស្មាន'),
    t('Quick, close-enough answers.', 'ចម្លើយលឿន និងជិតត្រូវ។'),
    8,
    [
      intro(
        '🎯',
        t(
          'At the market you don’t need the exact total — a quick guess tells you if you have enough money.',
          'នៅផ្សារ អ្នកមិនចាំបាច់ដឹងតម្លៃសរុបពិតប្រាកដទេ — ការប៉ាន់ស្មានលឿនប្រាប់ថាអ្នកមានលុយគ្រប់ឬអត់។',
        ),
      ),
      learn(
        [
          '👉',
          t('Look at the next digit', 'មើលលេខបន្ទាប់'),
          t(
            '5 or more → round up. 4 or less → round down.',
            '5 ឬច្រើនជាង → បង្គត់ឡើង។ 4 ឬតិចជាង → បង្គត់ចុះ។',
          ),
        ],
        [
          '🧮',
          t('Estimate, then calculate', 'ប៉ាន់ស្មាន រួចគណនា'),
          t(
            '49 + 32 ≈ 50 + 30 = 80. The exact answer is 81.',
            '49 + 32 ≈ 50 + 30 = 80។ ចម្លើយពិតគឺ 81។',
          ),
        ],
      ),
      see(
        '67 → 70   ·   432 → 400   ·   2,580 → 3,000',
        t('Nearest 10, nearest 100, nearest 1,000.', 'ដប់ជិតបំផុត រយជិតបំផុត ពាន់ជិតបំផុត។'),
      ),
      revealPlay('math_generator', ...gens('rounding', 1, 1, 1, 1, 2, 2, 2, 2)),
      revealChallenge(
        'math_generator',
        ...gens('rounding', 2, 3, 3, 3),
        mc(
          t('Estimate: 198 + 403 is about…', 'ប៉ាន់ស្មាន៖ 198 + 403 ប្រហែល…'),
          '600',
          ['500', '700', '60'],
          {
            hint: t(
              'Round each number to the nearest 100 first.',
              'បង្គត់លេខនីមួយៗទៅរយជិតបំផុតជាមុន។',
            ),
            explanation: t('200 + 400 = 600.', '200 + 400 = 600។'),
          },
        ),
        mc(
          t('Estimate: 31 × 9 is about…', 'ប៉ាន់ស្មាន៖ 31 × 9 ប្រហែល…'),
          '300',
          ['30', '3,000', '400'],
          {
            hint: t('30 × 10 is easy.', '30 × 10 ងាយស្រួល។'),
            explanation: t('30 × 10 = 300 (exact: 279).', '30 × 10 = 300 (ពិតប្រាកដ៖ 279)។'),
          },
        ),
        tf(t('45 rounded to the nearest 10 is 40.', '45 បង្គត់ទៅដប់ជិតបំផុតគឺ 40។'), false, {
          explanation: t(
            'The ones digit is 5, so round up: 50.',
            'ខ្ទង់រាយគឺ 5 ដូច្នេះបង្គត់ឡើង៖ 50។',
          ),
        }),
        mc(
          t(
            'You have $20. You want items costing $4.90, $7.10 and $6.95. Is $20 enough?',
            'អ្នកមាន $20។ អ្នកចង់ទិញរបស់តម្លៃ $4.90, $7.10 និង $6.95។ តើ $20 គ្រប់ទេ?',
          ),
          t('Yes, about $19', 'គ្រប់ ប្រហែល $19'),
          [t('No, about $25', 'មិនគ្រប់ ប្រហែល $25'), t('No, about $21', 'មិនគ្រប់ ប្រហែល $21')],
          {
            hint: t('Round to $5 + $7 + $7.', 'បង្គត់ទៅ $5 + $7 + $7។'),
            explanation: t(
              'About $19 (exact: $18.95) — enough!',
              'ប្រហែល $19 (ពិត៖ $18.95) — គ្រប់!',
            ),
          },
        ),
      ),
      reward(t('Sharp estimator! 🎯', 'អ្នកប៉ាន់ស្មានពូកែ! 🎯')),
    ],
  ),

  lesson(
    W,
    'order-of-operations',
    '🧮',
    t('Order of Operations', 'លំដាប់ប្រមាណវិធី'),
    t('Which part do you calculate first?', 'តើត្រូវគណនាផ្នែកណាមុន?'),
    9,
    [
      intro(
        '🧮',
        t(
          'Is 2 + 3 × 4 equal to 20 or 14? Computers and calculators follow one rule — let’s learn it!',
          'តើ 2 + 3 × 4 ស្មើ 20 ឬ 14? កុំព្យូទ័រ និងម៉ាស៊ីនគិតលេខធ្វើតាមច្បាប់មួយ — តោះរៀនវា!',
        ),
      ),
      learn(
        [
          '1️⃣',
          t('Brackets first', 'វង់ក្រចកមុន'),
          t('(2 + 3) × 4 = 5 × 4 = 20', '(2 + 3) × 4 = 5 × 4 = 20'),
        ],
        [
          '2️⃣',
          t('Then × and ÷', 'បន្ទាប់មក × និង ÷'),
          t('2 + 3 × 4 = 2 + 12 = 14', '2 + 3 × 4 = 2 + 12 = 14'),
        ],
        [
          '3️⃣',
          t('Last + and −, left to right', 'ចុងក្រោយ + និង − ពីឆ្វេងទៅស្តាំ'),
          t('10 − 3 + 2 = 7 + 2 = 9', '10 − 3 + 2 = 7 + 2 = 9'),
        ],
      ),
      see('6 + 4 × 2 = 6 + 8 = 14', t('Multiply first, then add.', 'គុណមុន រួចបូក។')),
      revealPlay(
        'math_generator',
        mc('2 + 3 × 4 = ?', '14', ['20', '24', '9']),
        ...gens('order_of_operations', 1, 1, 1, 1, 2, 2, 2),
      ),
      revealChallenge(
        'math_generator',
        ...gens('order_of_operations', 2, 2, 3, 3, 3),
        num('(8 − 3) × 2 = ?', 10, {
          explanation: t('8 − 3 = 5, then 5 × 2 = 10.', '8 − 3 = 5 រួច 5 × 2 = 10។'),
        }),
        num('20 − 12 ÷ 4 = ?', 17, {
          explanation: t('12 ÷ 4 = 3, then 20 − 3 = 17.', '12 ÷ 4 = 3 រួច 20 − 3 = 17។'),
        }),
        tf(t('10 − 4 − 2 = 8', '10 − 4 − 2 = 8'), false, {
          hint: t('Work left to right.', 'គណនាពីឆ្វេងទៅស្តាំ។'),
          explanation: t('10 − 4 = 6, then 6 − 2 = 4.', '10 − 4 = 6 រួច 6 − 2 = 4។'),
        }),
        num(
          t(
            'You buy 3 notebooks at $2 each and 1 pen for $1. Total in dollars? (3 × 2 + 1)',
            'អ្នកទិញសៀវភៅ 3 ក្បាល ក្បាលមួយ $2 និងប៊ិច 1 ដើម $1។ សរុបប៉ុន្មានដុល្លារ? (3 × 2 + 1)',
          ),
          7,
          { explanation: t('3 × 2 = 6, then 6 + 1 = $7.', '3 × 2 = 6 រួច 6 + 1 = $7។') },
        ),
      ),
      reward(t('You follow the rules like a computer! 🧮', 'អ្នកធ្វើតាមច្បាប់ដូចកុំព្យូទ័រ! 🧮')),
    ],
  ),

  lesson(
    W,
    'fractions',
    '🍕',
    t('Fractions', 'ប្រភាគ'),
    t('Halves, quarters and parts of a whole.', 'ពាក់កណ្តាល មួយភាគបួន និងផ្នែកនៃទាំងមូល។'),
    8,
    [
      intro(
        '🍕',
        t(
          'Cut a pizza into 4 equal pieces. One piece is 1/4 — a fraction!',
          'កាត់ភីហ្សាជា 4 ចំណិតស្មើគ្នា។ មួយចំណិតគឺ 1/4 — ជាប្រភាគ!',
        ),
      ),
      learn(
        [
          '🔽',
          t('Bottom = equal parts', 'ខាងក្រោម = ចំណែកស្មើគ្នា'),
          t('In 3/4 the whole is cut into 4 parts.', 'ក្នុង 3/4 ទាំងមូលត្រូវកាត់ជា 4 ចំណែក។'),
        ],
        [
          '🔼',
          t('Top = parts you take', 'ខាងលើ = ចំណែកដែលអ្នកយក'),
          t('3/4 means you take 3 of the 4 parts.', '3/4 មានន័យថាអ្នកយក 3 ក្នុងចំណោម 4 ចំណែក។'),
        ],
        [
          '➗',
          t('A fraction of a number', 'ប្រភាគនៃលេខមួយ'),
          t('3/4 of 20: 20 ÷ 4 = 5, then 5 × 3 = 15.', '3/4 នៃ 20៖ 20 ÷ 4 = 5 រួច 5 × 3 = 15។'),
        ],
      ),
      see('🟦🟦🟦⬜ = 3/4', t('3 of 4 squares are blue.', 'ការេ 3 ក្នុងចំណោម 4 មានពណ៌ខៀវ។')),
      revealPlay(
        'math_generator',
        mc(t('What fraction is shaded? 🟦⬜', 'តើប្រភាគណាត្រូវបានលាប? 🟦⬜'), '1/2', [
          '1/3',
          '2/1',
          '1/4',
        ]),
        mc(t('What fraction is shaded? 🟦🟦⬜⬜⬜', 'តើប្រភាគណាត្រូវបានលាប? 🟦🟦⬜⬜⬜'), '2/5', [
          '2/3',
          '3/5',
          '5/2',
        ]),
        ...gens('fraction_of', 1, 1, 1, 2, 2, 2),
      ),
      revealChallenge(
        'math_generator',
        ...gens('fraction_of', 2, 3, 3, 3),
        mc(
          t('Which is bigger?', 'តើមួយណាធំជាង?'),
          '1/2',
          ['1/4', '1/8', t('They are equal', 'ស្មើគ្នា')],
          {
            hint: t('Fewer pieces means bigger pieces.', 'ចំណិតតិច មានន័យថាចំណិតធំ។'),
            explanation: t(
              'Half a pizza is more than a quarter of the same pizza.',
              'ពាក់កណ្តាលភីហ្សា ច្រើនជាងមួយភាគបួននៃភីហ្សាដដែល។',
            ),
          },
        ),
        tf(t('2/4 is the same as 1/2.', '2/4 ដូចគ្នានឹង 1/2។'), true, {
          explanation: t(
            '2 of 4 pieces is half the whole.',
            '2 ក្នុងចំណោម 4 ចំណិតគឺពាក់កណ្តាលនៃទាំងមូល។',
          ),
        }),
        num(
          t(
            'A class has 30 students. 1/3 of them walk to school. How many walk?',
            'ថ្នាក់មួយមានសិស្ស 30 នាក់។ 1/3 នៃពួកគេដើរទៅសាលា។ តើប៉ុន្មាននាក់ដើរ?',
          ),
          10,
          { explanation: t('30 ÷ 3 = 10 students.', '30 ÷ 3 = 10 នាក់។') },
        ),
        num(
          t(
            'You ate 3/8 of a cake. How many eighths are left?',
            'អ្នកបានញ៉ាំនំ 3/8។ តើនៅសល់ប៉ុន្មានភាគប្រាំបី?',
          ),
          5,
          { explanation: t('8/8 − 3/8 = 5/8 left.', '8/8 − 3/8 = 5/8 នៅសល់។') },
        ),
        mc(
          t('1/4 of an hour is how many minutes?', '1/4 ម៉ោង ស្មើប៉ុន្មាននាទី?'),
          '15',
          ['25', '4', '30'],
          {
            explanation: t('60 ÷ 4 = 15 minutes.', '60 ÷ 4 = 15 នាទី។'),
          },
        ),
      ),
      reward(t('A slice of success! 🍕', 'ចំណិតនៃភាពជោគជ័យ! 🍕')),
    ],
  ),

  lesson(
    W,
    'percentages',
    '💯',
    t('Percentages', 'ភាគរយ'),
    t('Understand %, discounts and scores.', 'យល់ពី % ការបញ្ចុះតម្លៃ និងពិន្ទុ។'),
    8,
    [
      intro(
        '🏷️',
        t(
          'SALE 50% OFF! Percentages are everywhere. Let’s understand them.',
          'បញ្ចុះតម្លៃ 50%! ភាគរយមាននៅគ្រប់ទីកន្លែង។ តោះស្វែងយល់។',
        ),
      ),
      learn(
        [
          '💯',
          t('Per cent = out of 100', 'ភាគរយ = ក្នុងចំណោម 100'),
          t('25% means 25 out of every 100.', '25% មានន័យថា 25 ក្នុងចំណោម 100។'),
        ],
        [
          '✂️',
          t('Easy ones', 'ងាយៗ'),
          t(
            '50% = half · 25% = a quarter · 10% = divide by 10',
            '50% = ពាក់កណ្តាល · 25% = មួយភាគបួន · 10% = ចែកនឹង 10',
          ),
        ],
        [
          '🏷️',
          t('Discounts', 'ការបញ្ចុះតម្លៃ'),
          t('20% off a $10 shirt saves $2.', 'បញ្ចុះ 20% លើអាវ $10 សន្សំបាន $2។'),
        ],
      ),
      see(
        '10% of 80 = 80 ÷ 10 = 8',
        t('Then 20% is double that: 16.', 'ដូច្នេះ 20% គឺទ្វេដង៖ 16។'),
      ),
      revealPlay(
        'math_generator',
        mc(t('What does 50% mean?', 'តើ 50% មានន័យថាអ្វី?'), t('Half', 'ពាក់កណ្តាល'), [
          t('Five', 'ប្រាំ'),
          t('Double', 'ទ្វេដង'),
        ]),
        mc(t('100% of something is…', '100% នៃអ្វីមួយគឺ…'), t('All of it', 'ទាំងអស់'), [
          t('Half of it', 'ពាក់កណ្តាល'),
          t('None of it', 'គ្មានសោះ'),
        ]),
        ...gens('percent_of', 1, 1, 1, 2, 2, 2),
      ),
      revealChallenge(
        'math_generator',
        ...gens('percent_of', 2, 3, 3, 3),
        num(
          t(
            'A $40 bag is 25% off. How many dollars do you save?',
            'កាបូប $40 បញ្ចុះ 25%។ តើអ្នកសន្សំបានប៉ុន្មានដុល្លារ?',
          ),
          10,
          { explanation: t('25% is a quarter: 40 ÷ 4 = $10.', '25% គឺមួយភាគបួន៖ 40 ÷ 4 = $10។') },
        ),
        num(
          t(
            'You got 18 out of 20 on a quiz. What percent is that?',
            'អ្នកទទួលបាន 18 ក្នុងចំណោម 20 លើតេស្ត។ តើនោះជាប៉ុន្មានភាគរយ?',
          ),
          90,
          {
            hint: t(
              'Out of 20 → multiply by 5 to make it out of 100.',
              'ក្នុង 20 → គុណ 5 ដើម្បីឱ្យក្លាយជាក្នុង 100។',
            ),
            explanation: t('18 × 5 = 90, so 90%.', '18 × 5 = 90 ដូច្នេះ 90%។'),
          },
        ),
        tf(t('10% of 50 is 10.', '10% នៃ 50 គឺ 10។'), false, {
          explanation: t('50 ÷ 10 = 5.', '50 ÷ 10 = 5។'),
        }),
        mc(
          t(
            'Phone battery: 100%. It loses 30%. How much is left?',
            'ថ្មទូរស័ព្ទ៖ 100%។ វាអស់ 30%។ តើនៅសល់ប៉ុន្មាន?',
          ),
          '70%',
          ['30%', '130%', '60%'],
          { explanation: t('100% − 30% = 70%.', '100% − 30% = 70%។') },
        ),
      ),
      reward(t('Percent pro! 💯', 'អ្នកជំនាញភាគរយ! 💯')),
    ],
  ),

  lesson(
    W,
    'money-maths',
    '💵',
    t('Money Maths', 'គណិតលុយ'),
    t('Dollars, riel and making change.', 'ដុល្លារ រៀល និងការអាប់លុយ។'),
    9,
    [
      intro(
        '💵',
        t(
          'Money maths helps every day — at the market, on the bus, and when you save.',
          'គណិតលុយជួយរៀងរាល់ថ្ងៃ — នៅផ្សារ លើឡានក្រុង និងពេលអ្នកសន្សំ។',
        ),
      ),
      learn(
        [
          '➖',
          t('Spending is subtracting', 'ការចំណាយ គឺការដក'),
          t('Money you have − money you spend = money left.', 'លុយដែលមាន − លុយដែលចាយ = លុយនៅសល់។'),
        ],
        [
          '🪙',
          t('Cents count too', 'សេនក៏សំខាន់ដែរ'),
          t('$3.50 means 3 dollars and 50 cents.', '$3.50 មានន័យថា 3 ដុល្លារ និង 50 សេន។'),
        ],
        [
          '🇰🇭',
          t('Dollars and riel', 'ដុល្លារ និងរៀល'),
          t('In these questions, $1 = 4,000 riel.', 'ក្នុងសំណួរទាំងនេះ $1 = 4,000 រៀល។'),
        ],
      ),
      see(
        '$5.00 − $1.50 = $3.50',
        t('Take away 1 dollar, then 50 cents.', 'ដក 1 ដុល្លារ រួចដក 50 សេន។'),
      ),
      revealPlay(
        'math_generator',
        mc(
          t(
            'You have $10 and spend $3.50. How much is left?',
            'អ្នកមាន $10 ហើយចាយ $3.50។ តើនៅសល់ប៉ុន្មាន?',
          ),
          '$6.50',
          ['$7.50', '$6.00', '$13.50'],
          {
            hint: t(
              'Try $10 − $3 first, then take away 50 cents.',
              'សាក $10 − $3 មុន រួចដក 50 សេន។',
            ),
            explanation: t('$10 − $3.50 = $6.50', '$10 − $3.50 = $6.50'),
          },
        ),
        ...gens('money_total', 1, 1, 1, 2, 2),
        num(t('$2 = ? riel', '$2 = ? រៀល'), 8000, {
          hint: t('$1 = 4,000 riel.', '$1 = 4,000 រៀល។'),
          explanation: t('2 × 4,000 = 8,000 riel.', '2 × 4,000 = 8,000 រៀល។'),
        }),
        num(t('20,000 riel = ? dollars', '20,000 រៀល = ? ដុល្លារ'), 5, {
          hint: t('Divide by 4,000.', 'ចែកនឹង 4,000។'),
          explanation: t('20,000 ÷ 4,000 = $5.', '20,000 ÷ 4,000 = $5។'),
        }),
      ),
      revealChallenge(
        'math_generator',
        ...gens('money_total', 2, 3, 3),
        num(
          t(
            'A drink costs $0.75. How much do 4 drinks cost? (in dollars)',
            'ភេសជ្ជៈមួយតម្លៃ $0.75។ តើ 4 មានតម្លៃប៉ុន្មាន? (ដុល្លារ)',
          ),
          3,
          {
            difficulty: 2,
            hint: t('Four quarters make one dollar.', '25 សេន បួនដង ស្មើ 1 ដុល្លារ។'),
            explanation: t('4 × $0.75 = $3.00', '4 × $0.75 = $3.00'),
          },
        ),
        num(
          t(
            'You save $2 every week. How many dollars after 12 weeks?',
            'អ្នកសន្សំ $2 រៀងរាល់សប្តាហ៍។ តើបន្ទាប់ពី 12 សប្តាហ៍មានប៉ុន្មានដុល្លារ?',
          ),
          24,
          { explanation: t('12 × $2 = $24.', '12 × $2 = $24។') },
        ),
        num(
          t(
            'Noodles cost 6,000 riel. You pay with a $2 note. How much change in riel?',
            'មីមួយចានតម្លៃ 6,000 រៀល។ អ្នកបង់ក្រដាស $2។ តើទទួលលុយអាប់ប៉ុន្មានរៀល?',
          ),
          2000,
          {
            hint: t('$2 = 8,000 riel.', '$2 = 8,000 រៀល។'),
            explanation: t('8,000 − 6,000 = 2,000 riel.', '8,000 − 6,000 = 2,000 រៀល។'),
          },
        ),
        mc(
          t('Which is more money?', 'តើមួយណាច្រើនជាង?'),
          '$3',
          [t('10,000 riel', '10,000 រៀល'), t('They are the same', 'ស្មើគ្នា')],
          {
            explanation: t(
              '$3 = 12,000 riel, more than 10,000 riel.',
              '$3 = 12,000 រៀល ច្រើនជាង 10,000 រៀល។',
            ),
          },
        ),
        num(
          t(
            'Phone credit costs $5 a month. How much for a whole year?',
            'កាតទូរស័ព្ទតម្លៃ $5 ក្នុងមួយខែ។ តើពេញមួយឆ្នាំប៉ុន្មាន?',
          ),
          60,
          { explanation: t('12 months × $5 = $60.', '12 ខែ × $5 = $60។') },
        ),
      ),
      reward(t('You are a money master! 💰', 'អ្នកជាមេលុយ! 💰')),
    ],
  ),

  lesson(
    W,
    'shopping-maths',
    '🛒',
    t('Shopping Maths', 'គណិតទិញឥវ៉ាន់'),
    t('Add up prices and check your change.', 'បូកតម្លៃ និងពិនិត្យលុយអាប់។'),
    9,
    [
      intro(
        '🛒',
        t(
          'Let’s go shopping! Add up what you buy and check your change.',
          'តោះទៅទិញឥវ៉ាន់! បូកអ្វីដែលអ្នកទិញ និងពិនិត្យលុយអាប់។',
        ),
      ),
      learn(
        ['🧾', t('Total = add every price', 'សរុប = បូកតម្លៃទាំងអស់'), '$2 + $1.50 = $3.50'],
        [
          '💸',
          t('Change = paid − total', 'លុយអាប់ = លុយបង់ − សរុប'),
          t('Pay $5 for $3.50 → change $1.50', 'បង់ $5 សម្រាប់ $3.50 → អាប់ $1.50'),
        ],
        [
          '✅',
          t('Always check', 'ពិនិត្យជានិច្ច'),
          t(
            'Shopkeepers make mistakes too. Count your change!',
            'អ្នកលក់ក៏ធ្វើខុសដែរ។ រាប់លុយអាប់របស់អ្នក!',
          ),
        ],
      ),
      see(
        '🍞 $1.25 + 🥤 $0.75 = $2.00',
        t(
          'Add the dollars, then the cents: 75 + 25 cents = 1 dollar.',
          'បូកដុល្លារ រួចបូកសេន៖ 75 + 25 សេន = 1 ដុល្លារ។',
        ),
      ),
      revealPlay(
        'math_generator',
        ...gens('money_total', 1, 1, 2),
        ...gens('money_change', 1, 1, 1, 2, 2),
      ),
      revealChallenge(
        'math_generator',
        ...gens('money_change', 2, 3, 3),
        ...gens('money_total', 3, 3),
        num(
          t(
            'Rice costs $1.20 per kg. How much for 5 kg? (in dollars)',
            'អង្ករតម្លៃ $1.20 ក្នុងមួយគីឡូ។ តើ 5 គីឡូប៉ុន្មាន? (ដុល្លារ)',
          ),
          6,
          { explanation: t('5 × $1.20 = $6.00', '5 × $1.20 = $6.00') },
        ),
        mc(
          t(
            'Shop A: 3 eggs for $1. Shop B: 6 eggs for $1.50. Which is cheaper per egg?',
            'ហាង A៖ ពង 3 គ្រាប់ $1។ ហាង B៖ ពង 6 គ្រាប់ $1.50។ តើហាងណាថោកជាងក្នុងមួយគ្រាប់?',
          ),
          t('Shop B', 'ហាង B'),
          [t('Shop A', 'ហាង A'), t('The same', 'ដូចគ្នា')],
          {
            hint: t('How much would 6 eggs cost at Shop A?', 'តើពង 6 គ្រាប់នៅហាង A តម្លៃប៉ុន្មាន?'),
            explanation: t(
              '6 eggs at Shop A cost $2. Shop B is cheaper.',
              'ពង 6 គ្រាប់នៅហាង A តម្លៃ $2។ ហាង B ថោកជាង។',
            ),
          },
        ),
        tf(
          t(
            'You buy items for $7.60 and pay $10. The shopkeeper gives you $3.40 change. Is that right?',
            'អ្នកទិញរបស់ $7.60 ហើយបង់ $10។ អ្នកលក់អាប់ឱ្យអ្នក $3.40។ តើត្រឹមត្រូវទេ?',
          ),
          false,
          {
            explanation: t(
              '$10 − $7.60 = $2.40, not $3.40.',
              '$10 − $7.60 = $2.40 មិនមែន $3.40 ទេ។',
            ),
          },
        ),
      ),
      reward(t('Smart shopper! 🛍️', 'អ្នកទិញឆ្លាតវៃ! 🛍️')),
    ],
  ),

  lesson(
    W,
    'telling-time',
    '⏰',
    t('Telling Time', 'ការប្រាប់ម៉ោង'),
    t('Work out how long things take.', 'គណនារយៈពេលនៃការងារ។'),
    8,
    [
      intro(
        '⏰',
        t(
          'How long is your class? When does the bus come? Time maths helps you plan.',
          'តើថ្នាក់រៀនរបស់អ្នកយូរប៉ុណ្ណា? ពេលណាឡានក្រុងមក? គណិតពេលវេលាជួយអ្នករៀបចំផែនការ។',
        ),
      ),
      learn(
        [
          '🕐',
          t('60 minutes = 1 hour', '60 នាទី = 1 ម៉ោង'),
          t(
            'Half an hour = 30 minutes. A quarter hour = 15 minutes.',
            'កន្លះម៉ោង = 30 នាទី។ មួយភាគបួនម៉ោង = 15 នាទី។',
          ),
        ],
        [
          '🪜',
          t('Jump to the full hour', 'លោតទៅម៉ោងគត់'),
          t(
            '8:40 → 9:00 is 20 minutes. Then add the rest.',
            '8:40 → 9:00 គឺ 20 នាទី។ រួចបូកនាទីដែលនៅសល់។',
          ),
        ],
      ),
      see(
        '9:45 → 10:00 → 10:20',
        t('15 minutes + 20 minutes = 35 minutes.', '15 នាទី + 20 នាទី = 35 នាទី។'),
      ),
      revealPlay(
        'math_generator',
        tf(t('One hour has 100 minutes.', 'មួយម៉ោងមាន 100 នាទី។'), false, {
          explanation: t('One hour has 60 minutes.', 'មួយម៉ោងមាន 60 នាទី។'),
        }),
        num(t('How many minutes are in half an hour?', 'តើកន្លះម៉ោងមានប៉ុន្មាននាទី?'), 30, {
          explanation: t('60 ÷ 2 = 30 minutes.', '60 ÷ 2 = 30 នាទី។'),
        }),
        ...gens('time_minutes', 1, 1, 1, 2, 2, 2),
      ),
      revealChallenge(
        'math_generator',
        ...gens('time_minutes', 2, 3, 3, 3),
        num(t('How many hours are in 2 days?', 'តើ 2 ថ្ងៃមានប៉ុន្មានម៉ោង?'), 48, {
          explanation: t('2 × 24 = 48 hours.', '2 × 24 = 48 ម៉ោង។'),
        }),
        mc(
          t(
            'School starts at 7:00. You need 25 minutes to get there. When should you leave?',
            'សាលាចាប់ផ្តើមម៉ោង 7:00។ អ្នកត្រូវការ 25 នាទីដើម្បីទៅដល់។ តើអ្នកគួរចេញម៉ោងប៉ុន្មាន?',
          ),
          '6:35',
          ['6:25', '7:25', '6:45'],
          { explanation: t('7:00 − 25 minutes = 6:35.', '7:00 − 25 នាទី = 6:35។') },
        ),
        mc(
          t('What time is 2:00 PM in 24-hour time?', 'តើម៉ោង 2:00 រសៀល ក្នុងម៉ោង 24 គឺជាអ្វី?'),
          '14:00',
          ['12:00', '20:00', '02:00'],
          {
            explanation: t('2 + 12 = 14, so 14:00.', '2 + 12 = 14 ដូច្នេះ 14:00។'),
          },
        ),
        num(t('How many days are in 3 weeks?', 'តើ 3 សប្តាហ៍មានប៉ុន្មានថ្ងៃ?'), 21, {
          explanation: t('3 × 7 = 21 days.', '3 × 7 = 21 ថ្ងៃ។'),
        }),
      ),
      reward(t('Right on time! ⏰', 'ទាន់ពេលល្អ! ⏰')),
    ],
  ),

  lesson(
    W,
    'measuring-units',
    '📏',
    t('Measuring & Units', 'ការវាស់ និងឯកតា'),
    t('Metres, kilograms, litres and more.', 'ម៉ែត្រ គីឡូក្រាម លីត្រ និងច្រើនទៀត។'),
    9,
    [
      intro(
        '📏',
        t(
          'How long, how heavy, how much water? Units tell us — and computers use them too (like MB and GB)!',
          'វែងប៉ុណ្ណា ធ្ងន់ប៉ុណ្ណា ទឹកប៉ុន្មាន? ឯកតាប្រាប់យើង — ហើយកុំព្យូទ័រក៏ប្រើវាដែរ (ដូចជា MB និង GB)!',
        ),
      ),
      learn(
        [
          '📐',
          t('Length', 'ប្រវែង'),
          t(
            '1 m = 100 cm · 1 km = 1,000 m',
            '1 ម៉ែត្រ = 100 សង់ទីម៉ែត្រ · 1 គីឡូម៉ែត្រ = 1,000 ម៉ែត្រ',
          ),
        ],
        [
          '⚖️',
          t('Weight and liquid', 'ទម្ងន់ និងវត្ថុរាវ'),
          t(
            '1 kg = 1,000 g · 1 L = 1,000 mL',
            '1 គីឡូក្រាម = 1,000 ក្រាម · 1 លីត្រ = 1,000 មីលីលីត្រ',
          ),
        ],
        [
          '🔁',
          t('Big → small: multiply', 'ធំ → តូច៖ គុណ'),
          t('Small → big: divide.', 'តូច → ធំ៖ ចែក។'),
        ],
      ),
      see(
        '3 m = 3 × 100 = 300 cm',
        t(
          'Metres are bigger, so you get more centimetres.',
          'ម៉ែត្រធំជាង ដូច្នេះអ្នកបានសង់ទីម៉ែត្រច្រើនជាង។',
        ),
      ),
      revealPlay(
        'math_generator',
        mc(
          t(
            'Which unit is best for the length of a pencil?',
            'តើឯកតាណាល្អបំផុតសម្រាប់ប្រវែងខ្មៅដៃ?',
          ),
          'cm',
          ['km', 'kg', 'L'],
        ),
        mc(t('Which unit is best for a bag of rice?', 'តើឯកតាណាល្អបំផុតសម្រាប់បាវអង្ករ?'), 'kg', [
          'cm',
          'mL',
          'km',
        ]),
        ...gens('unit_convert', 1, 1, 1, 2, 2, 2),
      ),
      revealChallenge(
        'math_generator',
        ...gens('unit_convert', 2, 3, 3, 3),
        num(
          t(
            'A bottle holds 500 mL. How many bottles fill 2 litres?',
            'ដបមួយផ្ទុកបាន 500 មីលីលីត្រ។ តើប៉ុន្មានដបទើបពេញ 2 លីត្រ?',
          ),
          4,
          {
            explanation: t(
              '2 L = 2,000 mL, and 2,000 ÷ 500 = 4 bottles.',
              '2 លីត្រ = 2,000 មីលីលីត្រ ហើយ 2,000 ÷ 500 = 4 ដប។',
            ),
          },
        ),
        num(
          t(
            'You walk 1,500 m to school and 1,500 m back. How many km is that?',
            'អ្នកដើរ 1,500 ម៉ែត្រទៅសាលា ហើយ 1,500 ម៉ែត្រត្រឡប់មកវិញ។ តើស្មើប៉ុន្មានគីឡូម៉ែត្រ?',
          ),
          3,
          { explanation: t('3,000 m ÷ 1,000 = 3 km.', '3,000 ម៉ែត្រ ÷ 1,000 = 3 គីឡូម៉ែត្រ។') },
        ),
        mc(
          t('Which is the heaviest?', 'តើមួយណាធ្ងន់ជាងគេ?'),
          '2 kg',
          ['1,500 g', '900 g', '1 kg'],
          {
            explanation: t(
              '2 kg = 2,000 g, more than the others.',
              '2 គីឡូក្រាម = 2,000 ក្រាម ច្រើនជាងគេ។',
            ),
          },
        ),
        tf(t('1 GB is bigger than 1 MB.', '1 GB ធំជាង 1 MB។'), true, {
          explanation: t(
            '1 GB is about 1,000 MB — that’s why a phone’s storage is measured in GB.',
            '1 GB ប្រហែល 1,000 MB — ហេតុនេះហើយបានជាទំហំផ្ទុកទូរស័ព្ទវាស់ជា GB។',
          ),
        }),
      ),
      reward(t('Measured to perfection! 📏', 'វាស់បានត្រឹមត្រូវល្អ! 📏')),
    ],
  ),

  lesson(
    W,
    'area-and-perimeter',
    '📐',
    t('Area & Perimeter', 'ក្រឡាផ្ទៃ និងបរិមាត្រ'),
    t('Around the edge and the space inside.', 'ជុំវិញគែម និងផ្ទៃខាងក្នុង។'),
    9,
    [
      intro(
        '📐',
        t(
          'How much fence for a garden? How many tiles for a floor? Perimeter and area tell you!',
          'ត្រូវការរបងប៉ុន្មានសម្រាប់សួន? ការ៉ូប៉ុន្មានសម្រាប់កម្រាល? បរិមាត្រ និងក្រឡាផ្ទៃប្រាប់អ្នក!',
        ),
      ),
      learn(
        [
          '🔲',
          t('Perimeter = all the way around', 'បរិមាត្រ = ជុំវិញទាំងអស់'),
          t('Add every side: 4 + 3 + 4 + 3 = 14 m', 'បូកជ្រុងទាំងអស់៖ 4 + 3 + 4 + 3 = 14 ម៉ែត្រ'),
        ],
        [
          '🟩',
          t('Area = the space inside', 'ក្រឡាផ្ទៃ = ផ្ទៃខាងក្នុង'),
          t('Length × width: 4 × 3 = 12 square metres', 'បណ្តោយ × ទទឹង៖ 4 × 3 = 12 ម៉ែត្រការ៉េ'),
        ],
      ),
      see(
        '🟩🟩🟩🟩\n🟩🟩🟩🟩\n🟩🟩🟩🟩',
        t(
          '4 squares long, 3 wide: area 12, perimeter 14.',
          'បណ្តោយ 4 ការេ ទទឹង 3៖ ក្រឡាផ្ទៃ 12 បរិមាត្រ 14។',
        ),
      ),
      revealPlay(
        'math_generator',
        mc(
          t('Perimeter means…', 'បរិមាត្រ មានន័យថា…'),
          t('The distance around the edge', 'ចម្ងាយជុំវិញគែម'),
          [t('The space inside', 'ផ្ទៃខាងក្នុង'), t('The height', 'កម្ពស់')],
        ),
        num(
          t(
            'A square has sides of 5 m. What is its perimeter in metres?',
            'ការេមួយមានជ្រុង 5 ម៉ែត្រ។ តើបរិមាត្ររបស់វាប៉ុន្មានម៉ែត្រ?',
          ),
          20,
          {
            explanation: t('4 × 5 = 20 m.', '4 × 5 = 20 ម៉ែត្រ។'),
          },
        ),
        ...gens('rectangle', 1, 1, 1, 2, 2, 2),
      ),
      revealChallenge(
        'math_generator',
        ...gens('rectangle', 2, 3, 3, 3),
        num(
          t(
            'A floor is 6 m by 4 m. Each tile is 1 square metre. How many tiles?',
            'កម្រាលមួយមានទំហំ 6 ម៉ែត្រ គុណ 4 ម៉ែត្រ។ ការ៉ូមួយ 1 ម៉ែត្រការ៉េ។ តើត្រូវការការ៉ូប៉ុន្មាន?',
          ),
          24,
          { explanation: t('6 × 4 = 24 tiles.', '6 × 4 = 24 ការ៉ូ។') },
        ),
        num(
          t(
            'A square has an area of 49 square metres. How long is one side?',
            'ការេមួយមានក្រឡាផ្ទៃ 49 ម៉ែត្រការ៉េ។ តើជ្រុងមួយវែងប៉ុន្មាន?',
          ),
          7,
          {
            hint: t('? × ? = 49', '? × ? = 49'),
            explanation: t('7 × 7 = 49, so 7 m.', '7 × 7 = 49 ដូច្នេះ 7 ម៉ែត្រ។'),
          },
        ),
        tf(
          t(
            'Two rectangles with the same area always have the same perimeter.',
            'ចតុកោណកែងពីរដែលមានក្រឡាផ្ទៃដូចគ្នា តែងតែមានបរិមាត្រដូចគ្នា។',
          ),
          false,
          {
            explanation: t(
              '4 × 3 and 6 × 2 both have area 12, but perimeters 14 and 16.',
              '4 × 3 និង 6 × 2 មានក្រឡាផ្ទៃ 12 ដូចគ្នា ប៉ុន្តែបរិមាត្រ 14 និង 16។',
            ),
          },
        ),
        num(
          t(
            'A fence goes around a 10 m by 5 m field. How many metres of fence?',
            'របងព័ទ្ធជុំវិញវាលមួយទំហំ 10 ម៉ែត្រ គុណ 5 ម៉ែត្រ។ តើត្រូវការរបងប៉ុន្មានម៉ែត្រ?',
          ),
          30,
          { explanation: t('10 + 5 + 10 + 5 = 30 m.', '10 + 5 + 10 + 5 = 30 ម៉ែត្រ។') },
        ),
      ),
      reward(t('Shape master! 📐', 'មេរូបរាង! 📐')),
    ],
  ),
];
