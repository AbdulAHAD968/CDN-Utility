"use server";

import { cloudinary } from "@/lib/cloudinary/client";
import { env } from "@/lib/validators/env";

export async function getUploadSignature(folder?: string, publicId?: string) {
  const timestamp = Math.round(new Date().getTime() / 1000);
  
  const params: Record<string, any> = {
    timestamp,
    folder: folder || "uploads",
  };

  if (publicId) {
    params.public_id = publicId;
  }

  const signature = cloudinary.utils.api_sign_request(
    params,
    env.CLOUDINARY_API_SECRET
  );

  return {
    signature,
    timestamp,
    cloudName: env.CLOUDINARY_CLOUD_NAME,
    apiKey: env.CLOUDINARY_API_KEY,
    folder: params.folder,
    publicId: params.public_id,
  };
}

export async function deleteAsset(publicId: string) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return { success: true, result };
  } catch (error) {
    console.error("Delete error:", error);
    return { success: false, error: "Failed to delete asset" };
  }
}

export async function renameAsset(publicId: string, newName: string) {
  try {
    // Cloudinary rename actually moves/copies the asset
    
    const parts = publicId.split("/");
    parts[parts.length - 1] = newName;
    const newPublicId = parts.join("/");

    const result = await cloudinary.uploader.rename(publicId, newPublicId, {
      overwrite: true,
    });
    return { success: true, result };
  } catch (error) {
    console.error("Rename error:", error);
    return { success: false, error: "Failed to rename asset" };
  }
}

export async function getAssets(options: { 
  max_results?: number; 
  next_cursor?: string;
  prefix?: string;
  resource_type?: "image" | "video" | "raw";
} = {}) {
  try {
    const { max_results = 50, next_cursor, prefix, resource_type = "image" } = options;
    
    const result = await cloudinary.api.resources({
      type: "upload",
      resource_type,
      max_results,
      next_cursor,
      prefix,
      tags: true,
      context: true,
    });

    return { 
      success: true, 
      assets: result.resources, 
      next_cursor: result.next_cursor 
    };
  } catch (error) {
    console.error("Fetch assets error:", error);
    return { success: false, error: "Failed to fetch assets" };
  }
}
