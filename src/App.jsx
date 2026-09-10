import { useState } from 'react'
import CalendarView from './components/CalendarView'
import TodayView from './components/TodayView'
import { useHabits } from './hooks/useHabits'
import './App.css'

function App() {
  const [tab, setTab] = useState('heute')
  const habits = useHabits()

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌱 Habit Tracker</h1>
      </header>

      <nav className="tabs">
        <button
          type="button"
          className={tab === 'heute' ? 'active' : ''}
          onClick={() => setTab('heute')}
        >
          Heute
        </button>
        <button
          type="button"
          className={tab === 'kalender' ? 'active' : ''}
          onClick={() => setTab('kalender')}
        >
          Kalender
        </button>
      </nav>

      <main>
        {tab === 'heute' ? (
          <TodayView habits={habits} />
        ) : (
          <CalendarView habits={habits} />
        )}
      </main>
    </div>
  )
}

export default App
