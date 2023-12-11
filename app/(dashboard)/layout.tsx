'use client'

import { SideNav } from '@/components/layout/side-nav'
import { TopHeader } from '@/components/layout/top-header'
import { useState } from 'react'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="h-full w-full bg-white">
      <div className="fixed inset-y-0 z-50 hidden h-full flex-col md:flex md:w-64">
        <SideNav />
      </div>

      {open && (
        <div className="fixed inset-y-0 z-30 flex h-full w-64 flex-col bg-white">
          <SideNav open={open} setOpen={setOpen} />
        </div>
      )}

      <div className="md:ml-64">
        <TopHeader setOpen={setOpen} open={open} />
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout
