"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/shared/navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check, ExternalLink, Image as ImageIcon, Code, Zap } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const SAMPLE_IMAGE = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop";


import { useDebounce } from "@/hooks/use-debounce";

const DEFAULT_ASSET = "samples/balloons";

export default function PlaygroundPage() {
   const [publicId, setPublicId] = useState(DEFAULT_ASSET);
   const [width, setWidth] = useState(800);
   const [height, setHeight] = useState(600);
   const [crop, setCrop] = useState("fill");
   const [quality, setQuality] = useState("auto");
   const [format, setFormat] = useState("auto");
   const [gravity, setGravity] = useState("auto");
   const [blur, setBlur] = useState(0);
   const [radius, setRadius] = useState(0);
   const [copied, setCopied] = useState<string | null>(null);

   // Debounce values that trigger network requests (Cloudinary transformations)
   const dWidth = useDebounce(width, 300);
   const dHeight = useDebounce(height, 300);
   const dBlur = useDebounce(blur, 300);
   const dRadius = useDebounce(radius, 300);
   const dPublicId = useDebounce(publicId, 500);

   const transformString = useMemo(() => {
      const parts = [];
      if (dWidth) parts.push(`w_${dWidth}`);
      if (dHeight) parts.push(`h_${dHeight}`);
      if (crop) parts.push(`c_${crop}`);
      if (gravity !== "none") parts.push(`g_${gravity}`);
      if (quality) parts.push(`q_${quality}`);
      if (format) parts.push(`f_${format}`);
      if (dBlur > 0) parts.push(`e_blur:${dBlur}`);
      if (dRadius > 0) parts.push(`r_${dRadius === 100 ? 'max' : dRadius}`);

      return parts.join(",");
   }, [dWidth, dHeight, crop, gravity, quality, format, dBlur, dRadius]);

   const generatedUrl = `https://res.cloudinary.com/demo/image/upload/${transformString}/${dPublicId}`;

   const handleCopy = (text: string, id: string) => {
      navigator.clipboard.writeText(text);
      setCopied(id);
      toast.success("Snippet copied!");
      setTimeout(() => setCopied(null), 2000);
   };

   const snippets = {
      html: `<img src="${generatedUrl}" alt="Optimized asset" />`,
      nextjs: `<Image\n  src="${generatedUrl}"\n  width={${width}}\n  height={${height}}\n  alt="Optimized asset"\n/>`,
      markdown: `![asset](${generatedUrl})`,
      css: `background-image: url("${generatedUrl}");`,
   };

   return (
      <div className="flex flex-col min-h-screen">
         <Navbar />

         <main className="flex-1 container max-w-7xl mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
               <div className="space-y-1">
                  <h1 className="text-4xl font-serif">Transformation Playground</h1>
                  <p className="text-muted">Test transformations visually and generate framework-ready code.</p>
               </div>

               <div className="flex items-center gap-3">
                  <div className="relative w-full md:w-80">
                     <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                     <Input
                        placeholder="Cloudinary Public ID..."
                        className="pl-10 bg-canvas border-hairline shadow-sm focus:ring-1 focus:ring-primary/20"
                        value={publicId}
                        onChange={(e) => setPublicId(e.target.value)}
                     />
                  </div>
               </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">

               <div className="lg:col-span-4 space-y-6 min-w-0">
                  <Card className="bg-canvas border-hairline shadow-none">
                     <CardHeader>
                        <CardTitle className="font-serif text-xl flex items-center gap-2">
                           <Zap className="w-5 h-5 text-primary" />
                           Controls
                        </CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-6">
                        <div className="space-y-4">
                           <div className="space-y-2">
                              <div className="flex justify-between">
                                 <Label>Width ({width}px)</Label>
                              </div>
                              <Slider
                                 value={[width]}
                                 max={2000}
                                 step={10}
                                 onValueChange={(val) => setWidth(Array.isArray(val) ? val[0] : val)}
                              />
                           </div>

                           <div className="space-y-2">
                              <div className="flex justify-between">
                                 <Label>Height ({height}px)</Label>
                              </div>
                              <Slider
                                 value={[height]}
                                 max={2000}
                                 step={10}
                                 onValueChange={(val) => setHeight(Array.isArray(val) ? val[0] : val)}
                              />
                           </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <Label>Crop Mode</Label>
                              <Select value={crop} onValueChange={(val) => val && setCrop(val)}>
                                 <SelectTrigger className="bg-canvas border-hairline shadow-sm">
                                    <SelectValue />
                                 </SelectTrigger>
                                 <SelectContent>
                                    <SelectItem value="fill">Fill</SelectItem>
                                    <SelectItem value="scale">Scale</SelectItem>
                                    <SelectItem value="fit">Fit</SelectItem>
                                    <SelectItem value="thumb">Thumbnail</SelectItem>
                                    <SelectItem value="pad">Pad</SelectItem>
                                 </SelectContent>
                              </Select>
                           </div>
                           <div className="space-y-2">
                              <Label>Gravity</Label>
                              <Select value={gravity} onValueChange={(val) => val && setGravity(val)}>
                                 <SelectTrigger className="bg-canvas border-hairline shadow-sm">
                                    <SelectValue />
                                 </SelectTrigger>
                                 <SelectContent>
                                    <SelectItem value="auto">Auto (AI)</SelectItem>
                                    <SelectItem value="face">Face</SelectItem>
                                    <SelectItem value="center">Center</SelectItem>
                                    <SelectItem value="north">North</SelectItem>
                                    <SelectItem value="south">South</SelectItem>
                                 </SelectContent>
                              </Select>
                           </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <Label>Quality</Label>
                              <Select value={quality} onValueChange={(val) => val && setQuality(val)}>
                                 <SelectTrigger className="bg-canvas border-hairline shadow-sm">
                                    <SelectValue />
                                 </SelectTrigger>
                                 <SelectContent>
                                    <SelectItem value="auto">Auto (Smart)</SelectItem>
                                    <SelectItem value="best">Best</SelectItem>
                                    <SelectItem value="good">Good</SelectItem>
                                    <SelectItem value="eco">Eco</SelectItem>
                                    <SelectItem value="low">Low</SelectItem>
                                 </SelectContent>
                              </Select>
                           </div>
                           <div className="space-y-2">
                              <Label>Format</Label>
                              <Select value={format} onValueChange={(val) => val && setFormat(val)}>
                                 <SelectTrigger className="bg-canvas border-hairline shadow-sm">
                                    <SelectValue />
                                 </SelectTrigger>
                                 <SelectContent>
                                    <SelectItem value="auto">Auto (f_auto)</SelectItem>
                                    <SelectItem value="webp">WebP</SelectItem>
                                    <SelectItem value="avif">AVIF</SelectItem>
                                    <SelectItem value="jpg">JPEG</SelectItem>
                                    <SelectItem value="png">PNG</SelectItem>
                                 </SelectContent>
                              </Select>
                           </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-hairline">
                           <div className="space-y-2">
                              <Label>Blur ({blur})</Label>
                              <Slider value={[blur]} max={1000} step={10} onValueChange={(val) => setBlur(Array.isArray(val) ? val[0] : val)} />
                           </div>
                           <div className="space-y-2">
                              <Label>Round Corners ({radius}px)</Label>
                              <Slider value={[radius]} max={100} step={1} onValueChange={(val) => setRadius(Array.isArray(val) ? val[0] : val)} />
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  <Button className="w-full button-primary h-12 text-lg" onClick={() => handleCopy(generatedUrl, 'url')}>
                     {copied === 'url' ? <Check className="w-5 h-5 mr-2" /> : <Copy className="w-5 h-5 mr-2" />}
                     Copy Final URL
                  </Button>
               </div>


               <div className="lg:col-span-8 space-y-8 min-w-0">
                  <div className="bg-surface-dark rounded-2xl overflow-hidden aspect-video flex items-center justify-center relative group">
                     <img
                        src={generatedUrl}
                        alt="Playground Preview"
                        className="max-w-full max-h-full object-contain transition-transform duration-500"
                     />
                     <div className="absolute top-4 right-4 bg-ink/80 text-on-dark text-xs px-3 py-1.5 rounded-full backdrop-blur-lg border border-white/10">
                        Preview Mode
                     </div>
                     <a
                        href={generatedUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="absolute bottom-4 left-4 p-2 bg-white/20 hover:bg-white/30 rounded-full text-on-dark transition-colors opacity-0 group-hover:opacity-100 backdrop-blur-md border border-white/10"
                     >
                        <ExternalLink className="w-4 h-4" />
                     </a>
                  </div>
               </div>
            </div>

            {/* Full-width Generated Snippets */}
            <div className="mt-16 pt-12 border-t border-hairline">
               <Tabs defaultValue="nextjs" className="w-full flex flex-col gap-0">
                  <div className="space-y-6 mb-8">
                     <div className="flex items-center gap-2">
                        <Code className="w-5 h-5 text-primary" />
                        <h2 className="font-serif text-2xl">Generated Snippets</h2>
                     </div>
                     <TabsList className="bg-surface-card border border-hairline p-1 w-fit overflow-x-auto flex-nowrap">
                        <TabsTrigger value="nextjs" className="data-[state=active]:bg-canvas px-6">Next.js</TabsTrigger>
                        <TabsTrigger value="html" className="data-[state=active]:bg-canvas px-6">HTML</TabsTrigger>
                        <TabsTrigger value="markdown" className="data-[state=active]:bg-canvas px-6">Markdown</TabsTrigger>
                        <TabsTrigger value="css" className="data-[state=active]:bg-canvas px-6">CSS</TabsTrigger>
                     </TabsList>
                  </div>

                  {Object.entries(snippets).map(([key, code]) => (
                     <TabsContent key={key} value={key} className="mt-0">
                        <div className="relative group">
                           <pre className="bg-surface-dark text-on-dark p-8 rounded-2xl font-mono text-sm overflow-x-auto border border-surface-dark-elevated max-w-full shadow-2xl">
                              <code className="block min-w-full">{code}</code>
                           </pre>
                           <Button
                              size="sm"
                              variant="secondary"
                              className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity bg-surface-dark-elevated hover:bg-surface-dark-soft text-on-dark h-10 px-4"
                              onClick={() => handleCopy(code, key)}
                           >
                              {copied === key ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                              Copy Snippet
                           </Button>
                        </div>
                     </TabsContent>
                  ))}
               </Tabs>
            </div>
         </main>
      </div>
   );
}
