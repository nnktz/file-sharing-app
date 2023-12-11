import { SideNav } from '@/components/layout/side-nav'
import { TopHeader } from '@/components/layout/top-header'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full bg-white">
      <div className="fixed inset-y-0 z-50 hidden h-full flex-col md:flex md:w-64">
        <SideNav />
      </div>
      <div className="md:ml-64">
        <TopHeader />
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout
