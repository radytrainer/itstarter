import type { Word } from '../dsl';

// 📖 "Words to know" for Office Creator, Internet Explorer, AI Playground and English for
// Beginners, by lesson slug (4 words each). Khmer meanings are DRAFTS for native review.

export const OFFICE_WORDS: Record<string, Word[]> = {
  'what-is-a-document': [
    ['document', 'ឯកសារ', '📄'],
    ['page', 'ទំព័រ'],
    ['title', 'ចំណងជើង'],
    ['template', 'គំរូ'],
  ],
  'typing-and-editing': [
    ['edit', 'កែសម្រួល', '✏️'],
    ['cursor', 'ទស្សន៍ទ្រនិច'],
    ['paragraph', 'កថាខណ្ឌ'],
    ['spelling', 'អក្ខរាវិរុទ្ធ'],
  ],
  'format-your-text': [
    ['bold', 'អក្សរដិត'],
    ['italic', 'អក្សរទ្រេត'],
    ['font', 'ពុម្ពអក្សរ'],
    ['align', 'តម្រឹម'],
  ],
  'lists-and-paragraphs': [
    ['list', 'បញ្ជី', '📋'],
    ['bullet', 'ចំណុច'],
    ['indent', 'ចូលបន្ទាត់'],
    ['heading', 'ចំណងជើងរង'],
  ],
  'pictures-and-tables': [
    ['picture', 'រូបភាព', '🖼️'],
    ['table', 'តារាង'],
    ['row', 'ជួរដេក'],
    ['column', 'ជួរឈរ'],
  ],
  'my-profile': [
    ['profile', 'ប្រវត្តិរូប', '🙂'],
    ['hobby', 'ចំណូលចិត្ត'],
    ['skill', 'ជំនាញ'],
    ['goal', 'គោលដៅ', '🎯'],
  ],
  'save-and-print': [
    ['save', 'រក្សាទុក', '💾'],
    ['print', 'បោះពុម្ព', '🖨️'],
    ['preview', 'មើលជាមុន'],
    ['format', 'ទម្រង់'],
  ],
  'what-is-a-spreadsheet': [
    ['spreadsheet', 'តារាងលេខ', '📊'],
    ['cell', 'ក្រឡា'],
    ['sheet', 'សន្លឹក'],
    ['data', 'ទិន្នន័យ'],
  ],
  'cells-and-addresses': [
    ['address', 'អាសយដ្ឋាន'],
    ['row', 'ជួរដេក'],
    ['column', 'ជួរឈរ'],
    ['range', 'ជួរក្រឡា'],
  ],
  'sum-and-average': [
    ['formula', 'រូបមន្ត'],
    ['sum', 'ផលបូក'],
    ['average', 'មធ្យមភាគ'],
    ['function', 'អនុគមន៍'],
  ],
  'sort-and-charts': [
    ['chart', 'គំនូសតាង', '📈'],
    ['sort', 'តម្រៀប'],
    ['filter', 'តម្រង'],
    ['bar chart', 'គំនូសតាងរបារ'],
  ],
  'my-weekly-budget': [
    ['budget', 'ថវិកា', '💰'],
    ['income', 'ចំណូល'],
    ['expense', 'ចំណាយ'],
    ['saving', 'ការសន្សំ', '🐷'],
  ],
  'presentation-basics': [
    ['slide', 'ស្លាយ'],
    ['presentation', 'បទបង្ហាញ', '📽️'],
    ['transition', 'ការផ្លាស់ប្តូរ'],
    ['audience', 'អ្នកស្តាប់'],
  ],
  'my-dream-presentation': [
    ['dream', 'ក្តីស្រមៃ', '🌟'],
    ['career', 'អាជីព'],
    ['plan', 'ផែនការ'],
    ['speech', 'សុន្ទរកថា', '🎤'],
  ],
  'sharing-documents': [
    ['share', 'ចែករំលែក', '🔗'],
    ['comment', 'មតិយោបល់', '💬'],
    ['permission', 'សិទ្ធិ'],
    ['online', 'អនឡាញ'],
  ],
};

