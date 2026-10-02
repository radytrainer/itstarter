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
  revealChallenge,
  revealPlay,
  reward,
  see,
  sortInto,
  tf,
} from '../dsl';
import { COMPUTER_WORLD as W, SHORTCUT_KEYS } from './computer-1';

// 🖥️ Computer Explorer, lessons 9–15. Khmer (km) strings are DRAFTS for native review.

export const COMPUTER_LESSONS_2: LessonSeed[] = [
  lesson(
    W,
    'copy-and-paste',
    '📋',
    t('Copy & Paste', 'ចម្លង និងបិទភ្ជាប់'),
    t('The most useful shortcut of all.', 'ផ្លូវកាត់ដែលមានប្រយោជន៍បំផុត។'),
    9,
    [
      intro(
        '📋',
        t(
          'Copy and paste saves you from typing the same thing twice!',
          'ការចម្លង និងបិទភ្ជាប់ ជួយអ្នកមិនចាំបាច់វាយរឿងដដែលពីរដង!',
        ),
      ),
      learn(
        [
          '©️',
          'Ctrl + C = Copy',
          t('Makes a copy of what you selected.', 'ចម្លងអ្វីដែលអ្នកបានជ្រើសរើស។'),
        ],
        [
          '📌',
          'Ctrl + V = Paste',
          t('Puts the copy where your cursor is.', 'ដាក់ច្បាប់ចម្លងនៅកន្លែងទស្សន៍ទ្រនិច។'),
        ],
        [
          '🍎',
          t('On a Mac', 'នៅលើ Mac'),
          t('Use ⌘ Command instead of Ctrl.', 'ប្រើ ⌘ Command ជំនួស Ctrl។'),
        ],
      ),
      see(
        '“Hello” → Ctrl + C → Ctrl + V → “Hello”',
        t(
          'The text is copied, then pasted somewhere else.',
          'អត្ថបទត្រូវបានចម្លង រួចបិទភ្ជាប់នៅកន្លែងផ្សេង។',
        ),
      ),
      revealPlay(
        'shortcut_quiz',
        mc(t('What does Ctrl + C do?', 'តើ Ctrl + C ធ្វើអ្វី?'), t('Copy', 'ចម្លង'), [
          t('Close', 'បិទ'),
          t('Cut', 'កាត់'),
          t('Paste', 'បិទភ្ជាប់'),
        ]),
        mc(t('What does Ctrl + V do?', 'តើ Ctrl + V ធ្វើអ្វី?'), t('Paste', 'បិទភ្ជាប់'), [
          t('View', 'មើល'),
          t('Copy', 'ចម្លង'),
          t('Save', 'រក្សាទុក'),
        ]),
        mc(
          t('Before you copy, you must first…', 'មុនពេលចម្លង អ្នកត្រូវ…'),
          t('Select (highlight) the text', 'ជ្រើសរើស (គូសពណ៌) អត្ថបទ'),
          [t('Restart', 'ចាប់ផ្តើមឡើងវិញ'), t('Print', 'បោះពុម្ព')],
        ),
        tf(
          t('After copying, the original text is still there.', 'បន្ទាប់ពីចម្លង អត្ថបទដើមនៅតែមាន។'),
          true,
        ),
        tf(
          t(
            'You can paste the same copied text many times.',
            'អ្នកអាចបិទភ្ជាប់អត្ថបទដែលបានចម្លងដដែលច្រើនដង។',
          ),
          true,
        ),
        mc(
          t('Where does the pasted text appear?', 'តើអត្ថបទដែលបិទភ្ជាប់លេចឡើងនៅឯណា?'),
          t('Where the cursor is', 'កន្លែងទស្សន៍ទ្រនិច'),
          [t('At the top of the screen', 'ខាងលើអេក្រង់'), t('In the Recycle Bin', 'ក្នុងធុងសំរាម')],
        ),
        mc(t('On a Mac, copy is…', 'នៅលើ Mac ការចម្លងគឺ…'), '⌘ + C', ['Ctrl + P', 'Alt + C']),
        mc(t('Ctrl + A does what?', 'Ctrl + A ធ្វើអ្វី?'), t('Selects all', 'ជ្រើសរើសទាំងអស់'), [
          t('Adds a page', 'បន្ថែមទំព័រ'),
          t('Aligns text', 'តម្រឹមអត្ថបទ'),
        ]),
      ),
      revealChallenge(
        'keyboard_challenge',
        keys(t('Press the shortcut to COPY.', 'ចុចផ្លូវកាត់ដើម្បី ចម្លង។'), ['Ctrl', 'C'], {
          data: SHORTCUT_KEYS,
          hint: t('C for Copy.', 'C សម្រាប់ Copy។'),
        }),
        keys(t('Press the shortcut to PASTE.', 'ចុចផ្លូវកាត់ដើម្បី បិទភ្ជាប់។'), ['Ctrl', 'V'], {
          data: SHORTCUT_KEYS,
          hint: t('It’s next to C.', 'វានៅជាប់ C។'),
        }),
        keys(
          t('Press the shortcut to SELECT ALL.', 'ចុចផ្លូវកាត់ដើម្បី ជ្រើសរើសទាំងអស់។'),
          ['Ctrl', 'A'],
          { data: SHORTCUT_KEYS },
        ),
        order(
          t(
            'Copy a sentence into a message: put the steps in order.',
            'ចម្លងប្រយោគមួយទៅក្នុងសារ៖ តម្រៀបជំហាន។',
          ),
          [
            t('Select the sentence', 'ជ្រើសរើសប្រយោគ'),
            t('Press Ctrl + C', 'ចុច Ctrl + C'),
            t('Click in the message box', 'ចុចក្នុងប្រអប់សារ'),
            t('Press Ctrl + V', 'ចុច Ctrl + V'),
          ],
        ),
        mc(
          t('On a phone, how do you copy text?', 'នៅលើទូរស័ព្ទ តើអ្នកចម្លងអត្ថបទដោយរបៀបណា?'),
          t('Long-press the text, then tap Copy', 'ចុចអត្ថបទជាប់យូរ រួចប៉ះ ចម្លង'),
          [t('Shake the phone', 'អង្រួនទូរស័ព្ទ'), t('Press the volume button', 'ចុចប៊ូតុងសំឡេង')],
        ),
        tf(
          t(
            'You can copy a file in one folder and paste it into another folder.',
            'អ្នកអាចចម្លងឯកសារក្នុងថតមួយ ហើយបិទភ្ជាប់វាទៅក្នុងថតផ្សេង។',
          ),
          true,
        ),
        mc(
          t(
            'Copying someone’s essay and saying you wrote it is…',
            'ការចម្លងអត្ថបទអ្នកដទៃ ហើយនិយាយថាអ្នកសរសេរ គឺ…',
          ),
          t('Not honest (plagiarism)', 'មិនស្មោះត្រង់ (ការលួចចម្លង)'),
          [t('Smart', 'ឆ្លាត'), t('Required', 'ត្រូវតែធ្វើ')],
          {
            explanation: t(
              'Copy-paste is a tool; always say where words came from.',
              'ការចម្លង-បិទភ្ជាប់ជាឧបករណ៍ ត្រូវប្រាប់ជានិច្ចថាពាក្យមកពីណា។',
            ),
          },
        ),
        mc(
          t(
            'You copied “A” and then copied “B”. Ctrl + V pastes…',
            'អ្នកចម្លង “A” រួចចម្លង “B”។ Ctrl + V បិទភ្ជាប់…',
          ),
          '“B”',
          ['“A”', '“AB”'],
          {
            explanation: t(
              'The clipboard keeps only the last thing you copied.',
              'ក្តារតម្បៀតខ្ទាស់រក្សាតែរបស់ចុងក្រោយដែលអ្នកចម្លង។',
            ),
          },
        ),
      ),
      reward(t('Copy-paste pro! 📋', 'អ្នកជំនាញចម្លង-បិទភ្ជាប់! 📋')),
    ],
  ),

  lesson(
    W,
    'more-shortcuts',
    '⚡',
    t('Super Shortcuts', 'ផ្លូវកាត់ពិសេស'),
    t('Cut, undo and save like a pro.', 'កាត់ ត្រឡប់វិញ និងរក្សាទុកដូចអ្នកជំនាញ។'),
    10,
    [
      intro(
        '⚡',
        t('Shortcuts make you fast. Learn more of them!', 'ផ្លូវកាត់ធ្វើឱ្យអ្នកលឿន។ តោះរៀនបន្ថែម!'),
      ),
      learn(
        [
          '✂️',
          'Ctrl + X = Cut',
          t(
            'Moves text: it disappears here, and you paste it there.',
            'ផ្លាស់ទីអត្ថបទ៖ វាបាត់នៅទីនេះ ហើយអ្នកបិទភ្ជាប់វានៅទីនោះ។',
          ),
        ],
        ['↩️', 'Ctrl + Z = Undo', t('Made a mistake? Undo it!', 'ធ្វើខុស? ត្រឡប់វិញ!')],
        [
          '💾',
          'Ctrl + S = Save',
          t(
            'Save your work often so you never lose it.',
            'រក្សាទុកការងារញឹកញាប់ ដើម្បីកុំឱ្យបាត់។',
          ),
        ],
        ['🔍', 'Ctrl + F = Find', t('Search for a word on the page.', 'ស្វែងរកពាក្យនៅលើទំព័រ។')],
      ),
      see(
        '😱 → Ctrl + Z → 😌',
        t('Undo is your best friend.', 'ការត្រឡប់វិញ គឺជាមិត្តល្អបំផុតរបស់អ្នក។'),
      ),
      revealPlay(
        'keyboard_challenge',
        keys(
          t('Press the shortcut to UNDO a mistake.', 'ចុចផ្លូវកាត់ដើម្បី ត្រឡប់កំហុសវិញ។'),
          ['Ctrl', 'Z'],
          { data: SHORTCUT_KEYS },
        ),
        keys(
          t('Press the shortcut to SAVE your work.', 'ចុចផ្លូវកាត់ដើម្បី រក្សាទុកការងារ។'),
          ['Ctrl', 'S'],
          { data: SHORTCUT_KEYS },
        ),
        keys(
          t('Press the shortcut to CUT text.', 'ចុចផ្លូវកាត់ដើម្បី កាត់អត្ថបទ។'),
          ['Ctrl', 'X'],
          { data: SHORTCUT_KEYS, hint: t('X looks like scissors ✂️.', 'X មើលទៅដូចកន្ត្រៃ ✂️។') },
        ),
        keys(
          t(
            'Press the shortcut to FIND a word on the page.',
            'ចុចផ្លូវកាត់ដើម្បី ស្វែងរកពាក្យនៅលើទំព័រ។',
          ),
          ['Ctrl', 'F'],
          { data: SHORTCUT_KEYS },
        ),
        keys(t('Press the shortcut to PRINT.', 'ចុចផ្លូវកាត់ដើម្បី បោះពុម្ព។'), ['Ctrl', 'P'], {
          data: SHORTCUT_KEYS,
        }),
        keys(
          t(
            'Press the shortcut to REDO (undo the undo).',
            'ចុចផ្លូវកាត់ដើម្បី ធ្វើម្តងទៀត (Redo)។',
          ),
          ['Ctrl', 'Y'],
          { data: SHORTCUT_KEYS },
        ),
        mc(
          t('Cut is different from copy because…', 'ការកាត់ខុសពីការចម្លង ព្រោះ…'),
          t('Cut removes the original', 'ការកាត់ដកច្បាប់ដើមចេញ'),
          [
            t('Cut makes two copies', 'ការកាត់បង្កើតពីរច្បាប់'),
            t('Cut deletes forever', 'ការកាត់លុបជារៀងរហូត'),
          ],
        ),
        tf(
          t(
            'You can press Ctrl + Z several times to undo several steps.',
            'អ្នកអាចចុច Ctrl + Z ច្រើនដង ដើម្បីត្រឡប់ច្រើនជំហាន។',
          ),
          true,
        ),
      ),
      revealChallenge(
        'matching',
        match(
          t('Match each shortcut to what it does.', 'ផ្គូផ្គងផ្លូវកាត់នីមួយៗទៅនឹងអ្វីដែលវាធ្វើ។'),
          [
            ['Ctrl + C', t('Copy', 'ចម្លង')],
            ['Ctrl + V', t('Paste', 'បិទភ្ជាប់')],
            ['Ctrl + X', t('Cut', 'កាត់')],
            ['Ctrl + Z', t('Undo', 'ត្រឡប់វិញ')],
            ['Ctrl + S', t('Save', 'រក្សាទុក')],
          ],
        ),
        mc(
          t(
            'You are writing a long essay. How often should you press Ctrl + S?',
            'អ្នកកំពុងសរសេរអត្ថបទវែង។ តើអ្នកគួរចុច Ctrl + S ញឹកញាប់ប៉ុណ្ណា?',
          ),
          t('Often, every few minutes', 'ញឹកញាប់ រៀងរាល់ប៉ុន្មាននាទី'),
          [t('Only at the very end', 'តែនៅចុងបញ្ចប់'), t('Never', 'មិនដែល')],
        ),
        mc(
          t('Alt + Tab does what on Windows?', 'Alt + Tab ធ្វើអ្វីនៅលើ Windows?'),
          t('Switches between open windows', 'ប្តូររវាងបង្អួចដែលបើក'),
          [t('Closes the computer', 'បិទកុំព្យូទ័រ'), t('Makes text bold', 'ធ្វើឱ្យអក្សរដិត')],
        ),
        mc(
          t(
            'Which shortcut finds “Phnom Penh” on a long web page?',
            'តើផ្លូវកាត់ណារក “ភ្នំពេញ” នៅលើគេហទំព័រវែង?',
          ),
          'Ctrl + F',
          ['Ctrl + P', 'Ctrl + X'],
        ),
        tf(
          t(
            'Ctrl + S and the 💾 Save button do the same thing.',
            'Ctrl + S និងប៊ូតុង 💾 រក្សាទុក ធ្វើដូចគ្នា។',
          ),
          true,
        ),
        mc(
          t(
            'You cut a paragraph but forgot to paste it. Where is it?',
            'អ្នកកាត់កថាខណ្ឌមួយ ប៉ុន្តែភ្លេចបិទភ្ជាប់។ តើវានៅឯណា?',
          ),
          t(
            'Waiting on the clipboard — paste it now',
            'កំពុងរង់ចាំនៅលើក្តារតម្បៀតខ្ទាស់ — បិទភ្ជាប់វាឥឡូវ',
          ),
          [t('Gone forever', 'បាត់ជារៀងរហូត'), t('In the printer', 'ក្នុងម៉ាស៊ីនបោះពុម្ព')],
        ),
        mc(
          t('Ctrl + Z after deleting a word…', 'Ctrl + Z បន្ទាប់ពីលុបពាក្យមួយ…'),
          t('Brings the word back', 'នាំពាក្យនោះត្រឡប់មកវិញ'),
          [t('Deletes more words', 'លុបពាក្យបន្ថែម'), t('Saves the file', 'រក្សាទុកឯកសារ')],
        ),
        tf(t('Shortcuts only work on Windows.', 'ផ្លូវកាត់ដំណើរការតែនៅលើ Windows។'), false, {
          explanation: t(
            'Mac, Linux and Chromebooks have shortcuts too (on Mac use ⌘).',
            'Mac, Linux និង Chromebook ក៏មានផ្លូវកាត់ដែរ (នៅលើ Mac ប្រើ ⌘)។',
          ),
        }),
      ),
      reward(t('Shortcut superstar! ⚡', 'តារាផ្លូវកាត់! ⚡')),
    ],
  ),

  lesson(
    W,
    'operating-systems',
    '🪟',
    t('Operating Systems', 'ប្រព័ន្ធប្រតិបត្តិការ'),
    t('Windows, macOS, Android and iOS.', 'Windows, macOS, Android និង iOS។'),
    9,
    [
      intro(
        '🪟',
        t(
          'Every computer has a main program that runs everything else: the operating system.',
          'កុំព្យូទ័រគ្រប់គ្រឿងមានកម្មវិធីមេមួយដែលដំណើរការអ្វីៗផ្សេងទៀត៖ ប្រព័ន្ធប្រតិបត្តិការ។',
        ),
      ),
      learn(
        [
          '🧭',
          t('What it does', 'អ្វីដែលវាធ្វើ'),
          t(
            'Starts the computer, runs apps, manages files and devices.',
            'ចាប់ផ្តើមកុំព្យូទ័រ ដំណើរការកម្មវិធី គ្រប់គ្រងឯកសារ និងឧបករណ៍។',
          ),
        ],
        [
          '💻',
          t('On computers', 'នៅលើកុំព្យូទ័រ'),
          t('Windows, macOS, Linux, ChromeOS.', 'Windows, macOS, Linux, ChromeOS។'),
        ],
        [
          '📱',
          t('On phones', 'នៅលើទូរស័ព្ទ'),
          t('Android and iOS (iPhone).', 'Android និង iOS (iPhone)។'),
        ],
      ),
      see(
        '🧭 OS → 📝 Word · 🌐 Chrome · 🎵 Music',
        t(
          'The operating system is the boss; apps run on top of it.',
          'ប្រព័ន្ធប្រតិបត្តិការជាមេ កម្មវិធីដំណើរការនៅលើវា។',
        ),
      ),
      revealPlay(
        'multiple_choice',
        mc(t('Which is an operating system?', 'តើមួយណាជាប្រព័ន្ធប្រតិបត្តិការ?'), 'Windows', [
          'Word',
          'Facebook',
          'Excel',
        ]),
        mc(t('An iPhone uses…', 'iPhone ប្រើ…'), 'iOS', ['Android', 'Windows']),
        mc(t('Most Samsung phones use…', 'ទូរស័ព្ទ Samsung ភាគច្រើនប្រើ…'), 'Android', [
          'iOS',
          'macOS',
        ]),
        mc(t('Apple laptops (MacBooks) use…', 'កុំព្យូទ័រយួរដៃ Apple (MacBook) ប្រើ…'), 'macOS', [
          'Android',
          'Windows',
        ]),
        sortInto(
          t('Computer or phone operating system?', 'ប្រព័ន្ធប្រតិបត្តិការកុំព្យូទ័រ ឬទូរស័ព្ទ?'),
          [
            ['pc', t('Computer', 'កុំព្យូទ័រ'), '💻'],
            ['phone', t('Phone', 'ទូរស័ព្ទ'), '📱'],
          ],
          [
            ['Windows', 'pc'],
            ['Android', 'phone'],
            ['macOS', 'pc'],
            ['iOS', 'phone'],
          ],
        ),
        tf(
          t(
            'Apps need an operating system to run.',
            'កម្មវិធីត្រូវការប្រព័ន្ធប្រតិបត្តិការដើម្បីដំណើរការ។',
          ),
          true,
        ),
        mc(t('The Windows Start button looks like…', 'ប៊ូតុង Start របស់ Windows មើលទៅដូច…'), '⊞', [
          '🍎',
          '🤖',
          '⭐',
        ]),
        mc(
          t(
            'On Windows, the bar at the bottom with app icons is the…',
            'នៅលើ Windows របារខាងក្រោមដែលមានរូបតំណាងកម្មវិធីគឺ…',
          ),
          t('Taskbar', 'របារភារកិច្ច (Taskbar)'),
          [t('Toolbar', 'របារឧបករណ៍'), t('Title bar', 'របារចំណងជើង')],
        ),
      ),
      revealChallenge(
        'multiple_choice',
        mc(
          t(
            'Why should you install operating system updates?',
            'ហេតុអ្វីអ្នកគួរដំឡើងបច្ចុប្បន្នភាពប្រព័ន្ធប្រតិបត្តិការ?',
          ),
          t('They fix security problems', 'វាជួសជុលបញ្ហាសុវត្ថិភាព'),
          [
            t('They delete your photos', 'វាលុបរូបថតរបស់អ្នក'),
            t('They make the screen bigger', 'វាធ្វើឱ្យអេក្រង់ធំជាង'),
          ],
        ),
        tf(
          t(
            'An app made for iPhone can always run on Android.',
            'កម្មវិធីដែលបង្កើតសម្រាប់ iPhone អាចដំណើរការលើ Android ជានិច្ច។',
          ),
          false,
          {
            explanation: t(
              'Apps are made for a specific operating system; many have two versions.',
              'កម្មវិធីត្រូវបានបង្កើតសម្រាប់ប្រព័ន្ធប្រតិបត្តិការជាក់លាក់ ជាច្រើនមានពីរកំណែ។',
            ),
          },
        ),
        match(
          t(
            'Match the operating system to the company.',
            'ផ្គូផ្គងប្រព័ន្ធប្រតិបត្តិការទៅនឹងក្រុមហ៊ុន។',
          ),
          [
            ['Windows', 'Microsoft'],
            ['macOS', 'Apple'],
            ['Android', 'Google'],
          ],
        ),
        mc(
          t(
            'Where do you change Wi-Fi, sound and brightness?',
            'តើអ្នកប្តូរ Wi-Fi សំឡេង និងពន្លឺនៅឯណា?',
          ),
          t('Settings ⚙️', 'ការកំណត់ ⚙️'),
          [t('The Recycle Bin', 'ធុងសំរាម'), t('The calculator', 'ម៉ាស៊ីនគិតលេខ')],
        ),
        mc(
          t(
            'The main screen you see after logging in on a computer is the…',
            'អេក្រង់មេដែលអ្នកឃើញបន្ទាប់ពីចូលគណនីលើកុំព្យូទ័រ គឺ…',
          ),
          t('Desktop', 'ផ្ទៃតុ (Desktop)'),
          [t('Folder', 'ថត'), t('Printer', 'ម៉ាស៊ីនបោះពុម្ព')],
        ),
        mc(
          t('Each app opens in its own…', 'កម្មវិធីនីមួយៗបើកក្នុង…'),
          t('Window', 'បង្អួចរបស់វា'),
          [t('Keyboard', 'ក្តារចុច'), t('Cable', 'ខ្សែ')],
        ),
        match(
          t('Match the window button to what it does.', 'ផ្គូផ្គងប៊ូតុងបង្អួចទៅនឹងអ្វីដែលវាធ្វើ។'),
          [
            ['—', t('Minimise (hide)', 'បង្រួម (លាក់)')],
            ['☐', t('Maximise (full screen)', 'ពង្រីក (ពេញអេក្រង់)')],
            ['✕', t('Close', 'បិទ')],
          ],
        ),
        tf(
          t('Linux is a free operating system.', 'Linux គឺជាប្រព័ន្ធប្រតិបត្តិការឥតគិតថ្លៃ។'),
          true,
        ),
      ),
      reward(
        t('You know who’s the boss: the OS! 🪟', 'អ្នកដឹងហើយថានរណាជាមេ៖ ប្រព័ន្ធប្រតិបត្តិការ! 🪟'),
      ),
    ],
  ),

  lesson(
    W,
    'files-and-folders',
    '📁',
    t('Files & Folders', 'ឯកសារ និងថត'),
    t('Keep your work tidy.', 'រៀបចំការងាររបស់អ្នកឱ្យមានសណ្តាប់ធ្នាប់។'),
    10,
    [
      intro(
        '📁',
        t(
          'A computer stores your work in files. Folders keep files tidy — like a school bag.',
          'កុំព្យូទ័ររក្សាការងាររបស់អ្នកក្នុងឯកសារ។ ថតរក្សាឯកសារឱ្យមានរបៀប — ដូចកាបូបសាលា។',
        ),
      ),
      learn(
        [
          '📄',
          t('File', 'ឯកសារ'),
          t('One piece of work: a photo, a song, a document.', 'ការងារមួយ៖ រូបថត បទចម្រៀង ឯកសារ។'),
        ],
        [
          '📁',
          t('Folder', 'ថត'),
          t('A box that holds files (and other folders).', 'ប្រអប់ដែលផ្ទុកឯកសារ (និងថតផ្សេងទៀត)។'),
        ],
        [
          '🏷️',
          t('File names and types', 'ឈ្មោះ និងប្រភេទឯកសារ'),
          t(
            'The ending (.jpg, .mp3, .docx) tells you the type.',
            'ផ្នែកខាងចុង (.jpg, .mp3, .docx) ប្រាប់ពីប្រភេទ។',
          ),
        ],
      ),
      see(
        '📁 School ➜ 📁 Maths ➜ 📄 Homework-week-2.docx',
        t('Folders inside folders keep everything easy to find.', 'ថតក្នុងថតធ្វើឱ្យអ្វីៗងាយរក។'),
      ),
      revealPlay(
        'file_explorer_sim',
        sortInto(
          t('Put each file in the right folder.', 'ដាក់ឯកសារនីមួយៗក្នុងថតត្រឹមត្រូវ។'),
          [
            ['photos', t('Photos', 'រូបថត'), '🖼️'],
            ['music', t('Music', 'តន្ត្រី'), '🎵'],
            ['documents', t('Documents', 'ឯកសារ'), '📄'],
          ],
          [
            ['beach.jpg', 'photos'],
            ['my-song.mp3', 'music'],
            ['homework.docx', 'documents'],
            ['family.png', 'photos'],
            ['cv.pdf', 'documents'],
          ],
          {
            hint: t(
              'Look at the end of each name: .jpg, .mp3, .docx…',
              'មើលផ្នែកខាងចុងនៃឈ្មោះនីមួយៗ៖ .jpg, .mp3, .docx…',
            ),
            explanation: t(
              '.jpg/.png are pictures, .mp3 is music, .docx/.pdf are documents.',
              '.jpg/.png ជារូបភាព .mp3 ជាតន្ត្រី .docx/.pdf ជាឯកសារ។',
            ),
          },
        ),
        mc(
          t('Which is the best file name?', 'តើឈ្មោះឯកសារណាល្អបំផុត?'),
          'Science report - plants.docx',
          ['aaaa.docx', 'New document (7).docx'],
          {
            explanation: t(
              'A clear name tells you what is inside without opening it.',
              'ឈ្មោះច្បាស់ប្រាប់ពីអ្វីនៅខាងក្នុងដោយមិនចាំបាច់បើក។',
            ),
          },
        ),
        tf(t('A folder can hold other folders.', 'ថតមួយអាចផ្ទុកថតផ្សេងទៀតបាន។'), true),
        mc(
          t('What type of file is “dance.mp4”?', 'តើ “dance.mp4” ជាឯកសារប្រភេទអ្វី?'),
          t('Video', 'វីដេអូ'),
          [t('Picture', 'រូបភាព'), t('Text document', 'ឯកសារអត្ថបទ')],
        ),
        mc(
          t('What type of file is “budget.xlsx”?', 'តើ “budget.xlsx” ជាឯកសារប្រភេទអ្វី?'),
          t('Spreadsheet (Excel)', 'តារាងគណនា (Excel)'),
          [t('Song', 'បទចម្រៀង'), t('Photo', 'រូបថត')],
        ),
        mc(
          t('What type of file is “slides.pptx”?', 'តើ “slides.pptx” ជាឯកសារប្រភេទអ្វី?'),
          t('Presentation (PowerPoint)', 'បទបង្ហាញ (PowerPoint)'),
          [t('Video', 'វីដេអូ'), t('Music', 'តន្ត្រី')],
        ),
        tf(
          t(
            'Two files in the same folder can have exactly the same name.',
            'ឯកសារពីរក្នុងថតដដែល អាចមានឈ្មោះដូចគ្នាទាំងស្រុង។',
          ),
          false,
          {
            explanation: t(
              'The computer would not know which one you mean.',
              'កុំព្យូទ័រមិនដឹងថាអ្នកចង់និយាយពីមួយណាទេ។',
            ),
          },
        ),
        mc(
          t(
            'Which app shows your folders on Windows?',
            'តើកម្មវិធីណាបង្ហាញថតរបស់អ្នកនៅលើ Windows?',
          ),
          'File Explorer 📁',
          ['Calculator 🧮', 'Paint 🎨'],
        ),
      ),
      revealChallenge(
        'multiple_choice',
        mc(
          t(
            'The “path” School > Maths > Homework.docx means…',
            '“ផ្លូវ” School > Maths > Homework.docx មានន័យថា…',
          ),
          t(
            'Homework.docx is in the Maths folder, inside School',
            'Homework.docx នៅក្នុងថត Maths ដែលនៅក្នុង School',
          ),
          [
            t('School is inside Homework', 'School នៅក្នុង Homework'),
            t('Maths is a file', 'Maths គឺជាឯកសារ'),
          ],
        ),
        sortInto(
          t('File or folder?', 'ឯកសារ ឬថត?'),
          [
            ['file', t('File', 'ឯកសារ'), '📄'],
            ['folder', t('Folder', 'ថត'), '📁'],
          ],
          [
            ['photo.jpg', 'file'],
            ['Documents', 'folder'],
            ['song.mp3', 'file'],
            ['Downloads', 'folder'],
          ],
        ),
        mc(
          t('Best folder plan for school work?', 'ផែនការថតល្អបំផុតសម្រាប់ការងារសាលា?'),
          t('One folder per subject', 'ថតមួយសម្រាប់មុខវិជ្ជានីមួយៗ'),
          [
            t('Everything on the desktop', 'អ្វីៗទាំងអស់នៅលើផ្ទៃតុ'),
            t('One folder per day', 'ថតមួយសម្រាប់ថ្ងៃនីមួយៗ'),
          ],
        ),
        tf(
          t(
            'Changing “photo.jpg” to “photo.mp3” turns the photo into music.',
            'ការប្តូរ “photo.jpg” ទៅ “photo.mp3” ធ្វើឱ្យរូបថតក្លាយជាតន្ត្រី។',
          ),
          false,
          {
            explanation: t(
              'Renaming the ending doesn’t change what’s inside; it may just stop opening.',
              'ការប្តូរផ្នែកខាងចុងមិនផ្លាស់ប្តូរអ្វីនៅខាងក្នុងទេ វាប្រហែលជាមិនបើកទៀត។',
            ),
          },
        ),
        match(
          t(
            'Match the file ending to the app that opens it.',
            'ផ្គូផ្គងផ្នែកខាងចុងឯកសារទៅនឹងកម្មវិធីដែលបើកវា។',
          ),
          [
            ['.docx', 'Word'],
            ['.xlsx', 'Excel'],
            ['.pptx', 'PowerPoint'],
            ['.pdf', t('PDF reader', 'កម្មវិធីអាន PDF')],
          ],
        ),
        mc(t('A file’s size is measured in…', 'ទំហំឯកសារវាស់ជា…'), 'KB, MB, GB', [
          t('Metres', 'ម៉ែត្រ'),
          t('Minutes', 'នាទី'),
        ]),
        mc(
          t('Which file is probably the biggest?', 'តើឯកសារណាប្រហែលធំជាងគេ?'),
          t('A 1-hour video', 'វីដេអូ 1 ម៉ោង'),
          [t('A short text note', 'កំណត់ចំណាំអត្ថបទខ្លី'), t('A small photo', 'រូបថតតូច')],
        ),
        tf(
          t(
            'Searching by file name can find a lost file quickly.',
            'ការស្វែងរកតាមឈ្មោះឯកសារ អាចរកឯកសារដែលបាត់បានលឿន។',
          ),
          true,
        ),
      ),
      reward(t('Everything in its place! 📁', 'អ្វីៗនៅកន្លែងរបស់វា! 📁')),
    ],
  ),

  lesson(
    W,
    'organise-your-files',
    '🗂️',
    t('Organise Your Files', 'រៀបចំឯកសាររបស់អ្នក'),
    t('Create, rename, move and delete.', 'បង្កើត ប្តូរឈ្មោះ ផ្លាស់ទី និងលុប។'),
    10,
    [
      intro(
        '🗂️',
        t('Let’s organise a messy desktop like a pro.', 'តោះរៀបចំផ្ទៃតុរញ៉េរញ៉ៃដូចអ្នកជំនាញ។'),
      ),
      learn(
        [
          '➕',
          t('Create a folder', 'បង្កើតថត'),
          t('Right-click → New → Folder.', 'ចុចខាងស្តាំ → ថ្មី → ថត។'),
        ],
        [
          '✏️',
          t('Rename', 'ប្តូរឈ្មោះ'),
          t(
            'Right-click → Rename, then type a clear name.',
            'ចុចខាងស្តាំ → ប្តូរឈ្មោះ រួចវាយឈ្មោះច្បាស់។',
          ),
        ],
        [
          '🗑️',
          t('Delete', 'លុប'),
          t(
            'Deleted files go to the Recycle Bin — you can still get them back.',
            'ឯកសារដែលលុបទៅក្នុងធុងសំរាម — អ្នកនៅតែអាចយកវាមកវិញបាន។',
          ),
        ],
      ),
      see(
        t(
          'Right-click → New folder → “Photos” → drag pictures in',
          'ចុចខាងស្តាំ → ថតថ្មី → “Photos” → អូសរូបភាពចូល',
        ),
        t('Four quick steps to a tidy desktop.', 'ជំហានរហ័សបួនទៅកាន់ផ្ទៃតុស្អាត។'),
      ),
      mouseTrainer('play', ['drag', 'scroll']),
      revealPlay(
        'ordering',
        order(
          t(
            'Put the steps in order to keep your photos in a new folder.',
            'តម្រៀបជំហានដើម្បីរក្សារូបថតក្នុងថតថ្មី។',
          ),
          [
            t('Right-click on the desktop', 'ចុចខាងស្តាំលើផ្ទៃតុ'),
            t('Choose New → Folder', 'ជ្រើសរើស ថ្មី → ថត'),
            t('Type the name “Photos”', 'វាយឈ្មោះ “Photos”'),
            t('Drag the pictures into the folder', 'អូសរូបភាពចូលក្នុងថត'),
          ],
        ),
        mc(
          t(
            'You deleted a file by mistake. Where can you find it?',
            'អ្នកលុបឯកសារដោយច្រឡំ។ តើអ្នករកវាឃើញនៅឯណា?',
          ),
          t('In the Recycle Bin', 'ក្នុងធុងសំរាម'),
          [t('It is gone forever', 'វាបាត់ជារៀងរហូត'), t('In the printer', 'ក្នុងម៉ាស៊ីនបោះពុម្ព')],
        ),
        mc(
          t('How do you rename a file?', 'តើអ្នកប្តូរឈ្មោះឯកសារដោយរបៀបណា?'),
          t('Right-click → Rename', 'ចុចខាងស្តាំ → ប្តូរឈ្មោះ'),
          [
            t('Double-click the Recycle Bin', 'ចុចធុងសំរាមពីរដង'),
            t('Restart the computer', 'ចាប់ផ្តើមកុំព្យូទ័រឡើងវិញ'),
          ],
        ),
        tf(
          t(
            'Emptying the Recycle Bin deletes the files for good.',
            'ការសម្អាតធុងសំរាម លុបឯកសារជាស្ថាពរ។',
          ),
          true,
        ),
        mc(
          t(
            'Which key also renames a selected file on Windows?',
            'តើគ្រាប់ចុចណាក៏ប្តូរឈ្មោះឯកសារដែលបានជ្រើសរើសនៅលើ Windows?',
          ),
          'F2',
          ['F5', 'Esc'],
        ),
        mc(
          t('Which key deletes a selected file?', 'តើគ្រាប់ចុចណាលុបឯកសារដែលបានជ្រើសរើស?'),
          'Delete',
          ['Enter', 'Shift'],
        ),
        mc(
          t('Moving a file means…', 'ការផ្លាស់ទីឯកសារ មានន័យថា…'),
          t('It leaves one place and goes to another', 'វាចាកចេញពីកន្លែងមួយ ហើយទៅកន្លែងផ្សេង'),
          [
            t('It is copied twice', 'វាត្រូវបានចម្លងពីរដង'),
            t('It is printed', 'វាត្រូវបានបោះពុម្ព'),
          ],
        ),
      ),
      revealChallenge(
        'multiple_choice',
        mc(
          t(
            'Best name for a folder of 2028 class photos?',
            'ឈ្មោះល្អបំផុតសម្រាប់ថតរូបថតថ្នាក់ឆ្នាំ 2028?',
          ),
          t('Class photos 2028', 'រូបថតថ្នាក់ 2028'),
          [t('New folder (3)', 'ថតថ្មី (3)'), t('xxx', 'xxx')],
        ),
        tf(
          t(
            'A tidy desktop with a few folders is easier to use than 200 loose files.',
            'ផ្ទៃតុស្អាតដែលមានថតតិចតួច ងាយប្រើជាងឯកសារ 200 ដែលរាយប៉ាយ។',
          ),
          true,
        ),
        sortInto(
          t('Is it safe to delete?', 'តើលុបដោយសុវត្ថិភាពបានទេ?'),
          [
            ['yes', t('Probably safe', 'ប្រហែលជាសុវត្ថិភាព'), '🗑️'],
            ['no', t('Keep it!', 'រក្សាទុក!'), '⚠️'],
          ],
          [
            [t('A copy of a file you already have', 'ច្បាប់ចម្លងឯកសារដែលអ្នកមានរួចហើយ'), 'yes'],
            [t('Your only copy of your CV', 'ច្បាប់តែមួយគត់នៃ CV របស់អ្នក'), 'no'],
            [t('An old installer you finished using', 'កម្មវិធីដំឡើងចាស់ដែលអ្នកប្រើរួច'), 'yes'],
            [
              t(
                'Files you don’t recognise in Windows folders',
                'ឯកសារដែលអ្នកមិនស្គាល់ក្នុងថត Windows',
              ),
              'no',
            ],
          ],
        ),
        mc(
          t(
            'You need the same photo in two folders. You should…',
            'អ្នកត្រូវការរូបថតដដែលក្នុងថតពីរ។ អ្នកគួរ…',
          ),
          t('Copy it, not move it', 'ចម្លងវា មិនមែនផ្លាស់ទីទេ'),
          [t('Cut it', 'កាត់វា'), t('Delete it', 'លុបវា')],
        ),
        mc(
          t(
            'How do you get a file back from the Recycle Bin?',
            'តើអ្នកយកឯកសារមកវិញពីធុងសំរាមដោយរបៀបណា?',
          ),
          t('Right-click it → Restore', 'ចុចខាងស្តាំលើវា → ស្តារ'),
          [t('Empty the bin', 'សម្អាតធុង'), t('Turn off the computer', 'បិទកុំព្យូទ័រ')],
        ),
        num(
          t(
            'A folder has 3 folders inside, and each of those has 4 files. How many files?',
            'ថតមួយមាន 3 ថតនៅខាងក្នុង ហើយថតនីមួយៗមាន 4 ឯកសារ។ តើមានឯកសារប៉ុន្មាន?',
          ),
          12,
        ),
        tf(
          t(
            'Files deleted from a USB stick usually skip the Recycle Bin.',
            'ឯកសារដែលលុបពីឧបករណ៍ USB ជាធម្មតារំលងធុងសំរាម។',
          ),
          true,
          {
            explanation: t(
              'Be extra careful when deleting from USB sticks.',
              'ត្រូវប្រុងប្រយ័ត្នបន្ថែម ពេលលុបពីឧបករណ៍ USB។',
            ),
          },
        ),
        mc(
          t(
            'Sorting a folder by “Date modified” shows…',
            'ការតម្រៀបថតតាម “កាលបរិច្ឆេទកែប្រែ” បង្ហាញ…',
          ),
          t('The most recently changed files', 'ឯកសារដែលបានកែប្រែចុងក្រោយ'),
          [t('The biggest files', 'ឯកសារធំបំផុត'), t('Only pictures', 'តែរូបភាព')],
        ),
      ),
      reward(t('Tidy desktop, tidy mind! 🗂️', 'ផ្ទៃតុស្អាត ចិត្តស្អាត! 🗂️')),
    ],
  ),

  lesson(
    W,
    'storage-and-memory',
    '💾',
    t('Storage & Memory', 'ការផ្ទុក និងអង្គចងចាំ'),
    t('Where files live: drives, USB and the cloud.', 'កន្លែងឯកសាររស់នៅ៖ ថាស USB និងពពក។'),
    9,
    [
      intro(
        '💾',
        t(
          'Your phone says “Storage full”? Let’s understand where files are kept and how big they are.',
          'ទូរស័ព្ទរបស់អ្នកថា “ទំហំផ្ទុកពេញ”? តោះស្វែងយល់ថាឯកសាររក្សាទុកនៅឯណា ហើយធំប៉ុណ្ណា។',
        ),
      ),
      learn(
        [
          '🗄️',
          t('Storage', 'ការផ្ទុក'),
          t(
            'Keeps files even when the power is off: hard drive, SSD, USB stick.',
            'រក្សាឯកសារសូម្បីពេលបិទភ្លើង៖ ថាសរឹង SSD ឧបករណ៍ USB។',
          ),
        ],
        [
          '⚡',
          t('Memory (RAM)', 'អង្គចងចាំ (RAM)'),
          t(
            'Fast, short-term space for apps that are open now. Emptied when you turn off.',
            'កន្លែងលឿន រយៈពេលខ្លី សម្រាប់កម្មវិធីដែលកំពុងបើក។ ទទេនៅពេលបិទ។',
          ),
        ],
        [
          '📏',
          t('Sizes', 'ទំហំ'),
          t('1 GB ≈ 1,000 MB · 1 MB ≈ 1,000 KB.', '1 GB ≈ 1,000 MB · 1 MB ≈ 1,000 KB។'),
        ],
      ),
      see(
        'KB < MB < GB < TB',
        t(
          'From small to very big: a text note, a photo, a film, a whole computer.',
          'ពីតូចទៅធំខ្លាំង៖ កំណត់ចំណាំ រូបថត ខ្សែភាពយន្ត កុំព្យូទ័រទាំងមូល។',
        ),
      ),
      revealPlay(
        'multiple_choice',
        mc(
          t(
            'Which keeps your files when the computer is turned off?',
            'តើមួយណារក្សាឯកសាររបស់អ្នក ពេលកុំព្យូទ័របិទ?',
          ),
          t('Storage (hard drive / SSD)', 'ការផ្ទុក (ថាសរឹង / SSD)'),
          [t('RAM', 'RAM'), t('The screen', 'អេក្រង់')],
        ),
        mc(t('Which is bigger?', 'តើមួយណាធំជាង?'), '1 GB', ['1 MB', '1 KB']),
        order(t('Put these from smallest to biggest.', 'តម្រៀបពីតូចទៅធំ។'), [
          'KB',
          'MB',
          'GB',
          'TB',
        ]),
        mc(t('A phone photo is usually about…', 'រូបថតទូរស័ព្ទជាធម្មតាប្រហែល…'), '3 MB', [
          '3 KB',
          '3 TB',
        ]),
        tf(
          t(
            'More RAM lets you keep more apps open smoothly.',
            'RAM ច្រើនជាង អនុញ្ញាតឱ្យអ្នកបើកកម្មវិធីច្រើនជាងដោយរលូន។',
          ),
          true,
        ),
        mc(
          t('A USB stick is used to…', 'ឧបករណ៍ USB ត្រូវបានប្រើដើម្បី…'),
          t('Carry files between computers', 'ផ្ទេរឯកសាររវាងកុំព្យូទ័រ'),
          [
            t('Make the internet faster', 'ធ្វើឱ្យអ៊ីនធឺណិតលឿនជាង'),
            t('Charge the phone', 'សាកទូរស័ព្ទ'),
          ],
        ),
        mc(
          t(
            '“The cloud” means your files are stored…',
            '“ពពក” មានន័យថាឯកសាររបស់អ្នកត្រូវបានរក្សាទុក…',
          ),
          t('On internet servers', 'នៅលើម៉ាស៊ីនមេអ៊ីនធឺណិត'),
          [t('In the sky', 'នៅលើមេឃ'), t('Only on your phone', 'តែនៅលើទូរស័ព្ទរបស់អ្នក')],
        ),
        mc(t('Which is a cloud storage service?', 'តើមួយណាជាសេវាផ្ទុកលើពពក?'), 'Google Drive', [
          'Calculator',
          'Paint',
        ]),
      ),
      revealChallenge(
        'multiple_choice',
        num(
          t(
            'Your phone has 64 GB. Apps and photos use 48 GB. How many GB are free?',
            'ទូរស័ព្ទរបស់អ្នកមាន 64 GB។ កម្មវិធី និងរូបថតប្រើ 48 GB។ តើនៅទំនេរប៉ុន្មាន GB?',
          ),
          16,
        ),
        num(
          t(
            'About how many 2 MB photos fit in 1,000 MB?',
            'តើរូបថត 2 MB ប្រហែលប៉ុន្មានដាក់ចូល 1,000 MB?',
          ),
          500,
        ),
        mc(
          t(
            '“Storage full” on your phone. A good fix?',
            '“ទំហំផ្ទុកពេញ” នៅលើទូរស័ព្ទ។ ការជួសជុលល្អ?',
          ),
          t('Delete old videos or move them to the cloud', 'លុបវីដេអូចាស់ ឬផ្លាស់វាទៅពពក'),
          [
            t('Turn the phone upside down', 'ផ្កាប់ទូរស័ព្ទ'),
            t('Download more apps', 'ទាញយកកម្មវិធីបន្ថែម'),
          ],
        ),
        tf(
          t(
            'A backup is an extra copy of your important files.',
            'ការបម្រុងទុក គឺជាច្បាប់ចម្លងបន្ថែមនៃឯកសារសំខាន់ៗរបស់អ្នក។',
          ),
          true,
        ),
        mc(
          t('Why keep a backup?', 'ហេតុអ្វីត្រូវរក្សាការបម្រុងទុក?'),
          t(
            'If your phone is lost or broken, your files are safe',
            'បើទូរស័ព្ទបាត់ ឬខូច ឯកសាររបស់អ្នកនៅតែមានសុវត្ថិភាព',
          ),
          [
            t('It makes the phone heavier', 'វាធ្វើឱ្យទូរស័ព្ទធ្ងន់ជាង'),
            t('It is required by law', 'ច្បាប់តម្រូវ'),
          ],
        ),
        sortInto(
          t('Storage or memory (RAM)?', 'ការផ្ទុក ឬអង្គចងចាំ (RAM)?'),
          [
            ['storage', t('Storage', 'ការផ្ទុក'), '🗄️'],
            ['ram', 'RAM', '⚡'],
          ],
          [
            [t('Keeps your photos for years', 'រក្សារូបថតរបស់អ្នកច្រើនឆ្នាំ'), 'storage'],
            [
              t('Holds the app you are using right now', 'ផ្ទុកកម្មវិធីដែលអ្នកកំពុងប្រើឥឡូវ'),
              'ram',
            ],
            [t('Emptied when you turn off', 'ទទេពេលអ្នកបិទ'), 'ram'],
            [t('Measured like 256 GB on a phone', 'វាស់ដូចជា 256 GB នៅលើទូរស័ព្ទ'), 'storage'],
          ],
        ),
        tf(
          t('An SSD is usually faster than an old hard disk.', 'SSD ជាធម្មតាលឿនជាងថាសរឹងចាស់។'),
          true,
        ),
        mc(
          t(
            'Safest place for your only copy of an important file?',
            'កន្លែងសុវត្ថិភាពបំផុតសម្រាប់ច្បាប់តែមួយគត់នៃឯកសារសំខាន់?',
          ),
          t('Nowhere — make a second copy (backup)!', 'គ្មានទេ — បង្កើតច្បាប់ទីពីរ (បម្រុងទុក)!'),
          [t('A USB stick only', 'តែឧបករណ៍ USB'), t('The desktop only', 'តែផ្ទៃតុ')],
        ),
      ),
      reward(t('Storage smart! 💾', 'ឆ្លាតផ្នែកការផ្ទុក! 💾')),
    ],
  ),

  lesson(
    W,
    'download-and-upload',
    '☁️',
    t('Download & Upload', 'ទាញយក និងផ្ទុកឡើង'),
    t('Moving files to and from the Internet.', 'ផ្ទេរឯកសារទៅ និងមកពីអ៊ីនធឺណិត។'),
    9,
    [
      intro(
        '☁️',
        t(
          'Files can travel between your device and the Internet.',
          'ឯកសារអាចធ្វើដំណើររវាងឧបករណ៍របស់អ្នក និងអ៊ីនធឺណិត។',
        ),
      ),
      learn(
        [
          '⬇️',
          t('Download', 'ទាញយក'),
          t(
            'Copy a file FROM the Internet TO your device.',
            'ចម្លងឯកសារពីអ៊ីនធឺណិត មកឧបករណ៍របស់អ្នក។',
          ),
        ],
        [
          '⬆️',
          t('Upload', 'ផ្ទុកឡើង'),
          t(
            'Send a file FROM your device TO the Internet.',
            'ផ្ញើឯកសារពីឧបករណ៍របស់អ្នក ទៅអ៊ីនធឺណិត។',
          ),
        ],
        [
          '📂',
          t('Downloads folder', 'ថតទាញយក'),
          t(
            'Downloaded files usually go to the “Downloads” folder.',
            'ឯកសារដែលទាញយក ជាធម្មតាទៅថត “Downloads”។',
          ),
        ],
      ),
      see(
        '🌐 ➜ ⬇️ ➜ 📱 · 📱 ➜ ⬆️ ➜ 🌐',
        t('Down = to you. Up = to the Internet.', 'ចុះ = មកអ្នក។ ឡើង = ទៅអ៊ីនធឺណិត។'),
      ),
      revealPlay(
        'drag_drop',
        sortInto(
          t('Is it a download or an upload?', 'តើវាជាការទាញយក ឬការផ្ទុកឡើង?'),
          [
            ['down', t('Download', 'ទាញយក'), '⬇️'],
            ['up', t('Upload', 'ផ្ទុកឡើង'), '⬆️'],
          ],
          [
            [t('Saving a PDF from a website', 'រក្សាទុក PDF ពីគេហទំព័រ'), 'down'],
            [t('Posting a photo online', 'បង្ហោះរូបថតតាមអនឡាញ'), 'up'],
            [
              t(
                'Sending your homework to the teacher’s website',
                'ផ្ញើកិច្ចការផ្ទះទៅគេហទំព័ររបស់គ្រូ',
              ),
              'up',
            ],
            [t('Getting a new app', 'ទទួលកម្មវិធីថ្មី'), 'down'],
          ],
          {
            hint: t('Is the file coming to you, or leaving you?', 'តើឯកសារមករកអ្នក ឬចាកចេញពីអ្នក?'),
          },
        ),
        tf(
          t(
            'Downloaded files usually go to the Downloads folder.',
            'ឯកសារដែលទាញយកជាធម្មតាទៅថត Downloads។',
          ),
          true,
        ),
        mc(
          t('Only download files from…', 'ទាញយកឯកសារតែពី…'),
          t('Websites you trust', 'គេហទំព័រដែលអ្នកទុកចិត្ត'),
          [
            t('Any pop-up that says “Free!”', 'ផ្ទាំងលេចណាមួយដែលថា “ឥតគិតថ្លៃ!”'),
            t('Strangers’ messages', 'សាររបស់មនុស្សចម្លែក'),
          ],
          {
            explanation: t(
              'Unknown downloads can contain viruses.',
              'ការទាញយកដែលមិនស្គាល់ អាចមានមេរោគ។',
            ),
          },
        ),
        mc(
          t('Sending a photo in Telegram is…', 'ការផ្ញើរូបថតក្នុង Telegram គឺ…'),
          t('Uploading', 'ការផ្ទុកឡើង'),
          [t('Downloading', 'ការទាញយក')],
        ),
        mc(
          t('Watching a video without saving it is called…', 'ការមើលវីដេអូដោយមិនរក្សាទុក ហៅថា…'),
          t('Streaming', 'ការផ្សាយផ្ទាល់ (Streaming)'),
          [t('Uploading', 'ការផ្ទុកឡើង'), t('Printing', 'ការបោះពុម្ព')],
        ),
        mc(
          t('The ⬇️ icon on a website usually means…', 'រូប ⬇️ នៅលើគេហទំព័រ ជាធម្មតាមានន័យថា…'),
          t('Download', 'ទាញយក'),
          [t('Delete', 'លុប'), t('Log out', 'ចាកចេញ')],
        ),
        tf(t('Big files take longer to download.', 'ឯកសារធំៗ ចំណាយពេលទាញយកយូរជាង។'), true),
        mc(
          t(
            'A file ending in .exe from an unknown email is…',
            'ឯកសារដែលបញ្ចប់ដោយ .exe ពីអ៊ីមែលមិនស្គាល់ គឺ…',
          ),
          t('Dangerous — don’t open it', 'គ្រោះថ្នាក់ — កុំបើកវា'),
          [t('A safe photo', 'រូបថតសុវត្ថិភាព'), t('A song', 'បទចម្រៀង')],
          {
            explanation: t(
              '.exe files are programs and can install viruses.',
              'ឯកសារ .exe គឺជាកម្មវិធី ហើយអាចដំឡើងមេរោគ។',
            ),
          },
        ),
      ),
      revealChallenge(
        'multiple_choice',
        num(
          t(
            'A 100 MB file downloads at 10 MB per second. How many seconds?',
            'ឯកសារ 100 MB ទាញយកក្នុងល្បឿន 10 MB ក្នុងមួយវិនាទី។ តើប៉ុន្មានវិនាទី?',
          ),
          10,
        ),
        mc(
          t(
            'You uploaded your CV to a job website. Where is your original?',
            'អ្នកបានផ្ទុក CV ឡើងទៅគេហទំព័រការងារ។ តើច្បាប់ដើមរបស់អ្នកនៅឯណា?',
          ),
          t('Still on your device', 'នៅតែនៅលើឧបករណ៍របស់អ្នក'),
          [
            t('Gone from your device', 'បាត់ពីឧបករណ៍របស់អ្នក'),
            t('In the Recycle Bin', 'ក្នុងធុងសំរាម'),
          ],
          {
            explanation: t('Uploading sends a copy.', 'ការផ្ទុកឡើងផ្ញើច្បាប់ចម្លង។'),
          },
        ),
        tf(
          t(
            'Downloading music or films that are not free from unofficial sites can be illegal.',
            'ការទាញយកតន្ត្រី ឬខ្សែភាពយន្តដែលមិនឥតគិតថ្លៃពីគេហទំព័រមិនផ្លូវការ អាចខុសច្បាប់។',
          ),
          true,
        ),
        mc(
          t(
            'A website says “Your phone has a virus! Download this cleaner now!” You should…',
            'គេហទំព័រមួយថា “ទូរស័ព្ទរបស់អ្នកមានមេរោគ! ទាញយកកម្មវិធីសម្អាតនេះឥឡូវ!” អ្នកគួរ…',
          ),
          t('Close the page — it’s a trick', 'បិទទំព័រ — វាជាល្បិច'),
          [
            t('Download it quickly', 'ទាញយកវាឱ្យលឿន'),
            t('Enter your password', 'បញ្ចូលពាក្យសម្ងាត់'),
          ],
        ),
        mc(
          t('On mobile data, big downloads can…', 'នៅលើទិន្នន័យទូរស័ព្ទ ការទាញយកធំៗអាច…'),
          t('Use up your data package', 'ប្រើអស់កញ្ចប់ទិន្នន័យរបស់អ្នក'),
          [
            t('Charge your battery', 'សាកថ្មរបស់អ្នក'),
            t('Make your phone lighter', 'ធ្វើឱ្យទូរស័ព្ទស្រាលជាង'),
          ],
          {
            explanation: t(
              'Use Wi-Fi for big downloads when you can.',
              'ប្រើ Wi-Fi សម្រាប់ការទាញយកធំៗ នៅពេលអ្នកអាច។',
            ),
          },
        ),
        sortInto(
          t('Safe to download?', 'សុវត្ថិភាពក្នុងការទាញយក?'),
          [
            ['safe', t('Safe', 'សុវត្ថិភាព'), '✅'],
            ['risky', t('Risky', 'ប្រថុយ'), '⚠️'],
          ],
          [
            [t('An app from Google Play', 'កម្មវិធីពី Google Play'), 'safe'],
            [t('“Free_Movie.exe” from a pop-up', '“Free_Movie.exe” ពីផ្ទាំងលេច'), 'risky'],
            [
              t('A school PDF from the teacher’s official page', 'PDF សាលាពីទំព័រផ្លូវការរបស់គ្រូ'),
              'safe',
            ],
            [
              t('A file a stranger sent on Facebook', 'ឯកសារដែលមនុស្សចម្លែកផ្ញើតាម Facebook'),
              'risky',
            ],
          ],
        ),
        mc(
          t(
            'Where do you look first for a file you just downloaded?',
            'តើអ្នកមើលរកឯកសារដែលទើបទាញយកមុនគេនៅឯណា?',
          ),
          t('The Downloads folder', 'ថត Downloads'),
          [t('The Recycle Bin', 'ធុងសំរាម'), t('The Music folder', 'ថត Music')],
        ),
        tf(
          t(
            'Upload speed is often slower than download speed at home.',
            'ល្បឿនផ្ទុកឡើង ច្រើនតែយឺតជាងល្បឿនទាញយកនៅផ្ទះ។',
          ),
          true,
        ),
      ),
      reward(t('Computer Explorer complete! 🖥️', 'អ្នករុករកកុំព្យូទ័របានបញ្ចប់! 🖥️')),
    ],
  ),
];
