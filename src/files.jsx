import React, { useState, useCallback } from 'react';
import axios from 'axios';

// Define the API endpoint where the file should be sent
const UPLOAD_URL = 'YOUR_API_ENDPOINT_HERE'; 

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(''); // 'idle', 'uploading', 'success', 'error'

  // --- Drag and Drop Handlers ---

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    // Ensure the cursor indicates a drop is allowed
    e.dataTransfer.dropEffect = 'copy';
    setIsDragging(true);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      // Only accept the first file since it's a single-file upload component
      setFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  }, []);

  // --- File Selection Handler (for traditional click) ---

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  // --- Axios Upload Function ---

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    setUploadStatus('uploading');
    
    // Create FormData object to send the file and any other necessary data
    const formData = new FormData();
    // 'file' is the key expected by the server
    formData.append('file', file); 
    
    // Example of appending other data:
    // formData.append('userId', '12345'); 

    try {
      const response = await axios.post(UPLOAD_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Essential for file uploads
          // Add any required authorization tokens here
          // 'Authorization': `Bearer ${token}`, 
        },
        onUploadProgress: (progressEvent) => {
          // Optional: Display upload progress
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(`Upload Progress: ${percentCompleted}%`);
        }
      });

      console.log('Upload successful:', response.data);
      setUploadStatus('success');
      // setFile(null); // Clear file after successful upload if desired

    } catch (error) {
      console.error('Upload failed:', error.response ? error.response.data : error.message);
      setUploadStatus('error');
    }
  };

  // --- Component Render ---

  // Determine border style based on dragging state
  const dropzoneClass = `
    flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg cursor-pointer
    transition-all duration-300 ease-in-out
    ${isDragging 
      ? 'border-blue-500 bg-blue-50 shadow-lg' 
      : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
    }
  `;

  // Determine upload button style based on status
  const buttonClass = `
    w-full py-3 mt-4 text-white font-semibold rounded-lg transition-colors duration-300
    ${file && uploadStatus !== 'uploading' 
      ? 'bg-green-700 hover:bg-blue-700' 
      : 'bg-gray-400 cursor-not-allowed'
    }
  `;

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Upload monthly bill</h2>

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
            <span className="font-bold text-blue-600">Drop the file here</span>
          ) : (
            <>
              <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
            </>
          )}
        </p>
        <p className="text-xs text-gray-500 mt-1">Maximum 1 file supported</p>

        {/* Hidden File Input */}
        <input 
          type="file" 
          id="file-input" 
          className="hidden" 
          onChange={handleFileChange} 
          // Adding 'accept' or 'multiple' constraints is handled here
          // multiple={false} is the default for input type="file"
        />
      </div>

      {/* File Preview and Status */}
      {file && (
        <div className="mt-4 p-3 border border-gray-200 rounded-lg flex justify-between items-center bg-gray-50">
          <p className="text-sm text-gray-700 truncate">
            Selected: <span className="font-medium">{file.name}</span>
          </p>
          <button 
            onClick={() => setFile(null)} 
            className="text-red-500 hover:text-red-700 text-sm font-medium ml-4 transition-colors"
            aria-label="Remove file"
          >
            Remove
          </button>
        </div>
      )}

      {/* Upload Button */}
      <button 
        onClick={handleUpload}
        className={buttonClass}
        disabled={!file || uploadStatus === 'uploading'}
      >
        {uploadStatus === 'uploading' 
          ? 'Uploading...' 
          : uploadStatus === 'success' 
          ? 'Upload Complete! 🎉' 
          : uploadStatus === 'error' 
          ? 'Upload Failed 🙁' 
          : 'Start Upload'
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