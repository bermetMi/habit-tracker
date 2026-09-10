import '@testing-library/jest-dom'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Nach jedem Test das gerenderte DOM und localStorage aufräumen
afterEach(() => {
  cleanup()
  localStorage.clear()
})
