import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { LayoutDashboard, BookOpen, Smile, Repeat, Plus } from 'lucide-react'

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/notes', icon: BookOpen, label: 'Notes' },
    { to: '/mood', icon: Smile, label: 'Mood' },
    { to: '/routines', icon: Repeat, label: 'Routines' },
    { to: '/new', icon: Plus, label: 'New' }
  ]

  return (
    <div className="flex h-screen bg-[var(--bg-base)] text-[var(--text-primary)]">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-md">
        <div className="h-16 flex items-center justify-center border-b border-[var(--glass-border)]">
          <span className="text-xl font-bold text-[var(--text-primary)] font-[Outfit]">MyDailyNotes</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                location.pathname === item.to
                  ? "bg-[var(--brand-500)]/10 text-[var(--brand-500)]"
                  : "hover:bg-[var(--glass-bg)]/50 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              )}
            >
              <item.icon size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <div className="flex justify-around items-center h-16 bg-[var(--glass-bg)] backdrop-blur-md border-t border-[var(--glass-border)]">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full transition-colors duration-200",
                location.pathname === item.to
                  ? "text-[var(--brand-500)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              )}
            >
              <item.icon size={20} />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="min-h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
