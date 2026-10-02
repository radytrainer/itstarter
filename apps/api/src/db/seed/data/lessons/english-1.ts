import { t, type LessonSeed } from '../../types';
import {
  buildSentence,
  catchIt,
  game,
  intro,
  learn,
  lesson,
  match,
  mc,
  memory,
  pictureChoice,
  revealChallenge,
  revealPlay,
  reward,
  same,
  see,
  sortInto,
  spell,
  tf,
  typeIt,
} from '../dsl';

// 🔤 English for Beginners, lessons 1–8 (english-2.ts has 9–15). English to learn, with Khmer
// help. 🔊 buttons read the English aloud. Khmer (km) strings are DRAFTS for native review.
export const ENGLISH_WORLD = 'english-starter';
const W = ENGLISH_WORLD;

export const ENGLISH_LESSONS_1: LessonSeed[] = [
  // 1 ─────────────────────────────────────────────────────────────
  lesson(
    W,
    'the-alphabet',
    '🔤',
    t('The Alphabet', 'អក្ខរក្រមអង់គ្លេស'),
    t('26 letters, big and small, and their sounds.', 'អក្សរ 26 តួ ធំ និងតូច និងសំឡេងរបស់វា។'),
    10,
    [
      intro(
        '🔤',
        t(
          'English has 26 letters. Every word you will type on a computer is made from them!',
          'ភាសាអង់គ្លេសមានអក្សរ 26 តួ។ ពាក្យទាំងអស់ដែលអ្នកវាយលើកុំព្យូទ័រ ត្រូវបានបង្កើតពីពួកវា!',
        ),
      ),
      learn(
        [
          '🔠',
          t('Big and small letters', 'អក្សរធំ និងអក្សរតូច'),
          t(
            'Each letter has a capital (A) and a small form (a).',
            'អក្សរនីមួយៗមានអក្សរធំ (A) និងអក្សរតូច (a)។',
          ),
          'A, a. B, b. C, c.',
        ],
        [
          '🅰️',
          t('Vowels', 'ស្រៈ'),
          t(
            'A, E, I, O, U are vowels. The others are consonants.',
            'A, E, I, O, U ជាស្រៈ។ អក្សរផ្សេងទៀតជាព្យញ្ជនៈ។',
          ),
          'A, E, I, O, U',
        ],
        [
          '✍️',
          t('Capital letters', 'អក្សរធំ'),
          t(
            'Start a sentence and a name with a capital: Dara lives in Cambodia.',
            'ចាប់ផ្តើមប្រយោគ និងឈ្មោះដោយអក្សរធំ៖ Dara lives in Cambodia។',
          ),
          'Dara lives in Cambodia.',
        ],
      ),
      see(
        'A B C D E F G H I J K L M\nN O P Q R S T U V W X Y Z',
        t(
          'The whole alphabet: 26 letters, from A to Z.',
          'អក្ខរក្រមទាំងមូល៖ អក្សរ 26 តួ ពី A ដល់ Z។',
        ),
      ),
      revealPlay(
        'multiple_choice',
        mc(
          t(
            'How many letters are in the English alphabet?',
            'តើអក្ខរក្រមអង់គ្លេសមានអក្សរប៉ុន្មានតួ?',
          ),
          '26',
          ['24', '33', '20'],
          {
            explanation: t('A to Z: 26 letters.', 'ពី A ដល់ Z៖ 26 តួ។'),
          },
        ),
        mc(t('Which letter comes after D?', 'តើអក្សរណាមកបន្ទាប់ពី D?'), 'E', ['F', 'C', 'B']),
        mc(t('Which letter comes before M?', 'តើអក្សរណាមកមុន M?'), 'L', ['N', 'K', 'O']),
        mc(t('Which one is a VOWEL?', 'តើមួយណាជាស្រៈ?'), 'O', ['T', 'B', 'K'], {
          explanation: t('The vowels are A, E, I, O, U.', 'ស្រៈគឺ A, E, I, O, U។'),
        }),
        mc(t('What is the small letter for “G”?', 'តើអក្សរតូចនៃ «G» ជាអ្វី?'), 'g', [
          'q',
          'j',
          'y',
        ]),
        mc(t('What is the capital letter for “r”?', 'តើអក្សរធំនៃ «r» ជាអ្វី?'), 'R', [
          'P',
          'B',
          'K',
        ]),
        mc(
          t('Listen 🔊. Which letter do you hear?', 'ស្តាប់ 🔊។ តើអ្នកឮអក្សរណា?'),
          'B',
          ['D', 'P', 'V'],
          { say: 'B' },
        ),
        mc(
          t('Listen 🔊. Which letter do you hear?', 'ស្តាប់ 🔊។ តើអ្នកឮអក្សរណា?'),
          'H',
          ['A', 'K', 'J'],
          { say: 'H' },
        ),
        tf(
          t(
            '“Cambodia” starts with a capital letter because it is a name.',
            '«Cambodia» ចាប់ផ្តើមដោយអក្សរធំ ព្រោះវាជាឈ្មោះ។',
          ),
          true,
        ),
      ),
      revealChallenge(
        'multiple_choice',
        mc(
          t('Which word is in alphabetical order first?', 'តើពាក្យណាមកមុនគេតាមលំដាប់អក្សរ?'),
          'apple',
          ['banana', 'cat', 'egg'],
          {
            explanation: t('A comes before B, C and E.', 'A មកមុន B, C និង E។'),
          },
        ),
        mc(
          t('Which sentence is written correctly?', 'តើប្រយោគណាសរសេរត្រឹមត្រូវ?'),
          'My name is Sokha.',
          ['my name is sokha.', 'My Name Is sokha.', 'my name is Sokha'],
        ),
        sortInto(
          t('Sort the letters: vowel or consonant?', 'តម្រៀបអក្សរ៖ ស្រៈ ឬព្យញ្ជនៈ?'),
          [
            ['v', t('Vowel', 'ស្រៈ')],
            ['c', t('Consonant', 'ព្យញ្ជនៈ')],
          ],
          [
            ['A', 'v'],
            ['E', 'v'],
            ['U', 'v'],
            ['S', 'c'],
            ['M', 'c'],
            ['T', 'c'],
          ],
        ),
        match(t('Match the capital to the small letter.', 'ផ្គូផ្គងអក្សរធំជាមួយអក្សរតូច។'), [
          ['D', 'd'],
          ['Q', 'q'],
          ['N', 'n'],
          ['Y', 'y'],
        ]),
        mc(
          t('What is the LAST letter of the alphabet?', 'តើអក្សរចុងក្រោយនៃអក្ខរក្រមជាអ្វី?'),
          'Z',
          ['Y', 'X', 'W'],
        ),
        spell(t('Listen 🔊 and spell the word.', 'ស្តាប់ 🔊 ហើយប្រកបពាក្យ។'), 'cat', {
          say: 'cat',
          extra: 'k',
        }),
        typeIt(
          t(
            'Type the first 5 letters of the alphabet (small letters).',
            'វាយអក្សរ 5 តួដំបូងនៃអក្ខរក្រម (អក្សរតូច)។',
          ),
          'abcde',
          {
            accept: ['a b c d e', 'a, b, c, d, e'],
          },
        ),
      ),
      game(
        catchIt(
          t('Catch the VOWELS: A, E, I, O, U!', 'ចាប់ស្រៈ៖ A, E, I, O, U!'),
          ['A', 'E', 'I', 'O', 'U'],
          ['B', 'K', 'S', 'T', 'M', 'R'],
          { speed: 'fast' },
        ),
        memory(t('Match the capital and small letters.', 'ផ្គូផ្គងអក្សរធំ និងអក្សរតូច។'), [
          ['A', 'a'],
          ['G', 'g'],
          ['R', 'r'],
          ['L', 'l'],
        ]),
      ),
      reward(
        t(
          'You know the ABC! Every English word starts here.',
          'អ្នកស្គាល់ ABC ហើយ! ពាក្យអង់គ្លេសទាំងអស់ចាប់ផ្តើមពីទីនេះ។',
        ),
      ),
    ],
  ),

  // 2 ─────────────────────────────────────────────────────────────
  lesson(
    W,
    'hello-and-goodbye',
    '👋',
    t('Hello & Goodbye', 'សួស្តី និងលាហើយ'),
    t('Greet people and introduce yourself.', 'ស្វាគមន៍មនុស្ស និងណែនាំខ្លួនឯង។'),
    10,
    [
      intro(
        '👋',
        t(
          'Let’s learn to say hello and talk about yourself in English!',
          'តោះរៀននិយាយសួស្តី និងនិយាយអំពីខ្លួនឯងជាភាសាអង់គ្លេស!',
        ),
      ),
      learn(
        [
          '👋',
          'Hello! / Hi!',
          t('“សួស្តី” — use it any time.', '«សួស្តី» — ប្រើបានគ្រប់ពេល។'),
          'Hello! Hi!',
        ],
        [
          '🌅',
          'Good morning',
          t('“អរុណសួស្តី” — before 12 o’clock.', '«អរុណសួស្តី» — មុនម៉ោង 12។'),
          'Good morning',
        ],
        [
          '🙂',
          'My name is … / I am …',
          t('Say your name: My name is Dara.', 'និយាយឈ្មោះរបស់អ្នក៖ My name is Dara។'),
          'My name is Dara.',
        ],
        [
          '🤝',
          'Nice to meet you.',
          t(
            '“រីករាយដែលបានជួបអ្នក” — when you meet someone new.',
            '«រីករាយដែលបានជួបអ្នក» — ពេលជួបនរណាម្នាក់ថ្មី។',
          ),
          'Nice to meet you.',
        ],
      ),
      see(
        t(
          'A: Hello! My name is Dara. What is your name?\nB: Hi, Dara! I am Sokha. Nice to meet you.',
          'A: Hello! My name is Dara. What is your name?\nB: Hi, Dara! I am Sokha. Nice to meet you.',
        ),
        t('Two students meet for the first time.', 'សិស្សពីរនាក់ជួបគ្នាជាលើកដំបូង។'),
      ),
      revealPlay(
        'multiple_choice',
        mc(
          t('It is 8 o’clock in the morning. What do you say?', 'ម៉ោង 8 ព្រឹក។ តើអ្នកនិយាយអ្វី?'),
          'Good morning!',
          ['Good night!', 'Good evening!', 'Goodbye!'],
        ),
        mc(
          t('You are going to bed. What do you say?', 'អ្នកកំពុងចូលគេង។ តើអ្នកនិយាយអ្វី?'),
          'Good night!',
          ['Good morning!', 'Hello!', 'Nice to meet you!'],
        ),
        mc(
          t(
            'Someone asks “What is your name?” You answer…',
            'នរណាម្នាក់សួរ «What is your name?» អ្នកឆ្លើយ…',
          ),
          'My name is Bopha.',
          ['I am fine.', 'I am 12.', 'Goodbye.'],
        ),
        mc(
          t('Someone asks “How are you?” You answer…', 'នរណាម្នាក់សួរ «How are you?» អ្នកឆ្លើយ…'),
          'I am fine, thank you.',
          ['I am Dara.', 'I am from Cambodia.', 'Good night.'],
        ),
        mc(
          t(
            'Someone asks “Where are you from?” You answer…',
            'នរណាម្នាក់សួរ «Where are you from?» អ្នកឆ្លើយ…',
          ),
          'I am from Cambodia.',
          ['I am fine.', 'My name is Dara.', 'I am 13 years old.'],
        ),
        mc(
          t('Listen 🔊. What does it mean?', 'ស្តាប់ 🔊។ តើវាមានន័យថាអ្វី?'),
          t('Goodbye', 'លាហើយ'),
          [t('Thank you', 'អរគុណ'), t('Hello', 'សួស្តី'), t('Sorry', 'សុំទោស')],
          {
            say: 'Goodbye! See you tomorrow.',
          },
        ),
        mc(
          t('Listen 🔊. What does it mean?', 'ស្តាប់ 🔊។ តើវាមានន័យថាអ្វី?'),
          t('Thank you', 'អរគុណ'),
          [t('Please', 'សូម'), t('Sorry', 'សុំទោស'), t('Goodbye', 'លាហើយ')],
          {
            say: 'Thank you very much.',
          },
        ),
        tf(t('“Good evening” is for the morning.', '«Good evening» សម្រាប់ពេលព្រឹក។'), false, {
          explanation: t(
            '“Good evening” is for after about 6 pm.',
            '«Good evening» សម្រាប់ក្រោយម៉ោងប្រហែល 6 ល្ងាច។',
          ),
        }),
      ),
      revealChallenge(
        'multiple_choice',
        match(t('Match the English to the Khmer.', 'ផ្គូផ្គងភាសាអង់គ្លេសជាមួយភាសាខ្មែរ។'), [
          ['Hello', same('សួស្តី')],
          ['Thank you', same('អរគុណ')],
          ['Sorry', same('សុំទោស')],
          ['Goodbye', same('លាហើយ')],
        ]),
        mc(
          t('Which is the polite way to ask for help?', 'តើមួយណាជាវិធីគួរសមក្នុងការសុំជំនួយ?'),
          'Can you help me, please?',
          ['Help me now!', 'You help.', 'Help!!!'],
        ),
        buildSentence(
          t('Put the words in order.', 'តម្រៀបពាក្យឱ្យត្រូវលំដាប់។'),
          'Nice to meet you.',
          { say: 'Nice to meet you.' },
        ),
        buildSentence(
          t('Put the words in order.', 'តម្រៀបពាក្យឱ្យត្រូវលំដាប់។'),
          'What is your name?',
          { say: 'What is your name?' },
        ),
        typeIt(t('Type “thank you” in English.', 'វាយ «អរគុណ» ជាភាសាអង់គ្លេស។'), 'thank you', {
          accept: ['thanks'],
        }),
        mc(
          t('You bump into someone by mistake. You say…', 'អ្នកបុកនរណាម្នាក់ដោយអចេតនា។ អ្នកនិយាយ…'),
          'Sorry!',
          ['Thank you!', 'Hello!', 'Good night!'],
        ),
        tf(
          t(
            '“I am Dara” and “My name is Dara” mean the same here.',
            '«I am Dara» និង «My name is Dara» មានន័យដូចគ្នានៅទីនេះ។',
          ),
          true,
        ),
        mc(
          t('Which answer fits “How old are you?”', 'តើចម្លើយណាត្រូវនឹង «How old are you?»'),
          'I am 13 years old.',
          ['I am fine.', 'I am from Siem Reap.', 'I am a student.'],
        ),
      ),
      game(
        memory(t('Find the English and Khmer pairs.', 'រកគូភាសាអង់គ្លេស និងភាសាខ្មែរ។'), [
          ['Hello', same('សួស្តី')],
          ['Goodbye', same('លាហើយ')],
          ['Thank you', same('អរគុណ')],
          ['Please', same('សូម')],
        ]),
        catchIt(
          t('Catch the GREETINGS!', 'ចាប់ពាក្យស្វាគមន៍!'),
          ['Hello', 'Hi', 'Good morning', 'Good afternoon'],
          ['Table', 'Blue', 'Seven', 'Run'],
        ),
      ),
      reward(
        t(
          'Hello, English speaker! 👋 You can introduce yourself now.',
          'សួស្តី អ្នកនិយាយអង់គ្លេស! 👋 ឥឡូវអ្នកអាចណែនាំខ្លួនបានហើយ។',
        ),
      ),
    ],
  ),

  // 3 ─────────────────────────────────────────────────────────────
  lesson(
    W,
    'numbers-in-english',
    '🔢',
    t('Numbers in English', 'លេខជាភាសាអង់គ្លេស'),
    t('Count, read and write numbers from 1 to 100.', 'រាប់ អាន និងសរសេរលេខពី 1 ដល់ 100។'),
    10,
    [
      intro(
        '🔢',
        t(
          'Phone numbers, prices, ages, passwords… numbers are everywhere in English!',
          'លេខទូរស័ព្ទ តម្លៃ អាយុ ពាក្យសម្ងាត់… លេខមាននៅគ្រប់ទីកន្លែង!',
        ),
      ),
      learn(
        [
          '1️⃣',
          '1 – 10',
          'one, two, three, four, five, six, seven, eight, nine, ten',
          'one, two, three, four, five, six, seven, eight, nine, ten',
        ],
        [
          '🔟',
          '11 – 20',
          'eleven, twelve, thirteen, fourteen, fifteen … twenty',
          'eleven, twelve, thirteen, fourteen, fifteen, twenty',
        ],
        [
          '💯',
          t('Tens', 'ខ្ទង់ដប់'),
          'twenty, thirty, forty, fifty, sixty, seventy, eighty, ninety, one hundred',
          'twenty, thirty, forty, fifty, one hundred',
        ],
        [
          '🧩',
          t('Joining', 'ការភ្ជាប់'),
          t(
            '25 = twenty-five. Use a hyphen ( - ) between them.',
            '25 = twenty-five។ ប្រើសញ្ញា ( - ) នៅចន្លោះ។',
          ),
          'twenty-five',
        ],
      ),
      see(
        '13 = thirteen   30 = thirty\n15 = fifteen   50 = fifty',
        t(
          '“-teen” and “-ty” sound alike. Listen for the end!',
          '«-teen» និង «-ty» ស្តាប់ទៅស្រដៀងគ្នា។ ស្តាប់ចុងពាក្យ!',
        ),
      ),
      revealPlay(
        'multiple_choice',
        mc(t('What is “seven”?', 'តើ «seven» ជាលេខអ្វី?'), '7', ['6', '11', '17']),
        mc(t('How do you write 12 in words?', 'តើសរសេរ 12 ជាពាក្យយ៉ាងដូចម្តេច?'), 'twelve', [
          'twenty',
          'two',
          'eleven',
        ]),
        mc(t('Listen 🔊. Which number?', 'ស្តាប់ 🔊។ លេខអ្វី?'), '15', ['50', '5', '51'], {
          say: 'fifteen',
        }),
        mc(t('Listen 🔊. Which number?', 'ស្តាប់ 🔊។ លេខអ្វី?'), '40', ['14', '4', '44'], {
          say: 'forty',
        }),
        mc(t('What is “twenty-three”?', 'តើ «twenty-three» ជាលេខអ្វី?'), '23', ['32', '203', '13']),
        mc(t('How do you write 99 in words?', 'តើសរសេរ 99 ជាពាក្យយ៉ាងដូចម្តេច?'), 'ninety-nine', [
          'nineteen-nine',
          'nine-nine',
          'ninty-nine',
        ]),
        mc(
          t('Which is spelled correctly?', 'តើមួយណាប្រកបត្រឹមត្រូវ?'),
          'forty',
          ['fourty', 'fortty', 'foorty'],
          {
            explanation: t(
              'Four has a “u”, but forty does not!',
              'Four មាន «u» ប៉ុន្តែ forty គ្មានទេ!',
            ),
          },
        ),
        tf(t('“Eighteen” is 80.', '«Eighteen» គឺ 80។'), false, {
          explanation: t('Eighteen is 18. Eighty is 80.', 'Eighteen គឺ 18។ Eighty គឺ 80។'),
        }),
      ),
      revealChallenge(
        'multiple_choice',
        match(t('Match the number to the word.', 'ផ្គូផ្គងលេខជាមួយពាក្យ។'), [
          ['3', 'three'],
          ['8', 'eight'],
          ['11', 'eleven'],
          ['60', 'sixty'],
        ]),
        mc(
          t('What is three plus four? Answer in words.', 'បីបូកបួនស្មើប៉ុន្មាន? ឆ្លើយជាពាក្យ។'),
          'seven',
          ['six', 'eight', 'twelve'],
        ),
        mc(
          t(
            '“My phone number is zero one two…” What is “zero”?',
            '«My phone number is zero one two…» តើ «zero» ជាលេខអ្វី?',
          ),
          '0',
          ['10', '2', '100'],
        ),
        mc(
          t('How old? “I am thirteen years old.”', 'អាយុប៉ុន្មាន? «I am thirteen years old.»'),
          '13',
          ['30', '3', '31'],
        ),
        spell(t('Listen 🔊 and spell the number.', 'ស្តាប់ 🔊 ហើយប្រកបលេខ។'), 'five', {
          say: 'five',
          extra: 'v',
        }),
        typeIt(t('Type 10 in words.', 'វាយ 10 ជាពាក្យ។'), 'ten'),
        typeIt(
          t('Listen 🔊 and type the number in words.', 'ស្តាប់ 🔊 ហើយវាយលេខជាពាក្យ។'),
          'twenty',
          { say: 'twenty' },
        ),
        mc(
          t('Which comes next: ten, twenty, thirty, …?', 'អ្វីមកបន្ទាប់៖ ten, twenty, thirty, …?'),
          'forty',
          ['fourteen', 'thirty-one', 'fifty'],
        ),
      ),
      game(
        memory(t('Match each number to its word.', 'ផ្គូផ្គងលេខនីមួយៗជាមួយពាក្យ។'), [
          ['4', 'four'],
          ['9', 'nine'],
          ['14', 'fourteen'],
          ['40', 'forty'],
        ]),
        catchIt(
          t('Catch the EVEN numbers (words)!', 'ចាប់លេខគូ (ជាពាក្យ)!'),
          ['two', 'six', 'ten', 'twelve'],
          ['three', 'five', 'nine', 'eleven'],
        ),
      ),
      reward(
        t(
          'One, two, three — you can count in English! 🔢',
          'មួយ ពីរ បី — អ្នករាប់ជាភាសាអង់គ្លេសបានហើយ! 🔢',
        ),
      ),
    ],
  ),

  // 4 ─────────────────────────────────────────────────────────────
  lesson(
    W,
    'colours-and-shapes',
    '🎨',
    t('Colours & Shapes', 'ពណ៌ និងរូបរាង'),
    t('Name colours and shapes, and describe things.', 'ដាក់ឈ្មោះពណ៌ និងរូបរាង ហើយពិពណ៌នារបស់។'),
    9,
    [
      intro(
        '🎨',
        t(
          'Red, blue, green… let’s describe the world in English!',
          'ក្រហម ខៀវ បៃតង… តោះពិពណ៌នាពិភពលោកជាភាសាអង់គ្លេស!',
        ),
      ),
      learn(
        [
          '🔴',
          'red, blue, green, yellow',
          t('ក្រហម ខៀវ បៃតង លឿង', 'ក្រហម ខៀវ បៃតង លឿង'),
          'red, blue, green, yellow',
        ],
        [
          '⚫',
          'black, white, orange, pink',
          t('ខ្មៅ ស ទឹកក្រូច ផ្កាឈូក', 'ខ្មៅ ស ទឹកក្រូច ផ្កាឈូក'),
          'black, white, orange, pink',
        ],
        [
          '🔺',
          'circle, square, triangle',
          t('រង្វង់ ការេ ត្រីកោណ', 'រង្វង់ ការេ ត្រីកោណ'),
          'circle, square, triangle',
        ],
        [
          '🎈',
          t('Colour first!', 'ពណ៌មុន!'),
          t(
            'In English the colour comes BEFORE the thing: a red ball.',
            'ក្នុងភាសាអង់គ្លេស ពណ៌នៅមុនរបស់៖ a red ball។',
          ),
          'a red ball',
        ],
      ),
      see(
        t(
          'a red ball 🔴   a blue sky 🌤️   a green leaf 🍃',
          'a red ball 🔴   a blue sky 🌤️   a green leaf 🍃',
        ),
        t(
          'Colour + thing. Khmer says it the other way round: បាល់ក្រហម.',
          'ពណ៌ + របស់។ ភាសាខ្មែរនិយាយបញ្ច្រាស៖ បាល់ក្រហម។',
        ),
      ),
      revealPlay(
        'image_choice',
        pictureChoice(
          t('Which one is GREEN?', 'តើមួយណាពណ៌បៃតង?'),
          ['🍏', t('green apple', 'ប៉ោមបៃតង')],
          [
            ['🍎', t('red apple', 'ប៉ោមក្រហម')],
            ['🍋', t('lemon', 'ក្រូចឆ្មា')],
            ['🍇', t('grapes', 'ទំពាំងបាយជូ')],
          ],
        ),
        pictureChoice(
          t('Which one is a TRIANGLE?', 'តើមួយណាជាត្រីកោណ?'),
          ['🔺', t('triangle', 'ត្រីកោណ')],
          [
            ['⚪', t('circle', 'រង្វង់')],
            ['🟦', t('square', 'ការេ')],
            ['⭐', t('star', 'ផ្កាយ')],
          ],
        ),
        mc(t('What colour is the sky on a sunny day?', 'តើមេឃពណ៌អ្វីនៅថ្ងៃភ្លឺ?'), 'blue', [
          'red',
          'black',
          'pink',
        ]),
        mc(t('What colour is a banana?', 'តើចេកពណ៌អ្វី?'), 'yellow', ['blue', 'purple', 'grey']),
        mc(
          t('Listen 🔊. Which colour?', 'ស្តាប់ 🔊។ ពណ៌អ្វី?'),
          t('orange', 'ទឹកក្រូច'),
          [t('pink', 'ផ្កាឈូក'), t('white', 'ស'), t('brown', 'ត្នោត')],
          { say: 'orange' },
        ),
        mc(t('Which is correct English?', 'តើមួយណាជាភាសាអង់គ្លេសត្រឹមត្រូវ?'), 'a black cat', [
          'a cat black',
          'black a cat',
          'cat a black',
        ]),
        mc(t('A square has … sides.', 'ការេមាន … ជ្រុង។'), 'four', ['three', 'five', 'six']),
        tf(t('“Circle” is a round shape.', '«Circle» ជារូបរាងមូល។'), true),
      ),
      revealChallenge(
        'multiple_choice',
        match(t('Match the colour to the Khmer word.', 'ផ្គូផ្គងពណ៌ជាមួយពាក្យខ្មែរ។'), [
          ['red', same('ក្រហម')],
          ['white', same('ស')],
          ['black', same('ខ្មៅ')],
          ['green', same('បៃតង')],
        ]),
        sortInto(
          t('Colour or shape?', 'ពណ៌ ឬរូបរាង?'),
          [
            ['c', t('Colour', 'ពណ៌'), '🎨'],
            ['s', t('Shape', 'រូបរាង'), '🔷'],
          ],
          [
            ['purple', 'c'],
            ['brown', 'c'],
            ['grey', 'c'],
            ['rectangle', 's'],
            ['circle', 's'],
            ['triangle', 's'],
          ],
        ),
        buildSentence(
          t('Put the words in order.', 'តម្រៀបពាក្យឱ្យត្រូវលំដាប់។'),
          'I have a blue bag.',
          { say: 'I have a blue bag.' },
        ),
        spell(t('Listen 🔊 and spell the colour.', 'ស្តាប់ 🔊 ហើយប្រកបពណ៌។'), 'red', {
          say: 'red',
          extra: 'o',
        }),
        spell(t('Listen 🔊 and spell the shape.', 'ស្តាប់ 🔊 ហើយប្រកបរូបរាង។'), 'square', {
          say: 'square',
        }),
        typeIt(t('What colour is milk? Type it.', 'ទឹកដោះគោពណ៌អ្វី? វាយវា។'), 'white'),
        mc(
          t(
            'Which shape is a computer screen usually?',
            'តើអេក្រង់កុំព្យូទ័រជាធម្មតាមានរូបរាងអ្វី?',
          ),
          'rectangle',
          ['circle', 'triangle', 'star'],
        ),
        mc(t('Mix red and white. You get…', 'លាយក្រហម និងស។ អ្នកទទួលបាន…'), 'pink', [
          'green',
          'black',
          'blue',
        ]),
      ),
      game(
        catchIt(
          t('Catch the COLOUR words!', 'ចាប់ពាក្យពណ៌!'),
          ['red', 'blue', 'yellow', 'green', 'pink'],
          ['circle', 'dog', 'ten', 'happy'],
          { speed: 'fast' },
        ),
        memory(t('Match each picture to its word.', 'ផ្គូផ្គងរូបនីមួយៗជាមួយពាក្យ។'), [
          ['🔴', 'red circle'],
          ['🟦', 'blue square'],
          ['🔺', 'red triangle'],
          ['⭐', 'yellow star'],
        ]),
      ),
      reward(
        t(
          'Colourful! 🎨 Now you can describe things in English.',
          'ចម្រុះពណ៌! 🎨 ឥឡូវអ្នកអាចពិពណ៌នារបស់ជាភាសាអង់គ្លេសបាន។',
        ),
      ),
    ],
  ),

  // 5 ─────────────────────────────────────────────────────────────
  lesson(
    W,
    'my-family',
    '👨‍👩‍👧',
    t('My Family', 'គ្រួសាររបស់ខ្ញុំ'),
    t(
      'Family words and talking about the people you love.',
      'ពាក្យគ្រួសារ និងការនិយាយអំពីមនុស្សដែលអ្នកស្រលាញ់។',
    ),
    9,
    [
      intro(
        '👨‍👩‍👧',
        t(
          'Who is in your family? Let’s learn to talk about them in English.',
          'តើគ្រួសារអ្នកមាននរណាខ្លះ? តោះរៀននិយាយអំពីពួកគេជាភាសាអង់គ្លេស។',
        ),
      ),
      learn(
        [
          '👩',
          'mother / father',
          t('ម្តាយ / ឪពុក (mum / dad)', 'ម្តាយ / ឪពុក (mum / dad)'),
          'mother, father',
        ],
        [
          '👧',
          'sister / brother',
          t('បងស្រី ប្អូនស្រី / បងប្រុស ប្អូនប្រុស', 'បងស្រី ប្អូនស្រី / បងប្រុស ប្អូនប្រុស'),
          'sister, brother',
        ],
        [
          '👵',
          'grandmother / grandfather',
          t('ជីដូន / ជីតា', 'ជីដូន / ជីតា'),
          'grandmother, grandfather',
        ],
        [
          '👨‍👩‍👧',
          t('This is my…', 'នេះគឺ…របស់ខ្ញុំ'),
          'This is my sister. Her name is Lina.',
          'This is my sister. Her name is Lina.',
        ],
      ),
      see(
        t(
          'I have one brother and two sisters.\nMy father is a farmer.',
          'I have one brother and two sisters.\nMy father is a farmer.',
        ),
        t(
          'One brother (no “s”), two sisters (add “s” for more than one).',
          'one brother (គ្មាន «s») two sisters (បន្ថែម «s» ពេលច្រើនជាងមួយ)។',
        ),
      ),
      revealPlay(
        'multiple_choice',
        mc(t('Your mother’s mother is your…', 'ម្តាយរបស់ម្តាយអ្នក គឺជា…របស់អ្នក'), 'grandmother', [
          'aunt',
          'sister',
          'cousin',
        ]),
        mc(
          t('Your father’s brother is your…', 'បងប្រុស ឬប្អូនប្រុសរបស់ឪពុក គឺជា…របស់អ្នក'),
          'uncle',
          ['grandfather', 'cousin', 'son'],
        ),
        mc(t('Your uncle’s child is your…', 'កូនរបស់ពូ គឺជា…របស់អ្នក'), 'cousin', [
          'niece',
          'brother',
          'aunt',
        ]),
        mc(t('A girl is her parents’…', 'ក្មេងស្រីម្នាក់គឺជា…របស់ឪពុកម្តាយ'), 'daughter', [
          'son',
          'uncle',
          'grandson',
        ]),
        mc(
          t('Listen 🔊. Who is it?', 'ស្តាប់ 🔊។ តើជានរណា?'),
          t('brother', 'បងប្អូនប្រុស'),
          [t('mother', 'ម្តាយ'), t('father', 'ឪពុក'), t('sister', 'បងប្អូនស្រី')],
          { say: 'This is my brother.' },
        ),
        mc(t('“Mum” is another word for…', '«Mum» ជាពាក្យមួយទៀតសម្រាប់…'), 'mother', [
          'grandmother',
          'aunt',
          'sister',
        ]),
        tf(t('“Parents” means mother and father.', '«Parents» មានន័យថា ម្តាយ និងឪពុក។'), true),
        mc(t('Which is correct?', 'តើមួយណាត្រឹមត្រូវ?'), 'I have two brothers.', [
          'I have two brother.',
          'I have two brotheres.',
          'I has two brothers.',
        ]),
      ),
      revealChallenge(
        'multiple_choice',
        match(t('Match the family words.', 'ផ្គូផ្គងពាក្យគ្រួសារ។'), [
          ['father', same('ឪពុក')],
          ['mother', same('ម្តាយ')],
          ['grandfather', same('ជីតា')],
          ['sister', same('បងប្អូនស្រី')],
        ]),
        sortInto(
          t('Boy/man or girl/woman?', 'ប្រុស ឬស្រី?'),
          [
            ['m', t('Male', 'ប្រុស'), '👨'],
            ['f', t('Female', 'ស្រី'), '👩'],
          ],
          [
            ['brother', 'm'],
            ['uncle', 'm'],
            ['son', 'm'],
            ['aunt', 'f'],
            ['daughter', 'f'],
            ['grandmother', 'f'],
          ],
        ),
        buildSentence(
          t('Put the words in order.', 'តម្រៀបពាក្យឱ្យត្រូវលំដាប់។'),
          'This is my little sister.',
          { say: 'This is my little sister.' },
        ),
        spell(t('Listen 🔊 and spell the word.', 'ស្តាប់ 🔊 ហើយប្រកបពាក្យ។'), 'mother', {
          say: 'mother',
        }),
        typeIt(t('Type the English word for ឪពុក.', 'វាយពាក្យអង់គ្លេសសម្រាប់ ឪពុក។'), 'father', {
          accept: ['dad'],
        }),
        mc(
          t(
            '“He” is for a boy. What is for a girl?',
            '«He» សម្រាប់ក្មេងប្រុស។ តើអ្វីសម្រាប់ក្មេងស្រី?',
          ),
          'she',
          ['he', 'it', 'we'],
        ),
        mc(
          t('Complete: “My sister ___ 10 years old.”', 'បំពេញ៖ «My sister ___ 10 years old.»'),
          'is',
          ['am', 'are', 'be'],
        ),
        mc(
          t('How many people? “my parents and me”', 'មនុស្សប៉ុន្មាននាក់? «my parents and me»'),
          'three',
          ['two', 'four', 'one'],
        ),
      ),
      game(
        memory(t('Find the family pairs.', 'រកគូគ្រួសារ។'), [
          [['👨', 'father'], same('ឪពុក')],
          [['👩', 'mother'], same('ម្តាយ')],
          [['👴', 'grandfather'], same('ជីតា')],
          [['👵', 'grandmother'], same('ជីដូន')],
        ]),
        catchIt(
          t('Catch the FAMILY words!', 'ចាប់ពាក្យគ្រួសារ!'),
          ['aunt', 'uncle', 'cousin', 'parents', 'son'],
          ['teacher', 'window', 'happy', 'run'],
        ),
      ),
      reward(
        t(
          'Family is everything! 👨‍👩‍👧 Now you can talk about yours.',
          'គ្រួសារគឺជាអ្វីៗទាំងអស់! 👨‍👩‍👧 ឥឡូវអ្នកអាចនិយាយអំពីគ្រួសារអ្នកបាន។',
        ),
      ),
    ],
  ),

  // 6 ─────────────────────────────────────────────────────────────
  lesson(
    W,
    'classroom-and-computer-words',
    '🏫',
    t('Classroom & Computer Words', 'ពាក្យក្នុងថ្នាក់ និងកុំព្យូទ័រ'),
    t(
      'The English you see at school and on a computer.',
      'ភាសាអង់គ្លេសដែលអ្នកឃើញនៅសាលា និងលើកុំព្យូទ័រ។',
    ),
    10,
    [
      intro(
        '🏫',
        t(
          'Computers speak English! Learn the words you will see on every screen.',
          'កុំព្យូទ័រនិយាយភាសាអង់គ្លេស! រៀនពាក្យដែលអ្នកនឹងឃើញលើអេក្រង់គ្រប់ពេល។',
        ),
      ),
      learn(
        [
          '✏️',
          'pen, pencil, book, desk',
          t('ប៊ិច ខ្មៅដៃ សៀវភៅ តុ', 'ប៊ិច ខ្មៅដៃ សៀវភៅ តុ'),
          'pen, pencil, book, desk',
        ],
        [
          '💻',
          'screen, keyboard, mouse',
          t('អេក្រង់ ក្តារចុច កណ្តុរ', 'អេក្រង់ ក្តារចុច កណ្តុរ'),
          'screen, keyboard, mouse',
        ],
        [
          '🖱️',
          'click, open, close, save',
          t('ចុច បើក បិទ រក្សាទុក', 'ចុច បើក បិទ រក្សាទុក'),
          'click, open, close, save',
        ],
        ['🗑️', 'delete, file, folder', t('លុប ឯកសារ ថត', 'លុប ឯកសារ ថត'), 'delete, file, folder'],
      ),
      see(
        t(
          '[ Open ]  [ Save ]  [ Cancel ]  [ Delete ]',
          '[ Open ]  [ Save ]  [ Cancel ]  [ Delete ]',
        ),
        t(
          'Buttons you will see in almost every app.',
          'ប៊ូតុងដែលអ្នកនឹងឃើញក្នុងកម្មវិធីស្ទើរតែទាំងអស់។',
        ),
      ),
      revealPlay(
        'multiple_choice',
        pictureChoice(
          t('Which one is a “pencil”?', 'តើមួយណាជា «pencil»?'),
          ['✏️', 'pencil'],
          [
            ['📕', 'book'],
            ['✂️', 'scissors'],
            ['📏', 'ruler'],
          ],
        ),
        pictureChoice(
          t('Which one is a “mouse” (for a computer)?', 'តើមួយណាជា «mouse» (សម្រាប់កុំព្យូទ័រ)?'),
          ['🖱️', 'mouse'],
          [
            ['⌨️', 'keyboard'],
            ['🖥️', 'screen'],
            ['🖨️', 'printer'],
          ],
        ),
        mc(
          t('A button says “Save”. What does it do?', 'ប៊ូតុងមួយសរសេរថា «Save»។ តើវាធ្វើអ្វី?'),
          t('Keeps your work', 'រក្សាការងាររបស់អ្នក'),
          [
            t('Deletes your work', 'លុបការងាររបស់អ្នក'),
            t('Prints it', 'បោះពុម្ពវា'),
            t('Closes the app', 'បិទកម្មវិធី'),
          ],
        ),
        mc(
          t('A button says “Cancel”. What does it do?', 'ប៊ូតុងមួយសរសេរថា «Cancel»។ តើវាធ្វើអ្វី?'),
          t('Stops and goes back', 'ឈប់ ហើយត្រឡប់ក្រោយ'),
          [
            t('Saves', 'រក្សាទុក'),
            t('Opens a file', 'បើកឯកសារ'),
            t('Turns off the computer', 'បិទកុំព្យូទ័រ'),
          ],
        ),
        mc(
          t('Listen 🔊. Which word?', 'ស្តាប់ 🔊។ ពាក្យអ្វី?'),
          'folder',
          ['file', 'follow', 'flower'],
          { say: 'folder' },
        ),
        mc(
          t('The teacher says “Open your books.” You…', 'គ្រូនិយាយថា «Open your books.» អ្នក…'),
          t('open your book', 'បើកសៀវភៅ'),
          [t('close your book', 'បិទសៀវភៅ'), t('stand up', 'ក្រោកឈរ'), t('go home', 'ទៅផ្ទះ')],
        ),
        mc(t('The opposite of “open” is…', 'ពាក្យផ្ទុយនៃ «open» គឺ…'), 'close', [
          'save',
          'click',
          'start',
        ]),
        tf(t('“Delete” means remove.', '«Delete» មានន័យថា ដកចេញ។'), true),
        mc(
          t('“Log in” means…', '«Log in» មានន័យថា…'),
          t('Enter your username and password', 'បញ្ចូលឈ្មោះអ្នកប្រើ និងពាក្យសម្ងាត់'),
          [t('Turn off', 'បិទ'), t('Buy something', 'ទិញអ្វីមួយ'), t('Print', 'បោះពុម្ព')],
        ),
      ),
      revealChallenge(
        'multiple_choice',
        match(t('Match the button to its meaning.', 'ផ្គូផ្គងប៊ូតុងជាមួយអត្ថន័យ។'), [
          ['Save', same('រក្សាទុក')],
          ['Delete', same('លុប')],
          ['Open', same('បើក')],
          ['Search', same('ស្វែងរក')],
        ]),
        sortInto(
          t('Classroom thing or computer thing?', 'របស់ក្នុងថ្នាក់ ឬរបស់កុំព្យូទ័រ?'),
          [
            ['class', t('Classroom', 'ថ្នាក់រៀន'), '🏫'],
            ['pc', t('Computer', 'កុំព្យូទ័រ'), '💻'],
          ],
          [
            ['whiteboard', 'class'],
            ['eraser', 'class'],
            ['ruler', 'class'],
            ['keyboard', 'pc'],
            ['screen', 'pc'],
            ['USB cable', 'pc'],
          ],
        ),
        spell(t('Listen 🔊 and spell the word.', 'ស្តាប់ 🔊 ហើយប្រកបពាក្យ។'), 'click', {
          say: 'click',
          extra: 'e',
        }),
        typeIt(
          t(
            'Type the word on the button that keeps your work.',
            'វាយពាក្យលើប៊ូតុងដែលរក្សាការងាររបស់អ្នក។',
          ),
          'save',
        ),
        buildSentence(
          t('Put the instruction in order.', 'តម្រៀបការណែនាំឱ្យត្រូវលំដាប់។'),
          'Click the blue button.',
          { say: 'Click the blue button.' },
        ),
        mc(
          t('“Username” is…', '«Username» គឺ…'),
          t('The name you log in with', 'ឈ្មោះដែលអ្នកប្រើចូល'),
          [
            t('Your password', 'ពាក្យសម្ងាត់'),
            t('Your teacher’s name', 'ឈ្មោះគ្រូ'),
            t('A type of mouse', 'ប្រភេទកណ្តុរ'),
          ],
        ),
        mc(t('Which word means “ស្វែងរក”?', 'តើពាក្យណាមានន័យថា «ស្វែងរក»?'), 'search', [
          'share',
          'start',
          'send',
        ]),
      ),
      game(
        memory(t('Find the computer word pairs.', 'រកគូពាក្យកុំព្យូទ័រ។'), [
          [['🖱️', 'mouse'], same('កណ្តុរ')],
          [['⌨️', 'keyboard'], same('ក្តារចុច')],
          [['🖥️', 'screen'], same('អេក្រង់')],
          [['📁', 'folder'], same('ថត')],
        ]),
        catchIt(
          t('Catch the BUTTON words you see in apps!', 'ចាប់ពាក្យប៊ូតុងដែលអ្នកឃើញក្នុងកម្មវិធី!'),
          ['Save', 'Open', 'Cancel', 'Delete', 'Send'],
          ['Banana', 'Sister', 'Rain', 'Happy'],
        ),
      ),
      reward(
        t(
          'Now the computer’s English is your English too! 💻',
          'ឥឡូវភាសាអង់គ្លេសរបស់កុំព្យូទ័រ ក៏ជាភាសារបស់អ្នកដែរ! 💻',
        ),
      ),
    ],
  ),

  // 7 ─────────────────────────────────────────────────────────────
  lesson(
    W,
    'days-months-and-time',
    '📅',
    t('Days, Months & Time', 'ថ្ងៃ ខែ និងម៉ោង'),
    t('Days of the week, months and telling the time.', 'ថ្ងៃក្នុងសប្តាហ៍ ខែ និងការប្រាប់ម៉ោង។'),
    10,
    [
      intro(
        '📅',
        t(
          '“See you on Monday at 8 o’clock!” — let’s understand sentences like this.',
          '«ជួបគ្នាថ្ងៃច័ន្ទម៉ោង 8!» — តោះយល់ប្រយោគបែបនេះ។',
        ),
      ),
      learn(
        [
          '📆',
          t('Days', 'ថ្ងៃ'),
          'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday',
          'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday',
        ],
        [
          '🗓️',
          t('Months', 'ខែ'),
          'January, February, March … December',
          'January, February, March, April, May, June',
        ],
        [
          '🕗',
          t('Time', 'ម៉ោង'),
          t(
            '8:00 = eight o’clock. 8:30 = half past eight.',
            '8:00 = eight o’clock។ 8:30 = half past eight។',
          ),
          'eight o’clock. half past eight.',
        ],
        [
          '📌',
          t('on / in / at', 'on / in / at'),
          t('on Monday · in May · at 8 o’clock', 'on Monday · in May · at 8 o’clock'),
          'on Monday, in May, at eight o’clock',
        ],
      ),
      see(
        t(
          'Class is on Monday at 7:30.\nThe holiday is in April.',
          'Class is on Monday at 7:30.\nThe holiday is in April.',
        ),
        t(
          'Days take “on”, months take “in”, times take “at”.',
          'ថ្ងៃប្រើ «on» ខែប្រើ «in» ម៉ោងប្រើ «at»។',
        ),
      ),
      revealPlay(
        'multiple_choice',
        mc(t('Which day comes after Tuesday?', 'តើថ្ងៃណាមកបន្ទាប់ពី Tuesday?'), 'Wednesday', [
          'Monday',
          'Thursday',
          'Friday',
        ]),
        mc(t('Which day is at the weekend?', 'តើថ្ងៃណាជាចុងសប្តាហ៍?'), 'Saturday', [
          'Monday',
          'Wednesday',
          'Friday',
        ]),
        mc(t('Khmer New Year is in…', 'ចូលឆ្នាំខ្មែរគឺនៅក្នុងខែ…'), 'April', [
          'January',
          'October',
          'June',
        ]),
        mc(t('What time is 3:00?', 'តើ 3:00 គឺម៉ោងប៉ុន្មាន?'), 'three o’clock', [
          'half past three',
          'thirteen o’clock',
          'three thirty',
        ]),
        mc(t('What time is 6:30?', 'តើ 6:30 គឺម៉ោងប៉ុន្មាន?'), 'half past six', [
          'six o’clock',
          'half past seven',
          'six fifteen',
        ]),
        mc(
          t('Listen 🔊. Which day?', 'ស្តាប់ 🔊។ ថ្ងៃអ្វី?'),
          'Thursday',
          ['Tuesday', 'Thirsty', 'Sunday'],
          { say: 'Thursday' },
        ),
        mc(t('Complete: “My birthday is ___ May.”', 'បំពេញ៖ «My birthday is ___ May.»'), 'in', [
          'on',
          'at',
          'to',
        ]),
        mc(t('Complete: “The test is ___ Friday.”', 'បំពេញ៖ «The test is ___ Friday.»'), 'on', [
          'in',
          'at',
          'of',
        ]),
        tf(
          t(
            'Days and months start with a capital letter in English.',
            'ថ្ងៃ និងខែចាប់ផ្តើមដោយអក្សរធំក្នុងភាសាអង់គ្លេស។',
          ),
          true,
        ),
      ),
      revealChallenge(
        'multiple_choice',
        mc(
          t('Complete: “School starts ___ 7 o’clock.”', 'បំពេញ៖ «School starts ___ 7 o’clock.»'),
          'at',
          ['on', 'in', 'by'],
        ),
        match(t('Match the day to the Khmer.', 'ផ្គូផ្គងថ្ងៃជាមួយភាសាខ្មែរ។'), [
          ['Monday', same('ថ្ងៃច័ន្ទ')],
          ['Friday', same('ថ្ងៃសុក្រ')],
          ['Saturday', same('ថ្ងៃសៅរ៍')],
          ['Sunday', same('ថ្ងៃអាទិត្យ')],
        ]),
        mc(t('How many days are in a week?', 'តើមួយសប្តាហ៍មានប៉ុន្មានថ្ងៃ?'), 'seven', [
          'five',
          'six',
          'twelve',
        ]),
        mc(t('Which month comes after March?', 'តើខែណាមកបន្ទាប់ពី March?'), 'April', [
          'May',
          'February',
          'August',
        ]),
        spell(t('Listen 🔊 and spell the day.', 'ស្តាប់ 🔊 ហើយប្រកបថ្ងៃ។'), 'Monday', {
          say: 'Monday',
        }),
        typeIt(t('Type the first month of the year.', 'វាយខែដំបូងនៃឆ្នាំ។'), 'January'),
        buildSentence(
          t('Put the words in order.', 'តម្រៀបពាក្យឱ្យត្រូវលំដាប់។'),
          'See you on Monday.',
          { say: 'See you on Monday.' },
        ),
        mc(t('“Today is Sunday.” Tomorrow is…', '«Today is Sunday.» ថ្ងៃស្អែកគឺ…'), 'Monday', [
          'Saturday',
          'Tuesday',
          'Friday',
        ]),
      ),
      game(
        catchIt(
          t('Catch the WEEKDAYS (Monday to Friday)!', 'ចាប់ថ្ងៃធ្វើការ (ច័ន្ទដល់សុក្រ)!'),
          ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          ['Saturday', 'Sunday', 'January', 'April'],
        ),
        memory(t('Match each clock to the time words.', 'ផ្គូផ្គងនាឡិកានីមួយៗជាមួយពាក្យម៉ោង។'), [
          [['🕗', '8:00'], 'eight o’clock'],
          [['🕤', '9:30'], 'half past nine'],
          [['🕐', '1:00'], 'one o’clock'],
          [['🕠', '5:30'], 'half past five'],
        ]),
      ),
      reward(
        t(
          'Right on time! ⏰ You can talk about days, months and time.',
          'ទាន់ពេល! ⏰ អ្នកអាចនិយាយអំពីថ្ងៃ ខែ និងម៉ោងបាន។',
        ),
      ),
    ],
  ),

  // 8 ─────────────────────────────────────────────────────────────
  lesson(
    W,
    'am-is-are',
    '🧱',
    t('I am, You are, She is', 'I am, You are, She is'),
    t(
      'The most important verb in English: to be.',
      'កិរិយាសព្ទសំខាន់បំផុតក្នុងភាសាអង់គ្លេស៖ to be។',
    ),
    10,
    [
      intro(
        '🧱',
        t(
          '“Am”, “is” and “are” are in almost every English sentence. Let’s master them!',
          '«am» «is» និង «are» មាននៅក្នុងប្រយោគអង់គ្លេសស្ទើរតែទាំងអស់។ តោះរៀនឱ្យស្ទាត់!',
        ),
      ),
      learn(
        [
          '🙋',
          'I am',
          t('Only with “I”: I am a student.', 'ប្រើតែជាមួយ «I»៖ I am a student។'),
          'I am a student.',
        ],
        [
          '👩',
          'he / she / it is',
          t(
            'One person or thing: She is happy. It is hot.',
            'មនុស្ស ឬរបស់មួយ៖ She is happy។ It is hot។',
          ),
          'She is happy. It is hot.',
        ],
        [
          '👥',
          'you / we / they are',
          t('You, or more than one: We are friends.', 'អ្នក ឬច្រើនជាងមួយ៖ We are friends។'),
          'We are friends.',
        ],
        [
          '✂️',
          t('Short forms', 'ទម្រង់ខ្លី'),
          "I'm · you're · he's · she's · it's · we're · they're",
          "I'm, you're, she's, we're",
        ],
      ),
      see(
        t('I am 13. ✔\nI is 13. ✘', 'I am 13. ✔\nI is 13. ✘'),
        t('“I” always goes with “am”.', '«I» តែងតែប្រើជាមួយ «am»។'),
      ),
      revealPlay(
        'multiple_choice',
        mc(t('I ___ a student.', 'I ___ a student.'), 'am', ['is', 'are', 'be']),
        mc(t('She ___ my teacher.', 'She ___ my teacher.'), 'is', ['am', 'are', 'be']),
        mc(t('They ___ from Battambang.', 'They ___ from Battambang.'), 'are', ['is', 'am', 'be']),
        mc(t('The computer ___ new.', 'The computer ___ new.'), 'is', ['are', 'am', 'be']),
        mc(t('We ___ in class 7A.', 'We ___ in class 7A.'), 'are', ['is', 'am', 'be']),
        mc(t('You ___ very kind.', 'You ___ very kind.'), 'are', ['is', 'am', 'be']),
        mc(t('What is the short form of “I am”?', 'តើទម្រង់ខ្លីនៃ «I am» ជាអ្វី?'), "I'm", [
          "Im'",
          "I'am",
          'Iam',
        ]),
        mc(
          t('Listen 🔊. Which word do you hear?', 'ស្តាប់ 🔊។ តើអ្នកឮពាក្យអ្វី?'),
          'are',
          ['am', 'is', 'be'],
          { say: 'They are happy.' },
        ),
        tf(t('“He are tall” is correct.', '«He are tall» ត្រឹមត្រូវ។'), false, {
          explanation: t('He is tall.', 'He is tall។'),
        }),
      ),
      revealChallenge(
        'multiple_choice',
        sortInto(
          t('Which word goes with each one: is or are?', 'ពាក្យណាប្រើជាមួយនីមួយៗ៖ is ឬ are?'),
          [
            ['is', 'is'],
            ['are', 'are'],
          ],
          [
            ['he', 'is'],
            ['it', 'is'],
            ['my sister', 'is'],
            ['we', 'are'],
            ['they', 'are'],
            ['my friends', 'are'],
          ],
        ),
        mc(
          t('Make it negative: “I am tired.”', 'ធ្វើជាប្រយោគបដិសេធ៖ «I am tired.»'),
          'I am not tired.',
          ['I not am tired.', 'I am no tired.', 'I don’t tired.'],
        ),
        mc(
          t('Make a question: “You are ready.”', 'បង្កើតសំណួរ៖ «You are ready.»'),
          'Are you ready?',
          ['You are ready?', 'Is you ready?', 'Am you ready?'],
        ),
        buildSentence(
          t('Put the words in order.', 'តម្រៀបពាក្យឱ្យត្រូវលំដាប់។'),
          'My brother is a doctor.',
          { say: 'My brother is a doctor.' },
        ),
        buildSentence(
          t('Put the words in order.', 'តម្រៀបពាក្យឱ្យត្រូវលំដាប់។'),
          'Are you a student?',
          { say: 'Are you a student?' },
        ),
        typeIt(
          t(
            'Complete with one word: “It ___ sunny today.”',
            'បំពេញពាក្យមួយ៖ «It ___ sunny today.»',
          ),
          'is',
        ),
        typeIt(
          t('Write the short form of “they are”.', 'សរសេរទម្រង់ខ្លីនៃ «they are»។'),
          "they're",
          { accept: ['they’re'] },
        ),
        mc(t('Dara and Sokha ___ friends.', 'Dara and Sokha ___ friends.'), 'are', [
          'is',
          'am',
          'be',
        ]),
      ),
      game(
        memory(t('Match each word to its partner.', 'ផ្គូផ្គងពាក្យនីមួយៗជាមួយគូរបស់វា។'), [
          ['I', 'am'],
          ['she', 'is'],
          ['they', 'are'],
          ['I am', "I'm"],
        ]),
        catchIt(
          t('Catch the CORRECT sentences!', 'ចាប់ប្រយោគត្រឹមត្រូវ!'),
          ['I am happy.', 'She is ten.', 'We are ready.', 'It is cold.'],
          ['I is happy.', 'They is late.', 'He are tall.', 'You am kind.'],
          { speed: 'slow' },
        ),
      ),
      reward(
        t(
          'You are amazing — and now you know why it is “are”! 🌟',
          'អ្នកអស្ចារ្យណាស់ — ហើយឥឡូវអ្នកដឹងថាហេតុអ្វីប្រើ «are»! 🌟',
        ),
      ),
    ],
  ),
];
