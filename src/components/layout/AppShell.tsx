import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutDashboard, BookOpen, Smile, Repeat, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/notes', icon: BookOpen, label: 'Notes' },
  { to: '/mood', icon: Smile, label: 'Mood' },
  { to: '/routines', icon: Repeat, label: 'Routines' }
]

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="flex h-dvh bg-[var(--bg-base)] text-[var(--text-primary)] overflow-hidden">
      {/* ── Mobile Sidebar Toggle ── */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-[var(--glass-bg)] backdrop-blur-sm border border-[var(--glass-border)]"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* ── Desktop Sidebar ── */}
      <aside className={cn(
        "hidden md:flex flex-col w-64 border-r border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-sm shrink-0",
        "glass-card rounded-none"
      )}>
        {/* Logo */}
        <div className="h-16 flex items-center px-5 border-b border-[var(--glass-border)]">
          <span className="font-bold text-xl tracking-tight font-[Outfit]">AuraMind</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-[var(--brand-500)]/10 text-[var(--brand-500)]"
                  : "hover:bg-[var(--glass-bg)] hover:text-[var(--text-primary)]"
              )}
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* ── Mobile Sidebar (Overlay) ── */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={cn(
              "fixed inset-y-0 left-0 z-40 w-64 border-r border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-sm",
              "glass-card rounded-none md:hidden"
            )}
          >
            {/* Logo */}
            <div className="h-16 flex items-center px-5 border-b border-[var(--glass-border)]">
              <span className="font-bold text-xl tracking-tight font-[Outfit]">AuraMind</span>
            </div>

            {/* Nav */}
            <nav className="flex-1 p-3 space-y-0.5">
              {navItems.map(({ to, icon: Icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-[var(--brand-500)]/10 text-[var(--brand-500)]"
                      : "hover:bg-[var(--glass-bg)] hover:text-[var(--text-primary)]"
                  )}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </NavLink>
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ── Main Content ── */}
      <main className={cn(
        "flex-1 overflow-auto p-4 md:p-6",
        isSidebarOpen && "md:pl-[calc(16rem+1px)]"
      )}>
        {children}
      </main>
    </div>
  )
}