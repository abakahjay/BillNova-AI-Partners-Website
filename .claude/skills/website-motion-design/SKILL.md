---
name: website-motion-design
description: Use when designing, building, or reviewing a website where motion, scrolling, or animated interface details affect the experience. Use it to make movement intentional and polished rather than decorative, using GSAP, Lenis, and React Bits when they fit the project.
---

# Website Motion Design

Treat motion as part of the page's hierarchy and storytelling. A strong static layout comes first; animation cannot make generic content or composition feel considered.

## Workflow

1. Identify the page's purpose, audience, existing brand, and primary action. Preserve working content and behavior unless the user asks to change them.
2. Choose one motion idea tied to the subject. State what the movement helps visitors notice, understand, or do.
3. Use a small motion system: clear start and end states, consistent easing, short durations, and deliberate sequencing. Give the hero one authored moment; keep other sections calm unless their content benefits from motion.
4. Prefer installed, maintained project dependencies. Use GSAP for timelines or coordinated scroll scenes, Lenis only when smooth scrolling materially improves the page, and React Bits as a source of reusable components when an appropriate component fits. These are tools, not a checklist: do not add a dependency or copy a component just to use its name.
5. Keep all important content visible and usable without JavaScript or animation. Respect `prefers-reduced-motion`, keyboard navigation, touch scrolling, browser history, and anchor links. Clean up animation instances and listeners when React components unmount.
6. Review the rendered page at phone, tablet, and desktop widths, with reduced motion enabled and with keyboard input. Check for clipped text, scroll hijacking, layout shifts, slow paint, and effects that obscure the primary action. Fix issues before finishing.

## Guardrails

- Movement should reinforce reading order or interaction feedback, not decorate every element.
- Do not hijack native scrolling, hide essential text until an animation runs, or force smooth scrolling on users who request reduced motion.
- Avoid constant looping, excessive parallax, cursor-follow effects, and repeated identical section reveals.
- Keep animation performant: favor transform and opacity, avoid layout-triggering animation, and do not add `will-change` globally.
- Preserve the site's visual identity. Adapt a React Bits component before using it; verify its accessibility, dependencies, licensing, and reduced-motion behavior.
- Do not fetch scripts from a CDN when the project can use a local dependency or a small native implementation.

## Source

Adapted from the user's requested [TikTok website-motion video](https://vt.tiktok.com/ZSgCTrABX/), which highlights GSAP for scroll choreography, Lenis for smooth scrolling, and React Bits for animated interface components. Apply the principles selectively to the actual brief.
