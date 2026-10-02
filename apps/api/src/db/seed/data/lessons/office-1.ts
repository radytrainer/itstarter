import { t, type LessonSeed } from '../../types';
import {
  creation,
  formatText,
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

// 📄 Office Creator, lessons 1–7 (office-2.ts has 8–15): Word documents. Practised in simple
// simulations (no Office needed). Khmer (km) strings are DRAFTS for native review.
export const OFFICE_WORLD = 'office-creator';
const W = OFFICE_WORLD;

export const OFFICE_LESSONS_1: LessonSeed[] = [
  lesson(
    W,
    'what-is-a-document',
    '📝',
    t('Word Documents', 'ឯកសារ Word'),
    t('Writing on a computer.', 'ការសរសេរលើកុំព្យូទ័រ។'),
    9,
    [
      intro(
        '📝',
        t(
          'Microsoft Word is for writing: letters, CVs, reports. Let’s learn the basics.',
          'Microsoft Word សម្រាប់សរសេរ៖ លិខិត CV របាយការណ៍។ តោះរៀនមូលដ្ឋាន។',
        ),
      ),
      learn(
        [
          '📄',
          t('Document', 'ឯកសារ'),
          t(
            'A page of writing you can edit, save and print.',
            'ទំព័រអត្ថបទដែលអ្នកអាចកែ រក្សាទុក និងបោះពុម្ព។',
          ),
        ],
        [
          '▌',
          t('Cursor', 'ទស្សន៍ទ្រនិច'),
          t(
            'The blinking line shows where your typing will go.',
            'បន្ទាត់ភ្លឹបភ្លែតបង្ហាញកន្លែងដែលអក្សរនឹងលេចឡើង។',
          ),
        ],
        [
          '🖍️',
          t('Select text', 'ជ្រើសរើសអត្ថបទ'),
          t(
            'Drag over words (or double-tap on a phone) to choose them before changing them.',
            'អូសលើពាក្យ (ឬប៉ះពីរដងលើទូរស័ព្ទ) ដើម្បីជ្រើសរើសមុនពេលផ្លាស់ប្តូរ។',
          ),
        ],
        ['💾', t('Save', 'រក្សាទុក'), t('Ctrl + S — save often!', 'Ctrl + S — រក្សាទុកញឹកញាប់!')],
      ),
      see(
        t('Select “Hello” → press B → **Hello**', 'ជ្រើសរើស “Hello” → ចុច B → **Hello**'),
        t(
          'First select the text, then choose what to do with it.',
          'ជ្រើសរើសអត្ថបទមុន រួចជ្រើសរើសអ្វីដែលត្រូវធ្វើ។',
        ),
      ),
      revealPlay(
        'word_sim',
        mc(
          t('Before you can make a word bold, you must…', 'មុនពេលធ្វើឱ្យពាក្យដិត អ្នកត្រូវ…'),
          t('Select it', 'ជ្រើសរើសវា'),
          [t('Delete it', 'លុបវា'), t('Print it', 'បោះពុម្ពវា')],
          {
            explanation: t(
              'The computer needs to know WHICH word.',
              'កុំព្យូទ័រត្រូវដឹងថាពាក្យណា។',
            ),
          },
        ),
        tf(
          t(
            'The blinking line in a document is called the cursor.',
            'បន្ទាត់ភ្លឹបភ្លែតក្នុងឯកសារហៅថាទស្សន៍ទ្រនិច។',
          ),
          true,
        ),
        mc(
          t(
            'Which app is mainly for writing letters and reports?',
            'តើកម្មវិធីណាសម្រាប់សរសេរលិខិត និងរបាយការណ៍?',
          ),
          'Word',
          ['Excel', 'Calculator'],
        ),
        mc(
          t(
            'Which is a free alternative to Word that works in a browser?',
            'តើមួយណាជាជម្រើសឥតគិតថ្លៃជំនួស Word ដែលដំណើរការក្នុងកម្មវិធីរុករក?',
          ),
          'Google Docs',
          ['Google Maps', 'YouTube'],
        ),
        mc(t('A Word file usually ends with…', 'ឯកសារ Word ជាធម្មតាបញ្ចប់ដោយ…'), '.docx', [
          '.mp3',
          '.jpg',
          '.xlsx',
        ]),
        tf(
          t('You can change a document after you save it.', 'អ្នកអាចកែឯកសារបន្ទាប់ពីរក្សាទុក។'),
          true,
        ),
        mc(
          t('Where do you type the text?', 'តើអ្នកវាយអត្ថបទនៅឯណា?'),
          t('On the page, where the cursor is', 'នៅលើទំព័រ កន្លែងទស្សន៍ទ្រនិច'),
          [t('In the title bar', 'ក្នុងរបារចំណងជើង'), t('On the ruler', 'លើបន្ទាត់វាស់')],
        ),
        mc(
          t('The row of buttons at the top of Word is called the…', 'ជួរប៊ូតុងនៅខាងលើ Word ហៅថា…'),
          t('Ribbon (toolbar)', 'Ribbon (របារឧបករណ៍)'),
          [t('Desktop', 'ផ្ទៃតុ'), t('Footer', 'បាតកថា')],
        ),
      ),
      revealChallenge(
        'matching',
        match(t('Match the button to what it does.', 'ផ្គូផ្គងប៊ូតុងទៅនឹងអ្វីដែលវាធ្វើ។'), [
          ['B', t('Bold (thick letters)', 'ដិត (អក្សរក្រាស់)')],
          ['I', t('Italic (sloping letters)', 'ទ្រេត (អក្សរផ្អៀង)')],
          ['U', t('Underline', 'គូសបន្ទាត់ក្រោម')],
          ['💾', t('Save', 'រក្សាទុក')],
        ]),
        mc(
          t('How do you start a new paragraph?', 'តើអ្នកចាប់ផ្តើមកថាខណ្ឌថ្មីដោយរបៀបណា?'),
          t('Press Enter', 'ចុច Enter'),
          [t('Press Shift', 'ចុច Shift'), t('Press Esc', 'ចុច Esc')],
        ),
        mc(
          t('A new, empty document is called…', 'ឯកសារថ្មីទទេ ហៅថា…'),
          t('A blank document', 'ឯកសារទទេ'),
          [t('A template', 'គំរូ'), t('A folder', 'ថត')],
        ),
        tf(
          t(
            'A template is a ready-made design you can fill in (like a CV layout).',
            'គំរូ គឺជាការរចនាដែលបានរៀបចំរួច ដែលអ្នកអាចបំពេញ (ដូចជាប្លង់ CV)។',
          ),
          true,
        ),
        mc(
          t('Which document would you make in Word?', 'តើឯកសារណាដែលអ្នកនឹងបង្កើតក្នុង Word?'),
          t('A job application letter', 'លិខិតដាក់ពាក្យការងារ'),
          [
            t('A class budget with totals', 'ថវិកាថ្នាក់ដែលមានសរុប'),
            t('A slideshow', 'ការបញ្ចាំងស្លាយ'),
          ],
        ),
        mc(
          t(
            'Word underlines a word with a red wavy line. It means…',
            'Word គូសបន្ទាត់រលកក្រហមក្រោមពាក្យមួយ។ មានន័យថា…',
          ),
          t('It may be spelled wrong', 'វាប្រហែលជាសរសេរខុស'),
          [t('It is very important', 'វាសំខាន់ខ្លាំង'), t('It is a link', 'វាជាតំណ')],
        ),
        num(
          t(
            'Your essay must be 300 words. You have 240. How many more words?',
            'អត្ថបទរបស់អ្នកត្រូវមាន 300 ពាក្យ។ អ្នកមាន 240។ តើត្រូវការពាក្យប៉ុន្មានទៀត?',
          ),
          60,
        ),
        tf(t('Word can count your words for you.', 'Word អាចរាប់ពាក្យឱ្យអ្នកបាន។'), true, {
          explanation: t('Look at the bottom bar: “240 words”.', 'មើលរបារខាងក្រោម៖ “240 ពាក្យ”។'),
        }),
      ),
      reward(t('Word basics: done! 📝', 'មូលដ្ឋាន Word៖ រួចរាល់! 📝')),
    ],
  ),

  lesson(
    W,
    'typing-and-editing',
    '✏️',
    t('Typing & Editing', 'ការវាយ និងការកែសម្រួល'),
    t('Select, delete, undo and fix spelling.', 'ជ្រើសរើស លុប ត្រឡប់វិញ និងកែអក្ខរាវិរុទ្ធ។'),
    9,
    [
      intro(
        '✏️',
        t(
          'Nobody writes perfectly the first time. Editing is how good writing is made!',
          'គ្មាននរណាសរសេរល្អឥតខ្ចោះលើកដំបូងទេ។ ការកែសម្រួល គឺជារបៀបបង្កើតការសរសេរល្អ!',
        ),
      ),
      learn(
        [
          '🖱️',
          t('Select fast', 'ជ្រើសរើសលឿន'),
          t(
            'Double-click = one word. Triple-click = the whole paragraph.',
            'ចុចពីរដង = មួយពាក្យ។ ចុចបីដង = កថាខណ្ឌទាំងមូល។',
          ),
        ],
        [
          '⌫',
          t('Delete', 'លុប'),
          t(
            'Backspace deletes left of the cursor, Delete deletes right.',
            'Backspace លុបខាងឆ្វេងទស្សន៍ទ្រនិច Delete លុបខាងស្តាំ។',
          ),
        ],
        [
          '🔤',
          t('Spelling', 'អក្ខរាវិរុទ្ធ'),
          t(
            'Right-click a red-underlined word to see suggestions.',
            'ចុចខាងស្តាំលើពាក្យដែលមានបន្ទាត់ក្រហម ដើម្បីមើលការណែនាំ។',
          ),
        ],
      ),
      see(
        t(
          '“I like footbal” → right-click → “football”',
          '“I like footbal” → ចុចខាងស្តាំ → “football”',
        ),
        t('The spell checker suggests the fix.', 'កម្មវិធីពិនិត្យអក្ខរាវិរុទ្ធណែនាំការកែ។'),
      ),
      revealPlay(
        'word_sim',
        mc(
          t(
            'How do you select one whole word quickly?',
            'តើអ្នកជ្រើសរើសពាក្យមួយទាំងមូលបានលឿនដោយរបៀបណា?',
          ),
          t('Double-click it', 'ចុចវាពីរដង'),
          [t('Right-click the page', 'ចុចខាងស្តាំលើទំព័រ'), t('Press Enter', 'ចុច Enter')],
        ),
        mc(
          t('Triple-click selects…', 'ការចុចបីដងជ្រើសរើស…'),
          t('The whole paragraph', 'កថាខណ្ឌទាំងមូល'),
          [t('One letter', 'អក្សរមួយ'), t('The whole file', 'ឯកសារទាំងមូល')],
        ),
        mc(
          t(
            'The cursor is after “cat|”. Backspace deletes…',
            'ទស្សន៍ទ្រនិចនៅក្រោយ “cat|”។ Backspace លុប…',
          ),
          '“t”',
          ['“c”', t('Nothing', 'គ្មានអ្វីទេ')],
        ),
        mc(
          t('You deleted a paragraph by mistake. Press…', 'អ្នកលុបកថាខណ្ឌដោយច្រឡំ។ ចុច…'),
          'Ctrl + Z',
          ['Ctrl + P', 'Ctrl + B'],
        ),
        tf(
          t(
            'The spell checker always knows names like “Sreymom”.',
            'កម្មវិធីពិនិត្យអក្ខរាវិរុទ្ធស្គាល់ឈ្មោះដូចជា “Sreymom” ជានិច្ច។',
          ),
          false,
          {
            explanation: t(
              'It may underline names it doesn’t know. They aren’t really wrong.',
              'វាអាចគូសបន្ទាត់ក្រោមឈ្មោះដែលវាមិនស្គាល់។ វាមិនមែនខុសពិតប្រាកដទេ។',
            ),
          },
        ),
        mc(
          t('Which sentence needs a fix?', 'តើប្រយោគណាត្រូវការកែ?'),
          'i live in phnom penh.',
          ['I live in Phnom Penh.', 'We study at 8:00.'],
          {
            explanation: t(
              'Sentences and names start with capital letters: “I live in Phnom Penh.”',
              'ប្រយោគ និងឈ្មោះចាប់ផ្តើមដោយអក្សរធំ៖ “I live in Phnom Penh.”',
            ),
          },
        ),
        mc(
          t(
            '“Find and Replace” (Ctrl + H) is useful to…',
            '“ស្វែងរក និងជំនួស” (Ctrl + H) មានប្រយោជន៍ដើម្បី…',
          ),
          t('Change a word everywhere at once', 'ប្តូរពាក្យមួយគ្រប់កន្លែងក្នុងពេលតែមួយ'),
          [t('Print the document', 'បោះពុម្ពឯកសារ'), t('Close Word', 'បិទ Word')],
        ),
        tf(
          t('Reading your work aloud helps you find mistakes.', 'ការអានការងារឮៗ ជួយអ្នករកកំហុស។'),
          true,
        ),
      ),
      revealChallenge(
        'ordering',
        order(
          t(
            'Fix a spelling mistake: put the steps in order.',
            'កែកំហុសអក្ខរាវិរុទ្ធ៖ តម្រៀបជំហាន។',
          ),
          [
            t('See the red wavy line', 'ឃើញបន្ទាត់រលកក្រហម'),
            t('Right-click the word', 'ចុចខាងស្តាំលើពាក្យ'),
            t('Choose the right spelling', 'ជ្រើសរើសអក្ខរាវិរុទ្ធត្រឹមត្រូវ'),
          ],
        ),
        order(
          t(
            'Move a sentence to the end: put the steps in order.',
            'ផ្លាស់ប្រយោគទៅខាងចុង៖ តម្រៀបជំហាន។',
          ),
          [
            t('Select the sentence', 'ជ្រើសរើសប្រយោគ'),
            t('Ctrl + X (cut)', 'Ctrl + X (កាត់)'),
            t('Click at the end', 'ចុចនៅខាងចុង'),
            t('Ctrl + V (paste)', 'Ctrl + V (បិទភ្ជាប់)'),
          ],
        ),
        mc(
          t(
            'A green or blue double line under words usually means…',
            'បន្ទាត់ពីរពណ៌បៃតង ឬខៀវក្រោមពាក្យ ជាធម្មតាមានន័យថា…',
          ),
          t('A grammar suggestion', 'ការណែនាំវេយ្យាករណ៍'),
          [t('A virus', 'មេរោគ'), t('A link', 'តំណ')],
        ),
        mc(
          t('Which is correct?', 'តើមួយណាត្រឹមត្រូវ?'),
          t('Hello, my name is Dara.', 'Hello, my name is Dara.'),
          ['hello my name is dara', 'Hello , my name is Dara .'],
        ),
        tf(
          t(
            'Ctrl + Y redoes something you just undid.',
            'Ctrl + Y ធ្វើម្តងទៀតនូវអ្វីដែលអ្នកទើបត្រឡប់វិញ។',
          ),
          true,
        ),
        mc(
          t('Shift + an arrow key…', 'Shift + គ្រាប់ចុចព្រួញ…'),
          t('Selects text one letter at a time', 'ជ្រើសរើសអត្ថបទម្តងមួយអក្សរ'),
          [t('Deletes a line', 'លុបបន្ទាត់មួយ'), t('Makes text bold', 'ធ្វើឱ្យអក្សរដិត')],
        ),
        mc(
          t(
            '“Insert” mode replaced your letters as you typed. Which key toggles it?',
            'របៀប “Insert” ជំនួសអក្សររបស់អ្នក ពេលអ្នកវាយ។ តើគ្រាប់ចុចណាបិទ/បើកវា?',
          ),
          'Insert',
          ['Tab', 'Home'],
        ),
        tf(
          t(
            'Spell checkers catch every mistake, so you never need to re-read.',
            'កម្មវិធីពិនិត្យអក្ខរាវិរុទ្ធរកឃើញកំហុសទាំងអស់ ដូច្នេះអ្នកមិនចាំបាច់អានឡើងវិញទេ។',
          ),
          false,
          {
            explanation: t(
              '“I want to by a book” has no red line, but “by” should be “buy”.',
              '“I want to by a book” គ្មានបន្ទាត់ក្រហមទេ ប៉ុន្តែ “by” គួរតែជា “buy”។',
            ),
          },
        ),
      ),
      reward(t('Sharp editor! ✏️', 'អ្នកកែសម្រួលពូកែ! ✏️')),
    ],
  ),

  lesson(
    W,
    'format-your-text',
    '🅱️',
    t('Format Your Text', 'រៀបចំទម្រង់អត្ថបទ'),
    t('Bold, italic, size and alignment.', 'ដិត ទ្រេត ទំហំ និងការតម្រឹម។'),
    9,
    [
      intro(
        '🅱️',
        t(
          'Formatting makes a document easy to read. Let’s make a title look great.',
          'ការរៀបចំទម្រង់ធ្វើឱ្យឯកសារងាយអាន។ តោះធ្វើឱ្យចំណងជើងស្អាត។',
        ),
      ),
      learn(
        [
          '🅱️',
          t('Bold', 'ដិត'),
          t(
            'Thick letters for titles and important words.',
            'អក្សរក្រាស់សម្រាប់ចំណងជើង និងពាក្យសំខាន់ៗ។',
          ),
        ],
        [
          '📏',
          t('Font size', 'ទំហំអក្សរ'),
          t(
            'Bigger text for titles, normal text for the rest.',
            'អក្សរធំសម្រាប់ចំណងជើង អក្សរធម្មតាសម្រាប់ផ្សេងទៀត។',
          ),
        ],
        [
          '↔️',
          t('Alignment', 'ការតម្រឹម'),
          t(
            'Left, centre or right. Titles often go in the centre.',
            'ឆ្វេង កណ្តាល ឬស្តាំ។ ចំណងជើងច្រើនតែនៅកណ្តាល។',
          ),
        ],
      ),
      see(
        'my profile → MY PROFILE',
        t(
          'The same words, but now clearly a title (bold, large, centred).',
          'ពាក្យដដែល ប៉ុន្តែឥឡូវច្បាស់ជាចំណងជើង (ដិត ធំ កណ្តាល)។',
        ),
      ),
      revealPlay(
        'word_sim',
        formatText(
          t('Make the title bold.', 'ធ្វើឱ្យចំណងជើងដិត។'),
          'My Profile',
          { bold: true },
          { hint: t('Tap the B button.', 'ចុចប៊ូតុង B។') },
        ),
        formatText(t('Put the title in the centre.', 'ដាក់ចំណងជើងនៅកណ្តាល។'), 'My Profile', {
          align: 'center',
        }),
        formatText(t('Make the text italic.', 'ធ្វើឱ្យអត្ថបទទ្រេត។'), 'a short note', {
          italic: true,
        }),
        formatText(t('Underline the word.', 'គូសបន្ទាត់ក្រោមពាក្យ។'), 'Deadline', {
          underline: true,
        }),
        formatText(t('Make the text large.', 'ធ្វើឱ្យអត្ថបទធំ។'), 'Welcome', { size: 'large' }),
        formatText(t('Put the date on the right.', 'ដាក់កាលបរិច្ឆេទនៅខាងស្តាំ។'), '1 June 2028', {
          align: 'right',
        }),
        mc(t('Which is the shortcut for bold?', 'តើផ្លូវកាត់សម្រាប់ដិតគឺអ្វី?'), 'Ctrl + B', [
          'Ctrl + I',
          'Ctrl + U',
        ]),
        mc(t('Which is the shortcut for italic?', 'តើផ្លូវកាត់សម្រាប់ទ្រេតគឺអ្វី?'), 'Ctrl + I', [
          'Ctrl + B',
          'Ctrl + T',
        ]),
      ),
      revealChallenge(
        'word_sim',
        formatText(
          t(
            'Make it a real title: bold, large and centred.',
            'ធ្វើឱ្យវាក្លាយជាចំណងជើងពិត៖ ដិត ធំ និងកណ្តាល។',
          ),
          'My Profile',
          { bold: true, size: 'large', align: 'center' },
          {
            hint: t(
              'Three changes: B, the size, and the centre button.',
              'ការផ្លាស់ប្តូរបី៖ B ទំហំ និងប៊ូតុងកណ្តាល។',
            ),
          },
        ),
        formatText(
          t(
            'Make the word “important” italic and underlined.',
            'ធ្វើឱ្យពាក្យ “important” ទ្រេត និងគូសបន្ទាត់ក្រោម។',
          ),
          'important',
          { italic: true, underline: true },
        ),
        formatText(
          t('Small print: make the text small.', 'អក្សរតូច៖ ធ្វើឱ្យអត្ថបទតូច។'),
          'Terms and conditions',
          { size: 'small' },
        ),
        mc(
          t('Too much bold text makes a page…', 'អក្សរដិតច្រើនពេកធ្វើឱ្យទំព័រ…'),
          t('Harder to read', 'ពិបាកអានជាង'),
          [t('Easier to read', 'ងាយអានជាង'), t('Shorter', 'ខ្លីជាង')],
          {
            explanation: t(
              'Bold works because it is rare. Use it for titles and key words.',
              'អក្សរដិតមានប្រសិទ្ធភាព ព្រោះវាកម្រ។ ប្រើវាសម្រាប់ចំណងជើង និងពាក្យគន្លឹះ។',
            ),
          },
        ),
        mc(
          t('Most body text in a letter is aligned…', 'អត្ថបទភាគច្រើនក្នុងលិខិតត្រូវតម្រឹម…'),
          t('Left', 'ឆ្វេង'),
          [t('Centre', 'កណ្តាល'), t('Right', 'ស្តាំ')],
        ),
        mc(
          t('A font is…', 'ពុម្ពអក្សរ (font) គឺ…'),
          t('The style of the letters', 'រចនាប័ទ្មនៃអក្សរ'),
          [t('The page size', 'ទំហំទំព័រ'), t('The printer', 'ម៉ាស៊ីនបោះពុម្ព')],
        ),
        tf(
          t(
            'Using 5 different fonts on one page looks professional.',
            'ការប្រើពុម្ពអក្សរ 5 ផ្សេងគ្នាលើទំព័រមួយមើលទៅអាជីព។',
          ),
          false,
          {
            explanation: t(
              'One or two fonts look clean and professional.',
              'ពុម្ពអក្សរមួយ ឬពីរមើលទៅស្អាត និងអាជីព។',
            ),
          },
        ),
        mc(
          t('Which font is made for Khmer text?', 'តើពុម្ពអក្សរណាត្រូវបានបង្កើតសម្រាប់អក្សរខ្មែរ?'),
          'Khmer OS',
          ['Arial Black', 'Comic Sans'],
        ),
      ),
      reward(t('Your text looks professional! ✨', 'អត្ថបទរបស់អ្នកមើលទៅអាជីព! ✨')),
    ],
  ),

  lesson(
    W,
    'lists-and-paragraphs',
    '📑',
    t('Lists & Paragraphs', 'បញ្ជី និងកថាខណ្ឌ'),
    t('Bullets, numbers, headings and spacing.', 'ចំណុច លេខ ចំណងជើងរង និងគម្លាត។'),
    9,
    [
      intro(
        '📑',
        t(
          'Long blocks of text are hard to read. Lists and headings help readers find things fast.',
          'អត្ថបទវែងៗពិបាកអាន។ បញ្ជី និងចំណងជើងរងជួយអ្នកអានរកឃើញលឿន។',
        ),
      ),
      learn(
        [
          '•',
          t('Bullet list', 'បញ្ជីចំណុច'),
          t(
            'For items in any order: things to bring, skills.',
            'សម្រាប់របស់តាមលំដាប់ណាក៏បាន៖ របស់ត្រូវយក ជំនាញ។',
          ),
        ],
        [
          '1.',
          t('Numbered list', 'បញ្ជីលេខ'),
          t(
            'For steps in order: a recipe, instructions.',
            'សម្រាប់ជំហានតាមលំដាប់៖ រូបមន្ត ការណែនាំ។',
          ),
        ],
        [
          '🔠',
          t('Headings', 'ចំណងជើងរង'),
          t(
            'Short titles for each part of a long document.',
            'ចំណងជើងខ្លីសម្រាប់ផ្នែកនីមួយៗនៃឯកសារវែង។',
          ),
        ],
      ),
      see(
        t('Skills:\n• Typing\n• Excel\n• English', 'ជំនាញ៖\n• វាយអក្សរ\n• Excel\n• អង់គ្លេស'),
        t('A bullet list is quick to read.', 'បញ្ជីចំណុចងាយអានលឿន។'),
      ),
      revealPlay(
        'word_sim',
        mc(
          t('Steps to make tea should be a…', 'ជំហានធ្វើតែគួរតែជា…'),
          t('Numbered list', 'បញ្ជីលេខ'),
          [t('Bullet list', 'បញ្ជីចំណុច'), t('Single long sentence', 'ប្រយោគវែងតែមួយ')],
          {
            explanation: t('Order matters, so use numbers.', 'លំដាប់សំខាន់ ដូច្នេះប្រើលេខ។'),
          },
        ),
        mc(
          t(
            '“Things to bring: pen, water, hat” should be a…',
            '“របស់ត្រូវយក៖ ប៊ិច ទឹក មួក” គួរតែជា…',
          ),
          t('Bullet list', 'បញ្ជីចំណុច'),
          [t('Numbered list', 'បញ្ជីលេខ'), t('Table of contents', 'តារាងមាតិកា')],
        ),
        sortInto(
          t('Bullets or numbers?', 'ចំណុច ឬលេខ?'),
          [
            ['bullets', t('Bullet list', 'បញ្ជីចំណុច'), '•'],
            ['numbers', t('Numbered list', 'បញ្ជីលេខ'), '1.'],
          ],
          [
            [t('My hobbies', 'ចំណូលចិត្តរបស់ខ្ញុំ'), 'bullets'],
            [t('How to install an app', 'របៀបដំឡើងកម្មវិធី'), 'numbers'],
            [t('Top 3 winners of a race', 'អ្នកឈ្នះ 3 នាក់ដំបូងនៃការប្រណាំង'), 'numbers'],
            [t('Fruits I like', 'ផ្លែឈើដែលខ្ញុំចូលចិត្ត'), 'bullets'],
          ],
        ),
        tf(
          t(
            'Pressing Enter in a list adds the next bullet automatically.',
            'ការចុច Enter ក្នុងបញ្ជីបន្ថែមចំណុចបន្ទាប់ដោយស្វ័យប្រវត្តិ។',
          ),
          true,
        ),
        mc(
          t('How do you end a list?', 'តើអ្នកបញ្ចប់បញ្ជីដោយរបៀបណា?'),
          t('Press Enter twice', 'ចុច Enter ពីរដង'),
          [t('Press Esc', 'ចុច Esc'), t('Restart Word', 'ចាប់ផ្តើម Word ឡើងវិញ')],
        ),
        mc(
          t('Line spacing changes…', 'គម្លាតបន្ទាត់ផ្លាស់ប្តូរ…'),
          t('The space between lines', 'ចន្លោះរវាងបន្ទាត់'),
          [t('The font colour', 'ពណ៌អក្សរ'), t('The page number', 'លេខទំព័រ')],
        ),
        mc(
          t('Why use headings in a long report?', 'ហេតុអ្វីប្រើចំណងជើងរងក្នុងរបាយការណ៍វែង?'),
          t('Readers find each part quickly', 'អ្នកអានរកផ្នែកនីមួយៗឃើញលឿន'),
          [
            t('It makes the file smaller', 'វាធ្វើឱ្យឯកសារតូចជាង'),
            t('Teachers like red text', 'គ្រូចូលចិត្តអក្សរក្រហម'),
          ],
        ),
        tf(
          t('A good paragraph talks about one main idea.', 'កថាខណ្ឌល្អនិយាយពីគំនិតចម្បងមួយ។'),
          true,
        ),
      ),
      revealChallenge(
        'word_sim',
        order(t('Put this report in order.', 'តម្រៀបរបាយការណ៍នេះ។'), [
          t('Title', 'ចំណងជើង'),
          t('Introduction', 'សេចក្តីផ្តើម'),
          t('Main parts (with headings)', 'ផ្នែកសំខាន់ៗ (មានចំណងជើងរង)'),
          t('Conclusion', 'សេចក្តីសន្និដ្ឋាន'),
        ]),
        mc(
          t('Word can build a table of contents from your…', 'Word អាចបង្កើតតារាងមាតិកាពី…'),
          t('Headings', 'ចំណងជើងរងរបស់អ្នក'),
          [t('Pictures', 'រូបភាព'), t('Spelling mistakes', 'កំហុសអក្ខរាវិរុទ្ធ')],
        ),
        mc(
          t(
            'To keep text from touching the page edge, Word uses…',
            'ដើម្បីកុំឱ្យអត្ថបទប៉ះគែមទំព័រ Word ប្រើ…',
          ),
          t('Margins', 'គែមទំព័រ (Margins)'),
          [t('Bullets', 'ចំណុច'), t('Fonts', 'ពុម្ពអក្សរ')],
        ),
        mc(
          t('Page numbers usually go in the…', 'លេខទំព័រជាធម្មតានៅក្នុង…'),
          t('Footer (bottom of the page)', 'បាតកថា (ខាងក្រោមទំព័រ)'),
          [t('Title', 'ចំណងជើង'), t('Middle of the text', 'កណ្តាលអត្ថបទ')],
        ),
        tf(
          t(
            'A new page can be started with Ctrl + Enter (page break).',
            'ទំព័រថ្មីអាចចាប់ផ្តើមដោយ Ctrl + Enter (បំបែកទំព័រ)។',
          ),
          true,
        ),
        mc(
          t('Indenting a paragraph means…', 'ការចូលបន្ទាត់កថាខណ្ឌ មានន័យថា…'),
          t('Moving it a little to the right', 'ផ្លាស់វាទៅស្តាំបន្តិច'),
          [t('Deleting it', 'លុបវា'), t('Making it red', 'ធ្វើឱ្យវាក្រហម')],
        ),
        num(
          t(
            'A recipe has 6 steps. The numbered list starts at 1. What number is the last step?',
            'រូបមន្តមួយមាន 6 ជំហាន។ បញ្ជីលេខចាប់ផ្តើមពី 1។ តើជំហានចុងក្រោយជាលេខប៉ុន្មាន?',
          ),
          6,
        ),
        mc(
          t('Which is easier to read?', 'តើមួយណាងាយអានជាង?'),
          t('Short paragraphs with headings', 'កថាខណ្ឌខ្លីៗដែលមានចំណងជើងរង'),
          [t('One page-long paragraph', 'កថាខណ្ឌវែងមួយទំព័រ')],
        ),
      ),
      reward(t('Well organised writing! 📑', 'ការសរសេររៀបចំបានល្អ! 📑')),
    ],
  ),

  lesson(
    W,
    'pictures-and-tables',
    '🖼️',
    t('Pictures & Tables', 'រូបភាព និងតារាង'),
    t('Add images and tables to documents.', 'បន្ថែមរូបភាព និងតារាងទៅឯកសារ។'),
    9,
    [
      intro(
        '🖼️',
        t(
          'A picture or a small table can explain things faster than many words.',
          'រូបភាព ឬតារាងតូចមួយ អាចពន្យល់បានលឿនជាងពាក្យច្រើន។',
        ),
      ),
      learn(
        [
          '➕',
          t('Insert', 'បញ្ចូល'),
          t('Insert → Pictures or Insert → Table.', 'Insert → Pictures ឬ Insert → Table។'),
        ],
        [
          '↘️',
          t('Resize from a corner', 'ប្តូរទំហំពីជ្រុង'),
          t(
            'Drag a corner so the picture doesn’t stretch.',
            'អូសជ្រុង ដើម្បីកុំឱ្យរូបភាពលាតខុសរាង។',
          ),
        ],
        [
          '🔲',
          t('Tables', 'តារាង'),
          t(
            'Rows and columns for timetables, prices or lists.',
            'ជួរដេក និងជួរឈរ សម្រាប់កាលវិភាគ តម្លៃ ឬបញ្ជី។',
          ),
        ],
      ),
      see(
        'Insert → 🖼️ / ▦',
        t(
          'The Insert tab adds pictures, tables, shapes and more.',
          'ផ្ទាំង Insert បន្ថែមរូបភាព តារាង រូបរាង និងច្រើនទៀត។',
        ),
      ),
      revealPlay(
        'word_sim',
        mc(t('Which tab adds a picture?', 'តើផ្ទាំងណាបន្ថែមរូបភាព?'), 'Insert', ['Home', 'View']),
        mc(
          t(
            'To make a picture bigger without stretching it, drag…',
            'ដើម្បីពង្រីករូបភាពដោយមិនលាតខុសរាង អូស…',
          ),
          t('A corner', 'ជ្រុង'),
          [t('The middle of a side', 'កណ្តាលជ្រុងម្ខាង'), t('The title', 'ចំណងជើង')],
        ),
        num(
          t(
            'A table has 3 rows and 4 columns. How many cells?',
            'តារាងមួយមាន 3 ជួរដេក និង 4 ជួរឈរ។ តើមានក្រឡាប៉ុន្មាន?',
          ),
          12,
        ),
        mc(
          t('A class timetable is best shown as a…', 'កាលវិភាគថ្នាក់បង្ហាញបានល្អបំផុតជា…'),
          t('Table', 'តារាង'),
          [t('Picture of a cat', 'រូបឆ្មា'), t('Long paragraph', 'កថាខណ្ឌវែង')],
        ),
        tf(
          t(
            'You can use any picture from the internet for free in any document.',
            'អ្នកអាចប្រើរូបភាពណាមួយពីអ៊ីនធឺណិតដោយឥតគិតថ្លៃក្នុងឯកសារណាមួយ។',
          ),
          false,
          {
            explanation: t(
              'Many pictures have copyright. Use free-to-use images or your own photos.',
              'រូបភាពជាច្រើនមានកម្មសិទ្ធិបញ្ញា។ ប្រើរូបភាពឥតគិតថ្លៃ ឬរូបថតផ្ទាល់ខ្លួន។',
            ),
          },
        ),
        mc(
          t(
            'Text that explains a picture underneath it is a…',
            'អត្ថបទដែលពន្យល់រូបភាពនៅខាងក្រោមវាគឺ…',
          ),
          t('Caption', 'ចំណងជើងរូប (Caption)'),
          [t('Footer', 'បាតកថា'), t('Margin', 'គែម')],
        ),
        mc(
          t(
            'Which is NOT inserted from the Insert tab?',
            'តើមួយណាមិនត្រូវបានបញ្ចូលពីផ្ទាំង Insert?',
          ),
          t('Bold text', 'អក្សរដិត'),
          [t('Table', 'តារាង'), t('Picture', 'រូបភាព'), t('Shape', 'រូបរាង')],
        ),
        tf(t('Pictures make a document file bigger.', 'រូបភាពធ្វើឱ្យឯកសារធំជាង។'), true),
      ),
      revealChallenge(
        'multiple_choice',
        mc(
          t('“Wrap text” controls…', '“Wrap text” គ្រប់គ្រង…'),
          t('How text flows around a picture', 'របៀបអត្ថបទហូរជុំវិញរូបភាព'),
          [t('The spelling', 'អក្ខរាវិរុទ្ធ'), t('The page colour', 'ពណ៌ទំព័រ')],
        ),
        num(
          t(
            'Your table has 5 rows. You add 2 more rows. How many rows now?',
            'តារាងរបស់អ្នកមាន 5 ជួរដេក។ អ្នកបន្ថែម 2 ជួរទៀត។ តើឥឡូវមានប៉ុន្មានជួរ?',
          ),
          7,
        ),
        mc(
          t('The first row of a table usually holds…', 'ជួរដេកទីមួយនៃតារាងជាធម្មតាផ្ទុក…'),
          t('Headings (Name, Price…)', 'ចំណងជើង (ឈ្មោះ តម្លៃ…)'),
          [t('The total', 'សរុប'), t('Nothing', 'គ្មានអ្វីទេ')],
        ),
        tf(
          t(
            'Word tables can do big calculations as easily as Excel.',
            'តារាង Word អាចគណនាធំៗបានងាយស្រួលដូច Excel។',
          ),
          false,
          {
            explanation: t(
              'For calculations, Excel is the better tool.',
              'សម្រាប់ការគណនា Excel គឺជាឧបករណ៍ល្អជាង។',
            ),
          },
        ),
        mc(
          t(
            'Best picture for a report about Angkor Wat?',
            'រូបភាពល្អបំផុតសម្រាប់របាយការណ៍អំពីអង្គរវត្ត?',
          ),
          t('A clear photo of Angkor Wat', 'រូបថតច្បាស់នៃអង្គរវត្ត'),
          [t('A funny meme', 'រូបកំប្លែង'), t('A blurry selfie', 'រូបថតខ្លួនឯងមិនច្បាស់')],
        ),
        mc(
          t(
            'A picture is too big and covers the text. What do you do?',
            'រូបភាពធំពេក ហើយគ្របអត្ថបទ។ តើអ្នកធ្វើអ្វី?',
          ),
          t('Resize it from a corner', 'ប្តូរទំហំពីជ្រុង'),
          [t('Delete all the text', 'លុបអត្ថបទទាំងអស់'), t('Print it anyway', 'បោះពុម្ពវាដដែល')],
        ),
        match(
          t(
            'Match what you want to show to the best tool.',
            'ផ្គូផ្គងអ្វីដែលអ្នកចង់បង្ហាញទៅនឹងឧបករណ៍ល្អបំផុត។',
          ),
          [
            [t('Prices of 5 items', 'តម្លៃរបស់ 5'), t('Table', 'តារាង')],
            [t('What a place looks like', 'រូបរាងកន្លែងមួយ'), t('Picture', 'រូបភាព')],
            [t('Steps of a process', 'ជំហាននៃដំណើរការ'), t('Numbered list', 'បញ្ជីលេខ')],
          ],
        ),
        tf(
          t(
            'Shapes like arrows and boxes can be added to explain ideas.',
            'រូបរាងដូចជាព្រួញ និងប្រអប់ អាចបន្ថែមដើម្បីពន្យល់គំនិត។',
          ),
          true,
        ),
      ),
      reward(t('Documents with pictures and tables! 🖼️', 'ឯកសារដែលមានរូបភាព និងតារាង! 🖼️')),
    ],
  ),

  lesson(
    W,
    'my-profile',
    '🪪',
    t('My Profile', 'ប្រវត្តិរូបរបស់ខ្ញុំ'),
    t('Create your first document.', 'បង្កើតឯកសារដំបូងរបស់អ្នក។'),
    11,
    [
      intro(
        '🪪',
        t(
          'Mini project: create a profile document about YOU.',
          'គម្រោងតូច៖ បង្កើតឯកសារប្រវត្តិរូបអំពីអ្នក។',
        ),
      ),
      learn(
        [
          '🏷️',
          t('A clear title', 'ចំណងជើងច្បាស់'),
          t('Bold, large, centred: “My Profile”.', 'ដិត ធំ កណ្តាល៖ “My Profile”។'),
        ],
        [
          '📋',
          t('Short sections', 'ផ្នែកខ្លីៗ'),
          t(
            'Name, province, hobby, favourite subject, dream.',
            'ឈ្មោះ ខេត្ត ចំណូលចិត្ត មុខវិជ្ជាចូលចិត្ត ក្តីស្រមៃ។',
          ),
        ],
        [
          '👀',
          t('Check it', 'ពិនិត្យវា'),
          t('Read it again before you save.', 'អានវាម្តងទៀតមុនពេលរក្សាទុក។'),
        ],
      ),
      see(
        t(
          'MY PROFILE\nName: Sokha · Province: Siem Reap · Dream: web developer',
          'ប្រវត្តិរូបរបស់ខ្ញុំ\nឈ្មោះ៖ សុខា · ខេត្ត៖ សៀមរាប · ក្តីស្រមៃ៖ អ្នកអភិវឌ្ឍគេហទំព័រ',
        ),
        t('Short, clear and about you.', 'ខ្លី ច្បាស់ និងអំពីអ្នក។'),
      ),
      revealPlay(
        'word_sim',
        mc(
          t(
            'Which is the best title for your profile?',
            'តើចំណងជើងណាល្អបំផុតសម្រាប់ប្រវត្តិរូបរបស់អ្នក?',
          ),
          'My Profile',
          ['my profile!!!!!', 'Untitled document'],
        ),
        formatText(
          t('Make the title bold, large and centred.', 'ធ្វើឱ្យចំណងជើងដិត ធំ និងកណ្តាល។'),
          'My Profile',
          { bold: true, size: 'large', align: 'center' },
        ),
        mc(
          t(
            'Which is safe to put in a profile you share with your class?',
            'តើមួយណាសុវត្ថិភាពដាក់ក្នុងប្រវត្តិរូបដែលអ្នកចែករំលែកជាមួយថ្នាក់?',
          ),
          t('Your hobby', 'ចំណូលចិត្តរបស់អ្នក'),
          [
            t('Your password', 'ពាក្យសម្ងាត់របស់អ្នក'),
            t('Your bank card number', 'លេខកាតធនាគាររបស់អ្នក'),
          ],
        ),
        mc(
          t(
            'Which sentence is best for “My dream”?',
            'តើប្រយោគណាល្អបំផុតសម្រាប់ “ក្តីស្រមៃរបស់ខ្ញុំ”?',
          ),
          t('I want to build apps that help farmers.', 'ខ្ញុំចង់បង្កើតកម្មវិធីដែលជួយកសិករ។'),
          [t('dunno', 'មិនដឹង'), t('APPS APPS APPS!!!', 'កម្មវិធី កម្មវិធី!!!')],
        ),
        tf(
          t(
            'Reading your document again before saving helps you catch mistakes.',
            'ការអានឯកសារម្តងទៀតមុនពេលរក្សាទុក ជួយអ្នករកឃើញកំហុស។',
          ),
          true,
        ),
        mc(
          t('Good file name for your profile?', 'ឈ្មោះឯកសារល្អសម្រាប់ប្រវត្តិរូបរបស់អ្នក?'),
          'Sokha - My Profile.docx',
          ['Document1.docx', 'asdf.docx'],
        ),
        mc(
          t('Your province name should start with…', 'ឈ្មោះខេត្តរបស់អ្នកគួរចាប់ផ្តើមដោយ…'),
          t('A capital letter (Kampot)', 'អក្សរធំ (Kampot)'),
          [t('A small letter (kampot)', 'អក្សរតូច (kampot)'), t('A number', 'លេខ')],
        ),
        order(
          t(
            'Put the profile sections in a sensible order.',
            'តម្រៀបផ្នែកប្រវត្តិរូបតាមលំដាប់សមហេតុផល។',
          ),
          [
            t('Title', 'ចំណងជើង'),
            t('Name', 'ឈ្មោះ'),
            t('Province', 'ខេត្ត'),
            t('Hobby and favourite subject', 'ចំណូលចិត្ត និងមុខវិជ្ជាចូលចិត្ត'),
            t('My dream', 'ក្តីស្រមៃរបស់ខ្ញុំ'),
          ],
        ),
      ),
      revealChallenge(
        'multiple_choice',
        mc(
          t('A CV (résumé) is used to…', 'CV ត្រូវបានប្រើដើម្បី…'),
          t('Apply for jobs or courses', 'ដាក់ពាក្យការងារ ឬវគ្គសិក្សា'),
          [t('Play games', 'លេងល្បែង'), t('Pay bills', 'បង់វិក្កយបត្រ')],
        ),
        mc(
          t('Which belongs on a CV?', 'តើអ្វីគួរនៅលើ CV?'),
          t('Your skills and education', 'ជំនាញ និងការអប់រំរបស់អ្នក'),
          [
            t('Your password', 'ពាក្យសម្ងាត់របស់អ្នក'),
            t('Your favourite cartoon', 'តុក្កតាដែលអ្នកចូលចិត្ត'),
          ],
        ),
        mc(
          t('Best email address for a CV?', 'អាសយដ្ឋានអ៊ីមែលល្អបំផុតសម្រាប់ CV?'),
          'sokha.chan@gmail.com',
          ['coolboy_99_xox@mail.com', 'iamthebest@mail.com'],
        ),
        tf(
          t(
            'A one-page CV is often enough for a first job.',
            'CV មួយទំព័រ ច្រើនតែគ្រប់គ្រាន់សម្រាប់ការងារដំបូង។',
          ),
          true,
        ),
        mc(
          t(
            'Sending your profile to a teacher, the best format is often…',
            'ផ្ញើប្រវត្តិរូបទៅគ្រូ ទម្រង់ល្អបំផុតច្រើនតែជា…',
          ),
          'PDF',
          ['MP3', 'EXE'],
        ),
        tf(
          t(
            'Bright colours on every word make a profile more professional.',
            'ពណ៌ភ្លឺលើគ្រប់ពាក្យ ធ្វើឱ្យប្រវត្តិរូបកាន់តែអាជីព។',
          ),
          false,
        ),
        mc(
          t('Which is a skill?', 'តើមួយណាជាជំនាញ?'),
          t('Typing 30 words per minute', 'វាយ 30 ពាក្យក្នុងមួយនាទី'),
          [t('Born in 2010', 'កើតឆ្នាំ 2010'), t('Lives in Kampot', 'រស់នៅកំពត')],
        ),
      ),
      creation('document', t('My Profile', 'ប្រវត្តិរូបរបស់ខ្ញុំ'), [
        { key: 'name', label: t('My name', 'ឈ្មោះរបស់ខ្ញុំ'), placeholder: 'Sokha', maxLength: 60 },
        {
          key: 'province',
          label: t('My province', 'ខេត្តរបស់ខ្ញុំ'),
          placeholder: 'Battambang',
          maxLength: 60,
        },
        {
          key: 'hobby',
          label: t('My hobby', 'ចំណូលចិត្តរបស់ខ្ញុំ'),
          placeholder: t('Football', 'បាល់ទាត់'),
          maxLength: 80,
        },
        {
          key: 'subject',
          label: t('My favourite subject', 'មុខវិជ្ជាដែលខ្ញុំចូលចិត្ត'),
          placeholder: t('Maths', 'គណិតវិទ្យា'),
          maxLength: 80,
        },
        {
          key: 'dream',
          label: t('My dream', 'ក្តីស្រមៃរបស់ខ្ញុំ'),
          placeholder: t('To become a software developer', 'ក្លាយជាអ្នកអភិវឌ្ឍកម្មវិធី'),
          maxLength: 160,
          multiline: true,
        },
      ]),
      reward(t('You created your first document! 🪪', 'អ្នកបានបង្កើតឯកសារដំបូងរបស់អ្នក! 🪪')),
    ],
  ),

  lesson(
    W,
    'save-and-print',
    '🖨️',
    t('Save, PDF & Print', 'រក្សាទុក PDF និងបោះពុម្ព'),
    t('Keep your work safe and share it.', 'រក្សាការងារឱ្យមានសុវត្ថិភាព ហើយចែករំលែក។'),
    9,
    [
      intro(
        '🖨️',
        t(
          'Your document is ready. Now save it, turn it into a PDF, or print it.',
          'ឯកសាររបស់អ្នករួចរាល់។ ឥឡូវរក្សាទុក ប្តូរជា PDF ឬបោះពុម្ព។',
        ),
      ),
      learn(
        [
          '💾',
          t('Save vs Save As', 'Save និង Save As'),
          t(
            'Save keeps changes. Save As makes a new copy with a new name or place.',
            'Save រក្សាការផ្លាស់ប្តូរ។ Save As បង្កើតច្បាប់ថ្មីដែលមានឈ្មោះ ឬទីតាំងថ្មី។',
          ),
        ],
        [
          '📕',
          'PDF',
          t(
            'Looks the same on every device and is hard to change by accident.',
            'មើលទៅដូចគ្នានៅលើគ្រប់ឧបករណ៍ ហើយពិបាកកែដោយច្រឡំ។',
          ),
        ],
        [
          '👀',
          t('Print preview', 'មើលមុនបោះពុម្ព'),
          t(
            'Check the pages before you use paper and ink.',
            'ពិនិត្យទំព័រមុនពេលប្រើក្រដាស និងទឹកថ្នាំ។',
          ),
        ],
      ),
      see(
        'File → Save As → PDF 📕',
        t('Share PDFs for letters, CVs and forms.', 'ចែករំលែក PDF សម្រាប់លិខិត CV និងទម្រង់។'),
      ),
      revealPlay(
        'multiple_choice',
        mc(
          t(
            'You want a copy of your CV with a new name. Use…',
            'អ្នកចង់បានច្បាប់ចម្លង CV ដែលមានឈ្មោះថ្មី។ ប្រើ…',
          ),
          'Save As',
          ['Save', 'Print'],
        ),
        mc(
          t(
            'Best format to email a finished CV?',
            'ទម្រង់ល្អបំផុតដើម្បីផ្ញើ CV ដែលរួចរាល់តាមអ៊ីមែល?',
          ),
          'PDF',
          ['.docx draft', '.mp4'],
        ),
        mc(
          t('Print preview helps you…', 'ការមើលមុនបោះពុម្ពជួយអ្នក…'),
          t('See the pages before printing', 'មើលទំព័រមុនពេលបោះពុម្ព'),
          [t('Fix the printer', 'ជួសជុលម៉ាស៊ីនបោះពុម្ព'), t('Send email', 'ផ្ញើអ៊ីមែល')],
        ),
        tf(
          t(
            '“AutoSave” can save your work while you type when it’s stored in the cloud.',
            '“AutoSave” អាចរក្សាការងាររបស់អ្នក ពេលអ្នកវាយ នៅពេលវាត្រូវបានរក្សាទុកលើពពក។',
          ),
          true,
        ),
        mc(t('The shortcut to print is…', 'ផ្លូវកាត់ដើម្បីបោះពុម្ពគឺ…'), 'Ctrl + P', [
          'Ctrl + S',
          'Ctrl + V',
        ]),
        num(
          t(
            'You print 3 copies of a 4-page document. How many sheets (one side)?',
            'អ្នកបោះពុម្ព 3 ច្បាប់នៃឯកសារ 4 ទំព័រ។ តើប៉ុន្មានសន្លឹក (ម្ខាង)?',
          ),
          12,
        ),
        mc(
          t('Printing on both sides of the paper…', 'ការបោះពុម្ពទាំងសងខាងក្រដាស…'),
          t('Saves paper', 'សន្សំក្រដាស'),
          [t('Uses more paper', 'ប្រើក្រដាសច្រើនជាង'), t('Is impossible', 'មិនអាចទៅរួច')],
        ),
        tf(
          t(
            'If you close Word without saving, your new changes may be lost.',
            'បើអ្នកបិទ Word ដោយមិនរក្សាទុក ការផ្លាស់ប្តូរថ្មីរបស់អ្នកអាចបាត់។',
          ),
          true,
        ),
      ),
      revealChallenge(
        'multiple_choice',
        mc(
          t(
            'You only need page 2 of 10. In the print settings you choose…',
            'អ្នកត្រូវការតែទំព័រទី 2 នៃ 10។ ក្នុងការកំណត់បោះពុម្ព អ្នកជ្រើសរើស…',
          ),
          t('Pages: 2', 'ទំព័រ៖ 2'),
          [t('Print all', 'បោះពុម្ពទាំងអស់'), t('10 copies', '10 ច្បាប់')],
        ),
        mc(
          t('Landscape orientation means the page is…', 'ទិសដៅ Landscape មានន័យថាទំព័រ…'),
          t('Wider than it is tall', 'ទទឹងជាងកម្ពស់'),
          [t('Taller than it is wide', 'ខ្ពស់ជាងទទឹង'), t('Round', 'មូល')],
        ),
        mc(
          t('Most letters and CVs use…', 'លិខិត និង CV ភាគច្រើនប្រើ…'),
          t('Portrait (tall) A4 paper', 'ក្រដាស A4 បញ្ឈរ (Portrait)'),
          [t('Landscape A3', 'A3 ផ្តេក'), t('Photo paper', 'ក្រដាសរូបថត')],
        ),
        tf(
          t(
            'A PDF is a good way to make sure your teacher sees exactly what you made.',
            'PDF គឺជាវិធីល្អដើម្បីធានាថាគ្រូរបស់អ្នកឃើញពិតប្រាកដនូវអ្វីដែលអ្នកបានធ្វើ។',
          ),
          true,
        ),
        order(t('Print a document: put the steps in order.', 'បោះពុម្ពឯកសារ៖ តម្រៀបជំហាន។'), [
          t('Press Ctrl + P', 'ចុច Ctrl + P'),
          t('Check the preview', 'ពិនិត្យការមើលមុន'),
          t('Choose the printer and pages', 'ជ្រើសរើសម៉ាស៊ីនបោះពុម្ព និងទំព័រ'),
          t('Click Print', 'ចុច Print'),
        ]),
        mc(
          t(
            'Where can you save so you can open the file on your phone too?',
            'តើអ្នកអាចរក្សាទុកនៅឯណា ដើម្បីបើកឯកសារនៅលើទូរស័ព្ទបានផងដែរ?',
          ),
          t('In the cloud (OneDrive or Google Drive)', 'នៅលើពពក (OneDrive ឬ Google Drive)'),
          [t('Only on the desktop', 'តែនៅលើផ្ទៃតុ'), t('On paper', 'នៅលើក្រដាស')],
        ),
        mc(
          t(
            'The printer says “Paper jam”. What does it mean?',
            'ម៉ាស៊ីនបោះពុម្ពថា “Paper jam”។ តើមានន័យថាអ្វី?',
          ),
          t('Paper is stuck inside', 'ក្រដាសជាប់នៅខាងក្នុង'),
          [t('Out of ink', 'អស់ទឹកថ្នាំ'), t('Wrong password', 'ពាក្យសម្ងាត់ខុស')],
        ),
        tf(
          t(
            'Printing in black and white uses less colour ink.',
            'ការបោះពុម្ពជាសខ្មៅ ប្រើទឹកថ្នាំពណ៌តិចជាង។',
          ),
          true,
        ),
      ),
      reward(t('Saved, shared and printed! 🖨️', 'រក្សាទុក ចែករំលែក និងបោះពុម្ពរួចរាល់! 🖨️')),
    ],
  ),
];
