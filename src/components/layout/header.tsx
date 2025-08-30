'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, Bell, User, Settings, LogOut, Moon, Sun, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/contexts/theme-context'

export function Header() {
  const { theme, toggleTheme } = useTheme()
  const [searchFocused, setSearchFocused] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  
  const notificationsRef = useRef<HTMLDivElement>(null)
  const userMenuRef = useRef<HTMLDivElement>(null)

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Close menus when pressing Escape
  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setShowNotifications(false)
        setShowUserMenu(false)
      }
    }

    document.addEventListener('keydown', handleEscapeKey)
    return () => {
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [])

  const notifications = [
    {
      id: 1,
      title: 'Document Processing Complete',
      message: 'Johnson, Mary case files have been processed successfully',
      time: '2 minutes ago',
      type: 'success'
    },
    {
      id: 2,
      title: 'New Chronology Generated',
      message: 'Comprehensive chronology for Smith, Robert is ready for review',
      time: '15 minutes ago',
      type: 'info'
    },
    {
      id: 3,
      title: 'AI Analysis Alert',
      message: 'Potential inconsistency found in medical records',
      time: '1 hour ago',
      type: 'warning'
    }
  ]

  return (
    <header className={`backdrop-blur-xl border-b px-6 py-4 ${
      theme === 'dark' 
        ? 'bg-slate-900/30 border-slate-800/50' 
        : 'bg-white/80 border-gray-200'
    }`}>
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <motion.div
              className={`relative flex items-center transition-all duration-300 ${
                searchFocused ? 'scale-105' : 'scale-100'
              }`}
            >
            <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
              theme === 'dark' ? 'text-slate-400' : 'text-gray-500'
            }`} />
              <input
                type="text"
                placeholder="Search cases, findings, citations... (Press / to focus)"
                className={`w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 ${
                  theme === 'dark'
                    ? 'bg-slate-800/50 border border-slate-700/50 text-white placeholder-slate-400'
                    : 'bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <kbd className={`px-2 py-1 text-xs rounded border ${
                  theme === 'dark'
                    ? 'text-slate-400 bg-slate-700/50 border-slate-600/50'
                    : 'text-gray-500 bg-gray-200 border-gray-300'
                }`}>
                  /
                </kbd>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4 ml-6">
          {/* Notifications */}
          <div className="relative" ref={notificationsRef}>
            <Button
              variant="ghost"
              size="icon"
              className={`relative ${
                theme === 'dark'
                  ? 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
              onClick={() => {
                setShowNotifications(!showNotifications)
                setShowUserMenu(false) // Close user menu when opening notifications
              }}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">3</span>
              </span>
            </Button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute right-0 mt-2 w-80 backdrop-blur-xl rounded-xl shadow-2xl z-50 ${
                    theme === 'dark'
                      ? 'bg-slate-900/95 border border-slate-800/50'
                      : 'bg-white/95 border border-gray-200'
                  }`}
                >
                  <div className={`p-4 border-b ${
                    theme === 'dark' ? 'border-slate-800/50' : 'border-gray-200'
                  }`}>
                    <h3 className={`font-semibold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b transition-colors cursor-pointer ${
                          theme === 'dark'
                            ? 'border-slate-800/30 hover:bg-slate-800/30'
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            notification.type === 'success' ? 'bg-green-400' :
                            notification.type === 'warning' ? 'bg-yellow-400' :
                            'bg-blue-400'
                          }`} />
                          <div className="flex-1">
                            <p className={`text-sm font-medium ${
                              theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}>{notification.title}</p>
                            <p className={`text-xs mt-1 ${
                              theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
                            }`}>{notification.message}</p>
                            <p className={`text-xs mt-2 ${
                              theme === 'dark' ? 'text-slate-500' : 'text-gray-500'
                            }`}>{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={`p-3 border-t ${
                    theme === 'dark' ? 'border-slate-800/50' : 'border-gray-200'
                  }`}>
                    <Button variant="ghost" size="sm" className={`w-full ${
                      theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}>
                      View All Notifications
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Menu */}
          <div className="relative" ref={userMenuRef}>
            <Button
              variant="ghost"
              size="icon"
              className={`${
                theme === 'dark'
                  ? 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
              onClick={() => {
                setShowUserMenu(!showUserMenu)
                setShowNotifications(false) // Close notifications when opening user menu
              }}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                A
              </div>
            </Button>

            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute right-0 mt-2 w-56 backdrop-blur-xl rounded-xl shadow-2xl z-50 ${
                    theme === 'dark'
                      ? 'bg-slate-900/95 border border-slate-800/50'
                      : 'bg-white/95 border border-gray-200'
                  }`}
                >
                  <div className={`p-4 border-b ${
                    theme === 'dark' ? 'border-slate-800/50' : 'border-gray-200'
                  }`}>
                    <p className={`font-semibold ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>Attorney</p>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
                    }`}>attorney@lawfirm.com</p>
                  </div>
                  <div className="p-2">
                    <button className={`flex items-center space-x-3 w-full px-3 py-2 rounded-lg transition-colors ${
                      theme === 'dark'
                        ? 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                    }`}>
                      <User className="w-4 h-4" />
                      <span className="text-sm">Profile</span>
                    </button>
                    <button className={`flex items-center space-x-3 w-full px-3 py-2 rounded-lg transition-colors ${
                      theme === 'dark'
                        ? 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                    }`}>
                      <Settings className="w-4 h-4" />
                      <span className="text-sm">Settings</span>
                    </button>
                    <button 
                      onClick={toggleTheme}
                      className={`flex items-center space-x-3 w-full px-3 py-2 rounded-lg transition-colors ${
                        theme === 'dark'
                          ? 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      {theme === 'dark' ? (
                        <>
                          <Sun className="w-4 h-4" />
                          <span className="text-sm">Light Mode</span>
                        </>
                      ) : (
                        <>
                          <Moon className="w-4 h-4" />
                          <span className="text-sm">Dark Mode</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className={`p-2 border-t ${
                    theme === 'dark' ? 'border-slate-800/50' : 'border-gray-200'
                  }`}>
                    <button className="flex items-center space-x-3 w-full px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors">
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Sign Out</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  )
}
