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

      <main className="flex-1 container max-w-7xl mx-auto px-6 py-12 md:py-16 space-y-24 md:space-y-32">

        
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8 text-center lg:text-left relative z-10"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-bold tracking-[0.2em] uppercase">
              Internal Asset Utility
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif leading-[1.1] tracking-tight text-ink">
              Your photos,<br />
              <span className="text-primary">ready for the web.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted leading-relaxed max-w-lg mx-auto lg:mx-0">
              Upload, optimize, and organize your images in one seamless flow. Professional delivery for modern teams.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link href="/upload" className="w-full sm:w-auto">
                <Button size="lg" className="button-primary h-14 px-8 text-lg w-full sm:w-auto rounded-2xl shadow-xl shadow-primary/10 hover:scale-105 transition-transform">
                  Start Uploading
                  <Upload className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/assets" className="text-ink font-semibold hover:underline underline-offset-8 flex items-center gap-2 group transition-all">
                Browse Library
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          <div className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/5 blur-3xl -z-10 rounded-full scale-110" />
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 rotate-[-2deg] scale-95 md:scale-100">
              {ILLUSTRATIONS.map((src, i) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: [0, i % 2 === 0 ? -15 : 15, 0],
                  }}
                  transition={{ 
                    opacity: { duration: 1, delay: i * 0.1 },
                    scale: { duration: 1, delay: i * 0.1 },
                    y: { duration: 6 + i, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className={cn(
                    "rounded-[20px] overflow-hidden shadow-xl border-4 border-white backdrop-blur-sm transform transition-all hover:scale-110 hover:z-30 duration-500 bg-white/50",
                    i % 3 === 1 ? "translate-y-8" : i % 3 === 2 ? "-translate-y-8" : ""
                  )}
                >
                  <img src={src} alt="Sample" className="w-full h-full object-cover aspect-[3/4]" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        
        <section className="space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-serif text-ink tracking-tight">The smarter way to manage assets.</h2>
            <p className="text-muted text-lg leading-relaxed">Everything you need to go from a RAW file to a production-ready URL in seconds.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
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
                className="space-y-6 p-8 rounded-[32px] bg-white border border-hairline shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-14 h-14 rounded-[16px] bg-primary/5 flex items-center justify-center">
                  <f.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="space-y-3">
                  <h3 className="font-serif text-2xl text-ink tracking-tight">{f.title}</h3>
                  <p className="text-muted leading-relaxed text-base">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Technical Excellence Section - SEO Content */}
        <section className="space-y-16 py-12 border-t border-hairline/50">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-serif text-ink tracking-tight">Built for modern engineering workflows.</h2>
              <div className="space-y-6 text-muted leading-relaxed">
                <p>
                  Our <strong>Cloudinary Asset Utility</strong> is designed to bridge the gap between creative assets and production-ready code. By leveraging the full power of the <strong>Cloudinary CDN</strong>, we ensure that every image is optimized for performance, format, and quality without manual intervention.
                </p>
                <p>
                  Whether you are managing a few assets or a massive <strong>media library</strong>, our tool provides the visibility and control you need. With support for advanced features like <strong>signed uploads</strong>, <strong>automatic cropping</strong>, and <strong>AI-driven optimization</strong>, your team can focus on building great products while we handle the pixels.
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  {[
                    "Lossless WebP/AVIF compression",
                    "Dynamic URL transformation engine",
                    "Secure authenticated API access",
                    "Global edge delivery via CDN",
                    "Real-time asset synchronization",
                    "Metadata and tagging automation"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm font-medium text-ink">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="relative order-1 lg:order-2">
              <div className="aspect-square rounded-[40px] bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center p-12 overflow-hidden border border-primary/10">
                 <div className="w-full h-full rounded-[32px] bg-white shadow-2xl p-8 flex flex-col gap-6">
                    <div className="flex items-center gap-4 border-b border-hairline pb-4">
                       <div className="w-3 h-3 rounded-full bg-error/20" />
                       <div className="w-3 h-3 rounded-full bg-warning/20" />
                       <div className="w-3 h-3 rounded-full bg-success/20" />
                       <div className="ml-auto text-[10px] font-mono text-muted uppercase tracking-widest">cdn-transform-engine</div>
                    </div>
                    <div className="space-y-3 font-mono text-xs text-muted-soft overflow-hidden">
                       <div className="text-primary">{"{"}</div>
                       <div className="pl-4">"cloud_name": "cdnutility",</div>
                       <div className="pl-4">"transformation": [</div>
                       <div className="pl-8">{"{"} "quality": "auto" {"}"},</div>
                       <div className="pl-8">{"{"} "fetch_format": "auto" {"}"},</div>
                       <div className="pl-8">{"{"} "width": 800, "crop": "scale" {"}"}</div>
                       <div className="pl-4">]</div>
                       <div className="text-primary">{"}"}</div>
                    </div>
                    <div className="mt-auto h-2 w-full bg-surface-soft rounded-full overflow-hidden">
                       <motion.div 
                        animate={{ width: ["0%", "100%"] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="h-full bg-primary" 
                       />
                    </div>
                 </div>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 blur-[100px] -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4">
          <div className="bg-ink text-on-dark rounded-[40px] px-6 py-16 md:p-24 text-center space-y-8 relative overflow-hidden">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="space-y-6 max-w-2xl mx-auto relative z-10"
            >
              <h2 className="text-4xl md:text-5xl font-serif leading-tight tracking-tight">Level up your image game.</h2>
              <p className="text-on-dark-soft text-lg md:text-xl max-w-md mx-auto leading-relaxed opacity-80">
                Stop wrestling with URLs. Start delivering stunning visual experiences today.
              </p>
              <Link href="/upload" className="inline-block pt-4">
                <Button size="lg" className="bg-primary hover:bg-primary-active text-white h-14 px-10 rounded-full text-xl shadow-xl hover:scale-105 transition-transform">
                  Get Started
                </Button>
              </Link>
            </motion.div>
            
            <div className="absolute top-0 right-0 w-[40%] h-[100%] bg-primary/5 blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[40%] h-[100%] bg-primary/10 blur-[100px] translate-y-1/2 -translate-x-1/2" />
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}
