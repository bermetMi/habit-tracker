import { useMemo, useState } from 'react'
import { toDateKey } from '../habits'

const WEEKDAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']
const MONTH_FORMAT = new Intl.DateTimeFormat('de-DE', {
  month: 'long',
  year: 'numeric',
})

function buildMonthGrid(year, month) {
  const firstDay = new Date(year, month, 1)
  // Montag = 0 ... Sonntag = 6
  const firstWeekday = (firstDay.getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells = []
  for (let i = 0; i < firstWeekday; i += 1) cells.push(null)
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(new Date(year, month, day))
  }
  return cells
}

function CalendarView({ habits }) {
  const [cursor, setCursor] = useState(() => new Date())
  const year = cursor.getFullYear()
  const month = cursor.getMonth()

  const cells = useMemo(() => buildMonthGrid(year, month), [year, month])
  const todayKey = toDateKey(new Date())

  const goToMonth = (delta) => {
    setCursor(new Date(year, month + delta, 1))
  }

  return (
    <div className="calendar-view">
      <div className="calendar-header">
        <button type="button" onClick={() => goToMonth(-1)} aria-label="Vorheriger Monat">
          ‹
        </button>
        <h2>{MONTH_FORMAT.format(cursor)}</h2>
        <button type="button" onClick={() => goToMonth(1)} aria-label="Nächster Monat">
          ›
        </button>
      </div>

      <div className="calendar-grid calendar-weekdays">
        {WEEKDAYS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="calendar-grid">
        {cells.map((date, i) => {
          if (!date) return <span key={`empty-${i}`} className="calendar-cell empty" />
          const key = toDateKey(date)
          const status = habits.getDayStatus(key)
          const isToday = key === todayKey
          return (
            <span
              key={key}
              className={`calendar-cell status-${status}${isToday ? ' today' : ''}`}
              title={key}
            >
              {date.getDate()}
            </span>
          )
        })}
      </div>

      <div className="calendar-legend">
        <span><i className="dot status-full" /> beide erledigt</span>
        <span><i className="dot status-partial" /> eine erledigt</span>
        <span><i className="dot status-none" /> keine erledigt</span>
      </div>
    </div>
  )
}

export default CalendarView
