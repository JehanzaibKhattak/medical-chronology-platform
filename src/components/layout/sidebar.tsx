'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  FileText, 
  Calendar, 
  Layout, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  FileSearch,
  Brain,
  Users,
  BarChart3,
  Upload
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/contexts/theme-context'

const navigationItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Import Records', href: '/import', icon: Upload },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Medical Findings', href: '/findings', icon: Stethoscope },
  { name: 'Chronologies', href: '/chronologies', icon: Calendar },
  { name: 'Briefs', href: '/briefs', icon: FileSearch },
  { name: 'Templates', href: '/templates', icon: Layout },
  { name: 'Settings', href: '/settings', icon: Settings }
]

export function Sidebar() {
  const { theme } = useTheme()
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <motion.div 
      className={cn(
        "flex flex-col h-full backdrop-blur-xl border-r transition-all duration-300 relative",
        theme === 'dark' 
          ? "bg-slate-900/50 border-slate-800/50" 
          : "bg-white/80 border-gray-200",
        collapsed ? "w-16" : "w-72"
      )}
      initial={false}
      animate={{ width: collapsed ? 64 : 288 }}
    >
      {/* Header */}
      <div className={`flex items-center justify-between p-6 border-b ${
        theme === 'dark' ? 'border-slate-800/50' : 'border-gray-200'
      }`}>
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className={`font-bold text-lg ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Medical AI Assistant</h1>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
                }`}>Legal Research Suite</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {collapsed && (
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto shadow-lg">
            <Stethoscope className="w-5 h-5 text-white" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative overflow-hidden",
                isActive 
                  ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border border-blue-500/30 shadow-lg" 
                  : theme === 'dark'
                    ? "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                collapsed && "justify-center px-3"
              )}
            >
              {isActive && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"
                  layoutId="activeTab"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              <Icon size={20} className="flex-shrink-0 relative z-10" />
              
              <AnimatePresence mode="wait">
                {!collapsed && (
                  <motion.span
                    className="relative z-10"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
              
              {isActive && !collapsed && (
                <motion.div
                  className="absolute right-2 w-2 h-2 bg-blue-400 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                />
              )}
            </Link>
          )
        })}
      </nav>

      {/* User Profile Section */}
      <div className={`p-4 border-t ${
        theme === 'dark' ? 'border-slate-800/50' : 'border-gray-200'
      }`}>
        <div className={cn(
          "flex items-center space-x-3 p-3 rounded-xl transition-colors cursor-pointer",
          theme === 'dark' 
            ? "bg-slate-800/30 hover:bg-slate-800/50" 
            : "bg-gray-100 hover:bg-gray-200",
          collapsed && "justify-center"
        )}>
          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            A
          </div>
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <p className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Attorney</p>
                <p className={`text-xs ${
                  theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
                }`}>Law Firm LLC</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Collapse Button */}
      <div className={`p-4 border-t ${
        theme === 'dark' ? 'border-slate-800/50' : 'border-gray-200'
      }`}>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "flex items-center space-x-2 text-sm transition-colors w-full p-2 rounded-lg",
            theme === 'dark'
              ? "text-slate-400 hover:text-white hover:bg-slate-800/30"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
            collapsed && "justify-center"
          )}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                Collapse
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.div>
  )
}
