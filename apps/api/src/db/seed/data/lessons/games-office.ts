import { t } from '../../types';
import { buildSentence, catchIt, game, memory, robot, typeIt } from '../dsl';

// 🎮 Game rounds for Office Creator, by lesson slug. Khmer (km) strings are DRAFTS.
export const OFFICE_GAMES = {
  'what-is-a-document': game(
    catchIt(
      t('Catch the things you can make in Word!', 'ចាប់អ្វីដែលអ្នកអាចបង្កើតក្នុង Word!'),
      [
        t('Letter', 'លិខិត'),
        'CV',
        t('Report', 'របាយការណ៍'),
        t('Poster', 'ផ្ទាំងរូបភាព'),
        t('Homework', 'កិច្ចការផ្ទះ'),
      ],
      [
        t('Video', 'វីដេអូ'),
        t('Song', 'ចម្រៀង'),
        t('Phone call', 'ការហៅទូរស័ព្ទ'),
        t('Photo filter', 'តម្រងរូបថត'),
      ],
    ),
    memory(t('Match each app to what it makes.', 'ផ្គូផ្គងកម្មវិធីនីមួយៗជាមួយអ្វីដែលវាបង្កើត។'), [
      ['Word', t('Documents', 'ឯកសារ')],
      ['Excel', t('Spreadsheets', 'តារាងលេខ')],
      ['PowerPoint', t('Presentations', 'បទបង្ហាញ')],
      ['Google Docs', t('Documents online', 'ឯកសារលើអ៊ីនធឺណិត')],
    ]),
  ),
  'typing-and-editing': game(
    memory(
      t(
        'Match each key to what it does in a document.',
        'ផ្គូផ្គងគ្រាប់ចុចនីមួយៗជាមួយអ្វីដែលវាធ្វើក្នុងឯកសារ។',
      ),
      [
        ['Backspace', t('Delete to the left', 'លុបទៅខាងឆ្វេង')],
        ['Delete', t('Delete to the right', 'លុបទៅខាងស្តាំ')],
        ['Enter', t('New paragraph', 'កថាខណ្ឌថ្មី')],
        ['Ctrl + Z', t('Undo a mistake', 'លុបចោលកំហុស')],
      ],
    ),
    typeIt(
      t(
        'Type the name of our capital city: Phnom Penh',
        'វាយឈ្មោះរាជធានីរបស់យើងជាអក្សរឡាតាំង៖ Phnom Penh',
      ),
      'Phnom Penh',
    ),
  ),
  'format-your-text': game(
    memory(t('Match each button to its name.', 'ផ្គូផ្គងប៊ូតុងនីមួយៗជាមួយឈ្មោះ។'), [
      ['B', t('Bold', 'អក្សរដិត')],
      ['I', t('Italic', 'អក្សរទ្រេត')],
      ['U', t('Underline', 'គូសបន្ទាត់ក្រោម')],
      ['≡', t('Align centre', 'តម្រឹមកណ្តាល')],
    ]),
    catchIt(
      t('Catch the FORMATTING tools!', 'ចាប់ឧបករណ៍ធ្វើទ្រង់ទ្រាយ!'),
      [
        t('Bold', 'អក្សរដិត'),
        t('Italic', 'អក្សរទ្រេត'),
        t('Font size', 'ទំហំអក្សរ'),
        t('Colour', 'ពណ៌'),
        t('Align centre', 'តម្រឹមកណ្តាល'),
      ],
      [t('Print', 'បោះពុម្ព'), t('Save', 'រក្សាទុក'), 'Wi-Fi', t('Volume', 'កម្រិតសំឡេង')],
    ),
  ),
  'lists-and-paragraphs': game(
    memory(t('Match each word to its meaning.', 'ផ្គូផ្គងពាក្យនីមួយៗជាមួយអត្ថន័យ។'), [
      [t('• Bullets', '• ចំណុច'), t('A list without numbers', 'បញ្ជីគ្មានលេខ')],
      ['1. 2. 3.', t('A numbered list', 'បញ្ជីមានលេខ')],
      [t('Paragraph', 'កថាខណ្ឌ'), t('Sentences about one idea', 'ប្រយោគអំពីគំនិតមួយ')],
      [t('Indent', 'ចូលបន្ទាត់'), t('Move text to the right', 'រុញអត្ថបទទៅស្តាំ')],
    ]),
    buildSentence(
      t('Put the words in order.', 'តម្រៀបពាក្យឱ្យត្រូវលំដាប់។'),
      'A new paragraph starts on a new line.',
      { say: 'A new paragraph starts on a new line.' },
    ),
  ),
  'pictures-and-tables': game(
    memory(t('Match each tool to what it does.', 'ផ្គូផ្គងឧបករណ៍នីមួយៗជាមួយអ្វីដែលវាធ្វើ។'), [
      [['🖼️', t('Insert picture', 'បញ្ចូលរូបភាព')], t('Add a photo', 'បន្ថែមរូបថត')],
      [['▦', t('Table', 'តារាង')], t('Rows and columns', 'ជួរដេក និងជួរឈរ')],
      [t('Caption', 'ចំណងជើងរូប'), t('Text under a picture', 'អត្ថបទក្រោមរូបភាព')],
      [t('Column', 'ជួរឈរ'), t('Goes up and down', 'ទៅលើ និងចុះក្រោម')],
    ]),
    catchIt(
      t('Catch the things that fit well in a TABLE!', 'ចាប់អ្វីដែលសមនឹងដាក់ក្នុងតារាង!'),
      [
        t('Class timetable', 'កាលវិភាគថ្នាក់'),
        t('Price list', 'បញ្ជីតម្លៃ'),
        t('Exam scores', 'ពិន្ទុប្រឡង'),
        t('Phone numbers', 'លេខទូរស័ព្ទ'),
      ],
      [
        t('A short poem', 'កំណាព្យខ្លី'),
        t('A photo of a cat', 'រូបឆ្មា'),
        t('A title', 'ចំណងជើង'),
        t('One sentence', 'ប្រយោគមួយ'),
      ],
      { speed: 'slow' },
    ),
  ),
  'my-profile': game(
    buildSentence(
      t('Build the first line of a profile.', 'បង្កើតបន្ទាត់ដំបូងនៃប្រវត្តិរូប។'),
      'My name is Dara and I like computers.',
      { say: 'My name is Dara and I like computers.' },
    ),
    memory(
      t(
        'Match each profile heading to an example.',
        'ផ្គូផ្គងចំណងជើងប្រវត្តិរូបនីមួយៗជាមួយឧទាហរណ៍។',
      ),
      [
        [t('Name', 'ឈ្មោះ'), 'Sokha'],
        [t('Hobby', 'ចំណូលចិត្ត'), t('Football', 'បាល់ទាត់')],
        [t('Skill', 'ជំនាញ'), t('Typing', 'ការវាយ')],
        [t('Dream job', 'ការងារក្នុងក្តីស្រមៃ'), t('Web developer', 'អ្នកបង្កើតវេបសាយ')],
      ],
    ),
  ),
  'save-and-print': game(
    memory(t('Match each word to its meaning.', 'ផ្គូផ្គងពាក្យនីមួយៗជាមួយអត្ថន័យ។'), [
      [t('Save', 'រក្សាទុក'), t('Keep your work', 'រក្សាការងាររបស់អ្នក')],
      [t('Save as', 'រក្សាទុកជា'), t('A copy with a new name', 'ច្បាប់ចម្លងឈ្មោះថ្មី')],
      ['PDF', t('Looks the same everywhere', 'មើលទៅដូចគ្នាគ្រប់ទីកន្លែង')],
      [
        t('Print preview', 'មើលមុនបោះពុម្ព'),
        t('See the page before printing', 'មើលទំព័រមុនបោះពុម្ព'),
      ],
    ]),
    catchIt(
      t(
        'Catch the actions that keep your work SAFE!',
        'ចាប់សកម្មភាពដែលរក្សាការងាររបស់អ្នកឱ្យមានសុវត្ថិភាព!',
      ),
      [
        'Ctrl + S',
        t('Save to the cloud', 'រក្សាទុកលើពពក'),
        t('Backup on USB', 'ចម្លងទុកក្នុង USB'),
        t('AutoSave on', 'បើកការរក្សាទុកស្វ័យប្រវត្តិ'),
      ],
      [
        t('Close without saving', 'បិទដោយមិនរក្សាទុក'),
        t('Delete the file', 'លុបឯកសារ'),
        t('Pull out the plug', 'ដកខ្សែភ្លើង'),
        'Ctrl + P',
      ],
    ),
  ),
  'what-is-a-spreadsheet': game(
    memory(
      t('Match each spreadsheet word to its meaning.', 'ផ្គូផ្គងពាក្យតារាងលេខនីមួយៗជាមួយអត្ថន័យ។'),
      [
        [t('Row', 'ជួរដេក'), t('Goes across: 1, 2, 3', 'ទៅទទឹង៖ 1, 2, 3')],
        [t('Column', 'ជួរឈរ'), t('Goes down: A, B, C', 'ចុះក្រោម៖ A, B, C')],
        [t('Cell', 'ក្រឡា'), t('One box, like B2', 'ប្រអប់មួយ ដូចជា B2')],
        [t('Sheet', 'សន្លឹក'), t('One page of a workbook', 'ទំព័រមួយនៃសៀវភៅការងារ')],
      ],
    ),
    catchIt(
      t('Catch the good jobs for a spreadsheet!', 'ចាប់ការងារល្អសម្រាប់តារាងលេខ!'),
      [
        t('Class marks', 'ពិន្ទុថ្នាក់'),
        t('Shop sales', 'ការលក់ក្នុងហាង'),
        t('Monthly budget', 'ថវិកាប្រចាំខែ'),
        t('Football scores', 'ពិន្ទុបាល់ទាត់'),
      ],
      [
        t('Writing a story', 'សរសេររឿង'),
        t('Recording a song', 'ថតចម្រៀង'),
        t('Sending a chat', 'ផ្ញើសារ'),
        t('Drawing a cat', 'គូររូបឆ្មា'),
      ],
    ),
  ),
  'cells-and-addresses': game(
    robot(
      t(
        'The robot is in cell A1 (top left). Move it to cell C3 (column C, row 3).',
        'រ៉ូបូតនៅក្រឡា A1 (ខាងលើឆ្វេង)។ ផ្លាស់វាទៅក្រឡា C3 (ជួរឈរ C ជួរដេក 3)។',
      ),
      ['S...', '....', '..G.', '....'],
      {
        goalIcon: '🎯',
        hint: t('C is the third column; 3 is the third row.', 'C ជាជួរឈរទីបី ហើយ 3 ជាជួរដេកទីបី។'),
      },
    ),
    robot(
      t('Visit cell B2 ⭐, then go to cell D4.', 'ទៅក្រឡា B2 ⭐ រួចទៅក្រឡា D4។'),
      ['S...', '.*..', '....', '...G'],
      { goalIcon: '🎯' },
    ),
  ),
  'sum-and-average': game(
    memory(t('Match each formula to its answer.', 'ផ្គូផ្គងរូបមន្តនីមួយៗជាមួយចម្លើយ។'), [
      ['=SUM(2,3,5)', '10'],
      ['=AVERAGE(2,4,6)', '4'],
      ['=MAX(3,9,4)', '9'],
      ['=MIN(3,9,4)', '3'],
    ]),
    catchIt(
      t('Catch the real FORMULAS (they start with =)!', 'ចាប់រូបមន្តពិត (ចាប់ផ្តើមដោយ =)!'),
      ['=SUM(A1:A5)', '=A1+B1', '=AVERAGE(B2:B9)', '=MAX(C1:C4)'],
      ['SUM', 'Total:', 'A1+B1', '100'],
    ),
  ),
  'sort-and-charts': game(
    memory(
      t('Match each chart to its best use.', 'ផ្គូផ្គងគំនូសតាងនីមួយៗជាមួយការប្រើប្រាស់ល្អបំផុត។'),
      [
        [['📊', t('Bar chart', 'គំនូសតាងរបារ')], t('Compare amounts', 'ប្រៀបធៀបចំនួន')],
        [['🥧', t('Pie chart', 'គំនូសតាងចំណិត')], t('Parts of a whole', 'ផ្នែកនៃទាំងមូល')],
        [['📈', t('Line chart', 'គំនូសតាងបន្ទាត់')], t('Change over time', 'ការប្រែប្រួលតាមពេល')],
        ['A → Z', t('Sort alphabetically', 'តម្រៀបតាមអក្សរ')],
      ],
    ),
    catchIt(
      t(
        'Catch the data that changes over TIME (good for a line chart)!',
        'ចាប់ទិន្នន័យដែលប្រែប្រួលតាមពេល (ល្អសម្រាប់គំនូសតាងបន្ទាត់)!',
      ),
      [
        t('Temperature each day', 'សីតុណ្ហភាពរាល់ថ្ងៃ'),
        t('Savings each month', 'ការសន្សំរាល់ខែ'),
        t('Height each year', 'កម្ពស់រាល់ឆ្នាំ'),
        t('Battery each hour', 'ថ្មរាល់ម៉ោង'),
      ],
      [
        t('Favourite colours', 'ពណ៌ដែលចូលចិត្ត'),
        t('Types of pets', 'ប្រភេទសត្វចិញ្ចឹម'),
        t('Students per class', 'សិស្សក្នុងថ្នាក់នីមួយៗ'),
      ],
      { speed: 'slow' },
    ),
  ),
  'my-weekly-budget': game(
    memory(t('Match each money word to its meaning.', 'ផ្គូផ្គងពាក្យលុយនីមួយៗជាមួយអត្ថន័យ។'), [
      [t('Income', 'ចំណូល'), t('Money you get', 'លុយដែលអ្នកទទួល')],
      [t('Expense', 'ចំណាយ'), t('Money you spend', 'លុយដែលអ្នកចាយ')],
      [t('Saving', 'ការសន្សំ'), t('Money you keep', 'លុយដែលអ្នករក្សាទុក')],
      [t('Budget', 'ថវិកា'), t('A plan for your money', 'ផែនការសម្រាប់លុយរបស់អ្នក')],
    ]),
    catchIt(
      t('Catch the NEEDS (not wants)!', 'ចាប់តម្រូវការចាំបាច់ (មិនមែនចំណង់)!'),
      [
        ['🍚', t('Rice', 'អង្ករ')],
        ['💧', t('Water', 'ទឹក')],
        ['🚌', t('Bus to school', 'ឡានក្រុងទៅសាលា')],
        ['📚', t('School books', 'សៀវភៅសាលា')],
      ],
      [
        ['🎮', t('New game', 'ហ្គេមថ្មី')],
        ['🍦', t('Ice cream', 'ការ៉េម')],
        ['🧸', t('Toy', 'តុក្កតា')],
        ['👟', t('Fancy shoes', 'ស្បែកជើងម៉ូដ')],
      ],
    ),
  ),
  'presentation-basics': game(
    memory(t('Match each word to its meaning.', 'ផ្គូផ្គងពាក្យនីមួយៗជាមួយអត្ថន័យ។'), [
      [t('Slide', 'ស្លាយ'), t('One page of a presentation', 'ទំព័រមួយនៃបទបង្ហាញ')],
      [t('Title', 'ចំណងជើង'), t('The big heading', 'ចំណងជើងធំ')],
      [t('Transition', 'ការផ្លាស់ប្តូរស្លាយ'), t('Effect between slides', 'បែបផែនរវាងស្លាយ')],
      [
        t('Speaker notes', 'កំណត់ចំណាំអ្នកនិយាយ'),
        t('Notes only you see', 'កំណត់ចំណាំដែលមានតែអ្នកឃើញ'),
      ],
    ]),
    catchIt(
      t('Catch the GOOD slide tips!', 'ចាប់គន្លឹះស្លាយល្អ!'),
      [
        t('Big text', 'អក្សរធំ'),
        t('Few words', 'ពាក្យតិច'),
        t('One idea per slide', 'គំនិតមួយក្នុងមួយស្លាយ'),
        t('Clear pictures', 'រូបភាពច្បាស់'),
      ],
      [
        t('Tiny text', 'អក្សរតូចពេក'),
        t('Ten colours', 'ពណ៌ដប់'),
        t('Long paragraphs', 'កថាខណ្ឌវែង'),
        t('Noisy animations', 'ចលនារំខាន'),
      ],
    ),
  ),
  'my-dream-presentation': game(
    buildSentence(
      t('Build the title of your last slide.', 'បង្កើតចំណងជើងស្លាយចុងក្រោយរបស់អ្នក។'),
      'My dream is to become a programmer.',
      { say: 'My dream is to become a programmer.', extra: ['teacher'] },
    ),
    catchIt(
      t(
        'Catch the good steps for a “My plan” slide!',
        'ចាប់ជំហានល្អសម្រាប់ស្លាយ «ផែនការរបស់ខ្ញុំ»!',
      ),
      [
        t('Study English', 'រៀនភាសាអង់គ្លេស'),
        t('Practise typing', 'ហាត់វាយ'),
        t('Learn to code', 'រៀនសរសេរកូដ'),
        t('Finish school', 'រៀនចប់'),
      ],
      [
        t('Give up', 'បោះបង់'),
        t('Sleep all day', 'គេងពេញមួយថ្ងៃ'),
        t('Copy a friend', 'ចម្លងមិត្ត'),
      ],
    ),
  ),
  'sharing-documents': game(
    memory(
      t('Match each sharing word to its meaning.', 'ផ្គូផ្គងពាក្យចែករំលែកនីមួយៗជាមួយអត្ថន័យ។'),
      [
        [t('Share link', 'តំណចែករំលែក'), t('Others can open the file', 'អ្នកផ្សេងអាចបើកឯកសារ')],
        [t('Can view', 'អាចមើល'), t('Read only', 'អានប៉ុណ្ណោះ')],
        [t('Can edit', 'អាចកែ'), t('Others can change it', 'អ្នកផ្សេងអាចកែវា')],
        [t('Comment', 'មតិយោបល់'), t('A note without changing text', 'កំណត់ចំណាំដោយមិនកែអត្ថបទ')],
      ],
    ),
    catchIt(
      t(
        'Catch the SAFE ways to share your homework!',
        'ចាប់វិធីចែករំលែកកិច្ចការផ្ទះដោយសុវត្ថិភាព!',
      ),
      [
        t('Share with your teacher only', 'ចែករំលែកជាមួយគ្រូប៉ុណ្ណោះ'),
        t('Send it to your class group', 'ផ្ញើទៅក្រុមថ្នាក់'),
        t('Email it to your teacher', 'ផ្ញើអ៊ីមែលទៅគ្រូ'),
      ],
      [
        t('Post it with your password', 'បង្ហោះជាមួយពាក្យសម្ងាត់'),
        t('Share with strangers', 'ចែករំលែកជាមួយមនុស្សចម្លែក'),
        t('Public link with your address', 'តំណសាធារណៈជាមួយអាសយដ្ឋាន'),
      ],
      { speed: 'slow' },
    ),
  ),
};
