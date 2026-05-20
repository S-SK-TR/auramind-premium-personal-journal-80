import { act, renderHook } from '@testing-library/react'
import { useNotesStore } from './useNotesStore'

describe('useNotesStore', () => {
  beforeEach(() => {
    // Clear the store before each test
    useNotesStore.setState({ notes: [] })
  })

  it('should add a note', () => {
    const { result } = renderHook(() => useNotesStore())

    act(() => {
      result.current.addNote({
        title: 'Test Note',
        content: 'Test content'
      })
    })

    expect(result.current.notes).toHaveLength(1)
    expect(result.current.notes[0]).toMatchObject({
      title: 'Test Note',
      content: 'Test content'
    })
    expect(result.current.notes[0].id).toBeDefined()
    expect(result.current.notes[0].date).toBeDefined()
  })

  it('should delete a note', () => {
    const { result } = renderHook(() => useNotesStore())

    // First add a note
    act(() => {
      result.current.addNote({
        title: 'Test Note',
        content: 'Test content'
      })
    })

    const noteId = result.current.notes[0].id

    // Then delete it
    act(() => {
      result.current.deleteNote(noteId)
    })

    expect(result.current.notes).toHaveLength(0)
  })

  it('should persist notes to localStorage', () => {
    const { result } = renderHook(() => useNotesStore())

    act(() => {
      result.current.addNote({
        title: 'Persistent Note',
        content: 'This should persist'
      })
    })

    // Simulate page reload
    const storedState = localStorage.getItem('notes-storage')
    expect(storedState).toContain('Persistent Note')
  })
})