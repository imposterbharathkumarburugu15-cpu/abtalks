# ABTalks

## 60 Days. 60 Builds. Public Proof.

ABTalks is a **60-day coding challenge for college students**.

The idea is simple:

> **Build something real. Prove that you built it. Come back and build again.**

Instead of spending months collecting tutorials, certificates, and unfinished projects, ABTalks gives students a practical daily mission and turns the work they complete into a visible engineering record.

This project is a **frontend-first hackathon prototype** designed for a mobile-first experience, especially around a **390px phone viewport**.

---

# 1. What Problem Does ABTalks Solve?

Many students want to improve their coding skills, build projects, become active on GitHub, and create a strong LinkedIn presence.

The problem is consistency.

A normal learning journey often looks like:

```text
Watch a tutorial
      ↓
Practice a little
      ↓
Start another course
      ↓
Learn another technology
      ↓
Start a project
      ↓
Stop halfway
```

ABTalks changes that into:

```text
BUILD
  ↓
PROVE
  ↓
CONTINUE
  ↓
BUILD AGAIN
```

Every challenge day gives the student something practical to build.

The student then submits:

- GitHub repository/commit proof
- LinkedIn post proof

Over time, those submissions become a **public record of real work**.

---

# 2. The Main Idea

ABTalks is built around three actions:

## BUILD

Build something real.

Not another tutorial.

Not another copy-paste exercise.

A practical project that can become part of a portfolio.

## PROVE

Show that the work was actually shipped.

Students submit:

- GitHub proof
- LinkedIn proof

## CONTINUE

Come back tomorrow.

The goal is not a perfect 60-day streak.

The goal is to develop the habit of shipping.

---

# 3. Who Is ABTalks For?

ABTalks is designed primarily for:

- college students
- beginners learning development
- students preparing for placements
- students building their first portfolio
- developers who struggle with consistency
- students who want visible proof of their skills

The interface is especially designed for students who use the platform **on their phones after college**, often late at night.

---

# 4. How the App Works

A typical student journey looks like this:

```text
Open ABTalks
     ↓
See today's mission
     ↓
Understand what needs to be built
     ↓
Start building
     ↓
Use AB Coach if stuck
     ↓
Use Build Rescue if short on time
     ↓
Complete the core requirements
     ↓
Submit GitHub + LinkedIn proof
     ↓
Build becomes part of the public record
     ↓
Return tomorrow
```

---

# 5. Main Screens

The application is organized around a small number of focused experiences.

```text
/
│
├── /dashboard
│
├── /day/12
│
├── /journey
│
└── /proof
```

The required core routes are:

```text
/
/dashboard
/day/12
```

---

# 6. Home Page

Route:

```text
/
```

The Home page is designed for a student who has never heard of ABTalks.

The first thing they should understand is:

> **This is a 60-day challenge where I build something every day and create public proof of my work.**

The page introduces:

- the 60-day challenge
- the Build → Prove → Continue method
- the public proof concept
- the build journey
- Night Shift
- Build Rescue
- the AB Coach

The main action is:

```text
START YOUR 60-DAY JOURNEY →
```

---

# 7. Dashboard

Route:

```text
/dashboard
```

The Dashboard is the student's home screen after starting the challenge.

It answers three questions:

### 1. Where am I?

Example:

```text
DAY 12 / 60
11 DAY RUN
```

### 2. What should I do today?

Example:

```text
TONIGHT'S BUILD

URL SHORTENER

45 MIN · INTERMEDIATE

Turn long URLs into
short, shareable links.

[ ENTER MISSION → ]
```

### 3. How am I progressing?

The dashboard shows:

- current day
- build run
- build journey
- public proof
- recent builds
- next milestone

The dashboard intentionally avoids showing every possible statistic.

The goal is to make the student's next action obvious.

---

# 8. Daily Mission

Example route:

```text
/day/12
```

This is the focused workspace for one challenge day.

A mission contains:

- day number
- estimated time
- difficulty
- project title
- short explanation
- minimum requirements
- build checklist
- proof submission

Example:

```text
DAY 12 / 60

URL SHORTENER

45 MIN · INTERMEDIATE
```

Then:

```text
SHIP MINIMUM

01
Accept a valid URL

02
Generate a unique short code

03
Redirect to the original URL
```

The student then checks:

```text
BUILD CHECK

□ Works locally
□ Tested
□ Pushed to GitHub
```

Finally:

```text
PROOF OF WORK

GitHub repository
GitHub commit
LinkedIn post

[ SHIP BUILD → ]
```

The page is intentionally focused.

It does not overwhelm the student with the entire technical specification at once.

---

# 9. Build Rescue

## The main thoughtful student-experience feature

Real students do not have the same amount of time every day.

