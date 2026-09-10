import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { toDateKey } from '../habits'
import { useHabits } from './useHabits'

// Hilfsfunktion: Datums-Key relativ zu heute (offset in Tagen)
function dayKey(offset = 0) {
  const d = new Date()
  d.setDate(d.getDate() + offset)
  return toDateKey(d)
}

describe('useHabits', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('toggelt ein Habit an und aus', () => {
    const { result } = renderHook(() => useHabits())
    const key = dayKey(0)

    expect(result.current.isDone(key, 'yoga')).toBe(false)

    act(() => result.current.toggleHabit(key, 'yoga'))
    expect(result.current.isDone(key, 'yoga')).toBe(true)

    act(() => result.current.toggleHabit(key, 'yoga'))
    expect(result.current.isDone(key, 'yoga')).toBe(false)
  })

  it('berechnet die aktuelle Streak über aufeinanderfolgende Tage', () => {
    const { result } = renderHook(() => useHabits())

    act(() => {
      result.current.toggleHabit(dayKey(0), 'yoga')
      result.current.toggleHabit(dayKey(-1), 'yoga')
      result.current.toggleHabit(dayKey(-2), 'yoga')
    })

    expect(result.current.getCurrentStreak('yoga')).toBe(3)
  })

  it('unterbricht die aktuelle Streak bei einer Lücke', () => {
    const { result } = renderHook(() => useHabits())

    act(() => {
      result.current.toggleHabit(dayKey(0), 'yoga')
      // dayKey(-1) fehlt -> Lücke
      result.current.toggleHabit(dayKey(-2), 'yoga')
    })

    expect(result.current.getCurrentStreak('yoga')).toBe(1)
  })

  it('berechnet die längste jemals erreichte Streak', () => {
    const { result } = renderHook(() => useHabits())

    act(() => {
      // 3er-Streak in der Vergangenheit
      result.current.toggleHabit(dayKey(-10), 'yoga')
      result.current.toggleHabit(dayKey(-9), 'yoga')
      result.current.toggleHabit(dayKey(-8), 'yoga')
      // einzelner Tag heute
      result.current.toggleHabit(dayKey(0), 'yoga')
    })

    expect(result.current.getLongestStreak('yoga')).toBe(3)
  })

  it('liefert den Tagesstatus none/partial/full', () => {
    const { result } = renderHook(() => useHabits())
    const key = dayKey(0)

    expect(result.current.getDayStatus(key)).toBe('none')

    act(() => result.current.toggleHabit(key, 'yoga'))
    expect(result.current.getDayStatus(key)).toBe('partial')

    act(() => result.current.toggleHabit(key, 'wake'))
    expect(result.current.getDayStatus(key)).toBe('full')
  })
})
