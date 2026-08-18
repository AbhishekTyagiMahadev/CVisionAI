import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { formatSize } from '~/lib/utils';
import ScanCorners from './ScanCorners';

const FileUploader = ({ onFileSelect }) => {
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0] || null;
    onFileSelect?.(file);
  }, [onFileSelect]);

  const maxFileSize = 20 * 1024 * 1024; // 20MB in bytes

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    multiple: false,
    accept: { 'application/pdf': ['.pdf'] },
    maxSize: maxFileSize,
  });

  const file = acceptedFiles[0] || null;

  return (
    <div className={`scan-frame w-full panel rounded-[16px] transition-all duration-300 ${isDragActive ? 'border-signal scale-[1.01]' : ''}`}>
      <ScanCorners />
      {isDragActive && <span className="scan-line" />}

      <div {...getRootProps()} className="p-8">
        <input {...getInputProps()} />
        <div className='space-y-5 cursor-pointer'>
          {file ? (
            <div className="uploader-selected-file" onClick={(e) => e.stopPropagation()}>
              <div className='flex items-center space-x-3'>
                <div className="w-10 h-10 rounded-[8px] bg-ink flex items-center justify-center border border-line">
                  <img src="/images/pdf.png" alt="pdf" className="size-5" />
                </div>
                <div>
                  <p className='text-sm font-medium text-text truncate max-w-xs'>{file.name}</p>
                  <p className='readout text-xs text-muted'>{formatSize(file.size)}</p>
                </div>
              </div>
              <button
                className="p-2 cursor-pointer rounded-[6px] hover:bg-panel-2 transition-colors"
                onClick={(e) => { onFileSelect?.(null); }}
              >
                <img src="/icons/cross.svg" alt="remove" className="w-4 h-4 opacity-70" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center gap-3 py-4">
              <div className="eyebrow">Scan Bed // Ready</div>
              <div className='w-14 h-14 flex items-center justify-center rounded-full border border-line bg-panel-2'>
                <img src="/icons/info.svg" alt="upload" className='size-6 opacity-80' />
              </div>
              <p className='text-base text-text'>
                <span className='font-semibold'>Click to upload</span>
                <span className='text-muted'> or drag and drop</span>
              </p>
              <p className='readout text-xs text-muted-2'>PDF · MAX {formatSize(maxFileSize)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
