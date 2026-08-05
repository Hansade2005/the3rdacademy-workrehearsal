#!/usr/bin/env node
// Apply a .sql file to Supabase via the exec_claudecode_query RPC.
// Splits on statement boundaries while respecting dollar-quoted bodies ($TAG$...$TAG$).
// Strips the trailing ';' per statement — the RPC parser rejects it.
import { readFileSync } from 'node:fs'

const URL = process.env.SUPABASE_URL || 'https://hwdqjrppeiyftwlsxpva.supabase.co'
const KEY = process.env.SUPABASE_ANON_KEY || 'sb_publishable_9Mfa4wwQoEqESWartQ7-oA_7RjeDkSE'
const FN = process.env.EXEC_FN || 'exec_claudecode_query'
const file = process.argv[2]
if (!file) { console.error('usage: run_migration.mjs <file.sql>'); process.exit(2) }

const headers = { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' }

async function rpc(query_text) {
  const res = await fetch(`${URL}/rest/v1/rpc/${FN}`, {
    method: 'POST', headers, body: JSON.stringify({ query_text }),
  })
  const text = await res.text()
  let json; try { json = JSON.parse(text) } catch { json = text }
  return { status: res.status, json }
}

function splitStatements(sql) {
  // Strip line comments only outside dollar-quoted bodies.
  const out = []
  let buf = ''
  let i = 0
  let dq = null // active dollar tag (without $ delimiters)
  while (i < sql.length) {
    if (!dq) {
      // Line comment
      if (sql[i] === '-' && sql[i + 1] === '-') {
        while (i < sql.length && sql[i] !== '\n') i++
        continue
      }
      // Opening dollar quote
      const m = /^\$([A-Za-z_][A-Za-z0-9_]*)?\$/.exec(sql.slice(i))
      if (m) { dq = m[1] || ''; buf += m[0]; i += m[0].length; continue }
      if (sql[i] === ';') {
        const s = buf.trim()
        if (s) out.push(s)
        buf = ''
        i++
        continue
      }
      buf += sql[i++]
    } else {
      // Closing dollar quote
      const close = `$${dq}$`
      if (sql.startsWith(close, i)) { buf += close; i += close.length; dq = null; continue }
      buf += sql[i++]
    }
  }
  const tail = buf.trim()
  if (tail) out.push(tail)
  return out
}

const sql = readFileSync(file, 'utf8')
const stmts = splitStatements(sql)
console.log(`→ ${file}: ${stmts.length} statements`)

let ok = 0
for (const stmt of stmts) {
  const head = stmt.replace(/\s+/g, ' ').slice(0, 80)
  const { status, json } = await rpc(stmt)
  const err = json && typeof json === 'object' && json.error
  if (err || status >= 400) {
    console.log(`✗ ${head}\n   ${JSON.stringify(json)}`)
    process.exitCode = 1
  } else {
    ok++
    console.log(`✓ ${head}`)
  }
}
console.log(`\nApplied ${ok}/${stmts.length}`)

const check = await rpc("SELECT table_name FROM information_schema.tables WHERE table_schema='public' ORDER BY table_name")
console.log('public tables:', JSON.stringify(check.json))
