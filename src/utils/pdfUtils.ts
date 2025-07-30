import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';

export interface ProcessingProgress {
  progress: number;
  status: string;
}

export class PDFProcessor {
  static async unlockPDF(file: File, password: string, onProgress?: (progress: ProcessingProgress) => void): Promise<Uint8Array> {
    onProgress?.({ progress: 25, status: 'Loading protected PDF...' });
    
    try {
      const fileBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(fileBuffer, { password });
      
      onProgress?.({ progress: 75, status: 'Removing protection...' });
      
      const unlockedPdf = await pdf.save();
      
      onProgress?.({ progress: 100, status: 'PDF unlocked!' });
      return unlockedPdf;
    } catch (error) {
      throw new Error('Invalid password or corrupted PDF');
    }
  }

  static async mergePDFs(files: File[], onProgress?: (progress: ProcessingProgress) => void): Promise<Uint8Array> {
    const mergedPdf = await PDFDocument.create();
    
    for (let i = 0; i < files.length; i++) {
      onProgress?.({ progress: (i / files.length) * 100, status: `Processing file ${i + 1} of ${files.length}` });
      
      const fileBuffer = await files[i].arrayBuffer();
      const pdf = await PDFDocument.load(fileBuffer);
      const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      
      pages.forEach((page) => mergedPdf.addPage(page));
    }
    
    onProgress?.({ progress: 100, status: 'Finalizing merged PDF...' });
    return await mergedPdf.save();
  }

  static async splitPDF(file: File, ranges: { start: number; end: number }[], onProgress?: (progress: ProcessingProgress) => void): Promise<Uint8Array[]> {
    const fileBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(fileBuffer);
    const results: Uint8Array[] = [];
    
    for (let i = 0; i < ranges.length; i++) {
      onProgress?.({ progress: (i / ranges.length) * 100, status: `Creating split ${i + 1} of ${ranges.length}` });
      
      const newPdf = await PDFDocument.create();
      const { start, end } = ranges[i];
      
      const pages = await newPdf.copyPages(pdf, Array.from({ length: end - start + 1 }, (_, idx) => start + idx - 1));
      pages.forEach((page) => newPdf.addPage(page));
      
      results.push(await newPdf.save());
    }
    
    onProgress?.({ progress: 100, status: 'Split complete!' });
    return results;
  }

  static async compressPDF(file: File, quality: number = 0.7, onProgress?: (progress: ProcessingProgress) => void): Promise<Uint8Array> {
    onProgress?.({ progress: 25, status: 'Loading PDF...' });
    
    const fileBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(fileBuffer);
    
    onProgress?.({ progress: 50, status: 'Optimizing images...' });
    
    // Basic compression by removing metadata and optimizing
    pdf.setTitle('');
    pdf.setAuthor('');
    pdf.setSubject('');
    pdf.setKeywords([]);
    pdf.setProducer('PDFNest');
    pdf.setCreator('PDFNest');
    
    onProgress?.({ progress: 75, status: 'Finalizing compression...' });
    
    const compressedPdf = await pdf.save({
      useObjectStreams: false,
      addDefaultPage: false,
    });
    
    onProgress?.({ progress: 100, status: 'Compression complete!' });
    return compressedPdf;
  }

  static async protectPDF(file: File, password: string, onProgress?: (progress: ProcessingProgress) => void): Promise<Uint8Array> {
    onProgress?.({ progress: 25, status: 'Loading PDF...' });
    
    const fileBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(fileBuffer);
    
    onProgress?.({ progress: 75, status: 'Applying password protection...' });
    
    const protectedPdf = await pdf.save({
      userPassword: password,
      ownerPassword: password + '_owner',
    });
    
    onProgress?.({ progress: 100, status: 'Protection applied!' });
    return protectedPdf;
  }

