# ABTalks — AI Prompt & Development Log

> **Project:** ABTalks — 60-Day Public Proof Coding Challenge  
> **Repository:** ABTalks  
> **Last updated:** 2026-08-09  
> **Primary viewport:** 390px mobile  
>
> This document records the AI-assisted product and development process behind ABTalks. It connects the major prompts and product decisions to features that appear in the submitted application.

---

## 1. What We Were Building

ABTalks is a 60-day coding challenge for college students.

The product loop is:

```text
BUILD
  ↓
PROVE
  ↓
CONTINUE
```

Every day, a student receives a practical engineering challenge.

The student:

1. Understands the day's mission.
2. Builds the required project.
3. Submits GitHub proof.
4. Shares LinkedIn proof.
5. Continues to the next day.

The long-term result is a public record of real work rather than only a list of courses or certificates.

### Product North Star

```text
A PERSONAL ENGINEERING JOURNAL
+
A 60-DAY ACCOUNTABILITY SYSTEM
+
A PUBLIC PORTFOLIO
```

---

# 2. Initial Product Prompt

### Prompt

> Build ABTalks, a 60-day coding challenge platform for Indian college students.
>
> Students should build one practical engineering project every day, submit GitHub and LinkedIn proof, and maintain a visible record of their progress.
>
> The core loop should be BUILD → PROVE → CONTINUE.
>
> The experience should feel like an engineering journey, not another course platform.
>
> Prioritize clarity, consistency, visible progress, and proof of work.

### Resulting Direction

The first product structure focused on:

- Home
- Dashboard
- Daily Challenge
- 60-Day Journey
- Public Proof
- Student progress

---

# 3. First-Time User Experience

A new student should understand ABTalks without needing prior context.

### Prompt

> Design the ABTalks first-time experience so a student immediately understands what the platform is, why the 60-day challenge matters, and what they should do next.
>
> Keep the explanation simple.
>
> The primary message should communicate:
>
> 60 DAYS.
> 60 BUILDS.
> PUBLIC PROOF.
>
> Give the user one obvious starting action.

### Product Decision

The landing page became centered around:

```text
60 DAYS.
60 BUILDS.
PUBLIC PROOF.
```

with a direct CTA:

```text
START YOUR 60-DAY JOURNEY →
```

---

# 4. Mobile-First Prompt

ABTalks is primarily intended for students using phones.

The main design target was:

```text
390px
```

with support for:

```text
360px
414px
Desktop
```

### Prompt

> Design ABTalks mobile-first for a 390px phone viewport.
>
> The application should be comfortable to use after college, including late-night sessions.
>
> Avoid horizontal scrolling.
>
> Keep touch targets comfortable.
>
> Prioritize today's mission, current progress, streak, and the next action.
>
> Do not overload the mobile screen with unnecessary information.

### Result

The interface was refined around:

- vertical hierarchy
- touch-friendly controls
- compact navigation
- readable text
- clear CTAs
- responsive cards
- no horizontal overflow

---

# 5. Moving Away From the Generic AI Look

During design exploration, the interface was intentionally moved away from the common bright-purple AI/vibe-coded aesthetic.

### Prompt

> Review the ABTalks visual direction and remove the characteristics that make it look like a generic AI-generated application.
>
> Avoid excessive purple, neon gradients, glowing cards, glassmorphism, decorative 3D objects, and unnecessary visual effects.
>
> Create a mature, technical, editorial interface that feels like a real product used by developers.

### Final Visual Direction

The product uses:

- dark neutral surfaces
- warm ivory typography
- muted teal actions
- restrained amber for momentum
- steel-blue technical metadata
- subtle borders
- minimal effects

### Locked Palette

| Role | Hex |
|---|---|
| Background | `#090B0D` |
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

Explicitly avoided:

```text
Purple
Neon blue
Pink
Magenta
Heavy glow
Excessive gradients
Glassmorphism
Decorative 3D
```

---

# 6. Dashboard Prompt

### Prompt

> Design the ABTalks student dashboard for a 390px mobile viewport.
>
> The student should understand their current state within seconds.
>
> Prioritize:
>
> 1. Current day
> 2. Build streak
> 3. Today's mission
> 4. 60-day progress
> 5. Recent proof
>
> Reduce heavy text.
>
> Do not make every section visually dominant.
>
> The dashboard should make the next action obvious.

### Dashboard Hierarchy

```text
WHERE AM I?
     ↓
WHAT AM I BUILDING?
     ↓
WHAT SHOULD I DO NOW?
     ↓
HOW AM I PROGRESSING?
```

The dashboard became the student's command center rather than a page full of statistics.

---

# 7. Daily Mission Prompt

### Prompt

> Design a focused daily mission page for ABTalks.
>
> Show the day number, challenge title, estimated time, difficulty, description, minimum requirements, and proof submission.
>
> The student should immediately understand what counts as completing today's challenge.
>
> Avoid overwhelming the student with unnecessary technical details.

### Example

```text
DAY 12 / 60

URL SHORTENER

45 MIN · INTERMEDIATE

Turn long URLs into short,
shareable links.

SHIP MINIMUM

✓ Accept valid URL
✓ Generate short code
✓ Redirect to original URL
```

The mission page became the focused execution screen.

---

# 8. Build → Prove → Continue

### Prompt

> Turn BUILD → PROVE → CONTINUE into a connected product loop.
>
> BUILD should represent creating something real.
>
> PROVE should represent GitHub and LinkedIn evidence.
>
> CONTINUE should represent returning for the next challenge.
>
> The three steps should feel like one system.

### Result

```text
01 BUILD
Ship something real.
        ↓
02 PROVE
Commit it. Share it.
        ↓
03 CONTINUE
Keep your record alive.
```

This became one of the main product concepts.

---

# 9. Build Rescue — Student Experience Feature

A major product question was:

> What happens when a student has only 15–20 minutes today?

College students may have:

- exams
- assignments
- interviews
- events
- travel
- placement preparation
- family responsibilities

A challenge should not turn one busy day into total failure.

### Prompt

> Introduce a thoughtful feature for students who cannot complete the full daily challenge because they have limited time.
>
> The feature should preserve honesty while allowing the student to complete the essential engineering outcome.
>
> It should not pretend that the full challenge was completed.

### Product Decision

This became:

# BUILD RESCUE

```text
FULL BUILD
    ↓
Limited time?
    ↓
BUILD RESCUE
    ↓
Ship the essential requirements
    ↓
Submit proof
    ↓
Continue
```

Build Rescue is intentionally a recovery mechanism, not a fake completion state.

---

# 10. Night Shift

ABTalks is designed around actual student usage.

Many students build late at night.

### Prompt

> Create a focused mode for students who build late at night after college.
>
> Reduce distractions and emphasize the current mission.
>
> The mode should feel calm and purposeful rather than like a completely different application theme.
>
> Help the student focus on shipping the core requirement.

### Result

```text
NIGHT SHIFT

Focused time.
Ship the core.
```

Night Shift works alongside the mission and Build Rescue experience.

---

# 11. AB Coach

AB Coach was introduced because students can get stuck during a build.

### Prompt

> Design a contextual AI development companion for ABTalks.
>
> The assistant should understand the student's current day, challenge, track, and mission.
>
> It should explain requirements, provide hints, break difficult tasks into smaller steps, and suggest what to do next.
>
> Do not simply complete the project for the student.
>
> The goal is to unblock the student while preserving the learning experience.

### Product Decision

AB Coach became a contextual build companion rather than a generic chatbot.

Example:

```text
Student:
I'm stuck on requirement 2.

AB Coach:
Requirement 2 is about generating a unique short code.

Think about:
1. What data needs to be stored?
2. How will you generate the code?
3. How will you avoid collisions?
```

---

# 12. AB Coach System Prompt

The assistant can receive context such as:

```text
Current day
Challenge title
Student name
Student track
Challenge description
Core requirements
Concepts covered
Progress
```

### System Prompt

```text
You are AB Coach, a senior developer mentor for students
participating in ABTalks.

Understand the student's current challenge before responding.

Rules:

1. Do not immediately provide complete solutions.
2. Prefer explanations, hints, and conceptual guidance.
3. Break difficult tasks into smaller steps.
4. Keep responses concise and practical.
5. Encourage the student to reason about the problem.
6. Use the current challenge context when giving advice.
7. Help the student move toward shipping.
8. Maintain a calm and supportive technical tone.
```

---

# 13. Public Proof Vault

The product needed a way to answer:

> What has this student actually built?

### Prompt

> Design a public engineering record for a student's 60-day challenge.
>
> Show completed builds chronologically.
>
> Each record should show the day, project, date, and GitHub and LinkedIn proof.
>
> It should feel like an engineering log rather than a normal social profile.

### Result

The feature became:

# PUBLIC PROOF VAULT

Example:

```text
DAY 11

REST API MOCK ENGINE

VERIFIED

GitHub ↗
LinkedIn ↗
```

The record grows as the student ships.

---

# 14. 60-Day Journey

### Prompt

> Represent the student's 60-day progress as an engineering journey instead of a generic calendar.
>
> Make completed days, the current day, and remaining days immediately understandable.
>
> The student should be able to see how far they have come and what remains.

### Result

```text
DAY 01 ✓
DAY 02 ✓
DAY 03 ✓
...
DAY 11 ✓
DAY 12 CURRENT
DAY 13 ○
...
DAY 60 ○
```

---

# 15. Missed-Day Recovery

### Prompt

> Design a recovery state for a student who misses a day.
>
> Do not erase previous progress.
>
> Do not pretend the missed day was completed.
>
> Make returning to the challenge feel achievable.

### Product Direction

The system can represent:

```text
DAY 11
✓ SHIPPED

DAY 12
MISSED

DAY 13
CURRENT
```

The message is:

> Yesterday didn't happen. Your previous work is still yours. Let's get back in.

---

# 16. Typography Refinement

The first design explorations used oversized typography.

A later refinement focused on making the application more practical on mobile.

### Prompt

> Perform a precision typography pass on ABTalks.
>
> Reduce oversized headings where they consume too much of the 390px viewport.
>
> Preserve strong hierarchy but make supporting information easier to scan.
>
> Do not make every section look like a hero section.

### Result

- reduced oversized headings
- improved line height
- reduced visual competition
- improved body readability
- preserved strong section hierarchy

---

# 17. Information Density Refinement

### Prompt

> Review the ABTalks dashboard for information overload.
>
> Remove or combine low-value information.
>
> The user should understand the most important action without reading a large amount of text.
>
> Prioritize action over decoration.

### Result

The interface prioritizes:

```text
Current Day
    ↓
Today's Mission
    ↓
Start / Continue
    ↓
Progress
    ↓
Proof
```

---

# 18. Responsive Refinement

### Prompt

> Review the ABTalks interface at 360px, 390px, and 414px widths.
>
> Identify horizontal overflow, oversized typography, cramped cards, navigation problems, inaccessible buttons, inconsistent spacing, and content clipping.
>
> Fix the layout while preserving the product hierarchy.

### Result

The mobile implementation was refined to:

- avoid horizontal scrolling
- maintain readable text
- preserve touch targets
- keep primary actions clear
- prevent content clipping
- keep bottom navigation usable

---

# 19. Design Review Prompt

### Prompt

> Review ABTalks as a senior product designer and frontend engineer.
>
> Identify anything that makes it feel generic, overly AI-generated, visually noisy, difficult to scan, or unnecessarily complicated.
>
> Recommend changes that make it feel like a mature real-world student product.

### Review Areas

```text
Visual hierarchy
Spacing
Typography
Color usage
Navigation
Mobile ergonomics
CTA clarity
Consistency
Loading states
Progress states
Empty states
```

The review was used as an iterative design tool rather than treating the first generated interface as final.

---

# 20. Product Principles

## Build Over Passive Learning

The platform should encourage students to create tangible work.

## Proof Over Claims

Completed work should become visible evidence.

## Consistency Over Perfection

One difficult day should not erase motivation.

## AI Should Guide

AB Coach should unblock students without replacing their work.

## Mobile First

The main student experience must work on a phone.

## Visual Restraint

The interface should not rely on neon effects to communicate energy.

## Clear Next Action

Every major screen should answer:

> What should I do now?

---

# 21. Development Areas Where AI Assisted

AI assistance was used during the development process for areas including:

```text
Product ideation
UX exploration
UI generation
Responsive refinement
Feature exploration
AB Coach design
Debugging assistance
Documentation
Design critique
```

The generated output was reviewed and adapted during implementation.

---

# 22. Human Product Decisions

The following were treated as product decisions and reviewed during development:

- ABTalks concept
- BUILD → PROVE → CONTINUE
- 60-day challenge structure
- 390px mobile-first target
- Build Rescue
- Night Shift
- AB Coach
- Public Proof Vault
- visual palette
- typography hierarchy
- information density
- navigation structure
- feature prioritization
- final responsive refinements

AI assistance was used to explore and accelerate these decisions, while the final product direction was selected during development.

---

# 23. AI-Assisted Development Disclosure

ABTalks was developed with AI assistance.

AI was used for:

- product ideation
- UX exploration
- interface generation
- responsive design refinement
- feature exploration
- implementation guidance
- debugging assistance
- documentation
- AI assistant prompt design

AI-generated output was reviewed, modified, tested, and integrated during development.

This log is intended to make the relationship between AI assistance and the resulting product transparent.

---

# 24. Prompt → Feature Traceability

| Development Direction | Product Result |
|---|---|
| 60-day coding challenge | ABTalks core challenge |
| BUILD → PROVE → CONTINUE | Main product loop |
| 390px mobile-first | Mobile UI system |
| Clear daily action | Dashboard |
| Focused challenge execution | Mission page |
| Limited-time student support | Build Rescue |
| Late-night student workflow | Night Shift |
| Contextual AI guidance | AB Coach |
| Public engineering evidence | Proof Vault |
| Visible progress | 60-Day Journey |
| Recovery after missed day | Missed-Day state |
| Reduce AI/vibe-coded visual style | Dark editorial design |
| Reduce information overload | Refined dashboard hierarchy |

---

# 25. Route / Submission Reference

The application uses a dynamic challenge route:

```text
/day/:dayId
```

This allows the same challenge page architecture to support all 60 days:

```text
/day/1
/day/2
/day/12
/day/30
/day/60
```

For the Day 12 evaluation flow, the concrete URL is:

```text
/day/12
```

Other core routes include:

```text
/
/dashboard
```

---

# 26. Final Product Story

The final product story is:

```text
A student joins ABTalks
        ↓
Receives today's build
        ↓
Builds something real
        ↓
Gets help if stuck
        ↓
Uses Build Rescue if time is limited
        ↓
Submits GitHub + LinkedIn proof
        ↓
Build becomes part of the public record
        ↓
Returns for tomorrow's build
```

After 60 days:

```text
60 DAYS
60 BUILDS
PUBLIC PROOF
ONE ENGINEERING RECORD
```

---

# 27. Why ABTalks Exists

The internet already provides students with almost unlimited learning material.

The harder problem is:

> Getting students to consistently turn learning into shipped work.

ABTalks is built around that gap.

It does not ask only:

> What did you learn?

It asks:

> What did you build?

And then:

> Can you prove it?

---

# 28. Closing

ABTalks is built around a simple idea:

> **Learning becomes more valuable when you can show what you actually shipped.**

**60 Days. 60 Builds. Public Proof.**
