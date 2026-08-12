import { useEffect, useState } from 'react'

// Anchored to 00:00 America/Edmonton (MDT, UTC-6) on 22 August 2026.
// Browsers auto-convert to the viewer's local zone; the marginalia footer
// prints both the viewer's zone and the Alberta anchor for transparency.
const LAUNCH_ISO = '2026-08-22T06:00:00Z'
const LAUNCH_TS = Date.parse(LAUNCH_ISO)

function diff(nowTs) {
  const ms = Math.max(0, LAUNCH_TS - nowTs)
  const s = Math.floor(ms / 1000)
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
    over: ms === 0,
  }
}

function pad(n) { return String(n).padStart(2, '0') }

function viewerZone() {
  try {
    const z = Intl.DateTimeFormat().resolvedOptions().timeZone
    return z || 'local time'
  } catch {
    return 'local time'
  }
}

function viewerLocalLaunch() {
  try {
    return new Intl.DateTimeFormat(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    }).format(new Date(LAUNCH_TS))
  } catch {
    return new Date(LAUNCH_TS).toString()
  }
}

export default function LaunchCountdown() {
  const [t, setT] = useState(() => diff(Date.now()))

  useEffect(() => {
    const id = setInterval(() => setT(diff(Date.now())), 1000)
    return () => clearInterval(id)
  }, [])

  if (t.over) {
    return (
      <section className="launch-countdown launch-countdown--open" aria-live="polite">
        <div className="container">
          <div className="lc-open-strip">
            <span className="lc-open-dot" aria-hidden="true"></span>
            <span className="lc-open-label">Now open</span>
            <span className="lc-open-sub">
              Rehearsals are live. Practise the moments that decide your job.
            </span>
          </div>
        </div>
      </section>
    )
  }

  const fields = [
    { key: 'Days',    val: t.days },
    { key: 'Hours',   val: pad(t.hours) },
    { key: 'Minutes', val: pad(t.minutes) },
    { key: 'Seconds', val: pad(t.seconds) },
  ]

  return (
    <section className="launch-countdown" aria-label="Launch countdown">
      <div className="container">
        <div className="lc-frame">
          <div className="lc-head">
            <div className="lc-stamp">
              <span className="lc-stamp-dot" aria-hidden="true"></span>
              Register · Opening soon
            </div>
            <p className="lc-subtitle">
              § Anchor · 00:00 MDT · Calgary, Alberta
            </p>
          </div>

          <ol className="lc-grid" role="list">
            {fields.map(f => (
              <li key={f.key} className="lc-field">
                <span className="lc-num">{f.val}</span>
                <span className="lc-key">{f.key}</span>
              </li>
            ))}
          </ol>

          <p className="lc-marginalia">
            Anchored to <em>00:00 America/Edmonton, 22 August 2026</em>.
            Your device shows: <strong>{viewerLocalLaunch()}</strong> ({viewerZone()}).
          </p>
        </div>
      </div>
    </section>
  )
}
