import { t } from '../../types';
import { catchIt, game, memory, robot } from '../dsl';

// 🎮 Game rounds for Math Playground, by lesson slug. Khmer (km) strings are DRAFTS.
export const MATH_GAMES = {
  'adding-and-subtracting': game(
    catchIt(
      t('Catch every sum that makes 10!', 'ចាប់គ្រប់ផលបូកដែលស្មើ 10!'),
      ['3 + 7', '6 + 4', '12 − 2', '15 − 5'],
      ['5 + 6', '9 − 2', '4 + 4', '13 − 2'],
      { speed: 'slow' },
    ),
    memory(t('Match each sum to its answer.', 'ផ្គូផ្គងផលបូកនីមួយៗជាមួយចម្លើយ។'), [
      ['8 + 5', '13'],
      ['9 + 6', '15'],
      ['14 − 6', '8'],
      ['7 + 4', '11'],
    ]),
  ),
  'times-tables': game(
    catchIt(
      t('Catch the numbers in the 3 times table!', 'ចាប់លេខក្នុងតារាងគុណ 3!'),
      ['3', '9', '12', '18', '21', '27'],
      ['8', '10', '14', '20', '25'],
    ),
    memory(t('Match each multiplication to its answer.', 'ផ្គូផ្គងវិធីគុណនីមួយៗជាមួយចម្លើយ។'), [
      ['6 × 7', '42'],
      ['8 × 8', '64'],
      ['9 × 3', '27'],
      ['7 × 5', '35'],
    ]),
  ),
  'sharing-and-dividing': game(
    catchIt(
      t('Catch every division that equals 4!', 'ចាប់គ្រប់វិធីចែកដែលស្មើ 4!'),
      ['12 ÷ 3', '20 ÷ 5', '8 ÷ 2', '36 ÷ 9'],
      ['15 ÷ 3', '18 ÷ 2', '24 ÷ 4', '10 ÷ 5'],
      { speed: 'slow' },
    ),
    memory(t('Match each division to its answer.', 'ផ្គូផ្គងវិធីចែកនីមួយៗជាមួយចម្លើយ។'), [
      ['20 ÷ 4', '5'],
      ['18 ÷ 3', '6'],
      ['40 ÷ 5', '8'],
      ['63 ÷ 9', '7'],
    ]),
  ),
  'missing-numbers': game(
    memory(t('Find the missing number for each puzzle.', 'រកលេខដែលបាត់សម្រាប់ល្បែងនីមួយៗ។'), [
      ['? + 5 = 12', '7'],
      ['15 − ? = 9', '6'],
      ['? × 4 = 20', '5'],
      ['18 ÷ ? = 2', '9'],
    ]),
    catchIt(
      t('Catch every even number!', 'ចាប់គ្រប់លេខគូ!'),
      ['2', '8', '14', '20', '36'],
      ['3', '7', '11', '15', '21'],
    ),
  ),
  'number-patterns': game(
    catchIt(
      t('Counting in 5s: catch the numbers you say!', 'រាប់ម្តង 5៖ ចាប់លេខដែលអ្នកនិយាយ!'),
      ['5', '15', '25', '40', '50'],
      ['12', '22', '33', '48'],
    ),
    memory(t('Match each pattern to its next number.', 'ផ្គូផ្គងលំនាំនីមួយៗជាមួយលេខបន្ទាប់។'), [
      ['2, 4, 6, ?', '8'],
      ['1, 3, 5, ?', '7'],
      ['10, 20, 30, ?', '40'],
      ['5, 10, 15, ?', '20'],
    ]),
  ),
  'place-value': game(
    catchIt(
      t('Catch the numbers with 7 in the TENS place!', 'ចាប់លេខដែលមាន 7 នៅខ្ទង់ដប់!'),
      ['172', '75', '1,370', '979'],
      ['7', '700', '217', '57'],
      { speed: 'slow' },
    ),
    memory(t('Match each place value to its number.', 'ផ្គូផ្គងតម្លៃខ្ទង់នីមួយៗជាមួយលេខ។'), [
      [t('3 hundreds', '3 រយ'), '300'],
      [t('4 tens', '4 ដប់'), '40'],
      [t('2 thousands', '2 ពាន់'), '2,000'],
      [t('6 ones', '6 រាយ'), '6'],
    ]),
  ),
  'rounding-and-estimating': game(
    catchIt(
      t(
        'Catch the numbers that round to 50 (nearest ten)!',
        'ចាប់លេខដែលបង្គត់ទៅ 50 (ដប់ជិតបំផុត)!',
      ),
      ['45', '47', '52', '54'],
      ['44', '55', '38', '61'],
      { speed: 'slow' },
    ),
    memory(t('Match each number to its rounded value.', 'ផ្គូផ្គងលេខនីមួយៗជាមួយតម្លៃបង្គត់។'), [
      [t('68 → nearest 10', '68 → ដប់ជិតបំផុត'), '70'],
      [t('231 → nearest 100', '231 → រយជិតបំផុត'), '200'],
      [t('4.6 → nearest 1', '4.6 → មួយជិតបំផុត'), '5'],
      [t('149 → nearest 100', '149 → រយជិតបំផុត'), '100'],
    ]),
  ),
  'order-of-operations': game(
    memory(
      t(
        'Brackets first, then × and ÷. Match each to its answer.',
        'វង់ក្រចកមុន បន្ទាប់មក × និង ÷។ ផ្គូផ្គងនីមួយៗជាមួយចម្លើយ។',
      ),
      [
        ['2 + 3 × 4', '14'],
        ['(2 + 3) × 4', '20'],
        ['10 − 6 ÷ 2', '7'],
        ['(10 − 6) ÷ 2', '2'],
      ],
    ),
    catchIt(
      t('Catch every calculation that equals 10!', 'ចាប់គ្រប់ការគណនាដែលស្មើ 10!'),
      ['2 + 2 × 4', '(1 + 4) × 2', '20 − 5 × 2', '4 × 3 − 2'],
      ['(2 + 2) × 4', '2 × 3 + 5', '12 ÷ 4 + 2', '3 + 3 × 3'],
      { speed: 'slow' },
    ),
  ),
  fractions: game(
    catchIt(
      t('Catch every fraction equal to one half!', 'ចាប់គ្រប់ប្រភាគដែលស្មើពាក់កណ្តាល!'),
      ['2/4', '3/6', '5/10', '4/8'],
      ['1/3', '2/3', '3/4', '2/5'],
    ),
    memory(
      t('Match each fraction question to its answer.', 'ផ្គូផ្គងសំណួរប្រភាគនីមួយៗជាមួយចម្លើយ។'),
      [
        [t('1/2 of 10', '1/2 នៃ 10'), '5'],
        [t('1/4 of 12', '1/4 នៃ 12'), '3'],
        [t('3/4 of 8', '3/4 នៃ 8'), '6'],
        [t('1/3 of 27', '1/3 នៃ 27'), '9'],
      ],
    ),
  ),
  percentages: game(
    memory(
      t('Match each percentage to the same fraction.', 'ផ្គូផ្គងភាគរយនីមួយៗជាមួយប្រភាគដូចគ្នា។'),
      [
        ['50%', '1/2'],
        ['25%', '1/4'],
        ['10%', '1/10'],
        ['100%', t('all of it', 'ទាំងអស់')],
      ],
    ),
    catchIt(
      t('Catch every percentage MORE than one half!', 'ចាប់គ្រប់ភាគរយដែលច្រើនជាងពាក់កណ្តាល!'),
      ['60%', '75%', '90%', '51%'],
      ['50%', '25%', '10%', '45%'],
    ),
  ),
  'money-maths': game(
    memory(t('Match each money sum to its total.', 'ផ្គូផ្គងការគណនាលុយនីមួយៗជាមួយចំនួនសរុប។'), [
      [t('1,000 + 500 riel', '1,000 + 500 រៀល'), t('1,500 riel', '1,500 រៀល')],
      [t('$2 when $1 = 4,000 riel', '$2 ពេល $1 = 4,000 រៀល'), t('8,000 riel', '8,000 រៀល')],
      [t('10,000 − 2,500 riel', '10,000 − 2,500 រៀល'), t('7,500 riel', '7,500 រៀល')],
      [t('4 × 500 riel', '4 × 500 រៀល'), t('2,000 riel', '2,000 រៀល')],
    ]),
    catchIt(
      t('Catch every amount bigger than 5,000 riel!', 'ចាប់គ្រប់ចំនួនលុយដែលធំជាង 5,000 រៀល!'),
      [
        t('10,000 riel', '10,000 រៀល'),
        t('$2', '$2'),
        t('6,500 riel', '6,500 រៀល'),
        t('5,100 riel', '5,100 រៀល'),
      ],
      [
        t('4,000 riel', '4,000 រៀល'),
        t('500 riel', '500 រៀល'),
        t('$1', '$1'),
        t('2,000 riel', '2,000 រៀល'),
      ],
      { hint: t('$1 is about 4,000 riel.', '$1 ប្រហែល 4,000 រៀល។') },
    ),
  ),
  'shopping-maths': game(
    catchIt(
      t(
        'You have 5,000 riel. Catch everything you can buy!',
        'អ្នកមាន 5,000 រៀល។ ចាប់អ្វីៗដែលអ្នកអាចទិញបាន!',
      ),
      [
        ['🥤', t('Drink 2,500', 'ភេសជ្ជៈ 2,500')],
        ['🍞', t('Bread 1,500', 'នំបុ័ង 1,500')],
        ['✏️', t('Pen 1,000', 'ប៊ិច 1,000')],
        ['🍌', t('Bananas 3,000', 'ចេក 3,000')],
      ],
      [
        ['👟', t('Shoes 40,000', 'ស្បែកជើង 40,000')],
        ['🎒', t('Bag 25,000', 'កាបូប 25,000')],
        ['📱', t('Phone case 12,000', 'ស្រោមទូរស័ព្ទ 12,000')],
        ['🍉', t('Melon 6,000', 'ឪឡឹក 6,000')],
      ],
      { speed: 'slow' },
    ),
    memory(
      t('Match each shopping question to its answer.', 'ផ្គូផ្គងសំណួរទិញទំនិញនីមួយៗជាមួយចម្លើយ។'),
      [
        [t('3 pens × 1,000', 'ប៊ិច 3 × 1,000'), t('3,000 riel', '3,000 រៀល')],
        [t('2 kg × 2,500', '2 គីឡូ × 2,500'), t('5,000 riel', '5,000 រៀល')],
        [
          t('Pay 10,000 for 6,000: change?', 'បង់ 10,000 ទិញ 6,000៖ អាប់?'),
          t('4,000 riel', '4,000 រៀល'),
        ],
        [t('20% off 10,000', 'បញ្ចុះ 20% ពី 10,000'), t('8,000 riel', '8,000 រៀល')],
      ],
    ),
  ),
  'telling-time': game(
    memory(t('Match each clock to the words.', 'ផ្គូផ្គងនាឡិកានីមួយៗជាមួយពាក្យ។'), [
      [['🕒', '3:00'], t('three o’clock', 'ម៉ោងបី')],
      [['🕧', '12:30'], t('half past twelve', 'ម៉ោងដប់ពីរកន្លះ')],
      ['9:15', t('quarter past nine', 'ម៉ោងប្រាំបួន ដប់ប្រាំនាទី')],
      ['6:45', t('quarter to seven', 'ម៉ោងប្រាំពីរ ខ្វះដប់ប្រាំនាទី')],
    ]),
    catchIt(
      t('Catch every time in the afternoon (12:00–18:00)!', 'ចាប់គ្រប់ម៉ោងពេលរសៀល (12:00–18:00)!'),
      ['13:30', '15:00', '16:45', '12:15'],
      ['08:00', '10:30', '19:00', '06:15'],
    ),
  ),
  'measuring-units': game(
    memory(t('Match the units that are the same.', 'ផ្គូផ្គងឯកតាដែលស្មើគ្នា។'), [
      [t('1 m', '1 ម៉ែត្រ'), t('100 cm', '100 សង់ទីម៉ែត្រ')],
      [t('1 kg', '1 គីឡូក្រាម'), t('1,000 g', '1,000 ក្រាម')],
      [t('1 hour', '1 ម៉ោង'), t('60 minutes', '60 នាទី')],
      [t('1 km', '1 គីឡូម៉ែត្រ'), t('1,000 m', '1,000 ម៉ែត្រ')],
    ]),
    catchIt(
      t('Catch the things we measure in litres!', 'ចាប់របស់ដែលយើងវាស់ជាលីត្រ!'),
      [
        ['🥛', t('Milk', 'ទឹកដោះគោ')],
        ['⛽', t('Petrol', 'សាំង')],
        ['💧', t('Water', 'ទឹក')],
        ['🧃', t('Juice', 'ទឹកផ្លែឈើ')],
      ],
      [
        ['🍚', t('Rice', 'អង្ករ')],
        ['🧵', t('Rope', 'ខ្សែ')],
        ['⏰', t('Time', 'ពេលវេលា')],
        ['📏', t('Ruler', 'បន្ទាត់')],
      ],
    ),
  ),
  'area-and-perimeter': game(
    robot(
      t(
        'Walk the robot along the edge of the garden to the flag. Use at most 4 blocks!',
        'ឱ្យរ៉ូបូតដើរតាមគែមសួនទៅទង់។ ប្រើមិនលើស 4 ប្លុក!',
      ),
      ['S....', '####.', '####.', '####G'],
      {
        maxBlocks: 4,
        hint: t(
          'Repeat “right” 4 times, then repeat “down” 3 times.',
          'ធ្វើ «ស្តាំ» 4 ដង រួចធ្វើ «ចុះក្រោម» 3 ដង។',
        ),
      },
    ),
    memory(t('Match each shape question to its answer.', 'ផ្គូផ្គងសំណួររូបរាងនីមួយៗជាមួយចម្លើយ។'), [
      [t('Area of 3 × 4', 'ក្រឡាផ្ទៃ 3 × 4'), '12'],
      [t('Perimeter of a square, side 5', 'បរិមាត្រការេ ជ្រុង 5'), '20'],
      [t('Area of a square, side 6', 'ក្រឡាផ្ទៃការេ ជ្រុង 6'), '36'],
      [t('Perimeter of 2 × 3', 'បរិមាត្រ 2 × 3'), '10'],
    ]),
  ),
};
