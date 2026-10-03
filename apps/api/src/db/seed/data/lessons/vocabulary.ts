import type { LocalizedText } from '@itstarter/shared';
import { t, type LessonSeed } from '../../types';
import { buildSentence, match, mc, memory, plannedLesson, spell, tf, type Word } from '../dsl';

// 📖 IT Vocabulary — 15 themed word lessons. Every lesson practises 8 words: their Khmer
// meaning, what they do, and how they are used in a sentence; then listen and spell.
// Khmer (km) strings are DRAFTS for native review.
const W = 'it-vocabulary';

/** [English, Khmer, emoji, what it means (EN), what it means (KM)] */
type Entry = [en: string, km: string, emoji: string, defEn: string, defKm: string];
/** A sentence with ___ for the missing word, the right word, two wrong words. */
type Gap = [sentence: string, answer: string, wrong: [string, string]];

interface Theme {
  slug: string;
  icon: string;
  title: LocalizedText;
  summary: LocalizedText;
  intro: LocalizedText;
  see: [LocalizedText, LocalizedText];
  words: Entry[]; // exactly 8, Khmer and emoji unique within the theme
  gaps: Gap[]; // exactly 4
  sentence: [en: string, km: string];
  spellWord: string;
  reward: LocalizedText;
}

const pick = <T>(list: T[], i: number, n: number) =>
  Array.from({ length: n }, (_, k) => list[(i + 1 + k) % list.length]!);

function vocabularyLesson(th: Theme): LessonSeed {
  const { words } = th;
  const def = (w: Entry) => t(w[3], w[4]);
  const meaning = (i: number) => {
    const w = words[i]!;
    return mc(
      t(`What does “${w[0]}” mean?`, `តើ «${w[0]}» មានន័យអ្វី?`),
      w[1],
      pick(words, i, 3).map((o) => o[1]),
      { say: w[0], explanation: def(w) },
    );
  };
  const whichWord = (i: number) => {
    const w = words[i]!;
    return mc(
      t(`Which word means: ${w[3]}`, `តើពាក្យណាមានន័យថា៖ ${w[4]}`),
      w[0],
      pick(words, i, 3).map((o) => o[0]),
    );
  };
  const [w0, w1, w2] = words as [Entry, Entry, Entry];
  return plannedLesson(W, th.slug, th.icon, th.title, th.summary, {
    minutes: 10,
    intro: [th.icon, th.intro],
    learn: words.slice(0, 4).map((w) => [w[2], t(w[0], w[1]), def(w), w[0]]),
    see: th.see,
    words: words.slice(0, 4).map(([en, km, emoji]): Word => [en, km, emoji]),
    play: [
      meaning(0),
      meaning(1),
      meaning(2),
      tf(t(`“${w0[0]}” means “${w0[1]}”.`, `«${w0[0]}» មានន័យថា «${w0[1]}»។`), true, {
        say: w0[0],
      }),
      meaning(3),
      meaning(4),
      tf(t(`“${w1[0]}” means “${w2[1]}”.`, `«${w1[0]}» មានន័យថា «${w2[1]}»។`), false, {
        explanation: t(`“${w1[0]}” means “${w1[1]}”.`, `«${w1[0]}» មានន័យថា «${w1[1]}»។`),
      }),
      meaning(5),
    ],
    challenge: [
      ...th.gaps.map(([sentence, answer, wrong]) =>
        mc(
          t(`Choose the missing word: “${sentence}”`, `ជ្រើសរើសពាក្យដែលបាត់៖ «${sentence}»`),
          answer,
          wrong,
          {
            say: sentence.replace('___', answer),
          },
        ),
      ),
      match(
        t('Match each word to its Khmer meaning.', 'ផ្គូផ្គងពាក្យនីមួយៗជាមួយអត្ថន័យជាភាសាខ្មែរ។'),
        words.slice(4, 8).map((w) => [w[0], w[1]]),
      ),
      whichWord(6),
      whichWord(7),
      buildSentence(
        t('Listen 🔊 and build the sentence.', 'ស្តាប់ 🔊 ហើយបង្កើតប្រយោគ។'),
        th.sentence[0],
        {
          say: th.sentence[0],
          hint: t(`It means: ${th.sentence[1]}`, `វាមានន័យថា៖ ${th.sentence[1]}`),
        },
      ),
    ],
    games: [
      memory(
        t('Match each picture to its word.', 'ផ្គូផ្គងរូបភាពនីមួយៗជាមួយពាក្យ។'),
        words.slice(4, 8).map((w) => [w[2], w[0]]),
      ),
      spell(t('Listen 🔊 and spell the word.', 'ស្តាប់ 🔊 ហើយប្រកបពាក្យ។'), th.spellWord, {
        say: th.spellWord,
        extra: 'aei',
      }),
    ],
    reward: th.reward,
  });
}

