import { t, type LessonSeed } from '../../types';
import {
  buildSentence,
  catchIt,
  code,
  match,
  mc,
  memory,
  num,
  order,
  plannedLesson,
  robot,
  sortInto,
  tf,
  typeIt,
} from '../dsl';

// 👩‍💻 Coding Basics, lessons 1–8 (coding-2.ts has 9–15). Code examples are Python, the
// friendliest first language. Khmer (km) strings are DRAFTS for native review.
export const CODING_WORLD = 'coding-basics';
const W = CODING_WORLD;
const py = (source: string) => ({ data: code(source, 'Python') });

export const CODING_LESSONS_1: LessonSeed[] = [
  // 1 ─────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'what-is-code',
    '💡',
    t('What is Code?', 'តើកូដជាអ្វី?'),
    t(
      'Programs are instructions a computer follows.',
      'កម្មវិធីគឺជាសេចក្តីណែនាំដែលកុំព្យូទ័រធ្វើតាម។',
    ),
    {
      intro: [
        '💡',
        t(
          'Every app, game and website was written by a person — in code. Today you start to read it!',
          'កម្មវិធី ហ្គេម និងវេបសាយនីមួយៗត្រូវបានសរសេរដោយមនុស្ស — ជាកូដ។ ថ្ងៃនេះអ្នកចាប់ផ្តើមអានវា!',
        ),
      ],
      learn: [
        [
          '📜',
          t('Code', 'កូដ'),
          t(
            'Instructions for a computer, written in a language it understands.',
            'សេចក្តីណែនាំសម្រាប់កុំព្យូទ័រ សរសេរជាភាសាដែលវាយល់។',
          ),
          'code',
        ],
        [
          '🧑‍💻',
          t('Programmer', 'អ្នកសរសេរកម្មវិធី'),
          t('A person who writes code. You can be one!', 'មនុស្សដែលសរសេរកូដ។ អ្នកក៏អាចក្លាយជាបាន!'),
          'programmer',
        ],
        [
          '🐍',
          t('Languages', 'ភាសា'),
          t(
            'Python, JavaScript, Java… Many languages, same ideas.',
            'Python, JavaScript, Java… ភាសាច្រើន តែគំនិតដូចគ្នា។',
          ),
          'Python',
        ],
        [
          '🎯',
          t('Exact', 'ច្បាស់លាស់'),
          t(
            'A computer does EXACTLY what the code says — nothing more.',
            'កុំព្យូទ័រធ្វើតាមកូដយ៉ាងពិតប្រាកដ — មិនលើសនេះទេ។',
          ),
          'exact',
        ],
      ],
      see: [
        'print("Hello, Cambodia!")\n→ Hello, Cambodia!',
        t(
          'print shows text on the screen. This is a whole Python program!',
          'print បង្ហាញអត្ថបទលើអេក្រង់។ នេះជាកម្មវិធី Python ពេញលេញមួយ!',
        ),
      ],
      words: [
        ['code', 'កូដ', '📜'],
        ['program', 'កម្មវិធី'],
        ['language', 'ភាសា'],
        ['run', 'ដំណើរការ', '▶️'],
      ],
      play: [
        mc(
          t('What is code?', 'តើកូដជាអ្វី?'),
          t('Instructions for a computer', 'សេចក្តីណែនាំសម្រាប់កុំព្យូទ័រ'),
          [t('A secret password', 'ពាក្យសម្ងាត់'), t('A kind of cable', 'ប្រភេទខ្សែ')],
        ),
        mc(t('Who writes code?', 'តើអ្នកណាសរសេរកូដ?'), t('A programmer', 'អ្នកសរសេរកម្មវិធី'), [
          t('The mouse', 'កណ្តុរ'),
          t('The printer', 'ម៉ាស៊ីនបោះពុម្ព'),
        ]),
        mc(
          t('What does this program show?', 'តើកម្មវិធីនេះបង្ហាញអ្វី?'),
          'Hi!',
          ['print("Hi!")', 'print', 'Nothing'],
          {
            ...py('print("Hi!")'),
            explanation: t(
              'print shows what is inside the quotes.',
              'print បង្ហាញអ្វីដែលនៅក្នុងសញ្ញាសម្រង់។',
            ),
          },
        ),
        tf(
          t(
            'A computer can guess what you meant if your code has a mistake.',
            'កុំព្យូទ័រអាចទាយថាអ្នកចង់មានន័យអ្វី ប្រសិនបើកូដមានកំហុស។',
          ),
          false,
          {
            explanation: t(
              'It only follows the exact instructions.',
              'វាធ្វើតាមសេចក្តីណែនាំយ៉ាងពិតប្រាកដប៉ុណ្ណោះ។',
            ),
          },
        ),
        mc(t('Which one is a programming language?', 'តើមួយណាជាភាសាសរសេរកម្មវិធី?'), 'Python', [
          'Facebook',
          'Wi-Fi',
          'Excel',
        ]),
        tf(
          t(
            'Apps on your phone were made with code.',
            'កម្មវិធីលើទូរស័ព្ទរបស់អ្នកត្រូវបានបង្កើតដោយកូដ។',
          ),
          true,
        ),
        mc(
          t('To run a program means…', 'ដំណើរការកម្មវិធីមានន័យថា…'),
          t('the computer follows its instructions', 'កុំព្យូទ័រធ្វើតាមសេចក្តីណែនាំរបស់វា'),
          [t('you delete it', 'អ្នកលុបវា'), t('you print it on paper', 'អ្នកបោះពុម្ពវាលើក្រដាស')],
        ),
        mc(t('What does this show?', 'តើនេះបង្ហាញអ្វី?'), '7', ['3 + 4', 'print(7)', 'Error'], {
          ...py('print(3 + 4)'),
          explanation: t(
            'Without quotes, Python calculates 3 + 4 first.',
            'គ្មានសញ្ញាសម្រង់ Python គណនា 3 + 4 មុន។',
          ),
        }),
      ],
      challenge: [
        mc(t('What does this show?', 'តើនេះបង្ហាញអ្វី?'), '3 + 4', ['7', '34', 'Error'], {
          ...py('print("3 + 4")'),
          explanation: t(
            'Inside quotes it is just text, so it is shown exactly.',
            'នៅក្នុងសញ្ញាសម្រង់ វាគ្រាន់តែជាអត្ថបទ ដូច្នេះបង្ហាញដូចដើម។',
          ),
        }),
        match(t('Match the word to its meaning.', 'ផ្គូផ្គងពាក្យជាមួយអត្ថន័យ។'), [
          [t('Program', 'កម្មវិធី'), t('A set of instructions', 'សំណុំសេចក្តីណែនាំ')],
          [t('Programmer', 'អ្នកសរសេរកម្មវិធី'), t('Writes code', 'សរសេរកូដ')],
          [t('Run', 'ដំណើរការ'), t('Make the code work', 'ធ្វើឱ្យកូដដំណើរការ')],
          ['print', t('Shows text', 'បង្ហាញអត្ថបទ')],
        ]),
        sortInto(
          t('Made with code or not?', 'បង្កើតដោយកូដ ឬមិនមែន?'),
          [
            ['c', t('Made with code', 'បង្កើតដោយកូដ'), '💻'],
            ['n', t('Not code', 'មិនមែនកូដ'), '🌳'],
          ],
          [
            [t('Mobile game', 'ហ្គេមទូរស័ព្ទ'), 'c'],
            [t('Website', 'វេបសាយ'), 'c'],
            [t('Calculator app', 'កម្មវិធីគណនា'), 'c'],
            [t('A tree', 'ដើមឈើ'), 'n'],
            [t('A pencil', 'ខ្មៅដៃ'), 'n'],
            [t('Rice field', 'វាលស្រែ'), 'n'],
          ],
        ),
        typeIt(t('Type what this program shows.', 'វាយអ្វីដែលកម្មវិធីនេះបង្ហាញ។'), 'Hello', {
          ...py('print("Hello")'),
        }),
        num(t('What number does this show?', 'តើនេះបង្ហាញលេខប៉ុន្មាន?'), 20, {
          ...py('print(10 + 10)'),
        }),
        tf(
          t(
            'print("5") and print(5) both show 5 on the screen.',
            'print("5") និង print(5) ទាំងពីរបង្ហាញ 5 លើអេក្រង់។',
          ),
          true,
          {
            explanation: t(
              'One is text, one is a number, but both look like 5.',
              'មួយជាអត្ថបទ មួយជាលេខ តែទាំងពីរមើលទៅដូច 5។',
            ),
          },
        ),
        mc(
          t('Which line has a mistake?', 'តើបន្ទាត់ណាមានកំហុស?'),
          'print("Hi"',
          ['print("Hi")', 'print(2 + 2)', 'print("2 + 2")'],
          { explanation: t('The closing bracket ) is missing.', 'វង់ក្រចកបិទ ) បាត់។') },
        ),
        order(t('Put the steps of making a program in order.', 'តម្រៀបជំហាននៃការបង្កើតកម្មវិធី។'), [
          t('Think what it should do', 'គិតថាវាគួរធ្វើអ្វី'),
          t('Write the code', 'សរសេរកូដ'),
          t('Run it', 'ដំណើរការវា'),
          t('Fix any mistakes', 'កែកំហុស'),
        ]),
      ],
      games: [
        catchIt(
          t('Catch the programming languages!', 'ចាប់ភាសាសរសេរកម្មវិធី!'),
          ['Python', 'JavaScript', 'Java', 'C++'],
          ['Excel', 'Wi-Fi', 'Google', 'YouTube'],
        ),
        memory(
          t('Match each program to what it shows.', 'ផ្គូផ្គងកម្មវិធីនីមួយៗជាមួយអ្វីដែលវាបង្ហាញ។'),
          [
            ['print(2 + 3)', '5'],
            ['print("2 + 3")', '2 + 3'],
            ['print(10 - 4)', '6'],
            ['print("Hi")', 'Hi'],
          ],
        ),
      ],
      reward: t(
        'You read your first programs! 💡 Every programmer started exactly here.',
        'អ្នកបានអានកម្មវិធីដំបូង! 💡 អ្នកសរសេរកម្មវិធីគ្រប់រូបបានចាប់ផ្តើមនៅទីនេះ។',
      ),
    },
  ),

  // 2 ─────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'algorithms-everywhere',
    '🍳',
    t('Algorithms Everywhere', 'ក្បួនដោះស្រាយនៅគ្រប់ទីកន្លែង'),
    t('Step-by-step recipes for solving problems.', 'រូបមន្តជំហានៗសម្រាប់ដោះស្រាយបញ្ហា។'),
    {
      intro: [
        '🍳',
        t(
          'Cooking rice, going to school, brushing teeth — these are all algorithms!',
          'ដាំបាយ ទៅសាលា ដុសធ្មេញ — ទាំងនេះជាក្បួនដោះស្រាយទាំងអស់!',
        ),
      ],
      learn: [
        [
          '📋',
          t('Algorithm', 'ក្បួនដោះស្រាយ'),
          t(
            'A list of clear steps that solves a problem.',
            'បញ្ជីជំហានច្បាស់លាស់ដែលដោះស្រាយបញ្ហា។',
          ),
          'algorithm',
        ],
        [
          '🔢',
          t('Order matters', 'លំដាប់សំខាន់'),
          t('Wearing shoes before socks does not work!', 'ពាក់ស្បែកជើងមុនស្រោមជើងមិនដំណើរការទេ!'),
        ],
        [
          '🔍',
          t('Clear steps', 'ជំហានច្បាស់'),
          t('Each step must be simple and exact.', 'ជំហាននីមួយៗត្រូវតែសាមញ្ញ និងច្បាស់លាស់។'),
        ],
      ],
      see: [
        t(
          '1. Wash the rice\n2. Add water\n3. Turn on the cooker\n4. Wait 20 minutes',
          '1. លាងអង្ករ\n2. ចាក់ទឹក\n3. បើកឆ្នាំងបាយ\n4. រង់ចាំ 20 នាទី',
        ),
        t(
          'An algorithm for cooking rice: clear steps in the right order.',
          'ក្បួនដោះស្រាយសម្រាប់ដាំបាយ៖ ជំហានច្បាស់តាមលំដាប់ត្រឹមត្រូវ។',
        ),
      ],
      words: [
        ['algorithm', 'ក្បួនដោះស្រាយ', '📋'],
        ['step', 'ជំហាន', '👣'],
        ['order', 'លំដាប់'],
        ['problem', 'បញ្ហា', '❓'],
      ],
      play: [
        mc(
          t('What is an algorithm?', 'តើក្បួនដោះស្រាយជាអ្វី?'),
          t('Clear steps to solve a problem', 'ជំហានច្បាស់ដើម្បីដោះស្រាយបញ្ហា'),
          [t('A type of computer', 'ប្រភេទកុំព្យូទ័រ'), t('A music app', 'កម្មវិធីតន្ត្រី')],
        ),
        order(t('Put brushing your teeth in order.', 'តម្រៀបការដុសធ្មេញ។'), [
          t('Take the toothbrush', 'យកច្រាសដុសធ្មេញ'),
          t('Put on toothpaste', 'ដាក់ថ្នាំដុសធ្មេញ'),
          t('Brush for 2 minutes', 'ដុសរយៈពេល 2 នាទី'),
          t('Rinse your mouth', 'ខ្ពុរមាត់'),
        ]),
        tf(
          t(
            'In an algorithm, the order of the steps does not matter.',
            'ក្នុងក្បួនដោះស្រាយ លំដាប់ជំហានមិនសំខាន់ទេ។',
          ),
          false,
          { explanation: t('Wrong order = wrong result.', 'លំដាប់ខុស = លទ្ធផលខុស។') },
        ),
        mc(
          t(
            'Which step is NOT clear enough for a robot?',
            'តើជំហានណាមិនច្បាស់គ្រប់គ្រាន់សម្រាប់រ៉ូបូត?',
          ),
          t('Make it nice', 'ធ្វើឱ្យវាស្អាត'),
          [
            t('Move 3 steps forward', 'ដើរទៅមុខ 3 ជំហាន'),
            t('Turn left', 'បត់ឆ្វេង'),
            t('Pick up the cup', 'លើកពែង'),
          ],
          {
            explanation: t(
              '“Nice” means different things to different people.',
              '«ស្អាត» មានន័យខុសៗគ្នាសម្រាប់មនុស្សផ្សេងគ្នា។',
            ),
          },
        ),
        order(
          t(
            'Algorithm for sending a message on your phone.',
            'ក្បួនដោះស្រាយសម្រាប់ផ្ញើសារលើទូរស័ព្ទ។',
          ),
          [
            t('Open the chat app', 'បើកកម្មវិធីជជែក'),
            t('Choose the friend', 'ជ្រើសមិត្ត'),
            t('Type the message', 'វាយសារ'),
            t('Tap Send', 'ចុចផ្ញើ'),
          ],
        ),
        tf(
          t(
            'Google Maps uses an algorithm to find the fastest way.',
            'Google Maps ប្រើក្បួនដោះស្រាយដើម្បីរកផ្លូវលឿនបំផុត។',
          ),
          true,
        ),
        mc(
          t('What comes first when crossing the road?', 'តើអ្វីមកមុនពេលឆ្លងផ្លូវ?'),
          t('Look left and right', 'មើលឆ្វេង និងស្តាំ'),
          [t('Walk fast', 'ដើរលឿន'), t('Reach the other side', 'ទៅដល់ម្ខាងទៀត')],
        ),
        mc(
          t('A good algorithm always…', 'ក្បួនដោះស្រាយល្អតែងតែ…'),
          t('ends with the problem solved', 'បញ្ចប់ដោយបញ្ហាត្រូវបានដោះស្រាយ'),
          [t('goes on forever', 'បន្តជារៀងរហូត'), t('skips steps', 'រំលងជំហាន')],
        ),
      ],
      challenge: [
        order(t('Algorithm: make a cup of tea.', 'ក្បួនដោះស្រាយ៖ ធ្វើតែមួយពែង។'), [
          t('Boil water', 'ដាំទឹក'),
          t('Put a tea bag in the cup', 'ដាក់កញ្ចប់តែក្នុងពែង'),
          t('Pour the hot water', 'ចាក់ទឹកក្តៅ'),
          t('Wait 3 minutes', 'រង់ចាំ 3 នាទី'),
          t('Remove the tea bag', 'យកកញ្ចប់តែចេញ'),
        ]),
        mc(
          t(
            'Which algorithm finds the biggest number in 4, 9, 2?',
            'តើក្បួនដោះស្រាយណារកលេខធំបំផុតក្នុង 4, 9, 2?',
          ),
          t('Compare each number and keep the bigger one', 'ប្រៀបធៀបលេខនីមួយៗ ហើយរក្សាលេខធំជាង'),
          [t('Pick the first number', 'យកលេខដំបូង'), t('Pick the last number', 'យកលេខចុងក្រោយ')],
        ),
        num(
          t(
            'Algorithm: start at 2, add 3, then double it. What is the result?',
            'ក្បួនដោះស្រាយ៖ ចាប់ផ្តើមពី 2 បូក 3 រួចគុណពីរ។ តើលទ្ធផលប៉ុន្មាន?',
          ),
          10,
          { explanation: t('2 + 3 = 5, then 5 × 2 = 10.', '2 + 3 = 5 រួច 5 × 2 = 10។') },
        ),
        num(
          t(
            'Algorithm: start at 10, take away 4, then add 1. Result?',
            'ក្បួនដោះស្រាយ៖ ចាប់ផ្តើមពី 10 ដក 4 រួចបូក 1។ លទ្ធផល?',
          ),
          7,
        ),
        tf(
          t(
            '“Repeat until the bottle is full” is a clear step.',
            '«ធ្វើម្តងទៀតរហូតដល់ដបពេញ» ជាជំហានច្បាស់លាស់។',
          ),
          true,
        ),
        mc(
          t(
            'Which is the bug in this algorithm? 1. Put on shoes 2. Put on socks',
            'តើកំហុសក្នុងក្បួនដោះស្រាយនេះគឺអ្វី? 1. ពាក់ស្បែកជើង 2. ពាក់ស្រោមជើង',
          ),
          t('The steps are in the wrong order', 'ជំហាននៅលំដាប់ខុស'),
          [
            t('There are too many steps', 'មានជំហានច្រើនពេក'),
            t('Nothing is wrong', 'គ្មានអ្វីខុសទេ'),
          ],
        ),
        match(
          t('Match the problem to its algorithm idea.', 'ផ្គូផ្គងបញ្ហាជាមួយគំនិតក្បួនដោះស្រាយ។'),
          [
            [
              t('Find a word in a dictionary', 'រកពាក្យក្នុងវចនានុក្រម'),
              t('Open near its first letter', 'បើកជិតអក្សរដំបូងរបស់វា'),
            ],
            [
              t('Sort test papers', 'តម្រៀបក្រដាសប្រឡង'),
              t('Put them in name order', 'ដាក់តាមលំដាប់ឈ្មោះ'),
            ],
            [
              t('Go to school', 'ទៅសាលា'),
              t('Follow the road step by step', 'ដើរតាមផ្លូវមួយជំហានម្តងៗ'),
            ],
          ],
        ),
        buildSentence(
          t('Build the definition.', 'បង្កើតនិយមន័យ។'),
          'An algorithm is a list of steps.',
          { say: 'An algorithm is a list of steps.' },
        ),
      ],
      games: [
        robot(
          t(
            'Follow the algorithm: get the robot to the rice cooker 🍚.',
            'ធ្វើតាមក្បួនដោះស្រាយ៖ នាំរ៉ូបូតទៅឆ្នាំងបាយ 🍚។',
          ),
          ['S..#', '#..#', '#...', '##.G'],
          { goalIcon: '🍚' },
        ),
        catchIt(
          t('Catch the CLEAR instructions!', 'ចាប់សេចក្តីណែនាំដែលច្បាស់!'),
          [
            t('Turn left', 'បត់ឆ្វេង'),
            t('Walk 5 steps', 'ដើរ 5 ជំហាន'),
            t('Add 2 cups of water', 'ចាក់ទឹក 2 ពែង'),
          ],
          [
            t('Do it nicely', 'ធ្វើឱ្យល្អ'),
            t('Go somewhere', 'ទៅកន្លែងណាមួយ'),
            t('Add some', 'បន្ថែមខ្លះ'),
          ],
          { speed: 'slow' },
        ),
      ],
      reward: t(
        'You think in algorithms now! 🍳 That is the heart of coding.',
        'ឥឡូវអ្នកគិតជាក្បួនដោះស្រាយ! 🍳 នោះជាបេះដូងនៃការសរសេរកូដ។',
      ),
    },
  ),

  // 3 ─────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'sequences',
    '➡️',
    t('Sequences: One Step at a Time', 'លំដាប់៖ មួយជំហានម្តងៗ'),
    t('Code runs from top to bottom.', 'កូដដំណើរការពីលើចុះក្រោម។'),
    {
      intro: [
        '➡️',
        t(
          'A computer reads code like you read a book: line 1, then line 2, then line 3…',
          'កុំព្យូទ័រអានកូដដូចអ្នកអានសៀវភៅ៖ បន្ទាត់ទី 1 បន្ទាប់មកបន្ទាត់ទី 2 ទី 3…',
        ),
      ],
      learn: [
        [
          '⬇️',
          t('Top to bottom', 'ពីលើចុះក្រោម'),
          t('Each line runs after the line above it.', 'បន្ទាត់នីមួយៗដំណើរការក្រោយបន្ទាត់ខាងលើ។'),
          'sequence',
        ],
        [
          '🔀',
          t('Change the order, change the result', 'ប្តូរលំដាប់ ប្តូរលទ្ធផល'),
          t(
            'Swapping two lines can change what happens.',
            'ការប្តូរបន្ទាត់ពីរអាចប្តូរអ្វីដែលកើតឡើង។',
          ),
        ],
        [
          '🤖',
          t('Robots too', 'រ៉ូបូតក៏ដូច្នេះ'),
          t('A robot moves one command at a time.', 'រ៉ូបូតធ្វើចលនាមួយពាក្យបញ្ជាម្តង។'),
        ],
      ],
      see: [
        'print("Good")\nprint("morning")\n→ Good\n→ morning',
        t('Two lines, two results, in the same order.', 'បន្ទាត់ពីរ លទ្ធផលពីរ តាមលំដាប់ដដែល។'),
      ],
      words: [
        ['sequence', 'លំដាប់'],
        ['line', 'បន្ទាត់'],
        ['command', 'ពាក្យបញ្ជា'],
        ['result', 'លទ្ធផល'],
      ],
      play: [
        mc(
          t('What is shown FIRST?', 'តើអ្វីត្រូវបានបង្ហាញមុនគេ?'),
          'A',
          ['B', 'C', t('All at once', 'ទាំងអស់ក្នុងពេលតែមួយ')],
          py('print("A")\nprint("B")\nprint("C")'),
        ),
        mc(
          t('What is shown LAST?', 'តើអ្វីត្រូវបានបង្ហាញចុងក្រោយ?'),
          'C',
          ['A', 'B'],
          py('print("A")\nprint("B")\nprint("C")'),
        ),
        tf(
          t(
            'A computer runs all lines of code at the same moment.',
            'កុំព្យូទ័រដំណើរការបន្ទាត់កូដទាំងអស់ក្នុងពេលតែមួយ។',
          ),
          false,
        ),
        order(t('Put the code in order to show: 1, 2, 3', 'តម្រៀបកូដដើម្បីបង្ហាញ៖ 1, 2, 3'), [
          'print(1)',
          'print(2)',
          'print(3)',
        ]),
        mc(
          t('How many lines does this program show?', 'តើកម្មវិធីនេះបង្ហាញប៉ុន្មានបន្ទាត់?'),
          '3',
          ['1', '2', '6'],
          py('print("Hi")\nprint("Hi")\nprint("Bye")'),
        ),
        order(
          t(
            'Robot: put the commands in order to walk to the door then open it.',
            'រ៉ូបូត៖ តម្រៀបពាក្យបញ្ជាដើម្បីដើរទៅទ្វារ រួចបើកវា។',
          ),
          [
            t('Stand up', 'ក្រោកឈរ'),
            t('Walk to the door', 'ដើរទៅទ្វារ'),
            t('Open the door', 'បើកទ្វារ'),
          ],
        ),
        tf(
          t(
            'Swapping two lines of code can change the result.',
            'ការប្តូរបន្ទាត់កូដពីរអាចប្តូរលទ្ធផល។',
          ),
          true,
        ),
        mc(
          t('What is the SECOND line shown?', 'តើបន្ទាត់ទីពីរដែលបង្ហាញគឺអ្វី?'),
          'is',
          ['Coding', 'fun', 'Coding is fun'],
          py('print("Coding")\nprint("is")\nprint("fun")'),
        ),
      ],
      challenge: [
        order(
          t(
            'Order the code to show a greeting: Hello / my name / is Dara',
            'តម្រៀបកូដដើម្បីបង្ហាញការស្វាគមន៍៖ Hello / my name / is Dara',
          ),
          ['print("Hello")', 'print("my name")', 'print("is Dara")'],
        ),
        num(
          t('How many times is “Yes” shown?', 'តើ «Yes» បង្ហាញប៉ុន្មានដង?'),
          2,
          py('print("Yes")\nprint("No")\nprint("Yes")'),
        ),
        mc(
          t('Which program shows 3 then 1?', 'តើកម្មវិធីណាបង្ហាញ 3 រួច 1?'),
          'print(3) then print(1)',
          ['print(1) then print(3)', 'print(31)', 'print(3 + 1)'],
        ),
        tf(t('This shows 5 first and then 10.', 'នេះបង្ហាញ 5 មុន រួច 10។'), false, {
          ...py('print(10)\nprint(5)'),
          explanation: t('Top to bottom: 10 first.', 'ពីលើចុះក្រោម៖ 10 មុន។'),
        }),
        typeIt(
          t('Type the last line this program shows.', 'វាយបន្ទាត់ចុងក្រោយដែលកម្មវិធីនេះបង្ហាញ។'),
          'Done',
          py('print("Start")\nprint("Working")\nprint("Done")'),
        ),
        mc(
          t(
            'The robot must: pick up the ball, then throw it. Which order is right?',
            'រ៉ូបូតត្រូវ៖ រើសបាល់ រួចបោះវា។ តើលំដាប់ណាត្រឹមត្រូវ?',
          ),
          t('pick up → throw', 'រើស → បោះ'),
          [t('throw → pick up', 'បោះ → រើស'), t('throw → throw', 'បោះ → បោះ')],
        ),
        num(
          t('What number is shown last?', 'តើលេខអ្វីបង្ហាញចុងក្រោយ?'),
          9,
          py('print(2 + 2)\nprint(4 + 5)'),
        ),
        order(t('Order the morning sequence.', 'តម្រៀបលំដាប់ពេលព្រឹក។'), [
          t('Wake up', 'ក្រោកពីគេង'),
          t('Wash your face', 'លាងមុខ'),
          t('Eat breakfast', 'ញ៉ាំអាហារពេលព្រឹក'),
          t('Go to school', 'ទៅសាលា'),
        ]),
      ],
      games: [
        robot(
          t(
            'Program the robot, one command at a time, to the flag.',
            'សរសេរកម្មវិធីរ៉ូបូត មួយពាក្យបញ្ជាម្តងៗ ទៅទង់។',
          ),
          ['S.#.', '..#.', '#...', '##.G'],
        ),
        memory(
          t(
            'Match each program to what it shows first.',
            'ផ្គូផ្គងកម្មវិធីនីមួយៗជាមួយអ្វីដែលវាបង្ហាញមុន។',
          ),
          [
            ['print("A") / print("B")', 'A'],
            ['print("B") / print("A")', 'B'],
            ['print(1 + 1) / print(5)', '2'],
            ['print(5) / print(1 + 1)', '5'],
          ],
        ),
      ],
      reward: t(
        'Top to bottom, step by step — you can follow code like a computer! ➡️',
        'ពីលើចុះក្រោម មួយជំហានម្តងៗ — អ្នកអាចធ្វើតាមកូដដូចកុំព្យូទ័រ! ➡️',
      ),
    },
  ),

  // 4 ─────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'variables',
    '📦',
    t('Variables: Boxes for Data', 'អថេរ៖ ប្រអប់សម្រាប់ទិន្នន័យ'),
    t('Give a value a name and use it again.', 'ដាក់ឈ្មោះឱ្យតម្លៃ ហើយប្រើវាម្តងទៀត។'),
    {
      intro: [
        '📦',
        t(
          'Games remember your score, apps remember your name. They use variables!',
          'ហ្គេមចងចាំពិន្ទុរបស់អ្នក កម្មវិធីចងចាំឈ្មោះអ្នក។ ពួកវាប្រើអថេរ!',
        ),
      ],
      learn: [
        [
          '📦',
          t('Variable', 'អថេរ'),
          t(
            'A named box that holds a value: score = 10',
            'ប្រអប់មានឈ្មោះដែលផ្ទុកតម្លៃ៖ score = 10',
          ),
          'variable',
        ],
        [
          '🟰',
          t('= means “put into”', '= មានន័យថា «ដាក់ចូល»'),
          t(
            'name = "Dara" puts "Dara" into the box called name.',
            'name = "Dara" ដាក់ "Dara" ចូលប្រអប់ឈ្មោះ name។',
          ),
        ],
        [
          '🔄',
          t('Change it', 'ប្តូរវា'),
          t(
            'score = score + 1 makes the score one bigger.',
            'score = score + 1 ធ្វើឱ្យពិន្ទុធំឡើងមួយ។',
          ),
        ],
        [
          '🏷️',
          t('Good names', 'ឈ្មោះល្អ'),
          t('Use names that explain: age, price, total.', 'ប្រើឈ្មោះដែលពន្យល់៖ age, price, total។'),
        ],
      ],
      see: [
        'age = 13\nprint(age)\n→ 13',
        t(
          'The box “age” holds 13. print(age) shows what is inside.',
          'ប្រអប់ «age» ផ្ទុក 13។ print(age) បង្ហាញអ្វីនៅខាងក្នុង។',
        ),
      ],
      words: [
        ['variable', 'អថេរ', '📦'],
        ['value', 'តម្លៃ'],
        ['name', 'ឈ្មោះ', '🏷️'],
        ['store', 'រក្សាទុក'],
      ],
      play: [
        mc(
          t('What is a variable?', 'តើអថេរជាអ្វី?'),
          t('A named box that holds a value', 'ប្រអប់មានឈ្មោះដែលផ្ទុកតម្លៃ'),
          [t('A kind of keyboard', 'ប្រភេទក្តារចុច'), t('A mistake in code', 'កំហុសក្នុងកូដ')],
        ),
        num(t('What is shown?', 'តើអ្វីត្រូវបានបង្ហាញ?'), 5, py('x = 5\nprint(x)')),
        mc(
          t('What is shown?', 'តើអ្វីត្រូវបានបង្ហាញ?'),
          'Sokha',
          ['name', '"name"', 'Error'],
          py('name = "Sokha"\nprint(name)'),
        ),
        num(t('What is shown?', 'តើអ្វីត្រូវបានបង្ហាញ?'), 15, py('a = 10\nb = 5\nprint(a + b)')),
        tf(
          t(
            'In code, = means “put the value into the box”.',
            'ក្នុងកូដ = មានន័យថា «ដាក់តម្លៃចូលប្រអប់»។',
          ),
          true,
        ),
        num(t('What is the score now?', 'តើពិន្ទុឥឡូវប៉ុន្មាន?'), 11, {
          ...py('score = 10\nscore = score + 1\nprint(score)'),
          explanation: t(
            'score + 1 = 11, then that is stored back in score.',
            'score + 1 = 11 រួចរក្សាទុកក្នុង score ម្តងទៀត។',
          ),
        }),
        mc(
          t('Which is the best variable name for a price?', 'តើឈ្មោះអថេរណាល្អបំផុតសម្រាប់តម្លៃ?'),
          'price',
          ['x', 'thing', 'aaa'],
        ),
        num(
          t(
            'A box can hold one value. What is shown?',
            'ប្រអប់មួយអាចផ្ទុកតម្លៃមួយ។ តើអ្វីត្រូវបានបង្ហាញ?',
          ),
          8,
          {
            ...py('n = 3\nn = 8\nprint(n)'),
            explanation: t('The new value replaces the old one.', 'តម្លៃថ្មីជំនួសតម្លៃចាស់។'),
          },
        ),
      ],
      challenge: [
        num(
          t('What is shown?', 'តើអ្វីត្រូវបានបង្ហាញ?'),
          12,
          py('price = 4\nqty = 3\nprint(price * qty)'),
        ),
        num(
          t('What is shown?', 'តើអ្វីត្រូវបានបង្ហាញ?'),
          7,
          py('lives = 9\nlives = lives - 2\nprint(lives)'),
        ),
        mc(
          t('What is shown?', 'តើអ្វីត្រូវបានបង្ហាញ?'),
          'Hello Dara',
          ['Hello name', 'name', 'Error'],
          py('name = "Dara"\nprint("Hello " + name)'),
        ),
        tf(t('This program shows 20.', 'កម្មវិធីនេះបង្ហាញ 20។'), false, {
          ...py('x = 10\ny = x\nx = 20\nprint(y)'),
          explanation: t(
            'y got 10 earlier; changing x later does not change y.',
            'y ទទួលបាន 10 មុននេះ ការប្តូរ x ក្រោយមិនប្តូរ y ទេ។',
          ),
        }),
        match(t('Match the code to what it does.', 'ផ្គូផ្គងកូដជាមួយអ្វីដែលវាធ្វើ។'), [
          ['age = 13', t('Store 13 in age', 'រក្សាទុក 13 ក្នុង age')],
          ['print(age)', t('Show the value of age', 'បង្ហាញតម្លៃ age')],
          ['age = age + 1', t('Make age one bigger', 'ធ្វើឱ្យ age ធំឡើងមួយ')],
        ]),
        num(
          t('What is the total?', 'តើសរុបប៉ុន្មាន?'),
          6,
          py('total = 0\ntotal = total + 1\ntotal = total + 2\ntotal = total + 3\nprint(total)'),
        ),
        typeIt(
          t('Type the variable NAME in this code.', 'វាយឈ្មោះអថេរក្នុងកូដនេះ។'),
          'city',
          py('city = "Phnom Penh"'),
        ),
        mc(
          t(
            'Which line creates a variable called points holding 50?',
            'តើបន្ទាត់ណាបង្កើតអថេរ points ផ្ទុក 50?',
          ),
          'points = 50',
          ['50 = points', 'print(points)', 'points + 50'],
        ),
      ],
      games: [
        memory(t('Match the code to the value shown.', 'ផ្គូផ្គងកូដជាមួយតម្លៃដែលបង្ហាញ។'), [
          ['x = 2 → print(x * 5)', '10'],
          ['x = 9 → print(x - 3)', '6'],
          ['x = 4 → print(x + x)', '8'],
          ['x = 1 → print(x)', '1'],
        ]),
        catchIt(
          t('Catch the GOOD variable names!', 'ចាប់ឈ្មោះអថេរល្អ!'),
          ['score', 'age', 'total_price', 'student_name'],
          ['x1', 'aaa', 'stuff', 'zzz'],
        ),
      ],
      reward: t(
        'You can store and change data! 📦 Every game score works like this.',
        'អ្នកអាចរក្សាទុក និងប្តូរទិន្នន័យ! 📦 ពិន្ទុហ្គេមគ្រប់យ៉ាងដំណើរការបែបនេះ។',
      ),
    },
  ),

  // 5 ─────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'data-types',
    '🔤',
    t('Numbers, Text & True/False', 'លេខ អត្ថបទ និងពិត/មិនពិត'),
    t('Different kinds of data: int, str, bool.', 'ប្រភេទទិន្នន័យផ្សេងៗ៖ int, str, bool។'),
    {
      intro: [
        '🔤',
        t(
          'Your age is a number, your name is text, “is it raining?” is yes or no. Code knows the difference!',
          'អាយុជាលេខ ឈ្មោះជាអត្ថបទ «តើភ្លៀងទេ?» គឺបាទ ឬទេ។ កូដស្គាល់ភាពខុសគ្នា!',
        ),
      ],
      learn: [
        [
          '🔢',
          t('Numbers (int)', 'លេខ (int)'),
          t('Whole numbers you can calculate with: 7, 100, -3', 'លេខគត់ដែលអាចគណនាបាន៖ 7, 100, -3'),
          'integer',
        ],
        [
          '🔤',
          t('Text (str)', 'អត្ថបទ (str)'),
          t(
            'Letters inside quotes: "Hello", "Dara", "123"',
            'អក្សរក្នុងសញ្ញាសម្រង់៖ "Hello", "Dara", "123"',
          ),
          'string',
        ],
        [
          '✅',
          t('True / False (bool)', 'ពិត/មិនពិត (bool)'),
          t('Only two values: True or False', 'មានតែពីរតម្លៃ៖ True ឬ False'),
          'boolean',
        ],
        [
          '➕',
          t('Text + text', 'អត្ថបទ + អត្ថបទ'),
          t('"ice" + "cream" joins them: "icecream"', '"ice" + "cream" ភ្ជាប់គ្នា៖ "icecream"'),
        ],
      ],
      see: [
        'print(2 + 2)   → 4\nprint("2" + "2") → 22',
        t('Numbers add up; text joins together.', 'លេខបូកគ្នា អត្ថបទភ្ជាប់គ្នា។'),
      ],
      words: [
        ['number', 'លេខ', '🔢'],
        ['text', 'អត្ថបទ', '🔤'],
        ['true', 'ពិត', '✅'],
        ['false', 'មិនពិត', '❌'],
      ],
      play: [
        mc(t('What kind of data is 42?', 'តើ 42 ជាទិន្នន័យប្រភេទអ្វី?'), t('Number', 'លេខ'), [
          t('Text', 'អត្ថបទ'),
          t('True/False', 'ពិត/មិនពិត'),
        ]),
        mc(
          t('What kind of data is "Phnom Penh"?', 'តើ "Phnom Penh" ជាទិន្នន័យប្រភេទអ្វី?'),
          t('Text', 'អត្ថបទ'),
          [t('Number', 'លេខ'), t('True/False', 'ពិត/មិនពិត')],
        ),
        mc(
          t('What kind of data is True?', 'តើ True ជាទិន្នន័យប្រភេទអ្វី?'),
          t('True/False (bool)', 'ពិត/មិនពិត (bool)'),
          [t('Text', 'អត្ថបទ'), t('Number', 'លេខ')],
        ),
        mc(t('What is shown?', 'តើអ្វីត្រូវបានបង្ហាញ?'), '22', ['4', '2 + 2', 'Error'], {
          ...py('print("2" + "2")'),
          explanation: t('Text joins: "2" next to "2".', 'អត្ថបទភ្ជាប់គ្នា៖ "2" ជាប់ "2"។'),
        }),
        num(t('What is shown?', 'តើអ្វីត្រូវបានបង្ហាញ?'), 4, py('print(2 + 2)')),
        mc(
          t('What is shown?', 'តើអ្វីត្រូវបានបង្ហាញ?'),
          'icecream',
          ['ice cream', 'ice + cream', 'Error'],
          py('print("ice" + "cream")'),
        ),
        tf(
          t(
            '"123" (with quotes) is text, not a number.',
            '"123" (មានសញ្ញាសម្រង់) គឺជាអត្ថបទ មិនមែនលេខ។',
          ),
          true,
        ),
        sortInto(
          t('Number or text?', 'លេខ ឬអត្ថបទ?'),
          [
            ['n', t('Number', 'លេខ'), '🔢'],
            ['t', t('Text', 'អត្ថបទ'), '🔤'],
          ],
          [
            ['7', 'n'],
            ['3.5', 'n'],
            ['-10', 'n'],
            ['"7"', 't'],
            ['"cat"', 't'],
            ['"Hello"', 't'],
          ],
        ),
      ],
      challenge: [
        mc(t('What is shown?', 'តើអ្វីត្រូវបានបង្ហាញ?'), 'Hi Hi Hi ', ['Hi', '3Hi', 'Error'], {
          ...py('print("Hi " * 3)'),
          explanation: t('Text × 3 repeats it three times.', 'អត្ថបទ × 3 ធ្វើវាម្តងទៀតបីដង។'),
        }),
        tf(t('5 > 3 gives True.', '5 > 3 ផ្តល់ True។'), true, py('print(5 > 3)')),
        tf(t('2 == 3 gives True.', '2 == 3 ផ្តល់ True។'), false, {
          ...py('print(2 == 3)'),
          explanation: t(
            '== asks “are they equal?” — they are not.',
            '== សួរថា «តើស្មើគ្នាទេ?» — មិនស្មើទេ។',
          ),
        }),
        mc(
          t(
            'Which value fits “Is the lesson finished?”',
            'តើតម្លៃណាសមនឹង «តើមេរៀនបានបញ្ចប់ហើយឬនៅ?»',
          ),
          'True',
          ['"finished"', '42', '"maybe"'],
        ),
        mc(
          t(
            'Which is the best type for a phone number like 012 345 678?',
            'តើប្រភេទណាល្អបំផុតសម្រាប់លេខទូរស័ព្ទដូចជា 012 345 678?',
          ),
          t('Text (it is not used for maths)', 'អត្ថបទ (វាមិនប្រើសម្រាប់គណនាទេ)'),
          [t('True/False', 'ពិត/មិនពិត'), t('Number to add up', 'លេខសម្រាប់បូក')],
        ),
        num(t('What is shown?', 'តើអ្វីត្រូវបានបង្ហាញ?'), 30, py('a = 10\nb = 20\nprint(a + b)')),
        mc(
          t('What is shown?', 'តើអ្វីត្រូវបានបង្ហាញ?'),
          '1020',
          ['30', '10 20', 'Error'],
          py('a = "10"\nb = "20"\nprint(a + b)'),
        ),
        match(t('Match the value to its type.', 'ផ្គូផ្គងតម្លៃជាមួយប្រភេទ។'), [
          ['99', 'int'],
          ['"99"', 'str'],
          ['False', 'bool'],
        ]),
      ],
      games: [
        catchIt(
          t('Catch only the TEXT values (in quotes)!', 'ចាប់តែតម្លៃអត្ថបទ (ក្នុងសញ្ញាសម្រង់)!'),
          ['"cat"', '"5"', '"Hello"', '"True"'],
          ['5', 'True', '3.14', '100'],
        ),
        memory(
          t('Match each program to what it shows.', 'ផ្គូផ្គងកម្មវិធីនីមួយៗជាមួយអ្វីដែលវាបង្ហាញ។'),
          [
            ['print(1 + 2)', '3'],
            ['print("1" + "2")', '12'],
            ['print(3 > 1)', 'True'],
            ['print(1 > 3)', 'False'],
          ],
        ),
      ],
      reward: t(
        'Numbers, text, True and False — you speak the language of data! 🔤',
        'លេខ អត្ថបទ True និង False — អ្នកនិយាយភាសាទិន្នន័យ! 🔤',
      ),
    },
  ),

  // 6 ─────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'operators',
    '🧮',
    t('Maths and Comparisons in Code', 'គណិតវិទ្យា និងការប្រៀបធៀបក្នុងកូដ'),
    t('+ - * / and > < ==', '+ - * / និង > < =='),
    {
      intro: [
        '🧮',
        t(
          'Computers are super-fast calculators. Let’s learn the symbols they use!',
          'កុំព្យូទ័រជាម៉ាស៊ីនគិតលេខលឿនខ្លាំង។ តោះរៀននិមិត្តសញ្ញាដែលវាប្រើ!',
        ),
      ],
      learn: [
        [
          '✖️',
          t('* and /', '* និង /'),
          t('* multiplies, / divides: 3 * 4 = 12, 8 / 2 = 4', '* គុណ / ចែក៖ 3 * 4 = 12, 8 / 2 = 4'),
        ],
        [
          '⚖️',
          t('Compare', 'ប្រៀបធៀប'),
          t(
            '> bigger, < smaller, == equal. The answer is True or False.',
            '> ធំជាង < តូចជាង == ស្មើ។ ចម្លើយគឺ True ឬ False។',
          ),
          'compare',
        ],
        [
          '🔢',
          t('Order', 'លំដាប់'),
          t(
            'Like maths: * and / before + and -. Brackets first!',
            'ដូចគណិតវិទ្យា៖ * និង / មុន + និង -។ វង់ក្រចកមុនគេ!',
          ),
        ],
        [
          '➗',
          t('% remainder', '% សំណល់'),
          t('7 % 2 = 1 (what is left after dividing)', '7 % 2 = 1 (អ្វីដែលនៅសល់ក្រោយការចែក)'),
        ],
      ],
      see: [
        'print(2 + 3 * 4)   → 14\nprint((2 + 3) * 4) → 20',
        t('* happens first unless you use brackets.', '* កើតឡើងមុន លុះត្រាតែអ្នកប្រើវង់ក្រចក។'),
      ],
      words: [
        ['operator', 'សញ្ញាប្រមាណវិធី'],
        ['multiply', 'គុណ', '✖️'],
        ['divide', 'ចែក', '➗'],
        ['equal', 'ស្មើ', '🟰'],
      ],
      play: [
        num(t('What is shown?', 'តើអ្វីត្រូវបានបង្ហាញ?'), 12, py('print(3 * 4)')),
        num(t('What number is it?', 'តើជាលេខប៉ុន្មាន?'), 5, {
          ...py('print(10 / 2)'),
          explanation: t(
            '10 ÷ 2 = 5. Python shows it as 5.0: dividing always gives a decimal number.',
            '10 ÷ 2 = 5។ Python បង្ហាញវាជា 5.0៖ ការចែកតែងតែផ្តល់លេខទសភាគ។',
          ),
        }),
        num(t('What is shown?', 'តើអ្វីត្រូវបានបង្ហាញ?'), 14, {
          ...py('print(2 + 3 * 4)'),
          explanation: t('3 * 4 = 12 first, then + 2.', '3 * 4 = 12 មុន រួច + 2។'),
        }),
        num(t('What is shown?', 'តើអ្វីត្រូវបានបង្ហាញ?'), 20, py('print((2 + 3) * 4)')),
        tf(t('This shows True.', 'នេះបង្ហាញ True។'), true, py('print(10 > 7)')),
        tf(t('This shows True.', 'នេះបង្ហាញ True។'), false, py('print(4 == 5)')),
        mc(
          t('Which symbol means “multiply” in code?', 'តើនិមិត្តសញ្ញាណាមានន័យថា «គុណ» ក្នុងកូដ?'),
          '*',
          ['x', '+', '/'],
        ),
        num(t('What is the remainder: 7 % 2?', 'តើសំណល់ប៉ុន្មាន៖ 7 % 2?'), 1, {
          explanation: t('7 ÷ 2 = 3 rest 1.', '7 ÷ 2 = 3 សល់ 1។'),
        }),
      ],
      challenge: [
        num(t('What is shown?', 'តើអ្វីត្រូវបានបង្ហាញ?'), 6, py('print(20 - 2 * 7)')),
        num(t('What is shown?', 'តើអ្វីត្រូវបានបង្ហាញ?'), 0, {
          ...py('print(10 % 5)'),
          explanation: t('10 divides by 5 with nothing left.', '10 ចែកនឹង 5 គ្មានសល់។'),
        }),
        tf(t('This shows True.', 'នេះបង្ហាញ True។'), true, {
          ...py('age = 15\nprint(age >= 13)'),
          explanation: t('>= means bigger than OR equal to.', '>= មានន័យថា ធំជាង ឬស្មើ។'),
        }),
        num(
          t(
            'A notebook costs 1500 riel. What does this show?',
            'សៀវភៅមួយក្បាលថ្លៃ 1500 រៀល។ តើនេះបង្ហាញអ្វី?',
          ),
          4500,
          py('price = 1500\nprint(price * 3)'),
        ),
        mc(
          t('Is 8 even? Which line checks it?', 'តើ 8 ជាលេខគូទេ? តើបន្ទាត់ណាពិនិត្យវា?'),
          'print(8 % 2 == 0)',
          ['print(8 / 2)', 'print(8 + 2)', 'print(8 > 2)'],
          {
            explanation: t(
              'Even numbers have remainder 0 when divided by 2.',
              'លេខគូមានសំណល់ 0 ពេលចែកនឹង 2។',
            ),
          },
        ),
        match(t('Match the symbol to its meaning.', 'ផ្គូផ្គងនិមិត្តសញ្ញាជាមួយអត្ថន័យ។'), [
          ['==', t('is equal to', 'ស្មើនឹង')],
          ['!=', t('is not equal to', 'មិនស្មើនឹង')],
          ['>', t('is bigger than', 'ធំជាង')],
          ['<', t('is smaller than', 'តូចជាង')],
        ]),
        num(t('What is shown?', 'តើអ្វីត្រូវបានបង្ហាញ?'), 9, py('a = 3\nprint(a * a)')),
        tf(t('This shows True.', 'នេះបង្ហាញ True។'), true, py('print(3 != 4)')),
      ],
      games: [
        memory(t('Match the calculation to its answer.', 'ផ្គូផ្គងការគណនាជាមួយចម្លើយ។'), [
          ['6 * 7', '42'],
          ['20 / 4', '5'],
          ['2 + 3 * 2', '8'],
          ['9 % 4', '1'],
        ]),
        catchIt(
          t('Catch the comparisons that are TRUE!', 'ចាប់ការប្រៀបធៀបដែលពិត!'),
          ['5 > 2', '3 == 3', '10 != 9', '1 < 100'],
          ['2 > 5', '4 == 6', '7 < 1', '8 != 8'],
          { speed: 'slow' },
        ),
      ],
      reward: t(
        '+ - * / > < == — you can calculate and compare in code! 🧮',
        '+ - * / > < == — អ្នកអាចគណនា និងប្រៀបធៀបក្នុងកូដ! 🧮',
      ),
    },
  ),

  // 7 ─────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'if-else',
    '🔀',
    t('If / Else: Making Decisions', 'If / Else៖ ការសម្រេចចិត្ត'),
    t('Code that chooses what to do.', 'កូដដែលជ្រើសថាត្រូវធ្វើអ្វី។'),
    {
      intro: [
        '🔀',
        t(
          'IF you are hungry, THEN eat. ELSE, keep studying. Programs decide like this all the time!',
          'បើអ្នកឃ្លាន នោះញ៉ាំ។ បើមិនដូច្នោះ បន្តរៀន។ កម្មវិធីសម្រេចចិត្តបែបនេះគ្រប់ពេល!',
        ),
      ],
      learn: [
        [
          '❓',
          'if',
          t(
            'Runs the code below it only when the condition is True.',
            'ដំណើរការកូដខាងក្រោមវា លុះត្រាលក្ខខណ្ឌពិត។',
          ),
          'if',
        ],
        [
          '↪️',
          'else',
          t('Runs when the condition is False.', 'ដំណើរការពេលលក្ខខណ្ឌមិនពិត។'),
          'else',
        ],
        [
          '➡️',
          t('Indent', 'ចូលបន្ទាត់'),
          t(
            'The lines inside if/else start with spaces.',
            'បន្ទាត់ក្នុង if/else ចាប់ផ្តើមដោយដកឃ្លា។',
          ),
        ],
        ['🔁', 'elif', t('“Else if”: check another condition.', '«ឬបើ»៖ ពិនិត្យលក្ខខណ្ឌមួយទៀត។')],
      ],
      see: [
        'age = 15\nif age >= 13:\n    print("Welcome!")\nelse:\n    print("Too young")\n→ Welcome!',
        t(
          '15 >= 13 is True, so only the first message is shown.',
          '15 >= 13 គឺពិត ដូច្នេះមានតែសារទីមួយត្រូវបានបង្ហាញ។',
        ),
      ],
      words: [
        ['condition', 'លក្ខខណ្ឌ'],
        ['decision', 'ការសម្រេចចិត្ត'],
        ['else', 'បើមិនដូច្នោះ'],
        ['choose', 'ជ្រើសរើស'],
      ],
      play: [
        mc(
          t('What is shown?', 'តើអ្វីត្រូវបានបង្ហាញ?'),
          'Hot',
          ['Cold', 'Hot and Cold', t('Nothing', 'គ្មានអ្វីទេ')],
          py('temp = 35\nif temp > 30:\n    print("Hot")\nelse:\n    print("Cold")'),
        ),
        mc(
          t('What is shown?', 'តើអ្វីត្រូវបានបង្ហាញ?'),
          'Cold',
          ['Hot', 'Hot and Cold'],
          py('temp = 18\nif temp > 30:\n    print("Hot")\nelse:\n    print("Cold")'),
        ),
        tf(
          t(
            'The code inside “if” runs only when the condition is True.',
            'កូដក្នុង «if» ដំណើរការលុះត្រាលក្ខខណ្ឌពិត។',
          ),
          true,
        ),
        mc(
          t('What is shown?', 'តើអ្វីត្រូវបានបង្ហាញ?'),
          t('Nothing', 'គ្មានអ្វីទេ'),
          ['Pass', 'Fail'],
          {
            ...py('score = 40\nif score >= 50:\n    print("Pass")'),
            explanation: t(
              '40 >= 50 is False and there is no else.',
              '40 >= 50 មិនពិត ហើយគ្មាន else ទេ។',
            ),
          },
        ),
        mc(
          t('What is shown?', 'តើអ្វីត្រូវបានបង្ហាញ?'),
          t('Take an umbrella', 'យកឆ័ត្រ'),
          [t('Enjoy the sun', 'រីករាយនឹងថ្ងៃ'), t('Both', 'ទាំងពីរ')],
          py(
            'raining = True\nif raining:\n    print("Take an umbrella")\nelse:\n    print("Enjoy the sun")',
          ),
        ),
        mc(
          t(
            'Which word runs code when the condition is False?',
            'តើពាក្យណាដំណើរការកូដពេលលក្ខខណ្ឌមិនពិត?',
          ),
          'else',
          ['if', 'print', 'True'],
        ),
        mc(
          t(
            'Which condition checks “age is at least 18”?',
            'តើលក្ខខណ្ឌណាពិនិត្យ «អាយុយ៉ាងហោចណាស់ 18»?',
          ),
          'age >= 18',
          ['age < 18', 'age == 1', 'age > 81'],
        ),
        tf(t('An if can work without an else.', 'if អាចដំណើរការដោយគ្មាន else។'), true),
      ],
      challenge: [
        mc(
          t('What is shown?', 'តើអ្វីត្រូវបានបង្ហាញ?'),
          'B',
          ['A', 'C', 'A B C'],
          py(
            'mark = 75\nif mark >= 90:\n    print("A")\nelif mark >= 70:\n    print("B")\nelse:\n    print("C")',
          ),
        ),
        mc(
          t('What is shown?', 'តើអ្វីត្រូវបានបង្ហាញ?'),
          'C',
          ['A', 'B'],
          py(
            'mark = 50\nif mark >= 90:\n    print("A")\nelif mark >= 70:\n    print("B")\nelse:\n    print("C")',
          ),
        ),
        mc(
          t('What is shown?', 'តើអ្វីត្រូវបានបង្ហាញ?'),
          'even',
          ['odd', 'even odd'],
          py('n = 8\nif n % 2 == 0:\n    print("even")\nelse:\n    print("odd")'),
        ),
        mc(
          t('A game: lives = 0. What is shown?', 'ហ្គេម៖ lives = 0។ តើអ្វីត្រូវបានបង្ហាញ?'),
          'Game over',
          ['Keep playing', t('Nothing', 'គ្មានអ្វីទេ')],
          py('lives = 0\nif lives == 0:\n    print("Game over")\nelse:\n    print("Keep playing")'),
        ),
        order(
          t(
            'Order the lines to make a correct if/else.',
            'តម្រៀបបន្ទាត់ដើម្បីបង្កើត if/else ត្រឹមត្រូវ។',
          ),
          ['if hungry:', '    print("Eat")', 'else:', '    print("Study")'],
        ),
        tf(t('This shows both messages.', 'នេះបង្ហាញសារទាំងពីរ។'), false, {
          ...py('x = 5\nif x > 3:\n    print("big")\nelse:\n    print("small")'),
          explanation: t(
            'if/else runs only ONE of the two blocks.',
            'if/else ដំណើរការតែប្លុកមួយក្នុងចំណោមពីរ។',
          ),
        }),
        mc(
          t(
            'Which program says “Free entry” for children under 6?',
            'តើកម្មវិធីណានិយាយ «ចូលដោយឥតគិតថ្លៃ» សម្រាប់កុមារអាយុក្រោម 6?',
          ),
          'if age < 6: print("Free entry")',
          ['if age > 6: print("Free entry")', 'if age == 60: print("Free entry")'],
        ),
        match(t('Match the situation to the code idea.', 'ផ្គូផ្គងស្ថានភាពជាមួយគំនិតកូដ។'), [
          [t('Battery under 20%', 'ថ្មក្រោម 20%'), 'if battery < 20: warn'],
          [t('Correct password', 'ពាក្យសម្ងាត់ត្រឹមត្រូវ'), 'if password == saved: login'],
          [t('It is the weekend', 'ជាចុងសប្តាហ៍'), 'if day == "Sunday": rest'],
        ]),
      ],
      games: [
        robot(
          t(
            'If there is a wall, go around it! Reach the flag.',
            'បើមានជញ្ជាំង ដើរជុំវិញវា! ទៅដល់ទង់។',
          ),
          ['S.#..', '..#.#', '#....', '###.G'],
        ),
        memory(
          t(
            'Match each if to what it shows (x = 10).',
            'ផ្គូផ្គង if នីមួយៗជាមួយអ្វីដែលវាបង្ហាញ (x = 10)។',
          ),
          [
            ['if x > 5: "big"', 'big'],
            ['if x == 10: "ten"', 'ten'],
            ['if x < 5 … else: "not small"', 'not small'],
            ['if x % 2 == 0: "even"', 'even'],
          ],
        ),
      ],
      reward: t(
        'Your code can make decisions now! 🔀 That is how apps react to you.',
        'ឥឡូវកូដរបស់អ្នកអាចសម្រេចចិត្ត! 🔀 នោះជារបៀបដែលកម្មវិធីឆ្លើយតបនឹងអ្នក។',
      ),
    },
  ),

  // 8 ─────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'for-loops',
    '🔁',
    t('For Loops: Repeat Smartly', 'For Loop៖ ធ្វើម្តងទៀតដោយឆ្លាតវៃ'),
    t('Do something many times with a few lines.', 'ធ្វើអ្វីមួយច្រើនដងដោយប្រើបន្ទាត់តិច។'),
    {
      intro: [
        '🔁',
        t(
          'Writing print 100 times is boring. A loop does it in 2 lines!',
          'ការសរសេរ print 100 ដងគួរឱ្យធុញ។ រង្វិលជុំធ្វើវាក្នុង 2 បន្ទាត់!',
        ),
      ],
      learn: [
        [
          '🔁',
          'for',
          t(
            'for i in range(3): repeats the inside 3 times.',
            'for i in range(3): ធ្វើខាងក្នុងម្តងទៀត 3 ដង។',
          ),
          'loop',
        ],
        [
          '🔢',
          'range',
          t(
            'range(3) gives 0, 1, 2 — it starts at 0!',
            'range(3) ផ្តល់ 0, 1, 2 — វាចាប់ផ្តើមពី 0!',
          ),
          'range',
        ],
        [
          '📝',
          t('The counter', 'អ្នករាប់'),
          t(
            'i changes each time: first 0, then 1, then 2.',
            'i ប្តូររាល់ដង៖ ដំបូង 0 បន្ទាប់ 1 រួច 2។',
          ),
        ],
      ],
      see: [
        'for i in range(3):\n    print("Hi")\n→ Hi\n→ Hi\n→ Hi',
        t('The loop runs the print line 3 times.', 'រង្វិលជុំដំណើរការបន្ទាត់ print 3 ដង។'),
      ],
      words: [
        ['loop', 'រង្វិលជុំ', '🔁'],
        ['repeat', 'ធ្វើម្តងទៀត'],
        ['counter', 'អ្នករាប់', '🔢'],
        ['times', 'ដង'],
      ],
      play: [
        num(
          t('How many times is “Hi” shown?', 'តើ «Hi» បង្ហាញប៉ុន្មានដង?'),
          3,
          py('for i in range(3):\n    print("Hi")'),
        ),
        num(
          t('How many times is “Go” shown?', 'តើ «Go» បង្ហាញប៉ុន្មានដង?'),
          5,
          py('for i in range(5):\n    print("Go")'),
        ),
        mc(t('What numbers does range(4) give?', 'តើ range(4) ផ្តល់លេខអ្វីខ្លះ?'), '0, 1, 2, 3', [
          '1, 2, 3, 4',
          '0, 1, 2, 3, 4',
          '4',
        ]),
        mc(
          t('What is shown?', 'តើអ្វីត្រូវបានបង្ហាញ?'),
          '0 1 2',
          ['1 2 3', '3', '0 1 2 3'],
          py('for i in range(3):\n    print(i)'),
        ),
        tf(
          t(
            'A loop can save you from writing the same line many times.',
            'រង្វិលជុំអាចជួយអ្នកមិនចាំបាច់សរសេរបន្ទាត់ដដែលច្រើនដង។',
          ),
          true,
        ),
        num(
          t('What is the LAST number shown?', 'តើលេខចុងក្រោយដែលបង្ហាញគឺប៉ុន្មាន?'),
          4,
          py('for i in range(5):\n    print(i)'),
        ),
        mc(
          t('Which loop shows “Hello” 10 times?', 'តើរង្វិលជុំណាបង្ហាញ «Hello» 10 ដង?'),
          'for i in range(10):',
          ['for i in range(9):', 'for i in range(11):', 'if i == 10:'],
        ),
        num(
          t('How many stars are shown in total?', 'តើផ្កាយបង្ហាញសរុបប៉ុន្មាន?'),
          4,
          py('for i in range(2):\n    print("*")\n    print("*")'),
        ),
      ],
      challenge: [
        num(t('What is the total?', 'តើសរុបប៉ុន្មាន?'), 6, {
          ...py('total = 0\nfor i in range(4):\n    total = total + i\nprint(total)'),
          explanation: t('0 + 1 + 2 + 3 = 6.', '0 + 1 + 2 + 3 = 6។'),
        }),
        num(
          t('What is shown?', 'តើអ្វីត្រូវបានបង្ហាញ?'),
          10,
          py('count = 0\nfor i in range(10):\n    count = count + 1\nprint(count)'),
        ),
        mc(
          t('What is shown?', 'តើអ្វីត្រូវបានបង្ហាញ?'),
          '2 4 6',
          ['1 2 3', '2 3 4', '0 2 4'],
          py('for i in range(1, 4):\n    print(i * 2)'),
        ),
        num(t('How many times does this loop run?', 'តើរង្វិលជុំនេះដំណើរការប៉ុន្មានដង?'), 4, {
          ...py('for i in range(2, 6):\n    print(i)'),
          explanation: t('2, 3, 4, 5 — four times.', '2, 3, 4, 5 — បួនដង។'),
        }),
        tf(
          t(
            'This shows the word “cat” letter by letter: c, a, t.',
            'នេះបង្ហាញពាក្យ «cat» មួយអក្សរម្តង៖ c, a, t។',
          ),
          true,
          py('for letter in "cat":\n    print(letter)'),
        ),
        mc(
          t(
            'A robot must walk 6 steps forward. Which is shortest?',
            'រ៉ូបូតត្រូវដើរទៅមុខ 6 ជំហាន។ តើមួយណាខ្លីបំផុត?',
          ),
          'for i in range(6): forward()',
          ['forward() written 6 times', 'forward(); forward()', 'if steps == 6: forward()'],
        ),
        num(
          t('What is shown?', 'តើអ្វីត្រូវបានបង្ហាញ?'),
          15,
          py('total = 0\nfor n in [5, 5, 5]:\n    total = total + n\nprint(total)'),
        ),
        order(
          t(
            'Order the lines: add up 1 to 3 and show the total.',
            'តម្រៀបបន្ទាត់៖ បូក 1 ដល់ 3 ហើយបង្ហាញសរុប។',
          ),
          ['total = 0', 'for i in range(1, 4):', '    total = total + i', 'print(total)'],
        ),
      ],
      games: [
        robot(
          t(
            'A loop is faster! Reach the flag with only 2 blocks.',
            'រង្វិលជុំលឿនជាង! ទៅដល់ទង់ដោយប្រើតែ 2 ប្លុក។',
          ),
          ['S......G'],
          { maxBlocks: 2, hint: t('Repeat “right” 7 times.', 'ធ្វើ «ស្តាំ» 7 ដង។') },
        ),
        robot(
          t(
            'Zig-zag down the stairs with a loop (3 blocks or fewer).',
            'ចុះជណ្តើរដោយប្រើរង្វិលជុំ (3 ប្លុក ឬតិចជាងនេះ)។',
          ),
          ['S.##', '#..#', '##..', '###G'],
          { maxBlocks: 3, hint: t('Repeat “right, down” 3 times.', 'ធ្វើ «ស្តាំ ចុះក្រោម» 3 ដង។') },
        ),
      ],
      reward: t(
        'Loops make computers powerful: one line, a thousand times! 🔁',
        'រង្វិលជុំធ្វើឱ្យកុំព្យូទ័រខ្លាំង៖ បន្ទាត់មួយ មួយពាន់ដង! 🔁',
      ),
    },
  ),
];
