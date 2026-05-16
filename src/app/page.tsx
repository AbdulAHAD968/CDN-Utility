import { Navbar } from "@/components/shared/navbar";
import { Button } from "@/components/ui/button";
import { Upload, LayoutGrid, Sliders, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const ILLUSTRATIONS = [
  "https://res.cloudinary.com/demo/image/upload/w_600,h_800,c_fill,g_auto,q_auto,f_auto/samples/balloons",
  "https://res.cloudinary.com/demo/image/upload/w_600,h_800,c_fill,g_auto,q_auto,f_auto/samples/sheep",
  "https://res.cloudinary.com/demo/image/upload/w_600,h_800,c_fill,g_auto,q_auto,f_auto/samples/food/fish-vegetables",
  "https://res.cloudinary.com/demo/image/upload/w_600,h_800,c_fill,g_auto,q_auto,f_auto/samples/landscapes/beach-boat",
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 container max-w-7xl mx-auto px-6 py-20 space-y-32">

        {/* Hero Section */}
        <section className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium tracking-wider uppercase">
              Simple Image Management
            </div>
            <h1 className="text-7xl font-serif leading-[1.05] tracking-tight text-ink">
              Your photos, <br />
              <span className="text-primary">ready for the web.</span>
            </h1>
            <p className="text-xl text-muted leading-relaxed max-w-lg">
              Upload your images, organize them into folders, and get instant links to use on your website or app. No complicated settings, just your best work, delivered fast.
            </p>
            <div className="flex items-center gap-6 pt-4">
              <Link href="/upload">
                <Button size="lg" className="button-primary h-14 px-8 text-lg">
                  Start Uploading
                  <Upload className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/assets" className="text-ink font-medium hover:underline underline-offset-4 flex items-center gap-2">
                Browse Library
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="relative grid grid-cols-2 gap-4 rotate-3 scale-110 translate-x-8">
            {ILLUSTRATIONS.map((src, i) => (
              <div key={i} className={cn(
                "rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform transition-transform hover:-translate-y-2 duration-500",
                i % 2 === 1 ? "translate-y-12" : ""
              )}>
                <img src={src} alt="Sample Illustration" className="w-full h-full object-cover" />
              </div>
            ))}
            <div className="absolute -inset-4 bg-primary/5 blur-3xl -z-10 rounded-full" />
          </div>
        </section>

        {/* Feature Section */}
        <section className="space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-4xl font-serif">How it works</h2>
            <p className="text-muted text-lg">Three simple steps to go from a camera roll to a live website.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-6 group">
              <div className="w-16 h-16 rounded-2xl bg-surface-card flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-2xl">1. Upload Anything</h3>
              <p className="text-muted leading-relaxed">
                Drag your photos from your desktop directly into our window. We handle the heavy lifting and make sure they're saved securely.
              </p>
            </div>

            <div className="space-y-6 group">
              <div className="w-16 h-16 rounded-2xl bg-surface-card flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <LayoutGrid className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-2xl">2. Stay Organized</h3>
              <p className="text-muted leading-relaxed">
                Keep your workspace clean. View all your assets in a beautiful gallery, search for what you need, and manage your library with ease.
              </p>
            </div>

            <div className="space-y-6 group">
              <div className="w-16 h-16 rounded-2xl bg-surface-card flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <Sliders className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-2xl">3. Copy & Use</h3>
              <p className="text-muted leading-relaxed">
                Use our playground to resize or tweak your images visually. Once you're happy, just copy the link and paste it into your site.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-ink text-on-dark rounded-[40px] p-16 text-center space-y-8 relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <h2 className="text-5xl font-serif max-w-xl mx-auto leading-tight">Ready to simplify your image workflow?</h2>
            <p className="text-on-dark-soft text-lg max-w-md mx-auto">
              Join the team and start managing your website assets the right way.
            </p>
            <Link href="/upload" className="inline-block">
              <Button size="lg" className="bg-primary hover:bg-primary-active text-white h-14 px-10 rounded-full text-lg">
                Get Started for Free
              </Button>
            </Link>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 blur-3xl translate-y-1/2 -translate-x-1/2" />
        </section>
      </main>
    </div>
  );
}
