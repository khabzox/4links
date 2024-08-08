import HeaderLayout from "@/components/dashboard/layout/header"
import SidebarLayout from "@/components/dashboard/layout/sidebae"

export default function DashboardLayout({ children }) {
    return (
        <div className="flex min-h-screen w-full bg-muted/40">
            <SidebarLayout />
            <div className="flex flex-1 flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <HeaderLayout />
                <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8">
                    {children}
                </main>
            </div>
        </div>
    )
}
