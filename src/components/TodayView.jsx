import { HABITS, toDateKey } from '../habits'

const WEEKDAY_FORMAT = new Intl.DateTimeFormat('de-DE', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
})

function TodayView({ habits }) {
  const today = new Date()
  const todayKey = toDateKey(today)

  return (
    <div className="today-view">
      <p className="today-date">{WEEKDAY_FORMAT.format(today)}</p>

      <div className="habit-list">
        {HABITS.map((habit) => {
          const done = habits.isDone(todayKey, habit.id)
          const streak = habits.getCurrentStreak(habit.id)
          const longest = habits.getLongestStreak(habit.id)

          return (
            <button
              key={habit.id}
              type="button"
              className={`habit-card${done ? ' done' : ''}`}
              onClick={() => habits.toggleHabit(todayKey, habit.id)}
            >
              <span className="habit-check">{done ? '☑' : '☐'}</span>
              <span className="habit-info">
                <span className="habit-label">{habit.label}</span>
                <span className="habit-streak">
                  🔥 {streak} {streak === 1 ? 'Tag' : 'Tage'} in Folge
                  {longest > 0 && ` · Rekord: ${longest}`}
                </span>
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default TodayView
