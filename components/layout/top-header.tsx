import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { AlignJustify } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

interface TopHeaderProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const TopHeader = ({ open, setOpen }: TopHeaderProps) => {
  return (
    <div className="flex items-center justify-between border-b p-5 md:justify-end">
      <AlignJustify
        className="cursor-pointer text-black transition hover:text-gray-600 md:hidden"
        onClick={() => setOpen(!open)}
      />
      <Image src={'/logo.svg'} alt="logo" width={150} height={100} className="md:hidden" />
      <UserButton afterSignOutUrl="/" />
    </div>
  )
}
