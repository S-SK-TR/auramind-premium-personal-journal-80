import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface RoutinesProps {
  className?: string
}

export function Routines({ className }: RoutinesProps) {
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
      <h2 className="text-2xl font-bold text-[var(--text-primary)] font-[Outfit] mb-4">Daily Routines</h2>
      <p className="text-[var(--text-muted)]">Manage your daily routines with premium UI.</p>
    </motion.div>
  )
}
