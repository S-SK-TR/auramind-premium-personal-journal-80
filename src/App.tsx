import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { AppShell } from '@/components/layout/AppShell'
import { BentoDashboard } from '@/features/bento/components/BentoDashboard'
import { Notes } from '@/features/notes/components/Notes'
import { Mood } from '@/features/mood/components/Mood'
import { Routines } from '@/features/routines/components/Routines'
import { NewPage } from '@/features/new/NewPage'

function App() {
  const location = useLocation()

  return (
    <AppShell>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<BentoDashboard />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/mood" element={<Mood />} />
          <Route path="/routines" element={<Routines />} />
          <Route path="/new" element={<NewPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AnimatePresence>
    </AppShell>
  )
}

export default App