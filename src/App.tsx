import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { AppShell } from '@/components/layout/AppShell'
import { Dashboard } from '@/features/bento/components/BentoDashboard'
import { Notes } from '@/features/notes/components/Notes'
import { Mood } from '@/features/mood/components/Mood'
import { Routines } from '@/features/routines/components/Routines'

function App() {
  const location = useLocation()

export default function App() {
  return (
    <AppShell>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/mood" element={<Mood />} />
          <Route path="/routines" element={<Routines />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AnimatePresence>
    </AppShell>
  ) );
}

export default App
