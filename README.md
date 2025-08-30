# Medical Chronology Platform

An AI-powered medical chronology platform designed for legal professionals handling Social Security Disability (SSD), Workers' Compensation, Personal Injury, and Medical Malpractice cases.

## 🚀 Features

- **AI-Powered Document Processing**: Automated medical record analysis and extraction
- **Medical Findings Management**: Organize and categorize medical findings by body system
- **Chronology Generation**: Create detailed medical chronologies with citations
- **Legal Brief Creation**: Generate professional legal briefs and summaries
- **File Upload Support**: PDF, DOC, DOCX, and image file processing
- **Dark/Light Theme**: User preference-based theming
- **Responsive Design**: Mobile-first responsive layout

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.2 with App Router
- **Language**: TypeScript 5.9.2
- **Styling**: Tailwind CSS 3.4.17
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Animation**: Framer Motion
- **Charts**: Recharts
- **Forms**: React Hook Form with Yup validation
- **File Upload**: React Dropzone
- **Rich Text**: React Quill

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd medical-chronology-platform
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment to Vercel

### Prerequisites
- GitHub account
- Vercel account (free tier available)
- Git repository with your code

### Step 1: Push to GitHub

1. Create a new repository on GitHub
2. Add the remote origin:
```bash
git remote add origin https://github.com/yourusername/medical-chronology-platform.git
```

3. Commit and push your code:
```bash
git add .
git commit -m "Initial commit - Medical Chronology Platform"
git push -u origin main
```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Configure project settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (leave default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
5. Add environment variables if needed (see `.env.example`)
6. Click "Deploy"

#### Option B: Using Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy from project root:
```bash
vercel
```

4. Follow the prompts:
   - Link to existing project? **N**
   - Project name: **medical-chronology-platform**
   - Directory: **./** (current directory)

5. For production deployment:
```bash
vercel --prod
```

### Step 3: Configure Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Navigate to "Settings" → "Domains"
3. Add your custom domain
4. Configure DNS records as instructed

## 🔧 Environment Variables

Copy `.env.example` to `.env.local` and configure the following variables:

```env
# Required
NEXT_PUBLIC_APP_NAME="MedChron AI - Medical AI Assistant"
NEXT_PUBLIC_APP_URL="https://your-app-name.vercel.app"

# Optional - Add as needed
# NEXT_PUBLIC_API_URL="https://api.your-domain.com"
# OPENAI_API_KEY="your-openai-api-key"
# DATABASE_URL="your-database-connection-string"
```

## 📁 Project Structure

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
│   ├── ui/               # Base UI components
│   ├── layout/           # Layout components
│   ├── import/           # Import workflow components
│   └── findings/         # Medical findings components
├── contexts/             # React Context providers
├── types/                # TypeScript type definitions
├── lib/                  # Utility functions
└── data/                 # Mock data and constants
```

## 🧪 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🔍 Key Features Explained

### Document Import Workflow
- Multi-step import process with file validation
- Support for multiple file formats
- Progress tracking and error handling
- AI-powered content extraction

### Medical Findings Management
- Categorization by body systems
- Confidence score visualization
- Bulk actions for efficiency
- Advanced filtering and search

### Chronology Generation
- Automated timeline creation
- Citation management
- Export capabilities
- Template-based formatting

### Legal Brief Creation
- Multiple brief types supported
- Rich text editing
- Template system
- Professional formatting

## 🎨 Theming

The application supports both dark and light themes with:
- System preference detection
- Manual theme switching
- Persistent user preferences
- Consistent color schemes across components

## 📱 Responsive Design

- Mobile-first approach
- Optimized for tablets and desktops
- Touch-friendly interactions
- Accessible navigation

## 🔒 Security Features

- Content Security Policy headers
- XSS protection
- Frame options security
- Input validation and sanitization

## 🚀 Performance Optimizations

- Static site generation where applicable
- Image optimization
- Code splitting
- Bundle optimization
- Lazy loading for large components

## 📄 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions, please open an issue in the GitHub repository.

---

**Built with ❤️ for legal professionals**
