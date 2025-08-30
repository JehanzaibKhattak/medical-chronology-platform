'use client'

import { useState } from 'react'
import { Save, User, Bell, Shield, Database, Palette, Globe, Download, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useTheme } from '@/contexts/theme-context'
import { useRouter } from 'next/navigation'

export default function SettingsPage() {
  const { theme } = useTheme()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('profile')
  const [settings, setSettings] = useState({
    // Profile Settings
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@lawfirm.com',
    phone: '+1 (555) 123-4567',
    firm: 'Smith & Associates Law Firm',
    barNumber: 'BAR123456',
    
    // Notification Settings
    emailNotifications: true,
    briefCompleted: true,
    processingErrors: true,
    weeklyReports: false,
    
    // AI Settings
    confidenceThreshold: 85,
    autoProcessing: true,
    citationFormat: 'exhibit-page',
    includeConfidenceScores: true,
    
    // Data Settings
    retentionPeriod: '7-years',
    autoBackup: true,
    exportFormat: 'pdf',
    
    // Display Settings
    theme: 'dark',
    language: 'english',
    timezone: 'EST',
    dateFormat: 'MM/DD/YYYY'
  })

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'ai', label: 'AI Settings', icon: Shield },
    { id: 'data', label: 'Data & Privacy', icon: Database },
    { id: 'display', label: 'Display', icon: Palette },
    { id: 'system', label: 'System', icon: Globe }
  ]

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    // Save settings logic here
    console.log('Settings saved:', settings)
  }

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>First Name</label>
          <input
            type="text"
            value={settings.firstName}
            onChange={(e) => handleSettingChange('firstName', e.target.value)}
            className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark' 
                ? 'bg-slate-800 border border-slate-700 text-white' 
                : 'bg-white border border-gray-300 text-gray-900'
            }`}
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>Last Name</label>
          <input
            type="text"
            value={settings.lastName}
            onChange={(e) => handleSettingChange('lastName', e.target.value)}
            className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark' 
                ? 'bg-slate-800 border border-slate-700 text-white' 
                : 'bg-white border border-gray-300 text-gray-900'
            }`}
          />
        </div>
      </div>
      <div>
        <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>Email Address</label>
        <input
          type="email"
          value={settings.email}
          onChange={(e) => handleSettingChange('email', e.target.value)}
          className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            theme === 'dark' 
              ? 'bg-slate-800 border border-slate-700 text-white' 
              : 'bg-white border border-gray-300 text-gray-900'
          }`}
        />
      </div>
      <div>
        <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>Phone Number</label>
        <input
          type="tel"
          value={settings.phone}
          onChange={(e) => handleSettingChange('phone', e.target.value)}
          className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            theme === 'dark' 
              ? 'bg-slate-800 border border-slate-700 text-white' 
              : 'bg-white border border-gray-300 text-gray-900'
          }`}
        />
      </div>
      <div>
        <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>Law Firm</label>
        <input
          type="text"
          value={settings.firm}
          onChange={(e) => handleSettingChange('firm', e.target.value)}
          className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            theme === 'dark' 
              ? 'bg-slate-800 border border-slate-700 text-white' 
              : 'bg-white border border-gray-300 text-gray-900'
          }`}
        />
      </div>
      <div>
        <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>Bar Number</label>
        <input
          type="text"
          value={settings.barNumber}
          onChange={(e) => handleSettingChange('barNumber', e.target.value)}
          className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            theme === 'dark' 
              ? 'bg-slate-800 border border-slate-700 text-white' 
              : 'bg-white border border-gray-300 text-gray-900'
          }`}
        />
      </div>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Email Notifications</h3>
          <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>Receive notifications via email</p>
        </div>
        <input
          type="checkbox"
          checked={settings.emailNotifications}
          onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
          className={`w-4 h-4 text-blue-600 rounded focus:ring-blue-500 ${
            theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-300'
          }`}
        />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Brief Completion</h3>
          <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>Notify when briefs are completed</p>
        </div>
        <input
          type="checkbox"
          checked={settings.briefCompleted}
          onChange={(e) => handleSettingChange('briefCompleted', e.target.checked)}
          className={`w-4 h-4 text-blue-600 rounded focus:ring-blue-500 ${
            theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-300'
          }`}
        />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Processing Errors</h3>
          <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>Notify when document processing fails</p>
        </div>
        <input
          type="checkbox"
          checked={settings.processingErrors}
          onChange={(e) => handleSettingChange('processingErrors', e.target.checked)}
          className={`w-4 h-4 text-blue-600 rounded focus:ring-blue-500 ${
            theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-300'
          }`}
        />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Weekly Reports</h3>
          <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>Receive weekly activity summaries</p>
        </div>
        <input
          type="checkbox"
          checked={settings.weeklyReports}
          onChange={(e) => handleSettingChange('weeklyReports', e.target.checked)}
          className={`w-4 h-4 text-blue-600 rounded focus:ring-blue-500 ${
            theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-300'
          }`}
        />
      </div>
    </div>
  )

  const renderAISettings = () => (
    <div className="space-y-6">
      <div>
        <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>
          Confidence Threshold ({settings.confidenceThreshold}%)
        </label>
        <input
          type="range"
          min="50"
          max="100"
          value={settings.confidenceThreshold}
          onChange={(e) => handleSettingChange('confidenceThreshold', parseInt(e.target.value))}
          className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
            theme === 'dark' ? 'bg-slate-700' : 'bg-gray-300'
          }`}
        />
        <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>Minimum confidence level for AI findings</p>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Auto Processing</h3>
          <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>Automatically process uploaded documents</p>
        </div>
        <input
          type="checkbox"
          checked={settings.autoProcessing}
          onChange={(e) => handleSettingChange('autoProcessing', e.target.checked)}
          className={`w-4 h-4 text-blue-600 rounded focus:ring-blue-500 ${
            theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-300'
          }`}
        />
      </div>
      <div>
        <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>Citation Format</label>
        <select
          value={settings.citationFormat}
          onChange={(e) => handleSettingChange('citationFormat', e.target.value)}
          className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            theme === 'dark' 
              ? 'bg-slate-800 border border-slate-700 text-white' 
              : 'bg-white border border-gray-300 text-gray-900'
          }`}
        >
          <option value="exhibit-page">Exhibit & Page (e.g., 3F at 19/150)</option>
          <option value="page-only">Page Only (e.g., Page 19)</option>
          <option value="exhibit-only">Exhibit Only (e.g., Exhibit 3F)</option>
        </select>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Include Confidence Scores</h3>
          <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>Show AI confidence scores in outputs</p>
        </div>
        <input
          type="checkbox"
          checked={settings.includeConfidenceScores}
          onChange={(e) => handleSettingChange('includeConfidenceScores', e.target.checked)}
          className={`w-4 h-4 text-blue-600 rounded focus:ring-blue-500 ${
            theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-300'
          }`}
        />
      </div>
    </div>
  )

  const renderDataSettings = () => (
    <div className="space-y-6">
      <div>
        <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>Data Retention Period</label>
        <select
          value={settings.retentionPeriod}
          onChange={(e) => handleSettingChange('retentionPeriod', e.target.value)}
          className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            theme === 'dark' 
              ? 'bg-slate-800 border border-slate-700 text-white' 
              : 'bg-white border border-gray-300 text-gray-900'
          }`}
        >
          <option value="1-year">1 Year</option>
          <option value="3-years">3 Years</option>
          <option value="5-years">5 Years</option>
          <option value="7-years">7 Years</option>
          <option value="indefinite">Indefinite</option>
        </select>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Automatic Backup</h3>
          <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>Enable daily automatic backups</p>
        </div>
        <input
          type="checkbox"
          checked={settings.autoBackup}
          onChange={(e) => handleSettingChange('autoBackup', e.target.checked)}
          className={`w-4 h-4 text-blue-600 rounded focus:ring-blue-500 ${
            theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-300'
          }`}
        />
      </div>
      <div>
        <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>Export Format</label>
        <select
          value={settings.exportFormat}
          onChange={(e) => handleSettingChange('exportFormat', e.target.value)}
          className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            theme === 'dark' 
              ? 'bg-slate-800 border border-slate-700 text-white' 
              : 'bg-white border border-gray-300 text-gray-900'
          }`}
        >
          <option value="pdf">PDF</option>
          <option value="docx">Word Document</option>
          <option value="txt">Plain Text</option>
        </select>
      </div>
      <div className="flex space-x-4">
        <Button 
          variant="outline" 
          className={theme === 'dark' ? 'border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent' : 'border-gray-300 text-gray-700 hover:bg-gray-50 bg-white'}
          onClick={() => router.push('/ai-agent')}
        >
          <Download size={16} className="mr-2" />
          Export Data
        </Button>
        <Button 
          variant="outline" 
          className={theme === 'dark' ? 'border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent' : 'border-gray-300 text-gray-700 hover:bg-gray-50 bg-white'}
          onClick={() => router.push('/ai-agent')}
        >
          <Upload size={16} className="mr-2" />
          Import Data
        </Button>
      </div>
    </div>
  )

  const renderDisplaySettings = () => (
    <div className="space-y-6">
      <div>
        <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>Theme</label>
        <select
          value={settings.theme}
          onChange={(e) => handleSettingChange('theme', e.target.value)}
          className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            theme === 'dark' 
              ? 'bg-slate-800 border border-slate-700 text-white' 
              : 'bg-white border border-gray-300 text-gray-900'
          }`}
        >
          <option value="dark">Dark</option>
          <option value="light">Light</option>
          <option value="auto">Auto</option>
        </select>
      </div>
      <div>
        <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>Language</label>
        <select
          value={settings.language}
          onChange={(e) => handleSettingChange('language', e.target.value)}
          className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            theme === 'dark' 
              ? 'bg-slate-800 border border-slate-700 text-white' 
              : 'bg-white border border-gray-300 text-gray-900'
          }`}
        >
          <option value="english">English</option>
          <option value="spanish">Spanish</option>
          <option value="french">French</option>
        </select>
      </div>
      <div>
        <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>Timezone</label>
        <select
          value={settings.timezone}
          onChange={(e) => handleSettingChange('timezone', e.target.value)}
          className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            theme === 'dark' 
              ? 'bg-slate-800 border border-slate-700 text-white' 
              : 'bg-white border border-gray-300 text-gray-900'
          }`}
        >
          <option value="EST">Eastern Time (EST)</option>
          <option value="CST">Central Time (CST)</option>
          <option value="MST">Mountain Time (MST)</option>
          <option value="PST">Pacific Time (PST)</option>
        </select>
      </div>
      <div>
        <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>Date Format</label>
        <select
          value={settings.dateFormat}
          onChange={(e) => handleSettingChange('dateFormat', e.target.value)}
          className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            theme === 'dark' 
              ? 'bg-slate-800 border border-slate-700 text-white' 
              : 'bg-white border border-gray-300 text-gray-900'
          }`}
        >
          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
        </select>
      </div>
    </div>
  )

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <Card className={theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-200'}>
        <CardContent className="p-4">
          <h3 className={`font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>System Information</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className={theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}>Version:</span>
              <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Medical AI Assistant v2.1.0</span>
            </div>
            <div className="flex justify-between">
              <span className={theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}>Last Update:</span>
              <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>January 15, 2024</span>
            </div>
            <div className="flex justify-between">
              <span className={theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}>License:</span>
              <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Professional</span>
            </div>
            <div className="flex justify-between">
              <span className={theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}>Storage Used:</span>
              <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>2.4 GB / 10 GB</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex space-x-4">
        <Button 
          variant="outline" 
          className={theme === 'dark' ? 'border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent' : 'border-gray-300 text-gray-700 hover:bg-gray-50 bg-white'}
          onClick={() => router.push('/ai-agent')}
        >
          Check for Updates
        </Button>
        <Button 
          variant="outline" 
          className={theme === 'dark' ? 'border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent' : 'border-gray-300 text-gray-700 hover:bg-gray-50 bg-white'}
          onClick={() => router.push('/ai-agent')}
        >
          Clear Cache
        </Button>
      </div>
    </div>
  )

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileSettings()
      case 'notifications':
        return renderNotificationSettings()
      case 'ai':
        return renderAISettings()
      case 'data':
        return renderDataSettings()
      case 'display':
        return renderDisplaySettings()
      case 'system':
        return renderSystemSettings()
      default:
        return renderProfileSettings()
    }
  }

  return (
    <div className={`flex-1 p-6 overflow-auto ${theme === 'dark' ? 'bg-slate-950' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Settings</h1>
          <p className={theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}>Manage your account and application preferences</p>
        </div>
        <Button 
          onClick={() => router.push('/ai-agent')} 
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Save size={16} className="mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64">
          <Card className={theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}>
            <CardContent className="p-0">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 text-left text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-600 text-white'
                          : theme === 'dark' 
                            ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <Icon size={18} className="mr-3" />
                      {tab.label}
                    </button>
                  )
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <div className="flex-1">
          <Card className={theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}>
            <CardHeader>
              <CardTitle className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>
                {tabs.find(tab => tab.id === activeTab)?.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderTabContent()}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
