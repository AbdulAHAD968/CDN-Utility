"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Info, Trash2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
}

export function ConfirmationDialog({
  open,
  onOpenChange,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
}: ConfirmationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 overflow-hidden bg-white/80 backdrop-blur-xl border-white/20 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] rounded-[32px] ring-1 ring-black/5">
        <div className="relative p-8 md:p-10">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center space-y-6 relative z-10"
          >
            {/* Animated Icon Container */}
            <motion.div
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20,
                delay: 0.1 
              }}
              className={cn(
                "w-20 h-20 rounded-[28px] flex items-center justify-center shadow-2xl transition-all duration-500",
                variant === "destructive" 
                  ? "bg-gradient-to-br from-error/20 to-error/5 text-error shadow-error/10" 
                  : "bg-gradient-to-br from-primary/20 to-primary/5 text-primary shadow-primary/10"
              )}
            >
              <div className={cn(
                "w-14 h-14 rounded-[22px] bg-white flex items-center justify-center shadow-inner",
                variant === "destructive" ? "text-error" : "text-primary"
              )}>
                {variant === "destructive" ? (
                  <Trash2 className="w-7 h-7" />
                ) : (
                  <AlertTriangle className="w-7 h-7" />
                )}
              </div>
            </motion.div>

            <div className="space-y-3">
              <DialogHeader>
                <DialogTitle className="text-3xl font-serif text-ink tracking-tight leading-tight">
                  {title}
                </DialogTitle>
                <DialogDescription className="text-muted text-base leading-relaxed max-w-[280px] mx-auto font-sans font-medium opacity-80">
                  {description}
                </DialogDescription>
              </DialogHeader>
            </div>
          </motion.div>
        </div>

        <DialogFooter className="bg-surface-soft/50 backdrop-blur-sm p-6 border-t border-hairline/50 flex flex-col sm:flex-row gap-3">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex-1"
          >
            <Button
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="w-full h-14 px-6 rounded-2xl text-muted font-bold uppercase tracking-widest text-[10px] hover:bg-white hover:text-ink transition-all active:scale-95"
            >
              {cancelText}
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex-[1.5]"
          >
            <Button
              variant={variant === "destructive" ? "destructive" : "default"}
              onClick={() => {
                onConfirm();
                onOpenChange(false);
              }}
              className={cn(
                "w-full h-14 px-8 rounded-2xl font-bold uppercase tracking-[0.1em] text-xs shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2",
                variant === "destructive" 
                  ? "bg-error hover:bg-error-active shadow-error/20" 
                  : "bg-primary hover:bg-primary-active shadow-primary/20"
              )}
            >
              {confirmText}
            </Button>
          </motion.div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
