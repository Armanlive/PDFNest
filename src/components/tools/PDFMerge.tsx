import React, { useState } from 'react';
import { Merge, Download } from 'lucide-react';
import FileUpload from '../FileUpload';
import ProgressBar from '../ProgressBar';
import { PDFProcessor, ProcessingProgress } from '../../utils/pdfUtils';

const PDFMerge = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<ProcessingProgress>({ progress: 0, status: '' });

  const handleMerge = async () => {
    if (files.length < 2) {
      alert('Please select at least 2 PDF files to merge.');
      return;
    }

    setIsProcessing(true);
    try {
      const mergedPdf = await PDFProcessor.mergePDFs(files, setProgress);
      PDFProcessor.downloadFile(mergedPdf, 'merged-document.pdf');
    } catch (error) {
      console.error('Error merging PDFs:', error);
      alert('Error merging PDFs. Please try again.');
    } finally {
      setIsProcessing(false);
      setProgress({ progress: 0, status: '' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Merge className="h-8 w-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">PDF Merge</h1>
        <p className="text-gray-600">Combine multiple PDF files into one document</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <FileUpload
          files={files}
          onFilesChange={setFiles}
          accept=".pdf,application/pdf"
          multiple={true}
          maxFiles={10}
          title="Select PDF Files to Merge"
          description="Choose multiple PDF files to combine into one document"
        />

        <ProgressBar progress={progress} isVisible={isProcessing} />

        {files.length >= 2 && (
          <div className="mt-6 text-center">
            <button
              onClick={handleMerge}
              disabled={isProcessing}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto transition-colors duration-200"
            >
              <Download className="h-5 w-5" />
              {isProcessing ? 'Merging...' : 'Merge PDFs'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFMerge;