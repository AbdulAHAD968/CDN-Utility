"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { Upload, X, FileImage, Loader2 } from "lucide-react";
import { useUploadStore } from "@/store/use-upload-store";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { ConfirmationDialog } from "@/components/shared/confirmation-dialog";

export function UploadZone() {
  const { addToQueue, queue, removeFromQueue, isUploading, clearQueue } = useUploadStore();
  const [clearConfirmOpen, setClearConfirmOpen] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    addToQueue(acceptedFiles);
    toast.success(`${acceptedFiles.length} files added to queue`);
  }, [addToQueue]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
      "image/avif": [],
      "image/svg+xml": [],
    },
  });

  return (
    <div className="space-y-8">
      <div
        {...getRootProps()}
        className={cn(
          "relative group cursor-pointer border-2 border-dashed rounded-md p-12 transition-all duration-200",
          "flex flex-col items-center justify-center gap-4 text-center",
          isDragActive
            ? "border-primary bg-primary/5 scale-[1.01]"
            : "border-hairline hover:border-primary/50 hover:bg-surface-soft"
        )}
      >
        <input {...getInputProps()} />
        <div className="w-16 h-16 rounded-full bg-surface-card flex items-center justify-center group-hover:scale-110 transition-transform">
          <Upload className="w-8 h-8 text-primary" />
        </div>
        <div className="space-y-2">
          <p className="text-xl font-serif">
            {isDragActive ? "Drop the files here" : "Drag & drop assets here"}
          </p>
          <p className="text-sm text-muted">
            Support for PNG, JPG, WEBP, AVIF, and SVG. Max 10MB per file.
          </p>
        </div>
        <Button variant="outline" className="mt-4 border-hairline">
          Select Files
        </Button>
      </div>

      {queue.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl">Upload Queue ({queue.length})</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setClearConfirmOpen(true)}
              className="text-error hover:text-error hover:bg-error/10"
            >
              Clear All
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {queue.map((item) => (
              <div
                key={item.id}
                className="group relative bg-surface-card rounded-lg overflow-hidden border border-hairline p-4 space-y-3"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-md overflow-hidden bg-canvas border border-hairline shrink-0">
                    <img
                      src={item.preview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.file.name}</p>
                    <p className="text-xs text-muted">
                      {(item.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromQueue(item.id)}
                    className="p-1 hover:bg-surface-soft rounded-full text-muted hover:text-error transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {item.status === "uploading" && (
                  <div className="space-y-2">
                    <div className="h-1 w-full bg-surface-soft rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-300 w-[var(--progress)]"
                        style={{ "--progress": `${item.progress}%` } as React.CSSProperties}
                      />
                    </div>
                    <p className="text-[10px] text-muted text-right uppercase tracking-wider">
                      Uploading... {item.progress}%
                    </p>
                  </div>
                )}

                {item.status === "success" && (
                  <p className="text-[10px] text-success uppercase font-bold tracking-widest">
                    ✓ Uploaded
                  </p>
                )}

                {item.status === "error" && (
                  <p className="text-[10px] text-error uppercase font-bold tracking-widest">
                    ⚠ {item.error || "Failed"}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      <ConfirmationDialog
        open={clearConfirmOpen}
        onOpenChange={setClearConfirmOpen}
        onConfirm={clearQueue}
        title="Clear Queue"
        description="Are you sure you want to remove all files from the upload queue?"
        confirmText="Clear All"
        variant="destructive"
      />
    </div>
  );
}
