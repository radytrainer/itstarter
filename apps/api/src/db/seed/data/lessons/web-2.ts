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
  sortInto,
  tf,
  typeIt,
} from '../dsl';
import { WEB_WORLD as W } from './web-1';

// 🎨 Web Design, lessons 9–15: CSS and putting a real page together.
// Khmer (km) strings are DRAFTS for native review.
const css = (source: string) => ({ data: code(source, 'CSS') });
const html = (source: string) => ({ data: code(source, 'HTML') });

export const WEB_LESSONS_2: LessonSeed[] = [
  // 9 ─────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'what-is-css',
    '🎨',
    t('Hello, CSS!', 'សួស្តី CSS!'),
    t('Selectors, properties and values.', 'Selector លក្ខណៈសម្បត្តិ និងតម្លៃ។'),
    {
      intro: [
        '🎨',
        t('HTML built the house. Now CSS paints it!', 'HTML បានសាងសង់ផ្ទះ។ ឥឡូវ CSS លាបពណ៌វា!'),
      ],
      learn: [
        [
          '🎯',
          t('Selector', 'Selector'),
          t('Chooses WHAT to style: h1, p, button…', 'ជ្រើសរើសអ្វីដែលត្រូវរចនា៖ h1, p, button…'),
          'selector',
        ],
        [
          '🔧',
          t('Property', 'លក្ខណៈសម្បត្តិ'),
          t(
            'WHAT to change: color, font-size, background…',
            'អ្វីដែលត្រូវប្តូរ៖ color, font-size, background…',
          ),
          'property',
        ],
        [
          '🔢',
          t('Value', 'តម្លៃ'),
          t('HOW to change it: blue, 20px, center…', 'របៀបប្តូរវា៖ blue, 20px, center…'),
          'value',
        ],
        [
          '📄',
          'style.css',
          t(
            'CSS lives in its own file, linked from <head>.',
            'CSS រស់នៅក្នុងឯកសារផ្ទាល់ខ្លួន ភ្ជាប់ពី <head>។',
          ),
        ],
      ],
      see: [
        'h1 {\n  color: blue;\n  font-size: 40px;\n}',
        t(
          'Every <h1> becomes blue and 40 pixels tall.',
          '<h1> នីមួយៗក្លាយជាពណ៌ខៀវ និងខ្ពស់ 40 ភីកសែល។',
        ),
      ],
      words: [
        ['style', 'រចនាប័ទ្ម', '🎨'],
        ['selector', 'អ្នកជ្រើសរើស', '🎯'],
        ['property', 'លក្ខណៈសម្បត្តិ'],
        ['value', 'តម្លៃ'],
      ],
      play: [
        mc(
          t('In this rule, what is the SELECTOR?', 'ក្នុងច្បាប់នេះ តើ selector គឺអ្វី?'),
          'p',
          ['color', 'red', ';'],
          css('p {\n  color: red;\n}'),
        ),
        mc(
          t('In this rule, what is the PROPERTY?', 'ក្នុងច្បាប់នេះ តើលក្ខណៈសម្បត្តិគឺអ្វី?'),
          'color',
          ['p', 'red', '{ }'],
          css('p {\n  color: red;\n}'),
        ),
        mc(
          t('In this rule, what is the VALUE?', 'ក្នុងច្បាប់នេះ តើតម្លៃគឺអ្វី?'),
          'red',
          ['p', 'color', ':'],
          css('p {\n  color: red;\n}'),
        ),
        tf(t('Each CSS line ends with a semicolon ;', 'បន្ទាត់ CSS នីមួយៗបញ្ចប់ដោយសញ្ញា ;'), true),
        mc(t('Which brackets hold the CSS rules?', 'តើវង់ក្រចកណាផ្ទុកច្បាប់ CSS?'), '{ }', [
          '( )',
          '< >',
          '[ ]',
        ]),
        mc(
          t('What colour will paragraphs be?', 'តើកថាខណ្ឌនឹងមានពណ៌អ្វី?'),
          t('Green', 'បៃតង'),
          [t('Black', 'ខ្មៅ'), t('Blue', 'ខៀវ')],
          css('p {\n  color: green;\n}'),
        ),
        tf(
          t(
            'CSS is a programming language for maths.',
            'CSS គឺជាភាសាសរសេរកម្មវិធីសម្រាប់គណិតវិទ្យា។',
          ),
          false,
          {
            explanation: t(
              'CSS is a style language: it says how pages look.',
              'CSS ជាភាសារចនាប័ទ្ម៖ វាប្រាប់ថាទំព័រមើលទៅយ៉ាងណា។',
            ),
          },
        ),
        typeIt(
          t('Type the file name usually used for CSS.', 'វាយឈ្មោះឯកសារដែលជាធម្មតាប្រើសម្រាប់ CSS។'),
          'style.css',
          { accept: ['styles.css'] },
        ),
      ],
      challenge: [
        order(t('Order the parts of a CSS rule.', 'តម្រៀបផ្នែកនៃច្បាប់ CSS។'), [
          'h2 {',
          '  color: purple;',
          '}',
        ]),
        mc(
          t('What is wrong?', 'តើមានអ្វីខុស?'),
          t('The colon : is missing after color', 'សញ្ញា : បាត់ក្រោយ color'),
          [t('h1 must be H1', 'h1 ត្រូវតែជា H1'), t('Nothing', 'គ្មានអ្វីទេ')],
          css('h1 {\n  color blue;\n}'),
        ),
        mc(
          t('How do you link style.css to a page?', 'តើអ្នកភ្ជាប់ style.css ទៅទំព័រដោយរបៀបណា?'),
          '<link rel="stylesheet" href="style.css">',
          ['<a href="style.css">', '<img src="style.css">', '<css>style.css</css>'],
        ),
        mc(
          t('This rule styles…', 'ច្បាប់នេះរចនា…'),
          t('every button on the page', 'ប៊ូតុងទាំងអស់លើទំព័រ'),
          [t('only the first button', 'តែប៊ូតុងទីមួយ'), t('nothing', 'គ្មានអ្វីទេ')],
          css('button {\n  background: orange;\n}'),
        ),
        match(t('Match the CSS word to its job.', 'ផ្គូផ្គងពាក្យ CSS ជាមួយតួនាទី។'), [
          [t('Selector', 'Selector'), t('Which elements', 'ធាតុណា')],
          [t('Property', 'លក្ខណៈសម្បត្តិ'), t('What to change', 'អ្វីដែលត្រូវប្តូរ')],
          [t('Value', 'តម្លៃ'), t('The new setting', 'ការកំណត់ថ្មី')],
        ]),
        num(
          t(
            'How many properties does this rule change?',
            'តើច្បាប់នេះប្តូរលក្ខណៈសម្បត្តិប៉ុន្មាន?',
          ),
          3,
          css('h1 {\n  color: white;\n  background: black;\n  font-size: 32px;\n}'),
        ),
        tf(
          t('One CSS file can style many HTML pages.', 'ឯកសារ CSS មួយអាចរចនាទំព័រ HTML ច្រើន។'),
          true,
        ),
        buildSentence(
          t('Build the sentence.', 'បង្កើតប្រយោគ។'),
          'The selector picks and the property changes.',
          { say: 'The selector picks, and the property changes.' },
        ),
      ],
      games: [
        catchIt(
          t('Catch the CSS properties!', 'ចាប់លក្ខណៈសម្បត្តិ CSS!'),
          ['color', 'font-size', 'background', 'margin'],
          ['<p>', 'href', '<img>', 'print'],
          { speed: 'slow' },
        ),
        memory(
          t(
            'Match each part of “p { color: red; }”.',
            'ផ្គូផ្គងផ្នែកនីមួយៗនៃ «p { color: red; }»។',
          ),
          [
            ['p', t('Selector', 'Selector')],
            ['color', t('Property', 'លក្ខណៈសម្បត្តិ')],
            ['red', t('Value', 'តម្លៃ')],
            [';', t('End of line', 'ចប់បន្ទាត់')],
          ],
        ),
      ],
      reward: t('You wrote your first CSS! 🎨', 'អ្នកបានសរសេរ CSS ដំបូងរបស់អ្នក! 🎨'),
    },
  ),

  // 10 ────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'colours',
    '🌈',
    t('Colours on the Web', 'ពណ៌លើវេប'),
    t('Colour names, hex codes and good contrast.', 'ឈ្មោះពណ៌ កូដ hex និងកម្រិតពន្លឺល្អ។'),
    {
      intro: [
        '🌈',
        t(
          'The web has over 16 million colours! Let’s learn how to choose them.',
          'វេបមានពណ៌ជាង 16 លានពណ៌! តោះរៀនពីរបៀបជ្រើសរើសវា។',
        ),
      ],
      learn: [
        [
          '🔤',
          t('Colour names', 'ឈ្មោះពណ៌'),
          t('red, blue, orange, gold — easy to read.', 'red, blue, orange, gold — ងាយអាន។'),
          'colour',
        ],
        [
          '#️⃣',
          t('Hex codes', 'កូដ Hex'),
          t(
            '#FF0000 is red. Pairs are Red, Green, Blue from 00 to FF.',
            '#FF0000 ជាពណ៌ក្រហម។ គូនីមួយៗជា ក្រហម បៃតង ខៀវ ពី 00 ដល់ FF។',
          ),
          'hex',
        ],
        [
          '🖌️',
          'background',
          t(
            'background: yellow; colours behind the text.',
            'background: yellow; លាបពណ៌នៅពីក្រោយអត្ថបទ។',
          ),
          'background',
        ],
        [
          '🌗',
          t('Contrast', 'កម្រិតពន្លឺ'),
          t(
            'Dark text on light background (or the opposite) is easy to read.',
            'អត្ថបទងងឹតលើផ្ទៃភ្លឺ (ឬផ្ទុយមកវិញ) ងាយអាន។',
          ),
          'contrast',
        ],
      ],
      see: [
        'body {\n  background: #FFFFFF;\n  color: #222222;\n}',
        t(
          'White page, almost-black text: strong contrast, easy on the eyes.',
          'ទំព័រពណ៌ស អត្ថបទស្ទើរខ្មៅ៖ កម្រិតពន្លឺខ្លាំង ស្រួលភ្នែក។',
        ),
      ],
      words: [
        ['colour', 'ពណ៌', '🎨'],
        ['background', 'ផ្ទៃខាងក្រោយ'],
        ['contrast', 'កម្រិតពន្លឺ', '🌗'],
        ['bright', 'ភ្លឺ', '☀️'],
      ],
      play: [
        mc(
          t('Which property changes the TEXT colour?', 'តើលក្ខណៈសម្បត្តិណាប្តូរពណ៌អត្ថបទ?'),
          'color',
          ['background', 'font', 'text'],
        ),
        mc(
          t('Which property colours BEHIND the text?', 'តើលក្ខណៈសម្បត្តិណាលាបពណ៌នៅពីក្រោយអត្ថបទ?'),
          'background',
          ['color', 'border', 'margin'],
        ),
        mc(t('What colour is #000000?', 'តើ #000000 ជាពណ៌អ្វី?'), t('Black', 'ខ្មៅ'), [
          t('White', 'ស'),
          t('Red', 'ក្រហម'),
        ]),
        mc(t('What colour is #FFFFFF?', 'តើ #FFFFFF ជាពណ៌អ្វី?'), t('White', 'ស'), [
          t('Black', 'ខ្មៅ'),
          t('Green', 'បៃតង'),
        ]),
        mc(t('What colour is #FF0000?', 'តើ #FF0000 ជាពណ៌អ្វី?'), t('Red', 'ក្រហម'), [
          t('Blue', 'ខៀវ'),
          t('Green', 'បៃតង'),
        ]),
        tf(t('Hex colour codes start with #.', 'កូដពណ៌ Hex ចាប់ផ្តើមដោយ #។'), true),
        tf(
          t(
            'Light-yellow text on a white background is easy to read.',
            'អត្ថបទលឿងស្រាលលើផ្ទៃពណ៌សងាយអាន។',
          ),
          false,
          {
            explanation: t(
              'Low contrast is hard to read, especially in sunlight.',
              'កម្រិតពន្លឺទាបពិបាកអាន ជាពិសេសក្រោមពន្លឺថ្ងៃ។',
            ),
          },
        ),
        mc(
          t(
            'In American-English CSS, the property is spelled…',
            'ក្នុង CSS ភាសាអង់គ្លេសអាមេរិក លក្ខណៈសម្បត្តិប្រកប…',
          ),
          'color',
          ['colour', 'colur', 'clr'],
        ),
      ],
      challenge: [
        mc(
          t('What colour is #0000FF?', 'តើ #0000FF ជាពណ៌អ្វី?'),
          t('Blue', 'ខៀវ'),
          [t('Red', 'ក្រហម'), t('Yellow', 'លឿង')],
          { explanation: t('Red 00, Green 00, Blue FF.', 'ក្រហម 00 បៃតង 00 ខៀវ FF។') },
        ),
        mc(t('What colour is #00FF00?', 'តើ #00FF00 ជាពណ៌អ្វី?'), t('Green', 'បៃតង'), [
          t('Blue', 'ខៀវ'),
          t('Black', 'ខ្មៅ'),
        ]),
        mc(
          t('Which pair has the BEST contrast?', 'តើគូណាមានកម្រិតពន្លឺល្អបំផុត?'),
          t('Black text on white', 'អត្ថបទខ្មៅលើផ្ទៃស'),
          [
            t('Grey text on grey', 'អត្ថបទប្រផេះលើប្រផេះ'),
            t('Yellow text on white', 'អត្ថបទលឿងលើផ្ទៃស'),
          ],
        ),
        mc(
          t('What will the button look like?', 'តើប៊ូតុងនឹងមើលទៅយ៉ាងណា?'),
          t('White text on a green background', 'អត្ថបទសលើផ្ទៃបៃតង'),
          [t('Green text on white', 'អត្ថបទបៃតងលើផ្ទៃស'), t('All green', 'បៃតងទាំងអស់')],
          css('button {\n  background: green;\n  color: white;\n}'),
        ),
        tf(
          t(
            'You should not use ONLY colour to show meaning (e.g. red = wrong).',
            'អ្នកមិនគួរប្រើតែពណ៌ដើម្បីបង្ហាញអត្ថន័យ (ឧ. ក្រហម = ខុស)។',
          ),
          true,
          {
            explanation: t(
              'Some people are colour-blind — add an icon or words too.',
              'មនុស្សខ្លះពិការពណ៌ — បន្ថែមរូបតំណាង ឬពាក្យផងដែរ។',
            ),
          },
        ),
        match(t('Match the hex code to the colour.', 'ផ្គូផ្គងកូដ hex ជាមួយពណ៌។'), [
          ['#FF0000', t('Red', 'ក្រហម')],
          ['#00FF00', t('Green', 'បៃតង')],
          ['#0000FF', t('Blue', 'ខៀវ')],
          ['#FFFFFF', t('White', 'ស')],
        ]),
        num(
          t(
            'How many characters come AFTER # in #1A2B3C?',
            'តើមានតួអក្សរប៉ុន្មានបន្ទាប់ពី # ក្នុង #1A2B3C?',
          ),
          6,
        ),
        buildSentence(
          t('Build the rule.', 'បង្កើតច្បាប់។'),
          'Choose colours with strong contrast.',
          { say: 'Choose colours with strong contrast.' },
        ),
      ],
      games: [
        memory(t('Match the colour name to the hex code.', 'ផ្គូផ្គងឈ្មោះពណ៌ជាមួយកូដ hex។'), [
          [['🔴', 'red'], '#FF0000'],
          [['🟢', 'lime'], '#00FF00'],
          [['🔵', 'blue'], '#0000FF'],
          [['⚫', 'black'], '#000000'],
        ]),
        catchIt(
          t('Catch the REAL hex colours!', 'ចាប់ពណ៌ hex ពិត!'),
          ['#FF0000', '#00AA55', '#123456', '#FFFFFF'],
          ['FF0000#', '#GGGGGG', '#12', 'red#'],
          { speed: 'normal' },
        ),
      ],
      reward: t(
        'Your pages are colourful AND easy to read. 🌈',
        'ទំព័ររបស់អ្នកមានពណ៌ ហើយងាយអាន។ 🌈',
      ),
    },
  ),

  // 11 ────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'fonts-and-text',
    '🔤',
    t('Fonts & Text', 'ពុម្ពអក្សរ និងអត្ថបទ'),
    t('Size, font, bold and alignment.', 'ទំហំ ពុម្ពអក្សរ ដិត និងការតម្រឹម។'),
    {
      intro: [
        '🔤',
        t(
          'The right font makes a page friendly. Khmer pages need a Khmer font like Kantumruy or Battambang.',
          'ពុម្ពអក្សរត្រឹមត្រូវធ្វើឱ្យទំព័ររួសរាយ។ ទំព័រខ្មែរត្រូវការពុម្ពអក្សរខ្មែរ ដូចជា Kantumruy ឬ Battambang។',
        ),
      ],
      learn: [
        [
          '🔠',
          'font-size',
          t(
            'font-size: 18px; makes text bigger or smaller.',
            'font-size: 18px; ធ្វើឱ្យអត្ថបទធំ ឬតូចជាង។',
          ),
          'font',
        ],
        [
          '✒️',
          'font-family',
          t(
            'font-family: Arial, sans-serif; chooses the font.',
            'font-family: Arial, sans-serif; ជ្រើសរើសពុម្ពអក្សរ។',
          ),
        ],
        [
          '🅱️',
          'font-weight',
          t('font-weight: bold; makes text thick.', 'font-weight: bold; ធ្វើឱ្យអត្ថបទក្រាស់។'),
          'bold',
        ],
        [
          '↔️',
          'text-align',
          t(
            'text-align: center; puts text in the middle.',
            'text-align: center; ដាក់អត្ថបទនៅកណ្តាល។',
          ),
          'align',
        ],
      ],
      see: [
        'h1 {\n  font-family: "Kantumruy Pro", sans-serif;\n  font-size: 32px;\n  text-align: center;\n}',
        t(
          'A big, centred heading in a font that shows Khmer clearly.',
          'ចំណងជើងធំ នៅកណ្តាល ក្នុងពុម្ពអក្សរដែលបង្ហាញខ្មែរច្បាស់។',
        ),
      ],
      words: [
        ['font', 'ពុម្ពអក្សរ', '🔤'],
        ['size', 'ទំហំ', '📏'],
        ['bold', 'ដិត', '🅱️'],
        ['center', 'កណ្តាល', '🎯'],
      ],
      play: [
        mc(
          t('Which property makes text bigger?', 'តើលក្ខណៈសម្បត្តិណាធ្វើឱ្យអត្ថបទធំជាង?'),
          'font-size',
          ['font-family', 'text-align', 'color'],
        ),
        mc(
          t('Which property chooses the font?', 'តើលក្ខណៈសម្បត្តិណាជ្រើសរើសពុម្ពអក្សរ?'),
          'font-family',
          ['font-size', 'font-weight', 'background'],
        ),
        mc(
          t('Which property puts text in the middle?', 'តើលក្ខណៈសម្បត្តិណាដាក់អត្ថបទនៅកណ្តាល?'),
          'text-align: center;',
          ['font-size: center;', 'color: center;', 'middle: true;'],
        ),
        mc(t('Which makes text bold?', 'តើមួយណាធ្វើឱ្យអត្ថបទដិត?'), 'font-weight: bold;', [
          'font-size: bold;',
          'text-align: bold;',
          'bold: yes;',
        ]),
        tf(t('20px text is bigger than 14px text.', 'អត្ថបទ 20px ធំជាងអត្ថបទ 14px។'), true),
        tf(
          t('Every font can show Khmer letters.', 'ពុម្ពអក្សរគ្រប់មួយអាចបង្ហាញអក្សរខ្មែរ។'),
          false,
          {
            explanation: t(
              'Pick a Khmer font, or Khmer may show as boxes □□.',
              'ជ្រើសរើសពុម្ពអក្សរខ្មែរ បើមិនដូច្នោះខ្មែរអាចបង្ហាញជាប្រអប់ □□។',
            ),
          },
        ),
        mc(
          t('How will this paragraph look?', 'តើកថាខណ្ឌនេះនឹងមើលទៅយ៉ាងណា?'),
          t('Right-aligned', 'តម្រឹមស្តាំ'),
          [t('Centred', 'នៅកណ្តាល'), t('Bold', 'ដិត')],
          css('p {\n  text-align: right;\n}'),
        ),
        mc(
          t(
            'For reading on phones, body text should be at least about…',
            'សម្រាប់អានលើទូរស័ព្ទ អត្ថបទតួគួរមានយ៉ាងហោចណាស់ប្រហែល…',
          ),
          '16px',
          ['6px', '9px', '100px'],
        ),
      ],
      challenge: [
        match(
          t('Match the property to what it changes.', 'ផ្គូផ្គងលក្ខណៈសម្បត្តិជាមួយអ្វីដែលវាប្តូរ។'),
          [
            ['font-size', t('How big', 'ធំប៉ុណ្ណា')],
            ['font-family', t('Which font', 'ពុម្ពអក្សរណា')],
            ['font-weight', t('How thick', 'ក្រាស់ប៉ុណ្ណា')],
            ['text-align', t('Left, centre or right', 'ឆ្វេង កណ្តាល ឬស្តាំ')],
          ],
        ),
        mc(
          t('Why write “, sans-serif” at the end?', 'ហេតុអ្វីសរសេរ «, sans-serif» នៅចុង?'),
          t('A backup if the first font is missing', 'ជម្រើសបម្រុងប្រសិនបើពុម្ពអក្សរទីមួយបាត់'),
          [t('It makes text red', 'វាធ្វើឱ្យអត្ថបទក្រហម'), t('It is a typo', 'វាជាកំហុសវាយ')],
          css('font-family: "Battambang", sans-serif;'),
        ),
        order(
          t(
            'Order these font sizes from smallest to biggest.',
            'តម្រៀបទំហំពុម្ពអក្សរទាំងនេះពីតូចបំផុតទៅធំបំផុត។',
          ),
          ['12px', '16px', '24px', '48px'],
        ),
        mc(
          t('What is wrong?', 'តើមានអ្វីខុស?'),
          t('“20” needs a unit: 20px', '«20» ត្រូវការឯកតា៖ 20px'),
          [t('font-size is not real', 'font-size មិនពិត'), t('Nothing', 'គ្មានអ្វីទេ')],
          css('p {\n  font-size: 20;\n}'),
        ),
        tf(
          t(
            'Using 5 different fonts on one page looks professional.',
            'ការប្រើពុម្ពអក្សរ 5 ផ្សេងគ្នាលើទំព័រមួយមើលទៅជំនាញ។',
          ),
          false,
          {
            explanation: t(
              'One or two fonts look clean and calm.',
              'ពុម្ពអក្សរមួយ ឬពីរមើលទៅស្អាត និងស្ងប់។',
            ),
          },
        ),
        mc(
          t('Which value makes text slanted?', 'តើតម្លៃណាធ្វើឱ្យអត្ថបទទ្រេត?'),
          'font-style: italic;',
          ['font-weight: italic;', 'text-align: italic;', 'font-size: italic;'],
        ),
        typeIt(t('Type the value that centres text.', 'វាយតម្លៃដែលដាក់អត្ថបទនៅកណ្តាល។'), 'center'),
        buildSentence(t('Build the rule.', 'បង្កើតច្បាប់។'), 'Use a Khmer font for Khmer text.', {
          say: 'Use a Khmer font for Khmer text.',
        }),
      ],
      games: [
        catchIt(
          t('Catch the TEXT properties!', 'ចាប់លក្ខណៈសម្បត្តិអត្ថបទ!'),
          ['font-size', 'font-family', 'font-weight', 'text-align'],
          ['background', 'border', 'href', 'src'],
        ),
        memory(t('Match the CSS to how the text looks.', 'ផ្គូផ្គង CSS ជាមួយរបៀបដែលអត្ថបទមើលទៅ។'), [
          ['font-weight: bold', t('Thick', 'ក្រាស់')],
          ['font-style: italic', t('Slanted', 'ទ្រេត')],
          ['text-align: center', t('In the middle', 'នៅកណ្តាល')],
          ['font-size: 48px', t('Very big', 'ធំណាស់')],
        ]),
      ],
      reward: t(
        'Beautiful, readable text — in English and Khmer! 🔤',
        'អត្ថបទស្អាត អានងាយ — ជាភាសាអង់គ្លេស និងខ្មែរ! 🔤',
      ),
    },
  ),

  // 12 ────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'box-model',
    '📦',
    t('The Box Model', 'គំរូប្រអប់'),
    t(
      'Every element is a box: content, padding, border, margin.',
      'ធាតុនីមួយៗជាប្រអប់៖ ខ្លឹមសារ padding ស៊ុម margin។',
    ),
    {
      intro: [
        '📦',
        t(
          'Look closely: every heading, picture and button is a rectangle box.',
          'មើលឱ្យជិត៖ ចំណងជើង រូបភាព និងប៊ូតុងនីមួយៗជាប្រអប់ចតុកោណកែង។',
        ),
      ],
      learn: [
        [
          '📝',
          t('Content', 'ខ្លឹមសារ'),
          t('The text or picture in the middle.', 'អត្ថបទ ឬរូបភាពនៅកណ្តាល។'),
        ],
        [
          '🧽',
          'padding',
          t('Space INSIDE the box, around the content.', 'ចន្លោះខាងក្នុងប្រអប់ ជុំវិញខ្លឹមសារ។'),
          'padding',
        ],
        ['🔲', 'border', t('The line around the box.', 'បន្ទាត់ជុំវិញប្រអប់។'), 'border'],
        [
          '↔️',
          'margin',
          t(
            'Space OUTSIDE the box, between it and other boxes.',
            'ចន្លោះខាងក្រៅប្រអប់ រវាងវា និងប្រអប់ផ្សេង។',
          ),
          'margin',
        ],
      ],
      see: [
        '.card {\n  padding: 16px;\n  border: 2px solid gray;\n  margin: 20px;\n  border-radius: 12px;\n}',
        t(
          'A card with space inside, a grey line, space outside and round corners.',
          'កាតមួយមានចន្លោះខាងក្នុង បន្ទាត់ប្រផេះ ចន្លោះខាងក្រៅ និងជ្រុងមូល។',
        ),
      ],
      words: [
        ['box', 'ប្រអប់', '📦'],
        ['border', 'ស៊ុម', '🔲'],
        ['margin', 'គែម'],
        ['padding', 'ចន្លោះខាងក្នុង'],
      ],
      play: [
        mc(t('Which is the space INSIDE the border?', 'តើមួយណាជាចន្លោះខាងក្នុងស៊ុម?'), 'padding', [
          'margin',
          'border',
          'content',
        ]),
        mc(t('Which is the space OUTSIDE the border?', 'តើមួយណាជាចន្លោះខាងក្រៅស៊ុម?'), 'margin', [
          'padding',
          'border',
          'width',
        ]),
        mc(t('Which draws a line around the box?', 'តើមួយណាគូរបន្ទាត់ជុំវិញប្រអប់?'), 'border', [
          'margin',
          'padding',
          'color',
        ]),
        tf(t('Every HTML element is a box.', 'ធាតុ HTML នីមួយៗជាប្រអប់។'), true),
        mc(t('Which makes round corners?', 'តើមួយណាធ្វើឱ្យជ្រុងមូល?'), 'border-radius', [
          'border-round',
          'corner',
          'padding',
        ]),
        mc(
          t(
            'In “border: 2px solid red”, how thick is the line?',
            'ក្នុង «border: 2px solid red» តើបន្ទាត់ក្រាស់ប៉ុណ្ណា?',
          ),
          '2px',
          ['solid', 'red', '20px'],
        ),
        tf(
          t(
            'Adding padding makes a button bigger and easier to tap.',
            'ការបន្ថែម padding ធ្វើឱ្យប៊ូតុងធំ និងងាយចុច។',
          ),
          true,
        ),
        mc(
          t('A dot before a name, like .card, selects…', 'ចំណុចមុនឈ្មោះ ដូចជា .card ជ្រើសរើស…'),
          t('elements with class="card"', 'ធាតុដែលមាន class="card"'),
          [t('all <p> tags', 'ស្លាក <p> ទាំងអស់'), t('nothing', 'គ្មានអ្វីទេ')],
        ),
      ],
      challenge: [
        order(
          t('Order the box layers from the inside out.', 'តម្រៀបស្រទាប់ប្រអប់ពីខាងក្នុងចេញក្រៅ។'),
          [t('Content', 'ខ្លឹមសារ'), 'padding', 'border', 'margin'],
        ),
        num(
          t(
            'Content is 100px wide, padding 10px on each side. How wide is it inside the border?',
            'ខ្លឹមសារទទឹង 100px padding 10px សងខាង។ តើទទឹងខាងក្នុងស៊ុមប៉ុន្មាន?',
          ),
          120,
          { explanation: t('10 + 100 + 10 = 120.', '10 + 100 + 10 = 120។') },
        ),
        num(
          t(
            'Add a 5px border on each side to that 120px. Total width?',
            'បន្ថែមស៊ុម 5px សងខាងទៅ 120px នោះ។ ទទឹងសរុប?',
          ),
          130,
        ),
        mc(
          t('Two cards are touching. What should you add?', 'កាតពីរប៉ះគ្នា។ តើអ្នកគួរបន្ថែមអ្វី?'),
          'margin',
          ['padding', 'font-size', 'color'],
        ),
        mc(
          t(
            'Text is squashed against the border. What should you add?',
            'អត្ថបទជាប់ស៊ុម។ តើអ្នកគួរបន្ថែមអ្វី?',
          ),
          'padding',
          ['margin', 'border', 'text-align'],
        ),
        match(t('Match the box part to the gift box.', 'ផ្គូផ្គងផ្នែកប្រអប់ជាមួយប្រអប់កាដូ។'), [
          [t('Content', 'ខ្លឹមសារ'), t('The gift', 'កាដូ')],
          ['padding', t('Soft paper around the gift', 'ក្រដាសទន់ជុំវិញកាដូ')],
          ['border', t('The box itself', 'ប្រអប់ខ្លួនឯង')],
          ['margin', t('Space between boxes on the table', 'ចន្លោះរវាងប្រអប់លើតុ')],
        ]),
        mc(
          t(
            'How do you add class="card" in HTML?',
            'តើអ្នកបន្ថែម class="card" ក្នុង HTML ដោយរបៀបណា?',
          ),
          '<div class="card">…</div>',
          ['<div .card>', '<card>…</card>', '<div>card</div>'],
          html('.card { padding: 16px; }'),
        ),
        buildSentence(
          t('Build the rule.', 'បង្កើតច្បាប់។'),
          'Padding is inside and margin is outside.',
          { say: 'Padding is inside, and margin is outside.' },
        ),
      ],
      games: [
        memory(t('Match the box part to where it is.', 'ផ្គូផ្គងផ្នែកប្រអប់ជាមួយកន្លែងដែលវានៅ។'), [
          ['content', t('In the middle', 'នៅកណ្តាល')],
          ['padding', t('Inside the line', 'ខាងក្នុងបន្ទាត់')],
          ['border', t('The line', 'បន្ទាត់')],
          ['margin', t('Outside the line', 'ខាងក្រៅបន្ទាត់')],
        ]),
        catchIt(
          t('Catch the BOX MODEL words!', 'ចាប់ពាក្យគំរូប្រអប់!'),
          ['padding', 'margin', 'border', 'width'],
          ['href', 'alt', '<ol>', 'print()'],
          { speed: 'fast' },
        ),
      ],
      reward: t(
        'You can see the boxes now — that is the designer’s eye! 📦',
        'ឥឡូវអ្នកអាចមើលឃើញប្រអប់ — នោះជាភ្នែកអ្នករចនា! 📦',
      ),
    },
  ),

  // 13 ────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'flexbox-layout',
    '↔️',
    t('Layout with Flexbox', 'ប្លង់ជាមួយ Flexbox'),
    t('Put boxes side by side and centre them.', 'ដាក់ប្រអប់ក្បែរគ្នា ហើយដាក់វានៅកណ្តាល។'),
    {
      intro: [
        '↔️',
        t(
          'Menus in a row, cards in a line, a logo in the centre — that is Flexbox.',
          'ម៉ឺនុយជាជួរ កាតជាជួរ ឡូហ្គោនៅកណ្តាល — នោះជា Flexbox។',
        ),
      ],
      learn: [
        [
          '🧺',
          'display: flex',
          t(
            'Put it on a PARENT box; its children line up in a row.',
            'ដាក់វាលើប្រអប់មេ កូនៗរបស់វាតម្រង់ជាជួរ។',
          ),
          'layout',
        ],
        [
          '⬇️',
          'flex-direction',
          t(
            'row (side by side) or column (one under another).',
            'row (ក្បែរគ្នា) ឬ column (មួយក្រោមមួយ)។',
          ),
          'column',
        ],
        [
          '🎯',
          'justify-content',
          t(
            'center, space-between… spreads children along the row.',
            'center, space-between… ចែកកូនៗតាមជួរ។',
          ),
        ],
        [
          '🧱',
          'gap',
          t('gap: 12px; puts space between the children.', 'gap: 12px; ដាក់ចន្លោះរវាងកូនៗ។'),
          'gap',
        ],
      ],
      see: [
        'nav {\n  display: flex;\n  justify-content: space-between;\n  gap: 12px;\n}',
        t(
          'Menu links sit in one row, spread across the top.',
          'តំណម៉ឺនុយនៅក្នុងជួរតែមួយ រាលដាលពាសពេញខាងលើ។',
        ),
      ],
      words: [
        ['layout', 'ប្លង់'],
        ['row', 'ជួរដេក'],
        ['column', 'ជួរឈរ'],
        ['gap', 'ចន្លោះ'],
      ],
      play: [
        mc(t('Which line turns on Flexbox?', 'តើបន្ទាត់ណាបើក Flexbox?'), 'display: flex;', [
          'flex: on;',
          'layout: flex;',
          'box: flex;',
        ]),
        mc(
          t('With display: flex, children line up…', 'ជាមួយ display: flex កូនៗតម្រង់…'),
          t('in a row, side by side', 'ជាជួរ ក្បែរគ្នា'),
          [t('in a random pile', 'ជាគំនរចៃដន្យ'), t('hidden', 'លាក់')],
        ),
        mc(
          t('Which puts children one UNDER another?', 'តើមួយណាដាក់កូនៗមួយក្រោមមួយ?'),
          'flex-direction: column;',
          ['flex-direction: row;', 'gap: 0;', 'display: none;'],
        ),
        mc(t('Which adds space BETWEEN the children?', 'តើមួយណាបន្ថែមចន្លោះរវាងកូនៗ?'), 'gap', [
          'padding',
          'border',
          'color',
        ]),
        tf(
          t(
            'display: flex goes on the PARENT, not on each child.',
            'display: flex ដាក់លើប្រអប់មេ មិនមែនលើកូននីមួយៗ។',
          ),
          true,
        ),
        mc(
          t('Which centres the children along the row?', 'តើមួយណាដាក់កូនៗនៅកណ្តាលតាមជួរ?'),
          'justify-content: center;',
          ['text-align: middle;', 'gap: center;', 'margin: flex;'],
        ),
        tf(t('Flexbox is only for pictures.', 'Flexbox សម្រាប់តែរូបភាព។'), false),
        mc(
          t('How are the 3 buttons placed?', 'តើប៊ូតុង 3 ត្រូវបានដាក់យ៉ាងណា?'),
          t('Side by side with 8px gaps', 'ក្បែរគ្នាមានចន្លោះ 8px'),
          [t('Stacked on top of each other', 'ត្រួតលើគ្នា'), t('In a circle', 'ជារង្វង់')],
          css('.buttons {\n  display: flex;\n  gap: 8px;\n}'),
        ),
      ],
      challenge: [
        match(
          t(
            'Match the justify-content value to the picture.',
            'ផ្គូផ្គងតម្លៃ justify-content ជាមួយរូបភាព។',
          ),
          [
            ['flex-start', '■■■□□□'],
            ['center', '□■■■□□'],
            ['flex-end', '□□□■■■'],
            ['space-between', '■□■□□■'],
          ],
        ),
        mc(
          t(
            'On a phone, you want cards one under another. Use…',
            'លើទូរស័ព្ទ អ្នកចង់បានកាតមួយក្រោមមួយ។ ប្រើ…',
          ),
          'flex-direction: column;',
          ['flex-direction: row;', 'justify-content: center;', 'gap: 100px;'],
        ),
        mc(
          t(
            'Which centres something BOTH ways (left-right and up-down)?',
            'តើមួយណាដាក់អ្វីមួយនៅកណ្តាលទាំងពីរទិស?',
          ),
          'justify-content: center; align-items: center;',
          ['text-align: center;', 'margin: 0;', 'gap: center;'],
        ),
        order(t('Order the CSS for a centred row.', 'តម្រៀប CSS សម្រាប់ជួរនៅកណ្តាល។'), [
          '.row {',
          '  display: flex;',
          '  justify-content: center;',
          '}',
        ]),
        tf(
          t(
            'flex-wrap: wrap lets items move to a new line when there is no space.',
            'flex-wrap: wrap អនុញ្ញាតឱ្យធាតុផ្លាស់ទៅបន្ទាត់ថ្មីពេលគ្មានកន្លែង។',
          ),
          true,
        ),
        num(
          t(
            '4 boxes of 50px with gap: 10px in one row. Total width?',
            'ប្រអប់ 4 នីមួយៗ 50px ជាមួយ gap: 10px ក្នុងជួរមួយ។ ទទឹងសរុប?',
          ),
          230,
          {
            explanation: t(
              '4 × 50 = 200, plus 3 gaps × 10 = 30.',
              '4 × 50 = 200 បូក 3 ចន្លោះ × 10 = 30។',
            ),
          },
        ),
        sortInto(
          t('Row or column?', 'ជួរដេក ឬជួរឈរ?'),
          [
            ['r', 'row', '↔️'],
            ['c', 'column', '↕️'],
          ],
          [
            [t('Top menu on a laptop', 'ម៉ឺនុយខាងលើលើកុំព្យូទ័រយួរដៃ'), 'r'],
            [t('Like / Share / Save buttons', 'ប៊ូតុង Like / Share / Save'), 'r'],
            [t('Photo gallery in a line', 'វិចិត្រសាលរូបថតជាជួរ'), 'r'],
            [t('Chat messages', 'សារជជែក'), 'c'],
            [t('A form on a phone', 'ទម្រង់លើទូរស័ព្ទ'), 'c'],
            [t('News feed', 'ព័ត៌មានថ្មីៗ'), 'c'],
          ],
        ),
        buildSentence(
          t('Build the rule.', 'បង្កើតច្បាប់។'),
          'Put display flex on the parent box.',
          { say: 'Put display flex on the parent box.' },
        ),
      ],
      games: [
        memory(
          t(
            'Match the Flexbox property to its job.',
            'ផ្គូផ្គងលក្ខណៈសម្បត្តិ Flexbox ជាមួយតួនាទី។',
          ),
          [
            ['display: flex', t('Turn on Flexbox', 'បើក Flexbox')],
            ['flex-direction', t('Row or column', 'ជួរដេក ឬជួរឈរ')],
            ['justify-content', t('Spread along the line', 'ចែកតាមបន្ទាត់')],
            ['gap', t('Space between', 'ចន្លោះរវាង')],
          ],
        ),
        catchIt(
          t('Catch the Flexbox words!', 'ចាប់ពាក្យ Flexbox!'),
          ['display: flex', 'gap', 'justify-content', 'flex-wrap'],
          ['<table>', 'href', 'font-family', 'alt'],
          { speed: 'normal' },
        ),
      ],
      reward: t(
        'Rows, columns and centring — you can lay out a page! ↔️',
        'ជួរដេក ជួរឈរ និងការដាក់កណ្តាល — អ្នកអាចរៀបចំប្លង់ទំព័រ! ↔️',
      ),
    },
  ),

  // 14 ────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'mobile-first-design',
    '📱',
    t('Mobile-First Design', 'ការរចនាផ្តោតលើទូរស័ព្ទមុន'),
    t('Pages that work on every screen.', 'ទំព័រដែលដំណើរការលើអេក្រង់គ្រប់ប្រភេទ។'),
    {
      intro: [
        '📱',
        t(
          'Most people in Cambodia use the web on a phone. Design for the small screen first!',
          'មនុស្សភាគច្រើនក្នុងកម្ពុជាប្រើវេបលើទូរស័ព្ទ។ រចនាសម្រាប់អេក្រង់តូចមុនសិន!',
        ),
      ],
      learn: [
        [
          '📱',
          t('Responsive', 'ឆ្លើយតប'),
          t('The page changes shape to fit any screen.', 'ទំព័រប្តូររូបរាងឱ្យសមនឹងអេក្រង់ណាមួយ។'),
          'responsive',
        ],
        [
          '🔍',
          'viewport',
          t(
            '<meta name="viewport" content="width=device-width"> stops tiny zoomed-out pages.',
            '<meta name="viewport" content="width=device-width"> បញ្ឈប់ទំព័រតូចពង្រីកចេញ។',
          ),
          'viewport',
        ],
        [
          '📏',
          '@media',
          t(
            '@media (min-width: 768px) { … } adds styles for bigger screens.',
            '@media (min-width: 768px) { … } បន្ថែមរចនាប័ទ្មសម្រាប់អេក្រង់ធំ។',
          ),
        ],
        [
          '👆',
          t('Thumb-friendly', 'ងាយស្រួលមេដៃ'),
          t(
            'Buttons at least 44px tall so fingers can tap them.',
            'ប៊ូតុងខ្ពស់យ៉ាងហោចណាស់ 44px ដើម្បីឱ្យម្រាមដៃអាចចុច។',
          ),
        ],
      ],
      see: [
        '.cards { display: flex; flex-direction: column; }\n\n@media (min-width: 768px) {\n  .cards { flex-direction: row; }\n}',
        t(
          'Phone: cards stacked. Tablet and laptop: cards side by side.',
          'ទូរស័ព្ទ៖ កាតត្រួតគ្នា។ ថេប្លេត និងកុំព្យូទ័រយួរដៃ៖ កាតក្បែរគ្នា។',
        ),
      ],
      words: [
        ['mobile', 'ទូរស័ព្ទចល័ត', '📱'],
        ['screen', 'អេក្រង់', '🖥️'],
        ['responsive', 'ឆ្លើយតប'],
        ['tap', 'ប៉ះ', '👆'],
      ],
      play: [
        mc(
          t(
            '“Mobile-first” means you design for… first.',
            '«ផ្តោតលើទូរស័ព្ទមុន» មានន័យថាអ្នករចនាសម្រាប់… មុន។',
          ),
          t('phones', 'ទូរស័ព្ទ'),
          [t('big TVs', 'ទូរទស្សន៍ធំ'), t('printers', 'ម៉ាស៊ីនបោះពុម្ព')],
        ),
        tf(
          t(
            'A responsive page fits phones, tablets and computers.',
            'ទំព័រឆ្លើយតបសមនឹងទូរស័ព្ទ ថេប្លេត និងកុំព្យូទ័រ។',
          ),
          true,
        ),
        mc(
          t(
            'Which tag stops a page looking tiny on phones?',
            'តើស្លាកណាបញ្ឈប់ទំព័រមើលទៅតូចលើទូរស័ព្ទ?',
          ),
          '<meta name="viewport" …>',
          ['<title>', '<footer>', '<b>'],
        ),
        mc(
          t(
            'Which CSS adds styles only for bigger screens?',
            'តើ CSS ណាបន្ថែមរចនាប័ទ្មសម្រាប់តែអេក្រង់ធំ?',
          ),
          '@media (min-width: 768px)',
          ['@phone', '#big-screen', 'display: big'],
        ),
        tf(t('Tiny buttons are easy to tap with a thumb.', 'ប៊ូតុងតូចៗងាយចុចដោយមេដៃ។'), false, {
          explanation: t('Aim for at least 44px tall.', 'គោលដៅយ៉ាងហោចណាស់ខ្ពស់ 44px។'),
        }),
        mc(
          t('Which should be SMALL on mobile data?', 'តើអ្វីគួរតែតូចលើទិន្នន័យទូរស័ព្ទ?'),
          t('Picture files', 'ឯកសាររូបភាព'),
          [t('The font size', 'ទំហំពុម្ពអក្សរ'), t('The buttons', 'ប៊ូតុង')],
        ),
        mc(t('Which width is a typical phone?', 'តើទទឹងណាជាទូរស័ព្ទធម្មតា?'), '375px', [
          '1920px',
          '20px',
          '5000px',
        ]),
        tf(
          t(
            'Sideways scrolling on a phone is annoying and should be avoided.',
            'ការរំកិលទៅចំហៀងលើទូរស័ព្ទគួរឱ្យធុញ ហើយគួរជៀសវាង។',
          ),
          true,
        ),
      ],
      challenge: [
        mc(
          t(
            'This picture is 1200px wide and spills off phones. Fix?',
            'រូបភាពនេះទទឹង 1200px ហើយហៀរចេញពីទូរស័ព្ទ។ កែយ៉ាងម៉េច?',
          ),
          'img { max-width: 100%; }',
          ['img { width: 1200px; }', 'img { color: red; }', 'img { display: flex; }'],
        ),
        order(
          t('Order the screens from smallest to biggest.', 'តម្រៀបអេក្រង់ពីតូចបំផុតទៅធំបំផុត។'),
          [
            t('Phone', 'ទូរស័ព្ទ'),
            t('Tablet', 'ថេប្លេត'),
            t('Laptop', 'កុំព្យូទ័រយួរដៃ'),
            t('Big monitor', 'អេក្រង់ធំ'),
          ],
        ),
        mc(
          t('At 500px wide, are the cards in a row?', 'នៅទទឹង 500px តើកាតនៅជាជួរដេកទេ?'),
          t('No — stacked in a column', 'ទេ — ត្រួតជាជួរឈរ'),
          [t('Yes — in a row', 'បាទ — ជាជួរដេក'), t('They disappear', 'វាបាត់')],
          css(
            '.cards { flex-direction: column; }\n@media (min-width: 768px) {\n  .cards { flex-direction: row; }\n}',
          ),
        ),
        sortInto(
          t('Mobile-friendly or not?', 'ងាយស្រួលទូរស័ព្ទ ឬមិនមែន?'),
          [
            ['y', t('Friendly', 'ងាយស្រួល'), '👍'],
            ['n', t('Not friendly', 'មិនងាយស្រួល'), '👎'],
          ],
          [
            [t('Big tap targets', 'កន្លែងចុចធំ'), 'y'],
            [t('Small, compressed pictures', 'រូបភាពតូច បង្រួម'), 'y'],
            [t('Text at least 16px', 'អត្ថបទយ៉ាងហោចណាស់ 16px'), 'y'],
            [t('Page wider than the screen', 'ទំព័រធំជាងអេក្រង់'), 'n'],
            [t('10 MB of pictures', 'រូបភាព 10 MB'), 'n'],
            [t('Links squeezed together', 'តំណជាប់គ្នាតឹង'), 'n'],
          ],
        ),
        tf(
          t(
            'You should test your site on a real phone.',
            'អ្នកគួរសាកល្បងគេហទំព័ររបស់អ្នកលើទូរស័ព្ទពិត។',
          ),
          true,
        ),
        mc(
          t(
            'In Chrome, how can you preview a phone screen on a laptop?',
            'ក្នុង Chrome តើអ្នកអាចមើលអេក្រង់ទូរស័ព្ទលើកុំព្យូទ័រយួរដៃដោយរបៀបណា?',
          ),
          t('DevTools device mode (F12)', 'DevTools device mode (F12)'),
          [t('Print the page', 'បោះពុម្ពទំព័រ'), t('Close the browser', 'បិទកម្មវិធីរុករក')],
        ),
        num(
          t(
            'A button is 30px tall. How many more px to reach 44px?',
            'ប៊ូតុងខ្ពស់ 30px។ ត្រូវការប៉ុន្មាន px ទៀតដើម្បីដល់ 44px?',
          ),
          14,
        ),
        buildSentence(t('Build the rule.', 'បង្កើតច្បាប់។'), 'Design for small screens first.', {
          say: 'Design for small screens first.',
        }),
      ],
      games: [
        catchIt(
          t('Catch the MOBILE-FRIENDLY ideas!', 'ចាប់គំនិតងាយស្រួលទូរស័ព្ទ!'),
          [
            t('Big buttons', 'ប៊ូតុងធំ'),
            t('Small pictures', 'រូបភាពតូច'),
            'max-width: 100%',
            'viewport',
          ],
          [
            t('Tiny links', 'តំណតូចៗ'),
            t('Huge videos', 'វីដេអូធំៗ'),
            'width: 2000px',
            t('Sideways scroll', 'រំកិលចំហៀង'),
          ],
          { speed: 'normal' },
        ),
        memory(t('Match the device to a typical width.', 'ផ្គូផ្គងឧបករណ៍ជាមួយទទឹងធម្មតា។'), [
          [['📱', t('Phone', 'ទូរស័ព្ទ')], '375px'],
          [['📲', t('Tablet', 'ថេប្លេត')], '768px'],
          [['💻', t('Laptop', 'កុំព្យូទ័រយួរដៃ')], '1366px'],
          [['🖥️', t('Big monitor', 'អេក្រង់ធំ')], '1920px'],
        ]),
      ],
      reward: t(
        'Your pages work in every pocket. 📱',
        'ទំព័ររបស់អ្នកដំណើរការក្នុងហោប៉ៅគ្រប់គ្នា។ 📱',
      ),
    },
  ),

  // 15 ────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'my-first-web-page',
    '🏆',
    t('My First Web Page', 'ទំព័រវេបដំបូងរបស់ខ្ញុំ'),
    t('Plan, build, check and share a real page.', 'គ្រោង សាងសង់ ពិនិត្យ និងចែករំលែកទំព័រពិត។'),
    {
      intro: [
        '🏆',
        t(
          'Time to put HTML and CSS together into a page about YOU.',
          'ដល់ពេលដាក់ HTML និង CSS បញ្ចូលគ្នាជាទំព័រមួយអំពីអ្នក។',
        ),
      ],
      learn: [
        [
          '✏️',
          t('Plan', 'គ្រោង'),
          t(
            'Sketch on paper: header, photo, about me, contact.',
            'គូរលើក្រដាស៖ ក្បាលទំព័រ រូបថត អំពីខ្ញុំ ទំនាក់ទំនង។',
          ),
          'sketch',
        ],
        [
          '🧱',
          t('Build', 'សាងសង់'),
          t('Write the HTML first, then style it with CSS.', 'សរសេរ HTML មុន រួចរចនាវាជាមួយ CSS។'),
        ],
        [
          '♿',
          t('Check', 'ពិនិត្យ'),
          t(
            'Alt text? Labels? Contrast? Works on a phone?',
            'អត្ថបទ alt? Label? កម្រិតពន្លឺ? ដំណើរការលើទូរស័ព្ទ?',
          ),
          'accessible',
        ],
        [
          '🚀',
          t('Publish', 'ផ្សព្វផ្សាយ'),
          t(
            'Free hosts like GitHub Pages put your page online.',
            'ម៉ាស៊ីនបង្ហោះឥតគិតថ្លៃ ដូចជា GitHub Pages ដាក់ទំព័ររបស់អ្នកលើអ៊ីនធឺណិត។',
          ),
          'publish',
        ],
      ],
      see: [
        '<header><h1>Sokha</h1></header>\n<main>\n  <img src="me.jpg" alt="Sokha smiling">\n  <p>I love coding and football.</p>\n</main>\n<footer><a href="mailto:sokha@mail.kh">Email me</a></footer>',
        t(
          'Small, clear and complete — a perfect first page.',
          'តូច ច្បាស់ និងពេញលេញ — ទំព័រដំបូងដ៏ល្អឥតខ្ចោះ។',
        ),
      ],
      words: [
        ['design', 'ការរចនា', '🎨'],
        ['publish', 'ផ្សព្វផ្សាយ', '🚀'],
        ['host', 'ម៉ាស៊ីនបង្ហោះ'],
        ['share', 'ចែករំលែក', '📤'],
      ],
      play: [
        order(t('Order the steps to make a web page.', 'តម្រៀបជំហានដើម្បីបង្កើតទំព័រវេប។'), [
          t('Plan on paper', 'គ្រោងលើក្រដាស'),
          t('Write the HTML', 'សរសេរ HTML'),
          t('Add the CSS', 'បន្ថែម CSS'),
          t('Check on a phone', 'ពិនិត្យលើទូរស័ព្ទ'),
          t('Publish', 'ផ្សព្វផ្សាយ'),
        ]),
        mc(
          t('Which file is usually the home page?', 'តើឯកសារណាជាធម្មតាជាទំព័រដើម?'),
          'index.html',
          ['home.css', 'start.jpg', 'main.mp3'],
        ),
        tf(
          t(
            'You should write HTML before styling with CSS.',
            'អ្នកគួរសរសេរ HTML មុនការរចនាជាមួយ CSS។',
          ),
          true,
        ),
        mc(
          t(
            'Which is free web hosting for students?',
            'តើមួយណាជាការបង្ហោះវេបឥតគិតថ្លៃសម្រាប់សិស្ស?',
          ),
          'GitHub Pages',
          ['Microsoft Word', 'Calculator', 'Paint'],
        ),
        mc(
          t(
            'What is missing for screen-reader users?',
            'តើអ្វីបាត់សម្រាប់អ្នកប្រើកម្មវិធីអានអេក្រង់?',
          ),
          t('alt text on the image', 'អត្ថបទ alt លើរូបភាព'),
          [t('A bigger heading', 'ចំណងជើងធំជាង'), t('Nothing', 'គ្មានអ្វីទេ')],
          html('<h1>My Trip</h1>\n<img src="beach.jpg">'),
        ),
        tf(
          t(
            'Putting your home address and phone on a public page is safe.',
            'ការដាក់អាសយដ្ឋានផ្ទះ និងលេខទូរស័ព្ទលើទំព័រសាធារណៈមានសុវត្ថិភាព។',
          ),
          false,
          {
            explanation: t(
              'Share only what you are happy for strangers to see.',
              'ចែករំលែកតែអ្វីដែលអ្នករីករាយឱ្យមនុស្សចម្លែកឃើញ។',
            ),
          },
        ),
        mc(
          t('Where should the CSS link go?', 'តើតំណ CSS គួរនៅឯណា?'),
          t('Inside <head>', 'ក្នុង <head>'),
          [t('Inside <footer>', 'ក្នុង <footer>'), t('After </html>', 'ក្រោយ </html>')],
        ),
        mc(
          t('Which is a good page title for the tab?', 'តើមួយណាជាចំណងជើងទំព័រល្អសម្រាប់ផ្ទាំង?'),
          t('“Sokha — Student Portfolio”', '«Sokha — ឯកសារស្នាដៃសិស្ស»'),
          [t('“Untitled”', '«គ្មានចំណងជើង»'), t('“page1”', '«page1»')],
        ),
      ],
      challenge: [
        sortInto(
          t('HTML or CSS?', 'HTML ឬ CSS?'),
          [
            ['h', 'HTML', '🧱'],
            ['c', 'CSS', '🎨'],
          ],
          [
            ['<h1>Sokha</h1>', 'h'],
            ['<img src="me.jpg" alt="Me">', 'h'],
            ['<a href="#">Top</a>', 'h'],
            ['h1 { color: navy; }', 'c'],
            ['img { max-width: 100%; }', 'c'],
            ['body { font-size: 16px; }', 'c'],
          ],
        ),
        match(t('Match the page part to its tag.', 'ផ្គូផ្គងផ្នែកទំព័រជាមួយស្លាក។'), [
          [t('My name at the top', 'ឈ្មោះខ្ញុំនៅខាងលើ'), '<h1>'],
          [t('My photo', 'រូបថតខ្ញុំ'), '<img>'],
          [t('About me text', 'អត្ថបទអំពីខ្ញុំ'), '<p>'],
          [t('Email link', 'តំណអ៊ីមែល'), '<a>'],
        ]),
        mc(
          t('Find the bug.', 'រកកំហុស។'),
          t('The <p> is never closed', '<p> មិនដែលបិទ'),
          [t('The h1 is too big', 'h1 ធំពេក'), t('Nothing', 'គ្មានអ្វីទេ')],
          html('<h1>Dara</h1>\n<p>I like robots.\n<footer>2028</footer>'),
        ),
        mc(
          t('Find the bug.', 'រកកំហុស។'),
          t('The semicolon ; is missing after navy', 'សញ្ញា ; បាត់ក្រោយ navy'),
          [t('h1 should be H1', 'h1 គួរតែជា H1'), t('Nothing', 'គ្មានអ្វីទេ')],
          css('h1 {\n  color: navy\n  font-size: 32px;\n}'),
        ),
        sortInto(
          t('Passes the final check or needs work?', 'ឆ្លងការពិនិត្យចុងក្រោយ ឬត្រូវការកែ?'),
          [
            ['ok', t('Ready', 'រួចរាល់'), '✅'],
            ['fix', t('Needs work', 'ត្រូវការកែ'), '🔧'],
          ],
          [
            [t('Every image has alt text', 'រូបភាពនីមួយៗមាន alt'), 'ok'],
            [t('Readable on a phone', 'អានបានលើទូរស័ព្ទ'), 'ok'],
            [t('Clear link text', 'អត្ថបទតំណច្បាស់'), 'ok'],
            [t('Grey text on grey', 'អត្ថបទប្រផេះលើប្រផេះ'), 'fix'],
            [t('Picture is 8 MB', 'រូបភាព 8 MB'), 'fix'],
            [t('Form boxes with no labels', 'ប្រអប់ទម្រង់គ្មាន label'), 'fix'],
          ],
        ),
        tf(
          t(
            'Asking a friend to try your page is a good way to find problems.',
            'ការសុំមិត្តភក្តិសាកទំព័ររបស់អ្នកជាវិធីល្អក្នុងការរកបញ្ហា។',
          ),
          true,
        ),
        mc(
          t(
            'What does a web designer do NEXT after publishing?',
            'តើអ្នករចនាវេបធ្វើអ្វីបន្ទាប់ពីផ្សព្វផ្សាយ?',
          ),
          t('Listen to feedback and improve', 'ស្តាប់មតិ និងកែលម្អ'),
          [t('Never touch it again', 'មិនប៉ះវាទៀតឡើយ'), t('Delete it', 'លុបវា')],
        ),
        buildSentence(
          t('Build your motto.', 'បង្កើតបាវចនារបស់អ្នក។'),
          'Plan it build it check it share it.',
          { say: 'Plan it, build it, check it, share it!' },
        ),
      ],
      games: [
        memory(t('Match the job to the language.', 'ផ្គូផ្គងការងារជាមួយភាសា។'), [
          [t('Add a photo', 'បន្ថែមរូបថត'), '<img>'],
          [t('Make it blue', 'ធ្វើឱ្យខៀវ'), 'color: blue'],
          [t('Add a link', 'បន្ថែមតំណ'), '<a href>'],
          [t('Cards in a row', 'កាតជាជួរ'), 'display: flex'],
        ]),
        catchIt(
          t('Catch the things a GOOD page has!', 'ចាប់របស់ដែលទំព័រល្អមាន!'),
          [
            t('Alt text', 'អត្ថបទ alt'),
            t('Clear headings', 'ចំណងជើងច្បាស់'),
            t('Good contrast', 'កម្រិតពន្លឺល្អ'),
            t('Works on phones', 'ដំណើរការលើទូរស័ព្ទ'),
          ],
          [
            t('Broken links', 'តំណខូច'),
            t('Tiny text', 'អត្ថបទតូចៗ'),
            t('Home address', 'អាសយដ្ឋានផ្ទះ'),
          ],
          { speed: 'slow' },
        ),
      ],
      reward: t(
        '🏆 You are a web designer! Build a page about your school or family next.',
        '🏆 អ្នកជាអ្នករចនាវេប! បង្កើតទំព័រអំពីសាលា ឬគ្រួសាររបស់អ្នកបន្ទាប់។',
      ),
    },
  ),
];
