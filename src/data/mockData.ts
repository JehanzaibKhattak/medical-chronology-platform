import { Document, MedicalFinding, Chronology, Brief, Template, StatCard, Case } from '@/types'

export const statsData: StatCard[] = [
  {
    title: 'Total Cases',
    value: 47,
    change: 8,
    changeType: 'increase',
    icon: 'FileText',
    description: 'Active legal cases'
  },
  {
    title: 'Documents Processed',
    value: 1247,
    change: 156,
    changeType: 'increase',
    icon: 'Upload',
    description: 'Medical documents analyzed'
  },
  {
    title: 'Chronologies Generated',
    value: 89,
    change: 12,
    changeType: 'increase',
    icon: 'Calendar',
    description: 'AI-generated chronologies'
  },
  {
    title: 'Medical Findings',
    value: 3421,
    change: 234,
    changeType: 'increase',
    icon: 'Stethoscope',
    description: 'Extracted medical insights'
  }
]

export const documentsData: Document[] = [
  {
    id: '1',
    name: 'Medical Records - Johnson, Mary',
    case: 'Johnson, Mary',
    pages: 487,
    uploadDate: '2024-01-15T10:30:00Z',
    exhibits: 23,
    status: 'processed',
    fileSize: 15728640, // 15MB
    fileType: 'PDF'
  },
  {
    id: '2',
    name: 'Hospital Records - Smith, Robert',
    case: 'Smith, Robert',
    pages: 234,
    uploadDate: '2024-01-14T14:22:00Z',
    exhibits: 15,
    status: 'processing',
    fileSize: 8388608, // 8MB
    fileType: 'PDF',
    processingProgress: 67
  },
  {
    id: '3',
    name: 'Specialist Reports - Davis, Jennifer',
    case: 'Davis, Jennifer',
    pages: 651,
    uploadDate: '2024-01-13T09:15:00Z',
    exhibits: 31,
    status: 'error',
    fileSize: 22020096, // 21MB
    fileType: 'PDF'
  },
  {
    id: '4',
    name: 'Diagnostic Tests - Wilson, Michael',
    case: 'Wilson, Michael',
    pages: 298,
    uploadDate: '2024-01-12T16:45:00Z',
    exhibits: 19,
    status: 'processed',
    fileSize: 12582912, // 12MB
    fileType: 'PDF'
  }
]

export const medicalFindingsData: MedicalFinding[] = [
  {
    id: '1',
    type: 'test_result',
    date: '2023-08-15',
    title: 'MRI Lumbar Spine - Herniated disc L4-L5',
    description: 'Moderate to severe disc herniation at L4-L5 level with nerve root compression. Significant spinal stenosis noted.',
    provider: 'Dr. Sarah Chen, MD',
    confidence: 96,
    citation: {
      exhibit: '3F',
      page: '12/18',
      fullReference: 'Exhibit 3F at page 12 of 18'
    },
    severity: 'high',
    category: 'Spinal Disorders',
    relatedFindings: ['2', '3']
  },
  {
    id: '2',
    type: 'diagnosis',
    date: '2023-07-22',
    title: 'Major Depressive Disorder, recurrent, severe',
    description: 'Patient presents with severe depressive symptoms including persistent sadness, loss of interest, sleep disturbances, and cognitive impairment.',
    provider: 'Dr. Michael Rodriguez, MD',
    confidence: 89,
    citation: {
      exhibit: '7E',
      page: '3/8',
      fullReference: 'Exhibit 7E at page 3 of 8'
    },
    severity: 'high',
    category: 'Mental Health',
    relatedFindings: ['4', '5']
  },
  {
    id: '3',
    type: 'limitation',
    date: '2023-06-09',
    title: 'Functional Capacity Evaluation - Severe Limitations',
    description: 'Unable to lift more than 10 pounds, limited standing/walking to 2 hours per day, frequent position changes required.',
    provider: 'Dr. Amanda Foster, PT',
    confidence: 91,
    citation: {
      exhibit: '5B',
      page: '7/15',
      fullReference: 'Exhibit 5B at page 7 of 15'
    },
    severity: 'critical',
    category: 'Functional Limitations'
  },
  {
    id: '4',
    type: 'procedure',
    date: '2023-06-18',
    title: 'Epidural steroid injection L4-L5',
    description: 'Fluoroscopy-guided epidural steroid injection performed at L4-L5 level for pain management. Temporary improvement noted.',
    provider: 'Dr. James Wilson, MD',
    confidence: 87,
    citation: {
      exhibit: '2A',
      page: '4/12',
      fullReference: 'Exhibit 2A at page 4 of 12'
    },
    severity: 'medium',
    category: 'Pain Management'
  }
]

export const chronologiesData: Chronology[] = [
  {
    id: '1',
    name: 'Comprehensive Medical Chronology - Johnson, Mary',
    caseId: 'case-1',
    type: 'comprehensive',
    createdDate: '2024-01-16T10:00:00Z',
    lastModified: '2024-01-16T15:30:00Z',
    status: 'completed',
    entries: [],
    totalEntries: 47,
    dateRange: {
      start: '2020-03-15',
      end: '2023-12-20'
    }
  },
  {
    id: '2',
    name: 'Provider-Specific Chronology - Dr. Chen',
    caseId: 'case-1',
    type: 'provider_specific',
    createdDate: '2024-01-15T14:20:00Z',
    lastModified: '2024-01-15T16:45:00Z',
    status: 'completed',
    entries: [],
    totalEntries: 12,
    dateRange: {
      start: '2022-01-10',
      end: '2023-11-15'
    }
  },
  {
    id: '3',
    name: 'Abnormal Test Results - Smith, Robert',
    caseId: 'case-2',
    type: 'abnormal_tests',
    createdDate: '2024-01-14T11:30:00Z',
    lastModified: '2024-01-14T11:30:00Z',
    status: 'draft',
    entries: [],
    totalEntries: 8,
    dateRange: {
      start: '2021-06-01',
      end: '2023-10-30'
    }
  }
]

export const briefsData: Brief[] = [
  {
    id: '1',
    title: 'Social Security Disability Brief - Johnson, Mary',
    caseId: 'case-1',
    templateId: 'template-1',
    status: 'completed',
    createdDate: '2024-01-15T09:00:00Z',
    lastModified: '2024-01-16T17:00:00Z',
    author: 'Attorney Smith',
    sections: [],
    attachedChronologies: ['1', '2'],
    wordCount: 3247,
    pageCount: 12
  },
  {
    id: '2',
    title: 'Appeal Brief - Smith, Robert',
    caseId: 'case-2',
    templateId: 'template-2',
    status: 'draft',
    createdDate: '2024-01-14T13:30:00Z',
    lastModified: '2024-01-14T16:20:00Z',
    author: 'Attorney Johnson',
    sections: [],
    attachedChronologies: ['3'],
    wordCount: 1856,
    pageCount: 8
  }
]

export const templatesData: Template[] = [
  {
    id: 'template-1',
    name: 'Initial SSD Application Brief',
    description: 'Standard template for initial Social Security Disability applications',
    category: 'initial_application',
    sections: [],
    usageCount: 45,
    lastUsed: '2024-01-15T09:00:00Z',
    isDefault: true
  },
  {
    id: 'template-2',
    name: 'Appeal Brief Template',
    description: 'Template for Social Security Disability appeals and reconsiderations',
    category: 'appeal',
    sections: [],
    usageCount: 23,
    lastUsed: '2024-01-12T14:30:00Z',
    isDefault: false
  },
  {
    id: 'template-3',
    name: 'Medical Evidence Summary',
    description: 'Comprehensive template for summarizing medical evidence',
    category: 'medical_summary',
    sections: [],
    usageCount: 67,
    lastUsed: '2024-01-10T11:15:00Z',
    isDefault: false
  }
]

export const casesData: Case[] = [
  {
    id: 'case-1',
    clientName: 'Johnson, Mary',
    caseNumber: 'SSD-2024-001',
    status: 'active',
    createdDate: '2024-01-10T09:00:00Z',
    lastActivity: '2024-01-16T17:00:00Z',
    documents: [documentsData[0]],
    chronologies: [chronologiesData[0], chronologiesData[1]],
    briefs: [briefsData[0]],
    attorney: 'Attorney Smith',
    caseType: 'ssd',
    notes: 'Client has severe back injury from work accident. Multiple specialists involved.'
  },
  {
    id: 'case-2',
    clientName: 'Smith, Robert',
    caseNumber: 'SSD-2024-002',
    status: 'active',
    createdDate: '2024-01-12T10:30:00Z',
    lastActivity: '2024-01-14T16:20:00Z',
    documents: [documentsData[1]],
    chronologies: [chronologiesData[2]],
    briefs: [briefsData[1]],
    attorney: 'Attorney Johnson',
    caseType: 'ssd',
    notes: 'Appeal case - initial application denied. Strong medical evidence.'
  }
]

// Recent activity data for dashboard
export const recentActivityData = [
  {
    id: '1',
    type: 'document_processed',
    title: 'Document Processing Complete',
    description: 'Medical records for Johnson, Mary have been successfully processed',
    timestamp: '2024-01-16T15:30:00Z',
    caseId: 'case-1',
    status: 'success'
  },
  {
    id: '2',
    type: 'chronology_generated',
    title: 'New Chronology Generated',
    description: 'Comprehensive chronology created for Johnson, Mary case',
    timestamp: '2024-01-16T14:20:00Z',
    caseId: 'case-1',
    status: 'success'
  },
  {
    id: '3',
    type: 'brief_updated',
    title: 'Brief Updated',
    description: 'Social Security Disability Brief updated with new medical findings',
    timestamp: '2024-01-16T13:45:00Z',
    caseId: 'case-1',
    status: 'info'
  },
  {
    id: '4',
    type: 'ai_analysis',
    title: 'AI Analysis Complete',
    description: 'Medical findings extracted from 23 exhibits',
    timestamp: '2024-01-16T12:30:00Z',
    caseId: 'case-1',
    status: 'success'
  }
]

// Processing queue data
export const processingQueueData = [
  {
    id: '1',
    documentName: 'Hospital Records - Smith, Robert',
    caseId: 'case-2',
    status: 'processing',
    progress: 67,
    estimatedCompletion: '2024-01-16T18:30:00Z'
  },
  {
    id: '2',
    documentName: 'Specialist Reports - Davis, Jennifer',
    caseId: 'case-3',
    status: 'queued',
    progress: 0,
    estimatedCompletion: '2024-01-16T19:45:00Z'
  }
]
