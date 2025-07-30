import React, { useState } from 'react';
import { Split, Download } from 'lucide-react';
import FileUpload from '../FileUpload';
import ProgressBar from '../ProgressBar';
import { PDFProcessor, ProcessingProgress } from '../../utils/pdfUtils';

const PDFSplit = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<ProcessingProgress>({ progress: 0, status: '' });
  const [splitRanges, setSplitRanges] = useState<string>('1-5,6-10');

  const handleSplit = async () => {
    if (files.length === 0) {
      alert('Please select a PDF file to split.');
      return;
    }

    const ranges = parseSplitRanges(splitRanges);
    if (ranges.length === 0) {
      alert('Please enter valid page ranges (e.g., "1-5,6-10").');
      return;
    }

    setIsProcessing(true);
    try {
      const splitPdfs = await PDFProcessor.splitPDF(files[0], ranges, setProgress);
      const downloadFiles = splitPdfs.map((pdf, index) => ({
        data: pdf,
        name: `split-${index + 1}.pdf`
      }));
      
      await PDFProcessor.downloadMultipleFiles(downloadFiles);
    } catch (error) {
      console.error('Error splitting PDF:', error);
      alert('Error splitting PDF. Please try again.');
    } finally {
      setIsProcessing(false);
      setProgress({ progress: 0, status: '' });
    }
  };

  const parseSplitRanges = (rangeString: string) => {
    try {
      return rangeString.split(',').map(range => {
        const [start, end] = range.trim().split('-').map(n => parseInt(n));
        return { start, end: end || start };
      }).filter(range => range.start > 0 && range.end >= range.start);
    } catch {
      return [];
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Split className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">PDF Split</h1>
        <p className="text-gray-600">Extract specific pages or split your PDF into multiple documents</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <FileUpload
          files={files}
          onFilesChange={setFiles}
          accept=".pdf,application/pdf"
          multiple={false}
          title="Select PDF File to Split"
          description="Choose a PDF file to split into multiple documents"
        />

        {files.length > 0 && (
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Page Ranges (e.g., "1-5,6-10" or "1,3,5-7")
            </label>
            <input
              type="text"
              value={splitRanges}
              onChange={(e) => setSplitRanges(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="1-5,6-10"
            />
            <p className="text-sm text-gray-500 mt-1">
              Specify page ranges separated by commas. Use hyphens for ranges (e.g., 1-5) or individual pages (e.g., 1,3,7).
            </p>
          </div>
        )}

        <ProgressBar progress={progress} isVisible={isProcessing} />

        {files.length > 0 && (
          <div className="mt-6 text-center">
            <button
              onClick={handleSplit}
              disabled={isProcessing}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto transition-colors duration-200"
            >
              <Download className="h-5 w-5" />
              {isProcessing ? 'Splitting...' : 'Split PDF'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFSplit;