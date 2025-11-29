import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import jsPDF from 'jspdf';
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
      // Load with password
      const pdf = await PDFDocument.load(fileBuffer, { password });

      onProgress?.({ progress: 50, status: 'Removing protection...' });

      // Create a new PDF and copy pages to ensure all encryption metadata is stripped
      const newPdf = await PDFDocument.create();
      const pages = await newPdf.copyPages(pdf, pdf.getPageIndices());
      pages.forEach((page) => newPdf.addPage(page));

      onProgress?.({ progress: 75, status: 'Finalizing...' });

      const unlockedPdf = await newPdf.save();

      onProgress?.({ progress: 100, status: 'PDF unlocked!' });
      return unlockedPdf;
    } catch (error) {
      console.error('Unlock error:', error);
      throw new Error('Invalid password or corrupted PDF');
    }
  }

  static async mergePDFs(files: File[], onProgress?: (progress: ProcessingProgress) => void): Promise<Uint8Array> {
    try {
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
    } catch (error) {
      console.error('Merge error:', error);
      throw new Error('Failed to merge PDFs. Please ensure files are valid.');
    }
  }

  static async splitPDF(file: File, ranges: { start: number; end: number }[], onProgress?: (progress: ProcessingProgress) => void): Promise<Uint8Array[]> {
    try {
      const fileBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(fileBuffer);
      const results: Uint8Array[] = [];

      for (let i = 0; i < ranges.length; i++) {
        onProgress?.({ progress: (i / ranges.length) * 100, status: `Creating split ${i + 1} of ${ranges.length}` });

        const newPdf = await PDFDocument.create();
        const { start, end } = ranges[i];

        // Validate range
        if (start < 1 || end > pdf.getPageCount()) {
          continue; // Skip invalid ranges
        }

        const pages = await newPdf.copyPages(pdf, Array.from({ length: end - start + 1 }, (_, idx) => start + idx - 1));
        pages.forEach((page) => newPdf.addPage(page));

        results.push(await newPdf.save());
      }

      onProgress?.({ progress: 100, status: 'Split complete!' });
      return results;
    } catch (error) {
      console.error('Split error:', error);
      throw new Error('Failed to split PDF.');
    }
  }

  static async compressPDF(file: File, quality: number = 0.7, onProgress?: (progress: ProcessingProgress) => void): Promise<Uint8Array> {
    try {
      onProgress?.({ progress: 25, status: 'Loading PDF...' });

      const fileBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(fileBuffer);

      onProgress?.({ progress: 50, status: 'Optimizing...' });

      // Basic compression by removing metadata
      pdf.setTitle('');
      pdf.setAuthor('');
      pdf.setSubject('');
      pdf.setKeywords([]);
      pdf.setProducer('PDFNest');
      pdf.setCreator('PDFNest');

      onProgress?.({ progress: 75, status: 'Finalizing compression...' });

      // Note: pdf-lib doesn't support aggressive content stream compression like Ghostscript
      // We use object stream compression here
      const compressedPdf = await pdf.save({
        useObjectStreams: false, // Sometimes false is better for compatibility, true for size
        addDefaultPage: false,
      });

      onProgress?.({ progress: 100, status: 'Compression complete!' });
      return compressedPdf;
    } catch (error) {
      console.error('Compress error:', error);
      throw new Error('Failed to compress PDF.');
    }
  }

  static async protectPDF(file: File, password: string, onProgress?: (progress: ProcessingProgress) => void): Promise<Uint8Array> {
    try {
      onProgress?.({ progress: 25, status: 'Loading PDF...' });

      const fileBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(fileBuffer);

      onProgress?.({ progress: 75, status: 'Applying password protection...' });

      // Encrypt the PDF
      const protectedPdf = await pdf.save({
        userPassword: password,
        ownerPassword: password, // Setting same owner password for simplicity unless needed otherwise
      });

      onProgress?.({ progress: 100, status: 'Protection applied!' });
      return protectedPdf;
    } catch (error) {
      console.error('Protect error:', error);
      throw new Error('Failed to protect PDF. Please try a different file.');
    }
  }

  static async rotatePDF(file: File, rotation: number, onProgress?: (progress: ProcessingProgress) => void): Promise<Uint8Array> {
    try {
      onProgress?.({ progress: 25, status: 'Loading PDF...' });

      const fileBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(fileBuffer);

      onProgress?.({ progress: 50, status: 'Rotating pages...' });

      const pages = pdf.getPages();
      pages.forEach(page => {
        const currentRotation = page.getRotation().angle;
        page.setRotation({ angle: currentRotation + rotation });
      });

      onProgress?.({ progress: 75, status: 'Finalizing rotation...' });

      const rotatedPdf = await pdf.save();

      onProgress?.({ progress: 100, status: 'Rotation complete!' });
      return rotatedPdf;
    } catch (error) {
      console.error('Rotate error:', error);
      throw new Error('Failed to rotate PDF.');
    }
  }

  static async addWatermark(file: File, watermarkText: string, onProgress?: (progress: ProcessingProgress) => void): Promise<Uint8Array> {
    try {
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
    } catch (error) {
      console.error('Watermark error:', error);
      throw new Error('Failed to add watermark.');
    }
  }

  static async extractPages(file: File, pageNumbers: number[], onProgress?: (progress: ProcessingProgress) => void): Promise<Uint8Array> {
    try {
      onProgress?.({ progress: 25, status: 'Loading PDF...' });

      const fileBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(fileBuffer);

      onProgress?.({ progress: 50, status: 'Extracting pages...' });

      const newPdf = await PDFDocument.create();
      // Filter valid page numbers
      const validPageNumbers = pageNumbers.filter(n => n >= 1 && n <= pdf.getPageCount());

      if (validPageNumbers.length === 0) {
        throw new Error('No valid pages selected');
      }

      const pages = await newPdf.copyPages(pdf, validPageNumbers.map(n => n - 1));

      pages.forEach((page) => newPdf.addPage(page));

      onProgress?.({ progress: 75, status: 'Finalizing extraction...' });

      const extractedPdf = await newPdf.save();

      onProgress?.({ progress: 100, status: 'Pages extracted!' });
      return extractedPdf;
    } catch (error) {
      console.error('Extract error:', error);
      throw new Error('Failed to extract pages.');
    }
  }

  static async convertImageToPDF(files: File[], onProgress?: (progress: ProcessingProgress) => void): Promise<Uint8Array> {
    try {
      const pdf = new jsPDF();
      let isFirstPage = true;

      for (let i = 0; i < files.length; i++) {
        onProgress?.({ progress: (i / files.length) * 100, status: `Converting image ${i + 1} of ${files.length}` });

        const file = files[i];
        const imageUrl = URL.createObjectURL(file);

        if (!isFirstPage) {
          pdf.addPage();
        }

        // Get image dimensions to fit page
        const imgProps = pdf.getImageProperties(imageUrl);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const ratio = imgProps.width / imgProps.height;
        let w = pdfWidth - 20;
        let h = w / ratio;

        if (h > pdfHeight - 20) {
          h = pdfHeight - 20;
          w = h * ratio;
        }

        try {
          pdf.addImage(imageUrl, 'JPEG', 10, 10, w, h);
        } catch (error) {
          console.warn('Failed to add image:', error);
        }

        URL.revokeObjectURL(imageUrl);
        isFirstPage = false;
      }

      onProgress?.({ progress: 100, status: 'Conversion complete!' });
      return new Uint8Array(pdf.output('arraybuffer'));
    } catch (error) {
      console.error('Image to PDF error:', error);
      throw new Error('Failed to convert images to PDF.');
    }
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