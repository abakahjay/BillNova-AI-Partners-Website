# Repository Guidelines

## Project Structure

This pnpm workspace contains the BillNova AI Partners React/Vite site at `artifacts/billnova-ai-partners/`: pages in `src/pages/`, shared UI in `src/components/`, motion in `src/lib/motion.jsx`, helpers in `src/services/`, styles in `src/index.css`, and assets in `public/` (the hero's rendered 3D loop is in `public/media/`; give a changed video a new versioned file name so browsers don't reuse a cached copy). Routing uses Wouter. The contact form posts to the shared FullBackendd API set by `VITE_API_BASE_URL`. Automation lives in `scripts/`. Do not edit generated `dist/` or dependency folders.

## Build and Development

Use pnpm from the repository root; the preinstall guard rejects npm and Yarn.

- `pnpm install` installs workspace dependencies (npm and Yarn are rejected).
- `pnpm --filter @workspace/billnova-ai-partners dev` runs the site locally on port 5173.
- `pnpm --filter @workspace/billnova-ai-partners build` creates the production site in that package's `dist/` directory.
- `pnpm --filter @workspace/billnova-ai-partners serve` previews the production build.
- `pnpm run typecheck` checks the supported workspace packages; `pnpm run build` typechecks and builds packages that define build scripts.

The website has no test script. Run `pnpm run typecheck` or the relevant build for code changes. For UI changes, review the page locally at desktop and mobile widths.

## Code Style

Follow existing React and JavaScript patterns. Use two spaces, PascalCase component names, and camelCase functions and variables. Keep shared UI in `src/components/`. Format with `pnpm exec prettier --write <path>` when appropriate. Preserve the navy/blue identity and self-hosted fonts.

## Design Quality

Do not ship generic, "vibe coded" layouts. For public page design or review, use the `design-taste-frontend` skill: ground the concept and content in BillNova's services and audience, then inspect the page in a real browser. For motion work, apply `.claude/skills/website-motion-design/SKILL.md`. Avoid stock templates, purposeless gradients or motion, repeated icon-card grids, and invented testimonials, logos, or results. Use verified copy and real assets. Check desktop and mobile layouts, keyboard focus, and reduced-motion behavior; the page must work with animation disabled.

### Skill order for website work

Run these skills in order. Each one is installed for both Codex (`~/.codex/skills`) and Claude Code.

1. **Direction:** `design-taste-frontend` and `no-vibecoded-look`. Ground every section in BillNova's real services and audience.
2. **Motion and polish:** `pro-web-motion` (GSAP, ScrollTrigger, Lenis) together with `.claude/skills/website-motion-design/SKILL.md`, then `emil-design-eng` for small details. Every animation needs a purpose and a `prefers-reduced-motion` fallback.
3. **Clean up:** `ai-slop-audit` (20 AI-made tells), then `impeccable` for layout, type, color, copy and accessibility.
4. **Secure:** `security-audit-swarm`, then `vibe-code-legal-audit`.
5. **Check:** `browser-automation` at desktop (1440px) and phone (390px) widths, then the `no-vibecoded-look` launch checklist.

### Working alongside another agent

Codex and Claude Code may work in this repository at the same time.

- **Talk through `.handoff/chat.md`.** Read it before every edit and append a short dated line after each one, saying who you are (`Codex:` or `Claude:`), what you changed and which files. Use it to ask the other agent questions and to answer them.
- **Claim files before editing.** The `## Claims` list at the top of `.handoff/chat.md` says who owns which file or which part of a file. Do not edit a file the other agent has claimed. Ask in the chat instead, and release your claim when you are done.
- **Re-read before writing.** The other agent may have changed a file since you last read it. Make small, targeted patches, and never rewrite a whole file from an older copy.
- `.handoff/review.md` holds Claude's review findings. Fix the open items that fall in your claims and mark each one `[x]`.
- **Do not commit or push.** The user reviews and commits. Do not commit `.handoff/`.

## Commits and Pull Requests

History favors short, direct commit subjects; no strict prefix convention is established. Use a specific subject (for example, `Improve mobile navigation spacing`). PRs should describe the change, list validation, link related work, and show desktop/mobile screenshots for visual updates.

## Configuration and Safety

Keep secrets in environment configuration and out of source control. Check package-specific environment requirements before running backend services. Preserve the pnpm minimum release age policy in `pnpm-workspace.yaml`; do not disable or weaken it. Avoid changing workspace dependencies or generated files unless needed.
