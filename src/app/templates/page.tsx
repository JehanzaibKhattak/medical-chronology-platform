'use client'

import { useState } from 'react'
import { Search, Plus, Eye, Edit, Copy, Trash2, Layout, FileText, Clock, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useTheme } from '@/contexts/theme-context'
import { useRouter } from 'next/navigation'

const templatesData = [
  {
    id: '1',
    name: 'Standard SSD Medical Brief',
    description: 'Comprehensive template for Social Security Disability medical briefs with all required sections',
    category: 'SSD Briefs',
    lastModified: '2024-01-15',
    createdBy: 'John Smith',
    usageCount: 45,
    isDefault: true,
    sections: ['Medical History', 'Functional Limitations', 'Treatment Records', 'Expert Opinions'],
    estimatedPages: '8-12'
  },
  {
    id: '2',
    name: 'All-Inclusive Chronology',
    description: 'Complete medical chronology template including all medical providers and visits',
    category: 'Chronologies',
    lastModified: '2024-01-14',
    createdBy: 'Sarah Johnson',
    usageCount: 32,
    isDefault: false,
    sections: ['Provider Timeline', 'Diagnostic Results', 'Treatment History', 'Citations'],
    estimatedPages: '15-25'
  },
  {
    id: '3',
    name: 'Provider-Specific Brief',
    description: 'Template organized by individual medical providers with reverse chronological order',
    category: 'Chronologies',
    lastModified: '2024-01-13',
    createdBy: 'Michael Brown',
    usageCount: 28,
    isDefault: false,
    sections: ['Provider Summary', 'Visit Details', 'Abnormal Findings', 'Treatment Plans'],
    estimatedPages: '6-10'
  },
  {
    id: '4',
    name: 'Surgical Procedures Summary',
    description: 'Focused template for surgeries, procedures, and physical therapy documentation',
    category: 'Specialized',
    lastModified: '2024-01-12',
    createdBy: 'Lisa Davis',
    usageCount: 19,
    isDefault: false,
    sections: ['Procedure Timeline', 'Pre/Post Op Notes', 'Recovery Progress', 'Complications'],
    estimatedPages: '4-8'
  },
  {
    id: '5',
    name: 'Hospital & Emergency Visits',
    description: 'Template for hospital admissions and emergency department visits',
    category: 'Specialized',
    lastModified: '2024-01-11',
    createdBy: 'Robert Wilson',
    usageCount: 23,
    isDefault: false,
    sections: ['Admission Details', 'Emergency Visits', 'Discharge Summaries', 'Follow-up Care'],
    estimatedPages: '5-9'
  },
  {
    id: '6',
    name: 'Diagnostic Test Results',
    description: 'Template focused on abnormal diagnostic test results and interpretations',
    category: 'Specialized',
    lastModified: '2024-01-10',
    createdBy: 'Amanda Foster',
    usageCount: 15,
    isDefault: false,
    sections: ['Test Timeline', 'Abnormal Results', 'Interpretations', 'Follow-up Tests'],
    estimatedPages: '3-6'
  }
]

const categories = ['All', 'SSD Briefs', 'Chronologies', 'Specialized']

export default function TemplatesPage() {
  const { theme } = useTheme()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('All')

  const filteredTemplates = templatesData.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'All' || template.category === filterCategory
    return matchesSearch && matchesCategory
  })

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
          <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Brief Templates</h1>
          <p className={theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}>Manage and customize your legal brief templates</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            className={theme === 'dark' ? 'border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent' : 'border-gray-300 text-gray-700 hover:bg-gray-100 bg-white'}
            onClick={() => router.push('/ai-agent')}
          >
            <Copy size={16} className="mr-2" />
            Import Template
          </Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => router.push('/ai-agent')}
          >
            <Plus size={16} className="mr-2" />
            Create Template
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className={theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>Total Templates</p>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{templatesData.length}</p>
              </div>
              <Layout className="text-blue-400" size={24} />
            </div>
          </CardContent>
        </Card>
        <Card className={theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>Most Used</p>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{Math.max(...templatesData.map(t => t.usageCount))}</p>
              </div>
              <Star className="text-yellow-400" size={24} />
            </div>
          </CardContent>
        </Card>
        <Card className={theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>Categories</p>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{categories.length - 1}</p>
              </div>
              <FileText className="text-green-400" size={24} />
            </div>
          </CardContent>
        </Card>
        <Card className={theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>Default Templates</p>
                <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{templatesData.filter(t => t.isDefault).length}</p>
              </div>
              <Clock className="text-purple-400" size={24} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className={`mb-6 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-400'}`} size={20} />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  theme === 'dark' 
                    ? 'bg-slate-800 border border-slate-700 text-white placeholder-slate-400' 
                    : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
            <div className="flex space-x-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={filterCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterCategory(category)}
                  className={filterCategory === category 
                    ? "bg-blue-600 hover:bg-blue-700" 
                    : theme === 'dark'
                      ? "border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent"
                      : "border-gray-300 text-gray-700 hover:bg-gray-100 bg-white"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className={`transition-colors ${
            theme === 'dark' 
              ? 'bg-slate-900 border-slate-800 hover:bg-slate-800/50' 
              : 'bg-white border-gray-200 hover:bg-gray-50'
          }`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className={`text-lg flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    <Layout size={20} className="mr-2 text-blue-400" />
                    {template.name}
                    {template.isDefault && (
                      <Star size={16} className="ml-2 text-yellow-400 fill-current" />
                    )}
                  </CardTitle>
                  <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>{template.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className={theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}>Category:</span>
                  <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>{template.category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className={theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}>Usage Count:</span>
                  <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>{template.usageCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className={theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}>Est. Pages:</span>
                  <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>{template.estimatedPages}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className={theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}>Modified:</span>
                  <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>{formatDate(template.lastModified)}</span>
                </div>
                <div className="pt-2">
                  <p className={`text-xs mb-2 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>Sections:</p>
                  <div className="flex flex-wrap gap-1">
                    {template.sections.map((section, index) => (
                      <span
                        key={index}
                        className={`inline-flex items-center px-2 py-1 rounded-md text-xs ${
                          theme === 'dark' 
                            ? 'bg-slate-800 text-slate-300' 
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {section}
                      </span>
                    ))}
                  </div>
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
                      className={theme === 'dark' ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}
                      onClick={() => router.push('/ai-agent')}
                    >
                      <Copy size={16} />
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

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <Layout size={48} className={`mx-auto mb-4 ${theme === 'dark' ? 'text-slate-600' : 'text-gray-400'}`} />
          <p className={`text-lg mb-2 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>No templates found</p>
          <p className={theme === 'dark' ? 'text-slate-500' : 'text-gray-500'}>Try adjusting your search criteria or create a new template.</p>
        </div>
      )}
    </div>
  )
}
