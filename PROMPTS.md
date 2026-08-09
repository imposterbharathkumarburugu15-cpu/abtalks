# ABTalks — Prompt Engineering & Product Specification Log

> **Project:** ABTalks (60-Day Public Proof Coding Challenge Platform)  
> **Repository:** `ABTalks`  
> **Last Updated:** 2026-08-09  

---

## 1. Executive Summary

This document records the exact prompt specifications, system design guidelines, and prompt engineering sequences used throughout the development of **ABTalks**. 

ABTalks is designed around a single central product loop:  
**BUILD → PROVE → CONTINUE**

Students complete **60 engineering challenges in 60 days**, submitting **GitHub commit proof** and **LinkedIn post proof** to maintain an immutable public record of their work.

---

## 2. Core System Prompt & Product Principles

The AI agent operating on ABTalks was guided by the following product design rules:

### Design North Star
```text
A PERSONAL ENGINEERING JOURNAL
+
A 60-DAY ACCOUNTABILITY SYSTEM
+
A PUBLIC PORTFOLIO
```

### Emotional Promise
> *"I am not just learning. I am building a record of what I can actually ship."*

### Mobile-First Layout Rules
- **Primary Design Target:** 390px width (Mobile Viewport)
- **Safety Targets:** 360px & 414px (Responsive Layouts)
- **Desktop Strategy:** Fluid responsive scale without squeezing or horizontal overflow.
- **Touch Targets:** Minimum 44px tap area.

### Visual Palette Constraints (Locked)
| Element | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Background** | `#090B0D` | Dark editorial canvas |
| **Surface** | `#14191B` | Primary card container background |
| **Elevated** | `#191F21` | Selected tabs & active highlights |
| **Border** | `#252C2E` | Subtle 1px dividers |
| **Primary Text** | `#F1EEE7` | Warm ivory headings & titles |
| **Secondary Text** | `#A6AAA8` | Muted descriptions & subtitles |
| **Primary Accent** | `#69B39A` | Muted teal action buttons & indicators |
| **Momentum Accent** | `#C58A52` | Burnt orange streak & focus highlights |
| **Technical Accent** | `#718A96` | Muted steel-blue technical metadata |
| **Success State** | `#6FA889` | Muted sage verified checkmarks |

*Strict Banned Styles:* Purple, neon blue, pink, magenta, glowing drop shadows, glassmorphism, or artificial 3D decorations.

---

## 3. Chronological Prompt History & Evolution

Below are the key prompts used to shape the ABTalks platform:

### Phase 1: Foundation & Core Daily Loop
**Prompt Concept:**
> *"Build ABTalks — a 60-day coding challenge for Indian college students. The core loop is BUILD → PROVE → CONTINUE. Students build something every day, submit GitHub proof, submit LinkedIn proof, and build a public streak."*

**Key Features Generated:**
- Dashboard with 60-Day Challenge Timeline (`/src/pages/DashboardPage.tsx`)
- Mission Workspace for individual challenge days (`/src/pages/ChallengeDayPage.tsx`)
- Public Proof Submission Form (`/src/pages/ProofVaultPage.tsx`)
- Local Storage persistence engine (`/src/utils/storage.ts`)

---

### Phase 2: Senior Product Design Pass (The "10/10 Refinement")
**Prompt Specification:**
> *"Perform a senior product-design pass on ABTalks. Maintain a dark editorial background, warm ivory typography, muted teal as the primary action color, burnt orange for momentum, and steel-blue technical accents.*
>
> *Key Sections to Refine:*
> 1. **Landing Page Hero:** '60 DAYS. 60 BUILDS. PUBLIC PROOF.' with clear value prop.
> 2. **Product Explanation:** Replace generic SaaS metrics with 'Why Public Proof Matters' (60 Days, 60 Builds, Public Proof, One Record).
> 3. **The Daily Loop:** Create a connected vertical pipeline for BUILD → PROVE → CONTINUE.
> 4. **Signature Build Record:** Physical engineering log timeline across 60 days.
> 5. **AB Coach Companion:** Contextual floating developer guide for unblocking code.
> 6. **Night Shift & Build Rescue Mode:** Dedicated focus features for late-night college sessions."*

---

### Phase 3: Precision UX & Typography Polish
**Prompt Specification:**
> *"Perform a precision UX/UI refinement:*
> 1. Reduce hero typography by ~10% for better mobile viewport ratio.
> 2. Increase vertical breathing room around hero.
> 3. Replace calendar grid with an editorial engineering trail divided into 4 phases (Core Mechanics, APIs & Microservices, AI & Vector Engines, Distributed Systems).
> 4. Connect Build → Prove → Continue visually using a subtle vertical flow.
> 5. Make AB Coach calm and contextual rather than attention-seeking."*

---

### Phase 4: AI & Documentation Logs Creation
**User Request:**
> *"I want AI logs AI_USAGE_LOG.md and prompts.md to make it clear."*

**Action Executed:**
- Created `AI_USAGE_LOG.md` detailing Gemini SDK integration, `@google/genai` model specs, and AB Coach system prompts.
- Created `PROMPTS.md` documenting system architecture, design specifications, and chronological prompt sequences.

---

## 4. AB Coach AI System Prompt Template

The prompt template injected into the **AB Coach** assistant component (`/src/components/shared/ABCoach.tsx`):

```typescript
const COACH_SYSTEM_PROMPT = `
You are AB Coach, a senior developer mentor for students on ABTalks.

Context:
- Current Day: Day ${routeDay} (${challenge.title})
- Student Name: ${student.name}
- Current Track: ${student.track}
- Core Mission: ${challenge.description}

Rules:
1. Never write full solutions for the student.
2. Provide concise, 2-3 sentence hints or conceptual breakdowns.
3. Keep the tone encouraging, calm, and technical.
4. When student clicks "I'm stuck", break down the task into smaller sub-steps.
5. Highlight core concepts like ${challenge.conceptsCovered.join(', ')}.
`;
```

---

## 5. Verification & Build Integrity

All prompt iterations were compiled and validated using the platform build system:
- `compile_applet` status: **BUILD SUCCESSFUL**
- Zero syntax or runtime bundle errors.
