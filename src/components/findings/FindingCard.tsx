'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, 
  FileText, 
  User, 
  MapPin, 
  ChevronDown, 
  ExternalLink,
  CheckSquare,
  Square,
  Copy,
  Plus
} from 'lucide-react'
import { ConfidenceScore } from './ConfidenceScoreVisualization'

interface Finding {
  id: string
  type: string
  description: string
  confidence: number
  bodySystem: string
  date: string
  source: {
    document: string
    page: number
    provider: string
    location: string
  }
  context: string
  relatedFindings?: string[]
}

interface FindingCardProps {
  finding: Finding
  isSelected: boolean
  onSelect: (id: string) => void
  onAddToBrief: (id: string) => void
  onViewSource: (source: Finding['source']) => void
  theme?: 'light' | 'dark'
}

export function FindingCard({ 
  finding, 
  isSelected, 
  onSelect, 
  onAddToBrief, 
  onViewSource,
  theme = 'dark'
}: FindingCardProps) {
  const router = useRouter()
  const [isExpanded, setIsExpanded] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const getTypeColor = (type: string) => {
    const colors = {
      diagnosis: 'bg-red-500',
      symptom: 'bg-orange-500',
      treatment: 'bg-green-500',
      medication: 'bg-blue-500',
      procedure: 'bg-purple-500',
      test_result: 'bg-cyan-500',
      vital_sign: 'bg-pink-500',
      allergy: 'bg-yellow-500',
    }
    return colors[type as keyof typeof colors] || 'bg-slate-500'
  }

  const copyToClipboard = async () => {
    const text = `${finding.description}\n\nSource: ${finding.source.document}, Page ${finding.source.page}\nDate: ${finding.date}\nConfidence: ${finding.confidence}%`
    await navigator.clipboard.writeText(text)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const themeClasses = {
    container: theme === 'light'
      ? 'bg-white rounded-lg border transition-all duration-200'
      : 'bg-slate-800 rounded-lg border transition-all duration-200',
    containerSelected: theme === 'light'
      ? 'border-blue-500 bg-blue-50'
      : 'border-blue-500 bg-blue-500/5',
    containerUnselected: theme === 'light'
      ? 'border-gray-200 hover:border-gray-300'
      : 'border-slate-700 hover:border-slate-600',
    selectButton: theme === 'light'
      ? 'mt-1 text-gray-500 hover:text-blue-600 transition-colors'
      : 'mt-1 text-slate-400 hover:text-blue-400 transition-colors',
    typeText: theme === 'light' ? 'text-gray-600' : 'text-slate-300',
    bodySystemText: theme === 'light' ? 'text-gray-500' : 'text-slate-400',
    descriptionText: theme === 'light' ? 'text-gray-900' : 'text-white',
    metaText: theme === 'light' ? 'text-gray-500' : 'text-slate-400',
    actionButton: theme === 'light'
      ? 'p-2 text-gray-500 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100'
      : 'p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-700',
    addButton: theme === 'light'
      ? 'p-2 text-gray-500 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50'
      : 'p-2 text-slate-400 hover:text-blue-400 transition-colors rounded-lg hover:bg-blue-500/10',
    expandedBorder: theme === 'light' ? 'border-t border-gray-200' : 'border-t border-slate-700',
    contextBg: theme === 'light' ? 'bg-gray-50' : 'bg-slate-900/50',
    contextText: theme === 'light' ? 'text-gray-700' : 'text-slate-300',
    sourceDetailsBg: theme === 'light' ? 'bg-gray-50' : 'bg-slate-900/50',
    sourceText: theme === 'light' ? 'text-gray-900' : 'text-white',
    relatedText: theme === 'light' ? 'text-blue-600 hover:text-blue-700' : 'text-blue-400 hover:text-blue-300'
  }

  return (
    <motion.div
      layout
      className={`
        ${themeClasses.container}
        ${isSelected 
          ? themeClasses.containerSelected
          : themeClasses.containerUnselected
        }
      `}
      whileHover={{ scale: 1.01 }}
    >
      {/* Header */}
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Selection Checkbox */}
          <button
            onClick={() => onSelect(finding.id)}
            className={themeClasses.selectButton}
          >
            {isSelected ? (
              <CheckSquare className={`w-4 h-4 ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`} />
            ) : (
              <Square className="w-4 h-4" />
            )}
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Type and Confidence */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${getTypeColor(finding.type)}`} />
                <span className={`${themeClasses.typeText} text-sm capitalize`}>
                  {finding.type.replace('_', ' ')}
                </span>
                <span className={`${themeClasses.bodySystemText} text-sm`}>•</span>
                <span className={`${themeClasses.bodySystemText} text-sm`}>{finding.bodySystem}</span>
              </div>
              
              <ConfidenceScore 
                score={finding.confidence} 
                size="sm" 
                showLabel={false} 
              />
            </div>

            {/* Description */}
            <p className={`${themeClasses.descriptionText} mb-3 leading-relaxed`}>
              {finding.description}
            </p>

            {/* Source Info */}
            <div className={`flex items-center gap-4 text-sm ${themeClasses.metaText}`}>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{new Date(finding.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <FileText className="w-3 h-3" />
                <span className="truncate">{finding.source.document}</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                <span>{finding.source.provider}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={copyToClipboard}
              className={themeClasses.actionButton}
              title="Copy finding"
            >
              <Copy className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => router.push('/ai-agent')}
              className={themeClasses.addButton}
              title="Add to brief"
            >
              <Plus className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={themeClasses.actionButton}
            >
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className={`px-4 pb-4 ${themeClasses.expandedBorder}`}>
              <div className="pt-4 space-y-4">
                {/* Context */}
                {finding.context && (
                  <div>
                    <h4 className={`${themeClasses.descriptionText} font-medium mb-2`}>Context</h4>
                    <p className={`${themeClasses.contextText} text-sm leading-relaxed ${themeClasses.contextBg} p-3 rounded-lg`}>
                      {finding.context}
                    </p>
                  </div>
                )}

                {/* Detailed Source */}
                <div>
                  <h4 className={`${themeClasses.descriptionText} font-medium mb-2`}>Source Details</h4>
                  <div className={`${themeClasses.sourceDetailsBg} p-3 rounded-lg space-y-2`}>
                    <div className="flex items-center justify-between">
                      <span className={`${themeClasses.metaText} text-sm`}>Document:</span>
                      <span className={`${themeClasses.sourceText} text-sm`}>{finding.source.document}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`${themeClasses.metaText} text-sm`}>Page:</span>
                      <span className={`${themeClasses.sourceText} text-sm`}>{finding.source.page}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`${themeClasses.metaText} text-sm`}>Provider:</span>
                      <span className={`${themeClasses.sourceText} text-sm`}>{finding.source.provider}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`${themeClasses.metaText} text-sm`}>Location:</span>
                      <span className={`${themeClasses.sourceText} text-sm`}>{finding.source.location}</span>
                    </div>
                    
                    <button
                      onClick={() => router.push('/ai-agent')}
                      className="w-full mt-2 flex items-center justify-center gap-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Source Document
                    </button>
                  </div>
                </div>

                {/* Related Findings */}
                {finding.relatedFindings && finding.relatedFindings.length > 0 && (
                  <div>
                    <h4 className={`${themeClasses.descriptionText} font-medium mb-2`}>Related Findings</h4>
                    <div className="space-y-1">
                      {finding.relatedFindings.map((relatedId, index) => (
                        <div 
                          key={index}
                          className={`${themeClasses.relatedText} text-sm cursor-pointer`}
                        >
                          → Finding #{relatedId}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Copy Success Toast */}
      <AnimatePresence>
        {isCopied && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded text-xs"
          >
            Copied!
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