A student might have:

- exams
- assignments
- interviews
- college events
- travel
- placement preparation
- family responsibilities

A traditional coding challenge can make one difficult day feel like the entire challenge is ruined.

ABTalks handles this with:

## BUILD RESCUE

> **Short on time? Ship the core.**

For example, a normal URL Shortener mission could contain:

```text
□ Accept URL
□ Generate short code
□ Redirect
□ Analytics
□ Error handling
□ Tests
□ Documentation
```

Build Rescue reduces it to the essential outcome:

```text
SHIP THE CORE

✓ Accept URL
✓ Generate short code
✓ Redirect

~20 MIN
```

The student can still:

```text
Build
  ↓
Prove
  ↓
Continue
```

Build Rescue is not a failure state.

It represents a different principle:

> **Sustained shipping matters more than perfect days.**

---

# 10. Night Shift

ABTalks is designed around real student behavior.

Many students build late at night after college.

Night Shift is a focused mode for that situation.

Example:

```text
🌙 NIGHT SHIFT

Focused time.
Ship the core.
```

Night Shift can:

- reduce distractions
- emphasize the current mission
- show remaining focus time
- encourage completion of core requirements
- work together with Build Rescue

It is not just another color theme.

It represents a focused working state.

---

# 11. AB Coach

## Your build companion

AB Coach is the contextual assistant inside ABTalks.

It is intentionally different from a normal chatbot.

It understands the student's current context.

For example:

```text
DAY 12
11 BUILDS SHIPPED
CURRENT MISSION:
URL SHORTENER
```

AB Coach can say:

> You're on Day 12.  
> You've already shipped 11 builds.  
> Let's get today's one out too.

If the student is stuck:

> Stuck on requirement 2?  
> I have a hint.

The student can ask:

- Explain today's task
- Give me a hint
- I'm stuck
- What should I do next?
- Check my approach

AB Coach should encourage thinking instead of immediately giving complete solutions.

---

# 12. Missed-Day Recovery

Missing one day should not make the student feel like all previous progress disappeared.

ABTalks keeps the record honest.

Example:

```text
DAY 11
✓ SHIPPED

   │

DAY 12
MISSED

   │

DAY 13
CURRENT
```

The student sees:

> **Yesterday didn't happen.**
>
> Your previous builds are still yours.
> Let's get back in.

Action:

```text
GET BACK IN →
```

This turns recovery into part of the product instead of treating it as failure.

---

# 13. Public Proof Vault

Route:

```text
/proof
```

The Proof Vault is the student's public engineering record.

It is not a generic social profile.

It answers:

> **What has this student actually built?**

Example:

```text
PUBLIC RECORD

BHARATH'S BUILD LOG

11 BUILDS · 11 DAY RUN

Your learning, made visible.
```

Then the builds appear chronologically:

```text
11

REST API MOCK ENGINE

✓ VERIFIED

Aug 07 · Day 11

GitHub ↗
LinkedIn ↗

│

10

REACT DEVELOPER DASHBOARD

✓ VERIFIED

Aug 06 · Day 10

GitHub ↗
LinkedIn ↗
```

The timeline creates a visible history of the student's engineering work.

The core idea:

> **Don't just say you learned. Show what you shipped.**

---

# 14. Build Journey

The Journey represents the student's progress across the 60 days.

It should feel like an engineering trail rather than a generic calendar.

Example:

```text
DAY 01
✓

DAY 02
✓

DAY 03
✓

...

DAY 11
✓

DAY 12
CURRENT

DAY 13
○

...

DAY 60
○
```

The Journey helps students see:

- where they started
- where they are
- what they have shipped
- what remains

---

# 15. Navigation

The main navigation is:

```text
HOME
BUILDS
JOURNEY
PROOF
```

The Proof Vault uses **PROOF**, not PROFILE, because the public engineering record is one of the central product concepts.

---

# 16. Mobile-First Design

ABTalks is designed primarily for mobile.

The main judging viewport is:

```text
390px
```

The application should also work at:

```text
360px
414px
desktop
```

Important mobile requirements:

- no horizontal scrolling
- readable typography
- comfortable touch targets
- clear primary actions
- simple navigation
- no cramped header
- enough bottom spacing
- important information visible without unnecessary scrolling

The product should feel comfortable to use on a phone late at night.

---

# 17. Design Philosophy

ABTalks intentionally avoids the common AI/vibe-coded visual style.

We do not want:

- bright purple everywhere
- neon gradients
- excessive glowing cards
- cyberpunk interfaces
- excessive glassmorphism
- random 3D objects
- decorative effects without purpose

Instead, the interface uses a restrained editorial style.

### Color System

