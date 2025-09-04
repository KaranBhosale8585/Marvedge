"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

interface Step {
  id: string;
  title: string;
  description: string;
  mediaUrl?: string | null;
  order?: number;
  tags?: string[];
  duration?: number | null;
}

interface User {
  id: string;
  email: string;
}

interface Tour {
  id: string;
  title: string;
  isPublic: boolean;
  status: "Public" | "Private";
  createdAt?: string;
  steps?: Step[];
  user?: User;
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
      <DialogContent className="max-w-6xl w-full sm:w-[95%] max-h-[95vh] p-6 sm:p-8 flex flex-col">
        {/* Header with inline info */}
        <DialogHeader className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 flex-shrink-0">
          <DialogTitle className="text-3xl font-bold">{tour.title}</DialogTitle>
          <div className="flex flex-wrap gap-4 text-gray-500 text-sm">
            <span>
              <strong>Created:</strong>{" "}
              {tour.createdAt
                ? new Date(tour.createdAt).toLocaleDateString()
                : "N/A"}
            </span>
            <span>
              <strong>By:</strong> {tour.user?.email ?? "Unknown"}
            </span>
            <span>
              <strong>Status:</strong> {tour.isPublic ? "Public" : "Private"}
            </span>
          </div>
        </DialogHeader>

        {/* Scrollable Steps */}
        <ScrollArea className="h-[65vh] overflow-auto flex-1 mt-4">
          <div className="space-y-6">
            {tour.steps && tour.steps.length > 0 ? (
              tour.steps
                .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                .map((step, idx) => (
                  <div
                    key={step.id}
                    className="border rounded-2xl p-5 bg-white shadow-lg hover:shadow-xl transition duration-200"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-semibold text-xl flex items-center gap-2">
                        <span className="bg-black text-white rounded-full px-3 py-1 text-sm">
                          {step.order ?? idx + 1}
                        </span>
                        {step.title}
                      </h3>
                      {step.duration && (
                        <span className="text-sm text-gray-500">
                          ⏱ {step.duration} days
                        </span>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div>
                        <strong className="text-gray-700">Description:</strong>
                        <p className="text-gray-600 ml-2">
                          {step.description || "N/A"}
                        </p>
                      </div>

                      {step.tags && step.tags.length > 0 && (
                        <div>
                          <strong className="text-gray-700">Tags:</strong>
                          <div className="ml-2 mt-1 flex flex-wrap gap-2">
                            {step.tags.map((tag, i) => (
                              <span
                                key={i}
                                className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {step.mediaUrl && (
                        <div>
                          <strong className="text-gray-700">Media:</strong>
                          <Image
                            src={step.mediaUrl}
                            alt={`Step ${idx + 1} image`}
                            className="rounded-xl w-full max-h-96 object-cover border border-gray-200 mt-2"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-gray-500 text-center mt-10">
                No steps available for this tour.
              </p>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ViewTourDialog;
