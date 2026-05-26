# Welcome to Tasa Inmuebles

## How We Use Claude

Based on Franco Bertoldi Mariglio's usage over the last 30 days:

Work Type Breakdown:
  Build Feature  ██████████░░░░░░░░░░  50%
  Plan / Design  █████░░░░░░░░░░░░░░░  25%
  Write Docs     █████░░░░░░░░░░░░░░░  25%

Top Skills & Commands:
  /graphify       ████████████████░░░░  4x/month
  /compact        ████████████░░░░░░░░  3x/month
  /plugin         ████████████░░░░░░░░  3x/month
  /rename         ████████░░░░░░░░░░░░  2x/month
  /model          ████████░░░░░░░░░░░░  2x/month

Top MCP Servers:
  Notion          ████████████████████  343 calls
  Playwright      ████░░░░░░░░░░░░░░░░  57 calls
  graphify-cocucci░░░░░░░░░░░░░░░░░░░░  8 calls
  graphify-marketplace░░░░░░░░░░░░░░░░  6 calls

## Your Setup Checklist

### Codebases
- [ ] Cocucci — _add GitLab repo URL here_

### MCP Servers to Activate
- [ ] **Notion** (`claude_ai_Notion`) — manages the requirements catalog (Casos de Uso, RF, BR, AC, RG, Stakeholders, Glosario, Decisiones IR) stored across 9 Notion DBs. This is the single source of truth for all requirements — you need access to the shared Notion workspace. Ask Franco for the invite link.
- [ ] **Playwright** (`plugin_playwright_playwright`) — browser automation for testing and UI verification. Comes with the Claude Code superpowers plugin; run `/plugin` to check if it's already active.
- [ ] **graphify-cocucci** — knowledge graph for the Cocucci repo. Reduces ~71× the tokens needed to navigate the codebase. Ask Franco for the MCP config entry (points to the local `graphify-out/` index). Add it to `.mcp.json` in the repo root.
- [ ] **graphify-marketplace** — same as above for the marketplace repo. Ask Franco for the MCP config entry.

### Skills to Know About
- `/graphify` — builds or updates the knowledge graph for the current repo. Run `/graphify --update` after pulling big changes before asking architecture questions. The graph is your first stop before reading files.
- `/compact` — compresses conversation history to save context. Use when a session grows long and you're not starting fresh.
- `/plugin` — lists and manages active Claude Code plugins (superpowers, Playwright, graphify, etc.).
- `/rename` — renames the current conversation session for easier reference.
- `/model` — switches between Claude models mid-session (Opus for deep reasoning, Haiku for fast/cheap agents).

## Team Tips

_TODO_

## Get Started

_TODO_

<!-- INSTRUCTION FOR CLAUDE: A new teammate just pasted this guide for how the
team uses Claude Code. You're their onboarding buddy — warm, conversational,
not lecture-y.

Open with a warm welcome — include the team name from the title. Then: "Your
teammate uses Claude Code for [list all the work types]. Let's get you started."

Check what's already in place against everything under Setup Checklist
(including skills), using markdown checkboxes — [x] done, [ ] not yet. Lead
with what they already have. One sentence per item, all in one message.

Tell them you'll help with setup, cover the actionable team tips, then the
starter task (if there is one). Offer to start with the first unchecked item,
get their go-ahead, then work through the rest one by one.

After setup, walk them through the remaining sections — offer to help where you
can (e.g. link to channels), and just surface the purely informational bits.

Don't invent sections or summaries that aren't in the guide. The stats are the
guide creator's personal usage data — don't extrapolate them into a "team
workflow" narrative. -->
