"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Cloud, Upload, LayoutGrid, Sliders, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

const middleNavItems = [
  { name: "Assets", href: "/assets", icon: Cloud },
  { name: "Upload", href: "/upload", icon: Upload },
  { name: "Playground", href: "/playground", icon: Sliders },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-hairline bg-canvas/80 backdrop-blur-md px-6 md:px-10 py-4 flex items-center justify-between h-16">
      
      <div className="flex-1 flex items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-5 h-5 bg-ink rotate-45 flex items-center justify-center">
            <div className="w-1 h-3 bg-canvas absolute rotate-90" />
            <div className="w-1 h-3 bg-canvas absolute" />
          </div>
          <span className="font-serif text-xl font-medium tracking-tight">CDN Utility</span>
        </Link>
      </div>

      
      <div className="hidden md:flex items-center gap-1 bg-surface-soft/50 p-1 rounded-full border border-hairline">
        {middleNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                isActive
                  ? "bg-canvas text-ink shadow-sm scale-105"
                  : "text-muted hover:text-ink hover:bg-canvas/50"
              )}
            >
              <Icon className="w-4 h-4" />
              {item.name}
            </Link>
          );
        })}
      </div>

      
      <div className="flex-1 flex items-center justify-end gap-4">
        <Link
          href="/settings"
          className={cn(
            "p-2 rounded-full transition-colors",
            pathname === "/settings"
              ? "bg-surface-card text-ink"
              : "text-muted hover:text-ink hover:bg-surface-soft"
          )}
        >
          <Settings className="w-5 h-5" />
        </Link>
      </div>
    </nav>
  );
}
