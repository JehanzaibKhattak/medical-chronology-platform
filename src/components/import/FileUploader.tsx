'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, File, X, CheckCircle, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react'

interface FileWithPreview extends File {
  id: string
  preview?: string
  status: 'uploading' | 'success' | 'error'
  progress: number
}

interface FileUploaderProps {
  files: FileWithPreview[]
  onFilesChange: (files: FileWithPreview[] | ((prev: FileWithPreview[]) => FileWithPreview[])) => void
  onNext: () => void
  onPrev: () => void
}

export function FileUploader({ files, onFilesChange, onNext, onPrev }: FileUploaderProps) {
  const [isDragActive, setIsDragActive] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: FileWithPreview[] = acceptedFiles.map(file => ({
      ...file,
      id: Math.random().toString(36).substr(2, 9),
      status: 'uploading' as const,
      progress: 0
    }))

    // Simulate upload progress
    newFiles.forEach(file => {
      simulateUpload(file)
    })

    onFilesChange([...files, ...newFiles])
  }, [files, onFilesChange])

  const simulateUpload = (file: FileWithPreview) => {
    const interval = setInterval(() => {
      onFilesChange((prevFiles: FileWithPreview[]) => 
        prevFiles.map((f: FileWithPreview) => {
          if (f.id === file.id) {
            const newProgress = Math.min(f.progress + Math.random() * 30, 100)
            const newStatus: 'uploading' | 'success' | 'error' = newProgress === 100 ? 'success' : 'uploading'
            return { ...f, progress: newProgress, status: newStatus }
          }
          return f
        })
      )
    }, 200)

    setTimeout(() => {
      clearInterval(interval)
      onFilesChange((prevFiles: FileWithPreview[]) => 
        prevFiles.map((f: FileWithPreview) => 
          f.id === file.id ? { ...f, progress: 100, status: 'success' as const } : f
        )
      )
    }, 2000 + Math.random() * 3000)
  }

  const removeFile = (fileId: string) => {
    onFilesChange(files.filter(f => f.id !== fileId))
  }

  const { getRootProps, getInputProps, isDragActive: dropzoneActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/*': ['.png', '.jpg', '.jpeg', '.tiff']
    },
    multiple: true,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false)
  })

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const totalFiles = files.length
  const completedFiles = files.filter(f => f.status === 'success').length
  const hasFiles = files.length > 0
  const allFilesCompleted = hasFiles && completedFiles === totalFiles

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-white mb-2">Upload Medical Records</h2>
        <p className="text-slate-400">Upload your complete medical records for AI processing</p>
      </div>

      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300
          ${isDragActive || dropzoneActive
            ? 'border-blue-500 bg-blue-500/10'
            : 'border-slate-600 bg-slate-800/30 hover:border-slate-500 hover:bg-slate-800/50'
          }
        `}
      >
        <input {...getInputProps()} />
        
        <motion.div
          animate={{ 
            y: isDragActive ? -5 : 0,
            scale: isDragActive ? 1.05 : 1
          }}
          transition={{ duration: 0.2 }}
        >
          <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">
            {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
          </h3>
          <p className="text-slate-400 mb-4">
            or <span className="text-blue-400 font-medium">browse files</span>
          </p>
          <p className="text-sm text-slate-500">
            Supports PDF, DOC, DOCX, and image files (PNG, JPG, TIFF)
          </p>
        </motion.div>
      </div>

      {/* File List */}
      <AnimatePresence>
        {hasFiles && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-white">
                Uploaded Files ({completedFiles}/{totalFiles})
              </h3>
              {allFilesCompleted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 text-green-400"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">All files uploaded</span>
                </motion.div>
              )}
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {files.map((file) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-3 p-3 bg-slate-800 rounded-lg"
                >
                  <File className="w-8 h-8 text-blue-400 flex-shrink-0" />
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">{file.name}</p>
                    <p className="text-slate-400 text-sm">{formatFileSize(file.size)}</p>
                    
                    {file.status === 'uploading' && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                          <span>Uploading...</span>
                          <span>{Math.round(file.progress)}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-1.5">
                          <motion.div
                            className="bg-blue-600 h-1.5 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${file.progress}%` }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {file.status === 'success' && (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    )}
                    {file.status === 'error' && (
                      <AlertCircle className="w-5 h-5 text-red-400" />
                    )}
                    <button
                      onClick={() => removeFile(file.id)}
                      className="p-1 text-slate-400 hover:text-red-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-700">
        <button
          onClick={onPrev}
          className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </button>

        <button
          onClick={onNext}
          disabled={!allFilesCompleted}
          className={`
            flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all duration-200
            ${allFilesCompleted
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-slate-700 text-slate-400 cursor-not-allowed'
            }
          `}
        >
          Next
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
