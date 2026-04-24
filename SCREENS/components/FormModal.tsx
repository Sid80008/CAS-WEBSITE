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

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  onSubmit?: () => void;
  submitLabel?: string;
  isSubmitting?: boolean;
}

export function FormModal({
  isOpen,
  onClose,
  title,
  description,
  children,
  onSubmit,
  submitLabel = "Save Changes",
  isSubmitting = false,
}: FormModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] rounded-xl overflow-hidden p-0 gap-0">
        <div className="p-6">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-xl font-bold text-gray-900">{title}</DialogTitle>
            {description && (
              <DialogDescription className="text-sm text-gray-500">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
          
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            {children}
          </div>
        </div>

        <DialogFooter className="bg-gray-50 p-6 flex sm:justify-between items-center border-t">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting} className="border-gray-200">
            Cancel
          </Button>
          <Button 
            onClick={onSubmit} 
            disabled={isSubmitting}
            className="bg-indigo-600 hover:bg-indigo-700 text-white min-w-[120px]"
          >
            {isSubmitting ? (
              <div className="h-4 w-4 border-2 border-white/30 border-t-white animate-spin rounded-full" />
            ) : (
              submitLabel
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
