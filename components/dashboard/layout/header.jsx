import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export default function HeaderLayout() {
    return (
        <header
            className="sticky top-0 z-30 flex h-14 items-center justify-end gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            {/* <div className="flex-1 md:grow-0">
                <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                 <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]" /> 
            </div> */}
            <UserButton />
        </header>
    )
}
