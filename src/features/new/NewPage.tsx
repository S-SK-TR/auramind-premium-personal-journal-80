import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface NewPageProps {
  className?: string;
}

export function NewPage({ className }: NewPageProps) {
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
      <h1 className="text-3xl font-bold text-[var(--text-primary)] font-[Outfit]">New Page</h1>
      <p className="text-[var(--text-muted)]">This is a new page with premium UI elements.</p>
    </motion.div>
  );
}