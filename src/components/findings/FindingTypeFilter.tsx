'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Filter, X } from 'lucide-react'

const findingTypes = [
  { id: 'diagnosis', label: 'Diagnosis', color: 'bg-red-500' },
  { id: 'symptom', label: 'Symptom', color: 'bg-orange-500' },
  { id: 'treatment', label: 'Treatment', color: 'bg-green-500' },
  { id: 'medication', label: 'Medication', color: 'bg-blue-500' },
  { id: 'procedure', label: 'Procedure', color: 'bg-purple-500' },
  { id: 'test_result', label: 'Test Result', color: 'bg-cyan-500' },
  { id: 'vital_sign', label: 'Vital Sign', color: 'bg-pink-500' },
  { id: 'allergy', label: 'Allergy', color: 'bg-yellow-500' },
]

interface FindingTypeFilterProps {
  selectedTypes: string[]
  onChange: (selected: string[]) => void
  theme?: 'light' | 'dark'
}

export function FindingTypeFilter({ selectedTypes, onChange, theme = 'dark' }: FindingTypeFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleType = (id: string) => {
    const updatedTypes = selectedTypes.includes(id)
      ? selectedTypes.filter(type => type !== id)
      : [...selectedTypes, id]
    onChange(updatedTypes)
  }

  const clearAll = () => {
    onChange([])
  }

  const selectAll = () => {
    onChange(findingTypes.map(type => type.id))
  }

  const themeClasses = {
    headerButton: theme === 'light' 
      ? 'flex items-center gap-2 text-gray-900 hover:text-blue-600 transition-colors'
      : 'flex items-center gap-2 text-white hover:text-blue-400 transition-colors',
    countText: theme === 'light' ? 'text-gray-500' : 'text-slate-400',
    clearButton: theme === 'light'
      ? 'flex items-center gap-1 text-gray-500 hover:text-gray-900 text-sm transition-colors'
      : 'flex items-center gap-1 text-slate-400 hover:text-white text-sm transition-colors',
    selectAllButton: theme === 'light'
      ? 'text-blue-600 hover:text-blue-700 text-sm transition-colors'
      : 'text-blue-400 hover:text-blue-300 text-sm transition-colors',
    selectedCountText: theme === 'light' ? 'text-gray-500' : 'text-slate-400',
    typeButton: theme === 'light'
      ? 'flex items-center gap-2 p-3 rounded-lg border text-left transition-all duration-200'
      : 'flex items-center gap-2 p-3 rounded-lg border text-left transition-all duration-200',
    typeButtonSelected: theme === 'light'
      ? 'border-blue-500 bg-blue-50'
      : 'border-blue-500 bg-blue-500/10',
    typeButtonUnselected: theme === 'light'
      ? 'border-gray-300 bg-white hover:border-gray-400'
      : 'border-slate-700 bg-slate-800/50 hover:border-slate-600',
    typeText: theme === 'light' ? 'text-gray-900' : 'text-white',
    tagContainer: theme === 'light'
      ? 'flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full border border-gray-200'
      : 'flex items-center gap-2 px-3 py-1 bg-slate-800 rounded-full border border-slate-700',
    tagText: theme === 'light' ? 'text-gray-900' : 'text-white',
    tagCloseButton: theme === 'light'
      ? 'text-gray-500 hover:text-gray-900 transition-colors'
      : 'text-slate-400 hover:text-white transition-colors'
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={themeClasses.headerButton}
        >
          <Filter className="w-4 h-4" />
          <span className="font-medium">Finding Types</span>
          <span className={`${themeClasses.countText} text-sm`}>
            ({selectedTypes.length} selected)
          </span>
        </button>

        {selectedTypes.length > 0 && (
          <button
            onClick={clearAll}
            className={themeClasses.clearButton}
          >
            <X className="w-3 h-3" />
            Clear All
          </button>
        )}
      </div>

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-3"
        >
          <div className="flex justify-between">
            <button
              onClick={selectAll}
              className={themeClasses.selectAllButton}
            >
              Select All
            </button>
            <span className={`${themeClasses.selectedCountText} text-sm`}>
              {selectedTypes.length} of {findingTypes.length} selected
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {findingTypes.map(type => (
              <motion.button
                key={type.id}
                onClick={() => toggleType(type.id)}
                className={`
                  ${themeClasses.typeButton}
                  ${selectedTypes.includes(type.id)
                    ? themeClasses.typeButtonSelected
                    : themeClasses.typeButtonUnselected
                  }
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`w-3 h-3 rounded-full ${type.color}`} />
                <span className={`${themeClasses.typeText} text-sm`}>{type.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Selected types display */}
      {selectedTypes.length > 0 && !isExpanded && (
        <div className="flex flex-wrap gap-2">
          {selectedTypes.map(typeId => {
            const type = findingTypes.find(t => t.id === typeId)
            if (!type) return null
            
            return (
              <motion.div
                key={typeId}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className={themeClasses.tagContainer}
              >
                <div className={`w-2 h-2 rounded-full ${type.color}`} />
                <span className={`${themeClasses.tagText} text-sm`}>{type.label}</span>
                <button
                  onClick={() => toggleType(typeId)}
                  className={themeClasses.tagCloseButton}
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
