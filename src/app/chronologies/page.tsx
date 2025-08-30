'use client'

import { useTheme } from '@/contexts/theme-context'
import { useState } from 'react'

export default function ChronologiesPage() {
  const { theme } = useTheme()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  const themeClasses = {
    light: {
      container: "space-y-6",
      header: "text-gray-900",
      subtitle: "text-gray-600",
      card: "bg-white rounded-lg border border-gray-200 p-6 shadow-sm",
      filterCard: "bg-white rounded-lg border border-gray-200 p-4 shadow-sm",
      searchInput: "w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500",
      select: "px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500",
      chronologyCard: "bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow",
      chronologyTitle: "font-semibold text-gray-900",
      chronologyDesc: "text-sm text-gray-600 mt-1",
      chronologyMeta: "text-xs text-gray-500",
      statusBadge: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      button: "text-blue-600 hover:text-blue-700 text-sm font-medium",
      quickAction: "bg-white rounded-lg border border-gray-200 p-4 hover:bg-gray-50 transition-colors cursor-pointer text-center",
      quickActionIcon: "text-3xl mb-2",
      quickActionTitle: "font-medium text-gray-900 text-sm"
    },
    dark: {
      container: "space-y-6",
      header: "text-white",
      subtitle: "text-slate-400",
      card: "bg-slate-900 rounded-lg border border-slate-800 p-6",
      filterCard: "bg-slate-900 rounded-lg border border-slate-800 p-4",
      searchInput: "w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500",
      select: "px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500",
      chronologyCard: "bg-slate-900 rounded-lg border border-slate-800 p-6 hover:bg-slate-800/50 transition-colors",
      chronologyTitle: "font-semibold text-white",
      chronologyDesc: "text-sm text-slate-400 mt-1",
      chronologyMeta: "text-xs text-slate-500",
      statusBadge: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
      button: "text-blue-400 hover:text-blue-300 text-sm font-medium",
      quickAction: "bg-slate-900 rounded-lg border border-slate-800 p-4 hover:bg-slate-800 transition-colors cursor-pointer text-center",
      quickActionIcon: "text-3xl mb-2",
      quickActionTitle: "font-medium text-white text-sm"
    }
  }

  const currentTheme = themeClasses[theme]

  const chronologyTypes = [
    {
      id: 'all-inclusive',
      name: 'All Inclusive',
      description: 'Complete medical chronology with all findings',
      icon: '📋'
    },
    {
      id: 'provider',
      name: 'By Provider',
      description: 'Organized by medical provider and visits',
      icon: '👨‍⚕️'
    },
    {
      id: 'diagnostic',
      name: 'Diagnostic Tests',
      description: 'Abnormal diagnostic test results',
      icon: '🔬'
    },
    {
      id: 'procedures',
      name: 'Procedures & Surgeries',
      description: 'Surgeries, procedures, and therapies',
      icon: '🏥'
    },
    {
      id: 'hospital',
      name: 'Hospital & ED Visits',
      description: 'Hospital admissions and emergency visits',
      icon: '🚑'
    }
  ]

  const chronologies = [
    {
      id: 1,
      title: 'Complete Medical Timeline - Johnson, Mary',
      type: 'All Inclusive',
      status: 'completed',
      createdDate: '2024-01-15',
      lastModified: '2024-01-16',
      entries: 127,
      pages: 18,
      case: 'Johnson, Mary',
      timespan: 'Jan 2020 - Dec 2023'
    },
    {
      id: 2,
      title: 'Provider Chronology - Smith, Robert',
      type: 'By Provider',
      status: 'draft',
      createdDate: '2024-01-14',
      lastModified: '2024-01-14',
      entries: 89,
      pages: 12,
      case: 'Smith, Robert',
      timespan: 'Mar 2021 - Nov 2023'
    },
    {
      id: 3,
      title: 'Surgical History - Davis, Jennifer',
      type: 'Procedures & Surgeries',
      status: 'in_review',
      createdDate: '2024-01-13',
      lastModified: '2024-01-13',
      entries: 23,
      pages: 8,
      case: 'Davis, Jennifer',
      timespan: 'Jun 2022 - Dec 2023'
    },
    {
      id: 4,
      title: 'Hospital Admissions - Wilson, Michael',
      type: 'Hospital & ED Visits',
      status: 'processing',
      createdDate: '2024-01-12',
      lastModified: '2024-01-12',
      entries: 15,
      pages: 6,
      case: 'Wilson, Michael',
      timespan: 'Aug 2022 - Oct 2023'
    }
  ]

  const getStatusColor = (status: string) => {
    const colors = {
      'completed': theme === 'light' ? 'bg-green-100 text-green-800' : 'bg-green-900/50 text-green-400',
      'draft': theme === 'light' ? 'bg-yellow-100 text-yellow-800' : 'bg-yellow-900/50 text-yellow-400',
      'in_review': theme === 'light' ? 'bg-blue-100 text-blue-800' : 'bg-blue-900/50 text-blue-400',
      'processing': theme === 'light' ? 'bg-purple-100 text-purple-800' : 'bg-purple-900/50 text-purple-400'
    }
    return colors[status as keyof typeof colors] || (theme === 'light' ? 'bg-gray-100 text-gray-800' : 'bg-gray-900/50 text-gray-400')
  }

  const getStatusLabel = (status: string) => {
    const labels = {
      'completed': '✅ Completed',
      'draft': '📝 Draft',
      'in_review': '👀 In Review',
      'processing': '⚙️ Processing'
    }
    return labels[status as keyof typeof labels] || status
  }

  const filteredChronologies = chronologies.filter(chronology => {
    const matchesSearch = chronology.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         chronology.case.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'all' || chronology.type === filterType
    return matchesSearch && matchesFilter
  })

  return (
    <div className={currentTheme.container}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${currentTheme.header}`}>Medical Chronologies</h1>
          <p className={currentTheme.subtitle}>
            Create and manage detailed medical timelines for your cases
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            📊 Templates
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            ➕ Create Chronology
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {chronologyTypes.map((type) => (
          <div key={type.id} className={currentTheme.quickAction}>
            <div className={currentTheme.quickActionIcon}>{type.icon}</div>
            <h3 className={currentTheme.quickActionTitle}>{type.name}</h3>
            <p className={`text-xs ${currentTheme.subtitle} mt-1`}>{type.description}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className={currentTheme.filterCard}>
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search chronologies or cases..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={currentTheme.searchInput}
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className={currentTheme.select}
          >
            <option value="all">All Types</option>
            <option value="All Inclusive">All Inclusive</option>
            <option value="By Provider">By Provider</option>
            <option value="Diagnostic Tests">Diagnostic Tests</option>
            <option value="Procedures & Surgeries">Procedures & Surgeries</option>
            <option value="Hospital & ED Visits">Hospital & ED Visits</option>
          </select>
        </div>
      </div>

      {/* Chronologies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChronologies.map((chronology) => (
          <div key={chronology.id} className={currentTheme.chronologyCard}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className={currentTheme.chronologyTitle}>{chronology.title}</h3>
                <p className={currentTheme.chronologyDesc}>{chronology.type}</p>
              </div>
              <span className={`${currentTheme.statusBadge} ${getStatusColor(chronology.status)}`}>
                {getStatusLabel(chronology.status)}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className={currentTheme.chronologyMeta}>Timespan:</span>
                <span className={currentTheme.chronologyDesc}>{chronology.timespan}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className={currentTheme.chronologyMeta}>Entries:</span>
                <span className={currentTheme.chronologyDesc}>{chronology.entries}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className={currentTheme.chronologyMeta}>Pages:</span>
                <span className={currentTheme.chronologyDesc}>{chronology.pages}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className={currentTheme.chronologyMeta}>Modified:</span>
                <span className={currentTheme.chronologyDesc}>{chronology.lastModified}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <button className={currentTheme.button}>👁️ View</button>
                <button className={currentTheme.button}>✏️ Edit</button>
                <button className={currentTheme.button}>📤 Export</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredChronologies.length === 0 && (
        <div className={currentTheme.card}>
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📋</div>
            <p className={currentTheme.subtitle}>No chronologies found matching your criteria.</p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Create Your First Chronology
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
