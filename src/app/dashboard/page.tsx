'use client'

import { useTheme } from '@/contexts/theme-context'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const { theme } = useTheme()
  const router = useRouter()

  const themeClasses = {
    light: {
      container: "space-y-6",
      header: "text-gray-900",
      subtitle: "text-gray-600",
      card: "bg-white rounded-lg border border-gray-200 p-6 shadow-sm",
      statNumber: "text-2xl font-bold text-gray-900",
      statLabel: "text-sm text-gray-600",
      statChange: "text-sm font-medium",
      activityCard: "bg-white rounded-lg border border-gray-200 p-6 shadow-sm",
      activityHeader: "text-lg font-semibold text-gray-900 mb-4",
      activityItem: "flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0",
      activityIcon: "w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-medium mr-3",
      activityText: "flex-1",
      activityTitle: "font-medium text-gray-900",
      activityDesc: "text-sm text-gray-600",
      activityStatus: "px-2 py-1 rounded-full text-xs font-medium",
      queueCard: "bg-white rounded-lg border border-gray-200 p-6 shadow-sm",
      queueHeader: "text-lg font-semibold text-gray-900 mb-4",
      queueItem: "flex items-center justify-between py-3",
      queueProgress: "w-full bg-gray-200 rounded-full h-2 mr-3",
      queueProgressBar: "bg-blue-600 h-2 rounded-full",
      quickAction: "bg-white rounded-lg border border-gray-200 p-4 hover:bg-gray-50 transition-colors cursor-pointer",
      quickActionIcon: "w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mb-3",
      quickActionTitle: "font-medium text-gray-900 text-sm",
      button: "text-blue-600 hover:text-blue-700 text-sm font-medium"
    },
    dark: {
      container: "space-y-6",
      header: "text-white",
      subtitle: "text-slate-400",
      card: "bg-slate-900 rounded-lg border border-slate-800 p-6",
      statNumber: "text-2xl font-bold text-white",
      statLabel: "text-sm text-slate-400",
      statChange: "text-sm font-medium",
      activityCard: "bg-slate-900 rounded-lg border border-slate-800 p-6",
      activityHeader: "text-lg font-semibold text-white mb-4",
      activityItem: "flex items-center justify-between py-3 border-b border-slate-800 last:border-b-0",
      activityIcon: "w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-medium mr-3",
      activityText: "flex-1",
      activityTitle: "font-medium text-white",
      activityDesc: "text-sm text-slate-400",
      activityStatus: "px-2 py-1 rounded-full text-xs font-medium",
      queueCard: "bg-slate-900 rounded-lg border border-slate-800 p-6",
      queueHeader: "text-lg font-semibold text-white mb-4",
      queueItem: "flex items-center justify-between py-3",
      queueProgress: "w-full bg-slate-800 rounded-full h-2 mr-3",
      queueProgressBar: "bg-blue-600 h-2 rounded-full",
      quickAction: "bg-slate-900 rounded-lg border border-slate-800 p-4 hover:bg-slate-800 transition-colors cursor-pointer",
      quickActionIcon: "w-8 h-8 rounded-lg bg-blue-900 flex items-center justify-center text-blue-400 mb-3",
      quickActionTitle: "font-medium text-white text-sm",
      button: "text-blue-400 hover:text-blue-300 text-sm font-medium"
    }
  }

  const currentTheme = themeClasses[theme]

  return (
    <div className={currentTheme.container}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-2xl font-bold ${currentTheme.header}`}>Dashboard</h1>
          <p className={currentTheme.subtitle}>
            Welcome back! Here's what's happening with your cases.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={() => router.push('/ai-agent')}
          >
            🔄 Refresh
          </button>
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => router.push('/import')}
          >
            📄 Import Document
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className={currentTheme.card}>
          <div className="flex items-center justify-between">
            <div>
              <p className={currentTheme.statLabel}>Total Cases</p>
              <p className={currentTheme.statNumber}>24</p>
              <p className="text-green-600 text-sm font-medium">+3 this month</p>
            </div>
            <div className="text-2xl">📄</div>
          </div>
        </div>

        <div className={currentTheme.card}>
          <div className="flex items-center justify-between">
            <div>
              <p className={currentTheme.statLabel}>Medical Findings</p>
              <p className={currentTheme.statNumber}>1,247</p>
              <p className="text-green-600 text-sm font-medium">+89 this week</p>
            </div>
            <div className="text-2xl">🔍</div>
          </div>
        </div>

        <div className={currentTheme.card}>
          <div className="flex items-center justify-between">
            <div>
              <p className={currentTheme.statLabel}>Briefs Generated</p>
              <p className={currentTheme.statNumber}>18</p>
              <p className="text-green-600 text-sm font-medium">+2 today</p>
            </div>
            <div className="text-2xl">📝</div>
          </div>
        </div>

        <div className={currentTheme.card}>
          <div className="flex items-center justify-between">
            <div>
              <p className={currentTheme.statLabel}>Processing Time</p>
              <p className={currentTheme.statNumber}>4.2min</p>
              <p className="text-green-600 text-sm font-medium">-15% faster</p>
            </div>
            <div className="text-2xl">⏱️</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className={currentTheme.activityCard}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={currentTheme.activityHeader}>Recent Activity</h2>
              <button 
                className={currentTheme.button}
                onClick={() => router.push('/ai-agent')}
              >
                View All
              </button>
            </div>
            <p className={currentTheme.subtitle}>Latest actions and updates across your cases</p>
            
            <div className="mt-6 space-y-0">
              <div className={currentTheme.activityItem}>
                <div className="flex items-center">
                  <div className={`${currentTheme.activityIcon} bg-blue-600`}>📄</div>
                  <div className={currentTheme.activityText}>
                    <p className={currentTheme.activityTitle}>Johnson, Mary - Medical Records</p>
                    <p className={currentTheme.activityDesc}>487 pages • Post-hearing stage</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    ✅ Complete
                  </span>
                  <span className="text-sm text-gray-500">2 hours ago</span>
                </div>
              </div>

              <div className={currentTheme.activityItem}>
                <div className="flex items-center">
                  <div className={`${currentTheme.activityIcon} bg-purple-600`}>📝</div>
                  <div className={currentTheme.activityText}>
                    <p className={currentTheme.activityTitle}>Smith, Robert - Disability Brief</p>
                    <p className={currentTheme.activityDesc}>Generated using "By Provider" template</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    ✅ Complete
                  </span>
                  <span className="text-sm text-gray-500">4 hours ago</span>
                </div>
              </div>

              <div className={currentTheme.activityItem}>
                <div className="flex items-center">
                  <div className={`${currentTheme.activityIcon} bg-green-600`}>🔍</div>
                  <div className={currentTheme.activityText}>
                    <p className={currentTheme.activityTitle}>23 new findings extracted</p>
                    <p className={currentTheme.activityDesc}>Davis, Jennifer case • 94% confidence</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    ✅ Complete
                  </span>
                  <span className="text-sm text-gray-500">6 hours ago</span>
                </div>
              </div>

              <div className={currentTheme.activityItem}>
                <div className="flex items-center">
                  <div className={`${currentTheme.activityIcon} bg-orange-600`}>📤</div>
                  <div className={currentTheme.activityText}>
                    <p className={currentTheme.activityTitle}>Wilson Brief exported to Word</p>
                    <p className={currentTheme.activityDesc}>12 pages • Including citations</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    ✅ Complete
                  </span>
                  <span className="text-sm text-gray-500">1 day ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Processing Queue & Quick Actions */}
        <div className="space-y-6">
          {/* Processing Queue */}
          <div className={currentTheme.queueCard}>
            <h2 className={currentTheme.queueHeader}>Processing Queue</h2>
            <p className={currentTheme.subtitle}>Documents currently being analyzed</p>
            
            <div className="mt-6 space-y-6">
              {/* Processing Item */}
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Thompson_Medical_Records.pdf
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${
                    theme === 'dark' 
                      ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-800/50' 
                      : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                  }`}>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                    Processing
                  </div>
                  <span className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
                    3 minutes remaining
                  </span>
                </div>
                <div className="space-y-1">
                  <div className={`w-full rounded-full h-2 ${theme === 'dark' ? 'bg-slate-700' : 'bg-gray-200'}`}>
                    <div className="bg-blue-500 h-2 rounded-full transition-all duration-300" style={{width: '67%'}}></div>
                  </div>
                  <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
                    67% complete
                  </p>
                </div>
              </div>

              {/* Completed Item */}
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Lee_Disability_File.pdf
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${
                    theme === 'dark' 
                      ? 'bg-green-900/30 text-green-400 border border-green-800/50' 
                      : 'bg-green-50 text-green-700 border border-green-200'
                  }`}>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Complete
                  </div>
                </div>
                <div className="space-y-2">
                  <div className={`w-full rounded-full h-2 ${theme === 'dark' ? 'bg-slate-700' : 'bg-gray-200'}`}>
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '100%'}}></div>
                  </div>
                  <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
                    100% complete
                  </p>
                  <button 
                    className={`flex items-center gap-1 text-xs font-medium transition-colors ${
                      theme === 'dark' 
                        ? 'text-blue-400 hover:text-blue-300' 
                        : 'text-blue-600 hover:text-blue-700'
                    }`}
                    onClick={() => router.push('/ai-agent')}
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View Results
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className={currentTheme.queueCard}>
            <h2 className={currentTheme.queueHeader}>Quick Actions</h2>
            
            <div className="mt-4 space-y-3">
              <div 
                className={currentTheme.quickAction}
                onClick={() => router.push('/import')}
              >
                <div className={currentTheme.quickActionIcon}>📤</div>
                <p className={currentTheme.quickActionTitle}>Import New Document</p>
              </div>

              <div 
                className={currentTheme.quickAction}
                onClick={() => router.push('/ai-agent')}
              >
                <div className={currentTheme.quickActionIcon}>📝</div>
                <p className={currentTheme.quickActionTitle}>Generate Brief</p>
              </div>

              <div 
                className={currentTheme.quickAction}
                onClick={() => router.push('/ai-agent')}
              >
                <div className={currentTheme.quickActionIcon}>🔍</div>
                <p className={currentTheme.quickActionTitle}>Search Findings</p>
              </div>

              <div 
                className={currentTheme.quickAction}
                onClick={() => router.push('/ai-agent')}
              >
                <div className={currentTheme.quickActionIcon}>📋</div>
                <p className={currentTheme.quickActionTitle}>Create Timeline</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
