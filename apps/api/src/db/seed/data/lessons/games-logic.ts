import { t } from '../../types';
import { catchIt, game, memory, robot } from '../dsl';

// 🎮 Game rounds for Logic Playground, by lesson slug. Khmer (km) strings are DRAFTS.
export const LOGIC_GAMES = {
  'logic-puzzles': game(
    robot(
      t('Help the robot reach the flag. Plan every step!', 'ជួយរ៉ូបូតទៅដល់ទង់។ គ្រោងជំហាននីមួយៗ!'),
      ['S...', '.##.', '...G'],
    ),
    catchIt(
      t(
        'Catch the things that happen BEFORE lunch on a school day!',
        'ចាប់អ្វីដែលកើតឡើងមុនអាហារថ្ងៃត្រង់ ក្នុងថ្ងៃទៅសាលា!',
      ),
      [
        ['⏰', t('Wake up', 'ក្រោកពីគេង')],
        ['🍳', t('Breakfast', 'អាហារពេលព្រឹក')],
        ['🚲', t('Go to school', 'ទៅសាលា')],
        ['📚', t('Morning class', 'ថ្នាក់ពេលព្រឹក')],
      ],
      [
        ['🍲', t('Dinner', 'អាហារពេលល្ងាច')],
        ['📝', t('Homework', 'កិច្ចការផ្ទះ')],
        ['😴', t('Sleep', 'គេង')],
        ['🏠', t('Go home', 'ទៅផ្ទះ')],
      ],
    ),
  ),
  'odd-one-out': game(
    catchIt(
      t('Catch only the FRUITS!', 'ចាប់តែផ្លែឈើប៉ុណ្ណោះ!'),
      [
        ['🍎', t('Apple', 'ផ្លែប៉ោម')],
        ['🍌', t('Banana', 'ចេក')],
        ['🥭', t('Mango', 'ស្វាយ')],
        ['🍍', t('Pineapple', 'ម្នាស់')],
      ],
      [
        ['🥕', t('Carrot', 'ការ៉ុត')],
        ['🥔', t('Potato', 'ដំឡូងបារាំង')],
        ['🌽', t('Corn', 'ពោត')],
        ['🧅', t('Onion', 'ខ្ទឹមបារាំង')],
      ],
    ),
    catchIt(
      t('Catch every animal that can FLY!', 'ចាប់គ្រប់សត្វដែលហើរបាន!'),
      [
        ['🐦', t('Bird', 'បក្សី')],
        ['🦋', t('Butterfly', 'មេអំបៅ')],
        ['🐝', t('Bee', 'ឃ្មុំ')],
        ['🦉', t('Owl', 'មៀម')],
      ],
      [
        ['🐟', t('Fish', 'ត្រី')],
        ['🐘', t('Elephant', 'ដំរី')],
        ['🐍', t('Snake', 'ពស់')],
        ['🐄', t('Cow', 'គោ')],
      ],
      { speed: 'fast' },
    ),
  ),
  'shape-and-symbol-patterns': game(
    memory(
      t('Match each pattern to what comes next.', 'ផ្គូផ្គងលំនាំនីមួយៗជាមួយអ្វីដែលមកបន្ទាប់។'),
      [
        ['🔺🔵🔺🔵…', '🔺'],
        ['⭐⭐🌙⭐⭐…', '🌙'],
        ['🟥🟨🟩🟥🟨…', '🟩'],
        ['⬆️➡️⬇️⬅️⬆️…', '➡️'],
      ],
    ),
    catchIt(
      t('Catch every shape with 4 sides!', 'ចាប់គ្រប់រូបដែលមាន 4 ជ្រុង!'),
      [
        ['🟦', t('Square', 'ការេ')],
        ['▬', t('Rectangle', 'ចតុកោណកែង')],
        ['🔷', t('Rhombus', 'រ៉ូប')],
        ['🪟', t('Window', 'បង្អួច')],
      ],
      [
        ['🔺', t('Triangle', 'ត្រីកោណ')],
        ['⚪', t('Circle', 'រង្វង់')],
        ['⬠', t('Pentagon', 'បញ្ចកោណ')],
        ['⬡', t('Hexagon', 'ឆកោណ')],
      ],
    ),
  ),
  analogies: game(
    memory(
      t('Each pair works the same way. Match them!', 'គូនីមួយៗធ្វើការដូចគ្នា។ ផ្គូផ្គងពួកវា!'),
      [
        [t('Bird : fly', 'បក្សី : ហើរ'), t('Fish : swim', 'ត្រី : ហែល')],
        [t('Hand : glove', 'ដៃ : ស្រោមដៃ'), t('Foot : sock', 'ជើង : ស្រោមជើង')],
        [t('Day : sun', 'ថ្ងៃ : ព្រះអាទិត្យ'), t('Night : moon', 'យប់ : ព្រះច័ន្ទ')],
        [t('Mouse : click', 'កណ្តុរ : ចុច'), t('Keyboard : type', 'ក្តារចុច : វាយ')],
      ],
    ),
    catchIt(
      t('Catch the pairs of OPPOSITES!', 'ចាប់គូពាក្យផ្ទុយគ្នា!'),
      [
        t('big – small', 'ធំ – តូច'),
        t('up – down', 'លើ – ក្រោម'),
        t('open – close', 'បើក – បិទ'),
        t('fast – slow', 'លឿន – យឺត'),
      ],
      [
        t('cat – kitten', 'ឆ្មា – កូនឆ្មា'),
        t('red – colour', 'ក្រហម – ពណ៌'),
        t('pen – write', 'ប៊ិច – សរសេរ'),
        t('sun – hot', 'ព្រះអាទិត្យ – ក្តៅ'),
      ],
      { speed: 'slow' },
    ),
  ),
  'comparing-and-ordering': game(
    catchIt(
      t('Catch every number BIGGER than 50!', 'ចាប់គ្រប់លេខដែលធំជាង 50!'),
      ['51', '88', '100', '75', '63'],
      ['15', '49', '50', '9', '32'],
      { speed: 'fast' },
    ),
    memory(t('Match the numbers that are the same size.', 'ផ្គូផ្គងលេខដែលមានទំហំស្មើគ្នា។'), [
      ['0.5', '1/2'],
      ['0.25', '1/4'],
      ['0.75', '3/4'],
      ['0.1', '1/10'],
    ]),
  ),
  'all-some-none': game(
    catchIt(
      t('Catch the sentences that are ALWAYS true!', 'ចាប់ប្រយោគដែលពិតជានិច្ច!'),
      [
        t('All dogs are animals', 'ឆ្កែទាំងអស់ជាសត្វ'),
        t('All squares have 4 sides', 'ការេទាំងអស់មាន 4 ជ្រុង'),
        t('Every week has 7 days', 'សប្តាហ៍នីមួយៗមាន 7 ថ្ងៃ'),
        t('Every month has at least 28 days', 'ខែនីមួយៗមានយ៉ាងហោចណាស់ 28 ថ្ងៃ'),
      ],
      [
        t('All birds can fly', 'បក្សីទាំងអស់ហើរបាន'),
        t('All cats are black', 'ឆ្មាទាំងអស់ពណ៌ខ្មៅ'),
        t('Every day is sunny', 'រាល់ថ្ងៃមានថ្ងៃភ្លឺ'),
        t('All numbers are even', 'លេខទាំងអស់ជាលេខគូ'),
      ],
      { speed: 'slow' },
    ),
    memory(t('Match each word to its meaning.', 'ផ្គូផ្គងពាក្យនីមួយៗជាមួយអត្ថន័យ។'), [
      [t('All', 'ទាំងអស់'), t('every one', 'គ្រប់មួយ')],
      [t('None', 'គ្មាន'), t('not even one', 'សូម្បីតែមួយក៏គ្មាន')],
      [t('Some', 'ខ្លះ'), t('at least one', 'យ៉ាងហោចណាស់មួយ')],
      [t('Most', 'ភាគច្រើន'), t('more than half', 'ច្រើនជាងពាក់កណ្តាល')],
    ]),
  ),
  'if-then-rules': game(
    catchIt(
      t(
        'Rule: IF it is raining THEN take an umbrella. Catch the times you need it!',
        'ច្បាប់៖ បើភ្លៀង នោះយកឆ័ត្រ។ ចាប់ពេលដែលអ្នកត្រូវការវា!',
      ),
      [
        ['🌧️', t('Rain this morning', 'ភ្លៀងព្រឹកនេះ')],
        ['⛈️', t('Storm after school', 'ព្យុះក្រោយម៉ោងសាលា')],
        ['🌦️', t('Light rain', 'ភ្លៀងតិចៗ')],
        ['☔', t('Raining at lunch', 'ភ្លៀងពេលថ្ងៃត្រង់')],
      ],
      [
        ['☀️', t('Sunny', 'ថ្ងៃភ្លឺ')],
        ['🌙', t('Clear night', 'យប់ស្រឡះ')],
        ['⛅', t('Cloudy but dry', 'មានពពក ប៉ុន្តែស្ងួត')],
        ['🌈', t('The rain stopped', 'ភ្លៀងឈប់ហើយ')],
      ],
    ),
    memory(t('Match each IF to its THEN.', 'ផ្គូផ្គង «បើ» នីមួយៗជាមួយ «នោះ»។'), [
      [t('IF you are hungry', 'បើអ្នកឃ្លាន'), t('THEN eat', 'នោះញ៉ាំ')],
      [t('IF the battery is low', 'បើថ្មខ្សោយ'), t('THEN charge it', 'នោះសាកថ្ម')],
      [t('IF it is dark', 'បើងងឹត'), t('THEN turn on the light', 'នោះបើកភ្លើង')],
      [
        t('IF you forget a password', 'បើភ្លេចពាក្យសម្ងាត់'),
        t('THEN reset it', 'នោះកំណត់វាឡើងវិញ'),
      ],
    ]),
  ),
  'and-or-not': game(
    catchIt(
      t('Catch the expressions that are TRUE!', 'ចាប់កន្សោមដែលពិត!'),
      ['true AND true', 'true OR false', 'NOT false', 'false OR true'],
      ['true AND false', 'NOT true', 'false OR false', 'false AND true'],
      { speed: 'slow' },
    ),
    catchIt(
      t(
        'You can play IF homework is done AND it is before 6 pm. Catch the times you can play!',
        'អ្នកអាចលេង បើកិច្ចការផ្ទះរួច និងមុនម៉ោង 6 ល្ងាច។ ចាប់ពេលដែលអ្នកអាចលេង!',
      ),
      [
        t('Done ✅ · 4 pm', 'រួច ✅ · ម៉ោង 4 ល្ងាច'),
        t('Done ✅ · 5 pm', 'រួច ✅ · ម៉ោង 5 ល្ងាច'),
        t('Done ✅ · 3:30 pm', 'រួច ✅ · ម៉ោង 3:30 រសៀល'),
      ],
      [
        t('Not done ❌ · 4 pm', 'មិនទាន់រួច ❌ · ម៉ោង 4 ល្ងាច'),
        t('Done ✅ · 7 pm', 'រួច ✅ · ម៉ោង 7 យប់'),
        t('Not done ❌ · 8 pm', 'មិនទាន់រួច ❌ · ម៉ោង 8 យប់'),
      ],
      { speed: 'slow' },
    ),
  ),
  'step-by-step-algorithms': game(
    robot(
      t(
        'Write the steps (an algorithm) to get the robot to the flag.',
        'សរសេរជំហាន (ក្បួនដោះស្រាយ) ឱ្យរ៉ូបូតទៅដល់ទង់។',
      ),
      ['S.#', '#.#', '#.G'],
    ),
    robot(t('Pick up the star ⭐ first, then go to the flag.', 'រើសផ្កាយ ⭐ មុនសិន រួចទៅទង់។'), [
      'S..#',
      '##.#',
      '*...',
      '##.G',
    ]),
  ),
  'loops-and-repeats': game(
    robot(
      t(
        'A long road! Get to the flag with only 2 blocks (use Repeat 🔁).',
        'ផ្លូវវែង! ទៅដល់ទង់ដោយប្រើតែ 2 ប្លុក (ប្រើ ធ្វើម្តងទៀត 🔁)។',
      ),
      ['S......G'],
      { maxBlocks: 2, hint: t('Repeat “right” 7 times.', 'ធ្វើ «ស្តាំ» 7 ដង។') },
    ),
    robot(
      t('Climb down the stairs with only 3 blocks!', 'ចុះជណ្តើរដោយប្រើតែ 3 ប្លុក!'),
      ['S.##', '#..#', '##..', '###G'],
      {
        maxBlocks: 3,
        hint: t(
          'One step is “right, down”. Repeat it 3 times.',
          'មួយជំហានគឺ «ស្តាំ ចុះក្រោម»។ ធ្វើវា 3 ដង។',
        ),
      },
    ),
  ),
  'find-the-bug': game(
    robot(
      t(
        'This maze has a trap. Find a route that does not bump into a wall!',
        'ផ្លូវវង្វេងនេះមានអន្ទាក់។ រកផ្លូវដែលមិនប៉ះជញ្ជាំង!',
      ),
      ['S.#..', '..#.#', '#...#', '#.#.G'],
    ),
    memory(t('Match each coding word to its meaning.', 'ផ្គូផ្គងពាក្យកូដនីមួយៗជាមួយអត្ថន័យ។'), [
      [['🐞', t('Bug', 'កំហុស (Bug)')], t('A mistake in a program', 'កំហុសក្នុងកម្មវិធី')],
      [t('Debug', 'កែកំហុស (Debug)'), t('Find and fix mistakes', 'រក និងកែកំហុស')],
      [t('Test', 'សាកល្បង'), t('Try it to see if it works', 'សាកមើលថាវាដំណើរការឬអត់')],
      [
        t('Error message', 'សារកំហុស'),
        t('The computer says what went wrong', 'កុំព្យូទ័រប្រាប់ថាមានអ្វីខុស'),
      ],
    ]),
  ),
  'sorting-and-grouping': game(
    catchIt(
      t('Catch the animals that live in WATER!', 'ចាប់សត្វដែលរស់នៅក្នុងទឹក!'),
      [
        ['🐟', t('Fish', 'ត្រី')],
        ['🐬', t('Dolphin', 'ផ្សោត')],
        ['🐙', t('Octopus', 'មឹកយក្ស')],
        ['🦀', t('Crab', 'ក្តាម')],
      ],
      [
        ['🐒', t('Monkey', 'ស្វា')],
        ['🐘', t('Elephant', 'ដំរី')],
        ['🐓', t('Chicken', 'មាន់')],
        ['🐈', t('Cat', 'ឆ្មា')],
      ],
      { speed: 'fast' },
    ),
    memory(t('Match each way of sorting to its name.', 'ផ្គូផ្គងវិធីតម្រៀបនីមួយៗជាមួយឈ្មោះ។'), [
      ['A → Z', t('Alphabetical order', 'លំដាប់អក្សរ')],
      [t('1, 2, 3 …', '1, 2, 3 …'), t('Smallest to biggest', 'តូចទៅធំ')],
      [t('9, 8, 7 …', '9, 8, 7 …'), t('Biggest to smallest', 'ធំទៅតូច')],
      ['🟥🟥 🟦🟦', t('Group by colour', 'ដាក់ជាក្រុមតាមពណ៌')],
    ]),
  ),
  'calendar-logic': game(
    catchIt(
      t('Catch the months that have 31 days!', 'ចាប់ខែដែលមាន 31 ថ្ងៃ!'),
      [
        t('January', 'មករា'),
        t('March', 'មីនា'),
        t('May', 'ឧសភា'),
        t('July', 'កក្កដា'),
        t('August', 'សីហា'),
      ],
      [
        t('February', 'កុម្ភៈ'),
        t('April', 'មេសា'),
        t('June', 'មិថុនា'),
        t('September', 'កញ្ញា'),
        t('November', 'វិច្ឆិកា'),
      ],
      {
        hint: t(
          'Count on your knuckles: knuckle = 31 days.',
          'រាប់លើឆ្អឹងកណ្តាប់ដៃ៖ ឆ្អឹងប៉ោង = 31 ថ្ងៃ។',
        ),
      },
    ),
    memory(t('Match each question to its answer.', 'ផ្គូផ្គងសំណួរនីមួយៗជាមួយចម្លើយ។'), [
      [t('The day after Monday', 'ថ្ងៃបន្ទាប់ពីថ្ងៃច័ន្ទ'), t('Tuesday', 'ថ្ងៃអង្គារ')],
      [t('The month after June', 'ខែបន្ទាប់ពីមិថុនា'), t('July', 'កក្កដា')],
      [t('Days in a week', 'ថ្ងៃក្នុងមួយសប្តាហ៍'), '7'],
      [t('Months in a year', 'ខែក្នុងមួយឆ្នាំ'), '12'],
    ]),
  ),
  'directions-and-maps': game(
    robot(
      t('Go to school 🏫, and buy bread 🥖 on the way.', 'ទៅសាលារៀន 🏫 ហើយទិញនំបុ័ង 🥖 តាមផ្លូវ។'),
      ['S..#.', '.#.#.', '.#*..', '...#G'],
      { goalIcon: '🏫', collectIcon: '🥖' },
    ),
    robot(
      t(
        'Go round the lake to the market in 6 blocks or fewer.',
        'ដើរជុំវិញបឹងទៅផ្សារ ក្នុង 6 ប្លុក ឬតិចជាងនេះ។',
      ),
      ['S....', '####.', '####.', '####.', 'G....'],
      {
        maxBlocks: 6,
        goalIcon: '🏪',
        hint: t(
          'Right 4 times, down 4 times, left 4 times.',
          'ស្តាំ 4 ដង ចុះក្រោម 4 ដង ឆ្វេង 4 ដង។',
        ),
      },
    ),
  ),
  'riddles-and-brain-teasers': game(
    memory(t('Match each riddle to its answer.', 'ផ្គូផ្គងល្បិចនីមួយៗជាមួយចម្លើយ។'), [
      [
        t('It has keys but opens no locks.', 'វាមានកូនសោ តែមិនបើកសោណាមួយ។'),
        ['⌨️', t('Keyboard', 'ក្តារចុច')],
      ],
      [t('It has a face and two hands.', 'វាមានមុខ និងដៃពីរ។'), ['🕰️', t('Clock', 'នាឡិកា')]],
      [
        t('It is full of holes but holds water.', 'វាពេញដោយរន្ធ តែផ្ទុកទឹកបាន។'),
        ['🧽', t('Sponge', 'អេប៉ុង')],
      ],
      [
        t('The more you take, the more you leave behind.', 'កាន់តែយកច្រើន កាន់តែទុកចោលច្រើន។'),
        ['👣', t('Footsteps', 'ស្នាមជើង')],
      ],
    ]),
  ),
};
