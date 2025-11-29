import React, { useState, useCallback } from 'react';
import axios from 'axios';

// Define the API endpoint where the files should be sent
const UPLOAD_URL = 'http://localhost:8000/pdf/upload';

const FileUpload = () => {
  const [files, setFiles] = useState([]); // Changed to an array
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(''); // 'idle', 'uploading', 'success', 'error'

  // Helper function to process new files (filters PDFs and checks for duplicates)
  const processNewFiles = (newFileArray) => {
    if (!newFileArray || newFileArray.length === 0) return;

    // 1. Filter for only PDF files
    const acceptedFiles = Array.from(newFileArray).filter(f => f.type === 'application/pdf');
    const rejectedCount = newFileArray.length - acceptedFiles.length;

    if (rejectedCount > 0) {
        alert(`Only PDF files are supported. ${rejectedCount} file(s) were ignored.`);
    }

    setFiles(prevFiles => {
      // 2. Filter out duplicates based on name and size
      const uniqueNewFiles = acceptedFiles.filter(newFile => 
        !prevFiles.some(existingFile => 
          existingFile.name === newFile.name && existingFile.size === newFile.size
        )
      );
      // 3. Append unique, valid files to the existing list
      return [...prevFiles, ...uniqueNewFiles];
    });
  };

  // --- Drag and Drop Handlers ---
  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
    setIsDragging(true);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processNewFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  }, [processNewFiles]);

  // --- File Selection Handler (for traditional click) ---
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processNewFiles(e.target.files);
    }
  };
  
  // --- Remove File Handler ---
  const handleRemoveFile = (fileName) => {
    setFiles(prevFiles => prevFiles.filter(f => f.name !== fileName));
  };

  // --- Axios Upload Function ---
  const handleUpload = async () => {
    if (files.length === 0) {
      alert("Please select at least one file first.");
      return;
    }

    setUploadStatus('uploading');
    
    const formData = new FormData();
    
    // Append every selected file to the FormData object
    files.forEach((file) => {
      formData.append('pdf_files', file); // Use the key expected by FastAPI
    });

    try {
      const response = await axios.post(UPLOAD_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });

      console.log('Upload successful:', response.data);
      setUploadStatus('success');
      setFiles([]); // Clear files after successful upload

    } catch (error) {
      console.error('Upload failed:', error.response ? error.response.data : error.message);
      setUploadStatus('error');
    }
  };

  // --- Component Render Styling ---
  const dropzoneClass = `
    flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg cursor-pointer
    transition-all duration-300 ease-in-out
    ${isDragging 
      ? 'border-green-500 bg-green-50 shadow-lg' 
      : 'border-gray-300 hover:border-green-400 hover:bg-gray-50'
    }
  `;

  const buttonClass = `
    w-full py-3 mt-4 text-white font-semibold rounded-lg transition-colors duration-300
    ${files.length > 0 && uploadStatus !== 'uploading' 
      ? 'bg-green-600 hover:bg-green-700' 
      : 'bg-gray-400 cursor-not-allowed'
    }
  `;

  return (
    <div className="w-full p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Upload Supporting Data (PDF Only)</h2>

      {/* Dropzone Area */}
      <div 
        className={dropzoneClass}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-input').click()}
      >
        <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 014 4.903M12 15l2-2m-2 2l-2-2m2 2V3"></path></svg>
        <p className="text-center text-sm text-gray-600">
          {isDragging ? (
            <span className="font-bold text-green-600">Drop your PDFs here</span>
          ) : (
            <>
              <span className="font-semibold text-green-600">Click to select</span> or drag and drop multiple files
            </>
          )}
        </p>
        <p className="text-xs text-gray-500 mt-1 font-bold">Format: PDF files only (.pdf)</p>

        {/* Hidden File Input */}
        <input 
          type="file" 
          id="file-input" 
          className="hidden" 
          onChange={handleFileChange} 
          multiple // Allows multiple file selection
          accept="application/pdf" // Restricts native browser dialog to PDFs
        />
      </div>

      {/* File List Preview */}
      {files.length > 0 && (
        <div className="mt-4 space-y-2 max-h-40 overflow-y-auto border border-gray-200 p-3 rounded-lg">
          <p className="text-sm font-semibold text-gray-700">Selected Files ({files.length}):</p>
          {files.map((file, index) => (
            <div key={index} className="flex justify-between items-center bg-green-50 p-2 rounded-md">
              <p className="text-sm text-gray-800 truncate">
                <span className="font-medium">{file.name}</span>
              </p>
              <button 
                onClick={() => handleRemoveFile(file.name)} 
                className="text-red-500 hover:text-red-700 text-xs font-medium ml-4 transition-colors"
                aria-label={`Remove ${file.name}`}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload Button */}
      <button 
        onClick={handleUpload}
        className={buttonClass}
        disabled={files.length === 0 || uploadStatus === 'uploading'}
      >
        {uploadStatus === 'uploading' 
          ? 'Uploading...' 
          : uploadStatus === 'success' 
          ? 'Upload Complete! 🎉' 
          : uploadStatus === 'error' 
          ? 'Upload Failed 🙁' 
          : `Upload ${files.length} File(s)`
        }
      </button>

      {/* Error Message */}
      {uploadStatus === 'error' && (
        <p className="mt-2 text-sm text-red-600 text-center">
          An error occurred during upload. Check console for details.
        </p>
      )}
    </div>
  );
};

export default FileUpload;