/* ============================================================================
   NARRATION KEY — deterministic content hash for a spoken string.

   The same function runs in the browser (usePiper) and in the build-time
   generator (scripts/generate-narration.mjs). Identical input text ⇒ identical
   key ⇒ the browser plays exactly the file the generator wrote.

   FNV-1a (32-bit) over the UTF-8 code units, rendered as 8 hex chars.
   Pure, dependency-free, stable across Node and every browser.
   ========================================================================== */

export function narrationKey(text) {
  const s = String(text == null ? "" : text);
  let h = 0x811c9dc5; // FNV offset basis
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    // 32-bit FNV prime multiply, kept in uint32 range
    h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0;
  }
  return h.toString(16).padStart(8, "0");
}
