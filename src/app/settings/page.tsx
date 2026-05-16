import { Navbar } from "@/components/shared/navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { env } from "@/lib/validators/env";
import { Shield, Settings, Database, Bell } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container max-w-4xl mx-auto px-6 py-12 space-y-10">
        <div className="space-y-1">
          <h1 className="text-4xl font-serif">Settings</h1>
          <p className="text-muted">Configure your workspace and preferences.</p>
        </div>

        <div className="grid gap-8">
          <Card className="bg-canvas border-hairline shadow-none">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                 <Shield className="w-5 h-5 text-primary" />
                 <CardTitle className="font-serif text-xl">Environment Configuration</CardTitle>
              </div>
              <CardDescription>
                System environment variables used for Cloudinary integration.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                 <div className="space-y-2">
                    <Label>Cloud Name</Label>
                    <Input value={env.CLOUDINARY_CLOUD_NAME} disabled className="bg-surface-soft border-hairline font-mono" />
                 </div>
                 <div className="space-y-2">
                    <Label>API Key</Label>
                    <Input value={env.CLOUDINARY_API_KEY.replace(/./g, '*').substring(0, 15)} disabled className="bg-surface-soft border-hairline font-mono" />
                 </div>
              </div>
              <p className="text-[10px] text-muted-soft uppercase tracking-widest bg-surface-soft p-3 rounded-md border border-hairline">
                 ⚠ To change these, update your .env.local file on Vercel.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-canvas border-hairline shadow-none">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                 <Database className="w-5 h-5 text-primary" />
                 <CardTitle className="font-serif text-xl">Upload Policies</CardTitle>
              </div>
              <CardDescription>
                Configure global limits and defaults for asset uploads.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <Label>Max File Size (MB)</Label>
                     <Input defaultValue={env.MAX_FILE_SIZE_MB} type="number" className="bg-surface-soft border-hairline" />
                  </div>
                  <div className="space-y-2">
                     <Label>Max Batch Size</Label>
                     <Input defaultValue={env.MAX_BATCH_UPLOAD} type="number" className="bg-surface-soft border-hairline" />
                  </div>
               </div>
               
               <div className="space-y-4 pt-4 border-t border-hairline">
                  <div className="flex items-center justify-between">
                     <div className="space-y-0.5">
                        <Label>Force HTTPS</Label>
                        <p className="text-xs text-muted">Always use secure URLs for generated snippets.</p>
                     </div>
                     <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                     <div className="space-y-0.5">
                        <Label>Auto-Optimization</Label>
                        <p className="text-xs text-muted">Apply f_auto and q_auto to all copied URLs by default.</p>
                     </div>
                     <Switch defaultChecked />
                  </div>
               </div>
            </CardContent>
          </Card>

          <div className="flex justify-end pt-4">
             <Button className="button-primary h-12 px-8">
                Save Preferences
             </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
