import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Note {
  id: string
  title: string
  content: string
  date: string
}

interface NotesState {
  notes: Note[]
  addNote: (note: Omit<Note, 'id' | 'date'>) => void
  deleteNote: (id: string) => void
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set) => ({
      notes: [],
      addNote: (note) => set((state) => ({
        notes: [
          {
            id: Date.now().toString(),
            date: new Date().toISOString(),
            ...note
          },
          ...state.notes
        ]
      })),
      deleteNote: (id) => set((state) => ({
        notes: state.notes.filter((note) => note.id !== id)
      }))
    }),
    {
      name: 'notes-storage',
      partialize: (state) => ({ notes: state.notes })
    }
  )
)