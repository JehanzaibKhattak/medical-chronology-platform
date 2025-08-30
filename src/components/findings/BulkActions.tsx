'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Calendar, 
  FileText, 
  Download, 
  Share2, 
  Trash2, 
  CheckSquare,
  Square,
  ChevronDown
} from 'lucide-react'

interface BulkActionsProps {
  selectedFindings: string[]
  totalFindings: number
  onSelectAll: () => void
  onDeselectAll: () => void
  onAddToBrief: (findingIds: string[]) => void
  onCreateChronology: (findingIds: string[]) => void
  onExport: (findingIds: string[]) => void
  onDelete: (findingIds: string[]) => void
  theme?: 'light' | 'dark'
}

export function BulkActions({
  selectedFindings,
  totalFindings,
  onSelectAll,
  onDeselectAll,
  onAddToBrief,
  onCreateChronology,
  onExport,
  onDelete,
  theme = 'dark'
}: BulkActionsProps) {
  const router = useRouter()
  const [showActions, setShowActions] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const isAllSelected = selectedFindings.length === totalFindings && totalFindings > 0
  const isPartiallySelected = selectedFindings.length > 0 && selectedFindings.length < totalFindings

  const handleAction = async (action: () => void) => {
    setIsProcessing(true)
    try {
      await action()
    } finally {
      setIsProcessing(false)
    }
  }

  const actions = [
    {
      id: 'add-to-brief',
      label: 'Add to Brief',
      icon: FileText,
      color: 'text-blue-400 hover:text-blue-300',
      bgColor: 'hover:bg-blue-500/10',
      action: () => router.push('/ai-agent')
    },
    {
      id: 'create-chronology',
      label: 'Create Chronology',
      icon: Calendar,
      color: 'text-green-400 hover:text-green-300',
      bgColor: 'hover:bg-green-500/10',
      action: () => router.push('/ai-agent')
    },
    {
      id: 'export',
      label: 'Export Selected',
      icon: Download,
      color: 'text-purple-400 hover:text-purple-300',
      bgColor: 'hover:bg-purple-500/10',
      action: () => router.push('/ai-agent')
    },
    {
      id: 'share',
      label: 'Share Findings',
      icon: Share2,
      color: 'text-cyan-400 hover:text-cyan-300',
      bgColor: 'hover:bg-cyan-500/10',
      action: () => router.push('/ai-agent')
    },
    {
      id: 'delete',
      label: 'Delete Selected',
      icon: Trash2,
      color: 'text-red-400 hover:text-red-300',
      bgColor: 'hover:bg-red-500/10',
      action: () => router.push('/ai-agent'),
      dangerous: true
    }
  ]

  const themeClasses = {
    container: theme === 'light'
      ? 'bg-white rounded-lg border border-gray-200 overflow-hidden'
      : 'bg-slate-800 rounded-lg border border-slate-700 overflow-hidden',
    emptyContainer: theme === 'light'
      ? 'flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200'
      : 'flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700',
    selectButton: theme === 'light'
      ? 'flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors'
      : 'flex items-center gap-2 text-slate-400 hover:text-white transition-colors',
    totalText: theme === 'light' ? 'text-gray-500' : 'text-slate-400',
    headerBorder: theme === 'light' ? 'border-b border-gray-200' : 'border-b border-slate-700',
    selectedButton: theme === 'light'
      ? 'flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors'
      : 'flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors',
    clearButton: theme === 'light'
      ? 'text-gray-500 hover:text-gray-900 text-sm transition-colors'
      : 'text-slate-400 hover:text-white text-sm transition-colors',
    actionsButton: theme === 'light'
      ? 'flex items-center gap-2 text-gray-900 hover:text-blue-600 transition-colors'
      : 'flex items-center gap-2 text-white hover:text-blue-400 transition-colors',
    actionButton: theme === 'light'
      ? 'flex items-center gap-2 p-3 rounded-lg border border-gray-300 transition-all duration-200 text-sm hover:scale-105 bg-white hover:bg-gray-50'
      : 'flex items-center gap-2 p-3 rounded-lg border border-slate-700 transition-all duration-200 text-sm hover:scale-105',
    statValue: theme === 'light' ? 'text-gray-900' : 'text-white',
    statLabel: theme === 'light' ? 'text-gray-500' : 'text-slate-400'
  }

  if (selectedFindings.length === 0) {
    return (
      <div className={themeClasses.emptyContainer}>
        <div className="flex items-center gap-3">
          <button
            onClick={isAllSelected ? onDeselectAll : onSelectAll}
            className={themeClasses.selectButton}
          >
            {isAllSelected ? (
              <CheckSquare className="w-4 h-4" />
            ) : isPartiallySelected ? (
              <div className={`w-4 h-4 border rounded ${theme === 'light' ? 'border-gray-400 bg-gray-200' : 'border-slate-400 bg-slate-600'}`} />
            ) : (
              <Square className="w-4 h-4" />
            )}
            <span className="text-sm">
              Select All ({totalFindings})
            </span>
          </button>
        </div>
        
        <div className={`${themeClasses.totalText} text-sm`}>
          {totalFindings} findings total
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={themeClasses.container}
    >
      {/* Selection Header */}
      <div className={`flex items-center justify-between p-4 ${themeClasses.headerBorder}`}>
        <div className="flex items-center gap-3">
          <button
            onClick={isAllSelected ? onDeselectAll : onSelectAll}
            className={themeClasses.selectedButton}
          >
            {isAllSelected ? (
              <CheckSquare className="w-4 h-4" />
            ) : (
              <div className={`w-4 h-4 border rounded ${theme === 'light' ? 'border-blue-600 bg-blue-100' : 'border-blue-400 bg-blue-500/20'}`} />
            )}
            <span className="text-sm font-medium">
              {selectedFindings.length} of {totalFindings} selected
            </span>
          </button>
          
          <button
            onClick={onDeselectAll}
            className={themeClasses.clearButton}
          >
            Clear Selection
          </button>
        </div>

        <button
          onClick={() => setShowActions(!showActions)}
          className={themeClasses.actionsButton}
        >
          <span className="text-sm">Actions</span>
          <motion.div
            animate={{ rotate: showActions ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </button>
      </div>

      {/* Actions Panel */}
      <AnimatePresence>
        {showActions && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 space-y-2">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                {actions.map(action => {
                  const Icon = action.icon
                  return (
                    <motion.button
                      key={action.id}
                      onClick={() => handleAction(action.action)}
                      disabled={isProcessing}
                      className={`
                        ${themeClasses.actionButton}
                        ${action.color} ${action.bgColor}
                        ${action.dangerous ? (theme === 'light' ? 'border-red-300' : 'border-red-500/30') : ''}
                        ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
                      `}
                      whileHover={!isProcessing ? { scale: 1.02 } : {}}
                      whileTap={!isProcessing ? { scale: 0.98 } : {}}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{action.label}</span>
                    </motion.button>
                  )
                })}
              </div>

              {/* Quick Stats */}
              <div className={`mt-4 pt-3 ${theme === 'light' ? 'border-t border-gray-200' : 'border-t border-slate-700'}`}>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className={`${themeClasses.statValue} font-medium`}>{selectedFindings.length}</div>
                    <div className={`${themeClasses.statLabel} text-xs`}>Selected</div>
                  </div>
                  <div>
                    <div className="text-blue-500 font-medium">
                      {Math.round((selectedFindings.length / totalFindings) * 100)}%
                    </div>
                    <div className={`${themeClasses.statLabel} text-xs`}>Coverage</div>
                  </div>
                  <div>
                    <div className="text-green-500 font-medium">Ready</div>
                    <div className={`${themeClasses.statLabel} text-xs`}>Status</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
