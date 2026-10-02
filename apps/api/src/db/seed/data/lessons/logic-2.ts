import { t, type LessonSeed } from '../../types';
import {
  intro,
  learn,
  lesson,
  match,
  mc,
  num,
  order,
  revealChallenge,
  revealPlay,
  reward,
  see,
  sortInto,
  tf,
} from '../dsl';
import { LOGIC_WORLD as W } from './logic-1';

// 🧩 Logic Playground, lessons 9–15. Khmer (km) strings are DRAFTS for native review.

export const LOGIC_LESSONS_2: LessonSeed[] = [
  lesson(
    W,
    'step-by-step-algorithms',
    '🪜',
    t('Algorithms: Step by Step', 'ក្បួនដោះស្រាយ៖ ម្តងមួយជំហាន'),
    t('Clear instructions in the right order.', 'ការណែនាំច្បាស់លាស់ តាមលំដាប់ត្រឹមត្រូវ។'),
    12,
    [
      intro(
        '🪜',
        t(
          'An algorithm is a list of steps to do a job. Every app you use is made of algorithms!',
          'ក្បួនដោះស្រាយ គឺជាបញ្ជីជំហានដើម្បីធ្វើការងារមួយ។ កម្មវិធីគ្រប់មួយដែលអ្នកប្រើ ត្រូវបានបង្កើតពីក្បួនដោះស្រាយ!',
        ),
      ),
      learn(
        [
          '1️⃣',
          t('Order matters', 'លំដាប់សំខាន់'),
          t(
            'Put on socks, THEN shoes — not the other way!',
            'ពាក់ស្រោមជើង រួចទើបពាក់ស្បែកជើង — មិនមែនផ្ទុយពីនេះទេ!',
          ),
        ],
        [
          '🎯',
          t('Be exact', 'ត្រូវច្បាស់លាស់'),
          t(
            '“Walk 3 steps forward” is better than “walk a bit”.',
            '“ដើរទៅមុខ 3 ជំហាន” ល្អជាង “ដើរបន្តិច”។',
          ),
        ],
      ),
      see(
        '1. Open app → 2. Type message → 3. Tap Send',
        t('Three clear steps to send a message.', 'ជំហានច្បាស់បីដើម្បីផ្ញើសារ។'),
      ),
      revealPlay(
        'ordering',
        order(t('Brush your teeth: put the steps in order.', 'ដុសធ្មេញ៖ តម្រៀបជំហាន។'), [
          t('Wet the toothbrush', 'ធ្វើឱ្យច្រាសសើម'),
          t('Put on toothpaste', 'ដាក់ថ្នាំដុសធ្មេញ'),
          t('Brush for 2 minutes', 'ដុសរយៈពេល 2 នាទី'),
          t('Rinse your mouth', 'ខ្ពុរមាត់'),
        ]),
        order(t('Send an email: put the steps in order.', 'ផ្ញើអ៊ីមែល៖ តម្រៀបជំហាន។'), [
          t('Open your email app', 'បើកកម្មវិធីអ៊ីមែល'),
          t('Tap “Compose”', 'ចុច “សរសេរ”'),
          t('Type the address and message', 'វាយអាសយដ្ឋាន និងសារ'),
          t('Tap “Send”', 'ចុច “ផ្ញើ”'),
        ]),
        order(t('Plant a seed: put the steps in order.', 'ដាំគ្រាប់ពូជ៖ តម្រៀបជំហាន។'), [
          t('Dig a small hole', 'ជីករណ្តៅតូចមួយ'),
          t('Put the seed in', 'ដាក់គ្រាប់ពូជចូល'),
          t('Cover it with soil', 'គ្របវាដោយដី'),
          t('Water it', 'ស្រោចទឹក'),
        ]),
        order(t('Turn on a computer and write a document.', 'បើកកុំព្យូទ័រ ហើយសរសេរឯកសារ។'), [
          t('Press the power button', 'ចុចប៊ូតុងថាមពល'),
          t('Log in', 'ចូលគណនី'),
          t('Open Word', 'បើក Word'),
          t('Type your text', 'វាយអត្ថបទ'),
          t('Save the file', 'រក្សាទុកឯកសារ'),
        ]),
        mc(
          t('What is an algorithm?', 'តើក្បួនដោះស្រាយគឺជាអ្វី?'),
          t('A list of steps to do a task', 'បញ្ជីជំហានដើម្បីធ្វើកិច្ចការ'),
          [t('A type of computer', 'ប្រភេទកុំព្យូទ័រ'), t('A kind of music', 'ប្រភេទតន្ត្រី')],
        ),
        mc(
          t('Which instruction is the clearest?', 'តើការណែនាំណាច្បាស់ជាងគេ?'),
          t('Walk 10 steps forward, then turn left.', 'ដើរទៅមុខ 10 ជំហាន រួចបត់ឆ្វេង។'),
          [
            t('Walk a bit, then turn.', 'ដើរបន្តិច រួចបត់។'),
            t('Go somewhere over there.', 'ទៅកន្លែងណាមួយនៅទីនោះ។'),
          ],
        ),
        mc(
          t(
            'Making rice: what comes right after washing the rice?',
            'ការដាំបាយ៖ តើអ្វីមកភ្លាមៗបន្ទាប់ពីលាងអង្ករ?',
          ),
          t('Add water to the pot', 'ចាក់ទឹកចូលឆ្នាំង'),
          [t('Eat the rice', 'ញ៉ាំបាយ'), t('Buy the rice', 'ទិញអង្ករ')],
        ),
        tf(
          t(
            'In an algorithm, the order of the steps never matters.',
            'ក្នុងក្បួនដោះស្រាយ លំដាប់ជំហានមិនដែលសំខាន់ទេ។',
          ),
          false,
          {
            explanation: t(
              'Shoes before socks doesn’t work!',
              'ពាក់ស្បែកជើងមុនស្រោមជើង មិនដំណើរការទេ!',
            ),
          },
        ),
        num(
          t(
            'A robot moves 2 steps, then 3 steps, then 4 steps. How many steps in total?',
            'រ៉ូបូតមួយដើរ 2 ជំហាន រួច 3 ជំហាន រួច 4 ជំហាន។ តើសរុបប៉ុន្មានជំហាន?',
          ),
          9,
        ),
        mc(
          t('A recipe is a kind of…', 'រូបមន្តធ្វើម្ហូប គឺជាប្រភេទ…'),
          t('algorithm', 'ក្បួនដោះស្រាយ'),
          [t('computer', 'កុំព្យូទ័រ'), t('game', 'ល្បែង')],
          {
            explanation: t('It is a list of steps in order.', 'វាជាបញ្ជីជំហានតាមលំដាប់។'),
          },
        ),
      ),
      revealChallenge(
        'ordering',
        order(t('Make a phone call: put the steps in order.', 'ហៅទូរស័ព្ទ៖ តម្រៀបជំហាន។'), [
          t('Unlock the phone', 'ដោះសោទូរស័ព្ទ'),
          t('Open Contacts', 'បើកបញ្ជីទំនាក់ទំនង'),
          t('Choose a name', 'ជ្រើសរើសឈ្មោះ'),
          t('Tap Call', 'ចុច ហៅ'),
        ]),
        order(
          t(
            'Find the biggest of 3 numbers: put the steps in order.',
            'រកលេខធំបំផុតក្នុងចំណោមលេខ 3៖ តម្រៀបជំហាន។',
          ),
          [
            t('Remember the first number as “biggest”', 'ចងចាំលេខទីមួយជា “ធំបំផុត”'),
            t('Compare it with the second; keep the bigger', 'ប្រៀបធៀបជាមួយលេខទីពីរ រក្សាលេខធំជាង'),
            t('Compare it with the third; keep the bigger', 'ប្រៀបធៀបជាមួយលេខទីបី រក្សាលេខធំជាង'),
            t('Say the “biggest” number', 'និយាយលេខ “ធំបំផុត”'),
          ],
        ),
        order(t('Wash your hands: put the steps in order.', 'លាងដៃ៖ តម្រៀបជំហាន។'), [
          t('Wet your hands', 'ធ្វើឱ្យដៃសើម'),
          t('Use soap', 'ប្រើសាប៊ូ'),
          t('Scrub for 20 seconds', 'ដុសរយៈពេល 20 វិនាទី'),
          t('Rinse', 'លាងជម្រះ'),
          t('Dry your hands', 'ជូតដៃឱ្យស្ងួត'),
        ]),
        num(
          t(
            'Algorithm: start with 5. Add 3. Double it. What is the result?',
            'ក្បួន៖ ចាប់ផ្តើមពី 5។ បូក 3។ គុណពីរ។ តើលទ្ធផលគឺជាអ្វី?',
          ),
          16,
          { explanation: t('5 + 3 = 8, then 8 × 2 = 16.', '5 + 3 = 8 រួច 8 × 2 = 16។') },
        ),
        num(
          t(
            'Algorithm: start with 20. Take away 4. Divide by 2. What is the result?',
            'ក្បួន៖ ចាប់ផ្តើមពី 20។ ដក 4។ ចែក 2។ តើលទ្ធផលគឺជាអ្វី?',
          ),
          8,
          { explanation: t('20 − 4 = 16, then 16 ÷ 2 = 8.', '20 − 4 = 16 រួច 16 ÷ 2 = 8។') },
        ),
        num(
          t(
            'Start with 3. Double it. Double it again. Add 1. Result?',
            'ចាប់ផ្តើមពី 3។ គុណពីរ។ គុណពីរម្តងទៀត។ បូក 1។ លទ្ធផល?',
          ),
          13,
          { explanation: t('3 → 6 → 12 → 13.', '3 → 6 → 12 → 13។') },
        ),
        mc(
          t(
            'A robot is told: “Go forward 2, turn right, go forward 1.” Which steps does it do first?',
            'រ៉ូបូតត្រូវបានប្រាប់៖ “ទៅមុខ 2 បត់ស្តាំ ទៅមុខ 1។” តើវាធ្វើជំហានណាមុន?',
          ),
          t('Go forward 2', 'ទៅមុខ 2'),
          [t('Turn right', 'បត់ស្តាំ'), t('Go forward 1', 'ទៅមុខ 1')],
        ),
        tf(
          t(
            'Two different algorithms can solve the same problem.',
            'ក្បួនដោះស្រាយពីរផ្សេងគ្នា អាចដោះស្រាយបញ្ហាដូចគ្នាបាន។',
          ),
          true,
          {
            explanation: t(
              'There is often more than one way — like different routes to school.',
              'ជាញឹកញាប់មានវិធីច្រើនជាងមួយ — ដូចផ្លូវផ្សេងៗទៅសាលា។',
            ),
          },
        ),
        mc(
          t(
            'Which step is missing? 1. Fill the kettle  2. ___  3. Pour the hot water',
            'ជំហានណាបាត់? 1. ចាក់ទឹកចូលកំសៀវ  2. ___  3. ចាក់ទឹកក្តៅ',
          ),
          t('Boil the water', 'ដាំទឹកឱ្យពុះ'),
          [t('Drink the tea', 'ផឹកតែ'), t('Wash the cup', 'លាងពែង')],
        ),
        mc(
          t(
            'To find a word in a dictionary, the smart algorithm is…',
            'ដើម្បីរកពាក្យក្នុងវចនានុក្រម ក្បួនឆ្លាតគឺ…',
          ),
          t(
            'Open near the right letter, then go forwards or backwards',
            'បើកជិតអក្សរត្រឹមត្រូវ រួចទៅមុខ ឬថយក្រោយ',
          ),
          [
            t('Read every page from the start', 'អានគ្រប់ទំព័រពីដើម'),
            t('Open a random page and stop', 'បើកទំព័រចៃដន្យ ហើយឈប់'),
          ],
          {
            explanation: t(
              'Using alphabetical order is much faster.',
              'ការប្រើលំដាប់អក្សរក្រមលឿនជាងច្រើន។',
            ),
          },
        ),
        tf(
          t(
            'A computer can guess what you meant if your steps are unclear.',
            'កុំព្យូទ័រអាចទាយអ្វីដែលអ្នកចង់បាន បើជំហានរបស់អ្នកមិនច្បាស់។',
          ),
          false,
          {
            explanation: t(
              'Computers do exactly what they are told — so steps must be clear.',
              'កុំព្យូទ័រធ្វើតាមពិតប្រាកដនូវអ្វីដែលគេប្រាប់ — ដូច្នេះជំហានត្រូវតែច្បាស់។',
            ),
          },
        ),
      ),
      reward(t('Algorithm builder! 🪜', 'អ្នកបង្កើតក្បួនដោះស្រាយ! 🪜')),
    ],
  ),

  lesson(
    W,
    'loops-and-repeats',
    '🔁',
    t('Loops & Repeats', 'រង្វិលជុំ និងការធ្វើម្តងទៀត'),
    t('Do it again — the smart way.', 'ធ្វើម្តងទៀត — តាមរបៀបឆ្លាតវៃ។'),
    12,
    [
      intro(
        '🔁',
        t(
          'Instead of writing “jump” 10 times, programmers write “repeat 10 times: jump”. That’s a loop!',
          'ជំនួសឱ្យការសរសេរ “លោត” 10 ដង អ្នកសរសេរកម្មវិធីសរសេរ “ធ្វើម្តងទៀត 10 ដង៖ លោត”។ នោះគឺជារង្វិលជុំ!',
        ),
      ),
      learn(
        [
          '🔢',
          t('Repeat N times', 'ធ្វើម្តងទៀត N ដង'),
          t('repeat 3: clap 👏 → 👏👏👏', 'ធ្វើម្តងទៀត 3៖ ទះដៃ 👏 → 👏👏👏'),
        ],
        [
          '⏹️',
          t('Repeat until…', 'ធ្វើម្តងទៀតរហូតដល់…'),
          t('Keep pouring UNTIL the glass is full.', 'បន្តចាក់ រហូតដល់កែវពេញ។'),
        ],
      ),
      see('repeat 4: ⭐  →  ⭐⭐⭐⭐', t('One instruction, four stars.', 'ការណែនាំមួយ ផ្កាយបួន។')),
      revealPlay(
        'multiple_choice',
        mc(
          t('repeat 3: 🐸 — what do you get?', 'ធ្វើម្តងទៀត 3៖ 🐸 — តើអ្នកទទួលបានអ្វី?'),
          '🐸🐸🐸',
          ['🐸', '🐸🐸', '🐸🐸🐸🐸'],
        ),
        mc(
          t('repeat 2: 🔴🔵 — what do you get?', 'ធ្វើម្តងទៀត 2៖ 🔴🔵 — តើអ្នកទទួលបានអ្វី?'),
          '🔴🔵🔴🔵',
          ['🔴🔴🔵🔵', '🔴🔵', '🔵🔴🔵🔴'],
        ),
        num(
          t(
            'repeat 5: add 2 to the score. The score starts at 0. What is it at the end?',
            'ធ្វើម្តងទៀត 5៖ បូក 2 ទៅពិន្ទុ។ ពិន្ទុចាប់ផ្តើមពី 0។ តើចុងក្រោយស្មើប៉ុន្មាន?',
          ),
          10,
          {
            explanation: t('5 × 2 = 10.', '5 × 2 = 10។'),
          },
        ),
        num(
          t(
            'repeat 4: step forward 3. How many steps in total?',
            'ធ្វើម្តងទៀត 4៖ ដើរទៅមុខ 3។ តើសរុបប៉ុន្មានជំហាន?',
          ),
          12,
        ),
        mc(
          t('Which is a loop?', 'តើមួយណាជារង្វិលជុំ?'),
          t('Stir the soup 10 times', 'កូរស៊ុប 10 ដង'),
          [t('Open the door', 'បើកទ្វារ'), t('Say hello once', 'និយាយសួស្តីម្តង')],
        ),
        mc(
          t('Which is shorter to write?', 'តើមួយណាសរសេរខ្លីជាង?'),
          t('repeat 8: jump', 'ធ្វើម្តងទៀត 8៖ លោត'),
          [t('jump jump jump jump jump jump jump jump', 'លោត លោត លោត លោត លោត លោត លោត លោត')],
        ),
        num(
          t(
            'repeat 3: (repeat 2: clap). How many claps?',
            'ធ្វើម្តងទៀត 3៖ (ធ្វើម្តងទៀត 2៖ ទះដៃ)។ តើទះដៃប៉ុន្មានដង?',
          ),
          6,
          {
            explanation: t(
              'A loop inside a loop: 3 × 2 = 6.',
              'រង្វិលជុំក្នុងរង្វិលជុំ៖ 3 × 2 = 6។',
            ),
          },
        ),
        mc(
          t(
            '“Keep walking UNTIL you reach the door.” When do you stop?',
            '“បន្តដើររហូតដល់ទ្វារ។” តើអ្នកឈប់ពេលណា?',
          ),
          t('When you reach the door', 'ពេលដល់ទ្វារ'),
          [t('After 1 step', 'បន្ទាប់ពី 1 ជំហាន'), t('Never', 'មិនដែលឈប់')],
        ),
        num(
          t(
            'Start at 10. repeat 3: subtract 2. What is left?',
            'ចាប់ផ្តើមពី 10។ ធ្វើម្តងទៀត 3៖ ដក 2។ តើនៅសល់ប៉ុន្មាន?',
          ),
          4,
          {
            explanation: t('10 → 8 → 6 → 4.', '10 → 8 → 6 → 4។'),
          },
        ),
        tf(
          t(
            'A loop with no way to stop can run forever.',
            'រង្វិលជុំដែលគ្មានវិធីឈប់ អាចដំណើរការជារៀងរហូត។',
          ),
          true,
          {
            explanation: t(
              'That’s called an infinite loop — a common bug!',
              'វាហៅថារង្វិលជុំគ្មានទីបញ្ចប់ — ជាកំហុសញឹកញាប់!',
            ),
          },
        ),
      ),
      revealChallenge(
        'multiple_choice',
        num(
          t(
            'Start at 1. repeat 4: double it. What is the number?',
            'ចាប់ផ្តើមពី 1។ ធ្វើម្តងទៀត 4៖ គុណពីរ។ តើលេខស្មើប៉ុន្មាន?',
          ),
          16,
          {
            explanation: t('1 → 2 → 4 → 8 → 16.', '1 → 2 → 4 → 8 → 16។'),
          },
        ),
        num(
          t(
            'repeat 2: (repeat 3: draw ⭐). How many stars?',
            'ធ្វើម្តងទៀត 2៖ (ធ្វើម្តងទៀត 3៖ គូរ ⭐)។ តើមានផ្កាយប៉ុន្មាន?',
          ),
          6,
        ),
        num(
          t(
            'repeat 5: (repeat 4: tap). How many taps?',
            'ធ្វើម្តងទៀត 5៖ (ធ្វើម្តងទៀត 4៖ ចុច)។ តើចុចប៉ុន្មានដង?',
          ),
          20,
        ),
        mc(
          t(
            'To draw a square, a robot can do: repeat ? : (forward 10, turn right)',
            'ដើម្បីគូរការេ រ៉ូបូតអាចធ្វើ៖ ធ្វើម្តងទៀត ? ៖ (ទៅមុខ 10 បត់ស្តាំ)',
          ),
          '4',
          ['3', '2', '10'],
          {
            explanation: t('A square has 4 sides and 4 corners.', 'ការេមាន 4 ជ្រុង និង 4 កែង។'),
          },
        ),
        mc(
          t(
            'To draw a triangle: repeat ? : (forward, turn)',
            'ដើម្បីគូរត្រីកោណ៖ ធ្វើម្តងទៀត ? ៖ (ទៅមុខ បត់)',
          ),
          '3',
          ['4', '6', '1'],
        ),
        num(
          t(
            'Count = 0. repeat until Count = 7: add 1. How many times does the loop run?',
            'ចំនួន = 0។ ធ្វើម្តងទៀតរហូតដល់ ចំនួន = 7៖ បូក 1។ តើរង្វិលជុំដំណើរការប៉ុន្មានដង?',
          ),
          7,
        ),
        num(
          t(
            'Money = $0. repeat 12: save $3. How much money?',
            'លុយ = $0។ ធ្វើម្តងទៀត 12៖ សន្សំ $3។ តើមានលុយប៉ុន្មាន?',
          ),
          36,
          {
            explanation: t('12 × $3 = $36.', '12 × $3 = $36។'),
          },
        ),
        mc(
          t(
            'Which needs a loop “repeat UNTIL”, not “repeat 5 times”?',
            'តើមួយណាត្រូវការរង្វិល “ធ្វើម្តងទៀតរហូតដល់” មិនមែន “ធ្វើម្តងទៀត 5 ដង”?',
          ),
          t('Keep trying the password until it is right', 'បន្តសាកពាក្យសម្ងាត់រហូតដល់ត្រូវ'),
          [t('Clap five times', 'ទះដៃប្រាំដង'), t('Say hello 5 times', 'និយាយសួស្តី 5 ដង')],
          {
            explanation: t(
              'You don’t know in advance how many tries it takes.',
              'អ្នកមិនដឹងជាមុនថាត្រូវការសាកប៉ុន្មានដងទេ។',
            ),
          },
        ),
        tf(
          t('“repeat 3: say Hi” prints Hi Hi Hi.', '“ធ្វើម្តងទៀត 3៖ និយាយ Hi” បង្ហាញ Hi Hi Hi។'),
          true,
        ),
        num(
          t(
            'Start with 100. repeat 4: divide by 2. Result?',
            'ចាប់ផ្តើមពី 100។ ធ្វើម្តងទៀត 4៖ ចែក 2។ លទ្ធផល?',
          ),
          6.25,
          {
            explanation: t('100 → 50 → 25 → 12.5 → 6.25.', '100 → 50 → 25 → 12.5 → 6.25។'),
          },
        ),
        mc(
          t(
            'Pattern 🟡🟣🟡🟣🟡🟣🟡🟣 is best written as…',
            'លំនាំ 🟡🟣🟡🟣🟡🟣🟡🟣 សរសេរបានល្អបំផុតជា…',
          ),
          t('repeat 4: 🟡🟣', 'ធ្វើម្តងទៀត 4៖ 🟡🟣'),
          [t('repeat 8: 🟡🟣', 'ធ្វើម្តងទៀត 8៖ 🟡🟣'), t('repeat 4: 🟡', 'ធ្វើម្តងទៀត 4៖ 🟡')],
        ),
      ),
      reward(t('Loop legend! 🔁', 'អ្នកពូកែរង្វិលជុំ! 🔁')),
    ],
  ),

  lesson(
    W,
    'find-the-bug',
    '🐞',
    t('Find the Bug', 'រកកំហុស'),
    t('Spot the mistake in the steps.', 'រកកំហុសក្នុងជំហាន។'),
    12,
    [
      intro(
        '🐞',
        t(
          'A “bug” is a mistake in instructions. Finding bugs — debugging — is a top IT skill!',
          '“Bug” គឺជាកំហុសក្នុងការណែនាំ។ ការរកកំហុស — debugging — គឺជាជំនាញ IT កំពូល!',
        ),
      ),
      learn(
        [
          '👣',
          t('Follow every step', 'ធ្វើតាមគ្រប់ជំហាន'),
          t(
            'Pretend you are the computer. Do exactly what it says.',
            'ធ្វើពុតជាកុំព្យូទ័រ។ ធ្វើតាមពិតប្រាកដនូវអ្វីដែលវាប្រាប់។',
          ),
        ],
        [
          '🔎',
          t('Where does it go wrong?', 'តើវាខុសនៅត្រង់ណា?'),
          t('Find the first step that gives the wrong result.', 'រកជំហានដំបូងដែលផ្តល់លទ្ធផលខុស។'),
        ],
      ),
      see(
        '1. Pour milk  2. Open the carton  ❌',
        t('Bug: you must open the carton before pouring.', 'កំហុស៖ អ្នកត្រូវបើកប្រអប់មុនពេលចាក់។'),
      ),
      revealPlay(
        'multiple_choice',
        mc(
          t(
            'Find the bug: 1. Put on shoes 2. Put on socks 3. Walk',
            'រកកំហុស៖ 1. ពាក់ស្បែកជើង 2. ពាក់ស្រោមជើង 3. ដើរ',
          ),
          t('Steps 1 and 2 are swapped', 'ជំហាន 1 និង 2 ច្រាសគ្នា'),
          [t('Step 3 is wrong', 'ជំហាន 3 ខុស'), t('There is no bug', 'គ្មានកំហុសទេ')],
        ),
        mc(
          t('Find the bug: “2 + 2 = 5”', 'រកកំហុស៖ “2 + 2 = 5”'),
          t('The answer should be 4', 'ចម្លើយគួរតែ 4'),
          [t('The + should be −', '+ គួរតែជា −'), t('There is no bug', 'គ្មានកំហុសទេ')],
        ),
        mc(
          t(
            'Find the bug: 1. Type the message 2. Tap Send 3. Open the chat',
            'រកកំហុស៖ 1. វាយសារ 2. ចុចផ្ញើ 3. បើកការជជែក',
          ),
          t('Open the chat should be first', 'បើកការជជែកគួរតែមកមុនគេ'),
          [
            t('Tap Send should be first', 'ចុចផ្ញើគួរតែមកមុនគេ'),
            t('There is no bug', 'គ្មានកំហុសទេ'),
          ],
        ),
        mc(
          t(
            'A program should count 1 to 5 but shows 1 2 3 4. What is the bug?',
            'កម្មវិធីមួយគួររាប់ 1 ដល់ 5 ប៉ុន្តែបង្ហាញ 1 2 3 4។ តើកំហុសគឺជាអ្វី?',
          ),
          t('It stops one number too early', 'វាឈប់មុនមួយលេខ'),
          [
            t('It starts at the wrong number', 'វាចាប់ផ្តើមនៅលេខខុស'),
            t('It counts backwards', 'វារាប់ថយក្រោយ'),
          ],
        ),
        mc(
          t(
            '“To make a square: repeat 3: (forward, turn right)”. What happens?',
            '“ដើម្បីបង្កើតការេ៖ ធ្វើម្តងទៀត 3៖ (ទៅមុខ បត់ស្តាំ)”។ តើមានអ្វីកើតឡើង?',
          ),
          t('One side is missing', 'ខ្វះជ្រុងមួយ'),
          [t('A perfect square', 'ការេល្អឥតខ្ចោះ'), t('A circle', 'រង្វង់')],
          {
            explanation: t('A square needs repeat 4.', 'ការេត្រូវការធ្វើម្តងទៀត 4។'),
          },
        ),
        mc(
          t(
            'Total of $2 + $3 + $4 is written as $8. Where is the bug?',
            'សរុប $2 + $3 + $4 ត្រូវបានសរសេរ $8។ តើកំហុសនៅឯណា?',
          ),
          t('The total should be $9', 'សរុបគួរតែ $9'),
          [t('$3 should be $4', '$3 គួរតែ $4'), t('No bug', 'គ្មានកំហុស')],
        ),
        tf(
          t(
            '“IF age > 18 THEN adult.” Is an 18-year-old called an adult by this rule?',
            '“បើអាយុ > 18 នោះមនុស្សពេញវ័យ។” តើអ្នកអាយុ 18 ឆ្នាំត្រូវបានហៅថាមនុស្សពេញវ័យតាមច្បាប់នេះទេ?',
          ),
          false,
          {
            explanation: t(
              '18 is not more than 18. The bug: it should be ≥ 18.',
              '18 មិនធំជាង 18 ទេ។ កំហុស៖ វាគួរតែជា ≥ 18។',
            ),
          },
        ),
        mc(
          t(
            'Find the bug: 1. Save the file 2. Type your essay 3. Close Word',
            'រកកំហុស៖ 1. រក្សាទុកឯកសារ 2. វាយអត្ថបទ 3. បិទ Word',
          ),
          t(
            'You save before typing, so the essay is lost',
            'អ្នករក្សាទុកមុនពេលវាយ ដូច្នេះអត្ថបទបាត់',
          ),
          [t('Closing Word is wrong', 'ការបិទ Word ខុស'), t('No bug', 'គ្មានកំហុស')],
        ),
        mc(
          t(
            'A robot should go 3 squares right. The code says: right, right, left. Where does it end?',
            'រ៉ូបូតគួរទៅស្តាំ 3 ការេ។ កូដថា៖ ស្តាំ ស្តាំ ឆ្វេង។ តើវាបញ្ចប់នៅឯណា?',
          ),
          t('1 square right', 'ស្តាំ 1 ការេ'),
          [t('3 squares right', 'ស្តាំ 3 ការេ'), t('Back at the start', 'ត្រឡប់ទៅចំណុចចាប់ផ្តើម')],
          {
            explanation: t(
              'Right 2, then left 1 = right 1. The last “left” is the bug.',
              'ស្តាំ 2 រួចឆ្វេង 1 = ស្តាំ 1។ “ឆ្វេង” ចុងក្រោយគឺជាកំហុស។',
            ),
          },
        ),
        tf(
          t(
            'A good way to find a bug is to follow the steps one by one.',
            'វិធីល្អដើម្បីរកកំហុស គឺធ្វើតាមជំហានម្តងមួយៗ។',
          ),
          true,
        ),
      ),
      revealChallenge(
        'multiple_choice',
        mc(
          t(
            'Average of 4 and 6 is written as (4 + 6) ÷ 3 = 3.3. The bug?',
            'មធ្យមភាគនៃ 4 និង 6 ត្រូវបានសរសេរ (4 + 6) ÷ 3 = 3.3។ កំហុស?',
          ),
          t('Divide by 2, not 3', 'ចែកនឹង 2 មិនមែន 3'),
          [t('Add 4 + 6 twice', 'បូក 4 + 6 ពីរដង'), t('No bug', 'គ្មានកំហុស')],
          {
            explanation: t('Two numbers → divide by 2: 10 ÷ 2 = 5.', 'លេខពីរ → ចែក 2៖ 10 ÷ 2 = 5។'),
          },
        ),
        mc(
          t(
            '“repeat 10: print Hi” printed Hi only once. The most likely bug?',
            '“ធ្វើម្តងទៀត 10៖ បង្ហាញ Hi” បានបង្ហាញ Hi តែម្តង។ កំហុសដែលទំនងបំផុត?',
          ),
          t('The print is outside the loop', 'ការបង្ហាញនៅក្រៅរង្វិលជុំ'),
          [t('10 is too big', '10 ធំពេក'), t('Hi is spelled wrong', 'Hi សរសេរខុស')],
        ),
        mc(
          t(
            'A shop app adds 10% tax but $10 becomes $20. The bug?',
            'កម្មវិធីហាងបូកពន្ធ 10% ប៉ុន្តែ $10 ក្លាយជា $20។ កំហុស?',
          ),
          t('It added 100% instead of 10%', 'វាបូក 100% ជំនួស 10%'),
          [t('$10 is the wrong price', '$10 ជាតម្លៃខុស'), t('No bug', 'គ្មានកំហុស')],
          {
            explanation: t(
              '10% of $10 is $1, so it should be $11.',
              '10% នៃ $10 គឺ $1 ដូច្នេះគួរតែ $11។',
            ),
          },
        ),
        mc(
          t(
            'Login should allow 3 tries but locks after 1. Which rule has the bug?',
            'ការចូលគួរអនុញ្ញាតឱ្យសាក 3 ដង ប៉ុន្តែចាក់សោបន្ទាប់ពី 1 ដង។ តើច្បាប់ណាមានកំហុស?',
          ),
          t('IF wrong tries ≥ 1 THEN lock', 'បើសាកខុស ≥ 1 នោះចាក់សោ'),
          [
            t('IF wrong tries ≥ 3 THEN lock', 'បើសាកខុស ≥ 3 នោះចាក់សោ'),
            t('IF password correct THEN open', 'បើពាក្យសម្ងាត់ត្រឹមត្រូវ នោះបើក'),
          ],
        ),
        tf(
          t(
            'Sorted list: 2, 5, 9, 7, 11. Is this sorted correctly?',
            'បញ្ជីដែលបានតម្រៀប៖ 2, 5, 9, 7, 11។ តើតម្រៀបត្រឹមត្រូវទេ?',
          ),
          false,
          {
            explanation: t('9 should come after 7.', '9 គួរតែមកក្រោយ 7។'),
          },
        ),
        mc(
          t(
            'Directions to the shop: “left, left, left, left”. What happens?',
            'ទិសដៅទៅហាង៖ “ឆ្វេង ឆ្វេង ឆ្វេង ឆ្វេង”។ តើមានអ្វីកើតឡើង?',
          ),
          t('You walk in a circle back to the start', 'អ្នកដើរជារង្វង់ត្រឡប់ទៅចំណុចចាប់ផ្តើម'),
          [t('You reach the shop', 'អ្នកទៅដល់ហាង'), t('You go straight', 'អ្នកទៅត្រង់')],
        ),
        num(
          t(
            'Code: x = 5; x = x + 2; x = x × 2. A student says x = 12. What is the real answer?',
            'កូដ៖ x = 5; x = x + 2; x = x × 2។ សិស្សម្នាក់និយាយថា x = 12។ តើចម្លើយពិតគឺអ្វី?',
          ),
          14,
          {
            explanation: t('5 + 2 = 7, then 7 × 2 = 14.', '5 + 2 = 7 រួច 7 × 2 = 14។'),
          },
        ),
        mc(
          t(
            'An alarm should ring at 6:00 AM but rings at 6:00 PM. The bug?',
            'នាឡិការោទ៍គួររោទ៍ម៉ោង 6:00 ព្រឹក ប៉ុន្តែរោទ៍ម៉ោង 6:00 ល្ងាច។ កំហុស?',
          ),
          t('AM and PM are mixed up', 'ព្រឹក និងល្ងាចច្រឡំគ្នា'),
          [t('6 should be 7', '6 គួរតែ 7'), t('No bug', 'គ្មានកំហុស')],
        ),
        mc(
          t(
            'Recipe: 1. Bake the cake 2. Mix the flour and eggs 3. Eat. The fix?',
            'រូបមន្ត៖ 1. ដុតនំ 2. លាយម្សៅ និងពង 3. ញ៉ាំ។ ការកែ?',
          ),
          t('Swap steps 1 and 2', 'ប្តូរជំហាន 1 និង 2'),
          [t('Remove step 3', 'លុបជំហាន 3'), t('Add more eggs', 'បន្ថែមពង')],
        ),
        tf(t('Programmers never make bugs.', 'អ្នកសរសេរកម្មវិធីមិនដែលធ្វើកំហុសទេ។'), false, {
          explanation: t(
            'Everyone makes bugs! Good programmers test and fix them.',
            'អ្នករាល់គ្នាធ្វើកំហុស! អ្នកសរសេរកម្មវិធីល្អសាកល្បង ហើយកែវា។',
          ),
        }),
        mc(
          t(
            'Best first thing to do when your code doesn’t work?',
            'អ្វីល្អបំផុតដែលត្រូវធ្វើមុនគេ ពេលកូដរបស់អ្នកមិនដំណើរការ?',
          ),
          t(
            'Read the steps carefully and test small parts',
            'អានជំហានដោយប្រុងប្រយ័ត្ន ហើយសាកល្បងផ្នែកតូចៗ',
          ),
          [t('Delete everything', 'លុបអ្វីៗទាំងអស់'), t('Give up', 'បោះបង់')],
        ),
      ),
      reward(t('Bug hunter! 🐞', 'អ្នកប្រមាញ់កំហុស! 🐞')),
    ],
  ),

  lesson(
    W,
    'sorting-and-grouping',
    '🗂️',
    t('Sorting & Grouping', 'ការតម្រៀប និងការដាក់ជាក្រុម'),
    t('Put things where they belong.', 'ដាក់របស់នៅកន្លែងដែលវាគួរនៅ។'),
    12,
    [
      intro(
        '🗂️',
        t(
          'Folders, shopping lists, contacts — grouping things makes them easy to find.',
          'ថតឯកសារ បញ្ជីទិញឥវ៉ាន់ ទំនាក់ទំនង — ការដាក់ជាក្រុមធ្វើឱ្យងាយរក។',
        ),
      ),
      learn(
        [
          '🏷️',
          t('Choose a rule', 'ជ្រើសរើសច្បាប់'),
          t('Group by colour, size, type or use.', 'ដាក់ជាក្រុមតាមពណ៌ ទំហំ ប្រភេទ ឬការប្រើប្រាស់។'),
        ],
        [
          '✅',
          t('Every item gets one place', 'របស់នីមួយៗមានកន្លែងមួយ'),
          t('Check each item against the rule.', 'ពិនិត្យរបស់នីមួយៗជាមួយច្បាប់។'),
        ],
      ),
      see(
        '🍎🍌 | 🥕🥦',
        t('Fruits on one side, vegetables on the other.', 'ផ្លែឈើម្ខាង បន្លែម្ខាងទៀត។'),
      ),
      revealPlay(
        'drag_drop',
        sortInto(
          t('Sort into fruits and vegetables.', 'តម្រៀបជាផ្លែឈើ និងបន្លែ។'),
          [
            ['fruit', t('Fruit', 'ផ្លែឈើ'), '🍎'],
            ['veg', t('Vegetable', 'បន្លែ'), '🥕'],
          ],
          [
            [t('Mango', 'ស្វាយ'), 'fruit'],
            [t('Cabbage', 'ស្ពៃ'), 'veg'],
            [t('Banana', 'ចេក'), 'fruit'],
            [t('Carrot', 'ការ៉ុត'), 'veg'],
          ],
        ),
        sortInto(
          t('Sort the numbers: even or odd?', 'តម្រៀបលេខ៖ គូ ឬសេស?'),
          [
            ['even', t('Even', 'គូ')],
            ['odd', t('Odd', 'សេស')],
          ],
          [
            ['4', 'even'],
            ['7', 'odd'],
            ['10', 'even'],
            ['13', 'odd'],
            ['22', 'even'],
          ],
        ),
        sortInto(
          t('Input or output device?', 'ឧបករណ៍បញ្ចូល ឬបញ្ចេញ?'),
          [
            ['in', t('Input', 'បញ្ចូល'), '⌨️'],
            ['out', t('Output', 'បញ្ចេញ'), '🖥️'],
          ],
          [
            [t('Keyboard', 'ក្តារចុច'), 'in'],
            [t('Speaker', 'ឧបករណ៍បំពងសំឡេង'), 'out'],
            [t('Mouse', 'កណ្តុរ'), 'in'],
            [t('Printer', 'ម៉ាស៊ីនបោះពុម្ព'), 'out'],
          ],
        ),
        sortInto(
          t('Animals: land or water?', 'សត្វ៖ គោក ឬទឹក?'),
          [
            ['land', t('Land', 'គោក'), '🌳'],
            ['water', t('Water', 'ទឹក'), '🌊'],
          ],
          [
            [t('Fish', 'ត្រី'), 'water'],
            [t('Elephant', 'ដំរី'), 'land'],
            [t('Dolphin', 'ផ្សោត'), 'water'],
            [t('Cow', 'គោ'), 'land'],
          ],
        ),
        sortInto(
          t('Bigger or smaller than 50?', 'ធំជាង ឬតូចជាង 50?'),
          [
            ['big', t('More than 50', 'ធំជាង 50')],
            ['small', t('Less than 50', 'តូចជាង 50')],
          ],
          [
            ['12', 'small'],
            ['75', 'big'],
            ['49', 'small'],
            ['51', 'big'],
            ['100', 'big'],
          ],
        ),
        mc(
          t('Which group does “Excel” belong to?', 'តើ “Excel” ស្ថិតក្នុងក្រុមណា?'),
          t('Office apps', 'កម្មវិធី Office'),
          [t('Animals', 'សត្វ'), t('Fruits', 'ផ្លែឈើ')],
        ),
        mc(
          t('Best folder for “holiday_photo.jpg”?', 'ថតដែលល្អបំផុតសម្រាប់ “holiday_photo.jpg”?'),
          t('Pictures', 'រូបភាព'),
          [t('Music', 'តន្ត្រី'), t('Documents', 'ឯកសារ')],
        ),
        mc(
          t('Which pair belongs in the same group?', 'តើគូណាស្ថិតក្នុងក្រុមដូចគ្នា?'),
          t('Cat and dog', 'ឆ្មា និងឆ្កែ'),
          [t('Cat and car', 'ឆ្មា និងឡាន'), t('Dog and spoon', 'ឆ្កែ និងស្លាបព្រា')],
        ),
        tf(
          t(
            'A tomato could go in the “red things” group.',
            'ប៉េងប៉ោះអាចស្ថិតក្នុងក្រុម “របស់ពណ៌ក្រហម”។',
          ),
          true,
        ),
        mc(
          t(
            'You group 12 pencils into boxes of 4. How many boxes?',
            'អ្នកដាក់ខ្មៅដៃ 12 ដើមក្នុងប្រអប់ ប្រអប់មួយ 4 ដើម។ តើមានប៉ុន្មានប្រអប់?',
          ),
          '3',
          ['4', '8', '2'],
        ),
      ),
      revealChallenge(
        'drag_drop',
        sortInto(
          t('Which file type?', 'ប្រភេទឯកសារណា?'),
          [
            ['pic', t('Picture', 'រូបភាព'), '🖼️'],
            ['music', t('Music', 'តន្ត្រី'), '🎵'],
            ['doc', t('Document', 'ឯកសារ'), '📄'],
          ],
          [
            ['beach.jpg', 'pic'],
            ['song.mp3', 'music'],
            ['letter.docx', 'doc'],
            ['logo.png', 'pic'],
            ['notes.pdf', 'doc'],
          ],
        ),
        sortInto(
          t(
            'Safe to share online or keep private?',
            'សុវត្ថិភាពក្នុងការចែករំលែកតាមអនឡាញ ឬរក្សាជាឯកជន?',
          ),
          [
            ['share', t('OK to share', 'អាចចែករំលែកបាន')],
            ['private', t('Keep private', 'រក្សាជាឯកជន'), '🔒'],
          ],
          [
            [t('Your favourite colour', 'ពណ៌ដែលអ្នកចូលចិត្ត'), 'share'],
            [t('Your password', 'ពាក្យសម្ងាត់របស់អ្នក'), 'private'],
            [t('Your home address', 'អាសយដ្ឋានផ្ទះរបស់អ្នក'), 'private'],
            [t('A drawing you made', 'គំនូរដែលអ្នកគូរ'), 'share'],
          ],
        ),
        sortInto(
          t('Multiples of 3 or not?', 'ពហុគុណនៃ 3 ឬមិនមែន?'),
          [
            ['yes', t('Multiple of 3', 'ពហុគុណនៃ 3')],
            ['no', t('Not a multiple of 3', 'មិនមែនពហុគុណនៃ 3')],
          ],
          [
            ['9', 'yes'],
            ['14', 'no'],
            ['21', 'yes'],
            ['25', 'no'],
            ['30', 'yes'],
          ],
        ),
        sortInto(
          t('Hardware or software?', 'ផ្នែករឹង ឬផ្នែកទន់?'),
          [
            ['hw', t('Hardware', 'ផ្នែករឹង'), '🔧'],
            ['sw', t('Software', 'ផ្នែកទន់'), '💿'],
          ],
          [
            [t('Monitor', 'ម៉ូនីទ័រ'), 'hw'],
            [t('Chrome browser', 'កម្មវិធី Chrome'), 'sw'],
            [t('Keyboard', 'ក្តារចុច'), 'hw'],
            [t('Word', 'Word'), 'sw'],
          ],
        ),
        match(t('Match each item to its group.', 'ផ្គូផ្គងរបស់នីមួយៗទៅក្រុមរបស់វា។'), [
          [t('Hammer', 'ញញួរ'), t('Tool', 'ឧបករណ៍')],
          [t('Shirt', 'អាវ'), t('Clothes', 'សម្លៀកបំពាក់')],
          [t('Rice', 'អង្ករ'), t('Food', 'អាហារ')],
        ]),
        mc(
          t(
            'Sort by size: which group is “medium”? 🐜 🐈 🐘',
            'តម្រៀបតាមទំហំ៖ តើមួយណា “មធ្យម”? 🐜 🐈 🐘',
          ),
          '🐈',
          ['🐜', '🐘'],
        ),
        num(
          t(
            '30 students go into 5 equal teams. How many in each team?',
            'សិស្ស 30 នាក់ចែកជា 5 ក្រុមស្មើគ្នា។ តើក្រុមមួយមានប៉ុន្មាននាក់?',
          ),
          6,
        ),
        mc(
          t('Contacts are usually sorted by…', 'បញ្ជីទំនាក់ទំនងជាធម្មតាតម្រៀបតាម…'),
          t('Name, A to Z', 'ឈ្មោះ ពី A ដល់ Z'),
          [t('Height', 'កម្ពស់'), t('Favourite food', 'ម្ហូបដែលចូលចិត្ត')],
        ),
        tf(
          t(
            'One item can belong to two groups, like a red apple in “fruit” and “red things”.',
            'របស់មួយអាចស្ថិតក្នុងក្រុមពីរ ដូចជាប៉ោមក្រហមក្នុង “ផ្លែឈើ” និង “របស់ពណ៌ក្រហម”។',
          ),
          true,
        ),
        mc(
          t('What rule groups these? 2, 4, 6, 8', 'តើច្បាប់អ្វីដាក់ទាំងនេះជាក្រុម? 2, 4, 6, 8'),
          t('Even numbers', 'លេខគូ'),
          [t('Odd numbers', 'លេខសេស'), t('Numbers over 10', 'លេខលើស 10')],
        ),
        mc(
          t('What rule groups these? 🚗 🚌 🚲 🛵', 'តើច្បាប់អ្វីដាក់ទាំងនេះជាក្រុម? 🚗 🚌 🚲 🛵'),
          t('Things with wheels', 'របស់ដែលមានកង់'),
          [t('Things that fly', 'របស់ដែលហោះ'), t('Animals', 'សត្វ')],
        ),
      ),
      reward(t('Super sorter! 🗂️', 'អ្នកតម្រៀបពូកែ! 🗂️')),
    ],
  ),

  lesson(
    W,
    'calendar-logic',
    '📅',
    t('Calendar Logic', 'តក្កវិជ្ជាប្រតិទិន'),
    t('Days, weeks and months puzzles.', 'ល្បែងថ្ងៃ សប្តាហ៍ និងខែ។'),
    11,
    [
      intro(
        '📅',
        t(
          'When is the exam? How many days until the holiday? Calendar logic helps you plan.',
          'ពេលណាប្រឡង? នៅសល់ប៉ុន្មានថ្ងៃទៀតដល់ថ្ងៃឈប់សម្រាក? តក្កវិជ្ជាប្រតិទិនជួយអ្នករៀបចំផែនការ។',
        ),
      ),
      learn(
        [
          '7️⃣',
          t('7 days in a week', '7 ថ្ងៃក្នុងមួយសប្តាហ៍'),
          t(
            'Monday → Tuesday → … → Sunday → Monday again.',
            'ច័ន្ទ → អង្គារ → … → អាទិត្យ → ច័ន្ទម្តងទៀត។',
          ),
        ],
        [
          '🗓️',
          t('Count forward', 'រាប់ទៅមុខ'),
          t('7 days later is the same weekday.', '7 ថ្ងៃក្រោយគឺជាថ្ងៃដដែលនៃសប្តាហ៍។'),
        ],
      ),
      see(
        'Mon + 3 days = Thu',
        t('Tue (1), Wed (2), Thu (3).', 'អង្គារ (1) ពុធ (2) ព្រហស្បតិ៍ (3)។'),
      ),
      revealPlay(
        'multiple_choice',
        mc(
          t(
            'Today is Monday. What day is it in 2 days?',
            'ថ្ងៃនេះថ្ងៃច័ន្ទ។ តើ 2 ថ្ងៃទៀតជាថ្ងៃអ្វី?',
          ),
          t('Wednesday', 'ពុធ'),
          [t('Tuesday', 'អង្គារ'), t('Thursday', 'ព្រហស្បតិ៍')],
        ),
        mc(
          t(
            'Today is Friday. What day was it yesterday?',
            'ថ្ងៃនេះថ្ងៃសុក្រ។ តើម្សិលមិញជាថ្ងៃអ្វី?',
          ),
          t('Thursday', 'ព្រហស្បតិ៍'),
          [t('Saturday', 'សៅរ៍'), t('Wednesday', 'ពុធ')],
        ),
        mc(
          t(
            'Today is Saturday. What day is it in 2 days?',
            'ថ្ងៃនេះថ្ងៃសៅរ៍។ តើ 2 ថ្ងៃទៀតជាថ្ងៃអ្វី?',
          ),
          t('Monday', 'ច័ន្ទ'),
          [t('Sunday', 'អាទិត្យ'), t('Tuesday', 'អង្គារ')],
        ),
        mc(
          t(
            'Today is Wednesday. What day is it in 7 days?',
            'ថ្ងៃនេះថ្ងៃពុធ។ តើ 7 ថ្ងៃទៀតជាថ្ងៃអ្វី?',
          ),
          t('Wednesday', 'ពុធ'),
          [t('Thursday', 'ព្រហស្បតិ៍'), t('Tuesday', 'អង្គារ')],
        ),
        num(t('How many days are in a week?', 'តើមួយសប្តាហ៍មានប៉ុន្មានថ្ងៃ?'), 7),
        num(t('How many months are in a year?', 'តើមួយឆ្នាំមានប៉ុន្មានខែ?'), 12),
        mc(t('Which month comes after April?', 'តើខែណាមកបន្ទាប់ពីខែមេសា?'), t('May', 'ឧសភា'), [
          t('March', 'មីនា'),
          t('June', 'មិថុនា'),
        ]),
        mc(
          t('Which month has the fewest days?', 'តើខែណាមានថ្ងៃតិចជាងគេ?'),
          t('February', 'កុម្ភៈ'),
          [t('January', 'មករា'), t('April', 'មេសា')],
        ),
        num(t('How many days are in 2 weeks?', 'តើ 2 សប្តាហ៍មានប៉ុន្មានថ្ងៃ?'), 14),
        mc(
          t(
            'Today is Tuesday. What day was it 3 days ago?',
            'ថ្ងៃនេះថ្ងៃអង្គារ។ តើ 3 ថ្ងៃមុនជាថ្ងៃអ្វី?',
          ),
          t('Saturday', 'សៅរ៍'),
          [t('Sunday', 'អាទិត្យ'), t('Friday', 'សុក្រ')],
          {
            explanation: t(
              'Monday (1), Sunday (2), Saturday (3).',
              'ច័ន្ទ (1) អាទិត្យ (2) សៅរ៍ (3)។',
            ),
          },
        ),
      ),
      revealChallenge(
        'multiple_choice',
        mc(
          t(
            'Today is Thursday. What day is it in 10 days?',
            'ថ្ងៃនេះថ្ងៃព្រហស្បតិ៍។ តើ 10 ថ្ងៃទៀតជាថ្ងៃអ្វី?',
          ),
          t('Sunday', 'អាទិត្យ'),
          [t('Saturday', 'សៅរ៍'), t('Monday', 'ច័ន្ទ')],
          {
            explanation: t(
              '7 days → Thursday again, then 3 more → Sunday.',
              '7 ថ្ងៃ → ព្រហស្បតិ៍ម្តងទៀត រួច 3 ថ្ងៃទៀត → អាទិត្យ។',
            ),
          },
        ),
        num(
          t(
            'The holiday starts in 3 weeks and 2 days. How many days is that?',
            'ថ្ងៃឈប់សម្រាកចាប់ផ្តើមក្នុងរយៈពេល 3 សប្តាហ៍ និង 2 ថ្ងៃ។ តើស្មើប៉ុន្មានថ្ងៃ?',
          ),
          23,
        ),
        num(
          t(
            'January 1st is day 1 of the year. What day number is February 1st?',
            'ថ្ងៃទី 1 ខែមករា គឺថ្ងៃទី 1 នៃឆ្នាំ។ តើថ្ងៃទី 1 ខែកុម្ភៈ ជាថ្ងៃទីប៉ុន្មាន?',
          ),
          32,
          {
            explanation: t(
              'January has 31 days, so Feb 1 is day 32.',
              'ខែមករាមាន 31 ថ្ងៃ ដូច្នេះថ្ងៃទី 1 កុម្ភៈ គឺថ្ងៃទី 32។',
            ),
          },
        ),
        mc(
          t(
            'The 1st of a month is a Monday. What day is the 8th?',
            'ថ្ងៃទី 1 នៃខែជាថ្ងៃច័ន្ទ។ តើថ្ងៃទី 8 ជាថ្ងៃអ្វី?',
          ),
          t('Monday', 'ច័ន្ទ'),
          [t('Tuesday', 'អង្គារ'), t('Sunday', 'អាទិត្យ')],
        ),
        mc(
          t(
            'The 1st of a month is a Monday. What day is the 15th?',
            'ថ្ងៃទី 1 នៃខែជាថ្ងៃច័ន្ទ។ តើថ្ងៃទី 15 ជាថ្ងៃអ្វី?',
          ),
          t('Monday', 'ច័ន្ទ'),
          [t('Friday', 'សុក្រ'), t('Wednesday', 'ពុធ')],
          {
            explanation: t(
              '1st, 8th, 15th, 22nd, 29th are all Mondays.',
              'ថ្ងៃទី 1, 8, 15, 22, 29 សុទ្ធតែជាថ្ងៃច័ន្ទ។',
            ),
          },
        ),
        num(
          t(
            'Class meets every Monday and Wednesday. How many classes in 4 weeks?',
            'ថ្នាក់រៀនរៀងរាល់ថ្ងៃច័ន្ទ និងថ្ងៃពុធ។ តើក្នុង 4 សប្តាហ៍មានប៉ុន្មានថ្នាក់?',
          ),
          8,
        ),
        mc(
          t(
            'Dara’s birthday is the day after tomorrow. Today is Friday. When is his birthday?',
            'ខួបកំណើតដារ៉ាគឺថ្ងៃខានស្អែក។ ថ្ងៃនេះថ្ងៃសុក្រ។ តើខួបកំណើតគាត់ថ្ងៃណា?',
          ),
          t('Sunday', 'អាទិត្យ'),
          [t('Saturday', 'សៅរ៍'), t('Monday', 'ច័ន្ទ')],
        ),
        num(
          t(
            'How many days are in a normal year (not a leap year)?',
            'តើឆ្នាំធម្មតា (មិនមែនឆ្នាំអធិកមាស) មានប៉ុន្មានថ្ងៃ?',
          ),
          365,
        ),
        mc(t('Khmer New Year is in…', 'ចូលឆ្នាំខ្មែរនៅខែ…'), t('April', 'មេសា'), [
          t('December', 'ធ្នូ'),
          t('July', 'កក្កដា'),
        ]),
        tf(
          t(
            'If yesterday was Sunday, then tomorrow is Tuesday.',
            'បើម្សិលមិញជាថ្ងៃអាទិត្យ នោះថ្ងៃស្អែកជាថ្ងៃអង្គារ។',
          ),
          true,
          {
            explanation: t(
              'Today is Monday, so tomorrow is Tuesday.',
              'ថ្ងៃនេះថ្ងៃច័ន្ទ ដូច្នេះថ្ងៃស្អែកថ្ងៃអង្គារ។',
            ),
          },
        ),
        num(
          t(
            'A project takes 20 school days. School is Monday to Friday. How many weeks?',
            'គម្រោងមួយត្រូវការ 20 ថ្ងៃសិក្សា។ សាលាបើកពីច័ន្ទដល់សុក្រ។ តើប៉ុន្មានសប្តាហ៍?',
          ),
          4,
          {
            explanation: t(
              '5 school days a week: 20 ÷ 5 = 4 weeks.',
              '5 ថ្ងៃសិក្សាក្នុងមួយសប្តាហ៍៖ 20 ÷ 5 = 4 សប្តាហ៍។',
            ),
          },
        ),
      ),
      reward(t('Calendar expert! 📅', 'អ្នកជំនាញប្រតិទិន! 📅')),
    ],
  ),

  lesson(
    W,
    'directions-and-maps',
    '🧭',
    t('Directions & Maps', 'ទិសដៅ និងផែនទី'),
    t('Left, right, turns and grid moves.', 'ឆ្វេង ស្តាំ ការបត់ និងការធ្វើចលនាលើក្រឡា។'),
    12,
    [
      intro(
        '🧭',
        t(
          'Robots, delivery apps and games all follow directions. Let’s guide a robot!',
          'រ៉ូបូត កម្មវិធីដឹកជញ្ជូន និងល្បែង សុទ្ធតែធ្វើតាមទិសដៅ។ តោះណែនាំរ៉ូបូតមួយ!',
        ),
      ),
      learn(
        [
          '🧭',
          t('North, East, South, West', 'ជើង កើត ត្បូង លិច'),
          t('Clockwise: N → E → S → W.', 'តាមទ្រនិចនាឡិកា៖ ជើង → កើត → ត្បូង → លិច។'),
        ],
        [
          '↪️',
          t('Turns change where you face', 'ការបត់ប្តូរទិសដែលអ្នកបែរមុខ'),
          t('Facing North, turn right → you face East.', 'បែរមុខទៅជើង បត់ស្តាំ → អ្នកបែរមុខទៅកើត។'),
        ],
      ),
      see(
        '⬆️ N · ➡️ E · ⬇️ S · ⬅️ W',
        t(
          'Two right turns make you face the opposite way.',
          'ការបត់ស្តាំពីរដងធ្វើឱ្យអ្នកបែរមុខទៅទិសផ្ទុយ។',
        ),
      ),
      revealPlay(
        'multiple_choice',
        mc(
          t(
            'You face North and turn right. Which way do you face?',
            'អ្នកបែរមុខទៅជើង ហើយបត់ស្តាំ។ តើអ្នកបែរមុខទៅទិសណា?',
          ),
          t('East', 'កើត'),
          [t('West', 'លិច'), t('South', 'ត្បូង')],
        ),
        mc(
          t(
            'You face North and turn left. Which way do you face?',
            'អ្នកបែរមុខទៅជើង ហើយបត់ឆ្វេង។ តើអ្នកបែរមុខទៅទិសណា?',
          ),
          t('West', 'លិច'),
          [t('East', 'កើត'), t('South', 'ត្បូង')],
        ),
        mc(
          t(
            'You face East and turn around (half a turn). Which way?',
            'អ្នកបែរមុខទៅកើត ហើយបង្វិលខ្លួន (កន្លះជុំ)។ ទិសណា?',
          ),
          t('West', 'លិច'),
          [t('North', 'ជើង'), t('East', 'កើត')],
        ),
        mc(t('Opposite of South?', 'ទិសផ្ទុយនៃត្បូង?'), t('North', 'ជើង'), [
          t('East', 'កើត'),
          t('West', 'លិច'),
        ]),
        mc(t('The sun rises in the…', 'ព្រះអាទិត្យរះនៅទិស…'), t('East', 'កើត'), [
          t('West', 'លិច'),
          t('North', 'ជើង'),
        ]),
        mc(
          t('You face South and turn right. Which way?', 'អ្នកបែរមុខទៅត្បូង ហើយបត់ស្តាំ។ ទិសណា?'),
          t('West', 'លិច'),
          [t('East', 'កើត'), t('North', 'ជើង')],
          {
            explanation: t('Clockwise from South is West.', 'តាមទ្រនិចនាឡិកាពីត្បូង គឺលិច។'),
          },
        ),
        num(
          t(
            'A robot moves 3 squares right, then 2 squares right. How many squares right in total?',
            'រ៉ូបូតទៅស្តាំ 3 ការេ រួចស្តាំ 2 ការេទៀត។ តើសរុបទៅស្តាំប៉ុន្មានការេ?',
          ),
          5,
        ),
        num(
          t(
            'A robot moves 5 squares up, then 2 squares down. How many squares up from the start?',
            'រ៉ូបូតឡើងលើ 5 ការេ រួចចុះក្រោម 2 ការេ។ តើវានៅខាងលើចំណុចចាប់ផ្តើមប៉ុន្មានការេ?',
          ),
          3,
        ),
        mc(
          t(
            'How many right turns make a full circle?',
            'តើត្រូវបត់ស្តាំប៉ុន្មានដងដើម្បីបានមួយជុំពេញ?',
          ),
          '4',
          ['2', '3', '6'],
        ),
        mc(t('On a map, up is usually…', 'នៅលើផែនទី ផ្នែកខាងលើជាធម្មតាគឺ…'), t('North', 'ជើង'), [
          t('South', 'ត្បូង'),
          t('East', 'កើត'),
        ]),
      ),
      revealChallenge(
        'multiple_choice',
        mc(
          t(
            'Face North. Turn right, turn right, turn left. Which way?',
            'បែរមុខទៅជើង។ បត់ស្តាំ បត់ស្តាំ បត់ឆ្វេង។ ទិសណា?',
          ),
          t('East', 'កើត'),
          [t('South', 'ត្បូង'), t('West', 'លិច')],
          {
            explanation: t('N → E → S → back to E.', 'ជើង → កើត → ត្បូង → ត្រឡប់មកកើត។'),
          },
        ),
        mc(
          t('Face West. Turn left twice. Which way?', 'បែរមុខទៅលិច។ បត់ឆ្វេងពីរដង។ ទិសណា?'),
          t('East', 'កើត'),
          [t('North', 'ជើង'), t('South', 'ត្បូង')],
        ),
        num(
          t(
            'Start at (0, 0). Move 4 right and 3 up. Then 1 left. How far right are you?',
            'ចាប់ផ្តើមនៅ (0, 0)។ ទៅស្តាំ 4 និងឡើង 3។ រួចទៅឆ្វេង 1។ តើអ្នកនៅខាងស្តាំប៉ុន្មាន?',
          ),
          3,
        ),
        num(
          t(
            'A robot goes forward 2, turns around, goes forward 5. How far is it from the start?',
            'រ៉ូបូតទៅមុខ 2 បង្វិលខ្លួន ទៅមុខ 5។ តើវានៅឆ្ងាយពីចំណុចចាប់ផ្តើមប៉ុន្មាន?',
          ),
          3,
          {
            explanation: t(
              '2 forward, then 5 back: 5 − 2 = 3 behind the start.',
              'ទៅមុខ 2 រួចថយ 5៖ 5 − 2 = 3 នៅក្រោយចំណុចចាប់ផ្តើម។',
            ),
          },
        ),
        mc(
          t(
            'The school is north of the market. The park is north of the school. Where is the park from the market?',
            'សាលានៅខាងជើងផ្សារ។ សួនច្បារនៅខាងជើងសាលា។ តើសួនច្បារនៅទិសណាពីផ្សារ?',
          ),
          t('North', 'ជើង'),
          [t('South', 'ត្បូង'), t('East', 'កើត')],
        ),
        mc(
          t(
            'The bank is east of the post office. Where is the post office from the bank?',
            'ធនាគារនៅខាងកើតប្រៃសណីយ៍។ តើប្រៃសណីយ៍នៅទិសណាពីធនាគារ?',
          ),
          t('West', 'លិច'),
          [t('East', 'កើត'), t('North', 'ជើង')],
        ),
        mc(
          t(
            'A robot starts at the bottom-left square of a 2 × 2 grid. The 🏁 is top-right. Which moves reach the flag?',
            'រ៉ូបូតចាប់ផ្តើមនៅការេក្រោមឆ្វេងនៃក្រឡា 2 × 2។ 🏁 នៅលើស្តាំ។ តើចលនាណាទៅដល់ទង់?',
          ),
          t('Up 1, right 1', 'ឡើង 1 ស្តាំ 1'),
          [
            t('Up 2', 'ឡើង 2'),
            t('Right 1, down 1', 'ស្តាំ 1 ចុះ 1'),
            t('Left 1, up 1', 'ឆ្វេង 1 ឡើង 1'),
          ],
          {
            explanation: t(
              'One up and one right: the top-right square.',
              'ឡើងមួយ និងស្តាំមួយ៖ ការេលើស្តាំ។',
            ),
          },
        ),
        mc(
          t(
            'Facing North, you need to go East. What do you do?',
            'បែរមុខទៅជើង អ្នកត្រូវទៅកើត។ តើអ្នកធ្វើអ្វី?',
          ),
          t('Turn right', 'បត់ស្តាំ'),
          [t('Turn left', 'បត់ឆ្វេង'), t('Turn around', 'បង្វិលខ្លួន')],
        ),
        num(
          t(
            'Each square is 10 m. You walk 3 squares east and 4 squares north. How many metres did you walk?',
            'ការេនីមួយៗ 10 ម៉ែត្រ។ អ្នកដើរ 3 ការេទៅកើត និង 4 ការេទៅជើង។ តើអ្នកដើរបានប៉ុន្មានម៉ែត្រ?',
          ),
          70,
        ),
        tf(
          t(
            'Turning left 3 times is the same as turning right once.',
            'ការបត់ឆ្វេង 3 ដងដូចគ្នានឹងការបត់ស្តាំម្តង។',
          ),
          true,
          {
            explanation: t(
              '3 quarter turns left = 1 quarter turn right.',
              'បត់ឆ្វេង 3 ភាគបួនជុំ = បត់ស្តាំ 1 ភាគបួនជុំ។',
            ),
          },
        ),
        mc(
          t(
            'A map app says “In 200 m, turn left”. You walk 200 m north. Which way do you turn to?',
            'កម្មវិធីផែនទីថា “ក្នុងរយៈ 200 ម៉ែត្រ បត់ឆ្វេង”។ អ្នកដើរ 200 ម៉ែត្រទៅជើង។ តើអ្នកបត់ទៅទិសណា?',
          ),
          t('West', 'លិច'),
          [t('East', 'កើត'), t('South', 'ត្បូង')],
        ),
      ),
      reward(t('Expert navigator! 🧭', 'អ្នកនាំផ្លូវពូកែ! 🧭')),
    ],
  ),

  lesson(
    W,
    'riddles-and-brain-teasers',
    '💡',
    t('Riddles & Brain Teasers', 'ល្បែងផ្គុំគំនិត'),
    t('Tricky questions — read every word!', 'សំណួរល្បិច — អានគ្រប់ពាក្យ!'),
    12,
    [
      intro(
        '💡',
        t(
          'Brain teasers are fun traps. The secret: slow down and read every word.',
          'ល្បែងផ្គុំគំនិតជាអន្ទាក់សប្បាយ។ អាថ៌កំបាំង៖ យឺតៗ ហើយអានគ្រប់ពាក្យ។',
        ),
      ),
      learn(
        [
          '🐢',
          t('Don’t rush', 'កុំប្រញាប់'),
          t(
            'The first answer that pops into your head is often the trap.',
            'ចម្លើយដំបូងដែលលេចក្នុងក្បាល ច្រើនតែជាអន្ទាក់។',
          ),
        ],
        [
          '🔄',
          t('Think differently', 'គិតខុសពីធម្មតា'),
          t('Words can have two meanings.', 'ពាក្យអាចមានអត្ថន័យពីរ។'),
        ],
      ),
      see(
        '🥚 + 🔨 = ?',
        t(
          'What has to be broken before you can use it? An egg!',
          'តើអ្វីត្រូវតែបំបែកមុនពេលអ្នកប្រើវា? ពង!',
        ),
      ),
      revealPlay(
        'multiple_choice',
        mc(
          t('What has to be broken before you can use it?', 'តើអ្វីត្រូវតែបំបែកមុនពេលអ្នកប្រើវា?'),
          t('An egg', 'ពង'),
          [t('A phone', 'ទូរស័ព្ទ'), t('A chair', 'កៅអី')],
        ),
        mc(
          t(
            'What has keys but can’t open locks?',
            'តើអ្វីមានគ្រាប់ចុច (keys) ប៉ុន្តែមិនអាចបើកសោបាន?',
          ),
          t('A keyboard', 'ក្តារចុច'),
          [t('A door', 'ទ្វារ'), t('A car', 'ឡាន')],
        ),
        mc(
          t('What has hands but can’t clap?', 'តើអ្វីមានដៃ ប៉ុន្តែទះដៃមិនបាន?'),
          t('A clock', 'នាឡិកា'),
          [t('A robot', 'រ៉ូបូត'), t('A monkey', 'ស្វា')],
        ),
        mc(
          t(
            'Which weighs more: 1 kg of rice or 1 kg of feathers?',
            'តើមួយណាធ្ងន់ជាង៖ អង្ករ 1 គីឡូ ឬរោមសត្វ 1 គីឡូ?',
          ),
          t('They weigh the same', 'ធ្ងន់ដូចគ្នា'),
          [t('Rice', 'អង្ករ'), t('Feathers', 'រោមសត្វ')],
        ),
        num(t('How many months have 28 days?', 'តើមានប៉ុន្មានខែដែលមាន 28 ថ្ងៃ?'), 12, {
          hint: t('Every month has at least 28 days.', 'គ្រប់ខែមានយ៉ាងហោចណាស់ 28 ថ្ងៃ។'),
          explanation: t(
            'All 12 months have (at least) 28 days.',
            'ទាំង 12 ខែមាន (យ៉ាងហោចណាស់) 28 ថ្ងៃ។',
          ),
        }),
        mc(
          t('What gets wetter the more it dries?', 'តើអ្វីកាន់តែសើម ពេលវាកាន់តែជូតឱ្យស្ងួត?'),
          t('A towel', 'កន្សែង'),
          [t('The sun', 'ព្រះអាទិត្យ'), t('Rice', 'អង្ករ')],
        ),
        num(
          t(
            'You are in a race and pass the person in 2nd place. What place are you in now?',
            'អ្នកកំពុងប្រកួតរត់ ហើយរត់ហួសអ្នកនៅលេខ 2។ តើឥឡូវអ្នកនៅលេខប៉ុន្មាន?',
          ),
          2,
          {
            explanation: t('You take their place: 2nd.', 'អ្នកជំនួសកន្លែងរបស់គាត់៖ លេខ 2។'),
          },
        ),
        mc(
          t(
            'What has a screen, a battery and fits in your pocket?',
            'តើអ្វីមានអេក្រង់ ថ្ម ហើយដាក់ក្នុងហោប៉ៅបាន?',
          ),
          t('A smartphone', 'ស្មាតហ្វូន'),
          [t('A TV', 'ទូរទស្សន៍'), t('A printer', 'ម៉ាស៊ីនបោះពុម្ព')],
        ),
        num(
          t(
            'If you have 3 apples and take away 2, how many apples do YOU have?',
            'បើមានប៉ោម 3 ហើយអ្នកយកចេញ 2 តើអ្នកមានប៉ោមប៉ុន្មាន?',
          ),
          2,
          {
            explanation: t('You took 2 — so you have 2!', 'អ្នកបានយក 2 — ដូច្នេះអ្នកមាន 2!'),
          },
        ),
        mc(
          t('What goes up but never comes down?', 'តើអ្វីឡើងតែមិនដែលចុះ?'),
          t('Your age', 'អាយុរបស់អ្នក'),
          [t('A ball', 'បាល់'), t('Rain', 'ភ្លៀង')],
        ),
      ),
      revealChallenge(
        'multiple_choice',
        num(
          t(
            'A doctor gives you 3 pills: one every 30 minutes. How many minutes until all are taken?',
            'វេជ្ជបណ្ឌិតឱ្យថ្នាំអ្នក 3 គ្រាប់៖ មួយគ្រាប់រៀងរាល់ 30 នាទី។ តើប៉ុន្មាននាទីទើបលេបអស់?',
          ),
          60,
          {
            explanation: t(
              'Take one now, one at 30 min, one at 60 min.',
              'លេបមួយឥឡូវ មួយនៅនាទីទី 30 មួយនៅនាទីទី 60។',
            ),
          },
        ),
        num(
          t('How many times can you take 5 away from 25?', 'តើអ្នកអាចដក 5 ចេញពី 25 បានប៉ុន្មានដង?'),
          1,
          {
            explanation: t(
              'Once — after that it’s 20, not 25!',
              'ម្តង — បន្ទាប់ពីនោះវាជា 20 មិនមែន 25 ទៀតទេ!',
            ),
          },
        ),
        mc(
          t(
            'A rooster lays an egg on a roof. Which way does the egg roll?',
            'មាន់ឈ្មោលពងលើដំបូល។ តើពងរមៀលទៅទិសណា?',
          ),
          t('Roosters don’t lay eggs', 'មាន់ឈ្មោលមិនពងទេ'),
          [t('Left', 'ឆ្វេង'), t('Right', 'ស្តាំ')],
        ),
        num(
          t(
            'A brick weighs 1 kg plus half a brick. How many kg does a brick weigh?',
            'ឥដ្ឋមួយដុំធ្ងន់ 1 គីឡូ បូកពាក់កណ្តាលឥដ្ឋ។ តើឥដ្ឋមួយដុំធ្ងន់ប៉ុន្មានគីឡូ?',
          ),
          2,
          {
            hint: t('If half a brick is 1 kg…', 'បើពាក់កណ្តាលឥដ្ឋធ្ងន់ 1 គីឡូ…'),
            explanation: t(
              'Half a brick = 1 kg, so a whole brick = 2 kg.',
              'ពាក់កណ្តាលឥដ្ឋ = 1 គីឡូ ដូច្នេះឥដ្ឋទាំងមូល = 2 គីឡូ។',
            ),
          },
        ),
        mc(
          t(
            'What can you catch but not throw?',
            'តើអ្វីដែលអ្នកអាចចាប់ (ឆ្លង) បាន ប៉ុន្តែមិនអាចបោះបាន?',
          ),
          t('A cold', 'ផ្តាសាយ'),
          [t('A ball', 'បាល់'), t('A fish', 'ត្រី')],
        ),
        num(
          t(
            'In a family, each of 4 brothers has 1 sister. How many children are there?',
            'ក្នុងគ្រួសារមួយ បងប្អូនប្រុស 4 នាក់ម្នាក់ៗមានបងប្អូនស្រី 1 នាក់។ តើមានកូនប៉ុន្មាននាក់?',
          ),
          5,
          {
            explanation: t(
              'They all share the same one sister: 4 + 1 = 5.',
              'ពួកគេមានបងប្អូនស្រីតែម្នាក់ដូចគ្នា៖ 4 + 1 = 5។',
            ),
          },
        ),
        mc(
          t('What has many teeth but can’t bite?', 'តើអ្វីមានធ្មេញច្រើន ប៉ុន្តែខាំមិនបាន?'),
          t('A comb', 'សិតសក់'),
          [t('A dog', 'ឆ្កែ'), t('A shark', 'ត្រីឆ្លាម')],
        ),
        num(
          t(
            'It takes 5 minutes to boil 1 egg. How many minutes to boil 3 eggs together in one pot?',
            'ចំណាយ 5 នាទីដើម្បីស្ងោរពង 1 គ្រាប់។ តើស្ងោរពង 3 គ្រាប់ជាមួយគ្នាក្នុងឆ្នាំងតែមួយ ចំណាយប៉ុន្មាននាទី?',
          ),
          5,
          {
            explanation: t(
              'They boil at the same time: still 5 minutes.',
              'វាឆ្អិនក្នុងពេលតែមួយ៖ នៅតែ 5 នាទី។',
            ),
          },
        ),
        mc(
          t(
            'What word is always spelled wrong in a dictionary?',
            'តើពាក្យអ្វីតែងតែសរសេរ “wrong” ក្នុងវចនានុក្រម?',
          ),
          '“wrong”',
          ['“right”', '“dictionary”'],
          {
            explanation: t(
              'The word “wrong” is spelled w-r-o-n-g!',
              'ពាក្យ “wrong” ត្រូវបានប្រកប w-r-o-n-g!',
            ),
          },
        ),
        num(
          t(
            'A bat and a ball cost $1.10 together. The bat costs $1 more than the ball. How many cents is the ball?',
            'ដំបង និងបាល់តម្លៃ $1.10 រួមគ្នា។ ដំបងថ្លៃជាងបាល់ $1។ តើបាល់តម្លៃប៉ុន្មានសេន?',
          ),
          5,
          {
            hint: t(
              'It is NOT 10 cents. Check: 10c + $1.10 = $1.20.',
              'វាមិនមែន 10 សេនទេ។ ពិនិត្យ៖ 10 សេន + $1.10 = $1.20។',
            ),
            explanation: t(
              'Ball 5c + bat $1.05 = $1.10, and $1.05 is $1 more than 5c.',
              'បាល់ 5 សេន + ដំបង $1.05 = $1.10 ហើយ $1.05 ថ្លៃជាង 5 សេន $1។',
            ),
          },
        ),
        mc(
          t('What has one eye but cannot see?', 'តើអ្វីមានភ្នែកមួយ ប៉ុន្តែមើលមិនឃើញ?'),
          t('A needle', 'ម្ជុល'),
          [t('A pirate', 'ចោរសមុទ្រ'), t('A camera', 'កាមេរ៉ា')],
        ),
      ),
      reward(t('Brain teaser champion! 💡', 'ជើងឯកល្បែងផ្គុំគំនិត! 💡')),
    ],
  ),
];
