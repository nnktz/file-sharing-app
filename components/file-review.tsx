import { FileIcon, X } from 'lucide-react'

interface FileReviewProps {
  file: File
  removeFile: () => void
}

export const FileReview = ({ file, removeFile }: FileReviewProps) => {
  return (
    <div className="mt-5 flex items-center justify-between gap-2 rounded-md border border-blue-200 p-2 text-black">
      <div className="flex items-center p-2">
        <FileIcon size={50} className="text-primary" />

        <div className="text-left">
          <h2>{file.name}</h2>
          <h2 className="text-xs text-gray-400">
            {file.type}/{(file.size / 1024 / 1024).toFixed(2)} MB
          </h2>
        </div>
      </div>

      <X className="cursor-pointer text-red-500 transition hover:opacity-75" onClick={removeFile} />
    </div>
  )
}
