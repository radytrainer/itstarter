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
  order,
  pictureChoice,
  revealChallenge,
  revealPlay,
  reward,
  robot,
  same,
  see,
  sortInto,
  spell,
  tf,
  typeIt,
} from '../dsl';
import { ENGLISH_WORLD as W } from './english-1';

// 🔤 English for Beginners, lessons 9–15. Khmer (km) strings are DRAFTS for native review.
export const ENGLISH_LESSONS_2: LessonSeed[] = [
  // 9 ─────────────────────────────────────────────────────────────
  lesson(
    W,
    'i-you-he-she',
    '🙋',
    t('I, You, He, She — My, Your, His, Her', 'I, You, He, She — My, Your, His, Her'),
    t(
      'Words for people, and words for what belongs to them.',
      'ពាក្យសម្រាប់មនុស្ស និងពាក្យសម្រាប់អ្វីដែលជារបស់ពួកគេ។',
    ),
    10,
    [
      intro(
        '🙋',
        t(
          'Instead of saying a name again and again, English uses small words: he, she, they…',
          'ជំនួសការនិយាយឈ្មោះម្តងហើយម្តងទៀត ភាសាអង់គ្លេសប្រើពាក្យតូចៗ៖ he, she, they…',
        ),
      ),
      learn(
        [
          '👤',
          'I · you · he · she · it',
          t('ខ្ញុំ · អ្នក · គាត់(ប្រុស) · នាង · វា', 'ខ្ញុំ · អ្នក · គាត់(ប្រុស) · នាង · វា'),
          'I, you, he, she, it',
        ],
        ['👥', 'we · they', t('យើង · ពួកគេ', 'យើង · ពួកគេ'), 'we, they'],
        [
          '🎒',
          'my · your · his · her · its · our · their',
          t(
            '“Whose is it?” — my bag, her phone, their house.',
            '«របស់នរណា?» — my bag, her phone, their house។',
          ),
          'my bag, her phone, their house',
        ],
      ),
      see(
        t(
          'Dara is my friend. He is 12. His bag is blue.',
          'Dara is my friend. He is 12. His bag is blue.',
        ),
        t(
          'Dara → he → his. No need to repeat the name!',
          'Dara → he → his។ មិនចាំបាច់និយាយឈ្មោះម្តងទៀតទេ!',
        ),
      ),
      revealPlay(
        'multiple_choice',
        mc(t('Sokha is a girl. ___ is 11.', 'Sokha ជាក្មេងស្រី។ ___ is 11.'), 'She', [
          'He',
          'It',
          'They',
        ]),
        mc(
          t('Vuthy is a boy. ___ likes football.', 'Vuthy ជាក្មេងប្រុស។ ___ likes football.'),
          'He',
          ['She', 'It', 'We'],
        ),
        mc(t('The laptop is new. ___ is fast.', 'The laptop is new. ___ is fast.'), 'It', [
          'He',
          'She',
          'They',
        ]),
        mc(
          t(
            'Lina and I are friends. ___ are in the same class.',
            'Lina and I are friends. ___ are in the same class.',
          ),
          'We',
          ['They', 'You', 'She'],
        ),
        mc(t('This is Bopha. ___ name is Bopha.', 'This is Bopha. ___ name is Bopha.'), 'Her', [
          'His',
          'She',
          'Their',
        ]),
        mc(t('This is Dara. ___ phone is old.', 'This is Dara. ___ phone is old.'), 'His', [
          'Her',
          'He',
          'Its',
        ]),
        mc(t('I have a cat. ___ cat is white.', 'I have a cat. ___ cat is white.'), 'My', [
          'I',
          'Me',
          'Mine',
        ]),
        mc(
          t('Listen 🔊. Who is it about?', 'ស្តាប់ 🔊។ តើនិយាយអំពីនរណា?'),
          t('a girl', 'ក្មេងស្រី'),
          [t('a boy', 'ក្មេងប្រុស'), t('a group', 'ក្រុមមួយ'), t('a cat', 'ឆ្មា')],
          { say: 'She is my best friend.' },
        ),
      ),
      revealChallenge(
        'multiple_choice',
        match(t('Match each word to its partner.', 'ផ្គូផ្គងពាក្យនីមួយៗជាមួយគូរបស់វា។'), [
          ['I', 'my'],
          ['he', 'his'],
          ['she', 'her'],
          ['they', 'their'],
        ]),
        mc(
          t(
            'The students have new books. ___ books are new.',
            'The students have new books. ___ books are new.',
          ),
          'Their',
          ['They', 'Our', 'His'],
        ),
        mc(
          t('“Is this ___ pen?” “Yes, it is mine.”', '«Is this ___ pen?» «Yes, it is mine.»'),
          'your',
          ['you', 'yours', 'you’re'],
        ),
        buildSentence(
          t('Put the words in order.', 'តម្រៀបពាក្យឱ្យត្រូវលំដាប់។'),
          'Her computer is on the desk.',
          { say: 'Her computer is on the desk.' },
        ),
        buildSentence(
          t('Put the words in order.', 'តម្រៀបពាក្យឱ្យត្រូវលំដាប់។'),
          'We love our school.',
          { say: 'We love our school.' },
        ),
        typeIt(t('Write the word: I → my, you → ?', 'សរសេរពាក្យ៖ I → my, you → ?'), 'your'),
        tf(
          t(
            'We use “his” for a boy and “her” for a girl.',
            'យើងប្រើ «his» សម្រាប់ក្មេងប្រុស និង «her» សម្រាប់ក្មេងស្រី។',
          ),
          true,
        ),
        mc(t('Choose the correct sentence.', 'ជ្រើសប្រយោគត្រឹមត្រូវ។'), 'They are my friends.', [
          'Them are my friends.',
          'Their are my friends.',
          'They is my friends.',
        ]),
      ),
      game(
        memory(
          t(
            'Find the pairs: person word ↔ “belongs to” word.',
            'រកគូ៖ ពាក្យមនុស្ស ↔ ពាក្យ «ជារបស់»។',
          ),
          [
            ['I', 'my'],
            ['you', 'your'],
            ['he', 'his'],
            ['we', 'our'],
          ],
        ),
        catchIt(
          t('Catch the words for PEOPLE (I, you, he…)!', 'ចាប់ពាក្យសម្រាប់មនុស្ស (I, you, he…)!'),
          ['I', 'you', 'he', 'she', 'they'],
          ['my', 'her', 'their', 'our'],
          {
            speed: 'fast',
          },
        ),
      ),
      reward(
        t('He, she, they — you know who is who! 🙋', 'He, she, they — អ្នកដឹងថាអ្នកណាជាអ្នកណា! 🙋'),
      ),
    ],
  ),

  // 10 ────────────────────────────────────────────────────────────
  lesson(
    W,
    'a-an-the-and-plurals',
    '🍎',
    t('A, An, The & More Than One', 'A, An, The និងច្រើនជាងមួយ'),
    t(
      'Small words before things, and how to make plurals.',
      'ពាក្យតូចៗនៅមុខរបស់ និងរបៀបធ្វើពហុវចនៈ។',
    ),
    10,
    [
      intro(
        '🍎',
        t(
          'A book, an apple, the teacher, two cats… let’s learn these tiny but important words!',
          'A book, an apple, the teacher, two cats… តោះរៀនពាក្យតូចៗតែសំខាន់ទាំងនេះ!',
        ),
      ),
      learn(
        [
          '🅰️',
          'a',
          t('Before a consonant sound: a book, a phone.', 'មុនសំឡេងព្យញ្ជនៈ៖ a book, a phone។'),
          'a book, a phone',
        ],
        [
          '🍎',
          'an',
          t(
            'Before a vowel sound: an apple, an egg, an hour.',
            'មុនសំឡេងស្រៈ៖ an apple, an egg, an hour។',
          ),
          'an apple, an egg',
        ],
        [
          '👉',
          'the',
          t('A thing we both know: Close the door.', 'របស់ដែលយើងទាំងពីរស្គាល់៖ Close the door។'),
          'Close the door.',
        ],
        [
          '🐈🐈',
          t('Plurals', 'ពហុវចនៈ'),
          t(
            'Add -s: cat → cats. Add -es after s, x, ch, sh: box → boxes.',
            'បន្ថែម -s៖ cat → cats។ បន្ថែម -es បន្ទាប់ពី s, x, ch, sh៖ box → boxes។',
          ),
          'cats, boxes',
        ],
      ),
      see(
        'a cat → two cats\na box → three boxes\na child → two children',
        t(
          'Some plurals are special: child → children, man → men.',
          'ពហុវចនៈខ្លះពិសេស៖ child → children, man → men។',
        ),
      ),
      revealPlay(
        'multiple_choice',
        mc(t('___ apple', '___ apple'), 'an', ['a', 'the a', 'two']),
        mc(t('___ computer', '___ computer'), 'a', ['an', 'two', 'many']),
        mc(t('___ egg', '___ egg'), 'an', ['a', 'two', 'one a']),
        mc(t('___ umbrella', '___ umbrella'), 'an', ['a', 'two', 'the a']),
        mc(t('one book → two …', 'one book → two …'), 'books', ['bookes', 'book', 'bookies']),
        mc(t('one box → two …', 'one box → two …'), 'boxes', ['boxs', 'box', 'boxies']),
        mc(t('one child → two …', 'one child → two …'), 'children', ['childs', 'childes', 'child']),
        mc(
          t('Listen 🔊. Which word do you hear?', 'ស្តាប់ 🔊។ តើអ្នកឮពាក្យអ្វី?'),
          'an',
          ['a', 'and', 'any'],
          { say: 'I have an orange.' },
        ),
      ),
      revealChallenge(
        'multiple_choice',
        sortInto(
          t('“a” or “an”?', '«a» ឬ «an»?'),
          [
            ['a', 'a'],
            ['an', 'an'],
          ],
          [
            ['dog', 'a'],
            ['mouse', 'a'],
            ['school', 'a'],
            ['orange', 'an'],
            ['idea', 'an'],
            ['email', 'an'],
          ],
        ),
        mc(
          t(
            '“Please open ___ window.” (the window in this room)',
            '«Please open ___ window.» (បង្អួចក្នុងបន្ទប់នេះ)',
          ),
          'the',
          ['a', 'an', 'two'],
        ),
        mc(t('one man → two …', 'one man → two …'), 'men', ['mans', 'mens', 'man']),
        spell(t('Spell the plural: one bus → two …', 'ប្រកបពហុវចនៈ៖ one bus → two …'), 'buses', {
          say: 'buses',
        }),
        typeIt(
          t('Write the plural: one phone → two …', 'សរសេរពហុវចនៈ៖ one phone → two …'),
          'phones',
        ),
        buildSentence(
          t('Put the words in order.', 'តម្រៀបពាក្យឱ្យត្រូវលំដាប់។'),
          'I have an old laptop.',
          { say: 'I have an old laptop.' },
        ),
        tf(
          t(
            'We say “an hour” because “hour” starts with a vowel SOUND.',
            'យើងនិយាយ «an hour» ព្រោះ «hour» ចាប់ផ្តើមដោយសំឡេងស្រៈ។',
          ),
          true,
          {
            explanation: t(
              'The “h” in hour is silent, so it sounds like “our”.',
              '«h» ក្នុង hour មិនបញ្ចេញសំឡេង ដូច្នេះស្តាប់ទៅដូច «our»។',
            ),
          },
        ),
        mc(t('Which is correct?', 'តើមួយណាត្រឹមត្រូវ?'), 'There are three students.', [
          'There are three student.',
          'There is three students.',
          'There are three studentes.',
        ]),
      ),
      game(
        catchIt(
          t('Catch the words that take “an”!', 'ចាប់ពាក្យដែលប្រើ «an»!'),
          ['apple', 'egg', 'orange', 'umbrella', 'ice cream'],
          ['banana', 'cat', 'pen', 'table'],
          {
            speed: 'slow',
          },
        ),
        memory(t('Match one to many.', 'ផ្គូផ្គងមួយ ទៅច្រើន។'), [
          ['cat', 'cats'],
          ['box', 'boxes'],
          ['child', 'children'],
          ['man', 'men'],
        ]),
      ),
      reward(t('A great job — an excellent job! 🍎', 'ការងារល្អ — ការងារដ៏ល្អឥតខ្ចោះ! 🍎')),
    ],
  ),

  // 11 ────────────────────────────────────────────────────────────
  lesson(
    W,
    'my-daily-routine',
    '⏰',
    t('My Daily Routine', 'ទម្លាប់ប្រចាំថ្ងៃរបស់ខ្ញុំ'),
    t(
      'Talk about what you do every day (present simple).',
      'និយាយអំពីអ្វីដែលអ្នកធ្វើរាល់ថ្ងៃ (present simple)។',
    ),
    10,
    [
      intro(
        '⏰',
        t(
          'I wake up, I eat breakfast, I go to school… let’s tell our day in English!',
          'ខ្ញុំក្រោកពីគេង ញ៉ាំអាហារពេលព្រឹក ទៅសាលា… តោះប្រាប់ពីថ្ងៃរបស់យើងជាភាសាអង់គ្លេស!',
        ),
      ),
      learn(
        [
          '🌅',
          t('Every day', 'រាល់ថ្ងៃ'),
          'I wake up at 6. I go to school at 7.',
          'I wake up at six. I go to school at seven.',
        ],
        [
          '➕',
          t('He / she / it + s', 'He / she / it + s'),
          t('She plays football. He watches TV.', 'She plays football។ He watches TV។'),
          'She plays football. He watches TV.',
        ],
        [
          '🚫',
          t('Not', 'មិន'),
          t(
            'I do not (don’t) like coffee. She does not (doesn’t) eat meat.',
            'I do not (don’t) like coffee។ She does not (doesn’t) eat meat។',
          ),
          'I don’t like coffee.',
        ],
        [
          '🔁',
          t('How often?', 'ញឹកញាប់ប៉ុណ្ណា?'),
          'always · usually · sometimes · never',
          'always, usually, sometimes, never',
        ],
      ),
      see(
        t(
          'I get up → I brush my teeth → I eat breakfast → I go to school',
          'I get up → I brush my teeth → I eat breakfast → I go to school',
        ),
        t('Same action every day = present simple.', 'សកម្មភាពដដែលរាល់ថ្ងៃ = present simple។'),
      ),
      revealPlay(
        'multiple_choice',
        mc(t('I ___ to school by bike.', 'I ___ to school by bike.'), 'go', [
          'goes',
          'going',
          'gos',
        ]),
        mc(t('She ___ English every day.', 'She ___ English every day.'), 'studies', [
          'study',
          'studys',
          'studying',
        ]),
        mc(t('He ___ TV in the evening.', 'He ___ TV in the evening.'), 'watches', [
          'watch',
          'watchs',
          'watching',
        ]),
        mc(t('My father ___ at 5 am.', 'My father ___ at 5 am.'), 'gets up', [
          'get up',
          'getting up',
          'gets ups',
        ]),
        mc(t('We ___ lunch at 12.', 'We ___ lunch at 12.'), 'eat', ['eats', 'eating', 'eates']),
        mc(
          t('Make it negative: “She likes coffee.”', 'ធ្វើជាប្រយោគបដិសេធ៖ «She likes coffee.»'),
          'She doesn’t like coffee.',
          ['She don’t like coffee.', 'She doesn’t likes coffee.', 'She not like coffee.'],
        ),
        mc(
          t('Listen 🔊. What does he do?', 'ស្តាប់ 🔊។ តើគាត់ធ្វើអ្វី?'),
          t('plays football', 'លេងបាល់ទាត់'),
          [t('reads books', 'អានសៀវភៅ'), t('cooks dinner', 'ចម្អិនអាហារ'), t('sleeps', 'គេង')],
          {
            say: 'After school, he plays football.',
          },
        ),
        tf(t('“Never” means 0 times.', '«Never» មានន័យថា 0 ដង។'), true),
      ),
      revealChallenge(
        'multiple_choice',
        order(t('Put the morning in order.', 'តម្រៀបពេលព្រឹកឱ្យត្រូវលំដាប់។'), [
          'wake up',
          'brush my teeth',
          'eat breakfast',
          'go to school',
        ]),
        match(t('Match the action to the Khmer.', 'ផ្គូផ្គងសកម្មភាពជាមួយភាសាខ្មែរ។'), [
          ['wake up', same('ក្រោកពីគេង')],
          ['eat', same('ញ៉ាំ')],
          ['study', same('រៀន')],
          ['sleep', same('គេង')],
        ]),
        mc(t('“Do you like rice?” — “Yes, I ___.”', '«Do you like rice?» — «Yes, I ___.»'), 'do', [
          'does',
          'am',
          'like',
        ]),
        mc(t('___ she live in Phnom Penh?', '___ she live in Phnom Penh?'), 'Does', [
          'Do',
          'Is',
          'Are',
        ]),
        buildSentence(
          t('Put the words in order.', 'តម្រៀបពាក្យឱ្យត្រូវលំដាប់។'),
          'I always do my homework.',
          { say: 'I always do my homework.' },
        ),
        typeIt(
          t('Write the he/she form: I play → she …', 'សរសេរទម្រង់ he/she៖ I play → she …'),
          'plays',
        ),
        typeIt(t('Write the he/she form: I go → he …', 'សរសេរទម្រង់ he/she៖ I go → he …'), 'goes'),
        mc(
          t('Which sentence is about every day?', 'តើប្រយោគណានិយាយអំពីរាល់ថ្ងៃ?'),
          'I drink water every morning.',
          ['I am drinking water now.', 'I drank water yesterday.', 'I will drink water.'],
        ),
      ),
      game(
        buildSentence(t('Build the sentence.', 'បង្កើតប្រយោគ។'), 'She goes to school at seven.', {
          say: 'She goes to school at seven.',
          extra: ['go'],
        }),
        catchIt(
          t('Catch the CORRECT he/she forms!', 'ចាប់ទម្រង់ he/she ត្រឹមត្រូវ!'),
          ['he plays', 'she watches', 'he goes', 'she studies'],
          ['he play', 'she watchs', 'he gos', 'she studys'],
          { speed: 'slow' },
        ),
      ),
      reward(
        t(
          'You use English every day now — that’s a great routine! ⏰',
          'ឥឡូវអ្នកប្រើភាសាអង់គ្លេសរាល់ថ្ងៃ — ជាទម្លាប់ដ៏ល្អ! ⏰',
        ),
      ),
    ],
  ),

  // 12 ────────────────────────────────────────────────────────────
  lesson(
    W,
    'have-has-can',
    '💪',
    t('Have, Has & Can', 'Have, Has និង Can'),
    t('Say what you have and what you can do.', 'និយាយពីអ្វីដែលអ្នកមាន និងអ្វីដែលអ្នកអាចធ្វើបាន។'),
    10,
    [
      intro(
        '💪',
        t(
          '“I have a laptop. I can type fast!” — let’s talk about things and skills.',
          '«I have a laptop. I can type fast!» — តោះនិយាយអំពីរបស់ និងជំនាញ។',
        ),
      ),
      learn(
        [
          '🎒',
          'I / you / we / they have',
          'I have two pens. They have a big house.',
          'I have two pens.',
        ],
        [
          '📱',
          'he / she / it has',
          'She has a new phone. It has a camera.',
          'She has a new phone.',
        ],
        [
          '✅',
          'can',
          t('Ability: I can swim. He can use Excel.', 'សមត្ថភាព៖ I can swim។ He can use Excel។'),
          'I can swim. He can use Excel.',
        ],
        [
          '❌',
          'can’t (cannot)',
          t(
            'I can’t drive. No “s” after can: she can (not cans).',
            'I can’t drive។ គ្មាន «s» ក្រោយ can៖ she can (មិនមែន cans)។',
          ),
          'I can’t drive.',
        ],
      ),
      see(
        t(
          'I have a computer. ✔   She have a computer. ✘\nShe can type. ✔   She can types. ✘',
          'I have a computer. ✔   She have a computer. ✘\nShe can type. ✔   She can types. ✘',
        ),
        t(
          'has for he/she/it — and the verb after “can” never changes.',
          'has សម្រាប់ he/she/it — ហើយកិរិយាសព្ទក្រោយ «can» មិនដែលប្តូរ។',
        ),
      ),
      revealPlay(
        'multiple_choice',
        mc(t('I ___ a brother.', 'I ___ a brother.'), 'have', ['has', 'haves', 'having']),
        mc(t('My sister ___ long hair.', 'My sister ___ long hair.'), 'has', [
          'have',
          'haves',
          'is',
        ]),
        mc(t('The laptop ___ a big screen.', 'The laptop ___ a big screen.'), 'has', [
          'have',
          'is have',
          'having',
        ]),
        mc(t('We ___ English on Monday.', 'We ___ English on Monday.'), 'have', [
          'has',
          'are',
          'can has',
        ]),
        mc(t('A fish ___ swim.', 'A fish ___ swim.'), 'can', ['can’t', 'cans', 'has']),
        mc(t('A cat ___ fly.', 'A cat ___ fly.'), 'can’t', ['can', 'has', 'have']),
        mc(t('Which is correct?', 'តើមួយណាត្រឹមត្រូវ?'), 'He can use a computer.', [
          'He cans use a computer.',
          'He can uses a computer.',
          'He can to use a computer.',
        ]),
        mc(
          t('Listen 🔊. What can she do?', 'ស្តាប់ 🔊។ តើនាងអាចធ្វើអ្វី?'),
          t('type fast', 'វាយលឿន'),
          [t('sing', 'ច្រៀង'), t('drive', 'បើកបរ'), t('cook', 'ចម្អិនម្ហូប')],
          { say: 'She can type very fast.' },
        ),
        tf(t('“Can” has an -s with he and she.', '«Can» មាន -s ជាមួយ he និង she។'), false, {
          explanation: t('Never: he can, she can.', 'មិនដែលទេ៖ he can, she can។'),
        }),
      ),
      revealChallenge(
        'multiple_choice',
        sortInto(
          t('“have” or “has”?', '«have» ឬ «has»?'),
          [
            ['have', 'have'],
            ['has', 'has'],
          ],
          [
            ['I', 'have'],
            ['they', 'have'],
            ['my parents', 'have'],
            ['she', 'has'],
            ['Dara', 'has'],
            ['the phone', 'has'],
          ],
        ),
        mc(
          t('“Can you speak English?” — “Yes, I ___.”', '«Can you speak English?» — «Yes, I ___.»'),
          'can',
          ['do', 'am', 'have'],
        ),
        mc(t('Make a question: “He can swim.”', 'បង្កើតសំណួរ៖ «He can swim.»'), 'Can he swim?', [
          'Does he can swim?',
          'He can swim?',
          'Can he swims?',
        ]),
        buildSentence(
          t('Put the words in order.', 'តម្រៀបពាក្យឱ្យត្រូវលំដាប់។'),
          'I can use a computer.',
          { say: 'I can use a computer.' },
        ),
        buildSentence(
          t('Put the words in order.', 'តម្រៀបពាក្យឱ្យត្រូវលំដាប់។'),
          'She has a red bike.',
          { say: 'She has a red bike.' },
        ),
        typeIt(
          t(
            'Complete with one word: “My teacher ___ a car.”',
            'បំពេញពាក្យមួយ៖ «My teacher ___ a car.»',
          ),
          'has',
        ),
        typeIt(t('Write the short form of “cannot”.', 'សរសេរទម្រង់ខ្លីនៃ «cannot»។'), 'can’t', {
          accept: ["can't"],
        }),
        mc(
          t('Which is a skill for an IT job?', 'តើមួយណាជាជំនាញសម្រាប់ការងារ IT?'),
          'I can type fast.',
          ['I have black hair.', 'I am 14.', 'I like rice.'],
        ),
      ),
      game(
        memory(t('Match each start to its ending.', 'ផ្គូផ្គងដើមប្រយោគនីមួយៗជាមួយចុងប្រយោគ។'), [
          ['I have', 'two cousins.'],
          ['She has', 'a new phone.'],
          ['Birds can', 'fly.'],
          ['Fish can’t', 'walk.'],
        ]),
        catchIt(
          t('Catch the CORRECT sentences!', 'ចាប់ប្រយោគត្រឹមត្រូវ!'),
          ['She has a cat.', 'I can swim.', 'They have a car.', 'He can cook.'],
          ['She have a cat.', 'I cans swim.', 'He can cooks.', 'It have wheels.'],
          { speed: 'slow' },
        ),
      ),
      reward(
        t(
          'You can do it — and now you can say it in English! 💪',
          'អ្នកអាចធ្វើបាន — ហើយឥឡូវអ្នកអាចនិយាយវាជាភាសាអង់គ្លេសបាន! 💪',
        ),
      ),
    ],
  ),

  // 13 ────────────────────────────────────────────────────────────
  lesson(
    W,
    'asking-questions',
    '❓',
    t('Asking Questions', 'ការសួរសំណួរ'),
    t('What, where, who, when, how — ask anything.', 'What, where, who, when, how — សួរអ្វីក៏បាន។'),
    10,
    [
      intro(
        '❓',
        t(
          'Good learners ask good questions. Let’s learn the question words!',
          'អ្នករៀនល្អ សួរសំណួរល្អ។ តោះរៀនពាក្យសំណួរ!',
        ),
      ),
      learn(
        [
          '❔',
          'What? · Who?',
          t(
            'What = អ្វី (a thing). Who = នរណា (a person).',
            'What = អ្វី (របស់)។ Who = នរណា (មនុស្ស)។',
          ),
          'What is this? Who is she?',
        ],
        [
          '📍',
          'Where? · When?',
          t(
            'Where = ទីណា (a place). When = ពេលណា (a time).',
            'Where = ទីណា (កន្លែង)។ When = ពេលណា (ពេលវេលា)។',
          ),
          'Where do you live? When is the class?',
        ],
        [
          '🤔',
          'Why? · How?',
          t(
            'Why = ហេតុអ្វី (a reason). How = យ៉ាងដូចម្តេច (the way).',
            'Why = ហេតុអ្វី (មូលហេតុ)។ How = យ៉ាងដូចម្តេច (របៀប)។',
          ),
          'Why are you late? How are you?',
        ],
        [
          '🔢',
          'How many? · How much?',
          t(
            'How many pens? (count) · How much is it? (price)',
            'How many pens? (រាប់) · How much is it? (តម្លៃ)',
          ),
          'How many pens? How much is it?',
        ],
      ),
      see(
        t(
          'Where do you live? — I live in Kampot.\nWhen is your birthday? — In June.',
          'Where do you live? — I live in Kampot.\nWhen is your birthday? — In June.',
        ),
        t('The question word asks for one kind of answer.', 'ពាក្យសំណួរសួររកចម្លើយប្រភេទមួយ។'),
      ),
      revealPlay(
        'multiple_choice',
        mc(
          t('___ is your name? — My name is Lina.', '___ is your name? — My name is Lina.'),
          'What',
          ['Where', 'Who', 'When'],
        ),
        mc(t('___ do you live? — In Siem Reap.', '___ do you live? — In Siem Reap.'), 'Where', [
          'What',
          'When',
          'Why',
        ]),
        mc(t('___ is your teacher? — Mr. Dara.', '___ is your teacher? — Mr. Dara.'), 'Who', [
          'What',
          'Where',
          'How',
        ]),
        mc(t('___ is the test? — On Friday.', '___ is the test? — On Friday.'), 'When', [
          'Where',
          'Who',
          'What',
        ]),
        mc(
          t(
            '___ are you sad? — Because I lost my pen.',
            '___ are you sad? — Because I lost my pen.',
          ),
          'Why',
          ['How', 'When', 'Who'],
        ),
        mc(t('___ are you? — I am fine, thanks.', '___ are you? — I am fine, thanks.'), 'How', [
          'Who',
          'What',
          'Why',
        ]),
        mc(
          t('___ is this bag? — It is 20,000 riel.', '___ is this bag? — It is 20,000 riel.'),
          'How much',
          ['How many', 'What', 'When'],
        ),
        mc(
          t('Listen 🔊. What does the person want to know?', 'ស្តាប់ 🔊។ តើមនុស្សនោះចង់ដឹងអ្វី?'),
          t('a place', 'កន្លែង'),
          [t('a time', 'ពេលវេលា'), t('a name', 'ឈ្មោះ'), t('a price', 'តម្លៃ')],
          {
            say: 'Where is the computer room?',
          },
        ),
      ),
      revealChallenge(
        'multiple_choice',
        match(
          t('Match the question word to its answer type.', 'ផ្គូផ្គងពាក្យសំណួរជាមួយប្រភេទចម្លើយ។'),
          [
            ['Who?', t('a person', 'មនុស្ស')],
            ['Where?', t('a place', 'កន្លែង')],
            ['When?', t('a time', 'ពេលវេលា')],
            ['Why?', t('a reason', 'មូលហេតុ')],
          ],
        ),
        mc(
          t(
            '___ students are in your class? — Thirty.',
            '___ students are in your class? — Thirty.',
          ),
          'How many',
          ['How much', 'What', 'Who'],
        ),
        buildSentence(
          t('Put the question in order.', 'តម្រៀបសំណួរឱ្យត្រូវលំដាប់។'),
          'Where do you live?',
          { say: 'Where do you live?' },
        ),
        buildSentence(
          t('Put the question in order.', 'តម្រៀបសំណួរឱ្យត្រូវលំដាប់។'),
          'What is your favourite app?',
          { say: 'What is your favourite app?' },
        ),
        typeIt(t('Write the question word for a person.', 'សរសេរពាក្យសំណួរសម្រាប់មនុស្ស។'), 'who'),
        mc(t('A question ends with…', 'សំណួរបញ្ចប់ដោយ…'), '?', ['.', '!', ',']),
        mc(t('Which is a correct question?', 'តើមួយណាជាសំណួរត្រឹមត្រូវ?'), 'What time is it?', [
          'What time it is?',
          'Time what is it?',
          'What is time it?',
        ]),
        mc(
          t('Best answer: “How old are you?”', 'ចម្លើយល្អបំផុត៖ «How old are you?»'),
          'I am twelve.',
          ['I am fine.', 'In Takeo.', 'Because I like it.'],
        ),
      ),
      game(
        memory(t('Match each question to its answer.', 'ផ្គូផ្គងសំណួរនីមួយៗជាមួយចម្លើយ។'), [
          ['Where are you from?', 'From Cambodia.'],
          ['What is this?', 'It is a mouse.'],
          ['When is lunch?', 'At 12 o’clock.'],
          ['How are you?', 'I am fine.'],
        ]),
        catchIt(
          t('Catch the QUESTION words!', 'ចាប់ពាក្យសំណួរ!'),
          ['What', 'Where', 'Who', 'When', 'Why', 'How'],
          ['Yes', 'Because', 'Today', 'Here'],
          {
            speed: 'fast',
          },
        ),
      ),
      reward(t('Who is a great learner? You are! ❓', 'អ្នកណាជាអ្នករៀនពូកែ? គឺអ្នក! ❓')),
    ],
  ),

  // 14 ────────────────────────────────────────────────────────────
  lesson(
    W,
    'in-on-under',
    '📦',
    t('In, On, Under — Where Is It?', 'In, On, Under — តើវានៅឯណា?'),
    t('Say where things are, and follow directions.', 'និយាយពីកន្លែងដែលរបស់នៅ និងធ្វើតាមទិសដៅ។'),
    10,
    [
      intro(
        '📦',
        t(
          '“Where is my phone?” — “It’s on the desk!” Let’s learn to say where things are.',
          '«Where is my phone?» — «It’s on the desk!» តោះរៀននិយាយពីកន្លែងរបស់។',
        ),
      ),
      learn(
        [
          '📦',
          'in · on · under',
          t('in = ក្នុង · on = លើ · under = ក្រោម', 'in = ក្នុង · on = លើ · under = ក្រោម'),
          'in, on, under',
        ],
        [
          '↔️',
          'next to · between',
          t('next to = ជាប់ · between = នៅចន្លោះ', 'next to = ជាប់ · between = នៅចន្លោះ'),
          'next to, between',
        ],
        [
          '🧭',
          'in front of · behind',
          t('in front of = នៅមុខ · behind = នៅក្រោយ', 'in front of = នៅមុខ · behind = នៅក្រោយ'),
          'in front of, behind',
        ],
        [
          '⬅️',
          'left · right · up · down',
          t(
            'Turn left. Go straight. It’s on your right.',
            'Turn left។ Go straight។ It’s on your right។',
          ),
          'Turn left. Go straight.',
        ],
      ),
      see(
        t(
          '📱 on the desk   🐈 under the table   📄 in the folder',
          '📱 on the desk   🐈 under the table   📄 in the folder',
        ),
        t('Where is it? Use in, on or under.', 'តើវានៅឯណា? ប្រើ in, on ឬ under។'),
      ),
      revealPlay(
        'image_choice',
        pictureChoice(
          t('The cat is UNDER the table. Which picture?', 'ឆ្មានៅក្រោមតុ។ រូបណា?'),
          ['🐈⬇️', t('cat under the table', 'ឆ្មានៅក្រោមតុ')],
          [
            ['🐈⬆️', t('cat on the table', 'ឆ្មានៅលើតុ')],
            ['🐈📦', t('cat in the box', 'ឆ្មាក្នុងប្រអប់')],
          ],
        ),
        mc(t('The file is ___ the folder.', 'The file is ___ the folder.'), 'in', [
          'on',
          'under',
          'at',
        ]),
        mc(t('The laptop is ___ the desk.', 'The laptop is ___ the desk.'), 'on', [
          'in',
          'under',
          'between',
        ]),
        mc(t('My shoes are ___ the bed.', 'My shoes are ___ the bed.'), 'under', [
          'in',
          'at',
          'on top',
        ]),
        mc(t('The letter B is ___ A and C.', 'The letter B is ___ A and C.'), 'between', [
          'next',
          'under',
          'in front',
        ]),
        mc(t('Opposite of “in front of”:', 'ពាក្យផ្ទុយនៃ «in front of»៖'), 'behind', [
          'under',
          'between',
          'on',
        ]),
        mc(
          t('Listen 🔊. Where is the phone?', 'ស្តាប់ 🔊។ តើទូរស័ព្ទនៅឯណា?'),
          t('next to the keyboard', 'ជាប់ក្តារចុច'),
          [
            t('under the chair', 'ក្រោមកៅអី'),
            t('in the bag', 'ក្នុងកាបូប'),
            t('on the floor', 'លើឥដ្ឋ'),
          ],
          {
            say: 'The phone is next to the keyboard.',
          },
        ),
        tf(
          t('“Turn right” means turn to the ស្តាំ side.', '«Turn right» មានន័យថាបត់ទៅខាងស្តាំ។'),
          true,
        ),
      ),
      revealChallenge(
        'multiple_choice',
        match(t('Match the word to the Khmer.', 'ផ្គូផ្គងពាក្យជាមួយភាសាខ្មែរ។'), [
          ['in', same('ក្នុង')],
          ['on', same('លើ')],
          ['under', same('ក្រោម')],
          ['behind', same('នៅក្រោយ')],
        ]),
        buildSentence(
          t('Put the words in order.', 'តម្រៀបពាក្យឱ្យត្រូវលំដាប់។'),
          'The mouse is next to the keyboard.',
          { say: 'The mouse is next to the keyboard.' },
        ),
        buildSentence(
          t('Put the directions in order.', 'តម្រៀបទិសដៅឱ្យត្រូវលំដាប់។'),
          'Go straight and turn left.',
          { say: 'Go straight and turn left.' },
        ),
        typeIt(
          t(
            'Write the opposite of “on top of” (one word).',
            'សរសេរពាក្យផ្ទុយនៃ «on top of» (មួយពាក្យ)។',
          ),
          'under',
          { accept: ['below', 'underneath'] },
        ),
        mc(
          t('“Where is the printer?” Best answer:', '«Where is the printer?» ចម្លើយល្អបំផុត៖'),
          'It is next to the door.',
          ['It is a printer.', 'Yes, it is.', 'It is black.'],
        ),
        mc(
          t(
            'Sokha sits in front of Dara. So Dara sits ___ Sokha.',
            'Sokha អង្គុយនៅមុខ Dara។ ដូច្នេះ Dara អង្គុយ ___ Sokha។',
          ),
          'behind',
          ['in front of', 'under', 'on'],
        ),
        spell(t('Listen 🔊 and spell the word.', 'ស្តាប់ 🔊 ហើយប្រកបពាក្យ។'), 'left', {
          say: 'left',
          extra: 'r',
        }),
        mc(t('Which word is a direction?', 'តើពាក្យណាជាទិសដៅ?'), 'right', [
          'bright',
          'write',
          'white',
        ]),
      ),
      game(
        robot(
          t(
            'Follow the directions: go right, then down, to the school 🏫.',
            'ធ្វើតាមទិសដៅ៖ ទៅស្តាំ រួចចុះក្រោម ទៅសាលារៀន 🏫។',
          ),
          ['S..#', '##.#', '##..', '###G'],
          { goalIcon: '🏫' },
        ),
        catchIt(
          t('Catch the PLACE words (where?)!', 'ចាប់ពាក្យកន្លែង (ទីណា?)!'),
          ['in', 'on', 'under', 'behind', 'between'],
          ['eat', 'blue', 'happy', 'seven'],
          {
            speed: 'fast',
          },
        ),
      ),
      reward(t('Now you always know where things are! 📦', 'ឥឡូវអ្នកតែងតែដឹងថារបស់នៅឯណា! 📦')),
    ],
  ),

  // 15 ────────────────────────────────────────────────────────────
  lesson(
    W,
    'english-for-it',
    '💻',
    t('English for IT', 'ភាសាអង់គ្លេសសម្រាប់ IT'),
    t(
      'Read and give computer instructions in English.',
      'អាន និងផ្តល់ការណែនាំកុំព្យូទ័រជាភាសាអង់គ្លេស។',
    ),
    10,
    [
      intro(
        '💻',
        t(
          'Error messages, settings, tutorials… IT speaks English. You can too!',
          'សារកំហុស ការកំណត់ មេរៀនណែនាំ… IT និយាយភាសាអង់គ្លេស។ អ្នកក៏អាចដែរ!',
        ),
      ),
      learn(
        [
          '👉',
          t('Instructions', 'ការណែនាំ'),
          t(
            'Start with the action: Click “Start”. Type your password. Press Enter.',
            'ចាប់ផ្តើមដោយសកម្មភាព៖ Click “Start”។ Type your password។ Press Enter។',
          ),
          'Click Start. Type your password. Press Enter.',
        ],
        [
          '⚙️',
          'settings · update · install',
          t('ការកំណត់ · ធ្វើបច្ចុប្បន្នភាព · ដំឡើង', 'ការកំណត់ · ធ្វើបច្ចុប្បន្នភាព · ដំឡើង'),
          'settings, update, install',
        ],
        [
          '⚠️',
          'error · warning · loading…',
          t('កំហុស · ការព្រមាន · កំពុងផ្ទុក…', 'កំហុស · ការព្រមាន · កំពុងផ្ទុក…'),
          'error, warning, loading',
        ],
        [
          '🔄',
          t('Happening now', 'កំពុងកើតឡើង'),
          t(
            'is/are + -ing: The computer is updating. Please wait.',
            'is/are + -ing៖ The computer is updating។ Please wait។',
          ),
          'The computer is updating. Please wait.',
        ],
      ),
      see(
        t(
          '⚠️ Error: File not found.\nPlease check the name and try again.',
          '⚠️ Error: File not found.\nPlease check the name and try again.',
        ),
        t(
          'A real message: the file is not there. Check the name, then try again.',
          'សារពិត៖ ឯកសារមិននៅទីនោះទេ។ ពិនិត្យឈ្មោះ រួចសាកម្តងទៀត។',
        ),
      ),
      revealPlay(
        'multiple_choice',
        mc(
          t('“Enter your password.” You should…', '«Enter your password.» អ្នកគួរ…'),
          t('type your password', 'វាយពាក្យសម្ងាត់'),
          [
            t('press the Enter key only', 'ចុចគ្រាប់ Enter ប៉ុណ្ណោះ'),
            t('turn off the computer', 'បិទកុំព្យូទ័រ'),
            t('call a friend', 'ហៅមិត្ត'),
          ],
        ),
        mc(
          t('“Loading…” means…', '«Loading…» មានន័យថា…'),
          t('please wait, it is coming', 'សូមរង់ចាំ វាកំពុងមក'),
          [
            t('it is broken', 'វាខូច'),
            t('it is finished', 'វារួចហើយ'),
            t('click here', 'ចុចនៅទីនេះ'),
          ],
        ),
        mc(
          t('“Install the app” means…', '«Install the app» មានន័យថា…'),
          t('put the app on your device', 'ដាក់កម្មវិធីលើឧបករណ៍'),
          [
            t('delete the app', 'លុបកម្មវិធី'),
            t('buy a phone', 'ទិញទូរស័ព្ទ'),
            t('close the app', 'បិទកម្មវិធី'),
          ],
        ),
        mc(
          t('“File not found” means…', '«File not found» មានន័យថា…'),
          t('the computer can’t find the file', 'កុំព្យូទ័ររកឯកសារមិនឃើញ'),
          [
            t('the file is saved', 'ឯកសារត្រូវបានរក្សាទុក'),
            t('the file is big', 'ឯកសារធំ'),
            t('the file is printing', 'ឯកសារកំពុងបោះពុម្ព'),
          ],
        ),
        mc(
          t('The computer ___ updating. Please wait.', 'The computer ___ updating. Please wait.'),
          'is',
          ['are', 'am', 'be'],
        ),
        mc(t('Which is an instruction?', 'តើមួយណាជាការណែនាំ?'), 'Click the Save button.', [
          'The button is blue.',
          'I like saving.',
          'Saving is good.',
        ]),
        mc(
          t('Listen 🔊. What should you do?', 'ស្តាប់ 🔊។ តើអ្នកគួរធ្វើអ្វី?'),
          t('restart the computer', 'ចាប់ផ្តើមកុំព្យូទ័រឡើងវិញ'),
          [
            t('buy a new computer', 'ទិញកុំព្យូទ័រថ្មី'),
            t('delete all files', 'លុបឯកសារទាំងអស់'),
            t('unplug the screen', 'ដកអេក្រង់'),
          ],
          {
            say: 'Please restart your computer.',
          },
        ),
        tf(t('“Try again” means do it one more time.', '«Try again» មានន័យថា ធ្វើម្តងទៀត។'), true),
      ),
      revealChallenge(
        'multiple_choice',
        match(t('Match the IT word to its meaning.', 'ផ្គូផ្គងពាក្យ IT ជាមួយអត្ថន័យ។'), [
          ['update', t('make it newer', 'ធ្វើឱ្យថ្មីជាង')],
          ['install', t('put it on', 'ដាក់វាចូល')],
          ['settings', t('choices you can change', 'ជម្រើសដែលអ្នកអាចប្តូរ')],
          ['download', t('get it from the internet', 'យកពីអ៊ីនធឺណិត')],
        ]),
        order(t('Put the steps in order to send an email.', 'តម្រៀបជំហានដើម្បីផ្ញើអ៊ីមែល។'), [
          'Open your email',
          'Click “New message”',
          'Type the address',
          'Write your message',
          'Click “Send”',
        ]),
        buildSentence(
          t('Build the instruction.', 'បង្កើតការណែនាំ។'),
          'Save your file before you close it.',
          { say: 'Save your file before you close it.' },
        ),
        buildSentence(
          t('Build the sentence.', 'បង្កើតប្រយោគ។'),
          'The computer is downloading the update.',
          { say: 'The computer is downloading the update.' },
        ),
        typeIt(
          t(
            'Type the key you press to start a new line.',
            'វាយឈ្មោះគ្រាប់ចុចដែលអ្នកចុចដើម្បីចាប់ផ្តើមបន្ទាត់ថ្មី។',
          ),
          'Enter',
        ),
        sortInto(
          t('Good news or a problem?', 'ដំណឹងល្អ ឬបញ្ហា?'),
          [
            ['ok', t('Good news', 'ដំណឹងល្អ'), '✅'],
            ['bad', t('A problem', 'បញ្ហា'), '⚠️'],
          ],
          [
            ['Saved successfully', 'ok'],
            ['Upload complete', 'ok'],
            ['Connected', 'ok'],
            ['Error', 'bad'],
            ['No internet connection', 'bad'],
            ['Wrong password', 'bad'],
          ],
        ),
        mc(
          t(
            '“Are you sure you want to delete this file?” is a…',
            '«Are you sure you want to delete this file?» គឺជា…',
          ),
          t('warning question', 'សំណួរព្រមាន'),
          [t('greeting', 'ការស្វាគមន៍'), t('price', 'តម្លៃ'), t('password', 'ពាក្យសម្ងាត់')],
        ),
      ),
      game(
        typeIt(
          t(
            'Typing race! Type the instruction: Press Enter to continue.',
            'ប្រណាំងវាយ! វាយការណែនាំ៖ Press Enter to continue.',
          ),
          'Press Enter to continue.',
        ),
        memory(t('Match each message to its meaning.', 'ផ្គូផ្គងសារនីមួយៗជាមួយអត្ថន័យ។'), [
          ['Loading…', same('កំពុងផ្ទុក…')],
          ['Error', same('កំហុស')],
          ['Saved', same('បានរក្សាទុក')],
          ['Try again', same('សាកម្តងទៀត')],
        ]),
      ),
      reward(
        t(
          'Congratulations! You can read computer English — the language of IT! 🚀',
          'អបអរសាទរ! អ្នកអាចអានភាសាអង់គ្លេសកុំព្យូទ័រ — ភាសានៃ IT! 🚀',
        ),
      ),
    ],
  ),
];
