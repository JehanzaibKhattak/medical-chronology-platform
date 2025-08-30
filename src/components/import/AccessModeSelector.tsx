'use client'

import { motion } from 'framer-motion'
import { User, Users, Check } from 'lucide-react'
import { useTheme } from '@/contexts/theme-context'

interface AccessMode {
  id: string
  title: string
  description: string
  features: string[]
  icon: React.ReactNode
  recommended?: boolean
}

interface AccessModeSelectorProps {
  onSelect: (mode: string) => void
  selectedMode: string
}

const accessModes: AccessMode[] = [
  {
    id: 'full',
    title: 'Full Account Access',
    description: 'Complete platform access with all features',
    icon: <User className="w-8 h-8" />,
    recommended: true,
    features: [
      'Full document processing',
      'Save and organize cases',
      'Generate briefs and chronologies',
      'Advanced search and queries',
      'Export capabilities',
      'Unlimited storage'
    ]
  },
  {
    id: 'guest',
    title: 'Guest Access',
    description: 'Temporary access for helpers and assistants',
    icon: <Users className="w-8 h-8" />,
    features: [
      'Process single document',
      'Basic findings extraction',
      'Export results',
      'Limited to 24 hours',
      'No case saving',
      'Basic search only'
    ]
  }
]

export function AccessModeSelector({ onSelect, selectedMode }: AccessModeSelectorProps) {
  const { theme } = useTheme()
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className={`text-xl font-semibold mb-2 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>Choose Access Mode</h2>
        <p className={theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}>
          Select how you'd like to access the SSD AI Platform
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {accessModes.map((mode) => (
          <motion.div
            key={mode.id}
            className={`
              relative p-6 rounded-lg border-2 cursor-pointer transition-all duration-300
              ${selectedMode === mode.id
                ? 'border-blue-500 bg-blue-500/10'
                : theme === 'dark'
                  ? 'border-slate-700 bg-slate-800/50 hover:border-slate-600 hover:bg-slate-800'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
              }
            `}
            onClick={() => onSelect(mode.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {mode.recommended && (
              <div className="absolute -top-3 left-4">
                <span className="bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                  Recommended
                </span>
              </div>
            )}

            <div className="flex items-start gap-4">
              <div className={`
                p-3 rounded-lg
                ${selectedMode === mode.id 
                  ? 'bg-blue-600 text-white' 
                  : theme === 'dark'
                    ? 'bg-slate-700 text-slate-300'
                    : 'bg-gray-100 text-gray-600'
                }
              `}>
                {mode.icon}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className={`text-lg font-semibold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>{mode.title}</h3>
                  {selectedMode === mode.id && (
                    <Check className="w-5 h-5 text-blue-400" />
                  )}
                </div>
                <p className={`text-sm mb-4 ${
                  theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
                }`}>{mode.description}</p>

                <ul className="space-y-2">
                  {mode.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0" />
                      <span className={theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {selectedMode === mode.id && (
              <motion.div
                className="absolute inset-0 rounded-lg border-2 border-blue-500 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </motion.div>
        ))}
      </div>

      <div className="text-center pt-4">
        <p className={`text-sm ${
          theme === 'dark' ? 'text-slate-500' : 'text-gray-500'
        }`}>
          You can change your access level later in settings
        </p>
      </div>
    </div>
  )
}
