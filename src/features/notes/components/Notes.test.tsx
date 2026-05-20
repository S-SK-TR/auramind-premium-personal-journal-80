import { render, screen, fireEvent } from '@testing-library/react'
import { Notes } from './Notes'
import { useNotesStore } from '@/core/store/useNotesStore'

// Mock Zustand store
jest.mock('@/core/store/useNotesStore')

const mockNotes = [
  {
    id: '1',
    title: 'Test Note',
    content: 'Test content',
    date: new Date().toISOString()
  }
]

describe('Notes', () => {
  beforeEach(() => {
    (useNotesStore as jest.Mock).mockImplementation((selector) => selector({
      notes: mockNotes,
      addNote: jest.fn(),
      deleteNote: jest.fn()
    }))
  })

  it('renders notes list', () => {
    render(<Notes />)
    expect(screen.getByText('Test Note')).toBeInTheDocument()
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('calls addNote when Add Note button is clicked', () => {
    const addNoteMock = jest.fn()
    (useNotesStore as jest.Mock).mockImplementation((selector) => selector({
      notes: [],
      addNote: addNoteMock,
      deleteNote: jest.fn()
    }))

    render(<Notes />)
    fireEvent.click(screen.getByText('Add Note'))
    expect(addNoteMock).toHaveBeenCalledWith({
      title: 'New Note',
      content: 'Write your content here...'
    })
  })

  it('calls deleteNote when delete button is clicked', () => {
    const deleteNoteMock = jest.fn()
    (useNotesStore as jest.Mock).mockImplementation((selector) => selector({
      notes: mockNotes,
      addNote: jest.fn(),
      deleteNote: deleteNoteMock
    }))

    render(<Notes />)
    fireEvent.click(screen.getAllByRole('button', { name: /delete/i })[0])
    expect(deleteNoteMock).toHaveBeenCalledWith('1')
  })

  it('displays correct date format', () => {
    render(<Notes />)
    const dateElement = screen.getByText(new Date(mockNotes[0].date).toLocaleDateString())
    expect(dateElement).toBeInTheDocument()
  })
})