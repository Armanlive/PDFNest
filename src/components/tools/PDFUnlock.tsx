import React, { useState } from 'react';
import { Unlock, Download } from 'lucide-react';
import FileUpload from '../FileUpload';
import ProgressBar from '../ProgressBar';
import { PDFProcessor, ProcessingProgress } from '../../utils/pdfUtils';

const PDFUnlock = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<ProcessingProgress>({ progress: 0, status: '' });
  const [password, setPassword] = useState('');

  const handleUnlock = async () => {
    if (files.length === 0) {
      alert('Please select a PDF file to unlock.');
      return;
    }

    if (!password.trim()) {
      alert('Please enter the password.');
      return;
    }

    setIsProcessing(true);
    try {
      const unlockedPdf = await PDFProcessor.unlockPDF(files[0], password, setProgress);
      PDFProcessor.downloadFile(unlockedPdf, `unlocked-${files[0].name}`);
    } catch (error) {
      console.error('Error unlocking PDF:', error);
      alert('Error unlocking PDF. Please check the password and try again.');
    } finally {
      setIsProcessing(false);
      setProgress({ progress: 0, status: '' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Unlock className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">PDF Unlock</h1>
        <p className="text-gray-600">Remove password protection from PDF documents</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <FileUpload
          files={files}
          onFilesChange={setFiles}
          accept=".pdf,application/pdf"
          multiple={false}
          title="Select Protected PDF File"
          description="Choose a password-protected PDF file to unlock"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter the PDF password"
            />
          </div>
        )}

        <ProgressBar progress={progress} isVisible={isProcessing} />

        {files.length > 0 && password && (
          <div className="mt-6 text-center">
            <button
              onClick={handleUnlock}
              disabled={isProcessing}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto transition-colors duration-200"
            >
              <Download className="h-5 w-5" />
              {isProcessing ? 'Unlocking...' : 'Unlock PDF'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFUnlock;