import React, { useState } from 'react';
import { Lock, Download } from 'lucide-react';
import FileUpload from '../FileUpload';
import ProgressBar from '../ProgressBar';
import { PDFProcessor, ProcessingProgress } from '../../utils/pdfUtils';

const PDFProtect = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<ProcessingProgress>({ progress: 0, status: '' });
  const [password, setPassword] = useState('');

  const handleProtect = async () => {
    if (files.length === 0) {
      alert('Please select a PDF file to protect.');
      return;
    }

    if (!password.trim()) {
      alert('Please enter a password.');
      return;
    }

    setIsProcessing(true);
    try {
      const protectedPdf = await PDFProcessor.protectPDF(files[0], password, setProgress);
      PDFProcessor.downloadFile(protectedPdf, `protected-${files[0].name}`);
    } catch (error) {
      console.error('Error protecting PDF:', error);
      alert('Error protecting PDF. Please try again.');
    } finally {
      setIsProcessing(false);
      setProgress({ progress: 0, status: '' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock className="h-8 w-8 text-red-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">PDF Protect</h1>
        <p className="text-gray-600">Add password protection to secure your documents</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <FileUpload
          files={files}
          onFilesChange={setFiles}
          accept=".pdf,application/pdf"
          multiple={false}
          title="Select PDF File to Protect"
          description="Choose a PDF file to add password protection"
        />

        {files.length > 0 && (
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Enter password to protect the PDF"
            />
            <p className="text-sm text-gray-500 mt-1">
              This password will be required to open the PDF file.
            </p>
          </div>
        )}

        <ProgressBar progress={progress} isVisible={isProcessing} />

        {files.length > 0 && password && (
          <div className="mt-6 text-center">
            <button
              onClick={handleProtect}
              disabled={isProcessing}
              className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto transition-colors duration-200"
            >
              <Download className="h-5 w-5" />
              {isProcessing ? 'Protecting...' : 'Protect PDF'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFProtect;