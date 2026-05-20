import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'

interface AuthLayoutProps {
  children?: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--bg-base)]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 z-0"
      >
        {/* Arka plan dekorasyonu */}
        <div className="absolute inset-0 bg-[var(--brand-500)] opacity-5"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"4\" height=\"4\" viewBox=\"0 0 4 4\"><path fill=\"#000\" fill-opacity=\"0.1\" d=\"M1 3h1v1H1V3zm2-2h1v1H3V1z\"/></svg>')]"></div>
      </motion.div>

      <div className="relative z-10">
        {children || <Outlet />}
      </div>
    </div>
  )
}