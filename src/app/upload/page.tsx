"use client";

import { useState } from "react";
import { Navbar } from "@/components/shared/navbar";
import { UploadZone } from "@/components/upload/upload-zone";
import { NamingOptionsForm } from "@/components/upload/naming-options";
import { useUploadStore } from "@/store/use-upload-store";
import { Button } from "@/components/ui/button";
import { getUploadSignature, getBatchUploadSignatures } from "@/actions/cloudinary";
import { generateSequentialNames } from "@/lib/naming/engine";
import { toast } from "sonner";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const [namingOptions, setNamingOptions] = useState<any>({
    prefix: "img",
    folder: "media",
    startingNumber: 1,
    padding: 2,
    preserveOriginal: false,
    randomSuffix: false,
    slugify: true,
  });

  const { queue, updateProgress, updateStatus, setUploading, isUploading, clearQueue } = useUploadStore();
  const router = useRouter();

  const handleUpload = async () => {
    if (queue.length === 0) return;

    setUploading(true);
    const names = generateSequentialNames(queue.map(i => i.file), namingOptions);

    try {
      // 1. Fetch ALL signatures in ONE request (Massive Optimization)
      toast.info("Fetching upload signatures...");
      const signatures = await getBatchUploadSignatures(namingOptions.folder, names);

      // 2. Process uploads with a concurrency limit (e.g., 3 at a time)
      // This prevents hitting browser connection limits and reduces failures
      const CONCURRENCY_LIMIT = 3;
      const itemsToUpload = queue.filter(item => item.status !== "success");
      
      const results = [];
      for (let i = 0; i < itemsToUpload.length; i += CONCURRENCY_LIMIT) {
        const chunk = itemsToUpload.slice(i, i + CONCURRENCY_LIMIT);
        
        const chunkPromises = chunk.map(async (item) => {
          const indexInFullQueue = queue.findIndex(q => q.id === item.id);
          const sigData = signatures[indexInFullQueue];

          updateStatus(item.id, "uploading");

          const formData = new FormData();
          formData.append("file", item.file);
          formData.append("api_key", sigData.apiKey);
          formData.append("timestamp", sigData.timestamp.toString());
          formData.append("signature", sigData.signature);
          formData.append("folder", sigData.folder);
          formData.append("public_id", sigData.publicId);

          return new Promise((resolve) => {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", `https://api.cloudinary.com/v1_1/${sigData.cloudName}/image/upload`);

            xhr.upload.onprogress = (e) => {
              if (e.lengthComputable) {
                const percent = Math.round((e.loaded / e.total) * 100);
                updateProgress(item.id, percent);
              }
            };

            xhr.onload = () => {
              if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                updateStatus(item.id, "success", {
                  publicId: response.public_id,
                  url: response.secure_url
                });
                resolve(response);
              } else {
                const error = JSON.parse(xhr.responseText);
                updateStatus(item.id, "error", { error: error.message });
                resolve(null);
              }
            };

            xhr.onerror = () => {
              updateStatus(item.id, "error", { error: "Network error" });
              resolve(null);
            };

            xhr.send(formData);
          });
        });

        await Promise.all(chunkPromises);
      }

      toast.success("Upload batch completed");

    } catch (error) {
      console.error("Upload error:", error);
      toast.error("An error occurred during upload");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 container max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
            <h1 className="text-4xl font-serif">Upload Assets</h1>
            <p className="text-muted">Configure naming and batch upload to Cloudinary.</p>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="border-hairline"
              onClick={() => router.push("/assets")}
            >
              View Assets
            </Button>
            <Button
              className="button-primary min-w-[140px]"
              onClick={handleUpload}
              disabled={queue.length === 0 || isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  Start Upload
                  <CheckCircle2 className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <UploadZone />
          </div>
          <aside className="space-y-8">
            <NamingOptionsForm onChange={setNamingOptions} />

            <div className="card-cream p-6 space-y-4">
              <h4 className="font-serif text-lg">Upload Stats</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Total Files</span>
                  <span className="font-medium">{queue.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Total Size</span>
                  <span className="font-medium">
                    {(queue.reduce((acc, i) => acc + i.file.size, 0) / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
