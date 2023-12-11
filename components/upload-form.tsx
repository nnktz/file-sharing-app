'use client'

import toast from 'react-hot-toast'
import { ChangeEvent, useState } from 'react'

import { FileReview } from './file-review'

interface UploadFormProps {
  uploading: boolean
  uploadFile: (file: File) => void
}

export const UploadForm = ({ uploadFile, uploading }: UploadFormProps) => {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files

    if (selectedFiles && selectedFiles.length > 0) {
      const selectedFile = selectedFiles[0]

      if (selectedFile.size > 2000000) {
        return toast.error('Size is greater than 2 MB')
      }

      setFile(selectedFile)
    }
  }

  const handleUpload = () => {
    if (file) {
      uploadFile(file)
    }
  }

  return (
    <div className="text-center">
      <div className="flex w-full items-center justify-center">
        <label
          htmlFor="dropzone-file"
          className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-blue-300 bg-blue-50 hover:bg-blue-100"
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <svg
              className="mb-4 h-12 w-12 text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-lg text-gray-500 md:text-2xl">
              <span className="font-semibold">Click to upload</span> or{' '}
              <strong className="text-primary">drag</strong> and{' '}
              <strong className="text-primary">drop</strong>
            </p>
            <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (Max Size: 2MB)</p>
          </div>
          <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
        </label>
      </div>

      {file && <FileReview file={file} removeFile={() => setFile(null)} />}

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className={`mt-5 w-[30%] rounded-full bg-primary p-2 text-white transition hover:opacity-75 disabled:cursor-not-allowed ${
          !file && 'disabled:bg-gray-400'
        }`}
      >
        Upload
      </button>
    </div>
  )
}
