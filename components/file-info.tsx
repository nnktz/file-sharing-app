'use client'

import { FileIcon } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export const FileInfo = ({ file }: { file: any }) => {
  const [fileType, setFileType] = useState('')

  useEffect(() => {
    setFileType(file.fileType.split('/')[0])
  }, [file])

  return (
    <div className="m-4 flex flex-col items-center justify-center rounded border border-blue-200 p-2 text-center">
      {fileType === 'image' ? (
        <Image
          src={file.fileUrl}
          alt="file image"
          width={200}
          height={200}
          className="rounded-md object-contain"
        />
      ) : (
        <FileIcon size={200} className="text-primary" />
      )}

      <h2 className="mt-4 w-full overflow-hidden text-ellipsis text-black">{file.fileName}</h2>
      <h2 className="tex-[13px] text-gray-400">
        {fileType}/{file.fileSize}
      </h2>
    </div>
  )
}
