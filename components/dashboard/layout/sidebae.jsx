"use client";

import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  LayoutDashboard,
  Link2,
  ChartNoAxesCombined,
} from "lucide-react";
import { cn } from "@/libs/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { CircleHelp } from 'lucide-react';


const sidebarLinks = [
  {
    id: 1,
    label: "Short Linker",
    path: "/dashboard/short-linker",
    Icon: Link2,
  },
  {
    id: 2,
    label: "Analytics",
    path: "/dashboard/analytics",
    Icon: ChartNoAxesCombined,
  },
];

export default function SidebarLayout() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-primary sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard"
                className="group flex h-9 w-9 items-center justify-center rounded-full bg-primary text-lg font-semibold md:h-8 md:w-8"
                prefetch={false}
              >
                <LayoutDashboard className="h-4 w-4 text-muted transition-transform group-hover:scale-110" />
                <span className="sr-only">Dashboard</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Tooltip key={link.id}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.path}
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8",
                      isActive
                        ? "bg-white/60 text-primary"
                        : " text-muted"
                    )}
                    prefetch={false}
                  >
                    <link.Icon className="h-4 w-4 transition-transform hover:scale-110" />
                    <span className="sr-only">{link.label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{link.label}</TooltipContent>
              </Tooltip>

            );
          })}
          <Link
            href="/dashboard/help"
            className="flex items-center absolute bottom-0 pb-5 gap-4 px-2.5 text-muted"
            prefetch={true}
          >
            <CircleHelp className="h-5 w-5" />
          </Link>
        </TooltipProvider>
      </nav>
    </aside>
  );
}
