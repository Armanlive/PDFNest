import React, { useState } from 'react';
import { Image, Download } from 'lucide-react';
import FileUpload from '../FileUpload';
import ProgressBar from '../ProgressBar';
import { PDFProcessor, ProcessingProgress } from '../../utils/pdfUtils';

const ImageToPDF = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<ProcessingProgress>({ progress: 0, status: '' });

  const handleConvert = async () => {
    if (files.length === 0) {
      alert('Please select image files to convert.');
      return;
    }

    setIsProcessing(true);
    try {
      const pdfData = await PDFProcessor.convertImageToPDF(files, setProgress);
      PDFProcessor.downloadFile(pdfData, 'images-to-pdf.pdf');
    } catch (error) {
      console.error('Error converting images to PDF:', error);
      alert('Error converting images to PDF. Please try again.');
    } finally {
      setIsProcessing(false);
      setProgress({ progress: 0, status: '' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Image className="h-8 w-8 text-orange-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Image to PDF</h1>
        <p className="text-gray-600">Convert JPG, PNG, and other images to PDF format</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <FileUpload
          files={files}
          onFilesChange={setFiles}
          accept=".jpg,.jpeg,.png,.gif,.bmp,.webp,image/*"
          multiple={true}
          maxFiles={20}
          title="Select Image Files"
          description="Choose image files to convert to PDF"
        />

        <ProgressBar progress={progress} isVisible={isProcessing} />

        {files.length > 0 && (
          <div className="mt-6 text-center">
            <button
              onClick={handleConvert}
              disabled={isProcessing}
              className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto transition-colors duration-200"
            >
              <Download className="h-5 w-5" />
              {isProcessing ? 'Converting...' : 'Convert to PDF'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageToPDF;