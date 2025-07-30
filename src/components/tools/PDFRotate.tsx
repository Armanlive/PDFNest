import React, { useState } from 'react';
import { RotateCw, Download } from 'lucide-react';
import FileUpload from '../FileUpload';
import ProgressBar from '../ProgressBar';
import { PDFProcessor, ProcessingProgress } from '../../utils/pdfUtils';

const PDFRotate = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<ProcessingProgress>({ progress: 0, status: '' });
  const [rotation, setRotation] = useState<number>(90);

  const handleRotate = async () => {
    if (files.length === 0) {
      alert('Please select a PDF file to rotate.');
      return;
    }

    setIsProcessing(true);
    try {
      const rotatedPdf = await PDFProcessor.rotatePDF(files[0], rotation, setProgress);
      PDFProcessor.downloadFile(rotatedPdf, `rotated-${files[0].name}`);
    } catch (error) {
      console.error('Error rotating PDF:', error);
      alert('Error rotating PDF. Please try again.');
    } finally {
      setIsProcessing(false);
      setProgress({ progress: 0, status: '' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <RotateCw className="h-8 w-8 text-indigo-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">PDF Rotate</h1>
        <p className="text-gray-600">Rotate all pages in your PDF document</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <FileUpload
          files={files}
          onFilesChange={setFiles}
          accept=".pdf,application/pdf"
          multiple={false}
          title="Select PDF File to Rotate"
          description="Choose a PDF file to rotate its pages"
        />

        {files.length > 0 && (
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rotation Angle
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[90, 180, 270, 360].map((angle) => (
                <button
                  key={angle}
                  onClick={() => setRotation(angle)}
                  className={`px-4 py-2 rounded-lg border transition-colors duration-200 ${
                    rotation === angle
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {angle}°
                </button>
              ))}
            </div>
          </div>
        )}

        <ProgressBar progress={progress} isVisible={isProcessing} />

        {files.length > 0 && (
          <div className="mt-6 text-center">
            <button
              onClick={handleRotate}
              disabled={isProcessing}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto transition-colors duration-200"
            >
              <Download className="h-5 w-5" />
              {isProcessing ? 'Rotating...' : 'Rotate PDF'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFRotate;