/* ============================================================================
   THEME — T3A / WorkRehearsal base
   Shared palette + typography for the rehearsal engine. Retint of what was
   previously "Editorial Noir" — now aligned to the marketing site's T3A
   indigo + purple system on deep indigo-black.

   The `C.*` keys are kept stable (navy, teal, tealMid, amber, etc.) so every
   module that references them keeps working — a theme swap is a values-only
   edit. Per-dimension palettes (theme-d2.js, theme-d4.js, etc.) override
   these color values but re-export SERIF/SANS/DISPLAY from here so a
   font change propagates everywhere.

   See DESIGN.md for the full system and non-negotiables.
   ========================================================================== */

export const C = {
  /* Primary surface — page ground for the Stage. */
  navy:      "#0B0722",  // deep indigo-black (matches --bg)
  navyDeep:  "#07051A",  // deeper indigo for hero / awe screens

  /* Indigo — primary accent (was brushed brass). Chrome highlights,
     narration card borders, framework banners, dominant signal. */
  teal:      "#6366F1",  // indigo (primary)
  tealMid:   "#818CF8",  // indigo highlight
  tealLight: "#C7D2FE",  // pale indigo (hover wash)
  tealDeep:  "#4338CA",  // pressed states, dim labels

  /* Paper — Growth Log and quiet "you are saving this" surfaces. */
  paper:     "#F5F3FF",  // faint lavender-tinted paper
  line:      "#D5D0EA",  // paper divider
  white:     "#FBFAFF",  // off-white that lives on the paper surface

  /* Ink — text on paper. Warm indigo-black. */
  ink:       "#0B0722",
  inkSoft:   "#3A2F66",

  /* Purple — secondary accent (was terracotta). Pause Invitation pills,
     signature moments, callout chips. */
  amber:     "#A855F7",  // purple accent
  amberSoft: "rgba(168, 85, 247, 0.14)",

  /* Quiet red — inline error markers, spreadsheet artifact highlights. */
  paleRed:   "rgba(244, 63, 94, 0.18)",
  redInk:    "#F43F5E",
};

/* Typography — mirrors the marketing tokens in src/styles/global.css.
   Fonts are loaded once in index.html; here we just name them. */
export const DISPLAY = "'Bricolage Grotesque', 'Inter', -apple-system, sans-serif";
export const SERIF   = "'Newsreader', 'EB Garamond', Georgia, serif";
export const SANS    = "'Inter', -apple-system, 'Helvetica Neue', Arial, sans-serif";
