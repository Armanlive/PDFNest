import React, { useCallback } from 'react';
import { Upload, X, FileText } from 'lucide-react';

interface FileUploadProps {
  files: File[];
  onFilesChange: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  title: string;
  description: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  files,
  onFilesChange,
  accept = '.pdf',
  multiple = true,
  maxFiles = 10,
  title,
  description
}) => {
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = droppedFiles.filter(file => 
      accept.includes(file.type) || accept.includes(file.name.split('.').pop() || '')
    );
    
    if (multiple) {
      const newFiles = [...files, ...validFiles].slice(0, maxFiles);
      onFilesChange(newFiles);
    } else {
      onFilesChange(validFiles.slice(0, 1));
    }
  }, [files, onFilesChange, accept, multiple, maxFiles]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    
    if (multiple) {
      const newFiles = [...files, ...selectedFiles].slice(0, maxFiles);
      onFilesChange(newFiles);
    } else {
      onFilesChange(selectedFiles.slice(0, 1));
    }
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    onFilesChange(newFiles);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-theme-border rounded-lg p-8 text-center hover:border-blue-400 transition-colors duration-200 bg-theme-card"
      >
        <Upload className="h-12 w-12 text-theme-secondary mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-theme-primary mb-2">{title}</h3>
        <p className="text-theme-secondary mb-4">{description}</p>
        
        <label className="bg-theme-primary-btn hover:bg-theme-primary-btn text-white px-6 py-2 rounded-lg cursor-pointer inline-block transition-colors duration-200">
          Choose Files
          <input
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleFileInput}
            className="hidden"
          />
        </label>
        
        <p className="text-sm text-theme-muted mt-2">
          or drag and drop files here
        </p>
      </div>

      {files.length > 0 && (
        <div className="mt-6 space-y-2">
          <h4 className="font-semibold text-theme-primary">Selected Files:</h4>
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between bg-theme-secondary p-3 rounded-lg border border-theme-border">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-blue-600 mr-3" />
                <div>
                  <p className="font-medium text-theme-primary">{file.name}</p>
                  <p className="text-sm text-theme-secondary">{formatFileSize(file.size)}</p>
                </div>
              </div>
              <button
                onClick={() => removeFile(index)}
                className="text-red-500 hover:text-red-700 transition-colors duration-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;