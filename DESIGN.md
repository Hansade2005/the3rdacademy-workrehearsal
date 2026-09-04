# WorkRehearsal Design System

Canonical reference for the T3A / WorkRehearsal visual system.
Any new surface — marketing pages, module chrome, admin — is built from these
tokens. Per-dimension palettes (D2 sage, D4 wine-cellar aubergine, D5 sage,
etc.) are intentional editorial variants layered on top; they inherit
typography, spacing, motion and interactive states from this system.

## Source of truth

- **Tokens live in** `src/styles/global.css` under `:root`.
- **Fonts are loaded once in** `index.html` (Bricolage Grotesque, Newsreader,
  Inter). Every surface uses the CSS variables below, not raw font names.
- **Module themes** live in `src/rehearsal/theme.js` (base) and
  `src/rehearsal/theme-<slug>.js` (per-dimension). They import `SERIF`,
  `SANS` and `DISPLAY` from `theme.js` so a font swap here propagates
  everywhere.

## Palette

| Token | Value | Role |
| --- | --- | --- |
| `--bg` | `#0B0722` | Deep indigo-black — page ground, solid fallback |
| `--bg-2` | `#160D33` | Card surface (purple-tinted) |
| `--bg-3` | `#1E1445` | Elevated / muted surface |
| `--line` | `#2A1F55` | Ambient border (purple-tinted) |
| `--paper` | `#FFFFFF` | Primary text on dark |
| `--paper-soft` | `#D9D9D9` | Secondary text (~85% white) |
| `--paper-mute` | `#A6A6A6` | Tertiary / labels (~65% white) |
| `--primary` | `#6366F1` | Indigo — CTAs, focus rings, seal core |
| `--flame` | `#A855F7` | Purple accent (formerly vermilion) |
| `--tech-cyan` | `#22D3EE` | Data / status highlight |
| `--tech-lime` | `#A3E635` | Status ticks, countdown rules |

Gradients: `--gradient-hero`, `--gradient-accent`, `--gradient-text`.
Shadows: `--shadow-card`, `--shadow-glow`, `--shadow-glow-purple`, `--shadow-glow-tech`.

## Typography

| Token | Value | Use |
| --- | --- | --- |
| `--font-display` | `Bricolage Grotesque` | Section titles, hero headlines |
| `--font-serif` | `Newsreader` | Long-form body, italic pull quotes, module narration |
| `--font-sans` | `Inter` | UI copy, buttons, meta strips |

American spelling throughout, per T3A brand lock (11 August 2026). Never
use `Behaviour`, `Centre`, `Colour` etc. anywhere in participant-facing copy.

## Per-dimension variants — the rule

Each dimension module ships its own thematic palette so that living inside
the module reads as an editorial chapter rather than a SaaS screen. The
overrides are colors only; **typography, spacing, motion, focus rings, CTA
shape and interactive states are inherited from the base system**.

Adding a new dimension variant:

1. Copy `src/rehearsal/theme.js` to `src/rehearsal/theme-<slug>.js`.
2. Override the `C.*` color keys only. Do NOT re-declare `SERIF`, `SANS`,
   `DISPLAY` — they are re-exported from `theme.js`.
3. Add a section to this file describing the variant's editorial register
   and its central accent.

## Existing variants

| File | Register | Central accent |
| --- | --- | --- |
| `theme.js` (base) | T3A editorial — indigo on deep indigo-black | Indigo `#6366F1`, purple `#A855F7` |
| `theme-d2.js` | Sage / paper | Sage green |
| `theme-d3.js` | Editorial noir — warm black + brass | Brushed brass `#C8A35C` |
| `theme-d4.js` | Wine cellar — aubergine + rose gold | Rose gold `#B8828A` |
| `theme-d5.js` | Sage / cream | Sage |
| `theme-d8.js` | Slate + warm | Slate accent |
| `theme-d9.js` | Capstone — deep + citrine | Citrine |

## Non-negotiables

- No progress bars, rings, percentages or "X of Y" fractions anywhere
  inside a module, on Smart Resume, or on the free-release shell.
  A pattern mirror is fine; a progress meter is not.
- No lock icons, blurred previews or upgrade CTAs on removed content in
  the free release. Content is deleted, not gated.
- Buttons: minimum 48px tap target. Focus rings visible in both light
  and dark surfaces.
- Motion: opt-out via `prefers-reduced-motion: reduce`; no auto-play
  video; audio is opt-in per module entry.

## Reference documents

- `scripts/T3A_Dimension_Production_Standard_rev0 (1).md` — dimension
  production standard.
- `scripts/AI_Ready_Behaviours_Production_Standard_v1_2.md` — AIWorkLab
  production standard (M1–M5).
- `scripts/CLAUDE_PROGRESS_MEMORY.md` — architecture memory.
