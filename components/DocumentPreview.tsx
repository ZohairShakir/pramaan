'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import styles from './DocumentPreview.module.css';

// Import CSS for react-pdf
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Setting the worker source explicitly
// We use a relative path from the root as it's served from public/
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';
}

interface DocumentPreviewProps {
  fileUrl: string;
  mimeType: string | null;
  fileName: string;
}

export default function DocumentPreview({ fileUrl, mimeType, fileName }: DocumentPreviewProps) {
  const [numPages, setNumPages] = useState<number | null>(null);

  const isPdf = mimeType === 'application/pdf' || fileName.toLowerCase().endsWith('.pdf');

  // Memoize options to prevent re-renders
  const options = useMemo(() => ({
    cMapUrl: 'https://unpkg.com/pdfjs-dist@4.8.69/cmaps/',
    cMapPacked: true,
    standardFontDataUrl: 'https://unpkg.com/pdfjs-dist@4.8.69/standard_fonts/',
  }), []);

  if (!isPdf) {
    return (
      <div className={styles.fileIcon}>
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
      </div>
    );
  }

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div className={styles.pdfPreview}>
      <Document 
        file={fileUrl} 
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<div className={styles.loading}>Loading preview...</div>}
        error={<div className={styles.error}>Failed to load PDF preview.</div>}
        options={options}
      >
        <Page 
          pageNumber={1} 
          width={300} 
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
    </div>
  );
}
