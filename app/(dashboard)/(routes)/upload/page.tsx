'use client'

import toast from 'react-hot-toast'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

import { app } from '@/config/firebase'
import { generateRandomString } from '@/utils/generate-random-string'

import { UploadForm } from '@/components/upload-form'

const UploadPage = () => {
  const { user } = useUser()
  const router = useRouter()

  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [fileDocId, setFileDocId] = useState('')

  const storage = getStorage(app)
  const db = getFirestore(app)

  if (user === undefined || user === null) {
    return null
  }

  const uploadFile = (file: File) => {
    setUploading(true)

    const metadata = {
      contentType: file.type,
    }

    const storageRef = ref(storage, 'upload-files/' + file.name)
    const uploadTask = uploadBytesResumable(storageRef, file, metadata)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progressTask = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progressTask + '% done')
        setProgress(progressTask)
      },
      (error) => {
        // Handle unsuccessful uploads
        toast.error('Something went wrong')
        setUploading(false)
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          onSave(file, downloadURL)
          console.log('File available at', downloadURL)
          setTimeout(() => {
            router.push(`/file-review/${fileDocId}`)
          }, 1000)
        })
        toast.success('Uploaded file successfully')
        setUploading(false)
      },
    )
  }

  const onSave = async (file: File, fileUrl: string) => {
    const docId = generateRandomString().toString()

    await setDoc(doc(db, 'uploadedFile', docId), {
      filename: file.name,
      fileSize: file.size,
      fileType: file.type,
      fileUrl: fileUrl,
      userEmail: user.primaryEmailAddress?.emailAddress,
      userName: user.fullName,
      password: '',
      id: docId,
      shortUrl: `${process.env.NEXT_PUBLIC_SERVER_URL}/${docId}`,
    })

    setFileDocId(docId)
  }

  return (
    <div className="px-8 py-5 md:px-28">
      <h2 className="m-5 text-center text-xl tracking-wide text-black">
        Start <strong className="text-primary">Uploading</strong> File and{' '}
        <strong className="text-primary">Share</strong> it
      </h2>

      <UploadForm uploadFile={uploadFile} uploading={uploading} progress={progress} />
    </div>
  )
}

export default UploadPage
