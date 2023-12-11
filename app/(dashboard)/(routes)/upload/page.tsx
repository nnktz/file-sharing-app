import { UploadForm } from '@/components/upload-form'

const UploadPage = () => {
  return (
    <div className="px-8 py-5 md:px-28">
      <h2 className="m-5 text-center text-xl tracking-wide text-black">
        Start <strong className="text-primary">Uploading</strong> File and{' '}
        <strong className="text-primary">Share</strong> it
      </h2>

      <UploadForm />
    </div>
  )
}

export default UploadPage
