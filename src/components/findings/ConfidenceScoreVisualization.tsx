'use client'

import { motion } from 'framer-motion'
import { TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react'

interface ConfidenceScoreProps {
  score: number
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
}

export function ConfidenceScore({ score, size = 'md', showLabel = true }: ConfidenceScoreProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400'
    if (score >= 75) return 'text-blue-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getScoreIcon = (score: number) => {
    if (score >= 90) return CheckCircle
    if (score >= 75) return TrendingUp
    return AlertTriangle
  }

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'High Confidence'
    if (score >= 75) return 'Good Confidence'
    if (score >= 60) return 'Moderate Confidence'
    return 'Low Confidence'
  }

  const sizeClasses = {
    sm: 'w-12 h-12 text-xs',
    md: 'w-16 h-16 text-sm',
    lg: 'w-20 h-20 text-base'
  }

  const iconSizes = {
    sm: 12,
    md: 16,
    lg: 20
  }

  const Icon = getScoreIcon(score)

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <svg className={`${sizeClasses[size]} transform -rotate-90`} viewBox="0 0 36 36">
          {/* Background circle */}
          <path
            className="text-slate-700"
            stroke="currentColor"
            strokeWidth="3"
            fill="transparent"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          {/* Progress circle */}
          <motion.path
            className={getScoreColor(score)}
            stroke="currentColor"
            strokeWidth="3"
            fill="transparent"
            strokeLinecap="round"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            initial={{ strokeDasharray: "0 100" }}
            animate={{ strokeDasharray: `${score} 100` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>
        
        {/* Score text */}
        <div className={`
          absolute inset-0 flex items-center justify-center
          ${sizeClasses[size]} ${getScoreColor(score)} font-bold
        `}>
          {score}%
        </div>
      </div>

      {showLabel && (
        <div className="flex items-center gap-2">
          <Icon className={`${getScoreColor(score)}`} size={iconSizes[size]} />
          <span className={`${getScoreColor(score)} font-medium`}>
            {getScoreLabel(score)}
          </span>
        </div>
      )}
    </div>
  )
}

interface ConfidenceDistributionProps {
  findings: Array<{ confidence: number }>
  theme?: 'light' | 'dark'
}

export function ConfidenceDistribution({ findings, theme = 'dark' }: ConfidenceDistributionProps) {
  const distribution = {
    high: findings.filter(f => f.confidence >= 90).length,
    good: findings.filter(f => f.confidence >= 75 && f.confidence < 90).length,
    moderate: findings.filter(f => f.confidence >= 60 && f.confidence < 75).length,
    low: findings.filter(f => f.confidence < 60).length,
  }

  const total = findings.length
  
  const themeClasses = {
    container: theme === 'light' 
      ? 'bg-white rounded-lg p-4 border border-gray-200'
      : 'bg-slate-800 rounded-lg p-4 border border-slate-700',
    title: theme === 'light' ? 'text-gray-900' : 'text-white',
    labelText: theme === 'light' ? 'text-gray-600' : 'text-slate-300',
    countText: theme === 'light' ? 'text-gray-900' : 'text-white',
    percentText: theme === 'light' ? 'text-gray-500' : 'text-slate-400',
    barBackground: theme === 'light' ? 'bg-gray-200' : 'bg-slate-700',
    barLabelText: theme === 'light' ? 'text-gray-500' : 'text-slate-400',
    barCountText: theme === 'light' ? 'text-gray-700' : 'text-slate-300'
  }

  return (
    <div className={themeClasses.container}>
      <h3 className={`${themeClasses.title} font-medium mb-4`}>Confidence Distribution</h3>
      
      <div className="space-y-3">
        {[
          { key: 'high', label: 'High (90%+)', color: 'bg-green-400', count: distribution.high },
          { key: 'good', label: 'Good (75-89%)', color: 'bg-blue-400', count: distribution.good },
          { key: 'moderate', label: 'Moderate (60-74%)', color: 'bg-yellow-400', count: distribution.moderate },
          { key: 'low', label: 'Low (<60%)', color: 'bg-red-400', count: distribution.low },
        ].map(item => (
          <div key={item.key} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${item.color}`} />
              <span className={`${themeClasses.labelText} text-sm`}>{item.label}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`${themeClasses.countText} font-medium`}>{item.count}</span>
              <span className={`${themeClasses.percentText} text-sm`}>
                ({total > 0 ? Math.round((item.count / total) * 100) : 0}%)
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Visual bar chart */}
      <div className="mt-4 space-y-2">
        {[
          { key: 'high', color: 'bg-green-400', count: distribution.high },
          { key: 'good', color: 'bg-blue-400', count: distribution.good },
          { key: 'moderate', color: 'bg-yellow-400', count: distribution.moderate },
          { key: 'low', color: 'bg-red-400', count: distribution.low },
        ].map(item => (
          <div key={item.key} className="flex items-center gap-2">
            <div className={`w-16 text-xs ${themeClasses.barLabelText} capitalize`}>{item.key}</div>
            <div className={`flex-1 ${themeClasses.barBackground} rounded-full h-2 overflow-hidden`}>
              <motion.div
                className={item.color}
                initial={{ width: 0 }}
                animate={{ width: `${total > 0 ? (item.count / total) * 100 : 0}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                style={{ height: '100%' }}
              />
            </div>
            <div className={`w-8 text-xs ${themeClasses.barCountText} text-right`}>{item.count}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
