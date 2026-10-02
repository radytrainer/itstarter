import { t } from '../../types';
import { buildSentence, catchIt, game, memory, robot, typeIt } from '../dsl';

// 🎮 Game rounds for Computer Explorer, by lesson slug. Khmer (km) strings are DRAFTS.
export const COMPUTER_GAMES = {
  'what-is-a-computer': game(
    catchIt(
      t('Catch every COMPUTER!', 'ចាប់គ្រប់កុំព្យូទ័រ!'),
      [
        ['💻', t('Laptop', 'កុំព្យូទ័រយួរដៃ')],
        ['📱', t('Smartphone', 'ស្មាតហ្វូន')],
        ['🖥️', t('Desktop', 'កុំព្យូទ័រលើតុ')],
        ['⌚', t('Smartwatch', 'នាឡិកាឆ្លាតវៃ')],
      ],
      [
        ['🪑', t('Chair', 'កៅអី')],
        ['📕', t('Book', 'សៀវភៅ')],
        ['🔦', t('Torch', 'ពិល')],
        ['🥄', t('Spoon', 'ស្លាបព្រា')],
      ],
    ),
    memory(
      t(
        'Match each action to its job: input, process, output or storage.',
        'ផ្គូផ្គងសកម្មភាពនីមួយៗ៖ បញ្ចូល ដំណើរការ បញ្ចេញ ឬផ្ទុក។',
      ),
      [
        [['⌨️', t('Typing', 'ការវាយ')], t('Input', 'បញ្ចូល')],
        [['⚙️', t('Calculating', 'ការគណនា')], t('Process', 'ដំណើរការ')],
        [['🖥️', t('Showing the result', 'បង្ហាញលទ្ធផល')], t('Output', 'បញ្ចេញ')],
        [['💾', t('Keeping it for later', 'ទុកសម្រាប់ពេលក្រោយ')], t('Storage', 'ផ្ទុក')],
      ],
    ),
  ),
  'computer-parts': game(
    memory(t('Match each part to what it does.', 'ផ្គូផ្គងផ្នែកនីមួយៗជាមួយតួនាទីរបស់វា។'), [
      [['🖱️', t('Mouse', 'កណ្តុរ')], t('Point and click', 'ចង្អុល និងចុច')],
      [['⌨️', t('Keyboard', 'ក្តារចុច')], t('Type letters', 'វាយអក្សរ')],
      [['🖥️', t('Monitor', 'អេក្រង់')], t('Shows pictures', 'បង្ហាញរូបភាព')],
      [['🔊', t('Speaker', 'ឧបករណ៍បំពងសំឡេង')], t('Plays sound', 'បញ្ចេញសំឡេង')],
    ]),
    catchIt(
      t(
        'Catch the INPUT devices (they send information IN)!',
        'ចាប់ឧបករណ៍បញ្ចូល (វាបញ្ជូនព័ត៌មានចូល)!',
      ),
      [
        ['⌨️', t('Keyboard', 'ក្តារចុច')],
        ['🖱️', t('Mouse', 'កណ្តុរ')],
        ['🎤', t('Microphone', 'មីក្រូហ្វូន')],
        ['📷', t('Webcam', 'កាមេរ៉ា')],
      ],
      [
        ['🖨️', t('Printer', 'ម៉ាស៊ីនបោះពុម្ព')],
        ['🔊', t('Speaker', 'ឧបករណ៍បំពងសំឡេង')],
        ['🖥️', t('Monitor', 'អេក្រង់')],
        ['🎧', t('Headphones', 'កាស')],
      ],
    ),
  ),
  'hardware-and-software': game(
    catchIt(
      t('Catch the SOFTWARE (programs and apps)!', 'ចាប់កម្មវិធី (Software)!'),
      [
        'Chrome',
        'Word',
        'Windows',
        t('Calculator app', 'កម្មវិធីគណនា'),
        t('Games app', 'កម្មវិធីហ្គេម'),
      ],
      [
        ['🖱️', t('Mouse', 'កណ្តុរ')],
        ['🖥️', t('Monitor', 'អេក្រង់')],
        ['🔌', t('Cable', 'ខ្សែ')],
        ['💽', t('Hard disk', 'ថាសរឹង')],
      ],
    ),
    memory(t('Match each word to its meaning.', 'ផ្គូផ្គងពាក្យនីមួយៗជាមួយអត្ថន័យ។'), [
      [t('Hardware', 'ផ្នែករឹង'), t('Parts you can touch', 'ផ្នែកដែលអ្នកអាចប៉ះបាន')],
      [t('Software', 'ផ្នែកទន់'), t('Programs and apps', 'កម្មវិធី')],
      [t('App', 'កម្មវិធីទូរស័ព្ទ'), t('Software on a phone', 'កម្មវិធីលើទូរស័ព្ទ')],
      [t('Update', 'ធ្វើបច្ចុប្បន្នភាព'), t('A newer version', 'កំណែថ្មីជាង')],
    ]),
  ),
  'start-and-shut-down': game(
    memory(
      t(
        'Match each button or word to what it does.',
        'ផ្គូផ្គងប៊ូតុង ឬពាក្យនីមួយៗជាមួយអ្វីដែលវាធ្វើ។',
      ),
      [
        [['⏻', t('Power button', 'ប៊ូតុងថាមពល')], t('Turn on', 'បើក')],
        [t('Shut down', 'បិទ'), t('Turn off safely', 'បិទដោយសុវត្ថិភាព')],
        [t('Restart', 'ចាប់ផ្តើមឡើងវិញ'), t('Turn off and on again', 'បិទ ហើយបើកម្តងទៀត')],
        [t('Sleep', 'ដេក'), t('Rest, then wake up fast', 'សម្រាក រួចភ្ញាក់លឿន')],
      ],
    ),
    buildSentence(
      t(
        'Build the good habit: put the words in order.',
        'បង្កើតទម្លាប់ល្អ៖ តម្រៀបពាក្យឱ្យត្រូវលំដាប់។',
      ),
      'Save your work before you shut down.',
      { say: 'Save your work before you shut down.' },
    ),
  ),
  'using-the-mouse': game(
    catchIt(
      t('Catch the things you do with a MOUSE!', 'ចាប់អ្វីដែលអ្នកធ្វើជាមួយកណ្តុរ!'),
      [
        t('Click', 'ចុច'),
        t('Double-click', 'ចុចពីរដង'),
        t('Right-click', 'ចុចស្តាំ'),
        t('Drag', 'អូស'),
        t('Scroll', 'រំកិល'),
      ],
      [t('Type', 'វាយ'), t('Print', 'បោះពុម្ព'), t('Charge', 'សាកថ្ម'), t('Speak', 'និយាយ')],
    ),
    memory(
      t(
        'Match each mouse action to what it does.',
        'ផ្គូផ្គងសកម្មភាពកណ្តុរនីមួយៗជាមួយអ្វីដែលវាធ្វើ។',
      ),
      [
        [t('Click', 'ចុច'), t('Select', 'ជ្រើសរើស')],
        [t('Double-click', 'ចុចពីរដង'), t('Open', 'បើក')],
        [t('Right-click', 'ចុចស្តាំ'), t('Show a menu', 'បង្ហាញម៉ឺនុយ')],
        [t('Drag', 'អូស'), t('Move', 'ផ្លាស់ទី')],
      ],
    ),
  ),
  'right-click-and-drag': game(
    robot(
      t(
        'Drag the file to the folder 📁: guide the robot there.',
        'អូសឯកសារទៅថត 📁៖ ណែនាំរ៉ូបូតទៅទីនោះ។',
      ),
      ['S..#', '.#..', '.#.#', '...G'],
      { goalIcon: '📁' },
    ),
    memory(t('Match each action to what happens.', 'ផ្គូផ្គងសកម្មភាពនីមួយៗជាមួយអ្វីដែលកើតឡើង។'), [
      [
        t('Drag a file onto a folder', 'អូសឯកសារដាក់លើថត'),
        t('Moves it inside', 'ផ្លាស់វាចូលខាងក្នុង'),
      ],
      [
        t('Right-click a file', 'ចុចស្តាំលើឯកសារ'),
        t('Copy, Rename, Delete…', 'ចម្លង ប្តូរឈ្មោះ លុប…'),
      ],
      [t('Scroll wheel', 'កង់រំកិល'), t('Move up and down a page', 'រំកិលទំព័រឡើងចុះ')],
      [
        t('Long-press on a phone', 'ចុចសង្កត់លើទូរស័ព្ទ'),
        t('Same as right-click', 'ដូចការចុចស្តាំ'),
      ],
    ]),
  ),
  'the-keyboard': game(
    memory(t('Match each key to its job.', 'ផ្គូផ្គងគ្រាប់ចុចនីមួយៗជាមួយតួនាទី។'), [
      [['⏎', 'Enter'], t('New line / OK', 'បន្ទាត់ថ្មី / យល់ព្រម')],
      [['⌫', 'Backspace'], t('Delete to the left', 'លុបទៅខាងឆ្វេង')],
      [['⇧', 'Shift'], t('Capital letter', 'អក្សរធំ')],
      [['␣', t('Space bar', 'ដកឃ្លា')], t('A space between words', 'ចន្លោះរវាងពាក្យ')],
    ]),
    catchIt(
      t('Catch the HOME ROW keys (A S D F J K L)!', 'ចាប់គ្រាប់ចុចជួរដើម (A S D F J K L)!'),
      ['A', 'S', 'D', 'F', 'J', 'K', 'L'],
      ['Q', 'P', 'Z', 'M', 'T'],
      { speed: 'fast' },
    ),
  ),
  'typing-skills': game(
    typeIt(
      t('Typing race! Type this word: computer', 'ប្រណាំងវាយ! វាយពាក្យនេះ៖ computer'),
      'computer',
    ),
    typeIt(
      t(
        'Type the sentence exactly: I can type fast.',
        'វាយប្រយោគនេះឱ្យត្រឹមត្រូវ៖ I can type fast.',
      ),
      'I can type fast.',
    ),
  ),
  'copy-and-paste': game(
    memory(
      t('Match each shortcut to what it does.', 'ផ្គូផ្គងផ្លូវកាត់នីមួយៗជាមួយអ្វីដែលវាធ្វើ។'),
      [
        ['Ctrl + C', t('Copy', 'ចម្លង')],
        ['Ctrl + V', t('Paste', 'បិទភ្ជាប់')],
        ['Ctrl + X', t('Cut', 'កាត់')],
        ['Ctrl + Z', t('Undo', 'មិនធ្វើវិញ')],
      ],
    ),
    catchIt(
      t('Catch the shortcuts that use the Ctrl key!', 'ចាប់ផ្លូវកាត់ដែលប្រើគ្រាប់ចុច Ctrl!'),
      ['Ctrl + C', 'Ctrl + V', 'Ctrl + Z', 'Ctrl + S'],
      ['Alt + Tab', 'Shift + A', 'Windows + D', 'Enter'],
    ),
  ),
  'more-shortcuts': game(
    memory(
      t('Match each shortcut to what it does.', 'ផ្គូផ្គងផ្លូវកាត់នីមួយៗជាមួយអ្វីដែលវាធ្វើ។'),
      [
        ['Ctrl + S', t('Save', 'រក្សាទុក')],
        ['Ctrl + A', t('Select all', 'ជ្រើសទាំងអស់')],
        ['Ctrl + P', t('Print', 'បោះពុម្ព')],
        ['Ctrl + F', t('Find', 'ស្វែងរក')],
      ],
    ),
    catchIt(
      t('Catch the keys that help you fix a typing mistake!', 'ចាប់គ្រាប់ចុចដែលជួយកែកំហុសវាយ!'),
      ['Ctrl + Z', 'Backspace', 'Delete'],
      ['Ctrl + P', 'Ctrl + C', 'Ctrl + S', 'Ctrl + A'],
    ),
  ),
  'operating-systems': game(
    catchIt(
      t('Catch the OPERATING SYSTEMS!', 'ចាប់ប្រព័ន្ធប្រតិបត្តិការ!'),
      ['Windows', 'Android', 'macOS', 'iOS', 'Linux'],
      ['Chrome', 'Facebook', 'Word', 'Google', 'YouTube'],
    ),
    memory(
      t(
        'Match each operating system to where you find it.',
        'ផ្គូផ្គងប្រព័ន្ធប្រតិបត្តិការនីមួយៗជាមួយកន្លែងដែលអ្នករកឃើញវា។',
      ),
      [
        ['Windows', t('Most school PCs', 'កុំព្យូទ័រសាលាភាគច្រើន')],
        ['macOS', t('Apple computers', 'កុំព្យូទ័រ Apple')],
        ['Android', t('Samsung and many phones', 'Samsung និងទូរស័ព្ទជាច្រើន')],
        ['iOS', 'iPhone'],
      ],
    ),
  ),
  'files-and-folders': game(
    robot(
      t(
        'Collect the file 📄, then put it in the folder 📁.',
        'ប្រមូលឯកសារ 📄 រួចដាក់វាក្នុងថត 📁។',
      ),
      ['S.#.', '.*#.', '...G'],
      { goalIcon: '📁', collectIcon: '📄' },
    ),
    memory(t('Match each file ending to its type.', 'ផ្គូផ្គងកន្ទុយឯកសារនីមួយៗជាមួយប្រភេទ។'), [
      ['.docx', t('Word document', 'ឯកសារ Word')],
      ['.jpg', t('Photo', 'រូបថត')],
      ['.mp3', t('Music', 'តន្ត្រី')],
      ['.pdf', t('PDF document', 'ឯកសារ PDF')],
    ]),
  ),
  'organise-your-files': game(
    catchIt(
      t('Catch the GOOD file names!', 'ចាប់ឈ្មោះឯកសារល្អ!'),
      ['math-homework-week1', 'cv-sokha-2028', 'trip-photos-angkor', 'budget-may'],
      ['asdfgh', 'New file (7)', 'untitled', 'final final 2'],
      { speed: 'slow' },
    ),
    robot(
      t('Find the way through the folders to “Homework” 📂.', 'រកផ្លូវកាត់តាមថតទៅ «Homework» 📂។'),
      ['S.#..', '#.#.#', '#...#', '###.G'],
      { goalIcon: '📂' },
    ),
  ),
  'storage-and-memory': game(
    memory(t('Match each kind of storage to what it is.', 'ផ្គូផ្គងប្រភេទឧបករណ៍ផ្ទុកនីមួយៗ។'), [
      ['RAM', t('Short-term memory', 'ការចងចាំរយៈពេលខ្លី')],
      ['SSD', t('Keeps files when off', 'រក្សាឯកសារពេលបិទ')],
      [t('Cloud', 'ពពក (Cloud)'), t('Storage on the internet', 'ការផ្ទុកលើអ៊ីនធឺណិត')],
      [t('USB stick', 'ឧបករណ៍ USB'), t('Files in your pocket', 'ឯកសារក្នុងហោប៉ៅ')],
    ]),
    catchIt(
      t(
        'Catch the storage that KEEPS files when the power is off!',
        'ចាប់ឧបករណ៍ផ្ទុកដែលរក្សាឯកសារពេលដាច់ភ្លើង!',
      ),
      [
        'SSD',
        t('Hard disk', 'ថាសរឹង'),
        t('USB stick', 'ឧបករណ៍ USB'),
        t('Memory card', 'កាតមេម៉ូរី'),
        t('Cloud drive', 'ថាសលើពពក'),
      ],
      ['RAM', 'CPU', t('Monitor', 'អេក្រង់'), t('Speaker', 'ឧបករណ៍បំពងសំឡេង')],
    ),
  ),
  'download-and-upload': game(
    memory(t('Match each word to its meaning.', 'ផ្គូផ្គងពាក្យនីមួយៗជាមួយអត្ថន័យ។'), [
      [['⬇️', t('Download', 'ទាញយក')], t('Internet → your device', 'អ៊ីនធឺណិត → ឧបករណ៍របស់អ្នក')],
      [['⬆️', t('Upload', 'ផ្ទុកឡើង')], t('Your device → internet', 'ឧបករណ៍របស់អ្នក → អ៊ីនធឺណិត')],
      [
        ['📎', t('Attachment', 'ឯកសារភ្ជាប់')],
        t('A file sent with an email', 'ឯកសារផ្ញើជាមួយអ៊ីមែល'),
      ],
      [
        ['📂', t('Downloads folder', 'ថត Downloads')],
        t('Where saved files usually go', 'កន្លែងឯកសារទាញយកទៅ'),
      ],
    ]),
    catchIt(
      t(
        'Catch the UPLOADS (from your device to the internet)!',
        'ចាប់ការផ្ទុកឡើង (ពីឧបករណ៍ទៅអ៊ីនធឺណិត)!',
      ),
      [
        t('Posting a photo', 'បង្ហោះរូបថត'),
        t('Sending a file by email', 'ផ្ញើឯកសារតាមអ៊ីមែល'),
        t('Saving to Google Drive', 'រក្សាទុកក្នុង Google Drive'),
      ],
      [
        t('Saving a photo from a chat', 'រក្សាទុករូបពីការជជែក'),
        t('Installing an app', 'ដំឡើងកម្មវិធី'),
        t('Opening a web page', 'បើកទំព័រវេប'),
      ],
      { speed: 'slow' },
    ),
  ),
};
