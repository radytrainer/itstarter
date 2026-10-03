import { t, type LessonSeed } from '../../types';
import {
  buildSentence,
  catchIt,
  code,
  match,
  mc,
  memory,
  order,
  plannedLesson,
  sortInto,
  tf,
  typeIt,
} from '../dsl';

// 🎨 Web Design, lessons 1–8: HTML (web-2.ts has 9–15: CSS).
// Khmer (km) strings are DRAFTS for native review.
export const WEB_WORLD = 'web-design';
const W = WEB_WORLD;
const html = (source: string) => ({ data: code(source, 'HTML') });

export const WEB_LESSONS_1: LessonSeed[] = [
  // 1 ─────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'how-websites-work',
    '🌐',
    t('How Websites Work', 'របៀបដែលគេហទំព័រដំណើរការ'),
    t(
      'Browsers, servers and the three languages of the web.',
      'កម្មវិធីរុករក ម៉ាស៊ីនមេ និងភាសាទាំងបីនៃវេប។',
    ),
    {
      intro: [
        '🌐',
        t(
          'Every website is just files: text, pictures and code that your browser turns into a page.',
          'គេហទំព័រនីមួយៗគ្រាន់តែជាឯកសារ៖ អត្ថបទ រូបភាព និងកូដដែលកម្មវិធីរុករកប្តូរទៅជាទំព័រ។',
        ),
      ],
      learn: [
        [
          '🧱',
          'HTML',
          t(
            'The structure: headings, paragraphs, pictures, links.',
            'រចនាសម្ព័ន្ធ៖ ចំណងជើង កថាខណ្ឌ រូបភាព តំណ។',
          ),
          'HTML',
        ],
        [
          '🎨',
          'CSS',
          t(
            'The style: colours, fonts, spacing, layout.',
            'រចនាប័ទ្ម៖ ពណ៌ ពុម្ពអក្សរ គម្លាត ប្លង់។',
          ),
          'CSS',
        ],
        [
          '⚡',
          'JavaScript',
          t(
            'The actions: buttons that do things, games, menus.',
            'សកម្មភាព៖ ប៊ូតុងដែលធ្វើអ្វីមួយ ហ្គេម ម៉ឺនុយ។',
          ),
          'JavaScript',
        ],
        [
          '🖥️',
          t('Server and browser', 'ម៉ាស៊ីនមេ និងកម្មវិធីរុករក'),
          t(
            'A server stores the files; your browser asks for them and shows the page.',
            'ម៉ាស៊ីនមេរក្សាទុកឯកសារ កម្មវិធីរុករករបស់អ្នកស្នើសុំវា ហើយបង្ហាញទំព័រ។',
          ),
        ],
      ],
      see: [
        t(
          'HTML = the walls of a house 🧱\nCSS = the paint and furniture 🎨\nJavaScript = the lights and doors that work ⚡',
          'HTML = ជញ្ជាំងផ្ទះ 🧱\nCSS = ថ្នាំលាប និងគ្រឿងសង្ហារិម 🎨\nJavaScript = ភ្លើង និងទ្វារដែលដំណើរការ ⚡',
        ),
        t('Three languages, one website.', 'ភាសាបី គេហទំព័រមួយ។'),
      ],
      words: [
        ['website', 'គេហទំព័រ', '🌐'],
        ['browser', 'កម្មវិធីរុករក', '🧭'],
        ['server', 'ម៉ាស៊ីនមេ', '🗄️'],
        ['page', 'ទំព័រ', '📄'],
      ],
      play: [
        mc(
          t('Which language gives a page its STRUCTURE?', 'តើភាសាណាផ្តល់រចនាសម្ព័ន្ធដល់ទំព័រ?'),
          'HTML',
          ['CSS', 'JavaScript', 'Python'],
        ),
        mc(
          t('Which language changes COLOURS and FONTS?', 'តើភាសាណាប្តូរពណ៌ និងពុម្ពអក្សរ?'),
          'CSS',
          ['HTML', 'JavaScript', 'Excel'],
        ),
        mc(
          t('Which language makes a button DO something?', 'តើភាសាណាធ្វើឱ្យប៊ូតុងធ្វើអ្វីមួយ?'),
          'JavaScript',
          ['HTML', 'CSS', 'Word'],
        ),
        tf(
          t(
            'A browser (Chrome, Firefox) shows web pages.',
            'កម្មវិធីរុករក (Chrome, Firefox) បង្ហាញទំព័រវេប។',
          ),
          true,
        ),
        tf(t('A website lives only on your phone.', 'គេហទំព័ររស់នៅតែលើទូរស័ព្ទរបស់អ្នក។'), false, {
          explanation: t(
            'It is stored on a server and sent to your browser.',
            'វាត្រូវបានរក្សាទុកលើម៉ាស៊ីនមេ ហើយផ្ញើទៅកម្មវិធីរុករករបស់អ្នក។',
          ),
        }),
        match(t('Match the language to its job.', 'ផ្គូផ្គងភាសាជាមួយតួនាទី។'), [
          ['HTML', t('Structure', 'រចនាសម្ព័ន្ធ')],
          ['CSS', t('Style', 'រចនាប័ទ្ម')],
          ['JavaScript', t('Actions', 'សកម្មភាព')],
        ]),
        mc(t('HTML files usually end with…', 'ឯកសារ HTML ជាធម្មតាបញ្ចប់ដោយ…'), '.html', [
          '.jpg',
          '.docx',
          '.mp3',
        ]),
        mc(
          t(
            'What stores a website’s files so everyone can visit?',
            'តើអ្វីរក្សាទុកឯកសារគេហទំព័រ ដើម្បីឱ្យគ្រប់គ្នាអាចចូលមើល?',
          ),
          t('A server', 'ម៉ាស៊ីនមេ'),
          [t('A keyboard', 'ក្តារចុច'), t('A printer', 'ម៉ាស៊ីនបោះពុម្ព')],
        ),
      ],
      challenge: [
        order(
          t(
            'Order what happens when you open a website.',
            'តម្រៀបអ្វីដែលកើតឡើងពេលអ្នកបើកគេហទំព័រ។',
          ),
          [
            t('You type the address', 'អ្នកវាយអាសយដ្ឋាន'),
            t('The browser asks the server', 'កម្មវិធីរុករកសួរម៉ាស៊ីនមេ'),
            t('The server sends the files', 'ម៉ាស៊ីនមេផ្ញើឯកសារ'),
            t('The browser shows the page', 'កម្មវិធីរុករកបង្ហាញទំព័រ'),
          ],
        ),
        sortInto(
          t('HTML, CSS or JavaScript?', 'HTML, CSS ឬ JavaScript?'),
          [
            ['h', 'HTML', '🧱'],
            ['c', 'CSS', '🎨'],
            ['j', 'JavaScript', '⚡'],
          ],
          [
            [t('A heading', 'ចំណងជើង'), 'h'],
            [t('A picture on the page', 'រូបភាពលើទំព័រ'), 'h'],
            [t('Blue background', 'ផ្ទៃខាងក្រោយខៀវ'), 'c'],
            [t('Bigger font', 'ពុម្ពអក្សរធំជាង'), 'c'],
            [t('A pop-up when you click', 'ផ្ទាំងលោតពេលអ្នកចុច'), 'j'],
            [t('A countdown timer', 'នាឡិការាប់ថយក្រោយ'), 'j'],
          ],
        ),
        mc(
          t(
            'In “https://itstarter.store”, what is “itstarter.store”?',
            'ក្នុង «https://itstarter.store» តើ «itstarter.store» ជាអ្វី?',
          ),
          t('The domain name', 'ឈ្មោះដែន'),
          [t('The browser', 'កម្មវិធីរុករក'), t('The HTML file', 'ឯកសារ HTML')],
        ),
        tf(
          t(
            'You can see any page’s HTML with “View page source”.',
            'អ្នកអាចមើល HTML នៃទំព័រណាមួយដោយ «View page source»។',
          ),
          true,
        ),
        mc(t('Which is NOT a browser?', 'តើមួយណាមិនមែនជាកម្មវិធីរុករក?'), 'Photoshop', [
          'Chrome',
          'Firefox',
          'Safari',
        ]),
        mc(
          t('A web designer mostly works on…', 'អ្នករចនាវេបភាគច្រើនធ្វើការលើ…'),
          t('how the page looks and feels', 'របៀបដែលទំព័រមើលទៅ និងមានអារម្មណ៍'),
          [
            t('repairing printers', 'ជួសជុលម៉ាស៊ីនបោះពុម្ព'),
            t('building phones', 'សាងសង់ទូរស័ព្ទ'),
          ],
        ),
        tf(
          t(
            'A web page can work on phones AND computers.',
            'ទំព័រវេបអាចដំណើរការលើទូរស័ព្ទ និងកុំព្យូទ័រ។',
          ),
          true,
        ),
        buildSentence(t('Build the sentence.', 'បង្កើតប្រយោគ។'), 'HTML builds and CSS decorates.', {
          say: 'HTML builds and CSS decorates.',
        }),
      ],
      games: [
        catchIt(
          t('Catch the web languages!', 'ចាប់ភាសាវេប!'),
          ['HTML', 'CSS', 'JavaScript'],
          ['Word', 'Excel', 'Paint', 'Zoom'],
          { speed: 'slow' },
        ),
        memory(t('Match the house part to the web language.', 'ផ្គូផ្គងផ្នែកផ្ទះជាមួយភាសាវេប។'), [
          [['🧱', t('Walls', 'ជញ្ជាំង')], 'HTML'],
          [['🎨', t('Paint', 'ថ្នាំលាប')], 'CSS'],
          [['💡', t('Light switch', 'កុងតាក់ភ្លើង')], 'JavaScript'],
          [['🏠', t('Address', 'អាសយដ្ឋាន')], t('Domain', 'ដែន')],
        ]),
      ],
      reward: t(
        'You know how the web is built! Next: write your first HTML. 🌐',
        'អ្នកដឹងពីរបៀបដែលវេបត្រូវបានសាងសង់! បន្ទាប់៖ សរសេរ HTML ដំបូងរបស់អ្នក។ 🌐',
      ),
    },
  ),

  // 2 ─────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'html-tags',
    '🏷️',
    t('HTML Tags', 'ស្លាក HTML'),
    t('Opening tags, closing tags and elements.', 'ស្លាកបើក ស្លាកបិទ និងធាតុ។'),
    {
      intro: [
        '🏷️',
        t(
          'HTML wraps content in tags, like putting things in labelled boxes.',
          'HTML រុំខ្លឹមសារក្នុងស្លាក ដូចការដាក់របស់ក្នុងប្រអប់មានស្លាក។',
        ),
      ],
      learn: [
        [
          '🏷️',
          t('Tag', 'ស្លាក'),
          t('A word in angle brackets: <p>', 'ពាក្យក្នុងសញ្ញាមុំ៖ <p>'),
          'tag',
        ],
        [
          '🔚',
          t('Closing tag', 'ស្លាកបិទ'),
          t('Same name with a slash: </p>', 'ឈ្មោះដូចគ្នាជាមួយសញ្ញា /៖ </p>'),
        ],
        [
          '📦',
          t('Element', 'ធាតុ'),
          t(
            'Opening tag + content + closing tag: <p>Hello</p>',
            'ស្លាកបើក + ខ្លឹមសារ + ស្លាកបិទ៖ <p>Hello</p>',
          ),
          'element',
        ],
        [
          '🪆',
          t('Nesting', 'ការដាក់ក្នុងគ្នា'),
          t(
            'Tags can go inside tags: <p>I am <b>happy</b></p>',
            'ស្លាកអាចនៅក្នុងស្លាក៖ <p>I am <b>happy</b></p>',
          ),
        ],
      ],
      see: [
        '<p>Hello, Cambodia!</p>\n<b>Bold text</b>\n<i>Italic text</i>',
        t(
          'The browser hides the tags and shows only the styled text.',
          'កម្មវិធីរុករកលាក់ស្លាក ហើយបង្ហាញតែអត្ថបទដែលមានរចនាប័ទ្ម។',
        ),
      ],
      words: [
        ['tag', 'ស្លាក', '🏷️'],
        ['element', 'ធាតុ', '📦'],
        ['open', 'បើក'],
        ['close', 'បិទ'],
      ],
      play: [
        mc(t('Which is an opening tag?', 'តើមួយណាជាស្លាកបើក?'), '<p>', ['</p>', 'p', '(p)']),
        mc(t('Which is a closing tag?', 'តើមួយណាជាស្លាកបិទ?'), '</b>', ['<b>', '<b/', '[b]']),
        mc(
          t('What does the browser SHOW for this?', 'តើកម្មវិធីរុករកបង្ហាញអ្វីសម្រាប់នេះ?'),
          'Hello',
          ['<p>Hello</p>', '<p>', 'p Hello p'],
          html('<p>Hello</p>'),
        ),
        tf(t('Tags are written inside < and >.', 'ស្លាកត្រូវបានសរសេរក្នុង < និង >។'), true),
        mc(t('Which tag makes text bold?', 'តើស្លាកណាធ្វើឱ្យអត្ថបទដិត?'), '<b>', [
          '<i>',
          '<p>',
          '<u>',
        ]),
        mc(t('Which tag makes text italic?', 'តើស្លាកណាធ្វើឱ្យអត្ថបទទ្រេត?'), '<i>', [
          '<b>',
          '<p>',
          '<h1>',
        ]),
        tf(t('A closing tag has a / before the name.', 'ស្លាកបិទមានសញ្ញា / មុនឈ្មោះ។'), true),
        typeIt(t('Type the closing tag for <p>.', 'វាយស្លាកបិទសម្រាប់ <p>។'), '</p>'),
      ],
      challenge: [
        mc(
          t('What is wrong here?', 'តើមានអ្វីខុសនៅទីនេះ?'),
          t('The closing tag is missing', 'ស្លាកបិទបាត់'),
          [t('Nothing', 'គ្មានអ្វីទេ'), t('p must be P', 'p ត្រូវតែជា P')],
          html('<p>Welcome to my page'),
        ),
        mc(
          t('Which nesting is correct?', 'តើការដាក់ក្នុងគ្នាមួយណាត្រឹមត្រូវ?'),
          '<p><b>Hi</b></p>',
          ['<p><b>Hi</p></b>', '<b><p>Hi</b></p>', '<p>Hi<b></p>'],
        ),
        order(t('Order the parts of an element.', 'តម្រៀបផ្នែកនៃធាតុ។'), ['<p>', 'Hello', '</p>']),
        tf(
          t('This shows the word “happy” in bold.', 'នេះបង្ហាញពាក្យ «happy» ជាអក្សរដិត។'),
          true,
          html('<p>I am <b>happy</b></p>'),
        ),
        match(t('Match the tag to what it does.', 'ផ្គូផ្គងស្លាកជាមួយអ្វីដែលវាធ្វើ។'), [
          ['<b>', t('Bold', 'ដិត')],
          ['<i>', t('Italic', 'ទ្រេត')],
          ['<p>', t('Paragraph', 'កថាខណ្ឌ')],
          ['<br>', t('New line', 'បន្ទាត់ថ្មី')],
        ]),
        mc(
          t('<br> is special because…', '<br> ពិសេសព្រោះ…'),
          t('it has no closing tag', 'វាគ្មានស្លាកបិទ'),
          [t('it is a picture', 'វាជារូបភាព'), t('it is CSS', 'វាជា CSS')],
        ),
        mc(
          t('How many elements are here?', 'តើមានធាតុប៉ុន្មាននៅទីនេះ?'),
          '3',
          ['1', '2', '6'],
          html('<p>One</p>\n<p>Two</p>\n<p>Three</p>'),
        ),
        buildSentence(
          t('Build the rule.', 'បង្កើតច្បាប់។'),
          'Every opening tag needs a closing tag.',
          { say: 'Every opening tag needs a closing tag.' },
        ),
      ],
      games: [
        catchIt(
          t('Catch the CLOSING tags!', 'ចាប់ស្លាកបិទ!'),
          ['</p>', '</b>', '</i>', '</h1>'],
          ['<p>', '<b>', '<i>', '<h1>'],
          { speed: 'normal' },
        ),
        memory(
          t('Match each opening tag to its closing tag.', 'ផ្គូផ្គងស្លាកបើកនីមួយៗជាមួយស្លាកបិទ។'),
          [
            ['<p>', '</p>'],
            ['<b>', '</b>'],
            ['<i>', '</i>'],
            ['<h1>', '</h1>'],
          ],
        ),
      ],
      reward: t(
        'Tags are the building blocks of every web page. 🏷️',
        'ស្លាកគឺជាប្លុកសាងសង់នៃទំព័រវេបគ្រប់ទំព័រ។ 🏷️',
      ),
    },
  ),

  // 3 ─────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'headings-and-paragraphs',
    '📰',
    t('Headings & Paragraphs', 'ចំណងជើង និងកថាខណ្ឌ'),
    t(
      'Give your page big titles and clear text.',
      'ផ្តល់ចំណងជើងធំ និងអត្ថបទច្បាស់ដល់ទំព័ររបស់អ្នក។',
    ),
    {
      intro: [
        '📰',
        t(
          'A newspaper has a big headline and smaller text. Web pages work the same way.',
          'កាសែតមានចំណងជើងធំ និងអត្ថបទតូចជាង។ ទំព័រវេបដំណើរការដូចគ្នា។',
        ),
      ],
      learn: [
        [
          '1️⃣',
          '<h1>',
          t('The main heading. Use one per page.', 'ចំណងជើងសំខាន់។ ប្រើមួយក្នុងមួយទំព័រ។'),
          'heading',
        ],
        [
          '🔢',
          '<h2> … <h6>',
          t(
            'Smaller headings for sections. h6 is the smallest.',
            'ចំណងជើងតូចជាងសម្រាប់ផ្នែក។ h6 តូចបំផុត។',
          ),
        ],
        ['📝', '<p>', t('A paragraph of normal text.', 'កថាខណ្ឌនៃអត្ថបទធម្មតា។'), 'paragraph'],
      ],
      see: [
        '<h1>My School</h1>\n<h2>Our Classes</h2>\n<p>We learn IT every Monday.</p>',
        t(
          'h1 is biggest, h2 is a section title, p is the body text.',
          'h1 ធំបំផុត h2 ជាចំណងជើងផ្នែក p ជាអត្ថបទតួ។',
        ),
      ],
      words: [
        ['heading', 'ចំណងជើង', '📰'],
        ['paragraph', 'កថាខណ្ឌ', '📝'],
        ['title', 'ចំណងជើងរង'],
        ['section', 'ផ្នែក'],
      ],
      play: [
        mc(t('Which heading is the BIGGEST?', 'តើចំណងជើងណាធំបំផុត?'), '<h1>', [
          '<h6>',
          '<h3>',
          '<p>',
        ]),
        mc(t('Which heading is the SMALLEST?', 'តើចំណងជើងណាតូចបំផុត?'), '<h6>', [
          '<h1>',
          '<h2>',
          '<h4>',
        ]),
        mc(t('Which tag is for normal text?', 'តើស្លាកណាសម្រាប់អត្ថបទធម្មតា?'), '<p>', [
          '<h1>',
          '<b>',
          '<img>',
        ]),
        tf(
          t('A page should usually have only ONE <h1>.', 'ទំព័រមួយជាធម្មតាគួរមាន <h1> តែមួយ។'),
          true,
        ),
        tf(t('There is an <h7> tag.', 'មានស្លាក <h7>។'), false, {
          explanation: t('Headings go from h1 to h6.', 'ចំណងជើងមានពី h1 ដល់ h6។'),
        }),
        typeIt(
          t('Type the opening tag for the main heading.', 'វាយស្លាកបើកសម្រាប់ចំណងជើងសំខាន់។'),
          '<h1>',
        ),
        mc(
          t('What size will “Prices” be?', 'តើ «Prices» នឹងមានទំហំប៉ុណ្ណា?'),
          t('A section heading (2nd level)', 'ចំណងជើងផ្នែក (កម្រិតទី 2)'),
          [t('The biggest on the page', 'ធំបំផុតលើទំព័រ'), t('Normal text', 'អត្ថបទធម្មតា')],
          html('<h2>Prices</h2>'),
        ),
        match(t('Match the tag to the newspaper part.', 'ផ្គូផ្គងស្លាកជាមួយផ្នែកកាសែត។'), [
          ['<h1>', t('Front-page headline', 'ចំណងជើងទំព័រមុខ')],
          ['<h2>', t('Section title', 'ចំណងជើងផ្នែក')],
          ['<p>', t('Story text', 'អត្ថបទរឿង')],
        ]),
      ],
      challenge: [
        order(t('Order a page from top to bottom.', 'តម្រៀបទំព័រពីលើចុះក្រោម។'), [
          '<h1>Coffee Shop</h1>',
          '<h2>Menu</h2>',
          '<p>Iced coffee: 5,000 riel</p>',
        ]),
        mc(t('Which is correct HTML?', 'តើមួយណាជា HTML ត្រឹមត្រូវ?'), '<h2>News</h2>', [
          '<h2>News</h3>',
          '<h2>News<h2>',
          'h2 News /h2',
        ]),
        tf(
          t(
            'Headings help search engines and screen readers understand your page.',
            'ចំណងជើងជួយម៉ាស៊ីនស្វែងរក និងកម្មវិធីអានអេក្រង់យល់ទំព័ររបស់អ្នក។',
          ),
          true,
        ),
        mc(
          t(
            'You want a sub-section inside an h2 section. Use…',
            'អ្នកចង់បានផ្នែករងក្នុងផ្នែក h2។ ប្រើ…',
          ),
          '<h3>',
          ['<h1>', '<h6>', '<p>'],
        ),
        mc(
          t('How many paragraphs are here?', 'តើមានកថាខណ្ឌប៉ុន្មាននៅទីនេះ?'),
          '2',
          ['1', '3', '4'],
          html('<h1>Hi</h1>\n<p>One</p>\n<h2>More</h2>\n<p>Two</p>'),
        ),
        tf(
          t(
            'Using <h1> just to make text big is good practice.',
            'ការប្រើ <h1> គ្រាន់តែធ្វើឱ្យអត្ថបទធំគឺជាការអនុវត្តល្អ។',
          ),
          false,
          {
            explanation: t(
              'Headings show structure; use CSS to change size.',
              'ចំណងជើងបង្ហាញរចនាសម្ព័ន្ធ ប្រើ CSS ដើម្បីប្តូរទំហំ។',
            ),
          },
        ),
        sortInto(
          t('Heading or paragraph?', 'ចំណងជើង ឬកថាខណ្ឌ?'),
          [
            ['h', t('Heading', 'ចំណងជើង'), '📰'],
            ['p', t('Paragraph', 'កថាខណ្ឌ'), '📝'],
          ],
          [
            [t('About Us', 'អំពីយើង'), 'h'],
            [t('Contact', 'ទំនាក់ទំនង'), 'h'],
            [t('Our Menu', 'ម៉ឺនុយរបស់យើង'), 'h'],
            [
              t(
                'We opened in 2020 in Siem Reap and serve fresh juice.',
                'យើងបើកក្នុងឆ្នាំ 2020 នៅសៀមរាប ហើយលក់ទឹកផ្លែឈើស្រស់។',
              ),
              'p',
            ],
            [
              t(
                'Call us any day from 7am to 9pm.',
                'ទូរស័ព្ទមកយើងរាល់ថ្ងៃពីម៉ោង 7 ព្រឹកដល់ 9 យប់។',
              ),
              'p',
            ],
          ],
        ),
        buildSentence(t('Build the rule.', 'បង្កើតច្បាប់។'), 'Use one h1 for the main title.', {
          say: 'Use one h1 for the main title.',
        }),
      ],
      games: [
        memory(t('Match each heading to its level.', 'ផ្គូផ្គងចំណងជើងនីមួយៗជាមួយកម្រិត។'), [
          ['<h1>', t('Level 1 — biggest', 'កម្រិត 1 — ធំបំផុត')],
          ['<h2>', t('Level 2', 'កម្រិត 2')],
          ['<h3>', t('Level 3', 'កម្រិត 3')],
          ['<h6>', t('Level 6 — smallest', 'កម្រិត 6 — តូចបំផុត')],
        ]),
        catchIt(
          t('Catch the REAL heading tags!', 'ចាប់ស្លាកចំណងជើងពិត!'),
          ['<h1>', '<h2>', '<h3>', '<h6>'],
          ['<h7>', '<h0>', '<head1>', '<hh>'],
        ),
      ],
      reward: t(
        'Your pages now have clear titles and text. 📰',
        'ទំព័ររបស់អ្នកឥឡូវមានចំណងជើង និងអត្ថបទច្បាស់។ 📰',
      ),
    },
  ),

  // 4 ─────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'links',
    '🔗',
    t('Links', 'តំណ'),
    t('Connect pages with the <a> tag.', 'ភ្ជាប់ទំព័រជាមួយស្លាក <a>។'),
    {
      intro: [
        '🔗',
        t(
          'Links are what make the web a WEB — every page connects to other pages.',
          'តំណធ្វើឱ្យវេបក្លាយជាបណ្តាញ — ទំព័រនីមួយៗភ្ជាប់ទៅទំព័រផ្សេងទៀត។',
        ),
      ],
      learn: [
        ['🔗', '<a>', t('The “anchor” tag makes a link.', 'ស្លាក «anchor» បង្កើតតំណ។'), 'link'],
        [
          '📍',
          'href',
          t('href="…" says WHERE the link goes.', 'href="…" ប្រាប់ថាតំណទៅណា។'),
          'href',
        ],
        [
          '🏷️',
          t('Attribute', 'គុណលក្ខណៈ'),
          t(
            'Extra information inside the opening tag: name="value".',
            'ព័ត៌មានបន្ថែមក្នុងស្លាកបើក៖ name="value"។',
          ),
          'attribute',
        ],
        ['🆕', 'target="_blank"', t('Opens the link in a new tab.', 'បើកតំណក្នុងផ្ទាំងថ្មី។')],
      ],
      see: [
        '<a href="https://itstarter.store">Learn IT</a>',
        t(
          'The page shows “Learn IT”. Tap it and you go to itstarter.store.',
          'ទំព័របង្ហាញ «Learn IT»។ ចុចវា ហើយអ្នកទៅ itstarter.store។',
        ),
      ],
      words: [
        ['link', 'តំណ', '🔗'],
        ['address', 'អាសយដ្ឋាន', '📍'],
        ['attribute', 'គុណលក្ខណៈ'],
        ['tab', 'ផ្ទាំង', '🗂️'],
      ],
      play: [
        mc(t('Which tag makes a link?', 'តើស្លាកណាបង្កើតតំណ?'), '<a>', ['<link>', '<p>', '<l>']),
        mc(t('Which attribute says where a link goes?', 'តើគុណលក្ខណៈណាប្រាប់ថាតំណទៅណា?'), 'href', [
          'src',
          'alt',
          'go',
        ]),
        mc(
          t('What text does the user see?', 'តើអ្នកប្រើឃើញអត្ថបទអ្វី?'),
          'Click me',
          ['https://example.com', 'href', 'a'],
          html('<a href="https://example.com">Click me</a>'),
        ),
        mc(
          t('Where does this link go?', 'តើតំណនេះទៅណា?'),
          'https://moeys.gov.kh',
          ['Ministry', '<a>', t('Nowhere', 'គ្មានកន្លែង')],
          html('<a href="https://moeys.gov.kh">Ministry</a>'),
        ),
        tf(
          t(
            'target="_blank" opens the link in a new tab.',
            'target="_blank" បើកតំណក្នុងផ្ទាំងថ្មី។',
          ),
          true,
        ),
        tf(
          t('A link must always go to another website.', 'តំណត្រូវតែទៅគេហទំព័រផ្សេងជានិច្ច។'),
          false,
          {
            explanation: t(
              'It can go to another page of YOUR site, like about.html.',
              'វាអាចទៅទំព័រផ្សេងនៃគេហទំព័ររបស់អ្នក ដូចជា about.html។',
            ),
          },
        ),
        typeIt(
          t(
            'Type the attribute name that holds the link address.',
            'វាយឈ្មោះគុណលក្ខណៈដែលផ្ទុកអាសយដ្ឋានតំណ។',
          ),
          'href',
        ),
        mc(
          t(
            'Which is a link to a page on your own site?',
            'តើមួយណាជាតំណទៅទំព័រលើគេហទំព័ររបស់អ្នក?',
          ),
          '<a href="about.html">About</a>',
          ['<a>about.html</a>', '<a href="">About</a>', '<p href="about.html">About</p>'],
        ),
      ],
      challenge: [
        order(t('Order the pieces of a link.', 'តម្រៀបបំណែកនៃតំណ។'), [
          '<a',
          'href="contact.html">',
          'Contact us',
          '</a>',
        ]),
        mc(
          t('What is wrong?', 'តើមានអ្វីខុស?'),
          t('The quotes around the address are missing', 'សញ្ញាសម្រង់ជុំវិញអាសយដ្ឋានបាត់'),
          [t('a must be A', 'a ត្រូវតែជា A'), t('Nothing', 'គ្មានអ្វីទេ')],
          html('<a href=news.html>News</a>'),
        ),
        mc(
          t('Which link text is MOST helpful?', 'តើអត្ថបទតំណណាមានប្រយោជន៍បំផុត?'),
          t('“Download the timetable”', '«ទាញយកកាលវិភាគ»'),
          [t('“Click here”', '«ចុចទីនេះ»'), t('“Link”', '«តំណ»')],
          {
            explanation: t(
              'Clear link text helps everyone, including screen-reader users.',
              'អត្ថបទតំណច្បាស់ជួយគ្រប់គ្នា រួមទាំងអ្នកប្រើកម្មវិធីអានអេក្រង់។',
            ),
          },
        ),
        match(t('Match the part to its job.', 'ផ្គូផ្គងផ្នែកជាមួយតួនាទី។'), [
          ['<a>', t('Makes a link', 'បង្កើតតំណ')],
          ['href', t('Where it goes', 'ទៅណា')],
          ['target="_blank"', t('Open in a new tab', 'បើកក្នុងផ្ទាំងថ្មី')],
          ['</a>', t('Ends the link', 'បញ្ចប់តំណ')],
        ]),
        mc(
          t('mailto: links open…', 'តំណ mailto: បើក…'),
          t('an email to that address', 'អ៊ីមែលទៅអាសយដ្ឋាននោះ'),
          [t('a map', 'ផែនទី'), t('a video', 'វីដេអូ')],
          html('<a href="mailto:hello@school.edu.kh">Email us</a>'),
        ),
        tf(t('An attribute goes inside the OPENING tag.', 'គុណលក្ខណៈនៅក្នុងស្លាកបើក។'), true),
        mc(
          t(
            'tel: links are useful on phones because they…',
            'តំណ tel: មានប្រយោជន៍លើទូរស័ព្ទព្រោះវា…',
          ),
          t('start a phone call', 'ចាប់ផ្តើមការហៅទូរស័ព្ទ'),
          [t('send a photo', 'ផ្ញើរូបថត'), t('turn on the torch', 'បើកពិល')],
          html('<a href="tel:+85512345678">Call us</a>'),
        ),
        buildSentence(
          t('Build the sentence.', 'បង្កើតប្រយោគ។'),
          'The href tells the link where to go.',
          { say: 'The href tells the link where to go.' },
        ),
      ],
      games: [
        catchIt(
          t('Catch the CORRECT links!', 'ចាប់តំណត្រឹមត្រូវ!'),
          [
            '<a href="a.html">A</a>',
            '<a href="https://kh.gov">Gov</a>',
            '<a href="mailto:me@x.kh">Mail</a>',
          ],
          ['<a>a.html</a>', '<link a.html>', '<a href=>B</a>', 'a href="b.html"'],
          { speed: 'slow' },
        ),
        memory(
          t('Match the link start to what it opens.', 'ផ្គូផ្គងការចាប់ផ្តើមតំណជាមួយអ្វីដែលវាបើក។'),
          [
            ['https://', t('A website', 'គេហទំព័រ')],
            ['mailto:', t('An email', 'អ៊ីមែល')],
            ['tel:', t('A phone call', 'ការហៅទូរស័ព្ទ')],
            ['about.html', t('A page on your site', 'ទំព័រលើគេហទំព័ររបស់អ្នក')],
          ],
        ),
      ],
      reward: t(
        'You can connect pages together — that is the web! 🔗',
        'អ្នកអាចភ្ជាប់ទំព័រចូលគ្នា — នោះហើយជាវេប! 🔗',
      ),
    },
  ),

  // 5 ─────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'images',
    '🖼️',
    t('Images', 'រូបភាព'),
    t('Add pictures with <img>, src and alt.', 'បន្ថែមរូបភាពជាមួយ <img> src និង alt។'),
    {
      intro: [
        '🖼️',
        t(
          'A page without pictures is like a book without photos. Let’s add some!',
          'ទំព័រគ្មានរូបភាពដូចសៀវភៅគ្មានរូបថត។ តោះបន្ថែមខ្លះ!',
        ),
      ],
      learn: [
        [
          '🖼️',
          '<img>',
          t('Shows a picture. It has NO closing tag.', 'បង្ហាញរូបភាព។ វាគ្មានស្លាកបិទ។'),
          'image',
        ],
        [
          '📂',
          'src',
          t(
            'src="angkor.jpg" — where the picture file is.',
            'src="angkor.jpg" — កន្លែងដែលឯកសាររូបភាពនៅ។',
          ),
          'source',
        ],
        [
          '🗣️',
          'alt',
          t(
            'alt="Angkor Wat at sunrise" — words for people who cannot see the picture.',
            'alt="Angkor Wat at sunrise" — ពាក្យសម្រាប់អ្នកដែលមិនអាចមើលរូបភាព។',
          ),
        ],
        [
          '📐',
          'width',
          t(
            'width="300" makes the picture 300 pixels wide.',
            'width="300" ធ្វើឱ្យរូបភាពទទឹង 300 ភីកសែល។',
          ),
          'pixel',
        ],
      ],
      see: [
        '<img src="angkor.jpg" alt="Angkor Wat at sunrise" width="300">',
        t(
          'If the picture cannot load, the alt text appears instead.',
          'ប្រសិនបើរូបភាពមិនអាចផ្ទុក អត្ថបទ alt បង្ហាញជំនួស។',
        ),
      ],
      words: [
        ['image', 'រូបភាព', '🖼️'],
        ['source', 'ប្រភព'],
        ['pixel', 'ភីកសែល'],
        ['photo', 'រូបថត', '📷'],
      ],
      play: [
        mc(t('Which tag shows a picture?', 'តើស្លាកណាបង្ហាញរូបភាព?'), '<img>', [
          '<pic>',
          '<photo>',
          '<a>',
        ]),
        mc(
          t(
            'Which attribute says WHERE the picture file is?',
            'តើគុណលក្ខណៈណាប្រាប់ថាឯកសាររូបភាពនៅឯណា?',
          ),
          'src',
          ['alt', 'href', 'width'],
        ),
        mc(
          t(
            'Which attribute describes the picture in words?',
            'តើគុណលក្ខណៈណាពិពណ៌នារូបភាពជាពាក្យ?',
          ),
          'alt',
          ['src', 'title', 'href'],
        ),
        tf(t('<img> needs a closing tag </img>.', '<img> ត្រូវការស្លាកបិទ </img>។'), false),
        tf(
          t(
            'Alt text helps blind users who use screen readers.',
            'អត្ថបទ alt ជួយអ្នកពិការភ្នែកដែលប្រើកម្មវិធីអានអេក្រង់។',
          ),
          true,
        ),
        mc(t('Which is a picture file?', 'តើមួយណាជាឯកសាររូបភាព?'), 'logo.png', [
          'logo.html',
          'logo.css',
          'logo.mp3',
        ]),
        mc(
          t('How wide will the picture be?', 'តើរូបភាពនឹងទទឹងប៉ុណ្ណា?'),
          t('200 pixels', '200 ភីកសែល'),
          [t('200 cm', '200 សង់ទីម៉ែត្រ'), t('Full screen', 'ពេញអេក្រង់')],
          html('<img src="cat.jpg" alt="A sleepy cat" width="200">'),
        ),
        typeIt(
          t('Type the attribute for the picture file.', 'វាយគុណលក្ខណៈសម្រាប់ឯកសាររូបភាព។'),
          'src',
        ),
      ],
      challenge: [
        mc(
          t('Which alt text is BEST?', 'តើអត្ថបទ alt មួយណាល្អបំផុត?'),
          t('“Students using laptops in a classroom”', '«សិស្សប្រើកុំព្យូទ័រយួរដៃក្នុងថ្នាក់រៀន»'),
          [t('“image”', '«រូបភាព»'), t('“IMG_2041.jpg”', '«IMG_2041.jpg»')],
        ),
        mc(
          t('What is missing?', 'តើអ្វីបាត់?'),
          t('The alt text', 'អត្ថបទ alt'),
          [t('A closing tag', 'ស្លាកបិទ'), t('Nothing', 'គ្មានអ្វីទេ')],
          html('<img src="map.png">'),
        ),
        mc(
          t('How do you make a picture into a link?', 'តើអ្នកធ្វើរូបភាពជាតំណដោយរបៀបណា?'),
          '<a href="shop.html"><img src="bag.png" alt="Shop"></a>',
          ['<img href="shop.html">', '<img src="shop.html">', '<link img="bag.png">'],
        ),
        sortInto(
          t('Image file or not?', 'ឯកសាររូបភាព ឬមិនមែន?'),
          [
            ['y', t('Image', 'រូបភាព'), '🖼️'],
            ['n', t('Not an image', 'មិនមែនរូបភាព'), '📄'],
          ],
          [
            ['photo.jpg', 'y'],
            ['icon.png', 'y'],
            ['logo.svg', 'y'],
            ['song.mp3', 'n'],
            ['index.html', 'n'],
            ['style.css', 'n'],
          ],
        ),
        tf(
          t(
            'Huge picture files make a page slow on mobile data.',
            'ឯកសាររូបភាពធំពេកធ្វើឱ្យទំព័រយឺតលើទិន្នន័យទូរស័ព្ទ។',
          ),
          true,
        ),
        order(t('Order the parts of an image tag.', 'តម្រៀបផ្នែកនៃស្លាករូបភាព។'), [
          '<img',
          'src="dog.jpg"',
          'alt="A happy dog"',
          '>',
        ]),
        match(t('Match the attribute to its job.', 'ផ្គូផ្គងគុណលក្ខណៈជាមួយតួនាទី។'), [
          ['src', t('The file', 'ឯកសារ')],
          ['alt', t('The description', 'ការពិពណ៌នា')],
          ['width', t('The size', 'ទំហំ')],
        ]),
        tf(
          t(
            'It is OK to use any photo from the internet on your site.',
            'វាមិនអីទេក្នុងការប្រើរូបថតណាមួយពីអ៊ីនធឺណិតលើគេហទំព័ររបស់អ្នក។',
          ),
          false,
          {
            explanation: t(
              'Photos have owners. Use your own or free-to-use pictures.',
              'រូបថតមានម្ចាស់។ ប្រើរបស់អ្នកផ្ទាល់ ឬរូបភាពប្រើដោយឥតគិតថ្លៃ។',
            ),
          },
        ),
      ],
      games: [
        memory(t('Match the file type to what it is.', 'ផ្គូផ្គងប្រភេទឯកសារជាមួយអ្វីដែលវាជា។'), [
          ['.jpg', t('Photo', 'រូបថត')],
          ['.png', t('Picture with see-through parts', 'រូបភាពមានផ្នែកថ្លា')],
          ['.svg', t('Drawing that stays sharp', 'គំនូរដែលនៅតែច្បាស់')],
          ['.gif', t('Small animation', 'ចលនាតូច')],
        ]),
        catchIt(
          t('Catch the GOOD alt texts!', 'ចាប់អត្ថបទ alt ល្អ!'),
          [
            t('A red tuk-tuk on a street', 'រ៉ឺម៉កពណ៌ក្រហមលើផ្លូវ'),
            t('Map of Phnom Penh', 'ផែនទីភ្នំពេញ'),
            t('Teacher writing on a board', 'គ្រូសរសេរលើក្តារ'),
          ],
          ['image', 'pic1', 'IMG_001.jpg', '...'],
        ),
      ],
      reward: t(
        'Your pages can show pictures — and describe them for everyone. 🖼️',
        'ទំព័ររបស់អ្នកអាចបង្ហាញរូបភាព — ហើយពិពណ៌នាវាសម្រាប់គ្រប់គ្នា។ 🖼️',
      ),
    },
  ),

  // 6 ─────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'html-lists',
    '📋',
    t('Lists in HTML', 'បញ្ជីក្នុង HTML'),
    t('Bullet points and numbered steps.', 'ចំណុចគ្រាប់ និងជំហានមានលេខ។'),
    {
      intro: [
        '📋',
        t(
          'Menus, recipes and top-10s are all lists. HTML has two kinds.',
          'ម៉ឺនុយ រូបមន្តធ្វើម្ហូប និងកំពូលទាំង 10 សុទ្ធតែជាបញ្ជី។ HTML មានពីរប្រភេទ។',
        ),
      ],
      learn: [
        [
          '•',
          '<ul>',
          t(
            'Unordered list: bullet points, order does not matter.',
            'បញ្ជីគ្មានលំដាប់៖ ចំណុចគ្រាប់ លំដាប់មិនសំខាន់។',
          ),
          'bullet',
        ],
        [
          '1.',
          '<ol>',
          t(
            'Ordered list: numbers 1, 2, 3 — order matters.',
            'បញ្ជីមានលំដាប់៖ លេខ 1, 2, 3 — លំដាប់សំខាន់។',
          ),
        ],
        ['▪️', '<li>', t('Each item in either list.', 'ធាតុនីមួយៗក្នុងបញ្ជីណាមួយ។'), 'item'],
      ],
      see: [
        '<ol>\n  <li>Boil water</li>\n  <li>Add noodles</li>\n  <li>Wait 3 minutes</li>\n</ol>',
        t(
          'Shows 1. Boil water  2. Add noodles  3. Wait 3 minutes.',
          'បង្ហាញ 1. ដាំទឹក 2. ដាក់មី 3. រង់ចាំ 3 នាទី។',
        ),
      ],
      words: [
        ['list', 'បញ្ជី', '📋'],
        ['bullet', 'ចំណុចគ្រាប់', '•'],
        ['numbered', 'មានលេខ'],
        ['step', 'ជំហាន', '👣'],
      ],
      play: [
        mc(t('Which tag makes a BULLET list?', 'តើស្លាកណាបង្កើតបញ្ជីចំណុចគ្រាប់?'), '<ul>', [
          '<ol>',
          '<li>',
          '<bl>',
        ]),
        mc(t('Which tag makes a NUMBERED list?', 'តើស្លាកណាបង្កើតបញ្ជីមានលេខ?'), '<ol>', [
          '<ul>',
          '<nl>',
          '<li>',
        ]),
        mc(t('Which tag is one list ITEM?', 'តើស្លាកណាជាធាតុបញ្ជីមួយ?'), '<li>', [
          '<ul>',
          '<item>',
          '<i>',
        ]),
        tf(
          t('A recipe’s steps fit best in <ol>.', 'ជំហានរូបមន្តធ្វើម្ហូបសមបំផុតក្នុង <ol>។'),
          true,
        ),
        tf(
          t(
            'A shopping list where order does not matter fits <ul>.',
            'បញ្ជីទិញឥវ៉ាន់ដែលលំដាប់មិនសំខាន់សមនឹង <ul>។',
          ),
          true,
        ),
        mc(
          t('How many items are in this list?', 'តើមានធាតុប៉ុន្មានក្នុងបញ្ជីនេះ?'),
          '3',
          ['1', '2', '4'],
          html('<ul>\n  <li>Rice</li>\n  <li>Eggs</li>\n  <li>Fish</li>\n</ul>'),
        ),
        mc(
          t('What does this show next to “Rice”?', 'តើនេះបង្ហាញអ្វីនៅជាប់ «Rice»?'),
          t('A bullet •', 'ចំណុចគ្រាប់ •'),
          [t('The number 1', 'លេខ 1'), t('Nothing', 'គ្មានអ្វីទេ')],
          html('<ul>\n  <li>Rice</li>\n</ul>'),
        ),
        typeIt(t('Type the tag for a list item.', 'វាយស្លាកសម្រាប់ធាតុបញ្ជី។'), '<li>'),
      ],
      challenge: [
        sortInto(
          t('Bullet list or numbered list?', 'បញ្ជីចំណុចគ្រាប់ ឬបញ្ជីមានលេខ?'),
          [
            ['u', t('<ul> bullets', '<ul> ចំណុចគ្រាប់'), '•'],
            ['o', t('<ol> numbers', '<ol> លេខ'), '1.'],
          ],
          [
            [t('Favourite fruits', 'ផ្លែឈើដែលចូលចិត្ត'), 'u'],
            [t('Club members', 'សមាជិកក្លឹប'), 'u'],
            [t('Things to pack', 'របស់ត្រូវវេចខ្ចប់'), 'u'],
            [t('How to install an app', 'របៀបដំឡើងកម្មវិធី'), 'o'],
            [t('Top 3 winners', 'អ្នកឈ្នះកំពូលទាំង 3'), 'o'],
            [t('Directions to school', 'ផ្លូវទៅសាលា'), 'o'],
          ],
        ),
        order(t('Order the lines of a bullet list.', 'តម្រៀបបន្ទាត់នៃបញ្ជីចំណុចគ្រាប់។'), [
          '<ul>',
          '  <li>Mango</li>',
          '  <li>Banana</li>',
          '</ul>',
        ]),
        mc(
          t('What is wrong?', 'តើមានអ្វីខុស?'),
          t('<li> must be inside <ul> or <ol>', '<li> ត្រូវតែនៅក្នុង <ul> ឬ <ol>'),
          [t('li must be LI', 'li ត្រូវតែជា LI'), t('Nothing', 'គ្មានអ្វីទេ')],
          html('<li>Coffee</li>\n<li>Tea</li>'),
        ),
        mc(
          t('What number is shown next to “Save”?', 'តើលេខអ្វីបង្ហាញនៅជាប់ «Save»?'),
          '3',
          ['1', '2', '•'],
          html('<ol>\n  <li>Open</li>\n  <li>Edit</li>\n  <li>Save</li>\n</ol>'),
        ),
        tf(
          t(
            'Website menus are often built with <ul> and <li>.',
            'ម៉ឺនុយគេហទំព័រជាញឹកញាប់ត្រូវបានបង្កើតជាមួយ <ul> និង <li>។',
          ),
          true,
        ),
        match(t('Match the tag to its meaning.', 'ផ្គូផ្គងស្លាកជាមួយអត្ថន័យ។'), [
          ['<ul>', t('Unordered list', 'បញ្ជីគ្មានលំដាប់')],
          ['<ol>', t('Ordered list', 'បញ្ជីមានលំដាប់')],
          ['<li>', t('List item', 'ធាតុបញ្ជី')],
        ]),
        mc(t('Which is correct?', 'តើមួយណាត្រឹមត្រូវ?'), '<ol><li>A</li><li>B</li></ol>', [
          '<ol><li>A<li>B</ol></li>',
          '<li><ol>A</ol></li>',
          '<ol>A, B</ol>',
        ]),
        buildSentence(t('Build the rule.', 'បង្កើតច្បាប់។'), 'Use ol when the order matters.', {
          say: 'Use ol when the order matters.',
        }),
      ],
      games: [
        catchIt(
          t('Catch the list tags!', 'ចាប់ស្លាកបញ្ជី!'),
          ['<ul>', '<ol>', '<li>'],
          ['<img>', '<a>', '<h1>', '<b>'],
          { speed: 'fast' },
        ),
        memory(t('Match the list to how it looks.', 'ផ្គូផ្គងបញ្ជីជាមួយរបៀបដែលវាមើលទៅ។'), [
          ['<ul>', '• • •'],
          ['<ol>', '1. 2. 3.'],
          ['<li>', t('One item', 'ធាតុមួយ')],
          ['</ul>', t('End of bullets', 'ចប់ចំណុចគ្រាប់')],
        ]),
      ],
      reward: t(
        'Lists keep pages tidy and easy to read. 📋',
        'បញ្ជីធ្វើឱ្យទំព័រមានរបៀប និងងាយអាន។ 📋',
      ),
    },
  ),

  // 7 ─────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'page-structure',
    '🏗️',
    t('The Shape of a Page', 'រូបរាងនៃទំព័រ'),
    t('<!DOCTYPE>, <head>, <body> and page sections.', '<!DOCTYPE>, <head>, <body> និងផ្នែកទំព័រ។'),
    {
      intro: [
        '🏗️',
        t(
          'Every HTML page has the same skeleton. Learn it once, use it forever.',
          'ទំព័រ HTML នីមួយៗមានគ្រោងឆ្អឹងដូចគ្នា។ រៀនម្តង ប្រើជារៀងរហូត។',
        ),
      ],
      learn: [
        [
          '📜',
          '<!DOCTYPE html>',
          t('The first line: “this is an HTML page”.', 'បន្ទាត់ទីមួយ៖ «នេះជាទំព័រ HTML»។'),
        ],
        [
          '🧠',
          '<head>',
          t(
            'Hidden information: the <title> in the tab, settings, links to CSS.',
            'ព័ត៌មានលាក់៖ <title> ក្នុងផ្ទាំង ការកំណត់ តំណទៅ CSS។',
          ),
          'head',
        ],
        [
          '👀',
          '<body>',
          t('Everything you SEE on the page.', 'អ្វីៗទាំងអស់ដែលអ្នកឃើញលើទំព័រ។'),
          'body',
        ],
        [
          '🧩',
          t('Sections', 'ផ្នែក'),
          t(
            '<header>, <nav>, <main>, <footer> name the parts of the page.',
            '<header>, <nav>, <main>, <footer> ដាក់ឈ្មោះផ្នែកនៃទំព័រ។',
          ),
        ],
      ],
      see: [
        '<!DOCTYPE html>\n<html>\n  <head>\n    <title>My Page</title>\n  </head>\n  <body>\n    <h1>Hello!</h1>\n  </body>\n</html>',
        t(
          '“My Page” shows in the browser tab; “Hello!” shows on the page.',
          '«My Page» បង្ហាញក្នុងផ្ទាំងកម្មវិធីរុករក «Hello!» បង្ហាញលើទំព័រ។',
        ),
      ],
      words: [
        ['header', 'ក្បាលទំព័រ'],
        ['footer', 'បាតទំព័រ'],
        ['menu', 'ម៉ឺនុយ', '☰'],
        ['body', 'តួ'],
      ],
      play: [
        mc(
          t('Which part holds what you SEE on the page?', 'តើផ្នែកណាផ្ទុកអ្វីដែលអ្នកឃើញលើទំព័រ?'),
          '<body>',
          ['<head>', '<title>', '<!DOCTYPE>'],
        ),
        mc(t('Where does the <title> go?', 'តើ <title> នៅឯណា?'), '<head>', [
          '<body>',
          '<footer>',
          '<p>',
        ]),
        mc(
          t('Where does the title text appear?', 'តើអត្ថបទ title បង្ហាញនៅឯណា?'),
          t('In the browser tab', 'ក្នុងផ្ទាំងកម្មវិធីរុករក'),
          [t('As a big heading', 'ជាចំណងជើងធំ'), t('At the bottom of the page', 'នៅបាតទំព័រ')],
        ),
        tf(
          t(
            '<!DOCTYPE html> is the first line of a page.',
            '<!DOCTYPE html> គឺជាបន្ទាត់ទីមួយនៃទំព័រ។',
          ),
          true,
        ),
        mc(
          t(
            'Which section holds the copyright at the bottom?',
            'តើផ្នែកណាផ្ទុកសិទ្ធិអ្នកនិពន្ធនៅបាត?',
          ),
          '<footer>',
          ['<header>', '<nav>', '<head>'],
        ),
        mc(t('Which section holds the menu links?', 'តើផ្នែកណាផ្ទុកតំណម៉ឺនុយ?'), '<nav>', [
          '<footer>',
          '<title>',
          '<img>',
        ]),
        tf(
          t('<head> and <header> are the same thing.', '<head> និង <header> គឺជារឿងតែមួយ។'),
          false,
          {
            explanation: t(
              '<head> is hidden info; <header> is the visible top of the page.',
              '<head> ជាព័ត៌មានលាក់ <header> ជាផ្នែកខាងលើដែលមើលឃើញ។',
            ),
          },
        ),
        mc(t('Which holds the main content?', 'តើមួយណាផ្ទុកខ្លឹមសារសំខាន់?'), '<main>', [
          '<nav>',
          '<footer>',
          '<head>',
        ]),
      ],
      challenge: [
        order(t('Order the page skeleton.', 'តម្រៀបគ្រោងឆ្អឹងទំព័រ។'), [
          '<!DOCTYPE html>',
          '<html>',
          '<head>…</head>',
          '<body>…</body>',
          '</html>',
        ]),
        order(
          t('Order the visible sections from top to bottom.', 'តម្រៀបផ្នែកដែលមើលឃើញពីលើចុះក្រោម។'),
          ['<header>', '<nav>', '<main>', '<footer>'],
        ),
        mc(
          t('What shows in the browser tab?', 'តើអ្វីបង្ហាញក្នុងផ្ទាំងកម្មវិធីរុករក?'),
          'Angkor Tours',
          ['Welcome', 'head', 'html'],
          html(
            '<head>\n  <title>Angkor Tours</title>\n</head>\n<body>\n  <h1>Welcome</h1>\n</body>',
          ),
        ),
        sortInto(
          t('<head> or <body>?', '<head> ឬ <body>?'),
          [
            ['h', '<head>', '🧠'],
            ['b', '<body>', '👀'],
          ],
          [
            ['<title>', 'h'],
            [t('Link to style.css', 'តំណទៅ style.css'), 'h'],
            [t('Page language setting', 'ការកំណត់ភាសាទំព័រ'), 'h'],
            ['<h1>', 'b'],
            ['<img>', 'b'],
            ['<footer>', 'b'],
          ],
        ),
        match(t('Match the section to its job.', 'ផ្គូផ្គងផ្នែកជាមួយតួនាទី។'), [
          ['<header>', t('Logo and site name', 'ឡូហ្គោ និងឈ្មោះគេហទំព័រ')],
          ['<nav>', t('Menu links', 'តំណម៉ឺនុយ')],
          ['<main>', t('Main content', 'ខ្លឹមសារសំខាន់')],
          ['<footer>', t('Contact and copyright', 'ទំនាក់ទំនង និងសិទ្ធិ')],
        ]),
        tf(
          t(
            'Named sections help screen readers jump around the page.',
            'ផ្នែកមានឈ្មោះជួយកម្មវិធីអានអេក្រង់លោតជុំវិញទំព័រ។',
          ),
          true,
        ),
        mc(
          t('lang="km" on <html> tells the browser…', 'lang="km" លើ <html> ប្រាប់កម្មវិធីរុករក…'),
          t('the page is in Khmer', 'ទំព័រជាភាសាខ្មែរ'),
          [t('the page is in Kampot', 'ទំព័រនៅកំពត'), t('the page is a map', 'ទំព័រជាផែនទី')],
          html('<html lang="km">'),
        ),
        buildSentence(
          t('Build the rule.', 'បង្កើតច្បាប់។'),
          'You see the body and the head stays hidden.',
          { say: 'You see the body, and the head stays hidden.' },
        ),
      ],
      games: [
        memory(t('Match the section to the part of a house.', 'ផ្គូផ្គងផ្នែកជាមួយផ្នែកនៃផ្ទះ។'), [
          ['<header>', t('Roof and name sign', 'ដំបូល និងស្លាកឈ្មោះ')],
          ['<nav>', t('Hallway', 'ច្រករបៀង')],
          ['<main>', t('Living room', 'បន្ទប់ទទួលភ្ញៀវ')],
          ['<footer>', t('Doorstep', 'កាំជណ្តើរមាត់ទ្វារ')],
        ]),
        catchIt(
          t('Catch the things that go in <head>!', 'ចាប់របស់ដែលនៅក្នុង <head>!'),
          ['<title>', '<meta>', '<link>'],
          ['<h1>', '<p>', '<img>', '<footer>'],
        ),
      ],
      reward: t(
        'You know the skeleton of every web page! 🏗️',
        'អ្នកស្គាល់គ្រោងឆ្អឹងនៃទំព័រវេបគ្រប់ទំព័រ! 🏗️',
      ),
    },
  ),

  // 8 ─────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'forms-and-buttons',
    '📝',
    t('Forms & Buttons', 'ទម្រង់ និងប៊ូតុង'),
    t('Let visitors type, choose and send.', 'អនុញ្ញាតឱ្យអ្នកចូលមើលវាយ ជ្រើសរើស និងផ្ញើ។'),
    {
      intro: [
        '📝',
        t(
          'Sign-up pages, search boxes and quizzes are all forms.',
          'ទំព័រចុះឈ្មោះ ប្រអប់ស្វែងរក និងសំណួរសុទ្ធតែជាទម្រង់។',
        ),
      ],
      learn: [
        [
          '📝',
          '<form>',
          t(
            'Wraps all the boxes that are sent together.',
            'រុំប្រអប់ទាំងអស់ដែលត្រូវផ្ញើជាមួយគ្នា។',
          ),
          'form',
        ],
        [
          '⌨️',
          '<input>',
          t(
            'A box to type in. type="text", "password", "email", "number".',
            'ប្រអប់សម្រាប់វាយ។ type="text", "password", "email", "number"។',
          ),
          'input',
        ],
        [
          '🏷️',
          '<label>',
          t('The words that say what a box is for.', 'ពាក្យដែលប្រាប់ថាប្រអប់សម្រាប់អ្វី។'),
          'label',
        ],
        [
          '🔘',
          '<button>',
          t('A button to click, like “Send”.', 'ប៊ូតុងសម្រាប់ចុច ដូចជា «ផ្ញើ»។'),
          'button',
        ],
      ],
      see: [
        '<form>\n  <label>Name</label>\n  <input type="text">\n  <label>Password</label>\n  <input type="password">\n  <button>Sign up</button>\n</form>',
        t(
          'Password boxes hide what you type as ••••.',
          'ប្រអប់ពាក្យសម្ងាត់លាក់អ្វីដែលអ្នកវាយជា ••••។',
        ),
      ],
      words: [
        ['form', 'ទម្រង់', '📝'],
        ['button', 'ប៊ូតុង', '🔘'],
        ['input', 'ប្រអប់បញ្ចូល'],
        ['submit', 'ដាក់ស្នើ', '📨'],
      ],
      play: [
        mc(
          t('Which tag makes a box you can type in?', 'តើស្លាកណាបង្កើតប្រអប់ដែលអ្នកអាចវាយ?'),
          '<input>',
          ['<box>', '<type>', '<p>'],
        ),
        mc(
          t('Which type hides the letters as dots?', 'តើប្រភេទណាលាក់អក្សរជាចំណុច?'),
          'type="password"',
          ['type="text"', 'type="email"', 'type="hidden-text"'],
        ),
        mc(
          t(
            'Which tag tells the user what a box is for?',
            'តើស្លាកណាប្រាប់អ្នកប្រើថាប្រអប់សម្រាប់អ្វី?',
          ),
          '<label>',
          ['<title>', '<name>', '<li>'],
        ),
        tf(
          t('<button> makes something you can click.', '<button> បង្កើតអ្វីមួយដែលអ្នកអាចចុច។'),
          true,
        ),
        mc(
          t('Which input type is best for an age?', 'តើប្រភេទ input ណាល្អបំផុតសម្រាប់អាយុ?'),
          'type="number"',
          ['type="password"', 'type="email"', 'type="color"'],
        ),
        mc(
          t('Which input type checks for an @ sign?', 'តើប្រភេទ input ណាពិនិត្យសញ្ញា @?'),
          'type="email"',
          ['type="text"', 'type="number"', 'type="date"'],
        ),
        tf(t('Every input should have a label.', 'input នីមួយៗគួរមាន label។'), true, {
          explanation: t(
            'Labels help everyone, especially screen-reader users.',
            'Label ជួយគ្រប់គ្នា ជាពិសេសអ្នកប្រើកម្មវិធីអានអេក្រង់។',
          ),
        }),
        typeIt(
          t('Type the tag name for a clickable button.', 'វាយឈ្មោះស្លាកសម្រាប់ប៊ូតុងដែលអាចចុចបាន។'),
          'button',
          { accept: ['<button>'] },
        ),
      ],
      challenge: [
        match(
          t('Match the input type to what you type.', 'ផ្គូផ្គងប្រភេទ input ជាមួយអ្វីដែលអ្នកវាយ។'),
          [
            ['text', t('Your name', 'ឈ្មោះរបស់អ្នក')],
            ['password', t('A secret', 'អាថ៌កំបាំង')],
            ['email', 'sokha@mail.com'],
            ['date', t('Your birthday', 'ថ្ងៃកំណើតរបស់អ្នក')],
          ],
        ),
        order(t('Order a simple search form.', 'តម្រៀបទម្រង់ស្វែងរកសាមញ្ញ។'), [
          '<form>',
          '<label>Search</label>',
          '<input type="text">',
          '<button>Go</button>',
          '</form>',
        ]),
        mc(
          t('What does “required” do?', 'តើ «required» ធ្វើអ្វី?'),
          t('The form cannot be sent if the box is empty', 'ទម្រង់មិនអាចផ្ញើបានប្រសិនបើប្រអប់ទទេ'),
          [t('Makes the box red', 'ធ្វើឱ្យប្រអប់ក្រហម'), t('Hides the box', 'លាក់ប្រអប់')],
          html('<input type="email" required>'),
        ),
        mc(
          t('What is placeholder text?', 'តើអត្ថបទ placeholder ជាអ្វី?'),
          t('Grey example text inside an empty box', 'អត្ថបទឧទាហរណ៍ពណ៌ប្រផេះក្នុងប្រអប់ទទេ'),
          [t('The button colour', 'ពណ៌ប៊ូតុង'), t('The page title', 'ចំណងជើងទំព័រ')],
          html('<input placeholder="e.g. Dara">'),
        ),
        tf(
          t(
            'A website should never show your password in the address bar.',
            'គេហទំព័រមិនគួរបង្ហាញពាក្យសម្ងាត់របស់អ្នកក្នុងរបារអាសយដ្ឋានឡើយ។',
          ),
          true,
        ),
        sortInto(
          t('Good form or confusing form?', 'ទម្រង់ល្អ ឬទម្រង់ច្របូកច្របល់?'),
          [
            ['g', t('Good', 'ល្អ'), '👍'],
            ['b', t('Confusing', 'ច្របូកច្របល់'), '😕'],
          ],
          [
            [t('Every box has a label', 'ប្រអប់នីមួយៗមាន label'), 'g'],
            [t('A clear “Sign up” button', 'ប៊ូតុង «ចុះឈ្មោះ» ច្បាស់'), 'g'],
            [t('Friendly error messages', 'សារកំហុសរួសរាយ'), 'g'],
            [t('Boxes with no labels', 'ប្រអប់គ្មាន label'), 'b'],
            [t('A button that just says “OK?”', 'ប៊ូតុងដែលនិយាយតែ «OK?»'), 'b'],
            [t('Asking for 30 things', 'សួរ 30 រឿង'), 'b'],
          ],
        ),
        mc(
          t(
            'Which input lets you pick ONE of many choices?',
            'តើ input ណាអនុញ្ញាតឱ្យអ្នកជ្រើសរើសមួយក្នុងចំណោមជម្រើសច្រើន?',
          ),
          'type="radio"',
          ['type="password"', 'type="text"', 'type="email"'],
        ),
        buildSentence(t('Build the rule.', 'បង្កើតច្បាប់។'), 'Give every box a clear label.', {
          say: 'Give every box a clear label.',
        }),
      ],
      games: [
        memory(t('Match the input type to its picture.', 'ផ្គូផ្គងប្រភេទ input ជាមួយរូបភាព។'), [
          ['password', '🔒'],
          ['email', '📧'],
          ['date', '📅'],
          ['color', '🎨'],
        ]),
        catchIt(
          t('Catch the form parts!', 'ចាប់ផ្នែកទម្រង់!'),
          ['<form>', '<input>', '<label>', '<button>'],
          ['<h1>', '<img>', '<ol>', '<footer>'],
          { speed: 'normal' },
        ),
      ],
      reward: t(
        'Now your pages can listen to visitors. 📝 HTML done — next, CSS!',
        'ឥឡូវទំព័ររបស់អ្នកអាចស្តាប់អ្នកចូលមើល។ 📝 HTML រួចរាល់ — បន្ទាប់ CSS!',
      ),
    },
  ),
];
