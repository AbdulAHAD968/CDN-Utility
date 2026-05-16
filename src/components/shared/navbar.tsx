"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Cloud, Upload, LayoutGrid, Sliders, Settings, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const middleNavItems = [
  { name: "Assets", href: "/assets", icon: Cloud },
  { name: "Upload", href: "/upload", icon: Upload },
  { name: "Playground", href: "/playground", icon: Sliders },
];

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-[100] w-full border-b border-hairline bg-canvas/80 backdrop-blur-md px-4 md:px-10 py-4 flex items-center justify-between h-16 md:h-20">
      
      
      <div className="flex-1 flex items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl overflow-hidden flex items-center justify-center bg-surface-soft shadow-sm border border-hairline group-hover:scale-110 transition-transform">
             <img 
               src="https://res.cloudinary.com/dywx7ldqr/image/upload/v1778916228/marketing/img_01.png" 
               alt="CDN Logo" 
               className="w-full h-full object-contain"
             />
          </div>
          <span className="font-serif text-lg md:text-xl font-medium tracking-tight text-ink hidden xs:block">CDN Utility</span>
        </Link>
      </div>

      
      <div className="hidden md:flex items-center gap-1 bg-surface-soft/50 p-1.5 rounded-full border border-hairline">
        {middleNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300",
                isActive
                  ? "bg-canvas text-primary shadow-sm scale-105"
                  : "text-muted hover:text-ink hover:bg-canvas/50"
              )}
            >
              <Icon className="w-4 h-4" />
              {item.name}
            </Link>
          );
        })}
      </div>

      
      <div className="flex-1 flex items-center justify-end gap-2 md:gap-4">
        <Link
          href="/settings"
          aria-label="Settings"
          className={cn(
            "p-2.5 rounded-full transition-colors",
            pathname === "/settings"
              ? "bg-primary/10 text-primary"
              : "text-muted hover:text-ink hover:bg-surface-soft"
          )}
        >
          <Settings className="w-5 h-5" />
        </Link>
        
        
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden p-2.5 rounded-full text-ink hover:bg-surface-soft transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-[100%] left-0 w-full bg-canvas border-b border-hairline shadow-2xl md:hidden overflow-hidden"
          >
            <div className="p-4 space-y-2">
              {middleNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-2xl text-lg font-medium transition-all",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted hover:text-ink hover:bg-surface-soft"
                    )}
                  >
                    <Icon className="w-6 h-6" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
