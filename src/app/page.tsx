import { Navbar } from "@/components/shared/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Upload, LayoutGrid, Sliders, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* Hero Section */}
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-6xl font-serif leading-[1.1] tracking-tight">
              Manage your assets with <span className="text-primary">precision.</span>
            </h1>
            <p className="text-lg text-muted max-w-md">
              A lightweight internal Cloudinary studio optimized for developer productivity and frontend performance.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/upload">
                <Button size="lg" className="button-primary">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/assets">
                <Button size="lg" variant="outline" className="border-hairline">
                  View Library
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="card-dark aspect-video flex flex-col justify-between overflow-hidden relative">
            <div className="flex items-center gap-2 border-b border-surface-dark-elevated pb-4 mb-4">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              <div className="ml-4 text-xs font-mono text-on-dark-soft uppercase tracking-widest">
                asset_preview.sh
              </div>
            </div>
            <div className="flex-1 font-mono text-sm space-y-2 text-on-dark-soft">
              <p><span className="text-primary">$</span> cloudinary-cli list --folder /marketing</p>
              <p className="text-success">Found 124 assets...</p>
              <p>Optimizing: hero_banner_01.webp <span className="text-warning">[v_auto]</span></p>
              <p>Generating URL snippets...</p>
              <div className="mt-8 bg-surface-dark-soft p-4 rounded-md border border-surface-dark-elevated">
                <code className="text-on-dark">
                  &lt;Image src="https://res.cloudinary.com/..." /&gt;
                </code>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 blur-3xl rounded-full" />
          </div>
        </section>

        {/* Feature Grid */}
        <section className="grid md:grid-cols-3 gap-8">
          <Card className="bg-surface-card border-none shadow-none">
            <CardHeader>
              <Upload className="w-8 h-8 text-primary mb-4" />
              <CardTitle className="font-serif text-2xl">Smart Upload</CardTitle>
              <CardDescription className="text-muted text-base">
                Drag and drop multiple images with sequential naming presets and collision detection.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-surface-card border-none shadow-none">
            <CardHeader>
              <Sliders className="w-8 h-8 text-primary mb-4" />
              <CardTitle className="font-serif text-2xl">Transformation Lab</CardTitle>
              <CardDescription className="text-muted text-base">
                Test Cloudinary transforms visually and copy framework-ready code snippets instantly.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-surface-card border-none shadow-none">
            <CardHeader>
              <LayoutGrid className="w-8 h-8 text-primary mb-4" />
              <CardTitle className="font-serif text-2xl">Asset Library</CardTitle>
              <CardDescription className="text-muted text-base">
                A clean, Masonry-powered gallery to organize, search, and bulk-manage your media.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>
      </main>
    </div>
  );
}