const THEMES: Theme[] = [
  {
    slug: 'hardware-words',
    icon: '🖥️',
    title: t('Hardware Words', 'ពាក្យផ្នែករឹង'),
    summary: t('Name the things you can touch.', 'ដាក់ឈ្មោះរបស់ដែលអ្នកអាចប៉ះ។'),
    intro: t(
      'Hardware is every part of a computer you can touch. Let’s learn their English names!',
      'ផ្នែករឹងគឺជាផ្នែកនីមួយៗនៃកុំព្យូទ័រដែលអ្នកអាចប៉ះ។ តោះរៀនឈ្មោះភាសាអង់គ្លេសរបស់វា!',
    ),
    see: [
      t(
        '“My battery is low. Where is my charger?”',
        '«ថ្មរបស់ខ្ញុំខ្សោយ។ ឆ្នាំងសាករបស់ខ្ញុំនៅឯណា?»',
      ),
      t('You will hear this every day in an IT class.', 'អ្នកនឹងឮរឿងនេះរាល់ថ្ងៃក្នុងថ្នាក់ IT។'),
    ],
    words: [
      ['monitor', 'អេក្រង់', '🖥️', 'the screen that shows pictures', 'អេក្រង់ដែលបង្ហាញរូបភាព'],
      ['keyboard', 'ក្តារចុច', '⌨️', 'the keys you type on', 'គ្រាប់ចុចដែលអ្នកវាយ'],
      ['mouse', 'កណ្តុរ', '🖱️', 'you move it to point and click', 'អ្នករំកិលវាដើម្បីចង្អុល និងចុច'],
      ['printer', 'ម៉ាស៊ីនបោះពុម្ព', '🖨️', 'puts your work on paper', 'ដាក់ការងាររបស់អ្នកលើក្រដាស'],
      ['speaker', 'ឧបករណ៍បំពងសំឡេង', '🔊', 'plays sound out loud', 'ចាក់សំឡេងឮៗ'],
      [
        'webcam',
        'កាមេរ៉ាវេប',
        '📷',
        'a small camera for video calls',
        'កាមេរ៉ាតូចសម្រាប់ការហៅវីដេអូ',
      ],
      [
        'battery',
        'ថ្ម',
        '🔋',
        'stores power so a laptop works without a cable',
        'ផ្ទុកថាមពលដើម្បីឱ្យកុំព្យូទ័រយួរដៃដំណើរការដោយគ្មានខ្សែ',
      ],
      ['charger', 'ឆ្នាំងសាក', '🔌', 'fills the battery with power', 'បំពេញថាមពលក្នុងថ្ម'],
    ],
    gaps: [
      ['Plug the ___ into the laptop to charge it.', 'charger', ['printer', 'webcam']],
      ['I type my name on the ___.', 'keyboard', ['speaker', 'battery']],
      ['Turn up the ___ so we can hear the music.', 'speaker', ['monitor', 'mouse']],
      ['The ___ is low — only 5% left!', 'battery', ['keyboard', 'webcam']],
    ],
    sentence: ['The printer is out of paper.', 'ម៉ាស៊ីនបោះពុម្ពអស់ក្រដាស។'],
    spellWord: 'mouse',
    reward: t(
      'You can name the hardware around you in English! 🖥️',
      'អ្នកអាចដាក់ឈ្មោះផ្នែករឹងជុំវិញអ្នកជាភាសាអង់គ្លេស! 🖥️',
    ),
  },
  {
    slug: 'software-words',
    icon: '💿',
    title: t('Software Words', 'ពាក្យផ្នែកទន់'),
    summary: t('Apps, settings and updates.', 'កម្មវិធី ការកំណត់ និងការធ្វើបច្ចុប្បន្នភាព។'),
    intro: t(
      'Software is the programs inside the computer. These words appear on every screen.',
      'ផ្នែកទន់គឺជាកម្មវិធីនៅក្នុងកុំព្យូទ័រ។ ពាក្យទាំងនេះបង្ហាញលើអេក្រង់គ្រប់មួយ។',
    ),
    see: [
      t('“Install the app, then open Settings.”', '«ដំឡើងកម្មវិធី រួចបើកការកំណត់។»'),
      t('Two steps you will do again and again.', 'ជំហានពីរដែលអ្នកនឹងធ្វើម្តងហើយម្តងទៀត។'),
    ],
    words: [
      [
        'app',
        'កម្មវិធី',
        '📱',
        'a program on a phone or computer',
        'កម្មវិធីលើទូរស័ព្ទ ឬកុំព្យូទ័រ',
      ],
      [
        'install',
        'ដំឡើង',
        '📥',
        'put a new program on your device',
        'ដាក់កម្មវិធីថ្មីលើឧបករណ៍របស់អ្នក',
      ],
      ['update', 'ធ្វើបច្ចុប្បន្នភាព', '🔄', 'get the newest version', 'ទទួលបានកំណែថ្មីបំផុត'],
      ['open', 'បើក', '📂', 'start a program or file', 'ចាប់ផ្តើមកម្មវិធី ឬឯកសារ'],
      ['close', 'បិទ', '❌', 'stop a program or window', 'បញ្ឈប់កម្មវិធី ឬបង្អួច'],
      [
        'settings',
        'ការកំណត់',
        '⚙️',
        'the place to change how things work',
        'កន្លែងសម្រាប់ប្តូររបៀបដែលអ្វីៗដំណើរការ',
      ],
      [
        'account',
        'គណនី',
        '👤',
        'your name and password for a service',
        'ឈ្មោះ និងពាក្យសម្ងាត់របស់អ្នកសម្រាប់សេវាមួយ',
      ],
      ['version', 'កំណែ', '🏷️', 'a numbered release, like 2.1', 'ការចេញផ្សាយមានលេខ ដូចជា 2.1'],
    ],
    gaps: [
      ['Please ___ the app before you use it.', 'install', ['close', 'account']],
      ['Tap ___ to get the newest version.', 'update', ['account', 'close']],
      ['Change the language in ___.', 'settings', ['install', 'version']],
      ['Sign in to your ___ with a password.', 'account', ['update', 'open']],
    ],
    sentence: [
      'Restart the app after the update.',
      'ចាប់ផ្តើមកម្មវិធីឡើងវិញក្រោយការធ្វើបច្ចុប្បន្នភាព។',
    ],
    spellWord: 'install',
    reward: t('Software words — unlocked! 💿', 'ពាក្យផ្នែកទន់ — បានដោះសោ! 💿'),
  },
  {
    slug: 'internet-words',
    icon: '🌐',
    title: t('Internet Words', 'ពាក្យអ៊ីនធឺណិត'),
    summary: t('Browse, search, download, upload.', 'រុករក ស្វែងរក ទាញយក ផ្ទុកឡើង។'),
    intro: t(
      'The internet has its own language. Learn the words you see in every browser.',
      'អ៊ីនធឺណិតមានភាសាផ្ទាល់ខ្លួន។ រៀនពាក្យដែលអ្នកឃើញក្នុងកម្មវិធីរុករកគ្រប់មួយ។',
    ),
    see: [
      t(
        '“Open the browser, search for the website, then click the link.”',
        '«បើកកម្មវិធីរុករក ស្វែងរកគេហទំព័រ រួចចុចតំណ។»',
      ),
      t('Three internet words in one sentence!', 'ពាក្យអ៊ីនធឺណិតបីក្នុងប្រយោគមួយ!'),
    ],
    words: [
      [
        'website',
        'គេហទំព័រ',
        '🌐',
        'pages you visit on the internet',
        'ទំព័រដែលអ្នកចូលមើលលើអ៊ីនធឺណិត',
      ],
      [
        'browser',
        'កម្មវិធីរុករក',
        '🧭',
        'the app that opens websites, like Chrome',
        'កម្មវិធីដែលបើកគេហទំព័រ ដូចជា Chrome',
      ],
      ['search', 'ស្វែងរក', '🔍', 'look for information', 'រកមើលព័ត៌មាន'],
      [
        'link',
        'តំណ',
        '🔗',
        'text you click to go to another page',
        'អត្ថបទដែលអ្នកចុចដើម្បីទៅទំព័រផ្សេង',
      ],
      [
        'download',
        'ទាញយក',
        '⬇️',
        'copy a file from the internet to your device',
        'ចម្លងឯកសារពីអ៊ីនធឺណិតមកឧបករណ៍របស់អ្នក',
      ],
      [
        'upload',
        'ផ្ទុកឡើង',
        '⬆️',
        'send a file from your device to the internet',
        'ផ្ញើឯកសារពីឧបករណ៍របស់អ្នកទៅអ៊ីនធឺណិត',
      ],
      ['online', 'លើបណ្តាញ', '🟢', 'connected to the internet', 'ភ្ជាប់ទៅអ៊ីនធឺណិត'],
      ['offline', 'ក្រៅបណ្តាញ', '📴', 'not connected to the internet', 'មិនភ្ជាប់ទៅអ៊ីនធឺណិត'],
    ],
    gaps: [
      ['Click the ___ to open the next page.', 'link', ['upload', 'offline']],
      ['I ___ my homework to Google Classroom.', 'upload', ['offline', 'browser']],
      ['No Wi-Fi? Then you are ___.', 'offline', ['website', 'link']],
      ['Chrome is a web ___.', 'browser', ['download', 'search']],
    ],
    sentence: ['Search for the answer online.', 'ស្វែងរកចម្លើយលើអ៊ីនធឺណិត។'],
    spellWord: 'browser',
    reward: t('You speak internet now! 🌐', 'ឥឡូវអ្នកនិយាយភាសាអ៊ីនធឺណិត! 🌐'),
  },
  {
    slug: 'file-words',
    icon: '📁',
    title: t('Files & Folders Words', 'ពាក្យឯកសារ និងថត'),
    summary: t('Save, rename, copy, paste.', 'រក្សាទុក ប្តូរឈ្មោះ ចម្លង បិទភ្ជាប់។'),
    intro: t(
      'Keeping files tidy is a real IT skill. Learn the words for every file action.',
      'ការរក្សាឯកសារឱ្យមានរបៀបជាជំនាញ IT ពិត។ រៀនពាក្យសម្រាប់សកម្មភាពឯកសារនីមួយៗ។',
    ),
    see: [
      t(
        '“Copy the file, paste it in the folder, then rename it.”',
        '«ចម្លងឯកសារ បិទភ្ជាប់វាក្នុងថត រួចប្តូរឈ្មោះវា។»',
      ),
      t('A typical instruction from a teacher or boss.', 'ការណែនាំធម្មតាពីគ្រូ ឬចៅហ្វាយ។'),
    ],
    words: [
      [
        'file',
        'ឯកសារ',
        '📄',
        'one saved document, photo or song',
        'ឯកសារ រូបថត ឬចម្រៀងមួយដែលបានរក្សាទុក',
      ],
      ['folder', 'ថត', '📁', 'a place that holds files together', 'កន្លែងដែលផ្ទុកឯកសាររួមគ្នា'],
      [
        'save',
        'រក្សាទុក',
        '💾',
        'keep your work so it is not lost',
        'រក្សាការងាររបស់អ្នកដើម្បីកុំឱ្យបាត់',
      ],
      ['rename', 'ប្តូរឈ្មោះ', '✏️', 'give a file a new name', 'ដាក់ឈ្មោះថ្មីឱ្យឯកសារ'],
      ['delete', 'លុប', '🗑️', 'remove a file', 'យកឯកសារចេញ'],
      ['copy', 'ចម្លង', '📋', 'make a second one of something', 'បង្កើតមួយទៀតនៃអ្វីមួយ'],
      [
        'paste',
        'បិទភ្ជាប់',
        '📌',
        'put what you copied in a new place',
        'ដាក់អ្វីដែលអ្នកបានចម្លងនៅកន្លែងថ្មី',
      ],
      ['desktop', 'ផ្ទៃតុ', '🏞️', 'the main screen with icons', 'អេក្រង់មេដែលមានរូបតំណាង'],
    ],
    gaps: [
      ['Press Ctrl+S to ___ your work.', 'save', ['paste', 'folder']],
      ['Put all your photos in one ___.', 'folder', ['rename', 'delete']],
      ['The name is wrong, so I will ___ the file.', 'rename', ['copy', 'desktop']],
      ['Drag the old file to the Recycle Bin to ___ it.', 'delete', ['save', 'file']],
    ],
    sentence: ['Save the file in the folder.', 'រក្សាទុកឯកសារក្នុងថត។'],
    spellWord: 'folder',
    reward: t('Tidy files, tidy mind! 📁', 'ឯកសារមានរបៀប ចិត្តមានរបៀប! 📁'),
  },
  {
    slug: 'mouse-and-keyboard-words',
    icon: '🖱️',
    title: t('Mouse & Keyboard Actions', 'សកម្មភាពកណ្តុរ និងក្តារចុច'),
    summary: t('Click, drag, scroll, type.', 'ចុច អូស រំកិល វាយ។'),
    intro: t(
      'Instructions in IT say exactly what to do with your hands. Learn the action words!',
      'ការណែនាំក្នុង IT ប្រាប់យ៉ាងច្បាស់ពីអ្វីដែលត្រូវធ្វើជាមួយដៃរបស់អ្នក។ រៀនពាក្យសកម្មភាព!',
    ),
    see: [
      t(
        '“Select the text, then right-click and choose Copy.”',
        '«ជ្រើសរើសអត្ថបទ រួចចុចខាងស្តាំ ហើយជ្រើសរើស Copy។»',
      ),
      t('Each word is a different hand action.', 'ពាក្យនីមួយៗជាសកម្មភាពដៃខុសគ្នា។'),
    ],
    words: [
      ['click', 'ចុច', '👆', 'press the mouse button once', 'ចុចប៊ូតុងកណ្តុរម្តង'],
      [
        'double-click',
        'ចុចពីរដង',
        '✌️',
        'press the mouse button twice quickly',
        'ចុចប៊ូតុងកណ្តុរពីរដងយ៉ាងលឿន',
      ],
      [
        'right-click',
        'ចុចខាងស្តាំ',
        '👉',
        'press the right button to see a menu',
        'ចុចប៊ូតុងខាងស្តាំដើម្បីមើលម៉ឺនុយ',
      ],
      ['drag', 'អូស', '✋', 'hold the button and move', 'សង្កត់ប៊ូតុង ហើយរំកិល'],
      ['scroll', 'រំកិល', '📜', 'move the page up or down', 'រំកិលទំព័រឡើងលើ ឬចុះក្រោម'],
      ['type', 'វាយ', '⌨️', 'press keys to write', 'ចុចគ្រាប់ដើម្បីសរសេរ'],
      [
        'shortcut',
        'ផ្លូវកាត់',
        '⚡',
        'a quick key combo, like Ctrl+C',
        'បន្សំគ្រាប់រហ័ស ដូចជា Ctrl+C',
      ],
      [
        'select',
        'ជ្រើសរើស',
        '🔲',
        'mark something so you can act on it',
        'សម្គាល់អ្វីមួយដើម្បីឱ្យអ្នកអាចធ្វើសកម្មភាពលើវា',
      ],
    ],
    gaps: [
      ['Quickly ___ the icon to open it.', 'double-click', ['scroll', 'type']],
      ['Use the wheel to ___ down the page.', 'scroll', ['drag', 'select']],
      ['Ctrl+C is a keyboard ___.', 'shortcut', ['click', 'drag']],
      ['Hold the button and ___ the file to the folder.', 'drag', ['type', 'shortcut']],
    ],
    sentence: ['Right-click to see more options.', 'ចុចខាងស្តាំដើម្បីមើលជម្រើសបន្ថែម។'],
    spellWord: 'scroll',
    reward: t('Your hands know the IT words now! 🖱️', 'ឥឡូវដៃរបស់អ្នកស្គាល់ពាក្យ IT! 🖱️'),
  },
  {
    slug: 'office-words',
    icon: '📊',
    title: t('Office Words', 'ពាក្យការិយាល័យ'),
    summary: t('Documents, spreadsheets and slides.', 'ឯកសារ តារាងគណនា និងស្លាយ។'),
    intro: t(
      'Word, Excel and PowerPoint use these words on every menu.',
      'Word, Excel និង PowerPoint ប្រើពាក្យទាំងនេះលើម៉ឺនុយគ្រប់មួយ។',
    ),
    see: [
      t(
        '“Put the sales table in the spreadsheet and add a chart to the slide.”',
        '«ដាក់តារាងលក់ក្នុងតារាងគណនា ហើយបន្ថែមគំនូសតាងទៅស្លាយ។»',
      ),
      t('Real office work, in English.', 'ការងារការិយាល័យពិត ជាភាសាអង់គ្លេស។'),
    ],
    words: [
      [
        'document',
        'ឯកសារអត្ថបទ',
        '📝',
        'a page of text, like a letter',
        'ទំព័រអត្ថបទ ដូចជាសំបុត្រ',
      ],
      [
        'spreadsheet',
        'តារាងគណនា',
        '📊',
        'rows and columns of numbers, like Excel',
        'ជួរដេក និងជួរឈរនៃលេខ ដូចជា Excel',
      ],
      ['slide', 'ស្លាយ', '🖼️', 'one page of a presentation', 'ទំព័រមួយនៃបទបង្ហាញ'],
      ['print', 'បោះពុម្ព', '🖨️', 'put a file on paper', 'ដាក់ឯកសារលើក្រដាស'],
      ['font', 'ពុម្ពអក្សរ', '🔤', 'the style of the letters', 'រចនាប័ទ្មនៃអក្សរ'],
      ['table', 'តារាង', '🗂️', 'boxes in rows and columns', 'ប្រអប់ជាជួរដេក និងជួរឈរ'],
      ['chart', 'គំនូសតាង', '📈', 'a picture made from numbers', 'រូបភាពដែលបង្កើតពីលេខ'],
      [
        'formula',
        'រូបមន្ត',
        '🧮',
        'a calculation in a cell, like =SUM()',
        'ការគណនាក្នុងក្រឡា ដូចជា =SUM()',
      ],
    ],
    gaps: [
      ['In Excel, a ___ like =SUM(A1:A5) adds numbers.', 'formula', ['slide', 'font']],
      ['Add one more ___ to the presentation.', 'slide', ['formula', 'table']],
      ['Make the title bigger by changing the ___ size.', 'font', ['chart', 'print']],
      ['A bar ___ shows the sales clearly.', 'chart', ['document', 'spreadsheet']],
    ],
    sentence: ['Print two copies of the document.', 'បោះពុម្ពឯកសារពីរច្បាប់។'],
    spellWord: 'chart',
    reward: t(
      'Ready for office work in English! 📊',
      'ត្រៀមខ្លួនសម្រាប់ការងារការិយាល័យជាភាសាអង់គ្លេស! 📊',
    ),
  },
  {
    slug: 'email-words',
    icon: '📧',
    title: t('Email Words', 'ពាក្យអ៊ីមែល'),
    summary: t(
      'Inbox, reply, forward, attachment.',
      'ប្រអប់សំបុត្រ ឆ្លើយតប បញ្ជូនបន្ត ឯកសារភ្ជាប់។',
    ),
    intro: t(
      'Email is how schools and companies talk. Learn the buttons and words!',
      'អ៊ីមែលជារបៀបដែលសាលា និងក្រុមហ៊ុននិយាយគ្នា។ រៀនប៊ូតុង និងពាក្យ!',
    ),
    see: [
      t(
        '“Reply to the teacher and add your homework as an attachment.”',
        '«ឆ្លើយតបគ្រូ ហើយបន្ថែមកិច្ចការផ្ទះរបស់អ្នកជាឯកសារភ្ជាប់។»',
      ),
      t('Email words make instructions clear.', 'ពាក្យអ៊ីមែលធ្វើឱ្យការណែនាំច្បាស់។'),
    ],
    words: [
      ['email', 'អ៊ីមែល', '📧', 'a message sent over the internet', 'សារដែលផ្ញើតាមអ៊ីនធឺណិត'],
      ['inbox', 'ប្រអប់សំបុត្រ', '📥', 'where new emails arrive', 'កន្លែងដែលអ៊ីមែលថ្មីមកដល់'],
      ['send', 'ផ្ញើ', '📤', 'make your message go', 'ធ្វើឱ្យសាររបស់អ្នកចេញទៅ'],
      ['reply', 'ឆ្លើយតប', '↩️', 'answer an email', 'ឆ្លើយអ៊ីមែល'],
      ['subject', 'ប្រធានបទ', '🏷️', 'the short title of an email', 'ចំណងជើងខ្លីនៃអ៊ីមែល'],
      ['attachment', 'ឯកសារភ្ជាប់', '📎', 'a file added to an email', 'ឯកសារដែលបន្ថែមទៅអ៊ីមែល'],
      [
        'forward',
        'បញ្ជូនបន្ត',
        '⏩',
        'send an email you got to someone else',
        'ផ្ញើអ៊ីមែលដែលអ្នកទទួលបានទៅអ្នកផ្សេង',
      ],
      [
        'spam',
        'សារឥតបានការ',
        '🚮',
        'unwanted emails, often ads or scams',
        'អ៊ីមែលមិនចង់បាន ជាញឹកញាប់ជាការផ្សាយ ឬការបោកប្រាស់',
      ],
    ],
    gaps: [
      ['Write a clear ___ like “Homework for Monday”.', 'subject', ['spam', 'inbox']],
      ['I added my CV as an ___.', 'attachment', ['reply', 'forward']],
      ['Click ___ to answer the teacher.', 'reply', ['subject', 'spam']],
      ['Strange ads go to the ___ folder.', 'spam', ['attachment', 'email']],
    ],
    sentence: ['Please reply to my email.', 'សូមឆ្លើយតបអ៊ីមែលរបស់ខ្ញុំ។'],
    spellWord: 'inbox',
    reward: t('Your emails will sound professional! 📧', 'អ៊ីមែលរបស់អ្នកនឹងស្តាប់ទៅជំនាញ! 📧'),
  },
  {
    slug: 'security-words',
    icon: '🔐',
    title: t('Security Words', 'ពាក្យសុវត្ថិភាព'),
    summary: t('Password, login, virus, firewall.', 'ពាក្យសម្ងាត់ ចូលគណនី មេរោគ ជញ្ជាំងភ្លើង។'),
    intro: t(
      'Security messages pop up everywhere. Understand them and stay safe.',
      'សារសុវត្ថិភាពលោតឡើងគ្រប់កន្លែង។ យល់វា ហើយរក្សាសុវត្ថិភាព។',
    ),
    see: [
      t(
        '“Wrong username or password. Please try to log in again.”',
        '«ឈ្មោះអ្នកប្រើ ឬពាក្យសម្ងាត់ខុស។ សូមព្យាយាមចូលម្តងទៀត។»',
      ),
      t(
        'A message you will see one day — now you can read it!',
        'សារមួយដែលអ្នកនឹងឃើញថ្ងៃណាមួយ — ឥឡូវអ្នកអាចអានវា!',
      ),
    ],
    words: [
      [
        'password',
        'ពាក្យសម្ងាត់',
        '🔑',
        'the secret word that opens your account',
        'ពាក្យសម្ងាត់ដែលបើកគណនីរបស់អ្នក',
      ],
      ['username', 'ឈ្មោះអ្នកប្រើ', '👤', 'the name you log in with', 'ឈ្មោះដែលអ្នកប្រើចូល'],
      ['login', 'ចូលគណនី', '🚪', 'enter your account', 'ចូលក្នុងគណនីរបស់អ្នក'],
      ['logout', 'ចាកចេញ', '👋', 'leave your account safely', 'ចាកចេញពីគណនីរបស់អ្នកដោយសុវត្ថិភាព'],
      ['virus', 'មេរោគ', '🦠', 'bad software that spreads', 'កម្មវិធីអាក្រក់ដែលរាលដាល'],
      [
        'hacker',
        'អ្នកលួចចូល',
        '🕵️',
        'a person who breaks into computers',
        'មនុស្សដែលលួចចូលកុំព្យូទ័រ',
      ],
      [
        'firewall',
        'ជញ្ជាំងភ្លើង',
        '🧱',
        'blocks bad network traffic',
        'រារាំងចរាចរណ៍បណ្តាញអាក្រក់',
      ],
      [
        'privacy',
        'ឯកជនភាព',
        '🙈',
        'keeping your information to yourself',
        'ការរក្សាព័ត៌មានរបស់អ្នកសម្រាប់ខ្លួនឯង',
      ],
    ],
    gaps: [
      ['Never share your ___ with anyone.', 'password', ['firewall', 'logout']],
      ['Click ___ when you finish on a shared computer.', 'logout', ['virus', 'privacy']],
      ['Antivirus software removes a ___.', 'virus', ['username', 'login']],
      ['A ___ blocks bad network traffic.', 'firewall', ['hacker', 'password']],
    ],
    sentence: ['Never share your password.', 'កុំចែករំលែកពាក្យសម្ងាត់របស់អ្នក។'],
    spellWord: 'virus',
    reward: t('You can read every security message! 🔐', 'អ្នកអាចអានសារសុវត្ថិភាពគ្រប់មួយ! 🔐'),
  },
  {
    slug: 'coding-words',
    icon: '👩‍💻',
    title: t('Coding Words', 'ពាក្យសរសេរកូដ'),
    summary: t('Code, bug, loop, variable.', 'កូដ កំហុស រង្វិលជុំ អថេរ។'),
    intro: t(
      'Programmers all over the world use the same English words. Join them!',
      'អ្នកសរសេរកម្មវិធីទូទាំងពិភពលោកប្រើពាក្យអង់គ្លេសដូចគ្នា។ ចូលរួមជាមួយពួកគេ!',
    ),
    see: [
      t(
        '“There is a bug in my loop — the variable never changes.”',
        '«មានកំហុសក្នុងរង្វិលជុំរបស់ខ្ញុំ — អថេរមិនដែលប្តូរ។»',
      ),
      t('Three coding words in one real sentence.', 'ពាក្យសរសេរកូដបីក្នុងប្រយោគពិតមួយ។'),
    ],
    words: [
      [
        'code',
        'កូដ',
        '💻',
        'instructions written for a computer',
        'សេចក្តីណែនាំដែលសរសេរសម្រាប់កុំព្យូទ័រ',
      ],
      [
        'program',
        'កម្មវិធីកុំព្យូទ័រ',
        '📜',
        'a full set of code that does a job',
        'សំណុំកូដពេញលេញដែលធ្វើការងារមួយ',
      ],
      ['bug', 'កំហុសកម្មវិធី', '🐞', 'a mistake in code', 'កំហុសក្នុងកូដ'],
      ['loop', 'រង្វិលជុំ', '🔁', 'code that repeats', 'កូដដែលធ្វើម្តងទៀត'],
      [
        'variable',
        'អថេរ',
        '📦',
        'a named box that stores a value',
        'ប្រអប់មានឈ្មោះដែលរក្សាទុកតម្លៃ',
      ],
      [
        'function',
        'អនុគមន៍',
        '🧰',
        'a named block of code you can reuse',
        'ប្លុកកូដមានឈ្មោះដែលអ្នកអាចប្រើឡើងវិញ',
      ],
      ['input', 'ធាតុចូល', '⌨️', 'data that goes into a program', 'ទិន្នន័យដែលចូលទៅកម្មវិធី'],
      [
        'output',
        'លទ្ធផលចេញ',
        '🖨️',
        'what a program shows or gives back',
        'អ្វីដែលកម្មវិធីបង្ហាញ ឬផ្តល់ត្រឡប់',
      ],
    ],
    gaps: [
      ['A ___ repeats the same steps.', 'loop', ['bug', 'output']],
      ['Store the score in a ___.', 'variable', ['function', 'input']],
      ['Programmers fix every ___ they find.', 'bug', ['loop', 'variable']],
      ['print() shows the ___ on the screen.', 'output', ['code', 'function']],
    ],
    sentence: ['I can write my first program.', 'ខ្ញុំអាចសរសេរកម្មវិធីដំបូងរបស់ខ្ញុំ។'],
    spellWord: 'loop',
    reward: t('You talk like a programmer! 👩‍💻', 'អ្នកនិយាយដូចអ្នកសរសេរកម្មវិធី! 👩‍💻'),
  },
  {
    slug: 'web-words',
    icon: '🎨',
    title: t('Web Design Words', 'ពាក្យរចនាវេប'),
    summary: t('Page, menu, button, layout.', 'ទំព័រ ម៉ឺនុយ ប៊ូតុង ប្លង់។'),
    intro: t(
      'Web designers describe pages with these words. Learn them and talk about any website.',
      'អ្នករចនាវេបពិពណ៌នាទំព័រជាមួយពាក្យទាំងនេះ។ រៀនវា ហើយនិយាយអំពីគេហទំព័រណាមួយ។',
    ),
    see: [
      t(
        '“Move the menu into the header and make the button bigger.”',
        '«ផ្លាស់ម៉ឺនុយទៅក្បាលទំព័រ ហើយធ្វើឱ្យប៊ូតុងធំជាង។»',
      ),
      t('Feedback a designer gets every day.', 'មតិដែលអ្នករចនាទទួលបានរាល់ថ្ងៃ។'),
    ],
    words: [
      ['page', 'ទំព័រ', '📄', 'one screen of a website', 'អេក្រង់មួយនៃគេហទំព័រ'],
      ['menu', 'ម៉ឺនុយ', '☰', 'a list of links to other pages', 'បញ្ជីតំណទៅទំព័រផ្សេង'],
      [
        'button',
        'ប៊ូតុង',
        '🔘',
        'something you tap to do an action',
        'អ្វីមួយដែលអ្នកចុចដើម្បីធ្វើសកម្មភាព',
      ],
      ['image', 'រូបភាព', '🖼️', 'a picture on the page', 'រូបភាពលើទំព័រ'],
      ['header', 'ក្បាលទំព័រ', '🔝', 'the top part with the logo', 'ផ្នែកខាងលើមានឡូហ្គោ'],
      [
        'footer',
        'បាតទំព័រ',
        '🔚',
        'the bottom part with contact info',
        'ផ្នែកខាងក្រោមមានព័ត៌មានទំនាក់ទំនង',
      ],
      [
        'layout',
        'ប្លង់',
        '📐',
        'how things are arranged on the page',
        'របៀបដែលអ្វីៗត្រូវបានរៀបចំលើទំព័រ',
      ],
      ['colour', 'ពណ៌', '🎨', 'red, blue, green and so on', 'ក្រហម ខៀវ បៃតង ជាដើម'],
    ],
    gaps: [
      ['Tap the ___ to send the form.', 'button', ['footer', 'layout']],
      ['The logo is in the ___ at the top.', 'header', ['image', 'colour']],
      ['Contact details are in the ___ at the bottom.', 'footer', ['menu', 'button']],
      ['Open the ___ to see all pages.', 'menu', ['page', 'header']],
    ],
    sentence: ['Click the button at the top of the page.', 'ចុចប៊ូតុងនៅខាងលើទំព័រ។'],
    spellWord: 'button',
    reward: t('You can describe any web page! 🎨', 'អ្នកអាចពិពណ៌នាទំព័រវេបណាមួយ! 🎨'),
  },
  {
    slug: 'network-words',
    icon: '📡',
    title: t('Network Words', 'ពាក្យបណ្តាញ'),
    summary: t('Router, signal, server, cable.', 'រ៉ោតទ័រ សញ្ញា ម៉ាស៊ីនមេ ខ្សែ។'),
    intro: t(
      'When the Wi-Fi breaks, these are the words the technician will use.',
      'ពេល Wi-Fi ខូច ទាំងនេះជាពាក្យដែលអ្នកបច្ចេកទេសនឹងប្រើ។',
    ),
    see: [
      t(
        '“The signal is weak. Connect with a cable or move closer to the router.”',
        '«សញ្ញាខ្សោយ។ ភ្ជាប់ដោយខ្សែ ឬទៅជិតរ៉ោតទ័រ។»',
      ),
      t('Real advice from an IT helpdesk.', 'ដំបូន្មានពិតពីផ្នែកជំនួយ IT។'),
    ],
    words: [
      ['network', 'បណ្តាញ', '🕸️', 'devices connected together', 'ឧបករណ៍ភ្ជាប់គ្នា'],
      ['router', 'រ៉ោតទ័រ', '📡', 'the box that shares the internet', 'ប្រអប់ដែលចែករំលែកអ៊ីនធឺណិត'],
      ['cable', 'ខ្សែ', '🔌', 'a wire that connects devices', 'ខ្សែដែលភ្ជាប់ឧបករណ៍'],
      ['signal', 'សញ្ញា', '📶', 'how strong the Wi-Fi is', 'Wi-Fi ខ្លាំងប៉ុណ្ណា'],
      [
        'server',
        'ម៉ាស៊ីនមេ',
        '🗄️',
        'a computer that stores websites',
        'កុំព្យូទ័រដែលរក្សាទុកគេហទំព័រ',
      ],
      ['address', 'អាសយដ្ឋាន', '🏷️', 'the number that finds a device', 'លេខដែលរកឧបករណ៍'],
      ['connect', 'ភ្ជាប់', '🔗', 'join to a network', 'ចូលរួមបណ្តាញ'],
      ['speed', 'ល្បឿន', '🚀', 'how fast data moves', 'ទិន្នន័យផ្លាស់ទីលឿនប៉ុណ្ណា'],
    ],
    gaps: [
      ['Restart the ___ if the Wi-Fi stops.', 'router', ['address', 'speed']],
      ['The ___ is weak far from the router.', 'signal', ['server', 'cable']],
      ['Websites are stored on a ___.', 'server', ['connect', 'network']],
      ['Every device has an IP ___.', 'address', ['router', 'signal']],
    ],
    sentence: ['Connect the cable to the router.', 'ភ្ជាប់ខ្សែទៅរ៉ោតទ័រ។'],
    spellWord: 'cable',
    reward: t(
      'You can talk to any network technician! 📡',
      'អ្នកអាចនិយាយជាមួយអ្នកបច្ចេកទេសបណ្តាញណាមួយ! 📡',
    ),
  },
  {
    slug: 'ai-words',
    icon: '🤖',
    title: t('AI Words', 'ពាក្យ AI'),
    summary: t('Prompt, data, chatbot, predict.', 'សំណើ ទិន្នន័យ កម្មវិធីជជែក ព្យាករណ៍។'),
    intro: t(
      'AI is everywhere. Learn the words to use it well — and wisely.',
      'AI មាននៅគ្រប់ទីកន្លែង។ រៀនពាក្យដើម្បីប្រើវាឱ្យបានល្អ — និងឆ្លាតវៃ។',
    ),
    see: [
      t(
        '“Write a clear prompt, then check the chatbot’s answer.”',
        '«សរសេរសំណើឱ្យច្បាស់ រួចពិនិត្យចម្លើយរបស់កម្មវិធីជជែក។»',
      ),
      t('The two golden rules of using AI.', 'ច្បាប់មាសពីរនៃការប្រើ AI។'),
    ],
    words: [
      [
        'robot',
        'មនុស្សយន្ត',
        '🤖',
        'a machine that can do tasks by itself',
        'ម៉ាស៊ីនដែលអាចធ្វើការងារដោយខ្លួនឯង',
      ],
      [
        'data',
        'ទិន្នន័យ',
        '📊',
        'facts and numbers a computer uses',
        'ការពិត និងលេខដែលកុំព្យូទ័រប្រើ',
      ],
      ['prompt', 'សំណើ', '💬', 'what you type to ask an AI', 'អ្វីដែលអ្នកវាយដើម្បីសួរ AI'],
      ['chatbot', 'កម្មវិធីជជែក', '💭', 'an AI that answers in a chat', 'AI ដែលឆ្លើយក្នុងការជជែក'],
      ['learn', 'រៀន', '📚', 'get better from examples', 'ប្រសើរឡើងពីឧទាហរណ៍'],
      ['predict', 'ព្យាករណ៍', '🔮', 'guess what comes next', 'ទាយអ្វីដែលនឹងមកបន្ទាប់'],
      ['smart', 'ឆ្លាត', '💡', 'able to solve problems', 'អាចដោះស្រាយបញ្ហា'],
      [
        'check',
        'ពិនិត្យ',
        '✅',
        'make sure something is right',
        'ធ្វើឱ្យប្រាកដថាអ្វីមួយត្រឹមត្រូវ',
      ],
    ],
    gaps: [
      ['Write a clear ___ to get a good AI answer.', 'prompt', ['robot', 'smart']],
      ['AI learns from a lot of ___.', 'data', ['check', 'chatbot']],
      ['Always ___ AI answers — they can be wrong.', 'check', ['predict', 'learn']],
      ['A ___ answers questions in a chat.', 'chatbot', ['data', 'prompt']],
    ],
    sentence: ['Always check what AI tells you.', 'ពិនិត្យអ្វីដែល AI ប្រាប់អ្នកជានិច្ច។'],
    spellWord: 'prompt',
    reward: t('You know the language of AI! 🤖', 'អ្នកស្គាល់ភាសានៃ AI! 🤖'),
  },
  {
    slug: 'error-message-words',
    icon: '⚠️',
    title: t('Error Message Words', 'ពាក្យសារកំហុស'),
    summary: t(
      'Understand what the computer is telling you.',
      'យល់ពីអ្វីដែលកុំព្យូទ័រកំពុងប្រាប់អ្នក។',
    ),
    intro: t(
      'Error messages are not scary — they are clues. Learn to read them!',
      'សារកំហុសមិនគួរឱ្យខ្លាចទេ — វាជាតម្រុយ។ រៀនអានវា!',
    ),
    see: [
      t(
        '“Upload failed. File is missing. Please retry.”',
        '«ការផ្ទុកឡើងបរាជ័យ។ ឯកសារបាត់។ សូមព្យាយាមម្តងទៀត។»',
      ),
      t(
        'Now you know what happened and what to do.',
        'ឥឡូវអ្នកដឹងថាមានអ្វីកើតឡើង និងអ្វីដែលត្រូវធ្វើ។',
      ),
    ],
    words: [
      ['error', 'កំហុស', '⚠️', 'something went wrong', 'មានអ្វីមួយខុស'],
      ['warning', 'ការព្រមាន', '🟡', 'be careful — it might go wrong', 'ប្រយ័ត្ន — វាអាចខុស'],
      ['loading', 'កំពុងផ្ទុក', '⏳', 'please wait, it is coming', 'សូមរង់ចាំ វាកំពុងមក'],
      ['failed', 'បរាជ័យ', '❌', 'it did not work', 'វាមិនដំណើរការ'],
      ['retry', 'ព្យាយាមម្តងទៀត', '🔁', 'try again', 'សាកម្តងទៀត'],
      ['denied', 'ត្រូវបានបដិសេធ', '🚫', 'you are not allowed', 'អ្នកមិនត្រូវបានអនុញ្ញាត'],
      ['missing', 'បាត់', '🔍', 'it cannot be found', 'វាមិនអាចរកឃើញ'],
      ['expired', 'ផុតកំណត់', '📅', 'the time limit has passed', 'ពេលកំណត់បានកន្លងផុត'],
    ],
    gaps: [
      ['“Access ___” means you are not allowed in.', 'denied', ['loading', 'missing']],
      ['“File not found” means the file is ___.', 'missing', ['expired', 'retry']],
      ['“Session ___” — please log in again.', 'expired', ['warning', 'failed']],
      ['The page is still ___, please wait.', 'loading', ['denied', 'error']],
    ],
    sentence: ['Read the error message carefully.', 'អានសារកំហុសដោយប្រុងប្រយ័ត្ន។'],
    spellWord: 'retry',
    reward: t(
      'Error messages are clues, and you can read them! ⚠️',
      'សារកំហុសជាតម្រុយ ហើយអ្នកអាចអានវា! ⚠️',
    ),
  },
  {
    slug: 'it-job-words',
    icon: '👷',
    title: t('IT Job Words', 'ពាក្យការងារ IT'),
    summary: t('Who does what in the IT world?', 'អ្នកណាធ្វើអ្វីក្នុងពិភព IT?'),
    intro: t(
      'There are many IT jobs in Cambodia. Which one is for you?',
      'មានការងារ IT ជាច្រើនក្នុងកម្ពុជា។ តើមួយណាសម្រាប់អ្នក?',
    ),
    see: [
      t(
        '“A developer writes the app, a tester checks it, and a designer makes it beautiful.”',
        '«អ្នកអភិវឌ្ឍសរសេរកម្មវិធី អ្នកសាកល្បងពិនិត្យវា ហើយអ្នករចនាធ្វើឱ្យវាស្អាត។»',
      ),
      t('Teamwork builds every app you use.', 'ការងារជាក្រុមសាងសង់កម្មវិធីគ្រប់មួយដែលអ្នកប្រើ។'),
    ],
    words: [
      [
        'developer',
        'អ្នកអភិវឌ្ឍ',
        '👩‍💻',
        'writes code for apps and websites',
        'សរសេរកូដសម្រាប់កម្មវិធី និងគេហទំព័រ',
      ],
      [
        'designer',
        'អ្នករចនា',
        '🎨',
        'plans how things look and feel',
        'គ្រោងរបៀបដែលអ្វីៗមើលទៅ និងមានអារម្មណ៍',
      ],
      [
        'technician',
        'អ្នកបច្ចេកទេស',
        '🔧',
        'fixes computers and networks',
        'ជួសជុលកុំព្យូទ័រ និងបណ្តាញ',
      ],
      ['tester', 'អ្នកសាកល្បង', '🧪', 'finds bugs before users do', 'រកកំហុសមុនអ្នកប្រើ'],
      ['teacher', 'គ្រូ', '👩‍🏫', 'helps others learn IT', 'ជួយអ្នកដទៃរៀន IT'],
      [
        'manager',
        'អ្នកគ្រប់គ្រង',
        '📋',
        'plans the work and leads the team',
        'គ្រោងការងារ និងដឹកនាំក្រុម',
      ],
      ['analyst', 'អ្នកវិភាគ', '📈', 'finds meaning in data', 'រកអត្ថន័យក្នុងទិន្នន័យ'],
      [
        'support',
        'ផ្នែកជំនួយ',
        '🎧',
        'helps users with their problems',
        'ជួយអ្នកប្រើជាមួយបញ្ហារបស់ពួកគេ',
      ],
    ],
    gaps: [
      ['A ___ writes code for apps.', 'developer', ['tester', 'manager']],
      ['A ___ fixes broken computers.', 'technician', ['designer', 'analyst']],
      ['A ___ makes websites look beautiful.', 'designer', ['support', 'teacher']],
      ['A data ___ finds patterns in numbers.', 'analyst', ['developer', 'technician']],
    ],
    sentence: ['I want to be a web developer.', 'ខ្ញុំចង់ក្លាយជាអ្នកអភិវឌ្ឍវេប។'],
    spellWord: 'tester',
    reward: t('Dream big — the IT world needs you! 👷', 'សុបិនធំ — ពិភព IT ត្រូវការអ្នក! 👷'),
  },
  {
    slug: 'asking-for-help',
    icon: '🙋',
    title: t('Asking for Help', 'ការសុំជំនួយ'),
    summary: t('Polite words to explain a problem.', 'ពាក្យគួរសមដើម្បីពន្យល់បញ្ហា។'),
    intro: t(
      'Good IT people ask clear questions. These words help you get help fast.',
      'មនុស្ស IT ល្អសួរសំណួរច្បាស់។ ពាក្យទាំងនេះជួយអ្នកទទួលជំនួយលឿន។',
    ),
    see: [
      t(
        '“Excuse me, I have a problem. Here is a screenshot. Can you explain the steps again? Thanks!”',
        '«សុំទោស ខ្ញុំមានបញ្ហា។ នេះជារូបថតអេក្រង់។ តើអ្នកអាចពន្យល់ជំហានម្តងទៀតបានទេ? អរគុណ!»',
      ),
      t(
        'Polite, clear and complete — the perfect help request.',
        'គួរសម ច្បាស់ និងពេញលេញ — សំណើជំនួយល្អឥតខ្ចោះ។',
      ),
    ],
    words: [
      ['help', 'ជំនួយ', '🙋', 'support when you are stuck', 'ការគាំទ្រពេលអ្នកជាប់គាំង'],
      ['problem', 'បញ្ហា', '❓', 'something that is not working', 'អ្វីមួយដែលមិនដំណើរការ'],
      [
        'question',
        'សំណួរ',
        '💬',
        'what you ask to learn something',
        'អ្វីដែលអ្នកសួរដើម្បីរៀនអ្វីមួយ',
      ],
      ['explain', 'ពន្យល់', '🗣️', 'make something clear', 'ធ្វើឱ្យអ្វីមួយច្បាស់'],
      ['screenshot', 'រូបថតអេក្រង់', '📸', 'a picture of your screen', 'រូបភាពនៃអេក្រង់របស់អ្នក'],
      ['steps', 'ជំហាន', '👣', 'what you did, in order', 'អ្វីដែលអ្នកបានធ្វើ តាមលំដាប់'],
      ['again', 'ម្តងទៀត', '🔁', 'one more time', 'ម្តងទៀត មួយដងទៀត'],
      [
        'thanks',
        'អរគុណ',
        '🙏',
        'what you say when someone helps',
        'អ្វីដែលអ្នកនិយាយពេលនរណាម្នាក់ជួយ',
      ],
    ],
    gaps: [
      ['Can you ___ that again, please?', 'explain', ['thanks', 'steps']],
      ['I took a ___ of the error.', 'screenshot', ['question', 'again']],
      ['I have a ___ with my password.', 'problem', ['help', 'explain']],
      ['What ___ did you try already?', 'steps', ['screenshot', 'problem']],
    ],
    sentence: ['Can you help me with this problem?', 'តើអ្នកអាចជួយខ្ញុំជាមួយបញ្ហានេះបានទេ?'],
    spellWord: 'thanks',
    reward: t(
      '🏆 Word Master! Asking clearly is a superpower in IT.',
      '🏆 ម្ចាស់ពាក្យ! ការសួរឱ្យច្បាស់គឺជាថាមពលពិសេសក្នុង IT។',
    ),
  },
];

export const VOCABULARY_LESSONS: LessonSeed[] = THEMES.map(vocabularyLesson);
