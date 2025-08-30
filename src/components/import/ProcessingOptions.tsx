'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowLeft, Brain, Zap, Shield, Clock, CheckCircle } from 'lucide-react'

interface ProcessingOptionsData {
  aiModel: string
  processingSpeed: string
  confidenceThreshold: number
  extractionTypes: string[]
  enableOCR: boolean
  enableNLP: boolean
  generateSummary: boolean
}

interface ProcessingOptionsProps {
  options: ProcessingOptionsData
  onOptionsChange: (options: ProcessingOptionsData) => void
  onNext: () => void
  onPrev: () => void
}

const aiModels = [
  {
    id: 'advanced',
    name: 'Advanced AI Model',
    description: 'Highest accuracy with comprehensive analysis',
    icon: <Brain className="w-6 h-6" />,
    recommended: true,
    features: ['99.2% accuracy', 'Complex medical terminology', 'Relationship mapping', 'Advanced reasoning']
  },
  {
    id: 'standard',
    name: 'Standard AI Model',
    description: 'Balanced performance and speed',
    icon: <Zap className="w-6 h-6" />,
    features: ['97.8% accuracy', 'Fast processing', 'Standard terminology', 'Basic relationships']
  },
  {
    id: 'fast',
    name: 'Fast Processing',
    description: 'Quick results for urgent cases',
    icon: <Clock className="w-6 h-6" />,
    features: ['95.1% accuracy', 'Rapid turnaround', 'Essential findings', 'Basic extraction']
  }
]

const extractionTypes = [
  { id: 'diagnoses', label: 'Diagnoses & Conditions', description: 'Medical diagnoses and health conditions' },
  { id: 'medications', label: 'Medications & Treatments', description: 'Prescribed medications and treatments' },
  { id: 'procedures', label: 'Procedures & Tests', description: 'Medical procedures and diagnostic tests' },
  { id: 'symptoms', label: 'Symptoms & Complaints', description: 'Patient symptoms and chief complaints' },
  { id: 'vitals', label: 'Vital Signs & Measurements', description: 'Vital signs and physical measurements' },
  { id: 'providers', label: 'Healthcare Providers', description: 'Doctors, nurses, and medical staff' },
  { id: 'dates', label: 'Dates & Timeline', description: 'Important dates and chronological events' },
  { id: 'limitations', label: 'Limitations & Restrictions', description: 'Physical limitations and work restrictions' }
]

