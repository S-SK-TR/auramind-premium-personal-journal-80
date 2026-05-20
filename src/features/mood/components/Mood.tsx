import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MoodProps {
  className?: string
}

export function Mood({ className }: MoodProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "glass-card p-6 rounded-2xl border border-[var(--glass-border)]",
        className
      )}
    >
      <h2 className="text-2xl font-bold text-[var(--text-primary)] font-[Outfit] mb-4">Mood Tracker</h2>
      <p className="text-[var(--text-muted)]">Track your daily mood with premium UI elements.</p>
    </motion.div>
  )
}
