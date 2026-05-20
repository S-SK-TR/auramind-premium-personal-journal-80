import { motion } from 'framer-motion'
import { LayoutDashboard, BookOpen, Smile, Repeat } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const bentoItems = [
  { to: '/notes', icon: BookOpen, title: 'Notes', description: 'Organize your thoughts and ideas' },
  { to: '/mood', icon: Smile, title: 'Mood Tracker', description: 'Track your daily emotions' },
  { to: '/routines', icon: Repeat, title: 'Routines', description: 'Build and track your daily habits' }
]

export function Dashboard() {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] font-[Outfit]">Dashboard</h1>
        <div className="flex items-center gap-2">
          <LayoutDashboard size={20} className="text-[var(--brand-500)]" />
          <span className="text-sm text-[var(--text-muted)]">Overview</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bentoItems.map((item, index) => (
          <motion.div
            key={item.to}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="glass-card p-6 rounded-2xl border border-[var(--glass-border)] cursor-pointer"
            onClick={() => navigate(item.to)}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-[var(--brand-500)]/10 text-[var(--brand-500)]">
                <item.icon size={20} />
              </div>
              <h3 className="text-lg font-semibold font-[Outfit]">{item.title}</h3>
            </div>
            <p className="text-sm text-[var(--text-muted)]">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}