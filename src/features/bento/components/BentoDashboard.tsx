import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Notes } from '@/features/notes/components/Notes'
import { Mood } from '@/features/mood/components/Mood'
import { Routines } from '@/features/routines/components/Routines'

interface BentoDashboardProps {
  className?: string
}

export function BentoDashboard({ className }: BentoDashboardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-6",
        className
      )}
    >
      {/* Bento Grid Layout */}
      <div className="md:col-span-2">
        <Notes className="h-full" />
      </div>
      <div className="space-y-6">
        <Mood />
        <Routines />
      </div>
    </motion.div>
  )
}
