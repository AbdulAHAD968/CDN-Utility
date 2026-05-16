"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/shared/navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { getSystemConfig } from "@/actions/cloudinary";
import { Shield, Settings, Database, Bell, Save, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [systemConfig, setSystemConfig] = useState<any>(null);
  const [preferences, setPreferences] = useState({
    maxFileSize: "10",
    maxBatchSize: "50",
    forceHttps: true,
    autoOptimize: true,
  });

  // Load config and localStorage on mount
  useEffect(() => {
    async function init() {
      try {
        const config = await getSystemConfig();
        setSystemConfig(config);
        
        const saved = localStorage.getItem("cdn_utility_settings");
        if (saved) {
          setPreferences(JSON.parse(saved));
        }
      } catch (e) {
        console.error("Failed to load settings", e);
      } finally {
        setIsLoading(false);
      }
    }
    init();
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem("cdn_utility_settings", JSON.stringify(preferences));
      setIsSaving(false);
      toast.success("Preferences saved successfully", {
        icon: <CheckCircle2 className="w-4 h-4 text-success" />,
      });
    }, 800);
  };

  const updatePref = (key: string, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
           <Loader2 className="w-10 h-10 text-primary animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container max-w-4xl mx-auto px-6 py-12 space-y-10">
        <div className="space-y-1">
          <h1 className="text-4xl font-serif">Settings</h1>
          <p className="text-muted text-lg">Configure your workspace and preferences.</p>
        </div>

        <div className="grid gap-8">
          {/* Environment Section (Read Only) */}
          <Card className="bg-canvas border-hairline shadow-none">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                 <Shield className="w-5 h-5 text-primary" />
                 <CardTitle className="font-serif text-xl">Cloudinary Environment</CardTitle>
              </div>
              <CardDescription>
                Credentials pulled from your system configuration.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <Label className="text-muted-soft text-xs uppercase tracking-wider">Cloud Name</Label>
                    <div className="p-3 bg-surface-soft border border-hairline rounded-lg font-mono text-sm text-ink select-all">
                       {systemConfig?.cloudName || "Not configured"}
                    </div>
                 </div>
                 <div className="space-y-2">
                    <Label className="text-muted-soft text-xs uppercase tracking-wider">API Key</Label>
                    <div className="p-3 bg-surface-soft border border-hairline rounded-lg font-mono text-sm text-ink select-all">
                       {systemConfig?.apiKey 
                         ? `${systemConfig.apiKey.substring(0, 4)}••••••••${systemConfig.apiKey.slice(-4)}` 
                         : "Not configured"}
                    </div>
                 </div>
              </div>
              <div className="flex items-start gap-3 bg-surface-cream-strong/30 p-4 rounded-xl border border-hairline">
                 <Settings className="w-4 h-4 text-muted mt-0.5" />
                 <p className="text-xs text-muted leading-relaxed">
                   These values are locked to your project's environment variables. To update them, please modify your <code className="bg-surface-soft px-1 rounded">.env.local</code> file.
                 </p>
              </div>
            </CardContent>
          </Card>

          {/* User Preferences Section */}
          <Card className="bg-canvas border-hairline shadow-none">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                 <Database className="w-5 h-5 text-primary" />
                 <CardTitle className="font-serif text-xl">Upload & Delivery</CardTitle>
              </div>
              <CardDescription>
                Configure how the utility behaves during uploads and link generation.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
               <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <Label>Max File Size (MB)</Label>
                     <Input 
                        value={preferences.maxFileSize} 
                        onChange={(e) => updatePref("maxFileSize", e.target.value)}
                        type="number" 
                        className="bg-surface-soft border-hairline h-11" 
                     />
                  </div>
                  <div className="space-y-2">
                     <Label>Max Batch Size</Label>
                     <Input 
                        value={preferences.maxBatchSize} 
                        onChange={(e) => updatePref("maxBatchSize", e.target.value)}
                        type="number" 
                        className="bg-surface-soft border-hairline h-11" 
                     />
                  </div>
               </div>
               
               <div className="space-y-1 pt-4 border-t border-hairline">
                  {/* Force HTTPS */}
                  <div 
                    className="flex items-center justify-between p-4 rounded-2xl hover:bg-surface-soft transition-all cursor-pointer group"
                    onClick={() => updatePref("forceHttps", !preferences.forceHttps)}
                  >
                     <div className="space-y-1">
                        <Label className="text-base font-medium group-hover:text-primary transition-colors cursor-pointer">Force HTTPS</Label>
                        <p className="text-sm text-muted">Always use secure URLs for generated snippets.</p>
                     </div>
                     <Switch 
                        checked={preferences.forceHttps} 
                        onCheckedChange={(val) => updatePref("forceHttps", val)}
                        onClick={(e) => e.stopPropagation()}
                     />
                  </div>

                  {/* Auto-Optimization */}
                  <div 
                    className="flex items-center justify-between p-4 rounded-2xl hover:bg-surface-soft transition-all cursor-pointer group"
                    onClick={() => updatePref("autoOptimize", !preferences.autoOptimize)}
                  >
                     <div className="space-y-1">
                        <Label className="text-base font-medium group-hover:text-primary transition-colors cursor-pointer">Auto-Optimization</Label>
                        <p className="text-sm text-muted">Automatically apply quality and format optimization.</p>
                     </div>
                     <Switch 
                        checked={preferences.autoOptimize} 
                        onCheckedChange={(val) => updatePref("autoOptimize", val)}
                        onClick={(e) => e.stopPropagation()}
                     />
                  </div>
               </div>
            </CardContent>
          </Card>

          <div className="flex justify-end items-center gap-4 pt-4 border-t border-hairline">
             <p className="text-xs text-muted italic">Changes are saved to your browser's local storage.</p>
             <Button 
                className="button-primary h-14 px-10 rounded-full text-lg shadow-lg hover:shadow-xl transition-all"
                onClick={handleSave}
                disabled={isSaving}
             >
                {isSaving ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    Save Preferences
                    <Save className="w-5 h-5 ml-2" />
                  </>
                )}
             </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
