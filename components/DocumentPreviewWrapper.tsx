'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const DocumentPreview = dynamic(() => import('./DocumentPreview'), {
  ssr: false,
  loading: () => <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>Loading preview...</div>
});

interface DocumentPreviewWrapperProps {
  fileUrl: string;
  mimeType: string | null;
  fileName: string;
}

export default function DocumentPreviewWrapper(props: DocumentPreviewWrapperProps) {
  return <DocumentPreview {...props} />;
}
