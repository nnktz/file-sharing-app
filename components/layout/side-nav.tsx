'use client'

import Image from 'next/image'
import { File, LucideIcon, Shield, Upload, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Dispatch, SetStateAction } from 'react'

type MenuType = {
  name: string
  icon: LucideIcon
  path: string
}

const menuList: MenuType[] = [
  {
    name: 'Upload',
    icon: Upload,
    path: '/upload',
  },
  {
    name: 'Files',
    icon: File,
    path: '/files',
  },
  {
    name: 'Upgrade',
    icon: Shield,
    path: '/upgrade',
  },
]

interface SideNavProps {
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export const SideNav = ({ open, setOpen }: SideNavProps) => {
  const pathname = usePathname()

  const handleOpenMenu = () => {
    if (open && setOpen) {
      setOpen(!open)
    }
  }

  return (
    <div className="h-full border-r shadow-sm">
      <div className="flex items-center justify-between border-b p-5 md:block">
        <Image src={'/logo.svg'} alt="logo" width={150} height={100} />
        <X
          className="cursor-pointer text-gray-600 transition hover:opacity-75 md:hidden"
          onClick={handleOpenMenu}
        />
      </div>

      <div className="float-left flex w-full flex-col">
        {menuList.map((item, index) => (
          <Link key={item.path} href={item.path}>
            <button
              className={`flex w-full select-none gap-2 px-6 py-4 text-gray-500 hover:bg-gray-100 ${
                pathname === item.path && 'bg-blue-50 text-primary'
              }`}
            >
              <item.icon />
              <h2>{item.name}</h2>
            </button>
          </Link>
        ))}
      </div>
    </div>
  )
}
