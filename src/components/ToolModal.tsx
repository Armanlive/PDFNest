import React from 'react';
import { X } from 'lucide-react';
import PDFMerge from './tools/PDFMerge';
import PDFSplit from './tools/PDFSplit';
import PDFCompress from './tools/PDFCompress';
import PDFProtect from './tools/PDFProtect';
import ImageToPDF from './tools/ImageToPDF';
import PDFRotate from './tools/PDFRotate';
import PDFWatermark from './tools/PDFWatermark';
import PDFExtract from './tools/PDFExtract';
import PDFUnlock from './tools/PDFUnlock';
import PDFToWord from './tools/PDFToWord';
import PDFToExcel from './tools/PDFToExcel';
import WordToPDF from './tools/WordToPDF';
import ExcelToJSON from './tools/ExcelToJSON';
import ExcelToCSV from './tools/ExcelToCSV';
import ImageToExcel from './tools/ImageToExcel';
import XMLCreator from './tools/XMLCreator';

interface ToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  toolName: string;
}

const ToolModal: React.FC<ToolModalProps> = ({ isOpen, onClose, toolName }) => {
  if (!isOpen) return null;

  const renderTool = () => {
    switch (toolName) {
      case 'PDF Merge':
        return <PDFMerge />;
      case 'PDF Split':
        return <PDFSplit />;
      case 'PDF Compress':
        return <PDFCompress />;
      case 'PDF Protect':
        return <PDFProtect />;
      case 'Image to PDF':
        return <ImageToPDF />;
      case 'PDF Rotate':
        return <PDFRotate />;
      case 'PDF Watermark':
        return <PDFWatermark />;
      case 'Extract Pages':
        return <PDFExtract />;
      case 'PDF Unlock':
        return <PDFUnlock />;
      case 'PDF to Word':
        return <PDFToWord />;
      case 'PDF to Excel':
        return <PDFToExcel />;
      case 'Word to PDF':
        return <WordToPDF />;
      case 'Excel to JSON':
        return <ExcelToJSON />;
      case 'Excel to CSV':
        return <ExcelToCSV />;
      case 'Image to Excel':
        return <ImageToExcel />;
      case 'XML Creator':
        return <XMLCreator />;
      default:
        return <div>Tool not found</div>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-theme-card rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-theme-lg border border-theme-border">
        <div className="sticky top-0 bg-theme-card border-b border-theme-border px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-theme-primary">{toolName}</h2>
          <button
            onClick={onClose}
            className="text-theme-secondary hover:text-theme-primary transition-colors duration-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6">
          {renderTool()}
        </div>
      </div>
    </div>
  );
};

export default ToolModal;