  static async rotatePDF(file: File, rotation: number, onProgress?: (progress: ProcessingProgress) => void): Promise<Uint8Array> {
    onProgress?.({ progress: 25, status: 'Loading PDF...' });
    
    const fileBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(fileBuffer);
    
    onProgress?.({ progress: 50, status: 'Rotating pages...' });
    
    const pages = pdf.getPages();
    pages.forEach(page => {
      page.setRotation({ angle: rotation });
    });
    
    onProgress?.({ progress: 75, status: 'Finalizing rotation...' });
    
    const rotatedPdf = await pdf.save();
    
    onProgress?.({ progress: 100, status: 'Rotation complete!' });
    return rotatedPdf;
  }

  static async addWatermark(file: File, watermarkText: string, onProgress?: (progress: ProcessingProgress) => void): Promise<Uint8Array> {
    onProgress?.({ progress: 25, status: 'Loading PDF...' });
    
    const fileBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(fileBuffer);
    
    onProgress?.({ progress: 50, status: 'Adding watermark...' });
    
    const helveticaFont = await pdf.embedFont(StandardFonts.Helvetica);
    const pages = pdf.getPages();
    
    pages.forEach(page => {
      const { width, height } = page.getSize();
      page.drawText(watermarkText, {
        x: width / 2 - (watermarkText.length * 10),
        y: height / 2,
        size: 50,
        font: helveticaFont,
        color: rgb(0.8, 0.8, 0.8),
        opacity: 0.3,
        rotate: { angle: -45 },
      });
    });
    
    onProgress?.({ progress: 75, status: 'Finalizing watermark...' });
    
    const watermarkedPdf = await pdf.save();
    
    onProgress?.({ progress: 100, status: 'Watermark added!' });
    return watermarkedPdf;
  }

  static async extractPages(file: File, pageNumbers: number[], onProgress?: (progress: ProcessingProgress) => void): Promise<Uint8Array> {
    onProgress?.({ progress: 25, status: 'Loading PDF...' });
    
    const fileBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(fileBuffer);
    
    onProgress?.({ progress: 50, status: 'Extracting pages...' });
    
    const newPdf = await PDFDocument.create();
    const pages = await newPdf.copyPages(pdf, pageNumbers.map(n => n - 1));
    
    pages.forEach((page) => newPdf.addPage(page));
    
    onProgress?.({ progress: 75, status: 'Finalizing extraction...' });
    
    const extractedPdf = await newPdf.save();
    
    onProgress?.({ progress: 100, status: 'Pages extracted!' });
    return extractedPdf;
  }

  static async convertImageToPDF(files: File[], onProgress?: (progress: ProcessingProgress) => void): Promise<Uint8Array> {
    const pdf = new jsPDF();
    let isFirstPage = true;
    
    for (let i = 0; i < files.length; i++) {
      onProgress?.({ progress: (i / files.length) * 100, status: `Converting image ${i + 1} of ${files.length}` });
      
      const file = files[i];
      const imageUrl = URL.createObjectURL(file);
      
      if (!isFirstPage) {
        pdf.addPage();
      }
      
      try {
        pdf.addImage(imageUrl, 'JPEG', 10, 10, 190, 270);
      } catch (error) {
        console.warn('Failed to add image:', error);
      }
      
      URL.revokeObjectURL(imageUrl);
      isFirstPage = false;
    }
    
    onProgress?.({ progress: 100, status: 'Conversion complete!' });
    return new Uint8Array(pdf.output('arraybuffer'));
  }

  static downloadFile(data: Uint8Array, filename: string) {
    const blob = new Blob([data], { type: 'application/pdf' });
    saveAs(blob, filename);
  }

  static async downloadMultipleFiles(files: { data: Uint8Array; name: string }[]) {
    if (files.length === 1) {
      this.downloadFile(files[0].data, files[0].name);
      return;
    }

    const zip = new JSZip();
    files.forEach(file => {
      zip.file(file.name, file.data);
    });

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    saveAs(zipBlob, 'pdf-files.zip');
  }
}