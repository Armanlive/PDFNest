import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import * as pdfjsLib from 'pdfjs-dist';
import Tesseract from 'tesseract.js';
import * as mammoth from 'mammoth';
import { Document, Packer, Paragraph, TextRun } from 'docx';

// Set worker source for pdfjs-dist
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

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
    onProgress?.({ progress: 10, status: 'Initializing OCR...' });
    
    const data: any[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      onProgress?.({ progress: 10 + ((i / files.length) * 40), status: `Processing image ${i + 1} of ${files.length}...` });
      
      try {
        const result = await Tesseract.recognize(file, 'eng', {
          logger: m => {
             // Map tesseract progress (0-1) to our progress range
             if (m.status === 'recognizing text') {
                 // detailed progress could go here
             }
          }
        });

        const text = result.data.text;
        const lines = text.split('\n').filter(line => line.trim() !== '');
        
        // Add file info
        data.push({
            'Source Image': file.name,
            'Content': '--- Start of Image Content ---'
        });

        // Add extracted lines
        lines.forEach((line, index) => {
            data.push({
                'Source Image': '',
                'Content': line
            });
        });

        data.push({
            'Source Image': '',
            'Content': '--- End of Image Content ---'
        });

      } catch (error) {
        console.error('OCR Error:', error);
        data.push({
            'Source Image': file.name,
            'Content': 'Error extracting text from this image.'
        });
      }
    }
    
    onProgress?.({ progress: 60, status: 'Creating Excel structure...' });
    
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Extracted Data');
    
    onProgress?.({ progress: 80, status: 'Generating Excel file...' });
    
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
    onProgress?.({ progress: 10, status: 'Reading PDF...' });
    
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    const docChildren: Paragraph[] = [];
    
    for (let i = 1; i <= pdf.numPages; i++) {
        onProgress?.({ progress: 10 + ((i / pdf.numPages) * 60), status: `Extracting text from page ${i}...` });
        
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        
        // Simple text extraction - just joining items with spaces
        // A more advanced implementation would try to preserve layout
        const pageText = textContent.items.map((item: any) => item.str).join(' ');
        
        docChildren.push(
            new Paragraph({
                children: [new TextRun(pageText)],
            })
        );
        
        // Add a page break after each page except the last
        if (i < pdf.numPages) {
             docChildren.push(new Paragraph({
                 children: [new TextRun({ break: 1 })] // Simple break, ideally page break
             }));
        }
    }

    onProgress?.({ progress: 80, status: 'Creating Word document...' });

    const doc = new Document({
        sections: [{
            properties: {},
            children: docChildren,
        }],
    });

    onProgress?.({ progress: 90, status: 'Finalizing file...' });
    
    const blob = await Packer.toBlob(doc);
    const buffer = await blob.arrayBuffer();

    onProgress?.({ progress: 100, status: 'Conversion complete!' });
    return new Uint8Array(buffer);
  }

  static async wordToPDF(file: File, onProgress?: (progress: ProcessingProgress) => void): Promise<Uint8Array> {
    onProgress?.({ progress: 20, status: 'Reading Word document...' });
    
    const arrayBuffer = await file.arrayBuffer();
    
    onProgress?.({ progress: 40, status: 'Converting to HTML...' });
    
    const result = await mammoth.convertToHtml({ arrayBuffer: arrayBuffer });
    const html = result.value;
    
    onProgress?.({ progress: 60, status: 'Generating PDF...' });
    
    // Create a temporary container
    const container = document.createElement('div');
    container.innerHTML = html;
    container.style.width = '210mm'; // A4 width
    container.style.padding = '20mm';
    container.style.backgroundColor = 'white';
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    document.body.appendChild(container);

    const pdf = new jsPDF('p', 'mm', 'a4');
    
    try {
        await pdf.html(container, {
            callback: (doc) => {
                // callback
            },
            x: 0,
            y: 0,
            width: 210, // target width in the PDF document
            windowWidth: 800 // window width in CSS pixels
        });
    } catch (e) {
        console.error("PDF Generation Error", e);
    } finally {
        document.body.removeChild(container);
    }

    onProgress?.({ progress: 90, status: 'Finalizing PDF...' });
    
    const pdfData = pdf.output('arraybuffer');
    
    onProgress?.({ progress: 100, status: 'Conversion complete!' });
    return new Uint8Array(pdfData);
  }

  static async pdfToExcel(file: File, onProgress?: (progress: ProcessingProgress) => void): Promise<Uint8Array> {
    onProgress?.({ progress: 10, status: 'Reading PDF...' });
    
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    
    const data: any[] = [];
    
    for (let i = 1; i <= pdf.numPages; i++) {
        onProgress?.({ progress: 10 + ((i / pdf.numPages) * 60), status: `Processing page ${i}...` });
        
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        
        // Try to reconstruct lines
        // This is a heuristic approach
        let lastY = -1;
        let currentLine: string[] = [];
        
        // Sort items by Y (descending) then X (ascending)
        const items = textContent.items.map((item: any) => ({
            str: item.str,
            x: item.transform[4],
            y: item.transform[5]
        })).sort((a, b) => {
            if (Math.abs(a.y - b.y) > 5) return b.y - a.y; // Different lines
            return a.x - b.x; // Same line
        });

        items.forEach((item) => {
            if (lastY !== -1 && Math.abs(item.y - lastY) > 5) {
                // New line
                if (currentLine.length > 0) {
                     // Add to data
                     const rowData: any = { 'Page': i };
                     currentLine.forEach((text, idx) => {
                         rowData[`Column ${idx + 1}`] = text;
                     });
                     data.push(rowData);
                }
                currentLine = [];
            }
            currentLine.push(item.str);
            lastY = item.y;
        });
        
        // Add last line
        if (currentLine.length > 0) {
             const rowData: any = { 'Page': i };
             currentLine.forEach((text, idx) => {
                 rowData[`Column ${idx + 1}`] = text;
             });
             data.push(rowData);
        }
    }
    
    onProgress?.({ progress: 80, status: 'Creating Excel structure...' });
    
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'PDF Data');
    
    onProgress?.({ progress: 90, status: 'Generating Excel file...' });
    
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    
    onProgress?.({ progress: 100, status: 'Conversion complete!' });
    return new Uint8Array(excelBuffer);
  }

  static downloadFile(data: Uint8Array, filename: string, mimeType: string = 'application/octet-stream') {
    const blob = new Blob([data], { type: mimeType });
    saveAs(blob, filename);
  }
}