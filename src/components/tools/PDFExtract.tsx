import React, { useState } from 'react';
import { Scissors, Download } from 'lucide-react';
import FileUpload from '../FileUpload';
import ProgressBar from '../ProgressBar';
import { PDFProcessor, ProcessingProgress } from '../../utils/pdfUtils';

const PDFExtract = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<ProcessingProgress>({ progress: 0, status: '' });
  const [pageNumbers, setPageNumbers] = useState('1,3,5');

  const handleExtract = async () => {
    if (files.length === 0) {
      alert('Please select a PDF file to extract pages from.');
      return;
    }

    const pages = parsePageNumbers(pageNumbers);
    if (pages.length === 0) {
      alert('Please enter valid page numbers (e.g., "1,3,5" or "1-5").');
      return;
    }

    setIsProcessing(true);
    try {
      const extractedPdf = await PDFProcessor.extractPages(files[0], pages, setProgress);
      PDFProcessor.downloadFile(extractedPdf, `extracted-pages-${files[0].name}`);
    } catch (error) {
      console.error('Error extracting pages:', error);
      alert('Error extracting pages. Please try again.');
    } finally {
      setIsProcessing(false);
      setProgress({ progress: 0, status: '' });
    }
  };

  const parsePageNumbers = (pageString: string): number[] => {
    try {
      const pages: number[] = [];
      const parts = pageString.split(',');
      
      for (const part of parts) {
        const trimmed = part.trim();
        if (trimmed.includes('-')) {
          const [start, end] = trimmed.split('-').map(n => parseInt(n));
          if (start > 0 && end >= start) {
            for (let i = start; i <= end; i++) {
              pages.push(i);
            }
          }
        } else {
          const pageNum = parseInt(trimmed);
          if (pageNum > 0) {
            pages.push(pageNum);
          }
        }
      }
      
      return [...new Set(pages)].sort((a, b) => a - b);
    } catch {
      return [];
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Scissors className="h-8 w-8 text-yellow-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Extract Pages</h1>
        <p className="text-gray-600">Extract specific pages from your PDF document</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <FileUpload
          files={files}
          onFilesChange={setFiles}
          accept=".pdf,application/pdf"
          multiple={false}
          title="Select PDF File"
          description="Choose a PDF file to extract pages from"
        />

        {files.length > 0 && (
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Page Numbers (e.g., "1,3,5" or "1-5,8,10-12")
            </label>
            <input
              type="text"
              value={pageNumbers}
              onChange={(e) => setPageNumbers(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              placeholder="1,3,5 or 1-5"
            />
            <p className="text-sm text-gray-500 mt-1">
              Specify page numbers separated by commas. Use hyphens for ranges (e.g., 1-5).
            </p>
          </div>
        )}

        <ProgressBar progress={progress} isVisible={isProcessing} />

        {files.length > 0 && pageNumbers && (
          <div className="mt-6 text-center">
            <button
              onClick={handleExtract}
              disabled={isProcessing}
              className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto transition-colors duration-200"
            >
              <Download className="h-5 w-5" />
              {isProcessing ? 'Extracting...' : 'Extract Pages'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFExtract;