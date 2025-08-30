'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

const bodySystems = [
  { id: 'musculoskeletal', label: 'Musculoskeletal' },
  { id: 'mental_health', label: 'Mental Health' },
  { id: 'cardiovascular', label: 'Cardiovascular' },
  { id: 'respiratory', label: 'Respiratory' },
  { id: 'digestive', label: 'Digestive' },
  { id: 'nervous', label: 'Nervous System' },
  { id: 'endocrine', label: 'Endocrine' },
  { id: 'immune', label: 'Immune System' },
]

interface BodySystemFilterProps {
  selectedSystems: string[]
  onChange: (selected: string[]) => void
  theme?: 'light' | 'dark'
}

export function BodySystemFilter({ selectedSystems, onChange, theme = 'dark' }: BodySystemFilterProps) {
  const toggleSystem = (id: string) => {
    const updatedSystems = selectedSystems.includes(id)
      ? selectedSystems.filter(system => system !== id)
      : [...selectedSystems, id]
    onChange(updatedSystems)
  }

  const themeClasses = {
    title: theme === 'light' ? 'text-gray-900' : 'text-white',
    cardBase: theme === 'light' 
      ? 'p-4 rounded-lg border cursor-pointer transition-all duration-200'
      : 'p-4 rounded-lg border cursor-pointer transition-all duration-200',
    cardSelected: theme === 'light'
      ? 'border-blue-500 bg-blue-50'
      : 'border-blue-500 bg-blue-500/10',
    cardUnselected: theme === 'light'
      ? 'border-gray-300 bg-white hover:border-gray-400'
      : 'border-slate-700 bg-slate-800/50 hover:border-slate-600',
    text: theme === 'light' ? 'text-gray-900' : 'text-white',
    icon: theme === 'light' ? 'text-blue-600' : 'text-blue-400'
  }

  return (
    <div className="space-y-4">
      <h3 className={`text-lg font-medium ${themeClasses.title} mb-2`}>Filter by Body System</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bodySystems.map(system => (
          <motion.div
            key={system.id}
            className={`
              ${themeClasses.cardBase}
              ${selectedSystems.includes(system.id)
                ? themeClasses.cardSelected
                : themeClasses.cardUnselected
              }
            `}
            onClick={() => toggleSystem(system.id)}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <span className={themeClasses.text}>{system.label}</span>
              {selectedSystems.includes(system.id) && (
                <CheckCircle className={`w-5 h-5 ${themeClasses.icon}`} />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
