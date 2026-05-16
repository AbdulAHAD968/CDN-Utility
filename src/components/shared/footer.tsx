import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-canvas border-t border-hairline py-12 md:py-20 mt-auto">
      <div className="container max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-ink flex items-center justify-center p-2 shadow-lg">
             <img 
               src="https://res.cloudinary.com/dywx7ldqr/image/upload/v1778916228/marketing/img_01.png" 
               alt="Logo" 
               className="w-full h-full object-contain invert" 
             />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-ink tracking-tighter text-lg uppercase">CDN Utility</span>
            <span className="text-[10px] text-muted-soft uppercase tracking-[0.2em]">Internal Powerhouse</span>
          </div>
        </div>
        
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-12 text-sm font-semibold text-muted">
            <Link href="/privacy" className="hover:text-primary transition-colors hover:underline underline-offset-8">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-primary transition-colors hover:underline underline-offset-8">Contact Support</Link>
          </div>
          
          <div className="flex items-center gap-6">
            {[
              { name: "Facebook", href: "https://facebook.com/cdnutility" },
              { name: "X", href: "https://x.com/cdnutility" },
              { name: "Instagram", href: "https://instagram.com/cdnutility" },
              { name: "LinkedIn", href: "https://linkedin.com/company/cdnutility" },
              { name: "YouTube", href: "https://youtube.com/@cdnutility" }
            ].map((social) => (
              <a 
                key={social.name} 
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-soft hover:text-primary transition-colors text-[10px] font-bold uppercase tracking-widest"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end gap-2">
           <div className="text-xs text-muted-soft font-medium">
              © 2026 Cloudinary Asset Utility. All rights reserved.
           </div>
           <div className="text-[10px] text-muted-soft/60 italic text-center md:text-right max-w-[200px]">
              The professional standard for high-performance asset management.
           </div>
           <div className="text-[9px] text-muted-soft/40 uppercase tracking-[0.2em] pt-2">
              SevenLab HQ • San Francisco, CA
           </div>
        </div>
      </div>
    </footer>
  );
}
