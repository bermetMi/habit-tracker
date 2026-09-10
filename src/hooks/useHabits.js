import { useCallback, useEffect, useState } from 'react'
import { HABITS, loadData, saveData, toDateKey } from '../habits'

// Verwaltet die Habit-Daten in localStorage und berechnet Streaks
export function useHabits() {
  const [data, setData] = useState(() => loadData())

  useEffect(() => {
    saveData(data)
  }, [data])

  const toggleHabit = useCallback((dateKey, habitId) => {
    setData((prev) => {
      const day = { ...(prev[dateKey] || {}) }
      day[habitId] = !day[habitId]
      return { ...prev, [dateKey]: day }
    })
  }, [])

  const isDone = useCallback(
    (dateKey, habitId) => Boolean(data[dateKey]?.[habitId]),
    [data],
  )

  // Aktuelle Streak: Anzahl aufeinanderfolgender Tage bis heute (oder gestern,
  // falls heute noch nicht erledigt), an denen das Habit erledigt wurde.
  const getCurrentStreak = useCallback(
    (habitId) => {
      let streak = 0
      const cursor = new Date()
      const todayKey = toDateKey(cursor)
      if (!data[todayKey]?.[habitId]) {
        cursor.setDate(cursor.getDate() - 1)
      }
      while (data[toDateKey(cursor)]?.[habitId]) {
        streak += 1
        cursor.setDate(cursor.getDate() - 1)
      }
      return streak
    },
    [data],
  )

  // Längste jemals erreichte Streak (über alle gespeicherten Tage hinweg)
  const getLongestStreak = useCallback(
    (habitId) => {
      const doneDays = Object.keys(data)
        .filter((key) => data[key]?.[habitId])
        .sort()
      let longest = 0
      let current = 0
      let prevDate = null

      for (const key of doneDays) {
        const date = new Date(`${key}T00:00:00`)
        if (prevDate) {
          const diffDays = Math.round((date - prevDate) / 86400000)
          current = diffDays === 1 ? current + 1 : 1
        } else {
          current = 1
        }
        longest = Math.max(longest, current)
        prevDate = date
      }
      return longest
    },
    [data],
  )

  // Status eines Tages: 'full' (alle Habits erledigt), 'partial' (einige), 'none'
  const getDayStatus = useCallback(
    (dateKey) => {
      const day = data[dateKey]
      if (!day) return 'none'
      const doneCount = HABITS.filter((h) => day[h.id]).length
      if (doneCount === 0) return 'none'
      if (doneCount === HABITS.length) return 'full'
      return 'partial'
    },
    [data],
  )

  return { toggleHabit, isDone, getCurrentStreak, getLongestStreak, getDayStatus }
}
