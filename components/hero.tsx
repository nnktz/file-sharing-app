import CONSTANTS from '@/utils/constants'

export const Hero = () => {
  return (
    <section className="flex h-full items-center">
      <div className="mx-auto mb-32 max-w-screen-xl px-4 py-32 text-black lg:flex">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            <span className="text-primary">Upload, Save</span> and easily{' '}
            <span className="text-primary">Share</span> your files in one place
          </h1>

          <p className="mt-4 text-gray-500 sm:text-xl/relaxed">{CONSTANTS.desc}</p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="bg-primary block w-full rounded px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
              href="/"
            >
              Get Started
            </a>

            <a
              className="text-primary block w-full rounded px-12 py-3 text-sm font-medium shadow hover:text-blue-700 focus:outline-none focus:ring active:text-red-500 sm:w-auto"
              href="/"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
