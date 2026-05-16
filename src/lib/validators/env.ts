import { z } from "zod";

const envSchema = z.object({
  CLOUDINARY_CLOUD_NAME: z.string().min(1, "Cloud Name is required"),
  CLOUDINARY_API_KEY: z.string().min(1, "API Key is required"),
  CLOUDINARY_API_SECRET: z.string().min(1, "API Secret is required"),
  MAX_FILE_SIZE_MB: z.coerce.number().default(10),
  MAX_BATCH_UPLOAD: z.coerce.number().default(50),
});

export const env = envSchema.parse({
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  MAX_FILE_SIZE_MB: process.env.MAX_FILE_SIZE_MB,
  MAX_BATCH_UPLOAD: process.env.MAX_BATCH_UPLOAD,
});
