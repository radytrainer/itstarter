import { t, type LessonSeed } from '../../types';
import {
  emailMock,
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
  searchMock,
  see,
  sod,
  sortInto,
  tf,
  urlMock,
} from '../dsl';

// 🌐 Internet Explorer, lessons 1–8 (internet-2.ts has 9–15). 15–18 questions per lesson; every
// Check shows the right answer. Khmer (km) strings are DRAFTS for native review.
export const INTERNET_WORLD = 'internet-explorer';
const W = INTERNET_WORLD;

export const INTERNET_LESSONS_1: LessonSeed[] = [
  lesson(
    W,
    'what-is-the-internet',
    '🌍',
    t('What is the Internet?', 'តើអ៊ីនធឺណិតជាអ្វី?'),
    t('A giant network that connects the world.', 'បណ្តាញដ៏ធំដែលភ្ជាប់ពិភពលោក។'),
    9,
    [
      intro(
        '🌍',
        t(
          'The Internet connects billions of devices. Let’s see how it works!',
          'អ៊ីនធឺណិតភ្ជាប់ឧបករណ៍រាប់ពាន់លាន។ តោះមើលពីរបៀបដែលវាដំណើរការ!',
        ),
      ),
      learn(
        [
          '🕸️',
          t('A network of networks', 'បណ្តាញនៃបណ្តាញ'),
          t(
            'Computers all over the world connected by cables, satellites and radio.',
            'កុំព្យូទ័រទូទាំងពិភពលោកភ្ជាប់គ្នាដោយខ្សែ ផ្កាយរណប និងវិទ្យុ។',
          ),
        ],
        [
          '🌐',
          t('The Web', 'វេប'),
          t(
            'Websites you open in a browser — one part of the Internet.',
            'គេហទំព័រដែលអ្នកបើកក្នុងកម្មវិធីរុករក — ផ្នែកមួយនៃអ៊ីនធឺណិត។',
          ),
        ],
        [
          '🏢',
          t('Servers', 'ម៉ាស៊ីនមេ'),
          t(
            'Big computers that store websites, videos and messages.',
            'កុំព្យូទ័រធំៗដែលរក្សាគេហទំព័រ វីដេអូ និងសារ។',
          ),
        ],
      ),
      see(
        '📱 → 📶 → 🌐 → 🏢 → 🌐 → 📱',
        t(
          'Your request travels to a server and the answer comes back — in less than a second.',
          'សំណើរបស់អ្នកធ្វើដំណើរទៅម៉ាស៊ីនមេ ហើយចម្លើយត្រឡប់មកវិញ — ក្នុងរយៈពេលតិចជាងមួយវិនាទី។',
        ),
      ),
      revealPlay(
        'multiple_choice',
        match(t('Match each word to its meaning.', 'ផ្គូផ្គងពាក្យនីមួយៗទៅនឹងអត្ថន័យរបស់វា។'), [
          [t('Internet', 'អ៊ីនធឺណិត'), t('Network connecting the world', 'បណ្តាញភ្ជាប់ពិភពលោក')],
          [
            t('Website', 'គេហទំព័រ'),
            t('Pages you visit in a browser', 'ទំព័រដែលអ្នកចូលមើលក្នុងកម្មវិធីរុករក'),
          ],
          [
            t('Server', 'ម៉ាស៊ីនមេ'),
            t('Computer that stores websites', 'កុំព្យូទ័រដែលរក្សាគេហទំព័រ'),
          ],
        ]),
        tf(
          t(
            'The Internet and the Web are exactly the same thing.',
            'អ៊ីនធឺណិត និងវេប គឺដូចគ្នាទាំងស្រុង។',
          ),
          false,
          {
            explanation: t(
              'The Web is one service on the Internet. Email and video calls use the Internet too.',
              'វេបគឺជាសេវាមួយនៅលើអ៊ីនធឺណិត។ អ៊ីមែល និងការហៅវីដេអូក៏ប្រើអ៊ីនធឺណិតដែរ។',
            ),
          },
        ),
        mc(
          t('Which needs the Internet?', 'តើមួយណាត្រូវការអ៊ីនធឺណិត?'),
          t('Watching YouTube', 'មើល YouTube'),
          [t('Using the calculator app', 'ប្រើកម្មវិធីគណនា'), t('Taking a photo', 'ថតរូប')],
        ),
        mc(
          t(
            'Undersea cables carry Internet data between…',
            'ខ្សែក្រោមសមុទ្រដឹកទិន្នន័យអ៊ីនធឺណិតរវាង…',
          ),
          t('Countries and continents', 'ប្រទេស និងទ្វីប'),
          [t('Rooms in a house', 'បន្ទប់ក្នុងផ្ទះ'), t('Pens and paper', 'ប៊ិច និងក្រដាស')],
        ),
        mc(
          t(
            'A company that sells you Internet access is an…',
            'ក្រុមហ៊ុនដែលលក់សេវាអ៊ីនធឺណិតឱ្យអ្នកគឺ…',
          ),
          'ISP (Internet Service Provider)',
          ['CPU', 'USB'],
        ),
        tf(
          t(
            'When you send a message, it travels in small pieces called packets.',
            'ពេលអ្នកផ្ញើសារ វាធ្វើដំណើរជាបំណែកតូចៗហៅថា packets។',
          ),
          true,
        ),
        mc(
          t(
            'Which is NOT something people do on the Internet?',
            'តើមួយណាមិនមែនជាអ្វីដែលមនុស្សធ្វើលើអ៊ីនធឺណិត?',
          ),
          t('Charge a phone battery', 'សាកថ្មទូរស័ព្ទ'),
          [
            t('Send email', 'ផ្ញើអ៊ីមែល'),
            t('Watch videos', 'មើលវីដេអូ'),
            t('Learn online', 'រៀនអនឡាញ'),
          ],
        ),
        mc(
          t('Who owns the whole Internet?', 'តើនរណាជាម្ចាស់អ៊ីនធឺណិតទាំងមូល?'),
          t(
            'Nobody alone — many companies and countries share it',
            'គ្មាននរណាម្នាក់តែឯង — ក្រុមហ៊ុន និងប្រទេសជាច្រើនចែករំលែកវា',
          ),
          [t('One company', 'ក្រុមហ៊ុនមួយ'), t('Your teacher', 'គ្រូរបស់អ្នក')],
        ),
      ),
      revealChallenge(
        'multiple_choice',
        order(t('Put the journey of opening a website in order.', 'តម្រៀបដំណើរនៃការបើកគេហទំព័រ។'), [
          t('You type the address', 'អ្នកវាយអាសយដ្ឋាន'),
          t('Your request goes over the Internet', 'សំណើរបស់អ្នកធ្វើដំណើរតាមអ៊ីនធឺណិត'),
          t('The server finds the page', 'ម៉ាស៊ីនមេរកទំព័រ'),
          t('The page appears on your screen', 'ទំព័រលេចឡើងលើអេក្រង់របស់អ្នក'),
        ]),
        sortInto(
          t('Needs the Internet or works offline?', 'ត្រូវការអ៊ីនធឺណិត ឬដំណើរការក្រៅបណ្តាញ?'),
          [
            ['online', t('Needs the Internet', 'ត្រូវការអ៊ីនធឺណិត'), '🌐'],
            ['offline', t('Works offline', 'ដំណើរការក្រៅបណ្តាញ'), '📴'],
          ],
          [
            [t('Video call', 'ការហៅវីដេអូ'), 'online'],
            [t('Calculator', 'ម៉ាស៊ីនគិតលេខ'), 'offline'],
            [t('Sending an email', 'ផ្ញើអ៊ីមែល'), 'online'],
            [t('Reading a downloaded PDF', 'អាន PDF ដែលទាញយករួច'), 'offline'],
          ],
        ),
        mc(t('Internet speed is measured in…', 'ល្បឿនអ៊ីនធឺណិតវាស់ជា…'), 'Mbps', [
          t('Kilograms', 'គីឡូក្រាម'),
          t('Degrees', 'អង្សា'),
        ]),
        tf(
          t(
            'Information on the Internet can be read by people all over the world.',
            'ព័ត៌មាននៅលើអ៊ីនធឺណិតអាចត្រូវបានអានដោយមនុស្សទូទាំងពិភពលោក។',
          ),
          true,
        ),
        mc(
          t('Which device can connect to the Internet?', 'តើឧបករណ៍ណាអាចភ្ជាប់អ៊ីនធឺណិត?'),
          t(
            'All of these: phone, laptop, smart TV',
            'ទាំងអស់នេះ៖ ទូរស័ព្ទ កុំព្យូទ័រយួរដៃ ទូរទស្សន៍ឆ្លាតវៃ',
          ),
          [t('Only laptops', 'តែកុំព្យូទ័រយួរដៃ'), t('Only phones', 'តែទូរស័ព្ទ')],
        ),
        mc(
          t('“Online” means…', '“អនឡាញ” មានន័យថា…'),
          t('Connected to the Internet', 'ភ្ជាប់ទៅអ៊ីនធឺណិត'),
          [t('Standing in a line', 'ឈរតម្រង់ជួរ'), t('Turned off', 'បិទ')],
        ),
        tf(
          t(
            'Once you post something online, it can be copied and shared by others.',
            'ពេលអ្នកបង្ហោះអ្វីមួយតាមអនឡាញ វាអាចត្រូវបានចម្លង និងចែករំលែកដោយអ្នកដទៃ។',
          ),
          true,
          {
            explanation: t('Think before you post!', 'គិតមុនពេលបង្ហោះ!'),
          },
        ),
        mc(
          t('A website’s pages are stored on…', 'ទំព័ររបស់គេហទំព័រត្រូវបានរក្សាទុកនៅលើ…'),
          t('A server', 'ម៉ាស៊ីនមេ'),
          [t('Your keyboard', 'ក្តារចុចរបស់អ្នក'), t('Your mouse', 'កណ្តុររបស់អ្នក')],
        ),
      ),
      reward(t('Welcome to the Internet! 🌍', 'សូមស្វាគមន៍មកកាន់អ៊ីនធឺណិត! 🌍')),
    ],
  ),

  lesson(
    W,
    'wifi-and-mobile-data',
    '📶',
    t('Wi-Fi & Mobile Data', 'Wi-Fi និងទិន្នន័យទូរស័ព្ទ'),
    t(
      'How your phone gets online — and saving data.',
      'របៀបដែលទូរស័ព្ទរបស់អ្នកភ្ជាប់អនឡាញ — និងការសន្សំទិន្នន័យ។',
    ),
    9,
    [
      intro(
        '📶',
        t(
          'Your phone gets online in two ways: Wi-Fi or mobile data. Let’s use both smartly.',
          'ទូរស័ព្ទរបស់អ្នកភ្ជាប់អនឡាញតាមពីរវិធី៖ Wi-Fi ឬទិន្នន័យទូរស័ព្ទ។ តោះប្រើទាំងពីរឱ្យឆ្លាត។',
        ),
      ),
      learn(
        [
          '📶',
          'Wi-Fi',
          t(
            'Internet from a router nearby (home, school, café). Usually no data cost.',
            'អ៊ីនធឺណិតពីរ៉ោតទ័រនៅក្បែរ (ផ្ទះ សាលា ហាងកាហ្វេ)។ ជាធម្មតាមិនអស់ទិន្នន័យ។',
          ),
        ],
        [
          '📡',
          t('Mobile data (4G/5G)', 'ទិន្នន័យទូរស័ព្ទ (4G/5G)'),
          t(
            'Internet from phone towers, paid with a data package.',
            'អ៊ីនធឺណិតពីបង្គោលទូរស័ព្ទ បង់ដោយកញ្ចប់ទិន្នន័យ។',
          ),
        ],
        [
          '🔒',
          t('Public Wi-Fi', 'Wi-Fi សាធារណៈ'),
          t(
            'Free café Wi-Fi is handy, but avoid banking on it.',
            'Wi-Fi ឥតគិតថ្លៃនៅហាងកាហ្វេងាយស្រួល ប៉ុន្តែជៀសវាងធ្វើប្រតិបត្តិការធនាគារ។',
          ),
        ],
      ),
      see(
        '🏠 📶 Wi-Fi · 🚌 📡 4G',
        t(
          'At home use Wi-Fi; on the bus use mobile data.',
          'នៅផ្ទះប្រើ Wi-Fi នៅលើឡានក្រុងប្រើទិន្នន័យទូរស័ព្ទ។',
        ),
      ),
      revealPlay(
        'multiple_choice',
        mc(
          t('Which uses up your data package?', 'តើមួយណាប្រើអស់កញ្ចប់ទិន្នន័យរបស់អ្នក?'),
          t('Watching videos on 4G', 'មើលវីដេអូលើ 4G'),
          [
            t('Watching videos on home Wi-Fi', 'មើលវីដេអូលើ Wi-Fi ផ្ទះ'),
            t('Using the calculator', 'ប្រើម៉ាស៊ីនគិតលេខ'),
          ],
        ),
        mc(
          t('The box that makes Wi-Fi at home is a…', 'ប្រអប់ដែលបង្កើត Wi-Fi នៅផ្ទះ គឺ…'),
          t('Router', 'រ៉ោតទ័រ'),
          [t('Printer', 'ម៉ាស៊ីនបោះពុម្ព'), t('Speaker', 'ឧបករណ៍បំពងសំឡេង')],
        ),
        mc(
          t('Which uses the most data?', 'តើមួយណាប្រើទិន្នន័យច្រើនជាងគេ?'),
          t('A 1-hour HD video', 'វីដេអូ HD 1 ម៉ោង'),
          [t('10 text messages', 'សារអត្ថបទ 10'), t('Checking the time', 'មើលម៉ោង')],
        ),
        tf(
          t(
            'More bars 📶 usually means a stronger signal.',
            'របារច្រើនជាង 📶 ជាធម្មតាមានន័យថាសញ្ញាខ្លាំងជាង។',
          ),
          true,
        ),
        mc(
          t('“Airplane mode” ✈️ turns off…', 'របៀប “Airplane” ✈️ បិទ…'),
          t('All wireless connections', 'ការតភ្ជាប់ឥតខ្សែទាំងអស់'),
          [t('The screen', 'អេក្រង់'), t('The camera', 'កាមេរ៉ា')],
        ),
        mc(
          t('A Wi-Fi network with a 🔒 needs…', 'បណ្តាញ Wi-Fi ដែលមាន 🔒 ត្រូវការ…'),
          t('A password', 'ពាក្យសម្ងាត់'),
          [t('A cable', 'ខ្សែ'), t('A printer', 'ម៉ាស៊ីនបោះពុម្ព')],
        ),
        num(
          t(
            'Your package is 10 GB. You used 7 GB. How many GB are left?',
            'កញ្ចប់របស់អ្នក 10 GB។ អ្នកប្រើអស់ 7 GB។ តើនៅសល់ប៉ុន្មាន GB?',
          ),
          3,
        ),
        tf(
          t(
            'Turning off auto-play for videos can save mobile data.',
            'ការបិទការលេងវីដេអូដោយស្វ័យប្រវត្តិ អាចសន្សំទិន្នន័យទូរស័ព្ទ។',
          ),
          true,
        ),
      ),
      revealChallenge(
        'multiple_choice',
        sortInto(
          t('Wi-Fi or mobile data is better?', 'Wi-Fi ឬទិន្នន័យទូរស័ព្ទល្អជាង?'),
          [
            ['wifi', 'Wi-Fi', '📶'],
            ['data', t('Mobile data', 'ទិន្នន័យទូរស័ព្ទ'), '📡'],
          ],
          [
            [
              t('Downloading a big app update at home', 'ទាញយកបច្ចុប្បន្នភាពកម្មវិធីធំនៅផ្ទះ'),
              'wifi',
            ],
            [t('Checking a map while riding a moto-taxi', 'មើលផែនទីពេលជិះម៉ូតូឌុប'), 'data'],
            [
              t(
                'Banking when the only Wi-Fi is a free café one',
                'ធ្វើប្រតិបត្តិការធនាគារពេលមានតែ Wi-Fi ឥតគិតថ្លៃនៅហាងកាហ្វេ',
              ),
              'data',
            ],
            [
              t(
                'Watching a long film at school (allowed Wi-Fi)',
                'មើលភាពយន្តវែងនៅសាលា (Wi-Fi អនុញ្ញាត)',
              ),
              'wifi',
            ],
          ],
        ),
        mc(
          t(
            'Why avoid banking on free public Wi-Fi?',
            'ហេតុអ្វីត្រូវជៀសវាងធ្វើប្រតិបត្តិការធនាគារលើ Wi-Fi សាធារណៈឥតគិតថ្លៃ?',
          ),
          t('Others on the network might spy on it', 'អ្នកដទៃលើបណ្តាញអាចលួចមើល'),
          [t('It costs more', 'វាថ្លៃជាង'), t('Banks are closed', 'ធនាគារបិទ')],
        ),
        mc(
          t(
            'A video doesn’t load. What should you check first?',
            'វីដេអូមិនដំណើរការ។ តើអ្នកគួរពិនិត្យអ្វីមុនគេ?',
          ),
          t('Is Wi-Fi or data turned on?', 'តើ Wi-Fi ឬទិន្នន័យបើកទេ?'),
          [t('Buy a new phone', 'ទិញទូរស័ព្ទថ្មី'), t('Clean the screen', 'សម្អាតអេក្រង់')],
        ),
        num(
          t(
            'A data package is 1 GB a day for 30 days. How many GB in total?',
            'កញ្ចប់ទិន្នន័យ 1 GB ក្នុងមួយថ្ងៃ រយៈពេល 30 ថ្ងៃ។ តើសរុបប៉ុន្មាន GB?',
          ),
          30,
        ),
        tf(
          t(
            'A hotspot lets your phone share its mobile data with a laptop.',
            'Hotspot អនុញ្ញាតឱ្យទូរស័ព្ទចែករំលែកទិន្នន័យទូរស័ព្ទជាមួយកុំព្យូទ័រយួរដៃ។',
          ),
          true,
        ),
        mc(
          t('Restarting the router can fix…', 'ការចាប់ផ្តើមរ៉ោតទ័រឡើងវិញអាចជួសជុល…'),
          t('Slow or lost Wi-Fi', 'Wi-Fi យឺត ឬដាច់'),
          [t('A cracked screen', 'អេក្រង់ប្រេះ'), t('A flat battery', 'ថ្មអស់')],
        ),
        mc(t('Which is the fastest mobile network?', 'តើបណ្តាញទូរស័ព្ទណាលឿនជាងគេ?'), '5G', [
          '3G',
          '2G',
        ]),
        tf(
          t(
            'You should share your home Wi-Fi password with any stranger who asks.',
            'អ្នកគួរចែករំលែកពាក្យសម្ងាត់ Wi-Fi ផ្ទះជាមួយមនុស្សចម្លែកណាដែលសួរ។',
          ),
          false,
        ),
      ),
      reward(t('Connected and data-smart! 📶', 'ភ្ជាប់ ហើយឆ្លាតផ្នែកទិន្នន័យ! 📶')),
    ],
  ),

  lesson(
    W,
    'browsers-and-urls',
    '🔗',
    t('Browsers & Web Addresses', 'កម្មវិធីរុករក និងអាសយដ្ឋានវេប'),
    t('Open websites and read their addresses.', 'បើកគេហទំព័រ និងអានអាសយដ្ឋានរបស់វា។'),
    9,
    [
      intro(
        '🔗',
        t(
          'A browser opens websites. Every website has an address, called a URL.',
          'កម្មវិធីរុករកបើកគេហទំព័រ។ គេហទំព័រនីមួយៗមានអាសយដ្ឋាន ហៅថា URL។',
        ),
      ),
      learn(
        ['🧭', t('Browser', 'កម្មវិធីរុករក'), 'Chrome, Firefox, Safari, Edge.'],
        [
          '🔗',
          'URL',
          t(
            'The address of a page, like https://www.moeys.gov.kh',
            'អាសយដ្ឋានទំព័រ ដូចជា https://www.moeys.gov.kh',
          ),
        ],
        [
          '🔒',
          'https',
          t(
            'The lock means the connection is private (encrypted).',
            'សោមានន័យថាការតភ្ជាប់ជាឯកជន (បានអ៊ិនគ្រីប)។',
          ),
        ],
      ),
      see(
        'https://www.moeys.gov.kh/en/news',
        t(
          'https = secure · moeys.gov.kh = the website · /en/news = the page.',
          'https = សុវត្ថិភាព · moeys.gov.kh = គេហទំព័រ · /en/news = ទំព័រ។',
        ),
      ),
      revealPlay(
        'multiple_choice',
        mc(
          t('What is the domain name in this address?', 'តើឈ្មោះដែនក្នុងអាសយដ្ឋាននេះគឺអ្វី?'),
          'wikipedia.org',
          ['https', '/wiki/Cambodia', 'en'],
          {
            data: urlMock('https://en.wikipedia.org/wiki/Cambodia'),
            explanation: t(
              'The domain is the website’s name: wikipedia.org.',
              'ដែនគឺជាឈ្មោះគេហទំព័រ៖ wikipedia.org។',
            ),
          },
        ),
        tf(
          t(
            'The lock 🔒 next to the address means the connection is private.',
            'សោ 🔒 នៅក្បែរអាសយដ្ឋានមានន័យថាការតភ្ជាប់ជាឯកជន។',
          ),
          true,
        ),
        mc(t('Which is a web browser?', 'តើមួយណាជាកម្មវិធីរុករក?'), 'Chrome', [
          'Excel',
          'Telegram',
          'Windows',
        ]),
        mc(
          t('The ← button in a browser…', 'ប៊ូតុង ← ក្នុងកម្មវិធីរុករក…'),
          t('Goes back to the previous page', 'ត្រឡប់ទៅទំព័រមុន'),
          [t('Closes the browser', 'បិទកម្មវិធីរុករក'), t('Prints the page', 'បោះពុម្ពទំព័រ')],
        ),
        mc(t('The ⟳ button…', 'ប៊ូតុង ⟳…'), t('Reloads the page', 'ផ្ទុកទំព័រឡើងវិញ'), [
          t('Deletes the page', 'លុបទំព័រ'),
          t('Goes home', 'ទៅទំព័រដើម'),
        ]),
        mc(
          t('Opening several pages at once uses…', 'ការបើកទំព័រច្រើនក្នុងពេលតែមួយប្រើ…'),
          t('Tabs', 'ផ្ទាំង (Tabs)'),
          [t('Folders', 'ថត'), t('Printers', 'ម៉ាស៊ីនបោះពុម្ព')],
        ),
        mc(
          t(
            '“.gov.kh” at the end of an address usually means…',
            '“.gov.kh” នៅចុងអាសយដ្ឋាន ជាធម្មតាមានន័យថា…',
          ),
          t('A Cambodian government website', 'គេហទំព័ររដ្ឋាភិបាលកម្ពុជា'),
          [t('A shop', 'ហាង'), t('A game', 'ល្បែង')],
        ),
        mc(
          t('Saving a page to visit later is called a…', 'ការរក្សាទំព័រដើម្បីចូលមើលពេលក្រោយ ហៅថា…'),
          t('Bookmark ⭐', 'ចំណាំ ⭐'),
          [t('Download', 'ទាញយក'), t('Cookie', 'ខូគី')],
        ),
      ),
      revealChallenge(
        'multiple_choice',
        mc(
          t(
            'Which address is most likely the REAL Facebook?',
            'តើអាសយដ្ឋានណាទំនងជា Facebook ពិតជាងគេ?',
          ),
          'https://www.facebook.com',
          ['http://faceb00k-login.xyz', 'https://facebook.com.free-likes.net'],
          {
            explanation: t(
              'The real domain is facebook.com, spelled correctly, right before the first /.',
              'ដែនពិតគឺ facebook.com ដែលប្រកបត្រឹមត្រូវ នៅមុន / ដំបូង។',
            ),
          },
        ),
        mc(
          t(
            'In “https://shop.example.com/cart”, the page is…',
            'ក្នុង “https://shop.example.com/cart” ទំព័រគឺ…',
          ),
          '/cart',
          ['https', 'shop', '.com'],
        ),
        tf(
          t(
            '“faceb00k.com” (with zeros) is the same as “facebook.com”.',
            '“faceb00k.com” (មានលេខសូន្យ) ដូចគ្នានឹង “facebook.com”។',
          ),
          false,
          {
            explanation: t(
              'Scammers swap letters for numbers to trick you.',
              'អ្នកបោកប្រាស់ប្តូរអក្សរជាលេខដើម្បីបោកអ្នក។',
            ),
          },
        ),
        match(
          t('Match the domain ending to its usual meaning.', 'ផ្គូផ្គងចុងដែនទៅនឹងអត្ថន័យធម្មតា។'),
          [
            ['.gov.kh', t('Cambodian government', 'រដ្ឋាភិបាលកម្ពុជា')],
            ['.edu', t('School or university', 'សាលា ឬសាកលវិទ្យាល័យ')],
            ['.com', t('Company or general site', 'ក្រុមហ៊ុន ឬគេហទំព័រទូទៅ')],
          ],
        ),
        mc(
          t('A private/incognito window…', 'បង្អួចឯកជន/incognito…'),
          t('Doesn’t save your history on that device', 'មិនរក្សាប្រវត្តិរបស់អ្នកលើឧបករណ៍នោះ'),
          [
            t(
              'Makes you invisible to everyone online',
              'ធ្វើឱ្យអ្នកមើលមិនឃើញចំពោះអ្នកទាំងអស់តាមអនឡាញ',
            ),
            t('Makes the Internet faster', 'ធ្វើឱ្យអ៊ីនធឺណិតលឿនជាង'),
          ],
        ),
        mc(
          t('Ctrl + T in a browser…', 'Ctrl + T ក្នុងកម្មវិធីរុករក…'),
          t('Opens a new tab', 'បើកផ្ទាំងថ្មី'),
          [t('Types bold text', 'វាយអក្សរដិត'), t('Closes the computer', 'បិទកុំព្យូទ័រ')],
        ),
        tf(
          t(
            'On a shared computer, log out of your accounts when you finish.',
            'នៅលើកុំព្យូទ័ររួម ចាកចេញពីគណនីរបស់អ្នកពេលអ្នកបញ្ចប់។',
          ),
          true,
        ),
        mc(
          t('Browser history shows…', 'ប្រវត្តិកម្មវិធីរុករកបង្ហាញ…'),
          t('Pages you visited before', 'ទំព័រដែលអ្នកបានចូលមើលពីមុន'),
          [
            t('Your passwords in plain text', 'ពាក្យសម្ងាត់របស់អ្នកជាអត្ថបទធម្មតា'),
            t('Your battery level', 'កម្រិតថ្មរបស់អ្នក'),
          ],
        ),
      ),
      reward(t('You can read any URL! 🔗', 'អ្នកអាចអាន URL ណាមួយបាន! 🔗')),
    ],
  ),

  lesson(
    W,
    'searching-smart',
    '🔍',
    t('Search Smart', 'ស្វែងរកឱ្យឆ្លាត'),
    t('Find what you need, fast.', 'រកអ្វីដែលអ្នកត្រូវការ យ៉ាងលឿន។'),
    9,
    [
      intro(
        '🔍',
        t(
          'Search engines like Google find answers in seconds — if you ask well.',
          'ម៉ាស៊ីនស្វែងរកដូចជា Google រកចម្លើយក្នុងប៉ុន្មានវិនាទី — បើអ្នកសួរល្អ។',
        ),
      ),
      learn(
        [
          '🔑',
          t('Keywords', 'ពាក្យគន្លឹះ'),
          t(
            'Use a few important words: “Cambodia population 2028”.',
            'ប្រើពាក្យសំខាន់ៗពីរបី៖ “Cambodia population 2028”។',
          ),
        ],
        [
          '“ ”',
          t('Quotes', 'សញ្ញាសម្រង់'),
          t('“Angkor Wat” finds that exact phrase.', '“Angkor Wat” រកឃ្លានោះពិតប្រាកដ។'),
        ],
        [
          '🏷️',
          t('Ads', 'ការផ្សាយពាណិជ្ជកម្ម'),
          t(
            'Results marked “Sponsored” are paid adverts.',
            'លទ្ធផលដែលមានស្លាក “Sponsored” គឺជាការផ្សាយពាណិជ្ជកម្មដែលបានបង់ប្រាក់។',
          ),
        ],
      ),
      see(
        '“How many people live in Cambodia?” → Cambodia population',
        t(
          'Short keywords work better than long sentences.',
          'ពាក្យគន្លឹះខ្លីដំណើរការល្អជាងប្រយោគវែង។',
        ),
      ),
      revealPlay(
        'search_sim',
        mc(
          t(
            'Which search is best to find the population of Cambodia?',
            'តើការស្វែងរកណាល្អបំផុតដើម្បីរកចំនួនប្រជាជនកម្ពុជា?',
          ),
          'Cambodia population',
          ['hello', 'how are you', 'country'],
          { data: searchMock('') },
        ),
        mc(
          t('Which words are the keywords here?', 'តើពាក្យណាជាពាក្យគន្លឹះនៅទីនេះ?'),
          'Cambodia, population',
          ['the, of', 'what, is'],
          { data: searchMock('what is the population of Cambodia') },
        ),
        mc(
          t('To search for an exact phrase, use…', 'ដើម្បីស្វែងរកឃ្លាពិតប្រាកដ ប្រើ…'),
          t('Quotes “ ”', 'សញ្ញាសម្រង់ “ ”'),
          [t('CAPITAL LETTERS', 'អក្សរធំ'), t('Many !!!', '!!! ច្រើន')],
        ),
        tf(
          t(
            'The first search result is always the best and true.',
            'លទ្ធផលស្វែងរកទីមួយតែងតែល្អបំផុត និងពិត។',
          ),
          false,
          {
            explanation: t(
              'It may be an ad. Check a few results.',
              'វាអាចជាការផ្សាយពាណិជ្ជកម្ម។ ពិនិត្យលទ្ធផលពីរបី។',
            ),
          },
        ),
        mc(
          t('A result labelled “Sponsored” is…', 'លទ្ធផលដែលមានស្លាក “Sponsored” គឺ…'),
          t('An advert someone paid for', 'ការផ្សាយពាណិជ្ជកម្មដែលនរណាម្នាក់បានបង់ប្រាក់'),
          [t('The government’s answer', 'ចម្លើយរបស់រដ្ឋាភិបាល'), t('A virus', 'មេរោគ')],
        ),
        mc(
          t('To find pictures of Angkor Wat, click the…', 'ដើម្បីរករូបភាពអង្គរវត្ត ចុច…'),
          t('Images tab', 'ផ្ទាំង Images'),
          [t('Maps tab', 'ផ្ទាំង Maps'), t('Shopping tab', 'ផ្ទាំង Shopping')],
        ),
        mc(
          t(
            'Best search to learn how to make num banh chok?',
            'ការស្វែងរកល្អបំផុតដើម្បីរៀនធ្វើនំបញ្ចុក?',
          ),
          'num banh chok recipe',
          ['food', 'cook', 'yum'],
        ),
        tf(t('You can search in Khmer too.', 'អ្នកអាចស្វែងរកជាភាសាខ្មែរបានដែរ។'), true),
      ),
      revealChallenge(
        'search_sim',
        mc(
          t(
            'Best search for tomorrow’s weather in Phnom Penh?',
            'ការស្វែងរកល្អបំផុតសម្រាប់អាកាសធាតុថ្ងៃស្អែកនៅភ្នំពេញ?',
          ),
          'Phnom Penh weather tomorrow',
          ['weather', 'is it hot', 'Phnom'],
          { data: searchMock('') },
        ),
        mc(
          t(
            'Which result is probably the most reliable for a school report on Angkor Wat?',
            'តើលទ្ធផលណាទំនងជាគួរឱ្យទុកចិត្តជាងគេសម្រាប់របាយការណ៍សាលាអំពីអង្គរវត្ត?',
          ),
          t('An encyclopedia or official site', 'សព្វវចនាធិប្បាយ ឬគេហទំព័រផ្លូវការ'),
          [
            t('A random comment', 'មតិចៃដន្យ'),
            t('A shop selling souvenirs', 'ហាងលក់វត្ថុអនុស្សាវរីយ៍'),
          ],
        ),
        mc(
          t('Too many results? Make your search…', 'លទ្ធផលច្រើនពេក? ធ្វើឱ្យការស្វែងរករបស់អ្នក…'),
          t('More specific (add a keyword)', 'ជាក់លាក់ជាង (បន្ថែមពាក្យគន្លឹះ)'),
          [t('Shorter: one letter', 'ខ្លីជាង៖ មួយអក្សរ'), t('All in capitals', 'ជាអក្សរធំទាំងអស់')],
        ),
        mc(
          t('No good results? Try…', 'គ្មានលទ្ធផលល្អ? សាក…'),
          t('Different words with the same meaning', 'ពាក្យផ្សេងដែលមានអត្ថន័យដូចគ្នា'),
          [t('Giving up', 'បោះបង់'), t('Typing faster', 'វាយលឿនជាង')],
        ),
        tf(
          t(
            'Copying a whole article for homework without saying where it came from is OK.',
            'ការចម្លងអត្ថបទទាំងមូលសម្រាប់កិច្ចការផ្ទះដោយមិនប្រាប់ពីប្រភព គឺមិនអីទេ។',
          ),
          false,
          {
            explanation: t(
              'Use your own words and name your sources.',
              'ប្រើពាក្យផ្ទាល់ខ្លួន ហើយប្រាប់ពីប្រភព។',
            ),
          },
        ),
        mc(
          t(
            'Searching “site:gov.kh exam results” finds…',
            'ការស្វែងរក “site:gov.kh exam results” រកឃើញ…',
          ),
          t('Results only from .gov.kh sites', 'លទ្ធផលតែពីគេហទំព័រ .gov.kh'),
          [t('Only pictures', 'តែរូបភាព'), t('Nothing', 'គ្មានអ្វីទេ')],
        ),
        mc(
          t(
            'Which search engine is the most used in the world?',
            'តើម៉ាស៊ីនស្វែងរកណាត្រូវបានប្រើច្រើនជាងគេលើពិភពលោក?',
          ),
          'Google',
          ['Excel', 'Telegram'],
        ),
        tf(
          t(
            'Checking two or three sources helps you know if information is true.',
            'ការពិនិត្យប្រភពពីរ ឬបី ជួយអ្នកដឹងថាព័ត៌មានពិតឬអត់។',
          ),
          true,
        ),
      ),
      reward(t('Search master! 🔍', 'មេនៃការស្វែងរក! 🔍')),
    ],
  ),

  lesson(
    W,
    'is-it-true',
    '🧐',
    t('Is It True? Fake News', 'តើវាពិតទេ? ព័ត៌មានក្លែងក្លាយ'),
    t('Check before you believe or share.', 'ពិនិត្យមុនពេលជឿ ឬចែករំលែក។'),
    9,
    [
      intro(
        '🧐',
        t(
          'Not everything online is true. Some posts are mistakes, some are jokes, some are lies to trick you.',
          'មិនមែនអ្វីៗទាំងអស់តាមអនឡាញពិតទេ។ ការបង្ហោះខ្លះជាកំហុស ខ្លះជាការលេងសើច ខ្លះជាការកុហកដើម្បីបោកអ្នក។',
        ),
      ),
      learn(
        [
          '🕵️',
          t('Who said it?', 'នរណានិយាយ?'),
          t('A known news site or an unknown page?', 'គេហទំព័រព័ត៌មានដែលគេស្គាល់ ឬទំព័រមិនស្គាល់?'),
        ],
        [
          '📅',
          t('When?', 'ពេលណា?'),
          t('Old news shared again can mislead.', 'ព័ត៌មានចាស់ដែលចែករំលែកម្តងទៀតអាចបំភាន់។'),
        ],
        [
          '🔁',
          t('Who else says it?', 'តើនរណាទៀតនិយាយ?'),
          t(
            'Check other trusted sources before sharing.',
            'ពិនិត្យប្រភពដែលគួរឱ្យទុកចិត្តផ្សេងទៀតមុនពេលចែករំលែក។',
          ),
        ],
      ),
      see(
        t(
          '“SHARE NOW!!! Drinking hot water cures every illness!!!”',
          '“ចែករំលែកឥឡូវ!!! ការផឹកទឹកក្តៅព្យាបាលគ្រប់ជំងឺ!!!”',
        ),
        t(
          'Shouting, “share now” and miracle claims are warning signs.',
          'ការស្រែក “ចែករំលែកឥឡូវ” និងការអះអាងអព្ភូតហេតុ គឺជាសញ្ញាព្រមាន។',
        ),
      ),
      revealPlay(
        'safe_or_dangerous',
        sod(
          t(
            'A post says “Banks will close forever tomorrow! Share now!” with no source. Trust it?',
            'ការបង្ហោះមួយថា “ធនាគារនឹងបិទជារៀងរហូតនៅថ្ងៃស្អែក! ចែករំលែកឥឡូវ!” គ្មានប្រភព។ ទុកចិត្តទេ?',
          ),
          'dangerous',
          {
            explanation: t(
              'No source, panic and “share now” — likely fake.',
              'គ្មានប្រភព ភ័យស្លន់ស្លោ និង “ចែករំលែកឥឡូវ” — ទំនងជាក្លែងក្លាយ។',
            ),
          },
        ),
        sod(
          t(
            'The Ministry of Education’s official page announces exam dates. Trust it?',
            'ទំព័រផ្លូវការរបស់ក្រសួងអប់រំប្រកាសកាលបរិច្ឆេទប្រឡង។ ទុកចិត្តទេ?',
          ),
          'safe',
          {
            explanation: t(
              'An official source is the right place for exam dates.',
              'ប្រភពផ្លូវការគឺជាកន្លែងត្រឹមត្រូវសម្រាប់កាលបរិច្ឆេទប្រឡង។',
            ),
          },
        ),
        sod(
          t(
            'A video shows a “shark in the Mekong” but it looks edited. Share it as real?',
            'វីដេអូបង្ហាញ “ត្រីឆ្លាមនៅទន្លេមេគង្គ” ប៉ុន្តែមើលទៅដូចបានកែ។ ចែករំលែកថាជាការពិតទេ?',
          ),
          'dangerous',
          {
            explanation: t(
              'Pictures and videos can be edited or made by AI.',
              'រូបភាព និងវីដេអូអាចត្រូវបានកែ ឬបង្កើតដោយ AI។',
            ),
          },
        ),
        mc(
          t('Which is a warning sign of fake news?', 'តើមួយណាជាសញ្ញាព្រមាននៃព័ត៌មានក្លែងក្លាយ?'),
          t(
            '“You won’t believe this!!! Share before it’s deleted!”',
            '“អ្នកនឹងមិនជឿទេ!!! ចែករំលែកមុនវាត្រូវលុប!”',
          ),
          [
            t('A clear date and named reporter', 'កាលបរិច្ឆេទច្បាស់ និងឈ្មោះអ្នកយកព័ត៌មាន'),
            t('Links to official sources', 'តំណទៅប្រភពផ្លូវការ'),
          ],
        ),
        tf(
          t(
            'If many people shared it, it must be true.',
            'បើមនុស្សជាច្រើនបានចែករំលែក វាត្រូវតែពិត។',
          ),
          false,
          {
            explanation: t(
              'Lies can spread fast. Popular is not the same as true.',
              'ការកុហកអាចរីករាលដាលលឿន។ ការពេញនិយមមិនមែនដូចការពិតទេ។',
            ),
          },
        ),
        mc(
          t(
            'A friend shares a shocking health tip. What do you do first?',
            'មិត្តម្នាក់ចែករំលែកគន្លឹះសុខភាពគួរឱ្យភ្ញាក់ផ្អើល។ តើអ្នកធ្វើអ្វីមុនគេ?',
          ),
          t('Check a trusted health source', 'ពិនិត្យប្រភពសុខភាពដែលគួរឱ្យទុកចិត្ត'),
          [
            t('Share it with everyone', 'ចែករំលែកជាមួយអ្នករាល់គ្នា'),
            t('Try it right away', 'សាកវាភ្លាមៗ'),
          ],
        ),
        mc(
          t('A headline that tricks you into clicking is called…', 'ចំណងជើងដែលបោកឱ្យអ្នកចុច ហៅថា…'),
          'Clickbait',
          [t('A bookmark', 'ចំណាំ'), t('A browser', 'កម្មវិធីរុករក')],
        ),
        tf(
          t(
            'AI can make fake photos that look real.',
            'AI អាចបង្កើតរូបថតក្លែងក្លាយដែលមើលទៅដូចពិត។',
          ),
          true,
        ),
      ),
      revealChallenge(
        'multiple_choice',
        sortInto(
          t('Trust it, or check first?', 'ទុកចិត្ត ឬពិនិត្យមុន?'),
          [
            ['trust', t('Trusted source', 'ប្រភពគួរឱ្យទុកចិត្ត'), '✅'],
            ['check', t('Check first', 'ពិនិត្យមុន'), '🔍'],
          ],
          [
            [t('Official ministry website', 'គេហទំព័រក្រសួងផ្លូវការ'), 'trust'],
            [t('Anonymous chain message', 'សារខ្សែសង្វាក់មិនបញ្ចេញឈ្មោះ'), 'check'],
            [t('A well-known news site', 'គេហទំព័រព័ត៌មានល្បី'), 'trust'],
            [t('A meme with no source', 'រូបកំប្លែងគ្មានប្រភព'), 'check'],
          ],
        ),
        mc(
          t(
            'An old flood photo from 2011 is shared as “today”. This is…',
            'រូបថតទឹកជំនន់ចាស់ពីឆ្នាំ 2011 ត្រូវបានចែករំលែកថា “ថ្ងៃនេះ”។ នេះគឺ…',
          ),
          t('Misleading', 'ការបំភាន់'),
          [t('True news', 'ព័ត៌មានពិត'), t('An advert', 'ការផ្សាយពាណិជ្ជកម្ម')],
        ),
        mc(
          t('A reverse image search helps you…', 'ការស្វែងរករូបភាពបញ្ច្រាសជួយអ្នក…'),
          t('Find where a photo first appeared', 'រកកន្លែងដែលរូបថតលេចឡើងដំបូង'),
          [t('Make the photo bigger', 'ធ្វើឱ្យរូបថតធំជាង'), t('Delete the photo', 'លុបរូបថត')],
        ),
        tf(
          t(
            'Before sharing, it’s good to ask: “Is it true? Is it helpful? Is it kind?”',
            'មុនពេលចែករំលែក គួរសួរ៖ “តើវាពិតទេ? មានប្រយោជន៍ទេ? ចិត្តល្អទេ?”',
          ),
          true,
        ),
        mc(
          t(
            'A website looks like a news site but the address is “cnn-news-24.xyz”. Be…',
            'គេហទំព័រមើលទៅដូចគេហទំព័រព័ត៌មាន ប៉ុន្តែអាសយដ្ឋានគឺ “cnn-news-24.xyz”។ ត្រូវ…',
          ),
          t('Careful — it may be fake', 'ប្រុងប្រយ័ត្ន — វាអាចជាក្លែងក្លាយ'),
          [t('Sure it’s real', 'ប្រាកដថាវាពិត')],
          { data: urlMock('https://cnn-news-24.xyz/breaking') },
        ),
        mc(
          t(
            'You shared something that turned out to be false. Best action?',
            'អ្នកបានចែករំលែកអ្វីមួយដែលបានក្លាយជាមិនពិត។ សកម្មភាពល្អបំផុត?',
          ),
          t('Delete it and tell friends it was wrong', 'លុបវា ហើយប្រាប់មិត្តថាវាខុស'),
          [t('Leave it', 'ទុកវាដដែល'), t('Share it again', 'ចែករំលែកម្តងទៀត')],
        ),
        tf(t('Opinions and facts are the same thing.', 'មតិ និងការពិត គឺដូចគ្នា។'), false, {
          explanation: t(
            '“Rice is grown in Cambodia” is a fact; “rice is the best food” is an opinion.',
            '“ស្រូវដាំនៅកម្ពុជា” គឺជាការពិត “បាយជាអាហារល្អបំផុត” គឺជាមតិ។',
          ),
        }),
        mc(
          t('Which is a fact?', 'តើមួយណាជាការពិត?'),
          t('Phnom Penh is the capital of Cambodia.', 'ភ្នំពេញគឺជារាជធានីនៃកម្ពុជា។'),
          [
            t('Phnom Penh is the most beautiful city.', 'ភ្នំពេញគឺជាទីក្រុងស្អាតបំផុត។'),
            t('Football is boring.', 'បាល់ទាត់គួរឱ្យធុញ។'),
          ],
        ),
      ),
      reward(t('Fact-checker! 🧐', 'អ្នកពិនិត្យការពិត! 🧐')),
    ],
  ),

  lesson(
    W,
    'email-basics',
    '📧',
    t('Email Basics', 'មូលដ្ឋានអ៊ីមែល'),
    t('Read, write and send emails.', 'អាន សរសេរ និងផ្ញើអ៊ីមែល។'),
    9,
    [
      intro(
        '📧',
        t(
          'Email is how schools and jobs talk to you. Let’s learn the parts of an email.',
          'អ៊ីមែលគឺជារបៀបដែលសាលា និងការងារទាក់ទងអ្នក។ តោះរៀនពីផ្នែកនៃអ៊ីមែល។',
        ),
      ),
      learn(
        [
          '👤',
          t('To', 'ទៅ'),
          t('The address of the person you write to.', 'អាសយដ្ឋានរបស់មនុស្សដែលអ្នកសរសេរទៅ។'),
        ],
        [
          '🏷️',
          t('Subject', 'ប្រធានបទ'),
          t('A short title: “Homework week 3”.', 'ចំណងជើងខ្លី៖ “Homework week 3”។'),
        ],
        [
          '📎',
          t('Attachment', 'ឯកសារភ្ជាប់'),
          t('A file you send with the email.', 'ឯកសារដែលអ្នកផ្ញើជាមួយអ៊ីមែល។'),
        ],
      ),
      see(
        'sokha@gmail.com',
        t(
          'name @ email service: every email address has an @.',
          'ឈ្មោះ @ សេវាអ៊ីមែល៖ អាសយដ្ឋានអ៊ីមែលគ្រប់មួយមាន @។',
        ),
      ),
      revealPlay(
        'email_sim',
        mc(
          t('Which is a correct email address?', 'តើមួយណាជាអាសយដ្ឋានអ៊ីមែលត្រឹមត្រូវ?'),
          'dara.chan@gmail.com',
          ['dara.chan.gmail.com', 'dara chan@gmail', '@dara'],
        ),
        mc(
          t('Who sent this email?', 'តើនរណាផ្ញើអ៊ីមែលនេះ?'),
          'teacher@school.edu.kh',
          ['Homework week 3', t('page 12', 'ទំព័រ 12')],
          {
            data: emailMock(
              'teacher@school.edu.kh',
              'Homework week 3',
              'Hello class, this week’s homework is on page 12.',
            ),
          },
        ),
        mc(
          t('What is the subject of this email?', 'តើប្រធានបទនៃអ៊ីមែលនេះគឺអ្វី?'),
          'Homework week 3',
          ['teacher@school.edu.kh', 'Hello class'],
          {
            data: emailMock(
              'teacher@school.edu.kh',
              'Homework week 3',
              'Hello class, this week’s homework is on page 12.',
            ),
          },
        ),
        mc(
          t('A file sent with an email is an…', 'ឯកសារដែលផ្ញើជាមួយអ៊ីមែល គឺជា…'),
          t('Attachment 📎', 'ឯកសារភ្ជាប់ 📎'),
          [t('Inbox', 'ប្រអប់ទទួល'), t('Subject', 'ប្រធានបទ')],
        ),
        mc(t('Where do new emails arrive?', 'តើអ៊ីមែលថ្មីមកដល់នៅឯណា?'), t('Inbox', 'ប្រអប់ទទួល'), [
          t('Trash', 'ធុងសំរាម'),
          t('Sent', 'បានផ្ញើ'),
        ]),
        mc(
          t('“Reply” sends your answer to…', '“ឆ្លើយតប” ផ្ញើចម្លើយរបស់អ្នកទៅ…'),
          t('The person who wrote to you', 'មនុស្សដែលសរសេរមកអ្នក'),
          [t('Everyone in the world', 'អ្នករាល់គ្នាលើពិភពលោក'), t('Nobody', 'គ្មាននរណាម្នាក់')],
        ),
        mc(
          t('“Forward” means…', '“បញ្ជូនបន្ត” មានន័យថា…'),
          t('Sending the email on to someone else', 'ផ្ញើអ៊ីមែលបន្តទៅអ្នកផ្សេង'),
          [t('Deleting it', 'លុបវា'), t('Printing it', 'បោះពុម្ពវា')],
        ),
        tf(
          t(
            'Emails you send are kept in the “Sent” folder.',
            'អ៊ីមែលដែលអ្នកផ្ញើត្រូវបានរក្សាក្នុងថត “បានផ្ញើ”។',
          ),
          true,
        ),
      ),
      revealChallenge(
        'email_sim',
        mc(t('“Spam” is…', '“Spam” គឺ…'), t('Unwanted junk email', 'អ៊ីមែលឥតបានការដែលមិនចង់បាន'), [
          t('A kind of food only', 'តែប្រភេទអាហារ'),
          t('Important school email', 'អ៊ីមែលសាលាសំខាន់'),
        ]),
        mc(
          t('“CC” sends a copy to…', '“CC” ផ្ញើច្បាប់ចម្លងទៅ…'),
          t('Someone who should also know', 'នរណាម្នាក់ដែលគួរដឹងដែរ'),
          [t('The trash', 'ធុងសំរាម'), t('Only yourself', 'តែខ្លួនឯង')],
        ),
        mc(
          t('“Reply all” sends your answer to…', '“ឆ្លើយតបទាំងអស់” ផ្ញើចម្លើយរបស់អ្នកទៅ…'),
          t('Everyone on the email', 'អ្នករាល់គ្នាលើអ៊ីមែល'),
          [t('Only the sender', 'តែអ្នកផ្ញើ'), t('Your contacts', 'ទំនាក់ទំនងរបស់អ្នក')],
          {
            explanation: t(
              'Use it carefully — not everyone needs your answer.',
              'ប្រើវាដោយប្រុងប្រយ័ត្ន — មិនមែនអ្នករាល់គ្នាត្រូវការចម្លើយរបស់អ្នកទេ។',
            ),
          },
        ),
        tf(t('Gmail and Outlook are email services.', 'Gmail និង Outlook គឺជាសេវាអ៊ីមែល។'), true),
        order(
          t(
            'Send an email with homework: put the steps in order.',
            'ផ្ញើអ៊ីមែលជាមួយកិច្ចការផ្ទះ៖ តម្រៀបជំហាន។',
          ),
          [
            t('Click Compose', 'ចុច សរសេរ'),
            t('Type the teacher’s address', 'វាយអាសយដ្ឋានគ្រូ'),
            t('Write a subject and message', 'សរសេរប្រធានបទ និងសារ'),
            t('Attach the file 📎', 'ភ្ជាប់ឯកសារ 📎'),
            t('Click Send', 'ចុច ផ្ញើ'),
          ],
        ),
        mc(
          t(
            'Which part of an email address is the email service?',
            'តើផ្នែកណានៃអាសយដ្ឋានអ៊ីមែលគឺជាសេវាអ៊ីមែល?',
          ),
          t('The part after @', 'ផ្នែកក្រោយ @'),
          [t('The part before @', 'ផ្នែកមុន @'), t('The @ itself', '@ ខ្លួនវា')],
        ),
        num(
          t(
            'Your inbox has 24 emails. You delete 9. How many are left?',
            'ប្រអប់ទទួលរបស់អ្នកមាន 24 អ៊ីមែល។ អ្នកលុប 9។ តើនៅសល់ប៉ុន្មាន?',
          ),
          15,
        ),
        tf(
          t(
            'You should open attachments from people you don’t know.',
            'អ្នកគួរបើកឯកសារភ្ជាប់ពីមនុស្សដែលអ្នកមិនស្គាល់។',
          ),
          false,
          {
            explanation: t(
              'Attachments from strangers can contain viruses.',
              'ឯកសារភ្ជាប់ពីមនុស្សចម្លែកអាចមានមេរោគ។',
            ),
          },
        ),
      ),
      reward(t('You’ve got mail skills! 📧', 'អ្នកមានជំនាញអ៊ីមែល! 📧')),
    ],
  ),

  lesson(
    W,
    'writing-good-emails',
    '✉️',
    t('Writing Good Emails', 'ការសរសេរអ៊ីមែលល្អ'),
    t(
      'Polite, clear emails to teachers and employers.',
      'អ៊ីមែលគួរសម និងច្បាស់ ទៅកាន់គ្រូ និងនិយោជក។',
    ),
    9,
    [
      intro(
        '✉️',
        t(
          'A good email is short, polite and clear. It helps you get answers — and jobs!',
          'អ៊ីមែលល្អគឺខ្លី គួរសម និងច្បាស់។ វាជួយអ្នកទទួលបានចម្លើយ — និងការងារ!',
        ),
      ),
      learn(
        [
          '👋',
          t('Greeting', 'ការស្វាគមន៍'),
          t(
            '“Dear Teacher Sophea,” or “Hello Mr Dara,”',
            '“គោរពជូនលោកគ្រូ សុភា,” ឬ “សួស្តីលោក ដារ៉ា,”',
          ),
        ],
        [
          '🎯',
          t('Clear message', 'សារច្បាស់'),
          t(
            'Say why you write in the first sentence.',
            'ប្រាប់ពីមូលហេតុដែលអ្នកសរសេរក្នុងប្រយោគទីមួយ។',
          ),
        ],
        ['🙏', t('Polite ending', 'ការបញ្ចប់គួរសម'), t('“Thank you, Sokha”', '“អរគុណ សុខា”')],
      ),
      see(
        t(
          'Subject: Absent on Monday\nDear Teacher Sophea, I was sick on Monday… Thank you, Sokha',
          'ប្រធានបទ៖ អវត្តមានថ្ងៃច័ន្ទ\nគោរពជូនលោកគ្រូ សុភា ខ្ញុំឈឺកាលពីថ្ងៃច័ន្ទ… អរគុណ សុខា',
        ),
        t('Greeting, reason, thanks, name.', 'ការស្វាគមន៍ មូលហេតុ អរគុណ ឈ្មោះ។'),
      ),
      revealPlay(
        'email_sim',
        mc(
          t(
            'Best subject for an email about missing class?',
            'ប្រធានបទល្អបំផុតសម្រាប់អ៊ីមែលអំពីការអវត្តមានក្នុងថ្នាក់?',
          ),
          'Absent on Monday 3 June',
          ['hi', '!!!!', '(no subject)'],
        ),
        mc(
          t('Best greeting to a teacher?', 'ការស្វាគមន៍ល្អបំផុតទៅគ្រូ?'),
          t('Dear Teacher Sophea,', 'គោរពជូនលោកគ្រូ សុភា,'),
          [t('Yo!', 'ហេ!'), t('Hey you', 'ហេ អ្នក')],
        ),
        mc(t('Best ending?', 'ការបញ្ចប់ល្អបំផុត?'), t('Thank you, Sokha', 'អរគុណ សុខា'), [
          t('bye', 'បាយ'),
          t('(nothing)', '(គ្មានអ្វីទេ)'),
        ]),
        tf(
          t(
            'Writing an email ALL IN CAPITALS looks like shouting.',
            'ការសរសេរអ៊ីមែលជាអក្សរធំទាំងអស់ មើលទៅដូចការស្រែក។',
          ),
          true,
        ),
        mc(
          t('Which first sentence is clearest?', 'តើប្រយោគទីមួយណាច្បាស់ជាងគេ?'),
          t(
            'I am writing to ask about the homework for page 12.',
            'ខ្ញុំសរសេរដើម្បីសួរអំពីកិច្ចការផ្ទះទំព័រ 12។',
          ),
          [
            t('So yeah, um, the thing…', 'អឺ… រឿងនោះ…'),
            t('Hi again again again', 'សួស្តីម្តងទៀត ម្តងទៀត'),
          ],
        ),
        mc(
          t('Before you send, you should…', 'មុនពេលផ្ញើ អ្នកគួរ…'),
          t('Read it again and check the attachment', 'អានវាម្តងទៀត ហើយពិនិត្យឯកសារភ្ជាប់'),
          [t('Send it 3 times', 'ផ្ញើវា 3 ដង'), t('Delete the subject', 'លុបប្រធានបទ')],
        ),
        tf(
          t(
            'Emojis 😂🔥 are fine in an email to a company about a job.',
            'រូបអារម្មណ៍ 😂🔥 គឺមិនអីទេក្នុងអ៊ីមែលទៅក្រុមហ៊ុនអំពីការងារ។',
          ),
          false,
          {
            explanation: t(
              'Keep job emails formal and simple.',
              'រក្សាអ៊ីមែលការងារឱ្យផ្លូវការ និងសាមញ្ញ។',
            ),
          },
        ),
        mc(
          t('You forgot the attachment. What do you do?', 'អ្នកភ្លេចឯកសារភ្ជាប់។ តើអ្នកធ្វើអ្វី?'),
          t('Send a short follow-up with the file', 'ផ្ញើតាមក្រោយខ្លីៗជាមួយឯកសារ'),
          [
            t('Do nothing', 'មិនធ្វើអ្វីទេ'),
            t('Change your email address', 'ប្តូរអាសយដ្ឋានអ៊ីមែល'),
          ],
        ),
      ),
      revealChallenge(
        'email_sim',
        order(t('Put the parts of a good email in order.', 'តម្រៀបផ្នែកនៃអ៊ីមែលល្អ។'), [
          t('Greeting', 'ការស្វាគមន៍'),
          t('Why you are writing', 'មូលហេតុដែលអ្នកសរសេរ'),
          t('Details', 'ព័ត៌មានលម្អិត'),
          t('Thank you and your name', 'អរគុណ និងឈ្មោះរបស់អ្នក'),
        ]),
        mc(
          t('Applying for a job, which line is best?', 'ដាក់ពាក្យការងារ តើបន្ទាត់ណាល្អបំផុត?'),
          t('Please find my CV attached.', 'សូមមើល CV របស់ខ្ញុំដែលបានភ្ជាប់។'),
          [
            t('cv here lol', 'cv នៅនេះ ហាហា'),
            t('I want job give me', 'ខ្ញុំចង់បានការងារ ឱ្យខ្ញុំ'),
          ],
        ),
        tf(
          t(
            'A long email with many topics is better than a short one with one topic.',
            'អ៊ីមែលវែងដែលមានប្រធានបទច្រើន ល្អជាងអ៊ីមែលខ្លីដែលមានប្រធានបទមួយ។',
          ),
          false,
        ),
        mc(
          t(
            'How fast should you reply to an important school email?',
            'តើអ្នកគួរឆ្លើយតបអ៊ីមែលសាលាសំខាន់លឿនប៉ុណ្ណា?',
          ),
          t('Within a day or two', 'ក្នុងរយៈពេលមួយ ឬពីរថ្ងៃ'),
          [t('After a month', 'បន្ទាប់ពីមួយខែ'), t('Never', 'មិនដែល')],
        ),
        mc(
          t('You are angry about a grade. Best plan?', 'អ្នកខឹងអំពីពិន្ទុ។ ផែនការល្អបំផុត?'),
          t('Wait, calm down, then write politely', 'រង់ចាំ ស្ងប់ចិត្ត រួចសរសេរដោយគួរសម'),
          [
            t('Write rude words right away', 'សរសេរពាក្យឈ្លើយភ្លាមៗ'),
            t('Email the whole school', 'ផ្ញើអ៊ីមែលទៅសាលាទាំងមូល'),
          ],
        ),
        mc(
          t('A professional email signature includes…', 'ហត្ថលេខាអ៊ីមែលអាជីពរួមមាន…'),
          t('Your name and phone number', 'ឈ្មោះ និងលេខទូរស័ព្ទរបស់អ្នក'),
          [t('Your password', 'ពាក្យសម្ងាត់របស់អ្នក'), t('A long poem', 'កំណាព្យវែង')],
        ),
        tf(
          t(
            'Checking spelling before sending makes a good impression.',
            'ការពិនិត្យអក្ខរាវិរុទ្ធមុនពេលផ្ញើ បង្កើតការចាប់អារម្មណ៍ល្អ។',
          ),
          true,
        ),
        mc(
          t(
            'Email to a company: “Dear ___,” if you don’t know the name?',
            'អ៊ីមែលទៅក្រុមហ៊ុន៖ “គោរពជូន ___,” បើអ្នកមិនដឹងឈ្មោះ?',
          ),
          t('Dear Hiring Manager', 'គោរពជូនអ្នកគ្រប់គ្រងការជ្រើសរើស'),
          [t('Dear Whoever', 'គោរពជូនអ្នកណាក៏ដោយ'), t('Hey', 'ហេ')],
        ),
      ),
      reward(t('Professional writer! ✉️', 'អ្នកសរសេរអាជីព! ✉️')),
    ],
  ),

  lesson(
    W,
    'chat-and-video-calls',
    '💬',
    t('Chat & Video Calls', 'ការជជែក និងការហៅវីដេអូ'),
    t('Telegram, Messenger, Zoom and good manners.', 'Telegram, Messenger, Zoom និងសុជីវធម៌ល្អ។'),
    9,
    [
      intro(
        '💬',
        t(
          'Chat apps and video calls connect families, classes and teams. Let’s use them well.',
          'កម្មវិធីជជែក និងការហៅវីដេអូភ្ជាប់គ្រួសារ ថ្នាក់រៀន និងក្រុម។ តោះប្រើវាឱ្យល្អ។',
        ),
      ),
      learn(
        [
          '💬',
          t('Chat apps', 'កម្មវិធីជជែក'),
          t(
            'Telegram, Messenger, WhatsApp: messages, groups, voice notes.',
            'Telegram, Messenger, WhatsApp៖ សារ ក្រុម សារសំឡេង។',
          ),
        ],
        [
          '🎥',
          t('Video calls', 'ការហៅវីដេអូ'),
          t(
            'Zoom, Google Meet: online classes and meetings.',
            'Zoom, Google Meet៖ ថ្នាក់អនឡាញ និងកិច្ចប្រជុំ។',
          ),
        ],
        [
          '🔇',
          t('Good manners', 'សុជីវធម៌ល្អ'),
          t(
            'Mute when you’re not speaking. Be kind in groups.',
            'បិទសំឡេងពេលអ្នកមិននិយាយ។ ចិត្តល្អក្នុងក្រុម។',
          ),
        ],
      ),
      see(
        '🎤🔇 · 📷 · ✋',
        t(
          'Mute, camera and “raise hand” — the three buttons you use most in class calls.',
          'បិទសំឡេង កាមេរ៉ា និង “លើកដៃ” — ប៊ូតុងបីដែលអ្នកប្រើច្រើនបំផុតក្នុងការហៅថ្នាក់។',
        ),
      ),
      revealPlay(
        'multiple_choice',
        mc(
          t(
            'In an online class, when should you mute 🔇?',
            'ក្នុងថ្នាក់អនឡាញ តើអ្នកគួរបិទសំឡេង 🔇 ពេលណា?',
          ),
          t('When you are not speaking', 'ពេលអ្នកមិននិយាយ'),
          [t('Never', 'មិនដែល'), t('Only when the teacher speaks', 'តែពេលគ្រូនិយាយ')],
        ),
        mc(
          t('Want to ask a question in a video class? Use…', 'ចង់សួរសំណួរក្នុងថ្នាក់វីដេអូ? ប្រើ…'),
          t('✋ Raise hand or the chat', '✋ លើកដៃ ឬការជជែក'),
          [t('Shout loudly', 'ស្រែកខ្លាំងៗ'), t('Leave the call', 'ចាកចេញពីការហៅ')],
        ),
        mc(t('Which app is for video meetings?', 'តើកម្មវិធីណាសម្រាប់កិច្ចប្រជុំវីដេអូ?'), 'Zoom', [
          'Excel',
          'Paint',
        ]),
        tf(
          t(
            'Messages in a class group can be seen by everyone in the group.',
            'សារក្នុងក្រុមថ្នាក់អាចត្រូវបានមើលឃើញដោយអ្នកទាំងអស់ក្នុងក្រុម។',
          ),
          true,
        ),
        mc(
          t('Best place to sit for a video call?', 'កន្លែងល្អបំផុតដើម្បីអង្គុយសម្រាប់ការហៅវីដេអូ?'),
          t('Quiet, with light on your face', 'ស្ងាត់ មានពន្លឺលើមុខ'),
          [
            t('In a noisy market', 'ក្នុងផ្សារអ៊ូអរ'),
            t('With a bright window behind you', 'មានបង្អួចភ្លឺនៅខាងក្រោយ'),
          ],
        ),
        mc(
          t('A voice message 🎙️ is…', 'សារសំឡេង 🎙️ គឺ…'),
          t('A short recording you send in chat', 'ការថតខ្លីដែលអ្នកផ្ញើក្នុងការជជែក'),
          [t('A video call', 'ការហៅវីដេអូ'), t('An email', 'អ៊ីមែល')],
        ),
        mc(
          t(
            'Sending 50 stickers in the class group is…',
            'ការផ្ញើស្ទីកឃ័រ 50 ក្នុងក្រុមថ្នាក់ គឺ…',
          ),
          t('Annoying spam', 'Spam គួរឱ្យរំខាន'),
          [t('Very helpful', 'មានប្រយោជន៍ខ្លាំង'), t('Required', 'ចាំបាច់')],
        ),
        tf(
          t(
            'You should check who is in a group before sharing private things.',
            'អ្នកគួរពិនិត្យថានរណានៅក្នុងក្រុម មុនពេលចែករំលែករឿងឯកជន។',
          ),
          true,
        ),
      ),
      revealChallenge(
        'multiple_choice',
        sod(
          t(
            'A stranger in a chat asks for your photo and home address. Safe?',
            'មនុស្សចម្លែកក្នុងការជជែកសុំរូបថត និងអាសយដ្ឋានផ្ទះរបស់អ្នក។ សុវត្ថិភាពទេ?',
          ),
          'dangerous',
          {
            explanation: t(
              'Never share photos or addresses with strangers. Block and tell an adult.',
              'កុំចែករំលែករូបថត ឬអាសយដ្ឋានជាមួយមនុស្សចម្លែក។ បិទ ហើយប្រាប់មនុស្សពេញវ័យ។',
            ),
          },
        ),
        mc(
          t(
            'Someone keeps sending you mean messages. What can you do?',
            'នរណាម្នាក់បន្តផ្ញើសារអាក្រក់មកអ្នក។ តើអ្នកអាចធ្វើអ្វី?',
          ),
          t(
            'Block, report, and tell someone you trust',
            'បិទ រាយការណ៍ ហើយប្រាប់នរណាម្នាក់ដែលអ្នកទុកចិត្ត',
          ),
          [
            t('Send mean messages back', 'ផ្ញើសារអាក្រក់ត្រឡប់ទៅវិញ'),
            t('Keep it secret forever', 'រក្សាជាសម្ងាត់ជារៀងរហូត'),
          ],
        ),
        order(
          t(
            'Join a class video call: put the steps in order.',
            'ចូលរួមការហៅវីដេអូថ្នាក់៖ តម្រៀបជំហាន។',
          ),
          [
            t('Open the link from your teacher', 'បើកតំណពីគ្រូរបស់អ្នក'),
            t('Type your real name', 'វាយឈ្មោះពិតរបស់អ្នក'),
            t('Join with your microphone muted', 'ចូលរួមដោយបិទមីក្រូហ្វូន'),
            t('Say hello in the chat', 'និយាយសួស្តីក្នុងការជជែក'),
          ],
        ),
        mc(
          t('Your Internet is slow during a call. Try…', 'អ៊ីនធឺណិតរបស់អ្នកយឺតពេលហៅ។ សាក…'),
          t('Turning off your camera', 'បិទកាមេរ៉ារបស់អ្នក'),
          [t('Turning up the volume', 'បង្កើនសំឡេង'), t('Opening more videos', 'បើកវីដេអូបន្ថែម')],
        ),
        tf(
          t(
            'Recording a call without telling others is polite.',
            'ការថតការហៅដោយមិនប្រាប់អ្នកដទៃ គឺគួរសម។',
          ),
          false,
        ),
        mc(
          t('Which is a good group chat message?', 'តើសារក្រុមណាល្អ?'),
          t(
            '“Does anyone have the homework page number? Thanks!”',
            '“តើមាននរណាដឹងលេខទំព័រកិច្ចការផ្ទះទេ? អរគុណ!”',
          ),
          [
            t('“hey hey hey hey”', '“ហេ ហេ ហេ ហេ”'),
            t('A rude joke about a classmate', 'ការលេងសើចឈ្លើយអំពីមិត្តរួមថ្នាក់'),
          ],
        ),
        mc(
          t(
            'Two blue ticks ✓✓ in some chat apps mean…',
            'សញ្ញាធីកខៀវពីរ ✓✓ ក្នុងកម្មវិធីជជែកខ្លះមានន័យថា…',
          ),
          t('The message was read', 'សារត្រូវបានអាន'),
          [t('The message failed', 'សារបរាជ័យ'), t('The phone is off', 'ទូរស័ព្ទបិទ')],
        ),
        tf(
          t(
            'You can leave a group chat if it makes you uncomfortable.',
            'អ្នកអាចចាកចេញពីក្រុមជជែក បើវាធ្វើឱ្យអ្នកមិនស្រួល។',
          ),
          true,
        ),
      ),
      reward(t('Great online communicator! 💬', 'អ្នកទំនាក់ទំនងអនឡាញពូកែ! 💬')),
    ],
  ),
];
