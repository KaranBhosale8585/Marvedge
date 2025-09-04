"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Tour {
  id: string;
  title: string;
  status: "Public" | "Private";
  thumbnail?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  views?: number;
  stepsCount?: number;
  steps?: Step[];
  user?: { id: string; email: string };
}

interface Step {
  id: string;
  title: string;
  description: string;
  mediaUrl?: string;
}


interface ViewTourDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tour: Tour | null;
}

const ViewTourDialog = ({ open, onOpenChange, tour }: ViewTourDialogProps) => {
  if (!tour) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{tour.title}</DialogTitle>
          <p className="text-gray-500 text-sm">
            Created: {new Date(tour.createdAt!).toLocaleDateString()} • By:{" "}
            {tour.user?.email ?? "Unknown"}
          </p>
        </DialogHeader>

        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-6">
            {tour.steps?.length ? (
              tour.steps.map((step, idx) => (
                <div
                  key={step.id}
                  className="border rounded-lg p-4 bg-gray-50 shadow-sm"
                >
                  <h3 className="font-semibold text-lg mb-2">
                    Step {idx + 1}: {step.title}
                  </h3>
                  <p className="text-gray-700 mb-3">{step.description}</p>

                  {step.mediaUrl && (
                    <img
                      src={step.mediaUrl}
                      alt={`Step ${idx + 1} screenshot`}
                      className="rounded-md w-full max-h-80 object-contain"
                    />
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No steps available.</p>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ViewTourDialog;
