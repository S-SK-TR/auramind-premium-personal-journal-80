import { useNotesStore } from '@/core/store/useNotesStore'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface Note {
  id: string
  title: string
  content: string
  date: string
}

export function Notes() {
  const notes = useNotesStore(state => state.notes)
  const addNote = useNotesStore(state => state.addNote)
  const deleteNote = useNotesStore(state => state.deleteNote)

  const handleAddNote = () => {
    addNote({
      title: 'New Note',
      content: 'Write your content here...'
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] font-[Outfit]">Notes</h1>
        <Button
          onClick={handleAddNote}
          className="group"
        >
          <Plus size={16} className="mr-2 group-hover:rotate-90 transition-transform" />
          Add Note
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="glass-card p-4 space-y-3 rounded-2xl border border-[var(--glass-border)]"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold font-[Outfit]">{note.title}</h3>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Edit size={16} />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => deleteNote(note.id)}>
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
            <p className="text-sm text-[var(--text-secondary)]">{note.content}</p>
            <p className="text-xs text-[var(--text-muted)]">
              {new Date(note.date).toLocaleDateString()}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}