export const INTERNET_WORDS: Record<string, Word[]> = {
  'what-is-the-internet': [
    ['internet', 'អ៊ីនធឺណិត', '🌐'],
    ['website', 'វេបសាយ'],
    ['server', 'ម៉ាស៊ីនមេ', '🗄️'],
    ['network', 'បណ្តាញ'],
  ],
  'wifi-and-mobile-data': [
    ['signal', 'សញ្ញា', '📶'],
    ['router', 'រ៉ោតទ័រ'],
    ['hotspot', 'ចំណុចចែករំលែកអ៊ីនធឺណិត'],
    ['data', 'ទិន្នន័យ'],
  ],
  'browsers-and-urls': [
    ['browser', 'កម្មវិធីរុករក'],
    ['address bar', 'របារអាសយដ្ឋាន'],
    ['tab', 'ផ្ទាំង'],
    ['bookmark', 'ចំណាំ', '🔖'],
  ],
  'searching-smart': [
    ['search', 'ស្វែងរក', '🔍'],
    ['keyword', 'ពាក្យគន្លឹះ'],
    ['result', 'លទ្ធផល'],
    ['source', 'ប្រភព'],
  ],
  'is-it-true': [
    ['fact', 'ការពិត', '✅'],
    ['fake', 'ក្លែងក្លាយ', '❌'],
    ['check', 'ពិនិត្យ'],
    ['news', 'ព័ត៌មាន', '📰'],
  ],
  'email-basics': [
    ['email', 'អ៊ីមែល', '📧'],
    ['inbox', 'ប្រអប់សំបុត្រចូល', '📥'],
    ['subject', 'ប្រធានបទ'],
    ['reply', 'ឆ្លើយតប', '↩️'],
  ],
  'writing-good-emails': [
    ['greeting', 'ការស្វាគមន៍', '👋'],
    ['polite', 'គួរសម'],
    ['signature', 'ហត្ថលេខា'],
    ['send', 'ផ្ញើ', '📤'],
  ],
  'chat-and-video-calls': [
    ['chat', 'ជជែក', '💬'],
    ['video', 'វីដេអូ', '📹'],
    ['mute', 'បិទសំឡេង', '🔇'],
    ['camera', 'កាមេរ៉ា', '📷'],
  ],
  'strong-passwords': [
    ['password', 'ពាក្យសម្ងាត់', '🔑'],
    ['account', 'គណនី'],
    ['secret', 'សម្ងាត់', '🤫'],
    ['strong', 'ខ្លាំង', '💪'],
  ],
  'safe-or-dangerous': [
    ['safe', 'មានសុវត្ថិភាព', '🛡️'],
    ['danger', 'គ្រោះថ្នាក់', '⚠️'],
    ['scam', 'ការបោកប្រាស់'],
    ['virus', 'មេរោគ', '🦠'],
  ],
  'spot-phishing': [
    ['phishing', 'ការបោកបញ្ឆោតតាមអ៊ីនធឺណិត', '🎣'],
    ['sender', 'អ្នកផ្ញើ'],
    ['report', 'រាយការណ៍'],
    ['block', 'ទប់ស្កាត់', '🚫'],
  ],
  'safe-browsing': [
    ['secure', 'មានសុវត្ថិភាព', '🔒'],
    ['popup', 'ផ្ទាំងលោតឡើង'],
    ['cookies', 'ខូគី', '🍪'],
    ['history', 'ប្រវត្តិ'],
  ],
  'privacy-and-social-media': [
    ['privacy', 'ភាពឯកជន'],
    ['post', 'បង្ហោះ'],
    ['public', 'សាធារណៈ'],
    ['private', 'ឯកជន', '🔐'],
  ],
  'kindness-online': [
    ['kind', 'ចិត្តល្អ', '💛'],
    ['bully', 'សម្លុត'],
    ['respect', 'ការគោរព'],
    ['help', 'ជួយ', '🤝'],
  ],
  'online-services': [
    ['payment', 'ការទូទាត់', '💳'],
    ['order', 'ការបញ្ជាទិញ', '🛒'],
    ['delivery', 'ការដឹកជញ្ជូន', '🚚'],
    ['code', 'លេខកូដ'],
  ],
};

