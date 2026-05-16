"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type NamingOptions } from "@/lib/naming/engine";

const namingSchema = z.object({
  prefix: z.string().min(1, "Prefix is required"),
  folder: z.string().min(1, "Folder is required"),
  startingNumber: z.number().min(0),
  padding: z.number().min(1).max(5),
  preserveOriginal: z.boolean(),
  randomSuffix: z.boolean(),
  slugify: z.boolean(),
});

type NamingFormData = z.infer<typeof namingSchema>;

interface NamingOptionsProps {
  onChange: (options: NamingFormData) => void;
}

export function NamingOptionsForm({ onChange }: NamingOptionsProps) {
  const form = useForm<NamingFormData>({
    resolver: zodResolver(namingSchema),
    defaultValues: {
      prefix: "img",
      folder: "media",
      startingNumber: 1,
      padding: 2,
      preserveOriginal: false,
      randomSuffix: false,
      slugify: true,
    },
  });


  const values = form.watch();





  return (
    <Card className="bg-canvas border-hairline shadow-none">
      <CardHeader>
        <CardTitle className="font-serif text-xl">Naming Presets</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="prefix">Prefix</Label>
            <Input
              id="prefix"
              {...form.register("prefix")}
              placeholder="e.g. hero, img, product"
              className="bg-surface-soft border-hairline"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="folder">Folder</Label>
            <Input
              id="folder"
              {...form.register("folder")}
              placeholder="e.g. blog/2024"
              className="bg-surface-soft border-hairline"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startingNumber">Starting Number</Label>
            <Input
              id="startingNumber"
              type="number"
              {...form.register("startingNumber", { valueAsNumber: true })}
              className="bg-surface-soft border-hairline"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="padding">Padding</Label>
            <Select
              onValueChange={(val) => val && form.setValue("padding", parseInt(val))}
              defaultValue="2"
            >
              <SelectTrigger className="bg-surface-soft border-hairline">
                <SelectValue placeholder="Select padding" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 (e.g. 1)</SelectItem>
                <SelectItem value="2">2 (e.g. 01)</SelectItem>
                <SelectItem value="3">3 (e.g. 001)</SelectItem>
                <SelectItem value="4">4 (e.g. 0001)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-1 pt-4 border-t border-hairline">
          <div className="flex items-center justify-between p-3 rounded-md hover:bg-surface-soft transition-colors cursor-pointer group" onClick={() => form.setValue("preserveOriginal", !form.getValues("preserveOriginal"))}>
            <div className="space-y-0.5">
              <Label className="text-ink group-hover:text-primary transition-colors cursor-pointer">Preserve Original Names</Label>
              <p className="text-xs text-muted">Use original filenames instead of sequential numbering.</p>
            </div>
            <Switch
              checked={form.watch("preserveOriginal")}
              onCheckedChange={(val) => form.setValue("preserveOriginal", val)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-md hover:bg-surface-soft transition-colors cursor-pointer group" onClick={() => form.setValue("slugify", !form.getValues("slugify"))}>
            <div className="space-y-0.5">
              <Label className="text-ink group-hover:text-primary transition-colors cursor-pointer">Slugify Names</Label>
              <p className="text-xs text-muted">Remove spaces and special characters for web safety.</p>
            </div>
            <Switch
              checked={form.watch("slugify")}
              onCheckedChange={(val) => form.setValue("slugify", val)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-md hover:bg-surface-soft transition-colors cursor-pointer group" onClick={() => form.setValue("randomSuffix", !form.getValues("randomSuffix"))}>
            <div className="space-y-0.5">
              <Label className="text-ink group-hover:text-primary transition-colors cursor-pointer">Random Suffix</Label>
              <p className="text-xs text-muted">Add a 4-char random string to avoid collisions.</p>
            </div>
            <Switch
              checked={form.watch("randomSuffix")}
              onCheckedChange={(val) => form.setValue("randomSuffix", val)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>

        <div className="bg-surface-card p-4 rounded-lg border border-hairline">
          <p className="text-xs font-mono text-muted uppercase mb-2">Preview Example</p>
          <p className="font-mono text-sm text-primary">
            {form.watch("folder")}/{form.watch("prefix")}_
            {form.watch("startingNumber").toString().padStart(form.watch("padding"), "0")}
            {form.watch("randomSuffix") ? "_a7b2" : ""}.png
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