export function ProcessingOptions({ options, onOptionsChange, onNext, onPrev }: ProcessingOptionsProps) {
  const [formData, setFormData] = useState<ProcessingOptionsData>({
    aiModel: options.aiModel || 'advanced',
    processingSpeed: options.processingSpeed || 'balanced',
    confidenceThreshold: options.confidenceThreshold || 85,
    extractionTypes: options.extractionTypes || ['diagnoses', 'medications', 'procedures', 'symptoms'],
    enableOCR: options.enableOCR !== undefined ? options.enableOCR : true,
    enableNLP: options.enableNLP !== undefined ? options.enableNLP : true,
    generateSummary: options.generateSummary !== undefined ? options.generateSummary : true
  })

  const handleModelChange = (modelId: string) => {
    const updatedData = { ...formData, aiModel: modelId }
    setFormData(updatedData)
    onOptionsChange(updatedData)
  }

  const handleExtractionToggle = (typeId: string) => {
    const updatedTypes = formData.extractionTypes.includes(typeId)
      ? formData.extractionTypes.filter(id => id !== typeId)
      : [...formData.extractionTypes, typeId]
    
    const updatedData = { ...formData, extractionTypes: updatedTypes }
    setFormData(updatedData)
    onOptionsChange(updatedData)
  }

  const handleOptionChange = (field: keyof ProcessingOptionsData, value: any) => {
    const updatedData = { ...formData, [field]: value }
    setFormData(updatedData)
    onOptionsChange(updatedData)
  }

  const selectedModel = aiModels.find(model => model.id === formData.aiModel)

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-white mb-2">Processing Options</h2>
        <p className="text-slate-400">Configure AI settings for optimal results</p>
      </div>

      {/* AI Model Selection */}
      <div>
        <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-blue-400" />
          AI Model Selection
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {aiModels.map((model) => (
            <motion.div
              key={model.id}
              className={`
                relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-300
                ${formData.aiModel === model.id
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                }
              `}
              onClick={() => handleModelChange(model.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {model.recommended && (
                <div className="absolute -top-2 left-4">
                  <span className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                    Recommended
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3 mb-3">
                <div className={`
                  p-2 rounded-lg
                  ${formData.aiModel === model.id ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300'}
                `}>
                  {model.icon}
                </div>
                <div>
                  <h4 className="font-medium text-white">{model.name}</h4>
                  {formData.aiModel === model.id && (
                    <CheckCircle className="w-4 h-4 text-blue-400 inline ml-2" />
                  )}
                </div>
              </div>

              <p className="text-sm text-slate-400 mb-3">{model.description}</p>

              <ul className="space-y-1">
                {model.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-xs">
                    <div className="w-1 h-1 bg-blue-400 rounded-full" />
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Confidence Threshold */}
      <div>
        <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-green-400" />
          Confidence Threshold
        </h3>
        <div className="bg-slate-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-slate-300">
              Minimum confidence level for extracted findings
            </label>
            <span className="text-blue-400 font-medium">{formData.confidenceThreshold}%</span>
          </div>
          <input
            type="range"
            min="50"
            max="99"
            value={formData.confidenceThreshold}
            onChange={(e) => handleOptionChange('confidenceThreshold', parseInt(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-2">
            <span>50% (More findings)</span>
            <span>99% (Higher accuracy)</span>
          </div>
        </div>
      </div>

      {/* Extraction Types */}
      <div>
        <h3 className="text-lg font-medium text-white mb-4">
          Data Extraction Types
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {extractionTypes.map((type) => (
            <div
              key={type.id}
              className={`
                p-4 rounded-lg border cursor-pointer transition-all duration-200
                ${formData.extractionTypes.includes(type.id)
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                }
              `}
              onClick={() => handleExtractionToggle(type.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-white text-sm">{type.label}</h4>
                  <p className="text-xs text-slate-400 mt-1">{type.description}</p>
                </div>
                {formData.extractionTypes.includes(type.id) && (
                  <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Advanced Options */}
      <div>
        <h3 className="text-lg font-medium text-white mb-4">Advanced Options</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg cursor-pointer">
            <input
              type="checkbox"
              checked={formData.enableOCR}
              onChange={(e) => handleOptionChange('enableOCR', e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
            />
            <div>
              <span className="text-white font-medium">Enable OCR Processing</span>
              <p className="text-sm text-slate-400">Extract text from scanned documents and images</p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg cursor-pointer">
            <input
              type="checkbox"
              checked={formData.enableNLP}
              onChange={(e) => handleOptionChange('enableNLP', e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
            />
            <div>
              <span className="text-white font-medium">Advanced NLP Analysis</span>
              <p className="text-sm text-slate-400">Deep natural language processing for better context understanding</p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg cursor-pointer">
            <input
              type="checkbox"
              checked={formData.generateSummary}
              onChange={(e) => handleOptionChange('generateSummary', e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
            />
            <div>
              <span className="text-white font-medium">Generate Case Summary</span>
              <p className="text-sm text-slate-400">Create an executive summary of key findings</p>
            </div>
          </label>
        </div>
      </div>

      {/* Processing Summary */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800 rounded-lg p-4 border border-slate-700"
      >
        <h3 className="text-sm font-medium text-slate-300 mb-3">Processing Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-slate-400">AI Model:</span>
            <span className="text-white ml-2">{selectedModel?.name}</span>
          </div>
          <div>
            <span className="text-slate-400">Confidence:</span>
            <span className="text-white ml-2">{formData.confidenceThreshold}%</span>
          </div>
          <div>
            <span className="text-slate-400">Extraction Types:</span>
            <span className="text-white ml-2">{formData.extractionTypes.length} selected</span>
          </div>
          <div>
            <span className="text-slate-400">Advanced Features:</span>
            <span className="text-white ml-2">
              {[formData.enableOCR && 'OCR', formData.enableNLP && 'NLP', formData.generateSummary && 'Summary']
                .filter(Boolean).join(', ') || 'None'}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-700">
        <button
          onClick={onPrev}
          className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </button>

        <button
          onClick={onNext}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Next
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