export const AI_WORDS: Record<string, Word[]> = {
  'what-is-ai': [
    ['robot', 'រ៉ូបូត', '🤖'],
    ['intelligence', 'បញ្ញា', '🧠'],
    ['machine', 'ម៉ាស៊ីន'],
    ['chatbot', 'ឆាតបូត', '💬'],
  ],
  'ai-in-daily-life': [
    ['assistant', 'ជំនួយការ'],
    ['translate', 'បកប្រែ', '🌐'],
    ['recommend', 'ណែនាំ'],
    ['voice', 'សំឡេង', '🗣️'],
  ],
  'how-ai-learns': [
    ['data', 'ទិន្នន័យ'],
    ['learn', 'រៀន', '📚'],
    ['pattern', 'លំនាំ'],
    ['model', 'ម៉ូដែល'],
  ],
  'what-can-ai-do': [
    ['summary', 'សេចក្តីសង្ខេប'],
    ['draft', 'សេចក្តីព្រាង'],
    ['answer', 'ចម្លើយ'],
    ['limit', 'ដែនកំណត់'],
  ],
  'ai-images-and-voice': [
    ['image', 'រូបភាព', '🖼️'],
    ['generate', 'បង្កើត', '✨'],
    ['deepfake', 'វីដេអូក្លែងក្លាយ'],
    ['real', 'ពិត'],
  ],
  'asking-ai-questions': [
    ['question', 'សំណួរ', '❓'],
    ['clear', 'ច្បាស់លាស់'],
    ['detail', 'ព័ត៌មានលម្អិត'],
    ['example', 'ឧទាហរណ៍'],
  ],
  'better-prompts': [
    ['prompt', 'ប្រអប់បញ្ចូល'],
    ['role', 'តួនាទី', '🎭'],
    ['task', 'កិច្ចការ'],
    ['context', 'បរិបទ'],
  ],
  'prompt-builder': [
    ['prompt', 'ប្រអប់បញ្ចូល'],
    ['format', 'ទម្រង់'],
    ['audience', 'អ្នកស្តាប់'],
    ['improve', 'កែលម្អ', '📈'],
  ],
  'learning-with-ai': [
    ['explain', 'ពន្យល់'],
    ['practice', 'ហាត់', '🏋️'],
    ['tutor', 'គ្រូបង្រៀនឯកជន'],
    ['quiz', 'សំណួរខ្លី', '📝'],
  ],
  'checking-ai-answers': [
    ['check', 'ពិនិត្យ', '✅'],
    ['source', 'ប្រភព'],
    ['mistake', 'កំហុស'],
    ['trust', 'ទុកចិត្ត'],
  ],
  'ai-fairness': [
    ['fair', 'យុត្តិធម៌', '⚖️'],
    ['bias', 'ភាពលំអៀង'],
    ['equal', 'ស្មើភាព'],
    ['test', 'សាកល្បង'],
  ],
  'ai-privacy-and-safety': [
    ['privacy', 'ភាពឯកជន', '🔐'],
    ['personal', 'ផ្ទាល់ខ្លួន'],
    ['safety', 'សុវត្ថិភាព', '🛡️'],
    ['settings', 'ការកំណត់', '⚙️'],
  ],
  'ai-helps-you-code': [
    ['code', 'កូដ', '💻'],
    ['bug', 'កំហុសកម្មវិធី', '🐞'],
    ['suggest', 'ណែនាំ'],
    ['review', 'ពិនិត្យឡើងវិញ'],
  ],
  'ai-at-work': [
    ['job', 'ការងារ', '💼'],
    ['tool', 'ឧបករណ៍', '🛠️'],
    ['skill', 'ជំនាញ'],
    ['future', 'អនាគត', '🚀'],
  ],
  'responsible-ai': [
    ['honest', 'ស្មោះត្រង់'],
    ['rule', 'ច្បាប់'],
    ['careful', 'ប្រុងប្រយ័ត្ន'],
    ['respect', 'ការគោរព'],
  ],
};

export const ENGLISH_WORDS: Record<string, Word[]> = {
  'the-alphabet': [
    ['letter', 'អក្សរ'],
    ['vowel', 'ស្រៈ'],
    ['capital', 'អក្សរធំ'],
    ['small', 'អក្សរតូច'],
  ],
  'hello-and-goodbye': [
    ['hello', 'សួស្តី', '👋'],
    ['goodbye', 'លាហើយ'],
    ['please', 'សូម', '🙏'],
    ['thanks', 'អរគុណ'],
  ],
  'numbers-in-english': [
    ['one', 'មួយ', '1️⃣'],
    ['two', 'ពីរ', '2️⃣'],
    ['ten', 'ដប់', '🔟'],
    ['hundred', 'មួយរយ', '💯'],
  ],
  'colours-and-shapes': [
    ['red', 'ក្រហម', '🔴'],
    ['blue', 'ខៀវ', '🔵'],
    ['circle', 'រង្វង់', '⚪'],
    ['triangle', 'ត្រីកោណ', '🔺'],
  ],
  'my-family': [
    ['mother', 'ម្តាយ', '👩'],
    ['father', 'ឪពុក', '👨'],
    ['sister', 'បងប្អូនស្រី', '👧'],
    ['brother', 'បងប្អូនប្រុស', '👦'],
  ],
  'classroom-and-computer-words': [
    ['screen', 'អេក្រង់', '🖥️'],
    ['click', 'ចុច', '🖱️'],
    ['save', 'រក្សាទុក', '💾'],
    ['open', 'បើក', '📂'],
  ],
  'days-months-and-time': [
    ['today', 'ថ្ងៃនេះ'],
    ['tomorrow', 'ថ្ងៃស្អែក'],
    ['week', 'សប្តាហ៍'],
    ['month', 'ខែ', '📅'],
  ],
  'am-is-are': [
    ['am', 'ជា (ខ្ញុំ)'],
    ['is', 'ជា (គាត់/វា)'],
    ['are', 'ជា (យើង/ពួកគេ)'],
    ['not', 'មិន'],
  ],
  'i-you-he-she': [
    ['he', 'គាត់ (ប្រុស)'],
    ['she', 'នាង'],
    ['they', 'ពួកគេ'],
    ['their', 'របស់ពួកគេ'],
  ],
  'a-an-the-and-plurals': [
    ['apple', 'ផ្លែប៉ោម', '🍎'],
    ['book', 'សៀវភៅ', '📕'],
    ['boxes', 'ប្រអប់ច្រើន', '📦'],
    ['children', 'កុមារច្រើននាក់', '🧒'],
  ],
  'my-daily-routine': [
    ['wake', 'ភ្ញាក់', '⏰'],
    ['study', 'រៀន', '📚'],
    ['always', 'ជានិច្ច'],
    ['never', 'មិនដែល'],
  ],
  'have-has-can': [
    ['have', 'មាន'],
    ['can', 'អាច'],
    ['cannot', 'មិនអាច'],
    ['skill', 'ជំនាញ'],
  ],
  'asking-questions': [
    ['what', 'អ្វី'],
    ['where', 'ទីណា'],
    ['when', 'ពេលណា'],
    ['why', 'ហេតុអ្វី'],
  ],
  'in-on-under': [
    ['under', 'ក្រោម'],
    ['between', 'នៅចន្លោះ'],
    ['behind', 'នៅក្រោយ'],
    ['next to', 'ជាប់'],
  ],
  'english-for-it': [
    ['install', 'ដំឡើង'],
    ['update', 'ធ្វើបច្ចុប្បន្នភាព', '🔄'],
    ['error', 'កំហុស', '⚠️'],
    ['loading', 'កំពុងផ្ទុក', '⏳'],
  ],
};
