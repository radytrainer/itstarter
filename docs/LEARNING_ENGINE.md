# Learning engine

Every lesson is **data**. One lesson player plays any lesson stored in PostgreSQL; there are no
lesson-specific screens. This guide is for whoever adds content (seed files now, the admin dashboard from
Phase 13) and for developers adding new activity types.

## Structure

```
Course → World → Lesson → Activity (one per step) → Question → Options
```

Every lesson follows six steps, one activity each, in `position` order:

| Step        | Typical activity type                                  | Scored? |
| ----------- | ------------------------------------------------------ | ------- |
| `welcome`   | `intro`: big emoji and a friendly sentence             | no      |
| `learn`     | `learn_card`: 2–4 short cards                          | no      |
| `see`       | `see_example`: one worked example (or prompt "levels") | no      |
| `play`      | `multiple_choice`, `matching`, `true_false`, ...       | yes     |
| `challenge` | `number_input`, `ordering`, `safe_or_dangerous`, ...   | yes     |
| `reward`    | `reward`: celebration message                          | no      |

Target: **5–10 minutes**. Keep sentences short and simple; many students are not confident in English.

## Two golden rules

1. **`activities.config` is public**: it is sent to the phone. Never put answers in it.
   Answers belong in `questions.config` (e.g. `{ "answer": 25 }`) and in `question_options`
   (`is_correct`, `match_key`, `correct_order`). The API strips all of these before sending a lesson.
2. **Feedback is always encouraging.** Write hints as clues ("Each number grows by 2."), and explanations
   as the reasoning ("8 + 2 = 10"). Never "wrong" or "failed".

## Question kinds

