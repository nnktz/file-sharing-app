'use client'

import Link from 'next/link'
import Image from 'next/image'
import { DocumentData, doc, getDoc, getFirestore } from 'firebase/firestore'
import { useEffect, useState } from 'react'

import { app } from '@/config/firebase'

import { FileItemShare } from '@/components/file-item-share'

const FileIdPage = ({ params }: { params: { fileId: string } }) => {
  const [file, setFile] = useState<DocumentData | null>(null)

  const db = getFirestore(app)

  const fetchFileInfo = async () => {
    const docRef = doc(db, 'uploadedFile', params.fileId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      setFile(docSnap.data())
    } else {
      console.log('No doc found')
    }
  }

  useEffect(() => {
    fetchFileInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-gray-100">
      <Link href={'/'}>
        <Image src={'/logo.svg'} alt="logo" width={150} height={100} />
      </Link>

      {file && <FileItemShare file={file} />}
    </div>
  )
}

export default FileIdPage
