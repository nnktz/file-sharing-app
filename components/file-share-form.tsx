'use client'

import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { Copy, CopyCheck } from 'lucide-react'
import type { UserResource } from '@clerk/types'
import { DocumentData } from 'firebase/firestore'

import { sendEmail } from '@/utils/global-api'

interface FileShareFormProps {
  file: DocumentData
  user: UserResource
  onPasswordSave: (password: string) => void
}

export const FileShareForm = ({ file, onPasswordSave, user }: FileShareFormProps) => {
  const [isPasswordEnable, setIsPasswordEnable] = useState(file.password ? true : false)
  const [password, setPassword] = useState(file.password ? file.password : '')
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [saving, setSaving] = useState(false)
  const [copying, setCopying] = useState(false)

  const handleSendEmail = async () => {
    const data = {
      emailToSend: email,
      userName: user.fullName,
      fileName: file.fileName,
      fileSize: file.fileSize,
      fileType: file.fileType,
      shortUrl: file.shortUrl,
    }

    setSending(true)

    await sendEmail(data)
      .then((response) => {
        console.log(response)
        toast.success('Sent email successfully')
      })
      .catch((error) => {
        toast.error('Something went wrong')
      })
      .finally(() => {
        setSending(false)
      })
  }

  useEffect(() => {
    if (copying === true) {
      setTimeout(() => {
        setCopying(false)
      }, 2000)
    }
  }, [copying])

  const onCopy = () => {
    setCopying(true)
    navigator.clipboard.writeText(file.shortUrl)
    toast.success('Copied short url successfully')
  }

  return (
    <div className="flex flex-col gap-2">
      <div>
        <label htmlFor="" className="text-sm text-gray-500">
          Short Url
        </label>
        <div className="flex justify-center gap-5 rounded-md border p-2">
          <input
            type="text"
            value={file.shortUrl}
            disabled
            readOnly
            className="w-full bg-transparent outline-none disabled:text-gray-500"
          />

          {!copying ? (
            <Copy className="cursor-pointer text-gray-400 hover:text-gray-600" onClick={onCopy} />
          ) : (
            <CopyCheck className="text-primary" />
          )}
        </div>
      </div>

      <div className="mt-5 flex gap-3 text-black">
        <input
          type="checkbox"
          checked={isPasswordEnable}
          onChange={() => setIsPasswordEnable(!isPasswordEnable)}
        />
        <label htmlFor="">Enable Password?</label>
      </div>

      {isPasswordEnable && (
        <div className="mb-5 flex items-center gap-3">
          <div className="w-full rounded-md border p-2">
            <input
              type="password"
              value={password}
              className="w-full bg-transparent text-black outline-none disabled:text-gray-500"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>

          <button
            className="rounded-md bg-primary p-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300"
            disabled={password.length < 3 || saving}
            onClick={() => {
              setSaving(true)
              onPasswordSave(password)
              setSaving(false)
            }}
          >
            Save
          </button>
        </div>
      )}

      <div className="flex items-center">
        <div className="w-full rounded-md border p-2">
          <form action={handleSendEmail}>
            <label htmlFor="" className="text-sm text-gray-500">
              Send File to Email
            </label>

            <div className="my-2 w-full rounded-md border p-2">
              <input
                type="email"
                className="w-full bg-transparent text-black outline-none disabled:text-gray-500"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-primary p-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300"
              disabled={sending || email === ''}
            >
              Send Email
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
