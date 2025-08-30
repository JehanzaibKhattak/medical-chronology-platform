'use client'

import { useState, useMemo } from 'react'
import { Search, Download, Plus, BarChart3, Eye } from 'lucide-react'
import { useTheme } from '@/contexts/theme-context'
import { useRouter } from 'next/navigation'
import { BodySystemFilter } from '@/components/findings/BodySystemFilter'
import { FindingTypeFilter } from '@/components/findings/FindingTypeFilter'
import { ConfidenceDistribution } from '@/components/findings/ConfidenceScoreVisualization'
import { BulkActions } from '@/components/findings/BulkActions'
import { FindingCard } from '@/components/findings/FindingCard'

// Enhanced mock data
const mockFindings = [
  {
    id: '1',
    type: 'diagnosis',
    description: 'Chronic lower back pain with L4-L5 disc herniation and radiculopathy affecting the left leg',
    confidence: 95,
    bodySystem: 'Musculoskeletal',
    date: '2024-01-15',
    source: {
      document: 'Dr. Smith - Orthopedic Consultation.pdf',
      page: 3,
      provider: 'Dr. Michael Smith, MD',
      location: 'Orthopedic Associates'
    },
    context: 'Patient presents with 6-month history of progressive lower back pain radiating down left leg. MRI shows significant disc herniation at L4-L5 level with nerve root compression.',
    relatedFindings: ['2', '3']
  },
  {
    id: '2',
    type: 'treatment',
    description: 'Physical therapy sessions, 3x weekly for 6 weeks focusing on core strengthening and flexibility',
    confidence: 88,
    bodySystem: 'Musculoskeletal',
    date: '2024-01-20',
    source: {
      document: 'Physical Therapy Initial Evaluation.pdf',
      page: 1,
      provider: 'Sarah Johnson, PT',
      location: 'Rehabilitation Center'
    },
    context: 'Comprehensive physical therapy program designed to address muscle imbalances and improve spinal stability.',
    relatedFindings: ['1']
  },
  {
    id: '3',
    type: 'medication',
    description: 'Prescribed Ibuprofen 600mg TID for inflammation and Gabapentin 300mg BID for neuropathic pain',
    confidence: 92,
    bodySystem: 'Musculoskeletal',
    date: '2024-01-15',
    source: {
      document: 'Dr. Smith - Orthopedic Consultation.pdf',
      page: 5,
      provider: 'Dr. Michael Smith, MD',
      location: 'Orthopedic Associates'
    },
    context: 'Medication regimen to manage both inflammatory and neuropathic components of patient\'s pain.',
    relatedFindings: ['1']
  },
  {
    id: '4',
    type: 'test_result',
    description: 'MRI lumbar spine shows moderate to severe disc herniation at L4-L5 with neural foraminal narrowing',
    confidence: 98,
    bodySystem: 'Musculoskeletal',
    date: '2024-01-10',
    source: {
      document: 'MRI Lumbar Spine Report.pdf',
      page: 2,
      provider: 'Dr. Lisa Chen, MD',
      location: 'Radiology Department'
    },
    context: 'Detailed imaging study confirming structural abnormalities consistent with clinical presentation.',
    relatedFindings: ['1']
  },
  {
    id: '5',
    type: 'symptom',
    description: 'Patient reports severe shooting pain down left leg, numbness in left foot, difficulty walking',
    confidence: 85,
    bodySystem: 'Nervous System',
    date: '2024-01-15',
    source: {
      document: 'Dr. Smith - Orthopedic Consultation.pdf',
      page: 1,
      provider: 'Dr. Michael Smith, MD',
      location: 'Orthopedic Associates'
    },
    context: 'Subjective complaints consistent with L5 nerve root irritation and compression.',
    relatedFindings: ['1', '4']
  },
  {
    id: '6',
    type: 'diagnosis',
    description: 'Hypertension, well-controlled on current medication regimen',
    confidence: 78,
    bodySystem: 'Cardiovascular',
    date: '2024-01-12',
    source: {
      document: 'Primary Care Visit Notes.pdf',
      page: 1,
      provider: 'Dr. Robert Wilson, MD',
      location: 'Family Medicine Clinic'
    },
    context: 'Routine monitoring of chronic hypertension with good blood pressure control.',
    relatedFindings: []
  }
]

export default function FindingsPage() {
  const { theme } = useTheme()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBodySystems, setSelectedBodySystems] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedFindings, setSelectedFindings] = useState<string[]>([])
  const [showStats, setShowStats] = useState(true)

  // Theme-aware classes
  const themeClasses = {
    container: "space-y-6",
    header: theme === 'light' ? "text-gray-900" : "text-white",
    subtitle: theme === 'light' ? "text-gray-600" : "text-slate-400",
    button: theme === 'light' 
      ? "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50" 
      : "bg-slate-700 text-white hover:bg-slate-600",
    primaryButton: theme === 'light'
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : "bg-blue-600 text-white hover:bg-blue-700",
    card: theme === 'light'
      ? "bg-white border border-gray-200 rounded-lg p-4"
      : "bg-slate-800 rounded-lg p-4 border border-slate-700",
    searchInput: theme === 'light'
      ? "w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500"
      : "w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500",
    statText: theme === 'light' ? "text-gray-600" : "text-slate-400",
    statValue: theme === 'light' ? "text-gray-900" : "text-white",
    emptyStateIcon: theme === 'light' ? "text-gray-400" : "text-slate-600",
    emptyStateText: theme === 'light' ? "text-gray-600" : "text-slate-400",
    emptyStateSubtext: theme === 'light' ? "text-gray-500" : "text-slate-500"
  }

  // Filter findings based on search and filters
  const filteredFindings = useMemo(() => {
    return mockFindings.filter(finding => {
      const matchesSearch = searchTerm === '' || 
        finding.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        finding.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        finding.bodySystem.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesBodySystem = selectedBodySystems.length === 0 ||
        selectedBodySystems.some(system => 
          finding.bodySystem.toLowerCase().includes(system.toLowerCase())
        )

      const matchesType = selectedTypes.length === 0 ||
        selectedTypes.includes(finding.type)

      return matchesSearch && matchesBodySystem && matchesType
    })
  }, [searchTerm, selectedBodySystems, selectedTypes])

  // Selection handlers
  const handleSelectFinding = (id: string) => {
    setSelectedFindings(prev => 
      prev.includes(id) 
        ? prev.filter(f => f !== id)
        : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    setSelectedFindings(filteredFindings.map(f => f.id))
  }

  const handleDeselectAll = () => {
    setSelectedFindings([])
  }

  // Action handlers
  const handleAddToBrief = (findingIds: string[]) => {
    console.log('Adding to brief:', findingIds)
    // Implementation would go here
  }

  const handleCreateChronology = (findingIds: string[]) => {
    console.log('Creating chronology:', findingIds)
    // Implementation would go here
  }

  const handleExport = (findingIds: string[]) => {
    console.log('Exporting findings:', findingIds)
    // Implementation would go here
  }

  const handleDelete = (findingIds: string[]) => {
    console.log('Deleting findings:', findingIds)
    // Implementation would go here
  }

  const handleViewSource = (source: any) => {
    console.log('Viewing source:', source)
    // Implementation would open document viewer
  }

  return (
    <div className={themeClasses.container}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${themeClasses.header}`}>Medical Findings</h1>
          <p className={`${themeClasses.subtitle} mt-1`}>
            AI-extracted medical information from your documents ({filteredFindings.length} findings)
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowStats(!showStats)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${themeClasses.button}`}
          >
            <BarChart3 className="w-4 h-4" />
            {showStats ? 'Hide' : 'Show'} Stats
          </button>
          <button 
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${themeClasses.primaryButton}`}
            onClick={() => router.push('/ai-agent')}
          >
            <Plus className="w-4 h-4" />
            Add Finding
          </button>
          <button 
            onClick={() => router.push('/ai-agent')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${themeClasses.button}`}
          >
            <Download className="w-4 h-4" />
            Export All
          </button>
        </div>
      </div>

      {/* Stats Panel */}
      {showStats && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ConfidenceDistribution findings={filteredFindings} theme={theme} />
          </div>
          <div className={themeClasses.card}>
            <h3 className={`${themeClasses.header} font-medium mb-4`}>Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className={themeClasses.statText}>Total Findings:</span>
                <span className={`${themeClasses.statValue} font-medium`}>{filteredFindings.length}</span>
              </div>
              <div className="flex justify-between">
                <span className={themeClasses.statText}>High Confidence:</span>
                <span className="text-green-500 font-medium">
                  {filteredFindings.filter(f => f.confidence >= 90).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={themeClasses.statText}>Body Systems:</span>
                <span className="text-blue-500 font-medium">
                  {new Set(filteredFindings.map(f => f.bodySystem)).size}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={themeClasses.statText}>Selected:</span>
                <span className="text-purple-500 font-medium">{selectedFindings.length}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${theme === 'light' ? 'text-gray-400' : 'text-slate-400'}`} />
            <input
              type="text"
              placeholder="Search findings, types, or body systems..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={themeClasses.searchInput}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BodySystemFilter 
            selectedSystems={selectedBodySystems}
            onChange={setSelectedBodySystems}
            theme={theme}
          />
          <FindingTypeFilter 
            selectedTypes={selectedTypes}
            onChange={setSelectedTypes}
            theme={theme}
          />
        </div>
      </div>

      {/* Bulk Actions */}
      <BulkActions
        selectedFindings={selectedFindings}
        totalFindings={filteredFindings.length}
        onSelectAll={handleSelectAll}
        onDeselectAll={handleDeselectAll}
        onAddToBrief={handleAddToBrief}
        onCreateChronology={handleCreateChronology}
        onExport={handleExport}
        onDelete={handleDelete}
        theme={theme}
      />

      {/* Findings List */}
      <div className="space-y-4">
        {filteredFindings.map((finding) => (
          <FindingCard
            key={finding.id}
            finding={finding}
            isSelected={selectedFindings.includes(finding.id)}
            onSelect={handleSelectFinding}
            onAddToBrief={(id) => handleAddToBrief([id])}
            onViewSource={handleViewSource}
            theme={theme}
          />
        ))}
      </div>

      {filteredFindings.length === 0 && (
        <div className="text-center py-12">
          <Eye className={`w-12 h-12 mx-auto mb-4 ${themeClasses.emptyStateIcon}`} />
          <p className={`${themeClasses.emptyStateText} text-lg mb-2`}>No findings match your criteria</p>
          <p className={`${themeClasses.emptyStateSubtext} text-sm`}>
            Try adjusting your search terms or filters to see more results.
          </p>
        </div>
      )}
    </div>
  )
}
