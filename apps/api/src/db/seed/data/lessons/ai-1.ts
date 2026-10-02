import { t, type LessonSeed } from '../../types';
import {
  chatMock,
  intro,
  learn,
  lesson,
  match,
  mc,
  num,
  order,
  promptBuilder,
  revealChallenge,
  revealPlay,
  reward,
  see,
  seeLevels,
  sod,
  sortInto,
  tf,
} from '../dsl';

// 🤖 AI Playground, lessons 1–8 (ai-2.ts has 9–15). No external AI service: example answers are
// pre-written. 15–18 questions per lesson; every Check shows the right answer.
// Khmer (km) strings are DRAFTS for native review.
export const AI_WORLD = 'ai-playground';
const W = AI_WORLD;

export const AI_LESSONS_1: LessonSeed[] = [
  lesson(
    W,
    'what-is-ai',
    '🤖',
    t('What is AI?', 'តើ AI ជាអ្វី?'),
    t('Computers that learn from examples.', 'កុំព្យូទ័រដែលរៀនពីឧទាហរណ៍។'),
    9,
    [
      intro(
        '🤖',
        t(
          'AI (Artificial Intelligence) is everywhere: in your phone, maps and translators. Let’s find out what it is!',
          'AI (បញ្ញាសិប្បនិម្មិត) មាននៅគ្រប់ទីកន្លែង៖ ក្នុងទូរស័ព្ទ ផែនទី និងកម្មវិធីបកប្រែ។ តោះស្វែងយល់ថាវាជាអ្វី!',
        ),
      ),
      learn(
        [
          '🧠',
          t('Artificial Intelligence', 'បញ្ញាសិប្បនិម្មិត'),
          t(
            'Computer programs that do tasks that usually need human thinking.',
            'កម្មវិធីកុំព្យូទ័រដែលធ្វើកិច្ចការដែលជាធម្មតាត្រូវការការគិតរបស់មនុស្ស។',
          ),
        ],
        [
          '📚',
          t('Learns from examples', 'រៀនពីឧទាហរណ៍'),
          t('It looks at many examples and finds patterns.', 'វាមើលឧទាហរណ៍ជាច្រើន ហើយរកលំនាំ។'),
        ],
        [
          '🙅',
          t('Not magic, not alive', 'មិនមែនវេទមន្ត មិនមែនមានជីវិត'),
          t('AI has no feelings and can make mistakes.', 'AI គ្មានអារម្មណ៍ ហើយអាចធ្វើខុស។'),
        ],
      ),
      see(
        '🐱🐱🐱🐶 → 🤖 → “cat” / “dog”',
        t(
          'After seeing thousands of photos, AI can tell cats from dogs.',
          'បន្ទាប់ពីឃើញរូបថតរាប់ពាន់ AI អាចបែងចែកឆ្មាពីឆ្កែ។',
        ),
      ),
      revealPlay(
        'multiple_choice',
        mc(t('What does AI stand for?', 'តើ AI មកពីពាក្យអ្វី?'), 'Artificial Intelligence', [
          'Automatic Internet',
          'Apple Instrument',
        ]),
        mc(
          t('Which of these uses AI?', 'តើមួយណាប្រើ AI?'),
          t('Google Translate', 'Google Translate'),
          [t('A light switch', 'កុងតាក់ភ្លើង'), t('A pencil', 'ខ្មៅដៃ')],
        ),
        tf(t('AI has feelings like people do.', 'AI មានអារម្មណ៍ដូចមនុស្ស។'), false, {
          explanation: t(
            'AI can copy how people write, but it doesn’t feel anything.',
            'AI អាចចម្លងរបៀបដែលមនុស្សសរសេរ ប៉ុន្តែវាមិនមានអារម្មណ៍អ្វីទេ។',
          ),
        }),
        tf(t('AI can make mistakes.', 'AI អាចធ្វើខុស។'), true, {
          explanation: t('Always check important answers.', 'ត្រូវពិនិត្យចម្លើយសំខាន់ៗជានិច្ច។'),
        }),
        mc(
          t('How does AI usually learn?', 'តើ AI ជាធម្មតារៀនដោយរបៀបណា?'),
          t('From lots of examples (data)', 'ពីឧទាហរណ៍ជាច្រើន (ទិន្នន័យ)'),
          [t('By sleeping', 'ដោយការគេង'), t('From magic', 'ពីវេទមន្ត')],
        ),
        mc(t('Which is an AI chatbot?', 'តើមួយណាជា AI chatbot?'), 'ChatGPT', [
          'Excel',
          'Paint',
          'Calculator',
        ]),
        tf(
          t(
            'A calculator doing 2 + 2 is an example of AI.',
            'ម៉ាស៊ីនគិតលេខដែលគណនា 2 + 2 គឺជាឧទាហរណ៍នៃ AI។',
          ),
          false,
          {
            explanation: t(
              'It follows fixed rules; it doesn’t learn from examples.',
              'វាធ្វើតាមច្បាប់ថេរ វាមិនរៀនពីឧទាហរណ៍ទេ។',
            ),
          },
        ),
        mc(
          t('Face unlock on a phone uses AI to…', 'ការដោះសោដោយមុខលើទូរស័ព្ទប្រើ AI ដើម្បី…'),
          t('Recognise your face', 'ស្គាល់មុខរបស់អ្នក'),
          [t('Charge the battery', 'សាកថ្ម'), t('Make calls cheaper', 'ធ្វើឱ្យការហៅថោកជាង')],
        ),
      ),
      revealChallenge(
        'drag_drop',
        sortInto(
          t('Uses AI or not?', 'ប្រើ AI ឬអត់?'),
          [
            ['ai', t('Uses AI', 'ប្រើ AI'), '🤖'],
            ['no', t('No AI', 'គ្មាន AI'), '🔌'],
          ],
          [
            [t('Voice assistant answering questions', 'ជំនួយការសំឡេងឆ្លើយសំណួរ'), 'ai'],
            [t('A torch (flashlight)', 'ពិល'), 'no'],
            [t('YouTube recommending videos', 'YouTube ណែនាំវីដេអូ'), 'ai'],
            [t('A paper calendar', 'ប្រតិទិនក្រដាស'), 'no'],
          ],
        ),
        mc(
          t('AI is best described as…', 'AI ពិពណ៌នាបានល្អបំផុតជា…'),
          t('A smart tool made by people', 'ឧបករណ៍ឆ្លាតដែលមនុស្សបង្កើត'),
          [
            t('A living robot brain', 'ខួរក្បាលរ៉ូបូតមានជីវិត'),
            t('A kind of virus', 'ប្រភេទមេរោគ'),
          ],
        ),
        mc(
          t('Who decides what an AI should do?', 'តើនរណាសម្រេចថា AI គួរធ្វើអ្វី?'),
          t('People who build and use it', 'មនុស្សដែលបង្កើត និងប្រើវា'),
          [t('The AI itself, alone', 'AI ខ្លួនឯងតែម្នាក់ឯង'), t('Nobody', 'គ្មាននរណាម្នាក់')],
        ),
        tf(
          t(
            'More good examples usually make an AI better at its job.',
            'ឧទាហរណ៍ល្អៗកាន់តែច្រើន ជាធម្មតាធ្វើឱ្យ AI ពូកែការងាររបស់វាជាង។',
          ),
          true,
        ),
        match(t('Match the AI tool to its job.', 'ផ្គូផ្គងឧបករណ៍ AI ទៅនឹងការងាររបស់វា។'), [
          [
            t('Translator', 'កម្មវិធីបកប្រែ'),
            t('Changes words to another language', 'ប្តូរពាក្យទៅភាសាផ្សេង'),
          ],
          [t('Chatbot', 'Chatbot'), t('Answers questions in a chat', 'ឆ្លើយសំណួរក្នុងការជជែក')],
          [t('Spam filter', 'តម្រង spam'), t('Hides junk email', 'លាក់អ៊ីមែលឥតបានការ')],
        ]),
        mc(
          t(
            'An AI that has only seen photos of cats will be bad at recognising…',
            'AI ដែលឃើញតែរូបថតឆ្មា នឹងមិនពូកែស្គាល់…',
          ),
          t('Elephants', 'ដំរី'),
          [t('Cats', 'ឆ្មា')],
          {
            explanation: t('AI only knows what it learned from.', 'AI ដឹងតែអ្វីដែលវាបានរៀន។'),
          },
        ),
        tf(
          t(
            'AI can be used for good things, like helping doctors find illnesses.',
            'AI អាចប្រើសម្រាប់រឿងល្អ ដូចជាជួយវេជ្ជបណ្ឌិតរកជំងឺ។',
          ),
          true,
        ),
        mc(
          t(
            'Which word means “information AI learns from”?',
            'តើពាក្យណាមានន័យថា “ព័ត៌មានដែល AI រៀនពី”?',
          ),
          t('Data', 'ទិន្នន័យ'),
          [t('Hardware', 'ផ្នែករឹង'), t('Battery', 'ថ្ម')],
        ),
      ),
      reward(t('Now you know what AI is! 🤖', 'ឥឡូវអ្នកដឹងថា AI ជាអ្វីហើយ! 🤖')),
    ],
  ),

  lesson(
    W,
    'ai-in-daily-life',
    '🏙️',
    t('AI in Daily Life', 'AI ក្នុងជីវិតប្រចាំថ្ងៃ'),
    t('Maps, phones, shops and more.', 'ផែនទី ទូរស័ព្ទ ហាង និងច្រើនទៀត។'),
    9,
    [
      intro(
        '🏙️',
        t(
          'You probably used AI today without noticing! Let’s find it in everyday life.',
          'អ្នកប្រហែលជាបានប្រើ AI ថ្ងៃនេះដោយមិនបានដឹង! តោះស្វែងរកវាក្នុងជីវិតប្រចាំថ្ងៃ។',
        ),
      ),
      learn(
        [
          '🗺️',
          t('Maps', 'ផែនទី'),
          t('Predict traffic and the fastest route.', 'ទស្សន៍ទាយចរាចរណ៍ និងផ្លូវលឿនបំផុត។'),
        ],
        [
          '🎬',
          t('Recommendations', 'ការណែនាំ'),
          t(
            'YouTube and TikTok guess what you’ll like next.',
            'YouTube និង TikTok ទាយអ្វីដែលអ្នកនឹងចូលចិត្តបន្ទាប់។',
          ),
        ],
        [
          '📷',
          t('Cameras', 'កាមេរ៉ា'),
          t(
            'Phone cameras improve photos and read text.',
            'កាមេរ៉ាទូរស័ព្ទកែលម្អរូបថត និងអានអក្សរ។',
          ),
        ],
      ),
      see(
        '🗺️ → 🚗🚗🚗 → “Take Monivong Blvd, 12 min”',
        t(
          'AI studies traffic data to suggest a route.',
          'AI សិក្សាទិន្នន័យចរាចរណ៍ ដើម្បីណែនាំផ្លូវ។',
        ),
      ),
      revealPlay(
        'multiple_choice',
        mc(
          t(
            'How does a map app know a road is busy?',
            'តើកម្មវិធីផែនទីដឹងដោយរបៀបណាថាផ្លូវមួយមមាញឹក?',
          ),
          t('It learns from many phones’ movement data', 'វារៀនពីទិន្នន័យចលនានៃទូរស័ព្ទជាច្រើន'),
          [
            t('Someone calls the app', 'នរណាម្នាក់ហៅទៅកម្មវិធី'),
            t('It guesses randomly', 'វាទាយចៃដន្យ'),
          ],
        ),
        mc(
          t(
            'TikTok shows you more cooking videos after you watch some. This is…',
            'TikTok បង្ហាញវីដេអូចម្អិនបន្ថែម បន្ទាប់ពីអ្នកមើលខ្លះ។ នេះគឺ…',
          ),
          t('An AI recommendation', 'ការណែនាំរបស់ AI'),
          [t('A coincidence', 'ការចៃដន្យ'), t('A virus', 'មេរោគ')],
        ),
        mc(
          t(
            'Pointing your camera at a sign to translate it uses…',
            'ការចង្អុលកាមេរ៉ាទៅស្លាកសញ្ញាដើម្បីបកប្រែ ប្រើ…',
          ),
          t('AI text recognition and translation', 'ការស្គាល់អក្សរ និងការបកប្រែដោយ AI'),
          [t('A printer', 'ម៉ាស៊ីនបោះពុម្ព'), t('Bluetooth', 'Bluetooth')],
        ),
        tf(
          t(
            'Spam filters in email use AI to spot junk messages.',
            'តម្រង spam ក្នុងអ៊ីមែលប្រើ AI ដើម្បីរកសារឥតបានការ។',
          ),
          true,
        ),
        mc(
          t('“Hey Google” or “Siri” are…', '“Hey Google” ឬ “Siri” គឺ…'),
          t('AI voice assistants', 'ជំនួយការសំឡេង AI'),
          [t('Printers', 'ម៉ាស៊ីនបោះពុម្ព'), t('Web browsers', 'កម្មវិធីរុករក')],
        ),
        mc(
          t(
            'Your keyboard suggests the next word while you type. That’s…',
            'ក្តារចុចរបស់អ្នកណែនាំពាក្យបន្ទាប់ពេលអ្នកវាយ។ នោះគឺ…',
          ),
          t('AI predicting text', 'AI ទស្សន៍ទាយអត្ថបទ'),
          [t('Your friend typing', 'មិត្តរបស់អ្នកកំពុងវាយ'), t('A broken keyboard', 'ក្តារចុចខូច')],
        ),
        tf(
          t(
            'Banks can use AI to spot unusual payments that may be fraud.',
            'ធនាគារអាចប្រើ AI ដើម្បីរកការបង់ប្រាក់មិនធម្មតាដែលអាចជាការបោកប្រាស់។',
          ),
          true,
        ),
        mc(
          t(
            'Online shops show “You may also like…”. Who chooses those items?',
            'ហាងអនឡាញបង្ហាញ “អ្នកប្រហែលជាចូលចិត្ត…”។ តើនរណាជ្រើសរើសរបស់ទាំងនោះ?',
          ),
          t('An AI that learns from shoppers', 'AI ដែលរៀនពីអ្នកទិញ'),
          [t('A lottery', 'ឆ្នោត'), t('The delivery driver', 'អ្នកបើកបរដឹកជញ្ជូន')],
        ),
      ),
      revealChallenge(
        'drag_drop',
        sortInto(
          t('Which AI job is it?', 'តើវាជាការងារ AI ណា?'),
          [
            ['recommend', t('Recommends', 'ណែនាំ'), '👍'],
            ['recognise', t('Recognises', 'ស្គាល់'), '👁️'],
            ['predict', t('Predicts', 'ទស្សន៍ទាយ'), '🔮'],
          ],
          [
            [t('Suggesting songs', 'ណែនាំបទចម្រៀង'), 'recommend'],
            [t('Face unlock', 'ការដោះសោដោយមុខ'), 'recognise'],
            [t('Weather forecast', 'ការព្យាករអាកាសធាតុ'), 'predict'],
            [t('Reading a car number plate', 'អានផ្លាកលេខរថយន្ត'), 'recognise'],
          ],
        ),
        mc(
          t(
            'Recommendations can trap you watching too much. A healthy habit?',
            'ការណែនាំអាចធ្វើឱ្យអ្នកជាប់មើលច្រើនពេក។ ទម្លាប់ល្អ?',
          ),
          t('Set a time limit', 'កំណត់ពេលវេលា'),
          [t('Watch all night', 'មើលពេញមួយយប់'), t('Never sleep', 'មិនដែលគេង')],
        ),
        tf(
          t(
            'Apps learn what you like from what you click and watch.',
            'កម្មវិធីរៀនអ្វីដែលអ្នកចូលចិត្តពីអ្វីដែលអ្នកចុច និងមើល។',
          ),
          true,
        ),
        mc(
          t(
            'A farmer uses a phone app to find a sick plant from a photo. This AI…',
            'កសិករម្នាក់ប្រើកម្មវិធីទូរស័ព្ទដើម្បីរករុក្ខជាតិឈឺពីរូបថត។ AI នេះ…',
          ),
          t('Recognises plant diseases', 'ស្គាល់ជំងឺរុក្ខជាតិ'),
          [t('Waters the plants', 'ស្រោចទឹករុក្ខជាតិ'), t('Sells the rice', 'លក់អង្ករ')],
        ),
        mc(
          t('Which is NOT done by AI?', 'តើមួយណាមិនត្រូវបានធ្វើដោយ AI?'),
          t('A door opening with a key', 'ទ្វារបើកដោយកូនសោ'),
          [
            t('Voice typing', 'ការវាយដោយសំឡេង'),
            t('Photo face tagging', 'ការដាក់ស្លាកមុខក្នុងរូបថត'),
          ],
        ),
        num(
          t(
            'An AI suggests 5 videos and you like 4 of them. What percentage did you like?',
            'AI ណែនាំវីដេអូ 5 ហើយអ្នកចូលចិត្ត 4។ តើអ្នកចូលចិត្តប៉ុន្មានភាគរយ?',
          ),
          80,
        ),
        tf(
          t(
            'Self-driving cars use AI to see the road.',
            'រថយន្តបើកបរដោយខ្លួនឯងប្រើ AI ដើម្បីមើលផ្លូវ។',
          ),
          true,
        ),
        mc(
          t(
            'Which everyday AI would help a tourist in Siem Reap read a Khmer menu?',
            'តើ AI ប្រចាំថ្ងៃណាជួយភ្ញៀវទេសចរនៅសៀមរាបអានម៉ឺនុយខ្មែរ?',
          ),
          t('Camera translation', 'ការបកប្រែតាមកាមេរ៉ា'),
          [t('A calculator', 'ម៉ាស៊ីនគិតលេខ'), t('A flashlight', 'ពិល')],
        ),
      ),
      reward(t('AI spotter! 🏙️', 'អ្នករកឃើញ AI! 🏙️')),
    ],
  ),

  lesson(
    W,
    'how-ai-learns',
    '📚',
    t('How AI Learns', 'របៀបដែល AI រៀន'),
    t('Data, patterns and training.', 'ទិន្នន័យ លំនាំ និងការបណ្តុះបណ្តាល។'),
    9,
    [
      intro(
        '📚',
        t(
          'People learn from practice. AI learns from data. Let’s see how it is trained.',
          'មនុស្សរៀនពីការហាត់។ AI រៀនពីទិន្នន័យ។ តោះមើលពីរបៀបដែលវាត្រូវបានបណ្តុះបណ្តាល។',
        ),
      ),
      learn(
        [
          '🗂️',
          t('Data', 'ទិន្នន័យ'),
          t('Many examples: photos, texts, numbers.', 'ឧទាហរណ៍ជាច្រើន៖ រូបថត អត្ថបទ លេខ។'),
        ],
        [
          '🏷️',
          t('Labels', 'ស្លាក'),
          t(
            'People tell it the answer: “this photo is a mango”.',
            'មនុស្សប្រាប់វាពីចម្លើយ៖ “រូបថតនេះជាស្វាយ”។',
          ),
        ],
        [
          '🔁',
          t('Training', 'ការបណ្តុះបណ្តាល'),
          t(
            'It guesses, checks, and improves — again and again.',
            'វាទាយ ពិនិត្យ និងកែលម្អ — ម្តងហើយម្តងទៀត។',
          ),
        ],
      ),
      seeLevels(
        [
          t(
            '1. Show 1,000 labelled photos of mangoes and bananas',
            '1. បង្ហាញរូបថតស្វាយ និងចេក 1,000 ដែលមានស្លាក',
          ),
          t(
            '2. AI guesses, gets told right or wrong, and adjusts',
            '2. AI ទាយ ត្រូវបានប្រាប់ថាត្រូវ ឬខុស ហើយកែតម្រូវ',
          ),
          t('3. Test it on new photos it has never seen', '3. សាកល្បងវាលើរូបថតថ្មីដែលវាមិនដែលឃើញ'),
        ],
        t('Train, then test on new examples.', 'បណ្តុះបណ្តាល រួចសាកល្បងលើឧទាហរណ៍ថ្មី។'),
      ),
      revealPlay(
        'multiple_choice',
        order(t('Put the steps of training an AI in order.', 'តម្រៀបជំហាននៃការបណ្តុះបណ្តាល AI។'), [
          t('Collect examples (data)', 'ប្រមូលឧទាហរណ៍ (ទិន្នន័យ)'),
          t('Label the examples', 'ដាក់ស្លាកឧទាហរណ៍'),
          t('Train the AI', 'បណ្តុះបណ្តាល AI'),
          t('Test it on new examples', 'សាកល្បងវាលើឧទាហរណ៍ថ្មី'),
        ]),
        mc(
          t('A label tells the AI…', 'ស្លាកប្រាប់ AI…'),
          t('The right answer for an example', 'ចម្លើយត្រឹមត្រូវសម្រាប់ឧទាហរណ៍មួយ'),
          [t('Its battery level', 'កម្រិតថ្មរបស់វា'), t('The time', 'ម៉ោង')],
        ),
        tf(
          t(
            'An AI trained on blurry photos may struggle with clear ones (and the other way round).',
            'AI ដែលបណ្តុះបណ្តាលលើរូបថតព្រិល អាចពិបាកជាមួយរូបថតច្បាស់ (និងផ្ទុយមកវិញ)។',
          ),
          true,
        ),
        mc(
          t('Why test the AI on NEW examples?', 'ហេតុអ្វីត្រូវសាកល្បង AI លើឧទាហរណ៍ថ្មី?'),
          t(
            'To see if it really learned, not just memorised',
            'ដើម្បីមើលថាវាពិតជាបានរៀន មិនមែនគ្រាន់តែទន្ទេញ',
          ),
          [t('To make it slower', 'ដើម្បីធ្វើឱ្យវាយឺត'), t('No reason', 'គ្មានហេតុផល')],
        ),
        mc(
          t(
            'Which is the best training data for a Khmer handwriting reader?',
            'តើទិន្នន័យបណ្តុះបណ្តាលណាល្អបំផុតសម្រាប់កម្មវិធីអានការសរសេរដៃខ្មែរ?',
          ),
          t('Thousands of Khmer handwriting samples', 'គំរូការសរសេរដៃខ្មែររាប់ពាន់'),
          [t('Pictures of cats', 'រូបភាពឆ្មា'), t('English songs', 'បទចម្រៀងអង់គ្លេស')],
        ),
        tf(
          t(
            'Wrong labels in the data can teach the AI wrong things.',
            'ស្លាកខុសក្នុងទិន្នន័យ អាចបង្រៀន AI នូវរឿងខុស។',
          ),
          true,
        ),
        mc(
          t('A chatbot learned language by reading…', 'Chatbot បានរៀនភាសាដោយអាន…'),
          t('Huge amounts of text', 'អត្ថបទយ៉ាងច្រើន'),
          [t('Only one book', 'តែសៀវភៅមួយ'), t('Nothing', 'គ្មានអ្វីទេ')],
        ),
        num(
          t(
            'An AI got 45 of 50 test photos right. What percentage is that?',
            'AI ឆ្លើយត្រូវរូបថតសាកល្បង 45 ក្នុងចំណោម 50។ តើនោះជាប៉ុន្មានភាគរយ?',
          ),
          90,
        ),
      ),
      revealChallenge(
        'multiple_choice',
        mc(
          t('A pattern is…', 'លំនាំគឺ…'),
          t('Something that repeats and can be predicted', 'អ្វីដែលកើតឡើងដដែលៗ ហើយអាចទស្សន៍ទាយបាន'),
          [t('A random mistake', 'កំហុសចៃដន្យ'), t('A password', 'ពាក្យសម្ងាត់')],
        ),
        tf(
          t(
            'AI needs much more data than a person to learn the same thing.',
            'AI ត្រូវការទិន្នន័យច្រើនជាងមនុស្សយ៉ាងច្រើន ដើម្បីរៀនរឿងដដែល។',
          ),
          true,
          {
            explanation: t(
              'A child may learn “cat” from a few cats; AI may need thousands of photos.',
              'កុមារអាចរៀន “ឆ្មា” ពីឆ្មាពីរបី AI អាចត្រូវការរូបថតរាប់ពាន់។',
            ),
          },
        ),
        sortInto(
          t('Good or bad training data?', 'ទិន្នន័យបណ្តុះបណ្តាលល្អ ឬមិនល្អ?'),
          [
            ['good', t('Good data', 'ទិន្នន័យល្អ'), '✅'],
            ['bad', t('Bad data', 'ទិន្នន័យមិនល្អ'), '❌'],
          ],
          [
            [
              t(
                'Many clear, correctly labelled photos',
                'រូបថតច្បាស់ៗជាច្រើនដែលមានស្លាកត្រឹមត្រូវ',
              ),
              'good',
            ],
            [t('Photos with wrong labels', 'រូបថតដែលមានស្លាកខុស'), 'bad'],
            [t('Examples from many different people', 'ឧទាហរណ៍ពីមនុស្សផ្សេងៗជាច្រើន'), 'good'],
            [t('Only 3 examples', 'តែឧទាហរណ៍ 3'), 'bad'],
          ],
        ),
        mc(
          t(
            'After training, if the AI makes a mistake, people can…',
            'បន្ទាប់ពីបណ្តុះបណ្តាល បើ AI ធ្វើខុស មនុស្សអាច…',
          ),
          t('Add better data and train it again', 'បន្ថែមទិន្នន័យល្អជាង ហើយបណ្តុះបណ្តាលវាម្តងទៀត'),
          [t('Shout at it', 'ស្រែកដាក់វា'), t('Do nothing ever', 'មិនធ្វើអ្វីទាល់តែសោះ')],
        ),
        mc(
          t('Machine learning means…', 'Machine learning មានន័យថា…'),
          t('Computers learning from data', 'កុំព្យូទ័ររៀនពីទិន្នន័យ'),
          [t('Fixing machines', 'ជួសជុលម៉ាស៊ីន'), t('Learning to drive', 'រៀនបើកបរ')],
        ),
        tf(
          t(
            'Data used to train AI should be collected with permission.',
            'ទិន្នន័យដែលប្រើដើម្បីបណ្តុះបណ្តាល AI គួរប្រមូលដោយមានការអនុញ្ញាត។',
          ),
          true,
        ),
        num(
          t(
            'You label 20 photos a minute. How many minutes for 600 photos?',
            'អ្នកដាក់ស្លាករូបថត 20 ក្នុងមួយនាទី។ តើប៉ុន្មាននាទីសម្រាប់រូបថត 600?',
          ),
          30,
        ),
        mc(
          t(
            'AI that learned only from city roads may do badly on…',
            'AI ដែលរៀនតែពីផ្លូវទីក្រុង អាចធ្វើមិនបានល្អលើ…',
          ),
          t('Muddy country roads', 'ផ្លូវជនបទភក់'),
          [t('City roads', 'ផ្លូវទីក្រុង')],
        ),
      ),
      reward(t('You know how AI learns! 📚', 'អ្នកដឹងពីរបៀបដែល AI រៀន! 📚')),
    ],
  ),

  lesson(
    W,
    'what-can-ai-do',
    '🪄',
    t('What Can AI Do?', 'តើ AI អាចធ្វើអ្វីបាន?'),
    t('Its strengths — and its limits.', 'ចំណុចខ្លាំង — និងដែនកំណត់របស់វា។'),
    9,
    [
      intro(
        '🪄',
        t(
          'AI is great at some jobs and bad at others. Knowing the difference makes you a smart user.',
          'AI ពូកែការងារខ្លះ ហើយមិនពូកែការងារខ្លះទៀត។ ការដឹងពីភាពខុសគ្នា ធ្វើឱ្យអ្នកក្លាយជាអ្នកប្រើឆ្លាត។',
        ),
      ),
      learn(
        [
          '💪',
          t('Good at', 'ពូកែ'),
          t(
            'Explaining, summarising, translating, brainstorming ideas.',
            'ពន្យល់ សង្ខេប បកប្រែ បំផុសគំនិត។',
          ),
        ],
        [
          '⚠️',
          t('Weak at', 'ខ្សោយ'),
          t(
            'Very new news, exact facts, and things it was never taught.',
            'ព័ត៌មានថ្មីៗ ការពិតជាក់លាក់ និងរឿងដែលវាមិនដែលត្រូវបានបង្រៀន។',
          ),
        ],
        [
          '🙋',
          t('You stay in charge', 'អ្នកនៅតែជាអ្នកគ្រប់គ្រង'),
          t(
            'You decide what to use and always check.',
            'អ្នកសម្រេចថាត្រូវប្រើអ្វី ហើយពិនិត្យជានិច្ច។',
          ),
        ],
      ),
      see(
        '✅ “Explain photosynthesis simply” · ⚠️ “What happened 5 minutes ago?”',
        t(
          'Great at explaining; may not know the latest news.',
          'ពូកែពន្យល់ ប៉ុន្តែប្រហែលជាមិនដឹងព័ត៌មានចុងក្រោយ។',
        ),
      ),
      revealPlay(
        'drag_drop',
        sortInto(
          t('Good job for AI, or be careful?', 'ការងារល្អសម្រាប់ AI ឬត្រូវប្រុងប្រយ័ត្ន?'),
          [
            ['good', t('Good for AI', 'ល្អសម្រាប់ AI'), '👍'],
            ['careful', t('Be careful', 'ប្រុងប្រយ័ត្ន'), '⚠️'],
          ],
          [
            [t('Explain a hard word', 'ពន្យល់ពាក្យពិបាក'), 'good'],
            [t('Today’s exchange rate', 'អត្រាប្តូរប្រាក់ថ្ងៃនេះ'), 'careful'],
            [t('Ideas for a birthday party', 'គំនិតសម្រាប់ពិធីខួបកំណើត'), 'good'],
            [
              t(
                'Medical advice for a serious illness',
                'ដំបូន្មានវេជ្ជសាស្ត្រសម្រាប់ជំងឺធ្ងន់ធ្ងរ',
              ),
              'careful',
            ],
          ],
        ),
        mc(
          t('Which task is AI very good at?', 'តើកិច្ចការណាដែល AI ពូកែខ្លាំង?'),
          t('Summarising a long text', 'សង្ខេបអត្ថបទវែង'),
          [
            t('Feeling sad for you', 'មានអារម្មណ៍សោកសៅជំនួសអ្នក'),
            t('Knowing your secret', 'ដឹងអាថ៌កំបាំងរបស់អ្នក'),
          ],
        ),
        tf(t('AI always knows today’s news.', 'AI តែងតែដឹងព័ត៌មានថ្ងៃនេះ។'), false, {
          explanation: t(
            'Many AIs learned from older data and can be out of date.',
            'AI ជាច្រើនបានរៀនពីទិន្នន័យចាស់ ហើយអាចហួសសម័យ។',
          ),
        }),
        mc(
          t('AI can write a story. Who should check it?', 'AI អាចសរសេររឿង។ តើនរណាគួរពិនិត្យវា?'),
          t('You', 'អ្នក'),
          [t('Nobody', 'គ្មាននរណាម្នាក់'), t('The AI only', 'តែ AI')],
        ),
        mc(
          t('Brainstorming means…', 'ការបំផុសគំនិត មានន័យថា…'),
          t('Making a list of many ideas', 'បង្កើតបញ្ជីគំនិតជាច្រើន'),
          [t('Deleting ideas', 'លុបគំនិត'), t('Sleeping', 'គេង')],
        ),
        tf(
          t(
            'AI can translate between Khmer and English, but it may make small mistakes.',
            'AI អាចបកប្រែរវាងខ្មែរ និងអង់គ្លេស ប៉ុន្តែវាអាចធ្វើកំហុសតូចៗ។',
          ),
          true,
        ),
        mc(
          t('AI can’t…', 'AI មិនអាច…'),
          t('Taste your mother’s cooking', 'ភ្លក់ម្ហូបម្តាយរបស់អ្នក'),
          [t('Explain fractions', 'ពន្យល់ប្រភាគ'), t('Write a poem', 'សរសេរកំណាព្យ')],
        ),
        mc(
          t(
            'Making a picture from words (“a cat on a moto”) is called…',
            'ការបង្កើតរូបភាពពីពាក្យ (“ឆ្មានៅលើម៉ូតូ”) ហៅថា…',
          ),
          t('Image generation', 'ការបង្កើតរូបភាព'),
          [t('Printing', 'ការបោះពុម្ព'), t('Scanning', 'ការស្កេន')],
        ),
      ),
      revealChallenge(
        'multiple_choice',
        match(t('Match the request to what AI does.', 'ផ្គូផ្គងសំណើទៅនឹងអ្វីដែល AI ធ្វើ។'), [
          [t('“Make this shorter”', '“ធ្វើឱ្យខ្លីជាងនេះ”'), t('Summarise', 'សង្ខេប')],
          [t('“Say this in Khmer”', '“និយាយនេះជាខ្មែរ”'), t('Translate', 'បកប្រែ')],
          [t('“Give me 10 ideas”', '“ឱ្យខ្ញុំ 10 គំនិត”'), t('Brainstorm', 'បំផុសគំនិត')],
          [t('“What does this word mean?”', '“តើពាក្យនេះមានន័យថាអ្វី?”'), t('Explain', 'ពន្យល់')],
        ]),
        tf(
          t(
            'If AI says something confidently, it must be true.',
            'បើ AI និយាយអ្វីមួយដោយមានទំនុកចិត្ត វាត្រូវតែពិត។',
          ),
          false,
          {
            explanation: t(
              'AI can sound sure and still be wrong.',
              'AI អាចស្តាប់ទៅប្រាកដ ប៉ុន្តែនៅតែខុស។',
            ),
          },
        ),
        mc(
          t('Best use of AI for homework?', 'ការប្រើ AI ល្អបំផុតសម្រាប់កិច្ចការផ្ទះ?'),
          t('Ask it to explain what you don’t understand', 'សួរវាឱ្យពន្យល់អ្វីដែលអ្នកមិនយល់'),
          [
            t('Copy its answer without reading', 'ចម្លងចម្លើយរបស់វាដោយមិនអាន'),
            t('Let it do everything', 'ទុកឱ្យវាធ្វើអ្វីៗទាំងអស់'),
          ],
        ),
        mc(
          t('AI got a maths answer wrong. What’s the lesson?', 'AI ឆ្លើយគណិតខុស។ តើមេរៀនគឺជាអ្វី?'),
          t('Check important answers yourself', 'ពិនិត្យចម្លើយសំខាន់ៗដោយខ្លួនឯង'),
          [
            t('Never use maths', 'កុំប្រើគណិតវិទ្យា'),
            t('AI is always right anyway', 'AI តែងតែត្រូវទោះជាយ៉ាងណា'),
          ],
        ),
        tf(
          t(
            'AI can help people with disabilities, for example by reading text aloud.',
            'AI អាចជួយមនុស្សពិការ ឧទាហរណ៍ដោយអានអត្ថបទឮៗ។',
          ),
          true,
        ),
        mc(
          t(
            'Which is a creative task AI can help with?',
            'តើកិច្ចការច្នៃប្រឌិតណាដែល AI អាចជួយបាន?',
          ),
          t('Ideas for a poster', 'គំនិតសម្រាប់ផ្ទាំងរូបភាព'),
          [t('Charging your phone', 'សាកទូរស័ព្ទ'), t('Cooking rice', 'ដាំបាយ')],
        ),
        tf(
          t(
            'You are responsible for what you do with AI’s answers.',
            'អ្នកទទួលខុសត្រូវចំពោះអ្វីដែលអ្នកធ្វើជាមួយចម្លើយរបស់ AI។',
          ),
          true,
        ),
        mc(
          t('AI is like…', 'AI ប្រៀបដូចជា…'),
          t(
            'A helpful assistant you must supervise',
            'ជំនួយការដែលមានប្រយោជន៍ដែលអ្នកត្រូវត្រួតពិនិត្យ',
          ),
          [
            t('A perfect teacher who is never wrong', 'គ្រូល្អឥតខ្ចោះដែលមិនដែលខុស'),
            t('A pet', 'សត្វចិញ្ចឹម'),
          ],
        ),
      ),
      reward(
        t(
          'You know AI’s superpowers and limits! 🪄',
          'អ្នកដឹងពីមហិទ្ធិឫទ្ធិ និងដែនកំណត់របស់ AI! 🪄',
        ),
      ),
    ],
  ),

  lesson(
    W,
    'ai-images-and-voice',
    '🎨',
    t('AI Images & Voices', 'រូបភាព និងសំឡេង AI'),
    t('Pictures, voices and deepfakes.', 'រូបភាព សំឡេង និង deepfakes។'),
    9,
    [
      intro(
        '🎨',
        t(
          'AI can draw pictures and copy voices. That’s fun — and it means we must check what we see and hear.',
          'AI អាចគូររូប និងចម្លងសំឡេង។ វាសប្បាយ — ហើយមានន័យថាយើងត្រូវពិនិត្យអ្វីដែលយើងឃើញ និងឮ។',
        ),
      ),
      learn(
        [
          '🖼️',
          t('Image generators', 'កម្មវិធីបង្កើតរូបភាព'),
          t('Type a description, get a picture.', 'វាយការពិពណ៌នា ទទួលបានរូបភាព។'),
        ],
        [
          '🗣️',
          t('Voice AI', 'AI សំឡេង'),
          t(
            'Reads text aloud — or copies a real person’s voice.',
            'អានអត្ថបទឮៗ — ឬចម្លងសំឡេងមនុស្សពិត។',
          ),
        ],
        [
          '🎭',
          'Deepfake',
          t('A fake video or voice that looks real.', 'វីដេអូ ឬសំឡេងក្លែងក្លាយដែលមើលទៅដូចពិត។'),
        ],
      ),
      see(
        t(
          '“A robot reading a book under a mango tree, cartoon style” → 🖼️',
          '“រ៉ូបូតអានសៀវភៅក្រោមដើមស្វាយ រចនាបែបគំនូរជីវចល” → 🖼️',
        ),
        t('A clear description gives a better picture.', 'ការពិពណ៌នាច្បាស់ផ្តល់រូបភាពល្អជាង។'),
      ),
      revealPlay(
        'multiple_choice',
        mc(
          t(
            'Which description will give the clearest picture?',
            'តើការពិពណ៌នាណានឹងផ្តល់រូបភាពច្បាស់ជាងគេ?',
          ),
          t(
            'A red tuk-tuk on a sunny street in Phnom Penh, photo style',
            'រ៉ឺម៉កពណ៌ក្រហមនៅលើផ្លូវមានពន្លឺថ្ងៃក្នុងភ្នំពេញ រចនាបែបរូបថត',
          ),
          [t('car', 'ឡាន'), t('something nice', 'អ្វីមួយស្អាត')],
        ),
        mc(
          t('A deepfake is…', 'Deepfake គឺ…'),
          t(
            'A fake video or voice made to look real',
            'វីដេអូ ឬសំឡេងក្លែងក្លាយដែលធ្វើឱ្យមើលទៅដូចពិត',
          ),
          [t('A deep swimming pool', 'អាងហែលទឹកជ្រៅ'), t('A kind of camera', 'ប្រភេទកាមេរ៉ា')],
        ),
        tf(
          t(
            'AI-made pictures can look like real photos.',
            'រូបភាពដែល AI បង្កើតអាចមើលទៅដូចរូបថតពិត។',
          ),
          true,
        ),
        sod(
          t(
            'Your “cousin” calls with a strange voice asking for money urgently.',
            '“បងប្អូនជីដូនមួយ” របស់អ្នកហៅមកដោយសំឡេងចម្លែក សុំលុយជាបន្ទាន់។',
          ),
          'dangerous',
          {
            explanation: t(
              'Voices can be faked. Hang up and call them back on their real number.',
              'សំឡេងអាចក្លែងក្លាយបាន។ ដាក់ទូរស័ព្ទ ហើយហៅទៅលេខពិតរបស់ពួកគេវិញ។',
            ),
          },
        ),
        mc(
          t('Signs a picture may be AI-made:', 'សញ្ញាដែលរូបភាពប្រហែលជាបង្កើតដោយ AI៖'),
          t('Strange hands, melted text, odd shadows', 'ដៃចម្លែក អក្សររលាយ ស្រមោលចម្លែក'),
          [t('It is in colour', 'វាមានពណ៌'), t('It is square', 'វាជាការេ')],
        ),
        tf(
          t(
            'Making a fake video of a real person to embarrass them is OK if it’s a joke.',
            'ការបង្កើតវីដេអូក្លែងក្លាយនៃមនុស្សពិតដើម្បីធ្វើឱ្យពួកគេខ្មាស គឺមិនអីទេបើជាការលេងសើច។',
          ),
          false,
          {
            explanation: t(
              'It can really hurt people and can be illegal.',
              'វាអាចធ្វើឱ្យមនុស្សឈឺចាប់ពិតប្រាកដ ហើយអាចខុសច្បាប់។',
            ),
          },
        ),
        mc(
          t('Text-to-speech AI is useful for…', 'AI អត្ថបទទៅសំឡេង មានប្រយោជន៍សម្រាប់…'),
          t('People who can’t read the screen easily', 'មនុស្សដែលមិនអាចអានអេក្រង់បានស្រួល'),
          [t('Stealing passwords', 'លួចពាក្យសម្ងាត់'), t('Printing', 'បោះពុម្ព')],
        ),
        mc(
          t(
            'Adding “cartoon style” or “watercolour” to an image prompt changes the…',
            'ការបន្ថែម “រចនាបែបគំនូរជីវចល” ឬ “ពណ៌ទឹក” ទៅ prompt រូបភាព ផ្លាស់ប្តូរ…',
          ),
          t('Style', 'រចនាប័ទ្ម'),
          [t('File size only', 'តែទំហំឯកសារ'), t('Language', 'ភាសា')],
        ),
      ),
      revealChallenge(
        'multiple_choice',
        sod(
          t(
            'A video shows a famous leader saying something shocking, posted by an unknown page.',
            'វីដេអូបង្ហាញមេដឹកនាំល្បីម្នាក់និយាយអ្វីគួរឱ្យភ្ញាក់ផ្អើល បង្ហោះដោយទំព័រមិនស្គាល់។',
          ),
          'dangerous',
          {
            explanation: t(
              'It could be a deepfake. Check trusted news first.',
              'វាអាចជា deepfake។ ពិនិត្យព័ត៌មានដែលគួរឱ្យទុកចិត្តជាមុន។',
            ),
          },
        ),
        sod(
          t(
            'Using AI to make a fun poster for your class event and saying it was AI-made.',
            'ប្រើ AI ដើម្បីបង្កើតផ្ទាំងរូបភាពសប្បាយសម្រាប់ព្រឹត្តិការណ៍ថ្នាក់ ហើយប្រាប់ថាវាបង្កើតដោយ AI។',
          ),
          'safe',
        ),
        mc(
          t('A good way to check a suspicious photo?', 'វិធីល្អដើម្បីពិនិត្យរូបថតគួរឱ្យសង្ស័យ?'),
          t(
            'Reverse image search and trusted news',
            'ស្វែងរករូបភាពបញ្ច្រាស និងព័ត៌មានដែលគួរឱ្យទុកចិត្ត',
          ),
          [
            t('Share it to ask everyone', 'ចែករំលែកវាដើម្បីសួរអ្នករាល់គ្នា'),
            t('Believe it', 'ជឿវា'),
          ],
        ),
        tf(
          t(
            'Being honest that you used AI for a picture is a good habit.',
            'ការស្មោះត្រង់ថាអ្នកបានប្រើ AI សម្រាប់រូបភាព គឺជាទម្លាប់ល្អ។',
          ),
          true,
        ),
        order(
          t(
            'Improve an image prompt: from weakest to strongest.',
            'កែលម្អ prompt រូបភាព៖ ពីខ្សោយបំផុតទៅខ្លាំងបំផុត។',
          ),
          [
            t('a temple', 'ប្រាសាទ'),
            t('Angkor Wat', 'អង្គរវត្ត'),
            t('Angkor Wat at sunrise', 'អង្គរវត្តពេលថ្ងៃរះ'),
            t(
              'Angkor Wat at sunrise with lotus flowers, painting style',
              'អង្គរវត្តពេលថ្ងៃរះជាមួយផ្កាឈូក រចនាបែបគំនូរ',
            ),
          ],
        ),
        mc(
          t(
            'Your family could protect against voice scams by…',
            'គ្រួសាររបស់អ្នកអាចការពារការបោកប្រាស់សំឡេងដោយ…',
          ),
          t('Agreeing on a secret family question', 'ព្រមព្រៀងលើសំណួរសម្ងាត់គ្រួសារ'),
          [
            t('Answering every unknown call', 'ឆ្លើយគ្រប់ការហៅមិនស្គាល់'),
            t('Posting their voices online', 'បង្ហោះសំឡេងពួកគេតាមអនឡាញ'),
          ],
        ),
        tf(
          t(
            'Some AI images copy the style of real artists, which raises fairness questions.',
            'រូបភាព AI ខ្លះចម្លងរចនាប័ទ្មរបស់សិល្បករពិត ដែលលើកឡើងសំណួរអំពីភាពយុត្តិធម៌។',
          ),
          true,
        ),
        mc(
          t(
            'Which is a responsible use of voice AI?',
            'តើមួយណាជាការប្រើ AI សំឡេងប្រកបដោយការទទួលខុសត្រូវ?',
          ),
          t('Listening to a lesson read aloud', 'ស្តាប់មេរៀនដែលអានឮៗ'),
          [t('Copying a teacher’s voice to prank parents', 'ចម្លងសំឡេងគ្រូដើម្បីលេងសើចឪពុកម្តាយ')],
        ),
      ),
      reward(t('Creative and careful! 🎨', 'ច្នៃប្រឌិត និងប្រុងប្រយ័ត្ន! 🎨')),
    ],
  ),

  lesson(
    W,
    'asking-ai-questions',
    '💬',
    t('Asking AI Questions', 'ការសួរសំណួរទៅ AI'),
    t('Chat with AI clearly and politely.', 'ជជែកជាមួយ AI ឱ្យច្បាស់ និងគួរសម។'),
    9,
    [
      intro(
        '💬',
        t(
          'Talking to an AI chatbot is like texting a very fast helper. Clear questions get clear answers.',
          'ការនិយាយជាមួយ AI chatbot ប្រៀបដូចការផ្ញើសារទៅអ្នកជំនួយដ៏លឿន។ សំណួរច្បាស់ ទទួលបានចម្លើយច្បាស់។',
        ),
      ),
      learn(
        [
          '❓',
          t('One question at a time', 'សំណួរម្តងមួយ'),
          t('Short and specific.', 'ខ្លី និងជាក់លាក់។'),
        ],
        [
          '🔁',
          t('Follow up', 'សួរបន្ត'),
          t(
            '“Explain more simply” or “Give an example”.',
            '“ពន្យល់ឱ្យសាមញ្ញជាងនេះ” ឬ “ឱ្យឧទាហរណ៍”។',
          ),
        ],
        [
          '🌏',
          t('Any language', 'ភាសាណាក៏បាន'),
          t('You can ask in Khmer or English.', 'អ្នកអាចសួរជាខ្មែរ ឬអង់គ្លេស។'),
        ],
      ),
      see(
        t(
          'You: “What is RAM? Explain like I am 12.”',
          'អ្នក៖ “តើ RAM ជាអ្វី? ពន្យល់ដូចខ្ញុំអាយុ 12 ឆ្នាំ។”',
        ),
        t(
          'Saying who it’s for makes the answer fit you.',
          'ការប្រាប់ថាសម្រាប់នរណា ធ្វើឱ្យចម្លើយសមនឹងអ្នក។',
        ),
      ),
      revealPlay(
        'multiple_choice',
        mc(
          t('Which question is clearest?', 'តើសំណួរណាច្បាស់ជាងគេ?'),
          t(
            'What is a CPU? Explain in 3 simple sentences.',
            'តើ CPU ជាអ្វី? ពន្យល់ជា 3 ប្រយោគសាមញ្ញ។',
          ),
          [
            t('computer thing?', 'របស់កុំព្យូទ័រ?'),
            t('tell me everything', 'ប្រាប់ខ្ញុំអ្វីៗទាំងអស់'),
          ],
        ),
        mc(
          t(
            'The AI’s answer is too hard. What do you type next?',
            'ចម្លើយរបស់ AI ពិបាកពេក។ តើអ្នកវាយអ្វីបន្ទាប់?',
          ),
          t('“Please explain it more simply.”', '“សូមពន្យល់វាឱ្យសាមញ្ញជាងនេះ។”'),
          [t('“wrong!!!”', '“ខុស!!!”'), t('Nothing, give up', 'គ្មានអ្វីទេ បោះបង់')],
        ),
        mc(
          t(
            'Is this a good answer to “What is RAM?”',
            'តើនេះជាចម្លើយល្អចំពោះ “តើ RAM ជាអ្វី?” ទេ?',
          ),
          t('Yes — clear and simple', 'បាទ/ចាស — ច្បាស់ និងសាមញ្ញ'),
          [t('No — it is about food', 'ទេ — វានិយាយពីអាហារ')],
          {
            data: chatMock(
              ['you', 'What is RAM? Explain simply.'],
              [
                'ai',
                'RAM is your computer’s short-term memory. It holds the apps you are using right now.',
              ],
            ),
          },
        ),
        tf(t('You can ask an AI chatbot in Khmer.', 'អ្នកអាចសួរ AI chatbot ជាភាសាខ្មែរ។'), true),
        mc(
          t('To get an example, you can ask…', 'ដើម្បីទទួលបានឧទាហរណ៍ អ្នកអាចសួរ…'),
          t('“Can you give me an example?”', '“តើអ្នកអាចឱ្យឧទាហរណ៍មួយបានទេ?”'),
          [t('“Stop.”', '“ឈប់។”'), t('“Hello?”', '“សួស្តី?”')],
        ),
        tf(
          t(
            'Being polite to AI is not required, but clear words help it understand.',
            'ការគួរសមចំពោះ AI មិនចាំបាច់ទេ ប៉ុន្តែពាក្យច្បាស់ៗជួយឱ្យវាយល់។',
          ),
          true,
        ),
        mc(t('Which question is too vague?', 'តើសំណួរណាមិនច្បាស់ពេក?'), t('“Help.”', '“ជួយ។”'), [
          t('“How do I make a folder on Windows?”', '“តើខ្ញុំបង្កើតថតនៅលើ Windows ដោយរបៀបណា?”'),
          t('“What does Ctrl + Z do?”', '“តើ Ctrl + Z ធ្វើអ្វី?”'),
        ]),
        mc(
          t('You want shorter answers. Add…', 'អ្នកចង់បានចម្លើយខ្លីជាង។ បន្ថែម…'),
          t('“Answer in 2 sentences.”', '“ឆ្លើយជា 2 ប្រយោគ។”'),
          [t('“Write a book.”', '“សរសេរសៀវភៅ។”'), t('Lots of emojis', 'រូបអារម្មណ៍ច្រើន')],
        ),
      ),
      revealChallenge(
        'multiple_choice',
        order(t('Put a good chat in order.', 'តម្រៀបការជជែកល្អ។'), [
          t('Ask a clear question', 'សួរសំណួរច្បាស់'),
          t('Read the answer', 'អានចម្លើយ'),
          t('Ask a follow-up if needed', 'សួរបន្តបើចាំបាច់'),
          t('Check important facts', 'ពិនិត្យការពិតសំខាន់ៗ'),
        ]),
        mc(
          t('Which is a good follow-up question?', 'តើសំណួរសួរបន្តណាល្អ?'),
          t('“Can you show that as a table?”', '“តើអ្នកអាចបង្ហាញវាជាតារាងបានទេ?”'),
          [t('“???”', '“???”'), t('“again again again”', '“ម្តងទៀត ម្តងទៀត ម្តងទៀត”')],
        ),
        tf(
          t(
            'You should type your password into a chatbot to get help with your account.',
            'អ្នកគួរវាយពាក្យសម្ងាត់ទៅក្នុង chatbot ដើម្បីទទួលជំនួយជាមួយគណនី។',
          ),
          false,
          {
            explanation: t(
              'Never share passwords with any chatbot.',
              'កុំចែករំលែកពាក្យសម្ងាត់ជាមួយ chatbot ណាមួយ។',
            ),
          },
        ),
        mc(
          t('Is this AI answer correct?', 'តើចម្លើយ AI នេះត្រឹមត្រូវទេ?'),
          t('Yes', 'បាទ/ចាស'),
          [t('No', 'ទេ')],
          {
            data: chatMock(
              ['you', 'How many minutes are in 2 hours?'],
              ['ai', 'There are 120 minutes in 2 hours.'],
            ),
          },
        ),
        mc(
          t('“Explain like I’m 10” tells the AI…', '“ពន្យល់ដូចខ្ញុំអាយុ 10 ឆ្នាំ” ប្រាប់ AI…'),
          t('To use simple words', 'ឱ្យប្រើពាក្យសាមញ្ញ'),
          [t('Your real age', 'អាយុពិតរបស់អ្នក'), t('To write 10 pages', 'ឱ្យសរសេរ 10 ទំព័រ')],
        ),
        tf(
          t(
            'A chatbot remembers what you said earlier in the same chat.',
            'Chatbot ចងចាំអ្វីដែលអ្នកបាននិយាយមុននេះក្នុងការជជែកដដែល។',
          ),
          true,
        ),
        mc(
          t('Starting a new chat is useful when…', 'ការចាប់ផ្តើមការជជែកថ្មីមានប្រយោជន៍ពេល…'),
          t('You change to a completely new topic', 'អ្នកប្តូរទៅប្រធានបទថ្មីទាំងស្រុង'),
          [t('Never', 'មិនដែល'), t('Every word', 'គ្រប់ពាក្យ')],
        ),
        mc(
          t(
            'Which question gets the most useful answer about a job?',
            'តើសំណួរណាទទួលបានចម្លើយមានប្រយោជន៍បំផុតអំពីការងារ?',
          ),
          t(
            '“What skills does a junior web developer need? List 5.”',
            '“តើអ្នកអភិវឌ្ឍគេហទំព័រកម្រិតដំបូងត្រូវការជំនាញអ្វី? រាយ 5។”',
          ),
          [t('“jobs?”', '“ការងារ?”'), t('“tell me stuff”', '“ប្រាប់ខ្ញុំរឿងខ្លះ”')],
        ),
      ),
      reward(t('Great chatting! 💬', 'ការជជែកល្អណាស់! 💬')),
    ],
  ),

  lesson(
    W,
    'better-prompts',
    '✨',
    t('Better Questions, Better Answers', 'សំណួរល្អ ចម្លើយល្អ'),
    t('Role, task, context and format.', 'តួនាទី កិច្ចការ បរិបទ និងទម្រង់។'),
    9,
    [
      intro(
        '✨',
        t(
          'A prompt is what you type to the AI. Four simple parts make it great.',
          'Prompt គឺជាអ្វីដែលអ្នកវាយទៅ AI។ ផ្នែកសាមញ្ញបួនធ្វើឱ្យវាល្អឥតខ្ចោះ។',
        ),
      ),
      learn(
        [
          '🎭',
          t('ROLE', 'តួនាទី'),
          t(
            'Who should the AI be? “You are a patient teacher.”',
            'តើ AI គួរជានរណា? “អ្នកជាគ្រូអត់ធ្មត់។”',
          ),
        ],
        [
          '🎯',
          t('TASK', 'កិច្ចការ'),
          t('What should it do? “Explain…”, “List…”', 'តើវាគួរធ្វើអ្វី? “ពន្យល់…”, “រាយ…”'),
        ],
        [
          '👤',
          t('CONTEXT', 'បរិបទ'),
          t('Who is it for? “I am a beginner…”', 'សម្រាប់នរណា? “ខ្ញុំជាអ្នកចាប់ផ្តើម…”'),
        ],
        [
          '📋',
          t('FORMAT', 'ទម្រង់'),
          t('How should it look? “5 bullet points”', 'តើវាគួរមើលទៅដូចម្តេច? “5 ចំណុច”'),
        ],
      ),
      seeLevels(
        [
          t('😕 “Tell me about computers.”', '😕 “ប្រាប់ខ្ញុំអំពីកុំព្យូទ័រ។”'),
          t('🙂 “Explain the parts of a computer.”', '🙂 “ពន្យល់ផ្នែកនៃកុំព្យូទ័រ។”'),
          t(
            '🤩 “You are a friendly teacher. Explain the 4 main parts of a computer to a beginner, as a short list.”',
            '🤩 “អ្នកជាគ្រូរួសរាយ។ ពន្យល់ផ្នែកសំខាន់ៗ 4 នៃកុំព្យូទ័រ ដល់អ្នកចាប់ផ្តើម ជាបញ្ជីខ្លី។”',
          ),
        ],
        t(
          'Each level adds a part: role, task, context, format.',
          'កម្រិតនីមួយៗបន្ថែមផ្នែកមួយ៖ តួនាទី កិច្ចការ បរិបទ ទម្រង់។',
        ),
      ),
      revealPlay(
        'multiple_choice',
        mc(
          t('Which prompt is best?', 'តើ prompt ណាល្អបំផុត?'),
          t(
            'You are a friendly teacher. Explain what Wi-Fi is to a beginner in 3 short sentences.',
            'អ្នកជាគ្រូរួសរាយ។ ពន្យល់ថា Wi-Fi ជាអ្វី ដល់អ្នកចាប់ផ្តើម ជា 3 ប្រយោគខ្លី។',
          ),
          [
            t('wifi', 'wifi'),
            t(
              'Tell me everything about the internet ever.',
              'ប្រាប់ខ្ញុំអ្វីៗទាំងអស់អំពីអ៊ីនធឺណិត។',
            ),
          ],
        ),
        match(
          t('Match each prompt part to an example.', 'ផ្គូផ្គងផ្នែក prompt នីមួយៗទៅនឹងឧទាហរណ៍។'),
          [
            [t('ROLE', 'តួនាទី'), t('You are a career coach.', 'អ្នកជាគ្រូបង្វឹកអាជីព។')],
            [t('TASK', 'កិច្ចការ'), t('Suggest 5 IT jobs.', 'ណែនាំការងារ IT 5។')],
            [
              t('CONTEXT', 'បរិបទ'),
              t('For a student who likes drawing.', 'សម្រាប់សិស្សដែលចូលចិត្តគូររូប។'),
            ],
            [t('FORMAT', 'ទម្រង់'), t('As a numbered list.', 'ជាបញ្ជីលេខ។')],
          ],
        ),
        mc(
          t(
            'Which part is missing? “Explain photosynthesis as 3 bullet points.”',
            'តើផ្នែកណាបាត់? “ពន្យល់រស្មីសំយោគជា 3 ចំណុច។”',
          ),
          t('ROLE and CONTEXT', 'តួនាទី និងបរិបទ'),
          [t('TASK', 'កិច្ចការ'), t('FORMAT', 'ទម្រង់')],
        ),
        mc(
          t('Which is a TASK?', 'តើមួយណាជាកិច្ចការ?'),
          t('“Translate this into Khmer.”', '“បកប្រែនេះទៅជាខ្មែរ។”'),
          [t('“I am 16.”', '“ខ្ញុំអាយុ 16។”'), t('“As a table.”', '“ជាតារាង។”')],
        ),
        mc(
          t('Which is a FORMAT?', 'តើមួយណាជាទម្រង់?'),
          t('“In a table with 2 columns.”', '“ក្នុងតារាងមាន 2 ជួរឈរ។”'),
          [
            t('“You are a doctor.”', '“អ្នកជាវេជ្ជបណ្ឌិត។”'),
            t('“Explain fractions.”', '“ពន្យល់ប្រភាគ។”'),
          ],
        ),
        mc(
          t('Which is CONTEXT?', 'តើមួយណាជាបរិបទ?'),
          t('“I have never used Excel before.”', '“ខ្ញុំមិនដែលប្រើ Excel ពីមុនទេ។”'),
          [t('“List 3 tips.”', '“រាយ 3 គន្លឹះ។”'), t('“You are a chef.”', '“អ្នកជាចុងភៅ។”')],
        ),
        tf(
          t(
            'Adding context makes the answer fit you better.',
            'ការបន្ថែមបរិបទធ្វើឱ្យចម្លើយសមនឹងអ្នកជាង។',
          ),
          true,
        ),
        mc(
          t('Is this a good answer to the prompt?', 'តើនេះជាចម្លើយល្អចំពោះ prompt ទេ?'),
          t('Yes — 3 short points as asked', 'បាទ/ចាស — 3 ចំណុចខ្លីដូចបានសុំ'),
          [t('No — far too long', 'ទេ — វែងពេក')],
          {
            data: chatMock(
              ['you', 'Give me 3 short tips to type faster.'],
              [
                'ai',
                '1. Use the home row. 2. Don’t look at your hands. 3. Practise 10 minutes a day.',
              ],
            ),
          },
        ),
      ),
      revealChallenge(
        'multiple_choice',
        order(
          t('Put the prompt parts in the usual order.', 'តម្រៀបផ្នែក prompt តាមលំដាប់ធម្មតា។'),
          [
            t('Role', 'តួនាទី'),
            t('Task', 'កិច្ចការ'),
            t('Context', 'បរិបទ'),
            t('Format', 'ទម្រង់'),
          ],
        ),
        mc(
          t(
            'Improve “help me with English”. Best version?',
            'កែលម្អ “ជួយខ្ញុំជាមួយភាសាអង់គ្លេស”។ កំណែល្អបំផុត?',
          ),
          t(
            'You are an English teacher. Give me 5 useful phrases for a job interview, with Khmer meanings.',
            'អ្នកជាគ្រូភាសាអង់គ្លេស។ ឱ្យខ្ញុំ 5 ឃ្លាមានប្រយោជន៍សម្រាប់សម្ភាសន៍ការងារ ជាមួយអត្ថន័យខ្មែរ។',
          ),
          [t('Help English now', 'ជួយអង់គ្លេសឥឡូវ'), t('English?', 'អង់គ្លេស?')],
        ),
        tf(
          t(
            'A longer prompt is always better, even with useless details.',
            'Prompt វែងជាងតែងតែល្អជាង សូម្បីតែមានព័ត៌មានលម្អិតគ្មានប្រយោជន៍។',
          ),
          false,
          {
            explanation: t(
              'Useful details help; random details confuse.',
              'ព័ត៌មានលម្អិតមានប្រយោជន៍ជួយ ព័ត៌មានចៃដន្យធ្វើឱ្យច្រឡំ។',
            ),
          },
        ),
        mc(
          t(
            'Which role fits “Plan a healthy weekly menu”?',
            'តើតួនាទីណាសមនឹង “រៀបចំម៉ឺនុយប្រចាំសប្តាហ៍ដែលមានសុខភាពល្អ”?',
          ),
          t('A nutrition expert', 'អ្នកជំនាញអាហារូបត្ថម្ភ'),
          [t('A pirate', 'ចោរសមុទ្រ'), t('A car mechanic', 'ជាងជួសជុលរថយន្ត')],
        ),
        mc(
          t('You want a table. Which words do you add?', 'អ្នកចង់បានតារាង។ តើអ្នកបន្ថែមពាក្យអ្វី?'),
          t('“Show it as a table.”', '“បង្ហាញវាជាតារាង។”'),
          [t('“Be fast.”', '“លឿនៗ។”'), t('“Thanks.”', '“អរគុណ។”')],
        ),
        mc(
          t('Which prompt gives the best study help?', 'តើ prompt ណាផ្តល់ជំនួយការសិក្សាល្អបំផុត?'),
          t(
            'Quiz me with 5 questions about the parts of a computer, one at a time.',
            'សួរខ្ញុំ 5 សំណួរអំពីផ្នែកនៃកុំព្យូទ័រ ម្តងមួយ។',
          ),
          [t('Do my homework.', 'ធ្វើកិច្ចការផ្ទះឱ្យខ្ញុំ។'), t('computer', 'កុំព្យូទ័រ')],
        ),
        tf(
          t(
            'If the first answer isn’t right, you can improve the prompt and try again.',
            'បើចម្លើយដំបូងមិនត្រឹមត្រូវ អ្នកអាចកែលម្អ prompt ហើយសាកម្តងទៀត។',
          ),
          true,
        ),
        mc(
          t(
            '“Make it more formal” is useful when the answer is for…',
            '“ធ្វើឱ្យផ្លូវការជាងនេះ” មានប្រយោជន៍ពេលចម្លើយសម្រាប់…',
          ),
          t('An email to a company', 'អ៊ីមែលទៅក្រុមហ៊ុន'),
          [t('A chat with your brother', 'ការជជែកជាមួយបងប្អូនប្រុស'), t('A joke', 'ការលេងសើច')],
        ),
      ),
      reward(t('Prompt pro! ✨', 'អ្នកជំនាញ prompt! ✨')),
    ],
  ),

  lesson(
    W,
    'prompt-builder',
    '🧱',
    t('Prompt Builder', 'អ្នកសាងសង់ Prompt'),
    t('Build perfect prompts piece by piece.', 'សាងសង់ prompt ល្អឥតខ្ចោះម្តងមួយផ្នែក។'),
    10,
    [
      intro(
        '🧱',
        t(
          'Let’s BUILD prompts: pick the best piece for each part.',
          'តោះសាងសង់ prompt៖ ជ្រើសរើសផ្នែកល្អបំផុតសម្រាប់ផ្នែកនីមួយៗ។',
        ),
      ),
      learn(
        ['🎭', t('ROLE', 'តួនាទី'), t('An expert who fits the job.', 'អ្នកជំនាញដែលសមនឹងការងារ។')],
        [
          '🎯',
          t('TASK', 'កិច្ចការ'),
          t(
            'One clear action verb: explain, write, list, translate.',
            'កិរិយាសកម្មភាពច្បាស់មួយ៖ ពន្យល់ សរសេរ រាយ បកប្រែ។',
          ),
        ],
        [
          '👤',
          t('CONTEXT', 'បរិបទ'),
          t('Who it’s for and any limits.', 'សម្រាប់នរណា និងដែនកំណត់ណាមួយ។'),
        ],
        [
          '📋',
          t('FORMAT', 'ទម្រង់'),
          t('List, table, 3 sentences, 100 words…', 'បញ្ជី តារាង 3 ប្រយោគ 100 ពាក្យ…'),
        ],
      ),
      see(
        t(
          '🎭 You are a career coach + 🎯 Suggest IT jobs + 👤 for a student who likes drawing + 📋 as a list of 5',
          '🎭 អ្នកជាគ្រូបង្វឹកអាជីព + 🎯 ណែនាំការងារ IT + 👤 សម្រាប់សិស្សដែលចូលចិត្តគូររូប + 📋 ជាបញ្ជី 5',
        ),
        t('Four pieces = one excellent prompt.', 'ផ្នែកបួន = prompt ដ៏ល្អមួយ។'),
      ),
      revealPlay(
        'prompt_builder',
        promptBuilder(
          t(
            'You want help learning about keyboards. Pick the best piece for each part.',
            'អ្នកចង់បានជំនួយរៀនអំពីក្តារចុច។ ជ្រើសរើសផ្នែកល្អបំផុតសម្រាប់ផ្នែកនីមួយៗ។',
          ),
          {
            role: [
              t('You are a patient IT teacher.', 'You are a patient IT teacher.'),
              t('You are a famous singer.', 'You are a famous singer.'),
              t('You are a cat.', 'You are a cat.'),
            ],
            task: [
              t(
                'Explain the most important keyboard keys.',
                'Explain the most important keyboard keys.',
              ),
              t('Do something.', 'Do something.'),
              t('Write a love poem.', 'Write a love poem.'),
            ],
            context: [
              t(
                'I am a beginner who uses a phone more than a computer.',
                'I am a beginner who uses a phone more than a computer.',
              ),
              t('I know everything already.', 'I know everything already.'),
              t('It is Tuesday.', 'It is Tuesday.'),
            ],
            format: [
              t('Give me a short list of 5 keys.', 'Give me a short list of 5 keys.'),
              t('Make it as long as possible.', 'Make it as long as possible.'),
              t('Use no words.', 'Use no words.'),
            ],
          },
          {
            hint: t(
              'Each piece should help the AI give YOU a useful answer.',
              'ផ្នែកនីមួយៗគួរជួយ AI ផ្តល់ចម្លើយមានប្រយោជន៍ដល់អ្នក។',
            ),
          },
        ),
        promptBuilder(
          t(
            'You want a weekly study plan. Build the prompt.',
            'អ្នកចង់បានផែនការសិក្សាប្រចាំសប្តាហ៍។ សាងសង់ prompt។',
          ),
          {
            role: [
              t('You are a friendly study coach.', 'អ្នកជាគ្រូបង្វឹកការសិក្សារួសរាយ។'),
              t('You are a pirate.', 'អ្នកជាចោរសមុទ្រ។'),
            ],
            task: [
              t('Make me a study plan for this week.', 'ធ្វើផែនការសិក្សាសម្រាប់សប្តាហ៍នេះ។'),
              t('Tell me a joke.', 'ប្រាប់ខ្ញុំរឿងកំប្លែង។'),
            ],
            context: [
              t(
                'I have 1 hour each evening and an IT exam on Friday.',
                'ខ្ញុំមាន 1 ម៉ោងរៀងរាល់ល្ងាច និងប្រឡង IT នៅថ្ងៃសុក្រ។',
              ),
              t('I like pizza.', 'ខ្ញុំចូលចិត្តភីហ្សា។'),
            ],
            format: [
              t('Show it as a table with days and topics.', 'បង្ហាញជាតារាងមានថ្ងៃ និងប្រធានបទ។'),
              t('Answer with one word.', 'ឆ្លើយជាមួយពាក្យមួយ។'),
            ],
          },
        ),
        promptBuilder(
          t(
            'You need a CV summary. Build the prompt.',
            'អ្នកត្រូវការសេចក្តីសង្ខេប CV។ សាងសង់ prompt។',
          ),
          {
            role: [
              t('You are a job coach.', 'អ្នកជាគ្រូបង្វឹកការងារ។'),
              t('You are a footballer.', 'អ្នកជាកីឡាករបាល់ទាត់។'),
            ],
            task: [
              t('Write a short profile for my CV.', 'សរសេរប្រវត្តិរូបខ្លីសម្រាប់ CV របស់ខ្ញុំ។'),
              t('Sing a song.', 'ច្រៀងចម្រៀង។'),
            ],
            context: [
              t(
                'I am 18, I know Word and Excel, and I want an office job.',
                'ខ្ញុំអាយុ 18 ចេះ Word និង Excel ហើយចង់បានការងារការិយាល័យ។',
              ),
              t('The sky is blue.', 'មេឃពណ៌ខៀវ។'),
            ],
            format: [
              t('3 sentences, professional tone.', '3 ប្រយោគ សំនៀងអាជីព។'),
              t('100 emojis.', 'រូបអារម្មណ៍ 100។'),
            ],
          },
        ),
        promptBuilder(
          t(
            'You want to learn 5 English words for shopping. Build the prompt.',
            'អ្នកចង់រៀនពាក្យអង់គ្លេស 5 សម្រាប់ការទិញទំនិញ។ សាងសង់ prompt។',
          ),
          {
            role: [
              t('You are an English teacher.', 'អ្នកជាគ្រូភាសាអង់គ្លេស។'),
              t('You are a dinosaur.', 'អ្នកជាដាយណូស័រ។'),
            ],
            task: [
              t('Teach me 5 useful shopping words.', 'បង្រៀនខ្ញុំពាក្យទិញទំនិញមានប្រយោជន៍ 5។'),
              t('Write a novel.', 'សរសេរប្រលោមលោក។'),
            ],
            context: [
              t(
                'My first language is Khmer and I am a beginner.',
                'ភាសាដំបូងរបស់ខ្ញុំគឺខ្មែរ ហើយខ្ញុំជាអ្នកចាប់ផ្តើម។',
              ),
              t('I own a bicycle.', 'ខ្ញុំមានកង់មួយ។'),
            ],
            format: [
              t(
                'A table: English word, Khmer meaning, example.',
                'តារាង៖ ពាក្យអង់គ្លេស អត្ថន័យខ្មែរ ឧទាហរណ៍។',
              ),
              t('No answer.', 'គ្មានចម្លើយ។'),
            ],
          },
        ),
        mc(
          t(
            'Which ROLE fits a prompt about fixing a slow laptop?',
            'តើតួនាទីណាសមនឹង prompt អំពីការជួសជុលកុំព្យូទ័រយួរដៃយឺត?',
          ),
          t('You are a computer technician.', 'អ្នកជាជាងបច្ចេកទេសកុំព្យូទ័រ។'),
          [t('You are a baker.', 'អ្នកជាអ្នកដុតនំ។'), t('You are a poet.', 'អ្នកជាកវី។')],
        ),
        mc(
          t('Which TASK is clearest?', 'តើកិច្ចការណាច្បាស់ជាងគេ?'),
          t('List 5 ways to speed up my laptop.', 'រាយ 5 វិធីដើម្បីធ្វើឱ្យកុំព្យូទ័រយួរដៃលឿនជាង។'),
          [t('Laptop stuff.', 'រឿងកុំព្យូទ័រយួរដៃ។'), t('Do it.', 'ធ្វើវា។')],
        ),
        mc(
          t('Which CONTEXT helps most?', 'តើបរិបទណាជួយច្រើនបំផុត?'),
          t(
            'It’s a 5-year-old Windows laptop with 4 GB RAM.',
            'វាជាកុំព្យូទ័រយួរដៃ Windows អាយុ 5 ឆ្នាំ មាន RAM 4 GB។',
          ),
          [t('I had rice for lunch.', 'ខ្ញុំញ៉ាំបាយថ្ងៃត្រង់។'), t('Hello.', 'សួស្តី។')],
        ),
        mc(
          t('Which FORMAT is easiest to follow?', 'តើទម្រង់ណាងាយធ្វើតាមជាងគេ?'),
          t('Numbered steps.', 'ជំហានជាលេខ។'),
          [t('One giant paragraph.', 'កថាខណ្ឌធំមួយ។'), t('Only emojis.', 'តែរូបអារម្មណ៍។')],
        ),
      ),
      revealChallenge(
        'prompt_builder',
        promptBuilder(
          t(
            'You want ideas for a class poster about saving water. Build the prompt.',
            'អ្នកចង់បានគំនិតសម្រាប់ផ្ទាំងរូបភាពថ្នាក់អំពីការសន្សំទឹក។ សាងសង់ prompt។',
          ),
          {
            role: [
              t('You are a creative designer.', 'អ្នកជាអ្នករចនាច្នៃប្រឌិត។'),
              t('You are a bank robber.', 'អ្នកជាចោរប្លន់ធនាគារ។'),
            ],
            task: [
              t('Give me 5 slogan ideas.', 'ឱ្យខ្ញុំ 5 គំនិតពាក្យស្លោក។'),
              t('Delete my homework.', 'លុបកិច្ចការផ្ទះខ្ញុំ។'),
            ],
            context: [
              t(
                'The poster is for students aged 12–15 in Cambodia.',
                'ផ្ទាំងរូបភាពសម្រាប់សិស្សអាយុ 12–15 ឆ្នាំនៅកម្ពុជា។',
              ),
              t('My shoes are new.', 'ស្បែកជើងខ្ញុំថ្មី។'),
            ],
            format: [
              t('Short slogans, under 8 words each.', 'ពាក្យស្លោកខ្លីៗ មិនលើស 8 ពាក្យម្នាក់ៗ។'),
              t('A 50-page report.', 'របាយការណ៍ 50 ទំព័រ។'),
            ],
          },
        ),
        promptBuilder(
          t(
            'You want to understand a hard maths topic. Build the prompt.',
            'អ្នកចង់យល់ប្រធានបទគណិតពិបាក។ សាងសង់ prompt។',
          ),
          {
            role: [
              t('You are a patient maths tutor.', 'អ្នកជាគ្រូបង្រៀនគណិតអត់ធ្មត់។'),
              t('You are a superhero.', 'អ្នកជាវីរបុរស។'),
            ],
            task: [
              t('Explain percentages step by step.', 'ពន្យល់ភាគរយម្តងមួយជំហាន។'),
              t('Tell me the weather.', 'ប្រាប់ខ្ញុំពីអាកាសធាតុ។'),
            ],
            context: [
              t(
                'I understand fractions but percentages confuse me.',
                'ខ្ញុំយល់ប្រភាគ ប៉ុន្តែភាគរយធ្វើឱ្យខ្ញុំច្រឡំ។',
              ),
              t('I have a cat.', 'ខ្ញុំមានឆ្មាមួយ។'),
            ],
            format: [
              t('Use 2 examples with money.', 'ប្រើ 2 ឧទាហរណ៍ជាមួយលុយ។'),
              t('No examples at all.', 'គ្មានឧទាហរណ៍ទាល់តែសោះ។'),
            ],
          },
        ),
        promptBuilder(
          t(
            'You want to write a polite email to your teacher. Build the prompt.',
            'អ្នកចង់សរសេរអ៊ីមែលគួរសមទៅគ្រូ។ សាងសង់ prompt។',
          ),
          {
            role: [
              t('You are a helpful writing assistant.', 'អ្នកជាជំនួយការសរសេរដែលមានប្រយោជន៍។'),
              t('You are a rock star.', 'អ្នកជាតារារ៉ុក។'),
            ],
            task: [
              t(
                'Write a short email asking for more time for my homework.',
                'សរសេរអ៊ីមែលខ្លីសុំពេលបន្ថែមសម្រាប់កិច្ចការផ្ទះ។',
              ),
              t('Write a rude message.', 'សរសេរសារឈ្លើយ។'),
            ],
            context: [
              t(
                'I was sick for two days. My teacher is Ms Sophea.',
                'ខ្ញុំឈឺពីរថ្ងៃ។ គ្រូរបស់ខ្ញុំគឺអ្នកគ្រូ សុភា។',
              ),
              t('I like mangoes.', 'ខ្ញុំចូលចិត្តស្វាយ។'),
            ],
            format: [
              t('Polite, under 80 words.', 'គួរសម មិនលើស 80 ពាក្យ។'),
              t('In capital letters only.', 'តែអក្សរធំ។'),
            ],
          },
        ),
        tf(
          t(
            'The best prompt pieces are the ones that help the AI understand YOUR situation.',
            'ផ្នែក prompt ល្អបំផុត គឺផ្នែកដែលជួយ AI យល់ពីស្ថានភាពរបស់អ្នក។',
          ),
          true,
        ),
        mc(
          t('A prompt with only a TASK…', 'Prompt ដែលមានតែកិច្ចការ…'),
          t('Works, but the answer may not fit you', 'ដំណើរការ ប៉ុន្តែចម្លើយអាចមិនសមនឹងអ្នក'),
          [t('Never works', 'មិនដែលដំណើរការ'), t('Is always perfect', 'តែងតែល្អឥតខ្ចោះ')],
        ),
        num(
          t(
            'A prompt has 4 parts. You wrote 3. How many are missing?',
            'Prompt មាន 4 ផ្នែក។ អ្នកបានសរសេរ 3។ តើខ្វះប៉ុន្មាន?',
          ),
          1,
        ),
        mc(
          t(
            'Which piece would you change to get a shorter answer?',
            'តើផ្នែកណាដែលអ្នកនឹងប្តូរ ដើម្បីទទួលបានចម្លើយខ្លីជាង?',
          ),
          t('FORMAT', 'ទម្រង់'),
          [t('ROLE', 'តួនាទី'), t('CONTEXT', 'បរិបទ')],
        ),
        tf(
          t(
            'You can save good prompts and reuse them later.',
            'អ្នកអាចរក្សាទុក prompt ល្អៗ ហើយប្រើវាម្តងទៀតពេលក្រោយ។',
          ),
          true,
        ),
      ),
      reward(t('Master builder! 🧱', 'មេសាងសង់! 🧱')),
    ],
  ),
];
