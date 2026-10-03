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
  urlMock,
} from '../dsl';
import { SECURITY_WORLD as W } from './security-1';

// 🛡️ Cyber Security Pro, lessons 9–15. Defensive skills only.
// Khmer (km) strings are DRAFTS for native review.
export const SECURITY_LESSONS_2: LessonSeed[] = [
  // 9 ─────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'encryption-basics',
    '🔐',
    t('Secret Codes: Encryption', 'លេខកូដសម្ងាត់៖ ការអ៊ិនគ្រីប'),
    t(
      'Scramble messages so only the right person can read them.',
      'បំប្លែងសារ ដើម្បីឱ្យមានតែមនុស្សត្រឹមត្រូវអាចអាន។',
    ),
    {
      intro: [
        '🔐',
        t(
          'Over 2,000 years ago, Julius Caesar shifted letters to hide messages. Today encryption protects every chat and bank app.',
          'ជាង 2,000 ឆ្នាំមុន Julius Caesar បានរំកិលអក្សរដើម្បីលាក់សារ។ សព្វថ្ងៃការអ៊ិនគ្រីបការពារការជជែក និងកម្មវិធីធនាគារគ្រប់មួយ។',
        ),
      ],
      learn: [
        [
          '📝',
          t('Plaintext', 'អត្ថបទធម្មតា'),
          t('The normal, readable message.', 'សារធម្មតាដែលអាចអានបាន។'),
        ],
        [
          '🔀',
          t('Ciphertext', 'អត្ថបទកូដ'),
          t(
            'The scrambled message nobody can read without the key.',
            'សារដែលបានបំប្លែងដែលគ្មាននរណាអាចអានបានដោយគ្មានកូនសោ។',
          ),
          'cipher',
        ],
        [
          '🔑',
          t('Key', 'កូនសោ'),
          t('The secret that locks and unlocks the message.', 'អាថ៌កំបាំងដែលចាក់សោ និងដោះសោសារ។'),
          'key',
        ],
        [
          '💬',
          t('End-to-end', 'ពីចុងមួយទៅចុងមួយ'),
          t(
            'Only you and your friend can read the chat — not even the app company.',
            'មានតែអ្នក និងមិត្តអ្នកអាចអានការជជែក — សូម្បីតែក្រុមហ៊ុនកម្មវិធីក៏មិនអាច។',
          ),
        ],
      ],
      see: [
        t(
          'Caesar shift +1:\nC A T → D B U\nTo decrypt, shift −1:\nD B U → C A T',
          'Caesar រំកិល +1៖\nC A T → D B U\nដើម្បីឌិគ្រីប រំកិល −1៖\nD B U → C A T',
        ),
        t(
          'The key here is “+1”. Modern encryption uses keys with hundreds of digits.',
          'កូនសោនៅទីនេះគឺ «+1»។ ការអ៊ិនគ្រីបទំនើបប្រើកូនសោមានខ្ទង់រាប់រយ។',
        ),
      ],
      words: [
        ['encrypt', 'អ៊ិនគ្រីប', '🔐'],
        ['decrypt', 'ឌិគ្រីប', '🔓'],
        ['key', 'កូនសោ', '🔑'],
        ['cipher', 'កូដសម្ងាត់'],
      ],
      play: [
        mc(
          t('With a shift of +1, what does “HI” become?', 'ជាមួយការរំកិល +1 តើ «HI» ក្លាយជាអ្វី?'),
          'IJ',
          ['GH', 'HI', 'JK'],
        ),
        mc(t('With a shift of +1, decode “EPH”.', 'ជាមួយការរំកិល +1 ឌិកូដ «EPH»។'), 'DOG', [
          'FQI',
          'CAT',
          'EGG',
        ]),
        mc(
          t('What is encryption?', 'តើការអ៊ិនគ្រីបជាអ្វី?'),
          t(
            'Scrambling data so only key holders can read it',
            'ការបំប្លែងទិន្នន័យដើម្បីឱ្យមានតែអ្នកមានកូនសោអាចអាន',
          ),
          [t('Deleting data', 'ការលុបទិន្នន័យ'), t('Printing data', 'ការបោះពុម្ពទិន្នន័យ')],
        ),
        tf(
          t(
            'Without the key, encrypted data looks like random nonsense.',
            'បើគ្មានកូនសោ ទិន្នន័យអ៊ិនគ្រីបមើលទៅដូចសំរាមចៃដន្យ។',
          ),
          true,
        ),
        mc(
          t(
            'Turning ciphertext back into plaintext is called…',
            'ការប្តូរអត្ថបទកូដត្រឡប់ទៅអត្ថបទធម្មតាហៅថា…',
          ),
          t('decryption', 'ការឌិគ្រីប'),
          [t('downloading', 'ការទាញយក'), t('printing', 'ការបោះពុម្ព')],
        ),
        tf(
          t(
            'End-to-end encryption means the app company can read your chats.',
            'ការអ៊ិនគ្រីបពីចុងមួយទៅចុងមួយមានន័យថាក្រុមហ៊ុនកម្មវិធីអាចអានការជជែករបស់អ្នក។',
          ),
          false,
        ),
        mc(
          t('Which uses encryption to protect you?', 'តើមួយណាប្រើការអ៊ិនគ្រីបដើម្បីការពារអ្នក?'),
          t('A bank app and HTTPS websites', 'កម្មវិធីធនាគារ និងគេហទំព័រ HTTPS'),
          [t('A paper notebook', 'សៀវភៅក្រដាស'), t('A TV remote', 'តេឡេបញ្ជាទូរទស្សន៍')],
        ),
        tf(
          t(
            'Turning on phone encryption protects your data if the phone is stolen.',
            'ការបើកការអ៊ិនគ្រីបទូរស័ព្ទការពារទិន្នន័យរបស់អ្នកប្រសិនបើទូរស័ព្ទត្រូវលួច។',
          ),
          true,
        ),
      ],
      challenge: [
        typeIt(t('Shift +2: encrypt “ABC”.', 'រំកិល +2៖ អ៊ិនគ្រីប «ABC»។'), 'CDE', {
          accept: ['cde'],
        }),
        typeIt(t('Shift +3: decrypt “FDW”.', 'រំកិល +3៖ ឌិគ្រីប «FDW»។'), 'CAT', {
          accept: ['cat'],
        }),
        mc(
          t('With +1, what comes after Z?', 'ជាមួយ +1 តើអ្វីមកក្រោយ Z?'),
          t('A (it wraps around)', 'A (វាវិលជុំ)'),
          ['Z', '0'],
        ),
        num(
          t(
            'A Caesar cipher has how many useful shifts for 26 letters?',
            'កូដ Caesar មានការរំកិលមានប្រយោជន៍ប៉ុន្មានសម្រាប់អក្សរ 26?',
          ),
          25,
          {
            explanation: t(
              'Only 25 — a computer tries them all instantly, so it is NOT secure today.',
              'តែ 25 — កុំព្យូទ័រសាកទាំងអស់ភ្លាមៗ ដូច្នេះវាមិនមានសុវត្ថិភាពសព្វថ្ងៃ។',
            ),
          },
        ),
        match(t('Match the word to its meaning.', 'ផ្គូផ្គងពាក្យជាមួយអត្ថន័យ។'), [
          [t('Plaintext', 'អត្ថបទធម្មតា'), t('Readable message', 'សារអាចអានបាន')],
          [t('Ciphertext', 'អត្ថបទកូដ'), t('Scrambled message', 'សារបំប្លែង')],
          [t('Key', 'កូនសោ'), t('Secret to unlock', 'អាថ៌កំបាំងដើម្បីដោះសោ')],
          [t('Decrypt', 'ឌិគ្រីប'), t('Unscramble', 'បកស្រាយ')],
        ]),
        order(t('Order a secure message’s journey.', 'តម្រៀបដំណើរសារសុវត្ថិភាព។'), [
          t('You type a message', 'អ្នកវាយសារ'),
          t('Your phone encrypts it', 'ទូរស័ព្ទរបស់អ្នកអ៊ិនគ្រីបវា'),
          t('It travels scrambled', 'វាធ្វើដំណើរជាកូដ'),
          t('Friend’s phone decrypts it', 'ទូរស័ព្ទមិត្តឌិគ្រីបវា'),
          t('Your friend reads it', 'មិត្តរបស់អ្នកអានវា'),
        ]),
        tf(
          t(
            'If you share your encryption key, encryption no longer protects you.',
            'ប្រសិនបើអ្នកចែករំលែកកូនសោអ៊ិនគ្រីប ការអ៊ិនគ្រីបលែងការពារអ្នក។',
          ),
          true,
        ),
        buildSentence(
          t('Build the rule.', 'បង្កើតច្បាប់។'),
          'Only the key can unlock the message.',
          { say: 'Only the key can unlock the message.' },
        ),
      ],
      games: [
        memory(
          t('Match each word to its Caesar +1 code.', 'ផ្គូផ្គងពាក្យនីមួយៗជាមួយកូដ Caesar +1។'),
          [
            ['CAT', 'DBU'],
            ['DOG', 'EPH'],
            ['SUN', 'TVO'],
            ['KEY', 'LFZ'],
          ],
        ),
        catchIt(
          t('Catch the ENCRYPTED (scrambled) words!', 'ចាប់ពាក្យដែលបានអ៊ិនគ្រីប (បំប្លែង)!'),
          ['Xq7#pL', 'DBU', 'k9$Vm2', 'TVO'],
          ['HELLO', 'CAT', 'SCHOOL', 'MANGO'],
          { speed: 'slow' },
        ),
      ],
      reward: t(
        'You can speak in secret code — like real cryptographers! 🔐',
        'អ្នកអាចនិយាយជាកូដសម្ងាត់ — ដូចអ្នកគ្រីបតូក្រាហ្វីពិត! 🔐',
      ),
    },
  ),

  // 10 ────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'https-and-safe-sites',
    '🔒',
    t('HTTPS & Safe Websites', 'HTTPS និងគេហទំព័រសុវត្ថិភាព'),
    t('Read the address bar like a pro.', 'អានរបារអាសយដ្ឋានដូចអ្នកជំនាញ។'),
    {
      intro: [
        '🔒',
        t(
          'The address bar tells you a lot — if you know where to look.',
          'របារអាសយដ្ឋានប្រាប់អ្នកច្រើន — ប្រសិនបើអ្នកដឹងកន្លែងមើល។',
        ),
      ],
      learn: [
        [
          '🔒',
          'HTTPS',
          t(
            'The S means Secure: data between you and the site is encrypted.',
            'S មានន័យថាសុវត្ថិភាព៖ ទិន្នន័យរវាងអ្នក និងគេហទំព័រត្រូវបានអ៊ិនគ្រីប។',
          ),
          'secure',
        ],
        [
          '📜',
          t('Certificate', 'វិញ្ញាបនបត្រ'),
          t(
            'Proves the site really owns its domain name.',
            'បញ្ជាក់ថាគេហទំព័រពិតជាម្ចាស់ឈ្មោះដែនរបស់វា។',
          ),
          'certificate',
        ],
        [
          '⚠️',
          t('Padlock ≠ honest', 'សោ ≠ ស្មោះត្រង់'),
          t(
            'Scam sites can have HTTPS too. Always check the domain name!',
            'គេហទំព័របោកប្រាស់ក៏អាចមាន HTTPS ដែរ។ ពិនិត្យឈ្មោះដែនជានិច្ច!',
          ),
        ],
        [
          '🚫',
          t('Browser warnings', 'ការព្រមានកម្មវិធីរុករក'),
          t(
            '“Your connection is not private” — go back, do not continue.',
            '«ការតភ្ជាប់របស់អ្នកមិនឯកជន» — ត្រឡប់ក្រោយ កុំបន្ត។',
          ),
        ],
      ],
      see: [
        t(
          '🔒 https://ababank.com → secure AND the right name ✅\n🔒 https://ababank-verify.top → secure connection to the WRONG site ❌\n⚠️ http://login-page.com → not encrypted ❌',
          '🔒 https://ababank.com → សុវត្ថិភាព និងឈ្មោះត្រឹមត្រូវ ✅\n🔒 https://ababank-verify.top → ការតភ្ជាប់សុវត្ថិភាពទៅគេហទំព័រខុស ❌\n⚠️ http://login-page.com → មិនបានអ៊ិនគ្រីប ❌',
        ),
        t('Check both: the 🔒 AND the domain.', 'ពិនិត្យទាំងពីរ៖ 🔒 និងដែន។'),
      ],
      words: [
        ['secure', 'សុវត្ថិភាព', '🔒'],
        ['warning', 'ការព្រមាន', '⚠️'],
        ['certificate', 'វិញ្ញាបនបត្រ', '📜'],
        ['trust', 'ទុកចិត្ត', '🤝'],
      ],
      play: [
        mc(t('What does the S in HTTPS stand for?', 'តើ S ក្នុង HTTPS មកពីអ្វី?'), 'Secure', [
          'Super',
          'Simple',
          'Speed',
        ]),
        mc(
          t('Which address is encrypted?', 'តើអាសយដ្ឋានណាត្រូវបានអ៊ិនគ្រីប?'),
          'https://moeys.gov.kh',
          ['http://moeys.gov.kh'],
        ),
        tf(
          t(
            'A padlock 🔒 means the website is always honest.',
            'សោ 🔒 មានន័យថាគេហទំព័រតែងតែស្មោះត្រង់។',
          ),
          false,
          {
            explanation: t(
              'It only means the connection is encrypted. Scam sites can have it too.',
              'វាគ្រាន់តែមានន័យថាការតភ្ជាប់ត្រូវបានអ៊ិនគ្រីប។ គេហទំព័របោកប្រាស់ក៏អាចមានដែរ។',
            ),
          },
        ),
        mc(
          t(
            'Your browser says “Your connection is not private”. You…',
            'កម្មវិធីរុករករបស់អ្នកនិយាយ «ការតភ្ជាប់របស់អ្នកមិនឯកជន»។ អ្នក…',
          ),
          t('go back and do not enter anything', 'ត្រឡប់ក្រោយ ហើយមិនបញ្ចូលអ្វីទេ'),
          [
            t('click “continue anyway” and log in', 'ចុច «បន្តទោះយ៉ាងណា» ហើយចូល'),
            t('type your card number', 'វាយលេខកាតរបស់អ្នក'),
          ],
        ),
        mc(
          t(
            'Is this link safe to log in to Facebook?',
            'តើតំណនេះមានសុវត្ថិភាពក្នុងការចូល Facebook ទេ?',
          ),
          t('No — the real domain is login-help.top', 'ទេ — ដែនពិតគឺ login-help.top'),
          [t('Yes — it says facebook', 'បាទ — វានិយាយ facebook')],
          { data: urlMock('https://facebook.com.login-help.top/') },
        ),
        tf(
          t(
            'Never type passwords on an http:// (no S) page.',
            'កុំវាយពាក្យសម្ងាត់លើទំព័រ http:// (គ្មាន S)។',
          ),
          true,
        ),
        mc(
          t('What does a website certificate prove?', 'តើវិញ្ញាបនបត្រគេហទំព័របញ្ជាក់អ្វី?'),
          t('The site owns that domain name', 'គេហទំព័រជាម្ចាស់ឈ្មោះដែននោះ'),
          [t('The site is fun', 'គេហទំព័រសប្បាយ'), t('The site is free', 'គេហទំព័រឥតគិតថ្លៃ')],
        ),
        tf(
          t(
            'Typing the address yourself is safer than clicking a link in a message.',
            'ការវាយអាសយដ្ឋានខ្លួនឯងមានសុវត្ថិភាពជាងការចុចតំណក្នុងសារ។',
          ),
          true,
        ),
      ],
      challenge: [
        sortInto(
          t('Safe to log in or not?', 'មានសុវត្ថិភាពក្នុងការចូល ឬមិនមែន?'),
          [
            ['ok', t('OK', 'យល់ព្រម'), '✅'],
            ['no', t('Do not log in', 'កុំចូល'), '🚫'],
          ],
          [
            ['https://accounts.google.com', 'ok'],
            ['https://www.facebook.com', 'ok'],
            ['https://ababank.com', 'ok'],
            ['http://bank-login.com', 'no'],
            ['https://g00gle-account.top', 'no'],
            ['https://facebook.verify-id.xyz', 'no'],
          ],
        ),
        mc(
          t(
            'In “https://shop.example.com/pay”, what is the real domain?',
            'ក្នុង «https://shop.example.com/pay» តើដែនពិតគឺអ្វី?',
          ),
          'example.com',
          ['shop', 'pay', 'https'],
        ),
        mc(
          t(
            'In “https://paypal.com.secure-login.net”, what is the real domain?',
            'ក្នុង «https://paypal.com.secure-login.net» តើដែនពិតគឺអ្វី?',
          ),
          'secure-login.net',
          ['paypal.com', 'https', 'login'],
        ),
        order(
          t(
            'Order the checks before entering a password.',
            'តម្រៀបការពិនិត្យមុនបញ្ចូលពាក្យសម្ងាត់។',
          ),
          [
            t('Did I type the address myself?', 'តើខ្ញុំបានវាយអាសយដ្ឋានខ្លួនឯងទេ?'),
            t('Is there https and 🔒?', 'តើមាន https និង 🔒 ទេ?'),
            t('Is the domain exactly right?', 'តើដែនត្រឹមត្រូវពិតប្រាកដទេ?'),
            t('No browser warnings?', 'គ្មានការព្រមានកម្មវិធីរុករក?'),
            t('Then log in', 'បន្ទាប់មកចូល'),
          ],
        ),
        match(t('Match what you see to what it means.', 'ផ្គូផ្គងអ្វីដែលអ្នកឃើញជាមួយអត្ថន័យ។'), [
          ['🔒 https', t('Encrypted connection', 'ការតភ្ជាប់អ៊ិនគ្រីប')],
          ['http', t('Not encrypted', 'មិនបានអ៊ិនគ្រីប')],
          [
            t('Red warning page', 'ទំព័រព្រមានក្រហម'),
            t('Something is wrong — leave', 'មានអ្វីខុស — ចាកចេញ'),
          ],
          [t('Strange domain', 'ដែនចម្លែក'), t('Possible scam', 'អាចជាការបោកប្រាស់')],
        ]),
        tf(
          t(
            'Bookmarking your bank’s real site helps you avoid fake ones.',
            'ការចំណាំគេហទំព័រពិតរបស់ធនាគារជួយអ្នកជៀសវាងគេហទំព័រក្លែងក្លាយ។',
          ),
          true,
        ),
        num(
          t(
            'Of 10 phishing sites found last month, 8 had a padlock. How many did NOT?',
            'ក្នុងចំណោមគេហទំព័រ phishing 10 ដែលរកឃើញខែមុន 8 មានសោ។ តើប៉ុន្មានគ្មាន?',
          ),
          2,
        ),
        buildSentence(t('Build the rule.', 'បង្កើតច្បាប់។'), 'Check the lock and the name.', {
          say: 'Check the lock and the name.',
        }),
      ],
      games: [
        catchIt(
          t('Catch the SAFE addresses!', 'ចាប់អាសយដ្ឋានសុវត្ថិភាព!'),
          ['https://google.com', 'https://wikipedia.org', 'https://moeys.gov.kh'],
          [
            'http://bank-login.com',
            'https://g00gle.top',
            'https://free-gift.xyz',
            'http://pay-now.biz',
          ],
          { speed: 'normal' },
        ),
        memory(t('Match the URL part to its name.', 'ផ្គូផ្គងផ្នែក URL ជាមួយឈ្មោះ។'), [
          ['https://', t('Protocol', 'ពិធីការ')],
          ['ababank.com', t('Domain', 'ដែន')],
          ['/login', t('Path', 'ផ្លូវ')],
          ['🔒', t('Encrypted', 'បានអ៊ិនគ្រីប')],
        ]),
      ],
      reward: t(
        'You can read any address bar like a security expert! 🔒',
        'អ្នកអាចអានរបារអាសយដ្ឋានណាមួយដូចអ្នកជំនាញសុវត្ថិភាព! 🔒',
      ),
    },
  ),

  // 11 ────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'public-wifi-and-vpn',
    '☕',
    t('Public Wi-Fi & VPNs', 'Wi-Fi សាធារណៈ និង VPN'),
    t(
      'Stay safe on café, hotel and airport Wi-Fi.',
      'រក្សាសុវត្ថិភាពលើ Wi-Fi ហាងកាហ្វេ សណ្ឋាគារ និងព្រលានយន្តហោះ។',
    ),
    {
      intro: [
        '☕',
        t(
          'Free café Wi-Fi is great for homework — but anyone can share it with you.',
          'Wi-Fi ហាងកាហ្វេឥតគិតថ្លៃល្អសម្រាប់កិច្ចការផ្ទះ — តែនរណាក៏អាចចែករំលែកវាជាមួយអ្នក។',
        ),
      ],
      learn: [
        [
          '📶',
          t('Open networks', 'បណ្តាញបើកចំហ'),
          t(
            'No password = anyone nearby can join and might watch traffic.',
            'គ្មានពាក្យសម្ងាត់ = នរណាម្នាក់នៅក្បែរអាចចូល ហើយអាចមើលចរាចរណ៍។',
          ),
          'public',
        ],
        [
          '👯',
          t('Evil twin', 'កូនភ្លោះអាក្រក់'),
          t(
            'A fake hotspot with a real-looking name, like “Cafe_Free_WiFi”.',
            'Hotspot ក្លែងក្លាយមានឈ្មោះមើលទៅពិត ដូចជា «Cafe_Free_WiFi»។',
          ),
        ],
        [
          '🚇',
          'VPN',
          t(
            'An encrypted tunnel for all your traffic on untrusted Wi-Fi.',
            'ផ្លូវរូងអ៊ិនគ្រីបសម្រាប់ចរាចរណ៍ទាំងអស់របស់អ្នកលើ Wi-Fi មិនទុកចិត្ត។',
          ),
          'tunnel',
        ],
        [
          '📱',
          t('Use mobile data', 'ប្រើទិន្នន័យទូរស័ព្ទ'),
          t(
            'For banking, your own 4G/5G is safer than public Wi-Fi.',
            'សម្រាប់ធនាគារ 4G/5G ផ្ទាល់ខ្លួនមានសុវត្ថិភាពជាង Wi-Fi សាធារណៈ។',
          ),
        ],
      ],
      see: [
        t(
          'Café Wi-Fi list:\n“BrownCoffee_Guest” (ask staff ✅)\n“BrownCoffee_FREE” (who made this? ⚠️)',
          'បញ្ជី Wi-Fi ហាងកាហ្វេ៖\n«BrownCoffee_Guest» (សួរបុគ្គលិក ✅)\n«BrownCoffee_FREE» (អ្នកណាបង្កើតវា? ⚠️)',
        ),
        t('Ask staff for the real network name.', 'សួរបុគ្គលិកសម្រាប់ឈ្មោះបណ្តាញពិត។'),
      ],
      words: [
        ['hotspot', 'ចំណុចភ្ជាប់', '📶'],
        ['tunnel', 'ផ្លូវរូង', '🚇'],
        ['guest', 'ភ្ញៀវ'],
        ['VPN', 'បណ្តាញឯកជននិម្មិត'],
      ],
      play: [
        mc(
          t(
            'Which is SAFEST for online banking in a café?',
            'តើមួយណាមានសុវត្ថិភាពបំផុតសម្រាប់ធនាគារអនឡាញក្នុងហាងកាហ្វេ?',
          ),
          t('Your own mobile data', 'ទិន្នន័យទូរស័ព្ទផ្ទាល់ខ្លួន'),
          [
            t('Open café Wi-Fi', 'Wi-Fi ហាងកាហ្វេបើកចំហ'),
            t('A stranger’s hotspot', 'Hotspot មនុស្សចម្លែក'),
          ],
        ),
        mc(
          t('What does a VPN do?', 'តើ VPN ធ្វើអ្វី?'),
          t('Encrypts your traffic in a tunnel', 'អ៊ិនគ្រីបចរាចរណ៍របស់អ្នកក្នុងផ្លូវរូង'),
          [
            t('Makes the battery last longer', 'ធ្វើឱ្យថ្មប្រើបានយូរ'),
            t('Removes viruses', 'លុបមេរោគ'),
          ],
        ),
        tf(
          t(
            'An “evil twin” is a fake Wi-Fi hotspot.',
            '«កូនភ្លោះអាក្រក់» គឺជា hotspot Wi-Fi ក្លែងក្លាយ។',
          ),
          true,
        ),
        mc(
          t(
            'How do you find the café’s REAL Wi-Fi name?',
            'តើអ្នករកឈ្មោះ Wi-Fi ពិតរបស់ហាងកាហ្វេដោយរបៀបណា?',
          ),
          t('Ask the staff', 'សួរបុគ្គលិក'),
          [
            t('Pick the strongest signal', 'ជ្រើសរើសសញ្ញាខ្លាំងបំផុត'),
            t('Pick any free one', 'ជ្រើសរើសមួយឥតគិតថ្លៃណាក៏បាន'),
          ],
        ),
        tf(
          t(
            'Your phone should auto-join every open Wi-Fi it finds.',
            'ទូរស័ព្ទរបស់អ្នកគួរភ្ជាប់ដោយស្វ័យប្រវត្តិទៅ Wi-Fi បើកចំហគ្រប់មួយដែលវារកឃើញ។',
          ),
          false,
        ),
        mc(
          t(
            'On public Wi-Fi, which is lowest risk?',
            'លើ Wi-Fi សាធារណៈ តើមួយណាមានហានិភ័យទាបបំផុត?',
          ),
          t('Reading the news', 'អានព័ត៌មាន'),
          [
            t('Paying with your card', 'បង់ប្រាក់ដោយកាតរបស់អ្នក'),
            t('Logging into your bank', 'ចូលធនាគាររបស់អ្នក'),
          ],
        ),
        tf(
          t(
            'HTTPS sites still protect your data on public Wi-Fi.',
            'គេហទំព័រ HTTPS នៅតែការពារទិន្នន័យរបស់អ្នកលើ Wi-Fi សាធារណៈ។',
          ),
          true,
        ),
        mc(
          t('After using public Wi-Fi, you should…', 'ក្រោយប្រើ Wi-Fi សាធារណៈ អ្នកគួរ…'),
          t('“Forget” the network', '«បំភ្លេច» បណ្តាញ'),
          [
            t('Post its password online', 'បង្ហោះពាក្យសម្ងាត់របស់វាលើអ៊ីនធឺណិត'),
            t('Keep auto-join on', 'រក្សាការភ្ជាប់ស្វ័យប្រវត្តិ'),
          ],
        ),
      ],
      challenge: [
        sortInto(
          t(
            'OK on public Wi-Fi, or wait for a safer connection?',
            'អាចធ្វើលើ Wi-Fi សាធារណៈ ឬរង់ចាំការតភ្ជាប់សុវត្ថិភាពជាង?',
          ),
          [
            ['ok', t('OK', 'យល់ព្រម'), '👍'],
            ['wait', t('Wait / use data', 'រង់ចាំ / ប្រើទិន្នន័យ'), '⏳'],
          ],
          [
            [t('Watching a lesson video', 'មើលវីដេអូមេរៀន'), 'ok'],
            [t('Checking a map', 'ពិនិត្យផែនទី'), 'ok'],
            [t('Reading Wikipedia', 'អាន Wikipedia'), 'ok'],
            [t('Bank transfer', 'ផ្ទេរប្រាក់ធនាគារ'), 'wait'],
            [t('Online shopping with a card', 'ទិញទំនិញអនឡាញដោយកាត'), 'wait'],
            [t('Changing your main password', 'ប្តូរពាក្យសម្ងាត់មេ'), 'wait'],
          ],
        ),
        order(
          t(
            'Order the safe way to use café Wi-Fi.',
            'តម្រៀបវិធីសុវត្ថិភាពក្នុងការប្រើ Wi-Fi ហាងកាហ្វេ។',
          ),
          [
            t('Ask staff for the network name', 'សួរបុគ្គលិកពីឈ្មោះបណ្តាញ'),
            t('Join that network', 'ភ្ជាប់បណ្តាញនោះ'),
            t('Turn on a trusted VPN', 'បើក VPN ដែលទុកចិត្ត'),
            t('Do only low-risk tasks', 'ធ្វើតែការងារហានិភ័យទាប'),
            t('Forget the network when you leave', 'បំភ្លេចបណ្តាញពេលអ្នកចាកចេញ'),
          ],
        ),
        mc(
          t(
            'Two networks: “Airport_WiFi” and “Airport_WiFi_Free_Fast”. Which is more suspicious?',
            'បណ្តាញពីរ៖ «Airport_WiFi» និង «Airport_WiFi_Free_Fast»។ តើមួយណាគួរឱ្យសង្ស័យជាង?',
          ),
          '“Airport_WiFi_Free_Fast”',
          ['“Airport_WiFi”'],
        ),
        mc(
          t('Which VPN is a bad choice?', 'តើ VPN ណាជាជម្រើសអាក្រក់?'),
          t(
            'An unknown free VPN with lots of ads',
            'VPN ឥតគិតថ្លៃមិនស្គាល់មានការផ្សាយពាណិជ្ជកម្មច្រើន',
          ),
          [
            t('Your school’s or company’s VPN', 'VPN សាលា ឬក្រុមហ៊ុនរបស់អ្នក'),
            t('A well-known, reviewed VPN', 'VPN ល្បី មានការវាយតម្លៃ'),
          ],
          {
            explanation: t(
              'Some free VPNs sell your data — the opposite of privacy.',
              'VPN ឥតគិតថ្លៃខ្លះលក់ទិន្នន័យរបស់អ្នក — ផ្ទុយពីឯកជនភាព។',
            ),
          },
        ),
        tf(
          t(
            'Sharing your phone’s hotspot with a password is safer than an open café network.',
            'ការចែករំលែក hotspot ទូរស័ព្ទមានពាក្យសម្ងាត់មានសុវត្ថិភាពជាងបណ្តាញហាងកាហ្វេបើកចំហ។',
          ),
          true,
        ),
        match(t('Match the risk to the defence.', 'ផ្គូផ្គងហានិភ័យជាមួយការការពារ។'), [
          [t('Evil twin', 'កូនភ្លោះអាក្រក់'), t('Ask staff for the name', 'សួរបុគ្គលិកពីឈ្មោះ')],
          [t('Someone watching traffic', 'នរណាម្នាក់មើលចរាចរណ៍'), 'VPN'],
          [t('Auto-join', 'ភ្ជាប់ស្វ័យប្រវត្តិ'), t('Forget network', 'បំភ្លេចបណ្តាញ')],
          [t('Banking risk', 'ហានិភ័យធនាគារ'), t('Use mobile data', 'ប្រើទិន្នន័យទូរស័ព្ទ')],
        ]),
        num(
          t(
            'A VPN slows a 40 Mbps connection by a quarter. New speed in Mbps?',
            'VPN បន្ថយការតភ្ជាប់ 40 Mbps មួយភាគបួន។ ល្បឿនថ្មីជា Mbps?',
          ),
          30,
        ),
        buildSentence(
          t('Build the rule.', 'បង្កើតច្បាប់។'),
          'Do your banking on a network you trust.',
          { say: 'Do your banking on a network you trust.' },
        ),
      ],
      games: [
        robot(
          t(
            'Travel through the VPN tunnel to the server — avoid the evil twins!',
            'ធ្វើដំណើរតាមផ្លូវរូង VPN ទៅម៉ាស៊ីនមេ — ជៀសវាងកូនភ្លោះអាក្រក់!',
          ),
          ['S#...', '.#.#.', '...#G'],
          { goalIcon: '🗄️' },
        ),
        catchIt(
          t('Catch the SAFE Wi-Fi habits!', 'ចាប់ទម្លាប់ Wi-Fi សុវត្ថិភាព!'),
          [
            t('Ask staff', 'សួរបុគ្គលិក'),
            t('Use VPN', 'ប្រើ VPN'),
            t('Forget network', 'បំភ្លេចបណ្តាញ'),
            t('Mobile data for bank', 'ទិន្នន័យទូរស័ព្ទសម្រាប់ធនាគារ'),
          ],
          [
            t('Auto-join all', 'ភ្ជាប់ស្វ័យប្រវត្តិទាំងអស់'),
            t('Bank on open Wi-Fi', 'ធនាគារលើ Wi-Fi បើកចំហ'),
            t('Unknown free VPN', 'VPN ឥតគិតថ្លៃមិនស្គាល់'),
          ],
          { speed: 'normal' },
        ),
      ],
      reward: t('Free Wi-Fi, safely used. ☕🛡️', 'Wi-Fi ឥតគិតថ្លៃ ប្រើដោយសុវត្ថិភាព។ ☕🛡️'),
    },
  ),

  // 12 ────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'backups',
    '💾',
    t('Backups: Your Safety Net', 'ការបម្រុង៖ សំណាញ់សុវត្ថិភាពរបស់អ្នក'),
    t(
      'Never lose your work — even to ransomware.',
      'មិនដែលបាត់ការងាររបស់អ្នក — សូម្បីតែ ransomware។',
    ),
    {
      intro: [
        '💾',
        t(
          'Phones get stolen, laptops break, ransomware strikes. A backup turns disaster into a small problem.',
          'ទូរស័ព្ទត្រូវលួច កុំព្យូទ័រខូច ransomware វាយប្រហារ។ ការបម្រុងប្រែគ្រោះមហន្តរាយទៅជាបញ្ហាតូច។',
        ),
      ],
      learn: [
        [
          '3️⃣',
          t('Rule 3-2-1', 'ច្បាប់ 3-2-1'),
          t(
            '3 copies, on 2 kinds of storage, 1 kept somewhere else.',
            'ច្បាប់ចម្លង 3 លើការផ្ទុក 2 ប្រភេទ 1 រក្សាទុកកន្លែងផ្សេង។',
          ),
          'copy',
        ],
        [
          '🔌',
          t('Offline copy', 'ច្បាប់ចម្លងក្រៅបណ្តាញ'),
          t(
            'A drive you unplug after backing up — ransomware cannot reach it.',
            'ឧបករណ៍ផ្ទុកដែលអ្នកដកក្រោយការបម្រុង — ransomware មិនអាចទៅដល់។',
          ),
          'offline',
        ],
        [
          '📅',
          t('Schedule', 'កាលវិភាគ'),
          t(
            'Back up automatically, e.g. every day or week.',
            'បម្រុងដោយស្វ័យប្រវត្តិ ឧ. រាល់ថ្ងៃ ឬសប្តាហ៍។',
          ),
          'schedule',
        ],
        [
          '🧪',
          t('Test restore', 'សាកល្បងស្តារ'),
          t(
            'A backup only counts if you can get the files back. Try it!',
            'ការបម្រុងរាប់តែប្រសិនបើអ្នកអាចយកឯកសារមកវិញ។ សាកវា!',
          ),
          'restore',
        ],
      ],
      see: [
        t(
          '📁 Laptop (copy 1)\n☁️ Google Drive (copy 2, different storage, another place)\n🔌 USB drive in a drawer (copy 3, offline)',
          '📁 កុំព្យូទ័រយួរដៃ (ច្បាប់ចម្លង 1)\n☁️ Google Drive (ច្បាប់ចម្លង 2 ការផ្ទុកផ្សេង កន្លែងផ្សេង)\n🔌 USB ក្នុងថត (ច្បាប់ចម្លង 3 ក្រៅបណ្តាញ)',
        ),
        t('Lose any one — you still have two.', 'បាត់មួយណាក៏ដោយ — អ្នកនៅតែមានពីរ។'),
      ],
      words: [
        ['backup', 'ការបម្រុង', '💾'],
        ['restore', 'ស្តារ', '♻️'],
        ['copy', 'ច្បាប់ចម្លង', '📄'],
        ['offline', 'ក្រៅបណ្តាញ', '🔌'],
      ],
      play: [
        mc(
          t('What does the 3 in “3-2-1” mean?', 'តើ 3 ក្នុង «3-2-1» មានន័យអ្វី?'),
          t('3 copies of your data', 'ច្បាប់ចម្លង 3 នៃទិន្នន័យរបស់អ្នក'),
          [t('3 passwords', 'ពាក្យសម្ងាត់ 3'), t('3 computers', 'កុំព្យូទ័រ 3')],
        ),
        mc(
          t('What does the 1 in “3-2-1” mean?', 'តើ 1 ក្នុង «3-2-1» មានន័យអ្វី?'),
          t('1 copy kept somewhere else', 'ច្បាប់ចម្លង 1 រក្សាទុកកន្លែងផ្សេង'),
          [t('1 file only', 'ឯកសារតែ 1'), t('Back up once a year', 'បម្រុងម្តងក្នុងមួយឆ្នាំ')],
        ),
        tf(
          t(
            'An offline backup is safe from ransomware on your computer.',
            'ការបម្រុងក្រៅបណ្តាញមានសុវត្ថិភាពពី ransomware លើកុំព្យូទ័ររបស់អ្នក។',
          ),
          true,
        ),
        tf(
          t(
            'A backup you never tested is guaranteed to work.',
            'ការបម្រុងដែលអ្នកមិនដែលសាកល្បងត្រូវបានធានាថាដំណើរការ។',
          ),
          false,
        ),
        mc(
          t('Which is the BEST backup plan?', 'តើផែនការបម្រុងណាល្អបំផុត?'),
          t(
            'Automatic cloud backup + a USB copy at home',
            'ការបម្រុងពពកស្វ័យប្រវត្តិ + ច្បាប់ចម្លង USB នៅផ្ទះ',
          ),
          [
            t('No backup', 'គ្មានការបម្រុង'),
            t('A copy in the same folder', 'ច្បាប់ចម្លងក្នុងថតដូចគ្នា'),
          ],
        ),
        mc(
          t(
            'Copying a file into the SAME laptop folder protects you from…',
            'ការចម្លងឯកសារទៅថតកុំព្យូទ័រដូចគ្នាការពារអ្នកពី…',
          ),
          t(
            'accidental deleting only — not a broken or stolen laptop',
            'ការលុបដោយចៃដន្យតែប៉ុណ្ណោះ — មិនមែនកុំព្យូទ័រខូច ឬត្រូវលួច',
          ),
          [t('everything', 'អ្វីៗទាំងអស់'), t('nothing at all', 'គ្មានអ្វីសោះ')],
        ),
        tf(
          t(
            'Phones can back up photos automatically to the cloud.',
            'ទូរស័ព្ទអាចបម្រុងរូបថតដោយស្វ័យប្រវត្តិទៅពពក។',
          ),
          true,
        ),
        mc(
          t('“Restore” means…', '«ស្តារ» មានន័យថា…'),
          t('getting files back from a backup', 'យកឯកសារមកវិញពីការបម្រុង'),
          [t('deleting the backup', 'លុបការបម្រុង'), t('buying more storage', 'ទិញការផ្ទុកបន្ថែម')],
        ),
      ],
      challenge: [
        order(t('Order a good backup routine.', 'តម្រៀបទម្លាប់បម្រុងល្អ។'), [
          t('Choose what to back up', 'ជ្រើសរើសអ្វីដែលត្រូវបម្រុង'),
          t('Turn on automatic backup', 'បើកការបម្រុងស្វ័យប្រវត្តិ'),
          t('Make an offline copy', 'បង្កើតច្បាប់ចម្លងក្រៅបណ្តាញ'),
          t('Unplug the offline drive', 'ដកឧបករណ៍ផ្ទុកក្រៅបណ្តាញ'),
          t('Test a restore', 'សាកល្បងការស្តារ'),
        ]),
        sortInto(
          t('Does it follow 3-2-1?', 'តើវាអនុវត្តតាម 3-2-1 ទេ?'),
          [
            ['y', t('Yes', 'បាទ'), '✅'],
            ['n', t('No', 'ទេ'), '❌'],
          ],
          [
            [t('Laptop + cloud + USB at grandma’s', 'កុំព្យូទ័រ + ពពក + USB នៅផ្ទះយាយ'), 'y'],
            [t('PC + external HDD + cloud', 'កុំព្យូទ័រ + HDD ខាងក្រៅ + ពពក'), 'y'],
            [
              t(
                'Phone + Google Photos + laptop copy',
                'ទូរស័ព្ទ + Google Photos + ច្បាប់ចម្លងកុំព្យូទ័រ',
              ),
              'y',
            ],
            [t('Only on the laptop', 'តែលើកុំព្យូទ័រ'), 'n'],
            [t('Two folders on one laptop', 'ថតពីរលើកុំព្យូទ័រមួយ'), 'n'],
            [t('Laptop + USB always plugged in', 'កុំព្យូទ័រ + USB ដោតជានិច្ច'), 'n'],
          ],
        ),
        num(
          t(
            'You back up every 7 days. What is the most work (in days) you could lose?',
            'អ្នកបម្រុងរាល់ 7 ថ្ងៃ។ តើការងារច្រើនបំផុត (ជាថ្ងៃ) ដែលអ្នកអាចបាត់?',
          ),
          7,
        ),
        num(
          t(
            'Your photos are 12 GB. 3 copies in total. How many GB of storage in all?',
            'រូបថតរបស់អ្នក 12 GB។ ច្បាប់ចម្លងសរុប 3។ តើការផ្ទុកសរុបប៉ុន្មាន GB?',
          ),
          36,
        ),
        mc(
          t(
            'Ransomware locked your laptop. You have a clean offline backup. Best plan?',
            'Ransomware បានចាក់សោកុំព្យូទ័ររបស់អ្នក។ អ្នកមានការបម្រុងក្រៅបណ្តាញស្អាត។ ផែនការល្អបំផុត?',
          ),
          t(
            'Wipe and reinstall, then restore from the backup',
            'លុប និងដំឡើងឡើងវិញ រួចស្តារពីការបម្រុង',
          ),
          [
            t('Pay the attackers', 'បង់ប្រាក់ឱ្យអ្នកវាយប្រហារ'),
            t('Plug the backup into the infected laptop', 'ដោតការបម្រុងចូលកុំព្យូទ័រដែលឆ្លង'),
          ],
        ),
        match(
          t(
            'Match the disaster to how a backup helps.',
            'ផ្គូផ្គងគ្រោះមហន្តរាយជាមួយរបៀបដែលការបម្រុងជួយ។',
          ),
          [
            [
              t('Stolen phone', 'ទូរស័ព្ទត្រូវលួច'),
              t('Photos are in the cloud', 'រូបថតនៅក្នុងពពក'),
            ],
            [
              t('Broken laptop', 'កុំព្យូទ័រខូច'),
              t('Files on a USB copy', 'ឯកសារលើច្បាប់ចម្លង USB'),
            ],
            ['Ransomware', t('Offline copy is untouched', 'ច្បាប់ចម្លងក្រៅបណ្តាញមិនត្រូវប៉ះ')],
            [
              t('Deleted by mistake', 'លុបដោយច្រឡំ'),
              t('Restore yesterday’s version', 'ស្តារកំណែម្សិលមិញ'),
            ],
          ],
        ),
        tf(
          t(
            'Businesses should practise restoring backups before a real disaster.',
            'អាជីវកម្មគួរអនុវត្តការស្តារការបម្រុងមុនគ្រោះមហន្តរាយពិត។',
          ),
          true,
        ),
        buildSentence(
          t('Build the rule.', 'បង្កើតច្បាប់។'),
          'Keep three copies and test your backup.',
          { say: 'Keep three copies, and test your backup.' },
        ),
      ],
      games: [
        memory(t('Match each part of 3-2-1.', 'ផ្គូផ្គងផ្នែកនីមួយៗនៃ 3-2-1។'), [
          ['3', t('Copies', 'ច្បាប់ចម្លង')],
          ['2', t('Kinds of storage', 'ប្រភេទការផ្ទុក')],
          ['1', t('Somewhere else', 'កន្លែងផ្សេង')],
          ['🧪', t('Test restore', 'សាកល្បងស្តារ')],
        ]),
        robot(
          t(
            'Carry your files to all three backup places 💾 then home!',
            'យកឯកសាររបស់អ្នកទៅកន្លែងបម្រុងទាំងបី 💾 រួចទៅផ្ទះ!',
          ),
          ['S.*..', '##.#*', '*...G'],
          { goalIcon: '🏠', collectIcon: '💾' },
        ),
      ],
      reward: t(
        'With backups, nothing can take your work away. 💾',
        'ជាមួយការបម្រុង គ្មានអ្វីអាចដកការងាររបស់អ្នកចេញ។ 💾',
      ),
    },
  ),

  // 13 ────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'mobile-security',
    '📱',
    t('Phone Security', 'សុវត្ថិភាពទូរស័ព្ទ'),
    t('Lock, find and protect your phone.', 'ចាក់សោ ស្វែងរក និងការពារទូរស័ព្ទរបស់អ្នក។'),
    {
      intro: [
        '📱',
        t(
          'Your phone holds your chats, photos, bank and school accounts. Protect it like your wallet!',
          'ទូរស័ព្ទរបស់អ្នកផ្ទុកការជជែក រូបថត គណនីធនាគារ និងសាលា។ ការពារវាដូចកាបូបរបស់អ្នក!',
        ),
      ],
      learn: [
        [
          '🔒',
          t('Screen lock', 'ការចាក់សោអេក្រង់'),
          t(
            'Use a 6-digit PIN or longer, plus fingerprint or face.',
            'ប្រើ PIN 6 ខ្ទង់ ឬវែងជាង បូកស្នាមម្រាមដៃ ឬមុខ។',
          ),
          'lock',
        ],
        [
          '📍',
          t('Find my device', 'ស្វែងរកឧបករណ៍របស់ខ្ញុំ'),
          t(
            'Locate, lock or erase a lost phone from another device.',
            'កំណត់ទីតាំង ចាក់សោ ឬលុបទូរស័ព្ទដែលបាត់ពីឧបករណ៍ផ្សេង។',
          ),
          'locate',
        ],
        [
          '💳',
          t('SIM PIN', 'PIN SIM'),
          t(
            'Stops a thief using your SIM to receive your SMS codes.',
            'បញ្ឈប់ចោរពីការប្រើ SIM របស់អ្នកដើម្បីទទួលលេខកូដ SMS។',
          ),
        ],
        [
          '🔔',
          t('Lock-screen privacy', 'ឯកជនភាពអេក្រង់ចាក់សោ'),
          t(
            'Hide message previews so codes do not show on a locked screen.',
            'លាក់ការមើលសារជាមុន ដើម្បីកុំឱ្យលេខកូដបង្ហាញលើអេក្រង់ចាក់សោ។',
          ),
        ],
      ],
      see: [
        t(
          'Lost phone? On a friend’s device:\n1. Open Find My Device\n2. Ring it 🔔\n3. Lock it 🔒\n4. Erase it if it is gone for good 🧹',
          'បាត់ទូរស័ព្ទ? លើឧបករណ៍មិត្ត៖\n1. បើក Find My Device\n2. រោទ៍វា 🔔\n3. ចាក់សោវា 🔒\n4. លុបវាប្រសិនបើវាបាត់ជារៀងរហូត 🧹',
        ),
        t('Set this up BEFORE you lose your phone.', 'រៀបចំនេះមុនពេលអ្នកបាត់ទូរស័ព្ទ។'),
      ],
      words: [
        ['phone', 'ទូរស័ព្ទ', '📱'],
        ['lock', 'ចាក់សោ', '🔒'],
        ['erase', 'លុបចោល', '🧹'],
        ['locate', 'កំណត់ទីតាំង', '📍'],
      ],
      play: [
        mc(
          t('Which screen lock is STRONGEST?', 'តើការចាក់សោអេក្រង់ណាខ្លាំងបំផុត?'),
          t('6-digit PIN + fingerprint', 'PIN 6 ខ្ទង់ + ស្នាមម្រាមដៃ'),
          [t('No lock', 'គ្មានការចាក់សោ'), t('Swipe to open', 'អូសដើម្បីបើក'), '1234'],
        ),
        tf(
          t(
            '“Find my device” can erase a lost phone remotely.',
            '«Find my device» អាចលុបទូរស័ព្ទដែលបាត់ពីចម្ងាយ។',
          ),
          true,
        ),
        mc(
          t(
            'Why hide message previews on the lock screen?',
            'ហេតុអ្វីលាក់ការមើលសារជាមុនលើអេក្រង់ចាក់សោ?',
          ),
          t(
            'So others cannot read your codes and chats',
            'ដើម្បីកុំឱ្យអ្នកដទៃអានលេខកូដ និងការជជែករបស់អ្នក',
          ),
          [
            t('To save battery', 'ដើម្បីសន្សំថ្ម'),
            t('To make it brighter', 'ដើម្បីធ្វើឱ្យភ្លឺជាង'),
          ],
        ),
        tf(
          t(
            'A pattern lock drawn in an “L” shape is very hard to guess.',
            'ការចាក់សោលំនាំគូររាង «L» ពិបាកទាយណាស់។',
          ),
          false,
          {
            explanation: t(
              'Simple shapes are easy to guess or see on the screen smudges.',
              'រាងសាមញ្ញងាយទាយ ឬមើលឃើញលើស្នាមប្រឡាក់អេក្រង់។',
            ),
          },
        ),
        mc(
          t(
            'Someone asks to borrow your unlocked phone “to make a call”. Safest?',
            'នរណាម្នាក់សុំខ្ចីទូរស័ព្ទមិនចាក់សោរបស់អ្នក «ដើម្បីហៅ»។ មានសុវត្ថិភាពបំផុត?',
          ),
          t('Dial the number for them and keep the phone', 'ចុចលេខឱ្យគេ ហើយកាន់ទូរស័ព្ទ'),
          [
            t('Give it and walk away', 'ឱ្យវា ហើយដើរចេញ'),
            t('Tell them your PIN', 'ប្រាប់គេពី PIN របស់អ្នក'),
          ],
        ),
        mc(
          t('What does a SIM PIN protect?', 'តើ PIN SIM ការពារអ្វី?'),
          t(
            'Your SIM card and the SMS codes it receives',
            'កាត SIM របស់អ្នក និងលេខកូដ SMS ដែលវាទទួល',
          ),
          [t('Your photos only', 'តែរូបថតរបស់អ្នក'), t('The screen glass', 'កញ្ចក់អេក្រង់')],
        ),
        tf(
          t(
            'Auto-lock after 30 seconds is safer than “never”.',
            'ការចាក់សោស្វ័យប្រវត្តិក្រោយ 30 វិនាទីមានសុវត្ថិភាពជាង «មិនដែល»។',
          ),
          true,
        ),
        mc(
          t('Before selling your old phone, you should…', 'មុនលក់ទូរស័ព្ទចាស់របស់អ្នក អ្នកគួរ…'),
          t('back up, sign out and factory reset it', 'បម្រុង ចេញពីគណនី ហើយកំណត់រោងចក្រឡើងវិញ'),
          [
            t('just delete a few photos', 'គ្រាន់តែលុបរូបថតពីរបី'),
            t('leave all accounts logged in', 'ទុកគណនីទាំងអស់ចូល'),
          ],
        ),
      ],
      challenge: [
        order(
          t(
            'Order the steps when your phone is stolen.',
            'តម្រៀបជំហានពេលទូរស័ព្ទរបស់អ្នកត្រូវលួច។',
          ),
          [
            t('Use Find My Device to lock it', 'ប្រើ Find My Device ដើម្បីចាក់សោវា'),
            t(
              'Call your mobile company to block the SIM',
              'ទូរស័ព្ទទៅក្រុមហ៊ុនទូរស័ព្ទដើម្បីបិទ SIM',
            ),
            t('Change important passwords', 'ប្តូរពាក្យសម្ងាត់សំខាន់ៗ'),
            t('Tell your bank', 'ប្រាប់ធនាគាររបស់អ្នក'),
            t('Erase it if it will not come back', 'លុបវាប្រសិនបើវាមិនត្រឡប់មកវិញ'),
          ],
        ),
        sortInto(
          t('Good phone habit or risky?', 'ទម្លាប់ទូរស័ព្ទល្អ ឬប្រថុយ?'),
          [
            ['g', t('Good', 'ល្អ'), '✅'],
            ['r', t('Risky', 'ប្រថុយ'), '⚠️'],
          ],
          [
            [t('Auto-updates on', 'បើកការធ្វើបច្ចុប្បន្នភាពស្វ័យប្រវត្តិ'), 'g'],
            [t('Find My Device on', 'បើក Find My Device'), 'g'],
            [t('Previews hidden', 'លាក់ការមើលជាមុន'), 'g'],
            [t('No screen lock', 'គ្មានការចាក់សោអេក្រង់'), 'r'],
            [t('APKs from chat groups', 'APK ពីក្រុមជជែក'), 'r'],
            [t('PIN 0000', 'PIN 0000'), 'r'],
          ],
        ),
        num(
          t(
            'A 4-digit PIN has 10,000 options. A 6-digit PIN has how many?',
            'PIN 4 ខ្ទង់មាន 10,000 ជម្រើស។ PIN 6 ខ្ទង់មានប៉ុន្មាន?',
          ),
          1000000,
        ),
        match(t('Match the feature to what it stops.', 'ផ្គូផ្គងមុខងារជាមួយអ្វីដែលវាបញ្ឈប់។'), [
          [t('Screen lock', 'ការចាក់សោអេក្រង់'), t('Snooping', 'ការលួចមើល')],
          [t('Find My Device', 'Find My Device'), t('Losing your data', 'ការបាត់ទិន្នន័យ')],
          [t('SIM PIN', 'PIN SIM'), t('SIM theft', 'ការលួច SIM')],
          [t('Hidden previews', 'លាក់ការមើលជាមុន'), t('Code peeking', 'ការលួចមើលលេខកូដ')],
        ]),
        mc(
          t('A charging cable at a public USB station could…', 'ខ្សែសាកនៅស្ថានីយ USB សាធារណៈអាច…'),
          t(
            'try to read data — use your own plug charger',
            'ព្យាយាមអានទិន្នន័យ — ប្រើឆ្នាំងសាកដោតផ្ទាល់ខ្លួន',
          ),
          [
            t('make the battery last forever', 'ធ្វើឱ្យថ្មប្រើបានជារៀងរហូត'),
            t('nothing, ever', 'គ្មានអ្វីទេ ជានិច្ច'),
          ],
        ),
        tf(
          t(
            'You can see and remove devices logged into your Google or Facebook account.',
            'អ្នកអាចមើល និងលុបឧបករណ៍ដែលចូលគណនី Google ឬ Facebook របស់អ្នក។',
          ),
          true,
        ),
        typeIt(
          t(
            'Type the 3-word name of the feature that locates a lost Android phone.',
            'វាយឈ្មោះ 3 ពាក្យនៃមុខងារដែលកំណត់ទីតាំងទូរស័ព្ទ Android ដែលបាត់។',
          ),
          'Find My Device',
          { accept: ['find my device', 'Find my device'] },
        ),
        buildSentence(
          t('Build the rule.', 'បង្កើតច្បាប់។'),
          'Lock your phone and turn on Find My Device.',
          { say: 'Lock your phone, and turn on Find My Device.' },
        ),
      ],
      games: [
        catchIt(
          t('Catch the STRONG phone locks!', 'ចាប់ការចាក់សោទូរស័ព្ទខ្លាំង!'),
          [
            '6-digit PIN',
            t('Fingerprint', 'ស្នាមម្រាមដៃ'),
            t('Face unlock + PIN', 'ដោះសោមុខ + PIN'),
            t('Long password', 'ពាក្យសម្ងាត់វែង'),
          ],
          [t('No lock', 'គ្មានការចាក់សោ'), '0000', '1234', t('Swipe', 'អូស')],
          { speed: 'normal' },
        ),
        memory(
          t(
            'Match the lost-phone action to its icon.',
            'ផ្គូផ្គងសកម្មភាពទូរស័ព្ទបាត់ជាមួយរូបតំណាង។',
          ),
          [
            [t('Ring', 'រោទ៍'), '🔔'],
            [t('Lock', 'ចាក់សោ'), '🔒'],
            [t('Locate', 'កំណត់ទីតាំង'), '📍'],
            [t('Erase', 'លុប'), '🧹'],
          ],
        ),
      ],
      reward: t(
        'Your phone is locked, findable and protected. 📱🛡️',
        'ទូរស័ព្ទរបស់អ្នកត្រូវបានចាក់សោ អាចរកឃើញ និងការពារ។ 📱🛡️',
      ),
    },
  ),

  // 14 ────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'digital-footprint',
    '👣',
    t('Your Digital Footprint', 'ស្នាមជើងឌីជីថលរបស់អ្នក'),
    t(
      'What you post stays — make it something you are proud of.',
      'អ្វីដែលអ្នកបង្ហោះនៅដដែល — ធ្វើឱ្យវាជាអ្វីដែលអ្នកមានមោទនភាព។',
    ),
    {
      intro: [
        '👣',
        t(
          'Every post, like and comment leaves a footprint. Future teachers and employers may see it.',
          'ការបង្ហោះ like និងមតិនីមួយៗបន្សល់ស្នាមជើង។ គ្រូ និងនិយោជកនាពេលអនាគតអាចមើលឃើញវា។',
        ),
      ],
      learn: [
        [
          '👣',
          t('Footprint', 'ស្នាមជើង'),
          t(
            'Everything about you online: posts, photos, comments, tags.',
            'អ្វីៗទាំងអស់អំពីអ្នកលើអ៊ីនធឺណិត៖ ការបង្ហោះ រូបថត មតិ ស្លាក។',
          ),
          'footprint',
        ],
        [
          '📸',
          t('Screenshots last', 'រូបថតអេក្រង់នៅដដែល'),
          t(
            'Even “deleted” posts can live on in someone’s screenshot.',
            'សូម្បីតែការបង្ហោះ «បានលុប» អាចនៅក្នុងរូបថតអេក្រង់របស់នរណាម្នាក់។',
          ),
          'screenshot',
        ],
        [
          '🤝',
          t('Respect', 'ការគោរព'),
          t(
            'Ask before posting photos of others. Never share hurtful content.',
            'សួរមុនបង្ហោះរូបថតអ្នកដទៃ។ កុំចែករំលែកខ្លឹមសារធ្វើឱ្យឈឺចាប់។',
          ),
          'respect',
        ],
        [
          '🌟',
          t('Positive footprint', 'ស្នាមជើងវិជ្ជមាន'),
          t(
            'Share projects, achievements and kind words — it helps your future.',
            'ចែករំលែកគម្រោង សមិទ្ធផល និងពាក្យល្អ — វាជួយអនាគតរបស់អ្នក។',
          ),
        ],
      ],
      see: [
        t(
          'Search “Sokha Chan”:\n🌟 “Won the provincial coding contest”\n🌟 “Volunteer at the library”\nvs\n😬 Angry comments from 3 years ago',
          'ស្វែងរក «Sokha Chan»៖\n🌟 «ឈ្នះការប្រកួតសរសេរកូដខេត្ត»\n🌟 «អ្នកស្ម័គ្រចិត្តនៅបណ្ណាល័យ»\nនិង\n😬 មតិខឹងពី 3 ឆ្នាំមុន',
        ),
        t(
          'Which footprint would you want an employer to find?',
          'តើស្នាមជើងណាដែលអ្នកចង់ឱ្យនិយោជករកឃើញ?',
        ),
      ],
      words: [
        ['footprint', 'ស្នាមជើង', '👣'],
        ['post', 'ការបង្ហោះ', '📝'],
        ['comment', 'មតិយោបល់', '💬'],
        ['kind', 'ចិត្តល្អ', '💛'],
      ],
      play: [
        tf(
          t(
            'Deleting a post means nobody can ever see it again.',
            'ការលុបការបង្ហោះមានន័យថាគ្មាននរណាអាចមើលវាម្តងទៀតឡើយ។',
          ),
          false,
          {
            explanation: t(
              'Screenshots and copies can stay forever.',
              'រូបថតអេក្រង់ និងច្បាប់ចម្លងអាចនៅជារៀងរហូត។',
            ),
          },
        ),
        mc(
          t(
            'Who might look at your footprint in the future?',
            'តើអ្នកណាអាចមើលស្នាមជើងរបស់អ្នកនាពេលអនាគត?',
          ),
          t('Universities and employers', 'សាកលវិទ្យាល័យ និងនិយោជក'),
          [t('Nobody, ever', 'គ្មាននរណាទេ ជានិច្ច'), t('Only your cat', 'តែឆ្មារបស់អ្នក')],
        ),
        mc(
          t('Before posting a group photo, you should…', 'មុនបង្ហោះរូបថតក្រុម អ្នកគួរ…'),
          t('ask everyone in it', 'សួរគ្រប់គ្នាក្នុងរូប'),
          [
            t('tag strangers', 'ដាក់ស្លាកមនុស្សចម្លែក'),
            t('add their phone numbers', 'បន្ថែមលេខទូរស័ព្ទរបស់គេ'),
          ],
        ),
        tf(
          t(
            'Sharing your coding projects online builds a positive footprint.',
            'ការចែករំលែកគម្រោងសរសេរកូដលើអ៊ីនធឺណិតបង្កើតស្នាមជើងវិជ្ជមាន។',
          ),
          true,
        ),
        mc(
          t(
            'Someone posts mean comments about a classmate. Best action?',
            'នរណាម្នាក់បង្ហោះមតិអាក្រក់អំពីមិត្តរួមថ្នាក់។ សកម្មភាពល្អបំផុត?',
          ),
          t(
            'Don’t share it; report it and support the classmate',
            'កុំចែករំលែក រាយការណ៍ ហើយគាំទ្រមិត្តរួមថ្នាក់',
          ),
          [t('Like it', 'Like វា'), t('Add a mean comment too', 'បន្ថែមមតិអាក្រក់ផងដែរ')],
        ),
        mc(
          t(
            'How can you check your own footprint?',
            'តើអ្នកអាចពិនិត្យស្នាមជើងផ្ទាល់ខ្លួនដោយរបៀបណា?',
          ),
          t('Search your name online', 'ស្វែងរកឈ្មោះរបស់អ្នកលើអ៊ីនធឺណិត'),
          [t('Restart your phone', 'ចាប់ផ្តើមទូរស័ព្ទឡើងវិញ'), t('Buy a new SIM', 'ទិញ SIM ថ្មី')],
        ),
        tf(
          t(
            'Being kind online is part of being safe online.',
            'ការមានចិត្តល្អលើអ៊ីនធឺណិតជាផ្នែកមួយនៃការមានសុវត្ថិភាពលើអ៊ីនធឺណិត។',
          ),
          true,
        ),
        mc(
          t('Before posting, ask yourself…', 'មុនបង្ហោះ សួរខ្លួនឯង…'),
          t('“Would I be OK if my teacher saw this?”', '«តើខ្ញុំមិនអីទេប្រសិនបើគ្រូខ្ញុំឃើញនេះ?»'),
          [
            t('“Will this get the most likes?”', '«តើនេះនឹងទទួលបាន like ច្រើនបំផុតទេ?»'),
            t('“Is it 3am?”', '«តើម៉ោង 3 ទៀបភ្លឺទេ?»'),
          ],
        ),
      ],
      challenge: [
        sortInto(
          t('Positive or negative footprint?', 'ស្នាមជើងវិជ្ជមាន ឬអវិជ្ជមាន?'),
          [
            ['p', t('Positive', 'វិជ្ជមាន'), '🌟'],
            ['n', t('Negative', 'អវិជ្ជមាន'), '😬'],
          ],
          [
            [t('A website you built', 'គេហទំព័រដែលអ្នកបានបង្កើត'), 'p'],
            [t('Helping in a forum', 'ជួយក្នុងវេទិកា'), 'p'],
            [t('Certificate from a course', 'វិញ្ញាបនបត្រពីវគ្គសិក្សា'), 'p'],
            [t('Insulting comments', 'មតិប្រមាថ'), 'n'],
            [t('Sharing a friend’s secret', 'ចែករំលែកអាថ៌កំបាំងមិត្ត'), 'n'],
            [t('Fake news you forwarded', 'ព័ត៌មានក្លែងក្លាយដែលអ្នកបានបញ្ជូន'), 'n'],
          ],
        ),
        order(
          t('Order the THINK check before you post.', 'តម្រៀបការពិនិត្យ THINK មុនពេលអ្នកបង្ហោះ។'),
          [
            t('T — Is it true?', 'T — តើវាពិតទេ?'),
            t('H — Is it helpful?', 'H — តើវាមានប្រយោជន៍ទេ?'),
            t('I — Is it inspiring?', 'I — តើវាបំផុសគំនិតទេ?'),
            t('N — Is it necessary?', 'N — តើវាចាំបាច់ទេ?'),
            t('K — Is it kind?', 'K — តើវាចិត្តល្អទេ?'),
          ],
        ),
        mc(
          t(
            'You posted something you regret. Best move?',
            'អ្នកបានបង្ហោះអ្វីមួយដែលអ្នកសោកស្តាយ។ ជំហានល្អបំផុត?',
          ),
          t(
            'Delete it, apologise if needed, and learn from it',
            'លុបវា សុំទោសប្រសិនបើចាំបាច់ ហើយរៀនពីវា',
          ),
          [
            t('Post it again', 'បង្ហោះវាម្តងទៀត'),
            t('Pretend it was hacked', 'ធ្វើពុតថាវាត្រូវបានលួចចូល'),
          ],
        ),
        match(t('Match the action to its effect.', 'ផ្គូផ្គងសកម្មភាពជាមួយផលប៉ះពាល់។'), [
          [t('Share a project', 'ចែករំលែកគម្រោង'), t('Shows your skills', 'បង្ហាញជំនាញរបស់អ្នក')],
          [t('Mean comment', 'មតិអាក្រក់'), t('Hurts someone', 'ធ្វើឱ្យនរណាម្នាក់ឈឺចាប់')],
          [
            t('Tag location at home', 'ដាក់ស្លាកទីតាំងនៅផ្ទះ'),
            t('Shows where you live', 'បង្ហាញកន្លែងដែលអ្នករស់នៅ'),
          ],
          [t('Ask before posting', 'សួរមុនបង្ហោះ'), t('Shows respect', 'បង្ហាញការគោរព')],
        ]),
        tf(
          t(
            'Cyberbullying should be reported to a trusted adult or the platform.',
            'ការសម្លុតតាមអ៊ីនធឺណិតគួរត្រូវបានរាយការណ៍ទៅមនុស្សពេញវ័យដែលទុកចិត្ត ឬវេទិកា។',
          ),
          true,
        ),
        num(
          t(
            'A post is shared by 3 people, and each of them is shared by 3 more. How many shares in the second round?',
            'ការបង្ហោះត្រូវបានចែករំលែកដោយ 3 នាក់ ហើយម្នាក់ៗត្រូវបានចែករំលែកដោយ 3 នាក់ទៀត។ តើការចែករំលែកប៉ុន្មានក្នុងជុំទីពីរ?',
          ),
          9,
        ),
        mc(
          t(
            'Which is the best username for a professional profile?',
            'តើឈ្មោះអ្នកប្រើណាល្អបំផុតសម្រាប់ប្រវត្តិរូបវិជ្ជាជីវៈ?',
          ),
          'sokha.chan.dev',
          ['xX_killer_Xx', 'lazyboy2009'],
        ),
        buildSentence(t('Build the rule.', 'បង្កើតច្បាប់។'), 'Think before you post.', {
          say: 'Think before you post.',
        }),
      ],
      games: [
        catchIt(
          t('Catch the POSITIVE footprints!', 'ចាប់ស្នាមជើងវិជ្ជមាន!'),
          [
            t('Project', 'គម្រោង'),
            t('Kind comment', 'មតិល្អ'),
            t('Certificate', 'វិញ្ញាបនបត្រ'),
            t('Volunteering', 'ការស្ម័គ្រចិត្ត'),
          ],
          [
            t('Insult', 'ការប្រមាថ'),
            t('Fake news', 'ព័ត៌មានក្លែងក្លាយ'),
            t('Home address', 'អាសយដ្ឋានផ្ទះ'),
          ],
          { speed: 'slow' },
        ),
        memory(t('Match THINK letters to their question.', 'ផ្គូផ្គងអក្សរ THINK ជាមួយសំណួរ។'), [
          ['T', t('True?', 'ពិត?')],
          ['H', t('Helpful?', 'មានប្រយោជន៍?')],
          ['N', t('Necessary?', 'ចាំបាច់?')],
          ['K', t('Kind?', 'ចិត្តល្អ?')],
        ]),
      ],
      reward: t(
        'Your footprint shows the best of you. 👣🌟',
        'ស្នាមជើងរបស់អ្នកបង្ហាញភាពល្អបំផុតរបស់អ្នក។ 👣🌟',
      ),
    },
  ),

  // 15 ────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'incident-response',
    '🚨',
    t('When Something Goes Wrong', 'ពេលមានអ្វីខុស'),
    t('Respond to a hack calmly, step by step.', 'ឆ្លើយតបនឹងការលួចចូលដោយស្ងប់ស្ងាត់ ជំហានម្តងមួយ។'),
    {
      intro: [
        '🚨',
        t(
          'Even experts get hacked. What matters is a fast, calm response — and no shame in asking for help.',
          'សូម្បីតែអ្នកជំនាញក៏ត្រូវលួចចូល។ អ្វីដែលសំខាន់គឺការឆ្លើយតបលឿន ស្ងប់ស្ងាត់ — ហើយគ្មានការខ្មាស់អៀនក្នុងការសុំជំនួយ។',
        ),
      ],
      learn: [
        [
          '🔍',
          t('Notice', 'កត់សម្គាល់'),
          t(
            'Strange logins, posts you did not write, messages from your account.',
            'ការចូលចម្លែក ការបង្ហោះដែលអ្នកមិនបានសរសេរ សារពីគណនីរបស់អ្នក។',
          ),
          'notice',
        ],
        [
          '🧱',
          t('Contain', 'ទប់ស្កាត់'),
          t(
            'Disconnect, change passwords from a clean device, log out other sessions.',
            'ផ្តាច់ ប្តូរពាក្យសម្ងាត់ពីឧបករណ៍ស្អាត ចេញពីវគ្គផ្សេង។',
          ),
          'contain',
        ],
        [
          '📢',
          t('Tell', 'ប្រាប់'),
          t(
            'Tell IT, your bank, a trusted adult — and warn friends about fake messages.',
            'ប្រាប់ IT ធនាគាររបស់អ្នក មនុស្សពេញវ័យដែលទុកចិត្ត — ហើយព្រមានមិត្តអំពីសារក្លែងក្លាយ។',
          ),
          'report',
        ],
        [
          '♻️',
          t('Recover and learn', 'ស្តារ និងរៀន'),
          t(
            'Restore from backup, turn on 2FA, and note what to do better.',
            'ស្តារពីការបម្រុង បើក 2FA ហើយកត់ចំណាំអ្វីដែលត្រូវធ្វើឱ្យល្អជាង។',
          ),
          'recover',
        ],
      ],
      see: [
        t(
          '😨 Your Facebook sends scam links to friends\n1. Change the password (from another device) 🔑\n2. Log out all sessions 🚪\n3. Turn on 2FA 📲\n4. Warn your friends 📢\n5. Check your other accounts 🔍',
          '😨 Facebook របស់អ្នកផ្ញើតំណបោកប្រាស់ទៅមិត្ត\n1. ប្តូរពាក្យសម្ងាត់ (ពីឧបករណ៍ផ្សេង) 🔑\n2. ចេញពីវគ្គទាំងអស់ 🚪\n3. បើក 2FA 📲\n4. ព្រមានមិត្តរបស់អ្នក 📢\n5. ពិនិត្យគណនីផ្សេងទៀតរបស់អ្នក 🔍',
        ),
        t('Act fast, stay calm, ask for help.', 'ធ្វើលឿន នៅស្ងប់ សុំជំនួយ។'),
      ],
      words: [
        ['hacked', 'ត្រូវលួចចូល', '🚨'],
        ['report', 'រាយការណ៍', '📢'],
        ['recover', 'ស្តារ', '♻️'],
        ['calm', 'ស្ងប់ស្ងាត់', '😌'],
      ],
      play: [
        mc(
          t(
            'Which is a sign your account was hacked?',
            'តើមួយណាជាសញ្ញាថាគណនីរបស់អ្នកត្រូវបានលួចចូល?',
          ),
          t('Posts you never wrote', 'ការបង្ហោះដែលអ្នកមិនដែលសរសេរ'),
          [
            t('A new profile photo you chose', 'រូបប្រវត្តិរូបថ្មីដែលអ្នកបានជ្រើស'),
            t('Your friend liked your post', 'មិត្តរបស់អ្នកបាន like ការបង្ហោះរបស់អ្នក'),
          ],
        ),
        mc(
          t(
            'What is the FIRST thing to do after a hack?',
            'តើអ្វីជារឿងដំបូងដែលត្រូវធ្វើក្រោយការលួចចូល?',
          ),
          t('Change the password from a safe device', 'ប្តូរពាក្យសម្ងាត់ពីឧបករណ៍សុវត្ថិភាព'),
          [t('Delete all your photos', 'លុបរូបថតទាំងអស់'), t('Wait and see', 'រង់ចាំមើល')],
        ),
        tf(
          t(
            'It is shameful to tell anyone you were hacked.',
            'វាគួរឱ្យខ្មាស់ក្នុងការប្រាប់នរណាម្នាក់ថាអ្នកត្រូវបានលួចចូល។',
          ),
          false,
          {
            explanation: t(
              'Telling quickly protects you and your friends.',
              'ការប្រាប់យ៉ាងលឿនការពារអ្នក និងមិត្តរបស់អ្នក។',
            ),
          },
        ),
        mc(
          t('“Log out of all sessions” does what?', '«ចេញពីវគ្គទាំងអស់» ធ្វើអ្វី?'),
          t('Kicks the attacker off your account', 'បណ្តេញអ្នកវាយប្រហារចេញពីគណនីរបស់អ្នក'),
          [t('Deletes your account', 'លុបគណនីរបស់អ្នក'), t('Posts a message', 'បង្ហោះសារ')],
        ),
        tf(
          t(
            'You should warn friends if your account sent them strange links.',
            'អ្នកគួរព្រមានមិត្តប្រសិនបើគណនីរបស់អ្នកបានផ្ញើតំណចម្លែកទៅពួកគេ។',
          ),
          true,
        ),
        mc(
          t(
            'Your bank card was used for something you did not buy. You…',
            'កាតធនាគាររបស់អ្នកត្រូវបានប្រើសម្រាប់អ្វីដែលអ្នកមិនបានទិញ។ អ្នក…',
          ),
          t('call the bank right away to block the card', 'ទូរស័ព្ទទៅធនាគារភ្លាមៗដើម្បីបិទកាត'),
          [
            t('wait a month', 'រង់ចាំមួយខែ'),
            t('post your card number to ask for help', 'បង្ហោះលេខកាតដើម្បីសុំជំនួយ'),
          ],
        ),
        mc(
          t(
            'After recovering, what makes a repeat less likely?',
            'ក្រោយការស្តារ តើអ្វីធ្វើឱ្យការកើតឡើងម្តងទៀតមិនសូវទំនង?',
          ),
          t('Turning on 2FA', 'ការបើក 2FA'),
          [
            t('Using the old password again', 'ការប្រើពាក្យសម្ងាត់ចាស់ម្តងទៀត'),
            t('Turning off updates', 'ការបិទការធ្វើបច្ចុប្បន្នភាព'),
          ],
        ),
        tf(
          t(
            'Writing down what happened helps you and IT learn.',
            'ការកត់ត្រាអ្វីដែលបានកើតឡើងជួយអ្នក និង IT រៀន។',
          ),
          true,
        ),
      ],
      challenge: [
        order(t('Order the incident response steps.', 'តម្រៀបជំហានឆ្លើយតបឧប្បត្តិហេតុ។'), [
          t('Notice the problem', 'កត់សម្គាល់បញ្ហា'),
          t('Contain it', 'ទប់ស្កាត់វា'),
          t('Tell the right people', 'ប្រាប់មនុស្សត្រឹមត្រូវ'),
          t('Recover', 'ស្តារ'),
          t('Learn and improve', 'រៀន និងកែលម្អ'),
        ]),
        sortInto(
          t('Contain, tell or recover?', 'ទប់ស្កាត់ ប្រាប់ ឬស្តារ?'),
          [
            ['c', t('Contain', 'ទប់ស្កាត់'), '🧱'],
            ['t', t('Tell', 'ប្រាប់'), '📢'],
            ['r', t('Recover', 'ស្តារ'), '♻️'],
          ],
          [
            [t('Disconnect from Wi-Fi', 'ផ្តាច់ពី Wi-Fi'), 'c'],
            [t('Log out all sessions', 'ចេញពីវគ្គទាំងអស់'), 'c'],
            [t('Call the bank', 'ទូរស័ព្ទទៅធនាគារ'), 't'],
            [t('Warn your friends', 'ព្រមានមិត្តរបស់អ្នក'), 't'],
            [t('Restore from backup', 'ស្តារពីការបម្រុង'), 'r'],
            [t('Turn on 2FA', 'បើក 2FA'), 'r'],
          ],
        ),
        mc(
          t(
            'Why change the password from a DIFFERENT device?',
            'ហេតុអ្វីប្តូរពាក្យសម្ងាត់ពីឧបករណ៍ផ្សេង?',
          ),
          t('The first device might have spyware', 'ឧបករណ៍ទីមួយអាចមាន spyware'),
          [
            t('It is faster', 'វាលឿនជាង'),
            t('Passwords only work on new phones', 'ពាក្យសម្ងាត់ដំណើរការតែលើទូរស័ព្ទថ្មី'),
          ],
        ),
        mc(
          t(
            'An attacker demands money to not leak your photos. Best response?',
            'អ្នកវាយប្រហារទាមទារលុយដើម្បីមិនលេចធ្លាយរូបថតរបស់អ្នក។ ការឆ្លើយតបល្អបំផុត?',
          ),
          t(
            'Don’t pay; save evidence; tell a trusted adult and the police',
            'កុំបង់ រក្សាទុកភស្តុតាង ប្រាប់មនុស្សពេញវ័យដែលទុកចិត្ត និងប៉ូលិស',
          ),
          [
            t('Pay quickly', 'បង់ប្រាក់យ៉ាងលឿន'),
            t('Keep it secret from everyone', 'រក្សាវាជាសម្ងាត់ពីគ្រប់គ្នា'),
          ],
        ),
        match(
          t('Match the incident to who to tell.', 'ផ្គូផ្គងឧប្បត្តិហេតុជាមួយអ្នកដែលត្រូវប្រាប់។'),
          [
            [t('Card misuse', 'ការប្រើកាតខុស'), t('Your bank', 'ធនាគាររបស់អ្នក')],
            [t('School account hacked', 'គណនីសាលាត្រូវលួចចូល'), t('School IT', 'IT សាលា')],
            [
              t('Threats or blackmail', 'ការគំរាម ឬការជំរិត'),
              t('Trusted adult and police', 'មនុស្សពេញវ័យដែលទុកចិត្ត និងប៉ូលិស'),
            ],
            [
              t('Fake messages sent', 'សារក្លែងក្លាយត្រូវបានផ្ញើ'),
              t('Your friends', 'មិត្តរបស់អ្នក'),
            ],
          ],
        ),
        num(
          t(
            'A company finds a hack in 2 hours instead of 2 days. How many hours faster?',
            'ក្រុមហ៊ុនរកឃើញការលួចចូលក្នុង 2 ម៉ោងជំនួស 2 ថ្ងៃ។ លឿនជាងប៉ុន្មានម៉ោង?',
          ),
          46,
        ),
        tf(
          t(
            'Cyber security is a growing career in Cambodia and around the world.',
            'សុវត្ថិភាពតាមអ៊ីនធឺណិតជាអាជីពកំពុងរីកចម្រើនក្នុងកម្ពុជា និងជុំវិញពិភពលោក។',
          ),
          true,
        ),
        buildSentence(
          t('Build the defender’s motto.', 'បង្កើតបាវចនាអ្នកការពារ។'),
          'Stay calm act fast and ask for help.',
          { say: 'Stay calm, act fast, and ask for help.' },
        ),
      ],
      games: [
        robot(
          t(
            'Incident! Reach the help desk 🧑‍💻, collecting the 3 response steps on the way.',
            'ឧប្បត្តិហេតុ! ទៅដល់ផ្នែកជំនួយ 🧑‍💻 ប្រមូលជំហានឆ្លើយតប 3 តាមផ្លូវ។',
          ),
          ['S.#*.', '*.#..', '..*#.', '#...G'],
          { goalIcon: '🧑‍💻', collectIcon: '✅' },
        ),
        memory(t('Match the step to its emoji.', 'ផ្គូផ្គងជំហានជាមួយ emoji។'), [
          [t('Notice', 'កត់សម្គាល់'), '🔍'],
          [t('Contain', 'ទប់ស្កាត់'), '🧱'],
          [t('Tell', 'ប្រាប់'), '📢'],
          [t('Recover', 'ស្តារ'), '♻️'],
        ]),
      ],
      reward: t(
        '🏆 Cyber Defender! You can protect yourself, your friends and your future workplace.',
        '🏆 អ្នកការពារតាមអ៊ីនធឺណិត! អ្នកអាចការពារខ្លួនឯង មិត្ត និងកន្លែងធ្វើការនាពេលអនាគត។',
      ),
    },
  ),
];
