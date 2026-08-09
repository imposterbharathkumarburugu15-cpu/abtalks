# ABTalks — AI Usage & Integration Log

> **Project:** ABTalks (60-Day Public Proof Coding Platform)  
> **Platform:** Google AI Studio Build  
> **Last Updated:** 2026-08-09  

---

## 1. Overview

ABTalks is a 60-day engineering challenge platform built around **daily shipping, public proof, and verifiable progress**. This document logs the AI architecture, model capabilities, prompts, and system components integrated into the platform.

---

## 2. AI Model & SDK Configuration

- **SDK Package:** `@google/genai` v2.4.0 (`GoogleGenAI`)
- **Primary AI Model:** `gemini-2.5-flash` / `gemini-1.5-flash`
- **Primary AI Agent Component:** `ABCoach` (`/src/components/shared/ABCoach.tsx`)
- **Key Security:** Key stored in server environment variable `GEMINI_API_KEY` with zero client-side exposure.

---

## 3. AB Coach AI Persona & System Instructions

The AB Coach is a contextual senior developer companion designed to guide developers through the 60-day challenge without giving away outright code solutions.

### System Prompt Directive:
```text
Role: You are AB Coach, a world-class senior software engineer and mentor on the ABTalks platform.
Goal: Unblock developers on daily engineering challenges (Days 1–60) through hints, conceptual breakdowns, terminal error debugging, and architecture guidance.

Key Directives:
1. Never generate complete copy-paste solutions to challenge assignments.
2. Provide targeted diagnostic hints, algorithmic pseudocode, or structural debugging steps.
3. Keep responses concise, clear, and actionable.
4. Explain complex technical terms (e.g., Cosine Similarity, Base62 Encoding, Vector Space, 302 Redirects) in simple developer terms.
```

---

## 4. AI-Powered Platform Capabilities

### A. Contextual Challenge Knowledge Injection
When invoked from any Challenge Day page (e.g. Day 12 — URL Shortener), `ABCoach` automatically ingests:
- Active Day Number
- Challenge Title & Description
- Ship Minimum requirements (Core Scope)
- Covered Engineering Concepts
- Developer's current code/error state

### B. Automated Proof Verification Assistant
Assists builders in preparing public proof submissions for:
- **GitHub Commit URLs** (verifying repository structure and commit hashes)
- **LinkedIn Post Proofs** (crafting concise, technical public progress announcements)

---

## 5. Summary of AI-Generated Application Architecture

| Component / Module | Path | Description |
| :--- | :--- | :--- |
| **AB Coach Companion** | `/src/components/shared/ABCoach.tsx` | Interactive AI mentor modal with contextual quick prompts and streaming conversation. |
| **60-Day Challenge Engine** | `/src/data/challenges.ts` | 60 distinct production-grade engineering challenges categorized across 4 phases. |
| **Engineering Build Record** | `/src/components/shared/YourBuildRecord.tsx` | Editorial 60-day build trail and progression timeline. |
| **Proof Verification Vault** | `/src/pages/ProofsVaultPage.tsx` | Repository of verified public proofs (GitHub commits & LinkedIn posts). |
| **Command Center Dashboard** | `/src/pages/DashboardPage.tsx` | Builder dashboard tracking daily streak, shipped builds, and active mission workspace. |

---

## 6. Security & Operational Policy

1. **No Client-Side Secrets:** `GEMINI_API_KEY` is referenced exclusively in server-side / proxy handlers.
2. **Graceful Fallback:** If API credentials are not set in the preview environment, `ABCoach` smoothly falls back to local intelligent developer hints to maintain zero downtime.
3. **Auditing:** All proof URL verifications run client-side schema checks prior to logging completed builds.
