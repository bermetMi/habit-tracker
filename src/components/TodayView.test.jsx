import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { HABITS } from '../habits'
import { useHabits } from '../hooks/useHabits'
import TodayView from './TodayView'

// Wrapper, damit der echte Hook mit der Komponente verbunden ist
function Wrapper() {
  const habits = useHabits()
  return <TodayView habits={habits} />
}

describe('TodayView', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('rendert alle definierten Habits', () => {
    render(<Wrapper />)
    for (const habit of HABITS) {
      expect(screen.getByText(habit.label)).toBeInTheDocument()
    }
  })

  it('markiert ein Habit beim Klick als erledigt', async () => {
    const user = userEvent.setup()
    render(<Wrapper />)

    const firstHabit = HABITS[0]
    const card = screen.getByText(firstHabit.label).closest('button')

    expect(card).not.toHaveClass('done')

    await user.click(card)
    expect(card).toHaveClass('done')
  })
})
