import { create } from "zustand";

export type UploadItem = {
  id: string;
  file: File;
  preview: string;
  progress: number;
  status: "idle" | "uploading" | "success" | "error";
  error?: string;
  publicId?: string;
  url?: string;
  customName?: string;
};

interface UploadStore {
  queue: UploadItem[];
  isUploading: boolean;
  addToQueue: (files: File[]) => void;
  removeFromQueue: (id: string) => void;
  updateProgress: (id: string, progress: number) => void;
  updateStatus: (id: string, status: UploadItem["status"], data?: { publicId?: string; url?: string; error?: string }) => void;
  updateCustomName: (id: string, name: string) => void;
  clearQueue: () => void;
  setUploading: (loading: boolean) => void;
}

export const useUploadStore = create<UploadStore>((set) => ({
  queue: [],
  isUploading: false,
  addToQueue: (files) => {
    const newItems: UploadItem[] = files.map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      file,
      preview: URL.createObjectURL(file),
      progress: 0,
      status: "idle",
    }));
    set((state) => ({ queue: [...state.queue, ...newItems] }));
  },
  removeFromQueue: (id) => {
    set((state) => {
      const item = state.queue.find((i) => i.id === id);
      if (item) URL.revokeObjectURL(item.preview);
      return { queue: state.queue.filter((i) => i.id !== id) };
    });
  },
  updateProgress: (id, progress) => {
    set((state) => ({
      queue: state.queue.map((i) => (i.id === id ? { ...i, progress } : i)),
    }));
  },
  updateStatus: (id, status, data) => {
    set((state) => ({
      queue: state.queue.map((i) => (i.id === id ? { ...i, status, ...data } : i)),
    }));
  },
  updateCustomName: (id, name) => {
    set((state) => ({
      queue: state.queue.map((i) => (i.id === id ? { ...i, customName: name } : i)),
    }));
  },
  clearQueue: () => {
    set((state) => {
      state.queue.forEach((i) => URL.revokeObjectURL(i.preview));
      return { queue: [] };
    });
  },
  setUploading: (loading) => set({ isUploading: loading }),
}));
