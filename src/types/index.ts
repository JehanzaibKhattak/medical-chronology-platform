export interface Document {
  id: string
  name: string
  case: string
  pages: number
  uploadDate: string
  exhibits: number
  status: 'processed' | 'processing' | 'error' | 'pending'
  fileSize: number
  fileType: string
  processingProgress?: number
}

export interface MedicalFinding {
  id: string
  type: 'diagnosis' | 'procedure' | 'medication' | 'test_result' | 'limitation' | 'symptom' | 'treatment'
  date: string
  title: string
  description: string
  provider: string
  confidence: number
  citation: {
    exhibit: string
    page: string
    fullReference: string
  }
  severity?: 'low' | 'medium' | 'high' | 'critical'
  category?: string
  relatedFindings?: string[]
}

export interface Chronology {
  id: string
  name: string
  caseId: string
  type: 'comprehensive' | 'provider_specific' | 'abnormal_tests' | 'procedures' | 'hospital_visits'
  createdDate: string
  lastModified: string
  status: 'draft' | 'completed' | 'in_review'
  entries: ChronologyEntry[]
  filters?: ChronologyFilters
  totalEntries: number
  dateRange: {
    start: string
    end: string
  }
}

export interface ChronologyEntry {
  id: string
  date: string
  time?: string
  provider: string
  facility?: string
  type: 'visit' | 'test' | 'procedure' | 'diagnosis' | 'medication' | 'hospitalization'
  title: string
  description: string
  findings: string[]
  citations: Citation[]
  significance: 'low' | 'medium' | 'high'
  relatedEntries?: string[]
}

export interface Citation {
  exhibit: string
  page: string
  fullReference: string
  documentId: string
  context?: string
}

export interface ChronologyFilters {
  dateRange?: {
    start: string
    end: string
  }
  providers?: string[]
  types?: string[]
  significance?: string[]
  searchTerm?: string
}

export interface Brief {
  id: string
  title: string
  caseId: string
  templateId: string
  status: 'draft' | 'completed' | 'in_review' | 'submitted'
  createdDate: string
  lastModified: string
  author: string
  sections: BriefSection[]
  attachedChronologies: string[]
  wordCount: number
  pageCount: number
}

export interface BriefSection {
  id: string
  title: string
  content: string
  order: number
  type: 'text' | 'chronology_reference' | 'medical_summary' | 'legal_argument'
  citations: Citation[]
}

export interface Template {
  id: string
  name: string
  description: string
  category: 'initial_application' | 'appeal' | 'medical_summary' | 'disability_report'
  sections: TemplateSection[]
  usageCount: number
  lastUsed?: string
  isDefault: boolean
}

export interface TemplateSection {
  id: string
  title: string
  placeholder: string
  required: boolean
  type: 'text' | 'chronology' | 'medical_findings' | 'legal_citations'
  order: number
}

export interface Case {
  id: string
  clientName: string
  caseNumber: string
  status: 'active' | 'closed' | 'pending'
  createdDate: string
  lastActivity: string
  documents: Document[]
  chronologies: Chronology[]
  briefs: Brief[]
  notes?: string
  attorney: string
  caseType: 'ssd' | 'workers_comp' | 'personal_injury' | 'medical_malpractice'
}

export interface User {
  id: string
  name: string
  email: string
  role: 'attorney' | 'paralegal' | 'admin'
  firm: string
  preferences: UserPreferences
  lastLogin: string
}

export interface UserPreferences {
  theme: 'dark' | 'light'
  defaultChronologyType: string
  autoSave: boolean
  notifications: {
    email: boolean
    inApp: boolean
  }
  citationFormat: 'standard' | 'bluebook' | 'custom'
}

export interface AIProcessingJob {
  id: string
  documentId: string
  type: 'extraction' | 'chronology_generation' | 'brief_generation'
  status: 'queued' | 'processing' | 'completed' | 'failed'
  progress: number
  startTime: string
  endTime?: string
  results?: any
  error?: string
}

export interface SearchResult {
  id: string
  type: 'document' | 'finding' | 'chronology' | 'brief'
  title: string
  excerpt: string
  relevanceScore: number
  citations: Citation[]
  metadata: Record<string, any>
}

export interface StatCard {
  title: string
  value: number | string
  change?: number
  changeType?: 'increase' | 'decrease'
  icon: string
  description?: string
}

export interface NavigationItem {
  name: string
  href: string
  icon: string
  current: boolean
  badge?: number
}

export interface NotificationItem {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  timestamp: string
  read: boolean
  actionUrl?: string
}

export interface ExportOptions {
  format: 'pdf' | 'docx' | 'html' | 'json'
  includeAttachments: boolean
  includeCitations: boolean
  template?: string
  customStyling?: boolean
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// Form Types
export interface DocumentUploadForm {
  files: FileList
  caseId: string
  description?: string
  tags?: string[]
}

export interface ChronologyGenerationForm {
  documentIds: string[]
  type: Chronology['type']
  dateRange?: {
    start: string
    end: string
  }
  providers?: string[]
  includeTypes?: string[]
  excludeTypes?: string[]
  name: string
  description?: string
}

export interface BriefGenerationForm {
  templateId: string
  caseId: string
  chronologyIds: string[]
  title: string
  customInstructions?: string
}
