import React, { useState } from 'react';
import { Minimize, Download } from 'lucide-react';
import FileUpload from '../FileUpload';
import ProgressBar from '../ProgressBar';
import { PDFProcessor, ProcessingProgress } from '../../utils/pdfUtils';

const PDFCompress = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<ProcessingProgress>({ progress: 0, status: '' });
  const [compressionLevel, setCompressionLevel] = useState<number>(0.7);

  const handleCompress = async () => {
    if (files.length === 0) {
      alert('Please select a PDF file to compress.');
      return;
    }

    setIsProcessing(true);
    try {
      const compressedPdf = await PDFProcessor.compressPDF(files[0], compressionLevel, setProgress);
      PDFProcessor.downloadFile(compressedPdf, `compressed-${files[0].name}`);
    } catch (error) {
      console.error('Error compressing PDF:', error);
      alert('Error compressing PDF. Please try again.');
    } finally {
      setIsProcessing(false);
      setProgress({ progress: 0, status: '' });
    }
  };

  const getCompressionLabel = (level: number) => {
    if (level >= 0.9) return 'Low Compression (High Quality)';
    if (level >= 0.7) return 'Medium Compression (Balanced)';
    return 'High Compression (Smaller Size)';
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Minimize className="h-8 w-8 text-purple-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">PDF Compress</h1>
        <p className="text-gray-600">Reduce file size while maintaining quality</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <FileUpload
          files={files}
          onFilesChange={setFiles}
          accept=".pdf,application/pdf"
          multiple={false}
          title="Select PDF File to Compress"
          description="Choose a PDF file to reduce its size"
        />

        {files.length > 0 && (
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Compression Level: {getCompressionLabel(compressionLevel)}
            </label>
            <input
              type="range"
              min="0.3"
              max="1"
              step="0.1"
              value={compressionLevel}
              onChange={(e) => setCompressionLevel(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>Smaller Size</span>
              <span>Higher Quality</span>
            </div>
          </div>
        )}

        <ProgressBar progress={progress} isVisible={isProcessing} />

        {files.length > 0 && (
          <div className="mt-6 text-center">
            <button
              onClick={handleCompress}
              disabled={isProcessing}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto transition-colors duration-200"
            >
              <Download className="h-5 w-5" />
              {isProcessing ? 'Compressing...' : 'Compress PDF'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFCompress;