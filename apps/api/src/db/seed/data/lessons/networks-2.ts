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
  robot,
  sortInto,
  tf,
  typeIt,
} from '../dsl';
import { NETWORK_WORLD as W } from './networks-1';

// 🛠️ Networks & Hardware, lessons 9–15: networks and the internet.
// Khmer (km) strings are DRAFTS for native review.
const cmd = (source: string) => ({ data: code(source, 'Code') });

export const NETWORK_LESSONS_2: LessonSeed[] = [
  // 9 ─────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'what-is-a-network',
    '🕸️',
    t('What Is a Network?', 'តើបណ្តាញជាអ្វី?'),
    t('Devices that talk to each other.', 'ឧបករណ៍ដែលនិយាយជាមួយគ្នា។'),
    {
      intro: [
        '🕸️',
        t(
          'When your phone sends a photo to your friend’s phone, a network carries it.',
          'ពេលទូរស័ព្ទរបស់អ្នកផ្ញើរូបថតទៅទូរស័ព្ទមិត្តអ្នក បណ្តាញដឹកវា។',
        ),
      ],
      learn: [
        [
          '🕸️',
          t('Network', 'បណ្តាញ'),
          t(
            'Two or more devices connected to share data.',
            'ឧបករណ៍ពីរ ឬច្រើនភ្ជាប់គ្នាដើម្បីចែករំលែកទិន្នន័យ។',
          ),
          'network',
        ],
        [
          '🏠',
          'LAN',
          t(
            'Local Area Network: one home, school or office.',
            'បណ្តាញតំបន់មូលដ្ឋាន៖ ផ្ទះ សាលា ឬការិយាល័យមួយ។',
          ),
          'local',
        ],
        [
          '🌏',
          'WAN',
          t(
            'Wide Area Network: across cities and countries. The internet is the biggest WAN.',
            'បណ្តាញតំបន់ធំ៖ ឆ្លងទីក្រុង និងប្រទេស។ អ៊ីនធឺណិតជា WAN ធំបំផុត។',
          ),
        ],
        [
          '🖥️',
          t('Client and server', 'ម៉ាស៊ីនភ្ញៀវ និងម៉ាស៊ីនមេ'),
          t(
            'A client asks; a server answers (like a customer and a shop).',
            'ម៉ាស៊ីនភ្ញៀវសួរ ម៉ាស៊ីនមេឆ្លើយ (ដូចអតិថិជន និងហាង)។',
          ),
          'client',
        ],
      ],
      see: [
        t(
          'School LAN: 30 computers + 1 printer + Wi-Fi → shared printer and shared files\nInternet (WAN): your school LAN ↔ the whole world',
          'LAN សាលា៖ កុំព្យូទ័រ 30 + ម៉ាស៊ីនបោះពុម្ព 1 + Wi-Fi → ម៉ាស៊ីនបោះពុម្ព និងឯកសាររួម\nអ៊ីនធឺណិត (WAN)៖ LAN សាលារបស់អ្នក ↔ ពិភពលោកទាំងមូល',
        ),
        t(
          'Networks inside networks — that is the internet.',
          'បណ្តាញក្នុងបណ្តាញ — នោះជាអ៊ីនធឺណិត។',
        ),
      ],
      words: [
        ['network', 'បណ្តាញ', '🕸️'],
        ['connect', 'ភ្ជាប់', '🔗'],
        ['share', 'ចែករំលែក'],
        ['client', 'ម៉ាស៊ីនភ្ញៀវ'],
      ],
      play: [
        mc(
          t('What is a network?', 'តើបណ្តាញជាអ្វី?'),
          t('Devices connected to share data', 'ឧបករណ៍ភ្ជាប់គ្នាដើម្បីចែករំលែកទិន្នន័យ'),
          [t('One computer alone', 'កុំព្យូទ័រមួយតែឯង'), t('A type of keyboard', 'ប្រភេទក្តារចុច')],
        ),
        mc(t('A network in one school is a…', 'បណ្តាញក្នុងសាលាមួយគឺ…'), 'LAN', [
          'WAN',
          'GHz',
          'USB',
        ]),
        mc(t('The internet is the biggest…', 'អ៊ីនធឺណិតគឺជា… ធំបំផុត'), 'WAN', [
          'LAN',
          'SSD',
          'CPU',
        ]),
        tf(
          t(
            'A shared office printer is an example of using a network.',
            'ម៉ាស៊ីនបោះពុម្ពការិយាល័យរួមជាឧទាហរណ៍នៃការប្រើបណ្តាញ។',
          ),
          true,
        ),
        mc(
          t(
            'When you open a website, your phone is the…',
            'ពេលអ្នកបើកគេហទំព័រ ទូរស័ព្ទរបស់អ្នកជា…',
          ),
          t('client', 'ម៉ាស៊ីនភ្ញៀវ'),
          [t('server', 'ម៉ាស៊ីនមេ'), t('cable', 'ខ្សែ')],
        ),
        tf(
          t('A network can be wired, wireless, or both.', 'បណ្តាញអាចជាខ្សែ ឥតខ្សែ ឬទាំងពីរ។'),
          true,
        ),
        mc(
          t('Which is NOT a benefit of a network?', 'តើមួយណាមិនមែនជាអត្ថប្រយោជន៍នៃបណ្តាញ?'),
          t('Makes your battery bigger', 'ធ្វើឱ្យថ្មរបស់អ្នកធំជាង'),
          [
            t('Share files', 'ចែករំលែកឯកសារ'),
            t('Share a printer', 'ចែករំលែកម៉ាស៊ីនបោះពុម្ព'),
            t('Chat with friends', 'ជជែកជាមួយមិត្ត'),
          ],
        ),
        tf(
          t(
            'Two phones sharing a photo by Bluetooth make a tiny network.',
            'ទូរស័ព្ទពីរចែករំលែករូបថតតាម Bluetooth បង្កើតបណ្តាញតូចមួយ។',
          ),
          true,
        ),
      ],
      challenge: [
        sortInto(
          t('LAN or WAN?', 'LAN ឬ WAN?'),
          [
            ['l', 'LAN', '🏠'],
            ['w', 'WAN', '🌏'],
          ],
          [
            [t('Computers in one classroom', 'កុំព្យូទ័រក្នុងថ្នាក់មួយ'), 'l'],
            [t('Home Wi-Fi', 'Wi-Fi ផ្ទះ'), 'l'],
            [t('One office floor', 'ជាន់ការិយាល័យមួយ'), 'l'],
            [t('The internet', 'អ៊ីនធឺណិត'), 'w'],
            [t('A bank linking all provinces', 'ធនាគារភ្ជាប់គ្រប់ខេត្ត'), 'w'],
            [t('Phone network across Cambodia', 'បណ្តាញទូរស័ព្ទទូទាំងកម្ពុជា'), 'w'],
          ],
        ),
        match(t('Match client and server.', 'ផ្គូផ្គងម៉ាស៊ីនភ្ញៀវ និងម៉ាស៊ីនមេ។'), [
          [t('Your browser', 'កម្មវិធីរុករករបស់អ្នក'), t('Asks for a page', 'ស្នើសុំទំព័រ')],
          [t('Web server', 'ម៉ាស៊ីនមេវេប'), t('Sends the page', 'ផ្ញើទំព័រ')],
          [t('Customer', 'អតិថិជន'), t('Like a client', 'ដូចម៉ាស៊ីនភ្ញៀវ')],
          [t('Shop', 'ហាង'), t('Like a server', 'ដូចម៉ាស៊ីនមេ')],
        ]),
        num(
          t(
            'Each of 3 classrooms has 10 computers, plus 2 in the office. How many devices on the school LAN?',
            'ថ្នាក់ 3 នីមួយៗមានកុំព្យូទ័រ 10 បូក 2 ក្នុងការិយាល័យ។ តើមានឧបករណ៍ប៉ុន្មានលើ LAN សាលា?',
          ),
          32,
        ),
        order(t('Order from smallest network to biggest.', 'តម្រៀបពីបណ្តាញតូចបំផុតទៅធំបំផុត។'), [
          t('Two phones on Bluetooth', 'ទូរស័ព្ទពីរលើ Bluetooth'),
          t('A home Wi-Fi', 'Wi-Fi ផ្ទះ'),
          t('A school LAN', 'LAN សាលា'),
          t('The internet', 'អ៊ីនធឺណិត'),
        ]),
        mc(
          t('Which job looks after a company’s network?', 'តើការងារណាថែរក្សាបណ្តាញក្រុមហ៊ុន?'),
          t('Network administrator', 'អ្នកគ្រប់គ្រងបណ្តាញ'),
          [t('Graphic designer', 'អ្នករចនាក្រាហ្វិក'), t('Accountant', 'គណនេយ្យករ')],
        ),
        tf(
          t(
            'If the school’s internet is down, computers on the LAN can still print to the shared printer.',
            'ប្រសិនបើអ៊ីនធឺណិតសាលាដាច់ កុំព្យូទ័រលើ LAN នៅតែអាចបោះពុម្ពទៅម៉ាស៊ីនបោះពុម្ពរួម។',
          ),
          true,
          {
            explanation: t(
              'The LAN works locally even without the internet.',
              'LAN ដំណើរការក្នុងតំបន់ទោះគ្មានអ៊ីនធឺណិត។',
            ),
          },
        ),
        mc(
          t('Which is a SERVER?', 'តើមួយណាជាម៉ាស៊ីនមេ?'),
          t('The computer that stores YouTube videos', 'កុំព្យូទ័រដែលរក្សាទុកវីដេអូ YouTube'),
          [
            t('Your phone watching a video', 'ទូរស័ព្ទរបស់អ្នកមើលវីដេអូ'),
            t('Your headphones', 'កាសរបស់អ្នក'),
          ],
        ),
        buildSentence(
          t('Build the sentence.', 'បង្កើតប្រយោគ។'),
          'The internet is a network of networks.',
          { say: 'The internet is a network of networks.' },
        ),
      ],
      games: [
        robot(
          t(
            'Send the message across the network to your friend’s computer!',
            'ផ្ញើសារឆ្លងបណ្តាញទៅកុំព្យូទ័រមិត្តអ្នក!',
          ),
          ['S.#...', '..#.#.', '....#G'],
          { goalIcon: '💻' },
        ),
        memory(t('Match the network word to its picture.', 'ផ្គូផ្គងពាក្យបណ្តាញជាមួយរូបភាព។'), [
          ['LAN', '🏠'],
          ['WAN', '🌏'],
          [t('Server', 'ម៉ាស៊ីនមេ'), '🗄️'],
          [t('Client', 'ម៉ាស៊ីនភ្ញៀវ'), '📱'],
        ]),
      ],
      reward: t(
        'You understand networks — the roads of the digital world! 🕸️',
        'អ្នកយល់ពីបណ្តាញ — ផ្លូវនៃពិភពឌីជីថល! 🕸️',
      ),
    },
  ),

  // 10 ────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'wifi-and-cables',
    '📶',
    t('Wi-Fi vs Cable', 'Wi-Fi និងខ្សែ'),
    t('Wireless freedom or wired speed?', 'សេរីភាពឥតខ្សែ ឬល្បឿនខ្សែ?'),
    {
      intro: [
        '📶',
        t(
          'Wi-Fi sends data through the air with radio waves. Cables send it through copper or glass.',
          'Wi-Fi ផ្ញើទិន្នន័យតាមខ្យល់ជាមួយរលកវិទ្យុ។ ខ្សែផ្ញើវាតាមស្ពាន់ ឬកញ្ចក់។',
        ),
      ],
      learn: [
        [
          '📶',
          'Wi-Fi',
          t(
            'Wireless: easy to move around, but walls and distance slow it.',
            'ឥតខ្សែ៖ ងាយផ្លាស់ទី តែជញ្ជាំង និងចម្ងាយធ្វើឱ្យយឺត។',
          ),
          'wireless',
        ],
        [
          '🔗',
          'Ethernet',
          t(
            'Wired: fast and steady — great for desktops and servers.',
            'ខ្សែ៖ លឿន និងស្ថិរភាព — ល្អសម្រាប់កុំព្យូទ័រលើតុ និងម៉ាស៊ីនមេ។',
          ),
        ],
        [
          '💡',
          t('Fibre optic', 'ខ្សែកាបអុបទិក'),
          t(
            'Glass cables that carry light — the fastest, used for home internet.',
            'ខ្សែកញ្ចក់ដែលដឹកពន្លឺ — លឿនបំផុត ប្រើសម្រាប់អ៊ីនធឺណិតផ្ទះ។',
          ),
          'fibre',
        ],
        [
          '📱',
          t('Mobile data (4G/5G)', 'ទិន្នន័យទូរស័ព្ទ (4G/5G)'),
          t(
            'Internet from phone towers, anywhere with signal.',
            'អ៊ីនធឺណិតពីប៉មទូរស័ព្ទ គ្រប់ទីកន្លែងដែលមានសញ្ញា។',
          ),
          'signal',
        ],
      ],
      see: [
        t(
          'Next to the router: 📶📶📶📶 fast\nTwo walls away: 📶📶 slower\nOutside the gate: 📶 very slow',
          'ជិត router៖ 📶📶📶📶 លឿន\nឆ្ងាយពីរជញ្ជាំង៖ 📶📶 យឺតជាង\nក្រៅរបង៖ 📶 យឺតណាស់',
        ),
        t(
          'Distance and walls weaken the Wi-Fi signal.',
          'ចម្ងាយ និងជញ្ជាំងធ្វើឱ្យសញ្ញា Wi-Fi ខ្សោយ។',
        ),
      ],
      words: [
        ['wireless', 'ឥតខ្សែ', '📶'],
        ['signal', 'សញ្ញា'],
        ['speed', 'ល្បឿន', '🚀'],
        ['fibre', 'សរសៃអុបទិក', '💡'],
      ],
      play: [
        mc(t('Which sends data through the air?', 'តើមួយណាផ្ញើទិន្នន័យតាមខ្យល់?'), 'Wi-Fi', [
          'Ethernet',
          t('Fibre', 'ខ្សែកាបអុបទិក'),
          'USB',
        ]),
        mc(
          t('Which carries data as light?', 'តើមួយណាដឹកទិន្នន័យជាពន្លឺ?'),
          t('Fibre optic', 'ខ្សែកាបអុបទិក'),
          ['Wi-Fi', 'Bluetooth', 'HDMI'],
        ),
        tf(t('Walls can make Wi-Fi weaker.', 'ជញ្ជាំងអាចធ្វើឱ្យ Wi-Fi ខ្សោយ។'), true),
        mc(
          t(
            'For an online exam, the steadiest connection is…',
            'សម្រាប់ការប្រឡងអនឡាញ ការតភ្ជាប់ស្ថិរភាពបំផុតគឺ…',
          ),
          t('an Ethernet cable', 'ខ្សែ Ethernet'),
          [t('Wi-Fi from the next street', 'Wi-Fi ពីផ្លូវបន្ទាប់'), t('Bluetooth', 'Bluetooth')],
        ),
        mc(
          t('4G and 5G come from…', '4G និង 5G មកពី…'),
          t('mobile phone towers', 'ប៉មទូរស័ព្ទចល័ត'),
          [t('the printer', 'ម៉ាស៊ីនបោះពុម្ព'), t('USB sticks', 'USB')],
        ),
        tf(
          t(
            'Public Wi-Fi in a café is always safe for banking.',
            'Wi-Fi សាធារណៈក្នុងហាងកាហ្វេមានសុវត្ថិភាពជានិច្ចសម្រាប់ធនាគារ។',
          ),
          false,
          {
            explanation: t(
              'Use mobile data or a trusted network for money.',
              'ប្រើទិន្នន័យទូរស័ព្ទ ឬបណ្តាញដែលទុកចិត្តសម្រាប់លុយ។',
            ),
          },
        ),
        mc(t('Which unit measures internet speed?', 'តើឯកតាណាវាស់ល្បឿនអ៊ីនធឺណិត?'), 'Mbps', [
          'GHz',
          'GB',
          'kg',
        ]),
        mc(
          t('Where is the best place for a home router?', 'តើកន្លែងណាល្អបំផុតសម្រាប់ router ផ្ទះ?'),
          t('High up, in the middle of the house', 'ខ្ពស់ នៅកណ្តាលផ្ទះ'),
          [t('Inside a metal box', 'ក្នុងប្រអប់ដែក'), t('Under the bed', 'ក្រោមគ្រែ')],
        ),
      ],
      challenge: [
        sortInto(
          t('Wired or wireless?', 'ខ្សែ ឬឥតខ្សែ?'),
          [
            ['w', t('Wired', 'ខ្សែ'), '🔗'],
            ['a', t('Wireless', 'ឥតខ្សែ'), '📶'],
          ],
          [
            ['Ethernet', 'w'],
            [t('Fibre optic', 'ខ្សែកាបអុបទិក'), 'w'],
            ['USB', 'w'],
            ['Wi-Fi', 'a'],
            ['Bluetooth', 'a'],
            ['5G', 'a'],
          ],
        ),
        num(
          t(
            'A 100 MB file downloads at 10 MB per second. How many seconds?',
            'ឯកសារ 100 MB ទាញយកក្នុងល្បឿន 10 MB ក្នុងមួយវិនាទី។ ប៉ុន្មានវិនាទី?',
          ),
          10,
        ),
        num(
          t(
            'Internet is 50 Mbps. Five phones share it equally. Mbps each?',
            'អ៊ីនធឺណិត 50 Mbps។ ទូរស័ព្ទប្រាំចែកស្មើគ្នា។ Mbps ម្នាក់ៗ?',
          ),
          10,
        ),
        mc(
          t(
            'Video calls freeze in your bedroom but not near the router. Best fix?',
            'ការហៅវីដេអូគាំងក្នុងបន្ទប់គេង តែមិនគាំងជិត router។ ដំណោះស្រាយល្អបំផុត?',
          ),
          t('Move closer or add a Wi-Fi extender', 'ទៅជិតជាង ឬបន្ថែមឧបករណ៍ពង្រីក Wi-Fi'),
          [t('Buy a bigger screen', 'ទិញអេក្រង់ធំជាង'), t('Turn off the phone', 'បិទទូរស័ព្ទ')],
        ),
        match(
          t('Match the connection to its best use.', 'ផ្គូផ្គងការតភ្ជាប់ជាមួយការប្រើល្អបំផុត។'),
          [
            ['Wi-Fi', t('Phones at home', 'ទូរស័ព្ទនៅផ្ទះ')],
            ['Ethernet', t('Office desktop', 'កុំព្យូទ័រលើតុការិយាល័យ')],
            ['4G/5G', t('On the bus', 'លើឡានក្រុង')],
            ['Bluetooth', t('Wireless earbuds', 'កាសឥតខ្សែ')],
          ],
        ),
        tf(
          t(
            'A Wi-Fi password stops strangers from using your internet.',
            'ពាក្យសម្ងាត់ Wi-Fi បញ្ឈប់មនុស្សចម្លែកពីការប្រើអ៊ីនធឺណិតរបស់អ្នក។',
          ),
          true,
        ),
        mc(
          t(
            'Which is the strongest Wi-Fi security setting?',
            'តើការកំណត់សុវត្ថិភាព Wi-Fi ណាខ្លាំងបំផុត?',
          ),
          'WPA3',
          ['WEP', t('Open (no password)', 'បើកចំហ (គ្មានពាក្យសម្ងាត់)'), 'WPS PIN'],
        ),
        buildSentence(
          t('Build the rule.', 'បង្កើតច្បាប់។'),
          'Cables are steady and Wi-Fi is free to move.',
          { say: 'Cables are steady, and Wi-Fi is free to move.' },
        ),
      ],
      games: [
        robot(
          t('Walk to the router to get full Wi-Fi bars!', 'ដើរទៅ router ដើម្បីបានសញ្ញា Wi-Fi ពេញ!'),
          ['S#...', '.#.#.', '...#G'],
          { goalIcon: '📶' },
        ),
        catchIt(
          t('Catch the WIRELESS connections!', 'ចាប់ការតភ្ជាប់ឥតខ្សែ!'),
          ['Wi-Fi', 'Bluetooth', '4G', '5G'],
          ['Ethernet', t('Fibre', 'ខ្សែកាបអុបទិក'), 'HDMI', 'USB'],
          { speed: 'fast' },
        ),
      ],
      reward: t(
        'You can pick the right connection for every job. 📶',
        'អ្នកអាចជ្រើសរើសការតភ្ជាប់ត្រឹមត្រូវសម្រាប់គ្រប់ការងារ។ 📶',
      ),
    },
  ),

  // 11 ────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'ip-addresses',
    '🏷️',
    t('IP Addresses', 'អាសយដ្ឋាន IP'),
    t('Every device has an address on the network.', 'ឧបករណ៍នីមួយៗមានអាសយដ្ឋានលើបណ្តាញ។'),
    {
      intro: [
        '🏷️',
        t(
          'A letter needs a home address. Data needs an IP address!',
          'សំបុត្រត្រូវការអាសយដ្ឋានផ្ទះ។ ទិន្នន័យត្រូវការអាសយដ្ឋាន IP!',
        ),
      ],
      learn: [
        [
          '🏷️',
          t('IP address', 'អាសយដ្ឋាន IP'),
          t(
            'Numbers like 192.168.1.15 that identify a device.',
            'លេខដូចជា 192.168.1.15 ដែលកំណត់អត្តសញ្ញាណឧបករណ៍។',
          ),
          'address',
        ],
        [
          '4️⃣',
          'IPv4',
          t('Four numbers from 0 to 255, separated by dots.', 'លេខបួនពី 0 ដល់ 255 បំបែកដោយចំណុច។'),
        ],
        [
          '🏠',
          t('Private vs public', 'ឯកជន និងសាធារណៈ'),
          t(
            '192.168.x.x is private (inside your home). Your router has one public IP for the internet.',
            '192.168.x.x ជាឯកជន (ក្នុងផ្ទះ)។ Router របស់អ្នកមាន IP សាធារណៈមួយសម្រាប់អ៊ីនធឺណិត។',
          ),
          'private',
        ],
        [
          '🤖',
          'DHCP',
          t(
            'The router gives out IP addresses automatically.',
            'Router ចែកអាសយដ្ឋាន IP ដោយស្វ័យប្រវត្តិ។',
          ),
        ],
      ],
      see: [
        'Phone:  192.168.1.10\nLaptop: 192.168.1.11\nPrinter: 192.168.1.20\nRouter: 192.168.1.1',
        t(
          'Same street (192.168.1), different house numbers.',
          'ផ្លូវដូចគ្នា (192.168.1) លេខផ្ទះខុសគ្នា។',
        ),
      ],
      words: [
        ['address', 'អាសយដ្ឋាន', '🏷️'],
        ['number', 'លេខ', '🔢'],
        ['private', 'ឯកជន', '🔒'],
        ['public', 'សាធារណៈ', '🌍'],
      ],
      play: [
        mc(
          t('Which is a valid IPv4 address?', 'តើមួយណាជាអាសយដ្ឋាន IPv4 ត្រឹមត្រូវ?'),
          '192.168.1.15',
          ['192.168.1', '300.1.1.1', '192-168-1-15'],
        ),
        mc(
          t('How many numbers are in an IPv4 address?', 'តើមានលេខប៉ុន្មានក្នុងអាសយដ្ឋាន IPv4?'),
          '4',
          ['2', '3', '6'],
        ),
        num(
          t(
            'What is the BIGGEST number allowed in one part of IPv4?',
            'តើលេខធំបំផុតដែលអនុញ្ញាតក្នុងផ្នែកមួយនៃ IPv4 គឺប៉ុន្មាន?',
          ),
          255,
        ),
        tf(
          t(
            'Two devices on the same network can have the same IP address.',
            'ឧបករណ៍ពីរលើបណ្តាញដូចគ្នាអាចមានអាសយដ្ឋាន IP ដូចគ្នា។',
          ),
          false,
          {
            explanation: t(
              'That causes an “IP conflict” — each needs its own.',
              'នោះបណ្តាលឱ្យមាន «ការប៉ះទង្គិច IP» — ម្នាក់ៗត្រូវការផ្ទាល់ខ្លួន។',
            ),
          },
        ),
        mc(
          t(
            'What gives out IP addresses automatically?',
            'តើអ្វីចែកអាសយដ្ឋាន IP ដោយស្វ័យប្រវត្តិ?',
          ),
          'DHCP',
          ['HDMI', 'HTML', 'USB'],
        ),
        mc(
          t('192.168.x.x addresses are…', 'អាសយដ្ឋាន 192.168.x.x គឺ…'),
          t('private (home or office)', 'ឯកជន (ផ្ទះ ឬការិយាល័យ)'),
          [t('only for websites', 'សម្រាប់តែគេហទំព័រ'), t('phone numbers', 'លេខទូរស័ព្ទ')],
        ),
        mc(
          t(
            'What is often the router’s address at home?',
            'តើអ្វីជាញឹកញាប់ជាអាសយដ្ឋាន router នៅផ្ទះ?',
          ),
          '192.168.1.1',
          ['8.8.8.8', '0.0.0.0', '999.1.1.1'],
        ),
        tf(
          t(
            'An IP address is like a home address for data.',
            'អាសយដ្ឋាន IP ដូចជាអាសយដ្ឋានផ្ទះសម្រាប់ទិន្នន័យ។',
          ),
          true,
        ),
      ],
      challenge: [
        sortInto(
          t('Valid or invalid IPv4?', 'IPv4 ត្រឹមត្រូវ ឬមិនត្រឹមត្រូវ?'),
          [
            ['v', t('Valid', 'ត្រឹមត្រូវ'), '✅'],
            ['x', t('Invalid', 'មិនត្រឹមត្រូវ'), '❌'],
          ],
          [
            ['10.0.0.5', 'v'],
            ['172.16.4.20', 'v'],
            ['8.8.8.8', 'v'],
            ['256.1.1.1', 'x'],
            ['192.168.1', 'x'],
            ['1.2.3.4.5', 'x'],
          ],
        ),
        mc(
          t(
            'Which command shows your IP address on Windows?',
            'តើពាក្យបញ្ជាណាបង្ហាញអាសយដ្ឋាន IP របស់អ្នកលើ Windows?',
          ),
          'ipconfig',
          ['ping', 'print', 'dir'],
          cmd('C:\\> ipconfig\n   IPv4 Address. . . : 192.168.1.11'),
        ),
        mc(
          t(
            'Laptop 192.168.1.11 and phone 192.168.1.12 are…',
            'កុំព្យូទ័រ 192.168.1.11 និងទូរស័ព្ទ 192.168.1.12 គឺ…',
          ),
          t('on the same local network', 'នៅលើបណ្តាញមូលដ្ឋានដូចគ្នា'),
          [t('in different countries', 'នៅប្រទេសផ្សេងគ្នា'), t('the same device', 'ឧបករណ៍តែមួយ')],
        ),
        num(
          t(
            'A home network uses 192.168.1.2 to 192.168.1.11. How many addresses is that?',
            'បណ្តាញផ្ទះប្រើ 192.168.1.2 ដល់ 192.168.1.11។ តើអាសយដ្ឋានប៉ុន្មាន?',
          ),
          10,
        ),
        mc(
          t('Why was IPv6 made?', 'ហេតុអ្វី IPv6 ត្រូវបានបង្កើត?'),
          t('The world ran out of IPv4 addresses', 'ពិភពលោកអស់អាសយដ្ឋាន IPv4'),
          [
            t('IPv4 was too fast', 'IPv4 លឿនពេក'),
            t('To make passwords', 'ដើម្បីបង្កើតពាក្យសម្ងាត់'),
          ],
        ),
        match(t('Match the address to what it is.', 'ផ្គូផ្គងអាសយដ្ឋានជាមួយអ្វីដែលវាជា។'), [
          ['192.168.1.1', t('Home router', 'Router ផ្ទះ')],
          ['127.0.0.1', t('This computer itself', 'កុំព្យូទ័រនេះផ្ទាល់')],
          ['8.8.8.8', t('A public DNS server', 'ម៉ាស៊ីនមេ DNS សាធារណៈ')],
        ]),
        tf(
          t(
            'Your router shares ONE public IP with all your home devices.',
            'Router របស់អ្នកចែករំលែក IP សាធារណៈមួយជាមួយឧបករណ៍ផ្ទះទាំងអស់។',
          ),
          true,
        ),
        typeIt(
          t(
            'Type the Windows command that shows your IP.',
            'វាយពាក្យបញ្ជា Windows ដែលបង្ហាញ IP របស់អ្នក។',
          ),
          'ipconfig',
        ),
      ],
      games: [
        catchIt(
          t('Catch the VALID IP addresses!', 'ចាប់អាសយដ្ឋាន IP ត្រឹមត្រូវ!'),
          ['192.168.0.1', '10.1.2.3', '8.8.4.4', '172.20.1.9'],
          ['300.2.2.2', '1.2.3', 'a.b.c.d', '192.168.1.256'],
          { speed: 'slow' },
        ),
        memory(t('Match the network word to its meaning.', 'ផ្គូផ្គងពាក្យបណ្តាញជាមួយអត្ថន័យ។'), [
          ['IP', t('Device address', 'អាសយដ្ឋានឧបករណ៍')],
          ['DHCP', t('Gives out addresses', 'ចែកអាសយដ្ឋាន')],
          ['IPv4', t('Four numbers', 'លេខបួន')],
          ['ipconfig', t('Shows your IP', 'បង្ហាញ IP របស់អ្នក')],
        ]),
      ],
      reward: t(
        'Every device has an address — and now you can read them! 🏷️',
        'ឧបករណ៍នីមួយៗមានអាសយដ្ឋាន — ហើយឥឡូវអ្នកអាចអានវា! 🏷️',
      ),
    },
  ),

  // 12 ────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'routers-and-switches',
    '📡',
    t('Routers, Switches & Modems', 'Router, Switch និង Modem'),
    t('The boxes that move data around.', 'ប្រអប់ដែលផ្លាស់ទីទិន្នន័យ។'),
    {
      intro: [
        '📡',
        t(
          'Behind every network is a small team of boxes with blinking lights.',
          'នៅពីក្រោយបណ្តាញនីមួយៗគឺក្រុមប្រអប់តូចមានភ្លើងភ្លឹបភ្លែត។',
        ),
      ],
      learn: [
        [
          '🌍',
          t('Modem', 'Modem'),
          t(
            'Connects your home to the internet provider (fibre, cable).',
            'ភ្ជាប់ផ្ទះរបស់អ្នកទៅអ្នកផ្តល់អ៊ីនធឺណិត (ខ្សែកាបអុបទិក ខ្សែ)។',
          ),
          'modem',
        ],
        [
          '📡',
          t('Router', 'Router'),
          t(
            'Sends data between your network and the internet; usually has Wi-Fi.',
            'ផ្ញើទិន្នន័យរវាងបណ្តាញរបស់អ្នក និងអ៊ីនធឺណិត ជាធម្មតាមាន Wi-Fi។',
          ),
          'router',
        ],
        [
          '🔀',
          t('Switch', 'Switch'),
          t('Connects many wired devices inside one LAN.', 'ភ្ជាប់ឧបករណ៍ខ្សែច្រើនក្នុង LAN មួយ។'),
          'switch',
        ],
        [
          '🏢',
          'ISP',
          t(
            'Internet Service Provider: the company you pay for internet.',
            'អ្នកផ្តល់សេវាអ៊ីនធឺណិត៖ ក្រុមហ៊ុនដែលអ្នកបង់ថ្លៃអ៊ីនធឺណិត។',
          ),
          'provider',
        ],
      ],
      see: [
        t(
          'ISP 🏢 → modem 🌍 → router 📡 → switch 🔀 → 20 classroom computers 💻',
          'ISP 🏢 → modem 🌍 → router 📡 → switch 🔀 → កុំព្យូទ័រថ្នាក់ 20 💻',
        ),
        t(
          'At home, one box often does modem + router + Wi-Fi.',
          'នៅផ្ទះ ប្រអប់មួយជាញឹកញាប់ធ្វើ modem + router + Wi-Fi។',
        ),
      ],
      words: [
        ['router', 'រ៉ោតទ័រ', '📡'],
        ['switch', 'ស្វីច', '🔀'],
        ['modem', 'ម៉ូដឹម'],
        ['provider', 'អ្នកផ្តល់សេវា', '🏢'],
      ],
      play: [
        mc(
          t(
            'Which box connects your home to the internet provider?',
            'តើប្រអប់ណាភ្ជាប់ផ្ទះរបស់អ្នកទៅអ្នកផ្តល់អ៊ីនធឺណិត?',
          ),
          t('Modem', 'Modem'),
          [t('Switch', 'Switch'), t('Printer', 'ម៉ាស៊ីនបោះពុម្ព')],
        ),
        mc(
          t(
            'Which box connects MANY wired computers in a lab?',
            'តើប្រអប់ណាភ្ជាប់កុំព្យូទ័រខ្សែច្រើនក្នុងបន្ទប់ពិសោធន៍?',
          ),
          t('Switch', 'Switch'),
          [t('Modem', 'Modem'), t('Webcam', 'កាមេរ៉ា')],
        ),
        mc(
          t('Which box usually makes the home Wi-Fi?', 'តើប្រអប់ណាជាធម្មតាបង្កើត Wi-Fi ផ្ទះ?'),
          t('Router', 'Router'),
          [t('Switch', 'Switch'), t('Monitor', 'អេក្រង់')],
        ),
        mc(
          t('What is an ISP?', 'តើ ISP ជាអ្វី?'),
          t('The company that sells you internet', 'ក្រុមហ៊ុនដែលលក់អ៊ីនធឺណិតឱ្យអ្នក'),
          [t('A type of cable', 'ប្រភេទខ្សែ'), t('A web page', 'ទំព័រវេប')],
        ),
        tf(
          t(
            'Blinking lights on a router usually mean data is moving.',
            'ភ្លើងភ្លឹបភ្លែតលើ router ជាធម្មតាមានន័យថាទិន្នន័យកំពុងផ្លាស់ទី។',
          ),
          true,
        ),
        tf(
          t(
            'A switch connects you to the internet by itself.',
            'Switch ភ្ជាប់អ្នកទៅអ៊ីនធឺណិតដោយខ្លួនឯង។',
          ),
          false,
          {
            explanation: t(
              'A switch links devices inside a LAN; the router reaches the internet.',
              'Switch ភ្ជាប់ឧបករណ៍ក្នុង LAN router ទៅដល់អ៊ីនធឺណិត។',
            ),
          },
        ),
        mc(
          t('A red light on the router often means…', 'ភ្លើងក្រហមលើ router ជាញឹកញាប់មានន័យថា…'),
          t('no internet connection', 'គ្មានការតភ្ជាប់អ៊ីនធឺណិត'),
          [
            t('everything is perfect', 'អ្វីៗល្អឥតខ្ចោះ'),
            t('the printer is on', 'ម៉ាស៊ីនបោះពុម្ពបើក'),
          ],
        ),
        tf(
          t(
            'You should change the router’s default admin password.',
            'អ្នកគួរប្តូរពាក្យសម្ងាត់អ្នកគ្រប់គ្រងលំនាំដើមរបស់ router។',
          ),
          true,
        ),
      ],
      challenge: [
        order(
          t(
            'Order how internet reaches a school computer.',
            'តម្រៀបរបៀបដែលអ៊ីនធឺណិតទៅដល់កុំព្យូទ័រសាលា។',
          ),
          [
            'ISP',
            t('Modem', 'Modem'),
            t('Router', 'Router'),
            t('Switch', 'Switch'),
            t('Computer', 'កុំព្យូទ័រ'),
          ],
        ),
        match(t('Match the box to the post office.', 'ផ្គូផ្គងប្រអប់ជាមួយការិយាល័យប្រៃសណីយ៍។'), [
          ['ISP', t('The national post company', 'ក្រុមហ៊ុនប្រៃសណីយ៍ជាតិ')],
          [
            t('Router', 'Router'),
            t('Sorting office choosing routes', 'ការិយាល័យតម្រៀបជ្រើសរើសផ្លូវ'),
          ],
          [t('Switch', 'Switch'), t('Mailboxes in one building', 'ប្រអប់សំបុត្រក្នុងអគារមួយ')],
          [t('Modem', 'Modem'), t('The road into town', 'ផ្លូវចូលទីក្រុង')],
        ]),
        num(
          t(
            'A switch has 24 ports. One goes to the router. How many computers can plug in?',
            'Switch មានរន្ធ 24។ មួយទៅ router។ តើកុំព្យូទ័រប៉ុន្មានអាចដោតបាន?',
          ),
          23,
        ),
        mc(
          t(
            'The whole school lab lost internet but computers can still share files. Which box probably has the problem?',
            'បន្ទប់ពិសោធន៍សាលាទាំងមូលបាត់អ៊ីនធឺណិត តែកុំព្យូទ័រនៅតែចែករំលែកឯកសារបាន។ ប្រអប់ណាប្រហែលមានបញ្ហា?',
          ),
          t('Router or modem', 'Router ឬ modem'),
          [t('Switch', 'Switch'), t('Every computer', 'កុំព្យូទ័រគ្រប់គ្រឿង')],
        ),
        mc(
          t(
            'How do you safely restart a home router?',
            'តើអ្នកចាប់ផ្តើម router ផ្ទះឡើងវិញដោយសុវត្ថិភាពដោយរបៀបណា?',
          ),
          t('Unplug it, wait 30 seconds, plug it back in', 'ដកវា រង់ចាំ 30 វិនាទី ដោតវាវិញ'),
          [
            t('Press reset for 30 seconds', 'ចុច reset 30 វិនាទី'),
            t('Hit it gently', 'វាយវាថ្នមៗ'),
          ],
          {
            explanation: t(
              'Holding reset erases all settings, including the Wi-Fi password.',
              'ការសង្កត់ reset លុបការកំណត់ទាំងអស់ រួមទាំងពាក្យសម្ងាត់ Wi-Fi។',
            ),
          },
        ),
        sortInto(
          t('Inside your LAN or the ISP’s job?', 'ក្នុង LAN របស់អ្នក ឬការងាររបស់ ISP?'),
          [
            ['me', t('Your LAN', 'LAN របស់អ្នក'), '🏠'],
            ['isp', t('ISP', 'ISP'), '🏢'],
          ],
          [
            [t('Your switch', 'Switch របស់អ្នក'), 'me'],
            [t('Wi-Fi password', 'ពាក្យសម្ងាត់ Wi-Fi'), 'me'],
            [t('Cables in your office', 'ខ្សែក្នុងការិយាល័យ'), 'me'],
            [t('Fibre cable in the street', 'ខ្សែកាបអុបទិកលើផ្លូវ'), 'isp'],
            [t('Your monthly bill', 'វិក្កយបត្រប្រចាំខែ'), 'isp'],
            [t('Outage in the whole district', 'ដាច់ទូទាំងខណ្ឌ'), 'isp'],
          ],
        ),
        tf(
          t(
            'Many home routers combine a modem, router and Wi-Fi in one box.',
            'Router ផ្ទះជាច្រើនរួមបញ្ចូល modem, router និង Wi-Fi ក្នុងប្រអប់មួយ។',
          ),
          true,
        ),
        buildSentence(
          t('Build the sentence.', 'បង្កើតប្រយោគ។'),
          'The router connects your network to the internet.',
          { say: 'The router connects your network to the internet.' },
        ),
      ],
      games: [
        robot(
          t(
            'You are a data packet. Travel from the modem through the router to the laptop!',
            'អ្នកជាកញ្ចប់ទិន្នន័យ។ ធ្វើដំណើរពី modem តាម router ទៅកុំព្យូទ័រយួរដៃ!',
          ),
          ['S..#', '#*.#', '#..G'],
          { goalIcon: '💻', collectIcon: '📡' },
        ),
        memory(t('Match the box to its job.', 'ផ្គូផ្គងប្រអប់ជាមួយតួនាទី។'), [
          [['🌍', t('Modem', 'Modem')], t('Link to ISP', 'ភ្ជាប់ទៅ ISP')],
          [['📡', t('Router', 'Router')], t('Choose the route', 'ជ្រើសរើសផ្លូវ')],
          [['🔀', t('Switch', 'Switch')], t('Connect the lab', 'ភ្ជាប់បន្ទប់ពិសោធន៍')],
          [['🏢', 'ISP'], t('Sells internet', 'លក់អ៊ីនធឺណិត')],
        ]),
      ],
      reward: t(
        'Modem, router, switch — you know the whole team! 📡',
        'Modem, router, switch — អ្នកស្គាល់ក្រុមទាំងមូល! 📡',
      ),
    },
  ),

  // 13 ────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'how-data-travels',
    '📦',
    t('How Data Travels', 'របៀបដែលទិន្នន័យធ្វើដំណើរ'),
    t('Packets, routes and protocols.', 'កញ្ចប់ ផ្លូវ និងពិធីការ។'),
    {
      intro: [
        '📦',
        t(
          'A big photo is cut into tiny packets, each finding its own way, then put back together!',
          'រូបថតធំត្រូវបានកាត់ជាកញ្ចប់តូចៗ នីមួយៗរកផ្លូវរបស់ខ្លួន រួចផ្គុំឡើងវិញ!',
        ),
      ],
      learn: [
        [
          '📦',
          t('Packet', 'កញ្ចប់ទិន្នន័យ'),
          t(
            'A small piece of data with a “to” and “from” address.',
            'បំណែកទិន្នន័យតូចមួយមានអាសយដ្ឋាន «ទៅ» និង «ពី»។',
          ),
          'packet',
        ],
        [
          '🛣️',
          t('Routing', 'ការបញ្ជូនផ្លូវ'),
          t(
            'Routers pass packets along, choosing a good road each time.',
            'Router បញ្ជូនកញ្ចប់ ជ្រើសរើសផ្លូវល្អរាល់ពេល។',
          ),
          'route',
        ],
        [
          '📜',
          t('Protocol', 'ពិធីការ'),
          t(
            'Rules for talking: TCP/IP for the internet, HTTPS for secure web.',
            'ច្បាប់សម្រាប់និយាយ៖ TCP/IP សម្រាប់អ៊ីនធឺណិត HTTPS សម្រាប់វេបសុវត្ថិភាព។',
          ),
          'protocol',
        ],
        [
          '⏱️',
          t('Ping', 'Ping'),
          t(
            'A test: how long does a packet take to go and come back?',
            'ការសាកល្បង៖ តើកញ្ចប់ចំណាយពេលប៉ុន្មានទៅ និងត្រឡប់មកវិញ?',
          ),
          'ping',
        ],
      ],
      see: [
        'C:\\> ping google.com\nReply from 142.250.1.1: time=25ms\nReply from 142.250.1.1: time=24ms',
        t('25 milliseconds there and back — very fast!', '25 មិល្លីវិនាទីទៅមក — លឿនណាស់!'),
      ],
      words: [
        ['packet', 'កញ្ចប់', '📦'],
        ['route', 'ផ្លូវ', '🛣️'],
        ['protocol', 'ពិធីការ', '📜'],
        ['send', 'ផ្ញើ', '📤'],
      ],
      play: [
        mc(
          t('Big files are sent across the internet as…', 'ឯកសារធំត្រូវបានផ្ញើឆ្លងអ៊ីនធឺណិតជា…'),
          t('many small packets', 'កញ្ចប់តូចៗជាច្រើន'),
          [t('one giant piece', 'បំណែកយក្សមួយ'), t('paper letters', 'សំបុត្រក្រដាស')],
        ),
        tf(t('Each packet carries a destination address.', 'កញ្ចប់នីមួយៗដឹកអាសយដ្ឋានគោលដៅ។'), true),
        mc(
          t('What is a protocol?', 'តើពិធីការជាអ្វី?'),
          t('A set of rules for communicating', 'សំណុំច្បាប់សម្រាប់ទំនាក់ទំនង'),
          [t('A cable', 'ខ្សែ'), t('A virus', 'មេរោគ')],
        ),
        mc(
          t(
            'Which protocol keeps web pages secure (🔒)?',
            'តើពិធីការណាធ្វើឱ្យទំព័រវេបមានសុវត្ថិភាព (🔒)?',
          ),
          'HTTPS',
          ['HTTP', 'USB', 'HDMI'],
        ),
        mc(
          t(
            'Which command tests if a website answers?',
            'តើពាក្យបញ្ជាណាសាកល្បងថាតើគេហទំព័រឆ្លើយតបទេ?',
          ),
          'ping',
          ['ipconfig', 'print', 'paint'],
        ),
        tf(
          t(
            'Packets from the same file can take different routes.',
            'កញ្ចប់ពីឯកសារដូចគ្នាអាចទៅផ្លូវខុសគ្នា។',
          ),
          true,
        ),
        mc(t('Which ping time is FASTER?', 'តើពេល ping ណាលឿនជាង?'), '20 ms', [
          '200 ms',
          '900 ms',
          '2000 ms',
        ]),
        tf(
          t(
            'If a packet is lost, it can be sent again.',
            'ប្រសិនបើកញ្ចប់បាត់ វាអាចត្រូវបានផ្ញើម្តងទៀត។',
          ),
          true,
        ),
      ],
      challenge: [
        order(t('Order the journey of a photo you send.', 'តម្រៀបដំណើររូបថតដែលអ្នកផ្ញើ។'), [
          t('Photo is cut into packets', 'រូបថតត្រូវបានកាត់ជាកញ្ចប់'),
          t('Packets get addresses', 'កញ្ចប់ទទួលអាសយដ្ឋាន'),
          t('Routers pass them along', 'Router បញ្ជូនវា'),
          t('Packets arrive', 'កញ្ចប់មកដល់'),
          t('Photo is rebuilt', 'រូបថតត្រូវបានផ្គុំឡើងវិញ'),
        ]),
        num(
          t(
            'A 1,000 KB photo is cut into 10 KB packets. How many packets?',
            'រូបថត 1,000 KB ត្រូវបានកាត់ជាកញ្ចប់ 10 KB។ តើប៉ុន្មានកញ្ចប់?',
          ),
          100,
        ),
        mc(
          t('What does this ping result show?', 'តើលទ្ធផល ping នេះបង្ហាញអ្វី?'),
          t('The site did not answer', 'គេហទំព័រមិនឆ្លើយតប'),
          [t('Very fast internet', 'អ៊ីនធឺណិតលឿនណាស់'), t('A new email', 'អ៊ីមែលថ្មី')],
          cmd('C:\\> ping school-server\nRequest timed out.\nRequest timed out.'),
        ),
        match(t('Match the protocol to its job.', 'ផ្គូផ្គងពិធីការជាមួយតួនាទី។'), [
          ['HTTPS', t('Secure web pages', 'ទំព័រវេបសុវត្ថិភាព')],
          ['TCP/IP', t('Internet delivery rules', 'ច្បាប់ដឹកជញ្ជូនអ៊ីនធឺណិត')],
          ['SMTP', t('Sending email', 'ការផ្ញើអ៊ីមែល')],
          ['DHCP', t('Giving out IPs', 'ការចែក IP')],
        ]),
        num(
          t(
            'Ping times: 30, 20, 40 ms. What is the average?',
            'ពេល ping៖ 30, 20, 40 ms។ មធ្យមភាគប៉ុន្មាន?',
          ),
          30,
        ),
        tf(
          t(
            'Undersea cables carry most data between countries.',
            'ខ្សែក្រោមសមុទ្រដឹកទិន្នន័យភាគច្រើនរវាងប្រទេស។',
          ),
          true,
          {
            explanation: t(
              'Satellites help, but sea cables carry most traffic.',
              'ផ្កាយរណបជួយ តែខ្សែក្រោមសមុទ្រដឹកចរាចរណ៍ភាគច្រើន។',
            ),
          },
        ),
        mc(
          t('Online games feel laggy when ping is…', 'ហ្គេមអនឡាញមានអារម្មណ៍យឺតពេល ping…'),
          t('high (slow)', 'ខ្ពស់ (យឺត)'),
          [t('low (fast)', 'ទាប (លឿន)'), t('zero', 'សូន្យ')],
        ),
        buildSentence(t('Build the sentence.', 'បង្កើតប្រយោគ។'), 'Data travels in small packets.', {
          say: 'Data travels in small packets.',
        }),
      ],
      games: [
        robot(
          t(
            'Guide the packet around the broken routers to its destination!',
            'ណែនាំកញ្ចប់ជុំវិញ router ខូចទៅគោលដៅ!',
          ),
          ['S.#....', '..#.##.', '.##..#.', '....#.G'],
          { goalIcon: '🏁' },
        ),
        catchIt(
          t('Catch the PROTOCOLS!', 'ចាប់ពិធីការ!'),
          ['HTTPS', 'TCP/IP', 'DHCP', 'SMTP'],
          ['HDMI', 'RAM', 'GHz', 'SSD'],
          { speed: 'normal' },
        ),
      ],
      reward: t(
        'Packet by packet, you now know how the internet moves data! 📦',
        'កញ្ចប់ម្តងមួយ ឥឡូវអ្នកដឹងពីរបៀបដែលអ៊ីនធឺណិតផ្លាស់ទីទិន្នន័យ! 📦',
      ),
    },
  ),

  // 14 ────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'dns-and-domains',
    '📖',
    t('DNS: The Internet’s Phone Book', 'DNS៖ សៀវភៅទូរស័ព្ទនៃអ៊ីនធឺណិត'),
    t('How names become IP addresses.', 'របៀបដែលឈ្មោះក្លាយជាអាសយដ្ឋាន IP។'),
    {
      intro: [
        '📖',
        t(
          'You remember “youtube.com”, not 142.250.1.1. DNS turns names into numbers for you.',
          'អ្នកចាំ «youtube.com» មិនមែន 142.250.1.1។ DNS ប្តូរឈ្មោះទៅជាលេខសម្រាប់អ្នក។',
        ),
      ],
      learn: [
        [
          '🏷️',
          t('Domain name', 'ឈ្មោះដែន'),
          t(
            'An easy name for a website: itstarter.store',
            'ឈ្មោះងាយសម្រាប់គេហទំព័រ៖ itstarter.store',
          ),
          'domain',
        ],
        [
          '📖',
          'DNS',
          t(
            'Domain Name System: looks up the IP address for a name.',
            'ប្រព័ន្ធឈ្មោះដែន៖ ស្វែងរកអាសយដ្ឋាន IP សម្រាប់ឈ្មោះ។',
          ),
        ],
        [
          '🌐',
          t('Top-level domain', 'ដែនកម្រិតកំពូល'),
          t('The end part: .com, .org, .kh, .edu.kh', 'ផ្នែកចុង៖ .com, .org, .kh, .edu.kh'),
        ],
        [
          '🔗',
          'URL',
          t(
            'The full address: https://itstarter.store/login',
            'អាសយដ្ឋានពេញ៖ https://itstarter.store/login',
          ),
          'URL',
        ],
      ],
      see: [
        t(
          'You type: itstarter.store\nDNS answers: 51.79.173.160\nBrowser connects to 51.79.173.160 ✅',
          'អ្នកវាយ៖ itstarter.store\nDNS ឆ្លើយ៖ 51.79.173.160\nកម្មវិធីរុករកភ្ជាប់ទៅ 51.79.173.160 ✅',
        ),
        t('All this happens in a few milliseconds.', 'ទាំងអស់នេះកើតឡើងក្នុងពីរបីមិល្លីវិនាទី។'),
      ],
      words: [
        ['domain', 'ដែន', '🏷️'],
        ['name', 'ឈ្មោះ'],
        ['lookup', 'ស្វែងរក', '🔍'],
        ['URL', 'អាសយដ្ឋានវេប', '🔗'],
      ],
      play: [
        mc(
          t('What does DNS do?', 'តើ DNS ធ្វើអ្វី?'),
          t('Turns website names into IP addresses', 'ប្តូរឈ្មោះគេហទំព័រទៅជាអាសយដ្ឋាន IP'),
          [t('Makes pictures', 'បង្កើតរូបភាព'), t('Charges phones', 'សាកទូរស័ព្ទ')],
        ),
        mc(
          t(
            'In “www.moeys.gov.kh”, which part shows Cambodia?',
            'ក្នុង «www.moeys.gov.kh» តើផ្នែកណាបង្ហាញកម្ពុជា?',
          ),
          '.kh',
          ['.gov', 'www', 'moeys'],
        ),
        mc(t('Which is a domain name?', 'តើមួយណាជាឈ្មោះដែន?'), 'wikipedia.org', [
          '192.168.1.1',
          'Ctrl+C',
          'index.html',
        ]),
        tf(
          t(
            'DNS is like a phone book for the internet.',
            'DNS ដូចជាសៀវភៅទូរស័ព្ទសម្រាប់អ៊ីនធឺណិត។',
          ),
          true,
        ),
        mc(
          t('.edu.kh is usually used by…', '.edu.kh ជាធម្មតាប្រើដោយ…'),
          t('Cambodian schools and universities', 'សាលា និងសាកលវិទ្យាល័យកម្ពុជា'),
          [t('Games', 'ហ្គេម'), t('Shops in Thailand', 'ហាងក្នុងប្រទេសថៃ')],
        ),
        tf(
          t(
            'Without DNS you could still visit sites by typing their IP.',
            'បើគ្មាន DNS អ្នកនៅតែអាចចូលគេហទំព័រដោយវាយ IP របស់វា។',
          ),
          true,
        ),
        mc(
          t(
            'In “https://itstarter.store/login”, what is “/login”?',
            'ក្នុង «https://itstarter.store/login» តើ «/login» ជាអ្វី?',
          ),
          t('The page path', 'ផ្លូវទំព័រ'),
          [t('The domain', 'ដែន'), t('The protocol', 'ពិធីការ')],
        ),
        mc(
          t('Which domain looks FAKE for ABA Bank?', 'តើដែនណាមើលទៅក្លែងក្លាយសម្រាប់ធនាគារ ABA?'),
          'aba-bank-login.xyz',
          ['ababank.com'],
        ),
      ],
      challenge: [
        order(t('Order the parts of a URL.', 'តម្រៀបផ្នែកនៃ URL។'), [
          'https://',
          'www.',
          'itstarter',
          '.store',
          '/login',
        ]),
        order(
          t(
            'Order what happens when you type a website name.',
            'តម្រៀបអ្វីដែលកើតឡើងពេលអ្នកវាយឈ្មោះគេហទំព័រ។',
          ),
          [
            t('You type the name', 'អ្នកវាយឈ្មោះ'),
            t('The computer asks DNS', 'កុំព្យូទ័រសួរ DNS'),
            t('DNS replies with the IP', 'DNS ឆ្លើយជាមួយ IP'),
            t('The browser connects to that IP', 'កម្មវិធីរុករកភ្ជាប់ទៅ IP នោះ'),
          ],
        ),
        match(t('Match the domain ending to who uses it.', 'ផ្គូផ្គងចុងដែនជាមួយអ្នកប្រើ។'), [
          ['.gov.kh', t('Cambodian government', 'រដ្ឋាភិបាលកម្ពុជា')],
          ['.edu.kh', t('Cambodian schools', 'សាលាកម្ពុជា')],
          ['.org', t('Organisations', 'អង្គការ')],
          ['.com', t('Companies', 'ក្រុមហ៊ុន')],
        ]),
        mc(
          t(
            'Websites work by IP but not by name. Which part is broken?',
            'គេហទំព័រដំណើរការតាម IP តែមិនតាមឈ្មោះ។ ផ្នែកណាខូច?',
          ),
          'DNS',
          ['HDMI', t('The keyboard', 'ក្តារចុច'), 'RAM'],
        ),
        mc(
          t('Which command looks up a domain’s IP?', 'តើពាក្យបញ្ជាណាស្វែងរក IP របស់ដែន?'),
          'nslookup',
          ['ipconfig', 'print', 'dir'],
          cmd('C:\\> nslookup itstarter.store\nAddress: 51.79.173.160'),
        ),
        tf(
          t(
            '“g00gle.com” (with zeros) is the real Google.',
            '«g00gle.com» (មានលេខសូន្យ) គឺជា Google ពិត។',
          ),
          false,
          {
            explanation: t(
              'Scammers use look-alike names. Check every letter.',
              'អ្នកបោកប្រាស់ប្រើឈ្មោះស្រដៀង។ ពិនិត្យគ្រប់អក្សរ។',
            ),
          },
        ),
        sortInto(
          t('Real domain or suspicious?', 'ដែនពិត ឬគួរឱ្យសង្ស័យ?'),
          [
            ['ok', t('Looks real', 'មើលទៅពិត'), '✅'],
            ['sus', t('Suspicious', 'គួរឱ្យសង្ស័យ'), '🚩'],
          ],
          [
            ['wikipedia.org', 'ok'],
            ['moeys.gov.kh', 'ok'],
            ['youtube.com', 'ok'],
            ['faceb00k-login.xyz', 'sus'],
            ['free-iphone-win.top', 'sus'],
            ['paypa1.com', 'sus'],
          ],
        ),
        buildSentence(t('Build the sentence.', 'បង្កើតប្រយោគ។'), 'DNS turns names into numbers.', {
          say: 'DNS turns names into numbers.',
        }),
      ],
      games: [
        memory(t('Match the website to its domain ending.', 'ផ្គូផ្គងគេហទំព័រជាមួយចុងដែន។'), [
          [t('A ministry', 'ក្រសួង'), '.gov.kh'],
          [t('A university', 'សាកលវិទ្យាល័យ'), '.edu.kh'],
          [t('A charity', 'សប្បុរសធម៌'), '.org'],
          [t('A company', 'ក្រុមហ៊ុន'), '.com'],
        ]),
        catchIt(
          t('Catch the REAL-looking domains!', 'ចាប់ដែនដែលមើលទៅពិត!'),
          ['google.com', 'wikipedia.org', 'moeys.gov.kh', 'itstarter.store'],
          ['g00gle.com', 'wikipedla.org', 'free-prize.top', 'login-bank.xyz'],
          { speed: 'slow' },
        ),
      ],
      reward: t(
        'You know how names find their way on the internet. 📖',
        'អ្នកដឹងពីរបៀបដែលឈ្មោះរកផ្លូវលើអ៊ីនធឺណិត។ 📖',
      ),
    },
  ),

  // 15 ────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'fix-the-internet',
    '🛠️',
    t('Fix the Internet!', 'ជួសជុលអ៊ីនធឺណិត!'),
    t('Network troubleshooting step by step.', 'ការដោះស្រាយបញ្ហាបណ្តាញជំហានម្តងមួយ។'),
    {
      intro: [
        '🛠️',
        t(
          '“The internet is not working!” — the most common IT call. Let’s solve it like a pro.',
          '«អ៊ីនធឺណិតមិនដំណើរការ!» — ការហៅ IT ដែលញឹកញាប់បំផុត។ តោះដោះស្រាយវាដូចអ្នកជំនាញ។',
        ),
      ],
      learn: [
        [
          '📱',
          t('One device or all?', 'ឧបករណ៍មួយ ឬទាំងអស់?'),
          t(
            'If only one device fails, check that device. If all fail, check the router.',
            'ប្រសិនបើឧបករណ៍តែមួយមានបញ្ហា ពិនិត្យឧបករណ៍នោះ។ ប្រសិនបើទាំងអស់ ពិនិត្យ router។',
          ),
        ],
        [
          '✈️',
          t('Simple checks', 'ការពិនិត្យសាមញ្ញ'),
          t(
            'Wi-Fi on? Airplane mode off? Right network?',
            'Wi-Fi បើក? Airplane mode បិទ? បណ្តាញត្រឹមត្រូវ?',
          ),
        ],
        [
          '🔄',
          t('Restart in order', 'ចាប់ផ្តើមឡើងវិញតាមលំដាប់'),
          t(
            'Restart the device, then the router (unplug 30 seconds).',
            'ចាប់ផ្តើមឧបករណ៍ឡើងវិញ រួច router (ដក 30 វិនាទី)។',
          ),
          'restart',
        ],
        [
          '🧪',
          t('Test', 'សាកល្បង'),
          t(
            'ping, ipconfig, or open a simple site to see what works.',
            'ping, ipconfig ឬបើកគេហទំព័រសាមញ្ញដើម្បីមើលអ្វីដែលដំណើរការ។',
          ),
        ],
      ],
      see: [
        t(
          'Only my phone has no internet? → Toggle Wi-Fi off/on → works ✅\nEveryone has no internet? → Restart router → still down → call the ISP 📞',
          'មានតែទូរស័ព្ទខ្ញុំគ្មានអ៊ីនធឺណិត? → បិទ/បើក Wi-Fi → ដំណើរការ ✅\nគ្រប់គ្នាគ្មានអ៊ីនធឺណិត? → ចាប់ផ្តើម router ឡើងវិញ → នៅតែដាច់ → ទូរស័ព្ទទៅ ISP 📞',
        ),
        t('Start small and work outward.', 'ចាប់ផ្តើមពីតូច ហើយធ្វើការទៅខាងក្រៅ។'),
      ],
      words: [
        ['connect', 'តភ្ជាប់', '🔗'],
        ['offline', 'ក្រៅបណ្តាញ', '📴'],
        ['online', 'លើបណ្តាញ', '🟢'],
        ['reset', 'កំណត់ឡើងវិញ'],
      ],
      play: [
        mc(
          t(
            'Only YOUR laptop has no internet. Where is the problem likely?',
            'មានតែកុំព្យូទ័ររបស់អ្នកគ្មានអ៊ីនធឺណិត។ បញ្ហាប្រហែលនៅឯណា?',
          ),
          t('Your laptop', 'កុំព្យូទ័ររបស់អ្នក'),
          [t('The ISP', 'ISP'), t('The whole city', 'ទីក្រុងទាំងមូល')],
        ),
        mc(
          t(
            'EVERY device at home has no internet. Check…',
            'ឧបករណ៍គ្រប់គ្រឿងនៅផ្ទះគ្មានអ៊ីនធឺណិត។ ពិនិត្យ…',
          ),
          t('the router', 'router'),
          [t('your phone case', 'ស្រោមទូរស័ព្ទរបស់អ្នក'), t('the printer', 'ម៉ាស៊ីនបោះពុម្ព')],
        ),
        tf(
          t(
            'Airplane mode turns off Wi-Fi and mobile data.',
            'Airplane mode បិទ Wi-Fi និងទិន្នន័យទូរស័ព្ទ។',
          ),
          true,
        ),
        mc(
          t(
            'Your phone joined “Free_WiFi_Cafe” instead of home Wi-Fi. Fix?',
            'ទូរស័ព្ទរបស់អ្នកភ្ជាប់ «Free_WiFi_Cafe» ជំនួស Wi-Fi ផ្ទះ។ កែយ៉ាងម៉េច?',
          ),
          t('Choose your home network', 'ជ្រើសរើសបណ្តាញផ្ទះរបស់អ្នក'),
          [t('Buy a new phone', 'ទិញទូរស័ព្ទថ្មី'), t('Restart the ISP', 'ចាប់ផ្តើម ISP ឡើងវិញ')],
        ),
        tf(
          t(
            'Restarting the router can fix many internet problems.',
            'ការចាប់ផ្តើម router ឡើងវិញអាចដោះស្រាយបញ្ហាអ៊ីនធឺណិតជាច្រើន។',
          ),
          true,
        ),
        mc(
          t(
            'You restarted everything and still no internet for anyone. Next step?',
            'អ្នកបានចាប់ផ្តើមអ្វីៗឡើងវិញ ហើយនៅតែគ្មានអ៊ីនធឺណិតសម្រាប់នរណាម្នាក់។ ជំហានបន្ទាប់?',
          ),
          t('Contact the ISP', 'ទាក់ទង ISP'),
          [
            t('Delete all apps', 'លុបកម្មវិធីទាំងអស់'),
            t('Throw the router away', 'បោះ router ចោល'),
          ],
        ),
        mc(
          t(
            'Wi-Fi shows full bars but nothing loads. The problem is likely…',
            'Wi-Fi បង្ហាញសញ្ញាពេញ តែគ្មានអ្វីផ្ទុក។ បញ្ហាប្រហែលជា…',
          ),
          t('between the router and the internet', 'រវាង router និងអ៊ីនធឺណិត'),
          [t('your screen', 'អេក្រង់របស់អ្នក'), t('your keyboard', 'ក្តារចុចរបស់អ្នក')],
        ),
        tf(
          t(
            'Turning Wi-Fi off and on again is a good first step on a phone.',
            'ការបិទ ហើយបើក Wi-Fi ម្តងទៀតជាជំហានដំបូងល្អលើទូរស័ព្ទ។',
          ),
          true,
        ),
      ],
      challenge: [
        order(t('Order the troubleshooting steps.', 'តម្រៀបជំហានដោះស្រាយបញ្ហា។'), [
          t('Is it one device or all?', 'តើឧបករណ៍មួយ ឬទាំងអស់?'),
          t('Check Wi-Fi and airplane mode', 'ពិនិត្យ Wi-Fi និង airplane mode'),
          t('Restart the device', 'ចាប់ផ្តើមឧបករណ៍ឡើងវិញ'),
          t('Restart the router', 'ចាប់ផ្តើម router ឡើងវិញ'),
          t('Call the ISP', 'ទូរស័ព្ទទៅ ISP'),
        ]),
        mc(
          t(
            'ping 8.8.8.8 works, but ping google.com fails. What is broken?',
            'ping 8.8.8.8 ដំណើរការ តែ ping google.com បរាជ័យ។ តើអ្វីខូច?',
          ),
          'DNS',
          [t('The cable', 'ខ្សែ'), t('The screen', 'អេក្រង់')],
          cmd(
            'C:\\> ping 8.8.8.8\nReply: time=30ms\nC:\\> ping google.com\nPing could not find host google.com',
          ),
        ),
        mc(
          t('ipconfig shows 169.254.x.x. This means…', 'ipconfig បង្ហាញ 169.254.x.x។ នេះមានន័យថា…'),
          t('the device did not get an IP from the router', 'ឧបករណ៍មិនបានទទួល IP ពី router'),
          [
            t('the internet is perfect', 'អ៊ីនធឺណិតល្អឥតខ្ចោះ'),
            t('the printer is out of ink', 'ម៉ាស៊ីនបោះពុម្ពអស់ទឹកថ្នាំ'),
          ],
        ),
        match(t('Match the clue to the likely cause.', 'ផ្គូផ្គងតម្រុយជាមួយមូលហេតុប្រហែល។'), [
          [
            t('Only one phone offline', 'មានតែទូរស័ព្ទមួយក្រៅបណ្តាញ'),
            t('That phone', 'ទូរស័ព្ទនោះ'),
          ],
          [t('All devices offline', 'ឧបករណ៍ទាំងអស់ក្រៅបណ្តាញ'), t('Router or ISP', 'Router ឬ ISP')],
          [t('IP works, names do not', 'IP ដំណើរការ ឈ្មោះមិនដំណើរការ'), 'DNS'],
          [
            t('Slow far from router', 'យឺតឆ្ងាយពី router'),
            t('Weak Wi-Fi signal', 'សញ្ញា Wi-Fi ខ្សោយ'),
          ],
        ]),
        num(
          t(
            'You wait 30 seconds after unplugging the router and 2 minutes for it to start. How many seconds in total?',
            'អ្នករង់ចាំ 30 វិនាទីក្រោយដក router និង 2 នាទីឱ្យវាចាប់ផ្តើម។ សរុបប៉ុន្មានវិនាទី?',
          ),
          150,
        ),
        sortInto(
          t('Your fix or the ISP’s fix?', 'ការជួសជុលរបស់អ្នក ឬរបស់ ISP?'),
          [
            ['me', t('You can fix', 'អ្នកអាចជួសជុល'), '🙋'],
            ['isp', t('Call the ISP', 'ទូរស័ព្ទទៅ ISP'), '📞'],
          ],
          [
            [t('Airplane mode was on', 'Airplane mode បើក'), 'me'],
            [t('Wrong Wi-Fi network', 'បណ្តាញ Wi-Fi ខុស'), 'me'],
            [t('Router needed a restart', 'Router ត្រូវការចាប់ផ្តើមឡើងវិញ'), 'me'],
            [t('Cut fibre in the street', 'ខ្សែកាបអុបទិកដាច់លើផ្លូវ'), 'isp'],
            [t('Bill not paid', 'មិនបានបង់វិក្កយបត្រ'), 'isp'],
            [t('Area-wide outage', 'ដាច់ទូទាំងតំបន់'), 'isp'],
          ],
        ),
        typeIt(
          t(
            'Type the command that tests if a server answers.',
            'វាយពាក្យបញ្ជាដែលសាកល្បងថាម៉ាស៊ីនមេឆ្លើយតបទេ។',
          ),
          'ping',
        ),
        buildSentence(
          t('Build the rule.', 'បង្កើតច្បាប់។'),
          'Start with the simple checks first.',
          { say: 'Start with the simple checks first.' },
        ),
      ],
      games: [
        robot(
          t(
            'Fix the network: reach the router, collecting the loose cables on the way!',
            'ជួសជុលបណ្តាញ៖ ទៅដល់ router ប្រមូលខ្សែរលុងតាមផ្លូវ!',
          ),
          ['S.*.#', '##..#', '*...G'],
          { goalIcon: '📡', collectIcon: '🔌' },
        ),
        memory(t('Match the symptom to the first fix.', 'ផ្គូផ្គងរោគសញ្ញាជាមួយការជួសជុលដំបូង។'), [
          ['✈️', t('Turn off airplane mode', 'បិទ airplane mode')],
          ['📶❌', t('Turn Wi-Fi on', 'បើក Wi-Fi')],
          ['📡🔴', t('Restart the router', 'ចាប់ផ្តើម router ឡើងវិញ')],
          ['🏘️📴', t('Call the ISP', 'ទូរស័ព្ទទៅ ISP')],
        ]),
      ],
      reward: t(
        '🏆 Network hero! You can find and fix internet problems step by step.',
        '🏆 វីរបុរសបណ្តាញ! អ្នកអាចរក និងជួសជុលបញ្ហាអ៊ីនធឺណិតជំហានម្តងមួយ។',
      ),
    },
  ),
];
