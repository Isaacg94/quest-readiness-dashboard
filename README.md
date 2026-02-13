# Quest Learner Readiness Dashboard
<img src="./public/assets/screencapture.png" width="700" style="border-radius: 12px;" />

[Live Demo](https://your-vercel-link.vercel.app)

### Overview

This project implements a learner-facing readiness dashboard for Quest, Nova Pioneer’s Post School Success Platform (PSSP).

The application visualizes a learner’s overall readiness score, provides a breakdown across key skill areas, and surfaces actionable insights to guide their next steps.

Designed with a mobile-first approach, the experience prioritizes clarity, strong visual hierarchy, and motivation for secondary school students. It embraces a clean, modern glassmorphic inspired interface to create a more engaging and uplifting alternative to traditional, monotonous dashboard designs.

The goal is to provide learners with direct, intuitive insight into their strengths and areas for growth, capturing their attention while empowering them to take ownership of their journey toward university, career, and life beyond high school.

## Tech Stack
```
Next.js 16
React
TypeScript
TailwindCSS
Dummy JSON data (no backend)
```

### Getting Started
```bash
npm install
npm run dev
```
### Open:
```bash
http://localhost:3000
```
### To build for production:
```bash
npm install
npm run dev
```
### Project Structure
```
/data/readiness.json
```
Static mocked readiness data used to simulate API response.
```
/lib/readiness-data.ts
```
Data access layer that abstracts the data source.
This allows swapping JSON for a real API later without refactoring UI components.

```
/utils/readiness.ts
```
Domain types and shared readiness models.
```
/utils/readiness-calculator.ts
```
Business logic for computing readiness level, insights, and derived values.
```
/components
```
UI components, including:

```
ReadinessScore
ProgressRing
SkillCard
DetailedView
AppShell
```
The UI layer is intentionally separated from business logic.

# Design Decisions
## Visual Language

Glassmorphic elements to create depth, focus, and layered hierarchy while maintaining a light, modern learner-friendly aesthetic.

Background illustration (rocket + learner in space beside the moon) to reinforce the metaphor of readiness as launch, visually framing progress as forward momentum toward life after high school. The illustration integrates Nova Pioneer’s navy, green, and amber brand palette to ground the experience in brand identity while keeping it aspirational.

Soft white gradient cards to ensure readability and contrast against a dynamic background, balancing inspiration with clarity.

Circular progress ring as the primary readiness anchor, leveraging radial design theory to communicate completeness, momentum, and growth rather than static measurement.

Achievement-style badge to introduce subtle gamification and reinforce positive progress cues.

Dynamic use of Nova Pioneer brand colors to communicate score levels throughout the UI.


## Mobile-First Approach

Responsive layout optimized for small screens, prioritizing a single-column flow and minimizing visual clutter to support focused, distraction-free engagement.

Clear vertical hierarchy to guide natural scroll behavior, ensuring key information (readiness score, insights, next steps) is surfaced immediately and progressively.

Generous spacing and touch-friendly interaction zones to improve readability, reduce cognitive strain, and support comfortable thumb navigation.

Bottom navigation with active state highlighting, positioned within natural thumb reach to improve discoverability and reinforce orientation within the app.

Contextual breadcrumb on deeper views, providing lightweight wayfinding and reducing navigation friction without overcomplicating the interface.

## Interaction Design

Toggle between summary and detailed views

Filter and search through skill areas

Clickable skill areas with deeper insight pages

Animated transitions to improve continuity

Dynamic insights generated client-side

## Insight Logic

Insights are computed client-side using simple rules:

Identify strongest skill area

Identify lowest scoring area

Generate focus recommendation

This logic can be replaced by API-provided insights in future iterations.

## Assumptions

Readiness data is precomputed server-side.

Scores range from 0–100.

No authentication required for this task.

## Extension Ideas

Real API integration

Persistent learner accounts

Activity recommendation engine

Gamification elements

PWA offline support

Performance monitoring and analytics


