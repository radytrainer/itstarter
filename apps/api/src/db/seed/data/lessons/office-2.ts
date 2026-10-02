import { t, type LessonSeed } from '../../types';
import {
  cell,
  creation,
  gridData,
  intro,
  learn,
  lesson,
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
import { OFFICE_WORLD as W } from './office-1';

// 📄 Office Creator, lessons 8–15: spreadsheets, presentations and sharing.
// Khmer (km) strings are DRAFTS for native review.

const BUDGET = [
  ['Item', 'Cost ($)'],
  ['Food', 2],
  ['Transport', 1],
  ['Phone', 1],
  ['Other', 2],
];

const SCORES = [
  ['Name', 'Maths', 'English'],
  ['Sokha', 8, 7],
  ['Dara', 6, 9],
  ['Vanna', 10, 8],
];

const SALES = [
  ['Day', 'Mangoes sold'],
  ['Mon', 12],
  ['Tue', 20],
  ['Wed', 8],
  ['Thu', 15],
  ['Fri', 25],
];

export const OFFICE_LESSONS_2: LessonSeed[] = [
  lesson(
    W,
    'what-is-a-spreadsheet',
    '📊',
    t('What is a Spreadsheet?', 'តើសៀវភៅបញ្ជីជាអ្វី?'),
    t('Rows, columns, cells — and your first total.', 'ជួរដេក ជួរឈរ ក្រឡា — និងសរុបដំបូងរបស់អ្នក។'),
    9,
    [
      intro(
        '📊',
        t(
          'A spreadsheet is a smart table. It can even do maths for you!',
          'សៀវភៅបញ្ជីគឺជាតារាងឆ្លាតវៃ។ វាអាចគណនាឱ្យអ្នកផងដែរ!',
        ),
      ),
      learn(
        [
          '➡️',
          t('Row', 'ជួរដេក'),
          t(
            'Goes across, left to right. Rows have numbers: 1, 2, 3…',
            'ទៅទទឹង ពីឆ្វេងទៅស្តាំ។ ជួរដេកមានលេខ៖ 1, 2, 3…',
          ),
        ],
        [
          '⬇️',
          t('Column', 'ជួរឈរ'),
          t(
            'Goes down, top to bottom. Columns have letters: A, B, C…',
            'ចុះក្រោម ពីលើទៅក្រោម។ ជួរឈរមានអក្សរ៖ A, B, C…',
          ),
        ],
        [
          '🔲',
          t('Cell', 'ក្រឡា'),
          t('One box where a row and a column meet.', 'ប្រអប់មួយដែលជួរដេក និងជួរឈរជួបគ្នា។'),
        ],
        [
          '📍',
          t('Cell address', 'អាសយដ្ឋានក្រឡា'),
          t(
            'Column letter + row number. B2 = column B, row 2.',
            'អក្សរជួរឈរ + លេខជួរដេក។ B2 = ជួរឈរ B ជួរដេក 2។',
          ),
        ],
      ),
      see(
        'B2: 2 · B3: 1 · B4: 1 · B5: 2 → =SUM(B2:B5) = 6',
        t('SUM adds every number from B2 to B5.', 'SUM បូកលេខទាំងអស់ពី B2 ដល់ B5។'),
      ),
      revealPlay(
        'true_false',
        tf(t('A row goes across, from left to right.', 'ជួរដេកទៅទទឹង ពីឆ្វេងទៅស្តាំ។'), true, {
          explanation: t('Rows go across. Columns go down.', 'ជួរដេកទៅទទឹង។ ជួរឈរចុះក្រោម។'),
        }),
        tf(t('A1 means row A, column 1.', 'A1 មានន័យថាជួរដេក A ជួរឈរ 1។'), false, {
          explanation: t(
            'A1 means column A, row 1. The letter is the column.',
            'A1 មានន័យថាជួរឈរ A ជួរដេក 1។ អក្សរគឺជាជួរឈរ។',
          ),
        }),
        mc(t('Which app is a spreadsheet?', 'តើកម្មវិធីណាជាសៀវភៅបញ្ជី?'), 'Excel', [
          'Word',
          'Paint',
        ]),
        mc(
          t(
            'A free spreadsheet app in the browser is…',
            'កម្មវិធីសៀវភៅបញ្ជីឥតគិតថ្លៃក្នុងកម្មវិធីរុករក គឺ…',
          ),
          'Google Sheets',
          ['Google Maps', 'Gmail'],
        ),
        mc(t('Columns are named with…', 'ជួរឈរត្រូវដាក់ឈ្មោះដោយ…'), t('Letters', 'អក្សរ'), [
          t('Numbers', 'លេខ'),
          t('Colours', 'ពណ៌'),
        ]),
        mc(t('Rows are named with…', 'ជួរដេកត្រូវដាក់ឈ្មោះដោយ…'), t('Numbers', 'លេខ'), [
          t('Letters', 'អក្សរ'),
          t('Emojis', 'រូបអារម្មណ៍'),
        ]),
        mc(
          t('Which job is best for a spreadsheet?', 'តើការងារណាល្អបំផុតសម្រាប់សៀវភៅបញ្ជី?'),
          t('A class budget with totals', 'ថវិកាថ្នាក់ដែលមានសរុប'),
          [t('A love letter', 'សំបុត្រស្នេហា'), t('A slideshow', 'ការបញ្ចាំងស្លាយ')],
        ),
        tf(
          t(
            'A spreadsheet file can have more than one sheet (tabs at the bottom).',
            'ឯកសារសៀវភៅបញ្ជីអាចមានច្រើនជាងមួយសន្លឹក (ផ្ទាំងនៅខាងក្រោម)។',
          ),
          true,
        ),
      ),
      revealChallenge(
        'number_input',
        num(
          t(
            'Food $2, Transport $1, Phone $1, Other $2. What is the total (in dollars)?',
            'អាហារ $2 ការធ្វើដំណើរ $1 ទូរស័ព្ទ $1 ផ្សេងៗ $2។ តើសរុបប៉ុន្មានដុល្លារ?',
          ),
          6,
          {
            data: gridData(BUDGET),
            explanation: t(
              '2 + 1 + 1 + 2 = 6. In a spreadsheet: =SUM(B2:B5).',
              '2 + 1 + 1 + 2 = 6។ ក្នុងសៀវភៅបញ្ជី៖ =SUM(B2:B5)។',
            ),
          },
        ),
        num(
          t(
            'A sheet has 4 columns (A–D) and 10 rows. How many cells?',
            'សន្លឹកមួយមាន 4 ជួរឈរ (A–D) និង 10 ជួរដេក។ តើមានក្រឡាប៉ុន្មាន?',
          ),
          40,
        ),
        mc(t('Which cell is to the right of B2?', 'តើក្រឡាណានៅខាងស្តាំ B2?'), 'C2', [
          'B3',
          'A2',
          'C3',
        ]),
        mc(t('Which cell is below B2?', 'តើក្រឡាណានៅខាងក្រោម B2?'), 'B3', ['C2', 'B1', 'A3']),
        mc(t('Every formula starts with…', 'រូបមន្តគ្រប់មួយចាប់ផ្តើមដោយ…'), '=', ['+', '#', '?']),
        tf(
          t(
            'When you change a number, a formula total updates by itself.',
            'ពេលអ្នកប្តូរលេខ សរុបរូបមន្តធ្វើបច្ចុប្បន្នភាពដោយខ្លួនឯង។',
          ),
          true,
          {
            explanation: t(
              'That is why spreadsheets are so useful.',
              'នោះហើយជាមូលហេតុដែលសៀវភៅបញ្ជីមានប្រយោជន៍ខ្លាំង។',
            ),
          },
        ),
        mc(t('An Excel file usually ends with…', 'ឯកសារ Excel ជាធម្មតាបញ្ចប់ដោយ…'), '.xlsx', [
          '.docx',
          '.pptx',
        ]),
        mc(
          t('The top row of a table often holds…', 'ជួរដេកខាងលើនៃតារាង ច្រើនតែផ្ទុក…'),
          t('Headings like “Item” and “Cost”', 'ចំណងជើងដូចជា “Item” និង “Cost”'),
          [t('The total', 'សរុប'), t('Nothing', 'គ្មានអ្វីទេ')],
        ),
      ),
      reward(
        t(
          'You made your first spreadsheet total! 📊',
          'អ្នកបានធ្វើសរុបសៀវភៅបញ្ជីដំបូងរបស់អ្នក! 📊',
        ),
      ),
    ],
  ),

  lesson(
    W,
    'cells-and-addresses',
    '🔲',
    t('Cells & Addresses', 'ក្រឡា និងអាសយដ្ឋាន'),
    t('Find any cell in a sheet.', 'រកក្រឡាណាមួយក្នុងសន្លឹក។'),
    9,
    [
      intro(
        '🔲',
        t(
          'Every cell has an address, like a house on a street.',
          'ក្រឡានីមួយៗមានអាសយដ្ឋាន ដូចផ្ទះនៅលើផ្លូវ។',
        ),
      ),
      learn(
        [
          '🔤',
          t('Letter first', 'អក្សរមុន'),
          t('The column letter comes first: C3 → column C.', 'អក្សរជួរឈរមកមុន៖ C3 → ជួរឈរ C។'),
        ],
        [
          '🔢',
          t('Then the number', 'រួចលេខ'),
          t('Then the row number: C3 → row 3.', 'រួចលេខជួរដេក៖ C3 → ជួរដេក 3។'),
        ],
        [
          '📦',
          t('Ranges', 'ចន្លោះក្រឡា'),
          t('B2:B5 means every cell from B2 to B5.', 'B2:B5 មានន័យថាក្រឡាទាំងអស់ពី B2 ដល់ B5។'),
        ],
      ),
      see(
        t('A1 is always the top-left cell.', 'A1 តែងតែជាក្រឡាលើឆ្វេង។'),
        t(
          'Start at A1 and count: across for letters, down for numbers.',
          'ចាប់ផ្តើមពី A1 ហើយរាប់៖ ទទឹងសម្រាប់អក្សរ ចុះក្រោមសម្រាប់លេខ។',
        ),
      ),
      revealPlay(
        'spreadsheet_sim',
        cell(
          t('Tap the cell that says “Transport”.', 'ចុចក្រឡាដែលសរសេរថា “Transport”។'),
          'A3',
          gridData(BUDGET),
          { hint: t('Look in column A.', 'មើលក្នុងជួរឈរ A។') },
        ),
        cell(t('Tap cell B4.', 'ចុចក្រឡា B4។'), 'B4', gridData(BUDGET)),
        cell(t('Tap cell A1.', 'ចុចក្រឡា A1។'), 'A1', gridData(BUDGET)),
        cell(t('Tap the cost of “Other”.', 'ចុចតម្លៃរបស់ “Other”។'), 'B5', gridData(BUDGET)),
        cell(t('Tap cell C4.', 'ចុចក្រឡា C4។'), 'C4', gridData(SCORES)),
        cell(
          t('Tap the cell with Vanna’s name.', 'ចុចក្រឡាដែលមានឈ្មោះ Vanna។'),
          'A4',
          gridData(SCORES),
        ),
        mc(
          t('In this sheet, what is in cell B2?', 'ក្នុងសន្លឹកនេះ តើមានអ្វីក្នុងក្រឡា B2?'),
          '8',
          ['Sokha', '7', 'Maths'],
          { data: gridData(SCORES) },
        ),
        mc(
          t('In this sheet, what is in cell C1?', 'ក្នុងសន្លឹកនេះ តើមានអ្វីក្នុងក្រឡា C1?'),
          'English',
          ['Maths', '7', 'Name'],
          { data: gridData(SCORES) },
        ),
      ),
      revealChallenge(
        'spreadsheet_sim',
        cell(
          t('Tap the cell with Dara’s English score.', 'ចុចក្រឡាដែលមានពិន្ទុអង់គ្លេសរបស់ Dara។'),
          'C3',
          gridData(SCORES),
          {
            explanation: t(
              'Dara is in row 3 and English is column C: C3.',
              'Dara នៅជួរដេក 3 ហើយអង់គ្លេសនៅជួរឈរ C៖ C3។',
            ),
          },
        ),
        cell(
          t('Tap the highest Maths score.', 'ចុចពិន្ទុគណិតវិទ្យាខ្ពស់បំផុត។'),
          'B4',
          gridData(SCORES),
        ),
        cell(
          t('Tap the day with the most mangoes sold.', 'ចុចថ្ងៃដែលលក់ស្វាយបានច្រើនជាងគេ។'),
          'A6',
          gridData(SALES),
        ),
        num(t('How many cells are in the range B2:B5?', 'តើមានក្រឡាប៉ុន្មានក្នុងចន្លោះ B2:B5?'), 4),
        num(
          t('How many cells are in the range A1:C2?', 'តើមានក្រឡាប៉ុន្មានក្នុងចន្លោះ A1:C2?'),
          6,
          {
            explanation: t(
              '3 columns (A, B, C) × 2 rows = 6.',
              '3 ជួរឈរ (A, B, C) × 2 ជួរដេក = 6។',
            ),
          },
        ),
        mc(
          t('What is in A3 of the mango sheet?', 'តើមានអ្វីក្នុង A3 នៃសន្លឹកស្វាយ?'),
          'Tue',
          ['Mon', '20', 'Wed'],
          { data: gridData(SALES) },
        ),
        mc(t('Which address is written correctly?', 'តើអាសយដ្ឋានណាសរសេរត្រឹមត្រូវ?'), 'D7', [
          '7D',
          'D-7',
          '77',
        ]),
        tf(
          t(
            'The address of the selected cell is shown in the Name Box, left of the formula bar.',
            'អាសយដ្ឋានក្រឡាដែលបានជ្រើសរើសបង្ហាញក្នុងប្រអប់ឈ្មោះ នៅខាងឆ្វេងរបាររូបមន្ត។',
          ),
          true,
        ),
      ),
      reward(t('You can find any cell! 📍', 'អ្នកអាចរកក្រឡាណាមួយបាន! 📍')),
    ],
  ),

  lesson(
    W,
    'sum-and-average',
    '🧮',
    t('SUM & AVERAGE', 'SUM និង AVERAGE'),
    t('Let the spreadsheet do the maths.', 'ទុកឱ្យសៀវភៅបញ្ជីគណនា។'),
    10,
    [
      intro(
        '🧮',
        t(
          'Formulas do the maths for you. They always start with =.',
          'រូបមន្តគណនាឱ្យអ្នក។ វាតែងតែចាប់ផ្តើមដោយ =។',
        ),
      ),
      learn(
        [
          '➕',
          '=SUM()',
          t(
            '=SUM(B2:B5) adds all numbers from B2 to B5.',
            '=SUM(B2:B5) បូកលេខទាំងអស់ពី B2 ដល់ B5។',
          ),
        ],
        [
          '⚖️',
          '=AVERAGE()',
          t('Adds them, then divides by how many there are.', 'បូកវា រួចចែកនឹងចំនួនរបស់វា។'),
        ],
        [
          '⬆️',
          '=MAX() · =MIN()',
          t('The biggest and the smallest number.', 'លេខធំបំផុត និងលេខតូចបំផុត។'),
        ],
      ),
      see(
        '=AVERAGE(8, 6, 10) = 24 ÷ 3 = 8',
        t('Add them (24), then divide by how many (3).', 'បូកវា (24) រួចចែកនឹងចំនួន (3)។'),
      ),
      revealPlay(
        'spreadsheet_sim',
        mc(
          t('Which formula adds B2 to B5?', 'តើរូបមន្តណាបូក B2 ដល់ B5?'),
          '=SUM(B2:B5)',
          ['SUM B2 B5', '=ADD(B2-B5)'],
          {
            hint: t(
              'Formulas start with = and use a colon : for “to”.',
              'រូបមន្តចាប់ផ្តើមដោយ = ហើយប្រើ : សម្រាប់ “ដល់”។',
            ),
          },
        ),
        num(
          t(
            'What does =SUM(B2:B5) give for this budget?',
            'តើ =SUM(B2:B5) ផ្តល់លទ្ធផលអ្វីសម្រាប់ថវិកានេះ?',
          ),
          6,
          { data: gridData(BUDGET), explanation: t('2 + 1 + 1 + 2 = 6', '2 + 1 + 1 + 2 = 6') },
        ),
        num(
          t(
            'What is =SUM(B2:B6) for mango sales?',
            'តើ =SUM(B2:B6) ស្មើប៉ុន្មានសម្រាប់ការលក់ស្វាយ?',
          ),
          80,
          {
            data: gridData(SALES),
            explanation: t('12 + 20 + 8 + 15 + 25 = 80', '12 + 20 + 8 + 15 + 25 = 80'),
          },
        ),
        num(
          t(
            'What is =MAX(B2:B6) for mango sales?',
            'តើ =MAX(B2:B6) ស្មើប៉ុន្មានសម្រាប់ការលក់ស្វាយ?',
          ),
          25,
          { data: gridData(SALES) },
        ),
        num(
          t(
            'What is =MIN(B2:B6) for mango sales?',
            'តើ =MIN(B2:B6) ស្មើប៉ុន្មានសម្រាប់ការលក់ស្វាយ?',
          ),
          8,
          { data: gridData(SALES) },
        ),
        mc(
          t('Which formula finds the biggest number?', 'តើរូបមន្តណារកលេខធំបំផុត?'),
          '=MAX(B2:B6)',
          ['=BIG(B2:B6)', '=TOP(B2:B6)'],
        ),
        mc(
          t('What does =AVERAGE do?', 'តើ =AVERAGE ធ្វើអ្វី?'),
          t('Adds, then divides by how many', 'បូក រួចចែកនឹងចំនួន'),
          [t('Finds the biggest', 'រកធំបំផុត'), t('Counts the cells', 'រាប់ក្រឡា')],
        ),
        num('=B2 + B3 (B2 = 12, B3 = 20)', 32, { data: gridData(SALES) }),
      ),
      revealChallenge(
        'spreadsheet_sim',
        num(
          t(
            'What is =AVERAGE(B2:B4)? (the average Maths score)',
            'តើ =AVERAGE(B2:B4) ស្មើប៉ុន្មាន? (ពិន្ទុគណិតមធ្យម)',
          ),
          8,
          {
            data: gridData(SCORES),
            explanation: t('(8 + 6 + 10) ÷ 3 = 24 ÷ 3 = 8', '(8 + 6 + 10) ÷ 3 = 24 ÷ 3 = 8'),
          },
        ),
        num(
          t(
            'What is =SUM(C2:C4)? (all English scores)',
            'តើ =SUM(C2:C4) ស្មើប៉ុន្មាន? (ពិន្ទុអង់គ្លេសទាំងអស់)',
          ),
          24,
          { data: gridData(SCORES), explanation: t('7 + 9 + 8 = 24', '7 + 9 + 8 = 24') },
        ),
        num(
          t(
            'What is =AVERAGE(B2:B6) for mango sales?',
            'តើ =AVERAGE(B2:B6) ស្មើប៉ុន្មានសម្រាប់ការលក់ស្វាយ?',
          ),
          16,
          { data: gridData(SALES), explanation: t('80 ÷ 5 = 16', '80 ÷ 5 = 16') },
        ),
        num('=B6 − B4 (B6 = 25, B4 = 8)', 17, { data: gridData(SALES) }),
        num('=B2 * 2 (B2 = 12)', 24, {
          data: gridData(SALES),
          explanation: t('* means multiply in a spreadsheet.', '* មានន័យថាគុណក្នុងសៀវភៅបញ្ជី។'),
        }),
        mc(
          t(
            'In a spreadsheet, which symbol means divide?',
            'ក្នុងសៀវភៅបញ្ជី តើនិមិត្តសញ្ញាណាមានន័យថាចែក?',
          ),
          '/',
          ['÷', 'x', ':'],
        ),
        mc(
          t(
            'You type 8 + 6 in a cell without =. What happens?',
            'អ្នកវាយ 8 + 6 ក្នុងក្រឡាដោយគ្មាន =។ តើមានអ្វីកើតឡើង?',
          ),
          t('It shows the text “8 + 6”', 'វាបង្ហាញអត្ថបទ “8 + 6”'),
          [
            t('It shows 14', 'វាបង្ហាញ 14'),
            t('The computer restarts', 'កុំព្យូទ័រចាប់ផ្តើមឡើងវិញ'),
          ],
        ),
        tf(
          t(
            'If Dara’s Maths score changes to 9, =AVERAGE(B2:B4) changes too.',
            'បើពិន្ទុគណិតរបស់ Dara ប្តូរទៅ 9 =AVERAGE(B2:B4) ក៏ប្តូរដែរ។',
          ),
          true,
        ),
      ),
      reward(t('Formula wizard! 🧮', 'អ្នកជំនាញរូបមន្ត! 🧮')),
    ],
  ),

  lesson(
    W,
    'sort-and-charts',
    '📈',
    t('Sort & Charts', 'តម្រៀប និងតារាងក្រាហ្វិក'),
    t('Order your data and turn numbers into pictures.', 'តម្រៀបទិន្នន័យ ហើយប្តូរលេខទៅជារូបភាព។'),
    9,
    [
      intro(
        '📈',
        t(
          'Which day sold the most mangoes? Sorting and charts show you in one second.',
          'តើថ្ងៃណាលក់ស្វាយបានច្រើនជាងគេ? ការតម្រៀប និងតារាងក្រាហ្វិកបង្ហាញអ្នកក្នុងមួយវិនាទី។',
        ),
      ),
      learn(
        [
          '🔼',
          t('Sort', 'តម្រៀប'),
          t(
            'A → Z or smallest → largest (and the reverse).',
            'A → Z ឬតូចបំផុត → ធំបំផុត (និងផ្ទុយមកវិញ)។',
          ),
        ],
        [
          '📊',
          t('Column chart', 'ក្រាហ្វជួរឈរ'),
          t('Compares amounts: sales per day.', 'ប្រៀបធៀបចំនួន៖ ការលក់ក្នុងមួយថ្ងៃ។'),
        ],
        [
          '🥧',
          t('Pie chart', 'ក្រាហ្វនំខេក'),
          t(
            'Shows parts of a whole: how a budget is shared.',
            'បង្ហាញផ្នែកនៃទាំងមូល៖ របៀបចែកថវិកា។',
          ),
        ],
        [
          '📉',
          t('Line chart', 'ក្រាហ្វបន្ទាត់'),
          t(
            'Shows change over time: temperature each month.',
            'បង្ហាញការប្រែប្រួលតាមពេលវេលា៖ សីតុណ្ហភាពរាល់ខែ។',
          ),
        ],
      ),
      see(
        '📊 ▂▅▁▄█',
        t('The tallest bar is Friday: 25 mangoes.', 'របារខ្ពស់បំផុតគឺថ្ងៃសុក្រ៖ ស្វាយ 25។'),
      ),
      revealPlay(
        'spreadsheet_sim',
        mc(
          t(
            'Sort mango sales from largest to smallest. Which day is first?',
            'តម្រៀបការលក់ស្វាយពីធំទៅតូច។ តើថ្ងៃណានៅមុនគេ?',
          ),
          'Fri',
          ['Mon', 'Wed', 'Tue'],
          { data: gridData(SALES) },
        ),
        mc(
          t(
            'Sort from smallest to largest. Which day is first?',
            'តម្រៀបពីតូចទៅធំ។ តើថ្ងៃណានៅមុនគេ?',
          ),
          'Wed',
          ['Fri', 'Thu', 'Mon'],
          { data: gridData(SALES) },
        ),
        order(t('Sort these names A → Z.', 'តម្រៀបឈ្មោះទាំងនេះ A → Z។'), [
          'Bopha',
          'Dara',
          'Sokha',
          'Vanna',
        ]),
        mc(
          t(
            'Best chart to compare sales on each day?',
            'ក្រាហ្វល្អបំផុតដើម្បីប្រៀបធៀបការលក់រាល់ថ្ងៃ?',
          ),
          t('Column chart 📊', 'ក្រាហ្វជួរឈរ 📊'),
          [t('Pie chart 🥧', 'ក្រាហ្វនំខេក 🥧'), t('No chart', 'គ្មានក្រាហ្វ')],
        ),
        mc(
          t(
            'Best chart to show how your $10 budget is shared?',
            'ក្រាហ្វល្អបំផុតដើម្បីបង្ហាញរបៀបចែកថវិកា $10?',
          ),
          t('Pie chart 🥧', 'ក្រាហ្វនំខេក 🥧'),
          [t('Line chart 📉', 'ក្រាហ្វបន្ទាត់ 📉'), t('Table of contents', 'តារាងមាតិកា')],
        ),
        mc(
          t(
            'Best chart to show your height every year from age 5 to 15?',
            'ក្រាហ្វល្អបំផុតដើម្បីបង្ហាញកម្ពស់របស់អ្នករាល់ឆ្នាំពីអាយុ 5 ដល់ 15?',
          ),
          t('Line chart 📉', 'ក្រាហ្វបន្ទាត់ 📉'),
          [t('Pie chart 🥧', 'ក្រាហ្វនំខេក 🥧')],
        ),
        tf(
          t(
            'A chart needs a title so people know what it shows.',
            'ក្រាហ្វត្រូវការចំណងជើង ដើម្បីឱ្យមនុស្សដឹងថាវាបង្ហាញអ្វី។',
          ),
          true,
        ),
        tf(
          t(
            'When you sort a table, you should select all its columns so rows stay together.',
            'ពេលតម្រៀបតារាង អ្នកគួរជ្រើសរើសជួរឈរទាំងអស់ ដើម្បីឱ្យជួរដេកនៅជាមួយគ្នា។',
          ),
          true,
          {
            explanation: t(
              'Otherwise names and numbers get mixed up.',
              'បើមិនដូច្នោះទេ ឈ្មោះ និងលេខនឹងច្របូកច្របល់។',
            ),
          },
        ),
      ),
      revealChallenge(
        'spreadsheet_sim',
        num(
          t(
            'How many more mangoes were sold on Friday than on Wednesday?',
            'តើលក់ស្វាយនៅថ្ងៃសុក្រច្រើនជាងថ្ងៃពុធប៉ុន្មាន?',
          ),
          17,
          { data: gridData(SALES) },
        ),
        mc(
          t('Which two days sold 35 mangoes together?', 'តើថ្ងៃពីរណាលក់ស្វាយបាន 35 រួមគ្នា?'),
          t('Tue and Thu', 'អង្គារ និងព្រហស្បតិ៍'),
          [t('Mon and Wed', 'ច័ន្ទ និងពុធ'), t('Mon and Fri', 'ច័ន្ទ និងសុក្រ')],
          { data: gridData(SALES) },
        ),
        sortInto(
          t('Which chart fits best?', 'តើក្រាហ្វណាសមបំផុត?'),
          [
            ['column', t('Column', 'ជួរឈរ'), '📊'],
            ['pie', t('Pie', 'នំខេក'), '🥧'],
            ['line', t('Line', 'បន្ទាត់'), '📉'],
          ],
          [
            [t('Votes for 4 class leaders', 'សន្លឹកឆ្នោតសម្រាប់ប្រធានថ្នាក់ 4 នាក់'), 'column'],
            [t('Share of a day: sleep, school, play', 'ចំណែកនៃមួយថ្ងៃ៖ គេង សាលា លេង'), 'pie'],
            [t('Rainfall each month of the year', 'បរិមាណទឹកភ្លៀងរាល់ខែនៃឆ្នាំ'), 'line'],
          ],
        ),
        mc(
          t('A filter in a spreadsheet lets you…', 'តម្រងក្នុងសៀវភៅបញ្ជីអនុញ្ញាតឱ្យអ្នក…'),
          t('Show only the rows you want', 'បង្ហាញតែជួរដេកដែលអ្នកចង់បាន'),
          [t('Delete everything', 'លុបអ្វីៗទាំងអស់'), t('Change the font', 'ប្តូរពុម្ពអក្សរ')],
        ),
        mc(
          t(
            'A chart label says “Mangoes sold”. That label is on the…',
            'ស្លាកក្រាហ្វថា “ស្វាយដែលបានលក់”។ ស្លាកនោះនៅលើ…',
          ),
          t('Axis', 'អ័ក្ស'),
          [t('Printer', 'ម៉ាស៊ីនបោះពុម្ព'), t('Recycle Bin', 'ធុងសំរាម')],
        ),
        tf(
          t(
            'If the numbers change, the chart updates automatically.',
            'បើលេខផ្លាស់ប្តូរ ក្រាហ្វធ្វើបច្ចុប្បន្នភាពដោយស្វ័យប្រវត្តិ។',
          ),
          true,
        ),
        num(
          t(
            'A pie chart shows Food 50%, Transport 25%. Everything else makes up how many %?',
            'ក្រាហ្វនំខេកបង្ហាញអាហារ 50% ការធ្វើដំណើរ 25%។ អ្វីផ្សេងទៀតស្មើប៉ុន្មាន %?',
          ),
          25,
          {
            explanation: t(
              'A pie is always 100%: 100 − 50 − 25 = 25.',
              'នំខេកតែងតែ 100%៖ 100 − 50 − 25 = 25។',
            ),
          },
        ),
        mc(
          t('Which is easier to understand quickly?', 'តើមួយណាងាយយល់លឿនជាង?'),
          t('A clear chart with a title', 'ក្រាហ្វច្បាស់ដែលមានចំណងជើង'),
          [t('100 numbers in a list', 'លេខ 100 ក្នុងបញ្ជី')],
        ),
      ),
      reward(t('Data detective! 📈', 'អ្នកស៊ើបទិន្នន័យ! 📈')),
    ],
  ),

  lesson(
    W,
    'my-weekly-budget',
    '💰',
    t('My Weekly Budget', 'ថវិកាប្រចាំសប្តាហ៍របស់ខ្ញុំ'),
    t('Plan your own money with a spreadsheet.', 'រៀបចំផែនការលុយរបស់អ្នកជាមួយសៀវភៅបញ្ជី។'),
    11,
    [
      intro(
        '💰',
        t(
          'Mini project: plan your own weekly budget, like a real spreadsheet.',
          'គម្រោងតូច៖ រៀបចំថវិកាប្រចាំសប្តាហ៍របស់អ្នក ដូចសៀវភៅបញ្ជីពិត។',
        ),
      ),
      learn(
        [
          '📝',
          t('List your costs', 'រាយការចំណាយ'),
          t('Food, transport, phone, other.', 'អាហារ ការធ្វើដំណើរ ទូរស័ព្ទ ផ្សេងៗ។'),
        ],
        [
          '➕',
          t('Total with SUM', 'សរុបដោយ SUM'),
          t('The total tells you how much you need.', 'សរុបប្រាប់អ្នកថាត្រូវការប៉ុន្មាន។'),
        ],
        [
          '🐷',
          t('Save a little', 'សន្សំបន្តិច'),
          t('Money left over? That’s savings!', 'លុយនៅសល់? នោះគឺជាការសន្សំ!'),
        ],
      ),
      see(
        t('Income $10 − Total $6 = Savings $4', 'ចំណូល $10 − សរុប $6 = សន្សំ $4'),
        t(
          'A budget shows what you spend and what you can save.',
          'ថវិកាបង្ហាញអ្វីដែលអ្នកចំណាយ និងអ្វីដែលអ្នកអាចសន្សំ។',
        ),
      ),
      revealPlay(
        'spreadsheet_sim',
        num(
          t(
            'Your income is $10 a week. Your costs total $6. How much can you save?',
            'ចំណូលរបស់អ្នក $10 ក្នុងមួយសប្តាហ៍។ ការចំណាយសរុប $6។ តើអ្នកអាចសន្សំបានប៉ុន្មាន?',
          ),
          4,
          { data: gridData(BUDGET), explanation: t('$10 − $6 = $4', '$10 − $6 = $4') },
        ),
        cell(
          t(
            'Which cell would you put the total formula in, under the costs?',
            'តើអ្នកនឹងដាក់រូបមន្តសរុបក្នុងក្រឡាណា នៅក្រោមការចំណាយ?',
          ),
          'B6',
          gridData(BUDGET),
          {
            hint: t(
              'The first empty cell below the costs in column B.',
              'ក្រឡាទទេដំបូងនៅក្រោមការចំណាយក្នុងជួរឈរ B។',
            ),
          },
        ),
        mc(t('Which formula totals the costs?', 'តើរូបមន្តណាសរុបការចំណាយ?'), '=SUM(B2:B5)', [
          '=SUM(A2:A5)',
          '=B2',
        ]),
        num(
          t(
            'You save $4 a week. How much after 5 weeks?',
            'អ្នកសន្សំ $4 ក្នុងមួយសប្តាហ៍។ តើបន្ទាប់ពី 5 សប្តាហ៍មានប៉ុន្មាន?',
          ),
          20,
        ),
        num(
          t(
            'You want a $30 bag and save $4 a week. How many weeks (at least)?',
            'អ្នកចង់បានកាបូប $30 ហើយសន្សំ $4 ក្នុងមួយសប្តាហ៍។ តើយ៉ាងហោចណាស់ប៉ុន្មានសប្តាហ៍?',
          ),
          8,
          {
            explanation: t(
              '7 weeks = $28 (not enough), 8 weeks = $32.',
              '7 សប្តាហ៍ = $28 (មិនគ្រប់) 8 សប្តាហ៍ = $32។',
            ),
          },
        ),
        sortInto(
          t('Need or want?', 'ត្រូវការ ឬចង់បាន?'),
          [
            ['need', t('Need', 'ត្រូវការ'), '🍚'],
            ['want', t('Want', 'ចង់បាន'), '🎮'],
          ],
          [
            [t('Rice and food', 'អង្ករ និងអាហារ'), 'need'],
            [t('Bus to school', 'ឡានក្រុងទៅសាលា'), 'need'],
            [t('A new game', 'ល្បែងថ្មី'), 'want'],
            [t('Fancy sneakers', 'ស្បែកជើងប៉ាតាថ្លៃ'), 'want'],
          ],
        ),
        tf(t('A budget is only for rich people.', 'ថវិកាគឺសម្រាប់តែអ្នកមានប៉ុណ្ណោះ។'), false, {
          explanation: t(
            'A budget helps everyone, especially with a small income.',
            'ថវិកាជួយអ្នករាល់គ្នា ជាពិសេសពេលមានចំណូលតិច។',
          ),
        }),
        num(
          t(
            'If food goes from $2 to $3, what is the new total of the budget?',
            'បើអាហារឡើងពី $2 ទៅ $3 តើសរុបថ្មីនៃថវិកាគឺប៉ុន្មាន?',
          ),
          7,
          { data: gridData(BUDGET) },
        ),
      ),
      revealChallenge(
        'multiple_choice',
        mc(
          t(
            'Your costs are more than your income. You should…',
            'ការចំណាយរបស់អ្នកច្រើនជាងចំណូល។ អ្នកគួរ…',
          ),
          t('Cut some “wants”', 'កាត់បន្ថយ “ការចង់បាន” ខ្លះ'),
          [t('Ignore it', 'មិនខ្វល់'), t('Borrow every week', 'ខ្ចីរាល់សប្តាហ៍')],
        ),
        num(t('Income $15, costs $11. Savings?', 'ចំណូល $15 ការចំណាយ $11។ ការសន្សំ?'), 4),
        num(
          t(
            'You spend $1.50 a day on snacks. How much in 7 days?',
            'អ្នកចំណាយ $1.50 ក្នុងមួយថ្ងៃលើអាហារសម្រន់។ តើក្នុង 7 ថ្ងៃប៉ុន្មាន?',
          ),
          10.5,
        ),
        tf(
          t(
            'Writing down what you spend helps you see where money goes.',
            'ការកត់ត្រាអ្វីដែលអ្នកចំណាយ ជួយអ្នកឃើញថាលុយទៅណា។',
          ),
          true,
        ),
        mc(
          t(
            'Which formula gives savings if income is in B8 and the total is in B6?',
            'តើរូបមន្តណាផ្តល់ការសន្សំ បើចំណូលនៅ B8 ហើយសរុបនៅ B6?',
          ),
          '=B8-B6',
          ['=B6-B8', '=SUM(B8)'],
        ),
        mc(
          t(
            'A “percentage of income saved” of 40% from $10 means…',
            '“ភាគរយនៃចំណូលដែលសន្សំ” 40% ពី $10 មានន័យថា…',
          ),
          '$4',
          ['$40', '$0.40'],
        ),
        tf(
          t(
            'Saving a little every week adds up over a year.',
            'ការសន្សំបន្តិចរាល់សប្តាហ៍ កើនច្រើននៅពេលមួយឆ្នាំ។',
          ),
          true,
        ),
      ),
      creation('budget', t('My Weekly Budget', 'ថវិកាប្រចាំសប្តាហ៍របស់ខ្ញុំ'), [
        { key: 'food', label: t('Food ($)', 'អាហារ ($)'), placeholder: '2', maxLength: 6 },
        {
          key: 'transport',
          label: t('Transport ($)', 'ការធ្វើដំណើរ ($)'),
          placeholder: '1',
          maxLength: 6,
        },
        { key: 'phone', label: t('Phone ($)', 'ទូរស័ព្ទ ($)'), placeholder: '1', maxLength: 6 },
        { key: 'other', label: t('Other ($)', 'ផ្សេងៗ ($)'), placeholder: '2', maxLength: 6 },
      ]),
      reward(t('You can plan money like a pro! 💰', 'អ្នកអាចរៀបចំផែនការលុយដូចអ្នកជំនាញ! 💰')),
    ],
  ),

  lesson(
    W,
    'presentation-basics',
    '🎞️',
    t('Presentation Basics', 'មូលដ្ឋានបទបង្ហាញ'),
    t('Slides, layouts and good design.', 'ស្លាយ ប្លង់ និងការរចនាល្អ។'),
    9,
    [
      intro(
        '🎞️',
        t(
          'PowerPoint and Google Slides help you show ideas to a group. Let’s learn the rules of a good slide.',
          'PowerPoint និង Google Slides ជួយអ្នកបង្ហាញគំនិតដល់ក្រុម។ តោះរៀនច្បាប់នៃស្លាយល្អ។',
        ),
      ),
      learn(
        ['🖼️', t('Slide', 'ស្លាយ'), t('One page of a presentation.', 'ទំព័រមួយនៃបទបង្ហាញ។')],
        [
          '✂️',
          t('Few words', 'ពាក្យតិច'),
          t(
            'A title and 3 short points. You say the rest.',
            'ចំណងជើង និងចំណុចខ្លីៗ 3។ អ្នកនិយាយផ្នែកផ្សេងទៀត។',
          ),
        ],
        [
          '▶️',
          t('Slide show', 'ការបញ្ចាំងស្លាយ'),
          t('Press F5 to present full screen.', 'ចុច F5 ដើម្បីបង្ហាញពេញអេក្រង់។'),
        ],
      ),
      see(
        t('Title · 3 points · 1 picture', 'ចំណងជើង · 3 ចំណុច · រូបភាព 1'),
        t(
          'Simple slides are easy to read from the back of the room.',
          'ស្លាយសាមញ្ញងាយអានពីខាងក្រោយបន្ទប់។',
        ),
      ),
      revealPlay(
        'slides_sim',
        mc(
          t('Which slide is easier to read?', 'តើស្លាយណាងាយអានជាង?'),
          t('A title and 3 short points', 'ចំណងជើង និងចំណុចខ្លីៗ 3'),
          [
            t('A whole page of small text', 'អត្ថបទតូចៗពេញមួយទំព័រ'),
            t('Ten pictures and no title', 'រូបភាពដប់ និងគ្មានចំណងជើង'),
          ],
        ),
        mc(t('Which app is for presentations?', 'តើកម្មវិធីណាសម្រាប់បទបង្ហាញ?'), 'PowerPoint', [
          'Excel',
          'Notepad',
        ]),
        mc(
          t('A PowerPoint file usually ends with…', 'ឯកសារ PowerPoint ជាធម្មតាបញ្ចប់ដោយ…'),
          '.pptx',
          ['.xlsx', '.mp3'],
        ),
        mc(t('Which key starts the slide show?', 'តើគ្រាប់ចុចណាចាប់ផ្តើមការបញ្ចាំងស្លាយ?'), 'F5', [
          'F1',
          'Esc',
          'Tab',
        ]),
        mc(t('Which key stops the slide show?', 'តើគ្រាប់ចុចណាបញ្ឈប់ការបញ្ចាំងស្លាយ?'), 'Esc', [
          'F5',
          'Enter',
        ]),
        tf(
          t(
            'Dark text on a light background (or light on dark) is easy to read.',
            'អក្សរងងឹតលើផ្ទៃភ្លឺ (ឬភ្លឺលើងងឹត) ងាយអាន។',
          ),
          true,
        ),
        mc(
          t('Best text size for slide points?', 'ទំហំអក្សរល្អបំផុតសម្រាប់ចំណុចស្លាយ?'),
          t('Big (24 or more)', 'ធំ (24 ឬច្រើនជាង)'),
          [t('Tiny (8)', 'តូចខ្លាំង (8)'), t('Any size', 'ទំហំណាក៏បាន')],
        ),
        tf(
          t(
            'You should read every word on your slides aloud to the audience.',
            'អ្នកគួរអានគ្រប់ពាក្យលើស្លាយឮៗដល់ទស្សនិកជន។',
          ),
          false,
          {
            explanation: t(
              'Slides show key points; you explain in your own words.',
              'ស្លាយបង្ហាញចំណុចសំខាន់ អ្នកពន្យល់ដោយពាក្យផ្ទាល់ខ្លួន។',
            ),
          },
        ),
      ),
      revealChallenge(
        'slides_sim',
        order(t('Put a short talk in order.', 'តម្រៀបការនិយាយខ្លីមួយ។'), [
          t('Title slide', 'ស្លាយចំណងជើង'),
          t('The main points', 'ចំណុចសំខាន់ៗ'),
          t('Summary', 'សេចក្តីសង្ខេប'),
          t('Thank you / questions', 'អរគុណ / សំណួរ'),
        ]),
        mc(
          t('How many main ideas should one slide have?', 'តើស្លាយមួយគួរមានគំនិតចម្បងប៉ុន្មាន?'),
          t('One', 'មួយ'),
          [t('Five', 'ប្រាំ'), t('Ten', 'ដប់')],
        ),
        mc(
          t('Animations and sounds on every word are…', 'ចលនា និងសំឡេងលើគ្រប់ពាក្យ គឺ…'),
          t('Distracting', 'រំខាន'),
          [t('Professional', 'អាជីព'), t('Required', 'ចាំបាច់')],
        ),
        mc(
          t('“New Slide” is found on the…', '“ស្លាយថ្មី” មាននៅលើ…'),
          t('Home tab', 'ផ្ទាំង Home'),
          [t('Printer', 'ម៉ាស៊ីនបោះពុម្ព'), t('Taskbar', 'របារភារកិច្ច')],
        ),
        tf(
          t(
            'Practising your talk before presenting helps you feel calm.',
            'ការហាត់និយាយមុនពេលបង្ហាញ ជួយឱ្យអ្នកមានអារម្មណ៍ស្ងប់។',
          ),
          true,
        ),
        num(
          t(
            'You have 5 minutes and 10 slides. About how many seconds per slide?',
            'អ្នកមាន 5 នាទី និង 10 ស្លាយ។ តើប្រហែលប៉ុន្មានវិនាទីក្នុងមួយស្លាយ?',
          ),
          30,
          {
            explanation: t('300 seconds ÷ 10 = 30.', '300 វិនាទី ÷ 10 = 30។'),
          },
        ),
        mc(
          t('Speaker notes are…', 'កំណត់ចំណាំអ្នកនិយាយ គឺ…'),
          t('Notes only you can see while presenting', 'កំណត់ចំណាំដែលមានតែអ្នកឃើញពេលបង្ហាញ'),
          [t('Text on every slide', 'អត្ថបទលើគ្រប់ស្លាយ'), t('Sounds', 'សំឡេង')],
        ),
        tf(
          t(
            'Using the same colours and fonts on every slide looks more professional.',
            'ការប្រើពណ៌ និងពុម្ពអក្សរដូចគ្នាលើគ្រប់ស្លាយ មើលទៅអាជីពជាង។',
          ),
          true,
        ),
      ),
      reward(t('Ready to present! 🎞️', 'ត្រៀមរួចដើម្បីបង្ហាញ! 🎞️')),
    ],
  ),

  lesson(
    W,
    'my-dream-presentation',
    '🎤',
    t('My Dream Presentation', 'បទបង្ហាញក្តីស្រមៃរបស់ខ្ញុំ'),
    t('Make 3 slides about your future.', 'បង្កើតស្លាយ 3 អំពីអនាគតរបស់អ្នក។'),
    12,
    [
      intro(
        '🎤',
        t(
          'PowerPoint helps you present ideas with slides. Let’s make 3 slides about YOUR dream.',
          'PowerPoint ជួយអ្នកបង្ហាញគំនិតជាមួយស្លាយ។ តោះបង្កើតស្លាយ 3 អំពីក្តីស្រមៃរបស់អ្នក។',
        ),
      ),
      learn(
        ['🖼️', t('Slide', 'ស្លាយ'), t('One page of a presentation.', 'ទំព័រមួយនៃបទបង្ហាញ។')],
        [
          '✂️',
          t('Few words', 'ពាក្យតិច'),
          t(
            'A title and 3 short points. Talk about the rest.',
            'ចំណងជើង និងចំណុចខ្លីៗ 3។ និយាយពីផ្នែកផ្សេងទៀត។',
          ),
        ],
        [
          '🎨',
          t('Design', 'ការរចនា'),
          t(
            'Big text, one picture, the same colours on every slide.',
            'អក្សរធំ រូបភាពមួយ ពណ៌ដូចគ្នាលើគ្រប់ស្លាយ។',
          ),
        ],
      ),
      see(
        t(
          '1 About Me → 2 Things I Like → 3 My Future Dream',
          '1 អំពីខ្ញុំ → 2 អ្វីដែលខ្ញុំចូលចិត្ត → 3 ក្តីស្រមៃអនាគតរបស់ខ្ញុំ',
        ),
        t('Three slides tell a short, clear story.', 'ស្លាយបីប្រាប់រឿងខ្លី និងច្បាស់។'),
      ),
      revealPlay(
        'slides_sim',
        order(t('Put the slides of “My Dream” in order.', 'តម្រៀបស្លាយនៃ “ក្តីស្រមៃរបស់ខ្ញុំ”។'), [
          t('About Me', 'អំពីខ្ញុំ'),
          t('Things I Like', 'អ្វីដែលខ្ញុំចូលចិត្ត'),
          t('My Future Dream', 'ក្តីស្រមៃអនាគតរបស់ខ្ញុំ'),
        ]),
        mc(
          t('Best title for slide 1?', 'ចំណងជើងល្អបំផុតសម្រាប់ស្លាយទី 1?'),
          t('About Me', 'អំពីខ្ញុំ'),
          [t('Slide 1', 'ស្លាយ 1'), t('asdfgh', 'asdfgh')],
        ),
        mc(
          t('Best point for “Things I Like”?', 'ចំណុចល្អបំផុតសម្រាប់ “អ្វីដែលខ្ញុំចូលចិត្ត”?'),
          t('Football, music, puzzles', 'បាល់ទាត់ តន្ត្រី ល្បែងផ្គុំ'),
          [
            t(
              'I like many many things and also other things and more things',
              'ខ្ញុំចូលចិត្តរបស់ច្រើន ច្រើន និងរបស់ផ្សេងទៀត និងច្រើនទៀត',
            ),
          ],
        ),
        mc(
          t(
            'A good picture for “My Future Dream: doctor” is…',
            'រូបភាពល្អសម្រាប់ “ក្តីស្រមៃអនាគត៖ វេជ្ជបណ្ឌិត” គឺ…',
          ),
          '🩺',
          ['🍕', '🚗', '🎮'],
        ),
        tf(
          t(
            'Looking at your audience while you talk helps them listen.',
            'ការមើលទស្សនិកជនពេលអ្នកនិយាយ ជួយឱ្យពួកគេស្តាប់។',
          ),
          true,
        ),
        mc(
          t(
            'Your slide text is too small to read from the back. You should…',
            'អក្សរលើស្លាយរបស់អ្នកតូចពេក អានពីខាងក្រោយមិនឃើញ។ អ្នកគួរ…',
          ),
          t('Use fewer words and bigger text', 'ប្រើពាក្យតិច និងអក្សរធំជាង'),
          [t('Add more text', 'បន្ថែមអត្ថបទ'), t('Turn off the lights', 'បិទភ្លើង')],
        ),
        mc(
          t(
            'How long should a 3-slide talk about you take?',
            'តើការនិយាយ 3 ស្លាយអំពីខ្លួនអ្នកគួរចំណាយពេលប៉ុន្មាន?',
          ),
          t('About 2–3 minutes', 'ប្រហែល 2–3 នាទី'),
          [t('One hour', 'មួយម៉ោង'), t('5 seconds', '5 វិនាទី')],
        ),
        tf(
          t(
            'It’s OK to feel nervous — practising helps.',
            'មានអារម្មណ៍ភ័យគឺមិនអីទេ — ការហាត់ជួយបាន។',
          ),
          true,
        ),
      ),
      revealChallenge(
        'slides_sim',
        mc(
          t('What should the last slide usually say?', 'តើស្លាយចុងក្រោយជាធម្មតាគួរនិយាយអ្វី?'),
          t('Thank you! Any questions?', 'អរគុណ! មានសំណួរទេ?'),
          [t('The End???', 'ចប់???'), t('Nothing', 'គ្មានអ្វីទេ')],
        ),
        mc(
          t(
            'Someone asks a question you can’t answer. Best reply?',
            'នរណាម្នាក់សួរសំណួរដែលអ្នកមិនអាចឆ្លើយបាន។ ចម្លើយល្អបំផុត?',
          ),
          t('“Good question — I will find out.”', '“សំណួរល្អ — ខ្ញុំនឹងស្វែងរក។”'),
          [t('Ignore them', 'មិនខ្វល់ពួកគេ'), t('Make up an answer', 'បង្កើតចម្លើយឯង')],
        ),
        sortInto(
          t('Good slide or bad slide?', 'ស្លាយល្អ ឬស្លាយមិនល្អ?'),
          [
            ['good', t('Good', 'ល្អ'), '👍'],
            ['bad', t('Needs work', 'ត្រូវកែ'), '🛠️'],
          ],
          [
            [t('Big title, 3 short points', 'ចំណងជើងធំ ចំណុចខ្លីៗ 3'), 'good'],
            [t('Yellow text on white', 'អក្សរលឿងលើផ្ទៃស'), 'bad'],
            [t('One clear photo', 'រូបថតច្បាស់មួយ'), 'good'],
            [t('200 words in tiny font', 'ពាក្យ 200 ក្នុងពុម្ពអក្សរតូចៗ'), 'bad'],
          ],
        ),
        tf(
          t(
            'You can share slides as a PDF so they look the same everywhere.',
            'អ្នកអាចចែករំលែកស្លាយជា PDF ដើម្បីឱ្យវាមើលទៅដូចគ្នាគ្រប់កន្លែង។',
          ),
          true,
        ),
        mc(
          t('Speaking clearly and not too fast is…', 'ការនិយាយច្បាស់ និងមិនលឿនពេក គឺ…'),
          t('Important for a good talk', 'សំខាន់សម្រាប់ការនិយាយល្អ'),
          [t('Not important', 'មិនសំខាន់')],
        ),
        num(
          t(
            'Your 3 slides take 40 seconds each. How many seconds in total?',
            'ស្លាយ 3 របស់អ្នកចំណាយ 40 វិនាទីម្នាក់ៗ។ តើសរុបប៉ុន្មានវិនាទី?',
          ),
          120,
        ),
        mc(
          t('Best place to look while presenting?', 'កន្លែងល្អបំផុតដើម្បីមើលពេលបង្ហាញ?'),
          t('At the audience', 'ទៅកាន់ទស្សនិកជន'),
          [t('At the floor', 'ទៅកាន់ឥដ្ឋ'), t('Only at the screen', 'តែទៅកាន់អេក្រង់')],
        ),
      ),
      creation('slides', t('My Dream', 'ក្តីស្រមៃរបស់ខ្ញុំ'), [
        {
          key: 'aboutMe',
          label: t('Slide 1 · About Me', 'ស្លាយ 1 · អំពីខ្ញុំ'),
          placeholder: t('I am Sokha, 17, from Kampot.', 'ខ្ញុំឈ្មោះសុខា អាយុ 17 ឆ្នាំ មកពីកំពត។'),
          maxLength: 140,
          multiline: true,
        },
        {
          key: 'thingsILike',
          label: t('Slide 2 · Things I Like', 'ស្លាយ 2 · អ្វីដែលខ្ញុំចូលចិត្ត'),
          placeholder: t('Football, music, solving puzzles', 'បាល់ទាត់ តន្ត្រី ដោះស្រាយល្បែងផ្គុំ'),
          maxLength: 140,
          multiline: true,
        },
        {
          key: 'myDream',
          label: t('Slide 3 · My Future Dream', 'ស្លាយ 3 · ក្តីស្រមៃអនាគតរបស់ខ្ញុំ'),
          placeholder: t(
            'I want to build apps that help farmers.',
            'ខ្ញុំចង់បង្កើតកម្មវិធីដែលជួយកសិករ។',
          ),
          maxLength: 140,
          multiline: true,
        },
      ]),
      reward(t('Great presentation! 🎤', 'បទបង្ហាញល្អណាស់! 🎤')),
    ],
  ),

  lesson(
    W,
    'sharing-documents',
    '🤝',
    t('Share & Work Together', 'ចែករំលែក និងធ្វើការជាមួយគ្នា'),
    t('Cloud documents, comments and teamwork.', 'ឯកសារលើពពក មតិយោបល់ និងការងារជាក្រុម។'),
    9,
    [
      intro(
        '🤝',
        t(
          'In school and at work, people write documents together. Let’s learn how sharing works.',
          'នៅសាលា និងកន្លែងធ្វើការ មនុស្សសរសេរឯកសារជាមួយគ្នា។ តោះរៀនពីរបៀបចែករំលែក។',
        ),
      ),
      learn(
        [
          '☁️',
          t('Cloud documents', 'ឯកសារលើពពក'),
          t(
            'Google Docs or Word online: everyone edits the same file.',
            'Google Docs ឬ Word អនឡាញ៖ អ្នករាល់គ្នាកែឯកសារដដែល។',
          ),
        ],
        [
          '🔗',
          t('Share with care', 'ចែករំលែកដោយប្រុងប្រយ័ត្ន'),
          t('Choose who can view or who can edit.', 'ជ្រើសរើសថានរណាអាចមើល ឬនរណាអាចកែ។'),
        ],
        [
          '💬',
          t('Comments', 'មតិយោបល់'),
          t(
            'Leave a note on the text without changing it.',
            'ទុកកំណត់ចំណាំលើអត្ថបទដោយមិនផ្លាស់ប្តូរវា។',
          ),
        ],
      ),
      see(
        '📄 → 🔗 Share → 👀 View / ✏️ Edit',
        t('You decide what others can do.', 'អ្នកសម្រេចថាអ្នកដទៃអាចធ្វើអ្វី។'),
      ),
      revealPlay(
        'multiple_choice',
        mc(
          t(
            'Your teacher should read your essay but not change it. Give them…',
            'គ្រូរបស់អ្នកគួរអានអត្ថបទរបស់អ្នក ប៉ុន្តែមិនកែវាទេ។ ផ្តល់ឱ្យគាត់…',
          ),
          t('View (or comment) access', 'សិទ្ធិមើល (ឬផ្តល់មតិ)'),
          [t('Edit access', 'សិទ្ធិកែ'), t('Your password', 'ពាក្យសម្ងាត់របស់អ្នក')],
        ),
        mc(
          t(
            'Your group is writing one report together. Give them…',
            'ក្រុមរបស់អ្នកកំពុងសរសេររបាយការណ៍មួយជាមួយគ្នា។ ផ្តល់ឱ្យពួកគេ…',
          ),
          t('Edit access', 'សិទ្ធិកែ'),
          [t('No access', 'គ្មានសិទ្ធិ'), t('A printed copy only', 'តែច្បាប់បោះពុម្ព')],
        ),
        mc(
          t('A comment is used to…', 'មតិយោបល់ត្រូវបានប្រើដើម្បី…'),
          t('Suggest or ask without changing the text', 'ណែនាំ ឬសួរដោយមិនផ្លាស់ប្តូរអត្ថបទ'),
          [t('Delete the document', 'លុបឯកសារ'), t('Change the font', 'ប្តូរពុម្ពអក្សរ')],
        ),
        tf(
          t(
            'In Google Docs, several people can type in the same document at the same time.',
            'ក្នុង Google Docs មនុស្សច្រើននាក់អាចវាយក្នុងឯកសារដដែលក្នុងពេលតែមួយ។',
          ),
          true,
        ),
        tf(
          t(
            '“Anyone with the link can edit” is safe for private documents.',
            '“អ្នកណាដែលមានតំណអាចកែ” គឺសុវត្ថិភាពសម្រាប់ឯកសារឯកជន។',
          ),
          false,
          {
            explanation: t(
              'Anyone who gets the link could change or copy it.',
              'អ្នកណាដែលទទួលបានតំណអាចផ្លាស់ប្តូរ ឬចម្លងវា។',
            ),
          },
        ),
        mc(
          t('Version history lets you…', 'ប្រវត្តិកំណែអនុញ្ញាតឱ្យអ្នក…'),
          t('Go back to an older version', 'ត្រឡប់ទៅកំណែចាស់'),
          [t('Print faster', 'បោះពុម្ពលឿនជាង'), t('Change the language', 'ប្តូរភាសា')],
        ),
        mc(
          t('Cloud documents save…', 'ឯកសារលើពពករក្សាទុក…'),
          t('Automatically', 'ដោយស្វ័យប្រវត្តិ'),
          [t('Only when you print', 'តែពេលអ្នកបោះពុម្ព'), t('Never', 'មិនដែល')],
        ),
        mc(
          t('“Suggesting” mode shows your changes…', 'របៀប “ណែនាំ” បង្ហាញការផ្លាស់ប្តូររបស់អ្នក…'),
          t('As suggestions the owner can accept', 'ជាការណែនាំដែលម្ចាស់អាចទទួលយក'),
          [t('In secret', 'ដោយសម្ងាត់'), t('Only on paper', 'តែលើក្រដាស')],
        ),
      ),
      revealChallenge(
        'multiple_choice',
        sortInto(
          t('View or edit?', 'មើល ឬកែ?'),
          [
            ['view', t('View only', 'មើលតែប៉ុណ្ណោះ'), '👀'],
            ['edit', t('Can edit', 'អាចកែ'), '✏️'],
          ],
          [
            [t('Parents reading your report', 'ឪពុកម្តាយអានរបាយការណ៍របស់អ្នក'), 'view'],
            [t('Your group partners', 'ដៃគូក្រុមរបស់អ្នក'), 'edit'],
            [t('The whole school notice board', 'ក្តារព័ត៌មានសាលាទាំងមូល'), 'view'],
          ],
        ),
        mc(
          t(
            'Someone deleted half the group report by mistake. Fix?',
            'នរណាម្នាក់លុបពាក់កណ្តាលរបាយការណ៍ក្រុមដោយច្រឡំ។ ការជួសជុល?',
          ),
          t('Restore from version history', 'ស្តារពីប្រវត្តិកំណែ'),
          [t('Start again from zero', 'ចាប់ផ្តើមពីសូន្យ'), t('Blame them', 'បន្ទោសពួកគេ')],
        ),
        tf(
          t(
            'Be kind and helpful in comments — a real person reads them.',
            'ត្រូវចិត្តល្អ និងជួយក្នុងមតិយោបល់ — មនុស្សពិតអានវា។',
          ),
          true,
        ),
        mc(
          t(
            'To mention a teammate in a Google Docs comment, type…',
            'ដើម្បីលើកឡើងមិត្តក្រុមក្នុងមតិ Google Docs វាយ…',
          ),
          t('@ and their name', '@ និងឈ្មោះរបស់គាត់'),
          [t('# and their age', '# និងអាយុរបស់គាត់'), t('Their password', 'ពាក្យសម្ងាត់របស់គាត់')],
        ),
        mc(
          t('A good way to split a group report?', 'វិធីល្អដើម្បីបែងចែករបាយការណ៍ក្រុម?'),
          t('Each person writes one section', 'ម្នាក់ៗសរសេរផ្នែកមួយ'),
          [
            t('Everyone writes the same sentence', 'អ្នករាល់គ្នាសរសេរប្រយោគដដែល'),
            t('One person does everything', 'ម្នាក់ធ្វើអ្វីៗទាំងអស់'),
          ],
        ),
        tf(
          t(
            'You need internet to edit a shared cloud document live with others.',
            'អ្នកត្រូវការអ៊ីនធឺណិតដើម្បីកែឯកសារពពកដែលចែករំលែកផ្ទាល់ជាមួយអ្នកដទៃ។',
          ),
          true,
        ),
        mc(t('Which is a cloud office tool?', 'តើមួយណាជាឧបករណ៍ការិយាល័យលើពពក?'), 'Google Docs', [
          'Calculator',
          'Paint',
        ]),
        tf(
          t(
            'Sharing a document by link is better than emailing 10 different copies.',
            'ការចែករំលែកឯកសារតាមតំណ ល្អជាងការផ្ញើ 10 ច្បាប់ផ្សេងៗតាមអ៊ីមែល។',
          ),
          true,
          {
            explanation: t(
              'Everyone works on the same, latest version.',
              'អ្នករាល់គ្នាធ្វើការលើកំណែដដែល និងចុងក្រោយ។',
            ),
          },
        ),
      ),
      reward(
        t(
          'Office Creator complete! You can write, calculate, present and share. 📄',
          'អ្នកបង្កើតឯកសារការិយាល័យបានបញ្ចប់! អ្នកអាចសរសេរ គណនា បង្ហាញ និងចែករំលែក។ 📄',
        ),
      ),
    ],
  ),
];
