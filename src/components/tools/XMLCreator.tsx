import React, { useState } from 'react';
import { Code, Download, Plus, Minus } from 'lucide-react';
import ProgressBar from '../ProgressBar';
import { DocumentProcessor, ProcessingProgress } from '../../utils/documentUtils';

interface XMLField {
  key: string;
  value: string;
  type: 'text' | 'number' | 'boolean';
}

const XMLCreator = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<ProcessingProgress>({ progress: 0, status: '' });
  const [rootElement, setRootElement] = useState('root');
  const [fields, setFields] = useState<XMLField[]>([
    { key: 'name', value: 'John Doe', type: 'text' },
    { key: 'age', value: '30', type: 'number' },
    { key: 'active', value: 'true', type: 'boolean' }
  ]);

  const addField = () => {
    setFields([...fields, { key: '', value: '', type: 'text' }]);
  };

  const removeField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const updateField = (index: number, field: Partial<XMLField>) => {
    const updatedFields = [...fields];
    updatedFields[index] = { ...updatedFields[index], ...field };
    setFields(updatedFields);
  };

  const handleCreate = async () => {
    if (!rootElement.trim()) {
      alert('Please enter a root element name.');
      return;
    }

    if (fields.length === 0) {
      alert('Please add at least one field.');
      return;
    }

    setIsProcessing(true);
    try {
      const xmlData = await DocumentProcessor.createXML(rootElement, fields, setProgress);
      DocumentProcessor.downloadFile(xmlData, 'generated.xml', 'application/xml');
    } catch (error) {
      console.error('Error creating XML:', error);
      alert('Error creating XML. Please try again.');
    } finally {
      setIsProcessing(false);
      setProgress({ progress: 0, status: '' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Code className="h-8 w-8 text-amber-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">XML Creator</h1>
        <p className="text-gray-600">Create XML documents with custom structure and data</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Root Element Name
          </label>
          <input
            type="text"
            value={rootElement}
            onChange={(e) => setRootElement(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            placeholder="root"
          />
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">XML Fields</h3>
            <button
              onClick={addField}
              className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
            >
              <Plus className="h-4 w-4" />
              Add Field
            </button>
          </div>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={index} className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-3">
                  <input
                    type="text"
                    value={field.key}
                    onChange={(e) => updateField(index, { key: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="Key"
                  />
                </div>
                <div className="col-span-4">
                  <input
                    type="text"
                    value={field.value}
                    onChange={(e) => updateField(index, { value: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="Value"
                  />
                </div>
                <div className="col-span-3">
                  <select
                    value={field.type}
                    onChange={(e) => updateField(index, { type: e.target.value as XMLField['type'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="boolean">Boolean</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <button
                    onClick={() => removeField(index)}
                    className="text-red-500 hover:text-red-700 p-2 transition-colors duration-200"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <ProgressBar progress={progress} isVisible={isProcessing} />

        <div className="text-center">
          <button
            onClick={handleCreate}
            disabled={isProcessing}
            className="bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto transition-colors duration-200"
          >
            <Download className="h-5 w-5" />
            {isProcessing ? 'Creating...' : 'Create XML'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default XMLCreator;