import { beforeEach, describe, expect, it } from 'vitest'
import { STORAGE_KEY, loadData, saveData, toDateKey } from './habits'

describe('toDateKey', () => {
  it('formatiert ein Datum als YYYY-MM-DD in lokaler Zeitzone', () => {
    const date = new Date(2026, 8, 5) // 5. September 2026 (Monat 0-basiert)
    expect(toDateKey(date)).toBe('2026-09-05')
  })

  it('füllt Monat und Tag mit führenden Nullen auf', () => {
    const date = new Date(2026, 0, 1) // 1. Januar 2026
    expect(toDateKey(date)).toBe('2026-01-01')
  })
})

describe('loadData / saveData', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('gibt ein leeres Objekt zurück, wenn nichts gespeichert ist', () => {
    expect(loadData()).toEqual({})
  })

  it('speichert und lädt Daten korrekt', () => {
    const data = { '2026-09-05': { yoga: true } }
    saveData(data)
    expect(loadData()).toEqual(data)
  })

  it('gibt bei ungültigem JSON ein leeres Objekt zurück', () => {
    localStorage.setItem(STORAGE_KEY, 'kein-json')
    expect(loadData()).toEqual({})
  })
})
