import { t, type LessonSeed } from '../../types';
import {
  emailMock,
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
  sod,
  sortInto,
  tf,
  urlMock,
} from '../dsl';
import { INTERNET_WORLD as W } from './internet-1';

// 🌐 Internet Explorer, lessons 9–15: staying safe and kind online.
// Khmer (km) strings are DRAFTS for native review.

export const INTERNET_LESSONS_2: LessonSeed[] = [
  lesson(
    W,
    'strong-passwords',
    '🔑',
    t('Strong Passwords', 'ពាក្យសម្ងាត់រឹងមាំ'),
    t('Keep your accounts locked tight.', 'រក្សាគណនីរបស់អ្នកឱ្យជាប់សោល្អ។'),
    9,
    [
      intro(
        '🔑',
        t(
          'Your password is the key to your account. Let’s make keys nobody can copy.',
          'ពាក្យសម្ងាត់របស់អ្នកគឺជាកូនសោនៃគណនីរបស់អ្នក។ តោះបង្កើតកូនសោដែលគ្មាននរណាអាចចម្លងបាន។',
        ),
      ),
      learn(
        [
          '📏',
          t('Long', 'វែង'),
          t(
            '12 characters or more. Three random words work well.',
            '12 តួអក្សរ ឬច្រើនជាងនេះ។ ពាក្យចៃដន្យបីដំណើរការល្អ។',
          ),
        ],
        [
          '🎲',
          t('Not about you', 'មិនមែនអំពីអ្នក'),
          t('No names, birthdays or “123456”.', 'គ្មានឈ្មោះ ថ្ងៃកំណើត ឬ “123456”។'),
        ],
        [
          '🔐',
          t('Different for each account', 'ខុសគ្នាសម្រាប់គណនីនីមួយៗ'),
          t('If one leaks, the others stay safe.', 'បើមួយលេចធ្លាយ ផ្សេងទៀតនៅតែមានសុវត្ថិភាព។'),
        ],
        [
          '📲',
          t('Two-step login', 'ការចូលពីរជំហាន'),
          t(
            'A code on your phone as well as your password.',
            'លេខកូដលើទូរស័ព្ទរបស់អ្នក បន្ថែមលើពាក្យសម្ងាត់។',
          ),
        ],
      ),
      see(
        'Blue-Mango-River-42!',
        t('Long, random, easy to remember, hard to guess.', 'វែង ចៃដន្យ ងាយចងចាំ ពិបាកទាយ។'),
      ),
      revealPlay(
        'safe_or_dangerous',
        sod(
          t(
            'Writing your password on a sticky note on your laptop.',
            'សរសេរពាក្យសម្ងាត់លើក្រដាសស្អិតលើកុំព្យូទ័រយួរដៃ។',
          ),
          'dangerous',
          {
            explanation: t(
              'Anyone who sees the laptop can read it.',
              'អ្នកណាដែលឃើញកុំព្យូទ័រអាចអានវាបាន។',
            ),
          },
        ),
        sod(
          t(
            'Using a long password made of random words.',
            'ប្រើពាក្យសម្ងាត់វែងដែលបង្កើតពីពាក្យចៃដន្យ។',
          ),
          'safe',
        ),
        sod(
          t(
            'Telling your best friend your password.',
            'ប្រាប់មិត្តល្អបំផុតរបស់អ្នកពីពាក្យសម្ងាត់។',
          ),
          'dangerous',
          {
            explanation: t(
              'Passwords are only for you — even good friends.',
              'ពាក្យសម្ងាត់គឺសម្រាប់តែអ្នក — សូម្បីតែមិត្តល្អ។',
            ),
          },
        ),
        sod(
          t(
            'Using the same password for Facebook, email and your bank.',
            'ប្រើពាក្យសម្ងាត់ដដែលសម្រាប់ Facebook អ៊ីមែល និងធនាគារ។',
          ),
          'dangerous',
          {
            explanation: t('One leak would open all of them.', 'ការលេចធ្លាយមួយនឹងបើកវាទាំងអស់។'),
          },
        ),
        sod(t('Turning on two-step verification.', 'បើកការផ្ទៀងផ្ទាត់ពីរជំហាន។'), 'safe'),
        mc(
          t('Which password is the strongest?', 'តើពាក្យសម្ងាត់ណារឹងមាំជាងគេ?'),
          'Blue-Mango-River-42!',
          ['123456', 'sokha2008', 'password'],
          {
            explanation: t(
              'Long, mixed and not about you = strong.',
              'វែង លាយ និងមិនមែនអំពីអ្នក = រឹងមាំ។',
            ),
          },
        ),
        mc(t('Which is the weakest password?', 'តើពាក្យសម្ងាត់ណាខ្សោយជាងគេ?'), '123456', [
          'Tiger!Rice$Moon7',
          'blue-kettle-sunrise-88',
        ]),
        tf(
          t(
            'A password manager app can remember many strong passwords for you.',
            'កម្មវិធីគ្រប់គ្រងពាក្យសម្ងាត់អាចចងចាំពាក្យសម្ងាត់រឹងមាំជាច្រើនឱ្យអ្នក។',
          ),
          true,
        ),
      ),
      revealChallenge(
        'multiple_choice',
        mc(
          t('How long should a good password be?', 'តើពាក្យសម្ងាត់ល្អគួរវែងប៉ុណ្ណា?'),
          t('12 characters or more', '12 តួអក្សរ ឬច្រើនជាង'),
          [t('4 characters', '4 តួអក្សរ'), t('Exactly 6 numbers', 'លេខ 6 ពិតប្រាកដ')],
        ),
        num(
          t(
            'How many characters are in “Mango-River-7”?',
            'តើមានតួអក្សរប៉ុន្មានក្នុង “Mango-River-7”?',
          ),
          13,
        ),
        mc(
          t(
            'Someone calls saying they are from the bank and asks for your PIN. You…',
            'នរណាម្នាក់ហៅថាពួកគេមកពីធនាគារ ហើយសុំលេខ PIN របស់អ្នក។ អ្នក…',
          ),
          t('Hang up — banks never ask for your PIN', 'ដាក់ទូរស័ព្ទចុះ — ធនាគារមិនដែលសុំ PIN ទេ'),
          [t('Tell them', 'ប្រាប់ពួកគេ'), t('Say half of it', 'ប្រាប់ពាក់កណ្តាល')],
        ),
        mc(
          t(
            'You think someone knows your password. What should you do?',
            'អ្នកគិតថានរណាម្នាក់ដឹងពាក្យសម្ងាត់របស់អ្នក។ តើអ្នកគួរធ្វើអ្វី?',
          ),
          t('Change it now', 'ប្តូរវាឥឡូវ'),
          [t('Wait and see', 'រង់ចាំមើល'), t('Post about it', 'បង្ហោះអំពីវា')],
        ),
        tf(
          t(
            'A login code sent by SMS should never be shared with anyone.',
            'លេខកូដចូលដែលផ្ញើតាម SMS មិនគួរចែករំលែកជាមួយនរណាម្នាក់ទេ។',
          ),
          true,
        ),
        sortInto(
          t('Strong or weak?', 'រឹងមាំ ឬខ្សោយ?'),
          [
            ['strong', t('Strong', 'រឹងមាំ'), '💪'],
            ['weak', t('Weak', 'ខ្សោយ'), '🥀'],
          ],
          [
            ['qwerty', 'weak'],
            ['Kampot-Pepper-Sunset-9', 'strong'],
            ['dara2010', 'weak'],
            ['Rain!Boat!Lotus!31', 'strong'],
          ],
        ),
        mc(
          t('Fingerprint or face unlock is…', 'ការដោះសោដោយស្នាមម្រាមដៃ ឬមុខ គឺ…'),
          t('A good extra lock for your phone', 'សោបន្ថែមល្អសម្រាប់ទូរស័ព្ទរបស់អ្នក'),
          [t('Dangerous', 'គ្រោះថ្នាក់'), t('A virus', 'មេរោគ')],
        ),
        tf(
          t(
            '“Remember password” is fine on a shared school computer.',
            '“ចងចាំពាក្យសម្ងាត់” គឺមិនអីទេនៅលើកុំព្យូទ័ររួមនៅសាលា។',
          ),
          false,
          {
            explanation: t(
              'The next person could open your account.',
              'មនុស្សបន្ទាប់អាចបើកគណនីរបស់អ្នក។',
            ),
          },
        ),
      ),
      reward(t('Your accounts are locked tight! 🔑', 'គណនីរបស់អ្នកត្រូវបានចាក់សោយ៉ាងល្អ! 🔑')),
    ],
  ),

  lesson(
    W,
    'safe-or-dangerous',
    '🛡️',
    t('Safe or Dangerous?', 'សុវត្ថិភាព ឬគ្រោះថ្នាក់?'),
    t('Decide quickly and stay safe.', 'សម្រេចចិត្តលឿន ហើយរក្សាសុវត្ថិភាព។'),
    9,
    [
      intro(
        '🛡️',
        t(
          'Every day you make online choices. Let’s practise spotting what’s safe and what’s dangerous.',
          'រៀងរាល់ថ្ងៃ អ្នកធ្វើជម្រើសតាមអនឡាញ។ តោះហាត់រកមើលអ្វីដែលសុវត្ថិភាព និងអ្វីដែលគ្រោះថ្នាក់។',
        ),
      ),
      learn(
        [
          '🎁',
          t('Too good to be true', 'ល្អពេកដើម្បីជាការពិត'),
          t(
            'Free phones, big prizes — usually a trick.',
            'ទូរស័ព្ទឥតគិតថ្លៃ រង្វាន់ធំ — ជាធម្មតាជាល្បិច។',
          ),
        ],
        [
          '🔑',
          t('Passwords are private', 'ពាក្យសម្ងាត់ជាឯកជន'),
          t(
            'Never share your password — not even with friends.',
            'កុំចែករំលែកពាក្យសម្ងាត់ — សូម្បីតែជាមួយមិត្ត។',
          ),
        ],
        [
          '⏰',
          t('Hurry = warning', 'ប្រញាប់ = ការព្រមាន'),
          t(
            '“Act now or lose your account!” Scammers rush you.',
            '“ធ្វើឥឡូវ ឬបាត់គណនី!” អ្នកបោកប្រាស់ធ្វើឱ្យអ្នកប្រញាប់។',
          ),
        ],
      ),
      see(
        t(
          '📩 “Your account is locked! Click here and type your password.”',
          '📩 “គណនីរបស់អ្នកត្រូវបានចាក់សោ! ចុចទីនេះ ហើយវាយពាក្យសម្ងាត់។”',
        ),
        t(
          'This is phishing: a fake message that tries to steal your password.',
          'នេះគឺជាការបោកប្រាស់៖ សារក្លែងក្លាយដែលព្យាយាមលួចពាក្យសម្ងាត់។',
        ),
      ),
      revealPlay(
        'safe_or_dangerous',
        sod(
          t(
            'A message says: “You won a free phone! Click this link and enter your password.”',
            'សារមួយថា៖ “អ្នកឈ្នះទូរស័ព្ទឥតគិតថ្លៃ! ចុចតំណនេះ ហើយបញ្ចូលពាក្យសម្ងាត់។”',
          ),
          'dangerous',
          {
            explanation: t(
              'Real prizes never ask for your password.',
              'រង្វាន់ពិតមិនដែលសុំពាក្យសម្ងាត់ទេ។',
            ),
          },
        ),
        sod(
          t(
            'You type your school’s website address yourself and log in.',
            'អ្នកវាយអាសយដ្ឋានគេហទំព័រសាលាដោយខ្លួនឯង ហើយចូល។',
          ),
          'safe',
          {
            explanation: t(
              'Typing the address yourself avoids fake links.',
              'ការវាយអាសយដ្ឋានដោយខ្លួនឯង ជៀសវាងតំណក្លែងក្លាយ។',
            ),
          },
        ),
        sod(
          t(
            'A website asks you to download “free-movie.exe”.',
            'គេហទំព័រមួយស្នើឱ្យអ្នកទាញយក “free-movie.exe”។',
          ),
          'dangerous',
          {
            explanation: t(
              'Unknown downloads can contain viruses.',
              'ការទាញយកមិនស្គាល់អាចមានមេរោគ។',
            ),
          },
        ),
        sod(
          t(
            'A friend asks for your password to help with homework.',
            'មិត្តម្នាក់សុំពាក្យសម្ងាត់របស់អ្នក ដើម្បីជួយកិច្ចការផ្ទះ។',
          ),
          'dangerous',
        ),
        sod(
          t('Updating your phone when it asks.', 'ធ្វើបច្ចុប្បន្នភាពទូរស័ព្ទពេលវាស្នើ។'),
          'safe',
          {
            explanation: t('Updates fix security holes.', 'បច្ចុប្បន្នភាពជួសជុលចន្លោះសុវត្ថិភាព។'),
          },
        ),
        sod(
          t(
            'Plugging in a USB stick you found on the street.',
            'ដោតឧបករណ៍ USB ដែលអ្នករកឃើញនៅតាមផ្លូវ។',
          ),
          'dangerous',
          {
            explanation: t(
              'Unknown USB sticks can carry viruses.',
              'ឧបករណ៍ USB មិនស្គាល់អាចផ្ទុកមេរោគ។',
            ),
          },
        ),
        sod(
          t(
            'Installing apps only from Google Play or the App Store.',
            'ដំឡើងកម្មវិធីតែពី Google Play ឬ App Store។',
          ),
          'safe',
        ),
        sod(
          t(
            'A pop-up says “Your phone has 5 viruses! Tap to clean now!”',
            'ផ្ទាំងលេចថា “ទូរស័ព្ទរបស់អ្នកមានមេរោគ 5! ចុចដើម្បីសម្អាតឥឡូវ!”',
          ),
          'dangerous',
          {
            explanation: t(
              'Scary pop-ups are fake — close them.',
              'ផ្ទាំងលេចគួរឱ្យខ្លាចគឺក្លែងក្លាយ — បិទវា។',
            ),
          },
        ),
      ),
      revealChallenge(
        'safe_or_dangerous',
        sod(t('Locking your phone with a PIN.', 'ចាក់សោទូរស័ព្ទដោយ PIN។'), 'safe'),
        sod(
          t(
            'Sending a stranger money to “unlock” a prize.',
            'ផ្ញើលុយទៅមនុស្សចម្លែកដើម្បី “ដោះសោ” រង្វាន់។',
          ),
          'dangerous',
        ),
        sod(
          t(
            'Logging out of Facebook on a shop’s computer.',
            'ចាកចេញពី Facebook នៅលើកុំព្យូទ័ររបស់ហាង។',
          ),
          'safe',
        ),
        sod(
          t(
            'Posting a photo of your new ID card online.',
            'បង្ហោះរូបថតអត្តសញ្ញាណប័ណ្ណថ្មីរបស់អ្នកតាមអនឡាញ។',
          ),
          'dangerous',
          {
            explanation: t(
              'Your ID number can be used to steal your identity.',
              'លេខអត្តសញ្ញាណរបស់អ្នកអាចត្រូវបានប្រើដើម្បីលួចអត្តសញ្ញាណ។',
            ),
          },
        ),
        sod(
          t(
            'Asking a parent or teacher when something online feels wrong.',
            'សួរឪពុកម្តាយ ឬគ្រូ ពេលអ្វីមួយតាមអនឡាញមិនស្រួល។',
          ),
          'safe',
        ),
        mc(
          t('Which password is the strongest?', 'តើពាក្យសម្ងាត់ណារឹងមាំជាងគេ?'),
          'Blue-Mango-River-42!',
          ['123456', 'sokha2008'],
          {
            explanation: t(
              'Long, mixed and not about you = strong.',
              'វែង លាយ និងមិនមែនអំពីអ្នក = រឹងមាំ។',
            ),
          },
        ),
        mc(
          t(
            'You clicked a bad link by mistake. First step?',
            'អ្នកចុចតំណអាក្រក់ដោយច្រឡំ។ ជំហានដំបូង?',
          ),
          t(
            'Close it, change your password, tell an adult',
            'បិទវា ប្តូរពាក្យសម្ងាត់ ប្រាប់មនុស្សពេញវ័យ',
          ),
          [t('Hide it', 'លាក់វា'), t('Click more links', 'ចុចតំណបន្ថែម')],
        ),
        tf(
          t(
            'Antivirus and updates help protect your device.',
            'កម្មវិធីកំចាត់មេរោគ និងបច្ចុប្បន្នភាពជួយការពារឧបករណ៍របស់អ្នក។',
          ),
          true,
        ),
      ),
      reward(
        t(
          'You are a Cyber Guardian in training! 🛡️',
          'អ្នកជាអ្នកការពារអ៊ីនធឺណិតកំពុងហ្វឹកហាត់! 🛡️',
        ),
      ),
    ],
  ),

  lesson(
    W,
    'spot-phishing',
    '🎣',
    t('Spot the Phishing', 'ស្គាល់ការបោកប្រាស់តាមអ៊ីមែល'),
    t('Fake emails that steal passwords.', 'អ៊ីមែលក្លែងក្លាយដែលលួចពាក្យសម្ងាត់។'),
    10,
    [
      intro(
        '🎣',
        t(
          'Phishing = fishing for your password with a fake message. Don’t take the bait!',
          'ការបោកប្រាស់ = ការស្ទូចពាក្យសម្ងាត់របស់អ្នកដោយសារក្លែងក្លាយ។ កុំស៊ីនុយ!',
        ),
      ),
      learn(
        [
          '📨',
          t('Check the sender', 'ពិនិត្យអ្នកផ្ញើ'),
          t(
            'support@acleda-bank-security.xyz is NOT your bank.',
            'support@acleda-bank-security.xyz មិនមែនជាធនាគាររបស់អ្នកទេ។',
          ),
        ],
        [
          '⏳',
          t('Pressure', 'សម្ពាធ'),
          t(
            '“Within 24 hours or your account is closed!” is a red flag.',
            '“ក្នុងរយៈពេល 24 ម៉ោង ឬគណនីរបស់អ្នកនឹងត្រូវបិទ!” គឺជាទង់ក្រហម។',
          ),
        ],
        [
          '🔗',
          t('Don’t click — type', 'កុំចុច — វាយ'),
          t(
            'Go to the real website yourself instead of clicking the link.',
            'ចូលគេហទំព័រពិតដោយខ្លួនឯង ជំនួសការចុចតំណ។',
          ),
        ],
      ),
      see(
        'security@paypa1-help.com',
        t(
          '“paypa1” with the number 1 is a fake. Real companies never ask for your password by email.',
          '“paypa1” មានលេខ 1 គឺក្លែងក្លាយ។ ក្រុមហ៊ុនពិតមិនដែលសុំពាក្យសម្ងាត់តាមអ៊ីមែលទេ។',
        ),
      ),
      revealPlay(
        'safe_or_dangerous',
        sod(
          t('Is this email safe or dangerous?', 'តើអ៊ីមែលនេះសុវត្ថិភាព ឬគ្រោះថ្នាក់?'),
          'dangerous',
          {
            data: emailMock(
              'support@aba-bank-verify.top',
              'URGENT: account locked',
              'Your account will be closed in 24 hours. Click the link and enter your PIN to keep it open.',
            ),
            explanation: t(
              'Fake sender, pressure, and it asks for your PIN. Classic phishing.',
              'អ្នកផ្ញើក្លែងក្លាយ សម្ពាធ ហើយសុំ PIN។ Classic phishing — ការបោកប្រាស់ធម្មតា។',
            ),
          },
        ),
        sod(t('Is this email safe or dangerous?', 'តើអ៊ីមែលនេះសុវត្ថិភាព ឬគ្រោះថ្នាក់?'), 'safe', {
          data: emailMock(
            'teacher@school.edu.kh',
            'Homework week 3',
            'Hello class, this week’s homework is on page 12. See you on Monday!',
          ),
          explanation: t(
            'A known sender, no links, no requests for passwords.',
            'អ្នកផ្ញើដែលស្គាល់ គ្មានតំណ គ្មានការសុំពាក្យសម្ងាត់។',
          ),
        }),
        sod(
          t('Is this email safe or dangerous?', 'តើអ៊ីមែលនេះសុវត្ថិភាព ឬគ្រោះថ្នាក់?'),
          'dangerous',
          {
            data: emailMock(
              'prize@lucky-winner.xyz',
              'You won $1,000!!!',
              'Congratulations! Download the attached form and send us $10 to receive your prize.',
              'claim_prize.exe',
            ),
            explanation: t(
              'You can’t win a contest you never entered, and an .exe attachment can be a virus.',
              'អ្នកមិនអាចឈ្នះការប្រកួតដែលអ្នកមិនដែលចូលរួមទេ ហើយឯកសារភ្ជាប់ .exe អាចជាមេរោគ។',
            ),
          },
        ),
        sod(
          t('Is this email safe or dangerous?', 'តើអ៊ីមែលនេះសុវត្ថិភាព ឬគ្រោះថ្នាក់?'),
          'dangerous',
          {
            data: emailMock(
              'admin@facebo0k-security.net',
              'Unusual login',
              'Someone tried to log in. Confirm your password here or your account will be deleted today.',
            ),
            explanation: t(
              '“facebo0k” with a zero, a threat, and a request for your password.',
              '“facebo0k” មានលេខសូន្យ ការគំរាម និងការសុំពាក្យសម្ងាត់។',
            ),
          },
        ),
        sod(t('Is this email safe or dangerous?', 'តើអ៊ីមែលនេះសុវត្ថិភាព ឬគ្រោះថ្នាក់?'), 'safe', {
          data: emailMock(
            'no-reply@accounts.google.com',
            'New sign-in on your phone',
            'You signed in on a new phone. If this was you, you don’t need to do anything.',
          ),
          explanation: t(
            'Real sender, no link to click, no password requested.',
            'អ្នកផ្ញើពិត គ្មានតំណត្រូវចុច គ្មានការសុំពាក្យសម្ងាត់។',
          ),
        }),
        mc(
          t('Which sender looks fake?', 'តើអ្នកផ្ញើណាមើលទៅក្លែងក្លាយ?'),
          'service@acleda-bank-help.xyz',
          ['teacher@school.edu.kh', 'no-reply@accounts.google.com'],
        ),
        mc(
          t('Which words are a red flag?', 'តើពាក្យណាជាទង់ក្រហម?'),
          t(
            '“Act within 1 hour or lose everything!”',
            '“ធ្វើក្នុងរយៈពេល 1 ម៉ោង ឬបាត់អ្វីៗទាំងអស់!”',
          ),
          [
            t('“See you in class on Monday.”', '“ជួបគ្នាក្នុងថ្នាក់ថ្ងៃច័ន្ទ។”'),
            t('“Thank you for your order.”', '“អរគុណសម្រាប់ការបញ្ជាទិញ។”'),
          ],
        ),
        tf(
          t(
            'Real companies never ask for your password by email.',
            'ក្រុមហ៊ុនពិតមិនដែលសុំពាក្យសម្ងាត់តាមអ៊ីមែលទេ។',
          ),
          true,
        ),
      ),
      revealChallenge(
        'multiple_choice',
        mc(
          t(
            'You get a strange email from your “bank”. What should you do?',
            'អ្នកទទួលបានអ៊ីមែលចម្លែកពី “ធនាគារ” របស់អ្នក។ តើអ្នកគួរធ្វើអ្វី?',
          ),
          t(
            'Open the bank app or website yourself to check',
            'បើកកម្មវិធី ឬគេហទំព័រធនាគារដោយខ្លួនឯងដើម្បីពិនិត្យ',
          ),
          [
            t('Click the link quickly', 'ចុចតំណឱ្យលឿន'),
            t('Reply with your password', 'ឆ្លើយតបជាមួយពាក្យសម្ងាត់'),
          ],
        ),
        mc(
          t('Phishing can also come by…', 'ការបោកប្រាស់ក៏អាចមកតាម…'),
          t('SMS, Telegram and phone calls too', 'SMS, Telegram និងការហៅទូរស័ព្ទផងដែរ'),
          [t('Only email', 'តែអ៊ីមែល'), t('Only letters', 'តែសំបុត្រ')],
        ),
        mc(
          t(
            'Hovering over a link (without clicking) shows…',
            'ការដាក់កណ្តុរលើតំណ (មិនចុច) បង្ហាញ…',
          ),
          t('The real address it goes to', 'អាសយដ្ឋានពិតដែលវាទៅ'),
          [t('A virus', 'មេរោគ'), t('Nothing useful', 'គ្មានអ្វីមានប្រយោជន៍')],
        ),
        sod(
          t(
            'An SMS: “Your parcel is waiting. Pay $1 delivery here: bit.ly/x9z” — you ordered nothing.',
            'SMS៖ “កញ្ចប់របស់អ្នកកំពុងរង់ចាំ។ បង់ថ្លៃដឹក $1 នៅទីនេះ៖ bit.ly/x9z” — អ្នកមិនបានបញ្ជាទិញអ្វីទេ។',
          ),
          'dangerous',
          {
            explanation: t(
              'Fake delivery messages are a common scam.',
              'សារដឹកជញ្ជូនក្លែងក្លាយគឺជាការបោកប្រាស់ទូទៅ។',
            ),
          },
        ),
        mc(
          t(
            'You reported a phishing email. Best next step?',
            'អ្នកបានរាយការណ៍អ៊ីមែលបោកប្រាស់។ ជំហានបន្ទាប់ល្អបំផុត?',
          ),
          t('Delete it', 'លុបវា'),
          [
            t('Forward it to friends to see', 'បញ្ជូនបន្តទៅមិត្តឱ្យមើល'),
            t('Reply angrily', 'ឆ្លើយតបដោយខឹង'),
          ],
        ),
        tf(
          t(
            'Phishing messages sometimes use the real bank logo.',
            'សារបោកប្រាស់ពេលខ្លះប្រើស្លាកសញ្ញាធនាគារពិត។',
          ),
          true,
          {
            explanation: t(
              'A logo is easy to copy — check the sender and the request.',
              'ស្លាកសញ្ញាងាយចម្លង — ពិនិត្យអ្នកផ្ញើ និងសំណើ។',
            ),
          },
        ),
        mc(
          t(
            'A message from a friend’s account says “Send me $20 now, I’ll explain later.” Best move?',
            'សារពីគណនីមិត្តថា “ផ្ញើ $20 មកខ្ញុំឥឡូវ ខ្ញុំនឹងពន្យល់ពេលក្រោយ។” ធ្វើអ្វីល្អបំផុត?',
          ),
          t('Call your friend to check', 'ហៅទូរស័ព្ទទៅមិត្តដើម្បីពិនិត្យ'),
          [t('Send it fast', 'ផ្ញើឱ្យលឿន'), t('Send $40', 'ផ្ញើ $40')],
          {
            explanation: t(
              'Their account may have been hacked.',
              'គណនីរបស់ពួកគេប្រហែលជាត្រូវបានលួចចូល។',
            ),
          },
        ),
        tf(
          t(
            'Spelling mistakes and strange addresses are common signs of phishing.',
            'កំហុសអក្ខរាវិរុទ្ធ និងអាសយដ្ឋានចម្លែកគឺជាសញ្ញាទូទៅនៃការបោកប្រាស់។',
          ),
          true,
        ),
      ),
      reward(t('No phish caught you today! 🎣', 'គ្មានការបោកប្រាស់ណាចាប់អ្នកបានថ្ងៃនេះទេ! 🎣')),
    ],
  ),

  lesson(
    W,
    'safe-browsing',
    '🦺',
    t('Safe Browsing', 'ការរុករកដោយសុវត្ថិភាព'),
    t('Websites, downloads and pop-ups.', 'គេហទំព័រ ការទាញយក និងផ្ទាំងលេច។'),
    9,
    [
      intro(
        '🦺',
        t(
          'The web is full of great things — and some traps. Let’s browse safely.',
          'វេបពោរពេញដោយរបស់ល្អៗ — និងអន្ទាក់ខ្លះ។ តោះរុករកដោយសុវត្ថិភាព។',
        ),
      ),
      learn(
        [
          '🔒',
          t('Look for https', 'រក https'),
          t(
            'Especially before typing a password or paying.',
            'ជាពិសេសមុនពេលវាយពាក្យសម្ងាត់ ឬបង់ប្រាក់។',
          ),
        ],
        [
          '🧐',
          t('Check the address', 'ពិនិត្យអាសយដ្ឋាន'),
          t(
            'Fake sites copy real ones with small spelling changes.',
            'គេហទំព័រក្លែងក្លាយចម្លងគេហទំព័រពិតដោយប្តូរអក្ខរាវិរុទ្ធបន្តិច។',
          ),
        ],
        [
          '❌',
          t('Close pop-ups', 'បិទផ្ទាំងលេច'),
          t(
            'Use the X or close the tab — don’t click inside.',
            'ប្រើ X ឬបិទផ្ទាំង — កុំចុចនៅខាងក្នុង។',
          ),
        ],
      ),
      see(
        '🔒 https://www.abaBank.com.kh ✅ · ⚠️ http://aba-bank-free.xyz ❌',
        t(
          'Real domain and https vs. a strange domain without https.',
          'ដែនពិត និង https ធៀបនឹងដែនចម្លែកគ្មាន https។',
        ),
      ),
      revealPlay(
        'safe_or_dangerous',
        sod(
          t('Is this website safe or dangerous?', 'តើគេហទំព័រនេះសុវត្ថិភាព ឬគ្រោះថ្នាក់?'),
          'dangerous',
          {
            data: urlMock('http://faceb00k-login.xyz/verify', 'Asks for your Facebook password'),
            explanation: t(
              'Wrong spelling, strange ending, no https.',
              'អក្ខរាវិរុទ្ធខុស ចុងចម្លែក គ្មាន https។',
            ),
          },
        ),
        sod(
          t('Is this website safe or dangerous?', 'តើគេហទំព័រនេះសុវត្ថិភាព ឬគ្រោះថ្នាក់?'),
          'safe',
          {
            data: urlMock('https://play.google.com/store/apps', 'The official Google Play store'),
          },
        ),
        sod(
          t(
            'Posting your home address and phone number publicly.',
            'បង្ហោះអាសយដ្ឋានផ្ទះ និងលេខទូរស័ព្ទជាសាធារណៈ។',
          ),
          'dangerous',
          {
            explanation: t('Strangers could find you.', 'មនុស្សចម្លែកអាចរកអ្នកឃើញ។'),
          },
        ),
        sod(
          t('Is this website safe or dangerous?', 'តើគេហទំព័រនេះសុវត្ថិភាព ឬគ្រោះថ្នាក់?'),
          'safe',
          {
            data: urlMock('https://www.moeys.gov.kh', 'Ministry of Education website'),
          },
        ),
        sod(
          t('Is this website safe or dangerous?', 'តើគេហទំព័រនេះសុវត្ថិភាព ឬគ្រោះថ្នាក់?'),
          'dangerous',
          {
            data: urlMock('http://free-iphone-winner.top/claim', 'Says you won an iPhone'),
          },
        ),
        mc(
          t('A pop-up won’t go away. Best action?', 'ផ្ទាំងលេចមិនបាត់។ សកម្មភាពល្អបំផុត?'),
          t('Close the whole tab', 'បិទផ្ទាំងទាំងមូល'),
          [
            t('Click “OK” inside it', 'ចុច “OK” ក្នុងវា'),
            t('Type your password', 'វាយពាក្យសម្ងាត់'),
          ],
        ),
        mc(
          t('Before entering a password, look for…', 'មុនពេលបញ្ចូលពាក្យសម្ងាត់ មើលរក…'),
          t('🔒 https and the correct address', '🔒 https និងអាសយដ្ឋានត្រឹមត្រូវ'),
          [t('Lots of colours', 'ពណ៌ច្រើន'), t('Big pictures', 'រូបភាពធំៗ')],
        ),
        tf(
          t(
            'Browser warnings like “This site may be dangerous” should be taken seriously.',
            'ការព្រមានរបស់កម្មវិធីរុករកដូចជា “គេហទំព័រនេះប្រហែលជាគ្រោះថ្នាក់” គួរយកចិត្តទុកដាក់។',
          ),
          true,
        ),
      ),
      revealChallenge(
        'multiple_choice',
        mc(
          t(
            '“Allow notifications?” from an unknown site. You should…',
            '“អនុញ្ញាតការជូនដំណឹង?” ពីគេហទំព័រមិនស្គាល់។ អ្នកគួរ…',
          ),
          t('Block', 'បិទ (Block)'),
          [t('Allow', 'អនុញ្ញាត')],
          {
            explanation: t(
              'Unknown sites can spam you with fake alerts.',
              'គេហទំព័រមិនស្គាល់អាចផ្ញើការជូនដំណឹងក្លែងក្លាយមកអ្នក។',
            ),
          },
        ),
        mc(
          t(
            'A site says “Disable your antivirus to watch this video.” This is…',
            'គេហទំព័រមួយថា “បិទកម្មវិធីកំចាត់មេរោគដើម្បីមើលវីដេអូនេះ។” នេះគឺ…',
          ),
          t('A trick', 'ល្បិច'),
          [t('Normal', 'ធម្មតា'), t('Helpful', 'មានប្រយោជន៍')],
        ),
        tf(
          t(
            'Ads that look like big “DOWNLOAD” buttons can be fake.',
            'ការផ្សាយពាណិជ្ជកម្មដែលមើលទៅដូចប៊ូតុង “DOWNLOAD” ធំៗ អាចក្លែងក្លាយ។',
          ),
          true,
        ),
        sortInto(
          t('Safe habit or risky habit?', 'ទម្លាប់សុវត្ថិភាព ឬទម្លាប់ប្រថុយ?'),
          [
            ['safe', t('Safe habit', 'ទម្លាប់សុវត្ថិភាព'), '✅'],
            ['risky', t('Risky habit', 'ទម្លាប់ប្រថុយ'), '⚠️'],
          ],
          [
            [t('Typing the bank’s address yourself', 'វាយអាសយដ្ឋានធនាគារដោយខ្លួនឯង'), 'safe'],
            [t('Clicking every ad', 'ចុចគ្រប់ការផ្សាយពាណិជ្ជកម្ម'), 'risky'],
            [t('Keeping your browser updated', 'ធ្វើបច្ចុប្បន្នភាពកម្មវិធីរុករក'), 'safe'],
            [t('Ignoring browser warnings', 'មិនខ្វល់ការព្រមានកម្មវិធីរុករក'), 'risky'],
          ],
        ),
        mc(
          t('Cookies on websites are…', 'ខូគីនៅលើគេហទំព័រ គឺ…'),
          t('Small files that remember your visits', 'ឯកសារតូចៗដែលចងចាំការចូលមើលរបស់អ្នក'),
          [t('Snacks', 'អាហារសម្រន់'), t('Viruses always', 'មេរោគជានិច្ច')],
        ),
        mc(
          t(
            'A game site asks for your phone number to “continue playing”. Best choice?',
            'គេហទំព័រល្បែងសុំលេខទូរស័ព្ទរបស់អ្នក ដើម្បី “បន្តលេង”។ ជម្រើសល្អបំផុត?',
          ),
          t('Don’t give it — leave the site', 'កុំផ្តល់ — ចាកចេញពីគេហទំព័រ'),
          [t('Give it', 'ផ្តល់វា'), t('Give a friend’s number', 'ផ្តល់លេខមិត្ត')],
        ),
        tf(
          t(
            'Clearing your browsing history can help on a shared computer.',
            'ការសម្អាតប្រវត្តិរុករកអាចជួយនៅលើកុំព្យូទ័ររួម។',
          ),
          true,
        ),
        mc(
          t(
            'Who should you tell if you see something scary online?',
            'តើអ្នកគួរប្រាប់នរណា បើអ្នកឃើញអ្វីគួរឱ្យខ្លាចតាមអនឡាញ?',
          ),
          t('A parent, teacher or trusted adult', 'ឪពុកម្តាយ គ្រូ ឬមនុស្សពេញវ័យដែលអ្នកទុកចិត្ត'),
          [t('Nobody', 'គ្មាននរណាម្នាក់'), t('Strangers online', 'មនុស្សចម្លែកតាមអនឡាញ')],
        ),
      ),
      reward(t('Safe surfer! 🦺', 'អ្នករុករកដោយសុវត្ថិភាព! 🦺')),
    ],
  ),

  lesson(
    W,
    'privacy-and-social-media',
    '🔏',
    t('Privacy & Social Media', 'ភាពឯកជន និងបណ្តាញសង្គម'),
    t('Share smart and protect your information.', 'ចែករំលែកឱ្យឆ្លាត ហើយការពារព័ត៌មានរបស់អ្នក។'),
    9,
    [
      intro(
        '🔏',
        t(
          'Facebook, TikTok and Instagram are fun — but what you share can stay online forever.',
          'Facebook, TikTok និង Instagram សប្បាយ — ប៉ុន្តែអ្វីដែលអ្នកចែករំលែកអាចនៅតាមអនឡាញជារៀងរហូត។',
        ),
      ),
      learn(
        [
          '🙈',
          t('Private information', 'ព័ត៌មានឯកជន'),
          t(
            'Address, phone, ID number, passwords, school timetable.',
            'អាសយដ្ឋាន ទូរស័ព្ទ លេខអត្តសញ្ញាណ ពាក្យសម្ងាត់ កាលវិភាគសាលា។',
          ),
        ],
        [
          '⚙️',
          t('Privacy settings', 'ការកំណត់ភាពឯកជន'),
          t('Choose “Friends only” instead of “Public”.', 'ជ្រើសរើស “តែមិត្ត” ជំនួស “សាធារណៈ”។'),
        ],
        [
          '👣',
          t('Digital footprint', 'ស្នាមជើងឌីជីថល'),
          t(
            'Everything you post adds up to how people see you online.',
            'អ្វីៗដែលអ្នកបង្ហោះប្រមូលផ្តុំជារបៀបដែលមនុស្សឃើញអ្នកតាមអនឡាញ។',
          ),
        ],
      ),
      see(
        '🌍 Public → 👥 Friends → 🔒 Only me',
        t('Choose who can see each post.', 'ជ្រើសរើសថានរណាអាចឃើញការបង្ហោះនីមួយៗ។'),
      ),
      revealPlay(
        'drag_drop',
        sortInto(
          t('OK to share publicly, or keep private?', 'អាចចែករំលែកជាសាធារណៈ ឬរក្សាជាឯកជន?'),
          [
            ['share', t('OK to share', 'អាចចែករំលែក'), '🌍'],
            ['private', t('Keep private', 'រក្សាជាឯកជន'), '🔒'],
          ],
          [
            [t('A drawing you made', 'គំនូរដែលអ្នកគូរ'), 'share'],
            [t('Your home address', 'អាសយដ្ឋានផ្ទះ'), 'private'],
            [t('Your favourite song', 'បទចម្រៀងដែលអ្នកចូលចិត្ត'), 'share'],
            [t('Your bank card photo', 'រូបថតកាតធនាគារ'), 'private'],
            [t('Your phone number', 'លេខទូរស័ព្ទ'), 'private'],
          ],
        ),
        mc(
          t(
            'Best privacy setting for personal photos?',
            'ការកំណត់ភាពឯកជនល្អបំផុតសម្រាប់រូបថតផ្ទាល់ខ្លួន?',
          ),
          t('Friends only', 'តែមិត្ត'),
          [t('Public', 'សាធារណៈ'), t('Anyone, everywhere', 'អ្នកណាក៏បាន គ្រប់ទីកន្លែង')],
        ),
        tf(
          t(
            'Deleting a post means nobody can ever see it again.',
            'ការលុបការបង្ហោះមានន័យថាគ្មាននរណាអាចឃើញវាម្តងទៀតទេ។',
          ),
          false,
          {
            explanation: t(
              'Someone may have saved a screenshot.',
              'នរណាម្នាក់ប្រហែលជាបានថតអេក្រង់ទុក។',
            ),
          },
        ),
        mc(
          t(
            'A friend request from someone you don’t know. Best choice?',
            'សំណើមិត្តពីនរណាម្នាក់ដែលអ្នកមិនស្គាល់។ ជម្រើសល្អបំផុត?',
          ),
          t('Ignore or decline', 'មិនខ្វល់ ឬបដិសេធ'),
          [
            t('Accept and send your address', 'ទទួលយក ហើយផ្ញើអាសយដ្ឋាន'),
            t('Accept everyone', 'ទទួលយកអ្នកទាំងអស់'),
          ],
        ),
        mc(
          t(
            'Posting “Home alone all week!” publicly is risky because…',
            'ការបង្ហោះ “នៅផ្ទះម្នាក់ឯងពេញមួយសប្តាហ៍!” ជាសាធារណៈ គឺប្រថុយ ព្រោះ…',
          ),
          t('Strangers learn your house is empty', 'មនុស្សចម្លែកដឹងថាផ្ទះរបស់អ្នកទទេ'),
          [t('It’s too short', 'វាខ្លីពេក'), t('It has no photo', 'វាគ្មានរូបថត')],
        ),
        tf(
          t(
            'Future employers may look at your social media.',
            'និយោជកនាពេលអនាគតអាចមើលបណ្តាញសង្គមរបស់អ្នក។',
          ),
          true,
        ),
        mc(
          t('Location sharing in photos can show…', 'ការចែករំលែកទីតាំងក្នុងរូបថតអាចបង្ហាញ…'),
          t('Where you were (or live)', 'កន្លែងដែលអ្នកនៅ (ឬរស់នៅ)'),
          [t('Your password', 'ពាក្យសម្ងាត់របស់អ្នក'), t('Nothing', 'គ្មានអ្វីទេ')],
        ),
        mc(
          t(
            'Before posting a photo of friends, you should…',
            'មុនពេលបង្ហោះរូបថតមិត្តភក្តិ អ្នកគួរ…',
          ),
          t('Ask if they agree', 'សួរថាពួកគេយល់ព្រមទេ'),
          [
            t('Tag their phone numbers', 'ដាក់ស្លាកលេខទូរស័ព្ទពួកគេ'),
            t('Post it secretly', 'បង្ហោះវាដោយសម្ងាត់'),
          ],
        ),
      ),
      revealChallenge(
        'multiple_choice',
        mc(
          t(
            'An app asks to read all your contacts and messages, but it’s a flashlight app. You should…',
            'កម្មវិធីមួយសុំអានទំនាក់ទំនង និងសារទាំងអស់ ប៉ុន្តែវាជាកម្មវិធីពិល។ អ្នកគួរ…',
          ),
          t('Deny — it doesn’t need them', 'បដិសេធ — វាមិនត្រូវការទេ'),
          [
            t('Allow everything', 'អនុញ្ញាតអ្វីៗទាំងអស់'),
            t('Share your password too', 'ចែករំលែកពាក្យសម្ងាត់ផងដែរ'),
          ],
        ),
        tf(
          t(
            'You can check and change app permissions in Settings.',
            'អ្នកអាចពិនិត្យ និងប្តូរការអនុញ្ញាតកម្មវិធីក្នុងការកំណត់។',
          ),
          true,
        ),
        mc(
          t('Which post is the safest?', 'តើការបង្ហោះណាសុវត្ថិភាពជាងគេ?'),
          t('“Had fun at the science fair today! 🔬”', '“សប្បាយនៅពិព័រណ៍វិទ្យាសាស្ត្រថ្ងៃនេះ! 🔬”'),
          [
            t('“My new ID card! Number 0123…”', '“អត្តសញ្ញាណប័ណ្ណថ្មីរបស់ខ្ញុំ! លេខ 0123…”'),
            t('“My password is mango123”', '“ពាក្យសម្ងាត់ខ្ញុំគឺ mango123”'),
          ],
        ),
        mc(
          t(
            'Someone online you never met asks to meet you alone. You…',
            'នរណាម្នាក់តាមអនឡាញដែលអ្នកមិនដែលជួប សុំជួបអ្នកតែម្នាក់ឯង។ អ្នក…',
          ),
          t('Say no and tell a trusted adult', 'និយាយថាទេ ហើយប្រាប់មនុស្សពេញវ័យដែលទុកចិត្ត'),
          [t('Go alone', 'ទៅម្នាក់ឯង'), t('Keep it secret', 'រក្សាជាសម្ងាត់')],
        ),
        num(
          t(
            'Your post is shared by 3 friends, and each of them is shared by 3 more people. How many shares in total?',
            'ការបង្ហោះរបស់អ្នកត្រូវបានចែករំលែកដោយមិត្ត 3 នាក់ ហើយម្នាក់ៗត្រូវបានចែករំលែកដោយមនុស្ស 3 នាក់ទៀត។ តើសរុបប៉ុន្មានការចែករំលែក?',
          ),
          12,
          {
            explanation: t(
              '3 + 3 × 3 = 12 — posts spread fast!',
              '3 + 3 × 3 = 12 — ការបង្ហោះរីករាលដាលលឿន!',
            ),
          },
        ),
        tf(
          t(
            'Using a nickname instead of your full name in games is a good privacy habit.',
            'ការប្រើឈ្មោះហៅក្រៅជំនួសឈ្មោះពេញក្នុងល្បែង គឺជាទម្លាប់ភាពឯកជនល្អ។',
          ),
          true,
        ),
        mc(
          t(
            'A “quiz” asks for your mother’s name, first pet and birth town. Why be careful?',
            '“កម្រងសំណួរ” សួរឈ្មោះម្តាយ សត្វចិញ្ចឹមដំបូង និងស្រុកកំណើត។ ហេតុអ្វីត្រូវប្រុងប្រយ័ត្ន?',
          ),
          t(
            'These are common password-reset questions',
            'ទាំងនេះជាសំណួរកំណត់ពាក្យសម្ងាត់ឡើងវិញទូទៅ',
          ),
          [t('It’s too long', 'វាវែងពេក'), t('It’s boring', 'វាគួរឱ្យធុញ')],
        ),
        mc(
          t('Your digital footprint is…', 'ស្នាមជើងឌីជីថលរបស់អ្នកគឺ…'),
          t('The trail of things you do and post online', 'ដាននៃអ្វីដែលអ្នកធ្វើ និងបង្ហោះតាមអនឡាញ'),
          [t('A shoe size', 'ទំហំស្បែកជើង'), t('A type of virus', 'ប្រភេទមេរោគ')],
        ),
      ),
      reward(t('Privacy pro! 🔏', 'អ្នកជំនាញភាពឯកជន! 🔏')),
    ],
  ),

  lesson(
    W,
    'kindness-online',
    '💗',
    t('Be Kind Online', 'ចិត្តល្អតាមអនឡាញ'),
    t(
      'Respect, cyberbullying and getting help.',
      'ការគោរព ការបៀតបៀនតាមអ៊ីនធឺណិត និងការស្វែងរកជំនួយ។',
    ),
    9,
    [
      intro(
        '💗',
        t(
          'Behind every screen is a real person. Kind words online matter just as much as in class.',
          'នៅពីក្រោយអេក្រង់គ្រប់មួយគឺជាមនុស្សពិត។ ពាក្យល្អតាមអនឡាញសំខាន់ដូចក្នុងថ្នាក់ដែរ។',
        ),
      ),
      learn(
        [
          '🤝',
          t('Respect', 'ការគោរព'),
          t('Disagree politely. No insults.', 'មិនយល់ស្របដោយគួរសម។ គ្មានការជេរប្រមាថ។'),
        ],
        [
          '🚫',
          t('Cyberbullying', 'ការបៀតបៀនតាមអ៊ីនធឺណិត'),
          t(
            'Mean messages, embarrassing photos, leaving someone out on purpose.',
            'សារអាក្រក់ រូបថតធ្វើឱ្យខ្មាស ការទុកនរណាម្នាក់ចោលដោយចេតនា។',
          ),
        ],
        [
          '🆘',
          t('Get help', 'ស្វែងរកជំនួយ'),
          t(
            'Don’t reply, save proof, block, report and tell a trusted adult.',
            'កុំឆ្លើយតប រក្សាភស្តុតាង បិទ រាយការណ៍ ហើយប្រាប់មនុស្សពេញវ័យដែលទុកចិត្ត។',
          ),
        ],
      ),
      see(
        t('Think: Is it True? Helpful? Kind?', 'គិត៖ តើវាពិត? មានប្រយោជន៍? ចិត្តល្អ?'),
        t('If not, don’t post it.', 'បើមិនមែនទេ កុំបង្ហោះ។'),
      ),
      revealPlay(
        'safe_or_dangerous',
        sod(
          t(
            'Writing “Great job!” on a classmate’s project post.',
            'សរសេរ “ល្អណាស់!” លើការបង្ហោះគម្រោងរបស់មិត្តរួមថ្នាក់។',
          ),
          'safe',
        ),
        sod(
          t(
            'Sharing an embarrassing photo of a classmate to make others laugh.',
            'ចែករំលែករូបថតធ្វើឱ្យខ្មាសរបស់មិត្តរួមថ្នាក់ ដើម្បីឱ្យអ្នកដទៃសើច។',
          ),
          'dangerous',
          {
            explanation: t(
              'That is cyberbullying and can really hurt.',
              'នោះគឺជាការបៀតបៀនតាមអ៊ីនធឺណិត ហើយអាចធ្វើឱ្យឈឺចាប់ពិតប្រាកដ។',
            ),
          },
        ),
        sod(
          t(
            'Making a group just to make fun of one student.',
            'បង្កើតក្រុមដើម្បីសើចចំអកសិស្សម្នាក់។',
          ),
          'dangerous',
        ),
        sod(
          t(
            'Telling a teacher when you see someone being bullied online.',
            'ប្រាប់គ្រូពេលអ្នកឃើញនរណាម្នាក់ត្រូវបានបៀតបៀនតាមអនឡាញ។',
          ),
          'safe',
        ),
        mc(
          t(
            'Someone posts a mean comment about you. First step?',
            'នរណាម្នាក់បង្ហោះមតិអាក្រក់អំពីអ្នក។ ជំហានដំបូង?',
          ),
          t('Don’t reply; take a screenshot', 'កុំឆ្លើយតប ថតអេក្រង់ទុក'),
          [t('Write something meaner', 'សរសេរអ្វីអាក្រក់ជាង'), t('Delete your account', 'លុបគណនី')],
        ),
        mc(
          t('Why take a screenshot of bullying messages?', 'ហេតុអ្វីត្រូវថតអេក្រង់សារបៀតបៀន?'),
          t('As proof to show an adult or report', 'ជាភស្តុតាងដើម្បីបង្ហាញមនុស្សពេញវ័យ ឬរាយការណ៍'),
          [t('To share for fun', 'ដើម្បីចែករំលែកលេង'), t('No reason', 'គ្មានហេតុផល')],
        ),
        tf(
          t(
            'Typing in ALL CAPS can feel like shouting to the reader.',
            'ការវាយជាអក្សរធំទាំងអស់ អាចមានអារម្មណ៍ដូចការស្រែកចំពោះអ្នកអាន។',
          ),
          true,
        ),
        mc(
          t(
            'A friend is upset by online comments. Kind response?',
            'មិត្តម្នាក់ខកចិត្តដោយសារមតិតាមអនឡាញ។ ការឆ្លើយតបដោយចិត្តល្អ?',
          ),
          t('Listen and help them tell an adult', 'ស្តាប់ ហើយជួយពួកគេប្រាប់មនុស្សពេញវ័យ'),
          [t('Laugh with the others', 'សើចជាមួយអ្នកដទៃ'), t('Ignore them', 'មិនខ្វល់ពួកគេ')],
        ),
      ),
      revealChallenge(
        'multiple_choice',
        sortInto(
          t('Kind or unkind?', 'ចិត្តល្អ ឬមិនល្អ?'),
          [
            ['kind', t('Kind', 'ចិត្តល្អ'), '💗'],
            ['unkind', t('Unkind', 'មិនល្អ'), '💔'],
          ],
          [
            [t('“Thanks for helping me with Excel!”', '“អរគុណដែលជួយខ្ញុំជាមួយ Excel!”'), 'kind'],
            [t('“You’re so stupid lol”', '“ឯងល្ងង់ណាស់ ហាហា”'), 'unkind'],
            [
              t(
                '“I disagree, but I see your point.”',
                '“ខ្ញុំមិនយល់ស្រប ប៉ុន្តែខ្ញុំយល់ពីចំណុចរបស់អ្នក។”',
              ),
              'kind',
            ],
            [t('Spreading a rumour', 'ផ្សព្វផ្សាយពាក្យចចាមអារ៉ាម'), 'unkind'],
          ],
        ),
        order(
          t(
            'Being bullied online: put the steps in order.',
            'ត្រូវបានបៀតបៀនតាមអនឡាញ៖ តម្រៀបជំហាន។',
          ),
          [
            t('Don’t reply', 'កុំឆ្លើយតប'),
            t('Save proof (screenshot)', 'រក្សាភស្តុតាង (ថតអេក្រង់)'),
            t('Block and report', 'បិទ និងរាយការណ៍'),
            t('Tell a trusted adult', 'ប្រាប់មនុស្សពេញវ័យដែលទុកចិត្ត'),
          ],
        ),
        tf(
          t(
            'Being a bystander and doing nothing never affects anyone.',
            'ការជាអ្នកឈរមើល ហើយមិនធ្វើអ្វីសោះ មិនដែលប៉ះពាល់នរណាម្នាក់ទេ។',
          ),
          false,
          {
            explanation: t(
              'Standing up kindly, or telling an adult, can stop bullying.',
              'ការក្រោកឈរដោយចិត្តល្អ ឬប្រាប់មនុស្សពេញវ័យ អាចបញ្ឈប់ការបៀតបៀន។',
            ),
          },
        ),
        mc(
          t(
            'Using someone else’s photo or work and saying it’s yours is…',
            'ការប្រើរូបថត ឬការងាររបស់អ្នកដទៃ ហើយនិយាយថាជារបស់អ្នក គឺ…',
          ),
          t('Not honest', 'មិនស្មោះត្រង់'),
          [t('Clever', 'ឆ្លាត'), t('Normal', 'ធម្មតា')],
        ),
        mc(
          t('Most apps have a button to…', 'កម្មវិធីភាគច្រើនមានប៊ូតុងដើម្បី…'),
          t('Report and block users', 'រាយការណ៍ និងបិទអ្នកប្រើ'),
          [
            t('Find their home', 'រកផ្ទះរបស់ពួកគេ'),
            t('Get their password', 'យកពាក្យសម្ងាត់របស់ពួកគេ'),
          ],
        ),
        tf(
          t(
            'Taking breaks from social media is healthy.',
            'ការសម្រាកពីបណ្តាញសង្គមគឺល្អសម្រាប់សុខភាព។',
          ),
          true,
        ),
        mc(
          t('Before posting an angry message, it helps to…', 'មុនពេលបង្ហោះសារខឹង វាជួយក្នុងការ…'),
          t('Wait and calm down first', 'រង់ចាំ ហើយស្ងប់ចិត្តជាមុន'),
          [t('Post it fast', 'បង្ហោះវាលឿន'), t('Add more insults', 'បន្ថែមការជេរប្រមាថ')],
        ),
        mc(
          t('Online, people should treat each other…', 'តាមអនឡាញ មនុស្សគួរប្រព្រឹត្តចំពោះគ្នា…'),
          t('The same way as face to face', 'ដូចពេលជួបមុខគ្នា'),
          [
            t('Worse, because no one sees', 'អាក្រក់ជាង ព្រោះគ្មាននរណាឃើញ'),
            t('However they like', 'តាមចិត្ត'),
          ],
        ),
      ),
      reward(t('Kindness champion! 💗', 'ជើងឯកចិត្តល្អ! 💗')),
    ],
  ),

  lesson(
    W,
    'online-services',
    '🏦',
    t('Online Banking & Shopping', 'ធនាគារ និងការទិញទំនិញអនឡាញ'),
    t('Pay, buy and use services safely.', 'បង់ប្រាក់ ទិញ និងប្រើសេវាដោយសុវត្ថិភាព។'),
    10,
    [
      intro(
        '🏦',
        t(
          'Paying with QR codes, banking apps and online shops is everyday life now. Let’s do it safely.',
          'ការបង់ប្រាក់ដោយ QR កម្មវិធីធនាគារ និងហាងអនឡាញ គឺជាជីវិតប្រចាំថ្ងៃឥឡូវ។ តោះធ្វើវាដោយសុវត្ថិភាព។',
        ),
      ),
      learn(
        [
          '📱',
          t('Banking apps', 'កម្មវិធីធនាគារ'),
          t(
            'Only use the official app. Lock it with a PIN or fingerprint.',
            'ប្រើតែកម្មវិធីផ្លូវការ។ ចាក់សោដោយ PIN ឬស្នាមម្រាមដៃ។',
          ),
        ],
        [
          '🔳',
          t('QR payments (KHQR)', 'ការបង់ប្រាក់ QR (KHQR)'),
          t(
            'Check the name and amount before you confirm.',
            'ពិនិត្យឈ្មោះ និងចំនួនទឹកប្រាក់ មុនពេលអ្នកបញ្ជាក់។',
          ),
        ],
        [
          '🛍️',
          t('Online shops', 'ហាងអនឡាញ'),
          t(
            'Use trusted shops, read reviews, never send money to strangers.',
            'ប្រើហាងដែលគួរឱ្យទុកចិត្ត អានការវាយតម្លៃ កុំផ្ញើលុយទៅមនុស្សចម្លែក។',
          ),
        ],
      ),
      see(
        t(
          '🔳 Scan → ✅ “Sokha’s Shop · $5.00” → Confirm',
          '🔳 ស្កេន → ✅ “Sokha’s Shop · $5.00” → បញ្ជាក់',
        ),
        t('Always check who you pay and how much.', 'ពិនិត្យជានិច្ចថាអ្នកបង់ទៅនរណា និងប៉ុន្មាន។'),
      ),
      revealPlay(
        'safe_or_dangerous',
        sod(
          t(
            'Paying with the shop’s KHQR after checking the name and amount.',
            'បង់ប្រាក់ជាមួយ KHQR របស់ហាងបន្ទាប់ពីពិនិត្យឈ្មោះ និងចំនួន។',
          ),
          'safe',
        ),
        sod(
          t(
            'Sharing your banking OTP code with someone “from the bank” on the phone.',
            'ចែករំលែកលេខកូដ OTP ធនាគារជាមួយនរណាម្នាក់ “មកពីធនាគារ” តាមទូរស័ព្ទ។',
          ),
          'dangerous',
          {
            explanation: t(
              'Banks never ask for your OTP or PIN.',
              'ធនាគារមិនដែលសុំ OTP ឬ PIN របស់អ្នកទេ។',
            ),
          },
        ),
        sod(
          t(
            'A page sells new phones at 90% off and only accepts transfers to a personal account.',
            'ទំព័រមួយលក់ទូរស័ព្ទថ្មីបញ្ចុះ 90% ហើយទទួលតែការផ្ទេរទៅគណនីផ្ទាល់ខ្លួន។',
          ),
          'dangerous',
          {
            explanation: t(
              'Too good to be true, and no safe way to pay.',
              'ល្អពេកដើម្បីជាការពិត ហើយគ្មានវិធីបង់ប្រាក់ដោយសុវត្ថិភាព។',
            ),
          },
        ),
        sod(
          t(
            'Downloading your bank app from the official app store.',
            'ទាញយកកម្មវិធីធនាគារពីហាងកម្មវិធីផ្លូវការ។',
          ),
          'safe',
        ),
        mc(
          t('Before confirming a QR payment, check…', 'មុនពេលបញ្ជាក់ការបង់ប្រាក់ QR ពិនិត្យ…'),
          t('The receiver’s name and the amount', 'ឈ្មោះអ្នកទទួល និងចំនួនទឹកប្រាក់'),
          [t('The colour of the QR code', 'ពណ៌នៃកូដ QR'), t('Nothing', 'គ្មានអ្វីទេ')],
        ),
        mc(
          t('An OTP (one-time code) is…', 'OTP (លេខកូដប្រើម្តង) គឺ…'),
          t(
            'A secret code just for you, for one login or payment',
            'លេខកូដសម្ងាត់សម្រាប់តែអ្នក សម្រាប់ការចូល ឬការបង់ប្រាក់មួយ',
          ),
          [
            t('A discount code to share', 'លេខកូដបញ្ចុះតម្លៃដើម្បីចែករំលែក'),
            t('Your account number', 'លេខគណនីរបស់អ្នក'),
          ],
        ),
        num(
          t(
            'You buy items for $7.50 and pay $10 by QR. How much should you get back if you overpaid? (in dollars)',
            'អ្នកទិញរបស់ $7.50 ហើយបង់ $10 តាម QR។ តើអ្នកគួរទទួលវិញប៉ុន្មាន បើបង់លើស? (ដុល្លារ)',
          ),
          2.5,
        ),
        tf(
          t(
            'Reviews from other buyers can help you choose a trustworthy shop.',
            'ការវាយតម្លៃពីអ្នកទិញផ្សេង អាចជួយអ្នកជ្រើសរើសហាងដែលគួរឱ្យទុកចិត្ត។',
          ),
          true,
        ),
      ),
      revealChallenge(
        'multiple_choice',
        mc(
          t(
            'Safest way to pay a new online seller you don’t know?',
            'វិធីសុវត្ថិភាពបំផុតក្នុងការបង់ប្រាក់អ្នកលក់អនឡាញថ្មីដែលអ្នកមិនស្គាល់?',
          ),
          t('Cash on delivery, after checking the item', 'បង់ពេលទទួល បន្ទាប់ពីពិនិត្យរបស់'),
          [
            t('Send all money first to a personal account', 'ផ្ញើលុយទាំងអស់មុនទៅគណនីផ្ទាល់ខ្លួន'),
            t('Send your card photo', 'ផ្ញើរូបថតកាត'),
          ],
        ),
        mc(
          t(
            'You lost your phone with your bank app. First step?',
            'អ្នកបាត់ទូរស័ព្ទដែលមានកម្មវិធីធនាគារ។ ជំហានដំបូង?',
          ),
          t('Call the bank to block access', 'ហៅធនាគារដើម្បីបិទការចូលប្រើ'),
          [t('Wait a month', 'រង់ចាំមួយខែ'), t('Post your PIN online', 'បង្ហោះ PIN តាមអនឡាញ')],
        ),
        sortInto(
          t('Safe or unsafe shopping?', 'ការទិញដោយសុវត្ថិភាព ឬមិនសុវត្ថិភាព?'),
          [
            ['safe', t('Safe', 'សុវត្ថិភាព'), '✅'],
            ['unsafe', t('Unsafe', 'មិនសុវត្ថិភាព'), '⚠️'],
          ],
          [
            [
              t(
                'Shop with real reviews and a phone number',
                'ហាងដែលមានការវាយតម្លៃពិត និងលេខទូរស័ព្ទ',
              ),
              'safe',
            ],
            [t('Price 10× cheaper than everywhere else', 'តម្លៃថោកជាងកន្លែងផ្សេង 10 ដង'), 'unsafe'],
            [t('Paying on the official app', 'បង់ប្រាក់លើកម្មវិធីផ្លូវការ'), 'safe'],
            [
              t('Seller asks for your OTP to “confirm”', 'អ្នកលក់សុំ OTP របស់អ្នកដើម្បី “បញ្ជាក់”'),
              'unsafe',
            ],
          ],
        ),
        tf(
          t(
            'Checking your bank statement helps you spot payments you didn’t make.',
            'ការពិនិត្យរបាយការណ៍ធនាគារជួយអ្នករកឃើញការបង់ប្រាក់ដែលអ្នកមិនបានធ្វើ។',
          ),
          true,
        ),
        mc(
          t(
            'Government services online (like booking documents) should be done on…',
            'សេវារដ្ឋាភិបាលអនឡាញ (ដូចជាការកក់ឯកសារ) គួរធ្វើលើ…',
          ),
          t('Official .gov.kh websites or apps', 'គេហទំព័រ ឬកម្មវិធី .gov.kh ផ្លូវការ'),
          [
            t('Any Facebook page', 'ទំព័រ Facebook ណាមួយ'),
            t('A stranger’s link', 'តំណរបស់មនុស្សចម្លែក'),
          ],
        ),
        num(
          t(
            'An item is $20 with 25% off. What do you pay? (in dollars)',
            'របស់មួយតម្លៃ $20 បញ្ចុះ 25%។ តើអ្នកបង់ប៉ុន្មាន? (ដុល្លារ)',
          ),
          15,
        ),
        mc(
          t(
            'A delivery person asks you to scan a QR to “receive” money. This is…',
            'អ្នកដឹកជញ្ជូនស្នើឱ្យអ្នកស្កេន QR ដើម្បី “ទទួល” លុយ។ នេះគឺ…',
          ),
          t('Suspicious — scanning usually SENDS money', 'គួរឱ្យសង្ស័យ — ការស្កេនជាធម្មតា ផ្ញើលុយ'),
          [t('Normal', 'ធម្មតា'), t('Required', 'ចាំបាច់')],
        ),
        tf(
          t(
            'Logging out of banking apps on shared phones is a good habit.',
            'ការចាកចេញពីកម្មវិធីធនាគារនៅលើទូរស័ព្ទរួម គឺជាទម្លាប់ល្អ។',
          ),
          true,
        ),
      ),
      reward(
        t(
          'Internet Explorer complete! Safe, smart and kind online. 🌐',
          'អ្នករុករកអ៊ីនធឺណិតបានបញ្ចប់! សុវត្ថិភាព ឆ្លាត និងចិត្តល្អតាមអនឡាញ។ 🌐',
        ),
      ),
    ],
  ),
];
