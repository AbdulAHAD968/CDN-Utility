"use client";

import { useEffect, useState, useCallback } from "react";
import { Navbar } from "@/components/shared/navbar";
import { getAssets, deleteAsset } from "@/actions/cloudinary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  Trash2, 
  Copy, 
  ExternalLink, 
  RefreshCw,
  Eye,
  Loader2
} from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export default function AssetsPage() {
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<any>(null);

  const fetchAssets = useCallback(async (cursor?: string) => {
    setLoading(true);
    const result = await getAssets({ next_cursor: cursor });
    if (result.success) {
      if (cursor) {
        setAssets(prev => [...prev, ...result.assets]);
      } else {
        setAssets(result.assets);
      }
      setNextCursor(result.next_cursor || null);
    } else {
      toast.error(result.error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  const handleDelete = async (publicId: string) => {
    if (!confirm("Are you sure you want to delete this asset?")) return;
    
    const result = await deleteAsset(publicId);
    if (result.success) {
      setAssets(prev => prev.filter(a => a.public_id !== publicId));
      toast.success("Asset deleted");
    } else {
      toast.error(result.error);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("URL copied to clipboard");
  };

  const filteredAssets = assets.filter(a => 
    a.public_id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="space-y-1">
            <h1 className="text-4xl font-serif">Asset Library</h1>
            <p className="text-muted">Manage and optimize your Cloudinary media.</p>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <Input 
                  placeholder="Search assets..." 
                  className="pl-10 bg-surface-soft border-hairline"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
             </div>
             <Button variant="outline" className="border-hairline">
                <Filter className="w-4 h-4 mr-2" />
                Filters
             </Button>
             <Button 
               variant="outline" 
               className="border-hairline"
               onClick={() => fetchAssets()}
               disabled={loading}
             >
                <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
             </Button>
          </div>
        </div>

        {loading && assets.length === 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-xl bg-surface-soft" />
            ))}
          </div>
        ) : filteredAssets.length === 0 ? (
           <div className="text-center py-20 bg-surface-soft rounded-2xl border border-hairline border-dashed">
              <p className="text-muted">No assets found matching your search.</p>
           </div>
        ) : (
          <div className="space-y-12">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredAssets.map((asset) => (
                <div 
                  key={asset.public_id}
                  className="group relative bg-canvas rounded-xl border border-hairline overflow-hidden hover:border-primary/50 transition-all duration-300"
                >
                  <div className="aspect-square relative bg-surface-soft overflow-hidden">
                    <img 
                      src={asset.secure_url.replace("/upload/", "/upload/c_thumb,w_400,h_400,g_auto/f_auto,q_auto/")} 
                      alt={asset.public_id}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 gap-2">
                       <Button 
                         size="icon" 
                         variant="secondary" 
                         className="rounded-full"
                         onClick={() => setSelectedAsset(asset)}
                       >
                          <Eye className="w-4 h-4" />
                       </Button>
                       <Button 
                         size="icon" 
                         variant="secondary" 
                         className="rounded-full"
                         onClick={() => copyToClipboard(asset.secure_url)}
                       >
                          <Copy className="w-4 h-4" />
                       </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-2">
                     <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium truncate flex-1" title={asset.public_id}>
                          {asset.public_id.split("/").pop()}
                        </p>
                        <Badge variant="outline" className="text-[10px] uppercase border-hairline h-5">
                           {asset.format}
                        </Badge>
                     </div>
                     <p className="text-xs text-muted">
                        {asset.width}x{asset.height} • {(asset.bytes / 1024).toFixed(1)} KB
                     </p>
                     
                     <div className="pt-2 flex items-center justify-between border-t border-hairline opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex gap-1">
                           <a href={asset.secure_url} target="_blank" rel="noreferrer">
                              <Button 
                                size="icon" 
                                variant="ghost" 
                                className="w-8 h-8 rounded-full text-muted hover:text-ink"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </Button>
                           </a>
                           <Button 
                             size="icon" 
                             variant="ghost" 
                             className="w-8 h-8 rounded-full text-muted hover:text-error"
                             onClick={() => handleDelete(asset.public_id)}
                           >
                              <Trash2 className="w-3.5 h-3.5" />
                           </Button>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 text-xs px-2 hover:bg-primary/10 hover:text-primary"
                          onClick={() => setSelectedAsset(asset)}
                        >
                           Details
                        </Button>
                     </div>
                  </div>
                </div>
              ))}
            </div>

            {nextCursor && (
              <div className="flex justify-center">
                <Button 
                  variant="outline" 
                  className="border-hairline"
                  onClick={() => fetchAssets(nextCursor)}
                  disabled={loading}
                >
                  {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  Load More Assets
                </Button>
              </div>
            )}
          </div>
        )}

        
        <Dialog open={!!selectedAsset} onOpenChange={() => setSelectedAsset(null)}>
           <DialogContent className="max-w-5xl bg-surface-dark border-surface-dark-elevated text-on-dark p-0 overflow-hidden shadow-2xl">
              {selectedAsset && (
                <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
                   <div className="flex-1 bg-ink/20 flex items-center justify-center p-8 min-h-[300px]">
                      <img 
                        src={selectedAsset.secure_url} 
                        alt={selectedAsset.public_id} 
                        className="max-w-full max-h-full object-contain"
                      />
                   </div>
                   <div className="w-full md:w-80 bg-surface-dark p-8 space-y-8 border-l border-surface-dark-elevated overflow-y-auto">
                      <div className="space-y-2">
                         <h3 className="font-serif text-2xl leading-tight">{selectedAsset.public_id.split("/").pop()}</h3>
                         <p className="text-[10px] text-on-dark-soft uppercase tracking-[0.2em]">{selectedAsset.folder || "root"}</p>
                      </div>
                      
                      <div className="space-y-4 py-6 border-y border-surface-dark-elevated">
                         <div className="flex justify-between text-sm">
                            <span className="text-on-dark-soft">Format</span>
                            <span className="font-medium uppercase">{selectedAsset.format}</span>
                         </div>
                         <div className="flex justify-between text-sm">
                            <span className="text-on-dark-soft">Dimensions</span>
                            <span className="font-medium">{selectedAsset.width} × {selectedAsset.height}</span>
                         </div>
                         <div className="flex justify-between text-sm">
                            <span className="text-on-dark-soft">Size</span>
                            <span className="font-medium">{(selectedAsset.bytes / 1024).toFixed(1)} KB</span>
                         </div>
                         <div className="flex justify-between text-sm">
                            <span className="text-on-dark-soft">Created</span>
                            <span className="font-medium">{new Date(selectedAsset.created_at).toLocaleDateString()}</span>
                         </div>
                      </div>

                      <div className="space-y-4">
                         <Button 
                           className="w-full button-primary h-12"
                           onClick={() => copyToClipboard(selectedAsset.secure_url)}
                         >
                            <Copy className="w-4 h-4 mr-2" />
                            Copy URL
                         </Button>
                         <a href={selectedAsset.secure_url} download target="_blank" rel="noreferrer">
                            <Button 
                              variant="outline" 
                              className="w-full h-12 border-surface-dark-elevated hover:bg-surface-dark-soft text-on-dark"
                            >
                               <ExternalLink className="w-4 h-4 mr-2" />
                               View Original
                            </Button>
                         </a>
                      </div>
                   </div>
                </div>
              )}
           </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
