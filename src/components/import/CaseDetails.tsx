'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowLeft, Calendar, User, FileText, Building } from 'lucide-react'

interface CaseDetailsData {
  caseName: string
  clientName: string
  dateOfBirth: string
  dateOfIncident: string
  caseType: string
  attorney: string
  notes: string
}

interface CaseDetailsProps {
  details: CaseDetailsData
  onDetailsChange: (details: CaseDetailsData) => void
  onNext: () => void
  onPrev: () => void
}

const caseTypes = [
  'Personal Injury',
  'Medical Malpractice',
  'Workers Compensation',
  'Social Security Disability',
  'Product Liability',
  'Motor Vehicle Accident',
  'Slip and Fall',
  'Other'
]

export function CaseDetails({ details, onDetailsChange, onNext, onPrev }: CaseDetailsProps) {
  const [formData, setFormData] = useState<CaseDetailsData>({
    caseName: details.caseName || '',
    clientName: details.clientName || '',
    dateOfBirth: details.dateOfBirth || '',
    dateOfIncident: details.dateOfIncident || '',
    caseType: details.caseType || '',
    attorney: details.attorney || '',
    notes: details.notes || ''
  })

  const handleInputChange = (field: keyof CaseDetailsData, value: string) => {
    const updatedData = { ...formData, [field]: value }
    setFormData(updatedData)
    onDetailsChange(updatedData)
  }

  const isFormValid = formData.caseName && formData.clientName && formData.caseType

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-white mb-2">Case Details</h2>
        <p className="text-slate-400">Provide information about this case for better organization</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Case Name */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            <FileText className="w-4 h-4 inline mr-2" />
            Case Name *
          </label>
          <input
            type="text"
            value={formData.caseName}
            onChange={(e) => handleInputChange('caseName', e.target.value)}
            placeholder="e.g., Johnson v. City Hospital"
            className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          />
        </div>

        {/* Client Name */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            <User className="w-4 h-4 inline mr-2" />
            Client Name *
          </label>
          <input
            type="text"
            value={formData.clientName}
            onChange={(e) => handleInputChange('clientName', e.target.value)}
            placeholder="e.g., Mary Johnson"
            className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          />
        </div>

        {/* Attorney */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            <Building className="w-4 h-4 inline mr-2" />
            Attorney
          </label>
          <input
            type="text"
            value={formData.attorney}
            onChange={(e) => handleInputChange('attorney', e.target.value)}
            placeholder="e.g., John Smith"
            className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            <Calendar className="w-4 h-4 inline mr-2" />
            Date of Birth
          </label>
          <input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          />
        </div>

        {/* Date of Incident */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            <Calendar className="w-4 h-4 inline mr-2" />
            Date of Incident
          </label>
          <input
            type="date"
            value={formData.dateOfIncident}
            onChange={(e) => handleInputChange('dateOfIncident', e.target.value)}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          />
        </div>

        {/* Case Type */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Case Type *
          </label>
          <select
            value={formData.caseType}
            onChange={(e) => handleInputChange('caseType', e.target.value)}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          >
            <option value="">Select case type</option>
            {caseTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Notes */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Additional Notes
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            placeholder="Any additional information about this case..."
            rows={4}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
          />
        </div>
      </div>

      {/* Form Summary */}
      {isFormValid && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800 rounded-lg p-4 border border-slate-700"
        >
          <h3 className="text-sm font-medium text-slate-300 mb-3">Case Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-slate-400">Case:</span>
              <span className="text-white ml-2">{formData.caseName}</span>
            </div>
            <div>
              <span className="text-slate-400">Client:</span>
              <span className="text-white ml-2">{formData.clientName}</span>
            </div>
            <div>
              <span className="text-slate-400">Type:</span>
              <span className="text-white ml-2">{formData.caseType}</span>
            </div>
            {formData.attorney && (
              <div>
                <span className="text-slate-400">Attorney:</span>
                <span className="text-white ml-2">{formData.attorney}</span>
              </div>
            )}
          </div>
        </motion.div>
      )}

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
          disabled={!isFormValid}
          className={`
            flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all duration-200
            ${isFormValid
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-slate-700 text-slate-400 cursor-not-allowed'
            }
          `}
        >
          Next
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
