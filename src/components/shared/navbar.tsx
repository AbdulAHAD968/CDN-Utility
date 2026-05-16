"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Cloud, Upload, LayoutGrid, Sliders, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutGrid },
  { name: "Assets", href: "/assets", icon: Cloud },
  { name: "Playground", href: "/playground", icon: Sliders },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-hairline bg-canvas px-6 md:px-10 py-4 flex items-center justify-between h-16">
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2">

          <div className="w-5 h-5 bg-ink rotate-45 flex items-center justify-center">
            <div className="w-1 h-3 bg-canvas absolute rotate-90" />
            <div className="w-1 h-3 bg-canvas absolute" />
          </div>
          <span className="font-serif text-xl font-medium tracking-tight">CDN Utility</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-surface-card text-ink"
                    : "text-muted hover:text-ink hover:bg-surface-soft"
                )}
              >
                <Icon className="w-4 h-4" />
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/upload">
          <Button
            variant="outline"
            size="sm"
            className="border-hairline text-muted hover:text-ink"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </Button>
        </Link>
      </div>
    </nav>
  );
}
