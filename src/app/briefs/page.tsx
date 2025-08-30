'use client'

import { useState } from 'react'
import { Search, Plus, Eye, Edit, Download, Calendar, User, FileText, Clock, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useTheme } from '@/contexts/theme-context'
import { useRouter } from 'next/navigation'

const briefsData = [
  {
    id: '1',
    title: 'Medical Chronology - Johnson, Mary',
    status: 'completed' as const,
    createdDate: '2024-01-15',
    lastModified: '2024-01-16',
    attorney: 'John Smith',
    pages: 12,
    type: 'All Inclusive Chronology',
    case: 'Johnson, Mary',
    findings: 45,
    citations: 127
  },
  {
    id: '2',
    title: 'Provider-Specific Brief - Smith, Robert',
    status: 'draft' as const,
    createdDate: '2024-01-14',
    lastModified: '2024-01-14',
    attorney: 'Sarah Johnson',
    pages: 8,
    type: 'Provider Chronology',
    case: 'Smith, Robert',
    findings: 23,
    citations: 67
  },
  {
    id: '3',
    title: 'Surgical Procedures Summary - Davis, Jennifer',
    status: 'in_review' as const,
    createdDate: '2024-01-13',
    lastModified: '2024-01-13',
    attorney: 'Michael Brown',
    pages: 15,
    type: 'Procedures & Surgeries',
    case: 'Davis, Jennifer',
    findings: 18,
    citations: 89
  },
  {
    id: '4',
    title: 'Hospital Admissions Brief - Wilson, Michael',
    status: 'processing' as const,
    createdDate: '2024-01-12',
    lastModified: '2024-01-12',
    attorney: 'Lisa Davis',
    pages: 6,
    type: 'Hospital & ED Visits',
    case: 'Wilson, Michael',
    findings: 12,
    citations: 34
  },
  {
    id: '5',
    title: 'Abnormal Test Results - Brown, Sarah',
    status: 'completed' as const,
    createdDate: '2024-01-11',
    lastModified: '2024-01-11',
    attorney: 'Robert Wilson',
    pages: 9,
    type: 'Diagnostic Tests',
    case: 'Brown, Sarah',
    findings: 31,
    citations: 78
  }
]

const chronologyTypes = [
  { id: 'all-inclusive', name: 'All Inclusive', description: 'Complete medical chronology with all findings' },
  { id: 'provider', name: 'Provider Chronology', description: 'Organized by medical provider and visits' },
  { id: 'diagnostic', name: 'Diagnostic Tests', description: 'Abnormal diagnostic test results' },
  { id: 'procedures', name: 'Procedures & Surgeries', description: 'Surgeries, procedures, and physical therapies' },
  { id: 'hospital', name: 'Hospital & ED Visits', description: 'Hospital admissions and emergency visits' }
]

export default function BriefsPage() {
  const { theme } = useTheme()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showNewBriefModal, setShowNewBriefModal] = useState(false)

  const filteredBriefs = briefsData.filter(brief => {
    const matchesSearch = brief.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         brief.case.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || brief.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusBadge = (status: string) => {
    const baseClasses = theme === 'dark' ? {
      completed: 'bg-green-900/50 text-green-400 border-green-800',
      draft: 'bg-yellow-900/50 text-yellow-400 border-yellow-800',
      in_review: 'bg-blue-900/50 text-blue-400 border-blue-800',
      processing: 'bg-purple-900/50 text-purple-400 border-purple-800',
      default: 'bg-gray-900/50 text-gray-400 border-gray-800'
    } : {
      completed: 'bg-green-100 text-green-800 border-green-300',
      draft: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      in_review: 'bg-blue-100 text-blue-800 border-blue-300',
      processing: 'bg-purple-100 text-purple-800 border-purple-300',
      default: 'bg-gray-100 text-gray-800 border-gray-300'
    }

    switch (status) {
      case 'completed':
        return baseClasses.completed
      case 'draft':
        return baseClasses.draft
      case 'in_review':
        return baseClasses.in_review
      case 'processing':
        return baseClasses.processing
      default:
        return baseClasses.default
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed'
      case 'draft':
        return 'Draft'
      case 'in_review':
        return 'In Review'
      case 'processing':
        return 'Processing'
      default:
        return status
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className={`flex-1 p-6 overflow-auto ${theme === 'dark' ? 'bg-slate-950' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Briefs & Chronologies</h1>
          <p className={theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}>Generate and manage medical chronologies and legal briefs</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            className={theme === 'dark' ? 'border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent' : 'border-gray-300 text-gray-700 hover:bg-gray-100 bg-white'}
            onClick={() => router.push('/templates')}
          >
            <Calendar size={16} className="mr-2" />
            Templates
          </Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => router.push('/ai-agent')}
          >
            <Plus size={16} className="mr-2" />
            Generate Brief
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        {chronologyTypes.map((type) => (
          <Card 
            key={type.id} 
            className={`transition-colors cursor-pointer ${
              theme === 'dark' 
                ? 'bg-slate-900 border-slate-800 hover:bg-slate-800/50' 
                : 'bg-white border-gray-200 hover:bg-gray-50'
            }`}
            onClick={() => router.push('/ai-agent')}
          >
            <CardContent className="p-4 text-center">
              <Target size={24} className="mx-auto text-blue-400 mb-2" />
              <h3 className={`font-medium text-sm mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{type.name}</h3>
              <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>{type.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className={`mb-6 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-400'}`} size={20} />
              <input
                type="text"
                placeholder="Search briefs and chronologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  theme === 'dark' 
                    ? 'bg-slate-800 border border-slate-700 text-white placeholder-slate-400' 
                    : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={`px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                theme === 'dark'
                  ? 'bg-slate-800 border border-slate-700 text-white'
                  : 'bg-gray-50 border border-gray-300 text-gray-900'
              }`}
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="draft">Draft</option>
              <option value="in_review">In Review</option>
              <option value="processing">Processing</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Briefs List */}
      <div className="space-y-4">
        {filteredBriefs.map((brief) => (
          <Card key={brief.id} className={`transition-colors ${
            theme === 'dark' 
              ? 'bg-slate-900 border-slate-800 hover:bg-slate-800/50' 
              : 'bg-white border-gray-200 hover:bg-gray-50'
          }`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className={`text-lg mb-2 flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    <FileText size={20} className="mr-2 text-blue-400" />
                    {brief.title}
                  </CardTitle>
                  <div className={`flex items-center space-x-6 text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>
                    <span className="flex items-center">
                      <User size={14} className="mr-1" />
                      {brief.attorney}
                    </span>
                    <span className="flex items-center">
                      <Target size={14} className="mr-1" />
                      {brief.type}
                    </span>
                    <span className="flex items-center">
                      <FileText size={14} className="mr-1" />
                      {brief.pages} pages
                    </span>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadge(brief.status)}`}>
                  {getStatusLabel(brief.status)}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className={`flex items-center space-x-8 text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>
                  <span className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    Created: {formatDate(brief.createdDate)}
                  </span>
                  <span className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    Modified: {formatDate(brief.lastModified)}
                  </span>
                  <span>{brief.findings} findings</span>
                  <span>{brief.citations} citations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={theme === 'dark' ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}
                    onClick={() => router.push('/ai-agent')}
                  >
                    <Eye size={16} className="mr-1" />
                    View
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={theme === 'dark' ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}
                    onClick={() => router.push('/ai-agent')}
                  >
                    <Edit size={16} className="mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={theme === 'dark' ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}
                    onClick={() => router.push('/ai-agent')}
                  >
                    <Download size={16} className="mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBriefs.length === 0 && (
        <div className="text-center py-12">
          <FileText size={48} className={`mx-auto mb-4 ${theme === 'dark' ? 'text-slate-600' : 'text-gray-400'}`} />
          <p className={`text-lg mb-2 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>No briefs found</p>
          <p className={theme === 'dark' ? 'text-slate-500' : 'text-gray-500'}>Try adjusting your search criteria or generate a new brief.</p>
        </div>
      )}
    </div>
  )
}
