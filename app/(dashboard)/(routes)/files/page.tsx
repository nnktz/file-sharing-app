'use client'

import Link from 'next/link'
import { DocumentData, collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'

import { app } from '@/config/firebase'

const FilesPage = () => {
  const { user } = useUser()

  const [files, setFiles] = useState<DocumentData[] | null>(null)

  const db = getFirestore(app)

  useEffect(() => {
    if (!user || !user.emailAddresses || !user.emailAddresses[0]) {
      return
    }

    const userEmail = user.emailAddresses[0].emailAddress

    const fetchFiles = async () => {
      try {
        const collectionRef = collection(db, 'uploadedFile')
        const querySnapshot = await getDocs(
          query(collectionRef, where('userEmail', '==', userEmail)),
        )

        const filesData = querySnapshot.docs.map((doc) => doc.data())
        setFiles(filesData)

        console.log(filesData)
      } catch (error) {
        console.error('Error fetching files:', error)
      }
    }

    fetchFiles()
  }, [user])

  const bytesToMB = (bytes: number) => {
    if (bytes === 0) return '0 MB'
    const megabytes = bytes / (1024 * 1024)
    return megabytes.toFixed(2) + ' MB'
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-gray-800">My files</h1>

      <div className="mt-5 flex rounded-md border p-3">
        <h2 className="font-semibold text-gray-600">Total Files: {files ? files.length : '0'}</h2>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr className="text-left">
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">File Name</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Type</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Size</th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Options</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {files &&
              files.map((file) => (
                <tr key={file.id} className="odd:bg-gray-50">
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">{file.fileName}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">{file.fileType}</td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {bytesToMB(file.fileSize)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    <Link
                      href={`/file-review/${file.id}`}
                      className="inline-block rounded bg-primary px-4 py-2 text-xs font-medium text-white hover:bg-blue-600"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {!files && <div className="flex h-full justify-center p-56 text-black">No files</div>}
      </div>
    </div>
  )
}

export default FilesPage
