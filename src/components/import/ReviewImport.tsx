'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Play, CheckCircle, FileText, User, Brain, Settings, Clock, AlertCircle } from 'lucide-react'

interface ReviewImportProps {
  importData: {
    accessMode: string
    files: any[]
    caseDetails: any
    processingOptions: any
    isProcessing: boolean
  }
  onImport: () => void
  onPrev: () => void
}

export function ReviewImport({ importData, onImport, onPrev }: ReviewImportProps) {
  const [isStarting, setIsStarting] = useState(false)

  const handleStartImport = async () => {
    setIsStarting(true)
    // Simulate processing start delay
    setTimeout(() => {
      onImport()
      setIsStarting(false)
    }, 1500)
  }

  const getAccessModeDisplay = (mode: string) => {
    return mode === 'full' ? 'Full Account Access' : 'Guest Access'
  }

  const getModelDisplay = (modelId: string) => {
    const models = {
      'advanced': 'Advanced AI Model',
      'standard': 'Standard AI Model',
      'fast': 'Fast Processing'
    }
    return models[modelId as keyof typeof models] || 'Advanced AI Model'
  }

  const estimatedTime = importData.files.length * 2 + 5 // Rough estimate in minutes

  if (importData.isProcessing) {
    return (
      <div className="text-center space-y-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 mx-auto bg-blue-600 rounded-full flex items-center justify-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Brain className="w-10 h-10 text-white" />
          </motion.div>
        </motion.div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Processing Started!</h2>
          <p className="text-slate-400">
            Your medical records are being processed by our AI system.
          </p>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 max-w-md mx-auto">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-slate-300">Analyzing documents...</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-slate-600 rounded-full" />
              <span className="text-slate-500">Extracting medical findings...</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-slate-600 rounded-full" />
              <span className="text-slate-500">Building chronology...</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-slate-600 rounded-full" />
              <span className="text-slate-500">Generating summary...</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-700">
            <p className="text-sm text-slate-400 text-center">
              Estimated time: {estimatedTime} minutes
            </p>
          </div>
        </div>

        <div className="text-sm text-slate-500">
          You can close this window and check progress in your dashboard.
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-white mb-2">Review & Import</h2>
        <p className="text-slate-400">Review your settings and start processing</p>
      </div>

      {/* Import Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Access & Files */}
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <h3 className="font-medium text-white mb-3 flex items-center gap-2">
            <User className="w-4 h-4 text-blue-400" />
            Access & Files
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Access Mode:</span>
              <span className="text-white">{getAccessModeDisplay(importData.accessMode)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Files:</span>
              <span className="text-white">{importData.files.length} documents</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Total Size:</span>
              <span className="text-white">
                {(importData.files.reduce((acc, file) => acc + file.size, 0) / (1024 * 1024)).toFixed(1)} MB
              </span>
            </div>
          </div>
        </div>

        {/* Case Information */}
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <h3 className="font-medium text-white mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4 text-green-400" />
            Case Information
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Case Name:</span>
              <span className="text-white truncate ml-2">{importData.caseDetails.caseName || 'Not specified'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Client:</span>
              <span className="text-white truncate ml-2">{importData.caseDetails.clientName || 'Not specified'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Type:</span>
              <span className="text-white truncate ml-2">{importData.caseDetails.caseType || 'Not specified'}</span>
            </div>
          </div>
        </div>

        {/* Processing Settings */}
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <h3 className="font-medium text-white mb-3 flex items-center gap-2">
            <Brain className="w-4 h-4 text-purple-400" />
            AI Processing
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">AI Model:</span>
              <span className="text-white">{getModelDisplay(importData.processingOptions.aiModel)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Confidence:</span>
              <span className="text-white">{importData.processingOptions.confidenceThreshold || 85}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Extractions:</span>
              <span className="text-white">{importData.processingOptions.extractionTypes?.length || 4} types</span>
            </div>
          </div>
        </div>

        {/* Processing Estimate */}
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <h3 className="font-medium text-white mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-orange-400" />
            Processing Estimate
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Estimated Time:</span>
              <span className="text-white">{estimatedTime} minutes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Priority:</span>
              <span className="text-white">Standard</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Queue Position:</span>
              <span className="text-white">#2</span>
            </div>
          </div>
        </div>
      </div>

      {/* File List Preview */}
      <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
        <h3 className="font-medium text-white mb-3">Files to Process</h3>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {importData.files.map((file, index) => (
            <div key={index} className="flex items-center gap-3 text-sm">
              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
              <FileText className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <span className="text-white truncate">{file.name}</span>
              <span className="text-slate-400 text-xs ml-auto">
                {(file.size / (1024 * 1024)).toFixed(1)} MB
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Important Notice */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-amber-300 mb-1">Important Notice</h4>
            <p className="text-sm text-amber-200/80">
              Processing will begin immediately after confirmation. You can monitor progress in your dashboard 
              and will receive notifications when complete. Large files may take longer to process.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-700">
        <button
          onClick={onPrev}
          disabled={isStarting}
          className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-white transition-colors disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </button>

        <button
          onClick={handleStartImport}
          disabled={isStarting || importData.files.length === 0}
          className={`
            flex items-center gap-2 px-8 py-3 rounded-lg font-medium transition-all duration-200
            ${isStarting
              ? 'bg-blue-700 text-white cursor-not-allowed'
              : importData.files.length === 0
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105'
            }
          `}
        >
          {isStarting ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Brain className="w-4 h-4" />
              </motion.div>
              Starting Processing...
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Start Processing
            </>
          )}
        </button>
      </div>
    </div>
  )
}
