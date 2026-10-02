import { t, type LessonSeed } from '../../types';
import {
  intro,
  keys,
  learn,
  lesson,
  match,
  mc,
  mouseTrainer,
  num,
  order,
  pictureChoice,
  revealChallenge,
  revealPlay,
  reward,
  see,
  sortInto,
  tf,
} from '../dsl';

// 🖥️ Computer Explorer, lessons 1–8 (computer-2.ts has 9–15). 15–18 questions per lesson; every
// Check shows the right answer. Khmer (km) strings are DRAFTS for native review.
export const COMPUTER_WORLD = 'computer-explorer';
const W = COMPUTER_WORLD;

/** Keys shown on the on-screen keyboard. */
export const SHORTCUT_KEYS = {
  keys: ['Ctrl', 'Alt', 'Shift', 'C', 'V', 'X', 'Z', 'S', 'A', 'P', 'F', 'Y'],
};
export const BASIC_KEYS = {
  keys: ['Esc', 'Tab', 'Shift', 'Space', 'Enter', 'Backspace', 'Delete', 'A', '1', 'Ctrl', 'Alt'],
};

export const COMPUTER_LESSONS_1: LessonSeed[] = [
  lesson(
    W,
    'what-is-a-computer',
    '💻',
    t('What is a Computer?', 'តើកុំព្យូទ័រជាអ្វី?'),
    t('Computers come in many shapes.', 'កុំព្យូទ័រមានរាងច្រើនបែប។'),
    9,
    [
      intro(
        '💻',
        t(
          'Your phone is a computer too! Let’s see what makes something a computer.',
          'ទូរស័ព្ទរបស់អ្នកក៏ជាកុំព្យូទ័រដែរ! តោះមើលថាអ្វីធ្វើឱ្យវាក្លាយជាកុំព្យូទ័រ។',
        ),
      ),
      learn(
        [
          '📥',
          t('Input', 'បញ្ចូល'),
          t(
            'You give it information: typing, tapping, talking.',
            'អ្នកផ្តល់ព័ត៌មាន៖ វាយ ចុច និយាយ។',
          ),
        ],
        [
          '⚙️',
          t('Process', 'ដំណើរការ'),
          t('It works on the information very fast.', 'វាដំណើរការព័ត៌មានយ៉ាងលឿន។'),
        ],
        [
          '📤',
          t('Output', 'បញ្ចេញ'),
          t(
            'It shows the result: on a screen, a speaker or a printer.',
            'វាបង្ហាញលទ្ធផល៖ លើអេក្រង់ ឧបករណ៍បំពងសំឡេង ឬម៉ាស៊ីនបោះពុម្ព។',
          ),
        ],
      ),
      see(
        '⌨️ “2+2” → ⚙️ → 🖥️ “4”',
        t(
          'Input → Process → Output. Every computer works like this.',
          'បញ្ចូល → ដំណើរការ → បញ្ចេញ។ កុំព្យូទ័រគ្រប់គ្រឿងធ្វើការបែបនេះ។',
        ),
      ),
      revealPlay(
        'image_choice',
        pictureChoice(
          t('Which one is a laptop?', 'តើមួយណាជាកុំព្យូទ័រយួរដៃ?'),
          ['💻', t('Laptop', 'កុំព្យូទ័រយួរដៃ')],
          [
            ['🖥️', t('Desktop', 'កុំព្យូទ័រលើតុ')],
            ['📱', t('Phone', 'ទូរស័ព្ទ')],
            ['🖨️', t('Printer', 'ម៉ាស៊ីនបោះពុម្ព')],
          ],
          {
            hint: t('It folds and you can carry it.', 'វាបត់បាន ហើយអ្នកអាចយួរវាបាន។'),
            explanation: t(
              'A laptop folds open and runs on a battery.',
              'កុំព្យូទ័រយួរដៃបត់បើកបាន ហើយដំណើរការដោយថ្ម។',
            ),
          },
        ),
        tf(t('A smartphone is a kind of computer.', 'ស្មាតហ្វូនគឺជាប្រភេទកុំព្យូទ័រមួយ។'), true, {
          explanation: t(
            'Yes! It takes input, processes it and gives output.',
            'បាទ/ចាស! វាទទួលការបញ្ចូល ដំណើរការ និងបញ្ចេញលទ្ធផល។',
          ),
        }),
        mc(
          t('Typing on a keyboard is…', 'ការវាយលើក្តារចុចគឺ…'),
          t('Input', 'ការបញ្ចូល'),
          [t('Output', 'ការបញ្ចេញ'), t('Process', 'ដំណើរការ')],
          {
            explanation: t(
              'You are giving the computer information.',
              'អ្នកកំពុងផ្តល់ព័ត៌មានឱ្យកុំព្យូទ័រ។',
            ),
          },
        ),
        mc(
          t('Sound coming out of a speaker is…', 'សំឡេងចេញពីឧបករណ៍បំពងសំឡេងគឺ…'),
          t('Output', 'ការបញ្ចេញ'),
          [t('Input', 'ការបញ្ចូល'), t('Storage', 'ការផ្ទុក')],
          {
            explanation: t(
              'The computer is giving you a result.',
              'កុំព្យូទ័រកំពុងផ្តល់លទ្ធផលឱ្យអ្នក។',
            ),
          },
        ),
        mc(
          t('Talking to a phone assistant is…', 'ការនិយាយទៅកាន់ជំនួយការទូរស័ព្ទគឺ…'),
          t('Input', 'ការបញ្ចូល'),
          [t('Output', 'ការបញ្ចេញ'), t('Printing', 'ការបោះពុម្ព')],
        ),
        pictureChoice(
          t('Which one is NOT a computer?', 'តើមួយណាមិនមែនជាកុំព្យូទ័រ?'),
          ['🪑', t('Chair', 'កៅអី')],
          [
            ['💻', t('Laptop', 'កុំព្យូទ័រយួរដៃ')],
            ['📱', t('Smartphone', 'ស្មាតហ្វូន')],
            ['⌚', t('Smartwatch', 'នាឡិកាឆ្លាតវៃ')],
          ],
          {
            explanation: t(
              'A chair cannot take input or process information.',
              'កៅអីមិនអាចទទួលការបញ្ចូល ឬដំណើរការព័ត៌មានបានទេ។',
            ),
          },
        ),
        tf(t('An ATM at the bank is a computer.', 'ម៉ាស៊ីន ATM នៅធនាគារគឺជាកុំព្យូទ័រ។'), true, {
          explanation: t(
            'You put in your card and PIN (input), it checks (process) and gives money (output).',
            'អ្នកដាក់កាត និង PIN (បញ្ចូល) វាពិនិត្យ (ដំណើរការ) ហើយផ្តល់លុយ (បញ្ចេញ)។',
          ),
        }),
        mc(
          t('Which part “thinks” inside a computer?', 'តើផ្នែកណា “គិត” នៅខាងក្នុងកុំព្យូទ័រ?'),
          t('The processor (CPU)', 'ខួរក្បាលកុំព្យូទ័រ (CPU)'),
          [t('The screen', 'អេក្រង់'), t('The mouse', 'កណ្តុរ')],
          {
            explanation: t(
              'The CPU does the processing — it is the computer’s brain.',
              'CPU ធ្វើដំណើរការ — វាជាខួរក្បាលរបស់កុំព្យូទ័រ។',
            ),
          },
        ),
      ),
      revealChallenge(
        'matching',
        match(t('Match each device to what it does.', 'ផ្គូផ្គងឧបករណ៍នីមួយៗទៅនឹងអ្វីដែលវាធ្វើ។'), [
          [
            t('🖨️ Printer', '🖨️ ម៉ាស៊ីនបោះពុម្ព'),
            t('Puts your work on paper', 'បោះពុម្ពការងារលើក្រដាស'),
          ],
          [
            t('🎧 Headphones', '🎧 កាស'),
            t('Lets you hear sound privately', 'ឱ្យអ្នកស្តាប់សំឡេងតែម្នាក់ឯង'),
          ],
          [
            t('🔌 USB stick', '🔌 ឧបករណ៍ USB'),
            t('Carries files between computers', 'ផ្ទេរឯកសាររវាងកុំព្យូទ័រ'),
          ],
        ]),
        sortInto(
          t('Input or output?', 'បញ្ចូល ឬបញ្ចេញ?'),
          [
            ['in', t('Input', 'បញ្ចូល'), '📥'],
            ['out', t('Output', 'បញ្ចេញ'), '📤'],
          ],
          [
            [t('Microphone', 'មីក្រូហ្វូន'), 'in'],
            [t('Screen', 'អេក្រង់'), 'out'],
            [t('Camera', 'កាមេរ៉ា'), 'in'],
            [t('Printer', 'ម៉ាស៊ីនបោះពុម្ព'), 'out'],
            [t('Keyboard', 'ក្តារចុច'), 'in'],
          ],
        ),
        order(
          t(
            'Put the steps in order: you type 2+2 on a calculator app.',
            'តម្រៀបជំហាន៖ អ្នកវាយ 2+2 លើកម្មវិធីគណនា។',
          ),
          [
            t('You type 2 + 2 (input)', 'អ្នកវាយ 2 + 2 (បញ្ចូល)'),
            t('The computer adds (process)', 'កុំព្យូទ័របូក (ដំណើរការ)'),
            t('The screen shows 4 (output)', 'អេក្រង់បង្ហាញ 4 (បញ្ចេញ)'),
          ],
        ),
        mc(
          t('A touchscreen is special because it is…', 'អេក្រង់ប៉ះពិសេស ព្រោះវាជា…'),
          t('Both input and output', 'ទាំងបញ្ចូល និងបញ្ចេញ'),
          [t('Only input', 'តែបញ្ចូល'), t('Only output', 'តែបញ្ចេញ')],
          {
            explanation: t(
              'You touch it (input) and it shows pictures (output).',
              'អ្នកប៉ះវា (បញ្ចូល) ហើយវាបង្ហាញរូបភាព (បញ្ចេញ)។',
            ),
          },
        ),
        tf(t('Computers can only do maths.', 'កុំព្យូទ័រអាចធ្វើតែគណិតវិទ្យាប៉ុណ្ណោះ។'), false, {
          explanation: t(
            'They play music, show videos, send messages and much more.',
            'វាលេងតន្ត្រី បង្ហាញវីដេអូ ផ្ញើសារ និងច្រើនទៀត។',
          ),
        }),
        mc(
          t('Which is the smallest computer?', 'តើមួយណាជាកុំព្យូទ័រតូចជាងគេ?'),
          t('⌚ Smartwatch', '⌚ នាឡិកាឆ្លាតវៃ'),
          [t('🖥️ Desktop', '🖥️ កុំព្យូទ័រលើតុ'), t('💻 Laptop', '💻 កុំព្យូទ័រយួរដៃ')],
        ),
        mc(
          t('A desktop computer usually needs…', 'កុំព្យូទ័រលើតុជាធម្មតាត្រូវការ…'),
          t('To be plugged into the wall', 'ដោតភ្លើងនៅជញ្ជាំង'),
          [t('Only a battery', 'តែថ្ម'), t('Sunlight', 'ពន្លឺព្រះអាទិត្យ')],
          {
            explanation: t(
              'Desktops have no battery; laptops and phones do.',
              'កុំព្យូទ័រលើតុគ្មានថ្មទេ ឯកុំព្យូទ័រយួរដៃ និងទូរស័ព្ទមានថ្ម។',
            ),
          },
        ),
        tf(
          t(
            'A computer only does what it is told by its programs.',
            'កុំព្យូទ័រធ្វើតែអ្វីដែលកម្មវិធីរបស់វាប្រាប់ប៉ុណ្ណោះ។',
          ),
          true,
        ),
      ),
      reward(t('Now you know what a computer is! 💻', 'ឥឡូវអ្នកដឹងហើយថាកុំព្យូទ័រជាអ្វី! 💻')),
    ],
  ),

  lesson(
    W,
    'computer-parts',
    '🖱️',
    t('Parts of a Computer', 'ផ្នែកនៃកុំព្យូទ័រ'),
    t(
      'Monitor, keyboard and mouse — what does each one do?',
      'ម៉ូនីទ័រ ក្តារចុច និងកណ្តុរ — តើនីមួយៗធ្វើអ្វី?',
    ),
    9,
    [
      intro(
        '🖥️',
        t(
          "A computer has a few main parts. Let's meet them!",
          'កុំព្យូទ័រមានផ្នែកសំខាន់ៗមួយចំនួន។ តោះស្គាល់ពួកវា!',
        ),
      ),
      learn(
        [
          '🖥️',
          t('Monitor', 'ម៉ូនីទ័រ'),
          t('The screen. It shows pictures and text.', 'អេក្រង់។ វាបង្ហាញរូបភាព និងអក្សរ។'),
        ],
        [
          '⌨️',
          t('Keyboard', 'ក្តារចុច'),
          t('Buttons with letters and numbers for typing.', 'ប៊ូតុងមានអក្សរ និងលេខសម្រាប់វាយ។'),
        ],
        [
          '🖱️',
          t('Mouse', 'កណ្តុរ'),
          t(
            'Moves the pointer so you can point and click.',
            'ផ្លាស់ទីព្រួញ ដើម្បីឱ្យអ្នកចង្អុល និងចុច។',
          ),
        ],
        [
          '🧠',
          t('Inside: CPU, memory, storage', 'ខាងក្នុង៖ CPU អង្គចងចាំ ការផ្ទុក'),
          t(
            'The brain, the short-term memory and the place files are kept.',
            'ខួរក្បាល អង្គចងចាំរយៈពេលខ្លី និងកន្លែងរក្សាឯកសារ។',
          ),
        ],
      ),
      see(
        '⌨️ → 🖥️ → 🖱️',
        t(
          'You type with the keyboard, see the result on the monitor, and click with the mouse.',
          'អ្នកវាយលើក្តារចុច មើលលទ្ធផលលើម៉ូនីទ័រ ហើយចុចដោយកណ្តុរ។',
        ),
      ),
      revealPlay(
        'matching',
        match(
          t('Match each part to its job.', 'ផ្គូផ្គងផ្នែកនីមួយៗទៅនឹងតួនាទីរបស់វា។'),
          [
            [t('🖥️ Monitor', '🖥️ ម៉ូនីទ័រ'), t('Shows pictures and text', 'បង្ហាញរូបភាព និងអក្សរ')],
            [t('⌨️ Keyboard', '⌨️ ក្តារចុច'), t('Types letters and numbers', 'វាយអក្សរ និងលេខ')],
            [t('🖱️ Mouse', '🖱️ កណ្តុរ'), t('Points and clicks', 'ចង្អុល និងចុច')],
          ],
          {
            explanation: t(
              'Monitor shows, keyboard types, mouse points.',
              'ម៉ូនីទ័របង្ហាញ ក្តារចុចវាយ កណ្តុរចង្អុល។',
            ),
          },
        ),
        mc(
          t(
            'You want to write your name. Which part do you use?',
            'អ្នកចង់សរសេរឈ្មោះរបស់អ្នក។ តើប្រើផ្នែកណា?',
          ),
          t('⌨️ Keyboard', '⌨️ ក្តារចុច'),
          [t('🖥️ Monitor', '🖥️ ម៉ូនីទ័រ'), t('🖱️ Mouse', '🖱️ កណ្តុរ')],
          {
            explanation: t('You type letters with the keyboard.', 'អ្នកវាយអក្សរដោយក្តារចុច។'),
          },
        ),
        mc(
          t('Which part is a touchpad most like?', 'តើបន្ទះប៉ះ (touchpad) ស្រដៀងនឹងផ្នែកណាជាងគេ?'),
          t('🖱️ Mouse', '🖱️ កណ្តុរ'),
          [t('⌨️ Keyboard', '⌨️ ក្តារចុច'), t('🖨️ Printer', '🖨️ ម៉ាស៊ីនបោះពុម្ព')],
          {
            explanation: t(
              'A touchpad does the same job as a mouse.',
              'បន្ទះប៉ះធ្វើការងារដូចកណ្តុរ។',
            ),
          },
        ),
        mc(
          t('What does CPU stand for?', 'តើ CPU មកពីពាក្យអ្វី?'),
          'Central Processing Unit',
          ['Computer Power Unit', 'Central Printing Unit'],
          {
            explanation: t(
              'The Central Processing Unit is the computer’s brain.',
              'Central Processing Unit គឺជាខួរក្បាលរបស់កុំព្យូទ័រ។',
            ),
          },
        ),
        tf(
          t(
            'The monitor is where the computer keeps your files.',
            'ម៉ូនីទ័រគឺជាកន្លែងដែលកុំព្យូទ័ររក្សាឯកសាររបស់អ្នក។',
          ),
          false,
          {
            explanation: t(
              'Files are kept in storage (a hard drive or SSD). The monitor only shows things.',
              'ឯកសារត្រូវបានរក្សាក្នុងឧបករណ៍ផ្ទុក (ថាសរឹង ឬ SSD)។ ម៉ូនីទ័រគ្រាន់តែបង្ហាញ។',
            ),
          },
        ),
        mc(
          t('Which part do you use to hear music?', 'តើផ្នែកណាដែលអ្នកប្រើដើម្បីស្តាប់តន្ត្រី?'),
          t('🔊 Speakers', '🔊 ឧបករណ៍បំពងសំឡេង'),
          [t('⌨️ Keyboard', '⌨️ ក្តារចុច'), t('🖱️ Mouse', '🖱️ កណ្តុរ')],
        ),
        mc(
          t('Which cable gives a desktop computer power?', 'តើខ្សែណាផ្តល់ថាមពលដល់កុំព្យូទ័រលើតុ?'),
          t('The power cable', 'ខ្សែភ្លើង'),
          [t('The mouse cable', 'ខ្សែកណ្តុរ'), t('The headphone cable', 'ខ្សែកាស')],
        ),
        pictureChoice(
          t('Tap the webcam.', 'ចុចលើកាមេរ៉ាវេប។'),
          ['📷', t('Webcam', 'កាមេរ៉ាវេប')],
          [
            ['🖨️', t('Printer', 'ម៉ាស៊ីនបោះពុម្ព')],
            ['🎧', t('Headphones', 'កាស')],
            ['⌨️', t('Keyboard', 'ក្តារចុច')],
          ],
          {
            explanation: t(
              'A webcam lets people see you in video calls.',
              'កាមេរ៉ាវេបឱ្យអ្នកដទៃឃើញអ្នកក្នុងការហៅវីដេអូ។',
            ),
          },
        ),
      ),
      revealChallenge(
        'multiple_choice',
        mc(
          t(
            'A laptop has its keyboard, screen and touchpad…',
            'កុំព្យូទ័រយួរដៃមានក្តារចុច អេក្រង់ និងបន្ទះប៉ះ…',
          ),
          t('All built in', 'ភ្ជាប់មកជាមួយទាំងអស់'),
          [t('Sold separately', 'លក់ដាច់ដោយឡែក'), t('In the cloud', 'នៅលើពពក')],
        ),
        sortInto(
          t('Inside the box or outside?', 'នៅក្នុងប្រអប់ ឬខាងក្រៅ?'),
          [
            ['inside', t('Inside the computer', 'នៅក្នុងកុំព្យូទ័រ'), '🧠'],
            ['outside', t('Plugged in outside', 'ដោតនៅខាងក្រៅ'), '🔌'],
          ],
          [
            ['CPU', 'inside'],
            [t('Memory (RAM)', 'អង្គចងចាំ (RAM)'), 'inside'],
            [t('Mouse', 'កណ្តុរ'), 'outside'],
            [t('Printer', 'ម៉ាស៊ីនបោះពុម្ព'), 'outside'],
          ],
        ),
        mc(
          t('Which part is the computer’s “brain”?', 'តើផ្នែកណាជា “ខួរក្បាល” របស់កុំព្យូទ័រ?'),
          'CPU',
          [t('Monitor', 'ម៉ូនីទ័រ'), t('Keyboard', 'ក្តារចុច'), t('Speaker', 'ឧបករណ៍បំពងសំឡេង')],
        ),
        tf(
          t(
            'You can use a computer without a mouse by using the keyboard and touchscreen.',
            'អ្នកអាចប្រើកុំព្យូទ័រដោយគ្មានកណ្តុរ ដោយប្រើក្តារចុច និងអេក្រង់ប៉ះ។',
          ),
          true,
        ),
        mc(
          t('The pointer on the screen is moved by the…', 'ព្រួញនៅលើអេក្រង់ត្រូវបានផ្លាស់ទីដោយ…'),
          t('Mouse or touchpad', 'កណ្តុរ ឬបន្ទះប៉ះ'),
          [t('Speaker', 'ឧបករណ៍បំពងសំឡេង'), t('Power button', 'ប៊ូតុងថាមពល')],
        ),
        mc(
          t(
            'Which part would you use to scan a paper document?',
            'តើអ្នកប្រើផ្នែកណាដើម្បីស្កេនឯកសារក្រដាស?',
          ),
          t('Scanner', 'ម៉ាស៊ីនស្កេន'),
          [t('Speaker', 'ឧបករណ៍បំពងសំឡេង'), t('Monitor', 'ម៉ូនីទ័រ')],
        ),
        match(
          t('Match the part to the sense it uses.', 'ផ្គូផ្គងផ្នែកនីមួយៗទៅនឹងអារម្មណ៍ដែលវាប្រើ។'),
          [
            [t('Monitor', 'ម៉ូនីទ័រ'), t('Seeing', 'មើល')],
            [t('Speaker', 'ឧបករណ៍បំពងសំឡេង'), t('Hearing', 'ស្តាប់')],
            [t('Keyboard', 'ក្តារចុច'), t('Touching', 'ប៉ះ')],
          ],
        ),
        tf(
          t(
            'A bigger monitor makes the computer think faster.',
            'ម៉ូនីទ័រធំជាង ធ្វើឱ្យកុំព្យូទ័រគិតលឿនជាង។',
          ),
          false,
          {
            explanation: t(
              'Speed comes from the CPU and memory, not the screen size.',
              'ល្បឿនមកពី CPU និងអង្គចងចាំ មិនមែនទំហំអេក្រង់ទេ។',
            ),
          },
        ),
      ),
      reward(t('You know the computer parts! 🖥️', 'អ្នកស្គាល់ផ្នែកកុំព្យូទ័រហើយ! 🖥️')),
    ],
  ),

  lesson(
    W,
    'hardware-and-software',
    '🧩',
    t('Hardware & Software', 'ផ្នែករឹង និងផ្នែកទន់'),
    t(
      'Things you can touch, and programs that run.',
      'អ្វីដែលអ្នកអាចប៉ះបាន និងកម្មវិធីដែលដំណើរការ។',
    ),
    9,
    [
      intro(
        '🧩',
        t(
          'A computer needs two things to work: hardware and software. Let’s tell them apart!',
          'កុំព្យូទ័រត្រូវការពីររបស់ដើម្បីដំណើរការ៖ ផ្នែករឹង និងផ្នែកទន់។ តោះបែងចែកពួកវា!',
        ),
      ),
      learn(
        [
          '🔧',
          t('Hardware', 'ផ្នែករឹង'),
          t(
            'The parts you can touch: screen, keyboard, CPU.',
            'ផ្នែកដែលអ្នកអាចប៉ះបាន៖ អេក្រង់ ក្តារចុច CPU។',
          ),
        ],
        [
          '💿',
          t('Software', 'ផ្នែកទន់'),
          t(
            'Programs and apps: instructions that tell the hardware what to do.',
            'កម្មវិធី៖ ការណែនាំដែលប្រាប់ផ្នែករឹងថាត្រូវធ្វើអ្វី។',
          ),
        ],
        [
          '🤝',
          t('They need each other', 'ពួកវាត្រូវការគ្នា'),
          t(
            'A phone with no apps can’t do much. An app with no phone can’t run.',
            'ទូរស័ព្ទគ្មានកម្មវិធីធ្វើអ្វីមិនបានច្រើនទេ។ កម្មវិធីគ្មានទូរស័ព្ទក៏ដំណើរការមិនបានដែរ។',
          ),
        ],
      ),
      see(
        '🔧 + 💿 = 💻 ✨',
        t(
          'Hardware + software = a working computer.',
          'ផ្នែករឹង + ផ្នែកទន់ = កុំព្យូទ័រដែលដំណើរការ។',
        ),
      ),
      revealPlay(
        'drag_drop',
        sortInto(
          t('Hardware or software?', 'ផ្នែករឹង ឬផ្នែកទន់?'),
          [
            ['hw', t('Hardware', 'ផ្នែករឹង'), '🔧'],
            ['sw', t('Software', 'ផ្នែកទន់'), '💿'],
          ],
          [
            [t('Keyboard', 'ក្តារចុច'), 'hw'],
            ['Microsoft Word', 'sw'],
            [t('Monitor', 'ម៉ូនីទ័រ'), 'hw'],
            ['Google Chrome', 'sw'],
            [t('Printer', 'ម៉ាស៊ីនបោះពុម្ព'), 'hw'],
          ],
        ),
        mc(t('Which is software?', 'តើមួយណាជាផ្នែកទន់?'), 'Telegram', [
          t('Mouse', 'កណ្តុរ'),
          t('USB cable', 'ខ្សែ USB'),
        ]),
        mc(t('Which is hardware?', 'តើមួយណាជាផ្នែករឹង?'), t('Headphones', 'កាស'), [
          'Facebook',
          'Excel',
        ]),
        tf(t('You can touch software with your hand.', 'អ្នកអាចប៉ះផ្នែកទន់ដោយដៃបាន។'), false, {
          explanation: t(
            'Software is instructions — you see it on the screen but you can’t hold it.',
            'ផ្នែកទន់គឺជាការណែនាំ — អ្នកឃើញវាលើអេក្រង់ ប៉ុន្តែកាន់វាមិនបានទេ។',
          ),
        }),
        mc(
          t('An “app” is short for…', '“App” គឺជាពាក្យខ្លីនៃ…'),
          t('Application (a program)', 'Application (កម្មវិធី)'),
          [t('Apple', 'ផ្លែប៉ោម'), t('Appointment', 'ការណាត់ជួប')],
        ),
        tf(t('A game on your phone is software.', 'ល្បែងនៅលើទូរស័ព្ទរបស់អ្នកគឺជាផ្នែកទន់។'), true),
        mc(
          t(
            'Your phone’s screen cracked. What kind of problem is it?',
            'អេក្រង់ទូរស័ព្ទរបស់អ្នកប្រេះ។ តើជាបញ្ហាប្រភេទណា?',
          ),
          t('Hardware', 'ផ្នែករឹង'),
          [t('Software', 'ផ្នែកទន់')],
        ),
        mc(
          t(
            'An app keeps closing by itself. What kind of problem is it most likely?',
            'កម្មវិធីមួយបិទដោយខ្លួនឯងជាប់ៗ។ តើភាគច្រើនជាបញ្ហាប្រភេទណា?',
          ),
          t('Software', 'ផ្នែកទន់'),
          [t('Hardware', 'ផ្នែករឹង')],
          {
            explanation: t(
              'Updating or reinstalling the app often fixes it.',
              'ការធ្វើបច្ចុប្បន្នភាព ឬដំឡើងកម្មវិធីឡើងវិញ ច្រើនតែជួសជុលវាបាន។',
            ),
          },
        ),
      ),
      revealChallenge(
        'multiple_choice',
        mc(
          t('Installing a new app adds…', 'ការដំឡើងកម្មវិធីថ្មី បន្ថែម…'),
          t('Software', 'ផ្នែកទន់'),
          [t('Hardware', 'ផ្នែករឹង')],
        ),
        mc(
          t('Adding a second monitor adds…', 'ការបន្ថែមម៉ូនីទ័រទីពីរ បន្ថែម…'),
          t('Hardware', 'ផ្នែករឹង'),
          [t('Software', 'ផ្នែកទន់')],
        ),
        mc(
          t(
            'An update for your phone’s apps changes…',
            'ការធ្វើបច្ចុប្បន្នភាពកម្មវិធីទូរស័ព្ទ ផ្លាស់ប្តូរ…',
          ),
          t('Software', 'ផ្នែកទន់'),
          [t('Hardware', 'ផ្នែករឹង')],
        ),
        tf(
          t(
            'Hardware without software can’t do anything useful.',
            'ផ្នែករឹងដែលគ្មានផ្នែកទន់ មិនអាចធ្វើអ្វីដែលមានប្រយោជន៍បានទេ។',
          ),
          true,
        ),
        match(t('Match each app to its job.', 'ផ្គូផ្គងកម្មវិធីនីមួយៗទៅនឹងការងាររបស់វា។'), [
          ['Word', t('Writing documents', 'សរសេរឯកសារ')],
          ['Excel', t('Tables and numbers', 'តារាង និងលេខ')],
          ['Chrome', t('Browsing websites', 'រុករកគេហទំព័រ')],
          ['Telegram', t('Sending messages', 'ផ្ញើសារ')],
        ]),
        mc(
          t(
            'Where do you safely get new apps on a phone?',
            'តើអ្នកទទួលបានកម្មវិធីថ្មីដោយសុវត្ថិភាពនៅលើទូរស័ព្ទពីណា?',
          ),
          t('The official app store', 'ហាងកម្មវិធីផ្លូវការ'),
          [
            t('Any link in a message', 'តំណណាមួយក្នុងសារ'),
            t('A stranger’s USB stick', 'ឧបករណ៍ USB របស់មនុស្សចម្លែក'),
          ],
          {
            explanation: t(
              'Google Play and the App Store check apps for danger.',
              'Google Play និង App Store ពិនិត្យកម្មវិធីរកគ្រោះថ្នាក់។',
            ),
          },
        ),
        tf(
          t(
            'A computer virus is a kind of harmful software.',
            'មេរោគកុំព្យូទ័រ គឺជាប្រភេទផ្នែកទន់ដែលបង្កគ្រោះថ្នាក់។',
          ),
          true,
        ),
        sortInto(
          t('Hardware or software?', 'ផ្នែករឹង ឬផ្នែកទន់?'),
          [
            ['hw', t('Hardware', 'ផ្នែករឹង'), '🔧'],
            ['sw', t('Software', 'ផ្នែកទន់'), '💿'],
          ],
          [
            [t('Battery', 'ថ្ម'), 'hw'],
            ['YouTube', 'sw'],
            [t('Camera', 'កាមេរ៉ា'), 'hw'],
            ['Windows', 'sw'],
          ],
        ),
      ),
      reward(t('Hardware and software: sorted! 🧩', 'ផ្នែករឹង និងផ្នែកទន់៖ បែងចែកបានហើយ! 🧩')),
    ],
  ),

  lesson(
    W,
    'start-and-shut-down',
    '🔌',
    t('Start Up & Shut Down', 'បើក និងបិទកុំព្យូទ័រ'),
    t(
      'Turn on, log in, restart and shut down safely.',
      'បើក ចូល ចាប់ផ្តើមឡើងវិញ និងបិទដោយសុវត្ថិភាព។',
    ),
    9,
    [
      intro(
        '🔌',
        t(
          'Starting and stopping a computer the right way keeps your work and the computer safe.',
          'ការបើក និងបិទកុំព្យូទ័រតាមរបៀបត្រឹមត្រូវ ការពារការងាររបស់អ្នក និងកុំព្យូទ័រ។',
        ),
      ),
      learn(
        [
          '⏻',
          t('Power button', 'ប៊ូតុងថាមពល'),
          t(
            'Press once to turn on. The computer “boots” (starts up).',
            'ចុចម្តងដើម្បីបើក។ កុំព្យូទ័រ “ចាប់ផ្តើម”។',
          ),
        ],
        [
          '🔑',
          t('Log in', 'ចូលគណនី'),
          t(
            'Type your password so only you can use your account.',
            'វាយពាក្យសម្ងាត់ ដើម្បីឱ្យតែអ្នកប្រើគណនីរបស់អ្នក។',
          ),
        ],
        [
          '🔄',
          t('Restart vs Shut down', 'ចាប់ផ្តើមឡើងវិញ និងបិទ'),
          t(
            'Restart = off then on again. Shut down = off.',
            'ចាប់ផ្តើមឡើងវិញ = បិទរួចបើកវិញ។ បិទ = បិទ។',
          ),
        ],
      ),
      see(
        t('Save 💾 → Start ⊞ → Power ⏻ → Shut down', 'រក្សាទុក 💾 → Start ⊞ → ថាមពល ⏻ → បិទ'),
        t('Always save, then shut down from the menu.', 'ត្រូវរក្សាទុកជានិច្ច រួចបិទពីម៉ឺនុយ។'),
      ),
      revealPlay(
        'ordering',
        order(t('Put the steps in order to start working.', 'តម្រៀបជំហានដើម្បីចាប់ផ្តើមធ្វើការ។'), [
          t('Press the power button', 'ចុចប៊ូតុងថាមពល'),
          t('Wait for the computer to start', 'រង់ចាំកុំព្យូទ័រចាប់ផ្តើម'),
          t('Type your password', 'វាយពាក្យសម្ងាត់'),
          t('Open the app you need', 'បើកកម្មវិធីដែលអ្នកត្រូវការ'),
        ]),
        order(
          t('Put the steps in order to shut down safely.', 'តម្រៀបជំហានដើម្បីបិទដោយសុវត្ថិភាព។'),
          [
            t('Save your work', 'រក្សាទុកការងារ'),
            t('Close your apps', 'បិទកម្មវិធី'),
            t('Click Start → Power', 'ចុច Start → ថាមពល'),
            t('Choose Shut down', 'ជ្រើសរើស បិទ'),
          ],
        ),
        mc(
          t(
            'Your computer is very slow and frozen. What should you try first?',
            'កុំព្យូទ័ររបស់អ្នកយឺតខ្លាំង ហើយគាំង។ តើអ្នកគួរសាកអ្វីមុនគេ?',
          ),
          t('Restart it', 'ចាប់ផ្តើមវាឡើងវិញ'),
          [t('Hit the screen', 'វាយអេក្រង់'), t('Buy a new one', 'ទិញថ្មី')],
          {
            explanation: t(
              'A restart clears many problems.',
              'ការចាប់ផ្តើមឡើងវិញដោះស្រាយបញ្ហាជាច្រើន។',
            ),
          },
        ),
        tf(
          t(
            'Pulling out the power cable is the best way to turn off a desktop.',
            'ការដកខ្សែភ្លើងចេញ គឺជាវិធីល្អបំផុតដើម្បីបិទកុំព្យូទ័រលើតុ។',
          ),
          false,
          {
            explanation: t(
              'That can lose your work and damage files. Use Shut down.',
              'វាអាចធ្វើឱ្យបាត់ការងារ និងខូចឯកសារ។ ប្រើ បិទ។',
            ),
          },
        ),
        mc(
          t('Why do we log in with a password?', 'ហេតុអ្វីយើងចូលគណនីដោយពាក្យសម្ងាត់?'),
          t('So only we can use our account', 'ដើម្បីឱ្យតែយើងប្រើគណនីរបស់យើង'),
          [t('To make it faster', 'ដើម្បីឱ្យលឿនជាង'), t('To print', 'ដើម្បីបោះពុម្ព')],
        ),
        mc(
          t('What does “Sleep” do?', 'តើ “Sleep” ធ្វើអ្វី?'),
          t('Saves power but keeps your apps open', 'សន្សំថាមពល ប៉ុន្តែទុកកម្មវិធីបើកដដែល'),
          [
            t('Deletes your files', 'លុបឯកសាររបស់អ្នក'),
            t('Turns the computer off completely', 'បិទកុំព្យូទ័រទាំងស្រុង'),
          ],
        ),
        tf(
          t(
            'You should save your work before you restart.',
            'អ្នកគួររក្សាទុកការងារមុនពេលចាប់ផ្តើមឡើងវិញ។',
          ),
          true,
        ),
        mc(
          t('“Booting” means the computer is…', '“Booting” មានន័យថាកុំព្យូទ័រកំពុង…'),
          t('Starting up', 'ចាប់ផ្តើម'),
          [t('Printing', 'បោះពុម្ព'), t('Broken', 'ខូច')],
        ),
      ),
      revealChallenge(
        'multiple_choice',
        mc(
          t(
            'You leave a shared school computer. What should you do?',
            'អ្នកចាកចេញពីកុំព្យូទ័ររួមនៅសាលា។ តើអ្នកគួរធ្វើអ្វី?',
          ),
          t('Log out (sign out)', 'ចាកចេញពីគណនី'),
          [
            t('Leave your account open', 'ទុកគណនីបើកចោល'),
            t('Write your password on the desk', 'សរសេរពាក្យសម្ងាត់លើតុ'),
          ],
          {
            explanation: t(
              'Logging out stops the next person using your account.',
              'ការចាកចេញការពារមនុស្សបន្ទាប់មិនឱ្យប្រើគណនីរបស់អ្នក។',
            ),
          },
        ),
        tf(
          t(
            'A laptop can keep working for a while without the charger.',
            'កុំព្យូទ័រយួរដៃអាចដំណើរការមួយរយៈដោយគ្មានឆ្នាំងសាក។',
          ),
          true,
          {
            explanation: t('It runs on its battery.', 'វាដំណើរការដោយថ្មរបស់វា។'),
          },
        ),
        mc(
          t('Which symbol is usually the power button?', 'តើនិមិត្តសញ្ញាណាជាធម្មតាជាប៊ូតុងថាមពល?'),
          '⏻',
          ['🔊', '📶', '✉️'],
        ),
        mc(
          t(
            'Updates are installing and the screen says “Don’t turn off”. You should…',
            'កំពុងដំឡើងបច្ចុប្បន្នភាព ហើយអេក្រង់ថា “កុំបិទ”។ អ្នកគួរ…',
          ),
          t('Wait until it finishes', 'រង់ចាំរហូតដល់វាចប់'),
          [
            t('Unplug it now', 'ដកភ្លើងឥឡូវ'),
            t('Press the power button many times', 'ចុចប៊ូតុងថាមពលច្រើនដង'),
          ],
        ),
        sortInto(
          t('Restart or shut down?', 'ចាប់ផ្តើមឡើងវិញ ឬបិទ?'),
          [
            ['restart', t('Restart', 'ចាប់ផ្តើមឡើងវិញ'), '🔄'],
            ['off', t('Shut down', 'បិទ'), '⏻'],
          ],
          [
            [t('The computer is frozen', 'កុំព្យូទ័រគាំង'), 'restart'],
            [t('You are going home for the night', 'អ្នកទៅផ្ទះពេលយប់'), 'off'],
            [t('An update asks you to', 'បច្ចុប្បន្នភាពស្នើឱ្យធ្វើ'), 'restart'],
            [
              t(
                'You will move the computer to another room',
                'អ្នកនឹងផ្លាស់កុំព្យូទ័រទៅបន្ទប់ផ្សេង',
              ),
              'off',
            ],
          ],
        ),
        tf(
          t(
            'Holding the power button for 10 seconds forces a computer off — only use it when it is completely stuck.',
            'ការចុចប៊ូតុងថាមពលជាប់ 10 វិនាទី បង្ខំឱ្យកុំព្យូទ័របិទ — ប្រើតែពេលវាគាំងទាំងស្រុង។',
          ),
          true,
        ),
        mc(
          t(
            'The battery icon shows 5% 🪫. What should you do?',
            'រូបថ្មបង្ហាញ 5% 🪫។ តើអ្នកគួរធ្វើអ្វី?',
          ),
          t('Plug in the charger and save your work', 'ដោតឆ្នាំងសាក ហើយរក្សាទុកការងារ'),
          [
            t('Keep working and hope', 'បន្តធ្វើការ ហើយសង្ឃឹម'),
            t('Turn up the brightness', 'បង្កើនពន្លឺ'),
          ],
        ),
        mc(
          t(
            'After you type your password, the computer shows…',
            'បន្ទាប់ពីអ្នកវាយពាក្យសម្ងាត់ កុំព្យូទ័របង្ហាញ…',
          ),
          t('The desktop', 'ផ្ទៃតុ (Desktop)'),
          [t('The printer', 'ម៉ាស៊ីនបោះពុម្ព'), t('The power cable', 'ខ្សែភ្លើង')],
        ),
      ),
      reward(t('Safe start, safe stop! 🔌', 'បើកដោយសុវត្ថិភាព បិទដោយសុវត្ថិភាព! 🔌')),
    ],
  ),

  lesson(
    W,
    'using-the-mouse',
    '🖱️',
    t('Click & Double-Click', 'ចុច និងចុចពីរដង'),
    t('Point, click and open things.', 'ចង្អុល ចុច និងបើករបស់។'),
    10,
    [
      intro(
        '🖱️',
        t(
          'The mouse is your hand on the screen. Let’s practise!',
          'កណ្តុរគឺជាដៃរបស់អ្នកនៅលើអេក្រង់។ តោះហាត់!',
        ),
      ),
      learn(
        [
          '👆',
          t('Click', 'ចុច'),
          t(
            'Press the left button once to choose something.',
            'ចុចប៊ូតុងខាងឆ្វេងម្តង ដើម្បីជ្រើសរើសអ្វីមួយ។',
          ),
        ],
        [
          '✌️',
          t('Double-click', 'ចុចពីរដង'),
          t('Press twice quickly to open a file or folder.', 'ចុចពីរដងលឿនៗ ដើម្បីបើកឯកសារ ឬថត។'),
        ],
        [
          '📱',
          t('On a phone', 'នៅលើទូរស័ព្ទ'),
          t(
            'A tap is a click. Two quick taps work like a double-click.',
            'ការប៉ះ គឺជាការចុច។ ការប៉ះពីរដងលឿនៗ ដូចការចុចពីរដង។',
          ),
        ],
      ),
      see(
        '📁 👆 = select · 📁 ✌️ = open',
        t('One click chooses it. Two quick clicks open it.', 'ចុចម្តងជ្រើសរើស។ ចុចពីរដងលឿនៗ បើក។'),
      ),
      mouseTrainer('play', ['tap', 'double']),
      revealPlay(
        'multiple_choice',
        mc(
          t(
            'How do you usually OPEN a folder on a computer?',
            'តើជាធម្មតាអ្នកបើកថតនៅលើកុំព្យូទ័រដោយរបៀបណា?',
          ),
          t('Double-click it', 'ចុចវាពីរដង'),
          [t('Click it once', 'ចុចវាម្តង'), t('Press Space', 'ចុច Space')],
        ),
        tf(
          t(
            'Clicking once usually selects (chooses) something.',
            'ការចុចម្តង ជាធម្មតាជ្រើសរើសអ្វីមួយ។',
          ),
          true,
        ),
        mc(
          t('Which mouse button do you use most?', 'តើប៊ូតុងកណ្តុរណាដែលអ្នកប្រើច្រើនបំផុត?'),
          t('The left button', 'ប៊ូតុងខាងឆ្វេង'),
          [t('The right button', 'ប៊ូតុងខាងស្តាំ'), t('The scroll wheel', 'កង់រំកិល')],
        ),
        mc(
          t('What is the arrow on the screen called?', 'តើព្រួញនៅលើអេក្រង់ហៅថាអ្វី?'),
          t('The pointer (cursor)', 'ព្រួញទ្រនិច (cursor)'),
          [t('The icon', 'រូបតំណាង'), t('The window', 'បង្អួច')],
        ),
        mc(
          t(
            'When you point at a link, the pointer often becomes…',
            'ពេលអ្នកចង្អុលលើតំណ ព្រួញច្រើនតែក្លាយជា…',
          ),
          '👆',
          ['⌛', '✏️', '🔒'],
          {
            explanation: t(
              'A hand means “you can click here”.',
              'រូបដៃមានន័យថា “អ្នកអាចចុចនៅទីនេះ”។',
            ),
          },
        ),
        mc(
          t(
            'The pointer shows ⌛ or a spinning circle. It means…',
            'ព្រួញបង្ហាញ ⌛ ឬរង្វង់វិល។ មានន័យថា…',
          ),
          t('The computer is busy — wait', 'កុំព្យូទ័រកំពុងរវល់ — រង់ចាំ'),
          [t('Click faster', 'ចុចឱ្យលឿនជាង'), t('It is broken', 'វាខូច')],
        ),
        tf(
          t(
            'On a phone, a tap does the same job as a click.',
            'នៅលើទូរស័ព្ទ ការប៉ះធ្វើការងារដូចការចុច។',
          ),
          true,
        ),
        mc(
          t('The scroll wheel on a mouse is for…', 'កង់រំកិលលើកណ្តុរសម្រាប់…'),
          t('Moving up and down a page', 'រំកិលឡើងចុះក្នុងទំព័រ'),
          [t('Turning off the computer', 'បិទកុំព្យូទ័រ'), t('Typing', 'វាយអក្សរ')],
        ),
      ),
      revealChallenge(
        'multiple_choice',
        mc(
          t(
            'You double-clicked too slowly and nothing opened. Why?',
            'អ្នកចុចពីរដងយឺតពេក ហើយគ្មានអ្វីបើកទេ។ ហេតុអ្វី?',
          ),
          t('The computer saw two single clicks', 'កុំព្យូទ័រឃើញជាការចុចម្តងពីរដង'),
          [t('The mouse is broken', 'កណ្តុរខូច'), t('The folder is empty', 'ថតទទេ')],
          {
            explanation: t(
              'Double-click means two clicks quickly, one right after the other.',
              'ចុចពីរដង មានន័យថាចុចពីរដងលឿនៗ មួយបន្ទាប់ពីមួយ។',
            ),
          },
        ),
        match(t('Match the action to the result.', 'ផ្គូផ្គងសកម្មភាពទៅនឹងលទ្ធផល។'), [
          [t('Click', 'ចុច'), t('Select', 'ជ្រើសរើស')],
          [t('Double-click', 'ចុចពីរដង'), t('Open', 'បើក')],
          [t('Scroll', 'រំកិល'), t('Move up or down', 'ផ្លាស់ទីឡើង ឬចុះ')],
        ]),
        tf(
          t(
            'Holding the mouse gently and keeping your wrist straight helps avoid pain.',
            'ការកាន់កណ្តុរថ្នមៗ ហើយរក្សាកដៃឱ្យត្រង់ ជួយជៀសវាងការឈឺ។',
          ),
          true,
        ),
        mc(
          t('To click a button on a website, you should…', 'ដើម្បីចុចប៊ូតុងលើគេហទំព័រ អ្នកគួរ…'),
          t('Point at it, then click once', 'ចង្អុលលើវា រួចចុចម្តង'),
          [
            t('Double-click it many times', 'ចុចវាពីរដងច្រើនដង'),
            t('Right-click it', 'ចុចខាងស្តាំលើវា'),
          ],
          {
            explanation: t(
              'Buttons and links need just one click.',
              'ប៊ូតុង និងតំណ ត្រូវការតែចុចម្តង។',
            ),
          },
        ),
        mc(
          t('A laptop without a mouse uses the…', 'កុំព្យូទ័រយួរដៃគ្មានកណ្តុរ ប្រើ…'),
          t('Touchpad', 'បន្ទះប៉ះ'),
          [t('Speakers', 'ឧបករណ៍បំពងសំឡេង'), t('Webcam', 'កាមេរ៉ាវេប')],
        ),
        tf(
          t(
            'Clicking many times quickly on a slow app makes it faster.',
            'ការចុចច្រើនដងលឿនៗលើកម្មវិធីយឺត ធ្វើឱ្យវាលឿនជាង។',
          ),
          false,
          {
            explanation: t(
              'It can open many copies. Click once and wait.',
              'វាអាចបើកច្រើនច្បាប់។ ចុចម្តង ហើយរង់ចាំ។',
            ),
          },
        ),
        mc(
          t('What do you double-click to open a photo?', 'តើអ្នកចុចពីរដងលើអ្វី ដើម្បីបើករូបថត?'),
          t('The photo’s file icon', 'រូបតំណាងឯកសាររូបថត'),
          [t('The empty desktop', 'ផ្ទៃតុទទេ'), t('The clock', 'នាឡិកា')],
        ),
        mc(
          t('Clicking on an empty part of the desktop…', 'ការចុចលើផ្នែកទទេនៃផ្ទៃតុ…'),
          t('Unselects things', 'លែងជ្រើសរើសរបស់'),
          [t('Deletes files', 'លុបឯកសារ'), t('Restarts the computer', 'ចាប់ផ្តើមកុំព្យូទ័រឡើងវិញ')],
        ),
      ),
      reward(t('Your clicking is perfect! 🎯', 'ការចុចរបស់អ្នកល្អឥតខ្ចោះ! 🎯')),
    ],
  ),

  lesson(
    W,
    'right-click-and-drag',
    '👉',
    t('Right-Click & Drag', 'ចុចខាងស្តាំ និងអូស'),
    t('Menus and moving things around.', 'ម៉ឺនុយ និងការផ្លាស់ទីរបស់។'),
    10,
    [
      intro(
        '👉',
        t(
          'The mouse has more tricks: secret menus and moving things!',
          'កណ្តុរមានល្បិចច្រើនទៀត៖ ម៉ឺនុយសម្ងាត់ និងការផ្លាស់ទីរបស់!',
        ),
      ),
      learn(
        [
          '📋',
          t('Right-click', 'ចុចខាងស្តាំ'),
          t(
            'Press the right button to open a menu of options (copy, rename, delete…).',
            'ចុចប៊ូតុងខាងស្តាំ ដើម្បីបើកម៉ឺនុយជម្រើស (ចម្លង ប្តូរឈ្មោះ លុប…)។',
          ),
        ],
        [
          '✋',
          t('Drag and drop', 'អូស និងទម្លាក់'),
          t(
            'Hold the button, move, then let go — the item moves with you.',
            'ចុចជាប់ ផ្លាស់ទី រួចលែង — របស់ផ្លាស់ទីតាមអ្នក។',
          ),
        ],
        [
          '📱',
          t('On a phone', 'នៅលើទូរស័ព្ទ'),
          t(
            'Long-press = right-click. Hold and slide = drag.',
            'ចុចជាប់យូរ = ចុចខាងស្តាំ។ ចុចជាប់ ហើយរំកិល = អូស។',
          ),
        ],
      ),
      see(
        '🖱️ hold → move → let go = 📄 ➜ 📁',
        t(
          'Dragging a file onto a folder moves it into the folder.',
          'ការអូសឯកសារទៅលើថត ផ្លាស់វាចូលក្នុងថត។',
        ),
      ),
      mouseTrainer('play', ['long', 'drag']),
      revealPlay(
        'matching',
        match(
          t('Match the mouse action to what it does.', 'ផ្គូផ្គងសកម្មភាពកណ្តុរទៅនឹងអ្វីដែលវាធ្វើ។'),
          [
            [t('Click', 'ចុច'), t('Select something', 'ជ្រើសរើសអ្វីមួយ')],
            [t('Double-click', 'ចុចពីរដង'), t('Open something', 'បើកអ្វីមួយ')],
            [t('Right-click', 'ចុចខាងស្តាំ'), t('Show a menu', 'បង្ហាញម៉ឺនុយ')],
            [t('Drag and drop', 'អូស និងទម្លាក់'), t('Move something', 'ផ្លាស់ទីអ្វីមួយ')],
          ],
        ),
        mc(
          t(
            'How do you open the menu with “Rename” on a file?',
            'តើអ្នកបើកម៉ឺនុយដែលមាន “ប្តូរឈ្មោះ” លើឯកសារដោយរបៀបណា?',
          ),
          t('Right-click it', 'ចុចខាងស្តាំលើវា'),
          [t('Double-click it', 'ចុចវាពីរដង'), t('Scroll on it', 'រំកិលលើវា')],
        ),
        mc(
          t(
            'On a phone, which action is like a right-click?',
            'នៅលើទូរស័ព្ទ តើសកម្មភាពណាដូចការចុចខាងស្តាំ?',
          ),
          t('Long-press', 'ចុចជាប់យូរ'),
          [t('Quick tap', 'ប៉ះលឿន'), t('Shake the phone', 'អង្រួនទូរស័ព្ទ')],
        ),
        order(t('Put the steps of drag and drop in order.', 'តម្រៀបជំហាននៃការអូស និងទម្លាក់។'), [
          t('Point at the file', 'ចង្អុលលើឯកសារ'),
          t('Press and hold the left button', 'ចុចប៊ូតុងខាងឆ្វេងជាប់'),
          t('Move the mouse to the folder', 'ផ្លាស់កណ្តុរទៅថត'),
          t('Let go of the button', 'លែងប៊ូតុង'),
        ]),
        tf(
          t(
            'If you let go of the button too early while dragging, the file stops where you let go.',
            'បើអ្នកលែងប៊ូតុងលឿនពេកពេលអូស ឯកសារឈប់នៅកន្លែងដែលអ្នកលែង។',
          ),
          true,
        ),
        mc(
          t(
            'What can you usually find in a right-click menu?',
            'តើអ្នកច្រើនតែឃើញអ្វីក្នុងម៉ឺនុយចុចខាងស្តាំ?',
          ),
          t('Copy, Rename, Delete', 'ចម្លង ប្តូរឈ្មោះ លុប'),
          [t('Your password', 'ពាក្យសម្ងាត់របស់អ្នក'), t('The battery level', 'កម្រិតថ្ម')],
        ),
        mc(
          t(
            'To move a photo into the “Holiday” folder, you can…',
            'ដើម្បីផ្លាស់រូបថតចូលថត “Holiday” អ្នកអាច…',
          ),
          t('Drag it onto the folder', 'អូសវាទៅលើថត'),
          [
            t('Double-click the folder twice', 'ចុចថតពីរដងពីរលើក'),
            t('Right-click the clock', 'ចុចខាងស្តាំលើនាឡិកា'),
          ],
        ),
      ),
      revealChallenge(
        'multiple_choice',
        mc(
          t('You want to resize a window. You drag its…', 'អ្នកចង់ប្តូរទំហំបង្អួច។ អ្នកអូស…'),
          t('Corner or edge', 'ជ្រុង ឬគែមរបស់វា'),
          [t('Title only', 'តែចំណងជើង'), t('Close button', 'ប៊ូតុងបិទ')],
        ),
        mc(
          t('Dragging a window by its title bar…', 'ការអូសបង្អួចតាមរបារចំណងជើង…'),
          t('Moves the window', 'ផ្លាស់ទីបង្អួច'),
          [t('Closes the window', 'បិទបង្អួច'), t('Prints it', 'បោះពុម្ពវា')],
        ),
        tf(
          t(
            'Right-clicking on different things shows different menus.',
            'ការចុចខាងស្តាំលើរបស់ផ្សេងៗ បង្ហាញម៉ឺនុយផ្សេងៗ។',
          ),
          true,
        ),
        mc(
          t(
            'You dragged a file to the wrong folder. Quick fix?',
            'អ្នកអូសឯកសារទៅថតខុស។ ការជួសជុលលឿន?',
          ),
          t('Press Ctrl + Z to undo', 'ចុច Ctrl + Z ដើម្បីត្រឡប់វិញ'),
          [t('Turn off the computer', 'បិទកុំព្យូទ័រ'), t('Delete the folder', 'លុបថត')],
        ),
        mc(
          t('Dragging selected text in a document…', 'ការអូសអត្ថបទដែលបានជ្រើសរើសក្នុងឯកសារ…'),
          t('Moves the text', 'ផ្លាស់ទីអត្ថបទ'),
          [t('Prints the text', 'បោះពុម្ពអត្ថបទ'), t('Translates the text', 'បកប្រែអត្ថបទ')],
        ),
        tf(
          t(
            'To drag, you click once and let go immediately.',
            'ដើម្បីអូស អ្នកចុចម្តង ហើយលែងភ្លាមៗ។',
          ),
          false,
          {
            explanation: t(
              'You must hold the button down while you move.',
              'អ្នកត្រូវចុចប៊ូតុងជាប់ ពេលអ្នកផ្លាស់ទី។',
            ),
          },
        ),
        mc(
          t('Dragging a file onto the Recycle Bin 🗑️…', 'ការអូសឯកសារទៅលើធុងសំរាម 🗑️…'),
          t('Deletes it (you can still restore it)', 'លុបវា (អ្នកនៅតែអាចស្តារវាវិញបាន)'),
          [t('Copies it', 'ចម្លងវា'), t('Opens it', 'បើកវា')],
        ),
        mc(
          t(
            'Selecting many files: drag a box around them, starting on…',
            'ការជ្រើសរើសឯកសារច្រើន៖ អូសប្រអប់ជុំវិញពួកវា ដោយចាប់ផ្តើមនៅលើ…',
          ),
          t('An empty space', 'កន្លែងទទេ'),
          [t('A file', 'ឯកសារមួយ'), t('The taskbar', 'របារភារកិច្ច')],
        ),
      ),
      reward(t('Mouse moves: mastered! 🖱️', 'ចលនាកណ្តុរ៖ ចេះហើយ! 🖱️')),
    ],
  ),

  lesson(
    W,
    'the-keyboard',
    '⌨️',
    t('The Keyboard', 'ក្តារចុច'),
    t('Important keys you will use every day.', 'គ្រាប់ចុចសំខាន់ៗដែលអ្នកនឹងប្រើរាល់ថ្ងៃ។'),
    10,
    [
      intro(
        '⌨️',
        t(
          'A keyboard has many keys, but a few are super important.',
          'ក្តារចុចមានគ្រាប់ចុចច្រើន ប៉ុន្តែមានតែមួយចំនួនដែលសំខាន់ខ្លាំង។',
        ),
      ),
      learn(
        [
          '⏎',
          'Enter',
          t('Starts a new line, or says “OK, go!”', 'ចាប់ផ្តើមបន្ទាត់ថ្មី ឬនិយាយថា “យល់ព្រម ទៅ!”'),
        ],
        [
          '⌫',
          'Backspace',
          t('Deletes the letter before the cursor.', 'លុបអក្សរនៅមុខទស្សន៍ទ្រនិច។'),
        ],
        ['⬆️', 'Shift', t('Hold it to make a CAPITAL letter.', 'ចុចជាប់ដើម្បីបង្កើតអក្សរធំ។')],
        [
          '␣',
          'Space',
          t('The long key: puts a space between words.', 'គ្រាប់ចុចវែង៖ ដាក់ចន្លោះរវាងពាក្យ។'),
        ],
      ),
      see(
        'Shift + a = A',
        t(
          'Hold Shift, then press a letter to make it a capital.',
          'ចុច Shift ជាប់ រួចចុចអក្សរ ដើម្បីបង្កើតអក្សរធំ។',
        ),
      ),
      revealPlay(
        'keyboard_challenge',
        keys(
          t(
            'Press the key that deletes the letter before the cursor.',
            'ចុចគ្រាប់ចុចដែលលុបអក្សរនៅមុខទស្សន៍ទ្រនិច។',
          ),
          ['Backspace'],
          { data: BASIC_KEYS, hint: t('It has a ⌫ arrow.', 'វាមានព្រួញ ⌫។') },
        ),
        keys(
          t('Press the key that starts a new line.', 'ចុចគ្រាប់ចុចដែលចាប់ផ្តើមបន្ទាត់ថ្មី។'),
          ['Enter'],
          { data: BASIC_KEYS },
        ),
        keys(
          t(
            'Press the key that puts a space between words.',
            'ចុចគ្រាប់ចុចដែលដាក់ចន្លោះរវាងពាក្យ។',
          ),
          ['Space'],
          { data: BASIC_KEYS },
        ),
        keys(
          t(
            'Make a capital A: press the keys together.',
            'បង្កើតអក្សរធំ A៖ ចុចគ្រាប់ចុចជាមួយគ្នា។',
          ),
          ['Shift', 'A'],
          { data: BASIC_KEYS, explanation: t('Shift + A = A', 'Shift + A = A') },
        ),
        keys(
          t(
            'Press the key that jumps to the next box in a form.',
            'ចុចគ្រាប់ចុចដែលលោតទៅប្រអប់បន្ទាប់ក្នុងទម្រង់។',
          ),
          ['Tab'],
          { data: BASIC_KEYS },
        ),
        keys(
          t('Press the key that closes a menu or cancels.', 'ចុចគ្រាប់ចុចដែលបិទម៉ឺនុយ ឬបោះបង់។'),
          ['Esc'],
          { data: BASIC_KEYS, hint: t('“Escape”', '“Escape”') },
        ),
        keys(
          t(
            'Press the key that deletes the letter AFTER the cursor.',
            'ចុចគ្រាប់ចុចដែលលុបអក្សរនៅក្រោយទស្សន៍ទ្រនិច។',
          ),
          ['Delete'],
          { data: BASIC_KEYS },
        ),
        mc(
          t(
            'What is the blinking line where your text appears?',
            'តើបន្ទាត់ភ្លឹបភ្លែតដែលអក្សរលេចឡើងហៅថាអ្វី?',
          ),
          t('The cursor', 'ទស្សន៍ទ្រនិច (cursor)'),
          [t('The pointer', 'ព្រួញ'), t('The ruler', 'បន្ទាត់វាស់')],
        ),
      ),
      revealChallenge(
        'keyboard_challenge',
        mc(
          t(
            'Caps Lock is on. What happens when you type “hello”?',
            'Caps Lock បើក។ តើមានអ្វីកើតឡើងពេលអ្នកវាយ “hello”?',
          ),
          'HELLO',
          ['hello', 'Hello'],
          {
            explanation: t(
              'Caps Lock makes every letter a capital until you press it again.',
              'Caps Lock ធ្វើឱ្យអក្សរទាំងអស់ធំ រហូតដល់អ្នកចុចវាម្តងទៀត។',
            ),
          },
        ),
        mc(
          t(
            'Your password does not work and all letters look BIG. Check…',
            'ពាក្យសម្ងាត់មិនដំណើរការ ហើយអក្សរទាំងអស់ធំ។ ពិនិត្យ…',
          ),
          'Caps Lock',
          ['Enter', 'Space'],
        ),
        match(t('Match the key to its job.', 'ផ្គូផ្គងគ្រាប់ចុចទៅនឹងការងាររបស់វា។'), [
          ['Enter', t('New line / OK', 'បន្ទាត់ថ្មី / យល់ព្រម')],
          ['Backspace', t('Delete before the cursor', 'លុបនៅមុខទស្សន៍ទ្រនិច')],
          ['Shift', t('Capital letter', 'អក្សរធំ')],
          ['Space', t('Gap between words', 'ចន្លោះរវាងពាក្យ')],
        ]),
        mc(t('Shift + 1 usually types…', 'Shift + 1 ជាធម្មតាវាយ…'), '!', ['1', '?', '@']),
        tf(
          t(
            'The arrow keys ← ↑ → ↓ move the cursor.',
            'គ្រាប់ចុចព្រួញ ← ↑ → ↓ ផ្លាស់ទីទស្សន៍ទ្រនិច។',
          ),
          true,
        ),
        mc(
          t(
            'Which key would you press to send a chat message on a computer?',
            'តើគ្រាប់ចុចណាដែលអ្នកចុចដើម្បីផ្ញើសារជជែកលើកុំព្យូទ័រ?',
          ),
          'Enter',
          ['Esc', 'Shift'],
        ),
        mc(
          t(
            'How do you switch between English and Khmer typing on many computers?',
            'តើអ្នកប្តូររវាងការវាយភាសាអង់គ្លេស និងខ្មែរលើកុំព្យូទ័រជាច្រើនដោយរបៀបណា?',
          ),
          t('A language shortcut such as Alt + Shift', 'ផ្លូវកាត់ភាសា ដូចជា Alt + Shift'),
          [
            t('Restart the computer', 'ចាប់ផ្តើមកុំព្យូទ័រឡើងវិញ'),
            t('Press Enter 3 times', 'ចុច Enter 3 ដង'),
          ],
          {
            explanation: t(
              'On Windows it is often Alt + Shift or ⊞ + Space.',
              'នៅលើ Windows ច្រើនតែជា Alt + Shift ឬ ⊞ + Space។',
            ),
          },
        ),
        tf(
          t(
            'The F keys (F1, F2…) are at the top of the keyboard.',
            'គ្រាប់ចុច F (F1, F2…) នៅខាងលើក្តារចុច។',
          ),
          true,
        ),
      ),
      reward(t('Keyboard hero in training! ⌨️', 'វីរបុរសក្តារចុចកំពុងហ្វឹកហាត់! ⌨️')),
    ],
  ),

  lesson(
    W,
    'typing-skills',
    '✍️',
    t('Typing Skills', 'ជំនាញវាយអក្សរ'),
    t('Home row, posture and typing faster.', 'ជួរដើម ឥរិយាបថ និងការវាយឱ្យលឿន។'),
    9,
    [
      intro(
        '✍️',
        t(
          'Good typing saves hours! The secret: the right finger on the right key.',
          'ការវាយល្អសន្សំពេលច្រើនម៉ោង! អាថ៌កំបាំង៖ ម្រាមដៃត្រឹមត្រូវលើគ្រាប់ចុចត្រឹមត្រូវ។',
        ),
      ),
      learn(
        [
          '🏠',
          t('Home row', 'ជួរដើម'),
          t(
            'Left fingers on A S D F, right fingers on J K L ;',
            'ម្រាមដៃឆ្វេងលើ A S D F ម្រាមដៃស្តាំលើ J K L ;',
          ),
        ],
        [
          '🔘',
          t('Feel the bumps', 'ស្ទាបស្នាមលើក'),
          t(
            'F and J have small bumps so you can find them without looking.',
            'F និង J មានស្នាមលើកតូចៗ ដើម្បីឱ្យអ្នករកវាឃើញដោយមិនចាំបាច់មើល។',
          ),
        ],
        [
          '🪑',
          t('Sit well', 'អង្គុយឱ្យត្រឹមត្រូវ'),
          t(
            'Back straight, feet flat, screen at eye level.',
            'ខ្នងត្រង់ ជើងសំប៉ែតលើដី អេក្រង់កម្រិតភ្នែក។',
          ),
        ],
      ),
      see(
        '🤚 A S D F   ·   J K L ; ✋',
        t(
          'Rest your fingers here. Thumbs on the Space bar.',
          'ដាក់ម្រាមដៃនៅទីនេះ។ មេដៃនៅលើ Space។',
        ),
      ),
      revealPlay(
        'multiple_choice',
        mc(t('Which keys have small bumps?', 'តើគ្រាប់ចុចណាមានស្នាមលើកតូចៗ?'), 'F and J', [
          'A and L',
          'Q and P',
          'G and H',
        ]),
        mc(t('Where do your left fingers rest?', 'តើម្រាមដៃឆ្វេងរបស់អ្នកដាក់នៅឯណា?'), 'A S D F', [
          'Q W E R',
          'Z X C V',
          'J K L ;',
        ]),
        mc(t('Where do your right fingers rest?', 'តើម្រាមដៃស្តាំរបស់អ្នកដាក់នៅឯណា?'), 'J K L ;', [
          'A S D F',
          'U I O P',
          'N M , .',
        ]),
        mc(t('Which finger presses the Space bar?', 'តើម្រាមដៃណាចុច Space?'), t('Thumb', 'មេដៃ'), [
          t('Little finger', 'ម្រាមដៃកូន'),
          t('Index finger', 'ម្រាមដៃចង្អុល'),
        ]),
        tf(
          t(
            'Looking at the screen (not your hands) helps you type faster over time.',
            'ការមើលអេក្រង់ (មិនមែនដៃ) ជួយឱ្យអ្នកវាយលឿនជាងតាមពេលវេលា។',
          ),
          true,
        ),
        mc(
          t('A good typing posture is…', 'ឥរិយាបថវាយល្អគឺ…'),
          t('Back straight, wrists relaxed', 'ខ្នងត្រង់ កដៃធូរ'),
          [
            t('Leaning very close to the screen', 'ផ្អៀងជិតអេក្រង់ខ្លាំង'),
            t('Lying on the bed', 'ដេកលើគ្រែ'),
          ],
        ),
        mc(
          t('Typing speed is usually measured in…', 'ល្បឿនវាយ ជាធម្មតាវាស់ជា…'),
          t('Words per minute (WPM)', 'ពាក្យក្នុងមួយនាទី (WPM)'),
          [t('Kilograms', 'គីឡូក្រាម'), t('Pages per day', 'ទំព័រក្នុងមួយថ្ងៃ')],
        ),
        tf(
          t(
            'Taking short breaks is good for your eyes and hands.',
            'ការសម្រាកខ្លីៗល្អសម្រាប់ភ្នែក និងដៃរបស់អ្នក។',
          ),
          true,
        ),
      ),
      revealChallenge(
        'multiple_choice',
        mc(
          t('Which finger types F?', 'តើម្រាមដៃណាវាយ F?'),
          t('Left index finger', 'ម្រាមដៃចង្អុលឆ្វេង'),
          [t('Right thumb', 'មេដៃស្តាំ'), t('Left little finger', 'ម្រាមដៃកូនឆ្វេង')],
        ),
        mc(
          t('Which finger types J?', 'តើម្រាមដៃណាវាយ J?'),
          t('Right index finger', 'ម្រាមដៃចង្អុលស្តាំ'),
          [
            t('Left index finger', 'ម្រាមដៃចង្អុលឆ្វេង'),
            t('Right little finger', 'ម្រាមដៃកូនស្តាំ'),
          ],
        ),
        mc(
          t('Which finger usually presses Enter?', 'តើម្រាមដៃណាជាធម្មតាចុច Enter?'),
          t('Right little finger', 'ម្រាមដៃកូនស្តាំ'),
          [t('Left thumb', 'មេដៃឆ្វេង'), t('Right index finger', 'ម្រាមដៃចង្អុលស្តាំ')],
        ),
        num(
          t(
            'You typed 120 words in 4 minutes. How many words per minute?',
            'អ្នកវាយបាន 120 ពាក្យក្នុង 4 នាទី។ តើប៉ុន្មានពាក្យក្នុងមួយនាទី?',
          ),
          30,
          {
            explanation: t('120 ÷ 4 = 30 WPM.', '120 ÷ 4 = 30 WPM។'),
          },
        ),
        tf(
          t(
            'Accuracy matters more than speed when you are learning.',
            'ភាពត្រឹមត្រូវសំខាន់ជាងល្បឿន ពេលអ្នកកំពុងរៀន។',
          ),
          true,
          {
            explanation: t(
              'Speed comes with practice; fixing mistakes takes time.',
              'ល្បឿនមកជាមួយការហ្វឹកហាត់ ការកែកំហុសចំណាយពេល។',
            ),
          },
        ),
        mc(
          t('The screen should be about…', 'អេក្រង់គួរនៅប្រហែល…'),
          t('An arm’s length away, at eye level', 'ចម្ងាយមួយដៃ នៅកម្រិតភ្នែក'),
          [t('Touching your nose', 'ប៉ះច្រមុះរបស់អ្នក'), t('Behind you', 'នៅក្រោយអ្នក')],
        ),
        mc(
          t(
            'Every 20 minutes, look at something 20 feet (6 m) away for 20 seconds. This rests your…',
            'រៀងរាល់ 20 នាទី មើលអ្វីមួយឆ្ងាយ 6 ម៉ែត្រ រយៈពេល 20 វិនាទី។ វាធ្វើឱ្យសម្រាក…',
          ),
          t('Eyes', 'ភ្នែក'),
          [t('Keyboard', 'ក្តារចុច'), t('Feet', 'ជើង')],
        ),
        tf(
          t(
            'There are free websites and apps to practise typing.',
            'មានគេហទំព័រ និងកម្មវិធីឥតគិតថ្លៃ ដើម្បីហាត់វាយអក្សរ។',
          ),
          true,
        ),
      ),
      reward(t('Fingers ready, posture perfect! ✍️', 'ម្រាមដៃត្រៀមរួច ឥរិយាបថល្អឥតខ្ចោះ! ✍️')),
    ],
  ),
];
