import Image from 'next/image'
import { DocumentData } from 'firebase/firestore'
import { Download } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

export const FileItemShare = ({ file }: { file: DocumentData }) => {
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const checkButtonDownload = (): boolean => {
    if (file.password) {
      if (password.length > 3) {
        return false
      }
      return true
    }
    return false
  }

  const handleDownload = () => {
    setIsLoading(true)

    if (password !== file.password) {
      toast.error('Password is incorrect')
      setIsLoading(false)
      return
    }

    toast.success('Successfully downloaded')

    setTimeout(() => {
      window.open(file.fileUrl)
    }, 1200)

    setIsLoading(false)
  }

  return (
    <div className="flex flex-col items-center rounded-md bg-white p-5">
      <div className="flex flex-col items-center gap-3 text-center">
        <h2 className="text-xl text-gray-600">
          <strong className="text-primary">{file.userName}</strong> shared the file with you
        </h2>

        <h2 className="text-[12px] text-gray-400">Information file details below</h2>

        <Image
          src={'/download-file.gif'}
          alt="download file gif"
          width={150}
          height={150}
          className="p-5"
        />

        <h2 className="text-[15px] text-gray-500">
          {file.fileName} ⚡ {file.fileType} ⚡ {file.fileSize} Bytes
        </h2>
      </div>

      {file.password && file.password.length > 3 && (
        <input
          type="password"
          name="password"
          id="password"
          className="mt-5 rounded-md border p-2 text-center text-sm text-black outline-blue-400"
          placeholder="Enter password to access"
          onChange={(e) => setPassword(e.target.value)}
        />
      )}

      <button
        disabled={checkButtonDownload() || isLoading}
        onClick={handleDownload}
        className="mt-5 flex w-full select-none items-center justify-center gap-2 rounded-full bg-primary p-2 text-center text-sm text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        <Download className="h-4 w-4" />
        Download
      </button>

      <h2 className="mt-2 text-[12px] text-gray-400">*Term and Condition apply</h2>
    </div>
  )
}
