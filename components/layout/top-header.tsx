import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { AlignJustify } from 'lucide-react'

export const TopHeader = () => {
  return (
    <div className="flex items-center justify-between border-b p-5 md:justify-end">
      <AlignJustify className="cursor-pointer text-black transition hover:text-gray-600 md:hidden" />
      <Image src={'/logo.svg'} alt="logo" width={150} height={100} className="md:hidden" />
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}
