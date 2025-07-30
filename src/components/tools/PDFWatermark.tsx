import React, { useState } from 'react';
import { Droplets, Download } from 'lucide-react';
import FileUpload from '../FileUpload';
import ProgressBar from '../ProgressBar';
import { PDFProcessor, ProcessingProgress } from '../../utils/pdfUtils';

const PDFWatermark = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<ProcessingProgress>({ progress: 0, status: '' });
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');

  const handleAddWatermark = async () => {
    if (files.length === 0) {
      alert('Please select a PDF file to add watermark.');
      return;
    }

    if (!watermarkText.trim()) {
      alert('Please enter watermark text.');
      return;
    }

    setIsProcessing(true);
    try {
      const watermarkedPdf = await PDFProcessor.addWatermark(files[0], watermarkText, setProgress);
      PDFProcessor.downloadFile(watermarkedPdf, `watermarked-${files[0].name}`);
    } catch (error) {
      console.error('Error adding watermark:', error);
      alert('Error adding watermark. Please try again.');
    } finally {
      setIsProcessing(false);
      setProgress({ progress: 0, status: '' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="bg-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Droplets className="h-8 w-8 text-cyan-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">PDF Watermark</h1>
        <p className="text-gray-600">Add text watermark to your PDF documents</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <FileUpload
          files={files}
          onFilesChange={setFiles}
          accept=".pdf,application/pdf"
          multiple={false}
          title="Select PDF File"
          description="Choose a PDF file to add watermark"
        />

        {files.length > 0 && (
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Watermark Text
            </label>
            <input
              type="text"
              value={watermarkText}
              onChange={(e) => setWatermarkText(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="Enter watermark text"
            />
            <p className="text-sm text-gray-500 mt-1">
              This text will appear as a diagonal watermark on all pages.
            </p>
          </div>
        )}

        <ProgressBar progress={progress} isVisible={isProcessing} />

        {files.length > 0 && watermarkText && (
          <div className="mt-6 text-center">
            <button
              onClick={handleAddWatermark}
              disabled={isProcessing}
              className="bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto transition-colors duration-200"
            >
              <Download className="h-5 w-5" />
              {isProcessing ? 'Adding Watermark...' : 'Add Watermark'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFWatermark;