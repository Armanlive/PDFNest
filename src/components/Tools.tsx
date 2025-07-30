import React from 'react';
import { useState } from 'react';
import { 
  Merge, 
  Split, 
  Minimize, 
  Image,
  Lock, 
  RotateCw,
  Droplets,
  Scissors,
  ArrowRight,
  Unlock,
  FileText,
  FileSpreadsheet,
  Table,
  ImageIcon,
  Code
} from 'lucide-react';
import ToolModal from './ToolModal';

const Tools = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tools = [
    {
      icon: Merge,
      title: 'PDF Merge',
      description: 'Combine multiple PDF files into one document easily and quickly.',
      color: 'bg-blue-500'
    },
    {
      icon: Split,
      title: 'PDF Split',
      description: 'Extract pages or split your PDF into multiple separate documents.',
      color: 'bg-green-500'
    },
    {
      icon: Minimize,
      title: 'PDF Compress',
      description: 'Reduce file size while maintaining quality for easier sharing.',
      color: 'bg-purple-500'
    },
    {
      icon: Image,
      title: 'Image to PDF',
      description: 'Convert JPG, PNG, and other images to PDF format.',
      color: 'bg-orange-500'
    },
    {
      icon: Lock,
      title: 'PDF Protect',
      description: 'Add password protection and encryption to secure your documents.',
      color: 'bg-red-500'
    },
    {
      icon: RotateCw,
      title: 'PDF Rotate',
      description: 'Rotate pages in your PDF document to the correct orientation.',
      color: 'bg-indigo-500'
    },
    {
      icon: Droplets,
      title: 'PDF Watermark',
      description: 'Add text watermarks to protect and brand your documents.',
      color: 'bg-cyan-500'
    },
    {
      icon: Scissors,
      title: 'Extract Pages',
      description: 'Extract specific pages from your PDF into a new document.',
      color: 'bg-yellow-500'
    },
    {
      icon: Unlock,
      title: 'PDF Unlock',
      description: 'Remove password protection from PDF documents.',
      color: 'bg-green-500'
    },
    {
      icon: FileText,
      title: 'PDF to Word',
      description: 'Convert PDF documents to editable Word format.',
      color: 'bg-blue-500'
    },
    {
      icon: FileSpreadsheet,
      title: 'PDF to Excel',
      description: 'Convert PDF documents to Excel spreadsheets.',
      color: 'bg-green-500'
    },
    {
      icon: FileText,
      title: 'Word to PDF',
      description: 'Convert Word documents to PDF format.',
      color: 'bg-blue-500'
    },
    {
      icon: FileSpreadsheet,
      title: 'Excel to JSON',
      description: 'Convert Excel spreadsheets to JSON format.',
      color: 'bg-emerald-500'
    },
    {
      icon: Table,
      title: 'Excel to CSV',
      description: 'Convert Excel spreadsheets to CSV format.',
      color: 'bg-teal-500'
    },
    {
      icon: ImageIcon,
      title: 'Image to Excel',
      description: 'Extract data from images and create Excel spreadsheet.',
      color: 'bg-violet-500'
    },
    {
      icon: Code,
      title: 'XML Creator',
      description: 'Create XML documents with custom structure and data.',
      color: 'bg-amber-500'
    }
  ];

  const handleToolClick = (toolName: string) => {
    setSelectedTool(toolName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTool(null);
  };

  return (
    <>
      <section id="tools" className="py-20 bg-theme-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-theme-primary mb-4">
            Powerful PDF Tools
          </h2>
          <p className="text-xl text-theme-secondary max-w-3xl mx-auto">
            Everything you need to work with PDF documents, all in one place. 
            Choose from our comprehensive suite of tools below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <div 
              key={index}
              className="bg-theme-card rounded-xl shadow-theme hover:shadow-theme-lg transition-all duration-300 p-8 border border-theme-border group cursor-pointer transform hover:-translate-y-1"
              onClick={() => handleToolClick(tool.title)}
            >
              <div className={`${tool.color} w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200`}>
                <tool.icon className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-theme-primary mb-3">
                {tool.title}
              </h3>
              
              <p className="text-theme-secondary mb-6 leading-relaxed">
                {tool.description}
              </p>
              
              <div className="flex items-center text-blue-600 font-medium group-hover:text-theme-primary transition-colors duration-200">
                <span>Use Tool</span>
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
      </section>
      
      <ToolModal
        isOpen={isModalOpen}
        onClose={closeModal}
        toolName={selectedTool || ''}
      />
    </>
  );
};

export default Tools;