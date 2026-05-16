"use client";

import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Button } from "@/components/ui/button";
import { Upload, LayoutGrid, Sliders, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const ILLUSTRATIONS = [
  "https://res.cloudinary.com/demo/image/upload/w_600,h_800,c_fill,g_auto,q_auto,f_auto/samples/balloons",
  "https://res.cloudinary.com/demo/image/upload/w_600,h_800,c_fill,g_auto,q_auto,f_auto/samples/sheep",
  "https://res.cloudinary.com/demo/image/upload/w_600,h_800,c_fill,g_auto,q_auto,f_auto/samples/food/fish-vegetables",
  "https://res.cloudinary.com/demo/image/upload/w_600,h_800,c_fill,g_auto,q_auto,f_auto/samples/landscapes/beach-boat",
  "https://res.cloudinary.com/demo/image/upload/w_600,h_800,c_fill,g_auto,q_auto,f_auto/samples/animals/reindeer",
  "https://res.cloudinary.com/demo/image/upload/w_600,h_800,c_fill,g_auto,q_auto,f_auto/samples/food/pot-mussels",
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-canvas">
      <Navbar />

      <main className="flex-1 container max-w-7xl mx-auto px-6 py-12 md:py-24 space-y-32 md:space-y-48">

        {/* Hero Section */}
        <section className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-10 text-center lg:text-left relative z-10"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-bold tracking-[0.2em] uppercase">
              Internal Asset Utility
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif leading-[0.95] tracking-tight text-ink">
              Your photos,<br />
              <span className="text-primary italic">made for the web.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted leading-relaxed max-w-xl mx-auto lg:mx-0">
              Upload, optimize, and organize your images in one seamless flow. Professional delivery for modern teams.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-4">
              <Link href="/upload" className="w-full sm:w-auto">
                <Button size="lg" className="button-primary h-16 px-10 text-xl w-full sm:w-auto rounded-full shadow-2xl shadow-primary/20 hover:scale-105 transition-transform active:scale-95">
                  Start Uploading
                  <Upload className="w-6 h-6 ml-3" />
                </Button>
              </Link>
              <Link href="/assets" className="text-ink font-medium text-lg hover:underline underline-offset-8 flex items-center gap-3 transition-all group">
                Browse Library
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          <div className="relative h-[500px] md:h-[700px] w-full flex items-center justify-center">
            {/* Minimalistic Background Accent */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-primary/10 blur-3xl -z-10 rounded-full scale-125" />
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 rotate-[-2deg] scale-100 md:scale-110">
              {ILLUSTRATIONS.map((src, i) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: [0, i % 2 === 0 ? -20 : 20, 0],
                  }}
                  transition={{ 
                    opacity: { duration: 1, delay: i * 0.1 },
                    scale: { duration: 1, delay: i * 0.1 },
                    y: { duration: 6 + i, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className={cn(
                    "rounded-[24px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] border-8 border-white/80 backdrop-blur-sm transform transition-all hover:scale-110 hover:z-30 duration-700 bg-white/50",
                    i % 3 === 1 ? "translate-y-12" : i % 3 === 2 ? "-translate-y-12" : ""
                  )}
                >
                  <img src={src} alt="Sample" className="w-full h-full object-cover aspect-[3/4]" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Steps Section - Focused & High Contrast */}
        <section className="space-y-24">
          <div className="text-center space-y-6 max-w-3xl mx-auto px-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-ink tracking-tight">The smarter way to manage assets.</h2>
            <p className="text-muted text-xl md:text-2xl leading-relaxed">Everything you need to go from a RAW file to a production-ready URL in seconds.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-16">
            {[
              { icon: Upload, title: "Batch Uploads", desc: "Drag, drop, and walk away. We handle the heavy lifting of secure signed uploads and automatic folder organization." },
              { icon: LayoutGrid, title: "Central Library", desc: "A beautiful, lightning-fast gallery for all your Cloudinary assets. Search, filter, and find what you need instantly." },
              { icon: Sliders, title: "Live Playground", desc: "Tweak transformations, resize on the fly, and copy production-ready code snippets. No more manual URL building." }
            ].map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="space-y-8 p-10 rounded-[40px] bg-white border border-hairline shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-500"
              >
                <div className="w-20 h-20 rounded-[24px] bg-primary/5 flex items-center justify-center">
                  <f.icon className="w-10 h-10 text-primary" />
                </div>
                <div className="space-y-4">
                  <h3 className="font-serif text-3xl text-ink tracking-tight">{f.title}</h3>
                  <p className="text-muted leading-relaxed text-lg">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* High-End CTA Section */}
        <section className="relative px-4">
          <div className="bg-ink text-on-dark rounded-[64px] px-8 py-24 md:p-32 text-center space-y-10 relative overflow-hidden">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="space-y-8 max-w-3xl mx-auto relative z-10"
            >
              <h2 className="text-5xl md:text-7xl font-serif leading-[1.05] tracking-tight">Level up your image game.</h2>
              <p className="text-on-dark-soft text-xl md:text-2xl max-w-xl mx-auto leading-relaxed opacity-80">
                Stop wrestling with URLs. Start delivering stunning visual experiences today.
              </p>
              <Link href="/upload" className="inline-block pt-6">
                <Button size="lg" className="bg-primary hover:bg-primary-active text-white h-20 px-16 rounded-full text-2xl shadow-2xl hover:scale-105 transition-transform active:scale-95">
                  Get Started
                </Button>
              </Link>
            </motion.div>
            
            {/* Dramatic Accents */}
            <div className="absolute top-0 right-0 w-[50%] h-[100%] bg-primary/5 blur-[120px] -translate-y-1/2 translate-x-1/2 rotate-12" />
            <div className="absolute bottom-0 left-0 w-[50%] h-[100%] bg-primary/10 blur-[120px] translate-y-1/2 -translate-x-1/2 -rotate-12" />
          </div>
        </section>

        {/* Refined Footer */}
        <footer className="pt-20 pb-12 border-t border-hairline flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-ink flex items-center justify-center p-2 shadow-lg">
                 <img src="https://res.cloudinary.com/dywx7ldqr/image/upload/v1778916228/marketing/img_01.png" alt="Logo" className="w-full h-full object-contain invert" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-ink tracking-tighter text-lg">CDN UTILITY</span>
                <span className="text-[10px] text-muted-soft uppercase tracking-[0.2em]">Internal Powerhouse</span>
              </div>
           </div>
           
           <div className="flex gap-10 text-sm font-medium text-muted">
              <Link href="/privacy" className="hover:text-primary transition-colors hover:underline underline-offset-4">Privacy</Link>
              <Link href="/contact" className="hover:text-primary transition-colors hover:underline underline-offset-4">Contact</Link>
           </div>

           <div className="text-xs text-muted-soft">
              © 2026 Powered by Cloudinary & SevenLab
           </div>
        </footer>
      </main>
    </div>
  );
}
