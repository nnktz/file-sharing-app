'use client'

import Image from 'next/image'
import { File, LucideIcon, Shield, Upload } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

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

export const SideNav = () => {
  const pathname = usePathname()

  return (
    <div className="h-full border-r shadow-sm">
      <div className="border-b p-5">
        <Image src={'/logo.svg'} alt="logo" width={150} height={100} />
      </div>

      <div className="float-left flex w-full flex-col">
        {menuList.map((item, index) => (
          <Link key={item.path} href={item.path}>
            <button
              className={`flex w-full gap-2 px-6 py-4 text-gray-500 hover:bg-gray-100 ${
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
