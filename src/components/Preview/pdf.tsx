import React, { useRef, useEffect, useState } from 'react';
import { Modal } from 'antd';
import { Document, Page, pdfjs } from 'react-pdf';
import { PDFDocumentProxy } from 'pdfjs-dist';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
type Props = {
  visible: boolean;
  url: string;
  onCancel?: () => void;
};
export default function(props: Props) {
  const { visible, url, onCancel } = props;
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  useEffect(() => {}, [visible]);
  function onDocumentLoadSuccess(pdf: PDFDocumentProxy) {
    setNumPages(pdf.numPages);
  }
  return (
    <Modal
      onCancel={onCancel}
      wrapClassName="prev-modal"
      visible={visible}
      footer={null}
    >
      <div>
        <Document
          file={{
            url,
            withCredentials: true,
          }}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div>
    </Modal>
  );
}
