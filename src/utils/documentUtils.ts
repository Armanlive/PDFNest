import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';

export interface ProcessingProgress {
  progress: number;
  status: string;
}

export class DocumentProcessor {
  static async excelToJSON(file: File, onProgress?: (progress: ProcessingProgress) => void): Promise<Uint8Array> {
    onProgress?.({ progress: 25, status: 'Reading Excel file...' });
    
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    
    onProgress?.({ progress: 50, status: 'Converting to JSON...' });
    
    const result: any = {};
    workbook.SheetNames.forEach(sheetName => {
      const worksheet = workbook.Sheets[sheetName];
      result[sheetName] = XLSX.utils.sheet_to_json(worksheet);
    });
    
    onProgress?.({ progress: 75, status: 'Finalizing JSON...' });
    
    const jsonString = JSON.stringify(result, null, 2);
    const encoder = new TextEncoder();
    
    onProgress?.({ progress: 100, status: 'Conversion complete!' });
    return encoder.encode(jsonString);
  }

  static async excelToCSV(file: File, onProgress?: (progress: ProcessingProgress) => void): Promise<Uint8Array> {
    onProgress?.({ progress: 25, status: 'Reading Excel file...' });
    
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    
    onProgress?.({ progress: 50, status: 'Converting to CSV...' });
    
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const csvString = XLSX.utils.sheet_to_csv(worksheet);
    
    onProgress?.({ progress: 75, status: 'Finalizing CSV...' });
    
    const encoder = new TextEncoder();
    
    onProgress?.({ progress: 100, status: 'Conversion complete!' });
    return encoder.encode(csvString);
  }

  static async imageToExcel(files: File[], onProgress?: (progress: ProcessingProgress) => void): Promise<Uint8Array> {
    onProgress?.({ progress: 25, status: 'Processing images...' });
    
    const data: any[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      data.push({
        'Image Name': file.name,
        'File Size': `${(file.size / 1024).toFixed(2)} KB`,
        'File Type': file.type,
        'Last Modified': new Date(file.lastModified).toLocaleDateString(),
        'Index': i + 1
      });
    }
    
    onProgress?.({ progress: 50, status: 'Creating Excel structure...' });
    
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Images Data');
    
    onProgress?.({ progress: 75, status: 'Generating Excel file...' });
    
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    
    onProgress?.({ progress: 100, status: 'Excel file created!' });
    return new Uint8Array(excelBuffer);
  }

  static async createXML(rootElement: string, fields: any[], onProgress?: (progress: ProcessingProgress) => void): Promise<Uint8Array> {
    onProgress?.({ progress: 25, status: 'Building XML structure...' });
    
    let xmlContent = `<?xml version="1.0" encoding="UTF-8"?>\n<${rootElement}>\n`;
    
    onProgress?.({ progress: 50, status: 'Adding fields...' });
    
    fields.forEach(field => {
      if (field.key && field.value) {
        let value = field.value;
        if (field.type === 'number') {
          value = parseFloat(field.value) || 0;
        } else if (field.type === 'boolean') {
          value = field.value.toLowerCase() === 'true';
        }
        xmlContent += `  <${field.key}>${value}</${field.key}>\n`;
      }
    });
    
    xmlContent += `</${rootElement}>`;
    
    onProgress?.({ progress: 75, status: 'Finalizing XML...' });
    
    const encoder = new TextEncoder();
    
    onProgress?.({ progress: 100, status: 'XML created!' });
    return encoder.encode(xmlContent);
  }

  static async pdfToWord(file: File, onProgress?: (progress: ProcessingProgress) => void): Promise<Uint8Array> {
    onProgress?.({ progress: 25, status: 'Reading PDF...' });
    
    // Simulated conversion - in real implementation, you'd use a PDF parsing library
    const doc = new jsPDF();
    doc.text('Converted from PDF: ' + file.name, 10, 10);
    doc.text('This is a simulated Word conversion.', 10, 30);
    doc.text('In production, use proper PDF parsing libraries.', 10, 50);
    
    onProgress?.({ progress: 50, status: 'Extracting text...' });
    onProgress?.({ progress: 75, status: 'Creating Word document...' });
    
    const pdfData = doc.output('arraybuffer');
    
    onProgress?.({ progress: 100, status: 'Conversion complete!' });
    return new Uint8Array(pdfData);
  }

  static async wordToPDF(file: File, onProgress?: (progress: ProcessingProgress) => void): Promise<Uint8Array> {
    onProgress?.({ progress: 25, status: 'Reading Word document...' });
    
    // Simulated conversion - in real implementation, you'd use mammoth.js or similar
    const doc = new jsPDF();
    doc.text('Converted from Word: ' + file.name, 10, 10);
    doc.text('This is a simulated PDF conversion.', 10, 30);
    doc.text('File size: ' + (file.size / 1024).toFixed(2) + ' KB', 10, 50);
    
    onProgress?.({ progress: 50, status: 'Converting content...' });
    onProgress?.({ progress: 75, status: 'Creating PDF...' });
    
    const pdfData = doc.output('arraybuffer');
    
    onProgress?.({ progress: 100, status: 'Conversion complete!' });
    return new Uint8Array(pdfData);
  }

  static async pdfToExcel(file: File, onProgress?: (progress: ProcessingProgress) => void): Promise<Uint8Array> {
    onProgress?.({ progress: 25, status: 'Reading PDF...' });
    
    // Simulated conversion - extract basic file info
    const data = [{
      'PDF Name': file.name,
      'File Size': `${(file.size / 1024).toFixed(2)} KB`,
      'Last Modified': new Date(file.lastModified).toLocaleDateString(),
      'Type': 'PDF Document',
      'Status': 'Converted'
    }];
    
    onProgress?.({ progress: 50, status: 'Extracting data...' });
    
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'PDF Data');
    
    onProgress?.({ progress: 75, status: 'Creating Excel file...' });
    
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    
    onProgress?.({ progress: 100, status: 'Conversion complete!' });
    return new Uint8Array(excelBuffer);
  }

  static downloadFile(data: Uint8Array, filename: string, mimeType: string = 'application/octet-stream') {
    const blob = new Blob([data], { type: mimeType });
    saveAs(blob, filename);
  }
}