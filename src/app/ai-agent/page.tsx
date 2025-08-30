'use client'

import { useTheme } from '@/contexts/theme-context'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Bot, Sparkles, Clock, Zap } from 'lucide-react'

export default function AIAgentPage() {
  const { theme } = useTheme()
  const router = useRouter()

  const themeClasses = {
    light: {
      container: "min-h-screen bg-gray-50 flex items-center justify-center p-6",
      card: "bg-white rounded-2xl shadow-xl border border-gray-200 p-8 max-w-2xl w-full text-center",
      title: "text-3xl font-bold text-gray-900 mb-4",
      subtitle: "text-lg text-gray-600 mb-8",
      description: "text-gray-500 mb-8 leading-relaxed",
      feature: "bg-gray-50 rounded-lg p-4 text-left",
      featureTitle: "font-semibold text-gray-900 mb-2",
      featureDesc: "text-sm text-gray-600",
      button: "bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors",
      backButton: "text-gray-600 hover:text-gray-900 flex items-center gap-2 mb-6 transition-colors"
    },
    dark: {
      container: "min-h-screen bg-slate-950 flex items-center justify-center p-6",
      card: "bg-slate-900 rounded-2xl shadow-xl border border-slate-800 p-8 max-w-2xl w-full text-center",
      title: "text-3xl font-bold text-white mb-4",
      subtitle: "text-lg text-slate-300 mb-8",
      description: "text-slate-400 mb-8 leading-relaxed",
      feature: "bg-slate-800 rounded-lg p-4 text-left",
      featureTitle: "font-semibold text-white mb-2",
      featureDesc: "text-sm text-slate-400",
      button: "bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors",
      backButton: "text-slate-400 hover:text-white flex items-center gap-2 mb-6 transition-colors"
    }
  }

  const currentTheme = themeClasses[theme]

  return (
    <div className={currentTheme.container}>
      <div className={currentTheme.card}>
        <button 
          onClick={() => router.back()}
          className={currentTheme.backButton}
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="flex justify-center mb-6">
          <div className="relative">
            <Bot size={64} className="text-blue-600" />
            <Sparkles size={24} className="text-yellow-500 absolute -top-2 -right-2 animate-pulse" />
          </div>
        </div>

        <h1 className={currentTheme.title}>
          AI Agent Coming Soon
        </h1>
        
        <p className={currentTheme.subtitle}>
          Advanced AI-Powered Medical Analysis
        </p>

        <p className={currentTheme.description}>
          We're developing an intelligent AI agent that will revolutionize how you process medical documents and generate chronologies. This powerful assistant will automate complex tasks and provide intelligent insights.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className={currentTheme.feature}>
            <div className="flex items-center gap-2 mb-2">
              <Zap size={20} className="text-blue-600" />
              <h3 className={currentTheme.featureTitle}>Smart Processing</h3>
            </div>
            <p className={currentTheme.featureDesc}>
              Automatically extract medical findings with 95%+ accuracy using advanced NLP
            </p>
          </div>

          <div className={currentTheme.feature}>
            <div className="flex items-center gap-2 mb-2">
              <Bot size={20} className="text-green-600" />
              <h3 className={currentTheme.featureTitle}>AI Assistant</h3>
            </div>
            <p className={currentTheme.featureDesc}>
              Interactive AI that answers questions about your cases and suggests insights
            </p>
          </div>

          <div className={currentTheme.feature}>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={20} className="text-purple-600" />
              <h3 className={currentTheme.featureTitle}>Auto-Generation</h3>
            </div>
            <p className={currentTheme.featureDesc}>
              Generate comprehensive chronologies and briefs with proper citations automatically
            </p>
          </div>

          <div className={currentTheme.feature}>
            <div className="flex items-center gap-2 mb-2">
              <Clock size={20} className="text-orange-600" />
              <h3 className={currentTheme.featureTitle}>Real-time Analysis</h3>
            </div>
            <p className={currentTheme.featureDesc}>
              Process documents in minutes instead of hours with continuous learning
            </p>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <strong>Expected Launch:</strong> Q2 2024 • 
            <strong> Beta Access:</strong> Available for early adopters
          </p>
        </div>

        <button 
          className={currentTheme.button}
          onClick={() => router.push('/settings')}
        >
          Notify Me When Available
        </button>
      </div>
    </div>
  )
}