| Role | Color |
|---|---|
| Background | `#090B0D` |
| Secondary | `#0F1315` |
| Surface | `#14191B` |
| Elevated | `#191F21` |
| Border | `#252C2E` |
| Primary text | `#F1EEE7` |
| Secondary text | `#A6AAA8` |
| Muted text | `#6F7575` |
| Primary accent | `#69B39A` |
| Momentum | `#C58A52` |
| Technical | `#718A96` |
| Success | `#6FA889` |

The design should feel:

- calm
- technical
- human
- mature
- youthful
- editorial
- premium

The goal is:

> **Quietly impressive, not obviously AI-generated.**

---

# 18. Typography

Typography is used to create hierarchy.

We do not make every heading huge.

Each screen should have one main visual idea.

For example:

### Home

```text
60 DAYS.
60 BUILDS.
PUBLIC PROOF.
```

### Dashboard

```text
TONIGHT'S BUILD
```

### Mission

```text
URL SHORTENER
```

### Proof

```text
BHARATH'S BUILD LOG
```

Everything else supports the main idea.

---

# 19. Animation

Animations should communicate state.

Good examples:

- page entrance
- timeline progression
- checklist completion
- mission completion
- AB Coach appearance
- Night Shift transition
- button feedback

Avoid:

- constant pulsing
- particle backgrounds
- floating blobs
- excessive parallax
- giant animated gradients
- unnecessary 3D effects

Animations should feel purposeful.

The application should also respect:

```text
prefers-reduced-motion
```

---

# 20. Realistic Application States

The prototype should support realistic states.

## New Student

```text
0 BUILDS
0 DAY RUN
DAY 1 READY
```

## Active Student

```text
11 BUILDS
11 DAY RUN
DAY 12 CURRENT
```

## Missed Day

Show the missed day honestly.

## Build Rescue

Show when the student has limited time.

## Proof Submitted

Show GitHub and LinkedIn proof.

## Completed Challenge

```text
60 DAYS
60 BUILDS
ONE PUBLIC RECORD
```

Data should always remain consistent.

For example, do not show:

```text
60 BUILDS SHIPPED
```

while only displaying Day 11 records.

---

# 21. Example Student Data

The prototype can use mocked data such as:

```text
Name:
Bharath

Track:
AI / ML

Current Day:
12 / 60

Build Run:
11 days

Completed Builds:
11

GitHub Proof:
11 commits

LinkedIn Proof:
10 posts

Current Mission:
URL Shortener

Duration:
45 minutes

Difficulty:
Intermediate
```

This data is only demonstration data.

There is no production user account system in this prototype.

---

# 22. Technology

The project is designed as a frontend application.

Typical implementation:

- React
- Vite
- JavaScript or TypeScript
- CSS
- Lucide Icons
- Local/mock data

No production database is required for the prototype.

No authentication is required.

No real social-media publishing is required.

---

# 23. Project Structure

A possible structure:

```text
ABTalks/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── ABCoach/
│   │   ├── BuildCard/
│   │   ├── BottomNav/
│   │   ├── MissionCard/
│   │   ├── ProofTimeline/
│   │   └── Streak/
│   │
│   ├── pages/
│   │   ├── Home/
│   │   ├── Dashboard/
│   │   ├── Mission/
│   │   ├── Journey/
│   │   └── Proof/
│   │
│   ├── data/
│   │   └── mockData.js
│   │
│   ├── styles/
│   │   └── globals.css
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── README.md
├── AI_USAGE_LOG.md
├── package.json
└── ...
```

Adapt this structure to the actual implementation rather than changing the application just to match the example.

---

# 24. Installation

## Requirements

Install:

- Node.js
- npm

Check your installation:

```bash
node --version
npm --version
```

---

## Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

Move into the project:

```bash
cd ABTalks
```

Install dependencies:

```bash
npm install
```

---

## Run the application

```bash
npm run dev
```

Vite will provide a local URL, usually similar to:

```text
http://localhost:5173
```

Open that URL in your browser.

---

# 25. Build for Production

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

# 26. Routes

The main routes are:

```text
/
/dashboard
/day/12
```

Additional application routes can include:

```text
/journey
/proof
```

The required hackathon route map is:

```text
/
/dashboard
/day/12
```

---

# 27. How to Use the App

## Step 1 — Open the Home Page

Open:

```text
/
```

Understand the ABTalks challenge.

Click:

```text
START YOUR 60-DAY JOURNEY →
```

---

## Step 2 — Open the Dashboard

Go to:

```text
/dashboard
```

The dashboard shows your current state.

Look for:

```text
DAY 12 / 60
```

Then find:

```text
TONIGHT'S BUILD
```

This is the task you should work on.

---

## Step 3 — Enter the Mission

Click:

```text
ENTER MISSION →
```

