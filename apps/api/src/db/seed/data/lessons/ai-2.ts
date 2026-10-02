import { t, type LessonSeed } from '../../types';
import {
  chatMock,
  creation,
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
  see,
  sod,
  sortInto,
  tf,
} from '../dsl';
import { AI_WORLD as W } from './ai-1';

// 🤖 AI Playground, lessons 9–15: learning, checking, fairness, safety, coding, work and
// responsibility. Khmer (km) strings are DRAFTS for native review.

export const AI_LESSONS_2: LessonSeed[] = [
  lesson(
    W,
    'learning-with-ai',
    '📚',
    t('Learn, Write & Translate with AI', 'រៀន សរសេរ និងបកប្រែជាមួយ AI'),
    t(
      'Use AI as a study buddy, not a cheat sheet.',
      'ប្រើ AI ជាមិត្តសិក្សា មិនមែនជាសន្លឹកចម្លងទេ។',
    ),
    9,
    [
      intro(
        '📚',
        t(
          'AI can explain, quiz you, fix your writing and translate. Used well, it helps you learn faster.',
          'AI អាចពន្យល់ សួរអ្នក កែការសរសេរ និងបកប្រែ។ ប្រើបានល្អ វាជួយអ្នករៀនលឿនជាង។',
        ),
      ),
      learn(
        [
          '🧑‍🏫',
          t('Explain', 'ពន្យល់'),
          t('“Explain this step again, more simply.”', '“ពន្យល់ជំហាននេះម្តងទៀត ឱ្យសាមញ្ញជាងនេះ។”'),
        ],
        [
          '📝',
          t('Quiz me', 'សួរខ្ញុំ'),
          t(
            '“Ask me 5 questions about…” — then answer yourself.',
            '“សួរខ្ញុំ 5 សំណួរអំពី…” — រួចឆ្លើយដោយខ្លួនឯង។',
          ),
        ],
        [
          '🌏',
          t('Translate', 'បកប្រែ'),
          t(
            'Good for understanding; check important texts with a person.',
            'ល្អសម្រាប់ការយល់ ពិនិត្យអត្ថបទសំខាន់ៗជាមួយមនុស្ស។',
          ),
        ],
      ),
      see(
        t(
          '“Check my sentence: ‘I goes to school yesterday.’”',
          '“ពិនិត្យប្រយោគខ្ញុំ៖ ‘I goes to school yesterday.’”',
        ),
        t(
          'AI: “I went to school yesterday.” — and it explains why.',
          'AI៖ “I went to school yesterday.” — ហើយវាពន្យល់ពីមូលហេតុ។',
        ),
      ),
      revealPlay(
        'multiple_choice',
        mc(
          t(
            'Best way to use AI for a test next week?',
            'វិធីល្អបំផុតប្រើ AI សម្រាប់ការប្រឡងសប្តាហ៍ក្រោយ?',
          ),
          t('Ask it to quiz you and explain mistakes', 'សុំវាសួរអ្នក ហើយពន្យល់កំហុស'),
          [t('Ask it for the test answers', 'សុំវាឱ្យចម្លើយប្រឡង'), t('Don’t study', 'កុំរៀន')],
        ),
        sod(
          t(
            'Asking AI to explain a maths step you didn’t understand.',
            'សុំ AI ពន្យល់ជំហានគណិតដែលអ្នកមិនយល់។',
          ),
          'safe',
        ),
        sod(
          t(
            'Using AI to write your whole exam and saying it’s yours.',
            'ប្រើ AI ដើម្បីសរសេរប្រឡងទាំងមូល ហើយនិយាយថាជារបស់អ្នក។',
          ),
          'dangerous',
          {
            explanation: t(
              'That is cheating — and you learn nothing.',
              'នោះគឺជាការបន្លំ — ហើយអ្នកមិនបានរៀនអ្វីទេ។',
            ),
          },
        ),
        mc(
          t(
            'AI fixed your English sentence. What helps you learn most?',
            'AI បានកែប្រយោគអង់គ្លេសរបស់អ្នក។ តើអ្វីជួយអ្នករៀនបានច្រើនបំផុត?',
          ),
          t(
            'Read why it was wrong, then write a new one yourself',
            'អានមូលហេតុដែលវាខុស រួចសរសេរប្រយោគថ្មីដោយខ្លួនឯង',
          ),
          [t('Copy it and move on', 'ចម្លងវា ហើយបន្ត'), t('Ignore it', 'មិនខ្វល់វា')],
        ),
        mc(
          t('Which prompt helps you practise?', 'តើ prompt ណាជួយអ្នកហាត់?'),
          t(
            '“Ask me 5 questions about Excel, one at a time, and wait for my answer.”',
            '“សួរខ្ញុំ 5 សំណួរអំពី Excel ម្តងមួយ ហើយរង់ចាំចម្លើយខ្ញុំ។”',
          ),
          [
            t('“Tell me all the answers.”', '“ប្រាប់ខ្ញុំចម្លើយទាំងអស់។”'),
            t('“Excel.”', '“Excel។”'),
          ],
        ),
        tf(
          t(
            'AI translation can miss the real meaning of jokes or polite words.',
            'ការបកប្រែដោយ AI អាចខកខានអត្ថន័យពិតនៃការលេងសើច ឬពាក្យគួរសម។',
          ),
          true,
        ),
        mc(
          t(
            'Summarising a chapter with AI is useful for…',
            'ការសង្ខេបជំពូកមួយជាមួយ AI មានប្រយោជន៍សម្រាប់…',
          ),
          t('Reviewing after you have read it', 'ពិនិត្យឡើងវិញបន្ទាប់ពីអ្នកបានអាន'),
          [
            t('Never reading anything', 'មិនដែលអានអ្វីទាំងអស់'),
            t('Copying into homework', 'ចម្លងចូលកិច្ចការផ្ទះ'),
          ],
        ),
        tf(
          t(
            'Your teacher’s rules about using AI for homework should be followed.',
            'ច្បាប់របស់គ្រូអំពីការប្រើ AI សម្រាប់កិច្ចការផ្ទះគួរត្រូវបានគោរព។',
          ),
          true,
        ),
      ),
      revealChallenge(
        'multiple_choice',
        sortInto(
          t('Learning help or cheating?', 'ជំនួយការរៀន ឬការបន្លំ?'),
          [
            ['learn', t('Helps you learn', 'ជួយអ្នករៀន'), '📚'],
            ['cheat', t('Cheating', 'ការបន្លំ'), '🚫'],
          ],
          [
            [t('Asking for an easier explanation', 'សុំការពន្យល់ងាយជាង'), 'learn'],
            [t('Copying an AI essay as your own', 'ចម្លងអត្ថបទ AI ជារបស់អ្នក'), 'cheat'],
            [t('Making flashcards with AI', 'បង្កើតកាតរៀនជាមួយ AI'), 'learn'],
            [t('Getting AI to answer a live exam', 'ឱ្យ AI ឆ្លើយប្រឡងផ្ទាល់'), 'cheat'],
          ],
        ),
        mc(
          t(
            'A good way to mention AI help in homework?',
            'វិធីល្អដើម្បីលើកឡើងពីជំនួយ AI ក្នុងកិច្ចការផ្ទះ?',
          ),
          t('“I used AI to check my grammar.”', '“ខ្ញុំបានប្រើ AI ដើម្បីពិនិត្យវេយ្យាករណ៍។”'),
          [t('Hide it', 'លាក់វា'), t('Say a friend did it', 'និយាយថាមិត្តធ្វើ')],
        ),
        mc(
          t('Which is the best study plan?', 'តើផែនការសិក្សាណាល្អបំផុត?'),
          t('Read → try questions → ask AI about mistakes', 'អាន → សាកសំណួរ → សួរ AI អំពីកំហុស'),
          [
            t('Ask AI → copy → sleep', 'សួរ AI → ចម្លង → គេង'),
            t('Do nothing until the exam', 'មិនធ្វើអ្វីរហូតដល់ប្រឡង'),
          ],
        ),
        tf(
          t(
            'AI can make flashcards to help you remember words.',
            'AI អាចបង្កើតកាតរៀនដើម្បីជួយអ្នកចងចាំពាក្យ។',
          ),
          true,
        ),
        num(
          t(
            'You learn 5 new English words a day with AI flashcards. How many in 2 weeks?',
            'អ្នករៀនពាក្យអង់គ្លេសថ្មី 5 ក្នុងមួយថ្ងៃជាមួយកាតរៀន AI។ តើក្នុង 2 សប្តាហ៍បានប៉ុន្មាន?',
          ),
          70,
        ),
        mc(
          t(
            'For an official document translation (like a birth certificate) you should…',
            'សម្រាប់ការបកប្រែឯកសារផ្លូវការ (ដូចជាសំបុត្រកំណើត) អ្នកគួរ…',
          ),
          t('Use a qualified human translator', 'ប្រើអ្នកបកប្រែមនុស្សដែលមានសមត្ថភាព'),
          [t('Trust the AI only', 'ទុកចិត្តតែ AI'), t('Guess', 'ទាយ')],
        ),
        mc(
          t(
            '“Explain it with an example from football” is an example of…',
            '“ពន្យល់វាជាមួយឧទាហរណ៍ពីបាល់ទាត់” គឺជាឧទាហរណ៍នៃ…',
          ),
          t('Making the explanation fit you', 'ធ្វើឱ្យការពន្យល់សមនឹងអ្នក'),
          [t('Cheating', 'ការបន្លំ'), t('A virus', 'មេរោគ')],
        ),
        tf(
          t(
            'Learning with AI still needs your own effort and practice.',
            'ការរៀនជាមួយ AI នៅតែត្រូវការការខិតខំ និងការហាត់ផ្ទាល់ខ្លួនរបស់អ្នក។',
          ),
          true,
        ),
      ),
      reward(t('Smart learner! 📚', 'អ្នករៀនឆ្លាតវៃ! 📚')),
    ],
  ),

  lesson(
    W,
    'checking-ai-answers',
    '🔎',
    t('Checking AI Answers', 'ការពិនិត្យចម្លើយរបស់ AI'),
    t('AI can be wrong — be the checker.', 'AI អាចខុស — ក្លាយជាអ្នកពិនិត្យ។'),
    9,
    [
      intro(
        '🔎',
        t(
          'AI sometimes makes things up and sounds very sure. Your job: check before you trust.',
          'AI ពេលខ្លះបង្កើតរឿងឯង ហើយស្តាប់ទៅប្រាកដណាស់។ ការងាររបស់អ្នក៖ ពិនិត្យមុនពេលទុកចិត្ត។',
        ),
      ),
      learn(
        [
          '🤥',
          t('“Hallucination”', '“ការស្រមើស្រមៃ”'),
          t('When AI invents a fact that isn’t true.', 'ពេល AI បង្កើតការពិតដែលមិនពិត។'),
        ],
        [
          '📖',
          t('Check sources', 'ពិនិត្យប្រភព'),
          t(
            'Compare with a textbook or trusted website.',
            'ប្រៀបធៀបជាមួយសៀវភៅសិក្សា ឬគេហទំព័រដែលគួរឱ្យទុកចិត្ត។',
          ),
        ],
        [
          '🧮',
          t('Check the maths', 'ពិនិត្យគណិត'),
          t('Do quick sums yourself.', 'គណនាលឿនៗដោយខ្លួនឯង។'),
        ],
      ),
      see(
        t(
          'AI: “Phnom Penh is the capital of Thailand.” ❌',
          'AI៖ “ភ្នំពេញគឺជារាជធានីនៃប្រទេសថៃ។” ❌',
        ),
        t(
          'Phnom Penh is the capital of Cambodia. Always check!',
          'ភ្នំពេញគឺជារាជធានីនៃកម្ពុជា។ ត្រូវពិនិត្យជានិច្ច!',
        ),
      ),
      revealPlay(
        'ai_fact_check',
        tf(t('Is the AI’s answer correct?', 'តើចម្លើយរបស់ AI ត្រឹមត្រូវទេ?'), false, {
          data: chatMock(
            ['you', 'What is the capital of Cambodia?'],
            ['ai', 'The capital of Cambodia is Siem Reap.'],
          ),
          explanation: t(
            'The capital is Phnom Penh. Siem Reap is a province and a city.',
            'រាជធានីគឺភ្នំពេញ។ សៀមរាបគឺជាខេត្ត និងទីក្រុង។',
          ),
        }),
        tf(t('Is the AI’s answer correct?', 'តើចម្លើយរបស់ AI ត្រឹមត្រូវទេ?'), true, {
          data: chatMock(['you', 'What is 12 × 3?'], ['ai', '12 × 3 = 36.']),
        }),
        tf(t('Is the AI’s answer correct?', 'តើចម្លើយរបស់ AI ត្រឹមត្រូវទេ?'), false, {
          data: chatMock(
            ['you', 'How many days are in a week?'],
            ['ai', 'There are 8 days in a week.'],
          ),
          explanation: t('There are 7 days in a week.', 'មួយសប្តាហ៍មាន 7 ថ្ងៃ។'),
        }),
        tf(t('Is the AI’s answer correct?', 'តើចម្លើយរបស់ AI ត្រឹមត្រូវទេ?'), true, {
          data: chatMock(
            ['you', 'What does Ctrl + Z do?'],
            ['ai', 'Ctrl + Z undoes your last action.'],
          ),
        }),
        tf(t('Is the AI’s answer correct?', 'តើចម្លើយរបស់ AI ត្រឹមត្រូវទេ?'), false, {
          data: chatMock(['you', 'What is 25% of 80?'], ['ai', '25% of 80 is 25.']),
          explanation: t('25% is a quarter: 80 ÷ 4 = 20.', '25% គឺមួយភាគបួន៖ 80 ÷ 4 = 20។'),
        }),
        tf(t('Is the AI’s answer correct?', 'តើចម្លើយរបស់ AI ត្រឹមត្រូវទេ?'), true, {
          data: chatMock(
            ['you', 'Which river flows through Phnom Penh?'],
            ['ai', 'The Mekong (and the Tonle Sap) flow through Phnom Penh.'],
          ),
        }),
        tf(t('Is the AI’s answer correct?', 'តើចម្លើយរបស់ AI ត្រឹមត្រូវទេ?'), false, {
          data: chatMock(
            ['you', 'What does CPU stand for?'],
            ['ai', 'CPU stands for Computer Personal Unit.'],
          ),
          explanation: t('CPU = Central Processing Unit.', 'CPU = Central Processing Unit។'),
        }),
        tf(t('Is the AI’s answer correct?', 'តើចម្លើយរបស់ AI ត្រឹមត្រូវទេ?'), false, {
          data: chatMock(
            ['you', 'How many minutes are in 3 hours?'],
            ['ai', 'There are 150 minutes in 3 hours.'],
          ),
          explanation: t('3 × 60 = 180 minutes.', '3 × 60 = 180 នាទី។'),
        }),
      ),
      revealChallenge(
        'multiple_choice',
        mc(
          t(
            'AI gave you a website link as a source, but it doesn’t open. What might be true?',
            'AI ផ្តល់តំណគេហទំព័រជាប្រភព ប៉ុន្តែវាមិនបើក។ តើអ្វីអាចជាការពិត?',
          ),
          t('The AI may have invented it', 'AI ប្រហែលជាបានបង្កើតវាឯង'),
          [
            t('The Internet is broken forever', 'អ៊ីនធឺណិតខូចជារៀងរហូត'),
            t('It’s always correct anyway', 'វាតែងតែត្រូវទោះជាយ៉ាងណា'),
          ],
        ),
        order(
          t('Checking an AI answer: put the steps in order.', 'ពិនិត្យចម្លើយ AI៖ តម្រៀបជំហាន។'),
          [
            t('Read the answer carefully', 'អានចម្លើយដោយយកចិត្តទុកដាក់'),
            t('Find the key facts', 'រកការពិតសំខាន់ៗ'),
            t('Compare with a trusted source', 'ប្រៀបធៀបជាមួយប្រភពដែលគួរឱ្យទុកចិត្ត'),
            t('Use it only if it checks out', 'ប្រើវាតែបើវាត្រឹមត្រូវ'),
          ],
        ),
        tf(
          t(
            'An AI that sounds very confident is always right.',
            'AI ដែលស្តាប់ទៅមានទំនុកចិត្តខ្លាំង តែងតែត្រូវ។',
          ),
          false,
        ),
        mc(
          t('Best source to check a health fact?', 'ប្រភពល្អបំផុតដើម្បីពិនិត្យការពិតសុខភាព?'),
          t('The Ministry of Health or a doctor', 'ក្រសួងសុខាភិបាល ឬវេជ្ជបណ្ឌិត'),
          [t('A random comment', 'មតិចៃដន្យ'), t('Another chatbot only', 'តែ chatbot ផ្សេងទៀត')],
        ),
        mc(
          t('AI says the exam is on Monday. You should…', 'AI និយាយថាប្រឡងនៅថ្ងៃច័ន្ទ។ អ្នកគួរ…'),
          t('Check the school’s official notice', 'ពិនិត្យសេចក្តីជូនដំណឹងផ្លូវការរបស់សាលា'),
          [t('Believe it', 'ជឿវា'), t('Tell everyone', 'ប្រាប់អ្នករាល់គ្នា')],
        ),
        num(
          t(
            'An AI made 3 mistakes in 20 facts. How many facts were right?',
            'AI បានធ្វើកំហុស 3 ក្នុងចំណោមការពិត 20។ តើការពិតប៉ុន្មានត្រឹមត្រូវ?',
          ),
          17,
        ),
        mc(
          t('You can ask the AI…', 'អ្នកអាចសួរ AI…'),
          t(
            '“Are you sure? Show how you got that.”',
            '“តើអ្នកប្រាកដទេ? បង្ហាញពីរបៀបដែលអ្នកទទួលបានវា។”',
          ),
          [t('“Never explain.”', '“កុំពន្យល់។”'), t('Nothing more', 'គ្មានអ្វីបន្ថែម')],
        ),
        tf(
          t(
            'Checking AI answers is part of using AI responsibly.',
            'ការពិនិត្យចម្លើយ AI គឺជាផ្នែកមួយនៃការប្រើ AI ប្រកបដោយការទទួលខុសត្រូវ។',
          ),
          true,
        ),
      ),
      reward(t('Expert fact-checker! 🔎', 'អ្នកពិនិត្យការពិតជំនាញ! 🔎')),
    ],
  ),

  lesson(
    W,
    'ai-fairness',
    '⚖️',
    t('AI Fairness & Bias', 'ភាពយុត្តិធម៌ និងភាពលំអៀងរបស់ AI'),
    t(
      'When AI treats people unfairly — and why.',
      'ពេល AI ប្រព្រឹត្តចំពោះមនុស្សមិនយុត្តិធម៌ — និងមូលហេតុ។',
    ),
    9,
    [
      intro(
        '⚖️',
        t(
          'AI learns from data made by people. If the data is unfair, the AI can be unfair too.',
          'AI រៀនពីទិន្នន័យដែលមនុស្សបង្កើត។ បើទិន្នន័យមិនយុត្តិធម៌ AI ក៏អាចមិនយុត្តិធម៌ដែរ។',
        ),
      ),
      learn(
        [
          '🧺',
          t('Bias', 'ភាពលំអៀង'),
          t(
            'A tilt towards some people or ideas, often by accident.',
            'ការលំអៀងទៅរកមនុស្ស ឬគំនិតខ្លះ ច្រើនតែដោយចៃដន្យ។',
          ),
        ],
        [
          '🌍',
          t('Missing data', 'ទិន្នន័យខ្វះ'),
          t(
            'AI trained mostly on English may do worse in Khmer.',
            'AI ដែលបណ្តុះបណ្តាលភាគច្រើនលើភាសាអង់គ្លេស អាចធ្វើមិនបានល្អជាភាសាខ្មែរ។',
          ),
        ],
        [
          '🧑‍⚖️',
          t('Humans decide', 'មនុស្សសម្រេច'),
          t(
            'Important decisions need a human check.',
            'ការសម្រេចចិត្តសំខាន់ៗត្រូវការការពិនិត្យដោយមនុស្ស។',
          ),
        ],
      ),
      see(
        t(
          'Data: 95% photos of light skin → AI fails on darker skin',
          'ទិន្នន័យ៖ រូបថតស្បែកស 95% → AI បរាជ័យលើស្បែកខ្មៅ',
        ),
        t('Unbalanced data → unfair results.', 'ទិន្នន័យមិនស្មើគ្នា → លទ្ធផលមិនយុត្តិធម៌។'),
      ),
      revealPlay(
        'multiple_choice',
        mc(
          t('Why can an AI be unfair?', 'ហេតុអ្វី AI អាចមិនយុត្តិធម៌?'),
          t(
            'It learned from unbalanced or unfair data',
            'វាបានរៀនពីទិន្នន័យមិនស្មើគ្នា ឬមិនយុត្តិធម៌',
          ),
          [t('It is angry', 'វាខឹង'), t('It is tired', 'វាហត់')],
        ),
        tf(
          t('AI is always fair because it is a machine.', 'AI តែងតែយុត្តិធម៌ ព្រោះវាជាម៉ាស៊ីន។'),
          false,
          {
            explanation: t(
              'Machines copy patterns in their data — including unfair ones.',
              'ម៉ាស៊ីនចម្លងលំនាំក្នុងទិន្នន័យរបស់វា — រួមទាំងលំនាំមិនយុត្តិធម៌។',
            ),
          },
        ),
        mc(
          t(
            'An AI translator knows English well but makes many Khmer mistakes. Likely cause?',
            'កម្មវិធីបកប្រែ AI ស្គាល់អង់គ្លេសល្អ ប៉ុន្តែធ្វើកំហុសខ្មែរច្រើន។ មូលហេតុទំនងជាង?',
          ),
          t('Less Khmer training data', 'ទិន្នន័យបណ្តុះបណ្តាលខ្មែរតិចជាង'),
          [t('Khmer is wrong', 'ភាសាខ្មែរខុស'), t('The phone is old', 'ទូរស័ព្ទចាស់')],
        ),
        mc(
          t('How can we make AI fairer?', 'តើយើងអាចធ្វើឱ្យ AI យុត្តិធម៌ជាងដោយរបៀបណា?'),
          t(
            'Use data from many different people and test it',
            'ប្រើទិន្នន័យពីមនុស្សផ្សេងៗជាច្រើន ហើយសាកល្បងវា',
          ),
          [t('Use less data', 'ប្រើទិន្នន័យតិចជាង'), t('Never test it', 'មិនដែលសាកល្បងវា')],
        ),
        tf(
          t(
            'An AI should not decide alone who gets a job or a loan.',
            'AI មិនគួរសម្រេចចិត្តតែម្នាក់ឯងថានរណាទទួលបានការងារ ឬប្រាក់កម្ចីទេ។',
          ),
          true,
        ),
        mc(
          t(
            'AI images of “a doctor” show only men. This is an example of…',
            'រូបភាព AI នៃ “វេជ្ជបណ្ឌិត” បង្ហាញតែបុរស។ នេះគឺជាឧទាហរណ៍នៃ…',
          ),
          t('Bias', 'ភាពលំអៀង'),
          [t('Fairness', 'ភាពយុត្តិធម៌'), t('A virus', 'មេរោគ')],
        ),
        mc(
          t(
            'Who is responsible when AI makes an unfair decision?',
            'តើនរណាទទួលខុសត្រូវពេល AI ធ្វើការសម្រេចចិត្តមិនយុត្តិធម៌?',
          ),
          t('The people who built and used it', 'មនុស្សដែលបង្កើត និងប្រើវា'),
          [t('Nobody', 'គ្មាននរណាម្នាក់'), t('The computer’s keyboard', 'ក្តារចុចកុំព្យូទ័រ')],
        ),
        tf(
          t(
            'Asking “Who could this AI be unfair to?” is a good question for builders.',
            'ការសួរ “តើ AI នេះអាចមិនយុត្តិធម៌ចំពោះនរណា?” គឺជាសំណួរល្អសម្រាប់អ្នកបង្កើត។',
          ),
          true,
        ),
      ),
      revealChallenge(
        'multiple_choice',
        sortInto(
          t('Fair or could be unfair?', 'យុត្តិធម៌ ឬអាចមិនយុត្តិធម៌?'),
          [
            ['fair', t('Fairer', 'យុត្តិធម៌ជាង'), '⚖️'],
            ['unfair', t('Could be unfair', 'អាចមិនយុត្តិធម៌'), '⚠️'],
          ],
          [
            [
              t('Training with voices from all provinces', 'បណ្តុះបណ្តាលជាមួយសំឡេងពីគ្រប់ខេត្ត'),
              'fair',
            ],
            [
              t(
                'Using only city data for a farm app',
                'ប្រើតែទិន្នន័យទីក្រុងសម្រាប់កម្មវិធីកសិកម្ម',
              ),
              'unfair',
            ],
            [
              t('A human reviews AI job decisions', 'មនុស្សពិនិត្យការសម្រេចចិត្តការងាររបស់ AI'),
              'fair',
            ],
            [
              t('AI decides exam grades with no checks', 'AI សម្រេចពិន្ទុប្រឡងដោយគ្មានការពិនិត្យ'),
              'unfair',
            ],
          ],
        ),
        mc(
          t(
            'A voice assistant understands Phnom Penh accents but not Battambang accents. Fix?',
            'ជំនួយការសំឡេងយល់សំនៀងភ្នំពេញ ប៉ុន្តែមិនយល់សំនៀងបាត់ដំបង។ ការជួសជុល?',
          ),
          t('Add voice data from Battambang speakers', 'បន្ថែមទិន្នន័យសំឡេងពីអ្នកនិយាយបាត់ដំបង'),
          [
            t('Tell people to change their accent', 'ប្រាប់មនុស្សឱ្យប្តូរសំនៀង'),
            t('Delete the app', 'លុបកម្មវិធី'),
          ],
        ),
        tf(
          t(
            'Bias can happen even when nobody wanted it.',
            'ភាពលំអៀងអាចកើតឡើង សូម្បីតែគ្មាននរណាចង់បាន។',
          ),
          true,
        ),
        mc(
          t('Fairness in AI means…', 'ភាពយុត្តិធម៌ក្នុង AI មានន័យថា…'),
          t(
            'It works well for everyone, not just some groups',
            'វាដំណើរការល្អសម្រាប់អ្នកទាំងអស់ មិនមែនតែក្រុមខ្លះ',
          ),
          [t('It is fast', 'វាលឿន'), t('It is expensive', 'វាថ្លៃ')],
        ),
        num(
          t(
            'An AI is right 95% of the time for group A and 70% for group B. What is the gap in percentage points?',
            'AI ត្រូវ 95% សម្រាប់ក្រុម A និង 70% សម្រាប់ក្រុម B។ តើគម្លាតប៉ុន្មានពិន្ទុភាគរយ?',
          ),
          25,
        ),
        mc(
          t(
            'If an AI tool treats you unfairly, you can…',
            'បើឧបករណ៍ AI ប្រព្រឹត្តចំពោះអ្នកមិនយុត្តិធម៌ អ្នកអាច…',
          ),
          t('Report it and ask a human to review', 'រាយការណ៍វា ហើយសុំមនុស្សពិនិត្យ'),
          [t('Accept it forever', 'ទទួលយកវាជារៀងរហូត'), t('Break the computer', 'បំបែកកុំព្យូទ័រ')],
        ),
        tf(
          t(
            'Future IT workers in Cambodia can help build AI that works well in Khmer.',
            'កម្មករ IT នាពេលអនាគតនៅកម្ពុជាអាចជួយបង្កើត AI ដែលដំណើរការល្អជាភាសាខ្មែរ។',
          ),
          true,
        ),
        mc(
          t(
            'Testing an AI with many kinds of users helps find…',
            'ការសាកល្បង AI ជាមួយអ្នកប្រើប្រភេទផ្សេងៗជាច្រើន ជួយរកឃើញ…',
          ),
          t('Hidden unfairness', 'ភាពមិនយុត្តិធម៌ដែលលាក់'),
          [t('More advertising', 'ការផ្សាយពាណិជ្ជកម្មបន្ថែម'), t('Nothing', 'គ្មានអ្វីទេ')],
        ),
      ),
      reward(t('Fairness thinker! ⚖️', 'អ្នកគិតពីភាពយុត្តិធម៌! ⚖️')),
    ],
  ),

  lesson(
    W,
    'ai-privacy-and-safety',
    '🛡️',
    t('AI Privacy & Safety', 'ភាពឯកជន និងសុវត្ថិភាព AI'),
    t('What not to tell a chatbot.', 'អ្វីដែលមិនត្រូវប្រាប់ chatbot។'),
    9,
    [
      intro(
        '🛡️',
        t(
          'Chatbots feel like friends, but what you type may be stored. Let’s keep your information safe.',
          'Chatbot មានអារម្មណ៍ដូចមិត្ត ប៉ុន្តែអ្វីដែលអ្នកវាយអាចត្រូវបានរក្សាទុក។ តោះរក្សាព័ត៌មានរបស់អ្នកឱ្យមានសុវត្ថិភាព។',
        ),
      ),
      learn(
        [
          '🙊',
          t('Don’t share', 'កុំចែករំលែក'),
          t(
            'Passwords, PINs, ID numbers, home address, private photos.',
            'ពាក្យសម្ងាត់ PIN លេខអត្តសញ្ញាណ អាសយដ្ឋានផ្ទះ រូបថតឯកជន។',
          ),
        ],
        [
          '💾',
          t('Chats may be saved', 'ការជជែកអាចត្រូវបានរក្សាទុក'),
          t(
            'Some services use chats to improve their AI.',
            'សេវាខ្លះប្រើការជជែកដើម្បីកែលម្អ AI របស់ពួកគេ។',
          ),
        ],
        [
          '🆘',
          t('Feeling bad?', 'មានអារម្មណ៍មិនល្អ?'),
          t(
            'For serious problems, talk to a real person you trust.',
            'សម្រាប់បញ្ហាធ្ងន់ធ្ងរ និយាយជាមួយមនុស្សពិតដែលអ្នកទុកចិត្ត។',
          ),
        ],
      ),
      see(
        t(
          '✅ “Explain how to make a strong password.” · ❌ “My password is mango123, is it good?”',
          '✅ “ពន្យល់ពីរបៀបបង្កើតពាក្យសម្ងាត់រឹងមាំ។” · ❌ “ពាក្យសម្ងាត់ខ្ញុំគឺ mango123 តើល្អទេ?”',
        ),
        t('Ask about the topic, never share the secret.', 'សួរអំពីប្រធានបទ កុំចែករំលែកអាថ៌កំបាំង។'),
      ),
      revealPlay(
        'safe_or_dangerous',
        sod(
          t(
            'Typing your bank PIN into a chatbot to “check it”.',
            'វាយ PIN ធនាគារទៅក្នុង chatbot ដើម្បី “ពិនិត្យវា”។',
          ),
          'dangerous',
        ),
        sod(
          t(
            'Asking a chatbot how to make a strong password.',
            'សួរ chatbot ពីរបៀបបង្កើតពាក្យសម្ងាត់រឹងមាំ។',
          ),
          'safe',
        ),
        sod(
          t(
            'Uploading a photo of your ID card to a free AI app.',
            'ផ្ទុកឡើងរូបថតអត្តសញ្ញាណប័ណ្ណទៅកម្មវិធី AI ឥតគិតថ្លៃ។',
          ),
          'dangerous',
          {
            explanation: t(
              'Your ID could be stored or misused.',
              'អត្តសញ្ញាណរបស់អ្នកអាចត្រូវបានរក្សាទុក ឬប្រើខុស។',
            ),
          },
        ),
        sod(
          t('Asking AI to explain a science topic.', 'សុំ AI ពន្យល់ប្រធានបទវិទ្យាសាស្ត្រ។'),
          'safe',
        ),
        sod(
          t(
            'Sharing a classmate’s private photo with an AI app without asking.',
            'ចែករំលែករូបថតឯកជនរបស់មិត្តរួមថ្នាក់ជាមួយកម្មវិធី AI ដោយមិនសួរ។',
          ),
          'dangerous',
        ),
        mc(
          t('Which is safe to type into a chatbot?', 'តើមួយណាសុវត្ថិភាពវាយទៅក្នុង chatbot?'),
          t('“How do I format a table in Excel?”', '“តើខ្ញុំរៀបចំតារាងក្នុង Excel ដោយរបៀបណា?”'),
          [
            t('Your full name, address and phone', 'ឈ្មោះពេញ អាសយដ្ឋាន និងទូរស័ព្ទ'),
            t('Your email password', 'ពាក្យសម្ងាត់អ៊ីមែល'),
          ],
        ),
        tf(
          t(
            'Chats with some AI services may be read by the company to improve the AI.',
            'ការជជែកជាមួយសេវា AI ខ្លះអាចត្រូវបានអានដោយក្រុមហ៊ុនដើម្បីកែលម្អ AI។',
          ),
          true,
        ),
        mc(
          t(
            'A chatbot asks for your home address “to help better”. You…',
            'Chatbot សុំអាសយដ្ឋានផ្ទះរបស់អ្នក “ដើម្បីជួយបានល្អជាង”។ អ្នក…',
          ),
          t('Don’t share it', 'កុំចែករំលែកវា'),
          [t('Share it', 'ចែករំលែកវា'), t('Share a friend’s', 'ចែករំលែករបស់មិត្ត')],
        ),
      ),
      revealChallenge(
        'multiple_choice',
        sortInto(
          t('OK to type into AI, or keep private?', 'អាចវាយទៅ AI ឬរក្សាជាឯកជន?'),
          [
            ['ok', t('OK', 'អាចបាន'), '👍'],
            ['private', t('Keep private', 'រក្សាជាឯកជន'), '🔒'],
          ],
          [
            [t('A homework question', 'សំណួរកិច្ចការផ្ទះ'), 'ok'],
            [t('Your OTP code', 'លេខកូដ OTP'), 'private'],
            [t('Ideas for a story', 'គំនិតសម្រាប់រឿង'), 'ok'],
            [t('Your parents’ bank details', 'ព័ត៌មានធនាគាររបស់ឪពុកម្តាយ'), 'private'],
          ],
        ),
        mc(
          t(
            'You feel very sad for many days. Best step?',
            'អ្នកមានអារម្មណ៍សោកសៅខ្លាំងជាច្រើនថ្ងៃ។ ជំហានល្អបំផុត?',
          ),
          t(
            'Talk to a trusted adult or counsellor',
            'និយាយជាមួយមនុស្សពេញវ័យដែលទុកចិត្ត ឬអ្នកប្រឹក្សា',
          ),
          [t('Only talk to a chatbot', 'និយាយតែជាមួយ chatbot'), t('Tell nobody', 'មិនប្រាប់នរណា')],
        ),
        mc(
          t(
            'Fake “AI apps” that ask for payment details are…',
            '“កម្មវិធី AI” ក្លែងក្លាយដែលសុំព័ត៌មានបង់ប្រាក់ គឺ…',
          ),
          t('A common scam', 'ការបោកប្រាស់ទូទៅ'),
          [t('Always safe', 'តែងតែសុវត្ថិភាព'), t('Required by law', 'ច្បាប់តម្រូវ')],
        ),
        tf(
          t(
            'Many AI apps let you delete your chat history in Settings.',
            'កម្មវិធី AI ជាច្រើនអនុញ្ញាតឱ្យអ្នកលុបប្រវត្តិជជែកក្នុងការកំណត់។',
          ),
          true,
        ),
        mc(
          t(
            'Instead of “My name is Sokha Chan from Takeo…”, a safer prompt is…',
            'ជំនួស “ខ្ញុំឈ្មោះ សុខា ចាន់ មកពីតាកែវ…” prompt ដែលសុវត្ថិភាពជាង គឺ…',
          ),
          t('“I am a student…”', '“ខ្ញុំជាសិស្ស…”'),
          [
            t('Add your phone number too', 'បន្ថែមលេខទូរស័ព្ទផង'),
            t('Add your ID number', 'បន្ថែមលេខអត្តសញ្ញាណ'),
          ],
        ),
        num(
          t(
            'You found 5 pieces of private info in a prompt and removed 3. How many are left to remove?',
            'អ្នករកឃើញព័ត៌មានឯកជន 5 ក្នុង prompt ហើយបានដកចេញ 3។ តើនៅសល់ប៉ុន្មានត្រូវដកចេញ?',
          ),
          2,
        ),
        tf(
          t(
            'Only download AI apps from official app stores.',
            'ទាញយកកម្មវិធី AI តែពីហាងកម្មវិធីផ្លូវការ។',
          ),
          true,
        ),
        mc(
          t(
            'Before using a new AI tool at school, it’s good to…',
            'មុនពេលប្រើឧបករណ៍ AI ថ្មីនៅសាលា គួរ…',
          ),
          t('Check with your teacher', 'ពិនិត្យជាមួយគ្រូ'),
          [
            t('Give it all your passwords', 'ផ្តល់ពាក្យសម្ងាត់ទាំងអស់'),
            t('Share it with strangers', 'ចែករំលែកវាជាមួយមនុស្សចម្លែក'),
          ],
        ),
      ),
      reward(t('Private and safe! 🛡️', 'ឯកជន និងសុវត្ថិភាព! 🛡️')),
    ],
  ),

  lesson(
    W,
    'ai-helps-you-code',
    '👩‍💻',
    t('AI Helps You Code', 'AI ជួយអ្នកសរសេរកូដ'),
    t('Explaining, writing and fixing simple code.', 'ការពន្យល់ ការសរសេរ និងការជួសជុលកូដសាមញ្ញ។'),
    10,
    [
      intro(
        '👩‍💻',
        t(
          'Programmers use AI every day to explain code and find bugs. You can start too!',
          'អ្នកសរសេរកម្មវិធីប្រើ AI រៀងរាល់ថ្ងៃដើម្បីពន្យល់កូដ និងរកកំហុស។ អ្នកក៏អាចចាប់ផ្តើមបានដែរ!',
        ),
      ),
      learn(
        [
          '📖',
          t('Explain code', 'ពន្យល់កូដ'),
          t('“What does this line do?”', '“តើបន្ទាត់នេះធ្វើអ្វី?”'),
        ],
        [
          '🐞',
          t('Find bugs', 'រកកំហុស'),
          t('Paste the error message and ask why.', 'បិទភ្ជាប់សារកំហុស ហើយសួរពីមូលហេតុ។'),
        ],
        [
          '✅',
          t('Test it yourself', 'សាកល្បងដោយខ្លួនឯង'),
          t(
            'AI code can be wrong — always run and check it.',
            'កូដ AI អាចខុស — ត្រូវដំណើរការ និងពិនិត្យវាជានិច្ច។',
          ),
        ],
      ),
      see(
        'print("Hello, Cambodia!") → Hello, Cambodia!',
        t(
          'A tiny program: it shows a message on the screen.',
          'កម្មវិធីតូចមួយ៖ វាបង្ហាញសារលើអេក្រង់។',
        ),
      ),
      revealPlay(
        'multiple_choice',
        mc(t('What does print("Hi") show?', 'តើ print("Hi") បង្ហាញអ្វី?'), 'Hi', [
          'print',
          '"Hi"',
          t('Nothing', 'គ្មានអ្វីទេ'),
        ]),
        mc(
          t(
            'Which prompt is best to understand a line of code?',
            'តើ prompt ណាល្អបំផុតដើម្បីយល់បន្ទាត់កូដ?',
          ),
          t(
            '“Explain what this line does, step by step, for a beginner: x = 5 + 3”',
            '“ពន្យល់ថាបន្ទាត់នេះធ្វើអ្វី ម្តងមួយជំហាន សម្រាប់អ្នកចាប់ផ្តើម៖ x = 5 + 3”',
          ),
          [t('“code??”', '“កូដ??”'), t('“fix”', '“ជួសជុល”')],
        ),
        num(t('After x = 5 + 3, what is x?', 'បន្ទាប់ពី x = 5 + 3 តើ x ស្មើប៉ុន្មាន?'), 8),
        num(t('x = 10, then x = x - 4. What is x?', 'x = 10 រួច x = x - 4។ តើ x ស្មើប៉ុន្មាន?'), 6),
        tf(
          t(
            'Code written by AI always works the first time.',
            'កូដដែលសរសេរដោយ AI តែងតែដំណើរការលើកដំបូង។',
          ),
          false,
          {
            explanation: t('Always run and test it.', 'ត្រូវដំណើរការ និងសាកល្បងវាជានិច្ច។'),
          },
        ),
        mc(
          t(
            'Your program shows an error. What do you give the AI?',
            'កម្មវិធីរបស់អ្នកបង្ហាញកំហុស។ តើអ្នកផ្តល់អ្វីឱ្យ AI?',
          ),
          t('The code and the exact error message', 'កូដ និងសារកំហុសពិតប្រាកដ'),
          [t('Just “broken”', 'គ្រាន់តែ “ខូច”'), t('Your password', 'ពាក្យសម្ងាត់របស់អ្នក')],
        ),
        mc(
          t('A bug in code is…', 'Bug ក្នុងកូដ គឺ…'),
          t('A mistake that makes it go wrong', 'កំហុសដែលធ្វើឱ្យវាដំណើរការខុស'),
          [t('An insect only', 'តែសត្វល្អិត'), t('A fast computer', 'កុំព្យូទ័រលឿន')],
        ),
        mc(
          t(
            'Which language do many beginners learn first?',
            'តើភាសាណាដែលអ្នកចាប់ផ្តើមជាច្រើនរៀនមុនគេ?',
          ),
          'Python',
          ['Khmer', 'Excel'],
        ),
      ),
      revealChallenge(
        'multiple_choice',
        num(
          t(
            'for i in 1..3: print(i) — how many lines are printed?',
            'for i in 1..3: print(i) — តើបោះពុម្ពប៉ុន្មានបន្ទាត់?',
          ),
          3,
        ),
        mc(
          t(
            'if age >= 18: print("adult") else: print("young"). age = 15 prints…',
            'if age >= 18: print("adult") else: print("young")។ age = 15 បោះពុម្ព…',
          ),
          'young',
          ['adult', '15'],
        ),
        mc(
          t('Why understand AI code before using it?', 'ហេតុអ្វីត្រូវយល់កូដ AI មុនពេលប្រើវា?'),
          t(
            'So you can fix it and learn — and spot dangerous code',
            'ដើម្បីឱ្យអ្នកអាចជួសជុល និងរៀន — ហើយរកឃើញកូដគ្រោះថ្នាក់',
          ),
          [t('No reason', 'គ្មានហេតុផល'), t('To make it longer', 'ដើម្បីធ្វើឱ្យវាវែងជាង')],
        ),
        order(
          t('Fixing a bug with AI: put the steps in order.', 'ជួសជុល bug ជាមួយ AI៖ តម្រៀបជំហាន។'),
          [
            t('Run the code and read the error', 'ដំណើរការកូដ ហើយអានកំហុស'),
            t('Ask AI with the code and error', 'សួរ AI ជាមួយកូដ និងកំហុស'),
            t('Understand the suggested fix', 'យល់ពីការជួសជុលដែលបានណែនាំ'),
            t('Run it again to test', 'ដំណើរការម្តងទៀតដើម្បីសាកល្បង'),
          ],
        ),
        tf(
          t(
            'Never paste secret keys or passwords from your code into a chatbot.',
            'កុំបិទភ្ជាប់កូនសោសម្ងាត់ ឬពាក្យសម្ងាត់ពីកូដរបស់អ្នកទៅក្នុង chatbot។',
          ),
          true,
        ),
        num(
          t(
            'total = 0; add 5 three times. What is total?',
            'total = 0; បូក 5 បីដង។ តើ total ស្មើប៉ុន្មាន?',
          ),
          15,
        ),
        mc(
          t('A website’s structure is written in…', 'រចនាសម្ព័ន្ធគេហទំព័រត្រូវបានសរសេរជា…'),
          'HTML',
          ['MP3', 'JPG'],
        ),
        tf(
          t(
            'Learning to code is still valuable even with AI helpers.',
            'ការរៀនសរសេរកូដនៅតែមានតម្លៃ សូម្បីតែមានជំនួយការ AI។',
          ),
          true,
          {
            explanation: t(
              'You need to understand code to guide, check and fix what AI writes.',
              'អ្នកត្រូវយល់កូដ ដើម្បីណែនាំ ពិនិត្យ និងជួសជុលអ្វីដែល AI សរសេរ។',
            ),
          },
        ),
      ),
      reward(t('Future coder! 👩‍💻', 'អ្នកសរសេរកូដនាពេលអនាគត! 👩‍💻')),
    ],
  ),

  lesson(
    W,
    'ai-at-work',
    '💼',
    t('AI at Work', 'AI នៅកន្លែងធ្វើការ'),
    t('Jobs, skills and your future in IT.', 'ការងារ ជំនាញ និងអនាគតរបស់អ្នកក្នុង IT។'),
    9,
    [
      intro(
        '💼',
        t(
          'AI is changing jobs. People who can use AI well will be in demand. Let’s see how!',
          'AI កំពុងផ្លាស់ប្តូរការងារ។ មនុស្សដែលអាចប្រើ AI បានល្អនឹងត្រូវការច្រើន។ តោះមើលពីរបៀប!',
        ),
      ),
      learn(
        [
          '🤝',
          t('AI + people', 'AI + មនុស្ស'),
          t(
            'AI does repetitive tasks; people decide, create and care.',
            'AI ធ្វើកិច្ចការដដែលៗ មនុស្សសម្រេចចិត្ត បង្កើត និងយកចិត្តទុកដាក់។',
          ),
        ],
        [
          '🧰',
          t('New skills', 'ជំនាញថ្មី'),
          t(
            'Prompting, checking AI, digital skills, communication.',
            'ការសរសេរ prompt ការពិនិត្យ AI ជំនាញឌីជីថល ការទំនាក់ទំនង។',
          ),
        ],
        [
          '🚀',
          t('IT careers', 'អាជីព IT'),
          t(
            'Web developer, data analyst, IT support, designer…',
            'អ្នកអភិវឌ្ឍគេហទំព័រ អ្នកវិភាគទិន្នន័យ ជំនួយ IT អ្នករចនា…',
          ),
        ],
      ),
      see(
        t(
          '📧 Draft with AI → 👀 You check → ✅ You send',
          '📧 សេចក្តីព្រាងជាមួយ AI → 👀 អ្នកពិនិត្យ → ✅ អ្នកផ្ញើ',
        ),
        t('AI speeds up the work; you stay responsible.', 'AI ពន្លឿនការងារ អ្នកនៅតែទទួលខុសត្រូវ។'),
      ),
      revealPlay(
        'multiple_choice',
        mc(
          t('Which task is AI good at in an office?', 'តើកិច្ចការណាដែល AI ពូកែនៅការិយាល័យ?'),
          t('Drafting a first version of an email', 'ព្រាងកំណែដំបូងនៃអ៊ីមែល'),
          [
            t('Shaking hands with clients', 'ចាប់ដៃជាមួយអតិថិជន'),
            t('Comforting a sad colleague', 'លួងលោមមិត្តរួមការងារដែលសោកសៅ'),
          ],
        ),
        mc(
          t('Which skill stays very human?', 'តើជំនាញណានៅតែជារបស់មនុស្សខ្លាំង?'),
          t(
            'Caring for people and making ethical choices',
            'ការយកចិត្តទុកដាក់ចំពោះមនុស្ស និងការធ្វើជម្រើសប្រកបដោយសីលធម៌',
          ),
          [t('Adding numbers fast', 'បូកលេខលឿន'), t('Sorting files', 'តម្រៀបឯកសារ')],
        ),
        tf(
          t(
            'People who know how to use AI well can work faster.',
            'មនុស្សដែលដឹងពីរបៀបប្រើ AI បានល្អ អាចធ្វើការលឿនជាង។',
          ),
          true,
        ),
        match(t('Match the IT job to what they do.', 'ផ្គូផ្គងការងារ IT ទៅនឹងអ្វីដែលពួកគេធ្វើ។'), [
          [t('Web developer', 'អ្នកអភិវឌ្ឍគេហទំព័រ'), t('Builds websites', 'បង្កើតគេហទំព័រ')],
          [
            t('Data analyst', 'អ្នកវិភាគទិន្នន័យ'),
            t('Finds meaning in numbers', 'រកអត្ថន័យក្នុងលេខ'),
          ],
          [t('IT support', 'ជំនួយ IT'), t('Fixes computer problems', 'ជួសជុលបញ្ហាកុំព្យូទ័រ')],
          [t('UX designer', 'អ្នករចនា UX'), t('Makes apps easy to use', 'ធ្វើឱ្យកម្មវិធីងាយប្រើ')],
        ]),
        mc(
          t(
            'A shop uses an AI chatbot to answer customers at night. Who should handle difficult complaints?',
            'ហាងមួយប្រើ AI chatbot ដើម្បីឆ្លើយអតិថិជននៅពេលយប់។ តើនរណាគួរដោះស្រាយបណ្តឹងពិបាក?',
          ),
          t('A real staff member', 'បុគ្គលិកពិត'),
          [t('Nobody', 'គ្មាននរណាម្នាក់'), t('The chatbot forever', 'Chatbot ជារៀងរហូត')],
        ),
        mc(
          t(
            'Which is a good way to keep your job skills fresh?',
            'តើមួយណាជាវិធីល្អដើម្បីរក្សាជំនាញការងារឱ្យទាន់សម័យ?',
          ),
          t('Keep learning new tools, like this course!', 'បន្តរៀនឧបករណ៍ថ្មី ដូចវគ្គសិក្សានេះ!'),
          [
            t('Stop learning after school', 'ឈប់រៀនបន្ទាប់ពីសាលា'),
            t('Avoid computers', 'ជៀសវាងកុំព្យូទ័រ'),
          ],
        ),
        tf(
          t(
            'If AI writes a report at work, you are still responsible for checking it.',
            'បើ AI សរសេររបាយការណ៍នៅកន្លែងធ្វើការ អ្នកនៅតែទទួលខុសត្រូវក្នុងការពិនិត្យវា។',
          ),
          true,
        ),
        mc(
          t(
            'Company documents with private customer data should…',
            'ឯកសារក្រុមហ៊ុនដែលមានទិន្នន័យអតិថិជនឯកជន គួរ…',
          ),
          t('Not be pasted into public AI tools', 'មិនត្រូវបិទភ្ជាប់ទៅក្នុងឧបករណ៍ AI សាធារណៈ'),
          [
            t('Be shared with any chatbot', 'ត្រូវចែករំលែកជាមួយ chatbot ណាមួយ'),
            t('Be posted online', 'ត្រូវបង្ហោះតាមអនឡាញ'),
          ],
        ),
      ),
      revealChallenge(
        'multiple_choice',
        sortInto(
          t('Good job for AI, or for a person?', 'ការងារល្អសម្រាប់ AI ឬសម្រាប់មនុស្ស?'),
          [
            ['ai', t('AI can help', 'AI អាចជួយ'), '🤖'],
            ['human', t('Needs a person', 'ត្រូវការមនុស្ស'), '🧑'],
          ],
          [
            [t('Translating a simple product list', 'បកប្រែបញ្ជីផលិតផលសាមញ្ញ'), 'ai'],
            [t('Deciding to fire someone', 'សម្រេចចិត្តបណ្តេញនរណាម្នាក់'), 'human'],
            [t('Summarising meeting notes', 'សង្ខេបកំណត់ត្រាកិច្ចប្រជុំ'), 'ai'],
            [t('Calming an upset customer face to face', 'លួងលោមអតិថិជនដែលខឹងទល់មុខ'), 'human'],
          ],
        ),
        num(
          t(
            'AI saves you 15 minutes a day on emails. How many minutes in a 5-day work week?',
            'AI សន្សំពេលអ្នក 15 នាទីក្នុងមួយថ្ងៃលើអ៊ីមែល។ តើប៉ុន្មាននាទីក្នុងសប្តាហ៍ធ្វើការ 5 ថ្ងៃ?',
          ),
          75,
        ),
        mc(
          t(
            'In a job interview, a strong answer about AI is…',
            'ក្នុងសម្ភាសន៍ការងារ ចម្លើយល្អអំពី AI គឺ…',
          ),
          t(
            '“I use AI to work faster, and I always check the results.”',
            '“ខ្ញុំប្រើ AI ដើម្បីធ្វើការលឿនជាង ហើយខ្ញុំពិនិត្យលទ្ធផលជានិច្ច។”',
          ),
          [
            t('“AI does all my work.”', '“AI ធ្វើការងារទាំងអស់ឱ្យខ្ញុំ។”'),
            t('“I never touch computers.”', '“ខ្ញុំមិនដែលប៉ះកុំព្យូទ័រទេ។”'),
          ],
        ),
        tf(
          t(
            'Soft skills like teamwork and communication matter even more with AI.',
            'ជំនាញទន់ដូចជាការងារជាក្រុម និងការទំនាក់ទំនង កាន់តែសំខាន់ជាមួយ AI។',
          ),
          true,
        ),
        mc(
          t(
            'Which job needs both IT and people skills?',
            'តើការងារណាត្រូវការទាំងជំនាញ IT និងជំនាញមនុស្ស?',
          ),
          t('IT support helping staff with problems', 'ជំនួយ IT ជួយបុគ្គលិកដោះស្រាយបញ្ហា'),
          [t('Nobody’s job', 'មិនមែនការងាររបស់នរណាទេ')],
        ),
        mc(
          t('A good first step towards an IT career?', 'ជំហានដំបូងល្អឆ្ពោះទៅអាជីព IT?'),
          t(
            'Practise the basics every day: typing, Office, Internet safety',
            'ហាត់មូលដ្ឋានរាល់ថ្ងៃ៖ ការវាយ Office សុវត្ថិភាពអ៊ីនធឺណិត',
          ),
          [t('Wait for luck', 'រង់ចាំសំណាង'), t('Only play games', 'លេងតែល្បែង')],
        ),
        tf(
          t(
            'You have already started building skills employers want.',
            'អ្នកបានចាប់ផ្តើមកសាងជំនាញដែលនិយោជកចង់បានរួចហើយ។',
          ),
          true,
        ),
        mc(
          t(
            'Which shows responsible AI use at work?',
            'តើមួយណាបង្ហាញការប្រើ AI ប្រកបដោយការទទួលខុសត្រូវនៅកន្លែងធ្វើការ?',
          ),
          t('Following the company’s AI rules', 'ធ្វើតាមច្បាប់ AI របស់ក្រុមហ៊ុន'),
          [
            t(
              'Hiding AI use from your boss when it’s not allowed',
              'លាក់ការប្រើ AI ពីចៅហ្វាយ ពេលវាមិនត្រូវបានអនុញ្ញាត',
            ),
          ],
        ),
      ),
      reward(t('Ready for the future of work! 💼', 'ត្រៀមរួចសម្រាប់អនាគតការងារ! 💼')),
    ],
  ),

  lesson(
    W,
    'responsible-ai',
    '🧭',
    t('Using AI Responsibly', 'ការប្រើ AI ប្រកបដោយការទទួលខុសត្រូវ'),
    t(
      'Honest, safe and kind — then write your own prompt.',
      'ស្មោះត្រង់ សុវត្ថិភាព និងចិត្តល្អ — រួចសរសេរ prompt ផ្ទាល់ខ្លួន។',
    ),
    12,
    [
      intro(
        '🧭',
        t(
          'You’ve learned a lot about AI! Last step: using it honestly, safely and kindly — and making your own great prompt.',
          'អ្នកបានរៀនច្រើនអំពី AI! ជំហានចុងក្រោយ៖ ប្រើវាដោយស្មោះត្រង់ សុវត្ថិភាព និងចិត្តល្អ — ហើយបង្កើត prompt ដ៏ល្អផ្ទាល់ខ្លួន។',
        ),
      ),
      learn(
        [
          '🙋',
          t('Be honest', 'ស្មោះត្រង់'),
          t(
            'Say when you used AI. Don’t pass off AI work as yours.',
            'ប្រាប់ពេលអ្នកប្រើ AI។ កុំយកការងារ AI ធ្វើជារបស់អ្នក។',
          ),
        ],
        ['🔒', t('Be safe', 'សុវត្ថិភាព'), t('Protect private information.', 'ការពារព័ត៌មានឯកជន។')],
        [
          '💗',
          t('Be kind', 'ចិត្តល្អ'),
          t('Never use AI to hurt or trick people.', 'កុំប្រើ AI ដើម្បីធ្វើបាប ឬបោកមនុស្ស។'),
        ],
      ),
      see(
        t(
          '🙋 Honest + 🔒 Safe + 💗 Kind = ✅ Responsible',
          '🙋 ស្មោះត្រង់ + 🔒 សុវត្ថិភាព + 💗 ចិត្តល្អ = ✅ ទទួលខុសត្រូវ',
        ),
        t('Three rules for every AI tool.', 'ច្បាប់បីសម្រាប់ឧបករណ៍ AI គ្រប់មួយ។'),
      ),
      revealPlay(
        'safe_or_dangerous',
        sod(
          t(
            'Asking AI to explain a maths step you didn’t understand.',
            'សុំ AI ពន្យល់ជំហានគណិតដែលអ្នកមិនយល់។',
          ),
          'safe',
        ),
        sod(
          t(
            'Using AI to write your whole exam and saying it’s yours.',
            'ប្រើ AI ដើម្បីសរសេរប្រឡងទាំងមូល ហើយនិយាយថាជារបស់អ្នក។',
          ),
          'dangerous',
          {
            explanation: t(
              'That is cheating — and you learn nothing.',
              'នោះគឺជាការបន្លំ — ហើយអ្នកមិនបានរៀនអ្វីទេ។',
            ),
          },
        ),
        sod(
          t(
            'Making a fake voice message of a friend to trick their parents.',
            'បង្កើតសារសំឡេងក្លែងក្លាយរបស់មិត្ត ដើម្បីបោកឪពុកម្តាយពួកគេ។',
          ),
          'dangerous',
        ),
        sod(
          t(
            'Telling your teacher you used AI to check spelling.',
            'ប្រាប់គ្រូថាអ្នកប្រើ AI ដើម្បីពិនិត្យអក្ខរាវិរុទ្ធ។',
          ),
          'safe',
        ),
        sod(
          t(
            'Using AI to write mean comments about a classmate.',
            'ប្រើ AI ដើម្បីសរសេរមតិអាក្រក់អំពីមិត្តរួមថ្នាក់។',
          ),
          'dangerous',
        ),
        sod(
          t('Checking an AI answer with your textbook.', 'ពិនិត្យចម្លើយ AI ជាមួយសៀវភៅសិក្សា។'),
          'safe',
        ),
        mc(
          t(
            'Which are the three rules for responsible AI in this course?',
            'តើច្បាប់បីសម្រាប់ AI ប្រកបដោយការទទួលខុសត្រូវក្នុងវគ្គនេះគឺអ្វី?',
          ),
          t('Honest, safe, kind', 'ស្មោះត្រង់ សុវត្ថិភាព ចិត្តល្អ'),
          [
            t('Fast, cheap, secret', 'លឿន ថោក សម្ងាត់'),
            t('Long, loud, funny', 'វែង ខ្លាំង កំប្លែង'),
          ],
        ),
        tf(
          t(
            'Using AI responsibly includes checking its answers.',
            'ការប្រើ AI ប្រកបដោយការទទួលខុសត្រូវ រួមបញ្ចូលការពិនិត្យចម្លើយរបស់វា។',
          ),
          true,
        ),
      ),
      revealChallenge(
        'multiple_choice',
        match(t('Match the rule to an example.', 'ផ្គូផ្គងច្បាប់ទៅនឹងឧទាហរណ៍។'), [
          [
            t('Honest', 'ស្មោះត្រង់'),
            t('“I used AI for ideas.”', '“ខ្ញុំបានប្រើ AI សម្រាប់គំនិត។”'),
          ],
          [t('Safe', 'សុវត្ថិភាព'), t('Not sharing your password', 'មិនចែករំលែកពាក្យសម្ងាត់')],
          [
            t('Kind', 'ចិត្តល្អ'),
            t('Not making fake photos of people', 'មិនបង្កើតរូបថតក្លែងក្លាយរបស់មនុស្ស'),
          ],
        ]),
        mc(
          t(
            'Your friend wants AI to write their whole essay. Best advice?',
            'មិត្តរបស់អ្នកចង់ឱ្យ AI សរសេរអត្ថបទទាំងមូល។ ដំបូន្មានល្អបំផុត?',
          ),
          t('Use AI for ideas, then write it yourself', 'ប្រើ AI សម្រាប់គំនិត រួចសរសេរដោយខ្លួនឯង'),
          [
            t('Copy it, nobody will know', 'ចម្លងវា គ្មាននរណាដឹងទេ'),
            t('Pay someone', 'បង់ប្រាក់ឱ្យនរណាម្នាក់'),
          ],
        ),
        tf(
          t(
            'You are in charge of the AI — not the other way round.',
            'អ្នកជាអ្នកគ្រប់គ្រង AI — មិនមែនផ្ទុយពីនេះទេ។',
          ),
          true,
        ),
        mc(
          t('A good prompt has…', 'Prompt ល្អមាន…'),
          t('Role, task, context and format', 'តួនាទី កិច្ចការ បរិបទ និងទម្រង់'),
          [t('Only one word', 'តែពាក្យមួយ'), t('Your password', 'ពាក្យសម្ងាត់របស់អ្នក')],
        ),
        mc(
          t(
            'You see an AI-made fake video spreading in your class group. Responsible action?',
            'អ្នកឃើញវីដេអូក្លែងក្លាយដែលបង្កើតដោយ AI កំពុងរីករាលដាលក្នុងក្រុមថ្នាក់។ សកម្មភាពទទួលខុសត្រូវ?',
          ),
          t(
            'Don’t share it; tell the group it’s fake and tell a teacher',
            'កុំចែករំលែក ប្រាប់ក្រុមថាវាក្លែងក្លាយ ហើយប្រាប់គ្រូ',
          ),
          [
            t('Share it more', 'ចែករំលែកវាបន្ថែម'),
            t('Add a funny caption', 'បន្ថែមចំណងជើងកំប្លែង'),
          ],
        ),
        num(
          t(
            'You finished 15 AI lessons, each with about 16 questions. About how many questions is that?',
            'អ្នកបានបញ្ចប់មេរៀន AI 15 ដែលនីមួយៗមានប្រហែល 16 សំណួរ។ តើប្រហែលប៉ុន្មានសំណួរ?',
          ),
          240,
        ),
        tf(
          t(
            'Responsible AI users keep learning as AI changes.',
            'អ្នកប្រើ AI ប្រកបដោយការទទួលខុសត្រូវ បន្តរៀនពេល AI ផ្លាស់ប្តូរ។',
          ),
          true,
        ),
      ),
      creation('prompt', t('My Own Great Prompt', 'Prompt ដ៏ល្អផ្ទាល់ខ្លួនរបស់ខ្ញុំ'), [
        {
          key: 'role',
          label: t('🎭 ROLE — who should the AI be?', '🎭 តួនាទី — តើ AI គួរជានរណា?'),
          placeholder: t('You are a friendly IT teacher.', 'អ្នកជាគ្រូ IT រួសរាយ។'),
          maxLength: 120,
        },
        {
          key: 'task',
          label: t('🎯 TASK — what should it do?', '🎯 កិច្ចការ — តើវាគួរធ្វើអ្វី?'),
          placeholder: t('Explain what a database is.', 'ពន្យល់ថាមូលដ្ឋានទិន្នន័យជាអ្វី។'),
          maxLength: 160,
        },
        {
          key: 'context',
          label: t('👤 CONTEXT — who is it for?', '👤 បរិបទ — សម្រាប់នរណា?'),
          placeholder: t(
            'I am a beginner who loves football.',
            'ខ្ញុំជាអ្នកចាប់ផ្តើមដែលចូលចិត្តបាល់ទាត់។',
          ),
          maxLength: 160,
        },
        {
          key: 'format',
          label: t('📋 FORMAT — how should it look?', '📋 ទម្រង់ — តើវាគួរមើលទៅដូចម្តេច?'),
          placeholder: t('Use 3 football examples.', 'ប្រើឧទាហរណ៍បាល់ទាត់ 3។'),
          maxLength: 120,
        },
      ]),
      reward(
        t(
          'AI Playground complete! You are an AI Explorer. 🤖',
          'សួនលេង AI បានបញ្ចប់! អ្នកជាអ្នករុករក AI។ 🤖',
        ),
      ),
    ],
  ),
];
