'use client'

import toast from 'react-hot-toast'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { useState } from 'react'

import { app } from '@/config/firebase'

import { UploadForm } from '@/components/upload-form'

const UploadPage = () => {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const storage = getStorage(app)

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
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
        setProgress(progress)
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
          console.log('File available at', downloadURL)
        })
        toast.success('Uploaded file successfully')
        setUploading(false)
      },
    )
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
