import { t, type LessonSeed } from '../../types';
import {
  buildSentence,
  catchIt,
  emailMock,
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

// 🛡️ Cyber Security Pro, lessons 1–8 (security-2.ts has 9–15). Defensive skills only.
// Builds on the Internet world's safety lessons. Khmer (km) strings are DRAFTS for native review.
export const SECURITY_WORLD = 'cyber-security';
const W = SECURITY_WORLD;

export const SECURITY_LESSONS_1: LessonSeed[] = [
  // 1 ─────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'security-mindset',
    '🛡️',
    t('Think Like a Defender', 'គិតដូចអ្នកការពារ'),
    t(
      'Secret, correct and available: the three goals of security.',
      'សម្ងាត់ ត្រឹមត្រូវ និងអាចប្រើបាន៖ គោលដៅទាំងបីនៃសុវត្ថិភាព។',
    ),
    {
      intro: [
        '🛡️',
        t(
          'Cyber defenders protect people, data and money. Every company in Cambodia needs them!',
          'អ្នកការពារតាមអ៊ីនធឺណិតការពារមនុស្ស ទិន្នន័យ និងលុយ។ ក្រុមហ៊ុនគ្រប់ក្នុងកម្ពុជាត្រូវការពួកគេ!',
        ),
      ],
      learn: [
        [
          '🤫',
          t('Confidentiality', 'ការរក្សាការសម្ងាត់'),
          t('Only the right people can see the data.', 'មានតែមនុស្សត្រឹមត្រូវអាចមើលទិន្នន័យ។'),
          'secret',
        ],
        [
          '✅',
          t('Integrity', 'ភាពត្រឹមត្រូវ'),
          t(
            'Nobody changes the data without permission.',
            'គ្មាននរណាប្តូរទិន្នន័យដោយគ្មានការអនុញ្ញាត។',
          ),
        ],
        [
          '🟢',
          t('Availability', 'ភាពអាចប្រើបាន'),
          t(
            'The data and services work when people need them.',
            'ទិន្នន័យ និងសេវាដំណើរការពេលមនុស្សត្រូវការ។',
          ),
        ],
        [
          '⚠️',
          t('Threat and risk', 'ការគំរាមកំហែង និងហានិភ័យ'),
          t(
            'A threat is what could go wrong; risk is how likely and how bad.',
            'ការគំរាមកំហែងគឺអ្វីដែលអាចខុស ហានិភ័យគឺប្រហែលប៉ុណ្ណា និងអាក្រក់ប៉ុណ្ណា។',
          ),
          'risk',
        ],
      ],
      see: [
        t(
          'Your exam marks:\n🤫 Only you and the teacher see them\n✅ Nobody can change 65 to 95\n🟢 You can check them on results day',
          'ពិន្ទុប្រឡងរបស់អ្នក៖\n🤫 មានតែអ្នក និងគ្រូមើលឃើញ\n✅ គ្មាននរណាអាចប្តូរ 65 ទៅ 95\n🟢 អ្នកអាចពិនិត្យវានៅថ្ងៃលទ្ធផល',
        ),
        t(
          'Secret, correct and available — the three goals together.',
          'សម្ងាត់ ត្រឹមត្រូវ និងអាចប្រើបាន — គោលដៅទាំងបីរួមគ្នា។',
        ),
      ],
      words: [
        ['security', 'សុវត្ថិភាព', '🛡️'],
        ['threat', 'ការគំរាមកំហែង', '⚠️'],
        ['risk', 'ហានិភ័យ'],
        ['protect', 'ការពារ', '🔐'],
      ],
      play: [
        mc(
          t(
            'Someone reads your private messages. Which goal is broken?',
            'នរណាម្នាក់អានសារឯកជនរបស់អ្នក។ គោលដៅណាត្រូវបានបំបែក?',
          ),
          t('Confidentiality', 'ការរក្សាការសម្ងាត់'),
          [t('Availability', 'ភាពអាចប្រើបាន'), t('Integrity', 'ភាពត្រឹមត្រូវ')],
        ),
        mc(
          t(
            'Someone changes the price in a shop’s database. Which goal is broken?',
            'នរណាម្នាក់ប្តូរតម្លៃក្នុងមូលដ្ឋានទិន្នន័យហាង។ គោលដៅណាត្រូវបានបំបែក?',
          ),
          t('Integrity', 'ភាពត្រឹមត្រូវ'),
          [t('Confidentiality', 'ការរក្សាការសម្ងាត់'), t('Availability', 'ភាពអាចប្រើបាន')],
        ),
        mc(
          t(
            'The bank app is down all day. Which goal is broken?',
            'កម្មវិធីធនាគារដាច់ពេញមួយថ្ងៃ។ គោលដៅណាត្រូវបានបំបែក?',
          ),
          t('Availability', 'ភាពអាចប្រើបាន'),
          [t('Integrity', 'ភាពត្រឹមត្រូវ'), t('Confidentiality', 'ការរក្សាការសម្ងាត់')],
        ),
        tf(
          t('Security is only the IT team’s job.', 'សុវត្ថិភាពគឺជាការងាររបស់ក្រុម IT តែប៉ុណ្ណោះ។'),
          false,
          {
            explanation: t(
              'Everyone helps — one click on a bad link can hurt a whole company.',
              'គ្រប់គ្នាជួយ — ការចុចតំណអាក្រក់មួយអាចធ្វើឱ្យក្រុមហ៊ុនទាំងមូលខូចខាត។',
            ),
          },
        ),
        tf(
          t(
            'People are often the easiest way for attackers to get in.',
            'មនុស្សជាញឹកញាប់ជាផ្លូវងាយបំផុតសម្រាប់អ្នកវាយប្រហារចូល។',
          ),
          true,
        ),
        mc(
          t('Which is a THREAT to a laptop?', 'តើមួយណាជាការគំរាមកំហែងដល់កុំព្យូទ័រយួរដៃ?'),
          t('Theft from a café table', 'ការលួចពីតុហាងកាហ្វេ'),
          [t('A clean screen', 'អេក្រង់ស្អាត'), t('A fast CPU', 'CPU លឿន')],
        ),
        mc(
          t('What do defenders do FIRST?', 'តើអ្នកការពារធ្វើអ្វីមុន?'),
          t('Find what is valuable and what could go wrong', 'រកអ្វីដែលមានតម្លៃ និងអ្វីដែលអាចខុស'),
          [
            t('Buy the most expensive tool', 'ទិញឧបករណ៍ថ្លៃបំផុត'),
            t('Ignore small problems', 'មិនអើពើបញ្ហាតូច'),
          ],
        ),
        tf(
          t(
            'Ethical security work always needs permission.',
            'ការងារសុវត្ថិភាពប្រកបដោយក្រមសីលធម៌ត្រូវការការអនុញ្ញាតជានិច្ច។',
          ),
          true,
        ),
      ],
      challenge: [
        match(t('Match the goal to its meaning.', 'ផ្គូផ្គងគោលដៅជាមួយអត្ថន័យ។'), [
          [t('Confidentiality', 'ការរក្សាការសម្ងាត់'), t('Kept secret', 'រក្សាជាសម្ងាត់')],
          [t('Integrity', 'ភាពត្រឹមត្រូវ'), t('Kept correct', 'រក្សាឱ្យត្រឹមត្រូវ')],
          [t('Availability', 'ភាពអាចប្រើបាន'), t('Ready to use', 'រួចរាល់សម្រាប់ប្រើ')],
        ]),
        sortInto(
          t('Which goal does each problem break?', 'តើបញ្ហានីមួយៗបំបែកគោលដៅណា?'),
          [
            ['c', t('Confidentiality', 'ការរក្សាការសម្ងាត់'), '🤫'],
            ['i', t('Integrity', 'ភាពត្រឹមត្រូវ'), '✅'],
            ['a', t('Availability', 'ភាពអាចប្រើបាន'), '🟢'],
          ],
          [
            [t('Password leaked online', 'ពាក្យសម្ងាត់លេចធ្លាយលើអ៊ីនធឺណិត'), 'c'],
            [t('Shoulder-surfing a PIN', 'លួចមើល PIN ពីក្រោយ'), 'c'],
            [t('Grades secretly edited', 'ពិន្ទុត្រូវបានកែដោយសម្ងាត់'), 'i'],
            [t('Fake bank transfer record', 'កំណត់ត្រាផ្ទេរប្រាក់ក្លែងក្លាយ'), 'i'],
            [t('Website down for hours', 'គេហទំព័រដាច់ច្រើនម៉ោង'), 'a'],
            [t('Files locked by ransomware', 'ឯកសារត្រូវបានចាក់សោដោយ ransomware'), 'a'],
          ],
        ),
        mc(
          t('Risk is high when something is…', 'ហានិភ័យខ្ពស់ពេលអ្វីមួយ…'),
          t('likely to happen AND very harmful', 'ទំនងកើតឡើង ហើយបង្កគ្រោះថ្នាក់ខ្លាំង'),
          [t('unlikely and harmless', 'មិនទំនង និងគ្មានគ្រោះថ្នាក់'), t('colourful', 'មានពណ៌')],
        ),
        num(
          t(
            'Risk score = likelihood × impact. Likelihood 4, impact 5. Score?',
            'ពិន្ទុហានិភ័យ = ភាពទំនង × ផលប៉ះពាល់។ ភាពទំនង 4 ផលប៉ះពាល់ 5។ ពិន្ទុ?',
          ),
          20,
        ),
        order(t('Order from LOWEST to HIGHEST risk.', 'តម្រៀបពីហានិភ័យទាបបំផុតទៅខ្ពស់បំផុត។'), [
          t('Losing a pencil', 'បាត់ខ្មៅដៃ'),
          t('Losing a USB with homework', 'បាត់ USB មានកិច្ចការផ្ទះ'),
          t('Losing an unlocked phone', 'បាត់ទូរស័ព្ទមិនចាក់សោ'),
          t('Leaking a bank password', 'លេចធ្លាយពាក្យសម្ងាត់ធនាគារ'),
        ]),
        tf(
          t(
            'Locking your screen when you walk away protects confidentiality.',
            'ការចាក់សោអេក្រង់ពេលអ្នកដើរចេញការពារការរក្សាការសម្ងាត់។',
          ),
          true,
        ),
        typeIt(
          t(
            'Type the Windows shortcut that locks the screen (use +).',
            'វាយផ្លូវកាត់ Windows ដែលចាក់សោអេក្រង់ (ប្រើ +)។',
          ),
          'Windows+L',
          { accept: ['Win+L', 'windows+l', 'win+l', 'Windows + L'] },
        ),
        buildSentence(
          t('Build the motto.', 'បង្កើតបាវចនា។'),
          'Keep data secret correct and available.',
          { say: 'Keep data secret, correct and available.' },
        ),
      ],
      games: [
        catchIt(
          t('Catch the THREATS!', 'ចាប់ការគំរាមកំហែង!'),
          [
            ['🎣', t('Phishing', 'Phishing')],
            ['🦠', t('Virus', 'មេរោគ')],
            ['🕵️', t('Stolen password', 'ពាក្យសម្ងាត់ត្រូវលួច')],
            ['📱', t('Lost phone', 'បាត់ទូរស័ព្ទ')],
          ],
          [
            ['🔐', '2FA'],
            ['💾', t('Backup', 'ការបម្រុង')],
            ['🔄', t('Update', 'ការធ្វើបច្ចុប្បន្នភាព')],
          ],
          { speed: 'normal' },
        ),
        memory(t('Match the goal to its emoji.', 'ផ្គូផ្គងគោលដៅជាមួយ emoji។'), [
          [t('Confidentiality', 'ការរក្សាការសម្ងាត់'), '🤫'],
          [t('Integrity', 'ភាពត្រឹមត្រូវ'), '✅'],
          [t('Availability', 'ភាពអាចប្រើបាន'), '🟢'],
          [t('Threat', 'ការគំរាមកំហែង'), '⚠️'],
        ]),
      ],
      reward: t('You think like a defender now. 🛡️', 'ឥឡូវអ្នកគិតដូចអ្នកការពារ។ 🛡️'),
    },
  ),

  // 2 ─────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'passphrases',
    '🔑',
    t('Super-Strong Passwords', 'ពាក្យសម្ងាត់ខ្លាំងបំផុត'),
    t('Passphrases and password managers.', 'ឃ្លាសម្ងាត់ និងកម្មវិធីគ្រប់គ្រងពាក្យសម្ងាត់។'),
    {
      intro: [
        '🔑',
        t(
          'A computer can guess “sokha123” in less than a second. Let’s make passwords it cannot guess!',
          'កុំព្យូទ័រអាចទាយ «sokha123» ក្នុងរយៈពេលតិចជាងមួយវិនាទី។ តោះបង្កើតពាក្យសម្ងាត់ដែលវាមិនអាចទាយ!',
        ),
      ],
      learn: [
        [
          '📏',
          t('Length wins', 'ប្រវែងឈ្នះ'),
          t(
            'Every extra character makes guessing much harder.',
            'តួអក្សរបន្ថែមនីមួយៗធ្វើឱ្យការទាយពិបាកជាងច្រើន។',
          ),
          'length',
        ],
        [
          '🧩',
          t('Passphrase', 'ឃ្លាសម្ងាត់'),
          t(
            'Join 4 random words: mango-rocket-river-blue',
            'ភ្ជាប់ពាក្យចៃដន្យ 4៖ mango-rocket-river-blue',
          ),
          'passphrase',
        ],
        [
          '🔁',
          t('One account, one password', 'គណនីមួយ ពាក្យសម្ងាត់មួយ'),
          t(
            'Never reuse — one leak would open every account.',
            'កុំប្រើឡើងវិញ — ការលេចធ្លាយមួយនឹងបើកគណនីទាំងអស់។',
          ),
        ],
        [
          '🗝️',
          t('Password manager', 'កម្មវិធីគ្រប់គ្រងពាក្យសម្ងាត់'),
          t(
            'An app that remembers strong passwords for you, locked by one main password.',
            'កម្មវិធីដែលចាំពាក្យសម្ងាត់ខ្លាំងសម្រាប់អ្នក ចាក់សោដោយពាក្យសម្ងាត់មេមួយ។',
          ),
          'manager',
        ],
      ],
      see: [
        t(
          'sokha123 → cracked instantly ❌\nS0kh@! → cracked in minutes ❌\nmango-rocket-river-blue → would take centuries ✅',
          'sokha123 → បំបែកភ្លាមៗ ❌\nS0kh@! → បំបែកក្នុងពីរបីនាទី ❌\nmango-rocket-river-blue → ត្រូវការរាប់សតវត្ស ✅',
        ),
        t('Long and random beats short and clever.', 'វែង និងចៃដន្យឈ្នះ ខ្លី និងឆ្លាត។'),
      ],
      words: [
        ['password', 'ពាក្យសម្ងាត់', '🔑'],
        ['strong', 'ខ្លាំង', '💪'],
        ['guess', 'ទាយ'],
        ['reuse', 'ប្រើឡើងវិញ', '🔁'],
      ],
      play: [
        mc(
          t('Which password is STRONGEST?', 'តើពាក្យសម្ងាត់ណាខ្លាំងបំផុត?'),
          'lotus-tiger-cloud-piano',
          ['Password1', 'sokha2010', '12345678'],
        ),
        tf(
          t(
            'Using your birthday as a password is safe.',
            'ការប្រើថ្ងៃកំណើតជាពាក្យសម្ងាត់មានសុវត្ថិភាព។',
          ),
          false,
          {
            explanation: t(
              'Birthdays are easy to find on social media.',
              'ថ្ងៃកំណើតងាយរកលើបណ្តាញសង្គម។',
            ),
          },
        ),
        tf(
          t(
            'You should use a different password for every account.',
            'អ្នកគួរប្រើពាក្យសម្ងាត់ខុសគ្នាសម្រាប់គណនីនីមួយៗ។',
          ),
          true,
        ),
        mc(
          t('What is a passphrase?', 'តើឃ្លាសម្ងាត់ជាអ្វី?'),
          t('Several random words joined together', 'ពាក្យចៃដន្យជាច្រើនភ្ជាប់គ្នា'),
          [t('Your name twice', 'ឈ្មោះរបស់អ្នកពីរដង'), t('A single letter', 'អក្សរតែមួយ')],
        ),
        mc(
          t('What does a password manager do?', 'តើកម្មវិធីគ្រប់គ្រងពាក្យសម្ងាត់ធ្វើអ្វី?'),
          t(
            'Stores and fills strong passwords safely',
            'រក្សាទុក និងបំពេញពាក្យសម្ងាត់ខ្លាំងដោយសុវត្ថិភាព',
          ),
          [
            t('Shares passwords on Facebook', 'ចែករំលែកពាក្យសម្ងាត់លើ Facebook'),
            t('Makes passwords shorter', 'ធ្វើឱ្យពាក្យសម្ងាត់ខ្លីជាង'),
          ],
        ),
        tf(
          t(
            'Writing your password on a sticky note on the screen is fine.',
            'ការសរសេរពាក្យសម្ងាត់លើក្រដាសបិទលើអេក្រង់មិនអីទេ។',
          ),
          false,
        ),
        mc(
          t('Which matters MOST for strength?', 'តើអ្វីសំខាន់បំផុតសម្រាប់ភាពខ្លាំង?'),
          t('Length', 'ប្រវែង'),
          [t('Colour', 'ពណ៌'), t('Font', 'ពុម្ពអក្សរ')],
        ),
        mc(
          t(
            'A friend asks for your password “just for a minute”. You…',
            'មិត្តសុំពាក្យសម្ងាត់របស់អ្នក «តែមួយនាទី»។ អ្នក…',
          ),
          t('politely say no', 'បដិសេធដោយសុភាព'),
          [t('send it by chat', 'ផ្ញើវាតាមការជជែក'), t('write it on their hand', 'សរសេរវាលើដៃគេ')],
        ),
      ],
      challenge: [
        order(t('Order from WEAKEST to STRONGEST.', 'តម្រៀបពីខ្សោយបំផុតទៅខ្លាំងបំផុត។'), [
          '1234',
          'dara2009',
          'Dara#2009!',
          'river-mango-sky-drum-blue',
        ]),
        sortInto(
          t('Strong or weak?', 'ខ្លាំង ឬខ្សោយ?'),
          [
            ['s', t('Strong', 'ខ្លាំង'), '💪'],
            ['w', t('Weak', 'ខ្សោយ'), '🥀'],
          ],
          [
            ['purple-bike-ocean-lamp', 's'],
            ['tuk!tuk!rice!moon!42', 's'],
            ['coffee-angkor-jump-seven', 's'],
            ['qwerty', 'w'],
            ['iloveyou', 'w'],
            ['password2028', 'w'],
          ],
        ),
        num(
          t(
            'A PIN has 4 digits (0–9). How many possible PINs?',
            'PIN មាន 4 ខ្ទង់ (0–9)។ តើ PIN ដែលអាចមានប៉ុន្មាន?',
          ),
          10000,
          { explanation: t('10 × 10 × 10 × 10 = 10,000.', '10 × 10 × 10 × 10 = 10,000។') },
        ),
        num(
          t(
            'A 6-digit PIN: how many times MORE choices than a 4-digit PIN?',
            'PIN 6 ខ្ទង់៖ មានជម្រើសច្រើនជាង PIN 4 ខ្ទង់ប៉ុន្មានដង?',
          ),
          100,
        ),
        mc(
          t(
            'One website you use was hacked. You used the same password on 5 sites. What now?',
            'គេហទំព័រមួយដែលអ្នកប្រើត្រូវបានលួចចូល។ អ្នកបានប្រើពាក្យសម្ងាត់ដូចគ្នាលើ 5 គេហទំព័រ។ ឥឡូវនេះ?',
          ),
          t(
            'Change the password on all 5, each one different',
            'ប្តូរពាក្យសម្ងាត់លើទាំង 5 នីមួយៗខុសគ្នា',
          ),
          [
            t('Change only the hacked one', 'ប្តូរតែមួយដែលត្រូវលួច'),
            t('Do nothing', 'មិនធ្វើអ្វីទេ'),
          ],
        ),
        mc(
          t(
            'Which is the BEST main password for a password manager?',
            'តើមួយណាជាពាក្យសម្ងាត់មេល្អបំផុតសម្រាប់កម្មវិធីគ្រប់គ្រងពាក្យសម្ងាត់?',
          ),
          t('A long passphrase only you know', 'ឃ្លាសម្ងាត់វែងដែលមានតែអ្នកដឹង'),
          [t('Your phone number', 'លេខទូរស័ព្ទរបស់អ្នក'), t('“manager”', '«manager»')],
        ),
        tf(
          t(
            'Websites like “Have I Been Pwned” can tell you if your email was in a leak.',
            'គេហទំព័រដូចជា «Have I Been Pwned» អាចប្រាប់អ្នកថាតើអ៊ីមែលរបស់អ្នកស្ថិតក្នុងការលេចធ្លាយទេ។',
          ),
          true,
        ),
        buildSentence(
          t('Build the rule.', 'បង្កើតច្បាប់។'),
          'Use a long and different password for every account.',
          { say: 'Use a long and different password for every account.' },
        ),
      ],
      games: [
        catchIt(
          t('Catch the STRONG passphrases!', 'ចាប់ឃ្លាសម្ងាត់ខ្លាំង!'),
          ['lime-train-cloud-drum', 'river-kite-mango-nine', 'blue-lotus-rocket-sand'],
          ['123456', 'password', 'abc123', 'sokha99'],
          { speed: 'normal' },
        ),
        memory(
          t(
            'Match the bad habit to the better habit.',
            'ផ្គូផ្គងទម្លាប់អាក្រក់ជាមួយទម្លាប់ល្អជាង។',
          ),
          [
            [
              t('Same password everywhere', 'ពាក្យសម្ងាត់ដូចគ្នាគ្រប់កន្លែង'),
              t('One per account', 'មួយក្នុងមួយគណនី'),
            ],
            [t('Short password', 'ពាក្យសម្ងាត់ខ្លី'), t('Long passphrase', 'ឃ្លាសម្ងាត់វែង')],
            [t('Sticky note', 'ក្រដាសបិទ'), t('Password manager', 'កម្មវិធីគ្រប់គ្រង')],
            [t('Birthday', 'ថ្ងៃកំណើត'), t('Random words', 'ពាក្យចៃដន្យ')],
          ],
        ),
      ],
      reward: t(
        'Your passwords are now harder to crack than a safe! 🔑',
        'ពាក្យសម្ងាត់របស់អ្នកឥឡូវពិបាកបំបែកជាងទូដែក! 🔑',
      ),
    },
  ),

  // 3 ─────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'two-factor-authentication',
    '📲',
    t('Two-Factor Authentication', 'ការផ្ទៀងផ្ទាត់ពីរកត្តា'),
    t('A second lock on your accounts.', 'សោទីពីរលើគណនីរបស់អ្នក។'),
    {
      intro: [
        '📲',
        t(
          'Even if someone steals your password, 2FA can still stop them.',
          'ទោះនរណាម្នាក់លួចពាក្យសម្ងាត់របស់អ្នក 2FA នៅតែអាចបញ្ឈប់ពួកគេ។',
        ),
      ],
      learn: [
        [
          '🧠',
          t('Something you know', 'អ្វីដែលអ្នកដឹង'),
          t('A password or PIN.', 'ពាក្យសម្ងាត់ ឬ PIN។'),
        ],
        [
          '📱',
          t('Something you have', 'អ្វីដែលអ្នកមាន'),
          t(
            'Your phone with a code app, or a security key.',
            'ទូរស័ព្ទរបស់អ្នកមានកម្មវិធីលេខកូដ ឬកូនសោសុវត្ថិភាព។',
          ),
          'code',
        ],
        [
          '👆',
          t('Something you are', 'អ្វីដែលអ្នកជា'),
          t('Your fingerprint or face.', 'ស្នាមម្រាមដៃ ឬមុខរបស់អ្នក។'),
          'fingerprint',
        ],
        [
          '🚫',
          t('Never share codes', 'កុំចែករំលែកលេខកូដ'),
          t(
            'A real company will NEVER ask you for your 2FA code.',
            'ក្រុមហ៊ុនពិតនឹងមិនដែលសុំលេខកូដ 2FA របស់អ្នកឡើយ។',
          ),
        ],
      ],
      see: [
        t(
          'Log in: password ✅ → code from the app: 482 915 ✅ → you are in!\nAttacker: stolen password ✅ → no phone ❌ → blocked!',
          'ចូល៖ ពាក្យសម្ងាត់ ✅ → លេខកូដពីកម្មវិធី៖ 482 915 ✅ → អ្នកចូលបាន!\nអ្នកវាយប្រហារ៖ ពាក្យសម្ងាត់លួច ✅ → គ្មានទូរស័ព្ទ ❌ → ត្រូវបានរារាំង!',
        ),
        t(
          'Two different kinds of proof are much stronger than one.',
          'ភស្តុតាងពីរប្រភេទខុសគ្នាខ្លាំងជាងមួយច្រើន។',
        ),
      ],
      words: [
        ['code', 'លេខកូដ', '🔢'],
        ['verify', 'ផ្ទៀងផ្ទាត់', '✅'],
        ['fingerprint', 'ស្នាមម្រាមដៃ', '👆'],
        ['login', 'ចូលគណនី'],
      ],
      play: [
        mc(
          t('What does 2FA add to your password?', 'តើ 2FA បន្ថែមអ្វីទៅពាក្យសម្ងាត់របស់អ្នក?'),
          t('A second proof, like a phone code', 'ភស្តុតាងទីពីរ ដូចជាលេខកូដទូរស័ព្ទ'),
          [t('A longer username', 'ឈ្មោះអ្នកប្រើវែងជាង'), t('A new email', 'អ៊ីមែលថ្មី')],
        ),
        mc(
          t('A fingerprint is “something you…”', 'ស្នាមម្រាមដៃគឺ «អ្វីដែលអ្នក…»'),
          t('are', 'ជា'),
          [t('know', 'ដឹង'), t('have', 'មាន')],
        ),
        mc(
          t(
            'A phone with a code app is “something you…”',
            'ទូរស័ព្ទមានកម្មវិធីលេខកូដគឺ «អ្វីដែលអ្នក…»',
          ),
          t('have', 'មាន'),
          [t('know', 'ដឹង'), t('are', 'ជា')],
        ),
        tf(
          t(
            'A bank staff member may call and ask for your 2FA code.',
            'បុគ្គលិកធនាគារអាចទូរស័ព្ទ ហើយសុំលេខកូដ 2FA របស់អ្នក។',
          ),
          false,
          {
            explanation: t(
              'Anyone asking for your code is a scammer.',
              'អ្នកណាដែលសុំលេខកូដរបស់អ្នកគឺជាអ្នកបោកប្រាស់។',
            ),
          },
        ),
        tf(
          t(
            '2FA can stop an attacker who has stolen your password.',
            '2FA អាចបញ្ឈប់អ្នកវាយប្រហារដែលបានលួចពាក្យសម្ងាត់របស់អ្នក។',
          ),
          true,
        ),
        mc(
          t(
            'Which account should you protect with 2FA FIRST?',
            'តើគណនីណាដែលអ្នកគួរការពារជាមួយ 2FA មុនគេ?',
          ),
          t(
            'Your email (it can reset other passwords)',
            'អ៊ីមែលរបស់អ្នក (វាអាចកំណត់ពាក្យសម្ងាត់ផ្សេងឡើងវិញ)',
          ),
          [
            t('A game you never play', 'ហ្គេមដែលអ្នកមិនដែលលេង'),
            t('A weather app', 'កម្មវិធីអាកាសធាតុ'),
          ],
        ),
        mc(
          t(
            'A 2FA code arrives but you did NOT try to log in. What does it mean?',
            'លេខកូដ 2FA មកដល់ តែអ្នកមិនបានព្យាយាមចូលទេ។ តើវាមានន័យអ្វី?',
          ),
          t(
            'Someone may have your password — change it',
            'នរណាម្នាក់អាចមានពាក្យសម្ងាត់របស់អ្នក — ប្តូរវា',
          ),
          [t('You won a prize', 'អ្នកឈ្នះរង្វាន់'), t('Nothing', 'គ្មានអ្វីទេ')],
        ),
        tf(
          t(
            'An authenticator app is usually safer than SMS codes.',
            'កម្មវិធី authenticator ជាធម្មតាមានសុវត្ថិភាពជាងលេខកូដ SMS។',
          ),
          true,
        ),
      ],
      challenge: [
        sortInto(
          t('Know, have or are?', 'ដឹង មាន ឬជា?'),
          [
            ['k', t('Know', 'ដឹង'), '🧠'],
            ['h', t('Have', 'មាន'), '📱'],
            ['a', t('Are', 'ជា'), '👆'],
          ],
          [
            [t('Password', 'ពាក្យសម្ងាត់'), 'k'],
            ['PIN', 'k'],
            [t('Phone code app', 'កម្មវិធីលេខកូដ'), 'h'],
            [t('Security key', 'កូនសោសុវត្ថិភាព'), 'h'],
            [t('Fingerprint', 'ស្នាមម្រាមដៃ'), 'a'],
            [t('Face scan', 'ស្កេនមុខ'), 'a'],
          ],
        ),
        tf(
          t(
            'Password + PIN counts as two DIFFERENT factors.',
            'ពាក្យសម្ងាត់ + PIN រាប់ជាកត្តាពីរផ្សេងគ្នា។',
          ),
          false,
          { explanation: t('Both are “something you know”.', 'ទាំងពីរជា «អ្វីដែលអ្នកដឹង»។') },
        ),
        mc(
          t('What is the message really trying to do?', 'តើសារនេះពិតជាព្យាយាមធ្វើអ្វី?'),
          t('Steal your 2FA code', 'លួចលេខកូដ 2FA របស់អ្នក'),
          [t('Help you', 'ជួយអ្នក'), t('Give you a gift', 'ឱ្យកាដូអ្នក')],
          {
            data: emailMock(
              'support@telegram-help.xyz',
              'Account will be deleted!',
              'We noticed a problem. Reply with the 6-digit code we just sent you or your account will be deleted today.',
            ),
          },
        ),
        order(t('Order the steps to turn on 2FA.', 'តម្រៀបជំហានដើម្បីបើក 2FA។'), [
          t('Open account security settings', 'បើកការកំណត់សុវត្ថិភាពគណនី'),
          t('Choose two-step verification', 'ជ្រើសរើសការផ្ទៀងផ្ទាត់ពីរជំហាន'),
          t(
            'Scan the QR code with an authenticator app',
            'ស្កេនកូដ QR ជាមួយកម្មវិធី authenticator',
          ),
          t('Type the code to confirm', 'វាយលេខកូដដើម្បីបញ្ជាក់'),
          t('Save the backup codes safely', 'រក្សាទុកលេខកូដបម្រុងដោយសុវត្ថិភាព'),
        ]),
        mc(
          t('Why save backup codes?', 'ហេតុអ្វីរក្សាទុកលេខកូដបម្រុង?'),
          t('To get in if you lose your phone', 'ដើម្បីចូលបានប្រសិនបើអ្នកបាត់ទូរស័ព្ទ'),
          [
            t('To share with friends', 'ដើម្បីចែករំលែកជាមួយមិត្ត'),
            t('They are not needed', 'វាមិនត្រូវការ'),
          ],
        ),
        num(
          t(
            'A 2FA code changes every 30 seconds. How many codes in 5 minutes?',
            'លេខកូដ 2FA ប្តូររាល់ 30 វិនាទី។ តើប៉ុន្មានលេខកូដក្នុង 5 នាទី?',
          ),
          10,
        ),
        match(t('Match the factor to an example.', 'ផ្គូផ្គងកត្តាជាមួយឧទាហរណ៍។'), [
          [t('Know', 'ដឹង'), t('Passphrase', 'ឃ្លាសម្ងាត់')],
          [t('Have', 'មាន'), t('Authenticator app', 'កម្មវិធី authenticator')],
          [t('Are', 'ជា'), t('Face unlock', 'ដោះសោដោយមុខ')],
        ]),
        buildSentence(
          t('Build the rule.', 'បង្កើតច្បាប់។'),
          'Never share your login code with anyone.',
          { say: 'Never share your login code with anyone.' },
        ),
      ],
      games: [
        memory(t('Match the factor to its emoji.', 'ផ្គូផ្គងកត្តាជាមួយ emoji។'), [
          [t('Password', 'ពាក្យសម្ងាត់'), '🧠'],
          [t('Phone code', 'លេខកូដទូរស័ព្ទ'), '📱'],
          [t('Fingerprint', 'ស្នាមម្រាមដៃ'), '👆'],
          [t('Security key', 'កូនសោសុវត្ថិភាព'), '🔑'],
        ]),
        robot(
          t(
            'Get past both locks 🔒🔒 to reach your account!',
            'ឆ្លងកាត់សោទាំងពីរ 🔒🔒 ដើម្បីទៅដល់គណនីរបស់អ្នក!',
          ),
          ['S*#..', '.##*.', '....G'],
          { goalIcon: '👤', collectIcon: '🔓' },
        ),
      ],
      reward: t(
        'Two locks are better than one — your accounts are safer now! 📲',
        'សោពីរល្អជាងមួយ — គណនីរបស់អ្នកមានសុវត្ថិភាពជាងឥឡូវនេះ! 📲',
      ),
    },
  ),

  // 4 ─────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'phishing-detective',
    '🎣',
    t('Phishing Detective', 'អ្នកស៊ើបអង្កេត Phishing'),
    t('Spot fake emails, messages and links.', 'រកឃើញអ៊ីមែល សារ និងតំណក្លែងក្លាយ។'),
    {
      intro: [
        '🎣',
        t(
          'Phishing is fishing for your passwords with fake messages. Detectives look for clues!',
          'Phishing គឺការស្ទូចពាក្យសម្ងាត់របស់អ្នកជាមួយសារក្លែងក្លាយ។ អ្នកស៊ើបអង្កេតរកតម្រុយ!',
        ),
      ],
      learn: [
        [
          '📧',
          t('Check the sender', 'ពិនិត្យអ្នកផ្ញើ'),
          t(
            'Look at the real address: ababank.com vs aba-bank-secure.xyz',
            'មើលអាសយដ្ឋានពិត៖ ababank.com និង aba-bank-secure.xyz',
          ),
          'sender',
        ],
        [
          '⏰',
          t('Pressure', 'សម្ពាធ'),
          t(
            '“Act NOW or lose your account!” — rushing you is a red flag.',
            '«ធ្វើឥឡូវនេះ បើមិនដូច្នោះបាត់គណនី!» — ការប្រញាប់ប្រញាល់ជាទង់ក្រហម។',
          ),
          'urgent',
        ],
        [
          '🔗',
          t('Hover the link', 'ដាក់កណ្តុរលើតំណ'),
          t('See where it really goes before you click.', 'មើលកន្លែងដែលវាពិតជាទៅមុនពេលអ្នកចុច។'),
          'link',
        ],
        [
          '🎁',
          t('Too good to be true', 'ល្អពេកមិនពិត'),
          t(
            'Free iPhones and lottery wins you never entered = scam.',
            'iPhone ឥតគិតថ្លៃ និងការឈ្នះឆ្នោតដែលអ្នកមិនដែលចូលរួម = បោកប្រាស់។',
          ),
        ],
      ],
      see: [
        t(
          'From: security@wing-money-alert.top\n“Your account is locked! Log in within 1 hour: http://wing-login.top”',
          'ពី៖ security@wing-money-alert.top\n«គណនីរបស់អ្នកត្រូវបានចាក់សោ! ចូលក្នុងរយៈពេល 1 ម៉ោង៖ http://wing-login.top»',
        ),
        t(
          'Clues: strange domain, pressure, a link to log in. It is phishing.',
          'តម្រុយ៖ ដែនចម្លែក សម្ពាធ តំណសម្រាប់ចូល។ វាជា phishing។',
        ),
      ],
      words: [
        ['phishing', 'ការបោកយកព័ត៌មាន', '🎣'],
        ['scam', 'ការបោកប្រាស់', '🚩'],
        ['fake', 'ក្លែងក្លាយ'],
        ['report', 'រាយការណ៍', '📢'],
      ],
      play: [
        mc(
          t('Is this email safe or phishing?', 'តើអ៊ីមែលនេះមានសុវត្ថិភាព ឬ phishing?'),
          t('Phishing', 'Phishing'),
          [t('Safe', 'មានសុវត្ថិភាព')],
          {
            data: emailMock(
              'prize@lucky-winner-kh.top',
              'You won $5,000!!!',
              'Congratulations! Click the link and enter your bank card number to receive your prize today.',
            ),
          },
        ),
        mc(
          t('What is the BIGGEST clue here?', 'តើអ្វីជាតម្រុយធំបំផុតនៅទីនេះ?'),
          t('The sender domain is not Facebook', 'ដែនអ្នកផ្ញើមិនមែន Facebook'),
          [t('It mentions Facebook', 'វានិយាយពី Facebook'), t('It is short', 'វាខ្លី')],
          {
            data: emailMock(
              'no-reply@faceb00k-security.com',
              'Unusual login',
              'We blocked a login. Confirm your password here to keep your account.',
            ),
          },
        ),
        tf(
          t(
            'Real companies often ask you to send your password by email.',
            'ក្រុមហ៊ុនពិតជាញឹកញាប់សុំឱ្យអ្នកផ្ញើពាក្យសម្ងាត់តាមអ៊ីមែល។',
          ),
          false,
        ),
        mc(
          t('Where does this link REALLY go?', 'តើតំណនេះពិតជាទៅណា?'),
          'free-gift.xyz',
          ['google.com', t('A safe page', 'ទំព័រមានសុវត្ថិភាព')],
          {
            data: urlMock('https://google.com.free-gift.xyz/login'),
            explanation: t(
              'The real domain is the last part before the first single “/”: free-gift.xyz.',
              'ដែនពិតគឺផ្នែកចុងក្រោយមុន «/» ទីមួយ៖ free-gift.xyz។',
            ),
          },
        ),
        tf(
          t(
            '“Urgent! Act in 10 minutes!” is a common phishing trick.',
            '«បន្ទាន់! ធ្វើក្នុង 10 នាទី!» ជាល្បិច phishing ទូទៅ។',
          ),
          true,
        ),
        mc(
          t(
            'You get a suspicious message. Best action?',
            'អ្នកទទួលបានសារគួរឱ្យសង្ស័យ។ សកម្មភាពល្អបំផុត?',
          ),
          t('Do not click; report and delete it', 'កុំចុច រាយការណ៍ ហើយលុបវា'),
          [t('Click to check', 'ចុចដើម្បីពិនិត្យ'), t('Forward it to friends', 'បញ្ជូនវាទៅមិត្ត')],
        ),
        mc(
          t('Phishing can also arrive by…', 'Phishing ក៏អាចមកតាម…'),
          t('SMS, Telegram and phone calls', 'SMS, Telegram និងការហៅទូរស័ព្ទ'),
          [t('only paper letters', 'តែសំបុត្រក្រដាស'), t('only TV', 'តែទូរទស្សន៍')],
        ),
        tf(
          t(
            'A message from a friend’s account can still be phishing if their account was hacked.',
            'សារពីគណនីមិត្តនៅតែអាចជា phishing ប្រសិនបើគណនីរបស់គេត្រូវបានលួចចូល។',
          ),
          true,
        ),
      ],
      challenge: [
        sortInto(
          t('Real or phishing?', 'ពិត ឬ phishing?'),
          [
            ['ok', t('Looks real', 'មើលទៅពិត'), '✅'],
            ['ph', t('Phishing', 'Phishing'), '🎣'],
          ],
          [
            [
              t(
                'School newsletter from your teacher’s usual address',
                'ព្រឹត្តិប័ត្រសាលាពីអាសយដ្ឋានធម្មតារបស់គ្រូ',
              ),
              'ok',
            ],
            [t('Receipt for something you bought', 'បង្កាន់ដៃសម្រាប់អ្វីដែលអ្នកបានទិញ'), 'ok'],
            [
              t(
                '“Verify your card or be arrested”',
                '«ផ្ទៀងផ្ទាត់កាតរបស់អ្នក បើមិនដូច្នោះត្រូវចាប់ខ្លួន»',
              ),
              'ph',
            ],
            [
              t('“You won a lottery you never entered”', '«អ្នកឈ្នះឆ្នោតដែលអ្នកមិនដែលចូលរួម»'),
              'ph',
            ],
            [t('“Send your 2FA code to unlock”', '«ផ្ញើលេខកូដ 2FA ដើម្បីដោះសោ»'), 'ph'],
          ],
        ),
        mc(
          t(
            'How many phishing clues are in this email?',
            'តើមានតម្រុយ phishing ប៉ុន្មានក្នុងអ៊ីមែលនេះ?',
          ),
          '3',
          ['0', '1', '6'],
          {
            data: emailMock(
              'admin@ministry-gov-kh.top',
              'URGENT: scholarship ends TODAY',
              'Pay a $20 fee by card in the next hour to keep your scholarship.',
            ),
            explanation: t(
              'Fake domain, urgent pressure, asking for money.',
              'ដែនក្លែងក្លាយ សម្ពាធបន្ទាន់ សុំលុយ។',
            ),
          },
        ),
        order(t('Order the detective steps.', 'តម្រៀបជំហានអ្នកស៊ើបអង្កេត។'), [
          t('Stop — do not rush', 'ឈប់ — កុំប្រញាប់'),
          t('Check the sender address', 'ពិនិត្យអាសយដ្ឋានអ្នកផ្ញើ'),
          t('Hover over links', 'ដាក់កណ្តុរលើតំណ'),
          t('Contact the company another way', 'ទាក់ទងក្រុមហ៊ុនតាមវិធីផ្សេង'),
          t('Report and delete', 'រាយការណ៍ និងលុប'),
        ]),
        mc(
          t('Which link is the REAL Wikipedia?', 'តើតំណណាជា Wikipedia ពិត?'),
          'https://en.wikipedia.org/wiki/Cambodia',
          [
            'https://wikipedia.org.login-check.xyz',
            'https://wikipedla.org/wiki/Cambodia',
            'http://wiki-pedia.top',
          ],
        ),
        tf(
          t(
            'If you clicked a phishing link and typed your password, change it right away.',
            'ប្រសិនបើអ្នកបានចុចតំណ phishing ហើយវាយពាក្យសម្ងាត់ ប្តូរវាភ្លាមៗ។',
          ),
          true,
        ),
        match(t('Match the trick to the clue.', 'ផ្គូផ្គងល្បិចជាមួយតម្រុយ។'), [
          [t('Fake sender', 'អ្នកផ្ញើក្លែងក្លាយ'), t('Strange domain', 'ដែនចម្លែក')],
          [t('Pressure', 'សម្ពាធ'), t('“Only 1 hour!”', '«តែ 1 ម៉ោង!»')],
          [t('Bait', 'នុយ'), t('Free prize', 'រង្វាន់ឥតគិតថ្លៃ')],
          [t('Data grab', 'ការចាប់យកទិន្នន័យ'), t('“Enter your card”', '«បញ្ចូលកាតរបស់អ្នក»')],
        ]),
        mc(
          t(
            'Your “boss” messages: “Buy 5 gift cards now and send the codes.” You…',
            '«ចៅហ្វាយ» របស់អ្នកផ្ញើសារ៖ «ទិញកាតអំណោយ 5 ឥឡូវ ហើយផ្ញើលេខកូដ»។ អ្នក…',
          ),
          t(
            'call your boss on their known number to check',
            'ទូរស័ព្ទទៅចៅហ្វាយតាមលេខដែលស្គាល់ដើម្បីពិនិត្យ',
          ),
          [
            t('buy them quickly', 'ទិញវាយ៉ាងលឿន'),
            t('reply with your bank details', 'ឆ្លើយតបជាមួយព័ត៌មានធនាគាររបស់អ្នក'),
          ],
        ),
        buildSentence(t('Build the rule.', 'បង្កើតច្បាប់។'), 'Stop and check before you click.', {
          say: 'Stop and check before you click.',
        }),
      ],
      games: [
        catchIt(
          t('Catch the PHISHING clues!', 'ចាប់តម្រុយ phishing!'),
          [
            t('“Act now!”', '«ធ្វើឥឡូវ!»'),
            t('Strange domain', 'ដែនចម្លែក'),
            t('“Send your code”', '«ផ្ញើលេខកូដ»'),
            t('Free prize', 'រង្វាន់ឥតគិតថ្លៃ'),
          ],
          [
            t('Known sender', 'អ្នកផ្ញើស្គាល់'),
            t('No links', 'គ្មានតំណ'),
            t('Normal tone', 'សំនៀងធម្មតា'),
          ],
          { speed: 'normal' },
        ),
        memory(t('Match the fake domain to the real one.', 'ផ្គូផ្គងដែនក្លែងក្លាយជាមួយដែនពិត។'), [
          ['faceb00k.com', 'facebook.com'],
          ['g00gle.com', 'google.com'],
          ['paypa1.com', 'paypal.com'],
          ['yout-ube.top', 'youtube.com'],
        ]),
      ],
      reward: t(
        'Detective badge earned! 🎣 Scammers will not fool you.',
        'ទទួលបានស្លាកអ្នកស៊ើបអង្កេត! 🎣 អ្នកបោកប្រាស់នឹងមិនបញ្ឆោតអ្នកបានឡើយ។',
      ),
    },
  ),

  // 5 ─────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'social-engineering',
    '🎭',
    t('Social Engineering', 'វិស្វកម្មសង្គម'),
    t(
      'When attackers trick people, not computers.',
      'ពេលអ្នកវាយប្រហារបញ្ឆោតមនុស្ស មិនមែនកុំព្យូទ័រ។',
    ),
    {
      intro: [
        '🎭',
        t(
          'Why break a lock when you can ask someone to open the door? That is social engineering.',
          'ហេតុអ្វីបំបែកសោពេលអ្នកអាចសុំនរណាម្នាក់បើកទ្វារ? នោះជាវិស្វកម្មសង្គម។',
        ),
      ],
      learn: [
        [
          '🎭',
          t('Pretending', 'ការក្លែងបន្លំ'),
          t(
            'Attackers pretend to be IT staff, police, a bank or a boss.',
            'អ្នកវាយប្រហារក្លែងខ្លួនជាបុគ្គលិក IT ប៉ូលិស ធនាគារ ឬចៅហ្វាយ។',
          ),
          'pretend',
        ],
        [
          '😱',
          t('Emotions', 'អារម្មណ៍'),
          t(
            'They use fear, hurry, kindness or greed to make you act fast.',
            'ពួកគេប្រើការភ័យខ្លាច ការប្រញាប់ ចិត្តល្អ ឬលោភលន់ដើម្បីឱ្យអ្នកធ្វើលឿន។',
          ),
        ],
        [
          '🚪',
          t('Tailgating', 'ការដើរតាមក្រោយ'),
          t(
            'Following someone through a locked door without a badge.',
            'ដើរតាមនរណាម្នាក់ឆ្លងទ្វារចាក់សោដោយគ្មានកាត។',
          ),
        ],
        [
          '☎️',
          t('Verify', 'ផ្ទៀងផ្ទាត់'),
          t(
            'Hang up and call back on an official number you already know.',
            'បិទទូរស័ព្ទ ហើយហៅត្រឡប់តាមលេខផ្លូវការដែលអ្នកដឹងរួច។',
          ),
          'verify',
        ],
      ],
      see: [
        t(
          '📞 “Hi, I’m from IT. Your computer has a virus. Tell me your password so I can fix it.”\n✅ You: “I’ll call the IT desk myself to check.”',
          '📞 «សួស្តី ខ្ញុំមកពី IT។ កុំព្យូទ័ររបស់អ្នកមានមេរោគ។ ប្រាប់ពាក្យសម្ងាត់របស់អ្នក ដើម្បីឱ្យខ្ញុំជួសជុលវា»។\n✅ អ្នក៖ «ខ្ញុំនឹងទូរស័ព្ទទៅផ្នែក IT ខ្លួនឯងដើម្បីពិនិត្យ»។',
        ),
        t(
          'Real IT staff never need your password.',
          'បុគ្គលិក IT ពិតមិនដែលត្រូវការពាក្យសម្ងាត់របស់អ្នកទេ។',
        ),
      ],
      words: [
        ['trick', 'ល្បិច', '🎭'],
        ['trust', 'ទុកចិត្ត', '🤝'],
        ['stranger', 'មនុស្សចម្លែក'],
        ['badge', 'កាតសម្គាល់', '🪪'],
      ],
      play: [
        mc(
          t('Social engineering attacks…', 'វិស្វកម្មសង្គមវាយប្រហារ…'),
          t('people, by tricking them', 'មនុស្ស ដោយបញ្ឆោតពួកគេ'),
          [t('only computer chips', 'តែបន្ទះឈីបកុំព្យូទ័រ'), t('the weather', 'អាកាសធាតុ')],
        ),
        tf(
          t(
            'Real IT staff will ask for your password to fix your computer.',
            'បុគ្គលិក IT ពិតនឹងសុំពាក្យសម្ងាត់របស់អ្នកដើម្បីជួសជុលកុំព្យូទ័រ។',
          ),
          false,
        ),
        mc(
          t(
            'A caller says they are from your bank and asks for your PIN. You…',
            'អ្នកហៅនិយាយថាពួកគេមកពីធនាគាររបស់អ្នក ហើយសុំ PIN។ អ្នក…',
          ),
          t(
            'hang up and call the bank’s official number',
            'បិទទូរស័ព្ទ ហើយហៅលេខផ្លូវការរបស់ធនាគារ',
          ),
          [t('give the PIN', 'ផ្តល់ PIN'), t('give half the PIN', 'ផ្តល់ PIN ពាក់កណ្តាល')],
        ),
        mc(
          t('Which feeling do scammers use most?', 'តើអារម្មណ៍ណាដែលអ្នកបោកប្រាស់ប្រើច្រើនបំផុត?'),
          t('Fear and hurry', 'ការភ័យខ្លាច និងការប្រញាប់'),
          [t('Boredom', 'ការធុញទ្រាន់'), t('Sleepiness', 'ការងងុយគេង')],
        ),
        tf(
          t(
            'Holding a secure door open for a stranger without a badge is risky.',
            'ការបើកទ្វារសុវត្ថិភាពឱ្យមនុស្សចម្លែកគ្មានកាតគឺប្រថុយ។',
          ),
          true,
        ),
        mc(
          t(
            'Someone looks over your shoulder at your PIN. This is…',
            'នរណាម្នាក់មើលពីលើស្មារបស់អ្នកទៅ PIN។ នេះគឺ…',
          ),
          t('shoulder surfing', 'ការលួចមើលពីលើស្មា'),
          [t('cloud storage', 'ការផ្ទុកពពក'), t('a firewall', 'ជញ្ជាំងភ្លើង')],
        ),
        tf(
          t(
            'It is OK to say “no” or “let me check first” to someone in a hurry.',
            'វាមិនអីទេក្នុងការនិយាយ «ទេ» ឬ «ឱ្យខ្ញុំពិនិត្យមុន» ទៅនរណាម្នាក់ដែលប្រញាប់។',
          ),
          true,
        ),
        mc(
          t(
            'A USB labelled “Salaries 2028” is on the floor. Best action?',
            'USB មានស្លាក «ប្រាក់ខែ 2028» នៅលើឥដ្ឋ។ សកម្មភាពល្អបំផុត?',
          ),
          t('Give it to IT without plugging it in', 'ឱ្យវាទៅ IT ដោយមិនដោត'),
          [t('Plug it in to look', 'ដោតដើម្បីមើល'), t('Take it home', 'យកវាទៅផ្ទះ')],
        ),
      ],
      challenge: [
        sortInto(
          t('Which emotion is the scammer using?', 'តើអ្នកបោកប្រាស់កំពុងប្រើអារម្មណ៍ណា?'),
          [
            ['f', t('Fear', 'ការភ័យខ្លាច'), '😱'],
            ['g', t('Greed', 'លោភលន់'), '🤑'],
            ['k', t('Kindness', 'ចិត្តល្អ'), '🤗'],
          ],
          [
            [t('“Police will arrest you today!”', '«ប៉ូលិសនឹងចាប់ខ្លួនអ្នកថ្ងៃនេះ!»'), 'f'],
            [t('“Your account will be deleted!”', '«គណនីរបស់អ្នកនឹងត្រូវលុប!»'), 'f'],
            [t('“Double your money in a week!”', '«បង្កើនលុយទ្វេដងក្នុងមួយសប្តាហ៍!»'), 'g'],
            [t('“Free iPhone for the first 10!”', '«iPhone ឥតគិតថ្លៃសម្រាប់ 10 នាក់ដំបូង!»'), 'g'],
            [
              t(
                '“Please help, my phone is broken, send $10”',
                '«សូមជួយ ទូរស័ព្ទខ្ញុំខូច ផ្ញើ $10»',
              ),
              'k',
            ],
            [
              t('“Can you hold the door? My hands are full”', '«អាចបើកទ្វារបានទេ? ដៃខ្ញុំពេញ»'),
              'k',
            ],
          ],
        ),
        order(
          t(
            'Order the safe response to a suspicious call.',
            'តម្រៀបការឆ្លើយតបសុវត្ថិភាពចំពោះការហៅគួរឱ្យសង្ស័យ។',
          ),
          [
            t('Stay calm', 'នៅស្ងៀម'),
            t('Share nothing', 'មិនចែករំលែកអ្វីទេ'),
            t('Hang up', 'បិទទូរស័ព្ទ'),
            t('Call the official number yourself', 'ហៅលេខផ្លូវការខ្លួនឯង'),
            t('Report it', 'រាយការណ៍វា'),
          ],
        ),
        mc(
          t(
            'A “friend” on Telegram with a new number asks you to send money urgently. First?',
            '«មិត្ត» លើ Telegram មានលេខថ្មីសុំឱ្យអ្នកផ្ញើលុយបន្ទាន់។ ធ្វើអ្វីមុន?',
          ),
          t(
            'Call your friend’s old number to check it is really them',
            'ហៅលេខចាស់របស់មិត្តដើម្បីពិនិត្យថាពិតជាគាត់',
          ),
          [t('Send the money', 'ផ្ញើលុយ'), t('Send half', 'ផ្ញើពាក់កណ្តាល')],
        ),
        tf(
          t(
            'Posting your school, class and daily routine publicly helps social engineers.',
            'ការបង្ហោះសាលា ថ្នាក់ និងទម្លាប់ប្រចាំថ្ងៃជាសាធារណៈជួយអ្នកវិស្វកម្មសង្គម។',
          ),
          true,
        ),
        match(t('Match the trick to the defence.', 'ផ្គូផ្គងល្បិចជាមួយការការពារ។'), [
          [
            t('Fake IT call', 'ការហៅ IT ក្លែងក្លាយ'),
            t('Call IT back yourself', 'ហៅ IT ត្រឡប់ខ្លួនឯង'),
          ],
          [t('Tailgating', 'ការដើរតាមក្រោយ'), t('Ask to see a badge', 'សុំមើលកាត')],
          [t('Shoulder surfing', 'លួចមើលពីលើស្មា'), t('Cover your PIN', 'គ្រប PIN របស់អ្នក')],
          [t('Found USB', 'USB ដែលរកឃើញ'), t('Hand it to IT', 'ឱ្យវាទៅ IT')],
        ]),
        mc(
          t(
            'Which is a SAFE thing to share with a caller you do not know?',
            'តើអ្វីជារឿងមានសុវត្ថិភាពក្នុងការចែករំលែកជាមួយអ្នកហៅដែលអ្នកមិនស្គាល់?',
          ),
          t(
            'Nothing personal — ask for their name and call back',
            'គ្មានអ្វីផ្ទាល់ខ្លួន — សួរឈ្មោះរបស់គេ ហើយហៅត្រឡប់',
          ),
          [
            t('Your date of birth', 'ថ្ងៃខែឆ្នាំកំណើតរបស់អ្នក'),
            t('Your OTP code', 'លេខកូដ OTP របស់អ្នក'),
          ],
        ),
        num(
          t(
            'A scammer calls 200 people; 1 in 50 is tricked. How many people are tricked?',
            'អ្នកបោកប្រាស់ហៅមនុស្ស 200 នាក់ 1 ក្នុង 50 ត្រូវបានបញ្ឆោត។ តើប៉ុន្មាននាក់ត្រូវបានបញ្ឆោត?',
          ),
          4,
        ),
        buildSentence(
          t('Build the rule.', 'បង្កើតច្បាប់។'),
          'Hang up and call back on a number you trust.',
          { say: 'Hang up and call back on a number you trust.' },
        ),
      ],
      games: [
        catchIt(
          t('Catch the SAFE responses!', 'ចាប់ការឆ្លើយតបសុវត្ថិភាព!'),
          [
            t('Let me check first', 'ឱ្យខ្ញុំពិនិត្យមុន'),
            t('I will call you back', 'ខ្ញុំនឹងហៅត្រឡប់'),
            t('Can I see your badge?', 'ខ្ញុំអាចមើលកាតបានទេ?'),
            t('No, sorry', 'ទេ សុំទោស'),
          ],
          [
            t('Here is my PIN', 'នេះជា PIN ខ្ញុំ'),
            t('OK, I will send money', 'យល់ព្រម ខ្ញុំនឹងផ្ញើលុយ'),
            t('My code is 4829', 'លេខកូដខ្ញុំគឺ 4829'),
          ],
          { speed: 'slow' },
        ),
        memory(
          t(
            'Match the disguise to what they ask for.',
            'ផ្គូផ្គងការក្លែងខ្លួនជាមួយអ្វីដែលពួកគេសុំ។',
          ),
          [
            [['🧑‍💻', t('Fake IT', 'IT ក្លែងក្លាយ')], t('Your password', 'ពាក្យសម្ងាត់របស់អ្នក')],
            [['🏦', t('Fake bank', 'ធនាគារក្លែងក្លាយ')], t('Your PIN', 'PIN របស់អ្នក')],
            [['👮', t('Fake police', 'ប៉ូលិសក្លែងក្លាយ')], t('A “fine”', '«ការផាកពិន័យ»')],
            [['👔', t('Fake boss', 'ចៅហ្វាយក្លែងក្លាយ')], t('Gift cards', 'កាតអំណោយ')],
          ],
        ),
      ],
      reward: t(
        'You cannot be tricked easily — great defence! 🎭',
        'អ្នកមិនអាចត្រូវបានបញ្ឆោតដោយងាយ — ការការពារល្អ! 🎭',
      ),
    },
  ),

  // 6 ─────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'malware',
    '🦠',
    t('Malware: Bad Software', 'Malware៖ កម្មវិធីអាក្រក់'),
    t(
      'Viruses, ransomware, spyware — and how to stop them.',
      'មេរោគ ransomware spyware — និងរបៀបបញ្ឈប់វា។',
    ),
    {
      intro: [
        '🦠',
        t(
          'Malware is software made to harm you. Know the enemy, then block it!',
          'Malware ជាកម្មវិធីដែលបង្កើតឡើងដើម្បីធ្វើបាបអ្នក។ ស្គាល់សត្រូវ រួចរារាំងវា!',
        ),
      ],
      learn: [
        [
          '🦠',
          t('Virus / worm', 'មេរោគ / worm'),
          t(
            'Copies itself and spreads to other files or computers.',
            'ចម្លងខ្លួនឯង ហើយរាលដាលទៅឯកសារ ឬកុំព្យូទ័រផ្សេង។',
          ),
          'virus',
        ],
        [
          '🔒',
          'Ransomware',
          t(
            'Locks your files and asks for money to unlock them.',
            'ចាក់សោឯកសាររបស់អ្នក ហើយសុំលុយដើម្បីដោះសោ។',
          ),
          'ransomware',
        ],
        [
          '🕵️',
          'Spyware',
          t('Secretly watches what you type and do.', 'មើលដោយសម្ងាត់នូវអ្វីដែលអ្នកវាយ និងធ្វើ។'),
          'spyware',
        ],
        [
          '🐴',
          t('Trojan', 'Trojan'),
          t(
            'Looks like a useful app (free game, “cracked” software) but hides malware.',
            'មើលទៅដូចកម្មវិធីមានប្រយោជន៍ (ហ្គេមឥតគិតថ្លៃ កម្មវិធី «crack») តែលាក់ malware។',
          ),
        ],
      ],
      see: [
        t(
          '“FREE_Photoshop_crack.exe” 🐴\n→ installs a game… and secretly a spyware 🕵️\n→ your Facebook password is stolen',
          '«FREE_Photoshop_crack.exe» 🐴\n→ ដំឡើងហ្គេម… និង spyware ដោយសម្ងាត់ 🕵️\n→ ពាក្យសម្ងាត់ Facebook របស់អ្នកត្រូវបានលួច',
        ),
        t(
          '“Free” cracked software is one of the most common ways malware spreads.',
          'កម្មវិធី crack «ឥតគិតថ្លៃ» គឺជាវិធីទូទៅបំផុតមួយដែល malware រាលដាល។',
        ),
      ],
      words: [
        ['malware', 'កម្មវិធីព្យាបាទ', '🦠'],
        ['virus', 'មេរោគ'],
        ['antivirus', 'កម្មវិធីកំចាត់មេរោគ', '🛡️'],
        ['infect', 'ឆ្លង'],
      ],
      play: [
        mc(
          t('Which malware locks files and asks for money?', 'តើ malware ណាចាក់សោឯកសារ ហើយសុំលុយ?'),
          'Ransomware',
          ['Spyware', t('Trojan', 'Trojan'), t('Antivirus', 'កម្មវិធីកំចាត់មេរោគ')],
        ),
        mc(
          t(
            'Which malware secretly records what you type?',
            'តើ malware ណាថតដោយសម្ងាត់នូវអ្វីដែលអ្នកវាយ?',
          ),
          'Spyware',
          ['Ransomware', t('Firewall', 'ជញ្ជាំងភ្លើង'), t('Backup', 'ការបម្រុង')],
        ),
        mc(
          t(
            'A “free cracked game” that hides malware is a…',
            '«ហ្គេម crack ឥតគិតថ្លៃ» ដែលលាក់ malware គឺជា…',
          ),
          t('Trojan', 'Trojan'),
          [t('Firewall', 'ជញ្ជាំងភ្លើង'), t('Update', 'ការធ្វើបច្ចុប្បន្នភាព')],
        ),
        tf(
          t(
            'Antivirus software helps find and remove malware.',
            'កម្មវិធីកំចាត់មេរោគជួយរក និងលុប malware។',
          ),
          true,
        ),
        tf(
          t(
            'Downloading cracked software is safe if it is popular.',
            'ការទាញយកកម្មវិធី crack មានសុវត្ថិភាពប្រសិនបើវាពេញនិយម។',
          ),
          false,
        ),
        mc(
          t('Which is a SIGN of malware?', 'តើមួយណាជាសញ្ញានៃ malware?'),
          t(
            'Many pop-ups and a very slow computer suddenly',
            'ផ្ទាំងលោតច្រើន និងកុំព្យូទ័រយឺតខ្លាំងភ្លាមៗ',
          ),
          [t('A clean desktop', 'ផ្ទៃតុស្អាត'), t('Fast start-up', 'ចាប់ផ្តើមលឿន')],
        ),
        mc(
          t(
            'Which file is MOST dangerous from an unknown email?',
            'តើឯកសារណាគ្រោះថ្នាក់បំផុតពីអ៊ីមែលមិនស្គាល់?',
          ),
          'invoice.pdf.exe',
          ['photo.jpg', 'notes.txt'],
        ),
        tf(
          t(
            'Windows Security (Defender) is a free built-in antivirus.',
            'Windows Security (Defender) ជាកម្មវិធីកំចាត់មេរោគឥតគិតថ្លៃដែលមានស្រាប់។',
          ),
          true,
        ),
      ],
      challenge: [
        match(t('Match the malware to what it does.', 'ផ្គូផ្គង malware ជាមួយអ្វីដែលវាធ្វើ។'), [
          [t('Virus', 'មេរោគ'), t('Spreads to other files', 'រាលដាលទៅឯកសារផ្សេង')],
          ['Ransomware', t('Locks files for money', 'ចាក់សោឯកសារដើម្បីលុយ')],
          ['Spyware', t('Watches you secretly', 'មើលអ្នកដោយសម្ងាត់')],
          [t('Trojan', 'Trojan'), t('Hides inside a “good” app', 'លាក់ក្នុងកម្មវិធី «ល្អ»')],
        ]),
        sortInto(
          t('Risky or safe?', 'ប្រថុយ ឬមានសុវត្ថិភាព?'),
          [
            ['r', t('Risky', 'ប្រថុយ'), '⚠️'],
            ['s', t('Safe', 'មានសុវត្ថិភាព'), '✅'],
          ],
          [
            [t('Cracked Office from a forum', 'Office crack ពីវេទិកា'), 'r'],
            [t('Unknown .exe attachment', 'ឯកសារភ្ជាប់ .exe មិនស្គាល់'), 'r'],
            [t('APK from a Telegram group', 'APK ពីក្រុម Telegram'), 'r'],
            [t('App from the official store', 'កម្មវិធីពីហាងផ្លូវការ'), 's'],
            [t('Windows updates', 'ការធ្វើបច្ចុប្បន្នភាព Windows'), 's'],
            [t('Antivirus scan', 'ការស្កេនកម្មវិធីកំចាត់មេរោគ'), 's'],
          ],
        ),
        order(
          t(
            'Order what to do if you think you have malware.',
            'តម្រៀបអ្វីដែលត្រូវធ្វើប្រសិនបើអ្នកគិតថាមាន malware។',
          ),
          [
            t('Disconnect from the internet', 'ផ្តាច់ពីអ៊ីនធឺណិត'),
            t('Run a full antivirus scan', 'ដំណើរការការស្កេនពេញ'),
            t('Remove what it finds', 'លុបអ្វីដែលវារកឃើញ'),
            t('Change passwords from a clean device', 'ប្តូរពាក្យសម្ងាត់ពីឧបករណ៍ស្អាត'),
            t('Tell IT or a trusted adult', 'ប្រាប់ IT ឬមនុស្សពេញវ័យដែលទុកចិត្ត'),
          ],
        ),
        mc(
          t(
            'Ransomware locked the files. What helps MOST?',
            'Ransomware បានចាក់សោឯកសារ។ តើអ្វីជួយច្រើនបំផុត?',
          ),
          t('A recent backup kept offline', 'ការបម្រុងថ្មីៗដែលរក្សាទុកក្រៅបណ្តាញ'),
          [
            t('Paying quickly', 'បង់ប្រាក់យ៉ាងលឿន'),
            t('Restarting 10 times', 'ចាប់ផ្តើមឡើងវិញ 10 ដង'),
          ],
          {
            explanation: t(
              'Paying does not guarantee your files come back.',
              'ការបង់ប្រាក់មិនធានាថាឯកសាររបស់អ្នកនឹងត្រឡប់មកវិញ។',
            ),
          },
        ),
        mc(
          t('Why is “invoice.pdf.exe” suspicious?', 'ហេតុអ្វី «invoice.pdf.exe» គួរឱ្យសង្ស័យ?'),
          t('It is a program pretending to be a PDF', 'វាជាកម្មវិធីក្លែងខ្លួនជា PDF'),
          [t('PDFs are always bad', 'PDF តែងតែអាក្រក់'), t('The name is too long', 'ឈ្មោះវែងពេក')],
        ),
        tf(
          t(
            'Turning on “Show file extensions” in Windows helps spot fake files.',
            'ការបើក «Show file extensions» ក្នុង Windows ជួយរកឃើញឯកសារក្លែងក្លាយ។',
          ),
          true,
        ),
        num(
          t(
            'A worm doubles every hour: 1 → 2 → 4… How many computers after 5 hours?',
            'Worm កើនទ្វេដងរាល់ម៉ោង៖ 1 → 2 → 4… តើកុំព្យូទ័រប៉ុន្មានក្រោយ 5 ម៉ោង?',
          ),
          32,
        ),
        buildSentence(
          t('Build the rule.', 'បង្កើតច្បាប់។'),
          'Install apps only from official stores.',
          { say: 'Install apps only from official stores.' },
        ),
      ],
      games: [
        catchIt(
          t('Catch the MALWARE!', 'ចាប់ malware!'),
          [
            ['🦠', t('Virus', 'មេរោគ')],
            ['🔒', 'Ransomware'],
            ['🕵️', 'Spyware'],
            ['🐴', t('Trojan', 'Trojan')],
          ],
          [
            ['🛡️', t('Antivirus', 'កម្មវិធីកំចាត់មេរោគ')],
            ['💾', t('Backup', 'ការបម្រុង')],
            ['🔄', t('Update', 'ការធ្វើបច្ចុប្បន្នភាព')],
          ],
          { speed: 'fast' },
        ),
        robot(
          t(
            'Scan the computer: collect the viruses 🦠 and reach the shield!',
            'ស្កេនកុំព្យូទ័រ៖ ប្រមូលមេរោគ 🦠 ហើយទៅដល់ខែល!',
          ),
          ['S.*#.', '#..#*', '..*..', '.##.G'],
          { goalIcon: '🛡️', collectIcon: '🦠' },
        ),
      ],
      reward: t(
        'You know the bad software — and how to keep it out. 🦠🛡️',
        'អ្នកស្គាល់កម្មវិធីអាក្រក់ — និងរបៀបរារាំងវា។ 🦠🛡️',
      ),
    },
  ),

  // 7 ─────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'updates-and-safe-downloads',
    '🔄',
    t('Updates & Safe Downloads', 'ការធ្វើបច្ចុប្បន្នភាព និងការទាញយកសុវត្ថិភាព'),
    t('Patch the holes before attackers find them.', 'បិទរន្ធមុនពេលអ្នកវាយប្រហាររកឃើញវា។'),
    {
      intro: [
        '🔄',
        t(
          'Updates are not just new features — they fix security holes attackers use.',
          'ការធ្វើបច្ចុប្បន្នភាពមិនមែនគ្រាន់តែមុខងារថ្មី — វាជួសជុលរន្ធសុវត្ថិភាពដែលអ្នកវាយប្រហារប្រើ។',
        ),
      ],
      learn: [
        [
          '🕳️',
          t('Vulnerability', 'ភាពងាយរងគ្រោះ'),
          t(
            'A weakness in software that attackers can use.',
            'ចំណុចខ្សោយក្នុងកម្មវិធីដែលអ្នកវាយប្រហារអាចប្រើ។',
          ),
          'weakness',
        ],
        [
          '🩹',
          t('Patch / update', 'Patch / ការធ្វើបច្ចុប្បន្នភាព'),
          t('A fix for the weakness. Install it soon!', 'ការជួសជុលចំណុចខ្សោយ។ ដំឡើងវាឆាប់!'),
          'patch',
        ],
        [
          '🏪',
          t('Official sources', 'ប្រភពផ្លូវការ'),
          t(
            'Download from Google Play, App Store, Microsoft Store or the maker’s real website.',
            'ទាញយកពី Google Play, App Store, Microsoft Store ឬគេហទំព័រពិតរបស់អ្នកបង្កើត។',
          ),
          'official',
        ],
        [
          '🔐',
          t('Permissions', 'ការអនុញ្ញាត'),
          t(
            'Does a torch app need your contacts? No! Deny what is not needed.',
            'តើកម្មវិធីពិលត្រូវការទំនាក់ទំនងរបស់អ្នកទេ? ទេ! បដិសេធអ្វីដែលមិនចាំបាច់។',
          ),
          'permission',
        ],
      ],
      see: [
        t(
          'Old phone, no updates for 3 years → known holes, easy target 🎯\nUpdated phone → holes fixed → much harder to attack 🛡️',
          'ទូរស័ព្ទចាស់ គ្មានការធ្វើបច្ចុប្បន្នភាព 3 ឆ្នាំ → រន្ធដែលគេស្គាល់ គោលដៅងាយ 🎯\nទូរស័ព្ទធ្វើបច្ចុប្បន្នភាព → រន្ធត្រូវបានជួសជុល → ពិបាកវាយប្រហារជាង 🛡️',
        ),
        t('Turn on automatic updates.', 'បើកការធ្វើបច្ចុប្បន្នភាពស្វ័យប្រវត្តិ។'),
      ],
      words: [
        ['update', 'ធ្វើបច្ចុប្បន្នភាព', '🔄'],
        ['download', 'ទាញយក', '⬇️'],
        ['permission', 'ការអនុញ្ញាត', '🔐'],
        ['install', 'ដំឡើង'],
      ],
      play: [
        mc(
          t('Why install updates?', 'ហេតុអ្វីដំឡើងការធ្វើបច្ចុប្បន្នភាព?'),
          t('They fix security holes', 'វាជួសជុលរន្ធសុវត្ថិភាព'),
          [
            t('They make the phone heavier', 'វាធ្វើឱ្យទូរស័ព្ទធ្ងន់ជាង'),
            t('They delete your photos', 'វាលុបរូបថតរបស់អ្នក'),
          ],
        ),
        tf(
          t('Automatic updates are a good idea.', 'ការធ្វើបច្ចុប្បន្នភាពស្វ័យប្រវត្តិជាគំនិតល្អ។'),
          true,
        ),
        mc(
          t(
            'Where is the SAFEST place to get a phone app?',
            'តើកន្លែងណាមានសុវត្ថិភាពបំផុតក្នុងការទទួលបានកម្មវិធីទូរស័ព្ទ?',
          ),
          t('The official app store', 'ហាងកម្មវិធីផ្លូវការ'),
          [
            t('A random Telegram link', 'តំណ Telegram ចៃដន្យ'),
            t('A pop-up ad', 'ការផ្សាយពាណិជ្ជកម្មលោត'),
          ],
        ),
        mc(
          t(
            'A calculator app asks for your camera, contacts and location. You…',
            'កម្មវិធីម៉ាស៊ីនគិតលេខសុំកាមេរ៉ា ទំនាក់ទំនង និងទីតាំងរបស់អ្នក។ អ្នក…',
          ),
          t('deny — it does not need them', 'បដិសេធ — វាមិនត្រូវការវា'),
          [
            t('allow everything', 'អនុញ្ញាតទាំងអស់'),
            t('give your password too', 'ផ្តល់ពាក្យសម្ងាត់ផងដែរ'),
          ],
        ),
        tf(
          t(
            'A pop-up saying “Your phone has 5 viruses! Download this cleaner!” is trustworthy.',
            'ផ្ទាំងលោតនិយាយ «ទូរស័ព្ទរបស់អ្នកមានមេរោគ 5! ទាញយកកម្មវិធីសម្អាតនេះ!» គួរឱ្យទុកចិត្ត។',
          ),
          false,
          {
            explanation: t(
              'Fake virus warnings are a trick to install malware.',
              'ការព្រមានមេរោគក្លែងក្លាយជាល្បិចដើម្បីដំឡើង malware។',
            ),
          },
        ),
        mc(
          t('What is a vulnerability?', 'តើភាពងាយរងគ្រោះជាអ្វី?'),
          t('A weakness attackers can use', 'ចំណុចខ្សោយដែលអ្នកវាយប្រហារអាចប្រើ'),
          [t('A new emoji', 'emoji ថ្មី'), t('A type of cable', 'ប្រភេទខ្សែ')],
        ),
        tf(
          t(
            'Old devices that no longer get updates are riskier.',
            'ឧបករណ៍ចាស់ដែលលែងទទួលការធ្វើបច្ចុប្បន្នភាពមានហានិភ័យជាង។',
          ),
          true,
        ),
        mc(
          t('Before installing an app, check…', 'មុនដំឡើងកម្មវិធី ពិនិត្យ…'),
          t('the developer, reviews and permissions', 'អ្នកអភិវឌ្ឍ ការវាយតម្លៃ និងការអនុញ្ញាត'),
          [t('only the icon colour', 'តែពណ៌រូបតំណាង'), t('nothing', 'គ្មានអ្វីទេ')],
        ),
      ],
      challenge: [
        match(
          t(
            'Match the app to permissions it really needs.',
            'ផ្គូផ្គងកម្មវិធីជាមួយការអនុញ្ញាតដែលវាពិតជាត្រូវការ។',
          ),
          [
            [t('Camera app', 'កម្មវិធីកាមេរ៉ា'), t('Camera', 'កាមេរ៉ា')],
            [t('Maps', 'ផែនទី'), t('Location', 'ទីតាំង')],
            [t('Voice recorder', 'កម្មវិធីថតសំឡេង'), t('Microphone', 'មីក្រូហ្វូន')],
            [t('Torch', 'ពិល'), t('Nothing personal', 'គ្មានអ្វីផ្ទាល់ខ្លួន')],
          ],
        ),
        sortInto(
          t('Safe download or risky?', 'ការទាញយកសុវត្ថិភាព ឬប្រថុយ?'),
          [
            ['s', t('Safe', 'មានសុវត្ថិភាព'), '✅'],
            ['r', t('Risky', 'ប្រថុយ'), '⚠️'],
          ],
          [
            [
              t(
                'Google Play, 10M downloads, known developer',
                'Google Play ទាញយក 10 លាន អ្នកអភិវឌ្ឍស្គាល់',
              ),
              's',
            ],
            [t('Windows Update', 'Windows Update'), 's'],
            [t('libreoffice.org', 'libreoffice.org'), 's'],
            [t('“MOD” APK with unlimited coins', 'APK «MOD» មានកាក់មិនកំណត់'), 'r'],
            [t('“Flash Player update” pop-up', 'ផ្ទាំងលោត «Flash Player update»'), 'r'],
            [t('Unknown file from a stranger', 'ឯកសារមិនស្គាល់ពីមនុស្សចម្លែក'), 'r'],
          ],
        ),
        order(t('Order the update routine.', 'តម្រៀបទម្លាប់ធ្វើបច្ចុប្បន្នភាព។'), [
          t('Save your work', 'រក្សាទុកការងាររបស់អ្នក'),
          t('Plug in the charger', 'ដោតឆ្នាំងសាក'),
          t('Install the update', 'ដំឡើងការធ្វើបច្ចុប្បន្នភាព'),
          t('Restart', 'ចាប់ផ្តើមឡើងវិញ'),
          t('Check it says “up to date”', 'ពិនិត្យថាវានិយាយ «up to date»'),
        ]),
        mc(
          t(
            'A new update fixes a hole that attackers are already using. When should you install it?',
            'ការធ្វើបច្ចុប្បន្នភាពថ្មីជួសជុលរន្ធដែលអ្នកវាយប្រហារកំពុងប្រើរួចហើយ។ តើអ្នកគួរដំឡើងវាពេលណា?',
          ),
          t('As soon as possible', 'ឆាប់តាមដែលអាចធ្វើបាន'),
          [t('Next year', 'ឆ្នាំក្រោយ'), t('Never', 'មិនដែល')],
        ),
        num(
          t(
            'Your app has 3 updates waiting; each fixes 4 holes. How many holes stay open if you skip them?',
            'កម្មវិធីរបស់អ្នកមានការធ្វើបច្ចុប្បន្នភាព 3 កំពុងរង់ចាំ នីមួយៗជួសជុលរន្ធ 4។ តើរន្ធប៉ុន្មាននៅចំហប្រសិនបើអ្នករំលង?',
          ),
          12,
        ),
        tf(
          t(
            'You can check app permissions later in Settings and turn them off.',
            'អ្នកអាចពិនិត្យការអនុញ្ញាតកម្មវិធីនៅពេលក្រោយក្នុង Settings ហើយបិទវា។',
          ),
          true,
        ),
        mc(
          t('What is a “zero-day”?', 'តើ «zero-day» ជាអ្វី?'),
          t(
            'A hole attackers use before a fix exists',
            'រន្ធដែលអ្នកវាយប្រហារប្រើមុនពេលមានការជួសជុល',
          ),
          [t('A holiday', 'ថ្ងៃឈប់សម្រាក'), t('A charger', 'ឆ្នាំងសាក')],
        ),
        buildSentence(
          t('Build the rule.', 'បង្កើតច្បាប់។'),
          'Keep your apps and system up to date.',
          { say: 'Keep your apps and system up to date.' },
        ),
      ],
      games: [
        catchIt(
          t('Catch the SAFE sources!', 'ចាប់ប្រភពសុវត្ថិភាព!'),
          ['Google Play', 'App Store', 'Microsoft Store', 'Windows Update'],
          [
            t('Pop-up ad', 'ផ្ទាំងលោត'),
            'MOD APK',
            t('Cracked .exe', '.exe crack'),
            t('Stranger’s file', 'ឯកសារមនុស្សចម្លែក'),
          ],
          { speed: 'normal' },
        ),
        memory(t('Match the word to its meaning.', 'ផ្គូផ្គងពាក្យជាមួយអត្ថន័យ។'), [
          [t('Vulnerability', 'ភាពងាយរងគ្រោះ'), t('Weakness', 'ចំណុចខ្សោយ')],
          [t('Patch', 'Patch'), t('Fix', 'ការជួសជុល')],
          [t('Permission', 'ការអនុញ្ញាត'), t('Access', 'ការចូលប្រើ')],
          ['Zero-day', t('No fix yet', 'មិនទាន់មានការជួសជុល')],
        ]),
      ],
      reward: t(
        'Updated and careful — attackers will find no open doors. 🔄',
        'ធ្វើបច្ចុប្បន្នភាព និងប្រុងប្រយ័ត្ន — អ្នកវាយប្រហារនឹងរកមិនឃើញទ្វារចំហ។ 🔄',
      ),
    },
  ),

  // 8 ─────────────────────────────────────────────────────────────
  plannedLesson(
    W,
    'privacy-settings',
    '🙈',
    t('Privacy Settings', 'ការកំណត់ឯកជនភាព'),
    t(
      'Control who sees your posts, location and data.',
      'គ្រប់គ្រងអ្នកដែលមើលឃើញការបង្ហោះ ទីតាំង និងទិន្នន័យរបស់អ្នក។',
    ),
    {
      intro: [
        '🙈',
        t(
          'Apps collect a lot about you. Privacy settings put YOU in control.',
          'កម្មវិធីប្រមូលព័ត៌មានច្រើនអំពីអ្នក។ ការកំណត់ឯកជនភាពធ្វើឱ្យអ្នកជាអ្នកគ្រប់គ្រង។',
        ),
      ],
      learn: [
        [
          '👥',
          t('Audience', 'ទស្សនិកជន'),
          t(
            'Choose Public, Friends or Only me for each post.',
            'ជ្រើសរើស សាធារណៈ មិត្តភក្តិ ឬតែខ្ញុំ សម្រាប់ការបង្ហោះនីមួយៗ។',
          ),
          'audience',
        ],
        [
          '📍',
          t('Location', 'ទីតាំង'),
          t(
            'Turn off location for apps that do not need it; avoid tagging your home.',
            'បិទទីតាំងសម្រាប់កម្មវិធីដែលមិនត្រូវការ ជៀសវាងដាក់ស្លាកផ្ទះរបស់អ្នក។',
          ),
          'location',
        ],
        [
          '🍪',
          t('Cookies and tracking', 'Cookie និងការតាមដាន'),
          t(
            'Sites track what you click; you can reject non-essential cookies.',
            'គេហទំព័រតាមដានអ្វីដែលអ្នកចុច អ្នកអាចបដិសេធ cookie មិនចាំបាច់។',
          ),
          'cookie',
        ],
        [
          '🔍',
          t('Privacy check-up', 'ការពិនិត្យឯកជនភាព'),
          t(
            'Facebook, Google and TikTok have a check-up tool — use it every few months.',
            'Facebook, Google និង TikTok មានឧបករណ៍ពិនិត្យ — ប្រើវារៀងរាល់ពីរបីខែ។',
          ),
        ],
      ],
      see: [
        t(
          'Post: “Home alone this weekend! 🏠📍 Street 271”\nAudience: Public 🌍 ❌\nBetter: no location, Friends only 👥 ✅',
          'ការបង្ហោះ៖ «នៅផ្ទះម្នាក់ឯងចុងសប្តាហ៍នេះ! 🏠📍 ផ្លូវ 271»\nទស្សនិកជន៖ សាធារណៈ 🌍 ❌\nល្អជាង៖ គ្មានទីតាំង តែមិត្តភក្តិ 👥 ✅',
        ),
        t(
          'Think: who could see this, and what could they do with it?',
          'គិត៖ តើអ្នកណាអាចមើលឃើញ ហើយពួកគេអាចធ្វើអ្វីជាមួយវា?',
        ),
      ],
      words: [
        ['privacy', 'ឯកជនភាព', '🙈'],
        ['public', 'សាធារណៈ', '🌍'],
        ['location', 'ទីតាំង', '📍'],
        ['setting', 'ការកំណត់', '⚙️'],
      ],
      play: [
        mc(
          t(
            'Which audience is SAFEST for personal photos?',
            'តើទស្សនិកជនណាមានសុវត្ថិភាពបំផុតសម្រាប់រូបថតផ្ទាល់ខ្លួន?',
          ),
          t('Friends you know', 'មិត្តភក្តិដែលអ្នកស្គាល់'),
          [t('Public', 'សាធារណៈ'), t('Everyone on the internet', 'គ្រប់គ្នាលើអ៊ីនធឺណិត')],
        ),
        tf(
          t(
            'Posting your home address publicly is a good idea.',
            'ការបង្ហោះអាសយដ្ឋានផ្ទះជាសាធារណៈជាគំនិតល្អ។',
          ),
          false,
        ),
        mc(
          t(
            'A game app wants your location “always”. You choose…',
            'កម្មវិធីហ្គេមចង់បានទីតាំងរបស់អ្នក «ជានិច្ច»។ អ្នកជ្រើសរើស…',
          ),
          t('Don’t allow', 'មិនអនុញ្ញាត'),
          [
            t('Always allow', 'អនុញ្ញាតជានិច្ច'),
            t('Share with everyone', 'ចែករំលែកជាមួយគ្រប់គ្នា'),
          ],
        ),
        tf(t('Photos can contain hidden location data.', 'រូបថតអាចមានទិន្នន័យទីតាំងលាក់។'), true),
        mc(
          t('What do tracking cookies do?', 'តើ cookie តាមដានធ្វើអ្វី?'),
          t('Follow what you do across websites', 'តាមដានអ្វីដែលអ្នកធ្វើឆ្លងគេហទំព័រ'),
          [t('Make you hungry', 'ធ្វើឱ្យអ្នកឃ្លាន'), t('Speed up the CPU', 'បង្កើនល្បឿន CPU')],
        ),
        tf(
          t(
            'You should check your privacy settings only once in your life.',
            'អ្នកគួរពិនិត្យការកំណត់ឯកជនភាពតែម្តងក្នុងជីវិត។',
          ),
          false,
          {
            explanation: t(
              'Apps change their settings — check every few months.',
              'កម្មវិធីប្តូរការកំណត់ — ពិនិត្យរៀងរាល់ពីរបីខែ។',
            ),
          },
        ),
        mc(
          t('Which is OK to share publicly?', 'តើអ្វីដែលអាចចែករំលែកជាសាធារណៈ?'),
          t('A photo of a sunset (no location)', 'រូបថតថ្ងៃលិច (គ្មានទីតាំង)'),
          [
            t('Your ID card', 'អត្តសញ្ញាណប័ណ្ណរបស់អ្នក'),
            t('Your boarding pass', 'សំបុត្រឡើងយន្តហោះរបស់អ្នក'),
          ],
        ),
        mc(
          t('“Only me” means…', '«តែខ្ញុំ» មានន័យថា…'),
          t('nobody else can see it', 'គ្មាននរណាផ្សេងអាចមើលឃើញ'),
          [t('all friends see it', 'មិត្តភក្តិទាំងអស់មើលឃើញ'), t('it is deleted', 'វាត្រូវបានលុប')],
        ),
      ],
      challenge: [
        sortInto(
          t('Keep private or OK to share?', 'រក្សាជាឯកជន ឬអាចចែករំលែក?'),
          [
            ['p', t('Keep private', 'រក្សាជាឯកជន'), '🙈'],
            ['s', t('OK to share', 'អាចចែករំលែក'), '👍'],
          ],
          [
            [t('Home address', 'អាសយដ្ឋានផ្ទះ'), 'p'],
            [t('Phone number', 'លេខទូរស័ព្ទ'), 'p'],
            [t('ID card photo', 'រូបថតអត្តសញ្ញាណប័ណ្ណ'), 'p'],
            [t('Your drawing', 'គំនូររបស់អ្នក'), 's'],
            [t('A book you liked', 'សៀវភៅដែលអ្នកចូលចិត្ត'), 's'],
            [t('Your team won a match', 'ក្រុមរបស់អ្នកឈ្នះការប្រកួត'), 's'],
          ],
        ),
        mc(
          t(
            'Why is posting “On holiday for 2 weeks!” publicly risky?',
            'ហេតុអ្វីការបង្ហោះ «វិស្សមកាល 2 សប្តាហ៍!» ជាសាធារណៈប្រថុយ?',
          ),
          t('Thieves learn your house is empty', 'ចោរដឹងថាផ្ទះរបស់អ្នកទទេ'),
          [t('It is too short', 'វាខ្លីពេក'), t('Holidays are secret', 'វិស្សមកាលជាសម្ងាត់')],
        ),
        order(t('Order a privacy check-up.', 'តម្រៀបការពិនិត្យឯកជនភាព។'), [
          t('Open Settings → Privacy', 'បើក Settings → Privacy'),
          t('Check who can see your posts', 'ពិនិត្យអ្នកណាអាចមើលការបង្ហោះ'),
          t('Turn off location you do not need', 'បិទទីតាំងដែលអ្នកមិនត្រូវការ'),
          t('Review app permissions', 'ពិនិត្យការអនុញ្ញាតកម្មវិធី'),
          t('Remove old apps', 'លុបកម្មវិធីចាស់'),
        ]),
        match(
          t('Match the setting to what it protects.', 'ផ្គូផ្គងការកំណត់ជាមួយអ្វីដែលវាការពារ។'),
          [
            [
              t('Post audience', 'ទស្សនិកជនការបង្ហោះ'),
              t('Who sees your posts', 'អ្នកណាមើលការបង្ហោះ'),
            ],
            [t('Location off', 'បិទទីតាំង'), t('Where you are', 'កន្លែងដែលអ្នកនៅ')],
            [t('Reject cookies', 'បដិសេធ cookie'), t('What sites track', 'អ្វីដែលគេហទំព័រតាមដាន')],
            [t('Private account', 'គណនីឯកជន'), t('Who can follow you', 'អ្នកណាអាចតាមដានអ្នក')],
          ],
        ),
        tf(
          t(
            'If an app is free, your data may be how it makes money.',
            'ប្រសិនបើកម្មវិធីឥតគិតថ្លៃ ទិន្នន័យរបស់អ្នកអាចជារបៀបដែលវារកលុយ។',
          ),
          true,
        ),
        num(
          t(
            'You have 40 apps; 25 have location access but only 5 need it. How many should you turn off?',
            'អ្នកមានកម្មវិធី 40 មាន 25 ចូលប្រើទីតាំង តែមានតែ 5 ត្រូវការ។ តើអ្នកគួរបិទប៉ុន្មាន?',
          ),
          20,
        ),
        mc(
          t(
            'A stranger sends a friend request with no photos and no mutual friends. You…',
            'មនុស្សចម្លែកផ្ញើសំណើមិត្តគ្មានរូបថត និងគ្មានមិត្តរួម។ អ្នក…',
          ),
          t('ignore or decline it', 'មិនអើពើ ឬបដិសេធ'),
          [
            t('accept and share your number', 'ទទួល ហើយចែករំលែកលេខរបស់អ្នក'),
            t('send them your address', 'ផ្ញើអាសយដ្ឋានរបស់អ្នក'),
          ],
        ),
        buildSentence(
          t('Build the rule.', 'បង្កើតច្បាប់។'),
          'Share less and check your settings often.',
          { say: 'Share less, and check your settings often.' },
        ),
      ],
      games: [
        catchIt(
          t('Catch the things to keep PRIVATE!', 'ចាប់របស់ដែលត្រូវរក្សាជាឯកជន!'),
          [
            t('Home address', 'អាសយដ្ឋានផ្ទះ'),
            t('Passwords', 'ពាក្យសម្ងាត់'),
            t('ID number', 'លេខអត្តសញ្ញាណ'),
            t('Bank card', 'កាតធនាគារ'),
          ],
          [
            t('Favourite food', 'ម្ហូបដែលចូលចិត្ត'),
            t('A drawing', 'គំនូរ'),
            t('Football score', 'ពិន្ទុបាល់ទាត់'),
          ],
          { speed: 'normal' },
        ),
        memory(t('Match the audience to its icon.', 'ផ្គូផ្គងទស្សនិកជនជាមួយរូបតំណាង។'), [
          [t('Public', 'សាធារណៈ'), '🌍'],
          [t('Friends', 'មិត្តភក្តិ'), '👥'],
          [t('Only me', 'តែខ្ញុំ'), '🔒'],
          [t('Location', 'ទីតាំង'), '📍'],
        ]),
      ],
      reward: t(
        'You are in control of your own data now. 🙈',
        'ឥឡូវអ្នកគ្រប់គ្រងទិន្នន័យផ្ទាល់ខ្លួនរបស់អ្នក។ 🙈',
      ),
    },
  ),
];
