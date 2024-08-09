"use client";

import { useState } from 'react';
import { Link2, ChartNoAxesCombined, CircleHelp } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function HeaderLayout() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleLinkClick = () => {
    setIsSheetOpen(false); // Close the sheet
  };

  return (
    <header className="sticky top-0 z-5 flex h-14 items-center justify-between gap-4 border-b bg-accent px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className="sm:hidden bg-primary text-muted rounded-full"
            onClick={() => setIsSheetOpen(true)}
          >
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/dashboard"
              className="group flex shrink-0 items-center justify-start gap-2 text-lg font-semibold text-primary-foreground md:text-base"
              prefetch={false}
              onClick={handleLinkClick}
            >
              <Image
                src={"/logo.svg"}
                alt="Logo of 4links"
                width={120}
                height={120}
              />
              <span className="sr-only">4links</span>
            </Link>
            <Link
              href="/dashboard/short-linker"
              className="flex items-center gap-4 px-2.5 text-muted-foreground"
              prefetch={true}
              onClick={handleLinkClick}
            >
              <Link2 className="h-5 w-5" />
              Short Linker
            </Link>
            <Link
              href="/dashboard/analytics"
              className="flex items-center gap-4 px-2.5 text-muted-foreground"
              prefetch={true}
              onClick={handleLinkClick}
            >
              <ChartNoAxesCombined className="h-5 w-5" />
              Analytics
            </Link>
          </nav>
          <Link
            href="/dashboard/help"
            className="flex items-center absolute bottom-0 pb-10 gap-4 px-2.5 text-muted-foreground"
            prefetch={true}
            onClick={handleLinkClick}
          >
            <CircleHelp className="h-5 w-5" />
            Help
          </Link>
        </SheetContent>
      </Sheet>
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard" prefetch={false}>
                Dashboard
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Button
        variant="outline"
        size="icon"
        className="overflow-hidden bg-primary/90 hover:bg-primary/90 text-muted rounded-full"
      >
        <UserButton afterSignOutUrl="/" />
      </Button>
    </header>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
