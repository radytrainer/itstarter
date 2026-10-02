import { t } from '../../types';
import { buildSentence, catchIt, game, memory } from '../dsl';

// 🎮 Game rounds for Internet Explorer, by lesson slug. Khmer (km) strings are DRAFTS.
export const INTERNET_GAMES = {
  'what-is-the-internet': game(
    memory(t('Match each word to its meaning.', 'ផ្គូផ្គងពាក្យនីមួយៗជាមួយអត្ថន័យ។'), [
      [
        ['🌐', t('Internet', 'អ៊ីនធឺណិត')],
        t('Computers joined around the world', 'កុំព្យូទ័រភ្ជាប់គ្នាទូទាំងពិភពលោក'),
      ],
      [['📶', 'Wi-Fi'], t('Internet without cables', 'អ៊ីនធឺណិតគ្មានខ្សែ')],
      [
        ['🗄️', t('Server', 'ម៉ាស៊ីនមេ')],
        t('A computer that stores websites', 'កុំព្យូទ័រដែលផ្ទុកវេបសាយ'),
      ],
      [['🔗', t('Link', 'តំណ')], t('Click to go to another page', 'ចុចដើម្បីទៅទំព័រផ្សេង')],
    ]),
    catchIt(
      t('Catch the things that NEED the internet!', 'ចាប់អ្វីដែលត្រូវការអ៊ីនធឺណិត!'),
      [
        t('Sending an email', 'ផ្ញើអ៊ីមែល'),
        t('Watching YouTube', 'មើល YouTube'),
        t('A video call', 'ការហៅវីដេអូ'),
        t('A Google search', 'ស្វែងរកក្នុង Google'),
      ],
      [
        t('Calculator', 'ម៉ាស៊ីនគិតលេខ'),
        t('Taking a photo', 'ថតរូប'),
        t('Reading a saved PDF', 'អាន PDF ដែលបានរក្សាទុក'),
        t('Torch', 'ពិល'),
      ],
    ),
  ),
  'wifi-and-mobile-data': game(
    catchIt(
      t('Catch the habits that SAVE mobile data!', 'ចាប់ទម្លាប់ដែលសន្សំទិន្នន័យទូរស័ព្ទ!'),
      [
        t('Big downloads on Wi-Fi', 'ទាញយកធំៗតាម Wi-Fi'),
        t('Turn off video auto-play', 'បិទការចាក់វីដេអូស្វ័យប្រវត្តិ'),
        t('Update apps on Wi-Fi', 'ធ្វើបច្ចុប្បន្នភាពកម្មវិធីតាម Wi-Fi'),
        t('Check your data use', 'ពិនិត្យការប្រើទិន្នន័យ'),
      ],
      [
        t('HD videos all day on data', 'មើលវីដេអូ HD ពេញថ្ងៃដោយទិន្នន័យ'),
        t('Hotspot open for everyone', 'បើក Hotspot ឱ្យគ្រប់គ្នា'),
        t('Huge downloads on data', 'ទាញយកធំៗដោយទិន្នន័យ'),
      ],
      { speed: 'slow' },
    ),
    memory(t('Match each word to its meaning.', 'ផ្គូផ្គងពាក្យនីមួយៗជាមួយអត្ថន័យ។'), [
      ['Wi-Fi', t('From a router at home or school', 'ពីរ៉ោតទ័រនៅផ្ទះ ឬសាលា')],
      [t('Mobile data', 'ទិន្នន័យទូរស័ព្ទ'), t('From your SIM card', 'ពីស៊ីមកាតរបស់អ្នក')],
      ['Hotspot', t('Share your phone’s internet', 'ចែករំលែកអ៊ីនធឺណិតទូរស័ព្ទ')],
      ['GB', t('A size of data', 'ទំហំទិន្នន័យ')],
    ]),
  ),
  'browsers-and-urls': game(
    catchIt(
      t('Catch the WEB BROWSERS!', 'ចាប់កម្មវិធីរុករកវេប!'),
      ['Chrome', 'Firefox', 'Safari', 'Edge'],
      ['Google', 'Facebook', 'Windows', 'Wi-Fi'],
      {
        hint: t(
          'A browser is the app you open to visit websites.',
          'កម្មវិធីរុករក គឺជាកម្មវិធីដែលអ្នកបើកដើម្បីចូលវេបសាយ។',
        ),
      },
    ),
    memory(
      t(
        'Match each part of a web address to its meaning.',
        'ផ្គូផ្គងផ្នែកនីមួយៗនៃអាសយដ្ឋានវេបជាមួយអត្ថន័យ។',
      ),
      [
        ['https://', t('A secure connection 🔒', 'ការតភ្ជាប់មានសុវត្ថិភាព 🔒')],
        ['.edu', t('Education', 'ការអប់រំ')],
        ['.gov.kh', t('Cambodian government', 'រដ្ឋាភិបាលកម្ពុជា')],
        ['.com', t('Company or general site', 'ក្រុមហ៊ុន ឬវេបសាយទូទៅ')],
      ],
    ),
  ),
  'searching-smart': game(
    catchIt(
      t(
        'You want to save a Word file as a PDF. Catch the GOOD search words!',
        'អ្នកចង់រក្សាទុកឯកសារ Word ជា PDF។ ចាប់ពាក្យស្វែងរកល្អ!',
      ),
      ['save Word as PDF', 'Word export PDF', 'convert docx to pdf'],
      ['help', 'computer problem', 'please tell me everything'],
      { speed: 'slow' },
    ),
    memory(
      t(
        'Match each search trick to what it does.',
        'ផ្គូផ្គងល្បិចស្វែងរកនីមួយៗជាមួយអ្វីដែលវាធ្វើ។',
      ),
      [
        ['" "', t('Exact phrase', 'ឃ្លាជាក់លាក់')],
        ['-word', t('Leave a word out', 'ដកពាក្យមួយចេញ')],
        ['site:', t('Search one website', 'ស្វែងរកក្នុងវេបសាយមួយ')],
        [t('Images tab', 'ផ្ទាំងរូបភាព'), t('Find pictures', 'រករូបភាព')],
      ],
    ),
  ),
  'is-it-true': game(
    catchIt(
      t('Catch the WARNING SIGNS of fake news!', 'ចាប់សញ្ញាព្រមាននៃព័ត៌មានក្លែងក្លាយ!'),
      [
        t('SHOCKING!!! headline', 'ចំណងជើង «រន្ធត់!!!»'),
        t('No author or date', 'គ្មានអ្នកនិពន្ធ ឬកាលបរិច្ឆេទ'),
        t('Only one site says it', 'មានតែវេបសាយមួយនិយាយ'),
        t('“Share this NOW!”', '«ចែករំលែកឥឡូវនេះ!»'),
      ],
      [
        t('Many trusted sites agree', 'វេបសាយទុកចិត្តជាច្រើនយល់ស្រប'),
        t('Author and date shown', 'មានអ្នកនិពន្ធ និងកាលបរិច្ឆេទ'),
        t('Official source', 'ប្រភពផ្លូវការ'),
        t('Facts you can check', 'ការពិតដែលអ្នកអាចពិនិត្យ'),
      ],
      { speed: 'slow' },
    ),
    memory(t('Match each word to its meaning.', 'ផ្គូផ្គងពាក្យនីមួយៗជាមួយអត្ថន័យ។'), [
      [t('Source', 'ប្រភព'), t('Where it comes from', 'កន្លែងដែលវាមកពី')],
      [t('Fact', 'ការពិត'), t('Can be proven', 'អាចបញ្ជាក់បាន')],
      [t('Opinion', 'មតិ'), t('What someone thinks', 'អ្វីដែលនរណាម្នាក់គិត')],
      [t('Rumour', 'ពាក្យចចាមអារ៉ាម'), t('A story with no proof', 'រឿងគ្មានភស្តុតាង')],
    ]),
  ),
  'email-basics': game(
    memory(
      t('Match each part of an email to its job.', 'ផ្គូផ្គងផ្នែកនីមួយៗនៃអ៊ីមែលជាមួយតួនាទី។'),
      [
        [t('To', 'ទៅកាន់'), t('Who gets it', 'អ្នកទទួល')],
        [t('Subject', 'ប្រធានបទ'), t('What it is about', 'វានិយាយអំពីអ្វី')],
        ['CC', t('A copy to someone else', 'ច្បាប់ចម្លងទៅអ្នកផ្សេង')],
        [['📎', t('Attachment', 'ឯកសារភ្ជាប់')], t('A file sent with it', 'ឯកសារផ្ញើជាមួយ')],
      ],
    ),
    buildSentence(
      t('Build a polite email to your teacher.', 'បង្កើតអ៊ីមែលគួរសមទៅគ្រូរបស់អ្នក។'),
      'Dear teacher, here is my homework.',
      { say: 'Dear teacher, here is my homework.' },
    ),
  ),
  'writing-good-emails': game(
    catchIt(
      t('Catch the POLITE email phrases!', 'ចាប់ឃ្លាអ៊ីមែលគួរសម!'),
      ['Dear Mr. Dara,', 'Thank you for your time.', 'Best regards,', 'Could you please help me?'],
      ['HEY!!!', 'Answer me now', 'whatever', 'ur late lol'],
      { speed: 'slow' },
    ),
    buildSentence(
      t('Build the closing line of an email.', 'បង្កើតបន្ទាត់បញ្ចប់នៃអ៊ីមែល។'),
      'Thank you for your help.',
      { say: 'Thank you for your help.' },
    ),
  ),
  'chat-and-video-calls': game(
    catchIt(
      t('Catch the GOOD video-call manners!', 'ចាប់សុជីវធម៌ល្អពេលហៅវីដេអូ!'),
      [
        t('Mute when not talking', 'បិទសំឡេងពេលមិននិយាយ'),
        t('Be on time', 'មកទាន់ពេល'),
        t('Find a quiet place', 'រកកន្លែងស្ងាត់'),
        t('Raise your hand to speak', 'លើកដៃមុននិយាយ'),
      ],
      [
        t('Eat loudly', 'ញ៉ាំខ្លាំងៗ'),
        t('Talk over others', 'និយាយកាត់អ្នកដទៃ'),
        t('Join very late', 'ចូលយឺតខ្លាំង'),
      ],
    ),
    memory(
      t('Match each call button to what it does.', 'ផ្គូផ្គងប៊ូតុងហៅនីមួយៗជាមួយអ្វីដែលវាធ្វើ។'),
      [
        [['🎤', t('Mute', 'បិទសំឡេង')], t('Others can’t hear you', 'អ្នកដទៃមិនឮអ្នក')],
        [['📷', t('Camera off', 'បិទកាមេរ៉ា')], t('Others can’t see you', 'អ្នកដទៃមិនឃើញអ្នក')],
        [['✋', t('Raise hand', 'លើកដៃ')], t('Ask to speak', 'សុំនិយាយ')],
        [['💬', t('Chat', 'ជជែក')], t('Type a message', 'វាយសារ')],
      ],
    ),
  ),
  'strong-passwords': game(
    catchIt(
      t('Catch the STRONG passwords!', 'ចាប់ពាក្យសម្ងាត់ខ្លាំង!'),
      ['Mango!Rain#Bike42', 'Tuk-tuk$Sunset_19', 'Blue8!Cat&Star'],
      ['123456', 'password', 'sokha2010', 'qwerty'],
    ),
    memory(
      t(
        'Match each password rule to what it means.',
        'ផ្គូផ្គងច្បាប់ពាក្យសម្ងាត់នីមួយៗជាមួយអត្ថន័យ។',
      ),
      [
        [t('Long', 'វែង'), t('12 or more characters', 'តួអក្សរ 12 ឬច្រើនជាងនេះ')],
        [t('Mixed', 'លាយគ្នា'), t('Letters, numbers and symbols', 'អក្សរ លេខ និងនិមិត្តសញ្ញា')],
        [t('Unique', 'មិនដូចគ្នា'), t('Different for every account', 'ខុសគ្នាសម្រាប់គណនីនីមួយៗ')],
        [t('Secret', 'សម្ងាត់'), t('Never share it', 'កុំចែករំលែកវា')],
      ],
    ),
  ),
  'safe-or-dangerous': game(
    catchIt(
      t(
        'Catch the DANGEROUS messages before they reach you!',
        'ចាប់សារគ្រោះថ្នាក់ មុនពេលវាមកដល់អ្នក!',
      ),
      [
        t('You won $1,000! Click now', 'អ្នកឈ្នះ $1,000! ចុចឥឡូវនេះ'),
        t('Send me your password', 'ផ្ញើពាក្យសម្ងាត់មកខ្ញុំ'),
        t('Free phone! Pay delivery first', 'ទូរស័ព្ទឥតគិតថ្លៃ! បង់ថ្លៃដឹកមុន'),
        t('Your account is locked: log in here', 'គណនីរបស់អ្នកត្រូវបានចាក់សោ៖ ចូលនៅទីនេះ'),
      ],
      [
        t('Teacher: class starts at 8', 'គ្រូ៖ ថ្នាក់ចាប់ផ្តើមម៉ោង 8'),
        t('Mum: dinner is ready', 'ម្តាយ៖ អាហារល្ងាចរួចហើយ'),
        t('School newsletter', 'ព្រឹត្តិប័ត្រសាលា'),
        t('Friend: happy birthday!', 'មិត្ត៖ រីករាយថ្ងៃកំណើត!'),
      ],
      { speed: 'slow' },
    ),
    memory(t('Match each symbol to its meaning.', 'ផ្គូផ្គងនិមិត្តសញ្ញានីមួយៗជាមួយអត្ថន័យ។'), [
      ['🔒', t('A secure site', 'វេបសាយមានសុវត្ថិភាព')],
      ['⚠️', t('A warning', 'ការព្រមាន')],
      [
        ['🎣', t('Phishing', 'ការបោកបញ្ឆោត (Phishing)')],
        t('A fake message to steal information', 'សារក្លែងក្លាយដើម្បីលួចព័ត៌មាន'),
      ],
      [
        ['🛡️', t('Antivirus', 'កម្មវិធីកំចាត់មេរោគ')],
        t('Protects against viruses', 'ការពារពីមេរោគ'),
      ],
    ]),
  ),
  'spot-phishing': game(
    catchIt(
      t('Catch the PHISHING signs!', 'ចាប់សញ្ញានៃការបោកបញ្ឆោត!'),
      [
        t('“Act in 1 hour!”', '«ធ្វើក្នុង 1 ម៉ោង!»'),
        t('A strange sender address', 'អាសយដ្ឋានអ្នកផ្ញើចម្លែក'),
        t('Lots of spelling mistakes', 'កំហុសអក្ខរាវិរុទ្ធច្រើន'),
        t('Asks for your password', 'សុំពាក្យសម្ងាត់របស់អ្នក'),
      ],
      [
        t('Your teacher’s real address', 'អាសយដ្ឋានពិតរបស់គ្រូ'),
        t('A message you expected', 'សារដែលអ្នករំពឹងទុក'),
        t('No links or attachments', 'គ្មានតំណ ឬឯកសារភ្ជាប់'),
      ],
      { speed: 'slow' },
    ),
    memory(t('Match each action to what it does.', 'ផ្គូផ្គងសកម្មភាពនីមួយៗជាមួយអ្វីដែលវាធ្វើ។'), [
      [
        t('Hover over a link', 'ដាក់កណ្តុរលើតំណ'),
        t('See where it really goes', 'មើលថាវាពិតជាទៅណា'),
      ],
      [t('Report', 'រាយការណ៍'), t('Tell an adult or the IT team', 'ប្រាប់មនុស្សពេញវ័យ ឬក្រុម IT')],
      [t('Delete', 'លុប'), t('Remove the scam message', 'លុបសារបោកប្រាស់')],
      [t('Block', 'ទប់ស្កាត់'), t('Stop the sender', 'បញ្ឈប់អ្នកផ្ញើ')],
    ]),
  ),
  'safe-browsing': game(
    catchIt(
      t('Catch the SAFE web addresses!', 'ចាប់អាសយដ្ឋានវេបដែលមានសុវត្ថិភាព!'),
      ['https://www.google.com', 'https://moeys.gov.kh', 'https://en.wikipedia.org'],
      ['http://free-iphone-win.xyz', 'https://g00gle-login.net', 'http://my-bank-verify.ru'],
      {
        speed: 'slow',
        hint: t(
          'Look closely at every letter: 0 is not o!',
          'មើលអក្សរនីមួយៗឱ្យច្បាស់៖ 0 មិនមែន o ទេ!',
        ),
      },
    ),
    memory(t('Match each word to its meaning.', 'ផ្គូផ្គងពាក្យនីមួយៗជាមួយអត្ថន័យ។'), [
      [t('Pop-up', 'ផ្ទាំងលោតឡើង'), t('A window that opens by itself', 'ផ្ទាំងដែលបើកដោយខ្លួនឯង')],
      [t('Ad blocker', 'កម្មវិធីបិទការផ្សាយ'), t('Hides adverts', 'លាក់ការផ្សាយពាណិជ្ជកម្ម')],
      [t('Incognito', 'របៀបឯកជន'), t('Doesn’t save your history', 'មិនរក្សាប្រវត្តិរបស់អ្នក')],
      ['Cookies', t('Small files websites save', 'ឯកសារតូចៗដែលវេបសាយរក្សាទុក')],
    ]),
  ),
  'privacy-and-social-media': game(
    catchIt(
      t('Catch the things you should keep PRIVATE!', 'ចាប់អ្វីដែលអ្នកគួររក្សាជាឯកជន!'),
      [
        t('Home address', 'អាសយដ្ឋានផ្ទះ'),
        t('Password', 'ពាក្យសម្ងាត់'),
        t('Phone number', 'លេខទូរស័ព្ទ'),
        t('ID card photo', 'រូបអត្តសញ្ញាណប័ណ្ណ'),
      ],
      [
        t('Favourite food', 'អាហារដែលចូលចិត្ត'),
        t('A drawing you made', 'គំនូរដែលអ្នកគូរ'),
        t('Your hobby', 'ចំណូលចិត្តរបស់អ្នក'),
        t('Favourite colour', 'ពណ៌ដែលចូលចិត្ត'),
      ],
    ),
    memory(
      t(
        'Match each setting to who can see your post.',
        'ផ្គូផ្គងការកំណត់នីមួយៗជាមួយអ្នកដែលអាចឃើញការបង្ហោះ។',
      ),
      [
        [t('Public', 'សាធារណៈ'), t('Everyone', 'គ្រប់គ្នា')],
        [t('Friends only', 'មិត្តភក្តិប៉ុណ្ណោះ'), t('People you accepted', 'មនុស្សដែលអ្នកទទួលយក')],
        [t('Only me', 'តែខ្ញុំ'), t('Just you', 'តែអ្នកម្នាក់')],
        [t('Tag', 'ដាក់ស្លាក'), t('Name someone in a post', 'ដាក់ឈ្មោះនរណាម្នាក់ក្នុងការបង្ហោះ')],
      ],
    ),
  ),
  'kindness-online': game(
    catchIt(
      t('Catch the KIND comments!', 'ចាប់មតិយោបល់ដែលចិត្តល្អ!'),
      [
        t('Great job! 👏', 'ធ្វើបានល្អ! 👏'),
        t('Can I help?', 'ខ្ញុំអាចជួយបានទេ?'),
        t('Nice photo!', 'រូបស្អាត!'),
        t('Thanks for sharing', 'អរគុណដែលបានចែករំលែក'),
      ],
      [
        t('That’s ugly', 'អាក្រក់មែន'),
        t('Nobody asked you', 'គ្មាននរណាសួរអ្នកទេ'),
        t('Go away', 'ទៅឆ្ងាយ'),
      ],
    ),
    buildSentence(
      t('Build the golden rule of the internet.', 'បង្កើតច្បាប់មាសនៃអ៊ីនធឺណិត។'),
      'Think before you post.',
      {
        say: 'Think before you post.',
      },
    ),
  ),
  'online-services': game(
    memory(t('Match each word to its meaning.', 'ផ្គូផ្គងពាក្យនីមួយៗជាមួយអត្ថន័យ។'), [
      [t('OTP code', 'លេខកូដ OTP'), t('A one-time code from the bank', 'លេខកូដប្រើម្តងពីធនាគារ')],
      [t('QR payment', 'ការទូទាត់ QR'), t('Scan to pay', 'ស្កេនដើម្បីបង់')],
      [t('Receipt', 'បង្កាន់ដៃ'), t('Proof that you paid', 'ភស្តុតាងថាអ្នកបានបង់')],
      [
        t('2-step verification', 'ការផ្ទៀងផ្ទាត់ 2 ជំហាន'),
        t('Password + code', 'ពាក្យសម្ងាត់ + លេខកូដ'),
      ],
    ]),
    catchIt(
      t('Catch the SAFE online shopping habits!', 'ចាប់ទម្លាប់ទិញទំនិញអនឡាញដោយសុវត្ថិភាព!'),
      [
        t('Check the seller’s reviews', 'ពិនិត្យការវាយតម្លៃអ្នកលក់'),
        t('Use trusted apps', 'ប្រើកម្មវិធីដែលទុកចិត្តបាន'),
        t('Never share your OTP', 'កុំចែករំលែក OTP'),
        t('Check the price first', 'ពិនិត្យតម្លៃជាមុន'),
      ],
      [
        t('Pay a stranger first', 'បង់ឱ្យមនុស្សចម្លែកមុន'),
        t('Share your PIN', 'ចែករំលែកលេខ PIN'),
        t('Click links in random SMS', 'ចុចតំណក្នុង SMS ចៃដន្យ'),
      ],
      { speed: 'slow' },
    ),
  ),
};
