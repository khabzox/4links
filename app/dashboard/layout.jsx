import HeaderLayout from "@/components/dashboard/layout/header"
import SidebarLayout from "@/components/dashboard/layout/sidebae"

export default function DashboardLayout({ children }) {
    return (
        <div className="flex min-h-screen w-full">
            <SidebarLayout />
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 w-full">
                <HeaderLayout />
                <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    {children}
                </div>
            </div>
        </div>
    )
}
