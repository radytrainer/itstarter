# Final QA — real phones (Phase 19)

Automated tests cover a lot (see [TESTING.md](TESTING.md)). This checklist covers what only people
on **real devices** can judge. Run it on **https://itstarter.store** before inviting a class, and again
after big changes. Tick each line, write a note for anything odd, and sign at the bottom.

## Devices to use

- [ ] **Low-cost Android** (2–3 GB RAM, Chrome), e.g. what most students own
- [ ] **iPhone** (Safari)
- [ ] **School computer** (Chrome or Edge, with a mouse and keyboard)
- [ ] One test over **school Wi-Fi** and one over **mobile data (3G/4G)**

## 1. A new student (do it on the Android phone)

- [ ] Open itstarter.store → it shows the login page, with the 🔒 padlock in the address bar
- [ ] Tap **Create a student account**, sign up with a real name, a username and a password.
      The hints are clear, and you land on your dashboard
- [ ] Switch language to **ខ្មែរ** and back: everything changes, and the Khmer text reads correctly
      (write down any wording that sounds wrong; all Khmer is a draft)
- [ ] Log out, log in again with the new username and password
- [ ] A wrong password shows a kind message (never "WRONG" or "FAILED")

## 2. Learning (Android and iPhone)

- [ ] Open a lesson in **every world**: Math, Logic, Computer, Office, Internet, AI, English
- [ ] Every step fits the screen (no sideways scrolling); the buttons are easy to tap
- [ ] Answer questions right and wrong: you see the answer and a short explanation
- [ ] 🎮 **Game time** in at least 4 lessons:
  - [ ] **Catch:** items fall smoothly; tapping catches them; "Play without moving items" also works
  - [ ] **Memory cards:** cards flip; pairs stay up; the game checks itself
  - [ ] **Robot:** arrows and 🔁 repeat build a program; ▶ Run moves the robot; a bump explains why
  - [ ] **Word builder:** letter and word tiles, and typing, all work
- [ ] 🔊 **Listen** (English world) reads the word aloud; 🐢 reads it slowly
      (note any phone with no voice)
- [ ] Finish a lesson → 🎉 reward screen with XP; the world's progress bar goes up
- [ ] Leave a lesson halfway, come back later → it continues where you stopped
- [ ] **My progress** shows days learned, minutes and strengths after a few lessons

## 3. App and offline

- [ ] **Android:** "Install IT Starter" (or the browser menu → Install app) → the icon on the home screen opens full-screen
- [ ] **iPhone:** Share → Add to Home Screen → opens like an app
- [ ] Turn on airplane mode and open a page → the friendly "You are offline" page (EN + KM), not an error
- [ ] Turn the network back on → "Try again" returns to the app

## 4. Teacher and admin (school computer)

- [ ] Log in as admin. The home page shows **"N new students have no class yet"** → put the student from step 1 in a class
- [ ] Create a teacher account with the class; log in as the teacher (other browser) → they see only their class
- [ ] **Learning progress:** the new student appears; sort by Commitment; download the CSV and open it in Excel (Khmer names readable)
- [ ] Open the student → **Performance & commitment** shows their activity
- [ ] **Reset a student's password** → the student logs in with the temporary one and must choose a new one
- [ ] Edit a lesson's wording in **Content**, preview it, and see it as a student
- [ ] **Analytics** loads for the last 7 / 30 days
- [ ] **Change the admin password** (Profile) if not done yet

## 5. Accessibility (10 minutes)

- [ ] **Android TalkBack** on: log in and answer one question; every button is read out with a sensible name
- [ ] **iPhone VoiceOver** on: the same
- [ ] School computer, **keyboard only** (Tab, Enter, Space, number keys 1–4): log in and answer a question
- [ ] Phone text size set to **large** in settings: pages still fit and stay readable

## 6. Many students at once (with a class)

- [ ] 20–40 students sign up / log in in the **same 5 minutes** from the school Wi-Fi: nobody is blocked
      (the site allows 40 new accounts per hour per network; ask the admin to create more if needed)
- [ ] Everyone does a lesson at the same time: pages stay quick (note anything slower than ~3 s)

## Results

| Area                 | Android | iPhone | Computer | Notes |
| -------------------- | ------- | ------ | -------- | ----- |
| 1. New student       |         |        |          |       |
| 2. Learning          |         |        |          |       |
| 3. App and offline   |         |        | —        |       |
| 4. Teacher and admin | —       | —      |          |       |
| 5. Accessibility     |         |        |          |       |
| 6. Many at once      |         |        |          |       |

Tested by: ____________________ Date: ____________ Version (bottom of /api/health): ____________

**Sign-off:** the site is ready for students ☐ yes ☐ not yet (see notes)

## Already measured automatically (2026-10-02, live site)

- **Lighthouse, mobile phone on slow 4G:**
  - Login: speed 89, accessibility 100, best practices 96. Main content in 3.0 s, 384 KB.
  - Offline page: 96 / 100 / 100. 2.3 s, 286 KB.
- **Smoke test on https://itstarter.store:** HTTPS (Let's Encrypt), HSTS, security headers, http→https and www→domain redirects, admin login with a secure cookie, admin pages with no blocked scripts. All passed.
- **CI on every change:** ~540 automated tests, including real-browser tests at phone sizes and WCAG 2.1 AA accessibility scans in English and Khmer.
