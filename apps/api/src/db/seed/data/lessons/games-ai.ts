import { t } from '../../types';
import { buildSentence, catchIt, game, memory, robot, spell } from '../dsl';

// 🎮 Game rounds for AI Playground, by lesson slug. Khmer (km) strings are DRAFTS.
export const AI_GAMES = {
  'what-is-ai': game(
    catchIt(
      t('Catch the things that use AI!', 'ចាប់អ្វីដែលប្រើ AI!'),
      [
        ['🙂', t('Face unlock', 'ដោះសោដោយមុខ')],
        ['🗣️', t('Voice assistant', 'ជំនួយការសំឡេង')],
        ['🌐', 'Google Translate'],
        ['▶️', t('Video suggestions', 'ការណែនាំវីដេអូ')],
      ],
      [
        ['💡', t('Light switch', 'កុងតាក់ភ្លើង')],
        ['📖', t('Paper book', 'សៀវភៅក្រដាស')],
        ['🚲', t('Bicycle', 'កង់')],
        ['🥄', t('Spoon', 'ស្លាបព្រា')],
      ],
    ),
    memory(t('Match each AI word to its meaning.', 'ផ្គូផ្គងពាក្យ AI នីមួយៗជាមួយអត្ថន័យ។'), [
      ['AI', t('Artificial Intelligence', 'បញ្ញាសិប្បនិម្មិត')],
      [['🤖', t('Robot', 'រ៉ូបូត')], t('A machine that moves', 'ម៉ាស៊ីនដែលធ្វើចលនា')],
      [['💬', t('Chatbot', 'ឆាតបូត')], t('A program that chats', 'កម្មវិធីដែលជជែក')],
      [t('Data', 'ទិន្នន័យ'), t('Information AI learns from', 'ព័ត៌មានដែល AI រៀនពី')],
    ]),
  ),
  'ai-in-daily-life': game(
    memory(t('Match each app to how it uses AI.', 'ផ្គូផ្គងកម្មវិធីនីមួយៗជាមួយរបៀបដែលវាប្រើ AI។'), [
      [['🗺️', t('Maps', 'ផែនទី')], t('Finds the fastest way', 'រកផ្លូវលឿនបំផុត')],
      [['📷', t('Camera', 'កាមេរ៉ា')], t('Recognises faces', 'ស្គាល់មុខ')],
      [['📧', t('Email', 'អ៊ីមែល')], t('Filters spam', 'ច្រោះសារឥតបានការ')],
      [['🎵', t('Music app', 'កម្មវិធីតន្ត្រី')], t('Suggests songs', 'ណែនាំចម្រៀង')],
    ]),
    catchIt(
      t('Catch the AI helpers on your phone!', 'ចាប់ជំនួយការ AI នៅលើទូរស័ព្ទរបស់អ្នក!'),
      [
        t('Autocorrect', 'កែពាក្យស្វ័យប្រវត្តិ'),
        t('Voice typing', 'វាយដោយសំឡេង'),
        t('Photo search “cat”', 'ស្វែងរករូប «ឆ្មា»'),
        t('Spam filter', 'តម្រងសារឥតបានការ'),
      ],
      [
        t('Torch', 'ពិល'),
        t('Volume button', 'ប៊ូតុងសំឡេង'),
        t('Battery', 'ថ្ម'),
        t('SIM card', 'ស៊ីមកាត'),
      ],
    ),
  ),
  'how-ai-learns': game(
    catchIt(
      t(
        'You are teaching an AI what a cat is. Catch only the CAT pictures!',
        'អ្នកកំពុងបង្រៀន AI ថាឆ្មាជាអ្វី។ ចាប់តែរូបឆ្មាប៉ុណ្ណោះ!',
      ),
      [
        ['🐈', t('Cat', 'ឆ្មា')],
        ['🐱', t('Cat face', 'មុខឆ្មា')],
        ['😺', t('Happy cat', 'ឆ្មាសប្បាយ')],
        ['🙀', t('Surprised cat', 'ឆ្មាភ្ញាក់ផ្អើល')],
      ],
      [
        ['🐕', t('Dog', 'ឆ្កែ')],
        ['🐭', t('Mouse', 'កណ្តុរ')],
        ['🐮', t('Cow', 'គោ')],
        ['🐰', t('Rabbit', 'ទន្សាយ')],
      ],
      { speed: 'fast' },
    ),
    memory(t('Match each word to its meaning.', 'ផ្គូផ្គងពាក្យនីមួយៗជាមួយអត្ថន័យ។'), [
      [
        t('Training data', 'ទិន្នន័យហ្វឹកហាត់'),
        t('Examples AI learns from', 'ឧទាហរណ៍ដែល AI រៀនពី'),
      ],
      [t('Pattern', 'លំនាំ'), t('Something that repeats', 'អ្វីដែលកើតឡើងដដែលៗ')],
      [t('Model', 'ម៉ូដែល'), t('What the AI learned', 'អ្វីដែល AI បានរៀន')],
      [t('Mistake', 'កំហុស'), t('AI can be wrong too', 'AI ក៏អាចខុសដែរ')],
    ]),
  ),
  'what-can-ai-do': game(
    catchIt(
      t('Catch the things AI does WELL!', 'ចាប់អ្វីដែល AI ធ្វើបានល្អ!'),
      [
        t('Translate text', 'បកប្រែអត្ថបទ'),
        t('Write a first draft', 'សរសេរសេចក្តីព្រាងដំបូង'),
        t('Recognise pictures', 'ស្គាល់រូបភាព'),
        t('Summarise a text', 'សង្ខេបអត្ថបទ'),
      ],
      [
        t('Feel emotions', 'មានអារម្មណ៍'),
        t('Always be right', 'ត្រូវជានិច្ច'),
        t('Think for you', 'គិតជំនួសអ្នក'),
      ],
      { speed: 'slow' },
    ),
    memory(t('Match each AI skill to an example.', 'ផ្គូផ្គងជំនាញ AI នីមួយៗជាមួយឧទាហរណ៍។'), [
      [t('Translate', 'បកប្រែ'), t('English → Khmer', 'អង់គ្លេស → ខ្មែរ')],
      [t('Summarise', 'សង្ខេប'), t('Make a text shorter', 'ធ្វើឱ្យអត្ថបទខ្លីជាងមុន')],
      [t('Generate an image', 'បង្កើតរូបភាព'), t('A picture from words', 'រូបភាពពីពាក្យ')],
      [
        t('Speech to text', 'សំឡេងទៅអត្ថបទ'),
        t('Your voice becomes words', 'សំឡេងរបស់អ្នកក្លាយជាពាក្យ'),
      ],
    ]),
  ),
  'ai-images-and-voice': game(
    catchIt(
      t('Catch the signs that a picture may be AI-made!', 'ចាប់សញ្ញាដែលរូបភាពអាចបង្កើតដោយ AI!'),
      [
        t('Strange hands or fingers', 'ដៃ ឬម្រាមដៃចម្លែក'),
        t('Melted, blurry text', 'អក្សររលាយ ព្រិល'),
        t('Too-perfect skin', 'ស្បែកល្អពេក'),
        t('Odd shadows', 'ស្រមោលចម្លែក'),
      ],
      [
        t('Has a real source', 'មានប្រភពពិត'),
        t('Same photo on trusted news', 'រូបដដែលនៅលើព័ត៌មានទុកចិត្តបាន'),
        t('Photographer’s name', 'ឈ្មោះអ្នកថតរូប'),
      ],
      { speed: 'slow' },
    ),
    memory(t('Match each word to its meaning.', 'ផ្គូផ្គងពាក្យនីមួយៗជាមួយអត្ថន័យ។'), [
      [
        t('Deepfake', 'ឌីបហ្វេក'),
        t('A fake video of a real person', 'វីដេអូក្លែងក្លាយនៃមនុស្សពិត'),
      ],
      [
        t('Voice clone', 'ការចម្លងសំឡេង'),
        t('A fake copy of someone’s voice', 'ច្បាប់ចម្លងក្លែងនៃសំឡេងនរណាម្នាក់'),
      ],
      [t('Watermark', 'ស្លាកសញ្ញា'), t('A mark showing who made it', 'សញ្ញាបង្ហាញអ្នកបង្កើត')],
      [t('Source', 'ប្រភព'), t('Where it came from', 'កន្លែងដែលវាមកពី')],
    ]),
  ),
  'asking-ai-questions': game(
    catchIt(
      t('Catch the CLEAR questions to ask an AI!', 'ចាប់សំណួរច្បាស់លាស់សម្រាប់សួរ AI!'),
      [
        'What is a CPU? Explain for a beginner.',
        'Give 3 tips for a strong password.',
        'Translate “thank you” into Khmer.',
      ],
      ['stuff?', 'Tell me everything', 'it'],
      { speed: 'slow' },
    ),
    buildSentence(
      t('Build a clear question for an AI.', 'បង្កើតសំណួរច្បាស់លាស់សម្រាប់ AI។'),
      'Explain what RAM is in simple words.',
      { say: 'Explain what RAM is in simple words.' },
    ),
  ),
  'better-prompts': game(
    memory(
      t(
        'Match each part of a prompt to an example.',
        'ផ្គូផ្គងផ្នែកនីមួយៗនៃប្រអប់បញ្ចូលជាមួយឧទាហរណ៍។',
      ),
      [
        [t('Role', 'តួនាទី'), 'You are a teacher'],
        [t('Task', 'កិច្ចការ'), 'Explain fractions'],
        [t('Context', 'បរិបទ'), 'For a 12-year-old'],
        [t('Format', 'ទម្រង់'), 'In 3 bullet points'],
      ],
    ),
    catchIt(
      t(
        'Catch the details that make a prompt BETTER!',
        'ចាប់ព័ត៌មានលម្អិតដែលធ្វើឱ្យប្រអប់បញ្ចូលល្អជាងមុន!',
      ),
      [
        t('Who it is for', 'សម្រាប់នរណា'),
        t('How long', 'វែងប៉ុណ្ណា'),
        t('The format', 'ទម្រង់'),
        t('An example', 'ឧទាហរណ៍'),
      ],
      [t('Rude words', 'ពាក្យឈ្លើយ'), 'ALL CAPS!!!', t('Random emojis', 'អារម្មណ៍ចៃដន្យ')],
    ),
  ),
  'prompt-builder': game(
    buildSentence(
      t('Build a good prompt from the word tiles.', 'បង្កើតប្រអប់បញ្ចូលល្អពីបន្ទះពាក្យ។'),
      'Write 3 tips for saving money for students.',
      { say: 'Write 3 tips for saving money for students.' },
    ),
    spell(
      t(
        'Spell the word: what you type to talk to an AI.',
        'ប្រកបពាក្យ៖ អ្វីដែលអ្នកវាយដើម្បីនិយាយជាមួយ AI។',
      ),
      'prompt',
      {
        extra: 'ae',
        say: 'prompt',
      },
    ),
  ),
  'learning-with-ai': game(
    catchIt(
      t('Catch the GOOD ways to learn with AI!', 'ចាប់វិធីល្អក្នុងការរៀនជាមួយ AI!'),
      [
        t('Ask it to explain more simply', 'សុំឱ្យវាពន្យល់ងាយជាងនេះ'),
        t('Ask for practice questions', 'សុំសំណួរហាត់'),
        t('Check its answer in your book', 'ពិនិត្យចម្លើយរបស់វាក្នុងសៀវភៅ'),
      ],
      [
        t('Copy homework without reading', 'ចម្លងកិច្ចការផ្ទះដោយមិនអាន'),
        t('Believe everything it says', 'ជឿគ្រប់យ៉ាងដែលវានិយាយ'),
        t('Give it your password', 'ឱ្យពាក្យសម្ងាត់ទៅវា'),
      ],
    ),
    memory(t('Match each request to what it does.', 'ផ្គូផ្គងសំណើនីមួយៗជាមួយអ្វីដែលវាធ្វើ។'), [
      [t('Explain', 'ពន្យល់'), t('Help me understand', 'ជួយខ្ញុំឱ្យយល់')],
      [t('Quiz me', 'សួរខ្ញុំ'), t('Practice questions', 'សំណួរហាត់')],
      [t('Translate', 'បកប្រែ'), t('Change the language', 'ប្តូរភាសា')],
      [t('Summarise', 'សង្ខេប'), t('Make it shorter', 'ធ្វើឱ្យខ្លី')],
    ]),
  ),
  'checking-ai-answers': game(
    catchIt(
      t('Catch the GOOD ways to check an AI answer!', 'ចាប់វិធីល្អក្នុងការពិនិត្យចម្លើយ AI!'),
      [
        t('Search trusted websites', 'ស្វែងរកវេបសាយទុកចិត្តបាន'),
        t('Ask a teacher', 'សួរគ្រូ'),
        t('Check the numbers yourself', 'ពិនិត្យលេខដោយខ្លួនឯង'),
        t('Compare 2 sources', 'ប្រៀបធៀបប្រភព 2'),
      ],
      [
        t('It sounds sure, so it’s true', 'វានិយាយប្រាកដ ដូច្នេះពិត'),
        t('Share it right away', 'ចែករំលែកភ្លាម'),
        t('Never check anything', 'មិនដែលពិនិត្យអ្វីទាំងអស់'),
      ],
    ),
    memory(t('Match each word to its meaning.', 'ផ្គូផ្គងពាក្យនីមួយៗជាមួយអត្ថន័យ។'), [
      [t('Hallucination', 'ការប្រឌិត (Hallucination)'), t('AI makes something up', 'AI ប្រឌិតរឿង')],
      [t('Fact-check', 'ពិនិត្យការពិត'), t('Prove it with sources', 'បញ្ជាក់ដោយប្រភព')],
      [t('Source', 'ប្រភព'), t('Where information comes from', 'កន្លែងព័ត៌មានមកពី')],
      [t('Bias', 'ភាពលំអៀង'), t('An unfair, one-sided answer', 'ចម្លើយមិនយុត្តិធម៌ លំអៀង')],
    ]),
  ),
  'ai-fairness': game(
    memory(t('Match each word to its meaning.', 'ផ្គូផ្គងពាក្យនីមួយៗជាមួយអត្ថន័យ។'), [
      [t('Bias', 'ភាពលំអៀង'), t('Unfair to some people', 'មិនយុត្តិធម៌ចំពោះមនុស្សខ្លះ')],
      [t('Fair', 'យុត្តិធម៌'), t('Works well for everyone', 'ដំណើរការល្អសម្រាប់គ្រប់គ្នា')],
      [
        t('Diverse data', 'ទិន្នន័យចម្រុះ'),
        t('Examples from many people', 'ឧទាហរណ៍ពីមនុស្សជាច្រើន'),
      ],
      [
        t('Testing', 'ការសាកល្បង'),
        t('Check results for all groups', 'ពិនិត្យលទ្ធផលសម្រាប់គ្រប់ក្រុម'),
      ],
    ]),
    catchIt(
      t('Catch the FAIR choices when building an AI!', 'ចាប់ជម្រើសយុត្តិធម៌ពេលបង្កើត AI!'),
      [
        t('Photos of people of all skin colours', 'រូបមនុស្សគ្រប់ពណ៌សម្បុរ'),
        t('Test with girls and boys', 'សាកល្បងជាមួយក្មេងស្រី និងប្រុស'),
        t('Include Khmer speakers', 'រួមបញ្ចូលអ្នកនិយាយខ្មែរ'),
        t('Fix unfair results', 'កែលទ្ធផលមិនយុត្តិធម៌'),
      ],
      [
        t('Use data from one city only', 'ប្រើទិន្នន័យពីទីក្រុងតែមួយ'),
        t('Ignore complaints', 'មិនអើពើការតវ៉ា'),
        t('Test on adults only', 'សាកល្បងលើមនុស្សពេញវ័យប៉ុណ្ណោះ'),
      ],
      { speed: 'slow' },
    ),
  ),
  'ai-privacy-and-safety': game(
    catchIt(
      t('Catch what you should NEVER tell an AI chatbot!', 'ចាប់អ្វីដែលអ្នកមិនគួរប្រាប់ឆាតបូត AI!'),
      [
        t('Your password', 'ពាក្យសម្ងាត់របស់អ្នក'),
        t('Your home address', 'អាសយដ្ឋានផ្ទះរបស់អ្នក'),
        t('Bank card number', 'លេខកាតធនាគារ'),
        t('Your ID number', 'លេខអត្តសញ្ញាណប័ណ្ណ'),
      ],
      [
        t('Your favourite subject', 'មុខវិជ្ជាដែលចូលចិត្ត'),
        t('A maths question', 'សំណួរគណិតវិទ្យា'),
        t('A story idea', 'គំនិតរឿង'),
        t('A recipe question', 'សំណួររូបមន្តធ្វើម្ហូប'),
      ],
    ),
    memory(
      t('Match each safety tip to its meaning.', 'ផ្គូផ្គងគន្លឹះសុវត្ថិភាពនីមួយៗជាមួយអត្ថន័យ។'),
      [
        [t('Private', 'ឯកជន'), t('Keep it to yourself', 'រក្សាទុកសម្រាប់ខ្លួនឯង')],
        [t('Settings', 'ការកំណត់'), t('Turn off chat history', 'បិទប្រវត្តិជជែក')],
        [
          t('Report', 'រាយការណ៍'),
          t('Tell an adult if it feels wrong', 'ប្រាប់មនុស្សពេញវ័យបើមានអ្វីខុស'),
        ],
        [t('Age limit', 'កំណត់អាយុ'), t('Some AI apps are 13+', 'កម្មវិធី AI ខ្លះសម្រាប់អាយុ 13+')],
      ],
    ),
  ),
  'ai-helps-you-code': game(
    robot(
      t(
        'An AI helper suggested a route with Repeat. Program the robot in 6 blocks or fewer!',
        'ជំនួយការ AI ណែនាំផ្លូវដោយប្រើ ធ្វើម្តងទៀត។ សរសេរកម្មវិធីរ៉ូបូតក្នុង 6 ប្លុក ឬតិចជាងនេះ!',
      ),
      ['S...#', '###.#', '###..', '####G'],
      {
        maxBlocks: 6,
        hint: t(
          'Look for moves that repeat: right ×3, down ×2…',
          'រកជំហានដែលធ្វើដដែលៗ៖ ស្តាំ ×3 ចុះក្រោម ×2…',
        ),
      },
    ),
    memory(t('Match each coding word to its meaning.', 'ផ្គូផ្គងពាក្យកូដនីមួយៗជាមួយអត្ថន័យ។'), [
      [t('Code', 'កូដ'), t('Instructions for a computer', 'សេចក្តីណែនាំសម្រាប់កុំព្យូទ័រ')],
      [['🐞', t('Bug', 'កំហុស')], t('A mistake in code', 'កំហុសក្នុងកូដ')],
      [['🔁', t('Loop', 'រង្វិលជុំ')], t('Repeat steps', 'ធ្វើជំហានដដែលៗ')],
      [
        t('AI code helper', 'ជំនួយការកូដ AI'),
        t('Suggests code; you check it', 'ណែនាំកូដ អ្នកពិនិត្យវា'),
      ],
    ]),
  ),
  'ai-at-work': game(
    memory(t('Match each job to how AI helps.', 'ផ្គូផ្គងការងារនីមួយៗជាមួយរបៀបដែល AI ជួយ។'), [
      [['🩺', t('Doctor', 'វេជ្ជបណ្ឌិត')], t('AI helps read X-rays', 'AI ជួយអានកាំរស្មីអ៊ិច')],
      [['🌾', t('Farmer', 'កសិករ')], t('AI spots plant disease', 'AI រកជំងឺដំណាំ')],
      [['🏪', t('Shop owner', 'ម្ចាស់ហាង')], t('AI predicts sales', 'AI ព្យាករការលក់')],
      [['🧑‍🏫', t('Teacher', 'គ្រូ')], t('AI makes practice quizzes', 'AI បង្កើតសំណួរហាត់')],
    ]),
    catchIt(
      t(
        'Catch the HUMAN skills that stay important with AI!',
        'ចាប់ជំនាញមនុស្សដែលនៅតែសំខាន់ជាមួយ AI!',
      ),
      [
        t('Kindness', 'ចិត្តល្អ'),
        t('Teamwork', 'ការងារជាក្រុម'),
        t('Creativity', 'ភាពច្នៃប្រឌិត'),
        t('Good judgement', 'ការវិនិច្ឆ័យល្អ'),
      ],
      [
        t('Sorting a list', 'តម្រៀបបញ្ជី'),
        t('Spell-checking', 'ពិនិត្យអក្ខរាវិរុទ្ធ'),
        t('Counting fast', 'រាប់លឿន'),
      ],
    ),
  ),
  'responsible-ai': game(
    catchIt(
      t('Catch the RESPONSIBLE AI habits!', 'ចាប់ទម្លាប់ប្រើ AI ប្រកបដោយការទទួលខុសត្រូវ!'),
      [
        t('Say when you used AI', 'ប្រាប់ពេលអ្នកប្រើ AI'),
        t('Check the facts', 'ពិនិត្យការពិត'),
        t('Respect others’ privacy', 'គោរពភាពឯកជនអ្នកដទៃ'),
        t('Add your own ideas', 'បន្ថែមគំនិតផ្ទាល់ខ្លួន'),
      ],
      [
        t('Say AI work is all yours', 'និយាយថាការងារ AI ជារបស់អ្នកទាំងអស់'),
        t('Fake photos of classmates', 'រូបក្លែងក្លាយនៃមិត្តរួមថ្នាក់'),
        t('Use AI to bully', 'ប្រើ AI ដើម្បីសម្លុត'),
      ],
    ),
    buildSentence(
      t('Build your AI promise.', 'បង្កើតការសន្យា AI របស់អ្នក។'),
      'I use AI to help me learn, not to cheat.',
      { say: 'I use AI to help me learn, not to cheat.' },
    ),
  ),
};
