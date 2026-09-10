// Zentrale Definition der Habits (Kern-Habits laut PROJECT.md)
export const HABITS = [
  { id: 'wake', label: 'Früh aufstehen (5 Uhr)' },
  { id: 'yoga', label: '30 Min Yoga' },
]

export const STORAGE_KEY = 'habit-tracker-data'

// Datum als YYYY-MM-DD Key (lokale Zeitzone, keine UTC-Verschiebung)
export function toDateKey(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}
