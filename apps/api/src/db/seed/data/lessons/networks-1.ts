import { t, type LessonSeed } from '../../types';
import {
  buildSentence,
  catchIt,
  match,
  mc,
  memory,
  num,
  order,
  plannedLesson,
  robot,
  sortInto,
  tf,
  typeIt,
} from '../dsl';

// 🛠️ Networks & Hardware, lessons 1–8: inside the computer (networks-2.ts has 9–15).
// Khmer (km) strings are DRAFTS for native review.
export const NETWORK_WORLD = 'networks-hardware';
const W = NETWORK_WORLD;

export const NETWORK_LESSONS_1: LessonSeed[] = [
  // 1 ─────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'inside-the-computer',
    '🔩',
    t('Inside the Computer', 'ខាងក្នុងកុំព្យូទ័រ'),
    t('The main parts on the motherboard.', 'ផ្នែកសំខាន់ៗលើ motherboard។'),
    {
      intro: [
        '🔩',
        t(
          'Open a computer and you find a city of parts. Let’s meet them!',
          'បើកកុំព្យូទ័រ ហើយអ្នកឃើញទីក្រុងនៃគ្រឿង។ តោះស្គាល់វា!',
        ),
      ],
      learn: [
        [
          '🧠',
          'CPU',
          t(
            'The processor — the brain that does the thinking.',
            'ខួរក្បាលដំណើរការ — ខួរក្បាលដែលគិត។',
          ),
          'processor',
        ],
        [
          '⚡',
          'RAM',
          t(
            'Short-term memory for what is open right now.',
            'ការចងចាំរយៈពេលខ្លីសម្រាប់អ្វីដែលបើកឥឡូវនេះ។',
          ),
          'memory',
        ],
        [
          '💽',
          t('Storage (SSD / HDD)', 'ការផ្ទុក (SSD / HDD)'),
          t(
            'Long-term memory: files stay even when power is off.',
            'ការចងចាំរយៈពេលវែង៖ ឯកសារនៅដដែលទោះបិទថាមពល។',
          ),
          'storage',
        ],
        [
          '🟩',
          t('Motherboard', 'Motherboard'),
          t('The big board that connects every part.', 'បន្ទះធំដែលភ្ជាប់គ្រប់គ្រឿង។'),
          'motherboard',
        ],
        [
          '🔌',
          'PSU',
          t(
            'Power supply — turns wall power into computer power.',
            'ប្រភពថាមពល — ប្តូរភ្លើងជញ្ជាំងទៅជាថាមពលកុំព្យូទ័រ។',
          ),
        ],
      ],
      see: [
        t(
          'CPU 🧠 = the chef\nRAM ⚡ = the kitchen table\nStorage 💽 = the fridge\nMotherboard 🟩 = the kitchen itself',
          'CPU 🧠 = ចុងភៅ\nRAM ⚡ = តុផ្ទះបាយ\nការផ្ទុក 💽 = ទូទឹកកក\nMotherboard 🟩 = ផ្ទះបាយខ្លួនឯង',
        ),
        t(
          'The chef takes food from the fridge to the table to cook.',
          'ចុងភៅយកម្ហូបពីទូទឹកកកមកតុដើម្បីចម្អិន។',
        ),
      ],
      words: [
        ['processor', 'ខួរក្បាលដំណើរការ', '🧠'],
        ['memory', 'ការចងចាំ', '⚡'],
        ['motherboard', 'បន្ទះមេ', '🟩'],
        ['fan', 'កង្ហារ', '🌀'],
      ],
      play: [
        mc(
          t('Which part is the “brain” of the computer?', 'តើគ្រឿងណាជា «ខួរក្បាល» នៃកុំព្យូទ័រ?'),
          'CPU',
          ['RAM', 'SSD', t('Mouse', 'កណ្តុរ')],
        ),
        mc(
          t('Which part connects all the others?', 'តើគ្រឿងណាភ្ជាប់គ្រឿងផ្សេងទាំងអស់?'),
          t('Motherboard', 'Motherboard'),
          ['RAM', t('Fan', 'កង្ហារ'), t('Monitor', 'អេក្រង់')],
        ),
        mc(
          t(
            'Where do your photos stay when the computer is off?',
            'តើរូបថតរបស់អ្នកនៅឯណាពេលកុំព្យូទ័របិទ?',
          ),
          t('Storage (SSD/HDD)', 'ការផ្ទុក (SSD/HDD)'),
          ['RAM', 'CPU', t('Fan', 'កង្ហារ')],
        ),
        tf(
          t(
            'RAM forgets everything when the power goes off.',
            'RAM បំភ្លេចអ្វីៗទាំងអស់ពេលថាមពលបិទ។',
          ),
          true,
        ),
        mc(
          t('What does the PSU do?', 'តើ PSU ធ្វើអ្វី?'),
          t('Gives power to all the parts', 'ផ្តល់ថាមពលដល់គ្រប់គ្រឿង'),
          [t('Shows pictures', 'បង្ហាញរូបភាព'), t('Stores files', 'រក្សាទុកឯកសារ')],
        ),
        mc(
          t('Why does a computer have fans?', 'ហេតុអ្វីកុំព្យូទ័រមានកង្ហារ?'),
          t('To keep parts cool', 'ដើម្បីរក្សាគ្រឿងឱ្យត្រជាក់'),
          [t('To make music', 'ដើម្បីបង្កើតតន្ត្រី'), t('To save files', 'ដើម្បីរក្សាទុកឯកសារ')],
        ),
        tf(
          t('The monitor is inside the computer case.', 'អេក្រង់នៅក្នុងប្រអប់កុំព្យូទ័រ។'),
          false,
          {
            explanation: t(
              'The monitor is an outside (peripheral) device.',
              'អេក្រង់ជាឧបករណ៍ខាងក្រៅ (peripheral)។',
            ),
          },
        ),
        mc(t('CPU stands for…', 'CPU មកពី…'), 'Central Processing Unit', [
          'Computer Power Unit',
          'Central Picture Unit',
          'Cable Plug Unit',
        ]),
      ],
      challenge: [
        match(t('Match the part to the kitchen.', 'ផ្គូផ្គងគ្រឿងជាមួយផ្ទះបាយ។'), [
          ['CPU', t('Chef', 'ចុងភៅ')],
          ['RAM', t('Table', 'តុ')],
          ['SSD', t('Fridge', 'ទូទឹកកក')],
          ['PSU', t('Gas and electricity', 'ហ្គាស និងអគ្គិសនី')],
        ]),
        sortInto(
          t('Inside the case or outside?', 'ខាងក្នុងប្រអប់ ឬខាងក្រៅ?'),
          [
            ['in', t('Inside', 'ខាងក្នុង'), '📦'],
            ['out', t('Outside', 'ខាងក្រៅ'), '🖱️'],
          ],
          [
            ['CPU', 'in'],
            ['RAM', 'in'],
            [t('Motherboard', 'Motherboard'), 'in'],
            [t('Keyboard', 'ក្តារចុច'), 'out'],
            [t('Monitor', 'អេក្រង់'), 'out'],
            [t('Printer', 'ម៉ាស៊ីនបោះពុម្ព'), 'out'],
          ],
        ),
        order(t('Order the journey when you open a photo.', 'តម្រៀបដំណើរពេលអ្នកបើករូបថត។'), [
          t('Photo is on the SSD', 'រូបថតនៅលើ SSD'),
          t('It is copied into RAM', 'វាត្រូវបានចម្លងទៅ RAM'),
          t('The CPU processes it', 'CPU ដំណើរការវា'),
          t('It shows on the monitor', 'វាបង្ហាញលើអេក្រង់'),
        ]),
        mc(
          t(
            'You open 30 tabs and the computer slows down. Which part is probably full?',
            'អ្នកបើក 30 ផ្ទាំង ហើយកុំព្យូទ័រយឺត។ តើគ្រឿងណាប្រហែលពេញ?',
          ),
          'RAM',
          [t('Monitor', 'អេក្រង់'), t('Keyboard', 'ក្តារចុច'), 'PSU'],
        ),
        tf(
          t(
            'A laptop has the same main parts as a desktop, just smaller.',
            'កុំព្យូទ័រយួរដៃមានគ្រឿងសំខាន់ដូចកុំព្យូទ័រលើតុ គ្រាន់តែតូចជាង។',
          ),
          true,
        ),
        tf(
          t('A phone also has a CPU, RAM and storage.', 'ទូរស័ព្ទក៏មាន CPU, RAM និងការផ្ទុកដែរ។'),
          true,
        ),
        mc(
          t(
            'Which part draws pictures fast for games and video?',
            'តើគ្រឿងណាគូររូបភាពលឿនសម្រាប់ហ្គេម និងវីដេអូ?',
          ),
          'GPU',
          ['PSU', 'USB', 'RAM'],
        ),
        buildSentence(
          t('Build the sentence.', 'បង្កើតប្រយោគ។'),
          'The CPU thinks and the RAM remembers.',
          { say: 'The CPU thinks, and the RAM remembers.' },
        ),
      ],
      games: [
        memory(t('Match each part to its picture.', 'ផ្គូផ្គងគ្រឿងនីមួយៗជាមួយរូបភាព។'), [
          ['CPU', '🧠'],
          ['RAM', '⚡'],
          ['SSD', '💽'],
          ['PSU', '🔌'],
        ]),
        catchIt(
          t('Catch the parts INSIDE the computer!', 'ចាប់គ្រឿងខាងក្នុងកុំព្យូទ័រ!'),
          ['CPU', 'RAM', 'SSD', 'GPU', t('Fan', 'កង្ហារ')],
          [t('Mouse', 'កណ្តុរ'), t('Printer', 'ម៉ាស៊ីនបោះពុម្ព'), t('Speaker', 'ឧបករណ៍បំពងសំឡេង')],
          { speed: 'slow' },
        ),
      ],
      reward: t(
        'You can name the parts inside a computer! 🔩',
        'អ្នកអាចដាក់ឈ្មោះគ្រឿងខាងក្នុងកុំព្យូទ័រ! 🔩',
      ),
    },
  ),

  // 2 ─────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'cpu-and-ram',
    '🧠',
    t('CPU & RAM: Speed and Space', 'CPU និង RAM៖ ល្បឿន និងទំហំ'),
    t('GHz, cores and gigabytes explained.', 'ពន្យល់ GHz, core និង gigabyte។'),
    {
      intro: [
        '🧠',
        t(
          'Shops say “Core i5, 3.2 GHz, 8 GB RAM”. What does it mean? Let’s decode it!',
          'ហាងនិយាយ «Core i5, 3.2 GHz, 8 GB RAM»។ តើវាមានន័យអ្វី? តោះបកស្រាយ!',
        ),
      ],
      learn: [
        [
          '⏱️',
          'GHz',
          t(
            'Gigahertz: how many billion steps the CPU does each second.',
            'Gigahertz៖ CPU ធ្វើប៉ុន្មានពាន់លានជំហានក្នុងមួយវិនាទី។',
          ),
          'speed',
        ],
        [
          '👥',
          t('Cores', 'Core'),
          t(
            'Each core is a worker. 4 cores = 4 jobs at once.',
            'core នីមួយៗជាកម្មករ។ 4 core = ការងារ 4 ក្នុងពេលតែមួយ។',
          ),
          'core',
        ],
        [
          '📏',
          'GB',
          t(
            'Gigabytes measure memory size. More RAM = more open apps.',
            'Gigabyte វាស់ទំហំការចងចាំ។ RAM ច្រើន = កម្មវិធីបើកច្រើន។',
          ),
          'gigabyte',
        ],
      ],
      see: [
        t(
          'Phone A: 4 GB RAM → 5 apps open smoothly\nPhone B: 8 GB RAM → 12 apps open smoothly',
          'ទូរស័ព្ទ A: 4 GB RAM → កម្មវិធី 5 បើករលូន\nទូរស័ព្ទ B: 8 GB RAM → កម្មវិធី 12 បើករលូន',
        ),
        t(
          'More RAM lets you switch apps without reloading.',
          'RAM ច្រើនអនុញ្ញាតឱ្យអ្នកប្តូរកម្មវិធីដោយមិនចាំបាច់ផ្ទុកឡើងវិញ។',
        ),
      ],
      words: [
        ['speed', 'ល្បឿន', '⏱️'],
        ['core', 'ស្នូល'],
        ['gigabyte', 'ជីកាបៃ'],
        ['fast', 'លឿន', '🚀'],
      ],
      play: [
        mc(t('What does GHz measure?', 'តើ GHz វាស់អ្វី?'), t('CPU speed', 'ល្បឿន CPU'), [
          t('Screen size', 'ទំហំអេក្រង់'),
          t('Battery life', 'អាយុថ្ម'),
        ]),
        mc(
          t('What does GB measure?', 'តើ GB វាស់អ្វី?'),
          t('Memory or storage size', 'ទំហំការចងចាំ ឬការផ្ទុក'),
          [t('Speed', 'ល្បឿន'), t('Weight', 'ទម្ងន់')],
        ),
        mc(t('Which CPU is faster (same type)?', 'តើ CPU ណាលឿនជាង (ប្រភេទដូចគ្នា)?'), '3.5 GHz', [
          '2.0 GHz',
          '1.2 GHz',
          '0.8 GHz',
        ]),
        mc(
          t('Which laptop can keep more apps open?', 'តើកុំព្យូទ័រយួរដៃណាអាចបើកកម្មវិធីច្រើនជាង?'),
          '16 GB RAM',
          ['4 GB RAM', '2 GB RAM', '8 GB RAM'],
        ),
        tf(
          t(
            'A CPU with 8 cores can work on 8 jobs at once.',
            'CPU មាន 8 core អាចធ្វើការលើការងារ 8 ក្នុងពេលតែមួយ។',
          ),
          true,
        ),
        tf(
          t(
            'More RAM makes your files take up less space.',
            'RAM ច្រើនធ្វើឱ្យឯកសាររបស់អ្នកប្រើកន្លែងតិច។',
          ),
          false,
        ),
        mc(
          t('About how many MB is 1 GB?', 'តើ 1 GB ស្មើប្រហែលប៉ុន្មាន MB?'),
          t('About 1,000', 'ប្រហែល 1,000'),
          [
            t('About 10', 'ប្រហែល 10'),
            t('About 100', 'ប្រហែល 100'),
            t('About 1,000,000', 'ប្រហែល 1,000,000'),
          ],
          {
            explanation: t(
              'About 1,000 (exactly 1,024 in binary).',
              'ប្រហែល 1,000 (ពិតប្រាកដ 1,024 ក្នុងប្រព័ន្ធគោលពីរ)។',
            ),
          },
        ),
        mc(t('Which is the biggest?', 'តើមួយណាធំបំផុត?'), '1 TB', ['1 GB', '1 MB', '1 KB']),
      ],
      challenge: [
        order(t('Order from smallest to biggest.', 'តម្រៀបពីតូចបំផុតទៅធំបំផុត។'), [
          'KB',
          'MB',
          'GB',
          'TB',
        ]),
        num(
          t(
            '8 GB RAM. Apps use 2 GB + 3 GB + 1 GB. How many GB are free?',
            'RAM 8 GB។ កម្មវិធីប្រើ 2 GB + 3 GB + 1 GB។ តើនៅទំនេរប៉ុន្មាន GB?',
          ),
          2,
        ),
        num(
          t(
            'A 4-core CPU. Each core does 3 billion steps a second. How many billion steps in total?',
            'CPU 4 core។ core នីមួយៗធ្វើ 3 ពាន់លានជំហានក្នុងមួយវិនាទី។ តើសរុបប៉ុន្មានពាន់លាន?',
          ),
          12,
        ),
        mc(
          t(
            'A student mostly writes documents and browses. Best value?',
            'សិស្សភាគច្រើនសរសេរឯកសារ និងរុករក។ តម្លៃល្អបំផុត?',
          ),
          t('8 GB RAM, normal CPU', 'RAM 8 GB, CPU ធម្មតា'),
          [t('64 GB RAM, gaming CPU', 'RAM 64 GB, CPU ហ្គេម'), t('1 GB RAM', 'RAM 1 GB')],
        ),
        tf(
          t(
            'Closing apps you are not using frees up RAM.',
            'ការបិទកម្មវិធីដែលអ្នកមិនប្រើធ្វើឱ្យ RAM ទំនេរ។',
          ),
          true,
        ),
        match(t('Match the word to its meaning.', 'ផ្គូផ្គងពាក្យជាមួយអត្ថន័យ។'), [
          ['GHz', t('How fast', 'លឿនប៉ុណ្ណា')],
          [t('Cores', 'Core'), t('How many workers', 'កម្មករប៉ុន្មាន')],
          ['GB of RAM', t('How much open at once', 'បើកបានប៉ុណ្ណាក្នុងពេលតែមួយ')],
        ]),
        mc(
          t('Where can you see RAM use on Windows?', 'តើអ្នកអាចមើលការប្រើ RAM លើ Windows នៅឯណា?'),
          t('Task Manager (Ctrl+Shift+Esc)', 'Task Manager (Ctrl+Shift+Esc)'),
          [t('Paint', 'Paint'), t('Calculator', 'ម៉ាស៊ីនគិតលេខ')],
        ),
        buildSentence(
          t('Build the sentence.', 'បង្កើតប្រយោគ។'),
          'More RAM lets you open more apps.',
          { say: 'More RAM lets you open more apps.' },
        ),
      ],
      games: [
        catchIt(
          t('Catch the SPEED and SIZE units!', 'ចាប់ឯកតាល្បឿន និងទំហំ!'),
          ['GHz', 'GB', 'MB', 'TB'],
          ['kg', 'cm', '°C', 'km/h'],
          { speed: 'normal' },
        ),
        memory(t('Match the size to an example.', 'ផ្គូផ្គងទំហំជាមួយឧទាហរណ៍។'), [
          ['KB', t('A short text', 'អត្ថបទខ្លី')],
          ['MB', t('A photo', 'រូបថត')],
          ['GB', t('A movie', 'ភាពយន្ត')],
          ['TB', t('A whole library', 'បណ្ណាល័យទាំងមូល')],
        ]),
      ],
      reward: t(
        'Now you can read a computer’s spec sheet like a pro. 🧠',
        'ឥឡូវអ្នកអាចអានលក្ខណៈបច្ចេកទេសកុំព្យូទ័រដូចអ្នកជំនាញ។ 🧠',
      ),
    },
  ),

  // 3 ─────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'storage-drives',
    '💽',
    t('Storage: HDD, SSD and More', 'ការផ្ទុក៖ HDD, SSD និងផ្សេងទៀត'),
    t('Where files live — and which is fastest.', 'កន្លែងដែលឯកសាររស់នៅ — ហើយមួយណាលឿនបំផុត។'),
    {
      intro: [
        '💽',
        t(
          'Your photos, apps and Windows itself all live on a storage drive.',
          'រូបថត កម្មវិធី និង Windows ខ្លួនឯង រស់នៅលើឧបករណ៍ផ្ទុក។',
        ),
      ],
      learn: [
        [
          '💿',
          'HDD',
          t(
            'Hard disk: a spinning metal disk. Big and cheap, but slower.',
            'ថាសរឹង៖ ថាសដែកវិល។ ធំ និងថោក តែយឺតជាង។',
          ),
          'disk',
        ],
        [
          '⚡',
          'SSD',
          t(
            'Solid-state drive: no moving parts. Very fast and quiet.',
            'ឧបករណ៍ផ្ទុករឹង៖ គ្មានផ្នែកផ្លាស់ទី។ លឿនណាស់ និងស្ងាត់។',
          ),
          'drive',
        ],
        [
          '🔑',
          t('USB flash drive', 'ឧបករណ៍ផ្ទុក USB'),
          t('A small drive you carry in your pocket.', 'ឧបករណ៍ផ្ទុកតូចដែលអ្នកដាក់ក្នុងហោប៉ៅ។'),
        ],
        [
          '☁️',
          t('Cloud', 'ពពក'),
          t(
            'Storage on someone’s servers, reached over the internet.',
            'ការផ្ទុកលើម៉ាស៊ីនមេរបស់គេ ចូលតាមអ៊ីនធឺណិត។',
          ),
          'cloud',
        ],
      ],
      see: [
        t(
          'Start Windows from HDD: about 60 seconds\nStart Windows from SSD: about 10 seconds',
          'ចាប់ផ្តើម Windows ពី HDD៖ ប្រហែល 60 វិនាទី\nចាប់ផ្តើម Windows ពី SSD៖ ប្រហែល 10 វិនាទី',
        ),
        t(
          'Changing an old HDD to an SSD makes an old computer feel new.',
          'ការប្តូរ HDD ចាស់ទៅ SSD ធ្វើឱ្យកុំព្យូទ័រចាស់មានអារម្មណ៍ថ្មី។',
        ),
      ],
      words: [
        ['drive', 'ឧបករណ៍ផ្ទុក', '💽'],
        ['disk', 'ថាស', '💿'],
        ['backup', 'ច្បាប់ចម្លងបម្រុង'],
        ['space', 'ទំហំទំនេរ'],
      ],
      play: [
        mc(t('Which drive is fastest?', 'តើឧបករណ៍ផ្ទុកណាលឿនបំផុត?'), 'SSD', [
          'HDD',
          t('DVD', 'DVD'),
          t('Floppy disk', 'ថាសទន់'),
        ]),
        mc(
          t('Which drive has a spinning disk inside?', 'តើឧបករណ៍ផ្ទុកណាមានថាសវិលខាងក្នុង?'),
          'HDD',
          ['SSD', t('USB flash drive', 'ឧបករណ៍ផ្ទុក USB'), 'RAM'],
        ),
        tf(t('An SSD has no moving parts.', 'SSD គ្មានផ្នែកផ្លាស់ទី។'), true),
        mc(
          t(
            'Which do you carry in your pocket to share files?',
            'តើមួយណាដែលអ្នកដាក់ក្នុងហោប៉ៅដើម្បីចែករំលែកឯកសារ?',
          ),
          t('USB flash drive', 'ឧបករណ៍ផ្ទុក USB'),
          ['HDD', 'CPU', 'PSU'],
        ),
        tf(
          t(
            'Cloud storage needs the internet to reach your files.',
            'ការផ្ទុកពពកត្រូវការអ៊ីនធឺណិតដើម្បីចូលឯកសាររបស់អ្នក។',
          ),
          true,
        ),
        mc(t('Which is a cloud storage service?', 'តើមួយណាជាសេវាការផ្ទុកពពក?'), 'Google Drive', [
          'Notepad',
          'Paint',
          'Calculator',
        ]),
        mc(
          t(
            'Dropping a laptop is MORE dangerous for which drive?',
            'ការទម្លាក់កុំព្យូទ័រយួរដៃគ្រោះថ្នាក់ជាងសម្រាប់ឧបករណ៍ផ្ទុកណា?',
          ),
          'HDD',
          ['SSD', t('Both the same', 'ដូចគ្នាទាំងពីរ')],
          {
            explanation: t(
              'Moving parts can be damaged by a bump.',
              'ផ្នែកផ្លាស់ទីអាចខូចដោយការប៉ះទង្គិច។',
            ),
          },
        ),
        num(
          t(
            'A 256 GB SSD has 200 GB used. How many GB are free?',
            'SSD 256 GB បានប្រើ 200 GB។ តើនៅទំនេរប៉ុន្មាន GB?',
          ),
          56,
        ),
      ],
      challenge: [
        sortInto(
          t('Fast or slow storage?', 'ការផ្ទុកលឿន ឬយឺត?'),
          [
            ['f', t('Fast', 'លឿន'), '⚡'],
            ['s', t('Slower', 'យឺតជាង'), '🐢'],
          ],
          [
            ['NVMe SSD', 'f'],
            ['SATA SSD', 'f'],
            [t('RAM', 'RAM'), 'f'],
            ['HDD', 's'],
            ['DVD', 's'],
            [t('Old USB 2.0 stick', 'USB 2.0 ចាស់'), 's'],
          ],
        ),
        mc(
          t('What is the 3-2-1 backup rule?', 'តើច្បាប់បម្រុង 3-2-1 គឺអ្វី?'),
          t(
            '3 copies, 2 kinds of storage, 1 somewhere else',
            'ច្បាប់ចម្លង 3 ការផ្ទុក 2 ប្រភេទ 1 នៅកន្លែងផ្សេង',
          ),
          [
            t('Back up 3 times a year', 'បម្រុង 3 ដងក្នុងមួយឆ្នាំ'),
            t('3 passwords', 'ពាក្យសម្ងាត់ 3'),
          ],
        ),
        num(
          t(
            'A movie is 2 GB. How many fit on a 32 GB USB drive?',
            'ភាពយន្ត 2 GB។ តើប៉ុន្មានដាក់បានលើ USB 32 GB?',
          ),
          16,
        ),
        mc(
          t(
            'Your laptop says “Disk full”. Best first step?',
            'កុំព្យូទ័រយួរដៃរបស់អ្នកនិយាយ «ថាសពេញ»។ ជំហានដំបូងល្អបំផុត?',
          ),
          t('Delete old downloads and empty the Recycle Bin', 'លុបការទាញយកចាស់ និងសម្អាតធុងសំរាម'),
          [t('Buy a new laptop', 'ទិញកុំព្យូទ័រថ្មី'), t('Delete Windows', 'លុប Windows')],
        ),
        tf(
          t(
            'If you only keep files in one place, you can lose them all.',
            'ប្រសិនបើអ្នករក្សាទុកឯកសារតែកន្លែងមួយ អ្នកអាចបាត់វាទាំងអស់។',
          ),
          true,
        ),
        match(t('Match the storage to its best use.', 'ផ្គូផ្គងការផ្ទុកជាមួយការប្រើល្អបំផុត។'), [
          ['SSD', t('Windows and apps', 'Windows និងកម្មវិធី')],
          ['HDD', t('Big cheap archive', 'បណ្ណសារធំថោក')],
          ['USB', t('Carry files to school', 'យកឯកសារទៅសាលា')],
          [t('Cloud', 'ពពក'), t('Backup and sharing', 'បម្រុង និងចែករំលែក')],
        ]),
        order(
          t('Order these from smallest to biggest capacity.', 'តម្រៀបពីសមត្ថភាពតូចបំផុតទៅធំបំផុត។'),
          ['16 GB USB', '256 GB SSD', '1 TB HDD', '4 TB HDD'],
        ),
        buildSentence(
          t('Build the rule.', 'បង្កើតច្បាប់។'),
          'Always keep a backup of important files.',
          { say: 'Always keep a backup of important files.' },
        ),
      ],
      games: [
        memory(t('Match the storage to its picture.', 'ផ្គូផ្គងការផ្ទុកជាមួយរូបភាព។'), [
          ['HDD', '💿'],
          ['SSD', '⚡'],
          ['USB', '🔑'],
          [t('Cloud', 'ពពក'), '☁️'],
        ]),
        catchIt(
          t('Catch the STORAGE devices!', 'ចាប់ឧបករណ៍ផ្ទុក!'),
          ['SSD', 'HDD', t('USB stick', 'USB'), t('SD card', 'កាត SD')],
          ['CPU', t('Mouse', 'កណ្តុរ'), t('Webcam', 'កាមេរ៉ា'), 'PSU'],
          { speed: 'normal' },
        ),
      ],
      reward: t(
        'You know where files live — and how to keep them safe. 💽',
        'អ្នកដឹងកន្លែងដែលឯកសាររស់នៅ — និងរបៀបរក្សាវាឱ្យមានសុវត្ថិភាព។ 💽',
      ),
    },
  ),

  // 4 ─────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'ports-and-cables',
    '🔌',
    t('Ports & Cables', 'រន្ធ និងខ្សែ'),
    t('USB, HDMI, Ethernet and power plugs.', 'USB, HDMI, Ethernet និងដោតថាមពល។'),
    {
      intro: [
        '🔌',
        t(
          'So many holes on a laptop! Each port has a job.',
          'រន្ធច្រើនណាស់លើកុំព្យូទ័រយួរដៃ! រន្ធនីមួយៗមានតួនាទី។',
        ),
      ],
      learn: [
        [
          '🔌',
          'USB-A / USB-C',
          t(
            'Connect mice, keyboards, drives, phones. USB-C fits either way up.',
            'ភ្ជាប់កណ្តុរ ក្តារចុច ឧបករណ៍ផ្ទុក ទូរស័ព្ទ។ USB-C ដោតបានទាំងសងខាង។',
          ),
          'port',
        ],
        [
          '📺',
          'HDMI',
          t(
            'Sends picture and sound to a TV or projector.',
            'ផ្ញើរូបភាព និងសំឡេងទៅទូរទស្សន៍ ឬម៉ាស៊ីនបញ្ចាំង។',
          ),
          'cable',
        ],
        [
          '🌐',
          t('Ethernet (RJ45)', 'Ethernet (RJ45)'),
          t(
            'A wired network cable — faster and steadier than Wi-Fi.',
            'ខ្សែបណ្តាញ — លឿន និងមានស្ថិរភាពជាង Wi-Fi។',
          ),
          'ethernet',
        ],
        [
          '🎧',
          t('Audio jack', 'រន្ធសំឡេង'),
          t('The small round hole for headphones.', 'រន្ធមូលតូចសម្រាប់កាស។'),
        ],
      ],
      see: [
        t(
          'Laptop → HDMI cable → projector = your slides on the big screen',
          'កុំព្យូទ័រយួរដៃ → ខ្សែ HDMI → ម៉ាស៊ីនបញ្ចាំង = ស្លាយរបស់អ្នកលើអេក្រង់ធំ',
        ),
        t('The right cable for the right job.', 'ខ្សែត្រឹមត្រូវសម្រាប់ការងារត្រឹមត្រូវ។'),
      ],
      words: [
        ['cable', 'ខ្សែ', '🔌'],
        ['port', 'រន្ធ'],
        ['plug', 'ដោត'],
        ['charger', 'ឆ្នាំងសាក', '🔋'],
      ],
      play: [
        mc(
          t(
            'Which cable connects a laptop to a projector?',
            'តើខ្សែណាភ្ជាប់កុំព្យូទ័រយួរដៃទៅម៉ាស៊ីនបញ្ចាំង?',
          ),
          'HDMI',
          [t('Audio jack', 'រន្ធសំឡេង'), 'Ethernet', t('Power cable', 'ខ្សែថាមពល')],
        ),
        mc(
          t(
            'Which cable gives a wired internet connection?',
            'តើខ្សែណាផ្តល់ការតភ្ជាប់អ៊ីនធឺណិតតាមខ្សែ?',
          ),
          'Ethernet',
          ['HDMI', t('Audio jack', 'រន្ធសំឡេង'), 'VGA'],
        ),
        mc(t('Which port fits either way up?', 'តើរន្ធណាដោតបានទាំងសងខាង?'), 'USB-C', [
          'USB-A',
          'VGA',
          'HDMI',
        ]),
        tf(t('HDMI carries both picture and sound.', 'HDMI បញ្ជូនទាំងរូបភាព និងសំឡេង។'), true),
        mc(
          t('Which is the best port for a USB mouse?', 'តើរន្ធណាល្អបំផុតសម្រាប់កណ្តុរ USB?'),
          'USB',
          ['HDMI', 'Ethernet', t('Audio jack', 'រន្ធសំឡេង')],
        ),
        tf(
          t('Ethernet is usually steadier than Wi-Fi.', 'Ethernet ជាធម្មតាមានស្ថិរភាពជាង Wi-Fi។'),
          true,
        ),
        mc(
          t('Which do you plug headphones into?', 'តើអ្នកដោតកាសចូលអ្វី?'),
          t('Audio jack', 'រន្ធសំឡេង'),
          ['Ethernet', 'HDMI', 'VGA'],
        ),
        tf(
          t('You should pull a cable out by yanking the wire.', 'អ្នកគួរដកខ្សែចេញដោយទាញខ្សែ។'),
          false,
          {
            explanation: t(
              'Hold the plug, not the wire, so it does not break.',
              'កាន់ក្បាលដោត មិនមែនខ្សែ ដើម្បីកុំឱ្យវាខូច។',
            ),
          },
        ),
      ],
      challenge: [
        match(t('Match the port to its job.', 'ផ្គូផ្គងរន្ធជាមួយតួនាទី។'), [
          ['HDMI', t('Picture to a TV', 'រូបភាពទៅទូរទស្សន៍')],
          ['Ethernet', t('Wired internet', 'អ៊ីនធឺណិតតាមខ្សែ')],
          ['USB-C', t('Charge and data', 'សាក និងទិន្នន័យ')],
          [t('Audio jack', 'រន្ធសំឡេង'), t('Headphones', 'កាស')],
        ]),
        mc(
          t(
            'The projector shows “No signal”. First check?',
            'ម៉ាស៊ីនបញ្ចាំងបង្ហាញ «គ្មានសញ្ញា»។ ពិនិត្យអ្វីមុន?',
          ),
          t('Is the HDMI cable plugged in firmly at both ends?', 'តើខ្សែ HDMI ដោតជាប់ទាំងសងខាងទេ?'),
          [
            t('Buy a new projector', 'ទិញម៉ាស៊ីនបញ្ចាំងថ្មី'),
            t('Restart the router', 'ចាប់ផ្តើម router ឡើងវិញ'),
          ],
        ),
        sortInto(
          t('Video cable or not?', 'ខ្សែវីដេអូ ឬមិនមែន?'),
          [
            ['v', t('Video', 'វីដេអូ'), '📺'],
            ['n', t('Not video', 'មិនមែនវីដេអូ'), '🔌'],
          ],
          [
            ['HDMI', 'v'],
            ['VGA', 'v'],
            ['DisplayPort', 'v'],
            ['Ethernet', 'n'],
            [t('Audio jack', 'រន្ធសំឡេង'), 'n'],
            [t('Power cable', 'ខ្សែថាមពល'), 'n'],
          ],
        ),
        tf(
          t(
            'Using a cheap fake charger can damage your phone battery.',
            'ការប្រើឆ្នាំងសាកក្លែងក្លាយថោកអាចធ្វើឱ្យខូចថ្មទូរស័ព្ទរបស់អ្នក។',
          ),
          true,
        ),
        mc(
          t(
            'Plugging a found USB stick into a school computer is…',
            'ការដោត USB ដែលរកឃើញចូលកុំព្យូទ័រសាលាគឺ…',
          ),
          t('risky — it might carry a virus', 'ប្រថុយ — វាអាចមានមេរោគ'),
          [
            t('always safe', 'មានសុវត្ថិភាពជានិច្ច'),
            t('a good way to get free files', 'វិធីល្អដើម្បីបានឯកសារឥតគិតថ្លៃ'),
          ],
        ),
        mc(t('The RJ45 plug goes on which cable?', 'តើក្បាល RJ45 នៅលើខ្សែណា?'), 'Ethernet', [
          'HDMI',
          'USB',
          t('Audio', 'សំឡេង'),
        ]),
        order(
          t(
            'Order the steps to present from a laptop.',
            'តម្រៀបជំហានដើម្បីបង្ហាញពីកុំព្យូទ័រយួរដៃ។',
          ),
          [
            t('Turn on the projector', 'បើកម៉ាស៊ីនបញ្ចាំង'),
            t('Connect the HDMI cable', 'ភ្ជាប់ខ្សែ HDMI'),
            t('Press Windows + P', 'ចុច Windows + P'),
            t('Choose “Duplicate”', 'ជ្រើសរើស «Duplicate»'),
          ],
        ),
        buildSentence(t('Build the rule.', 'បង្កើតច្បាប់។'), 'Hold the plug not the wire.', {
          say: 'Hold the plug, not the wire.',
        }),
      ],
      games: [
        memory(t('Match the cable to the device.', 'ផ្គូផ្គងខ្សែជាមួយឧបករណ៍។'), [
          ['HDMI', ['📺', t('TV', 'ទូរទស្សន៍')]],
          ['Ethernet', ['📡', t('Router', 'Router')]],
          [t('Audio jack', 'រន្ធសំឡេង'), ['🎧', t('Headphones', 'កាស')]],
          ['USB', ['🖱️', t('Mouse', 'កណ្តុរ')]],
        ]),
        catchIt(
          t('Catch the REAL port names!', 'ចាប់ឈ្មោះរន្ធពិត!'),
          ['USB', 'HDMI', 'Ethernet', 'USB-C'],
          ['WiFi-Cable', 'HTML', 'CPU-Port', 'GHz'],
          { speed: 'fast' },
        ),
      ],
      reward: t(
        'You can plug in anything — the right way. 🔌',
        'អ្នកអាចដោតអ្វីក៏បាន — តាមរបៀបត្រឹមត្រូវ។ 🔌',
      ),
    },
  ),

  // 5 ─────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'build-a-pc',
    '🧩',
    t('Build a PC', 'សាងសង់កុំព្យូទ័រ'),
    t('The order to put a computer together.', 'លំដាប់ក្នុងការផ្គុំកុំព្យូទ័រ។'),
    {
      intro: [
        '🧩',
        t(
          'Technicians build computers like LEGO — but in the right order!',
          'អ្នកបច្ចេកទេសសាងសង់កុំព្យូទ័រដូច LEGO — តែតាមលំដាប់ត្រឹមត្រូវ!',
        ),
      ],
      learn: [
        [
          '📋',
          t('Plan the parts', 'គ្រោងគ្រឿង'),
          t(
            'Check every part fits the motherboard (the right socket and slots).',
            'ពិនិត្យគ្រប់គ្រឿងសមនឹង motherboard (socket និងរន្ធត្រឹមត្រូវ)។',
          ),
          'compatible',
        ],
        [
          '🧠',
          t('CPU first', 'CPU មុន'),
          t(
            'Put the CPU, cooler and RAM on the motherboard before it goes in the case.',
            'ដាក់ CPU ម៉ាស៊ីនត្រជាក់ និង RAM លើ motherboard មុនដាក់ក្នុងប្រអប់។',
          ),
        ],
        [
          '🔌',
          t('Power last', 'ថាមពលចុងក្រោយ'),
          t('Connect power only when everything is in place.', 'ភ្ជាប់ថាមពលតែពេលអ្វីៗនៅកន្លែងរួច។'),
        ],
        [
          '🖐️',
          t('Static safety', 'សុវត្ថិភាពចរន្តឋិតិ'),
          t(
            'Touch metal first to remove static electricity that can damage parts.',
            'ប៉ះលោហៈមុនដើម្បីដកចរន្តឋិតិដែលអាចធ្វើឱ្យខូចគ្រឿង។',
          ),
          'static',
        ],
      ],
      see: [
        t(
          'Motherboard + CPU + cooler + RAM → into the case → storage → PSU → cables → close → power on',
          'Motherboard + CPU + ម៉ាស៊ីនត្រជាក់ + RAM → ចូលប្រអប់ → ការផ្ទុក → PSU → ខ្សែ → បិទ → បើកថាមពល',
        ),
        t('A careful order means no broken parts.', 'លំដាប់ប្រុងប្រយ័ត្នមានន័យថាគ្មានគ្រឿងខូច។'),
      ],
      words: [
        ['build', 'សាងសង់', '🧩'],
        ['case', 'ប្រអប់', '📦'],
        ['screw', 'ខ្ចៅ', '🔩'],
        ['static', 'ចរន្តឋិតិ', '⚡'],
      ],
      play: [
        mc(
          t('What should you do BEFORE touching parts?', 'តើអ្នកគួរធ្វើអ្វីមុនប៉ះគ្រឿង?'),
          t('Touch metal to remove static', 'ប៉ះលោហៈដើម្បីដកចរន្តឋិតិ'),
          [t('Drink coffee', 'ផឹកកាហ្វេ'), t('Plug in the power', 'ដោតថាមពល')],
        ),
        tf(
          t(
            'You should build a PC while it is plugged into the wall.',
            'អ្នកគួរសាងសង់កុំព្យូទ័រពេលវាដោតជញ្ជាំង។',
          ),
          false,
          { explanation: t('Always unplug first — safety!', 'ដកចេញមុនជានិច្ច — សុវត្ថិភាព!') },
        ),
        mc(
          t(
            'What sits on top of the CPU to keep it cool?',
            'តើអ្វីនៅលើ CPU ដើម្បីរក្សាវាឱ្យត្រជាក់?',
          ),
          t('A cooler (heatsink and fan)', 'ម៉ាស៊ីនត្រជាក់ (heatsink និងកង្ហារ)'),
          [t('A USB stick', 'USB'), t('The monitor', 'អេក្រង់')],
        ),
        mc(
          t('Where do RAM sticks go?', 'តើបន្ទះ RAM ដាក់នៅឯណា?'),
          t('In the RAM slots on the motherboard', 'ក្នុងរន្ធ RAM លើ motherboard'),
          [t('In the USB port', 'ក្នុងរន្ធ USB'), t('Inside the PSU', 'ក្នុង PSU')],
        ),
        tf(
          t(
            'Parts must be compatible — not every CPU fits every motherboard.',
            'គ្រឿងត្រូវតែត្រូវគ្នា — មិនមែន CPU គ្រប់មួយសមនឹង motherboard គ្រប់មួយ។',
          ),
          true,
        ),
        mc(
          t('Which tool do you need most?', 'តើឧបករណ៍ណាដែលអ្នកត្រូវការបំផុត?'),
          t('A screwdriver', 'ទួណឺវីស'),
          [t('A hammer', 'ញញួរ'), t('Scissors', 'កន្ត្រៃ')],
        ),
        mc(
          t(
            'What do you press to start the finished PC?',
            'តើអ្នកចុចអ្វីដើម្បីចាប់ផ្តើមកុំព្យូទ័រដែលរួចរាល់?',
          ),
          t('The power button ⏻', 'ប៊ូតុងថាមពល ⏻'),
          [t('The Esc key', 'គ្រាប់ Esc'), t('The mouse', 'កណ្តុរ')],
        ),
        tf(
          t(
            'You should force a part in if it does not fit.',
            'អ្នកគួរបង្ខំគ្រឿងចូលប្រសិនបើវាមិនសម។',
          ),
          false,
          {
            explanation: t(
              'Check the direction and notch; forcing can break pins.',
              'ពិនិត្យទិសដៅ និងស្នាមរន្ធ ការបង្ខំអាចធ្វើឱ្យបាក់ម្ជុល។',
            ),
          },
        ),
      ],
      challenge: [
        order(t('Order the build steps.', 'តម្រៀបជំហានសាងសង់។'), [
          t('Put the CPU on the motherboard', 'ដាក់ CPU លើ motherboard'),
          t('Add the cooler and RAM', 'បន្ថែមម៉ាស៊ីនត្រជាក់ និង RAM'),
          t('Put the motherboard in the case', 'ដាក់ motherboard ក្នុងប្រអប់'),
          t('Add storage and PSU', 'បន្ថែមការផ្ទុក និង PSU'),
          t('Connect the cables', 'ភ្ជាប់ខ្សែ'),
          t('Power on and test', 'បើកថាមពល និងសាកល្បង'),
        ]),
        mc(
          t(
            'The new PC turns on but shows nothing. First check?',
            'កុំព្យូទ័រថ្មីបើក តែមិនបង្ហាញអ្វី។ ពិនិត្យអ្វីមុន?',
          ),
          t(
            'Is the monitor cable plugged into the right port?',
            'តើខ្សែអេក្រង់ដោតរន្ធត្រឹមត្រូវទេ?',
          ),
          [t('Is the mouse blue?', 'តើកណ្តុរពណ៌ខៀវទេ?'), t('Is Wi-Fi on?', 'តើ Wi-Fi បើកទេ?')],
        ),
        mc(
          t('Thermal paste goes between…', 'ជ័រកម្តៅដាក់រវាង…'),
          t('the CPU and the cooler', 'CPU និងម៉ាស៊ីនត្រជាក់'),
          [
            t('the RAM and the case', 'RAM និងប្រអប់'),
            t('the screen and keyboard', 'អេក្រង់ និងក្តារចុច'),
          ],
        ),
        num(
          t(
            'RAM costs $25 per stick. You need 2. How much?',
            'RAM តម្លៃ $25 ក្នុងមួយបន្ទះ។ អ្នកត្រូវការ 2។ ប៉ុន្មាន?',
          ),
          50,
        ),
        num(
          t(
            'CPU $120 + motherboard $80 + RAM $50 + SSD $40 + PSU $45 + case $35. Total $?',
            'CPU $120 + motherboard $80 + RAM $50 + SSD $40 + PSU $45 + ប្រអប់ $35។ សរុប $?',
          ),
          370,
        ),
        sortInto(
          t('Safe or unsafe?', 'មានសុវត្ថិភាព ឬគ្មានសុវត្ថិភាព?'),
          [
            ['s', t('Safe', 'មានសុវត្ថិភាព'), '✅'],
            ['u', t('Unsafe', 'គ្មានសុវត្ថិភាព'), '⚠️'],
          ],
          [
            [t('Unplug before opening', 'ដកមុនបើក'), 's'],
            [t('Touch metal first', 'ប៉ះលោហៈមុន'), 's'],
            [t('Hold parts by the edges', 'កាន់គ្រឿងតាមគែម'), 's'],
            [t('Work on a carpet in socks', 'ធ្វើការលើកំរាលពាក់ស្រោមជើង'), 'u'],
            [t('Open the power supply', 'បើក PSU'), 'u'],
            [t('Spill water nearby', 'កំពប់ទឹកក្បែរ'), 'u'],
          ],
        ),
        match(t('Match the part to where it connects.', 'ផ្គូផ្គងគ្រឿងជាមួយកន្លែងដែលវាភ្ជាប់។'), [
          ['CPU', t('CPU socket', 'Socket CPU')],
          ['RAM', t('RAM slot', 'រន្ធ RAM')],
          ['GPU', t('PCIe slot', 'រន្ធ PCIe')],
          ['SSD', t('M.2 or SATA', 'M.2 ឬ SATA')],
        ]),
        buildSentence(
          t('Build the rule.', 'បង្កើតច្បាប់។'),
          'Unplug the power before you open a computer.',
          { say: 'Unplug the power before you open a computer.' },
        ),
      ],
      games: [
        robot(
          t(
            'Carry the CPU to the socket: avoid the hot parts!',
            'យក CPU ទៅ socket៖ ជៀសវាងគ្រឿងក្តៅ!',
          ),
          ['S.#..', '..#.#', '#...G'],
          { goalIcon: '🧠' },
        ),
        memory(t('Match the part to its slot.', 'ផ្គូផ្គងគ្រឿងជាមួយរន្ធ។'), [
          ['🧠 CPU', t('Socket', 'Socket')],
          ['⚡ RAM', t('DIMM slot', 'រន្ធ DIMM')],
          ['💽 SSD', 'M.2'],
          ['🎮 GPU', 'PCIe'],
        ]),
      ],
      reward: t(
        'You know how a computer is built — step by careful step. 🧩',
        'អ្នកដឹងពីរបៀបសាងសង់កុំព្យូទ័រ — ជំហានម្តងមួយយ៉ាងប្រុងប្រយ័ត្ន។ 🧩',
      ),
    },
  ),

  // 6 ─────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'peripherals',
    '🖨️',
    t('Peripherals: Outside Devices', 'ឧបករណ៍ខាងក្រៅ'),
    t('Input, output and both.', 'ការបញ្ចូល ការបញ្ចេញ និងទាំងពីរ។'),
    {
      intro: [
        '🖨️',
        t(
          'Printers, webcams, speakers — they all plug in from outside.',
          'ម៉ាស៊ីនបោះពុម្ព កាមេរ៉ា ឧបករណ៍បំពងសំឡេង — ពួកវាទាំងអស់ដោតពីខាងក្រៅ។',
        ),
      ],
      learn: [
        [
          '⌨️',
          t('Input device', 'ឧបករណ៍បញ្ចូល'),
          t(
            'Sends information INTO the computer: keyboard, mouse, microphone, webcam.',
            'បញ្ជូនព័ត៌មានចូលកុំព្យូទ័រ៖ ក្តារចុច កណ្តុរ មីក្រូហ្វូន កាមេរ៉ា។',
          ),
          'input',
        ],
        [
          '🖥️',
          t('Output device', 'ឧបករណ៍បញ្ចេញ'),
          t(
            'Shows or plays information FROM the computer: monitor, printer, speakers.',
            'បង្ហាញ ឬចាក់ព័ត៌មានពីកុំព្យូទ័រ៖ អេក្រង់ ម៉ាស៊ីនបោះពុម្ព ឧបករណ៍បំពងសំឡេង។',
          ),
          'output',
        ],
        [
          '🔁',
          t('Both', 'ទាំងពីរ'),
          t('A touchscreen or headset does both.', 'អេក្រង់ប៉ះ ឬកាសមានមីក្រូហ្វូនធ្វើទាំងពីរ។'),
        ],
        [
          '💿',
          t('Driver', 'Driver'),
          t(
            'Small software that teaches the computer to talk to a device.',
            'កម្មវិធីតូចដែលបង្រៀនកុំព្យូទ័រឱ្យនិយាយជាមួយឧបករណ៍។',
          ),
          'driver',
        ],
      ],
      see: [
        t(
          'Microphone 🎤 → computer → speakers 🔊',
          'មីក្រូហ្វូន 🎤 → កុំព្យូទ័រ → ឧបករណ៍បំពងសំឡេង 🔊',
        ),
        t(
          'Your voice goes IN through the mic and comes OUT of the speakers.',
          'សំឡេងរបស់អ្នកចូលតាមមីក្រូហ្វូន ហើយចេញពីឧបករណ៍បំពងសំឡេង។',
        ),
      ],
      words: [
        ['printer', 'ម៉ាស៊ីនបោះពុម្ព', '🖨️'],
        ['webcam', 'កាមេរ៉ាវេប', '📷'],
        ['microphone', 'មីក្រូហ្វូន', '🎤'],
        ['driver', 'កម្មវិធីបញ្ជា'],
      ],
      play: [
        mc(t('Which is an INPUT device?', 'តើមួយណាជាឧបករណ៍បញ្ចូល?'), t('Keyboard', 'ក្តារចុច'), [
          t('Printer', 'ម៉ាស៊ីនបោះពុម្ព'),
          t('Speaker', 'ឧបករណ៍បំពងសំឡេង'),
          t('Monitor', 'អេក្រង់'),
        ]),
        mc(
          t('Which is an OUTPUT device?', 'តើមួយណាជាឧបករណ៍បញ្ចេញ?'),
          t('Printer', 'ម៉ាស៊ីនបោះពុម្ព'),
          [t('Mouse', 'កណ្តុរ'), t('Microphone', 'មីក្រូហ្វូន'), t('Webcam', 'កាមេរ៉ា')],
        ),
        mc(
          t('Which device does BOTH input and output?', 'តើឧបករណ៍ណាធ្វើទាំងការបញ្ចូល និងបញ្ចេញ?'),
          t('Touchscreen', 'អេក្រង់ប៉ះ'),
          [t('Speaker', 'ឧបករណ៍បំពងសំឡេង'), t('Keyboard', 'ក្តារចុច')],
        ),
        tf(t('A webcam is an input device.', 'កាមេរ៉ាវេបជាឧបករណ៍បញ្ចូល។'), true),
        tf(
          t(
            'A driver is the person who carries the computer.',
            'Driver គឺជាមនុស្សដែលកាន់កុំព្យូទ័រ។',
          ),
          false,
          {
            explanation: t(
              'Here, a driver is software for a device.',
              'នៅទីនេះ driver ជាកម្មវិធីសម្រាប់ឧបករណ៍។',
            ),
          },
        ),
        mc(
          t(
            'You need to scan your ID card. Which device?',
            'អ្នកត្រូវការស្កេនអត្តសញ្ញាណប័ណ្ណ។ ឧបករណ៍ណា?',
          ),
          t('Scanner', 'ម៉ាស៊ីនស្កេន'),
          [t('Speaker', 'ឧបករណ៍បំពងសំឡេង'), t('Projector', 'ម៉ាស៊ីនបញ្ចាំង')],
        ),
        mc(
          t(
            'Which device is used for online class video?',
            'តើឧបករណ៍ណាប្រើសម្រាប់វីដេអូថ្នាក់អនឡាញ?',
          ),
          t('Webcam', 'កាមេរ៉ាវេប'),
          [t('Printer', 'ម៉ាស៊ីនបោះពុម្ព'), t('Scanner', 'ម៉ាស៊ីនស្កេន')],
        ),
        tf(
          t(
            'Bluetooth can connect a mouse without a cable.',
            'Bluetooth អាចភ្ជាប់កណ្តុរដោយគ្មានខ្សែ។',
          ),
          true,
        ),
      ],
      challenge: [
        sortInto(
          t('Input, output or both?', 'ការបញ្ចូល ការបញ្ចេញ ឬទាំងពីរ?'),
          [
            ['i', t('Input', 'ការបញ្ចូល'), '⬅️'],
            ['o', t('Output', 'ការបញ្ចេញ'), '➡️'],
            ['b', t('Both', 'ទាំងពីរ'), '🔁'],
          ],
          [
            [t('Mouse', 'កណ្តុរ'), 'i'],
            [t('Microphone', 'មីក្រូហ្វូន'), 'i'],
            [t('Printer', 'ម៉ាស៊ីនបោះពុម្ព'), 'o'],
            [t('Projector', 'ម៉ាស៊ីនបញ្ចាំង'), 'o'],
            [t('Touchscreen', 'អេក្រង់ប៉ះ'), 'b'],
            [t('Headset with mic', 'កាសមានមីក្រូហ្វូន'), 'b'],
          ],
        ),
        mc(
          t(
            'A new printer does nothing. What is often missing?',
            'ម៉ាស៊ីនបោះពុម្ពថ្មីមិនធ្វើអ្វីទេ។ តើអ្វីដែលជាញឹកញាប់បាត់?',
          ),
          t('The driver', 'Driver'),
          [t('More RAM', 'RAM បន្ថែម'), t('A bigger monitor', 'អេក្រង់ធំជាង')],
        ),
        order(t('Order the steps to print a document.', 'តម្រៀបជំហានដើម្បីបោះពុម្ពឯកសារ។'), [
          t('Turn on the printer', 'បើកម៉ាស៊ីនបោះពុម្ព'),
          t('Check paper and ink', 'ពិនិត្យក្រដាស និងទឹកថ្នាំ'),
          t('Press Ctrl + P', 'ចុច Ctrl + P'),
          t('Choose the printer', 'ជ្រើសរើសម៉ាស៊ីនបោះពុម្ព'),
          t('Click Print', 'ចុច Print'),
        ]),
        mc(
          t(
            'Your Zoom call partner cannot hear you. Check first?',
            'ដៃគូហៅ Zoom មិនឮអ្នក។ ពិនិត្យអ្វីមុន?',
          ),
          t('Is your microphone muted?', 'តើមីក្រូហ្វូនរបស់អ្នកបិទសំឡេងទេ?'),
          [
            t('Is the printer on?', 'តើម៉ាស៊ីនបោះពុម្ពបើកទេ?'),
            t('Is the screen bright?', 'តើអេក្រង់ភ្លឺទេ?'),
          ],
        ),
        num(
          t(
            'Printing 3 copies of a 12-page document. How many pages?',
            'បោះពុម្ព 3 ច្បាប់នៃឯកសារ 12 ទំព័រ។ តើប៉ុន្មានទំព័រ?',
          ),
          36,
        ),
        match(
          t(
            'Match the problem to the device to check.',
            'ផ្គូផ្គងបញ្ហាជាមួយឧបករណ៍ដែលត្រូវពិនិត្យ។',
          ),
          [
            [t('No sound', 'គ្មានសំឡេង'), t('Speakers', 'ឧបករណ៍បំពងសំឡេង')],
            [t('Black video call', 'ការហៅវីដេអូខ្មៅ'), t('Webcam', 'កាមេរ៉ា')],
            [t('Cursor will not move', 'ទស្សន៍ទ្រនិចមិនផ្លាស់ទី'), t('Mouse', 'កណ្តុរ')],
            [t('Paper jam', 'ក្រដាសជាប់'), t('Printer', 'ម៉ាស៊ីនបោះពុម្ព')],
          ],
        ),
        tf(
          t(
            'Covering your webcam when not in use protects your privacy.',
            'ការគ្របកាមេរ៉ាពេលមិនប្រើការពារឯកជនភាពរបស់អ្នក។',
          ),
          true,
        ),
        buildSentence(
          t('Build the sentence.', 'បង្កើតប្រយោគ។'),
          'A driver helps the computer talk to a device.',
          { say: 'A driver helps the computer talk to a device.' },
        ),
      ],
      games: [
        catchIt(
          t('Catch the INPUT devices!', 'ចាប់ឧបករណ៍បញ្ចូល!'),
          [
            ['⌨️', t('Keyboard', 'ក្តារចុច')],
            ['🖱️', t('Mouse', 'កណ្តុរ')],
            ['🎤', t('Mic', 'មីក្រូហ្វូន')],
            ['📷', t('Webcam', 'កាមេរ៉ា')],
          ],
          [
            ['🖨️', t('Printer', 'ម៉ាស៊ីនបោះពុម្ព')],
            ['🔊', t('Speaker', 'ឧបករណ៍បំពងសំឡេង')],
            ['📽️', t('Projector', 'ម៉ាស៊ីនបញ្ចាំង')],
          ],
          { speed: 'normal' },
        ),
        memory(t('Match the device to what it does.', 'ផ្គូផ្គងឧបករណ៍ជាមួយអ្វីដែលវាធ្វើ។'), [
          ['🖨️', t('Prints paper', 'បោះពុម្ពក្រដាស')],
          ['🎤', t('Records voice', 'ថតសំឡេង')],
          ['🔊', t('Plays sound', 'ចាក់សំឡេង')],
          ['📷', t('Takes video', 'ថតវីដេអូ')],
        ]),
      ],
      reward: t(
        'Input in, output out — you have mastered peripherals! 🖨️',
        'ចូលបញ្ចូល ចេញបញ្ចេញ — អ្នកស្ទាត់ជំនាញឧបករណ៍ខាងក្រៅ! 🖨️',
      ),
    },
  ),

  // 7 ─────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'computer-care',
    '🧹',
    t('Computer Care & Safety', 'ការថែទាំ និងសុវត្ថិភាពកុំព្យូទ័រ'),
    t(
      'Keep devices clean, cool and charged right.',
      'រក្សាឧបករណ៍ឱ្យស្អាត ត្រជាក់ និងសាកត្រឹមត្រូវ។',
    ),
    {
      intro: [
        '🧹',
        t(
          'Cambodia is hot, humid and dusty — computers need a little care to last for years.',
          'កម្ពុជាក្តៅ សើម និងមានធូលី — កុំព្យូទ័រត្រូវការការថែទាំបន្តិចដើម្បីប្រើបានច្រើនឆ្នាំ។',
        ),
      ],
      learn: [
        [
          '🌡️',
          t('Heat', 'កម្តៅ'),
          t(
            'Keep air vents open. Never use a laptop on a pillow or bed.',
            'រក្សារន្ធខ្យល់ឱ្យចំហ។ កុំប្រើកុំព្យូទ័រយួរដៃលើខ្នើយ ឬគ្រែ។',
          ),
          'heat',
        ],
        [
          '💧',
          t('Water', 'ទឹក'),
          t(
            'Keep drinks away. If water spills: switch off, unplug, dry for 48 hours.',
            'ដាក់ភេសជ្ជៈឱ្យឆ្ងាយ។ ប្រសិនបើកំពប់ទឹក៖ បិទ ដក ស្ងួត 48 ម៉ោង។',
          ),
        ],
        [
          '⚡',
          t('Power', 'ថាមពល'),
          t(
            'Use a surge protector; storms and power cuts can damage parts.',
            'ប្រើឧបករណ៍ការពារចរន្តលើស ព្យុះ និងដាច់ភ្លើងអាចធ្វើឱ្យខូចគ្រឿង។',
          ),
          'surge',
        ],
        [
          '🔋',
          t('Battery', 'ថ្ម'),
          t(
            'Use the right charger; avoid leaving it at 0% for long.',
            'ប្រើឆ្នាំងសាកត្រឹមត្រូវ ជៀសវាងទុកវានៅ 0% យូរ។',
          ),
          'battery',
        ],
      ],
      see: [
        t(
          'Dusty fan 🌀 → hot CPU 🔥 → slow, noisy laptop 🐢\nClean fan → cool CPU → fast laptop 🚀',
          'កង្ហារមានធូលី 🌀 → CPU ក្តៅ 🔥 → កុំព្យូទ័រយឺត និងរំខាន 🐢\nកង្ហារស្អាត → CPU ត្រជាក់ → កុំព្យូទ័រលឿន 🚀',
        ),
        t(
          'Heat makes computers slow themselves down to stay safe.',
          'កម្តៅធ្វើឱ្យកុំព្យូទ័របន្ថយល្បឿនខ្លួនឯងដើម្បីរក្សាសុវត្ថិភាព។',
        ),
      ],
      words: [
        ['clean', 'សម្អាត', '🧹'],
        ['battery', 'ថ្ម', '🔋'],
        ['dust', 'ធូលី'],
        ['heat', 'កម្តៅ', '🌡️'],
      ],
      play: [
        mc(
          t(
            'Where is the BEST place to use a laptop?',
            'តើកន្លែងណាល្អបំផុតក្នុងការប្រើកុំព្យូទ័រយួរដៃ?',
          ),
          t('On a hard, flat table', 'លើតុរឹង រាបស្មើ'),
          [t('On a pillow', 'លើខ្នើយ'), t('On a blanket', 'លើភួយ')],
        ),
        tf(
          t(
            'Dust inside a computer can make it overheat.',
            'ធូលីក្នុងកុំព្យូទ័រអាចធ្វើឱ្យវាក្តៅពេក។',
          ),
          true,
        ),
        mc(
          t(
            'You spill water on your laptop. First step?',
            'អ្នកកំពប់ទឹកលើកុំព្យូទ័រយួរដៃ។ ជំហានដំបូង?',
          ),
          t('Turn it off and unplug it', 'បិទវា ហើយដកវា'),
          [
            t('Keep typing', 'បន្តវាយ'),
            t('Use a hair dryer on hot', 'ប្រើម៉ាស៊ីនសម្ងួតសក់កម្តៅខ្លាំង'),
          ],
        ),
        mc(
          t(
            'What protects a computer from power spikes?',
            'តើអ្វីការពារកុំព្យូទ័រពីចរន្តលោតខ្លាំង?',
          ),
          t('A surge protector', 'ឧបករណ៍ការពារចរន្តលើស'),
          [t('A mouse pad', 'កម្រាលកណ្តុរ'), t('A screen cleaner', 'ថ្នាំសម្អាតអេក្រង់')],
        ),
        tf(
          t('Clean a screen with a soft, dry cloth.', 'សម្អាតអេក្រង់ជាមួយក្រណាត់ទន់ ស្ងួត។'),
          true,
        ),
        tf(
          t(
            'Spraying window cleaner directly on the screen is fine.',
            'ការបាញ់ថ្នាំសម្អាតកញ្ចក់ដោយផ្ទាល់លើអេក្រង់មិនអីទេ។',
          ),
          false,
        ),
        mc(
          t('A UPS helps when…', 'UPS ជួយពេល…'),
          t('the power cuts out suddenly', 'ភ្លើងដាច់ភ្លាមៗ'),
          [t('the Wi-Fi is slow', 'Wi-Fi យឺត'), t('the mouse breaks', 'កណ្តុរខូច')],
        ),
        mc(
          t('Which charger should you use?', 'តើអ្នកគួរប្រើឆ្នាំងសាកណា?'),
          t('The correct one for your device', 'ឆ្នាំងសាកត្រឹមត្រូវសម្រាប់ឧបករណ៍របស់អ្នក'),
          [
            t('Any cheap one from the market', 'ឆ្នាំងសាកថោកណាមួយពីផ្សារ'),
            t('A broken one with tape', 'ឆ្នាំងសាកខូចបិទស្កុត'),
          ],
        ),
      ],
      challenge: [
        sortInto(
          t('Good care or bad habit?', 'ការថែទាំល្អ ឬទម្លាប់អាក្រក់?'),
          [
            ['g', t('Good care', 'ការថែទាំល្អ'), '✅'],
            ['b', t('Bad habit', 'ទម្លាប់អាក្រក់'), '❌'],
          ],
          [
            [t('Shut down at night', 'បិទពេលយប់'), 'g'],
            [t('Use a surge protector', 'ប្រើឧបករណ៍ការពារចរន្ត'), 'g'],
            [t('Blow dust out of vents', 'ផ្លុំធូលីចេញពីរន្ធខ្យល់'), 'g'],
            [t('Eat over the keyboard', 'ញ៉ាំលើក្តារចុច'), 'b'],
            [t('Leave it in a hot car', 'ទុកវាក្នុងឡានក្តៅ'), 'b'],
            [t('Block the fan', 'បិទកង្ហារ'), 'b'],
          ],
        ),
        order(t('Order the steps after a water spill.', 'តម្រៀបជំហានក្រោយកំពប់ទឹក។'), [
          t('Turn it off at once', 'បិទវាភ្លាមៗ'),
          t('Unplug the charger', 'ដកឆ្នាំងសាក'),
          t('Turn it upside down to drain', 'បង្វិលវាចុះក្រោមឱ្យទឹកហូរ'),
          t('Let it dry for 48 hours', 'ទុកឱ្យស្ងួត 48 ម៉ោង'),
          t('Ask a technician to check', 'សុំអ្នកបច្ចេកទេសពិនិត្យ'),
        ]),
        mc(
          t(
            'Your laptop fan is loud and the laptop is hot. Likely cause?',
            'កង្ហារកុំព្យូទ័រយួរដៃរបស់អ្នកឮខ្លាំង ហើយក្តៅ។ មូលហេតុប្រហែល?',
          ),
          t('Dust blocking the vents', 'ធូលីបិទរន្ធខ្យល់'),
          [t('Too many photos', 'រូបថតច្រើនពេក'), t('A dark wallpaper', 'រូបផ្ទៃខាងក្រោយងងឹត')],
        ),
        tf(
          t(
            'A lightning storm is a good time to unplug your computer.',
            'ព្យុះរន្ទះជាពេលល្អក្នុងការដកកុំព្យូទ័ររបស់អ្នក។',
          ),
          true,
        ),
        num(
          t(
            'A laptop battery lasts 6 hours when new. After a few years it lasts half as long. How many hours?',
            'ថ្មកុំព្យូទ័រយួរដៃប្រើបាន 6 ម៉ោងពេលថ្មី។ ក្រោយពីច្រើនឆ្នាំ វាប្រើបានពាក់កណ្តាល។ ប៉ុន្មានម៉ោង?',
          ),
          3,
        ),
        mc(
          t(
            'A phone battery is swollen (puffy). What should you do?',
            'ថ្មទូរស័ព្ទហើម។ តើអ្នកគួរធ្វើអ្វី?',
          ),
          t('Stop using it and take it to a repair shop', 'ឈប់ប្រើ ហើយយកទៅហាងជួសជុល'),
          [t('Press it flat', 'សង្កត់ឱ្យរាប'), t('Keep charging it', 'បន្តសាក')],
        ),
        match(t('Match the danger to the protection.', 'ផ្គូផ្គងគ្រោះថ្នាក់ជាមួយការការពារ។'), [
          [t('Power spike', 'ចរន្តលោត'), t('Surge protector', 'ឧបករណ៍ការពារចរន្ត')],
          [t('Power cut', 'ដាច់ភ្លើង'), 'UPS'],
          [t('Dust', 'ធូលី'), t('Regular cleaning', 'ការសម្អាតទៀងទាត់')],
          [t('Drops', 'ការធ្លាក់'), t('A padded bag', 'កាបូបមានទ្រនាប់')],
        ]),
        buildSentence(t('Build the rule.', 'បង្កើតច្បាប់។'), 'Keep drinks away from computers.', {
          say: 'Keep drinks away from computers.',
        }),
      ],
      games: [
        catchIt(
          t('Catch the GOOD habits!', 'ចាប់ទម្លាប់ល្អ!'),
          [
            t('Clean vents', 'សម្អាតរន្ធខ្យល់'),
            t('Right charger', 'ឆ្នាំងសាកត្រឹមត្រូវ'),
            t('Hard table', 'តុរឹង'),
            t('Surge protector', 'ឧបករណ៍ការពារចរន្ត'),
          ],
          [
            t('Drink on keyboard', 'ភេសជ្ជៈលើក្តារចុច'),
            t('Laptop on bed', 'កុំព្យូទ័រលើគ្រែ'),
            t('Hot car', 'ឡានក្តៅ'),
          ],
          { speed: 'slow' },
        ),
        robot(
          t(
            'Move the laptop away from the water drops to the safe desk!',
            'រំកិលកុំព្យូទ័រយួរដៃចេញពីដំណក់ទឹកទៅតុសុវត្ថិភាព!',
          ),
          ['S..#', '#..#', '#...', '##.G'],
          { goalIcon: '🪑' },
        ),
      ],
      reward: t(
        'A well-cared-for computer lasts for years. 🧹',
        'កុំព្យូទ័រដែលបានថែទាំល្អប្រើបានច្រើនឆ្នាំ។ 🧹',
      ),
    },
  ),

  // 8 ─────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'hardware-troubleshooting',
    '🩺',
    t('Hardware Troubleshooting', 'ការដោះស្រាយបញ្ហាផ្នែករឹង'),
    t('Find the problem like a computer doctor.', 'រកបញ្ហាដូចគ្រូពេទ្យកុំព្យូទ័រ។'),
    {
      intro: [
        '🩺',
        t(
          'Technicians fix problems by asking simple questions, one at a time.',
          'អ្នកបច្ចេកទេសដោះស្រាយបញ្ហាដោយសួរសំណួរសាមញ្ញ ម្តងមួយ។',
        ),
      ],
      learn: [
        [
          '🔌',
          t('Check the simple things', 'ពិនិត្យរឿងសាមញ្ញ'),
          t(
            'Is it plugged in? Is it switched on? Is the cable firm?',
            'តើវាដោតទេ? តើវាបើកទេ? តើខ្សែជាប់ទេ?',
          ),
          'check',
        ],
        [
          '🔄',
          t('Restart', 'ចាប់ផ្តើមឡើងវិញ'),
          t('Many problems disappear after a restart.', 'បញ្ហាជាច្រើនបាត់ក្រោយការចាប់ផ្តើមឡើងវិញ។'),
          'restart',
        ],
        [
          '🔀',
          t('Swap and test', 'ប្តូរ និងសាកល្បង'),
          t(
            'Try another cable, port or device to find the broken part.',
            'សាកខ្សែ រន្ធ ឬឧបករណ៍ផ្សេងដើម្បីរកគ្រឿងខូច។',
          ),
        ],
        [
          '📝',
          t('Write it down', 'កត់ត្រា'),
          t('Note the error message and what you tried.', 'កត់សារកំហុស និងអ្វីដែលអ្នកបានសាក។'),
        ],
      ],
      see: [
        t(
          'Mouse not working?\n1. Is it plugged in? ✅\n2. Try another USB port → works! 🎉\nThe first port was the problem.',
          'កណ្តុរមិនដំណើរការ?\n1. តើវាដោតទេ? ✅\n2. សាករន្ធ USB ផ្សេង → ដំណើរការ! 🎉\nរន្ធទីមួយជាបញ្ហា។',
        ),
        t('Change one thing at a time, then test.', 'ប្តូររឿងមួយម្តង រួចសាកល្បង។'),
      ],
      words: [
        ['problem', 'បញ្ហា', '❓'],
        ['solution', 'ដំណោះស្រាយ', '💡'],
        ['repair', 'ជួសជុល', '🔧'],
        ['test', 'សាកល្បង', '🧪'],
      ],
      play: [
        mc(
          t('The computer will not turn on. First check?', 'កុំព្យូទ័រមិនបើក។ ពិនិត្យអ្វីមុន?'),
          t('Is the power cable plugged in?', 'តើខ្សែថាមពលដោតទេ?'),
          [t('Is the CPU too old?', 'តើ CPU ចាស់ពេកទេ?'), t('Buy a new one', 'ទិញថ្មី')],
        ),
        tf(
          t(
            'Restarting fixes many computer problems.',
            'ការចាប់ផ្តើមឡើងវិញដោះស្រាយបញ្ហាកុំព្យូទ័រជាច្រើន។',
          ),
          true,
        ),
        mc(
          t(
            'The screen is black but the computer is on. Check…',
            'អេក្រង់ខ្មៅ តែកុំព្យូទ័របើក។ ពិនិត្យ…',
          ),
          t('the monitor’s power and cable', 'ថាមពល និងខ្សែអេក្រង់'),
          [t('the printer', 'ម៉ាស៊ីនបោះពុម្ព'), t('the speakers', 'ឧបករណ៍បំពងសំឡេង')],
        ),
        mc(
          t('No sound. Which is the simplest check?', 'គ្មានសំឡេង។ ការពិនិត្យសាមញ្ញបំផុត?'),
          t('Is the volume muted?', 'តើសំឡេងបិទទេ?'),
          [
            t('Replace the motherboard', 'ប្តូរ motherboard'),
            t('Reinstall Windows', 'ដំឡើង Windows ឡើងវិញ'),
          ],
        ),
        tf(
          t(
            'You should change many things at once to fix a problem faster.',
            'អ្នកគួរប្តូររឿងច្រើនក្នុងពេលតែមួយដើម្បីដោះស្រាយបញ្ហាលឿនជាង។',
          ),
          false,
          {
            explanation: t(
              'One change at a time shows you what fixed it.',
              'ការប្តូរម្តងមួយបង្ហាញអ្នកថាអ្វីបានដោះស្រាយវា។',
            ),
          },
        ),
        mc(
          t('The keyboard types nothing. Try…', 'ក្តារចុចមិនវាយអ្វីទេ។ សាក…'),
          t('another USB port', 'រន្ធ USB ផ្សេង'),
          [t('a new monitor', 'អេក្រង់ថ្មី'), t('turning off Wi-Fi', 'បិទ Wi-Fi')],
        ),
        mc(
          t('Why write down the error message?', 'ហេតុអ្វីកត់សារកំហុស?'),
          t('To search for it or tell a technician', 'ដើម្បីស្វែងរកវា ឬប្រាប់អ្នកបច្ចេកទេស'),
          [
            t('To decorate the wall', 'ដើម្បីតុបតែងជញ្ជាំង'),
            t('It is not useful', 'វាគ្មានប្រយោជន៍'),
          ],
        ),
        tf(
          t(
            'Asking for help when you are stuck is a smart move.',
            'ការសុំជំនួយពេលអ្នកជាប់គាំងគឺជាជំហានឆ្លាត។',
          ),
          true,
        ),
      ],
      challenge: [
        order(t('Order the troubleshooting steps.', 'តម្រៀបជំហានដោះស្រាយបញ្ហា។'), [
          t('Describe the problem', 'ពិពណ៌នាបញ្ហា'),
          t('Check the simple things', 'ពិនិត្យរឿងសាមញ្ញ'),
          t('Change one thing', 'ប្តូររឿងមួយ'),
          t('Test again', 'សាកល្បងម្តងទៀត'),
          t('Write down what worked', 'កត់អ្វីដែលដំណើរការ'),
        ]),
        match(
          t('Match the problem to a good first check.', 'ផ្គូផ្គងបញ្ហាជាមួយការពិនិត្យដំបូងល្អ។'),
          [
            [t('No power', 'គ្មានថាមពល'), t('Plug and switch', 'ដោត និងកុងតាក់')],
            [t('No picture', 'គ្មានរូបភាព'), t('Monitor cable', 'ខ្សែអេក្រង់')],
            [t('No sound', 'គ្មានសំឡេង'), t('Volume / mute', 'កម្រិតសំឡេង / បិទសំឡេង')],
            [t('Very slow', 'យឺតណាស់'), t('Close apps, restart', 'បិទកម្មវិធី ចាប់ផ្តើមឡើងវិញ')],
          ],
        ),
        mc(
          t(
            'A mouse works on your friend’s laptop but not yours. The problem is probably…',
            'កណ្តុរដំណើរការលើកុំព្យូទ័រមិត្តអ្នក តែមិនដំណើរការលើរបស់អ្នក។ បញ្ហាប្រហែលជា…',
          ),
          t('your laptop’s port or settings', 'រន្ធ ឬការកំណត់កុំព្យូទ័ររបស់អ្នក'),
          [t('the mouse', 'កណ្តុរ'), t('your friend', 'មិត្តរបស់អ្នក')],
        ),
        mc(
          t(
            'The PC beeps and shows nothing after you added RAM. Likely?',
            'កុំព្យូទ័របន្លឺសំឡេង ហើយមិនបង្ហាញអ្វីក្រោយអ្នកបន្ថែម RAM។ ប្រហែល?',
          ),
          t('The RAM is not pushed in fully', 'RAM មិនបានដោតចូលពេញ'),
          [t('The printer is off', 'ម៉ាស៊ីនបោះពុម្ពបិទ'), t('The mouse is old', 'កណ្តុរចាស់')],
        ),
        sortInto(
          t('Try it yourself or ask a technician?', 'សាកខ្លួនឯង ឬសុំអ្នកបច្ចេកទេស?'),
          [
            ['me', t('Try yourself', 'សាកខ្លួនឯង'), '🙋'],
            ['tech', t('Ask a technician', 'សុំអ្នកបច្ចេកទេស'), '🧑‍🔧'],
          ],
          [
            [t('Restart', 'ចាប់ផ្តើមឡើងវិញ'), 'me'],
            [t('Check cables', 'ពិនិត្យខ្សែ'), 'me'],
            [t('Unmute sound', 'បើកសំឡេង'), 'me'],
            [t('Burning smell', 'ក្លិនឆេះ'), 'tech'],
            [t('Swollen battery', 'ថ្មហើម'), 'tech'],
            [t('Opening the power supply', 'បើក PSU'), 'tech'],
          ],
        ),
        tf(
          t(
            'If you smell burning, unplug the computer at once.',
            'ប្រសិនបើអ្នកធុំក្លិនឆេះ ដកកុំព្យូទ័រភ្លាមៗ។',
          ),
          true,
        ),
        typeIt(
          t(
            'Type the key combo that opens Task Manager on Windows (use +).',
            'វាយបន្សំគ្រាប់ដែលបើក Task Manager លើ Windows (ប្រើ +)។',
          ),
          'Ctrl+Shift+Esc',
          { accept: ['ctrl+shift+esc', 'Ctrl + Shift + Esc'] },
        ),
        buildSentence(t('Build the rule.', 'បង្កើតច្បាប់។'), 'Change one thing then test again.', {
          say: 'Change one thing, then test again.',
        }),
      ],
      games: [
        memory(t('Match the problem to the fix.', 'ផ្គូផ្គងបញ្ហាជាមួយដំណោះស្រាយ។'), [
          ['🔇', t('Unmute', 'បើកសំឡេង')],
          ['🔌', t('Plug in', 'ដោត')],
          ['🐢', t('Restart', 'ចាប់ផ្តើមឡើងវិញ')],
          ['🖨️📄', t('Add paper', 'បន្ថែមក្រដាស')],
        ]),
        catchIt(
          t('Catch the SMART first steps!', 'ចាប់ជំហានដំបូងឆ្លាត!'),
          [
            t('Check the plug', 'ពិនិត្យដោត'),
            t('Restart', 'ចាប់ផ្តើមឡើងវិញ'),
            t('Try another port', 'សាករន្ធផ្សេង'),
            t('Read the error', 'អានកំហុស'),
          ],
          [t('Hit it', 'វាយវា'), t('Panic', 'ភ័យស្លន់ស្លោ'), t('Open the PSU', 'បើក PSU')],
          { speed: 'normal' },
        ),
      ],
      reward: t(
        'You think like a technician now! 🩺 Next: networks.',
        'ឥឡូវអ្នកគិតដូចអ្នកបច្ចេកទេស! 🩺 បន្ទាប់៖ បណ្តាញ។',
      ),
    },
  ),
];
