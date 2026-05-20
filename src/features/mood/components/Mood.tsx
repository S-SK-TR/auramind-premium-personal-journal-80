import { useState } from 'react'
import { motion } from 'framer-motion'
import { Smile, HelpCircle, HelpCircle, HelpCircle, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const moods = [
  { icon: HelpCircle, label: 'Great', color: 'bg-emerald-500/10 text-emerald-500' },
  { icon: Smile, label: 'Good', color: 'bg-blue-500/10 text-blue-500' },
  { icon: HelpCircle, label: 'Okay', color: 'bg-yellow-500/10 text-yellow-500' },
  { icon: HelpCircle, label: 'Bad', color: 'bg-orange-500/10 text-orange-500' },
  { icon: HelpCircle, label: 'Terrible', color: 'bg-rose-500/10 text-rose-500' }
]

export function Mood() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] font-[Outfit]">Mood Tracker</h1>
      </div>

      <div className="glass-card p-6 rounded-2xl border border-[var(--glass-border)]">
        <h2 className="text-xl font-semibold mb-4">How are you feeling today?</h2>
        <div className="flex flex-wrap gap-4">
          {moods.map((mood) => (
            <Button
              key={mood.label}
              variant={selectedMood === mood.label ? 'default' : 'ghost'}
              className={`flex flex-col items-center justify-center p-4 ${mood.color} ${selectedMood === mood.label ? 'ring-2 ring-[var(--brand-500)]' : ''}`}
              onClick={() => setSelectedMood(mood.label)}
            >
              <mood.icon size={24} />
              <span className="mt-2">{mood.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {selectedMood && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="glass-card p-6 rounded-2xl border border-[var(--glass-border)]"
        >
          <h2 className="text-xl font-semibold mb-4">Your mood: {selectedMood}</h2>
          <p className="text-[var(--text-muted)]">Thank you for sharing your mood. This helps us understand your daily well-being.</p>
        </motion.div>
      )}
    </motion.div>
  )
}