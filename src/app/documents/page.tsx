'use client'

import { useState } from 'react'
import { Search, Filter, Upload, Plus, Eye, Edit, Trash2, FileText, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useTheme } from '@/contexts/theme-context'
import { useRouter } from 'next/navigation'

const documentsData = [
  {
    id: '1',
    case: 'Johnson, Mary',
    pages: 487,
    date: '2024-01-15',
    exhibits: 23,
    status: 'processed' as const,
    size: '12.4 MB',
    type: 'Medical Records'
  },
  {
    id: '2',
    case: 'Smith, Robert',
    pages: 234,
    date: '2024-01-14',
    exhibits: 15,
    status: 'processing' as const,
    size: '8.7 MB',
    type: 'Hospital Records'
  },
  {
    id: '3',
    case: 'Davis, Jennifer',
    pages: 651,
    date: '2024-01-13',
    exhibits: 31,
    status: 'error' as const,
    size: '18.2 MB',
    type: 'Complete File'
  },
  {
    id: '4',
    case: 'Wilson, Michael',
    pages: 298,
    date: '2024-01-12',
    exhibits: 19,
    status: 'processed' as const,
    size: '9.8 MB',
    type: 'Specialist Reports'
  },
  {
    id: '5',
    case: 'Brown, Sarah',
    pages: 156,
    date: '2024-01-11',
    exhibits: 12,
    status: 'processed' as const,
    size: '5.3 MB',
    type: 'Lab Results'
  },
  {
    id: '6',
    case: 'Taylor, James',
    pages: 423,
    date: '2024-01-10',
    exhibits: 28,
    status: 'processing' as const,
    size: '14.1 MB',
    type: 'Medical Records'
  }
]

export default function DocumentsPage() {
  const { theme } = useTheme()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const filteredDocuments = documentsData.filter(doc => {
    const matchesSearch = doc.case.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || doc.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusBadge = (status: string) => {
    const baseClasses = theme === 'dark' ? {
      processed: 'bg-green-900/50 text-green-400 border-green-800',
      processing: 'bg-yellow-900/50 text-yellow-400 border-yellow-800',
      error: 'bg-red-900/50 text-red-400 border-red-800',
      default: 'bg-gray-900/50 text-gray-400 border-gray-800'
    } : {
      processed: 'bg-green-100 text-green-800 border-green-300',
      processing: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      error: 'bg-red-100 text-red-800 border-red-300',
      default: 'bg-gray-100 text-gray-800 border-gray-300'
    }

    switch (status) {
      case 'processed':
        return baseClasses.processed
      case 'processing':
        return baseClasses.processing
      case 'error':
        return baseClasses.error
      default:
        return baseClasses.default
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
          <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Documents</h1>
          <p className={theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}>Manage and process your medical documents</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            className={theme === 'dark' ? 'border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent' : 'border-gray-300 text-gray-700 hover:bg-gray-100 bg-white'}
            onClick={() => router.push('/import')}
          >
            <Upload size={16} className="mr-2" />
            Upload Files
          </Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => router.push('/ai-agent')}
          >
            <Plus size={16} className="mr-2" />
            New Case
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className={`mb-6 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-400'}`} size={20} />
              <input
                type="text"
                placeholder="Search documents by case name..."
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
              <option value="processed">Processed</option>
              <option value="processing">Processing</option>
              <option value="error">Error</option>
            </select>
            <Button 
              variant="outline" 
              className={theme === 'dark' ? 'border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent' : 'border-gray-300 text-gray-700 hover:bg-gray-100 bg-white'}
              onClick={() => router.push('/ai-agent')}
            >
              <Filter size={16} className="mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.map((doc) => (
          <Card key={doc.id} className={`transition-colors ${
            theme === 'dark' 
              ? 'bg-slate-900 border-slate-800 hover:bg-slate-800/50' 
              : 'bg-white border-gray-200 hover:bg-gray-50'
          }`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className={`text-lg flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    <FileText size={20} className="mr-2 text-blue-400" />
                    {doc.case}
                  </CardTitle>
                  <p className={`text-sm mt-1 flex items-center ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>
                    <Calendar size={14} className="mr-1" />
                    {formatDate(doc.date)}
                  </p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadge(doc.status)}`}>
                  {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className={theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}>Type:</span>
                  <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>{doc.type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className={theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}>Pages:</span>
                  <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>{doc.pages.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className={theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}>Exhibits:</span>
                  <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>{doc.exhibits}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className={theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}>Size:</span>
                  <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>{doc.size}</span>
                </div>
                <div className={`flex items-center justify-between pt-3 border-t ${theme === 'dark' ? 'border-slate-800' : 'border-gray-200'}`}>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={theme === 'dark' ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}
                      onClick={() => router.push('/ai-agent')}
                    >
                      <Eye size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={theme === 'dark' ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}
                      onClick={() => router.push('/ai-agent')}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={theme === 'dark' ? 'text-slate-400 hover:text-red-400 hover:bg-slate-800' : 'text-gray-600 hover:text-red-600 hover:bg-gray-100'}
                      onClick={() => router.push('/ai-agent')}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <FileText size={48} className={`mx-auto mb-4 ${theme === 'dark' ? 'text-slate-600' : 'text-gray-400'}`} />
          <p className={`text-lg mb-2 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>No documents found</p>
          <p className={theme === 'dark' ? 'text-slate-500' : 'text-gray-500'}>Try adjusting your search criteria or upload new documents.</p>
        </div>
      )}
    </div>
  )
}
