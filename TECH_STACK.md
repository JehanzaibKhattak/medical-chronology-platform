# Medical Chronology Platform - Technology Stack Documentation

## Project Overview
**Medical Chronology Platform** is an AI-powered legal research and medical chronology generation platform designed for legal professionals handling Social Security Disability (SSD), Workers' Compensation, Personal Injury, and Medical Malpractice cases.

---

## Core Framework & Runtime

### **Next.js 15.5.2**
- **Purpose**: Full-stack React framework providing the foundation for the application
- **Features Used**:
  - App Router (App Directory) - Modern routing system
  - Server-side rendering (SSR) and static site generation (SSG)
  - API routes for backend functionality
  - Image optimization
  - Built-in performance optimizations
- **Configuration**: `next.config.js` with image domain configuration for localhost

### **React 19.1.1**
- **Purpose**: Frontend UI library for building component-based user interfaces
- **Features Used**:
  - Functional components with hooks
  - Context API for state management (theme context)
  - Client-side rendering with 'use client' directive
  - Component composition and reusability

### **React DOM 19.1.1**
- **Purpose**: React renderer for web browsers
- **Usage**: Rendering React components to the DOM

---

## Language & Type Safety

### **TypeScript 5.9.2**
- **Purpose**: Static type checking and enhanced developer experience
- **Configuration**: `tsconfig.json` with strict mode enabled
- **Features Used**:
  - Strict type checking
  - Path mapping (`@/*` for `./src/*`)
  - ES6+ target compilation
  - JSX preservation for Next.js processing
- **Type Definitions**: Comprehensive type system in `src/types/index.ts` covering:
  - Medical findings and documents
  - Chronologies and briefs
  - User management and cases
  - API responses and forms

### **Node.js Types (@types/node 24.3.0)**
- **Purpose**: TypeScript definitions for Node.js APIs
- **Usage**: Server-side functionality and build processes

### **React Types (@types/react 19.1.12, @types/react-dom 19.1.9)**
- **Purpose**: TypeScript definitions for React and React DOM
- **Usage**: Type safety for React components and hooks

---

## Styling & UI Framework

### **Tailwind CSS 3.4.17**
- **Purpose**: Utility-first CSS framework for rapid UI development
- **Configuration**: `tailwind.config.js` with content paths for all source files
- **Features Used**:
  - Responsive design utilities
  - Dark/light theme support
  - Custom color schemes (slate, blue, green, red, yellow)
  - Spacing, typography, and layout utilities

### **PostCSS 8.5.6**
- **Purpose**: CSS post-processor for Tailwind CSS
- **Configuration**: `postcss.config.js` with Tailwind and Autoprefixer

### **Autoprefixer 10.4.21**
- **Purpose**: Automatic vendor prefix addition for CSS properties
- **Usage**: Ensures cross-browser compatibility

### **Tailwind Merge (tailwind-merge 3.3.1)**
- **Purpose**: Utility for merging Tailwind CSS classes intelligently
- **Usage**: Prevents class conflicts in the `cn()` utility function

### **clsx 2.1.1**
- **Purpose**: Conditional className utility
- **Usage**: Dynamic class name generation based on conditions

### **Class Variance Authority (class-variance-authority 0.7.1)**
- **Purpose**: Component variant management system
- **Usage**: Creating consistent component APIs with different visual variants

---

## UI Components & Libraries

### **Radix UI Components**
- **Purpose**: Unstyled, accessible UI primitives
- **Components Used**:
  - `@radix-ui/react-dialog 1.1.15` - Modal dialogs and overlays
  - `@radix-ui/react-progress 1.1.7` - Progress indicators
  - `@radix-ui/react-select 2.2.6` - Dropdown select components
  - `@radix-ui/react-tabs 1.1.13` - Tab navigation components
  - `@radix-ui/react-toast 1.2.15` - Toast notifications

### **Lucide React 0.542.0**
- **Purpose**: Icon library providing consistent SVG icons
- **Usage**: Throughout the application for UI icons (Upload, File, CheckCircle, etc.)

### **React Select 5.10.2**
- **Purpose**: Advanced select component with search and multi-select capabilities
- **Usage**: Complex form inputs and filtering interfaces

---

## Animation & Interactions

### **Framer Motion 12.23.12**
- **Purpose**: Production-ready motion library for React
- **Features Used**:
  - Component animations (fade, slide, scale)
  - Progress bar animations
  - Drag and drop interactions
  - Layout animations
  - Gesture handling
- **Usage Examples**:
  - File upload progress animations
  - Confidence score visualizations
  - Page transitions and micro-interactions

### **React Beautiful DnD 13.1.1**
- **Purpose**: Drag and drop functionality for lists and components
- **Usage**: Reordering chronology entries, organizing findings, and managing document lists

---

## File Handling & Forms

### **React Dropzone 14.3.8**
- **Purpose**: File upload component with drag-and-drop functionality
- **Features Used**:
  - Multiple file selection
  - File type validation (PDF, DOC, DOCX, images)
  - Drag and drop interface
  - File preview and progress tracking

### **React Hook Form 7.62.0**
- **Purpose**: Performant form library with minimal re-renders
- **Features Used**:
  - Form validation
  - Controlled and uncontrolled inputs
  - Form state management
  - Integration with validation schemas

### **Hookform Resolvers 5.2.1**
- **Purpose**: Validation resolvers for React Hook Form
- **Usage**: Integration with Yup validation schema

### **Yup 1.7.0**
- **Purpose**: Schema validation library
- **Usage**: Form validation rules and error handling

---

## Rich Text & Data Visualization