| `questions.kind`    | Student does                                        | Answer data (private)                                                     |
| ------------------- | --------------------------------------------------- | ------------------------------------------------------------------------- |
| `single_choice`     | taps one option                                     | exactly one option with `is_correct = true`                               |
| `true_false`        | taps True / False                                   | `config.answer`: `true` or `false`                                        |
| `number`            | types a number (`6.5`, `6,5`, `$6.50` all work)     | `config.answer`: a number                                                 |
| `safe_or_dangerous` | taps Safe / Dangerous                               | `config.answer`: `"safe"` or `"dangerous"`                                |
| `matching`          | taps a left item, then its partner                  | options with `group_key` `left`/`right`; partners share a `match_key`     |
| `ordering`          | puts items in order with ▲▼                         | `correct_order` 1..n on every option                                      |
| `generated`         | types a number (fresh numbers each replay)          | `config.generator` (see below); the answer is re-created, never stored    |
| `key_combo`         | taps keys on an on-screen keyboard                  | `config.answer`: e.g. `["Ctrl", "C"]` (order and case don't matter)       |
| `categorize`        | drags (or taps) items into groups                   | options `group_key` `bucket`/`item`; an item's `match_key` = its bucket's |
| `cell_select`       | taps a cell in a spreadsheet                        | `config.answer`: e.g. `"B3"`; the sheet is in `public_config.grid`        |
| `format_text`       | uses a B/I/U/size/alignment toolbar                 | `config.answer`: only the properties the task asks for                    |
| `prompt_builder`    | picks one piece per part (role/task/context/format) | one `is_correct` option per `group_key`                                   |
| `catch` 🎮          | taps the right items as they fall (or a still grid) | options to catch have `is_correct = true`; the others are left to fall    |
| `memory` 🎮         | turns cards over to find pairs                      | two cards per `match_key`; the phone gets a hashed pair code only         |
| `robot` 🎮          | programs a robot with arrows and repeat blocks      | the board is public (`public_config.robot`); the API runs the program     |
| `word_builder` 🎮   | spells with letter tiles, builds sentences, types   | `config.answer` (+ optional `config.accept`); tiles are the options       |

Each question can also have `hint` (shown after a wrong try or on request), `explanation` (shown after
answering correctly or once revealed), `difficulty` 1–3, and **`public_config`**: data shown with the
question. It is sent to the phone, so it must never contain answers. Examples: a mock email
(`{ mock: { type: 'email', … } }`), a web address, a search box, an AI chat, a spreadsheet grid, or the
keys of the on-screen keyboard.

The seed tests check every question: one correct choice, an expected answer of the right type, complete
matching pairs, ordering 1..n with no gaps, items that belong to real groups, one best piece per prompt
part, cells inside their sheet, real generator names, and no answers in any public data. They also check
that **every badge can be earned** with the content that exists.

## Words to know 📖

Every lesson has a **"Words to know"** round right after the example (activity type `vocabulary`,
step `learn`, +10 XP): memory cards that match 3–4 IT words to their Khmer meaning, then the student
listens 🔊 and spells one of the words with letter tiles. It uses the same "try again" mode as games.
The word lists live next to the lessons (`lessons/vocab-1.ts`, `vocab-2.ts`, and inside each lesson
plan of the newer worlds); `vocab()` in `dsl.ts` builds the round. The **IT Vocabulary** world goes
further: 15 themed lessons (hardware, email, security, error messages, IT jobs, asking for help…) whose
quizzes are built from word data — Khmer meaning, what the word does, and the word in a sentence.

## Games 🎮

Every lesson has a **game round** just before the reward (activity type `game`, step `challenge`,
1–3 games). Games use **"try again" mode**: a wrong try restarts the game; after 2 tries the right
answer is shown. Catch, memory and robot **check themselves** when they end (no Check button while
playing). The rules live in `packages/shared/src/games.ts`, so the phone (animation) and the API
(checking) always agree:

- **Robot:** `runRobot(board, program)` → goal / wall / edge / short / missing items / too many blocks.
  A repeat block counts as 1 + the arrows inside it; `maxBlocks` teaches loops. `solveRobot` finds a
  shortest route (shown after two tries) and the seed test proves every board can be solved within
  its block limit.
- **Catch:** right only when every target and nothing else is caught. The phone does not know the
  targets, so the basket is neutral until the answer comes back. A still version (no movement) is
  used with "reduce motion" and for keyboards/screen readers.
- **Memory:** right when all pairs are found; the score drops gently with more turns
  (`200 × pairs ÷ turns`, max 100) and is stored with the attempt.
- **Word builder:** compares ignoring capitals, extra spaces and a final `.?!`.

Any question can have `public_config.speak`: a 🔊 **Listen** button reads that English aloud with the
phone's own voice (Web Speech API, no download). Learn cards can have `say` too. Used throughout the
English world.

## Generated maths (Math Playground)

`{ kind: 'generated', config: { generator: 'multiplication' }, difficulty: 2 }` makes a new question from
a seed: **student + question + how many times they finished the lesson**.

- **Reload:** the same numbers.
- **Replay** after finishing: new numbers.
- **Checking:** the server re-creates the same question, so the answer is never sent or stored.

Generators (`apps/api/src/engine/generators.ts`; English + Khmer text, difficulty 1–3): `addition`, `subtraction`,
`multiplication`, `division` (always exact), `percent_of`, `money_change`, `money_total`, `time_minutes`,
`sequence`, `missing_number`, `place_value`, `rounding`, `order_of_operations`, `fraction_of`,
`unit_convert`, `rectangle` (area or perimeter). Each one gives a clue and a worked explanation that shows
the answer.

> The architecture planned to keep "challenge state" in Redis. Re-creating the question from a seed
> does the same job with nothing to store, nothing to expire mid-question on a slow phone, and it
> keeps working when Redis is down.

## Other activity types

| `activities.type` | What happens                                                                                                                                                                                                                                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `mouse_trainer`   | Practice game: tap, double-tap, press-and-hold (right-click), drag, scroll (`config.tasks`). Works with a real mouse too; can be skipped for accessibility. Not scored.                                                                                                                                      |
| `creation`        | Creative work saved to `student_creations` (`PUT /api/activities/:id/creation`). Templates: `document` (My Profile), `slides` (My Dream), `budget` (My Weekly Budget, with a live total), `prompt` (My Own Prompt). Only the fields in `config.fields` are accepted, each with a length limit. Never graded. |

## Badges and achievements

When a lesson is completed, `evaluateAwards()` (`apps/api/src/modules/gamification/awards.ts`) runs in
the same transaction. It checks every rule (`world_completed`, `course_completed`, `lessons_completed`,
`xp_reached`, `streak_days`, `activity_type_completed`) against the student's real data. New ones are:

- **Awarded** exactly once (primary keys).
- **Rewarded:** an achievement's bonus XP goes through the XP ledger, so it is also only given once.
- **Announced:** a notification is created (`GET /api/notifications`).
- **Celebrated** on the reward screen.

Bonus XP that crosses an XP milestone unlocks that milestone straight away. Badge rules are data (the
`badges` and `achievements` tables), so admins can change them later without code changes.

## How answering works

1. The phone sends `{ questionId, answer }` to `POST /api/activities/:id/answer`. The **server** checks it
   (`apps/api/src/engine/checkers.ts`).
2. What happens next depends on the activity's `config.feedback`:
   - **`retry`** (the default for new activities made in the admin area): wrong → encouragement + the hint
     (matching and ordering also say "2 of 3 are right"). Wrong a **second** time → the answer and
     explanation are revealed and pre-filled; the student presses Check to confirm it themselves.
   - **`reveal`** (every built-in lesson): the **first** Check always shows the
     right answer and the explanation (the student's own choice stays on screen), then **Next**. No
     retries; the question counts as done whether it was right or not.
     Admins can switch an activity's mode in the lesson editor (Settings → config `{"feedback": "reveal"}`).
3. An activity is complete when every question is done: answered correctly once (`retry`) or answered
   at all (`reveal`). Its XP is awarded **once**.
4. `POST /api/lessons/:id/complete` (sent by the reward step) requires every scored activity to be complete.
   It awards the lesson's bonus XP once, and updates the streak, today's activity, world progress and level
   (announcing level-ups).

Options are shuffled per student (stable on reload), so the right answer isn't always first. An ordering
question never arrives already in order.

**Score** (`best_score`) = % of questions answered correctly on the **first** try. Used for analytics and
"difficult activity" reports; it never blocks progress.

## XP

| Source          | XP (seed default) | Awarded                     |
| --------------- | ----------------- | --------------------------- |
| Scored activity | 10–15             | first completion only       |
| Lesson bonus    | 50                | first completion only       |
| Content steps   | 0                 | (configurable per activity) |

Duplicates are impossible: `xp_transactions` has a unique `(student, source_type, source_id)` key, and each
student's learning writes take a row lock. A test fires 8 identical answers at once; exactly one awards XP.

Levels: 🌱 0 · 🔍 300 · 🛠️ 900 · 🤖 1800 · 🚀 3000 XP (table `levels`, editable).

## Adding a lesson (until the admin dashboard exists)

1. Add a `LessonSeed` to `apps/api/src/db/seed/data/` (see `sample-lessons.ts`). Use `t('English', 'ខ្មែរ')`
   for text.
2. `npm run db:seed`. Existing lessons are never overwritten.
3. `npm run test:integration`: the seed tests validate every question, and the learning tests play
   **every lesson to completion**.

## Adding a new question kind

1. Shared answer shape: `answerSchemas` in `packages/shared/src/play.ts`.
2. Checker: a `case` in `apps/api/src/engine/checkers.ts`, plus unit tests.
3. Input component: `apps/web/src/components/learning/questions/<kind>.tsx`, registered in `registry.ts`.

Unknown kinds don't crash the player: students see "coming soon" and can skip.

## API

| Endpoint                                    | Who       | Purpose                                              |
| ------------------------------------------- | --------- | ---------------------------------------------------- |
| `GET /api/lessons/:id`                      | signed in | lesson for playing (no answers) + own progress       |
| `GET /api/activities/:id`                   | signed in | one activity (no answers)                            |
| `POST /api/lessons/:id/start`               | student   | mark started / count a replay                        |
| `POST /api/activities/:id/answer`           | student   | check an answer                                      |
| `POST /api/activities/:id/complete`         | student   | finish an unscored (content) step                    |
| `POST /api/lessons/:id/time`                | student   | active seconds (1–600) while a lesson is open        |
| `POST /api/lessons/:id/complete`            | student   | finish the lesson → XP, level, streak, progress      |
| `GET /api/progress/performance`             | student   | own performance & learning habit                     |
| `GET /api/teacher/students/:id/performance` | staff     | one student's performance & commitment (class scope) |
| `GET /api/progress`                         | student   | dashboard                                            |
| `GET /api/worlds/:id`                       | signed in | world with lessons (+ own status for students)       |
| `GET /api/badges`, `/achievements`          | signed in | all badges/achievements with earned state            |

Staff can open any lesson in **preview mode** (no answers are sent or recorded).

## Tracking performance and commitment

- **Every answer** is stored (`student_activity_attempts`) with right/wrong, a score and the time
  taken, including game moves (e.g. memory turns) inside the answer.
- **Active time:** the lesson player counts seconds only while the page is visible and the student
  touched, typed or scrolled in the last 2 minutes. It reports them about once a minute and when the
  student leaves (`keepalive`), so time counts even for unfinished lessons. It goes to the lesson
  (`time_spent_seconds`, capped at 20 h) and to the day (`student_daily_activity.seconds_active`).
- **Accuracy** = right on the **first** try, per world, per skill and per week; not shown under 5
  answers.
- **Commitment (0–100)** over the last 4 weeks: days learned (40%, target 12), active minutes (30%,
  target 120) and lessons finished (30%, target 8), each capped at 100% so doing a lot of one thing
  cannot hide another. Levels: not started · getting started (<40) · steady (40–69) · strong (70+).
  One formula (`commitmentScore` in `packages/shared/src/performance.ts`) is used by the API, the
  progress list (SQL for sorting, same weights) and tests.
- **Who sees it:** staff on the student page ("Performance & commitment") and as a sortable
  **Commitment** column in Learning progress / CSV; students on **My progress** (`/progress`) in
  encouraging words: habit, strengths and "practise a little more".