You will reach:

```text
/day/12
```

Read:

- what you need to build
- how long it should take
- what the minimum requirements are

---

## Step 4 — Start Building

Complete the core requirements.

Use:

### AB Coach

if you need an explanation or hint.

Use:

### Night Shift

if you are working late and want a focused environment.

Use:

### Build Rescue

if you do not have enough time to complete the full mission.

---

## Step 5 — Complete the Build Check

Before submitting proof, verify:

```text
□ Works locally
□ Tested
□ Pushed to GitHub
```

---

## Step 6 — Submit Proof

Add:

```text
GitHub repository
GitHub commit
LinkedIn post
```

Then select:

```text
SHIP BUILD →
```

---

## Step 7 — View Your Record

Open:

```text
/proof
```

Your completed build appears in the public engineering timeline.

Over time this becomes your:

> **60-day public build record.**

---

# 28. Why GitHub + LinkedIn?

GitHub proves the technical work.

LinkedIn makes the work visible.

Together:

```text
GitHub
Technical proof
      +
LinkedIn
Public visibility
      =
Public proof of work
```

ABTalks connects both into the daily challenge loop.

---

# 29. Why Build Rescue Matters

The product is designed around a simple observation:

> Students do not fail challenges only because they lack motivation. Sometimes they simply do not have enough time.

Instead of treating a difficult day as failure, ABTalks gives the student a smaller path to completion.

This creates a healthier loop:

```text
Limited time
     ↓
Build Rescue
     ↓
Ship the core
     ↓
Submit proof
     ↓
Continue tomorrow
```

---

# 30. Why AB Coach Matters

AI should not be added simply because an application is expected to have AI.

AB Coach exists because students get stuck while building.

The assistant helps with:

- understanding requirements
- deciding what to do next
- getting hints
- reviewing an approach
- recovering from confusion

It supports the learning process without replacing the student's work.

---

# 31. Why Night Shift Matters

ABTalks is designed around the real behavior of its audience.

Students often work on projects after college.

Night Shift turns that constraint into a product experience:

```text
Late night
    ↓
Focus
    ↓
Ship core
    ↓
Submit proof
```

The goal is to help students finish meaningful work without adding unnecessary pressure.

---

# 32. Product Philosophy

ABTalks is not trying to solve:

> "How do we give students more coding tutorials?"

There are already thousands of tutorials available.

ABTalks focuses on a different problem:

> **How do we help students consistently turn learning into visible proof of work?**

The platform connects:

```text
LEARNING
    ↓
BUILDING
    ↓
PROOF
    ↓
PUBLIC VISIBILITY
```

---

# 33. Final Vision

After 60 days, the student should not only be able to say:

> "I learned React."

They should be able to say:

> "I built something with React."

And then show it.

After the full challenge:

```text
60 DAYS
60 BUILDS
ONE PUBLIC RECORD
```

That is what ABTalks is trying to create.

---

# 34. Future Improvements

The current prototype can eventually grow into:

- multiple challenge tracks
- personalized missions
- team challenges
- mentor feedback
- project reviews
- verified GitHub activity
- LinkedIn integration
- portfolio generation
- recruiter discovery
- community showcases
- adaptive challenge difficulty
- richer AI coaching
- college leaderboards

These are future possibilities, not requirements for the current prototype.

---

# 35. Hackathon Scope

This prototype intentionally focuses on the student-facing experience.

### Included

- mobile-first UI
- landing page
- dashboard
- daily mission
- journey
- proof vault
- Build Rescue
- Night Shift
- AB Coach
- realistic mock data
- responsive design

### Not required

- authentication
- production database
- real recruiter dashboard
- admin panel
- real social media posting
- production-scale infrastructure

---

# 36. Design Principles

### Keep the next action obvious.

A student should know what to do within seconds.

### Do not punish recovery.

Missing a day should not erase motivation.

### Make progress visible.

The journey should feel tangible.

### Turn work into proof.

Every completed mission should contribute to the student's record.

### Use AI where it helps.

AB Coach exists to guide the student, not replace them.

### Prefer restraint.

Every visual element should have a reason to exist.

---

# 37. The ABTalks Loop

```text
DISCOVER
    ↓
BUILD
    ↓
GET UNSTUCK
    ↓
SHIP
    ↓
PROVE
    ↓
CONTINUE
    ↓
BUILD A PUBLIC RECORD
```

---

# 38. Final Thought

The internet already gives students endless ways to learn.

The harder part is getting them to **ship consistently**.

ABTalks is built around that idea.

Not:

> Learn more.

But:

> **Build more. Prove more. Keep going.**

---

## ABTalks

### **60 Days. 60 Builds. Public Proof.**

Built for students who are ready to ship.
