import { t, type LessonSeed } from '../../types';
import {
  intro,
  learn,
  lesson,
  mc,
  num,
  order,
  revealChallenge,
  revealPlay,
  reward,
  see,
  tf,
} from '../dsl';

// 🧩 Logic Playground, lessons 1–8 (see logic-2.ts for 9–15). 20–22 questions per lesson; every
// Check shows the right answer and the explanation. Khmer (km) strings are DRAFTS for review.
export const LOGIC_WORLD = 'logic-playground';
const W = LOGIC_WORLD;

export const LOGIC_LESSONS_1: LessonSeed[] = [
  lesson(
    W,
    'logic-puzzles',
    '🧩',
    t('Think Step by Step', 'គិតម្តងមួយជំហាន'),
    t(
      'Read the facts and solve, like a programmer.',
      'អានការពិត ហើយដោះស្រាយ ដូចអ្នកសរសេរកម្មវិធី។',
    ),
    12,
    [
      intro(
        '🧩',
        t(
          'Programmers solve problems step by step. Let’s think like one!',
          'អ្នកសរសេរកម្មវិធីដោះស្រាយបញ្ហាម្តងមួយជំហាន។ តោះគិតដូចពួកគេ!',
        ),
      ),
      learn(
        [
          '📝',
          t('Read carefully', 'អានដោយយកចិត្តទុកដាក់'),
          t('Find the facts. Ignore what doesn’t matter.', 'រកការពិត។ កុំខ្វល់ពីអ្វីដែលមិនសំខាន់។'),
        ],
        [
          '🪜',
          t('One step at a time', 'ម្តងមួយជំហាន'),
          t('Use one fact, then the next.', 'ប្រើការពិតមួយ រួចមួយបន្ទាប់។'),
        ],
        [
          '🔍',
          t('Check your answer', 'ពិនិត្យចម្លើយ'),
          t('Does it fit every fact?', 'តើវាត្រូវនឹងការពិតទាំងអស់ទេ?'),
        ],
      ),
      see(
        'Sokha > Dara > Vanna',
        t(
          'If Sokha is taller than Dara, and Dara is taller than Vanna, then Sokha is the tallest.',
          'បើសុខាខ្ពស់ជាងដារ៉ា ហើយដារ៉ាខ្ពស់ជាងវណ្ណា នោះសុខាខ្ពស់ជាងគេ។',
        ),
      ),
      revealPlay(
        'multiple_choice',
        mc(
          t(
            'Sokha is taller than Dara. Dara is taller than Vanna. Who is the shortest?',
            'សុខាខ្ពស់ជាងដារ៉ា។ ដារ៉ាខ្ពស់ជាងវណ្ណា។ តើនរណាទាបជាងគេ?',
          ),
          'Vanna',
          ['Sokha', 'Dara'],
          {
            hint: t('Put them in a line from tallest to shortest.', 'តម្រៀបពួកគេពីខ្ពស់ទៅទាប។'),
            explanation: t(
              'Sokha > Dara > Vanna, so Vanna is the shortest.',
              'សុខា > ដារ៉ា > វណ្ណា ដូច្នេះវណ្ណាទាបជាងគេ។',
            ),
          },
        ),
        mc(
          t(
            'All cats have tails. Mimi is a cat. So…',
            'ឆ្មាទាំងអស់មានកន្ទុយ។ មីមីជាឆ្មា។ ដូច្នេះ…',
          ),
          t('Mimi has a tail.', 'មីមីមានកន្ទុយ។'),
          [t('Mimi is a dog.', 'មីមីជាឆ្កែ។'), t('All tails are cats.', 'កន្ទុយទាំងអស់ជាឆ្មា។')],
          {
            explanation: t(
              'Mimi is a cat, and all cats have tails.',
              'មីមីជាឆ្មា ហើយឆ្មាទាំងអស់មានកន្ទុយ។',
            ),
          },
        ),
        mc(
          t(
            'Bopha is older than Kanha. Kanha is older than Rithy. Who is the oldest?',
            'បុប្ផាចាស់ជាងកញ្ញា។ កញ្ញាចាស់ជាងរិទ្ធី។ តើនរណាចាស់ជាងគេ?',
          ),
          'Bopha',
          ['Kanha', 'Rithy'],
          { explanation: t('Bopha > Kanha > Rithy.', 'បុប្ផា > កញ្ញា > រិទ្ធី។') },
        ),
        mc(
          t(
            'There are 3 boxes: red, blue and green. The ball is not in the red box and not in the green box. Where is it?',
            'មានប្រអប់ 3៖ ក្រហម ខៀវ និងបៃតង។ បាល់មិននៅក្នុងប្រអប់ក្រហម ហើយមិននៅក្នុងប្រអប់បៃតង។ តើវានៅឯណា?',
          ),
          t('Blue box', 'ប្រអប់ខៀវ'),
          [t('Red box', 'ប្រអប់ក្រហម'), t('Green box', 'ប្រអប់បៃតង')],
          { explanation: t('Only the blue box is left.', 'នៅសល់តែប្រអប់ខៀវ។') },
        ),
        mc(
          t(
            'Dara runs faster than Piseth. Chenda runs slower than Piseth. Who is the slowest?',
            'ដារ៉ារត់លឿនជាងពិសិដ្ឋ។ ចិន្តារត់យឺតជាងពិសិដ្ឋ។ តើនរណាយឺតជាងគេ?',
          ),
          'Chenda',
          ['Dara', 'Piseth'],
          {
            explanation: t(
              'Dara > Piseth > Chenda, so Chenda is the slowest.',
              'ដារ៉ា > ពិសិដ្ឋ > ចិន្តា ដូច្នេះចិន្តាយឺតជាងគេ។',
            ),
          },
        ),
        tf(
          t(
            'If today is Monday, tomorrow is Wednesday.',
            'បើថ្ងៃនេះជាថ្ងៃច័ន្ទ ថ្ងៃស្អែកជាថ្ងៃពុធ។',
          ),
          false,
          { explanation: t('After Monday comes Tuesday.', 'បន្ទាប់ពីថ្ងៃច័ន្ទ គឺថ្ងៃអង្គារ។') },
        ),
        mc(
          t(
            'A farmer has 5 cows. All but 2 run away. How many are left?',
            'កសិករម្នាក់មានគោ 5 ក្បាល។ រត់បាត់អស់ លើកលែងតែ 2 ក្បាល។ តើនៅសល់ប៉ុន្មាន?',
          ),
          '2',
          ['3', '5', '0'],
          {
            hint: t('Read “all but 2” slowly.', 'អាន “អស់ លើកលែងតែ 2” យឺតៗ។'),
            explanation: t(
              '“All but 2 run away” means 2 stay.',
              '“រត់បាត់អស់ លើកលែងតែ 2” មានន័យថា 2 នៅសល់។',
            ),
          },
        ),
        mc(
          t(
            'Vichea has 3 sisters. Each sister has 1 brother. How many children are in the family?',
            'វិជ្ជាមានបងប្អូនស្រី 3 នាក់។ បងប្អូនស្រីម្នាក់ៗមានបងប្អូនប្រុស 1 នាក់។ តើគ្រួសារមានកូនប៉ុន្មាននាក់?',
          ),
          '4',
          ['6', '7', '3'],
          {
            hint: t('Who is the brother?', 'តើនរណាជាបងប្អូនប្រុស?'),
            explanation: t(
              'The 1 brother is Vichea: 3 sisters + Vichea = 4 children.',
              'បងប្អូនប្រុស 1 នាក់គឺវិជ្ជា៖ ស្រី 3 + វិជ្ជា = 4 នាក់។',
            ),
          },
        ),
        tf(t('Some birds cannot fly.', 'សត្វស្លាបខ្លះមិនអាចហោះបាន។'), true, {
          explanation: t(
            'Penguins and chickens are birds that cannot really fly.',
            'ភេនឃ្វីន និងមាន់ជាសត្វស្លាបដែលហោះមិនសូវបាន។',
          ),
        }),
        mc(
          t(
            'Which is the heaviest? 🐘 elephant, 🐕 dog, 🐁 mouse',
            'តើមួយណាធ្ងន់ជាងគេ? 🐘 ដំរី 🐕 ឆ្កែ 🐁 កណ្តុរ',
          ),
          t('🐘 Elephant', '🐘 ដំរី'),
          [t('🐕 Dog', '🐕 ឆ្កែ'), t('🐁 Mouse', '🐁 កណ្តុរ')],
          {
            explanation: t(
              'An elephant weighs thousands of kilograms.',
              'ដំរីមានទម្ងន់រាប់ពាន់គីឡូក្រាម។',
            ),
          },
        ),
      ),
      revealChallenge(
        'multiple_choice',
        mc(
          t(
            'Three friends sit in a row. Rithy is in the middle. Kanha is on the left. Where is Sokha?',
            'មិត្តបីនាក់អង្គុយជាជួរ។ រិទ្ធីនៅកណ្តាល។ កញ្ញានៅខាងឆ្វេង។ តើសុខានៅឯណា?',
          ),
          t('On the right', 'ខាងស្តាំ'),
          [t('On the left', 'ខាងឆ្វេង'), t('In the middle', 'កណ្តាល')],
          {
            explanation: t(
              'Left and middle are taken, so Sokha is on the right.',
              'ខាងឆ្វេង និងកណ្តាលមានមនុស្សហើយ ដូច្នេះសុខានៅខាងស្តាំ។',
            ),
          },
        ),
        num(
          t(
            'How many legs do 3 chickens and 2 dogs have in total?',
            'តើមាន់ 3 និងឆ្កែ 2 មានជើងសរុបប៉ុន្មាន?',
          ),
          14,
          { explanation: t('3 × 2 + 2 × 4 = 6 + 8 = 14 legs.', '3 × 2 + 2 × 4 = 6 + 8 = 14 ជើង។') },
        ),
        mc(
          t(
            'If 2 pens cost $1, how much do 6 pens cost?',
            'បើប៊ិច 2 ដើមតម្លៃ $1 តើប៊ិច 6 ដើមតម្លៃប៉ុន្មាន?',
          ),
          '$3',
          ['$6', '$2', '$12'],
          {
            explanation: t(
              '6 pens = 3 groups of 2 pens = 3 × $1 = $3.',
              'ប៊ិច 6 = 3 ក្រុម នៃ 2 ដើម = 3 × $1 = $3។',
            ),
          },
        ),
        mc(
          t(
            'Chenda is 10. Her brother is twice her age. How old will he be in 2 years?',
            'ចិន្តាអាយុ 10 ឆ្នាំ។ បងប្រុសរបស់នាងអាយុទ្វេដងនាង។ តើក្នុងរយៈពេល 2 ឆ្នាំទៀតគាត់អាយុប៉ុន្មាន?',
          ),
          '22',
          ['20', '12', '24'],
          {
            explanation: t(
              'He is 20 now, so in 2 years he is 22.',
              'ឥឡូវគាត់អាយុ 20 ដូច្នេះ 2 ឆ្នាំទៀតគាត់ 22។',
            ),
          },
        ),
        tf(t('All squares are rectangles.', 'ការេទាំងអស់ជាចតុកោណកែង។'), true, {
          explanation: t(
            'A square is a rectangle with 4 equal sides.',
            'ការេគឺជាចតុកោណកែងដែលមានជ្រុង 4 ស្មើគ្នា។',
          ),
        }),
        tf(t('All rectangles are squares.', 'ចតុកោណកែងទាំងអស់ជាការេ។'), false, {
          explanation: t('A 4 × 2 rectangle is not a square.', 'ចតុកោណកែង 4 × 2 មិនមែនជាការេទេ។'),
        }),
        mc(
          t(
            'Piseth is in front of Dara. Dara is in front of Bopha. Who is at the back?',
            'ពិសិដ្ឋនៅមុខដារ៉ា។ ដារ៉ានៅមុខបុប្ផា។ តើនរណានៅក្រោយគេ?',
          ),
          'Bopha',
          ['Piseth', 'Dara'],
          {
            explanation: t(
              'Piseth → Dara → Bopha. Bopha is last.',
              'ពិសិដ្ឋ → ដារ៉ា → បុប្ផា។ បុប្ផានៅក្រោយគេ។',
            ),
          },
        ),
        num(
          t(
            'A snail climbs 3 m up a wall each day. How many days to climb 12 m?',
            'ខ្យងមួយឡើងជញ្ជាំង 3 ម៉ែត្រក្នុងមួយថ្ងៃ។ តើប៉ុន្មានថ្ងៃទើបឡើងដល់ 12 ម៉ែត្រ?',
          ),
          4,
          { explanation: t('12 ÷ 3 = 4 days.', '12 ÷ 3 = 4 ថ្ងៃ។') },
        ),
        mc(
          t(
            'Which word makes the sentence true? “If it rains, the ground gets ___.”',
            'តើពាក្យណាធ្វើឱ្យប្រយោគត្រឹមត្រូវ? “បើភ្លៀង ដីនឹង ___។”',
          ),
          t('wet', 'សើម'),
          [t('dry', 'ស្ងួត'), t('hot', 'ក្តៅ')],
          { explanation: t('Rain makes the ground wet.', 'ភ្លៀងធ្វើឱ្យដីសើម។') },
        ),
        order(
          t('Put the steps for making tea in order.', 'តម្រៀបជំហានធ្វើតែតាមលំដាប់។'),
          [
            t('Boil water', 'ដាំទឹកឱ្យពុះ'),
            t('Put tea in the cup', 'ដាក់តែក្នុងពែង'),
            t('Pour in the hot water', 'ចាក់ទឹកក្តៅចូល'),
            t('Wait, then drink', 'រង់ចាំ រួចផឹក'),
          ],
          {
            explanation: t(
              'You need hot water before you can pour it on the tea.',
              'អ្នកត្រូវការទឹកក្តៅជាមុន ទើបអាចចាក់លើតែបាន។',
            ),
          },
        ),
        mc(
          t('What comes next? Monday, Wednesday, Friday, …', 'តើអ្វីបន្ទាប់? ច័ន្ទ ពុធ សុក្រ …'),
          t('Sunday', 'អាទិត្យ'),
          [t('Saturday', 'សៅរ៍'), t('Tuesday', 'អង្គារ'), t('Thursday', 'ព្រហស្បតិ៍')],
          {
            explanation: t(
              'It skips one day each time: Friday → (Saturday) → Sunday.',
              'វារំលងមួយថ្ងៃរាល់ពេល៖ សុក្រ → (សៅរ៍) → អាទិត្យ។',
            ),
          },
        ),
      ),
      reward(t('Step-by-step thinker! 🧩', 'អ្នកគិតម្តងមួយជំហាន! 🧩')),
    ],
  ),

  lesson(
    W,
    'odd-one-out',
    '🔍',
    t('Odd One Out', 'រករបស់ដែលខុសគេ'),
    t('Find what doesn’t belong — and say why.', 'រកអ្វីដែលមិនដូចគេ — ហើយប្រាប់ពីមូលហេតុ។'),
    11,
    [
      intro(
        '🔍',
        t(
          'Spotting what’s different is a super skill — it’s how people find bugs in code!',
          'ការរកអ្វីដែលខុសគេគឺជាជំនាញពិសេស — វាជារបៀបដែលមនុស្សរកកំហុសក្នុងកូដ!',
        ),
      ),
      learn(
        [
          '🧺',
          t('Find the group', 'រកក្រុម'),
          t(
            'What do most of them share? Colour, type, use, shape…',
            'តើភាគច្រើនមានអ្វីដូចគ្នា? ពណ៌ ប្រភេទ ការប្រើប្រាស់ រូបរាង…',
          ),
        ],
        [
          '🙋',
          t('One doesn’t fit', 'មួយមិនត្រូវ'),
          t(
            'The odd one out breaks the rule of the group.',
            'អ្វីដែលខុសគេ មិនធ្វើតាមច្បាប់របស់ក្រុម។',
          ),
        ],
      ),
      see(
        '🍎 🍌 🥕 🍇',
        t(
          'Three fruits and one vegetable: the carrot is the odd one out.',
          'ផ្លែឈើ 3 និងបន្លែ 1៖ ការ៉ុតគឺខុសគេ។',
        ),
      ),
      revealPlay(
        'multiple_choice',
        mc(
          t('Which one does NOT belong? 🍎 🍌 🥕 🍇', 'តើមួយណាមិនដូចគេ? 🍎 🍌 🥕 🍇'),
          t('🥕 Carrot', '🥕 ការ៉ុត'),
          [t('🍎 Apple', '🍎 ប៉ោម'), t('🍌 Banana', '🍌 ចេក'), t('🍇 Grapes', '🍇 ទំពាំងបាយជូរ')],
          {
            explanation: t(
              'A carrot is a vegetable; the others are fruits.',
              'ការ៉ុតជាបន្លែ ឯផ្សេងទៀតជាផ្លែឈើ។',
            ),
          },
        ),
        mc(
          t('Odd one out: 🐶 🐱 🐟 🐰', 'មួយណាខុសគេ៖ 🐶 🐱 🐟 🐰'),
          t('🐟 Fish', '🐟 ត្រី'),
          [t('🐶 Dog', '🐶 ឆ្កែ'), t('🐱 Cat', '🐱 ឆ្មា'), t('🐰 Rabbit', '🐰 ទន្សាយ')],
          {
            explanation: t(
              'A fish lives in water and has no legs.',
              'ត្រីរស់នៅក្នុងទឹក ហើយគ្មានជើង។',
            ),
          },
        ),
        mc(t('Odd one out: 2, 4, 7, 8', 'មួយណាខុសគេ៖ 2, 4, 7, 8'), '7', ['2', '4', '8'], {
          explanation: t('7 is odd; the others are even.', '7 ជាលេខសេស ឯផ្សេងទៀតជាលេខគូ។'),
        }),
        mc(
          t(
            'Odd one out: keyboard, mouse, monitor, banana',
            'មួយណាខុសគេ៖ ក្តារចុច កណ្តុរ ម៉ូនីទ័រ ចេក',
          ),
          t('banana', 'ចេក'),
          [t('keyboard', 'ក្តារចុច'), t('mouse', 'កណ្តុរ'), t('monitor', 'ម៉ូនីទ័រ')],
          {
            explanation: t('The others are computer parts.', 'ផ្សេងទៀតជាផ្នែកកុំព្យូទ័រ។'),
          },
        ),
        mc(t('Odd one out: 🔴 🔵 🟢 ⬛', 'មួយណាខុសគេ៖ 🔴 🔵 🟢 ⬛'), '⬛', ['🔴', '🔵', '🟢'], {
          explanation: t(
            'The square is the only one that isn’t a circle.',
            'ការេគឺតែមួយគត់ដែលមិនមែនជារង្វង់។',
          ),
        }),
        mc(
          t('Odd one out: Monday, Friday, June, Sunday', 'មួយណាខុសគេ៖ ច័ន្ទ សុក្រ មិថុនា អាទិត្យ'),
          t('June', 'មិថុនា'),
          [t('Monday', 'ច័ន្ទ'), t('Friday', 'សុក្រ'), t('Sunday', 'អាទិត្យ')],
          {
            explanation: t('June is a month; the others are days.', 'មិថុនាជាខែ ឯផ្សេងទៀតជាថ្ងៃ។'),
          },
        ),
        mc(
          t('Odd one out: 10, 20, 35, 40', 'មួយណាខុសគេ៖ 10, 20, 35, 40'),
          '35',
          ['10', '20', '40'],
          {
            explanation: t('35 is not in the 10 times table.', '35 មិននៅក្នុងតារាងគុណ 10 ទេ។'),
          },
        ),
        mc(
          t(
            'Odd one out: Word, Excel, PowerPoint, Chrome',
            'មួយណាខុសគេ៖ Word, Excel, PowerPoint, Chrome',
          ),
          'Chrome',
          ['Word', 'Excel', 'PowerPoint'],
          {
            explanation: t(
              'Chrome is a web browser; the others are Office apps.',
              'Chrome ជាកម្មវិធីរុករកអ៊ីនធឺណិត ឯផ្សេងទៀតជាកម្មវិធី Office។',
            ),
          },
        ),
        mc(
          t('Odd one out: 🚗 🚌 ✈️ 🚲', 'មួយណាខុសគេ៖ 🚗 🚌 ✈️ 🚲'),
          t('✈️ Plane', '✈️ យន្តហោះ'),
          [t('🚗 Car', '🚗 ឡាន'), t('🚌 Bus', '🚌 ឡានក្រុង'), t('🚲 Bike', '🚲 កង់')],
          {
            explanation: t(
              'The plane flies; the others drive on roads.',
              'យន្តហោះហោះ ឯផ្សេងទៀតបើកលើផ្លូវ។',
            ),
          },
        ),
        mc(t('Odd one out: 3, 5, 9, 11', 'មួយណាខុសគេ៖ 3, 5, 9, 11'), '9', ['3', '5', '11'], {
          hint: t(
            'Think about which numbers can be divided by something other than 1 and itself.',
            'គិតថាលេខណាអាចចែកដាច់នឹងលេខផ្សេងក្រៅពី 1 និងខ្លួនវា។',
          ),
          explanation: t(
            '9 = 3 × 3. The others are prime numbers.',
            '9 = 3 × 3។ ផ្សេងទៀតជាលេខបឋម។',
          ),
        }),
        mc(
          t('Odd one out: .jpg, .png, .mp3, .gif', 'មួយណាខុសគេ៖ .jpg, .png, .mp3, .gif'),
          '.mp3',
          ['.jpg', '.png', '.gif'],
          {
            explanation: t(
              '.mp3 is a sound file; the others are pictures.',
              '.mp3 ជាឯកសារសំឡេង ឯផ្សេងទៀតជារូបភាព។',
            ),
          },
        ),
      ),
      revealChallenge(
        'multiple_choice',
        mc(
          t('Odd one out: square, triangle, circle, cube', 'មួយណាខុសគេ៖ ការេ ត្រីកោណ រង្វង់ គូប'),
          t('cube', 'គូប'),
          [t('square', 'ការេ'), t('triangle', 'ត្រីកោណ'), t('circle', 'រង្វង់')],
          {
            explanation: t(
              'A cube is 3D; the others are flat shapes.',
              'គូបមាន 3 វិមាត្រ ឯផ្សេងទៀតជារូបរាងរាបស្មើ។',
            ),
          },
        ),
        mc(
          t(
            'Odd one out: 🥭 mango, 🍍 pineapple, 🍋 lemon, 🍫 chocolate',
            'មួយណាខុសគេ៖ 🥭 ស្វាយ 🍍 ម្នាស់ 🍋 ក្រូចឆ្មា 🍫 សូកូឡា',
          ),
          t('🍫 chocolate', '🍫 សូកូឡា'),
          [
            t('🥭 mango', '🥭 ស្វាយ'),
            t('🍍 pineapple', '🍍 ម្នាស់'),
            t('🍋 lemon', '🍋 ក្រូចឆ្មា'),
          ],
          {
            explanation: t('Chocolate is not a fruit.', 'សូកូឡាមិនមែនជាផ្លែឈើទេ។'),
          },
        ),
        mc(
          t('Odd one out: 1, 4, 9, 15, 16', 'មួយណាខុសគេ៖ 1, 4, 9, 15, 16'),
          '15',
          ['1', '4', '9', '16'],
          {
            hint: t('1 × 1, 2 × 2, 3 × 3 …', '1 × 1, 2 × 2, 3 × 3 …'),
            explanation: t(
              'The others are square numbers. 15 is not.',
              'ផ្សេងទៀតជាលេខការេ។ 15 មិនមែនទេ។',
            ),
          },
        ),
        mc(
          t(
            'Odd one out: happy, glad, sad, cheerful',
            'មួយណាខុសគេ៖ សប្បាយ រីករាយ ក្រៀមក្រំ ស្រស់ស្រាយ',
          ),
          t('sad', 'ក្រៀមក្រំ'),
          [t('happy', 'សប្បាយ'), t('glad', 'រីករាយ'), t('cheerful', 'ស្រស់ស្រាយ')],
          {
            explanation: t('Sad is the opposite feeling.', 'ក្រៀមក្រំ ជាអារម្មណ៍ផ្ទុយ។'),
          },
        ),
        mc(
          t(
            'Odd one out: Phnom Penh, Siem Reap, Battambang, Bangkok',
            'មួយណាខុសគេ៖ ភ្នំពេញ សៀមរាប បាត់ដំបង បាងកក',
          ),
          t('Bangkok', 'បាងកក'),
          [t('Phnom Penh', 'ភ្នំពេញ'), t('Siem Reap', 'សៀមរាប'), t('Battambang', 'បាត់ដំបង')],
          {
            explanation: t(
              'Bangkok is in Thailand; the others are in Cambodia.',
              'បាងកកនៅប្រទេសថៃ ឯផ្សេងទៀតនៅកម្ពុជា។',
            ),
          },
        ),
        mc(
          t('Odd one out: 12, 18, 24, 25', 'មួយណាខុសគេ៖ 12, 18, 24, 25'),
          '25',
          ['12', '18', '24'],
          {
            explanation: t(
              '12, 18 and 24 are in the 6 times table.',
              '12, 18 និង 24 នៅក្នុងតារាងគុណ 6។',
            ),
          },
        ),
        mc(
          t('Odd one out: email, SMS, letter, chair', 'មួយណាខុសគេ៖ អ៊ីមែល សារ SMS សំបុត្រ កៅអី'),
          t('chair', 'កៅអី'),
          [t('email', 'អ៊ីមែល'), t('SMS', 'សារ SMS'), t('letter', 'សំបុត្រ')],
          {
            explanation: t('The others are ways to send a message.', 'ផ្សេងទៀតជាវិធីផ្ញើសារ។'),
          },
        ),
        mc(t('Odd one out: A, E, I, B', 'មួយណាខុសគេ៖ A, E, I, B'), 'B', ['A', 'E', 'I'], {
          explanation: t(
            'A, E and I are vowels; B is a consonant.',
            'A, E និង I ជាស្រៈ ឯ B ជាព្យញ្ជនៈ។',
          ),
        }),
        mc(
          t(
            'Odd one out: ☀️ sun, 🌙 moon, ⭐ star, 🌧️ rain',
            'មួយណាខុសគេ៖ ☀️ ព្រះអាទិត្យ 🌙 ព្រះច័ន្ទ ⭐ ផ្កាយ 🌧️ ភ្លៀង',
          ),
          t('🌧️ rain', '🌧️ ភ្លៀង'),
          [t('☀️ sun', '☀️ ព្រះអាទិត្យ'), t('🌙 moon', '🌙 ព្រះច័ន្ទ'), t('⭐ star', '⭐ ផ្កាយ')],
          {
            explanation: t(
              'Rain is weather; the others are in space.',
              'ភ្លៀងជាអាកាសធាតុ ឯផ្សេងទៀតនៅក្នុងលំហ។',
            ),
          },
        ),
        mc(
          t('Odd one out: 100, 1000, 10, 50', 'មួយណាខុសគេ៖ 100, 1000, 10, 50'),
          '50',
          ['100', '1000', '10'],
          {
            explanation: t(
              '10, 100 and 1000 are 1 followed by zeros.',
              '10, 100 និង 1000 គឺលេខ 1 ហើយបន្តដោយលេខសូន្យ។',
            ),
          },
        ),
        tf(
          t(
            'In “🐔 🦆 🐧 🐄”, the cow is the odd one out because it is not a bird.',
            'ក្នុង “🐔 🦆 🐧 🐄” គោគឺខុសគេ ព្រោះវាមិនមែនជាសត្វស្លាប។',
          ),
          true,
          {
            explanation: t(
              'Chicken, duck and penguin are birds.',
              'មាន់ ទា និងភេនឃ្វីនជាសត្វស្លាប។',
            ),
          },
        ),
      ),
      reward(t('Sharp eyes! 🔍', 'ភ្នែកមុតស្រួច! 🔍')),
    ],
  ),

  lesson(
    W,
    'shape-and-symbol-patterns',
    '🔷',
    t('Shape & Symbol Patterns', 'លំនាំរូបរាង និងនិមិត្តសញ្ញា'),
    t('Find what comes next in a pattern.', 'រកអ្វីដែលមកបន្ទាប់ក្នុងលំនាំ។'),
    11,
    [
      intro(
        '🔷',
        t(
          'Patterns repeat. Once you see the rule, you can guess what comes next!',
          'លំនាំកើតឡើងដដែលៗ។ ពេលអ្នកឃើញច្បាប់ អ្នកអាចទាយអ្វីដែលមកបន្ទាប់!',
        ),
      ),
      learn(
        [
          '🔁',
          t('Find the part that repeats', 'រកផ្នែកដែលកើតឡើងដដែលៗ'),
          t('🔴🔵🔴🔵 → the unit is 🔴🔵', '🔴🔵🔴🔵 → ឯកតាគឺ 🔴🔵'),
        ],
        [
          '📈',
          t('Some patterns grow', 'លំនាំខ្លះរីកធំ'),
          t('⭐ ⭐⭐ ⭐⭐⭐ → one more star each time', '⭐ ⭐⭐ ⭐⭐⭐ → បន្ថែមផ្កាយមួយរាល់ពេល'),
        ],
      ),
      see(
        '🟥🟨🟩🟥🟨🟩🟥 → 🟨',
        t(
          'The unit 🟥🟨🟩 repeats, so after 🟥 comes 🟨.',
          'ឯកតា 🟥🟨🟩 កើតឡើងដដែលៗ ដូច្នេះបន្ទាប់ពី 🟥 គឺ 🟨។',
        ),
      ),
      revealPlay(
        'multiple_choice',
        mc(t('What comes next? 🔴 🔵 🔴 🔵 🔴 …', 'តើអ្វីបន្ទាប់? 🔴 🔵 🔴 🔵 🔴 …'), '🔵', [
          '🔴',
          '🟢',
        ]),
        mc(
          t('What comes next? ⭐ 🌙 🌙 ⭐ 🌙 🌙 ⭐ …', 'តើអ្វីបន្ទាប់? ⭐ 🌙 🌙 ⭐ 🌙 🌙 ⭐ …'),
          '🌙',
          ['⭐', '☀️'],
          {
            explanation: t('The unit is ⭐ 🌙 🌙.', 'ឯកតាគឺ ⭐ 🌙 🌙។'),
          },
        ),
        mc(t('What comes next? A B C A B C A …', 'តើអ្វីបន្ទាប់? A B C A B C A …'), 'B', [
          'A',
          'C',
          'D',
        ]),
        mc(t('What comes next? A C E G …', 'តើអ្វីបន្ទាប់? A C E G …'), 'I', ['H', 'J', 'F'], {
          explanation: t(
            'Skip one letter each time: G → (H) → I.',
            'រំលងមួយអក្សររាល់ពេល៖ G → (H) → I។',
          ),
        }),
        mc(
          t(
            'What comes next? 🟥 🟥 🟦 🟥 🟥 🟦 🟥 🟥 …',
            'តើអ្វីបន្ទាប់? 🟥 🟥 🟦 🟥 🟥 🟦 🟥 🟥 …',
          ),
          '🟦',
          ['🟥', '🟩'],
        ),
        mc(
          t('What comes next? ▲ ▲▲ ▲▲▲ …', 'តើអ្វីបន្ទាប់? ▲ ▲▲ ▲▲▲ …'),
          '▲▲▲▲',
          ['▲▲', '▲▲▲', '▲'],
          {
            explanation: t('One more triangle each time.', 'បន្ថែមត្រីកោណមួយរាល់ពេល។'),
          },
        ),
        mc(t('What comes next? Z Y X W …', 'តើអ្វីបន្ទាប់? Z Y X W …'), 'V', ['U', 'A', 'X'], {
          explanation: t('The alphabet backwards.', 'អក្សរក្រមថយក្រោយ។'),
        }),
        mc(t('What comes next? 🌑 🌓 🌕 🌗 🌑 🌓 …', 'តើអ្វីបន្ទាប់? 🌑 🌓 🌕 🌗 🌑 🌓 …'), '🌕', [
          '🌑',
          '🌗',
        ]),
        mc(
          t(
            'Which part repeats in: 🐱🐶🐶🐱🐶🐶🐱🐶🐶 ?',
            'តើផ្នែកណាកើតឡើងដដែលៗក្នុង៖ 🐱🐶🐶🐱🐶🐶🐱🐶🐶 ?',
          ),
          '🐱🐶🐶',
          ['🐱🐶', '🐶🐶', '🐱🐱🐶'],
        ),
        mc(
          t('What comes next? ↑ → ↓ ← ↑ → …', 'តើអ្វីបន្ទាប់? ↑ → ↓ ← ↑ → …'),
          '↓',
          ['←', '↑', '→'],
          {
            explanation: t(
              'The arrow turns right a quarter each time.',
              'ព្រួញបង្វិលទៅស្តាំមួយភាគបួនរាល់ពេល។',
            ),
          },
        ),
      ),
      revealChallenge(
        'multiple_choice',
        mc(t('What is missing? 🍎 🍌 🍎 ? 🍎 🍌', 'តើអ្វីបាត់? 🍎 🍌 🍎 ? 🍎 🍌'), '🍌', [
          '🍎',
          '🍇',
        ]),
        mc(
          t('What is missing? 2A 4B 6C ? 10E', 'តើអ្វីបាត់? 2A 4B 6C ? 10E'),
          '8D',
          ['7D', '8C', '9D'],
          {
            explanation: t('Numbers go up by 2, letters by 1.', 'លេខកើន 2 អក្សរកើន 1។'),
          },
        ),
        mc(t('What comes next? AB, BC, CD, DE, …', 'តើអ្វីបន្ទាប់? AB, BC, CD, DE, …'), 'EF', [
          'FG',
          'DF',
          'EE',
        ]),
        mc(t('What comes next? 🔺🔻🔺🔻🔺 …', 'តើអ្វីបន្ទាប់? 🔺🔻🔺🔻🔺 …'), '🔻', ['🔺', '🔷']),
        mc(t('What comes next? A1 B2 C3 D4 …', 'តើអ្វីបន្ទាប់? A1 B2 C3 D4 …'), 'E5', [
          'E4',
          'D5',
          'F6',
        ]),
        mc(
          t('What comes next? ⬜⬛⬜⬛⬛⬜⬛⬛⬛ …', 'តើអ្វីបន្ទាប់? ⬜⬛⬜⬛⬛⬜⬛⬛⬛ …'),
          '⬜',
          ['⬛'],
          {
            explanation: t(
              'One white, then 1, 2, 3 blacks… now a white again before 4 blacks.',
              'ស មួយ រួចខ្មៅ 1, 2, 3… ឥឡូវស ម្តងទៀតមុនខ្មៅ 4។',
            ),
          },
        ),
        mc(t('What comes next? 🌱 🌿 🌳 🌱 🌿 …', 'តើអ្វីបន្ទាប់? 🌱 🌿 🌳 🌱 🌿 …'), '🌳', [
          '🌱',
          '🌿',
        ]),
        mc(
          t('What comes next? Jan, Mar, May, Jul, …', 'តើអ្វីបន្ទាប់? មករា មីនា ឧសភា កក្កដា …'),
          t('Sep', 'កញ្ញា'),
          [t('Aug', 'សីហា'), t('Oct', 'តុលា'), t('Jun', 'មិថុនា')],
          {
            explanation: t(
              'Every second month: Jul → (Aug) → Sep.',
              'រាល់ខែទីពីរ៖ កក្កដា → (សីហា) → កញ្ញា។',
            ),
          },
        ),
        tf(
          t(
            'In the pattern 🔴🔴🔵🔴🔴🔵, the 9th item is 🔵.',
            'ក្នុងលំនាំ 🔴🔴🔵🔴🔴🔵 របស់ទី 9 គឺ 🔵។',
          ),
          true,
          {
            explanation: t(
              'Every 3rd item is 🔵: 3rd, 6th, 9th.',
              'របស់រាល់ទី 3 គឺ 🔵៖ ទី 3, ទី 6, ទី 9។',
            ),
          },
        ),
        num(
          t(
            'Pattern: 🟢🟡🟢🟡… How many 🟢 are in the first 10 items?',
            'លំនាំ៖ 🟢🟡🟢🟡… តើក្នុងរបស់ 10 ដំបូងមាន 🟢 ប៉ុន្មាន?',
          ),
          5,
          {
            explanation: t(
              'Every other item is 🟢: 10 ÷ 2 = 5.',
              'របស់ឆ្លាស់គ្នាគឺ 🟢៖ 10 ÷ 2 = 5។',
            ),
          },
        ),
        mc(
          t(
            'What comes next? 1 ⭐, 2 ⭐⭐, 3 ⭐⭐⭐, …',
            'តើអ្វីបន្ទាប់? 1 ⭐, 2 ⭐⭐, 3 ⭐⭐⭐, …',
          ),
          '4 ⭐⭐⭐⭐',
          ['4 ⭐⭐⭐', '3 ⭐⭐⭐⭐', '5 ⭐⭐⭐⭐⭐'],
        ),
      ),
      reward(t('Pattern detective! 🔷', 'អ្នកស៊ើបលំនាំ! 🔷')),
    ],
  ),

  lesson(
    W,
    'analogies',
    '🔗',
    t('Word Analogies', 'ការប្រៀបធៀបពាក្យ'),
    t('“A is to B as C is to …?”', '“A ទៅ B ដូចជា C ទៅ …?”'),
    11,
    [
      intro(
        '🔗',
        t(
          'Analogies find the same connection in two pairs. Hot is to cold as up is to… down!',
          'ការប្រៀបធៀបរកទំនាក់ទំនងដូចគ្នាក្នុងគូពីរ។ ក្តៅទៅត្រជាក់ ដូចឡើងទៅ… ចុះ!',
        ),
      ),
      learn(
        [
          '🔎',
          t('Name the link', 'ដាក់ឈ្មោះទំនាក់ទំនង'),
          t('Bird → nest: a bird lives in a nest.', 'បក្សី → សំបុក៖ បក្សីរស់នៅក្នុងសំបុក។'),
        ],
        [
          '🔁',
          t('Use the same link', 'ប្រើទំនាក់ទំនងដដែល'),
          t('Bee → ? : a bee lives in a hive.', 'ឃ្មុំ → ? ៖ ឃ្មុំរស់នៅក្នុងសំបុកឃ្មុំ។'),
        ],
      ),
      see(
        '🐦 : nest = 🐝 : hive',
        t('Both pairs are “animal : home”.', 'គូទាំងពីរគឺ “សត្វ : ផ្ទះ”។'),
      ),
      revealPlay(
        'multiple_choice',
        mc(
          t('Hot is to cold as up is to …', 'ក្តៅទៅត្រជាក់ ដូចឡើងទៅ …'),
          t('down', 'ចុះ'),
          [t('sky', 'មេឃ'), t('high', 'ខ្ពស់')],
          {
            explanation: t('Opposites.', 'ពាក្យផ្ទុយ។'),
          },
        ),
        mc(
          t('Bird is to nest as bee is to …', 'បក្សីទៅសំបុក ដូចឃ្មុំទៅ …'),
          t('hive', 'សំបុកឃ្មុំ'),
          [t('honey', 'ទឹកឃ្មុំ'), t('flower', 'ផ្កា')],
          {
            explanation: t('Animal : home.', 'សត្វ : ផ្ទះ។'),
          },
        ),
        mc(
          t('Eye is to see as ear is to …', 'ភ្នែកទៅមើល ដូចត្រចៀកទៅ …'),
          t('hear', 'ស្តាប់'),
          [t('smell', 'ធុំក្លិន'), t('talk', 'និយាយ')],
          {
            explanation: t('Body part : what it does.', 'សរីរាង្គ : អ្វីដែលវាធ្វើ។'),
          },
        ),
        mc(
          t('Puppy is to dog as kitten is to …', 'កូនឆ្កែទៅឆ្កែ ដូចកូនឆ្មាទៅ …'),
          t('cat', 'ឆ្មា'),
          [t('mouse', 'កណ្តុរ'), t('milk', 'ទឹកដោះ')],
          {
            explanation: t('Baby : adult.', 'កូន : ធំ។'),
          },
        ),
        mc(
          t('Keyboard is to type as mouse is to …', 'ក្តារចុចទៅវាយ ដូចកណ្តុរទៅ …'),
          t('click', 'ចុច'),
          [t('print', 'បោះពុម្ព'), t('listen', 'ស្តាប់')],
          {
            explanation: t('Device : what you do with it.', 'ឧបករណ៍ : អ្វីដែលអ្នកធ្វើជាមួយវា។'),
          },
        ),
        mc(t('2 is to 4 as 5 is to …', '2 ទៅ 4 ដូច 5 ទៅ …'), '10', ['7', '25', '6'], {
          explanation: t('Double: 2 × 2 = 4, 5 × 2 = 10.', 'ទ្វេដង៖ 2 × 2 = 4, 5 × 2 = 10។'),
        }),
        mc(
          t('Day is to night as summer is to …', 'ថ្ងៃទៅយប់ ដូចរដូវក្តៅទៅ …'),
          t('winter', 'រដូវរងា'),
          [t('sun', 'ព្រះអាទិត្យ'), t('hot', 'ក្តៅ')],
          {
            explanation: t('Opposite times.', 'ពេលវេលាផ្ទុយគ្នា។'),
          },
        ),
        mc(
          t('Teacher is to school as doctor is to …', 'គ្រូទៅសាលា ដូចវេជ្ជបណ្ឌិតទៅ …'),
          t('hospital', 'មន្ទីរពេទ្យ'),
          [t('medicine', 'ថ្នាំ'), t('student', 'សិស្ស')],
          {
            explanation: t('Person : where they work.', 'មនុស្ស : កន្លែងធ្វើការ។'),
          },
        ),
        mc(
          t('Fish is to swim as bird is to …', 'ត្រីទៅហែល ដូចបក្សីទៅ …'),
          t('fly', 'ហោះ'),
          [t('sing', 'ច្រៀង'), t('egg', 'ពង')],
          {
            explanation: t('Animal : how it moves.', 'សត្វ : របៀបធ្វើចលនា។'),
          },
        ),
        mc(t('Big is to small as tall is to …', 'ធំទៅតូច ដូចខ្ពស់ទៅ …'), t('short', 'ទាប'), [
          t('long', 'វែង'),
          t('giant', 'យក្ស'),
        ]),
      ),
      revealChallenge(
        'multiple_choice',
        mc(
          t('Pen is to write as scissors are to …', 'ប៊ិចទៅសរសេរ ដូចកន្ត្រៃទៅ …'),
          t('cut', 'កាត់'),
          [t('paper', 'ក្រដាស'), t('sharp', 'មុត')],
        ),
        mc(
          t('Monday is to Tuesday as January is to …', 'ច័ន្ទទៅអង្គារ ដូចមករាទៅ …'),
          t('February', 'កុម្ភៈ'),
          [t('December', 'ធ្នូ'), t('March', 'មីនា')],
          {
            explanation: t('Comes right after.', 'មកភ្លាមៗបន្ទាប់។'),
          },
        ),
        mc(t('Water is to drink as bread is to …', 'ទឹកទៅផឹក ដូចនំបុ័ងទៅ …'), t('eat', 'ញ៉ាំ'), [
          t('bake', 'ដុត'),
          t('flour', 'ម្សៅ'),
        ]),
        mc(
          t('Folder is to files as bookshelf is to …', 'ថតឯកសារទៅឯកសារ ដូចធ្នើសៀវភៅទៅ …'),
          t('books', 'សៀវភៅ'),
          [t('wood', 'ឈើ'), t('library', 'បណ្ណាល័យ')],
          {
            explanation: t('Container : what it holds.', 'អ្វីដែលផ្ទុក : អ្វីដែលវាផ្ទុក។'),
          },
        ),
        mc(t('3 is to 9 as 4 is to …', '3 ទៅ 9 ដូច 4 ទៅ …'), '16', ['12', '8', '13'], {
          explanation: t(
            'Times itself: 3 × 3 = 9, 4 × 4 = 16.',
            'គុណនឹងខ្លួនឯង៖ 3 × 3 = 9, 4 × 4 = 16។',
          ),
        }),
        mc(
          t('Wheel is to car as wing is to …', 'កង់ទៅឡាន ដូចស្លាបទៅ …'),
          t('plane', 'យន្តហោះ'),
          [t('feather', 'រោម'), t('fly', 'ហោះ')],
          {
            explanation: t('Part : the whole thing.', 'ផ្នែក : វត្ថុទាំងមូល។'),
          },
        ),
        mc(
          t('Rice is to field as fish is to …', 'ស្រូវទៅវាលស្រែ ដូចត្រីទៅ …'),
          t('river', 'ទន្លេ'),
          [t('net', 'សំណាញ់'), t('market', 'ផ្សារ')],
          {
            explanation: t('Where it grows or lives.', 'កន្លែងដែលវាដុះ ឬរស់នៅ។'),
          },
        ),
        mc(
          t('Open is to close as start is to …', 'បើកទៅបិទ ដូចចាប់ផ្តើមទៅ …'),
          t('stop', 'បញ្ឈប់'),
          [t('go', 'ទៅ'), t('begin', 'ផ្តើម')],
        ),
        mc(t('Hand is to glove as foot is to …', 'ដៃទៅស្រោមដៃ ដូចជើងទៅ …'), t('sock', 'ស្រោមជើង'), [
          t('toe', 'ម្រាមជើង'),
          t('hat', 'មួក'),
        ]),
        mc(
          t('Ctrl+C is to copy as Ctrl+V is to …', 'Ctrl+C ទៅចម្លង ដូច Ctrl+V ទៅ …'),
          t('paste', 'បិទភ្ជាប់'),
          [t('cut', 'កាត់'), t('save', 'រក្សាទុក')],
          {
            explanation: t('Shortcut : action.', 'ផ្លូវកាត់ : សកម្មភាព។'),
          },
        ),
        tf(
          t(
            '“Sun is to day as moon is to night” is a good analogy.',
            '“ព្រះអាទិត្យទៅថ្ងៃ ដូចព្រះច័ន្ទទៅយប់” ជាការប្រៀបធៀបល្អ។',
          ),
          true,
          {
            explanation: t(
              'Both pairs are “light we see : the time we see it”.',
              'គូទាំងពីរគឺ “ពន្លឺដែលយើងឃើញ : ពេលយើងឃើញវា”។',
            ),
          },
        ),
      ),
      reward(t('Great connections! 🔗', 'ការភ្ជាប់ទំនាក់ទំនងល្អណាស់! 🔗')),
    ],
  ),

  lesson(
    W,
    'comparing-and-ordering',
    '📊',
    t('Comparing & Ordering', 'ការប្រៀបធៀប និងការតម្រៀប'),
    t('Bigger, smaller, first and last.', 'ធំជាង តូចជាង ទីមួយ និងចុងក្រោយ។'),
    12,
    [
      intro(
        '📊',
        t(
          'Computers sort lists all day — names, prices, dates. Let’s sort like a computer!',
          'កុំព្យូទ័រតម្រៀបបញ្ជីពេញមួយថ្ងៃ — ឈ្មោះ តម្លៃ កាលបរិច្ឆេទ។ តោះតម្រៀបដូចកុំព្យូទ័រ!',
        ),
      ),
      learn(
        [
          '↕️',
          t('Compare two at a time', 'ប្រៀបធៀបម្តងពីរ'),
          t('Is A bigger than B? Then is B bigger than C?', 'តើ A ធំជាង B ទេ? រួច B ធំជាង C ទេ?'),
        ],
        [
          '🔗',
          t('Chains', 'ខ្សែសង្វាក់'),
          t('If A > B and B > C, then A > C.', 'បើ A > B ហើយ B > C នោះ A > C។'),
        ],
      ),
      see('7 > 5 > 2', t('Smallest to biggest: 2, 5, 7.', 'តូចទៅធំ៖ 2, 5, 7។')),
      revealPlay(
        'ordering',
        order(t('Put these numbers from smallest to biggest.', 'តម្រៀបលេខទាំងនេះពីតូចទៅធំ។'), [
          '3',
          '8',
          '15',
          '40',
        ]),
        order(t('Put these from biggest to smallest.', 'តម្រៀបលេខទាំងនេះពីធំទៅតូច។'), [
          '900',
          '450',
          '99',
          '9',
        ]),
        order(t('Put these animals from smallest to biggest.', 'តម្រៀបសត្វទាំងនេះពីតូចទៅធំ។'), [
          t('🐜 Ant', '🐜 ស្រមោច'),
          t('🐁 Mouse', '🐁 កណ្តុរ'),
          t('🐕 Dog', '🐕 ឆ្កែ'),
          t('🐘 Elephant', '🐘 ដំរី'),
        ]),
        order(
          t('Put these words in alphabetical order.', 'តម្រៀបពាក្យទាំងនេះតាមលំដាប់អក្សរក្រម។'),
          ['apple', 'banana', 'cherry', 'mango'],
        ),
        order(t('Put these in order from shortest to longest time.', 'តម្រៀបពីពេលខ្លីទៅវែង។'), [
          t('1 second', '1 វិនាទី'),
          t('1 minute', '1 នាទី'),
          t('1 hour', '1 ម៉ោង'),
          t('1 day', '1 ថ្ងៃ'),
        ]),
        mc(t('Which is the biggest number?', 'តើលេខណាធំជាងគេ?'), '1,001', ['999', '1,000', '101']),
        mc(t('Which is the cheapest?', 'តើមួយណាថោកជាងគេ?'), '$0.99', ['$1.10', '$1.00', '$9.00']),
        mc(
          t('A > B and B > C. Which is true?', 'A > B ហើយ B > C។ តើមួយណាត្រឹមត្រូវ?'),
          'A > C',
          ['C > A', 'B > A'],
          {
            explanation: t('A is bigger than B, which is bigger than C.', 'A ធំជាង B ដែលធំជាង C។'),
          },
        ),
        mc(
          t(
            'Sokha scored 8, Dara 6, Kanha 9. Who came second?',
            'សុខាបាន 8 ដារ៉ា 6 កញ្ញា 9។ តើនរណាបានលេខពីរ?',
          ),
          'Sokha',
          ['Dara', 'Kanha'],
          {
            explanation: t(
              '9 (Kanha) > 8 (Sokha) > 6 (Dara).',
              '9 (កញ្ញា) > 8 (សុខា) > 6 (ដារ៉ា)។',
            ),
          },
        ),
        tf(t('0.5 is bigger than 0.25.', '0.5 ធំជាង 0.25។'), true, {
          explanation: t('0.5 is a half, 0.25 is a quarter.', '0.5 គឺពាក់កណ្តាល 0.25 គឺមួយភាគបួន។'),
        }),
      ),
      revealChallenge(
        'ordering',
        order(t('Put these files from smallest to biggest.', 'តម្រៀបឯកសារទាំងនេះពីតូចទៅធំ។'), [
          '5 KB',
          '2 MB',
          '700 MB',
          '3 GB',
        ]),
        order(t('Put these dates in order, earliest first.', 'តម្រៀបកាលបរិច្ឆេទ ពីមុនគេទៅក្រោយ។'), [
          t('3 January', '3 មករា'),
          t('14 February', '14 កុម្ភៈ'),
          t('1 June', '1 មិថុនា'),
          t('25 December', '25 ធ្នូ'),
        ]),
        order(t('Put the planets in order from the Sun.', 'តម្រៀបភពតាមចម្ងាយពីព្រះអាទិត្យ។'), [
          t('Mercury', 'ពុធ'),
          t('Venus', 'សុក្រ'),
          t('Earth', 'ផែនដី'),
          t('Mars', 'អង្គារ'),
        ]),
        mc(
          t(
            'Rithy is older than Bopha. Vanna is younger than Bopha. Who is the youngest?',
            'រិទ្ធីចាស់ជាងបុប្ផា។ វណ្ណាក្មេងជាងបុប្ផា។ តើនរណាក្មេងជាងគេ?',
          ),
          'Vanna',
          ['Rithy', 'Bopha'],
          { explanation: t('Rithy > Bopha > Vanna in age.', 'អាយុ៖ រិទ្ធី > បុប្ផា > វណ្ណា។') },
        ),
        mc(
          t(
            'The red bag is heavier than the blue bag. The green bag is heavier than the red bag. Which is the lightest?',
            'កាបូបក្រហមធ្ងន់ជាងកាបូបខៀវ។ កាបូបបៃតងធ្ងន់ជាងកាបូបក្រហម។ តើមួយណាស្រាលជាងគេ?',
          ),
          t('Blue', 'ខៀវ'),
          [t('Red', 'ក្រហម'), t('Green', 'បៃតង')],
          { explanation: t('Green > Red > Blue.', 'បៃតង > ក្រហម > ខៀវ។') },
        ),
        mc(
          t(
            'Four runners: Dara finished before Sokha. Kanha finished after Sokha. Piseth finished first. Who was last?',
            'អ្នករត់បួននាក់៖ ដារ៉ាដល់មុនសុខា។ កញ្ញាដល់ក្រោយសុខា។ ពិសិដ្ឋដល់មុនគេ។ តើនរណាដល់ក្រោយគេ?',
          ),
          'Kanha',
          ['Dara', 'Sokha', 'Piseth'],
          { explanation: t('Piseth, Dara, Sokha, Kanha.', 'ពិសិដ្ឋ ដារ៉ា សុខា កញ្ញា។') },
        ),
        num(
          t(
            'In the list 4, 9, 2, 7, 5 — what is the biggest number?',
            'ក្នុងបញ្ជី 4, 9, 2, 7, 5 — តើលេខណាធំជាងគេ?',
          ),
          9,
        ),
        num(
          t(
            'Sort 6, 1, 8, 3, 5 from smallest to biggest. Which number is in the middle?',
            'តម្រៀប 6, 1, 8, 3, 5 ពីតូចទៅធំ។ តើលេខណានៅកណ្តាល?',
          ),
          5,
          {
            explanation: t('1, 3, 5, 6, 8 → 5 is in the middle.', '1, 3, 5, 6, 8 → 5 នៅកណ្តាល។'),
          },
        ),
        tf(t('−5 is bigger than −2.', '−5 ធំជាង −2។'), false, {
          explanation: t('−2 is closer to 0, so −2 is bigger.', '−2 នៅជិត 0 ជាង ដូច្នេះ −2 ធំជាង។'),
        }),
        mc(t('Which is the longest?', 'តើមួយណាវែងជាងគេ?'), '2 km', ['1,500 m', '150 cm', '900 m'], {
          explanation: t('2 km = 2,000 m.', '2 គីឡូម៉ែត្រ = 2,000 ម៉ែត្រ។'),
        }),
        tf(
          t(
            '“Zebra” comes before “apple” in alphabetical order.',
            '“Zebra” មកមុន “apple” តាមលំដាប់អក្សរក្រម។',
          ),
          false,
          {
            explanation: t(
              'A comes first in the alphabet; Z comes last.',
              'A មកមុនគេក្នុងអក្សរក្រម Z មកក្រោយគេ។',
            ),
          },
        ),
      ),
      reward(t('Sorted like a computer! 📊', 'តម្រៀបបានដូចកុំព្យូទ័រ! 📊')),
    ],
  ),

  lesson(
    W,
    'all-some-none',
    '🧠',
    t('All, Some & None', 'ទាំងអស់ ខ្លះ និងគ្មាន'),
    t('Tell true from false with careful words.', 'បែងចែកពិត និងមិនពិត ដោយពាក្យប្រុងប្រយ័ត្ន។'),
    11,
    [
      intro(
        '🧠',
        t(
          'Little words like “all”, “some” and “none” change everything. Let’s read like a detective.',
          'ពាក្យតូចៗដូចជា “ទាំងអស់” “ខ្លះ” និង “គ្មាន” ផ្លាស់ប្តូរអ្វីៗទាំងអស់។ តោះអានដូចអ្នកស៊ើប។',
        ),
      ),
      learn(
        [
          '🌍',
          t('All = every one', 'ទាំងអស់ = គ្រប់មួយ'),
          t(
            'One example that doesn’t fit makes “all” false.',
            'ឧទាហរណ៍មួយដែលមិនត្រូវ ធ្វើឱ្យ “ទាំងអស់” មិនពិត។',
          ),
        ],
        [
          '🤏',
          t('Some = at least one', 'ខ្លះ = យ៉ាងហោចណាស់មួយ'),
          t(
            'Some dogs are black — true, you only need one.',
            'ឆ្កែខ្លះពណ៌ខ្មៅ — ពិត អ្នកត្រូវការតែមួយ។',
          ),
        ],
        [
          '🚫',
          t('None = not even one', 'គ្មាន = សូម្បីតែមួយក៏គ្មាន'),
          t(
            'No fish can walk on land — careful, some can!',
            'គ្មានត្រីណាដើរលើគោកបានទេ — ប្រយ័ត្ន ខ្លះអាចដើរបាន!',
          ),
        ],
      ),
      see(
        'All 🐱 are 🐾 · Some 🐾 are 🐱',
        t(
          'All cats are animals, but only some animals are cats.',
          'ឆ្មាទាំងអស់ជាសត្វ ប៉ុន្តែមានតែសត្វខ្លះប៉ុណ្ណោះជាឆ្មា។',
        ),
      ),
      revealPlay(
        'true_false',
        tf(t('All birds have feathers.', 'សត្វស្លាបទាំងអស់មានរោម។'), true),
        tf(t('All animals can swim.', 'សត្វទាំងអស់អាចហែលទឹកបាន។'), false, {
          explanation: t('Many animals cannot swim.', 'សត្វជាច្រើនហែលទឹកមិនបាន។'),
        }),
        tf(t('Some numbers are even.', 'លេខខ្លះជាលេខគូ។'), true),
        tf(t('No triangle has 4 sides.', 'គ្មានត្រីកោណណាមាន 4 ជ្រុងទេ។'), true, {
          explanation: t('Every triangle has exactly 3 sides.', 'ត្រីកោណគ្រប់មួយមាន 3 ជ្រុងគត់។'),
        }),
        tf(t('All fruits are red.', 'ផ្លែឈើទាំងអស់មានពណ៌ក្រហម។'), false, {
          explanation: t('Bananas are yellow.', 'ចេកមានពណ៌លឿង។'),
        }),
        tf(t('Some computers are laptops.', 'កុំព្យូទ័រខ្លះជាកុំព្យូទ័រយួរដៃ។'), true),
        mc(
          t('All dogs are animals. Rex is a dog. So…', 'ឆ្កែទាំងអស់ជាសត្វ។ រ៉េចជាឆ្កែ។ ដូច្នេះ…'),
          t('Rex is an animal.', 'រ៉េចជាសត្វ។'),
          [t('All animals are dogs.', 'សត្វទាំងអស់ជាឆ្កែ។'), t('Rex is a cat.', 'រ៉េចជាឆ្មា។')],
        ),
        mc(
          t('Which sentence is FALSE?', 'តើប្រយោគណាមិនពិត?'),
          t('All students are 10 years old.', 'សិស្សទាំងអស់អាយុ 10 ឆ្នាំ។'),
          [
            t('Some students wear glasses.', 'សិស្សខ្លះពាក់វ៉ែនតា។'),
            t('Some students like football.', 'សិស្សខ្លះចូលចិត្តបាល់ទាត់។'),
          ],
        ),
        tf(t('If all A are B, then all B are A.', 'បើ A ទាំងអស់ជា B នោះ B ទាំងអស់ជា A។'), false, {
          explanation: t(
            'All cats are animals, but not all animals are cats.',
            'ឆ្មាទាំងអស់ជាសត្វ ប៉ុន្តែមិនមែនសត្វទាំងអស់ជាឆ្មាទេ។',
          ),
        }),
        tf(t('Some months have 31 days.', 'ខែខ្លះមាន 31 ថ្ងៃ។'), true),
      ),
      revealChallenge(
        'true_false',
        tf(t('No month has 32 days.', 'គ្មានខែណាមាន 32 ថ្ងៃទេ។'), true),
        tf(t('All even numbers can be divided by 2.', 'លេខគូទាំងអស់អាចចែកដាច់នឹង 2។'), true),
        tf(t('Some squares are circles.', 'ការេខ្លះជារង្វង់។'), false, {
          explanation: t('No square is a circle.', 'គ្មានការេណាជារង្វង់ទេ។'),
        }),
        mc(
          t(
            'All the students in Class A passed. Dara is in Class A. What do we know?',
            'សិស្សទាំងអស់ក្នុងថ្នាក់ A បានជាប់។ ដារ៉ានៅថ្នាក់ A។ តើយើងដឹងអ្វី?',
          ),
          t('Dara passed.', 'ដារ៉ាបានជាប់។'),
          [
            t('Dara got the top score.', 'ដារ៉ាបានពិន្ទុខ្ពស់ជាងគេ។'),
            t('Nothing about Dara.', 'មិនដឹងអ្វីពីដារ៉ាទេ។'),
          ],
          {
            explanation: t(
              '“All passed” includes Dara — but it says nothing about top scores.',
              '“ទាំងអស់ជាប់” រួមទាំងដារ៉ា — ប៉ុន្តែមិននិយាយពីពិន្ទុខ្ពស់ទេ។',
            ),
          },
        ),
        mc(
          t(
            'Some of my friends like rice. Sokha is my friend. What do we know?',
            'មិត្តខ្ញុំខ្លះចូលចិត្តបាយ។ សុខាជាមិត្តខ្ញុំ។ តើយើងដឹងអ្វី?',
          ),
          t('We can’t be sure Sokha likes rice.', 'យើងមិនប្រាកដថាសុខាចូលចិត្តបាយទេ។'),
          [
            t('Sokha likes rice.', 'សុខាចូលចិត្តបាយ។'),
            t('Sokha doesn’t like rice.', 'សុខាមិនចូលចិត្តបាយ។'),
          ],
          {
            explanation: t(
              '“Some” doesn’t tell us which friends.',
              '“ខ្លះ” មិនប្រាប់យើងថាមិត្តណាខ្លះទេ។',
            ),
          },
        ),
        tf(
          t(
            'No fish can live without water for a whole year.',
            'គ្មានត្រីណាអាចរស់នៅដោយគ្មានទឹកពេញមួយឆ្នាំទេ។',
          ),
          true,
        ),
        mc(
          t(
            'To prove “All swans are white” is false, you need…',
            'ដើម្បីបង្ហាញថា “សត្វក្ងានទាំងអស់មានពណ៌ស” មិនពិត អ្នកត្រូវការ…',
          ),
          t('One swan that is not white', 'ក្ងានមួយដែលមិនមែនពណ៌ស'),
          [t('100 white swans', 'ក្ងានស 100'), t('A white duck', 'ទាពណ៌ស')],
          {
            explanation: t(
              'One example that doesn’t fit is enough.',
              'ឧទាហរណ៍មួយដែលមិនត្រូវគឺគ្រប់គ្រាន់។',
            ),
          },
        ),
        tf(t('Every number multiplied by 0 is 0.', 'លេខគ្រប់ចំនួនគុណនឹង 0 ស្មើ 0។'), true),
        tf(
          t(
            'Some apps on a phone can use the internet.',
            'កម្មវិធីខ្លះនៅលើទូរស័ព្ទអាចប្រើអ៊ីនធឺណិត។',
          ),
          true,
        ),
        tf(
          t(
            'No password should be shared with strangers.',
            'មិនគួរចែករំលែកពាក្យសម្ងាត់ណាមួយជាមួយមនុស្សចម្លែកទេ។',
          ),
          true,
          {
            explanation: t(
              'Never share passwords — not even one!',
              'កុំចែករំលែកពាក្យសម្ងាត់ — សូម្បីតែមួយ!',
            ),
          },
        ),
        mc(
          t(
            'All 🍎 in the box are red. Some 🍎 in the box are big. Which must be true?',
            '🍎 ទាំងអស់ក្នុងប្រអប់មានពណ៌ក្រហម។ 🍎 ខ្លះក្នុងប្រអប់ធំ។ តើមួយណាត្រូវតែពិត?',
          ),
          t('Some big apples are red.', 'ប៉ោមធំខ្លះមានពណ៌ក្រហម។'),
          [
            t('All red apples are big.', 'ប៉ោមក្រហមទាំងអស់ធំ។'),
            t('No apples are big.', 'គ្មានប៉ោមណាធំទេ។'),
          ],
          {
            explanation: t(
              'The big ones are in the box, so they are red too.',
              'ប៉ោមធំៗនៅក្នុងប្រអប់ ដូច្នេះពួកវាក៏ក្រហមដែរ។',
            ),
          },
        ),
      ),
      reward(t('Careful reader! 🧠', 'អ្នកអានប្រុងប្រយ័ត្ន! 🧠')),
    ],
  ),

  lesson(
    W,
    'if-then-rules',
    '➡️',
    t('If… Then… Rules', 'ច្បាប់ បើ… នោះ…'),
    t('The same rules computers follow.', 'ច្បាប់ដូចដែលកុំព្យូទ័រធ្វើតាម។'),
    12,
    [
      intro(
        '➡️',
        t(
          'Every app is full of rules: IF you tap Send, THEN the message goes. Let’s practise them!',
          'កម្មវិធីនីមួយៗពោរពេញដោយច្បាប់៖ បើអ្នកចុច ផ្ញើ នោះសារនឹងទៅ។ តោះហាត់អនុវត្ត!',
        ),
      ),
      learn(
        [
          '❓',
          t('IF checks something', 'បើ ពិនិត្យអ្វីមួយ'),
          t('IF it is raining…', 'បើកំពុងភ្លៀង…'),
        ],
        [
          '✅',
          t('THEN says what happens', 'នោះ ប្រាប់អ្វីដែលកើតឡើង'),
          t('…THEN take an umbrella.', '…នោះយកឆ័ត្រ។'),
        ],
        [
          '↪️',
          t('ELSE is the other way', 'បើមិនដូច្នោះ គឺផ្លូវផ្សេង'),
          t('ELSE wear sunglasses.', 'បើមិនដូច្នោះ ពាក់វ៉ែនតាការពារពន្លឺ។'),
        ],
      ),
      see(
        'IF score ≥ 50 THEN "Pass" ELSE "Try again"',
        t(
          'A score of 70 gives “Pass”. A score of 30 gives “Try again”.',
          'ពិន្ទុ 70 បាន “ជាប់”។ ពិន្ទុ 30 បាន “សាកម្តងទៀត”។',
        ),
      ),
      revealPlay(
        'multiple_choice',
        mc(
          t(
            'Rule: IF it rains THEN take an umbrella. It is raining. What do you do?',
            'ច្បាប់៖ បើភ្លៀង នោះយកឆ័ត្រ។ ឥឡូវកំពុងភ្លៀង។ តើអ្នកធ្វើអ្វី?',
          ),
          t('Take an umbrella', 'យកឆ័ត្រ'),
          [t('Nothing', 'មិនធ្វើអ្វីទេ'), t('Go swimming', 'ទៅហែលទឹក')],
        ),
        mc(
          t(
            'IF number > 10 THEN say "big" ELSE say "small". The number is 4.',
            'បើលេខ > 10 នោះនិយាយ "ធំ" បើមិនដូច្នោះ និយាយ "តូច"។ លេខគឺ 4។',
          ),
          t('"small"', '"តូច"'),
          [t('"big"', '"ធំ"'), t('"4"', '"4"')],
        ),
        mc(
          t(
            'IF score ≥ 50 THEN "Pass" ELSE "Try again". Score = 50.',
            'បើពិន្ទុ ≥ 50 នោះ "ជាប់" បើមិនដូច្នោះ "សាកម្តងទៀត"។ ពិន្ទុ = 50។',
          ),
          t('"Pass"', '"ជាប់"'),
          [t('"Try again"', '"សាកម្តងទៀត"')],
          {
            explanation: t(
              '≥ means “more than or equal to”, and 50 is equal to 50.',
              '≥ មានន័យថា “ធំជាង ឬស្មើ” ហើយ 50 ស្មើ 50។',
            ),
          },
        ),
        mc(
          t(
            'IF the light is red THEN stop. The light is green. Must you stop because of this rule?',
            'បើភ្លើងក្រហម នោះឈប់។ ភ្លើងពណ៌បៃតង។ តើច្បាប់នេះតម្រូវឱ្យអ្នកឈប់ទេ?',
          ),
          t('No', 'ទេ'),
          [t('Yes', 'បាទ/ចាស')],
          {
            explanation: t(
              'The rule only says what to do when the light is red.',
              'ច្បាប់និយាយតែពីពេលភ្លើងក្រហមប៉ុណ្ណោះ។',
            ),
          },
        ),
        mc(
          t(
            'IF battery < 20% THEN show a warning. Battery = 15%.',
            'បើថ្ម < 20% នោះបង្ហាញការព្រមាន។ ថ្ម = 15%។',
          ),
          t('Show a warning', 'បង្ហាញការព្រមាន'),
          [t('Do nothing', 'មិនធ្វើអ្វីទេ'), t('Turn off', 'បិទ')],
        ),
        mc(
          t(
            'IF x is even THEN x = x ÷ 2 ELSE x = x + 1. Start with x = 7. What is x?',
            'បើ x ជាលេខគូ នោះ x = x ÷ 2 បើមិនដូច្នោះ x = x + 1។ ចាប់ផ្តើម x = 7។ តើ x ស្មើប៉ុន្មាន?',
          ),
          '8',
          ['3.5', '7', '6'],
          {
            explanation: t('7 is odd, so add 1: 8.', '7 ជាលេខសេស ដូច្នេះបូក 1៖ 8។'),
          },
        ),
        mc(
          t(
            'Same rule, now x = 8. What is x after one step?',
            'ច្បាប់ដដែល ឥឡូវ x = 8។ តើបន្ទាប់ពីមួយជំហាន x ស្មើប៉ុន្មាន?',
          ),
          '4',
          ['9', '16', '8'],
          {
            explanation: t('8 is even, so divide by 2: 4.', '8 ជាលេខគូ ដូច្នេះចែក 2៖ 4។'),
          },
        ),
        tf(
          t(
            'Rule: IF you are hungry THEN eat. You ate. So you must have been hungry.',
            'ច្បាប់៖ បើឃ្លាន នោះញ៉ាំ។ អ្នកបានញ៉ាំ។ ដូច្នេះអ្នកត្រូវតែឃ្លាន។',
          ),
          false,
          {
            explanation: t(
              'You might eat for other reasons, like a party. The rule doesn’t work backwards.',
              'អ្នកអាចញ៉ាំដោយមូលហេតុផ្សេង ដូចជាពិធីជប់លៀង។ ច្បាប់នេះមិនដំណើរការថយក្រោយទេ។',
            ),
          },
        ),
        mc(
          t(
            'IF password is correct THEN open the app ELSE show "Try again". The password is wrong.',
            'បើពាក្យសម្ងាត់ត្រឹមត្រូវ នោះបើកកម្មវិធី បើមិនដូច្នោះ បង្ហាញ "សាកម្តងទៀត"។ ពាក្យសម្ងាត់ខុស។',
          ),
          t('Show "Try again"', 'បង្ហាញ "សាកម្តងទៀត"'),
          [t('Open the app', 'បើកកម្មវិធី'), t('Delete the app', 'លុបកម្មវិធី')],
        ),
        mc(
          t(
            'IF age ≥ 18 THEN "adult" ELSE "child". Age = 17.',
            'បើអាយុ ≥ 18 នោះ "មនុស្សពេញវ័យ" បើមិនដូច្នោះ "កុមារ"។ អាយុ = 17។',
          ),
          t('"child"', '"កុមារ"'),
          [t('"adult"', '"មនុស្សពេញវ័យ"')],
        ),
      ),
      revealChallenge(
        'multiple_choice',
        mc(
          t(
            'IF temperature > 30 THEN "hot" ELSE IF temperature > 20 THEN "warm" ELSE "cool". Temperature = 25.',
            'បើសីតុណ្ហភាព > 30 នោះ "ក្តៅ" បើមិនដូច្នោះ បើ > 20 នោះ "កក់ក្តៅ" បើមិនដូច្នោះ "ត្រជាក់"។ សីតុណ្ហភាព = 25។',
          ),
          t('"warm"', '"កក់ក្តៅ"'),
          [t('"hot"', '"ក្តៅ"'), t('"cool"', '"ត្រជាក់"')],
          {
            explanation: t('25 is not > 30, but it is > 20.', '25 មិន > 30 ទេ ប៉ុន្តែវា > 20។'),
          },
        ),
        mc(
          t('Same rule. Temperature = 35.', 'ច្បាប់ដដែល។ សីតុណ្ហភាព = 35។'),
          t('"hot"', '"ក្តៅ"'),
          [t('"warm"', '"កក់ក្តៅ"'), t('"cool"', '"ត្រជាក់"')],
        ),
        mc(
          t('Same rule. Temperature = 20.', 'ច្បាប់ដដែល។ សីតុណ្ហភាព = 20។'),
          t('"cool"', '"ត្រជាក់"'),
          [t('"warm"', '"កក់ក្តៅ"'), t('"hot"', '"ក្តៅ"')],
          {
            explanation: t(
              '20 is not more than 20, so it falls to the last part.',
              '20 មិនធំជាង 20 ទេ ដូច្នេះវាធ្លាក់ទៅផ្នែកចុងក្រោយ។',
            ),
          },
        ),
        num(
          t(
            'IF n < 5 THEN n = n × 3 ELSE n = n − 2. Start with n = 4. What is n?',
            'បើ n < 5 នោះ n = n × 3 បើមិនដូច្នោះ n = n − 2។ ចាប់ផ្តើម n = 4។ តើ n ស្មើប៉ុន្មាន?',
          ),
          12,
          {
            explanation: t('4 < 5, so 4 × 3 = 12.', '4 < 5 ដូច្នេះ 4 × 3 = 12។'),
          },
        ),
        num(t('Same rule, start with n = 9.', 'ច្បាប់ដដែល ចាប់ផ្តើម n = 9។'), 7, {
          explanation: t('9 is not < 5, so 9 − 2 = 7.', '9 មិន < 5 ទេ ដូច្នេះ 9 − 2 = 7។'),
        }),
        mc(
          t(
            'A shop: IF you buy 3 or more, THEN 10% off. Dara buys 2. Does he get the discount?',
            'ហាងមួយ៖ បើទិញ 3 ឬច្រើនជាង នោះបញ្ចុះ 10%។ ដារ៉ាទិញ 2។ តើគាត់បានបញ្ចុះតម្លៃទេ?',
          ),
          t('No', 'ទេ'),
          [t('Yes', 'បាទ/ចាស')],
        ),
        tf(
          t(
            'Rule: IF it is Sunday THEN school is closed. School is closed today. So today must be Sunday.',
            'ច្បាប់៖ បើថ្ងៃអាទិត្យ នោះសាលាបិទ។ ថ្ងៃនេះសាលាបិទ។ ដូច្នេះថ្ងៃនេះត្រូវតែជាថ្ងៃអាទិត្យ។',
          ),
          false,
          {
            explanation: t(
              'School can be closed on holidays too.',
              'សាលាក៏អាចបិទនៅថ្ងៃឈប់សម្រាកដែរ។',
            ),
          },
        ),
        tf(
          t(
            'Rule: IF it is Sunday THEN school is closed. Today is Sunday. So school is closed.',
            'ច្បាប់៖ បើថ្ងៃអាទិត្យ នោះសាលាបិទ។ ថ្ងៃនេះជាថ្ងៃអាទិត្យ។ ដូច្នេះសាលាបិទ។',
          ),
          true,
        ),
        mc(
          t(
            'Which rule makes a phone app say "Good morning" only before 12:00?',
            'តើច្បាប់ណាធ្វើឱ្យកម្មវិធីនិយាយ "អរុណសួស្តី" តែមុនម៉ោង 12:00?',
          ),
          t('IF time < 12:00 THEN "Good morning"', 'បើម៉ោង < 12:00 នោះ "អរុណសួស្តី"'),
          [
            t('IF time > 12:00 THEN "Good morning"', 'បើម៉ោង > 12:00 នោះ "អរុណសួស្តី"'),
            t('ALWAYS "Good morning"', 'ជានិច្ច "អរុណសួស្តី"'),
          ],
        ),
        mc(
          t(
            'IF a AND b are both true THEN the light turns on. a is true, b is false. Is the light on?',
            'បើ a និង b ពិតទាំងពីរ នោះភ្លើងបើក។ a ពិត b មិនពិត។ តើភ្លើងបើកទេ?',
          ),
          t('No', 'ទេ'),
          [t('Yes', 'បាទ/ចាស')],
          {
            explanation: t(
              'Both must be true, and b is false.',
              'ទាំងពីរត្រូវតែពិត ប៉ុន្តែ b មិនពិត។',
            ),
          },
        ),
        mc(
          t(
            'IF the inbox has new mail THEN show a red dot. You see no red dot. What do you know?',
            'បើប្រអប់សំបុត្រមានអ៊ីមែលថ្មី នោះបង្ហាញចំណុចក្រហម។ អ្នកមិនឃើញចំណុចក្រហមទេ។ តើអ្នកដឹងអ្វី?',
          ),
          t('There is no new mail', 'គ្មានអ៊ីមែលថ្មីទេ'),
          [t('There is new mail', 'មានអ៊ីមែលថ្មី'), t('The phone is broken', 'ទូរស័ព្ទខូច')],
          {
            explanation: t(
              'New mail would always show the dot, so no dot means no new mail.',
              'អ៊ីមែលថ្មីតែងតែបង្ហាញចំណុច ដូច្នេះគ្មានចំណុចមានន័យថាគ្មានអ៊ីមែលថ្មី។',
            ),
          },
        ),
      ),
      reward(t('You think like an app! ➡️', 'អ្នកគិតដូចកម្មវិធី! ➡️')),
    ],
  ),

  lesson(
    W,
    'and-or-not',
    '🔀',
    t('AND, OR, NOT', 'AND, OR, NOT'),
    t('The three words inside every computer.', 'ពាក្យបីនៅក្នុងកុំព្យូទ័រគ្រប់គ្រឿង។'),
    12,
    [
      intro(
        '🔀',
        t(
          'Deep inside, computers only ask: AND, OR, NOT. Master these and you think like a chip!',
          'នៅខាងក្នុង កុំព្យូទ័រសួរតែ៖ AND, OR, NOT។ ចេះទាំងនេះ ហើយអ្នកនឹងគិតដូចឈីប!',
        ),
      ),
      learn(
        [
          '🤝',
          t('AND: both must be true', 'AND៖ ទាំងពីរត្រូវតែពិត'),
          t('Tea AND sugar → you need both.', 'តែ AND ស្ករ → អ្នកត្រូវការទាំងពីរ។'),
        ],
        [
          '🙌',
          t('OR: at least one is true', 'OR៖ យ៉ាងហោចណាស់មួយពិត'),
          t('Tea OR coffee → either one is fine.', 'តែ OR កាហ្វេ → មួយណាក៏បាន។'),
        ],
        [
          '🔄',
          t('NOT flips it', 'NOT ប្តូរវាផ្ទុយ'),
          t('NOT true = false. NOT false = true.', 'NOT ពិត = មិនពិត។ NOT មិនពិត = ពិត។'),
        ],
      ),
      see(
        'true AND false = false · true OR false = true',
        t('AND needs both. OR needs just one.', 'AND ត្រូវការទាំងពីរ។ OR ត្រូវការតែមួយ។'),
      ),
      revealPlay(
        'true_false',
        tf('true AND true', true),
        tf('true AND false', false, {
          explanation: t('AND needs both to be true.', 'AND ត្រូវការទាំងពីរពិត។'),
        }),
        tf('false OR true', true, { explanation: t('OR needs just one.', 'OR ត្រូវការតែមួយ។') }),
        tf('false OR false', false),
        tf('NOT true', false),
        tf('NOT false', true),
        mc(
          t(
            'To enter, you need a ticket AND an ID. Sokha has a ticket but no ID. Can she enter?',
            'ដើម្បីចូល អ្នកត្រូវការសំបុត្រ AND អត្តសញ្ញាណប័ណ្ណ។ សុខាមានសំបុត្រ ប៉ុន្តែគ្មានអត្តសញ្ញាណប័ណ្ណ។ តើនាងអាចចូលបានទេ?',
          ),
          t('No', 'ទេ'),
          [t('Yes', 'បាទ/ចាស')],
        ),
        mc(
          t(
            'You can pay with cash OR card. Dara has a card only. Can he pay?',
            'អ្នកអាចបង់ជាសាច់ប្រាក់ OR កាត។ ដារ៉ាមានតែកាត។ តើគាត់អាចបង់បានទេ?',
          ),
          t('Yes', 'បាទ/ចាស'),
          [t('No', 'ទេ')],
        ),
        mc(
          t(
            'Search: “cats AND dogs”. Which page will it find?',
            'ស្វែងរក៖ “ឆ្មា AND ឆ្កែ”។ តើវានឹងរកឃើញទំព័រណា?',
          ),
          t('A page about cats and dogs', 'ទំព័រអំពីឆ្មា និងឆ្កែ'),
          [
            t('A page only about cats', 'ទំព័រអំពីតែឆ្មា'),
            t('A page only about fish', 'ទំព័រអំពីតែត្រី'),
          ],
        ),
        tf(
          t(
            'NOT (it is raining) is true on a sunny day.',
            'NOT (កំពុងភ្លៀង) ពិតនៅថ្ងៃមានពន្លឺថ្ងៃ។',
          ),
          true,
        ),
      ),
      revealChallenge(
        'true_false',
        tf('(true AND true) OR false', true, {
          explanation: t(
            'true AND true = true; true OR false = true.',
            'true AND true = true; true OR false = true។',
          ),
        }),
        tf('true AND (false OR false)', false, {
          explanation: t(
            'false OR false = false; true AND false = false.',
            'false OR false = false; true AND false = false។',
          ),
        }),
        tf('NOT (true AND false)', true, {
          explanation: t(
            'true AND false = false; NOT false = true.',
            'true AND false = false; NOT false = true។',
          ),
        }),
        tf('NOT true OR NOT false', true, {
          explanation: t('false OR true = true.', 'false OR true = true។'),
        }),
        tf(t('5 > 3 AND 2 > 4', '5 > 3 AND 2 > 4'), false, {
          explanation: t('2 > 4 is false.', '2 > 4 មិនពិត។'),
        }),
        tf(t('5 > 3 OR 2 > 4', '5 > 3 OR 2 > 4'), true),
        tf(t('NOT (10 is even)', 'NOT (10 ជាលេខគូ)'), false),
        mc(
          t(
            'A game says: you win IF you have 3 stars AND NOT 0 lives. Kanha has 3 stars and 2 lives. Does she win?',
            'ល្បែងមួយថា៖ អ្នកឈ្នះ បើអ្នកមានផ្កាយ 3 AND NOT ជីវិត 0។ កញ្ញាមានផ្កាយ 3 និងជីវិត 2។ តើនាងឈ្នះទេ?',
          ),
          t('Yes', 'បាទ/ចាស'),
          [t('No', 'ទេ')],
          {
            explanation: t(
              '3 stars is true, and she does NOT have 0 lives.',
              'ផ្កាយ 3 ពិត ហើយនាង NOT មានជីវិត 0។',
            ),
          },
        ),
        mc(
          t(
            'Free bus for students OR people over 60. Who pays?',
            'ឡានក្រុងឥតគិតថ្លៃសម្រាប់សិស្ស OR មនុស្សអាយុលើស 60។ តើនរណាត្រូវបង់?',
          ),
          t('A 30-year-old worker', 'កម្មករអាយុ 30 ឆ្នាំ'),
          [
            t('A 15-year-old student', 'សិស្សអាយុ 15 ឆ្នាំ'),
            t('A 70-year-old grandmother', 'យាយអាយុ 70 ឆ្នាំ'),
          ],
          {
            explanation: t(
              'The worker is neither a student nor over 60.',
              'កម្មករមិនមែនជាសិស្ស ហើយក៏មិនលើស 60 ដែរ។',
            ),
          },
        ),
        mc(
          t(
            'Which search finds pages about phones but NOT Apple?',
            'តើការស្វែងរកណារកឃើញទំព័រអំពីទូរស័ព្ទ ប៉ុន្តែ NOT Apple?',
          ),
          t('phones NOT Apple', 'phones NOT Apple'),
          [t('phones AND Apple', 'phones AND Apple'), t('phones OR Apple', 'phones OR Apple')],
        ),
        mc(
          t(
            'A door opens when you press button A OR button B. Neither is pressed. Is it open?',
            'ទ្វារបើកពេលអ្នកចុចប៊ូតុង A OR ប៊ូតុង B។ មិនបានចុចមួយណាទេ។ តើវាបើកទេ?',
          ),
          t('No', 'ទេ'),
          [t('Yes', 'បាទ/ចាស')],
        ),
      ),
      reward(t('Logic gate master! 🔀', 'មេច្រកតក្កវិជ្ជា! 🔀')),
    ],
  ),
];
