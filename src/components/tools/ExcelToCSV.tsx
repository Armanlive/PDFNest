import React, { useState } from 'react';
import { Table, Download } from 'lucide-react';
import FileUpload from '../FileUpload';
import ProgressBar from '../ProgressBar';
import { DocumentProcessor, ProcessingProgress } from '../../utils/documentUtils';

const ExcelToCSV = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<ProcessingProgress>({ progress: 0, status: '' });

  const handleConvert = async () => {
    if (files.length === 0) {
      alert('Please select an Excel file to convert.');
      return;
    }

    setIsProcessing(true);
    try {
      const csvData = await DocumentProcessor.excelToCSV(files[0], setProgress);
      DocumentProcessor.downloadFile(csvData, `${files[0].name.replace(/\.(xlsx|xls)$/, '.csv')}`, 'text/csv');
    } catch (error) {
      console.error('Error converting Excel to CSV:', error);
      alert('Error converting Excel to CSV. Please try again.');
    } finally {
      setIsProcessing(false);
      setProgress({ progress: 0, status: '' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Table className="h-8 w-8 text-teal-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Excel to CSV</h1>
        <p className="text-gray-600">Convert Excel spreadsheets to CSV format</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <FileUpload
          files={files}
          onFilesChange={setFiles}
          accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
          multiple={false}
          title="Select Excel File"
          description="Choose an Excel file to convert to CSV"
        />

        <ProgressBar progress={progress} isVisible={isProcessing} />

        {files.length > 0 && (
          <div className="mt-6 text-center">
            <button
              onClick={handleConvert}
              disabled={isProcessing}
              className="bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto transition-colors duration-200"
            >
              <Download className="h-5 w-5" />
              {isProcessing ? 'Converting...' : 'Convert to CSV'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExcelToCSV;