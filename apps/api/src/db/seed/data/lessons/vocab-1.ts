import type { Word } from '../dsl';

// 📖 "Words to know" for Math, Logic and Computer Explorer, by lesson slug (4 words each).
// English term, Khmer meaning (DRAFT for native review), optional emoji.

export const MATH_WORDS: Record<string, Word[]> = {
  'adding-and-subtracting': [
    ['add', 'បូក', '➕'],
    ['subtract', 'ដក', '➖'],
    ['sum', 'ផលបូក'],
    ['difference', 'ផលដក'],
  ],
  'times-tables': [
    ['multiply', 'គុណ', '✖️'],
    ['product', 'ផលគុណ'],
    ['table', 'តារាង'],
    ['double', 'ទ្វេដង'],
  ],
  'sharing-and-dividing': [
    ['divide', 'ចែក', '➗'],
    ['share', 'ចែករំលែក'],
    ['equal', 'ស្មើ', '🟰'],
    ['remainder', 'សំណល់'],
  ],
  'missing-numbers': [
    ['missing', 'បាត់'],
    ['number', 'លេខ', '🔢'],
    ['equation', 'សមីការ'],
    ['solve', 'ដោះស្រាយ'],
  ],
  'number-patterns': [
    ['pattern', 'លំនាំ'],
    ['sequence', 'លំដាប់'],
    ['next', 'បន្ទាប់'],
    ['rule', 'ច្បាប់'],
  ],
  'place-value': [
    ['digit', 'ខ្ទង់លេខ'],
    ['ones', 'រាយ'],
    ['tens', 'ដប់'],
    ['hundreds', 'រយ'],
  ],
  'rounding-and-estimating': [
    ['round', 'បង្គត់'],
    ['estimate', 'ប៉ាន់ស្មាន'],
    ['nearest', 'ជិតបំផុត'],
    ['about', 'ប្រហែល'],
  ],
  'order-of-operations': [
    ['brackets', 'វង់ក្រចក'],
    ['order', 'លំដាប់'],
    ['first', 'ដំបូង'],
    ['calculate', 'គណនា', '🧮'],
  ],
  fractions: [
    ['fraction', 'ប្រភាគ'],
    ['half', 'ពាក់កណ្តាល', '🌗'],
    ['quarter', 'មួយភាគបួន'],
    ['whole', 'ទាំងមូល'],
  ],
  percentages: [
    ['percent', 'ភាគរយ', '💯'],
    ['discount', 'បញ្ចុះតម្លៃ', '🏷️'],
    ['total', 'សរុប'],
    ['part', 'ផ្នែក'],
  ],
  'money-maths': [
    ['money', 'លុយ', '💵'],
    ['price', 'តម្លៃ', '🏷️'],
    ['change', 'លុយអាប់'],
    ['coin', 'កាក់', '🪙'],
  ],
  'shopping-maths': [
    ['buy', 'ទិញ', '🛒'],
    ['sell', 'លក់'],
    ['cost', 'ថ្លៃ'],
    ['receipt', 'បង្កាន់ដៃ', '🧾'],
  ],
  'telling-time': [
    ['hour', 'ម៉ោង', '🕐'],
    ['minute', 'នាទី'],
    ['clock', 'នាឡិកា', '⏰'],
    ['half past', 'កន្លះ'],
  ],
  'measuring-units': [
    ['metre', 'ម៉ែត្រ', '📏'],
    ['kilogram', 'គីឡូក្រាម', '⚖️'],
    ['litre', 'លីត្រ', '🥛'],
    ['measure', 'វាស់'],
  ],
  'area-and-perimeter': [
    ['area', 'ក្រឡាផ្ទៃ'],
    ['perimeter', 'បរិមាត្រ'],
    ['square', 'ការេ', '🟦'],
    ['rectangle', 'ចតុកោណកែង'],
  ],
};

export const LOGIC_WORDS: Record<string, Word[]> = {
  'logic-puzzles': [
    ['logic', 'តក្កវិជ្ជា', '🧩'],
    ['puzzle', 'ល្បែងផ្គុំ'],
    ['step', 'ជំហាន', '👣'],
    ['plan', 'ផែនការ'],
  ],
  'odd-one-out': [
    ['different', 'ខុសគ្នា'],
    ['same', 'ដូចគ្នា'],
    ['group', 'ក្រុម'],
    ['odd', 'ប្លែក'],
  ],
  'shape-and-symbol-patterns': [
    ['shape', 'រូបរាង', '🔺'],
    ['symbol', 'និមិត្តសញ្ញា'],
    ['repeat', 'ធ្វើម្តងទៀត', '🔁'],
    ['pattern', 'លំនាំ'],
  ],
  analogies: [
    ['analogy', 'ការប្រៀបធៀប'],
    ['pair', 'គូ'],
    ['relation', 'ទំនាក់ទំនង'],
    ['opposite', 'ផ្ទុយ'],
  ],
  'comparing-and-ordering': [
    ['bigger', 'ធំជាង'],
    ['smaller', 'តូចជាង'],
    ['compare', 'ប្រៀបធៀប', '⚖️'],
    ['order', 'លំដាប់'],
  ],
  'all-some-none': [
    ['all', 'ទាំងអស់'],
    ['some', 'ខ្លះ'],
    ['none', 'គ្មាន'],
    ['true', 'ពិត', '✅'],
  ],
  'if-then-rules': [
    ['if', 'ប្រសិនបើ'],
    ['then', 'នោះ'],
    ['rule', 'ច្បាប់'],
    ['condition', 'លក្ខខណ្ឌ'],
  ],
  'and-or-not': [
    ['and', 'និង'],
    ['or', 'ឬ'],
    ['not', 'មិន'],
    ['false', 'មិនពិត', '❌'],
  ],
  'step-by-step-algorithms': [
    ['algorithm', 'ក្បួនដោះស្រាយ'],
    ['instruction', 'សេចក្តីណែនាំ'],
    ['order', 'លំដាប់'],
    ['start', 'ចាប់ផ្តើម', '▶️'],
  ],
  'loops-and-repeats': [
    ['loop', 'រង្វិលជុំ', '🔁'],
    ['repeat', 'ធ្វើម្តងទៀត'],
    ['times', 'ដង'],
    ['stop', 'ឈប់', '⏹️'],
  ],
  'find-the-bug': [
    ['bug', 'កំហុសកម្មវិធី', '🐞'],
    ['debug', 'កែកំហុស'],
    ['error', 'កំហុស'],
    ['test', 'សាកល្បង', '🧪'],
  ],
  'sorting-and-grouping': [
    ['sort', 'តម្រៀប'],
    ['group', 'ក្រុម'],
    ['list', 'បញ្ជី', '📋'],
    ['category', 'ប្រភេទ'],
  ],
  'calendar-logic': [
    ['calendar', 'ប្រតិទិន', '📅'],
    ['week', 'សប្តាហ៍'],
    ['month', 'ខែ'],
    ['date', 'កាលបរិច្ឆេទ'],
  ],
  'directions-and-maps': [
    ['map', 'ផែនទី', '🗺️'],
    ['left', 'ឆ្វេង', '⬅️'],
    ['right', 'ស្តាំ', '➡️'],
    ['route', 'ផ្លូវ'],
  ],
  'riddles-and-brain-teasers': [
    ['riddle', 'ល្បិច'],
    ['clue', 'តម្រុយ', '🔍'],
    ['answer', 'ចម្លើយ'],
    ['think', 'គិត', '🤔'],
  ],
};

export const COMPUTER_WORDS: Record<string, Word[]> = {
  'what-is-a-computer': [
    ['computer', 'កុំព្យូទ័រ', '💻'],
    ['input', 'ការបញ្ចូល'],
    ['output', 'ការបញ្ចេញ'],
    ['process', 'ដំណើរការ', '⚙️'],
  ],
  'computer-parts': [
    ['monitor', 'អេក្រង់', '🖥️'],
    ['keyboard', 'ក្តារចុច', '⌨️'],
    ['mouse', 'កណ្តុរ', '🖱️'],
    ['speaker', 'ឧបករណ៍បំពងសំឡេង', '🔊'],
  ],
  'hardware-and-software': [
    ['hardware', 'ផ្នែករឹង'],
    ['software', 'ផ្នែកទន់'],
    ['program', 'កម្មវិធី'],
    ['device', 'ឧបករណ៍', '📱'],
  ],
  'start-and-shut-down': [
    ['power', 'ថាមពល', '⏻'],
    ['restart', 'ចាប់ផ្តើមឡើងវិញ', '🔄'],
    ['shut down', 'បិទ'],
    ['sleep', 'ដេក', '😴'],
  ],
  'using-the-mouse': [
    ['click', 'ចុច', '👆'],
    ['cursor', 'ទស្សន៍ទ្រនិច'],
    ['pointer', 'សញ្ញាចង្អុល'],
    ['double-click', 'ចុចពីរដង'],
  ],
  'right-click-and-drag': [
    ['drag', 'អូស'],
    ['drop', 'ទម្លាក់'],
    ['menu', 'ម៉ឺនុយ', '📜'],
    ['scroll', 'រំកិល'],
  ],
  'the-keyboard': [
    ['key', 'គ្រាប់ចុច', '🔑'],
    ['enter', 'បញ្ចូល'],
    ['space', 'ដកឃ្លា'],
    ['shift', 'ប្តូរអក្សរ'],
  ],
  'typing-skills': [
    ['type', 'វាយអក្សរ', '⌨️'],
    ['letter', 'អក្សរ'],
    ['word', 'ពាក្យ'],
    ['speed', 'ល្បឿន', '⚡'],
  ],
  'copy-and-paste': [
    ['copy', 'ចម្លង', '📋'],
    ['paste', 'បិទភ្ជាប់'],
    ['cut', 'កាត់', '✂️'],
    ['undo', 'មិនធ្វើវិញ', '↩️'],
  ],
  'more-shortcuts': [
    ['shortcut', 'ផ្លូវកាត់'],
    ['save', 'រក្សាទុក', '💾'],
    ['find', 'ស្វែងរក', '🔍'],
    ['select', 'ជ្រើសរើស'],
  ],
  'operating-systems': [
    ['system', 'ប្រព័ន្ធ'],
    ['update', 'ធ្វើបច្ចុប្បន្នភាព', '🔄'],
    ['install', 'ដំឡើង'],
    ['desktop', 'ផ្ទៃតុ', '🖥️'],
  ],
  'files-and-folders': [
    ['file', 'ឯកសារ', '📄'],
    ['folder', 'ថត', '📁'],
    ['name', 'ឈ្មោះ'],
    ['open', 'បើក', '📂'],
  ],
  'organise-your-files': [
    ['rename', 'ប្តូរឈ្មោះ'],
    ['move', 'ផ្លាស់ទី'],
    ['delete', 'លុប', '🗑️'],
    ['search', 'ស្វែងរក', '🔍'],
  ],
  'storage-and-memory': [
    ['storage', 'ការផ្ទុក', '💽'],
    ['memory', 'ការចងចាំ'],
    ['cloud', 'ពពក', '☁️'],
    ['gigabyte', 'ជីកាបៃ'],
  ],
  'download-and-upload': [
    ['download', 'ទាញយក', '⬇️'],
    ['upload', 'ផ្ទុកឡើង', '⬆️'],
    ['attachment', 'ឯកសារភ្ជាប់', '📎'],
    ['link', 'តំណ', '🔗'],
  ],
};
