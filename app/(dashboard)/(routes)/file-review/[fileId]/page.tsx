'use client'

import Link from 'next/link'
import { DocumentData, doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore'
import { notFound } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ArrowLeftSquare } from 'lucide-react'

import { app } from '@/config/firebase'

import { FileInfo } from '@/components/file-info'
import { FileShareForm } from '@/components/file-share-form'
import toast from 'react-hot-toast'

const FileReviewIdPage = ({ params }: { params: { fileId: string } }) => {
  const [file, setFile] = useState<DocumentData | null>(null)

  const db = getFirestore(app)

  useEffect(() => {
    fetchFileInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!params) {
    return notFound()
  }

  const fetchFileInfo = async () => {
    const docRef = doc(db, 'uploadedFile', params.fileId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      setFile(docSnap.data())
    } else {
      console.log('No doc found')
    }
  }

  const onPasswordSave = async (password: string) => {
    const docRef = doc(db, 'uploadedFile', params.fileId)
    await updateDoc(docRef, { password: password })
      .then((response) => {
        toast.success('Password saved successfully')
      })
      .catch((error) => {
        toast.error('Something went wrong')
      })
  }

  return (
    <div className="px-20 py-10">
      <Link href={'/upload'} className="flex select-none gap-3 text-black hover:text-gray-600">
        <ArrowLeftSquare />
        Go back Upload
      </Link>

      {file && (
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2">
          <FileInfo file={file} />
          <FileShareForm
            file={file}
            onPasswordSave={(password: string) => onPasswordSave(password)}
          />
        </div>
      )}
    </div>
  )
}

export default FileReviewIdPage
