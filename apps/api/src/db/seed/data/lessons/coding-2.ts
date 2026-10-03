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
import { CODING_WORLD as W } from './coding-1';

// 👩‍💻 Coding Basics, lessons 9–15. Khmer (km) strings are DRAFTS for native review.
const py = (source: string) => ({ data: code(source, 'Python') });

export const CODING_LESSONS_2: LessonSeed[] = [
  // 9 ─────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'while-loops',
    '⏳',
    t('While Loops: Repeat Until…', 'While Loop៖ ធ្វើម្តងទៀតរហូតដល់…'),
    t('Keep going while something is true.', 'បន្តខណៈពេលដែលអ្វីមួយពិត។'),
    {
      intro: [
        '⏳',
        t(
          'Keep pouring water WHILE the bottle is not full. That is a while loop!',
          'បន្តចាក់ទឹកខណៈពេលដែលដបមិនទាន់ពេញ។ នោះជា while loop!',
        ),
      ],
      learn: [
        [
          '⏳',
          'while',
          t(
            'while condition: repeats as long as the condition is True.',
            'while លក្ខខណ្ឌ: ធ្វើម្តងទៀតដរាបណាលក្ខខណ្ឌពិត។',
          ),
          'while',
        ],
        [
          '🛑',
          t('It must stop', 'វាត្រូវតែឈប់'),
          t(
            'Change something inside the loop, or it runs forever.',
            'ប្តូរអ្វីមួយក្នុងរង្វិលជុំ បើមិនដូច្នោះវានឹងដំណើរការជារៀងរហូត។',
          ),
        ],
        [
          '🔢',
          t('Counting', 'ការរាប់'),
          t(
            'n = n + 1 inside the loop moves it towards the end.',
            'n = n + 1 ក្នុងរង្វិលជុំ នាំវាទៅរកទីបញ្ចប់។',
          ),
        ],
      ],
      see: [
        'n = 1\nwhile n <= 3:\n    print(n)\n    n = n + 1\n→ 1  2  3',
        t(
          'When n becomes 4, “n <= 3” is False and the loop stops.',
          'ពេល n ក្លាយជា 4 «n <= 3» មិនពិត ហើយរង្វិលជុំឈប់។',
        ),
      ],
      words: [
        ['while', 'ខណៈពេល'],
        ['until', 'រហូតដល់'],
        ['forever', 'ជារៀងរហូត', '♾️'],
        ['stop', 'ឈប់', '🛑'],
      ],
      play: [
        mc(
          t('What is shown?', 'តើអ្វីត្រូវបានបង្ហាញ?'),
          '1 2 3',
          ['1 2', '0 1 2 3', '3'],
          py('n = 1\nwhile n <= 3:\n    print(n)\n    n = n + 1'),
        ),
        tf(
          t(
            'A while loop repeats as long as its condition is True.',
            'while loop ធ្វើម្តងទៀតដរាបណាលក្ខខណ្ឌរបស់វាពិត។',
          ),
          true,
        ),
        mc(
          t('Why does this loop never stop?', 'ហេតុអ្វីរង្វិលជុំនេះមិនដែលឈប់?'),
          t('n never changes', 'n មិនដែលប្តូរ'),
          [t('print is wrong', 'print ខុស'), t('5 is too big', '5 ធំពេក')],
          py('n = 1\nwhile n < 5:\n    print("Hi")'),
        ),
        num(
          t('How many times is “Hi” shown?', 'តើ «Hi» បង្ហាញប៉ុន្មានដង?'),
          4,
          py('n = 0\nwhile n < 4:\n    print("Hi")\n    n = n + 1'),
        ),
        num(
          t('What is shown at the end?', 'តើអ្វីបង្ហាញនៅចុងបញ្ចប់?'),
          3,
          py('lives = 3\nwhile lives > 3:\n    lives = lives - 1\nprint(lives)'),
        ),
        mc(
          t('Which is a good use of while?', 'តើមួយណាជាការប្រើ while ល្អ?'),
          t('Ask for the password until it is right', 'សួរពាក្យសម្ងាត់រហូតដល់វាត្រឹមត្រូវ'),
          [t('Show one message once', 'បង្ហាញសារមួយម្តង'), t('Add two numbers', 'បូកលេខពីរ')],
        ),
        tf(
          t(
            'A loop that never stops is called an infinite loop.',
            'រង្វិលជុំដែលមិនដែលឈប់ ហៅថា infinite loop។',
          ),
          true,
        ),
        num(t('What is shown?', 'តើអ្វីត្រូវបានបង្ហាញ?'), 0, {
          ...py('n = 5\nwhile n > 0:\n    n = n - 1\nprint(n)'),
          explanation: t(
            'n goes 5, 4, 3, 2, 1, 0 — then 0 > 0 is False.',
            'n ទៅ 5, 4, 3, 2, 1, 0 — បន្ទាប់មក 0 > 0 មិនពិត។',
          ),
        }),
      ],
      challenge: [
        num(t('What is shown?', 'តើអ្វីត្រូវបានបង្ហាញ?'), 16, {
          ...py('x = 1\nwhile x < 10:\n    x = x * 2\nprint(x)'),
          explanation: t(
            '1 → 2 → 4 → 8 → 16, and 16 < 10 is False.',
            '1 → 2 → 4 → 8 → 16 ហើយ 16 < 10 មិនពិត។',
          ),
        }),
        num(
          t('How many times does the loop run?', 'តើរង្វិលជុំដំណើរការប៉ុន្មានដង?'),
          5,
          py('count = 0\nwhile count < 10:\n    count = count + 2'),
        ),
        mc(
          t(
            'Fix the bug: which line must be added inside the loop?',
            'កែកំហុស៖ តើបន្ទាត់ណាត្រូវបន្ថែមក្នុងរង្វិលជុំ?',
          ),
          'n = n + 1',
          ['print(n)', 'n = 0', 'while True:'],
          py('n = 0\nwhile n < 3:\n    print(n)'),
        ),
        tf(t('This loop runs zero times.', 'រង្វិលជុំនេះដំណើរការសូន្យដង។'), true, {
          ...py('n = 10\nwhile n < 5:\n    print(n)'),
          explanation: t('10 < 5 is False from the start.', '10 < 5 មិនពិតតាំងពីដំបូង។'),
        }),
        num(
          t('What is the total?', 'តើសរុបប៉ុន្មាន?'),
          10,
          py('total = 0\nn = 1\nwhile n <= 4:\n    total = total + n\n    n = n + 1\nprint(total)'),
        ),
        match(
          t('Match the loop to when you would use it.', 'ផ្គូផ្គងរង្វិលជុំជាមួយពេលដែលអ្នកប្រើវា។'),
          [
            ['for', t('A known number of times', 'ចំនួនដងដែលដឹងជាមុន')],
            ['while', t('Until something changes', 'រហូតដល់អ្វីមួយប្តូរ')],
          ],
        ),
        order(
          t(
            'Order the lines: count down from 3, then say “Go!”',
            'តម្រៀបបន្ទាត់៖ រាប់ថយពី 3 រួចនិយាយ «Go!»',
          ),
          ['n = 3', 'while n > 0:', '    print(n)', '    n = n - 1', 'print("Go!")'],
        ),
        mc(
          t('What is the LAST thing shown?', 'តើអ្វីបង្ហាញចុងក្រោយ?'),
          'Go!',
          ['1', '0', '3'],
          py('n = 3\nwhile n > 0:\n    print(n)\n    n = n - 1\nprint("Go!")'),
        ),
      ],
      games: [
        robot(
          t(
            'Walk WHILE there is no wall… then turn. Reach the flag.',
            'ដើរខណៈពេលដែលគ្មានជញ្ជាំង… រួចបត់។ ទៅដល់ទង់។',
          ),
          ['S....', '####.', '....G'],
          { maxBlocks: 4, hint: t('Right ×4, then down ×2.', 'ស្តាំ ×4 រួចចុះក្រោម ×2។') },
        ),
        catchIt(
          t('Catch the loops that STOP!', 'ចាប់រង្វិលជុំដែលឈប់!'),
          ['while n < 3: n = n + 1', 'while lives > 0: lives = lives - 1', 'for i in range(5)'],
          ['while True: print("hi")', 'while n < 3: print(n)', 'while 1 == 1: pass'],
          { speed: 'slow' },
        ),
      ],
      reward: t(
        'You can repeat until the job is done — and make sure loops stop! ⏳',
        'អ្នកអាចធ្វើម្តងទៀតរហូតដល់ការងាររួច — ហើយធ្វើឱ្យរង្វិលជុំឈប់! ⏳',
      ),
    },
  ),

  // 10 ────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'functions',
    '🧰',
    t('Functions: Reusable Recipes', 'អនុគមន៍៖ រូបមន្តប្រើឡើងវិញបាន'),
    t(
      'Name a block of code and use it again and again.',
      'ដាក់ឈ្មោះប្លុកកូដ ហើយប្រើវាម្តងហើយម្តងទៀត។',
    ),
    {
      intro: [
        '🧰',
        t(
          'Say “brush teeth” and you know all the steps. A function is a name for many steps!',
          'និយាយ «ដុសធ្មេញ» អ្នកដឹងជំហានទាំងអស់។ អនុគមន៍ជាឈ្មោះសម្រាប់ជំហានច្រើន!',
        ),
      ],
      learn: [
        [
          '🧰',
          'def',
          t(
            'def greet(): creates a function called greet.',
            'def greet(): បង្កើតអនុគមន៍ឈ្មោះ greet។',
          ),
          'function',
        ],
        [
          '📞',
          t('Call it', 'ហៅវា'),
          t(
            'greet() runs the steps inside. Call it as often as you like.',
            'greet() ដំណើរការជំហានខាងក្នុង។ ហៅវាប៉ុន្មានដងក៏បាន។',
          ),
        ],
        [
          '📥',
          t('Inputs (parameters)', 'ធាតុចូល (ប៉ារ៉ាម៉ែត្រ)'),
          t(
            'def greet(name): lets you pass a value in.',
            'def greet(name): អនុញ្ញាតឱ្យអ្នកបញ្ជូនតម្លៃចូល។',
          ),
          'parameter',
        ],
        [
          '📤',
          'return',
          t('return gives a result back.', 'return ផ្តល់លទ្ធផលត្រឡប់មកវិញ។'),
          'return',
        ],
      ],
      see: [
        'def greet(name):\n    print("Hello " + name)\n\ngreet("Dara")\ngreet("Lina")\n→ Hello Dara\n→ Hello Lina',
        t(
          'Written once, used twice with different names.',
          'សរសេរម្តង ប្រើពីរដងជាមួយឈ្មោះខុសគ្នា។',
        ),
      ],
      words: [
        ['function', 'អនុគមន៍', '🧰'],
        ['call', 'ហៅ', '📞'],
        ['parameter', 'ប៉ារ៉ាម៉ែត្រ'],
        ['return', 'ត្រឡប់'],
      ],
      play: [
        mc(
          t('Which word creates a function in Python?', 'តើពាក្យណាបង្កើតអនុគមន៍ក្នុង Python?'),
          'def',
          ['for', 'if', 'print'],
        ),
        mc(
          t('What is shown?', 'តើអ្វីត្រូវបានបង្ហាញ?'),
          'Hello Sokha',
          ['Hello name', 'greet', 'Error'],
          py('def greet(name):\n    print("Hello " + name)\n\ngreet("Sokha")'),
        ),
        num(
          t('How many times is “Hi!” shown?', 'តើ «Hi!» បង្ហាញប៉ុន្មានដង?'),
          3,
          py('def say_hi():\n    print("Hi!")\n\nsay_hi()\nsay_hi()\nsay_hi()'),
        ),
        tf(
          t('Defining a function runs it straight away.', 'ការកំណត់អនុគមន៍ដំណើរការវាភ្លាមៗ។'),
          false,
          {
            explanation: t(
              'It runs only when you call it, like say_hi().',
              'វាដំណើរការលុះត្រាអ្នកហៅវា ដូចជា say_hi()។',
            ),
          },
        ),
        num(
          t('What is shown?', 'តើអ្វីត្រូវបានបង្ហាញ?'),
          8,
          py('def double(x):\n    return x * 2\n\nprint(double(4))'),
        ),
        num(
          t('What is shown?', 'តើអ្វីត្រូវបានបង្ហាញ?'),
          7,
          py('def add(a, b):\n    return a + b\n\nprint(add(3, 4))'),
        ),
        mc(
          t('Why use functions?', 'ហេតុអ្វីប្រើអនុគមន៍?'),
          t('Write once, reuse many times', 'សរសេរម្តង ប្រើច្រើនដង'),
          [
            t('To make code longer', 'ដើម្បីធ្វើឱ្យកូដវែង'),
            t('To hide mistakes', 'ដើម្បីលាក់កំហុស'),
          ],
        ),
        mc(
          t('In def area(w, h):, what are w and h?', 'ក្នុង def area(w, h): តើ w និង h ជាអ្វី?'),
          t('Parameters (inputs)', 'ប៉ារ៉ាម៉ែត្រ (ធាតុចូល)'),
          [t('Loops', 'រង្វិលជុំ'), t('Errors', 'កំហុស')],
        ),
      ],
      challenge: [
        num(
          t('What is shown?', 'តើអ្វីត្រូវបានបង្ហាញ?'),
          12,
          py('def area(w, h):\n    return w * h\n\nprint(area(3, 4))'),
        ),
        num(
          t('What is shown?', 'តើអ្វីត្រូវបានបង្ហាញ?'),
          20,
          py('def double(x):\n    return x * 2\n\nprint(double(double(5)))'),
        ),
        mc(
          t('What is shown?', 'តើអ្វីត្រូវបានបង្ហាញ?'),
          'big',
          ['small', 'big small'],
          py(
            'def size(n):\n    if n > 10:\n        return "big"\n    return "small"\n\nprint(size(50))',
          ),
        ),
        num(
          t('A shop adds 10% tax. What is shown?', 'ហាងបន្ថែមពន្ធ 10%។ តើអ្វីត្រូវបានបង្ហាញ?'),
          110,
          py('def with_tax(price):\n    return price + price * 10 / 100\n\nprint(with_tax(100))'),
        ),
        typeIt(
          t('Type the NAME of this function.', 'វាយឈ្មោះអនុគមន៍នេះ។'),
          'square',
          py('def square(n):\n    return n * n'),
        ),
        num(
          t('What does square(6) give?', 'តើ square(6) ផ្តល់ប៉ុន្មាន?'),
          36,
          py('def square(n):\n    return n * n'),
        ),
        order(
          t(
            'Order the lines to define and call a function.',
            'តម្រៀបបន្ទាត់ដើម្បីកំណត់ និងហៅអនុគមន៍។',
          ),
          ['def welcome():', '    print("Welcome!")', 'welcome()'],
        ),
        match(t('Match the word to its job.', 'ផ្គូផ្គងពាក្យជាមួយតួនាទី។'), [
          ['def', t('Create a function', 'បង្កើតអនុគមន៍')],
          ['return', t('Give a result back', 'ផ្តល់លទ្ធផលត្រឡប់')],
          ['greet()', t('Call (run) a function', 'ហៅ (ដំណើរការ) អនុគមន៍')],
        ]),
      ],
      games: [
        memory(
          t('Match each function call to its result.', 'ផ្គូផ្គងការហៅអនុគមន៍នីមួយៗជាមួយលទ្ធផល។'),
          [
            ['double(3)', '6'],
            ['square(3)', '9'],
            ['add(3, 4)', '7'],
            ['half(10)', '5'],
          ],
        ),
        robot(
          t(
            'Use a repeated pattern like a function: climb to the flag in 3 blocks.',
            'ប្រើលំនាំដដែលៗដូចអនុគមន៍៖ ឡើងទៅទង់ក្នុង 3 ប្លុក។',
          ),
          ['###G', '##..', '#..#', 'S.##'],
          { maxBlocks: 3, hint: t('Repeat “right, up” 3 times.', 'ធ្វើ «ស្តាំ ឡើងលើ» 3 ដង។') },
        ),
      ],
      reward: t(
        'Functions make you a smart, lazy programmer — in the best way! 🧰',
        'អនុគមន៍ធ្វើឱ្យអ្នកជាអ្នកសរសេរកម្មវិធីឆ្លាត និងខ្ជិល — តាមរបៀបល្អបំផុត! 🧰',
      ),
    },
  ),

  // 11 ────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'events',
    '👆',
    t('Events: When Something Happens', 'ព្រឹត្តិការណ៍៖ ពេលអ្វីមួយកើតឡើង'),
    t('Code that waits for a click, a key or a timer.', 'កូដដែលរង់ចាំការចុច គ្រាប់ចុច ឬម៉ោងកំណត់។'),
    {
      intro: [
        '👆',
        t(
          'Tap a button and something happens. Behind it: an event and the code that answers it.',
          'ចុចប៊ូតុង ហើយមានអ្វីកើតឡើង។ នៅពីក្រោយ៖ ព្រឹត្តិការណ៍ និងកូដដែលឆ្លើយតបវា។',
        ),
      ],
      learn: [
        [
          '👆',
          t('Event', 'ព្រឹត្តិការណ៍'),
          t(
            'Something that happens: a click, a key press, a message arriving.',
            'អ្វីមួយដែលកើតឡើង៖ ការចុច ការចុចគ្រាប់ការបញ្ជូនសារ។',
          ),
          'event',
        ],
        [
          '👂',
          t('Listener', 'អ្នកស្តាប់'),
          t(
            'Code that waits for an event and then runs.',
            'កូដដែលរង់ចាំព្រឹត្តិការណ៍ រួចដំណើរការ។',
          ),
          'listener',
        ],
        [
          '⏰',
          t('Timer', 'ម៉ោងកំណត់'),
          t(
            'An event can also be time: every second, after 5 minutes.',
            'ព្រឹត្តិការណ៍ក៏អាចជាពេលវេលា៖ រាល់វិនាទី ក្រោយ 5 នាទី។',
          ),
          'timer',
        ],
      ],
      see: [
        t(
          'WHEN button clicked:\n    show "Thank you!"',
          'ពេលប៊ូតុងត្រូវបានចុច៖\n    បង្ហាញ "Thank you!"',
        ),
        t(
          'The message appears only after the click — the code waits for the event.',
          'សារបង្ហាញតែក្រោយការចុច — កូដរង់ចាំព្រឹត្តិការណ៍។',
        ),
      ],
      words: [
        ['event', 'ព្រឹត្តិការណ៍', '⚡'],
        ['click', 'ចុច', '👆'],
        ['timer', 'ម៉ោងកំណត់', '⏰'],
        ['react', 'ឆ្លើយតប'],
      ],
      play: [
        mc(
          t('Which one is an event?', 'តើមួយណាជាព្រឹត្តិការណ៍?'),
          t('The user taps a button', 'អ្នកប្រើចុចប៊ូតុង'),
          [t('A variable called score', 'អថេរឈ្មោះ score'), t('The number 10', 'លេខ 10')],
        ),
        tf(
          t(
            'Code for an event runs only when the event happens.',
            'កូដសម្រាប់ព្រឹត្តិការណ៍ដំណើរការលុះត្រាព្រឹត្តិការណ៍កើតឡើង។',
          ),
          true,
        ),
        sortInto(
          t('Event or not?', 'ព្រឹត្តិការណ៍ ឬមិនមែន?'),
          [
            ['e', t('Event', 'ព្រឹត្តិការណ៍'), '⚡'],
            ['n', t('Not an event', 'មិនមែនព្រឹត្តិការណ៍'), '📦'],
          ],
          [
            [t('Key pressed', 'ចុចគ្រាប់ចុច'), 'e'],
            [t('Mouse clicked', 'ចុចកណ្តុរ'), 'e'],
            [t('Timer finished', 'ម៉ោងកំណត់ចប់'), 'e'],
            ['score = 0', 'n'],
            ['print(5)', 'n'],
            [t('The colour red', 'ពណ៌ក្រហម'), 'n'],
          ],
        ),
        mc(
          t(
            'In a game, which event makes the character jump?',
            'ក្នុងហ្គេម តើព្រឹត្តិការណ៍ណាធ្វើឱ្យតួអង្គលោត?',
          ),
          t('Space key pressed', 'ចុចគ្រាប់ Space'),
          [t('Game opened', 'បើកហ្គេម'), t('Score saved', 'រក្សាទុកពិន្ទុ')],
        ),
        mc(
          t(
            'An alarm app rings at 6:00. What is the event?',
            'កម្មវិធីរោទ៍រោទ៍ម៉ោង 6:00។ តើព្រឹត្តិការណ៍គឺអ្វី?',
          ),
          t('The time becomes 6:00', 'ពេលវេលាក្លាយជា 6:00'),
          [t('The sound file', 'ឯកសារសំឡេង'), t('The phone screen', 'អេក្រង់ទូរស័ព្ទ')],
        ),
        tf(
          t(
            'A message arriving on your phone is an event.',
            'សារមកដល់ទូរស័ព្ទរបស់អ្នកជាព្រឹត្តិការណ៍មួយ។',
          ),
          true,
        ),
        match(
          t(
            'Match the event to what the app does.',
            'ផ្គូផ្គងព្រឹត្តិការណ៍ជាមួយអ្វីដែលកម្មវិធីធ្វើ។',
          ),
          [
            [t('Tap “Send”', 'ចុច «ផ្ញើ»'), t('Send the message', 'ផ្ញើសារ')],
            [t('Swipe down', 'អូសចុះ'), t('Refresh the page', 'ផ្ទុកទំព័រឡើងវិញ')],
            [t('Battery low', 'ថ្មខ្សោយ'), t('Show a warning', 'បង្ហាញការព្រមាន')],
          ],
        ),
        mc(
          t('What does a “listener” do?', 'តើ «អ្នកស្តាប់» ធ្វើអ្វី?'),
          t('Waits for an event, then runs code', 'រង់ចាំព្រឹត្តិការណ៍ រួចដំណើរការកូដ'),
          [t('Plays music', 'ចាក់តន្ត្រី'), t('Deletes files', 'លុបឯកសារ')],
        ),
      ],
      challenge: [
        order(
          t('Order what happens when you tap “Like”.', 'តម្រៀបអ្វីដែលកើតឡើងពេលអ្នកចុច «Like»។'),
          [
            t('You tap the button', 'អ្នកចុចប៊ូតុង'),
            t('The app hears the click event', 'កម្មវិធីឮព្រឹត្តិការណ៍ចុច'),
            t('The like count goes up', 'ចំនួន like កើនឡើង'),
            t('The new number is shown', 'លេខថ្មីត្រូវបានបង្ហាញ'),
          ],
        ),
        num(
          t(
            'A counter starts at 0 and goes up by 1 every click. You click 5 times. What does it show?',
            'អ្នករាប់ចាប់ពី 0 ហើយកើនឡើង 1 រាល់ការចុច។ អ្នកចុច 5 ដង។ តើវាបង្ហាញប៉ុន្មាន?',
          ),
          5,
        ),
        num(
          t(
            'A timer event happens every 2 seconds. How many times in 10 seconds?',
            'ព្រឹត្តិការណ៍ម៉ោងកំណត់កើតឡើងរាល់ 2 វិនាទី។ ប៉ុន្មានដងក្នុង 10 វិនាទី?',
          ),
          5,
        ),
        mc(
          t('What is shown after 2 clicks?', 'តើអ្វីបង្ហាញក្រោយការចុច 2 ដង?'),
          '2',
          ['0', '1', 'clicks'],
          {
            data: code(
              'clicks = 0\n\nWHEN button clicked:\n    clicks = clicks + 1\n    show(clicks)',
              'Code',
            ),
          },
        ),
        tf(
          t(
            'Without events, apps could not react to what you do.',
            'បើគ្មានព្រឹត្តិការណ៍ កម្មវិធីមិនអាចឆ្លើយតបនឹងអ្វីដែលអ្នកធ្វើទេ។',
          ),
          true,
        ),
        mc(
          t(
            'Which event starts a video call ringing on your friend’s phone?',
            'តើព្រឹត្តិការណ៍ណាធ្វើឱ្យការហៅវីដេអូរោទ៍លើទូរស័ព្ទមិត្តអ្នក?',
          ),
          t('You tap “Call”', 'អ្នកចុច «ហៅ»'),
          [
            t('Your friend’s phone is charging', 'ទូរស័ព្ទមិត្តកំពុងសាក'),
            t('It is midnight', 'ជាពាក់កណ្តាលអធ្រាត្រ'),
          ],
        ),
        buildSentence(
          t('Build the event rule.', 'បង្កើតច្បាប់ព្រឹត្តិការណ៍។'),
          'When the button is clicked show a message.',
          { say: 'When the button is clicked, show a message.' },
        ),
        mc(
          t(
            'In Scratch, which block waits for an event?',
            'ក្នុង Scratch តើប្លុកណារង់ចាំព្រឹត្តិការណ៍?',
          ),
          t('“when green flag clicked”', '«ពេលទង់បៃតងត្រូវបានចុច»'),
          [t('“move 10 steps”', '«ដើរ 10 ជំហាន»'), t('“say Hello”', '«និយាយ Hello»')],
        ),
      ],
      games: [
        catchIt(
          t('Catch the EVENTS!', 'ចាប់ព្រឹត្តិការណ៍!'),
          [
            t('Click', 'ចុច'),
            t('Key press', 'ចុចគ្រាប់'),
            t('Swipe', 'អូស'),
            t('Timer ends', 'ម៉ោងចប់'),
          ],
          [t('Variable', 'អថេរ'), t('Number', 'លេខ'), t('Colour', 'ពណ៌')],
          { speed: 'fast' },
        ),
        memory(
          t('Match each event to its reaction.', 'ផ្គូផ្គងព្រឹត្តិការណ៍នីមួយៗជាមួយការឆ្លើយតប។'),
          [
            [t('Tap ▶', 'ចុច ▶'), t('Play video', 'ចាក់វីដេអូ')],
            [t('Shake phone', 'អង្រួនទូរស័ព្ទ'), t('Undo', 'មិនធ្វើវិញ')],
            [t('Alarm time', 'ពេលរោទ៍'), t('Ring', 'រោទ៍')],
            [t('New message', 'សារថ្មី'), t('Vibrate', 'ញ័រ')],
          ],
        ),
      ],
      reward: t(
        'Apps listen to you through events — now you know how! 👆',
        'កម្មវិធីស្តាប់អ្នកតាមរយៈព្រឹត្តិការណ៍ — ឥឡូវអ្នកដឹងរបៀប! 👆',
      ),
    },
  ),

  // 12 ────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'lists',
    '📋',
    t('Lists: Many Values in One Place', 'បញ្ជី៖ តម្លៃច្រើនក្នុងកន្លែងតែមួយ'),
    t(
      'Store a whole class of names in one variable.',
      'រក្សាទុកឈ្មោះសិស្សទាំងថ្នាក់ក្នុងអថេរតែមួយ។',
    ),
    {
      intro: [
        '📋',
        t(
          'A shopping list, a class list, a playlist — code has lists too!',
          'បញ្ជីទិញឥវ៉ាន់ បញ្ជីថ្នាក់ បញ្ជីចម្រៀង — កូដក៏មានបញ្ជីដែរ!',
        ),
      ],
      learn: [
        [
          '📋',
          t('List', 'បញ្ជី'),
          t('fruits = ["mango", "banana", "durian"]', 'fruits = ["mango", "banana", "durian"]'),
          'list',
        ],
        [
          '0️⃣',
          t('Index starts at 0', 'លិបិក្រមចាប់ផ្តើមពី 0'),
          t(
            'fruits[0] is "mango", fruits[1] is "banana".',
            'fruits[0] គឺ "mango" fruits[1] គឺ "banana"។',
          ),
          'index',
        ],
        ['📏', 'len', t('len(fruits) gives how many items: 3.', 'len(fruits) ផ្តល់ចំនួនធាតុ៖ 3។')],
        [
          '➕',
          'append',
          t('fruits.append("rambutan") adds to the end.', 'fruits.append("rambutan") បន្ថែមនៅចុង។'),
          'append',
        ],
      ],
      see: [
        'marks = [7, 9, 5]\nprint(marks[1])   → 9\nprint(len(marks)) → 3',
        t(
          'Position 1 is the SECOND item, because counting starts at 0.',
          'ទីតាំង 1 គឺជាធាតុទីពីរ ព្រោះការរាប់ចាប់ផ្តើមពី 0។',
        ),
      ],
      words: [
        ['list', 'បញ្ជី', '📋'],
        ['item', 'ធាតុ'],
        ['index', 'លិបិក្រម'],
        ['append', 'បន្ថែម', '➕'],
      ],
      play: [
        mc(
          t('What is shown?', 'តើអ្វីត្រូវបានបង្ហាញ?'),
          'mango',
          ['banana', 'durian', '0'],
          py('fruits = ["mango", "banana", "durian"]\nprint(fruits[0])'),
        ),
        mc(
          t('What is shown?', 'តើអ្វីត្រូវបានបង្ហាញ?'),
          'durian',
          ['banana', 'mango', 'Error'],
          py('fruits = ["mango", "banana", "durian"]\nprint(fruits[2])'),
        ),
        num(
          t('What is shown?', 'តើអ្វីត្រូវបានបង្ហាញ?'),
          3,
          py('fruits = ["mango", "banana", "durian"]\nprint(len(fruits))'),
        ),
        tf(t('The first item of a list has index 1.', 'ធាតុដំបូងនៃបញ្ជីមានលិបិក្រម 1។'), false, {
          explanation: t('Counting starts at 0.', 'ការរាប់ចាប់ផ្តើមពី 0។'),
        }),
        num(
          t('What is shown?', 'តើអ្វីត្រូវបានបង្ហាញ?'),
          4,
          py('days = ["Mon", "Tue", "Wed"]\ndays.append("Thu")\nprint(len(days))'),
        ),
        num(
          t('What is shown?', 'តើអ្វីត្រូវបានបង្ហាញ?'),
          9,
          py('marks = [7, 9, 5]\nprint(marks[1])'),
        ),
        mc(
          t('Which line makes a list of three colours?', 'តើបន្ទាត់ណាបង្កើតបញ្ជីពណ៌បី?'),
          'colours = ["red", "blue", "green"]',
          ['colours = "red blue green"', 'colours = red + blue', 'colours[3]'],
        ),
        mc(
          t('What does append do?', 'តើ append ធ្វើអ្វី?'),
          t('Adds an item to the end', 'បន្ថែមធាតុនៅចុង'),
          [t('Deletes the list', 'លុបបញ្ជី'), t('Sorts the list', 'តម្រៀបបញ្ជី')],
        ),
      ],
      challenge: [
        num(
          t('What is the total?', 'តើសរុបប៉ុន្មាន?'),
          21,
          py('marks = [7, 9, 5]\ntotal = 0\nfor m in marks:\n    total = total + m\nprint(total)'),
        ),
        mc(t('What is shown?', 'តើអ្វីត្រូវបានបង្ហាញ?'), 'C', ['A', 'B', 'Error'], {
          ...py('letters = ["A", "B", "C"]\nprint(letters[-1])'),
          explanation: t('Index -1 means the last item.', 'លិបិក្រម -1 មានន័យថាធាតុចុងក្រោយ។'),
        }),
        num(
          t('How many names are shown?', 'តើឈ្មោះបង្ហាញប៉ុន្មាន?'),
          4,
          py('names = ["Dara", "Lina", "Vuthy", "Sokha"]\nfor n in names:\n    print(n)'),
        ),
        num(
          t('What is shown?', 'តើអ្វីត្រូវបានបង្ហាញ?'),
          9,
          py('nums = [3, 9, 2]\nprint(max(nums))'),
        ),
        mc(
          t('What is shown?', 'តើអ្វីត្រូវបានបង្ហាញ?'),
          '["tea", "milk"]',
          ['["milk", "tea"]', '["tea"]', 'tea milk'],
          py('drinks = ["tea"]\ndrinks.append("milk")\nprint(drinks)'),
        ),
        tf(
          t(
            'This shows an error because index 3 does not exist.',
            'នេះបង្ហាញកំហុស ព្រោះលិបិក្រម 3 មិនមាន។',
          ),
          true,
          py('pets = ["cat", "dog", "fish"]\nprint(pets[3])'),
        ),
        match(
          t(
            'Match the code to its result (nums = [4, 8, 6]).',
            'ផ្គូផ្គងកូដជាមួយលទ្ធផល (nums = [4, 8, 6])។',
          ),
          [
            ['nums[0]', '4'],
            ['len(nums)', '3'],
            ['max(nums)', '8'],
            ['nums[2]', '6'],
          ],
        ),
        typeIt(
          t('Type what is shown.', 'វាយអ្វីដែលបង្ហាញ។'),
          'Wed',
          py('days = ["Mon", "Tue", "Wed", "Thu"]\nprint(days[2])'),
        ),
      ],
      games: [
        memory(
          t(
            'Match each index to its item: ["🍎", "🍌", "🥭", "🍉"].',
            'ផ្គូផ្គងលិបិក្រមនីមួយៗជាមួយធាតុ៖ ["🍎", "🍌", "🥭", "🍉"]។',
          ),
          [
            ['[0]', '🍎'],
            ['[1]', '🍌'],
            ['[2]', '🥭'],
            ['[3]', '🍉'],
          ],
        ),
        catchIt(
          t('Catch the real Python lists!', 'ចាប់បញ្ជី Python ពិត!'),
          ['[1, 2, 3]', '["a", "b"]', '[]', '[True, False]'],
          ['(1 2 3)', '"a, b"', '{1: 2}', '1, 2, 3'],
        ),
      ],
      reward: t(
        'Lists hold whole classes, playlists and shopping lists. Nice work! 📋',
        'បញ្ជីផ្ទុកថ្នាក់ទាំងមូល បញ្ជីចម្រៀង និងបញ្ជីទិញឥវ៉ាន់។ ល្អណាស់! 📋',
      ),
    },
  ),

  // 13 ────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'debugging',
    '🐞',
    t('Debugging: Find and Fix', 'ការកែកំហុស៖ រក និងកែ'),
    t(
      'Every programmer makes mistakes. Good ones find them fast.',
      'អ្នកសរសេរកម្មវិធីគ្រប់រូបធ្វើខុស។ អ្នកពូកែរកឃើញវាលឿន។',
    ),
    {
      intro: [
        '🐞',
        t(
          'The first “computer bug” was a real moth stuck in a machine in 1947! Today a bug is any mistake in code.',
          '«bug កុំព្យូទ័រ» ដំបូងគឺជាមេអំបៅពិតជាប់ក្នុងម៉ាស៊ីនក្នុងឆ្នាំ 1947! សព្វថ្ងៃ bug គឺជាកំហុសណាមួយក្នុងកូដ។',
        ),
      ],
      learn: [
        [
          '🐞',
          t('Bug', 'កំហុសកម្មវិធី'),
          t(
            'A mistake that makes the program do the wrong thing.',
            'កំហុសដែលធ្វើឱ្យកម្មវិធីធ្វើខុស។',
          ),
          'bug',
        ],
        [
          '📝',
          t('Syntax error', 'កំហុសវាក្យសម្ព័ន្ធ'),
          t(
            'Spelling/punctuation the computer cannot read: missing ) or ".',
            'អក្ខរាវិរុទ្ធ/វណ្ណយុត្តិដែលកុំព្យូទ័រមិនអាចអាន៖ ខ្វះ ) ឬ "។',
          ),
          'syntax',
        ],
        [
          '🧠',
          t('Logic error', 'កំហុសតក្កវិជ្ជា'),
          t(
            'The code runs, but the answer is wrong (+ instead of -).',
            'កូដដំណើរការ តែចម្លើយខុស (+ ជំនួស -)។',
          ),
          'logic',
        ],
        [
          '🔎',
          t('How to debug', 'របៀបកែកំហុស'),
          t(
            'Read the error, check line by line, print values, test again.',
            'អានសារកំហុស ពិនិត្យបន្ទាត់ម្តងមួយ បង្ហាញតម្លៃ សាកម្តងទៀត។',
          ),
        ],
      ],
      see: [
        'print("Hello)\n→ SyntaxError: missing closing quote',
        t(
          'The error message tells you what and where. Read it first!',
          'សារកំហុសប្រាប់អ្នកថាអ្វី និងនៅឯណា។ អានវាជាមុនសិន!',
        ),
      ],
      words: [
        ['bug', 'កំហុសកម្មវិធី', '🐞'],
        ['debug', 'កែកំហុស'],
        ['error', 'កំហុស', '⚠️'],
        ['fix', 'ជួសជុល', '🔧'],
      ],
      play: [
        mc(
          t('What is the bug?', 'តើកំហុសគឺអ្វី?'),
          t('The closing quote " is missing', 'សញ្ញាសម្រង់បិទ " បាត់'),
          [t('print is spelled wrong', 'print ប្រកបខុស'), t('Nothing', 'គ្មានអ្វីទេ')],
          py('print("Hello)'),
        ),
        mc(
          t('What is the bug?', 'តើកំហុសគឺអ្វី?'),
          t('“pront” should be “print”', '«pront» គួរតែជា «print»'),
          [t('The quotes', 'សញ្ញាសម្រង់'), t('The brackets', 'វង់ក្រចក')],
          py('pront("Hi")'),
        ),
        mc(
          t('The goal is 10 − 3. What is the bug?', 'គោលដៅគឺ 10 − 3។ តើកំហុសគឺអ្វី?'),
          t('+ should be -', '+ គួរតែជា -'),
          [t('10 should be 3', '10 គួរតែជា 3'), t('print is wrong', 'print ខុស')],
          {
            ...py('print(10 + 3)'),
            explanation: t(
              'It runs, but gives 13: a logic error.',
              'វាដំណើរការ តែផ្តល់ 13៖ កំហុសតក្កវិជ្ជា។',
            ),
          },
        ),
        tf(
          t(
            'A logic error means the program runs but gives a wrong answer.',
            'កំហុសតក្កវិជ្ជាមានន័យថាកម្មវិធីដំណើរការ តែផ្តល់ចម្លើយខុស។',
          ),
          true,
        ),
        mc(
          t(
            'What should you do FIRST when you see an error?',
            'តើអ្នកគួរធ្វើអ្វីមុនគេពេលឃើញកំហុស?',
          ),
          t('Read the error message', 'អានសារកំហុស'),
          [t('Delete everything', 'លុបអ្វីៗទាំងអស់'), t('Turn off the computer', 'បិទកុំព្យូទ័រ')],
        ),
        mc(
          t('What is the bug?', 'តើកំហុសគឺអ្វី?'),
          t('Name and name are different (capital N)', 'Name និង name ខុសគ្នា (N ធំ)'),
          [t('Missing quotes', 'ខ្វះសញ្ញាសម្រង់'), t('Nothing', 'គ្មានអ្វីទេ')],
          py('name = "Dara"\nprint(Name)'),
        ),
        sortInto(
          t('Syntax error or logic error?', 'កំហុសវាក្យសម្ព័ន្ធ ឬកំហុសតក្កវិជ្ជា?'),
          [
            ['s', t('Syntax (cannot run)', 'វាក្យសម្ព័ន្ធ (មិនអាចដំណើរការ)'), '📝'],
            ['l', t('Logic (wrong answer)', 'តក្កវិជ្ជា (ចម្លើយខុស)'), '🧠'],
          ],
          [
            ['print("Hi"', 's'],
            ['pirnt(5)', 's'],
            ['if x > 5 print(x)', 's'],
            [t('Area = w + h', 'ក្រឡាផ្ទៃ = w + h'), 'l'],
            [t('Average = total * 3', 'មធ្យមភាគ = total * 3'), 'l'],
            [t('Price minus tax instead of plus', 'តម្លៃដកពន្ធជំនួសការបូក'), 'l'],
          ],
        ),
        tf(t('Good programmers never make bugs.', 'អ្នកសរសេរកម្មវិធីពូកែមិនដែលធ្វើកំហុស។'), false, {
          explanation: t(
            'Everyone makes bugs; good programmers test and fix them.',
            'គ្រប់គ្នាធ្វើកំហុស អ្នកពូកែសាកល្បង និងកែវា។',
          ),
        }),
      ],
      challenge: [
        mc(
          t(
            'This should show 1 to 5 but shows 1 to 4. Fix?',
            'នេះគួរបង្ហាញ 1 ដល់ 5 តែបង្ហាញ 1 ដល់ 4។ កែយ៉ាងម៉េច?',
          ),
          'range(1, 6)',
          ['range(1, 4)', 'range(0, 5)', 'range(5)'],
          py('for i in range(1, 5):\n    print(i)'),
        ),
        mc(
          t(
            'The average of 4 and 6 should be 5. What is the bug?',
            'មធ្យមភាគនៃ 4 និង 6 គួរតែជា 5។ តើកំហុសគឺអ្វី?',
          ),
          t('Missing brackets: (a + b) / 2', 'ខ្វះវង់ក្រចក៖ (a + b) / 2'),
          [t('a should be 5', 'a គួរតែជា 5'), t('/ should be *', '/ គួរតែជា *')],
          {
            ...py('a = 4\nb = 6\nprint(a + b / 2)'),
            explanation: t(
              'b / 2 happens first, so it shows 7.0.',
              'b / 2 កើតឡើងមុន ដូច្នេះវាបង្ហាញ 7.0។',
            ),
          },
        ),
        mc(
          t(
            'This is meant to say “Pass” for 50 or more. What is the bug?',
            'នេះគួរនិយាយ «Pass» សម្រាប់ 50 ឬច្រើនជាងនេះ។ តើកំហុសគឺអ្វី?',
          ),
          t('> should be >=', '> គួរតែជា >='),
          [t('50 should be 5', '50 គួរតែជា 5'), t('print should be say', 'print គួរតែជា say')],
          py('score = 50\nif score > 50:\n    print("Pass")'),
        ),
        num(
          t('Debug by hand: what does this show?', 'កែកំហុសដោយដៃ៖ តើនេះបង្ហាញអ្វី?'),
          6,
          py('x = 2\nx = x + 1\nx = x * 2\nprint(x)'),
        ),
        order(t('Order the steps of debugging.', 'តម្រៀបជំហាននៃការកែកំហុស។'), [
          t('Read the error message', 'អានសារកំហុស'),
          t('Find the line', 'រកបន្ទាត់'),
          t('Fix the mistake', 'កែកំហុស'),
          t('Run it again to test', 'ដំណើរការម្តងទៀតដើម្បីសាកល្បង'),
        ]),
        mc(
          t('What is the bug?', 'តើកំហុសគឺអ្វី?'),
          t(
            'The inside line needs spaces in front (indent)',
            'បន្ទាត់ខាងក្នុងត្រូវការដកឃ្លានៅមុខ (ចូលបន្ទាត់)',
          ),
          [t('if must be IF', 'if ត្រូវតែជា IF'), t('Nothing', 'គ្មានអ្វីទេ')],
          py('if True:\nprint("yes")'),
        ),
        tf(
          t(
            'Printing a variable’s value is a good way to find a bug.',
            'ការបង្ហាញតម្លៃអថេរជាវិធីល្អក្នុងការរកកំហុស។',
          ),
          true,
        ),
        buildSentence(
          t('Build the debugging rule.', 'បង្កើតច្បាប់កែកំហុស។'),
          'Test your code after every change.',
          { say: 'Test your code after every change.' },
        ),
      ],
      games: [
        robot(
          t(
            'Debug the route: avoid the walls to reach the flag.',
            'កែកំហុសផ្លូវ៖ ជៀសជញ្ជាំងដើម្បីទៅដល់ទង់។',
          ),
          ['S.#...', '.#..#.', '...#..', '#.#..G'],
        ),
        catchIt(
          t('Catch the lines WITH a bug!', 'ចាប់បន្ទាត់ដែលមានកំហុស!'),
          ['print("Hi"', 'pirnt(5)', 'print(Hello")', 'for i in range(3)'],
          ['print("Hi")', 'print(5)', 'x = 10', 'for i in range(3):'],
          { speed: 'slow' },
        ),
      ],
      reward: t(
        'Bug hunter! 🐞 Finding mistakes is a real programmer’s superpower.',
        'អ្នកប្រមាញ់កំហុស! 🐞 ការរកកំហុសគឺជាថាមពលពិសេសរបស់អ្នកសរសេរកម្មវិធីពិត។',
      ),
    },
  ),

  // 14 ────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'flowcharts',
    '🔷',
    t('Flowcharts & Pseudocode', 'គំនូសតាងលំហូរ និងកូដក្លែង'),
    t('Plan your program before you write it.', 'គ្រោងកម្មវិធីមុនពេលសរសេរវា។'),
    {
      intro: [
        '🔷',
        t(
          'Builders draw a plan before they build a house. Programmers draw flowcharts!',
          'អ្នកសាងសង់គូរប្លង់មុនសាងសង់ផ្ទះ។ អ្នកសរសេរកម្មវិធីគូរគំនូសតាងលំហូរ!',
        ),
      ],
      learn: [
        [
          '⭕',
          t('Start / End', 'ចាប់ផ្តើម/បញ្ចប់'),
          t(
            'A rounded shape (oval) begins and ends the chart.',
            'រូបរាងមូល (រាងពងក្រពើ) ចាប់ផ្តើម និងបញ្ចប់គំនូស។',
          ),
          'flowchart',
        ],
        [
          '▭',
          t('Process', 'ដំណើរការ'),
          t('A rectangle is a step: “add 1 to score”.', 'ចតុកោណកែងគឺជាជំហាន៖ «បូក 1 ទៅពិន្ទុ»។'),
        ],
        [
          '🔷',
          t('Decision', 'ការសម្រេចចិត្ត'),
          t(
            'A diamond asks a yes/no question, with two arrows out.',
            'រាងពេជ្រសួរសំណួរ បាទ/ទេ មានព្រួញចេញពីរ។',
          ),
          'decision',
        ],
        [
          '📝',
          t('Pseudocode', 'កូដក្លែង'),
          t(
            'Plain words that look like code: IF raining THEN take umbrella.',
            'ពាក្យធម្មតាដែលមើលទៅដូចកូដ៖ IF ភ្លៀង THEN យកឆ័ត្រ។',
          ),
          'pseudocode',
        ],
      ],
      see: [
        t(
          'START → get age → ◇ age ≥ 13? → yes: "Welcome" / no: "Ask a parent" → END',
          'START → យកអាយុ → ◇ អាយុ ≥ 13? → បាទ៖ "Welcome" / ទេ៖ "សួរឪពុកម្តាយ" → END',
        ),
        t(
          'A flowchart shows every path the program can take.',
          'គំនូសតាងលំហូរបង្ហាញផ្លូវទាំងអស់ដែលកម្មវិធីអាចទៅ។',
        ),
      ],
      words: [
        ['flowchart', 'គំនូសតាងលំហូរ'],
        ['decision', 'ការសម្រេចចិត្ត', '🔷'],
        ['arrow', 'ព្រួញ', '➡️'],
        ['plan', 'ផែនការ', '📝'],
      ],
      play: [
        mc(
          t('Which shape asks a yes/no question?', 'តើរូបរាងណាសួរសំណួរ បាទ/ទេ?'),
          t('Diamond', 'រាងពេជ្រ'),
          [t('Rectangle', 'ចតុកោណកែង'), t('Oval', 'រាងពងក្រពើ')],
        ),
        mc(
          t('Which shape is a normal step (process)?', 'តើរូបរាងណាជាជំហានធម្មតា (ដំណើរការ)?'),
          t('Rectangle', 'ចតុកោណកែង'),
          [t('Diamond', 'រាងពេជ្រ'), t('Oval', 'រាងពងក្រពើ')],
        ),
        mc(
          t(
            'Which shape starts and ends a flowchart?',
            'តើរូបរាងណាចាប់ផ្តើម និងបញ្ចប់គំនូសតាងលំហូរ?',
          ),
          t('Oval', 'រាងពងក្រពើ'),
          [t('Diamond', 'រាងពេជ្រ'), t('Arrow', 'ព្រួញ')],
        ),
        tf(
          t(
            'A decision diamond has two ways out: yes and no.',
            'រាងពេជ្រការសម្រេចចិត្តមានផ្លូវចេញពីរ៖ បាទ និងទេ។',
          ),
          true,
        ),
        tf(
          t(
            'Pseudocode must be typed exactly like Python.',
            'កូដក្លែងត្រូវតែវាយដូច Python យ៉ាងពិតប្រាកដ។',
          ),
          false,
          {
            explanation: t(
              'It is plain words to plan; any language can come later.',
              'វាជាពាក្យធម្មតាសម្រាប់គ្រោង ភាសាណាក៏បានមកក្រោយ។',
            ),
          },
        ),
        order(
          t(
            'Order the flowchart for “make toast”.',
            'តម្រៀបគំនូសតាងលំហូរសម្រាប់ «ធ្វើនំបុ័ងអាំង»។',
          ),
          [
            t('Start', 'ចាប់ផ្តើម'),
            t('Put bread in toaster', 'ដាក់នំបុ័ងក្នុងម៉ាស៊ីនអាំង'),
            t('Wait until brown', 'រង់ចាំរហូតដល់ពណ៌ត្នោត'),
            t('Take it out', 'យកវាចេញ'),
            t('End', 'បញ្ចប់'),
          ],
        ),
        mc(
          t(
            'In “IF raining THEN take umbrella”, what is the decision?',
            'ក្នុង «IF ភ្លៀង THEN យកឆ័ត្រ» តើការសម្រេចចិត្តគឺអ្វី?',
          ),
          t('Is it raining?', 'តើភ្លៀងទេ?'),
          [t('Take umbrella', 'យកឆ័ត្រ'), t('THEN', 'THEN')],
        ),
        match(t('Match the shape to its job.', 'ផ្គូផ្គងរូបរាងជាមួយតួនាទី។'), [
          [t('Oval ⬭', 'រាងពងក្រពើ ⬭'), t('Start or end', 'ចាប់ផ្តើម ឬបញ្ចប់')],
          [t('Rectangle ▭', 'ចតុកោណកែង ▭'), t('Do a step', 'ធ្វើជំហាន')],
          [t('Diamond ◇', 'រាងពេជ្រ ◇'), t('Ask yes/no', 'សួរ បាទ/ទេ')],
          [t('Arrow →', 'ព្រួញ →'), t('Go to the next shape', 'ទៅរូបរាងបន្ទាប់')],
        ]),
      ],
      challenge: [
        mc(
          t(
            'Flowchart: START → x = 4 → ◇ x > 3? yes → show "big", no → show "small". What is shown?',
            'គំនូស៖ START → x = 4 → ◇ x > 3? បាទ → បង្ហាញ "big" ទេ → បង្ហាញ "small"។ តើអ្វីបង្ហាញ?',
          ),
          'big',
          ['small', 'big small', '4'],
        ),
        mc(
          t(
            'Pseudocode: SET n TO 2. REPEAT 3 TIMES: n = n × 2. SHOW n. What is shown?',
            'កូដក្លែង៖ SET n TO 2។ REPEAT 3 TIMES: n = n × 2។ SHOW n។ តើអ្វីបង្ហាញ?',
          ),
          '16',
          ['8', '6', '12'],
          { explanation: t('2 → 4 → 8 → 16.', '2 → 4 → 8 → 16។') },
        ),
        order(
          t(
            'Order the pseudocode to check a password.',
            'តម្រៀបកូដក្លែងដើម្បីពិនិត្យពាក្យសម្ងាត់។',
          ),
          [
            'ASK for the password',
            'IF it matches THEN',
            '    SHOW "Welcome"',
            'ELSE',
            '    SHOW "Try again"',
          ],
        ),
        tf(
          t(
            'A flowchart can contain a loop (an arrow going back up).',
            'គំនូសតាងលំហូរអាចមានរង្វិលជុំ (ព្រួញត្រឡប់ឡើងលើ)។',
          ),
          true,
        ),
        mc(
          t('Which pseudocode finds if a number is even?', 'តើកូដក្លែងណារកថាលេខជាលេខគូ?'),
          'IF number MOD 2 = 0 THEN even',
          ['IF number > 2 THEN even', 'IF number = 0 THEN even', 'REPEAT number TIMES'],
        ),
        num(
          t(
            'Pseudocode: total = 0. FOR each price in [500, 1000, 1500]: total = total + price. What is total?',
            'កូដក្លែង៖ total = 0។ FOR តម្លៃនីមួយៗក្នុង [500, 1000, 1500]: total = total + តម្លៃ។ total ប៉ុន្មាន?',
          ),
          3000,
        ),
        mc(
          t('Why plan with a flowchart first?', 'ហេតុអ្វីគ្រោងជាមួយគំនូសតាងលំហូរជាមុន?'),
          t('To find problems before writing code', 'ដើម្បីរកបញ្ហាមុនពេលសរសេរកូដ'),
          [
            t('Computers run flowcharts', 'កុំព្យូទ័រដំណើរការគំនូស'),
            t('It is faster than thinking', 'វាលឿនជាងការគិត'),
          ],
        ),
        buildSentence(
          t('Build the pseudocode line.', 'បង្កើតបន្ទាត់កូដក្លែង។'),
          'IF it is raining THEN take an umbrella',
          { say: 'If it is raining, then take an umbrella.' },
        ),
      ],
      games: [
        memory(t('Match the flowchart shape to its name.', 'ផ្គូផ្គងរូបរាងគំនូសជាមួយឈ្មោះ។'), [
          ['⬭', t('Start / End', 'ចាប់ផ្តើម/បញ្ចប់')],
          ['▭', t('Process', 'ដំណើរការ')],
          ['◇', t('Decision', 'ការសម្រេចចិត្ត')],
          ['→', t('Flow (arrow)', 'លំហូរ (ព្រួញ)')],
        ]),
        robot(
          t(
            'Follow the plan: go around the lake to reach the flag.',
            'ធ្វើតាមផែនការ៖ ដើរជុំវិញបឹងទៅដល់ទង់។',
          ),
          ['S...', '.##.', '.##.', '...G'],
        ),
      ],
      reward: t(
        'Plan first, code second — that is how professionals work! 🔷',
        'គ្រោងមុន សរសេរកូដក្រោយ — នោះជារបៀបដែលអ្នកជំនាញធ្វើការ! 🔷',
      ),
    },
  ),

  // 15 ────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'my-first-program',
    '🏆',
    t('My First Real Program', 'កម្មវិធីពិតដំបូងរបស់ខ្ញុំ'),
    t(
      'Put it all together: input, variables, if, loops.',
      'ដាក់ទាំងអស់បញ្ចូលគ្នា៖ ធាតុចូល អថេរ if រង្វិលជុំ។',
    ),
    {
      intro: [
        '🏆',
        t(
          'You know sequences, variables, decisions, loops and functions. Let’s read a whole program!',
          'អ្នកស្គាល់លំដាប់ អថេរ ការសម្រេចចិត្ត រង្វិលជុំ និងអនុគមន៍។ តោះអានកម្មវិធីពេញលេញ!',
        ),
      ],
      learn: [
        [
          '⌨️',
          'input',
          t(
            'name = input("Your name? ") waits for the user to type.',
            'name = input("Your name? ") រង់ចាំអ្នកប្រើវាយ។',
          ),
          'input',
        ],
        [
          '🔢',
          'int()',
          t(
            'input gives text; int() turns "13" into the number 13.',
            'input ផ្តល់អត្ថបទ int() ប្តូរ "13" ទៅជាលេខ 13។',
          ),
        ],
        [
          '🧩',
          t('Put together', 'ដាក់បញ្ចូលគ្នា'),
          t(
            'Ask → store → decide → repeat → show. That is a program!',
            'សួរ → រក្សាទុក → សម្រេច → ធ្វើម្តងទៀត → បង្ហាញ។ នោះជាកម្មវិធី!',
          ),
        ],
      ],
      see: [
        'name = input("Name? ")\nage = int(input("Age? "))\nif age >= 13:\n    print("Welcome, " + name)\nelse:\n    print("Hi " + name + ", ask a parent")',
        t('The answer changes with what the user types.', 'ចម្លើយប្តូរតាមអ្វីដែលអ្នកប្រើវាយ។'),
      ],
      words: [
        ['input', 'ធាតុចូល', '⌨️'],
        ['output', 'លទ្ធផលចេញ', '🖥️'],
        ['user', 'អ្នកប្រើ', '🙂'],
        ['program', 'កម្មវិធី'],
      ],
      play: [
        mc(
          t('What does input() do?', 'តើ input() ធ្វើអ្វី?'),
          t('Waits for the user to type something', 'រង់ចាំអ្នកប្រើវាយអ្វីមួយ'),
          [t('Prints a message', 'បង្ហាញសារ'), t('Deletes a file', 'លុបឯកសារ')],
        ),
        mc(
          t('The user types Dara. What is shown?', 'អ្នកប្រើវាយ Dara។ តើអ្វីត្រូវបានបង្ហាញ?'),
          'Hello Dara',
          ['Hello name', 'Dara', 'Hello'],
          py('name = input("Name? ")\nprint("Hello " + name)'),
        ),
        mc(
          t('Why use int() here?', 'ហេតុអ្វីប្រើ int() នៅទីនេះ?'),
          t('To turn the typed text into a number', 'ដើម្បីប្តូរអត្ថបទដែលវាយទៅជាលេខ'),
          [t('To print it', 'ដើម្បីបង្ហាញវា'), t('To make it text', 'ដើម្បីធ្វើឱ្យវាជាអត្ថបទ')],
          py('age = int(input("Age? "))'),
        ),
        mc(
          t('The user types 15. What is shown?', 'អ្នកប្រើវាយ 15។ តើអ្វីត្រូវបានបង្ហាញ?'),
          'Welcome!',
          ['Too young', 'Welcome! Too young'],
          py(
            'age = int(input("Age? "))\nif age >= 13:\n    print("Welcome!")\nelse:\n    print("Too young")',
          ),
        ),
        num(
          t('The user types 4. What is shown?', 'អ្នកប្រើវាយ 4។ តើអ្វីត្រូវបានបង្ហាញ?'),
          16,
          py('n = int(input("Number? "))\nprint(n * n)'),
        ),
        tf(
          t('Without int(), "5" + "5" would give 55.', 'បើគ្មាន int() "5" + "5" នឹងផ្តល់ 55។'),
          true,
        ),
        num(
          t(
            'The user types 3. How many lines of “*” are shown?',
            'អ្នកប្រើវាយ 3។ តើបន្ទាត់ «*» បង្ហាញប៉ុន្មាន?',
          ),
          3,
          py('n = int(input("How many? "))\nfor i in range(n):\n    print("*")'),
        ),
        mc(
          t('In a program, “output” is…', 'ក្នុងកម្មវិធី «output» គឺ…'),
          t('what the program shows or gives back', 'អ្វីដែលកម្មវិធីបង្ហាញ ឬផ្តល់ត្រឡប់'),
          [t('what the user types', 'អ្វីដែលអ្នកប្រើវាយ'), t('a bug', 'កំហុស')],
        ),
      ],
      challenge: [
        num(
          t(
            'The user types 2 then 5. What is shown?',
            'អ្នកប្រើវាយ 2 រួច 5។ តើអ្វីត្រូវបានបង្ហាញ?',
          ),
          7,
          py('a = int(input())\nb = int(input())\nprint(a + b)'),
        ),
        mc(
          t(
            'The user types 2 then 5 (no int). What is shown?',
            'អ្នកប្រើវាយ 2 រួច 5 (គ្មាន int)។ តើអ្វីត្រូវបានបង្ហាញ?',
          ),
          '25',
          ['7', '2 5', 'Error'],
          py('a = input()\nb = input()\nprint(a + b)'),
        ),
        mc(
          t(
            'A quiz program. The user types Phnom Penh. What is shown?',
            'កម្មវិធីសំណួរ។ អ្នកប្រើវាយ Phnom Penh។ តើអ្វីត្រូវបានបង្ហាញ?',
          ),
          'Correct!',
          ['Try again', 'Phnom Penh'],
          py(
            'answer = input("Capital of Cambodia? ")\nif answer == "Phnom Penh":\n    print("Correct!")\nelse:\n    print("Try again")',
          ),
        ),
        num(
          t('The user types 3. What is the total?', 'អ្នកប្រើវាយ 3។ តើសរុបប៉ុន្មាន?'),
          6,
          py(
            'n = int(input())\ntotal = 0\nfor i in range(1, n + 1):\n    total = total + i\nprint(total)',
          ),
        ),
        order(
          t('Order the lines of a tip calculator.', 'តម្រៀបបន្ទាត់នៃម៉ាស៊ីនគណនាទឹកប្រាក់បន្ថែម។'),
          ['bill = int(input("Bill? "))', 'tip = bill * 10 / 100', 'print("Tip:", tip)'],
        ),
        mc(
          t(
            'Which part is the DECISION in this program?',
            'តើផ្នែកណាជាការសម្រេចចិត្តក្នុងកម្មវិធីនេះ?',
          ),
          'if guess == 7:',
          ['guess = int(input())', 'print("You win!")'],
          py('guess = int(input("Guess 1-10: "))\nif guess == 7:\n    print("You win!")'),
        ),
        sortInto(
          t('Input, decision or output?', 'ធាតុចូល ការសម្រេចចិត្ត ឬលទ្ធផល?'),
          [
            ['i', 'Input', '⌨️'],
            ['d', t('Decision', 'ការសម្រេចចិត្ត'), '🔀'],
            ['o', 'Output', '🖥️'],
          ],
          [
            ['input("Name? ")', 'i'],
            ['if age >= 13:', 'd'],
            ['print("Welcome")', 'o'],
            ['int(input())', 'i'],
            ['else:', 'd'],
            ['print(total)', 'o'],
          ],
        ),
        buildSentence(
          t('Build the big idea.', 'បង្កើតគំនិតធំ។'),
          'A program takes input and gives output.',
          { say: 'A program takes input and gives output.' },
        ),
      ],
      games: [
        memory(t('Match the concept to its Python word.', 'ផ្គូផ្គងគំនិតជាមួយពាក្យ Python។'), [
          [t('Ask the user', 'សួរអ្នកប្រើ'), 'input()'],
          [t('Show', 'បង្ហាញ'), 'print()'],
          [t('Decide', 'សម្រេចចិត្ត'), 'if'],
          [t('Repeat', 'ធ្វើម្តងទៀត'), 'for'],
        ]),
        catchIt(
          t(
            'Catch every part of a real program you learned!',
            'ចាប់គ្រប់ផ្នែកនៃកម្មវិធីពិតដែលអ្នកបានរៀន!',
          ),
          ['variable', 'if / else', 'for loop', 'function', 'list'],
          [t('photo filter', 'តម្រងរូបថត'), t('pencil', 'ខ្មៅដៃ'), t('mango', 'ស្វាយ')],
        ),
      ],
      reward: t(
        '🏆 You are a programmer now! Next stop: real projects in Python or Scratch.',
        '🏆 ឥឡូវអ្នកជាអ្នកសរសេរកម្មវិធី! ចំណតបន្ទាប់៖ គម្រោងពិតក្នុង Python ឬ Scratch។',
      ),
    },
  ),
];
