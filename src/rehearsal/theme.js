/* ============================================================================
   THEME — Editorial Noir
   Shared palette for every BridgeFast rehearsal module (D1, D2, D3, and any
   future module). One file. One source of truth. Swap the values here and
   every module updates everywhere — screens, chrome, narration cards,
   pattern mirrors, awe close, all of it.

   Register: warm black + cream paper + brushed brass + muted terracotta.
   Literary, considered, slightly old-world. Reads as a documentary or a
   premium magazine — never as a SaaS dashboard.

   The keys are kept stable across themes (the module code references
   `C.navy`, `C.teal`, etc.) so a theme swap is a values-only edit. The
   semantic role of each key is documented below.
   ========================================================================== */

export const C = {
  /* Primary surface — used as the default Stage background. */
  navy:      "#13110F",  // warm cinematic black (semantically "primary bg")
  navyDeep:  "#0A0908",  // deeper warm black (used for hero / awe screens)

  /* Brass — the primary accent that replaced D1's teal. Used for chrome
     highlights, narration card borders, framework banners, and the
     dominant signal colour. */
  teal:      "#C8A35C",  // brushed brass (primary accent)
  tealMid:   "#E0C081",  // lighter brass (highlight strokes, active text)
  tealLight: "#F5E9D1",  // pale brass / cream-gold (hover wash)
  tealDeep:  "#9F8244",  // deeper brass (pressed states, dim labels)

  /* Cream paper — used by the Growth Log and any quiet "you are saving
     this" surface. Slightly warm, never pure white. */
  paper:     "#F4EFE6",
  line:      "#E2DBC9",  // cream-tone divider line
  white:     "#FBF7EE",  // an off-white that lives alongside the cream

  /* Ink — text on cream. Warm dark, not blue-black. */
  ink:       "#1A1814",
  inkSoft:   "#4A463D",

  /* Terracotta — the secondary accent that replaced D1's amber. Used for
     Pause Invitation pills, the "silence has weight" signature, the
     amber warning chip on incorrect F-drill selections. */
  amber:     "#E07856",
  amberSoft: "rgba(224, 120, 86, 0.14)",

  /* Quiet red — used for paleRed inline highlights (error markers in
     spreadsheet artifacts) and redInk error text. Toned to sit on both
     the warm-black and the cream surfaces without flashing. */
  paleRed:   "rgba(186, 60, 56, 0.18)",
  redInk:    "#B83C38",
};