### **React Quill 2.0.0**
- **Purpose**: Rich text editor component
- **Usage**: Creating and editing legal briefs, case notes, and medical summaries

### **Recharts 3.1.2**
- **Purpose**: Composable charting library built on React components
- **Usage**: 
  - Confidence score visualizations
  - Medical findings distribution charts
  - Case statistics and analytics
  - Progress tracking dashboards

---

## Date & Time Handling

### **date-fns 4.1.0**
- **Purpose**: Modern JavaScript date utility library
- **Features Used**:
  - Date formatting and parsing
  - Relative time calculations
  - Date range operations
  - Timezone handling
- **Usage**: Chronology date management, document timestamps, case timelines

---

## State Management & Context

### **React Context API**
- **Purpose**: Global state management for theme and user preferences
- **Implementation**: `src/contexts/theme-context.tsx`
- **Features**:
  - Dark/light theme switching
  - Persistent theme preferences (localStorage)
  - Theme context provider for entire application

---

## Utility Libraries

### **Custom Utilities (`src/lib/utils.ts`)**
- **Purpose**: Application-specific utility functions
- **Functions**:
  - `cn()` - Class name merging with Tailwind
  - `formatDate()` - Date formatting
  - `formatFileSize()` - File size formatting
  - `generateId()` - Unique ID generation
  - `extractCitation()` - Medical citation parsing
  - `debounce()` - Function debouncing
  - `validateEmail()` - Email validation

---

## Development & Build Tools

### **ESLint (next lint)**
- **Purpose**: Code linting and style enforcement
- **Integration**: Built into Next.js development workflow

### **Build System**
- **Development**: `next dev` - Hot reloading development server
- **Production**: `next build` - Optimized production build
- **Start**: `next start` - Production server

---

## Project Architecture

### **File Structure**
```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx           # Home page
│   ├── dashboard/         # Dashboard pages
│   ├── documents/         # Document management
│   ├── findings/          # Medical findings
│   ├── chronologies/      # Chronology management
│   ├── briefs/           # Legal brief generation
│   ├── templates/        # Brief templates
│   ├── import/           # Document import workflow
│   ├── ai-agent/         # AI assistant interface
│   └── settings/         # User settings
├── components/            # Reusable React components
│   ├── ui/               # Base UI components (Button, Card)
│   ├── layout/           # Layout components (Header, Sidebar)
│   ├── import/           # Import workflow components
│   └── findings/         # Medical findings components
├── contexts/             # React Context providers
├── types/                # TypeScript type definitions
├── lib/                  # Utility functions
└── data/                 # Mock data and constants
```

### **Design Patterns**
- **Component Composition**: Reusable UI components with props interfaces
- **Custom Hooks**: State management and side effects
- **Context Pattern**: Global state management (theme, user preferences)
- **Compound Components**: Complex UI patterns (FileUploader, ConfidenceScore)
- **Render Props**: Flexible component APIs

---

## Domain-Specific Features

### **Medical Records Processing**
- **File Types Supported**: PDF, DOC, DOCX, PNG, JPG, JPEG, TIFF
- **Processing Pipeline**: Upload → AI Analysis → Finding Extraction → Chronology Generation
- **Citation System**: Exhibit and page reference tracking

### **Legal Document Generation**
- **Brief Types**: Initial applications, appeals, medical summaries, disability reports
- **Template System**: Reusable brief templates with sections
- **Citation Management**: Legal citation formatting and references

### **AI Integration Points**
- **Document Processing**: Medical record analysis and extraction
- **Finding Classification**: Medical condition categorization
- **Chronology Generation**: Automated timeline creation
- **Confidence Scoring**: AI confidence in extracted findings

---

## Performance Optimizations

### **Next.js Optimizations**
- **Image Optimization**: Built-in Next.js image optimization
- **Code Splitting**: Automatic route-based code splitting
- **Static Generation**: Pre-rendered pages where applicable
- **Bundle Analysis**: Optimized JavaScript bundles

### **React Optimizations**
- **Lazy Loading**: Dynamic imports for large components
- **Memoization**: React.memo for expensive components
- **Debouncing**: Search and input debouncing
- **Virtual Scrolling**: Large list performance (implied for document lists)

---

## Accessibility & UX

### **Accessibility Features**
- **Radix UI**: Built-in accessibility compliance
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: ARIA labels and semantic HTML
- **Focus Management**: Proper focus handling in modals and forms

### **User Experience**
- **Dark/Light Theme**: User preference-based theming
- **Responsive Design**: Mobile-first responsive layout
- **Loading States**: Progress indicators and skeleton screens
- **Error Handling**: User-friendly error messages and recovery

---

## Security Considerations

### **Type Safety**
- **TypeScript**: Compile-time type checking
- **Input Validation**: Yup schema validation
- **File Type Validation**: Restricted file upload types

### **Data Handling**
- **Client-Side Storage**: localStorage for user preferences
- **File Processing**: Secure file upload and processing pipeline
- **Citation Tracking**: Audit trail for medical findings

---

## Future Extensibility

### **Modular Architecture**
- **Component Library**: Reusable UI components
- **Plugin System**: Template and processing extensions
- **API Integration**: Ready for backend API integration
- **Theming System**: Extensible design system

### **Scalability Considerations**
- **Code Organization**: Clear separation of concerns
- **Type System**: Comprehensive type definitions
- **State Management**: Scalable context-based state
- **Performance**: Optimized for large document processing

---

This technology stack provides a robust foundation for a professional legal technology platform, emphasizing type safety, user experience, accessibility, and maintainability while supporting complex medical document processing and legal brief generation workflows.
