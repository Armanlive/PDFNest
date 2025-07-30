import React from 'react';
import { ProcessingProgress } from '../utils/pdfUtils';

interface ProgressBarProps {
  progress: ProcessingProgress;
  isVisible: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="w-full bg-theme-secondary rounded-full h-2 mb-4">
      <div
        className="bg-theme-primary-btn h-2 rounded-full transition-all duration-300"
        style={{ width: `${progress.progress}%` }}
      />
      <p className="text-sm text-theme-secondary mt-2">{progress.status}</p>
    </div>
  );
};

export default ProgressBar;