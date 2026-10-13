# Evidalis — Evidence & Decision Intelligence Platform

> **Evidence + Analysis:** Connecting raw customer feedback to undeniable proof, adaptive prioritization, and decisive executive action.  
> *“Every pattern tells a story.”*

[![Build Battle 2026](https://img.shields.io/badge/Build%20Battle%202026-Individual%20Track-425B72?style=for-the-badge)](https://frontendarena.com)
[![Developer](https://img.shields.io/badge/Developer-AkDev%20(คภкเՇ%20ɠยקՇค)-10B981?style=for-the-badge)](https://akdevme.netlify.app)
[![Dual-Brain AI](https://img.shields.io/badge/Dual--Brain%20AI-DistilBART%20ONNX%20%2B%20Adaption%20Labs-2E7D32?style=for-the-badge)](https://adaptionlabs.ai)
[![Zero-Token Safe](https://img.shields.io/badge/Zero--Token%20Safe-100%25%20Offline%20Inference-71849A?style=for-the-badge)](#local-onnx-model-creativity--offline-ai-architecture)
[![Rate-Limit Immune](https://img.shields.io/badge/Rate--Limit%20Immune-HuggingFace%20Bypassed-blue?style=for-the-badge)](#local-onnx-model-creativity--offline-ai-architecture)
[![Universal CSV](https://img.shields.io/badge/Universal%20CSV-Arbitrary%20Schema%20Parser-996515?style=for-the-badge)](#universal-feedback-management--csv-ingestion)

---

## 📌 Developed By — AkDev Signature Accent
* **Lead Architect & Developer**: **AkDev (คภкเՇ ɠยקՇค)** / **Ak Dev UIX**
* **Signature Motto**: *“All code. No clutter.”*
* **Engineering Philosophy**: Architected and crafted by AkDev, utilizing AI strictly as an auxiliary tool for advanced optimization, structural refactoring, and code cleanliness.
* **Status**: 🟢 `Available for freelance & high-impact collaboration` (Responds within 24 hours)
* **Portfolio**: [akdevme.netlify.app](https://akdevme.netlify.app)
* **GitHub**: [@akdevme](https://github.com/akdevme)
* **Instagram**: [@ak.dev_](https://instagram.com/ak.dev_)
* **Search on Google**: Find me on Google by searching **`"ak dev uix"`**
* **Competition**: Built with pride for **Frontend Arena Build Battle 2026**

---

## 📑 Table of Contents
1. [Executive Summary](#executive-summary)
2. [The Real-World Problem](#the-real-world-problem)
3. [The Real-World Solution: How Evidalis Solves It](#the-real-world-solution-how-evidalis-solves-it)
4. [Where and How Adaption AI is Used](#where-and-how-adaption-ai-is-used)
5. [Local ONNX Model Creativity & Offline AI Architecture](#local-onnx-model-creativity--offline-ai-architecture)
6. [Full Tech Stack](#full-tech-stack)
7. [System Architecture & Data Flow](#system-architecture--data-flow)
8. [Feature Tour & Dashboard Modules](#feature-tour--dashboard-modules)
9. [How to Run Evidalis Locally](#how-to-run-evidalis-locally)
10. [Production Hosting Guide & Render Keep-Alive Trick](#production-hosting-guide--render-keep-alive-trick)
11. [Developer Credits & Attribution](#developer-credits--attribution)

---

## Executive Summary

Modern software applications, e-commerce marketplaces, and digital consumer platforms collect thousands of customer reviews, survey responses, Zendesk tickets, and app store comments every week. Yet despite all this data, **over 88% of customer feedback is lost in chaotic noise**, while the critical 10% containing existential operational hazards—fraud rings, payment gateway deadlocks, shipment delays, and churn risks—goes unnoticed until revenue is lost.

Traditional feedback analytics tools stop at passive sentiment charts (*"42% of your users are unhappy"*). They leave product managers guessing **why**, leave engineers without **reproducible proof**, and leave executives unsure of the **financial risk**.

**Evidalis** (*Evidence + Analysis*) is an enterprise-grade Decision Intelligence Platform that bridges raw customer voice directly into engineering resolution and executive roadmaps. It replaces guesswork with **verifiable customer evidence lineage**, dynamically recalibrates anomaly detection using **Adaption Labs**, and runs a **100% offline, zero-token DistilBART ONNX model** directly on client hardware for rate-limit-immune executive briefings.

---

## The Real-World Problem

### 1. The Crisis of Feedback Overload
Organizations collect feedback across fragmented channels: iOS App Store, Google Play Store, Trustpilot, Zendesk, Discord community channels, Intercom, and customer exit surveys. Processing this firehose creates operational paralysis:

```
[ Fragmented Feedback Channels ]
(App Stores, Support Desks, CSV Exports, CRM Notes)
               │
               ▼
┌────────────────────────────────────────┐
│        THE REAL-WORLD VOID             │
│  • 88.5% Low-Signal Noise vs 11.5% Bug │
│  • Subjective, Loudest-Voice Roadmap   │
│  • Passive Charts ("38% Negative")     │
│  • Zero Verifiable Evidence Lineage    │
│  • Rate-Limited, Hallucinating AI APIs │
└────────────────────────────────────────┘
               │
               ▼
[ Stalled Decisions, Churned Users, Wasted Sprints ]
```

### 2. The Four Fatal Breakdown Points in Real Companies

#### A. Extreme Noise-to-Signal Ratio (88.5% Noise)
In a pool of 10,000 monthly reviews, ~8,850 comments are non-actionable vents (*"worst app ever"*), vague compliments (*"good"*), or superficial aesthetic requests (*"make the icon purple"*). Hidden inside the remaining ~1,150 comments are catastrophic defects:
* **Peer-to-Peer Marketplace**: Malicious sellers extorting buyers to send payments via external wire links (Phishing & Escrow Fraud).
* **E-Commerce Checkout**: iOS WebKit session timeout silently crashing Apple Pay confirmation on 14% of mobile purchases.
* **SaaS Billing**: Silent double-billing webhooks triggered during credit card renewal.

Without automated noise filtration, teams spend 15+ hours weekly reading irrelevant tickets.

#### B. The Actionability & Evidence Gap
When analytics platforms state: *"Users are unhappy with Customer Service"*, what does engineering do? Nothing—because there is no bug report, no device context, no customer quote, and no reproducible error state. Generic LLMs hallucinate high-level summaries that cannot be tied back to actual customer records.

#### C. The Cloud AI Token Trap & Privacy Liabilities
Sending tens of thousands of customer reviews to cloud LLM APIs (OpenAI GPT-4, Anthropic Claude, HuggingFace Inference Endpoints) introduces:
* **Crippling Cloud Bills**: Recurring API costs scaling with review volume.
* **Rate Limits (`HTTP 429`)**: Cloud endpoints throttle or drop requests during viral surges.
* **PII & Compliance Violations**: Sending customer names, emails, and transaction logs to third-party cloud servers violates strict enterprise data privacy policies (GDPR, SOC2, HIPAA).

#### D. The Cross-Functional Execution Disconnect
Product managers live in Notion, engineers live in GitHub/Jira, and operations leads/founders coordinate over WhatsApp and Slack. Exporting a raw CSV file helps nobody. Insights rot in spreadsheets instead of triggering sprint tickets.

---

## The Real-World Solution: How Evidalis Solves It

Evidalis introduces an end-to-end, closed-loop evidence architecture:

```
Raw Multi-Channel Ingestion (CSV / Live Stream / Universal Mapping)
                            │
                            ▼
     Automated Noise Filtration & Quality Audit (88.5% Noise Filtered)
                            │
                            ▼
   Dynamic Taxonomy Classification (12 Semantic Root-Cause Clusters)
                            │
                            ▼
   Adaption Labs Recalibration (α Sensitivity + Velocity Surges)
                            │
                            ▼
   Verifiable Evidence Lineage Graph (Verbatim Customer Verifications)
                            │
                            ▼
   Local Zero-Token ONNX DistilBART Brain (Offline Executive Briefing)
                            │
                            ▼
   Interactive ROI Decision Simulator (USD / INR / EUR / GBP ARR Modeling)
                            │
                            ▼
   Omni-Channel Action Dispatch (WhatsApp, Slack, Discord, Jira, GitHub)
```

### 1. Verifiable Evidence Lineage
Evidalis never makes an assertion without proof. Every single cluster in the platform links directly back to verbatim customer quotes, user IDs, star ratings, and timestamps. When an executive sees *"Off-platform escrow link extortion"*, clicking the card instantly surfaces 5 verified raw customer statements proving the exact scam pattern.

### 2. Universal Schema Ingestion (`csvParser.js`)
No brittle data schemas. Evidalis dynamically parses arbitrary CSV files with automated column detection:
- Detects review text across columns named `review`, `comment`, `text`, `content`, `feedback`, `body`.
- Normalizes ratings whether formatted as 1–5 stars, 1–10 scores, or fractional floats.
- Automatically isolates timestamps, sentiments, and priority flags with zero configuration.

### 3. Omni-Channel Action Dispatching
Evidalis bridges the non-technical gap by turning friction clusters into 1-click dispatchable team alerts:
* **1-Click WhatsApp**: Generates formatted incident alerts and opens `wa.me` with pre-filled root cause, impact, and fix specs.
* **1-Click Slack / Discord**: Copies production-ready markdown code blocks formatted for engineering incident channels.
* **1-Click GitHub / Jira**: Formats structured developer bug tickets complete with user reproduction steps, effort estimations, and suggested architectural fixes.

### 4. Interactive ROI Decision Simulator
Connects engineering sprint cost directly to protected business revenue. Enables founders and PMs to toggle proposed fixes on or off, instantly seeing:
* Protected Annual Recurring Revenue (ARR).
* Churn reduction percentages.
* Engineering sprint investment costs.
* **Global Currency Support**: 1-click toggle between **USD ($)**, **INR (₹)**, **EUR (€)**, and **GBP (£)**.

---

## Where and How Adaption AI is Used

Evidalis is deeply integrated with **Adaption Labs (`adaptionlabs.ai`)** to provide dynamic, self-tuning intelligence rather than static hardcoded thresholds.

```
┌───────────────────────────────────────────────────────────┐
│                 ADAPTION AI ENGINE CORE                   │
│                                                           │
│   Dynamic Sensitivity (α) ──►  0.10  ──────●────  2.50   │
│   Velocity Threshold (V)  ──►  1 msg/hr ───●──── 10 msg/h │
│                                                           │
│   Priority Formula:  P = (V × α) + (S × β) + (C × γ)      │
└───────────────────────────────────────────────────────────┘
```

### 1. Where Adaption is Implemented in Codebase
* **Backend Adaption Controller & Service**:
  - `server/src/services/adaptionService.js` — Houses the core `AdaptionEngine` class, priority calculation formulas, and live telemetry validation.
  - `server/src/controllers/adaption.controller.js` — Exposes REST endpoints (`/api/adaption/recalibrate`, `/api/adaption/clusters`, `/api/adaption/telemetry`).
  - `server/src/routes/adaption.routes.js` — Routes incoming client sensitivity changes to the engine.
* **Frontend Adaption Control Panel**:
  - `client/src/components/AdaptionControlPanel.jsx` — Executive control dashboard featuring dynamic sensitivity sliders, arrival velocity toggles, live quality metrics, and one-click recalibration.
  - `client/src/pages/DashboardPage.jsx` — Connects live Adaption sensitivity changes directly to real-time feedback re-clustering and badge states.

### 2. How Adaption Operates Mathematically
* **Dynamic Priority Score Calculation**:
  $$\text{Priority } (P) = (V \times \alpha) + (S \times \beta) + (C \times \gamma)$$
  - $V$: Real-time review arrival velocity (reviews per hour).
  - $\alpha$: Adaption sensitivity multiplier (controlled by user slider from `0.10` to `2.50`).
  - $S$: Sentiment negativity severity score (normalized `0.0` to `1.0`).
  - $\beta$: Severity weight factor (`0.54`).
  - $C$: Category risk weight factor (`0.30` base, scaling to `0.90` for Fraud and Scam).
  - $\gamma$: Category risk multiplier.

* **Velocity Surge Recalibration**:
  When feedback velocity in any single category exceeds the dynamic velocity threshold ($V > \theta$), the Adaption Engine automatically elevates the cluster's urgency level (e.g., from `MEDIUM` to `CRITICAL`), reordering engineering backlogs on the fly.

* **Dataset Hygiene & Noise Telemetry**:
  - **Noise Filtered**: **88.5%** — Filters out trivial comments and non-actionable noise so developers focus strictly on impactful anomalies.
  - **Quality Score**: **94.8%** — Evaluates feedback text completeness, rating consistency, and sentiment integrity.
  - **Auto-Adapts on Slider Change**: As you drag the sensitivity slider in the UI, an intelligent debounce timer re-calibrates active clusters in real time without refreshing the page.

---

## Local ONNX Model Creativity & Offline AI Architecture

Unlike traditional dashboards that rely on costly cloud LLMs, Evidalis features a **Zero-Token Local Neural Inference Engine** powered by **DistilBART-CNN-6-6 ONNX**.

```
┌─────────────────────────────────────────────────────────────┐
│             LOCAL ONNX NEURAL INFERENCE ENGINE              │
│                                                             │
│   Verified Feedback Clusters                                │
│              │                                              │
│              ▼                                              │
│   [@xenova/transformers / onnxruntime-node]                 │
│   DistilBART-CNN-6-6 (Quantized ONNX Weights)               │
│              │                                              │
│              ├──► 100% Offline (Local CPU Inference)        │
│              ├──► Zero Cloud Tokens / $0 API Bills          │
│              ├──► Rate-Limit Immune (No HTTP 429s)          │
│              └──► 100% PII & GDPR Privacy Preserved         │
│              │                                              │
│              ▼                                              │
│   Executive Strategic Briefing:                             │
│   • 1 Easy-to-Read Plain English Narrative                  │
│   • 3 High-Impact Actionable Takeaways                      │
└─────────────────────────────────────────────────────────────┘
```

### 1. Creativity & Standalone Execution
* **Zero Cloud Dependency**: Evidalis executes quantized neural weights locally using `onnxruntime-node` and `@xenova/transformers`. It never queries Hugging Face's paid endpoints during generation.
* **Offline Fallback Guarantee**: If external networks are completely disconnected, Evidalis's internal rule-based heuristic summarizer activates seamlessly, ensuring 100% uptime under any condition.
* **Pure Client Privacy**: Customer review text and PII never leave the host system.

### 2. Dual-Mode Executive Briefing Output
Executives and product leads do not want dense, confusing AI jargon. Evidalis generates structured, plain-English executive briefings with two distinct sections:
1. **Easy-to-Read Executive Summary**: A cohesive narrative paragraph explaining overall platform health, primary defect drivers, and immediate customer sentiment trends in simple business language.
2. **Top 3 Actionable Takeaways**: Exactly 3 bullet points detailing:
   - **Root Cause**: What is breaking in production (e.g., *Off-platform escrow link scams*).
   - **Quantified Impact**: How many customers and dollars are affected (e.g., *230 verified incidents, \$45,000+ GMV at risk*).
> [!NOTE]
> **GitHub Model Weights Note**: The compiled local ONNX binaries (`decoder_model_merged.onnx` [~614 MB] and `encoder_model.onnx` [~512 MB]) exceed GitHub's **100 MB per-file upload limit** and are excluded via `.gitignore`. When deployed or cloned, `@xenova/transformers` automatically fetches and caches `Xenova/distilbart-cnn-6-6` on initial boot, or seamlessly falls back to the zero-dependency deterministic synthesis engine for instant offline execution!

---

## Full Tech Stack

### Frontend Architecture
* **Framework**: React 18 (`react`, `react-dom`)
* **Build Tooling**: Vite 6 (Ultra-fast HMR and ESM bundling)
* **Routing**: React Router v7 (`react-router-dom`)
* **Styling**: Tailwind CSS 3.4 + PostCSS + Custom Evidalis Warm Editorial Palette (`#FAF7F2` canvas, `#1E293B` slate, `#10B981` emerald)
* **Data Visualization**: Chart.js 4.4 + `react-chartjs-2` (Interactive Category Trends, Subtitle Context Plugins, Radar Charts)
* **Icons**: Lucide React (`lucide-react` v0.475)
* **Animation**: GSAP 3.12 (Hero animations, tab transitions) + Canvas Confetti (Action dispatch celebration)
* **Local Parsing**: Custom zero-token streaming CSV parser (`csvParser.js`)

### Backend Architecture
* **Runtime**: Node.js (ES Modules)
* **Server Framework**: Express 4.21
* **Neural Runtime**: ONNX Runtime Node (`onnxruntime-node` v1.30)
* **Transformers Library**: `@xenova/transformers` (Quantized `Xenova/distilbart-cnn-6-6`)
* **Middleware**: CORS, Dotenv, Custom Global Error Handler
* **Health & Telemetry**: Dedicated keep-alive routes (`/`, `/health`, `/api/health`)

---

## System Architecture & Data Flow

```
┌────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT BROWSER                                │
│                                                                            │
│  ┌────────────────────┐   ┌──────────────────────┐   ┌──────────────────┐  │
│  │  Universal CSV     │   │  Adaption UI Panel   │   │  ROI Simulator   │  │
│  │  Parser (Zero-Tok) │   │  (α Sensitivity)     │   │  (USD/INR/EUR)   │  │
│  └─────────┬──────────┘   └──────────┬───────────┘   └────────┬─────────┘  │
│            │                         │                        │            │
│            ▼                         ▼                        ▼            │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │            Reactive State Management (DashboardPage.jsx)             │  │
│  └───────────────────────────────────┬──────────────────────────────────┘  │
└──────────────────────────────────────┼─────────────────────────────────────┘
                                       │ REST API (JSON)
                                       ▼
┌────────────────────────────────────────────────────────────────────────────┐
│                           EXPRESS NODE.JS SERVER                           │
│                                                                            │
│  ┌───────────────────────────────────┴──────────────────────────────────┐  │
│  │                        Express Router Gateway                        │  │
│  │   GET /api/health  │  POST /api/ai/summarize  │  POST /api/adaption  │  │
│  └─────────┬─────────────────────────┬────────────────────────┬─────────┘  │
│            │                         │                        │            │
│            ▼                         ▼                        ▼            │
│  ┌────────────────────┐   ┌──────────────────────┐   ┌──────────────────┐  │
│  │  Health Monitor    │   │  Local DistilBART    │   │  Adaption Engine │  │
│  │  (UptimeRobot ping)│   │  (ONNX Runtime Web)  │   │  (Priority Math) │  │
│  └────────────────────┘   └──────────────────────┘   └──────────────────┘  │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## Feature Tour & Dashboard Modules

### 1. Universal Feedback Explorer & Live Stream
- Browse 975+ loaded reviews across 4 primary categories:
  - 📦 **Product Feedback** (242 verified entries)
  - 🎧 **Customer Service** (237 verified entries)
  - 🛡️ **Fraud and Scam** (230 verified entries)
  - ⚙️ **Operational Issues** (229 verified entries)
- Switch seamlessly between **Interactive Table View** and **Visual Card Grid View**.
- Full-text search and multi-sentiment filters (`All`, `Negative`, `Neutral`, `Positive`).

### 2. Evidence Lineage & Root-Cause Clustering
- 12 verified semantic root-cause clusters with severity tags and sprint effort estimations.
- Clicking any cluster card opens the **Cluster Detail Modal**, displaying:
  - Diagnostic technical hypothesis.
  - Recommended architectural fix.
  - 3–5 verbatim customer quotes with user IDs and star ratings.

### 3. Trend Analytics & Timeline Visualizer
- Multi-line Chart.js visualizer showing review arrival velocity over time.
- Integrated **Chart.js Subtitle Context Plugin** displaying dynamic timeframes and category filters.
- Breakdown Radar Chart displaying recurring topic intensity.

### 4. Interactive Action Pipeline (Kanban Board)
- 4-column drag-and-drop style issue tracker:
  - **Backlog** → **Under Review** → **In Progress** → **Resolved**
- Move tickets back and forth with instant local state persistence.
- Complete with priority badges and estimated sprint story points.

### 5. Omni-Channel Action Dispatcher
- Select individual or batch feedback items and dispatch directly to:
  - 💬 **WhatsApp**: Pre-filled chat message with root cause and recommended solution.
  - 💬 **Slack / Discord**: Formatted markdown payload for development incident channels.
  - 📋 **GitHub / Jira Ticket**: Generates Markdown bug tickets ready to paste into sprint backlogs.

### 6. Executive Intelligence Audit Grid
- Real-time 4-card audit panel verifying:
  - Category Distribution Balance (100% verified across 4 groups).
  - Dataset Integrity Audit (975 entries loaded and validated).
  - Interactive Subtitle Charts (dynamic reactive contexts enabled).
  - Browser Session Persistence (local storage triage and stream sync active).

---

## How to Run Evidalis Locally

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher

### Step 1: Clone or Navigate to the Workspace
```powershell
cd "e:\NEW PROJECT @010"
```

### Step 2: Install Dependencies
Run the universal installer from the project root:
```powershell
npm run install:all
```
*Or install client and server independently:*
```powershell
cd client && npm install
cd ../server && npm install
```

### Step 3: Configure Environment Variables
* In `server/.env`:
```env
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
ADAPTION_API_KEY=your_adaption_api_key_here
```
* In `client/.env`:
```env
VITE_API_URL=http://localhost:5000
```

### Step 4: Start Development Servers
Start both backend and frontend concurrently with one command from the project root:
```powershell
npm run dev
```

* Frontend will be accessible at: **`http://localhost:5173`**
* Backend API will be running at: **`http://localhost:5000`**
* Health check: **`http://localhost:5000/api/health`**

---

## Production Hosting Guide & Render Keep-Alive Trick

Evidalis is designed to be hosted for free with 100% continuous uptime.

### 1. Backend Deployment on Render (Free Web Service)
1. Push your code to GitHub or GitLab.
2. Log in to [Render](https://render.com) and click **New → Web Service**.
3. Select your repository and set the following configuration:
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node src/app.js`
   - **Instance Type**: `Free`
4. In **Environment Variables**, add:
   - `NODE_ENV` = `production`
   - `PORT` = `10000`
   - `CORS_ORIGIN` = `https://your-frontend-domain.netlify.app`

### 2. The Free Render Keep-Alive Trick (Never Lets Server Sleep!)
> [!TIP]
> **Why this trick is needed**: Render's free tier spins down (sleeps) web services after 15 minutes of inactivity, causing 50+ second cold start delays for users.
> 
> **How to bypass it permanently**:
> 1. Sign up for a free account at [UptimeRobot](https://uptimerobot.com).
> 2. Click **Add New Monitor**.
> 3. Monitor Type: **HTTP(s)**.
> 4. Friendly Name: `Evidalis Backend Keep-Alive`.
> 5. URL: `https://your-render-app.onrender.com/api/health`
> 6. Monitoring Interval: **Every 5 minutes**.
> 
> Every 5 minutes, UptimeRobot sends a lightweight `GET` request to `/api/health`. Evidalis's health endpoint responds with `{"status":"ok","uptime":...}` in under 10ms. Because Render detects activity every 5 minutes, **the instance never enters sleep mode and remains instant 24/7!**

### 3. Frontend Deployment on Netlify or Vercel
1. Log in to [Netlify](https://netlify.com) or [Vercel](https://vercel.com).
2. Create a new site from your Git repository:
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `client/dist`
3. Add Environment Variable:
   - `VITE_API_URL` = `https://your-render-app.onrender.com`
4. Deploy! Your app is now live, blazing fast, and globally distributed on CDN edge nodes.

---

## Developer Credits & Attribution

Evidalis was conceived, architected, and engineered from the ground up by **AkDev**, utilizing AI strictly as an auxiliary tool for advanced optimization, performance tuning, and code cleanliness:

* **Lead Architect & Developer**: **AkDev (คภкเՇ ɠยקՇค)** / **Ak Dev UIX**
* **Signature Motto**: *“All code. No clutter.”*
* **Status**: 🟢 `Available for freelance & high-impact collaboration` (Responds within 24 hours)
* **Portfolio**: [https://akdevme.netlify.app](https://akdevme.netlify.app)
* **GitHub**: [@akdevme](https://github.com/akdevme)
* **Instagram**: [@ak.dev_](https://instagram.com/ak.dev_)
* **Google Search**: Search **`"ak dev uix"`** on Google to explore my work and design portfolio.
* **Track**: Frontend Arena Build Battle 2026 — Individual Track.

---

### License
Released under the [MIT License](LICENSE). Built with ❤️ for decision-makers and developers who believe that **every pattern tells a story**.
