'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { useTheme } from '@/contexts/theme-context'
import { AccessModeSelector } from '@/components/import/AccessModeSelector'
import { FileUploader } from '@/components/import/FileUploader'
import { CaseDetails } from '@/components/import/CaseDetails'
import { ProcessingOptions } from '@/components/import/ProcessingOptions'
import { ReviewImport } from '@/components/import/ReviewImport'

const steps = [
  { id: 1, title: 'Access Mode', description: 'Choose your access level' },
  { id: 2, title: 'File Upload', description: 'Upload your complete medical records' },
  { id: 3, title: 'Case Details', description: 'Provide case information' },
  { id: 4, title: 'Processing Options', description: 'Configure AI settings' },
  { id: 5, title: 'Review & Import', description: 'Confirm and start processing' }
]

export default function ImportPage() {
  const { theme } = useTheme()
  const [currentStep, setCurrentStep] = useState(1)
  const [importData, setImportData] = useState({
    accessMode: '',
    files: [],
    caseDetails: {
      caseName: '',
      clientName: '',
      dateOfBirth: '',
      dateOfIncident: '',
      caseType: '',
      attorney: '',
      notes: ''
    },
    processingOptions: {
      aiModel: 'advanced',
      processingSpeed: 'balanced',
      confidenceThreshold: 85,
      extractionTypes: ['diagnoses', 'medications', 'procedures', 'symptoms'],
      enableOCR: true,
      enableNLP: true,
      generateSummary: true
    },
    isProcessing: false
  })

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateImportData = (stepData: any) => {
    setImportData(prev => ({ ...prev, ...stepData }))
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <AccessModeSelector
            onSelect={(mode) => {
              updateImportData({ accessMode: mode })
              nextStep()
            }}
            selectedMode={importData.accessMode}
          />
        )
      case 2:
        return (
          <FileUploader
            files={importData.files}
            onFilesChange={(files) => updateImportData({ files })}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )
      case 3:
        return (
          <CaseDetails
            details={importData.caseDetails}
            onDetailsChange={(details) => updateImportData({ caseDetails: details })}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )
      case 4:
        return (
          <ProcessingOptions
            options={importData.processingOptions}
            onOptionsChange={(options) => updateImportData({ processingOptions: options })}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )
      case 5:
        return (
          <ReviewImport
            importData={importData}
            onImport={() => {
              updateImportData({ isProcessing: true })
              // Handle import logic here
            }}
            onPrev={prevStep}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className={`min-h-screen p-6 ${
      theme === 'dark' 
        ? 'bg-slate-950' 
        : 'bg-gray-50'
    }`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <ArrowLeft 
              className={`w-6 h-6 cursor-pointer transition-colors ${
                theme === 'dark' 
                  ? 'text-slate-400 hover:text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => window.history.back()}
            />
            <h1 className={`text-2xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>Import Medical Records</h1>
          </div>
          <p className={theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}>
            Upload and process your complete medical documentation
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300
                    ${currentStep > step.id 
                      ? 'bg-green-600 text-white' 
                      : currentStep === step.id 
                        ? 'bg-blue-600 text-white' 
                        : theme === 'dark'
                          ? 'bg-slate-800 text-slate-400'
                          : 'bg-gray-200 text-gray-500'
                    }
                  `}>
                    {currentStep > step.id ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <p className={`text-sm font-medium ${
                      currentStep >= step.id 
                        ? theme === 'dark' ? 'text-white' : 'text-gray-900'
                        : theme === 'dark' ? 'text-slate-400' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </p>
                    <p className={`text-xs mt-1 max-w-24 ${
                      theme === 'dark' ? 'text-slate-500' : 'text-gray-400'
                    }`}>
                      {step.description}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`
                    flex-1 h-0.5 mx-4 transition-all duration-300
                    ${currentStep > step.id 
                      ? 'bg-green-600' 
                      : theme === 'dark' ? 'bg-slate-800' : 'bg-gray-200'
                    }
                  `} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className={`rounded-lg border p-6 min-h-96 ${
          theme === 'dark' 
            ? 'bg-slate-900 border-slate-800' 
            : 'bg-white border-gray-200'
        }`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
