import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface Routine {
  id: string
  name: string
  completed: boolean
}

export function Routines() {
  const [routines, setRoutines] = useState<Routine[]>([])
  const [newRoutine, setNewRoutine] = useState('')

  const addRoutine = () => {
    if (newRoutine.trim()) {
      setRoutines([
        ...routines,
        { id: Date.now().toString(), name: newRoutine, completed: false }
      ])
      setNewRoutine('')
    }
  }

  const toggleRoutine = (id: string) => {
    setRoutines(routines.map(routine =>
      routine.id === id ? { ...routine, completed: !routine.completed } : routine
    ))
  }

  const deleteRoutine = (id: string) => {
    setRoutines(routines.filter(routine => routine.id !== id))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] font-[Outfit]">Routines</h1>
      </div>

      <div className="glass-card p-6 rounded-2xl border border-[var(--glass-border)]">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newRoutine}
            onChange={(e) => setNewRoutine(e.target.value)}
            placeholder="Add a new routine..."
            className="flex-1 p-2 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
            onKeyPress={(e) => e.key === 'Enter' && addRoutine()}
          />
          <Button onClick={addRoutine}>
            <Plus size={16} className="mr-2" />
            Add
          </Button>
        </div>

        <div className="space-y-2">
          {routines.map((routine) => (
            <motion.div
              key={routine.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className={`flex items-center justify-between p-3 rounded-lg ${routine.completed ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-[var(--glass-bg)] border border-[var(--glass-border)]'}`}
            >
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleRoutine(routine.id)}
                  className={routine.completed ? 'text-emerald-500' : ''}
                >
                  {routine.completed ? <Check size={18} /> : <div className="w-5 h-5 rounded-full border-2 border-[var(--text-muted)]" />}
                </Button>
                <span className={routine.completed ? 'line-through text-[var(--text-muted)]' : ''}>{routine.name}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteRoutine(routine.id)}
              >
                <X size={16} />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}