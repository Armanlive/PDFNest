# PDFNest 🪶

**Your PDF Management Made Simple**

PDFNest is a comprehensive, free online platform for PDF document management. Transform, protect, and optimize your PDF documents with our suite of powerful tools. Built with React, TypeScript, and modern web technologies.

![PDFNest Logo](public/PdfNest.png)

## ✨ Features

- **16 Powerful Tools** for PDF and document management
- **Three Theme Modes**: Light, Dark, and Grey
- **Responsive Design** - Works on all devices
- **No File Size Limits** - Process documents of any size
- **100% Secure** - Files processed locally in your browser
- **No Registration Required** - Start using immediately
- **AI Chatbot Assistant** - Get help with any tool
- **Modern UI/UX** - Beautiful, intuitive interface

## 🛠️ Available Tools

### PDF Tools

#### 1. **PDF Merge** 🔗
- **Purpose**: Combine multiple PDF files into one document
- **Features**: 
  - Upload up to 10 PDF files
  - Drag and drop interface
  - Maintain original quality
  - Custom file ordering
- **Use Cases**: Combining reports, merging contracts, consolidating documents

#### 2. **PDF Split** ✂️
- **Purpose**: Extract specific pages or split PDF into multiple documents
- **Features**:
  - Specify page ranges (e.g., "1-5,6-10")
  - Individual page extraction
  - Multiple output files
  - ZIP download for multiple files
- **Use Cases**: Extracting chapters, separating sections, creating individual documents

#### 3. **PDF Compress** 🗜️
- **Purpose**: Reduce file size while maintaining quality
- **Features**:
  - Adjustable compression levels
  - Quality vs. size balance
  - Metadata optimization
  - No quality loss at medium compression
- **Use Cases**: Email attachments, storage optimization, faster uploads

#### 4. **PDF Protect** 🔒
- **Purpose**: Add password protection and encryption
- **Features**:
  - Custom password setting
  - AES encryption
  - User and owner password protection
  - Secure document sharing
- **Use Cases**: Confidential documents, secure sharing, privacy protection

#### 5. **PDF Rotate** 🔄
- **Purpose**: Rotate all pages in PDF document
- **Features**:
  - 90°, 180°, 270°, 360° rotation options
  - Batch page rotation
  - Maintains document structure
  - Quick orientation fixes
- **Use Cases**: Fixing scanned documents, correcting orientation, preparing for printing

#### 6. **PDF Watermark** 💧
- **Purpose**: Add text watermarks to protect and brand documents
- **Features**:
  - Custom watermark text
  - Diagonal placement
  - Opacity control
  - All pages watermarking
- **Use Cases**: Document branding, copyright protection, draft marking

#### 7. **Extract Pages** 📄
- **Purpose**: Extract specific pages into a new document
- **Features**:
  - Individual page selection
  - Range-based extraction
  - Multiple page formats
  - Preserve original formatting
- **Use Cases**: Creating excerpts, extracting important pages, document sampling

#### 8. **PDF Unlock** 🔓
- **Purpose**: Remove password protection from PDF documents
- **Features**:
  - Password-based unlocking
  - Maintains document integrity
  - Secure processing
  - Original quality preservation
- **Use Cases**: Accessing forgotten passwords, removing restrictions, document editing

#### 9. **PDF to Word** 📝
- **Purpose**: Convert PDF documents to editable Word format
- **Features**:
  - Text extraction
  - Format preservation
  - Editable output
  - DOCX format support
- **Use Cases**: Document editing, content reuse, format conversion

#### 10. **PDF to Excel** 📊
- **Purpose**: Convert PDF documents to Excel spreadsheets
- **Features**:
  - Data extraction
  - Table recognition
  - XLSX format output
  - Structured data conversion
- **Use Cases**: Data analysis, report processing, spreadsheet creation

### Document Conversion Tools

#### 11. **Image to PDF** 🖼️
- **Purpose**: Convert images to PDF format
- **Features**:
  - Multiple image formats (JPG, PNG, GIF, BMP, WebP)
  - Batch conversion (up to 20 images)
  - Automatic sizing
  - Quality preservation
- **Use Cases**: Creating photo albums, document scanning, image archiving

#### 12. **Word to PDF** 📄
- **Purpose**: Convert Word documents to PDF format
- **Features**:
  - DOCX and DOC support
  - Layout preservation
  - Font embedding
  - Professional output
- **Use Cases**: Document sharing, printing preparation, format standardization

#### 13. **Excel to JSON** 📋
- **Purpose**: Convert Excel spreadsheets to JSON format
- **Features**:
  - Multiple sheet support
  - Data structure preservation
  - Clean JSON output
  - Developer-friendly format
- **Use Cases**: Data migration, API integration, web development

#### 14. **Excel to CSV** 📈
- **Purpose**: Convert Excel spreadsheets to CSV format
- **Features**:
  - First sheet conversion
  - Comma-separated values
  - Universal compatibility
  - Data export
- **Use Cases**: Data analysis, database import, system integration

#### 15. **Image to Excel** 🖼️📊
- **Purpose**: Extract data from images and create Excel spreadsheet
- **Features**:
  - Image metadata extraction
  - Batch processing
  - Structured data output
  - File information analysis
- **Use Cases**: Image cataloging, metadata analysis, inventory management

#### 16. **XML Creator** 🏗️
- **Purpose**: Create XML documents with custom structure and data
- **Features**:
  - Custom root elements
  - Multiple field types (text, number, boolean)
  - Dynamic field addition
  - Structured XML output
- **Use Cases**: Data exchange, configuration files, API responses

## 🎨 Theme System

PDFNest features a comprehensive theme system with three distinct modes:

### 🌞 **Light Theme** (Default)
- Clean white backgrounds
- High contrast for readability
- Professional blue accents
- Perfect for daytime use

### 🌙 **Dark Theme**
- Deep slate backgrounds
- Reduced eye strain
- Modern dark interface
- Ideal for low-light environments

### ⚫ **Grey Theme**
- Neutral grey palette
- Professional appearance
- Balanced contrast
- Great for business settings

**Theme Features:**
- Instant switching with no reload
- Persistent user preference
- Smooth transitions (0.3s)
- Responsive design
- Accessible contrast ratios

## 🤖 AI Chatbot Assistant

PDFNest includes **NestBot**, an intelligent chatbot assistant that helps users:

- **Tool Recommendations**: Get suggestions for the right tool
- **Usage Instructions**: Step-by-step guidance
- **Troubleshooting**: Solve common issues
- **Feature Information**: Learn about capabilities
- **Quick Answers**: Instant responses to common questions

**Chatbot Features:**
- Context-aware responses
- Quick reply buttons
- Persistent chat history
- Minimizable interface
- Smart tool suggestions

## 🚀 Getting Started

### Prerequisites

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/pdfnest.git
   cd pdfnest
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🏗️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework

### PDF Processing
- **pdf-lib** - PDF manipulation and creation
- **jsPDF** - PDF generation from scratch

### Document Processing
- **xlsx** - Excel file processing
- **mammoth** - Word document conversion
- **xml2js** - XML parsing and generation

### File Handling
- **file-saver** - Client-side file downloads
- **jszip** - ZIP file creation
- **html2canvas** - HTML to image conversion

### UI Components
- **Lucide React** - Beautiful icons
- **Custom Components** - Reusable UI elements

## 📁 Project Structure

```
pdfnest/
├── public/
│   └── PdfNest.png          # Logo and favicon
├── src/
│   ├── components/          # React components
│   │   ├── tools/          # Individual tool components
│   │   ├── Header.tsx      # Navigation header
│   │   ├── Hero.tsx        # Landing section
│   │   ├── Tools.tsx       # Tools grid
│   │   ├── About.tsx       # About section
│   │   ├── Contact.tsx     # Contact form
│   │   ├── Footer.tsx      # Site footer
│   │   ├── Chatbot.tsx     # AI assistant
│   │   ├── ThemeToggle.tsx # Theme switcher
│   │   ├── FileUpload.tsx  # File upload component
│   │   ├── ProgressBar.tsx # Progress indicator
│   │   └── ToolModal.tsx   # Tool modal wrapper
│   ├── contexts/           # React contexts
│   │   └── ThemeContext.tsx # Theme management
│   ├── utils/              # Utility functions
│   │   ├── pdfUtils.ts     # PDF processing
│   │   └── documentUtils.ts # Document conversion
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # App entry point
│   └── index.css           # Global styles
├── package.json            # Dependencies
├── tailwind.config.js      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

## 🔒 Security & Privacy

- **Client-Side Processing**: All files are processed locally in your browser
- **No File Upload**: Files never leave your device
- **Automatic Cleanup**: Temporary data is cleared after processing
- **No Tracking**: We don't collect or store personal information
- **Secure Encryption**: Password protection uses industry-standard encryption

## 🌐 Browser Support

PDFNest works on all modern browsers:

- **Chrome** 80+
- **Firefox** 75+
- **Safari** 13+
- **Edge** 80+
- **Mobile browsers** (iOS Safari, Chrome Mobile)

## 📱 Responsive Design

- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Perfect for iPad and Android tablets
- **Desktop**: Full-featured desktop experience
- **Touch-Friendly**: Large buttons and touch targets
- **Adaptive Layout**: Adjusts to any screen size

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write clean, readable code
- Add comments for complex logic
- Test your changes thoroughly

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **pdf-lib** - Excellent PDF manipulation library
- **Tailwind CSS** - Amazing utility-first CSS framework
- **Lucide** - Beautiful icon library
- **React** - Powerful UI library
- **Vite** - Lightning-fast build tool

## 📞 Support

Need help? We're here for you:

- **Email**: support@pdfnest.com
- **Phone**: +1 (555) 123-4567
- **Address**: 123 PDF Street, Digital City, DC 12345
- **Chatbot**: Use NestBot on the website for instant help

## 🚀 Deployment

### Netlify (Recommended)

1. **Connect your repository** to Netlify
2. **Set build command**: `npm run build`
3. **Set publish directory**: `dist`
4. **Deploy automatically** on every push

### Vercel

1. **Import project** from GitHub
2. **Configure build settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. **Deploy with one click**

### Manual Deployment

1. **Build the project**: `npm run build`
2. **Upload the `dist` folder** to your web server
3. **Configure your server** to serve the index.html for all routes

---

**Made with ❤️ for document management**

*PDFNest - Transform, protect, and optimize your PDF documents with ease.*